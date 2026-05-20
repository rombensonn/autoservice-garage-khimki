import nodemailer from "nodemailer";
import { business } from "@/lib/content";
import { formatLeadMessage, type LeadForNotification } from "@/lib/leadFormatting";

export async function sendEmailLead(lead: LeadForNotification) {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? 465);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.LEAD_NOTIFY_EMAIL;

  if (!host || !user || !pass || !to) {
    console.info("Email notifications are not configured: SMTP_HOST, SMTP_USER, SMTP_PASS or LEAD_NOTIFY_EMAIL is missing.");
    return false;
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  await transporter.sendMail({
    from: `"${business.name}" <${user}>`,
    to,
    subject: `Новая заявка с сайта ${business.name}`,
    text: formatLeadMessage(lead),
  });

  return true;
}
