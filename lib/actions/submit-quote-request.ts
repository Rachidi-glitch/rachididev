"use server";

import { prisma } from "@/lib/prisma";
import {
  contactFormSchema,
  type ContactFormValues,
} from "@/lib/validations/contact";

export type SubmitQuoteState = {
  status: "idle" | "success" | "error";
  message?: string;
};

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

  if (!process.env.DATABASE_URL) {
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
      message:
        "Votre demande n’a pas pu être enregistrée. Vérifiez la connexion PostgreSQL et la disponibilité de la table des demandes, puis réessayez.",
    };
  }

  try {
    const { sendQuoteNotificationEmails } = await import("@/lib/email/resend");
    await sendQuoteNotificationEmails(parsed.data);
  } catch (err) {
    console.error(
      "La demande est enregistrée, mais l'envoi des notifications e-mail a échoué :",
      err
    );
    return {
      status: "success",
      message:
        "Votre demande est bien enregistrée. Cependant, l’e-mail de confirmation n’a pas pu être envoyé. Je reviendrai vers vous prochainement.",
    };
  }

  return {
    status: "success",
    message:
      "Votre demande a bien été envoyée. Je reviens vers vous très prochainement !",
  };
}
