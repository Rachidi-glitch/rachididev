"use client";

import { useState, useTransition } from "react";
import { IconLoader2, IconTrash } from "@tabler/icons-react";
import { deleteArticle } from "@/app/admin/articles/actions";

export function ArticleRowActions({
  id,
  title,
}: {
  id: string;
  title: string;
}) {
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (!window.confirm(`Supprimer « ${title} » ? Cette action est définitive.`)) {
      return;
    }

    setError("");
    startTransition(async () => {
      try {
        await deleteArticle(id);
      } catch {
        setError("Impossible de supprimer cet article. Actualisez puis réessayez.");
      }
    });
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={handleDelete}
        disabled={isPending}
        aria-label={`Supprimer ${title}`}
        className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-muted transition hover:border-red-400/40 hover:bg-red-400/10 hover:text-red-300 disabled:opacity-50"
      >
        {isPending ? (
          <IconLoader2 className="animate-spin" size={18} />
        ) : (
          <IconTrash size={18} />
        )}
      </button>
      {error && (
        <span
          role="alert"
          className="absolute right-0 top-full z-10 mt-2 w-56 rounded-lg border border-red-400/30 bg-dark-card p-2 text-xs text-red-300"
        >
          {error}
        </span>
      )}
    </div>
  );
}
