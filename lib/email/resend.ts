import "server-only";
import { Resend } from "resend";
import type { ContactFormValues } from "@/lib/validations/contact";

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY n'est pas configurée.");
  }
  return new Resend(apiKey);
}

function adminEmailHtml(data: ContactFormValues) {
  return `
  <div style="font-family: Arial, sans-serif; background:#020B18; padding:32px; color:#ffffff;">
    <div style="max-width:560px; margin:0 auto; background:#081B30; border:1px solid rgba(255,255,255,0.1); border-radius:16px; padding:32px;">
      <h1 style="color:#0A84FF; font-size:20px; margin-bottom:16px;">Nouvelle demande de devis</h1>
      <p><strong>Nom :</strong> ${data.name}</p>
      <p><strong>Email :</strong> ${data.email}</p>
      <p><strong>Téléphone :</strong> ${data.phone || "Non renseigné"}</p>
      <p><strong>Type de projet :</strong> ${data.projectType}</p>
      <p><strong>Budget :</strong> ${data.budget || "Non renseigné"}</p>
      <p><strong>Délai souhaité :</strong> ${data.deadline || "Non renseigné"}</p>
      <p><strong>Message :</strong></p>
      <p style="white-space:pre-line; color:#A8B7C8;">${data.message}</p>
      <a href="mailto:${data.email}" style="display:inline-block; margin-top:24px; background:#0A84FF; color:#fff; text-decoration:none; padding:10px 20px; border-radius:8px;">
        Répondre à ${data.name}
      </a>
    </div>
  </div>`;
}

function clientEmailHtml(data: ContactFormValues) {
  return `
  <div style="font-family: Arial, sans-serif; background:#020B18; padding:32px; color:#ffffff;">
    <div style="max-width:560px; margin:0 auto; background:#081B30; border:1px solid rgba(255,255,255,0.1); border-radius:16px; padding:32px;">
      <h1 style="color:#0A84FF; font-size:20px;">Merci pour votre demande, ${data.name} !</h1>
      <p style="color:#A8B7C8;">
        J'ai bien reçu votre demande concernant votre projet (${data.projectType}).
        Je reviens vers vous très prochainement pour échanger sur les détails.
      </p>
      <p style="color:#A8B7C8;">À très vite,<br/>RachidiDev</p>
    </div>
  </div>`;
}

export async function sendQuoteNotificationEmails(data: ContactFormValues) {
  const resend = getResendClient();
  const adminEmail = process.env.CONTACT_EMAIL;

  if (!adminEmail) {
    throw new Error("CONTACT_EMAIL n'est pas configuré.");
  }

  const adminResult = await resend.emails.send({
    from: "RachidiDev <onboarding@resend.dev>",
    to: adminEmail,
    replyTo: data.email,
    subject: `Nouvelle demande de devis — ${data.name}`,
    html: adminEmailHtml(data),
  });

  if (adminResult.error) {
    throw new Error(
      `Échec de l'envoi de la notification à l'administrateur : ${adminResult.error.message}`
    );
  }

  const clientResult = await resend.emails.send({
    from: "RachidiDev <onboarding@resend.dev>",
    to: data.email,
    subject: "Votre demande a bien été reçue",
    html: clientEmailHtml(data),
  });

  if (clientResult.error) {
    throw new Error(
      `Échec de l'envoi de la confirmation au client : ${clientResult.error.message}`
    );
  }
}
