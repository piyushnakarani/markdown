<?php

declare(strict_types=1);

/**
 * Contact form API — sends mail via PHPMailer over SMTP only.
 * Configure SMTP in config.php (copy from config.example.php).
 */

use PHPMailer\PHPMailer\Exception as MailerException;
use PHPMailer\PHPMailer\PHPMailer;

header('Content-Type: application/json; charset=utf-8');

$configFile = __DIR__ . '/config.php';
$vendorAutoload = __DIR__ . '/vendor/autoload.php';

if (!file_exists($configFile)) {
    respond(503, ['success' => false, 'error' => 'Contact service is not configured.']);
}

if (!file_exists($vendorAutoload)) {
    respond(503, ['success' => false, 'error' => 'Mailer dependencies are not installed. Run composer install in public/api.']);
}

require $vendorAutoload;

/** @var array<string, mixed> $config */
$config = require $configFile;

handleCors($config);
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(405, ['success' => false, 'error' => 'Method not allowed.']);
}

$payload = parsePayload();
if (!is_array($payload)) {
    respond(400, ['success' => false, 'error' => 'Invalid request body.']);
}

if (!empty($payload['website'] ?? '')) {
    respond(200, ['success' => true]);
}

$errors = validateContactPayload($payload);
if ($errors !== []) {
    respond(422, ['success' => false, 'error' => 'Validation failed.', 'fields' => $errors]);
}

$clientIp = getClientIp();
if (isRateLimited($clientIp, $config)) {
    respond(429, ['success' => false, 'error' => 'Too many requests. Please try again later.']);
}

$name = trim((string) $payload['name']);
$email = trim((string) $payload['email']);
$subject = trim((string) $payload['subject']);
$message = trim((string) $payload['message']);

try {
    sendContactMail($config, $name, $email, $subject, $message, $clientIp);
    recordRateLimitHit($clientIp, $config);
    respond(200, ['success' => true]);
} catch (MailerException $exception) {
    error_log('Contact mail failed: ' . $exception->getMessage());
    respond(500, ['success' => false, 'error' => 'Unable to send your message right now. Please try again later.']);
}

/**
 * @param array<string, mixed> $config
 */
function handleCors(array $config): void
{
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    $allowed = $config['allowed_origins'] ?? [];

    if (!is_array($allowed) || $origin === '' || !in_array($origin, $allowed, true)) {
        return;
    }

    header('Access-Control-Allow-Origin: ' . $origin);
    header('Vary: Origin');
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
}

/**
 * @return array<string, mixed>|null
 */
function parsePayload(): ?array
{
    $raw = file_get_contents('php://input');
    if (is_string($raw) && $raw !== '') {
        $decoded = json_decode($raw, true);
        if (is_array($decoded)) {
            return $decoded;
        }
    }

    if (!empty($_POST) && is_array($_POST)) {
        return $_POST;
    }

    return null;
}

/**
 * @param array<string, mixed> $payload
 * @return array<string, string>
 */
function validateContactPayload(array $payload): array
{
    $errors = [];

    $name = trim((string) ($payload['name'] ?? ''));
    if ($name === '' || mb_strlen($name) < 2 || mb_strlen($name) > 100) {
        $errors['name'] = 'Name must be between 2 and 100 characters.';
    } elseif (!preg_match("/^[\p{L}\p{M}'\-. ]{2,100}$/u", $name)) {
        $errors['name'] = 'Name contains invalid characters.';
    }

    $email = trim((string) ($payload['email'] ?? ''));
    if ($email === '' || mb_strlen($email) > 254 || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors['email'] = 'Please enter a valid email address.';
    }

    $subject = trim((string) ($payload['subject'] ?? ''));
    if ($subject === '' || mb_strlen($subject) < 3 || mb_strlen($subject) > 150) {
        $errors['subject'] = 'Subject must be between 3 and 150 characters.';
    } elseif (preg_match('/[\r\n]/', $subject)) {
        $errors['subject'] = 'Subject cannot contain line breaks.';
    }

    $message = trim((string) ($payload['message'] ?? ''));
    if ($message === '' || mb_strlen($message) < 10 || mb_strlen($message) > 5000) {
        $errors['message'] = 'Message must be between 10 and 5000 characters.';
    }

    return $errors;
}

function getClientIp(): string
{
    $forwarded = $_SERVER['HTTP_X_FORWARDED_FOR'] ?? '';
    if (is_string($forwarded) && $forwarded !== '') {
        $parts = explode(',', $forwarded);
        $ip = trim($parts[0]);
        if (filter_var($ip, FILTER_VALIDATE_IP)) {
            return $ip;
        }
    }

    $remote = $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
    return is_string($remote) ? $remote : '0.0.0.0';
}

/**
 * @param array<string, mixed> $config
 */
function isRateLimited(string $ip, array $config): bool
{
    $settings = $config['rate_limit'] ?? [];
    $maxRequests = (int) ($settings['max_requests'] ?? 5);
    $windowSeconds = (int) ($settings['window_seconds'] ?? 3600);

    $dir = __DIR__ . '/rate-limit';
    if (!is_dir($dir) && !mkdir($dir, 0755, true) && !is_dir($dir)) {
        return false;
    }

    $file = $dir . '/' . hash('sha256', $ip) . '.json';
    $now = time();
    $entries = [];

    if (is_file($file)) {
        $decoded = json_decode((string) file_get_contents($file), true);
        if (is_array($decoded)) {
            $entries = array_values(array_filter(
                $decoded,
                static fn ($timestamp) => is_int($timestamp) && ($now - $timestamp) < $windowSeconds
            ));
        }
    }

    return count($entries) >= $maxRequests;
}

/**
 * @param array<string, mixed> $config
 */
function recordRateLimitHit(string $ip, array $config): void
{
    $settings = $config['rate_limit'] ?? [];
    $windowSeconds = (int) ($settings['window_seconds'] ?? 3600);

    $dir = __DIR__ . '/rate-limit';
    if (!is_dir($dir) && !mkdir($dir, 0755, true) && !is_dir($dir)) {
        return;
    }

    $file = $dir . '/' . hash('sha256', $ip) . '.json';
    $now = time();
    $entries = [];

    if (is_file($file)) {
        $decoded = json_decode((string) file_get_contents($file), true);
        if (is_array($decoded)) {
            $entries = array_values(array_filter(
                $decoded,
                static fn ($timestamp) => is_int($timestamp) && ($now - $timestamp) < $windowSeconds
            ));
        }
    }

    $entries[] = $now;
    file_put_contents($file, json_encode($entries), LOCK_EX);
}

/**
 * @param array<string, mixed> $config
 */
function sendContactMail(
    array $config,
    string $name,
    string $email,
    string $subject,
    string $message,
    string $clientIp
): void {
    $smtp = $config['smtp'] ?? [];
    $mail = $config['mail'] ?? [];

    $mailer = new PHPMailer(true);
    $mailer->CharSet = PHPMailer::CHARSET_UTF8;
    $mailer->isSMTP();
    $mailer->Host = (string) ($smtp['host'] ?? '');
    $mailer->SMTPAuth = true;
    $mailer->Username = (string) ($smtp['username'] ?? '');
    $mailer->Password = (string) ($smtp['password'] ?? '');
    $mailer->Port = (int) ($smtp['port'] ?? 587);
    $mailer->SMTPDebug = 0;

    $encryption = strtolower((string) ($smtp['encryption'] ?? 'tls'));
    if ($encryption === 'ssl') {
        $mailer->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    } elseif ($encryption === 'tls') {
        $mailer->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    }

    $fromEmail = (string) ($mail['from_email'] ?? '');
    $fromName = (string) ($mail['from_name'] ?? 'PDFWritter Contact');
    $toEmail = (string) ($mail['to_email'] ?? '');
    $toName = (string) ($mail['to_name'] ?? 'PDFWritter Team');

    $mailer->setFrom($fromEmail, $fromName);
    $mailer->addAddress($toEmail, $toName);
    $mailer->addReplyTo($email, $name);

    $submittedAt = gmdate('Y-m-d H:i:s') . ' UTC';
    $safeName = htmlspecialchars($name, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
    $safeEmail = htmlspecialchars($email, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
    $safeSubject = htmlspecialchars($subject, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
    $safeMessage = nl2br(htmlspecialchars($message, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8'));
    $safeIp = htmlspecialchars($clientIp, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');

    $mailer->isHTML(true);
    $mailer->Subject = '[PDFWritter Contact] ' . $subject;
    $mailer->Body = <<<HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>PDFWritter Contact Message</title>
</head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#0f172a;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f8fafc;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background:#ffffff;border:1px solid #e2e8f0;border-radius:16px;overflow:hidden;">
          <tr>
            <td style="padding:28px 32px;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#ffffff;">
              <h1 style="margin:0;font-size:22px;line-height:1.3;">New Contact Form Message</h1>
              <p style="margin:8px 0 0;font-size:14px;opacity:0.92;">PDFWritter website contact form</p>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 32px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #e2e8f0;font-size:13px;color:#64748b;width:120px;">Name</td>
                  <td style="padding:10px 0;border-bottom:1px solid #e2e8f0;font-size:15px;font-weight:600;">{$safeName}</td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #e2e8f0;font-size:13px;color:#64748b;">Email</td>
                  <td style="padding:10px 0;border-bottom:1px solid #e2e8f0;font-size:15px;"><a href="mailto:{$safeEmail}" style="color:#4f46e5;text-decoration:none;">{$safeEmail}</a></td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #e2e8f0;font-size:13px;color:#64748b;">Subject</td>
                  <td style="padding:10px 0;border-bottom:1px solid #e2e8f0;font-size:15px;">{$safeSubject}</td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #e2e8f0;font-size:13px;color:#64748b;vertical-align:top;">Message</td>
                  <td style="padding:10px 0;border-bottom:1px solid #e2e8f0;font-size:15px;line-height:1.6;">{$safeMessage}</td>
                </tr>
                <tr>
                  <td style="padding:10px 0;font-size:13px;color:#64748b;">Submitted</td>
                  <td style="padding:10px 0;font-size:14px;color:#475569;">{$submittedAt}</td>
                </tr>
                <tr>
                  <td style="padding:10px 0;font-size:13px;color:#64748b;">IP Address</td>
                  <td style="padding:10px 0;font-size:14px;color:#475569;">{$safeIp}</td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
HTML;

    $mailer->AltBody = implode("\n", [
        'New contact form message from PDFWritter',
        '',
        'Name: ' . $name,
        'Email: ' . $email,
        'Subject: ' . $subject,
        'Submitted: ' . $submittedAt,
        'IP: ' . $clientIp,
        '',
        'Message:',
        $message,
    ]);

    $mailer->send();
}

/**
 * @param array<string, mixed> $payload
 */
function respond(int $status, array $payload): void
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE);
    exit;
}
