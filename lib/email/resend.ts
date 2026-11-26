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

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character];
  });
}

function adminEmailHtml(data: ContactFormValues) {
  const name = escapeHtml(data.name);
  const email = escapeHtml(data.email);
  const phone = escapeHtml(data.phone || "Non renseigné");
  const projectType = escapeHtml(data.projectType);
  const budget = escapeHtml(data.budget || "Non renseigné");
  const deadline = escapeHtml(data.deadline || "Non renseigné");
  const message = escapeHtml(data.message);

  return `
  <div style="font-family: Arial, sans-serif; background:#020B18; padding:32px; color:#ffffff;">
    <div style="max-width:560px; margin:0 auto; background:#081B30; border:1px solid rgba(255,255,255,0.1); border-radius:16px; padding:32px;">
      <h1 style="color:#0A84FF; font-size:20px; margin-bottom:16px;">Nouvelle demande de devis</h1>
      <p><strong>Nom :</strong> ${name}</p>
      <p><strong>Email :</strong> ${email}</p>
      <p><strong>Téléphone :</strong> ${phone}</p>
      <p><strong>Type de projet :</strong> ${projectType}</p>
      <p><strong>Budget :</strong> ${budget}</p>
      <p><strong>Délai souhaité :</strong> ${deadline}</p>
      <p><strong>Message :</strong></p>
      <p style="white-space:pre-line; color:#A8B7C8;">${message}</p>
      <a href="mailto:${email}" style="display:inline-block; margin-top:24px; background:#0A84FF; color:#fff; text-decoration:none; padding:10px 20px; border-radius:8px;">
        Répondre à ${name}
      </a>
    </div>
  </div>`;
}

function clientEmailHtml(data: ContactFormValues) {
  const name = escapeHtml(data.name);
  const projectType = escapeHtml(data.projectType);

  return `
  <div style="font-family: Arial, sans-serif; background:#020B18; padding:32px; color:#ffffff;">
    <div style="max-width:560px; margin:0 auto; background:#081B30; border:1px solid rgba(255,255,255,0.1); border-radius:16px; padding:32px;">
      <h1 style="color:#0A84FF; font-size:22px;">Merci pour votre confiance, ${name} !</h1>
      <p style="color:#A8B7C8; line-height:1.7;">
        Votre demande concernant votre projet <strong style="color:#ffffff;">${projectType}</strong> a bien été reçue. Merci d’avoir pris le temps de m’expliquer votre idée : chaque détail m’aide à mieux comprendre ce que vous souhaitez construire.
      </p>
      <p style="color:#A8B7C8; line-height:1.7;">
        Je vais étudier attentivement vos besoins, vos objectifs et les informations transmises. Je reviendrai personnellement vers vous pour échanger sur les prochaines étapes, préciser les points utiles et vous proposer une réponse ainsi qu’un devis adaptés à votre projet — pas une formule toute faite.
      </p>
      <div style="margin:24px 0; padding:18px 20px; border-left:3px solid #0A84FF; background:rgba(10,132,255,0.08); border-radius:8px;">
        <p style="margin:0; color:#ffffff; font-weight:600;">Et maintenant ?</p>
        <p style="margin:8px 0 0; color:#A8B7C8; line-height:1.6;">
          Vous n’avez aucune démarche supplémentaire à effectuer pour le moment. Si vous souhaitez ajouter une précision ou une référence, répondez simplement à cet e-mail : elle sera prise en compte dans l’étude de votre demande.
        </p>
      </div>
      <p style="color:#A8B7C8; line-height:1.7;">
        Votre projet mérite une attention sérieuse. Je vous recontacte dès que j’aurai examiné votre demande afin que nous puissions avancer avec une vision claire et concrète.
      </p>
      <p style="color:#A8B7C8; line-height:1.7;">À très bientôt,<br/><strong style="color:#ffffff;">RachidiDev</strong><br/>Développeur web fullstack &amp; WordPress</p>
    </div>
  </div>`;
}

export type EmailDeliveryResult =
  | { sent: true; id?: string }
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
  fromEmail: string,
  recipient: string,
  kind: "notification à l’administrateur" | "confirmation au demandeur",
  subject: string,
  html: string,
  replyTo?: string
): Promise<EmailDeliveryResult> {
  try {
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: recipient,
      subject,
      html,
      ...(replyTo ? { replyTo } : {}),
    });

    if (error) {
      console.error(`Resend a refusé l'e-mail (${kind}) :`, error);
      return { sent: false, error: getSafeErrorMessage(error) };
    }

    console.info(
      `Resend a accepté l'e-mail (${kind}), identifiant : ${data?.id ?? "indisponible"}`
    );
    return { sent: true, id: data?.id };
  } catch (error) {
    console.error(`Échec réseau lors de l'envoi (${kind}) :`, error);
    return { sent: false, error: getSafeErrorMessage(error) };
  }
}

export async function sendQuoteNotificationEmails(data: ContactFormValues) {
  const resend = getResendClient();
  const adminEmail = process.env.CONTACT_EMAIL;
  const clientFromEmail = process.env.RESEND_FROM_EMAIL?.trim();
  const adminFromEmail = process.env.RESEND_ADMIN_FROM_EMAIL?.trim();

  if (!adminEmail) {
    throw new Error("CONTACT_EMAIL n'est pas configuré.");
  }

  if (!clientFromEmail) {
    throw new Error("RESEND_FROM_EMAIL n'est pas configurée.");
  }

  if (!adminFromEmail) {
    throw new Error("RESEND_ADMIN_FROM_EMAIL n'est pas configurée.");
  }

  const [admin, client] = await Promise.all([
    sendEmail(
      resend,
      adminFromEmail,
      adminEmail,
      "notification à l’administrateur",
      `Nouvelle demande de devis — ${data.name}`,
      adminEmailHtml(data),
      data.email
    ),
    sendEmail(
      resend,
      clientFromEmail,
      data.email,
      "confirmation au demandeur",
      "Votre demande a bien été reçue",
      clientEmailHtml(data)
    ),
  ]);

  return { admin, client };
}
