import nodemailer from 'nodemailer';
import type { ContactFormData } from '@/lib/contact';

type MailConfig = {
  host: string;
  port: number;
  user: string;
  pass: string;
  fromEmail: string;
  fromName: string;
  toEmail: string;
  toName: string;
};

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function getMailConfig(): MailConfig | null {
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();
  const toEmail = process.env.MAIL_TO_EMAIL?.trim() || user;

  if (!user || !pass || !toEmail) {
    return null;
  }

  return {
    host: process.env.SMTP_HOST?.trim() || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT || 587),
    user,
    pass,
    fromEmail: process.env.MAIL_FROM_EMAIL?.trim() || user,
    fromName: process.env.MAIL_FROM_NAME?.trim() || 'PDFWritter Contact',
    toEmail,
    toName: process.env.MAIL_TO_NAME?.trim() || 'PDFWritter',
  };
}

function buildHtmlBody(
  name: string,
  email: string,
  subject: string,
  message: string,
  clientIp: string,
  submittedAt: string,
): string {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeSubject = escapeHtml(subject);
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br>');
  const safeIp = escapeHtml(clientIp);

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>PDFWritter Contact Message</title></head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#0f172a;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f8fafc;padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background:#ffffff;border:1px solid #e2e8f0;border-radius:16px;overflow:hidden;">
        <tr><td style="padding:28px 32px;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#ffffff;">
          <h1 style="margin:0;font-size:22px;">New Contact Form Message</h1>
          <p style="margin:8px 0 0;font-size:14px;opacity:0.92;">PDFWritter website contact form</p>
        </td></tr>
        <tr><td style="padding:28px 32px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
            <tr><td style="padding:10px 0;border-bottom:1px solid #e2e8f0;font-size:13px;color:#64748b;width:120px;">Name</td><td style="padding:10px 0;border-bottom:1px solid #e2e8f0;font-size:15px;font-weight:600;">${safeName}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #e2e8f0;font-size:13px;color:#64748b;">Email</td><td style="padding:10px 0;border-bottom:1px solid #e2e8f0;font-size:15px;"><a href="mailto:${safeEmail}" style="color:#4f46e5;text-decoration:none;">${safeEmail}</a></td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #e2e8f0;font-size:13px;color:#64748b;">Subject</td><td style="padding:10px 0;border-bottom:1px solid #e2e8f0;font-size:15px;">${safeSubject}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #e2e8f0;font-size:13px;color:#64748b;vertical-align:top;">Message</td><td style="padding:10px 0;border-bottom:1px solid #e2e8f0;font-size:15px;line-height:1.6;">${safeMessage}</td></tr>
            <tr><td style="padding:10px 0;font-size:13px;color:#64748b;">Submitted</td><td style="padding:10px 0;font-size:14px;color:#475569;">${submittedAt}</td></tr>
            <tr><td style="padding:10px 0;font-size:13px;color:#64748b;">IP Address</td><td style="padding:10px 0;font-size:14px;color:#475569;">${safeIp}</td></tr>
          </table>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export async function sendContactEmail(
  data: ContactFormData,
  clientIp: string,
): Promise<void> {
  const config = getMailConfig();
  if (!config) {
    throw new Error('Mail is not configured');
  }

  const name = data.name.trim();
  const email = data.email.trim();
  const subject = data.subject.trim();
  const message = data.message.trim();
  const submittedAt = new Date().toISOString().replace('T', ' ').slice(0, 19) + ' UTC';

  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.port === 465,
    auth: {
      user: config.user,
      pass: config.pass,
    },
  });

  await transporter.sendMail({
    from: `"${config.fromName}" <${config.fromEmail}>`,
    to: `"${config.toName}" <${config.toEmail}>`,
    replyTo: `"${name}" <${email}>`,
    subject: `[PDFWritter Contact] ${subject}`,
    html: buildHtmlBody(name, email, subject, message, clientIp, submittedAt),
    text: [
      'New contact form message from PDFWritter',
      '',
      `Name: ${name}`,
      `Email: ${email}`,
      `Subject: ${subject}`,
      `Submitted: ${submittedAt}`,
      `IP: ${clientIp}`,
      '',
      'Message:',
      message,
    ].join('\n'),
  });
}
