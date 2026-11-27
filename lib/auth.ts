import { betterAuth } from "better-auth";
import { prismaAdapter } from "@better-auth/prisma-adapter";
import { nextCookies } from "better-auth/next-js";
import { admin } from "better-auth/plugins";
import { prisma } from "@/lib/prisma";

const isDevelopment = process.env.NODE_ENV === "development";
const baseURL =
  process.env.BETTER_AUTH_URL ||
  (isDevelopment ? "http://localhost:3000" : "https://rachididev.site");

export const auth = betterAuth({
  appName: "RachidiDev",
  baseURL,
  secret: process.env.BETTER_AUTH_SECRET,
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  emailAndPassword: {
    enabled: true,
    disableSignUp: true,
  },
  plugins: [
    admin({
      defaultRole: "user",
      adminRoles: ["admin"],
    }),
    nextCookies(),
  ],
});
