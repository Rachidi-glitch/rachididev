"use server";

import { prisma } from "@/lib/prisma";
import {
  contactFormSchema,
  type ContactFormValues,
} from "@/lib/validations/contact";

export type SubmitQuoteState = {
  status: "idle" | "success" | "warning" | "error";
  message?: string;
};

function getDatabaseErrorMessage(error: unknown) {
  const code =
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    typeof error.code === "string"
      ? error.code
      : undefined;

  if (code === "P2021") {
    return "La table des demandes n’existe pas encore. Exécutez « pnpm db:push » puis réessayez.";
  }

  if (code === "P2022") {
    return "La structure de la table des demandes ne correspond pas au schéma Prisma. Exécutez « pnpm db:push » puis réessayez.";
  }

  if (code === "P1000" || code === "P1001" || code === "P1002") {
    return "La connexion à la base PostgreSQL a échoué. Vérifiez DATABASE_URL, le mot de passe et l’accès réseau.";
  }

  return "Votre demande n’a pas pu être enregistrée. Vérifiez les paramètres de connexion PostgreSQL et la configuration du schéma Prisma.";
}

export async function submitQuoteRequest(
  values: ContactFormValues
): Promise<SubmitQuoteState> {
  const parsed = contactFormSchema.safeParse(values);

  if (!parsed.success) {
    return {
      status: "error",
      message: "Merci de vérifier les champs du formulaire.",
    };
  }

  if (!process.env.DATABASE_URL?.trim()) {
    console.error("DATABASE_URL n'est pas configurée.");
    return {
      status: "error",
      message:
        "Le formulaire est temporairement indisponible : la connexion à la base de données n’est pas configurée.",
    };
  }

  try {
    await prisma.quoteRequest.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone || null,
        projectType: parsed.data.projectType,
        budget: parsed.data.budget || null,
        deadline: parsed.data.deadline || null,
        message: parsed.data.message,
        status: "new",
      },
    });
  } catch (err) {
    console.error("Erreur lors de l'enregistrement de la demande :", err);
    return {
      status: "error",
      message: getDatabaseErrorMessage(err),
    };
  }

  let emailResult: Awaited<
    ReturnType<
      (typeof import("@/lib/email/resend"))["sendQuoteNotificationEmails"]
    >
  >;

  try {
    const { sendQuoteNotificationEmails } = await import("@/lib/email/resend");
    emailResult = await sendQuoteNotificationEmails(parsed.data);
  } catch (error) {
    console.error("Configuration d'envoi Resend invalide :", error);
    const detail =
      error instanceof Error ? error.message : "Erreur de configuration Resend.";

    return {
      status: "warning",
      message: `Votre demande est enregistrée, mais les e-mails n’ont pas pu être envoyés : ${detail}`,
    };
  }

  const failedDeliveries = [
    !emailResult.admin.sent
      ? `notification à l’administrateur : ${emailResult.admin.error}`
      : null,
    !emailResult.client.sent
      ? `confirmation au demandeur : ${emailResult.client.error}`
      : null,
  ].filter((failure): failure is string => failure !== null);

  if (failedDeliveries.length > 0) {
    return {
      status: "warning",
      message: `Votre demande est enregistrée, mais ${failedDeliveries.join(" ; ")}.`,
    };
  }

  return {
    status: "success",
    message:
      "Votre demande est bien enregistrée et les e-mails ont été transmis au service d’envoi. Je reviens vers vous très prochainement. Si vous ne recevez pas la confirmation, pensez à vérifier vos courriers indésirables.",
  };
}
