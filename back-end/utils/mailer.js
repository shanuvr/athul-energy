import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "../.env") });

const SYNTHETIC_CALLBACK_DOMAIN = "@callback.athulenergy.local";

/**
 * Escapes HTML special characters so user-submitted values cannot inject markup.
 */
function escapeHtml(value) {
  if (value === null || value === undefined) return "";
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Resolves mail configuration from environment variables at send time.
 */
function getMailConfig() {
  const senderEmail = process.env.email?.trim() || "";
  const rawPassword = process.env.appPassword || "";
  const appPassword = rawPassword.replace(/\s+/g, "");
  const recipientEmail = process.env.INQUIRY_TO_EMAIL?.trim() || "";
  const smtpHost = process.env.SMTP_HOST?.trim() || "smtp.gmail.com";
  const smtpPort = Number(process.env.SMTP_PORT) || 465;

  return {
    senderEmail,
    appPassword,
    recipientEmail,
    smtpHost,
    smtpPort,
  };
}

/**
 * Creates a Nodemailer SMTP transporter using configured credentials.
 */
export function createMailTransporter() {
  const { senderEmail, appPassword, smtpHost, smtpPort } = getMailConfig();

  if (!senderEmail || !appPassword) {
    return null;
  }

  return nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: {
      user: senderEmail,
      pass: appPassword,
    },
  });
}

/**
 * Formats a date/timestamp cleanly in Indian Standard Time (IST).
 */
function formatTimestampIST(dateInput) {
  const date = dateInput ? new Date(dateInput) : new Date();
  const safeDate = Number.isNaN(date.getTime()) ? new Date() : date;

  return (
    new Intl.DateTimeFormat("en-IN", {
      timeZone: "Asia/Kolkata",
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(safeDate) + " IST"
  );
}

/**
 * Sends a clean notification email to INQUIRY_TO_EMAIL when a website callback or enquiry is submitted.
 * Returns true if delivered, false if mail configuration is missing in .env.
 */
export async function sendInquiryEmail(inquiry) {
  const { senderEmail, recipientEmail } = getMailConfig();
  const transporter = createMailTransporter();

  if (!transporter || !recipientEmail) {
    console.warn(
      "[Mailer] Skipping inquiry notification: 'email', 'appPassword', or 'INQUIRY_TO_EMAIL' missing in back-end/.env"
    );
    return false;
  }

  const isCallback = inquiry.source === "home-cta";
  const isSyntheticEmail =
    !inquiry.email || inquiry.email.endsWith(SYNTHETIC_CALLBACK_DOMAIN);
  const visitorEmail = isSyntheticEmail ? null : inquiry.email.trim();
  const visitorPhone = inquiry.phone?.trim() || null;
  const requestedAt = formatTimestampIST(inquiry.createdAt);

  const primaryContact = visitorEmail || visitorPhone || "Not provided";
  const contactHref = visitorEmail
    ? `mailto:${encodeURIComponent(visitorEmail)}`
    : visitorPhone
    ? `tel:${visitorPhone.replace(/\s+/g, "")}`
    : null;

  const badgeText = isCallback ? "Callback Request" : "Website Enquiry";
  const headline = isCallback
    ? "New Callback Request"
    : `New Enquiry from ${inquiry.name || "Website Visitor"}`;
  const subheadline = isCallback
    ? "Someone requested a callback from the website homepage."
    : "A visitor submitted an enquiry through the Contact Us page.";

  const rows = isCallback
    ? [
        [visitorEmail ? "Email Address" : "Phone Number", primaryContact, contactHref],
        ["Requested At", requestedAt, null],
      ]
    : [
        ["Name", inquiry.name || "—", null],
        ["Email", visitorEmail || "—", visitorEmail ? `mailto:${encodeURIComponent(visitorEmail)}` : null],
        ...(visitorPhone ? [["Phone", visitorPhone, `tel:${visitorPhone.replace(/\s+/g, "")}`]] : []),
        ["Submitted At", requestedAt, null],
      ];

  const rowsHtml = rows
    .map(([label, val, href]) => {
      const valueHtml = href
        ? `<a href="${escapeHtml(href)}" style="color:#047857;font-weight:600;text-decoration:none;">${escapeHtml(val)}</a>`
        : `<span style="color:#0f172a;font-weight:500;">${escapeHtml(val)}</span>`;

      return `
        <tr>
          <td style="padding:12px 16px;border-bottom:1px solid #e2e8f0;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;color:#64748b;width:140px;vertical-align:top;">${escapeHtml(label)}</td>
          <td style="padding:12px 16px;border-bottom:1px solid #e2e8f0;font-size:14px;vertical-align:top;">${valueHtml}</td>
        </tr>`;
    })
    .join("");

  const messageSectionHtml =
    !isCallback && inquiry.message
      ? `
        <div style="margin-top:20px;padding:16px 18px;background:#f8fafc;border-left:3px solid #10b981;border-radius:8px;">
          <p style="margin:0 0 6px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:#64748b;">Message</p>
          <p style="margin:0;font-size:14px;line-height:1.6;color:#1e293b;white-space:pre-wrap;">${escapeHtml(inquiry.message)}</p>
        </div>`
      : "";

  const ctaButtonHtml = contactHref
    ? `
      <div style="margin-top:24px;text-align:center;">
        <a href="${escapeHtml(contactHref)}" style="display:inline-block;background:#059669;color:#ffffff;font-size:13px;font-weight:700;text-decoration:none;padding:12px 26px;border-radius:999px;">
          ${visitorEmail ? "Reply via Email" : "Call Visitor Now"} &rarr;
        </a>
      </div>`
    : "";

  const html = `
    <div style="background:#f1f5f9;padding:28px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
      <div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e2e8f0;box-shadow:0 4px 20px rgba(15,23,42,0.06);">
        <div style="background:linear-gradient(135deg,#022c22 0%,#064e3b 100%);padding:26px 28px;color:#ffffff;">
          <span style="display:inline-block;background:rgba(16,185,129,0.18);border:1px solid rgba(52,211,153,0.4);color:#6ee7b7;font-size:10.5px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;padding:4px 10px;border-radius:999px;">
            ${escapeHtml(badgeText)}
          </span>
          <h1 style="margin:12px 0 6px;font-size:21px;font-weight:700;line-height:1.3;color:#ffffff;">
            ${escapeHtml(headline)}
          </h1>
          <p style="margin:0;font-size:13px;line-height:1.5;color:#cbd5e1;">
            ${escapeHtml(subheadline)}
          </p>
        </div>

        <div style="padding:24px 28px;">
          <table style="width:100%;border-collapse:collapse;border:1px solid #e2e8f0;border-radius:10px;overflow:hidden;">
            ${rowsHtml}
          </table>
          ${messageSectionHtml}
          ${ctaButtonHtml}
        </div>

        <div style="background:#f8fafc;border-top:1px solid #e2e8f0;padding:14px 28px;text-align:center;font-size:11.5px;color:#64748b;">
          Athul Energy Consultants Pvt. Ltd. &bull; Website Notification
        </div>
      </div>
    </div>
  `;

  const subject = isCallback
    ? `Callback Requested (${primaryContact})`
    : `New Enquiry from ${inquiry.name || primaryContact}`;

  const text = [
    headline,
    `====================================`,
    ...rows.map(([label, val]) => `${label}: ${val}`),
    ...(!isCallback && inquiry.message ? ["", "Message:", inquiry.message] : []),
  ].join("\n");

  await transporter.sendMail({
    from: `"Athul Energy Website" <${senderEmail}>`,
    to: recipientEmail,
    ...(visitorEmail ? { replyTo: visitorEmail } : {}),
    subject,
    text,
    html,
  });

  console.log(
    `[Mailer] ${badgeText} notification sent for ${inquiry.ticketId} from ${senderEmail} to ${recipientEmail}`
  );
  return true;
}

