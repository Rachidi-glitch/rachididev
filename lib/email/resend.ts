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

export type EmailDeliveryResult =
  | { sent: true }
  | { sent: false; error: string };

function getErrorMessage(error: unknown) {
  if (typeof error === "object" && error !== null && "message" in error) {
    const message = error.message;
    if (typeof message === "string" && message.trim()) {
      return message;
    }
  }

  return error instanceof Error ? error.message : "Erreur Resend inconnue.";
}

function getSafeErrorMessage(error: unknown) {
  return getErrorMessage(error)
    .replace(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi, "[adresse masquée]")
    .replace(/\bre_[A-Za-z0-9_-]+\b/g, "[clé masquée]")
    .replace(/\bBearer\s+\S+/gi, "Bearer [masqué]")
    .slice(0, 300);
}

async function sendEmail(
  resend: Resend,
  recipient: string,
  subject: string,
  html: string,
  replyTo?: string
): Promise<EmailDeliveryResult> {
  try {
    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!.trim(),
      to: recipient,
      subject,
      html,
      ...(replyTo ? { replyTo } : {}),
    });

    if (error) {
      console.error(`Resend a refusé l'e-mail « ${subject} » :`, error);
      return { sent: false, error: getSafeErrorMessage(error) };
    }

    return { sent: true };
  } catch (error) {
    console.error(`Échec réseau lors de l'envoi « ${subject} » :`, error);
    return { sent: false, error: getSafeErrorMessage(error) };
  }
}

export async function sendQuoteNotificationEmails(data: ContactFormValues) {
  const resend = getResendClient();
  const adminEmail = process.env.CONTACT_EMAIL;
  const fromEmail = process.env.RESEND_FROM_EMAIL?.trim();

  if (!adminEmail) {
    throw new Error("CONTACT_EMAIL n'est pas configuré.");
  }

  if (!fromEmail) {
    throw new Error("RESEND_FROM_EMAIL n'est pas configurée.");
  }

  const [admin, client] = await Promise.all([
    sendEmail(
      resend,
      adminEmail,
      `Nouvelle demande de devis — ${data.name}`,
      adminEmailHtml(data),
      data.email
    ),
    sendEmail(
      resend,
      data.email,
      "Votre demande a bien été reçue",
      clientEmailHtml(data)
    ),
  ]);

  return { admin, client };
}
