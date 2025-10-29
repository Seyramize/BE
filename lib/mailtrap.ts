import { MailtrapClient } from "mailtrap";

const TOKEN = process.env.MAILTRAP_API_KEY;

if (!TOKEN) {
  console.warn("⚠️ MAILTRAP_API_KEY not found — emails will be skipped.");
}

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
  if (!TOKEN) {
    console.warn("Skipping email — MAILTRAP_API_KEY not set");
    return { success: false, error: "Missing Mailtrap API key" };
  }

  const client = new MailtrapClient({ token: TOKEN }); // ✅ v3+ uses `token`

  try {
    await client.send({
      from,
      to: [{ email: to }],
      template_uuid: templateUuid,
      template_variables: templateVariables,
      subject,
    });
    console.log("✅ Email sent successfully to:", to);
    return { success: true };
  } catch (error) {
    console.error("❌ Error sending email:", error);
    return { success: false, error };
  }
}
