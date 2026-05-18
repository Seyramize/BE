const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const DISPOSABLE_DOMAINS = new Set([
  "mailinator.com",
  "guerrillamail.com",
  "guerrillamail.net",
  "sharklasers.com",
  "grr.la",
  "tempmail.com",
  "temp-mail.org",
  "throwaway.email",
  "yopmail.com",
  "trashmail.com",
  "getnada.com",
  "dispostable.com",
  "10minutemail.com",
  "fakeinbox.com",
  "maildrop.cc",
  "tempail.com",
]);

export function isValidSubmissionEmail(email: unknown): email is string {
  if (typeof email !== "string") return false;
  const normalized = email.trim().toLowerCase();
  if (!EMAIL_REGEX.test(normalized)) return false;
  const domain = normalized.split("@")[1];
  return Boolean(domain && !DISPOSABLE_DOMAINS.has(domain));
}

export async function verifyTurnstileToken(token: unknown): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    return process.env.NODE_ENV !== "production";
  }
  if (typeof token !== "string" || !token.trim()) {
    return false;
  }
  if (process.env.NODE_ENV !== "production" && token === "dev-bypass") {
    return true;
  }

  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ secret, response: token }),
  });

  const data = (await res.json()) as { success?: boolean };
  return data.success === true;
}

export async function guardFormSubmission(
  body: Record<string, unknown>
): Promise<{ ok: true } | { ok: false; error: string; status: number }> {
  if (typeof body.website === "string" && body.website.trim()) {
    return { ok: false, error: "Invalid submission.", status: 400 };
  }

  if (!(await verifyTurnstileToken(body.turnstileToken))) {
    return {
      ok: false,
      error: "Captcha verification failed. Please try again.",
      status: 403,
    };
  }

  return { ok: true };
}
