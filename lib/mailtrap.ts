import { MailtrapClient } from "mailtrap";

interface SendEmailParams {
  to: string;
  from?: { email: string; name: string };
  subject?: string;
  templateUuid: string;
  templateVariables: Record<string, any>;
}

export async function sendEmail({
  to,
  from = { email: "concierge@experiencesbybeyond.com", name: "Beyond Experiences" },
  subject,
  templateUuid,
  templateVariables,
}: SendEmailParams) {
  const token = process.env.MAILTRAP_API_KEY;

  if (!token) {
    console.warn("⚠️ MAILTRAP_API_KEY is missing — skipping email send.");
    return { success: false, error: "Missing Mailtrap API key" };
  }

  // ✅ Initialize client only when sending email (not at import time)
  const client = new MailtrapClient({ token });

  try {
    await client.send({
      from,
      to: [{ email: to }],
      template_uuid: templateUuid,
      template_variables: templateVariables,
      subject,
    });
    console.log(`✅ Email sent to ${to}`);
    return { success: true };
  } catch (error) {
    console.error("❌ Error sending email:", error);
    return { success: false, error };
  }
}
