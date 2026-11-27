import "server-only";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function getAdminSession() {
  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  if (!adminEmail) {
    throw new Error("ADMIN_EMAIL n'est pas configurée.");
  }

  const session = await auth.api.getSession({ headers: await headers() });
  if (
    !session ||
    session.user.email.toLowerCase() !== adminEmail ||
    session.user.role !== "admin" ||
    session.user.banned
  ) {
    return null;
  }

  return session;
}

export async function assertAdmin() {
  const session = await getAdminSession();
  if (!session) {
    throw new Error("Accès administrateur requis.");
  }
  return session;
}
