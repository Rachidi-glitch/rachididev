import { betterAuth } from "better-auth";
import { prismaAdapter } from "@better-auth/prisma-adapter";
import { nextCookies } from "better-auth/next-js";
import { admin } from "better-auth/plugins";
import { after } from "next/server";
import { Resend } from "resend";
import { prisma } from "@/lib/prisma";

const isDevelopment = process.env.NODE_ENV === "development";
const baseURL =
  process.env.BETTER_AUTH_URL ||
  (isDevelopment ? "http://localhost:3000" : "https://rachididev.site");

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

async function sendPasswordResetEmail(email: string, url: string) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL?.trim();
  if (!apiKey || !from) {
    throw new Error("La configuration Resend pour la réinitialisation est incomplète.");
  }

  const safeUrl = escapeHtml(url);
  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to: email,
    subject: "Réinitialisation du mot de passe RachidiDev",
    text: `Vous avez demandé à réinitialiser le mot de passe de votre espace éditorial.\n\nUtilisez ce lien temporaire pour choisir un nouveau mot de passe :\n${url}\n\nSi vous n'êtes pas à l'origine de cette demande, ignorez cet e-mail.`,
    html: `
      <div style="font-family:Arial,sans-serif;background:#020B18;padding:32px;color:#ffffff">
        <div style="max-width:560px;margin:0 auto;background:#081B30;border:1px solid rgba(255,255,255,.1);border-radius:16px;padding:32px">
          <h1 style="color:#0A84FF;font-size:22px">Réinitialisation de votre mot de passe</h1>
          <p style="color:#A8B7C8;line-height:1.7">Une demande de réinitialisation a été faite pour votre espace éditorial RachidiDev. Cliquez sur le bouton ci-dessous pour choisir un nouveau mot de passe.</p>
          <p style="margin:28px 0">
            <a href="${safeUrl}" style="display:inline-block;background:#0A84FF;color:#ffffff;text-decoration:none;padding:13px 20px;border-radius:10px;font-weight:600">Choisir un nouveau mot de passe</a>
          </p>
          <p style="color:#A8B7C8;line-height:1.7">Si vous n'êtes pas à l'origine de cette demande, ignorez cet e-mail. Votre mot de passe ne sera pas modifié.</p>
          <p style="color:#718096;font-size:12px;line-height:1.6">Si le bouton ne fonctionne pas, copiez ce lien dans votre navigateur :<br/><a href="${safeUrl}" style="color:#7DB8FF;word-break:break-all">${safeUrl}</a></p>
        </div>
      </div>`,
  });

  if (error) {
    throw error;
  }
}

export const auth = betterAuth({
  appName: "RachidiDev",
  baseURL,
  trustedOrigins: [
    baseURL,
    ...(isDevelopment
      ? ["http://localhost:3000", "http://127.0.0.1:3000"]
      : []),
  ],
  secret: process.env.BETTER_AUTH_SECRET,
  database: prismaAdapter(prisma, {
    provider: "postgresql",
    transaction: true,
  }),
  emailAndPassword: {
    enabled: true,
    disableSignUp: true,
    minPasswordLength: 12,
    maxPasswordLength: 128,
    revokeSessionsOnPasswordReset: true,
    sendResetPassword: async ({ user, url }) => {
      after(async () => {
        try {
          await sendPasswordResetEmail(user.email, url);
        } catch (error) {
          console.error("Échec de l'envoi du lien de réinitialisation :", error);
        }
      });
    },
  },
  plugins: [
    admin({
      defaultRole: "user",
      adminRoles: ["admin"],
    }),
    nextCookies(),
  ],
});
