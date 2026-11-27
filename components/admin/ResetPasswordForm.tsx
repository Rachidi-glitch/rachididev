"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { IconCheck, IconLoader2, IconLock } from "@tabler/icons-react";
import { authClient } from "@/lib/auth-client";

export function ResetPasswordForm({
  token,
  invalidToken,
}: {
  token: string;
  invalidToken: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");
    const formData = new FormData(event.currentTarget);
    const newPassword = String(formData.get("newPassword") ?? "");
    const confirmation = String(formData.get("confirmation") ?? "");

    if (newPassword !== confirmation) {
      setErrorMessage("Les deux mots de passe ne correspondent pas.");
      return;
    }

    startTransition(async () => {
      try {
        const { error } = await authClient.resetPassword({
          newPassword,
          token,
        });

        if (error) {
          setErrorMessage(
            "Ce lien est invalide ou expiré. Demandez un nouveau lien de réinitialisation."
          );
          return;
        }

        setIsComplete(true);
      } catch {
        setErrorMessage(
          "Le mot de passe n’a pas pu être modifié. Demandez un nouveau lien puis réessayez."
        );
      }
    });
  };

  if (isComplete) {
    return (
      <div role="status" className="space-y-5">
        <p className="rounded-xl border border-emerald-400/25 bg-emerald-400/10 px-4 py-4 text-sm leading-relaxed text-emerald-200">
          Votre mot de passe a été modifié. Vous pouvez maintenant vous
          connecter avec votre nouveau mot de passe.
        </p>
        <Link
          href="/admin/login"
          className="inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-light"
        >
          <IconCheck size={18} /> Aller à la connexion
        </Link>
      </div>
    );
  }

  if (!token || invalidToken) {
    return (
      <div className="space-y-5">
        <p
          role="alert"
          className="rounded-xl border border-amber-400/25 bg-amber-400/10 px-4 py-4 text-sm leading-relaxed text-amber-100"
        >
          Ce lien de réinitialisation est invalide ou expiré. Demandez-en un
          nouveau pour continuer.
        </p>
        <Link
          href="/admin/forgot-password"
          className="inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-light"
        >
          Demander un nouveau lien
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label
          htmlFor="new-password"
          className="mb-2 block text-sm font-medium text-white"
        >
          Nouveau mot de passe
        </label>
        <input
          id="new-password"
          name="newPassword"
          type="password"
          autoComplete="new-password"
          minLength={12}
          maxLength={128}
          required
          className="w-full rounded-xl border border-white/10 bg-dark/60 px-4 py-3 text-sm text-white outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
          placeholder="12 caractères minimum"
        />
      </div>

      <div>
        <label
          htmlFor="confirm-password"
          className="mb-2 block text-sm font-medium text-white"
        >
          Confirmer le nouveau mot de passe
        </label>
        <input
          id="confirm-password"
          name="confirmation"
          type="password"
          autoComplete="new-password"
          minLength={12}
          maxLength={128}
          required
          className="w-full rounded-xl border border-white/10 bg-dark/60 px-4 py-3 text-sm text-white outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
          placeholder="Saisissez-le à nouveau"
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
          <IconLock size={18} />
        )}
        {isPending ? "Modification en cours…" : "Modifier le mot de passe"}
      </button>
    </form>
  );
}
