<?php

declare(strict_types=1);

/**
 * PHPMailer SMTP configuration.
 *
 * Setup:
 *   1. cd public/api && composer install
 *   2. cp config.example.php config.php
 *   3. Fill in your SMTP host, username, password, and inbox below
 */
return [
    'allowed_origins' => [
        'http://localhost:3000',
        'http://127.0.0.1:3000',
        'https://pdfwritter.com',
        'https://www.pdfwritter.com',
    ],
    'smtp' => [
        'host' => 'smtp.example.com',
        'port' => 587,
        'encryption' => 'tls',
        'username' => 'your-smtp-username@example.com',
        'password' => 'your-smtp-password',
    ],
    'mail' => [
        'from_email' => 'noreply@pdfwritter.com',
        'from_name' => 'PDFWritter Contact',
        'to_email' => 'your-inbox@example.com',
        'to_name' => 'PDFWritter Team',
    ],
    'rate_limit' => [
        'max_requests' => 5,
        'window_seconds' => 3600,
    ],
];
