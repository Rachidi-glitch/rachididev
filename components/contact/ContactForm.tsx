"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "motion/react";
import { IconCheck, IconLoader2, IconSend } from "@tabler/icons-react";
import {
  budgets,
  contactFormSchema,
  projectTypes,
  type ContactFormValues,
} from "@/lib/validations/contact";
import { submitQuoteRequest } from "@/lib/actions/submit-quote-request";
import { Button } from "@/components/ui/Button";

const inputClasses =
  "w-full rounded-xl border border-white/10 bg-dark-card/60 px-4 py-3 text-sm text-white placeholder:text-muted focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30";
const selectClasses = inputClasses;

const labelClasses = "mb-2 block text-sm font-medium text-white";

export function ContactForm() {
  const [feedback, setFeedback] = useState<{
    type: "success" | "warning" | "error";
    message: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = async (values: ContactFormValues) => {
    setFeedback(null);
    const result = await submitQuoteRequest(values);

    if (result.status === "success" || result.status === "warning") {
      setFeedback({
        type: result.status,
        message: result.message ?? "",
      });
      reset();
    } else {
      setFeedback({
        type: "error",
        message: result.message ?? "Une erreur est survenue.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClasses}>
            Nom complet *
          </label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            className={inputClasses}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            {...register("name")}
          />
          {errors.name && (
            <p id="name-error" className="mt-2 text-xs text-red-400">
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className={labelClasses}>
            Email *
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            className={inputClasses}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            {...register("email")}
          />
          {errors.email && (
            <p id="email-error" className="mt-2 text-xs text-red-400">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className={labelClasses}>
            Téléphone
          </label>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            className={inputClasses}
            {...register("phone")}
          />
        </div>

        <div>
          <label htmlFor="projectType" className={labelClasses}>
            Type de projet *
          </label>
          <select
            id="projectType"
            className={selectClasses}
            defaultValue=""
            aria-invalid={!!errors.projectType}
            {...register("projectType")}
          >
            <option value="" disabled className="bg-dark-card text-white">
              Sélectionnez un type de projet
            </option>
            {projectTypes.map((type) => (
              <option
                key={type}
                value={type}
                className="bg-dark-card text-white"
              >
                {type}
              </option>
            ))}
          </select>
          {errors.projectType && (
            <p className="mt-2 text-xs text-red-400">
              {errors.projectType.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="budget" className={labelClasses}>
            Budget estimatif
          </label>
          <select
            id="budget"
            className={selectClasses}
            defaultValue=""
            {...register("budget")}
          >
            <option value="" className="bg-dark-card text-white">
              Sélectionnez un budget
            </option>
            {budgets.map((budget) => (
              <option
                key={budget}
                value={budget}
                className="bg-dark-card text-white"
              >
                {budget}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="deadline" className={labelClasses}>
            Délai souhaité
          </label>
          <input
            id="deadline"
            type="text"
            placeholder="Ex : 1 mois, dès que possible..."
            className={inputClasses}
            {...register("deadline")}
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelClasses}>
          Message *
        </label>
        <textarea
          id="message"
          rows={5}
          className={inputClasses}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          {...register("message")}
        />
        {errors.message && (
          <p id="message-error" className="mt-2 text-xs text-red-400">
            {errors.message.message}
          </p>
        )}
      </div>

      {feedback && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          role="status"
          className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-sm ${
            feedback.type === "success"
              ? "border-brand/40 bg-brand/10 text-brand-light"
              : feedback.type === "warning"
                ? "border-amber-400/40 bg-amber-400/10 text-amber-200"
                : "border-red-400/40 bg-red-400/10 text-red-300"
          }`}
        >
          {feedback.type === "success" && <IconCheck size={16} />}
          {feedback.message}
        </motion.div>
      )}

      <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <IconLoader2 size={18} className="animate-spin" /> Envoi en cours...
          </>
        ) : (
          <>
            <IconSend size={18} /> Envoyer ma demande
          </>
        )}
      </Button>
    </form>
  );
}
