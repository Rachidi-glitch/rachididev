"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { IconArrowLeft, IconLoader2, IconMail } from "@tabler/icons-react";
import { authClient } from "@/lib/auth-client";

export function ForgotPasswordForm() {
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState("");
  const [requestSent, setRequestSent] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");
    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "").trim();

    startTransition(async () => {
      try {
        await authClient.requestPasswordReset({
          email,
          redirectTo: new URL(
            "/admin/reset-password",
            window.location.origin
          ).toString(),
        });

        setRequestSent(true);
      } catch {
        setErrorMessage(
          "La demande n’a pas pu être traitée. Vérifiez votre connexion puis réessayez."
        );
      }
    });
  };

  if (requestSent) {
    return (
      <div role="status" className="space-y-5">
        <p className="rounded-xl border border-emerald-400/25 bg-emerald-400/10 px-4 py-4 text-sm leading-relaxed text-emerald-200">
          Si cette adresse correspond à un compte administrateur, un lien de
          réinitialisation vient d’être envoyé. Pensez à vérifier vos courriers
          indésirables.
        </p>
        <Link
          href="/admin/login"
          className="inline-flex items-center gap-2 text-sm font-medium text-brand-light transition hover:text-white"
        >
          <IconArrowLeft size={17} /> Retour à la connexion
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label
          htmlFor="reset-email"
          className="mb-2 block text-sm font-medium text-white"
        >
          Adresse e-mail administrateur
        </label>
        <input
          id="reset-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="w-full rounded-xl border border-white/10 bg-dark/60 px-4 py-3 text-sm text-white outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
          placeholder="contact@rachididev.site"
        />
      </div>

      {errorMessage && (
        <p
          role="alert"
          className="rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-300"
        >
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-5 py-3.5 text-sm font-semibold text-white shadow-glow transition hover:bg-brand-light disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? (
          <IconLoader2 className="animate-spin" size={18} />
        ) : (
          <IconMail size={18} />
        )}
        {isPending ? "Envoi en cours…" : "Envoyer le lien"}
      </button>

      <Link
        href="/admin/login"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted transition hover:text-white"
      >
        <IconArrowLeft size={17} /> Retour à la connexion
      </Link>
    </form>
  );
}
