import type { APIRoute } from "astro";
import { Resend } from "resend";

export const prerender = false;

const resend = new Resend(import.meta.env.RESEND_API_KEY);

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LIMITS = {
  name: 60,
  lastName: 60,
  subject: 120,
  email: 254,
  message: 5000,
};

// Evita que el contenido del formulario se interprete como HTML en el correo
function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getField(data: FormData, key: string) {
  const value = data.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function json(body: object, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.formData();

    // Honeypot: los humanos no ven este campo, los bots suelen completarlo
    if (getField(data, "website")) {
      return json({ success: true }, 200);
    }

    const name = getField(data, "name");
    const lastName = getField(data, "last-name");
    const subject = getField(data, "subject");
    const email = getField(data, "email");
    const message = getField(data, "message");

    if (!name || !lastName || !subject || !email || !message) {
      return json({ error: "Campos incompletos" }, 400);
    }

    if (!EMAIL_REGEX.test(email)) {
      return json({ error: "Email inválido" }, 400);
    }

    if (
      name.length > LIMITS.name ||
      lastName.length > LIMITS.lastName ||
      subject.length > LIMITS.subject ||
      email.length > LIMITS.email ||
      message.length > LIMITS.message
    ) {
      return json({ error: "Algún campo es demasiado largo" }, 400);
    }

    const { error } = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: ["urbanskinico@gmail.com"],
      replyTo: email,
      subject: subject.replace(/[\r\n]+/g, " "),
      html: `
        <h2>Mensaje desde el portfolio</h2>
        <p><strong>Nombre:</strong> ${escapeHtml(name)} ${escapeHtml(lastName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Mensaje:</strong></p>
        <p style="white-space: pre-wrap">${escapeHtml(message)}</p>
      `,
    });

    if (error) {
      return json({ error: "Error enviando el mail" }, 502);
    }

    return json({ success: true }, 200);
  } catch {
    return json({ error: "Error enviando el mail" }, 500);
  }
};
