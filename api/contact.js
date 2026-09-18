const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DIRECT_EMAIL = "caov77029@gmail.com";

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "Method not allowed." });
  }

  let body;
  try {
    body = request.body;
    if (typeof body === "string") body = JSON.parse(body);
  } catch {
    return response.status(400).json({ error: "Invalid JSON body." });
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return response.status(400).json({ error: "Invalid request body." });
  }

  const { name, email, message, company = "" } = body;
  if ([name, email, message, company].some((value) => typeof value !== "string")) {
    return response.status(400).json({ error: "Invalid request fields." });
  }

  const trimmedName = name.trim();
  const trimmedEmail = email.trim();
  const trimmedMessage = message.trim();
  const trimmedCompany = company.trim();

  if (trimmedCompany) {
    return response.status(200).json({});
  }
  if (!trimmedName || !trimmedEmail || !trimmedMessage) {
    return response.status(400).json({ error: "Complete all fields before sending." });
  }
  if (!EMAIL_PATTERN.test(trimmedEmail)) {
    return response.status(400).json({ error: "Enter a valid email address." });
  }
  if (trimmedName.length > 80 || trimmedEmail.length > 160 || trimmedMessage.length > 4000) {
    return response.status(400).json({ error: "One or more fields are too long." });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL;
  if (!apiKey?.trim() || !fromEmail?.trim()) {
    return response.status(503).json({ error: `The form is unavailable. Please email ${DIRECT_EMAIL} directly.` });
  }

  const safeName = trimmedName.replace(/[\r\n]+/g, " ");
  const safeEmail = trimmedEmail.replace(/[\r\n]+/g, "");

  try {
    const delivery = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [process.env.CONTACT_TO_EMAIL ?? DIRECT_EMAIL],
        reply_to: safeEmail,
        subject: `Portfolio inquiry from ${safeName}`,
        text: `Name: ${trimmedName}\nEmail: ${trimmedEmail}\n\n${trimmedMessage}`
      })
    });

    if (!delivery.ok) {
      return response.status(502).json({ error: `Message could not be sent. Please email ${DIRECT_EMAIL} directly.` });
    }
  } catch {
    return response.status(502).json({ error: `Message could not be sent. Please email ${DIRECT_EMAIL} directly.` });
  }

  return response.status(200).json({ message: "Message received. I will reply by email." });
}
