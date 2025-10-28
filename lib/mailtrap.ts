import { MailtrapClient } from "mailtrap";

const TOKEN = process.env.MAILTRAP_API_KEY!;

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
  const client = new MailtrapClient({ token: TOKEN });
  try {
    await client.send({
      from,
      to: [{ email: to }],
      template_uuid: templateUuid,
      template_variables: templateVariables,
      subject,
    });
    console.log("Email sent successfully");
    return { success: true };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error };
  }
}
