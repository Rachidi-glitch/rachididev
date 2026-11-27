"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { IconLoader2, IconLogout } from "@tabler/icons-react";
import { authClient } from "@/lib/auth-client";

export function AdminSignOut() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() =>
        startTransition(async () => {
          await authClient.signOut();
          router.replace("/admin/login");
          router.refresh();
        })
      }
      className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-muted transition hover:bg-white/5 hover:text-white disabled:opacity-50"
    >
      {isPending ? (
        <IconLoader2 className="animate-spin" size={17} />
      ) : (
        <IconLogout size={17} />
      )}
      Déconnexion
    </button>
  );
}
