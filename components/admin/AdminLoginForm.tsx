"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IconEye, IconEyeOff, IconLoader2, IconLock } from "@tabler/icons-react";
import { authClient } from "@/lib/auth-client";

export function AdminLoginForm() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");
    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    startTransition(async () => {
      const { error } = await authClient.signIn.email({
        email,
        password,
        rememberMe: true,
      });

      if (error) {
        setErrorMessage(
          "Connexion impossible. Vérifiez vos identifiants puis réessayez."
        );
        return;
      }

      router.replace("/admin/articles");
      router.refresh();
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label
          htmlFor="admin-email"
          className="mb-2 block text-sm font-medium text-white"
        >
          Adresse e-mail
        </label>
        <input
          id="admin-email"
          name="email"
          type="email"
          autoComplete="username"
          required
          className="w-full rounded-xl border border-white/10 bg-dark/60 px-4 py-3 text-sm text-white outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
          placeholder="admin@exemple.com"
        />
      </div>
      <div>
        <label
          htmlFor="admin-password"
          className="mb-2 block text-sm font-medium text-white"
        >
          Mot de passe
        </label>
        <div className="relative">
          <input
            id="admin-password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            required
            minLength={8}
            className="w-full rounded-xl border border-white/10 bg-dark/60 px-4 py-3 pr-12 text-sm text-white outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
            placeholder="Votre mot de passe"
          />
          <button
            type="button"
            onClick={() => setShowPassword((visible) => !visible)}
            className="absolute inset-y-0 right-0 flex items-center px-4 text-muted transition hover:text-white"
            aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
          >
            {showPassword ? <IconEyeOff size={18} /> : <IconEye size={18} />}
          </button>
        </div>
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
        {isPending ? "Connexion…" : "Se connecter"}
      </button>
      <div className="text-center">
        <Link
          href="/admin/forgot-password"
          className="text-sm font-medium text-brand-light transition hover:text-white"
        >
          Mot de passe oublié ?
        </Link>
      </div>
    </form>
  );
}
