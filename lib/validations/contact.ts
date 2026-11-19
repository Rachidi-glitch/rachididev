import { z } from "zod";

export const projectTypes = [
  "Site vitrine",
  "Site WordPress",
  "E-commerce",
  "WooCommerce",
  "Application web",
  "SaaS",
  "API / Backend",
  "Maintenance",
  "Autre",
] as const;

export const budgets = [
  "Moins de 250 €",
  "250 € - 500 €",
  "500 € - 1 000 €",
  "1 000 € - 2 500 €",
  "Plus de 2 500 €",
  "À définir",
] as const;

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Le nom doit contenir au moins 2 caractères.")
    .max(100, "Le nom est trop long."),
  email: z.string().email("Merci de renseigner une adresse email valide."),
  phone: z.string().max(30, "Le numéro est trop long.").optional().or(z.literal("")),
  projectType: z.enum(projectTypes, {
    error: "Merci de sélectionner un type de projet.",
  }),
  budget: z.enum(budgets).optional().or(z.literal("")),
  deadline: z.string().max(100).optional().or(z.literal("")),
  message: z
    .string()
    .min(10, "Merci de décrire votre projet en quelques mots (10 caractères min).")
    .max(3000, "Le message est trop long."),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
