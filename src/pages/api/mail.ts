import type { APIRoute } from "astro";
import { Resend } from "resend";

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.formData();

    const name = data.get("name");
    const lastName = data.get("last-name");
    const subject = data.get("subject");
    const email = data.get("email");
    const message = data.get("message");

    if (!name || !lastName || !subject || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Campos incompletos" }),
        { status: 400 }
      );
    }

    await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: ["urbanskinico@gmail.com"],
      subject: `${subject}`,
      html: `
        <h2>mensaje desde el portfolio</h2>
        <p><strong>Nombre:</strong> ${name} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${message}</p>
      `,
    });

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Error enviando el mail" }),
      { status: 500 }
    );
  }
};
