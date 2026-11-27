"use client";

import { useActionState, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { upload } from "@vercel/blob/client";
import {
  IconArrowLeft,
  IconDeviceFloppy,
  IconLoader2,
  IconPhoto,
  IconSend,
} from "@tabler/icons-react";
import Link from "next/link";
import { saveArticle } from "@/app/admin/articles/actions";
import type { BlogArticle } from "@/lib/blog-store";

const initialState = {};

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function ArticleEditor({ article }: { article?: BlogArticle }) {
  const [state, formAction, isSaving] = useActionState(saveArticle, initialState);
  const [title, setTitle] = useState(article?.title ?? "");
  const [slug, setSlug] = useState(article?.slug ?? "");
  const [slugWasEdited, setSlugWasEdited] = useState(Boolean(article));
  const [coverImage, setCoverImage] = useState(article?.coverImage ?? "");
  const [uploadError, setUploadError] = useState("");
  const [isUploading, startUpload] = useTransition();
  const router = useRouter();

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    if (!file) return;

    setUploadError("");
    if (!["image/jpeg", "image/png", "image/webp", "image/avif"].includes(file.type)) {
      setUploadError("Choisissez une image JPEG, PNG, WebP ou AVIF.");
      event.currentTarget.value = "";
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setUploadError("L’image ne doit pas dépasser 5 Mo.");
      event.currentTarget.value = "";
      return;
    }

    startUpload(async () => {
      try {
        const result = await upload(
          `blog-covers/${file.name}`,
          file,
          {
            access: "public",
            handleUploadUrl: "/api/admin/blog/upload",
          }
        );
        setCoverImage(result.url);
        router.refresh();
      } catch {
        setUploadError(
          "L’image n’a pas pu être téléversée. Vérifiez la configuration Vercel Blob et votre connexion."
        );
      }
    });
    event.currentTarget.value = "";
  };

  return (
    <form action={formAction} className="space-y-7">
      {article && <input type="hidden" name="id" value={article.id} />}

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <Link
          href="/admin/articles"
          className="inline-flex items-center gap-2 text-sm text-muted transition hover:text-white"
        >
          <IconArrowLeft size={17} /> Retour aux articles
        </Link>
        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            name="status"
            value="draft"
            disabled={isSaving || isUploading}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/5 disabled:opacity-50"
          >
            {isSaving ? <IconLoader2 className="animate-spin" size={17} /> : <IconDeviceFloppy size={17} />}
            Enregistrer le brouillon
          </button>
          <button
            type="submit"
            name="status"
            value="published"
            disabled={isSaving || isUploading}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-light disabled:opacity-50"
          >
            {isSaving ? <IconLoader2 className="animate-spin" size={17} /> : <IconSend size={17} />}
            {article?.status === "published" ? "Mettre à jour" : "Publier"}
          </button>
        </div>
      </div>

      {(state.error || uploadError) && (
        <p
          role="alert"
          className="rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-300"
        >
          {state.error || uploadError}
        </p>
      )}

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-6">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-white">Titre de l’article</span>
            <input
              name="title"
              required
              minLength={4}
              maxLength={140}
              value={title}
              onChange={(event) => {
                const nextTitle = event.currentTarget.value;
                setTitle(nextTitle);
                if (!slugWasEdited) setSlug(slugify(nextTitle));
              }}
              className="w-full rounded-xl border border-white/10 bg-dark/70 px-4 py-3 text-lg text-white outline-none transition placeholder:text-muted/70 focus:border-brand focus:ring-2 focus:ring-brand/20"
              placeholder="Ex. Comment améliorer la vitesse de son site ?"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-white">Slug de l’article</span>
            <div className="flex items-center rounded-xl border border-white/10 bg-dark/70 focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/20">
              <span className="whitespace-nowrap pl-4 text-sm text-muted">/blog/</span>
              <input
                name="slug"
                required
                minLength={3}
                maxLength={120}
                pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
                value={slug}
                onChange={(event) => {
                  setSlugWasEdited(true);
                  setSlug(slugify(event.currentTarget.value));
                }}
                className="min-w-0 flex-1 rounded-r-xl bg-transparent px-2 py-3 text-sm text-white outline-none"
                placeholder="mon-super-article"
              />
            </div>
            <span className="mt-1.5 block text-xs text-muted">
              Adresse web en minuscules, sans accents ni espaces.
            </span>
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-white">Résumé affiché sur le blog</span>
            <textarea
              name="excerpt"
              required
              minLength={20}
              maxLength={300}
              rows={3}
              defaultValue={article?.excerpt}
              className="w-full resize-y rounded-xl border border-white/10 bg-dark/70 px-4 py-3 text-sm leading-relaxed text-white outline-none transition placeholder:text-muted/70 focus:border-brand focus:ring-2 focus:ring-brand/20"
              placeholder="Présentez en quelques phrases la valeur de cet article."
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-white">Introduction</span>
            <textarea
              name="introduction"
              required
              minLength={20}
              maxLength={2000}
              rows={5}
              defaultValue={article?.introduction}
              className="w-full resize-y rounded-xl border border-white/10 bg-dark/70 px-4 py-3 text-sm leading-relaxed text-white outline-none transition placeholder:text-muted/70 focus:border-brand focus:ring-2 focus:ring-brand/20"
              placeholder="Accrochez vos lecteurs et expliquez ce qu’ils vont apprendre."
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-white">Corps de l’article</span>
            <textarea
              name="body"
              required
              minLength={50}
              maxLength={50000}
              rows={18}
              defaultValue={article?.body}
              className="w-full resize-y rounded-xl border border-white/10 bg-dark/70 px-4 py-3 font-mono text-sm leading-relaxed text-white outline-none transition placeholder:text-muted/70 focus:border-brand focus:ring-2 focus:ring-brand/20"
              placeholder={"Écrivez en Markdown :\n\n## Un sous-titre\n\nVotre paragraphe...\n\n- Un point important"}
            />
            <span className="mt-1.5 block text-xs text-muted">
              Markdown pris en charge : titres, paragraphes, listes, liens et emphase.
            </span>
          </label>
        </div>

        <aside className="space-y-6">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-white">Catégorie</span>
            <input
              name="category"
              required
              minLength={2}
              maxLength={60}
              defaultValue={article?.category}
              className="w-full rounded-xl border border-white/10 bg-dark/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-muted/70 focus:border-brand focus:ring-2 focus:ring-brand/20"
              placeholder="Développement web"
            />
          </label>

          <div className="rounded-2xl border border-white/10 bg-dark-card/50 p-4">
            <span className="block text-sm font-medium text-white">Image de couverture</span>
            <div className="mt-3 overflow-hidden rounded-xl border border-white/10 bg-dark">
              {coverImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={coverImage}
                  alt="Aperçu de l’image de couverture"
                  className="aspect-video w-full object-cover"
                />
              ) : (
                <div className="flex aspect-video items-center justify-center text-muted">
                  <IconPhoto size={28} />
                </div>
              )}
            </div>
            <input type="hidden" name="coverImage" value={coverImage} />
            <label className="mt-3 flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-white/10 px-3 py-2.5 text-sm font-medium text-white transition hover:bg-white/5 has-disabled:cursor-wait has-disabled:opacity-60">
              {isUploading ? (
                <IconLoader2 className="animate-spin" size={17} />
              ) : (
                <IconPhoto size={17} />
              )}
              {isUploading ? "Téléversement…" : "Choisir une image"}
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/avif"
                onChange={handleUpload}
                disabled={isUploading}
                className="sr-only"
              />
            </label>
            <p className="mt-2 text-xs leading-relaxed text-muted">
              JPEG, PNG, WebP ou AVIF. Maximum 5 Mo.
            </p>
            {uploadError && (
              <p role="alert" className="mt-2 text-xs text-red-300">
                {uploadError}
              </p>
            )}
          </div>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-white">Texte alternatif de l’image</span>
            <input
              name="coverAlt"
              required
              minLength={5}
              maxLength={180}
              defaultValue={article?.coverAlt}
              className="w-full rounded-xl border border-white/10 bg-dark/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-muted/70 focus:border-brand focus:ring-2 focus:ring-brand/20"
              placeholder="Décrivez l’image pour l’accessibilité"
            />
          </label>

          <div className="rounded-xl border border-brand/20 bg-brand/5 p-4 text-sm leading-relaxed text-white/75">
            <p className="font-semibold text-brand-light">Conseil éditorial</p>
            <p className="mt-2">
              Une structure claire et des exemples concrets rendent votre article plus utile et agréable à lire.
            </p>
          </div>
        </aside>
      </div>
    </form>
  );
}
