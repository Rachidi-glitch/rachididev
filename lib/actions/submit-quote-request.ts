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

    const { sendQuoteNotificationEmails } = await import("@/lib/email/resend");
    await sendQuoteNotificationEmails(parsed.data);

    return {
      status: "success",
      message:
        "Votre demande a bien été envoyée. Je reviens vers vous très prochainement !",
    };
  } catch (err) {
    console.error("Erreur lors de l'envoi de la demande :", err);
    return {
      status: "error",
      message:
        "Une erreur est survenue. Vérifiez DATABASE_URL et la configuration de Resend, ou réessayez plus tard.",
    };
  }
}
