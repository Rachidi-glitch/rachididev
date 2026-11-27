"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { assertAdmin } from "@/lib/admin-auth";
import { getAdminArticles } from "@/lib/blog-store";

const articleSchema = z.object({
  id: z.string().optional(),
  title: z.string().trim().min(4).max(140),
  slug: z
    .string()
    .trim()
    .min(3)
    .max(120)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Le slug doit être en minuscules, sans espace."),
  excerpt: z.string().trim().min(20).max(300),
  category: z.string().trim().min(2).max(60),
  introduction: z.string().trim().min(20).max(2000),
  body: z.string().trim().min(50).max(50000),
  coverImage: z
    .string()
    .trim()
    .min(1)
    .refine(
      (value) => value.startsWith("/") || /^https:\/\/\S+$/i.test(value),
      "L’image doit être un chemin local ou une URL HTTPS."
    ),
  coverAlt: z.string().trim().min(5).max(180),
  status: z.enum(["draft", "published"]),
});

export type ArticleActionState = {
  error?: string;
};

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

function estimateReadingTime(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export async function saveArticle(
  _previousState: ArticleActionState,
  formData: FormData
): Promise<ArticleActionState> {
  await assertAdmin();

  const parsed = articleSchema.safeParse({
    id: getString(formData, "id") || undefined,
    title: getString(formData, "title"),
    slug: getString(formData, "slug"),
    excerpt: getString(formData, "excerpt"),
    category: getString(formData, "category"),
    introduction: getString(formData, "introduction"),
    body: getString(formData, "body"),
    coverImage: getString(formData, "coverImage"),
    coverAlt: getString(formData, "coverAlt"),
    status: getString(formData, "status"),
  });

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "Vérifiez les champs de l’article.",
    };
  }

  const { id, ...article } = parsed.data;
  const previous = id
    ? (await getAdminArticles()).find((post) => post.id === id)
    : undefined;

  if (id && !previous) {
    return { error: "Cet article n’existe plus. Actualisez la page." };
  }

  const articleWithSlug = await prisma.blogPost.findUnique({
    where: { slug: article.slug },
    select: { id: true },
  });
  if (articleWithSlug && articleWithSlug.id !== previous?.id) {
    return { error: "Ce slug est déjà utilisé par un autre article." };
  }
  if (
    !previous &&
    (await getAdminArticles()).some((post) => post.slug === article.slug)
  ) {
    return {
      error: "Ce slug correspond déjà à un article existant. Ouvrez-le pour le modifier.",
    };
  }

  try {
    await prisma.$transaction(async (transaction) => {
      if (previous?.id.startsWith("legacy:") && previous.slug !== article.slug) {
        await transaction.blogPost.upsert({
          where: { slug: previous.slug },
          create: {
            slug: previous.slug,
            title: previous.title,
            excerpt: previous.excerpt,
            category: previous.category,
            readingTime: previous.readingTime,
            coverImage: previous.coverImage,
            coverAlt: previous.coverAlt,
            introduction: previous.introduction,
            body: previous.body,
            status: "deleted",
            publishedAt: null,
          },
          update: {
            status: "deleted",
            publishedAt: null,
          },
        });
      }

      await transaction.blogPost.upsert({
        where: { slug: article.slug },
        create: {
          ...article,
          publishedAt: article.status === "published" ? new Date() : null,
          readingTime: estimateReadingTime(article.body),
        },
        update: {
          title: article.title,
          excerpt: article.excerpt,
          category: article.category,
          introduction: article.introduction,
          body: article.body,
          coverImage: article.coverImage,
          coverAlt: article.coverAlt,
          status: article.status,
          publishedAt:
            article.status === "published"
              ? (previous?.publishedAt ?? new Date())
              : null,
          readingTime: estimateReadingTime(article.body),
        },
      });
    });
  } catch (error) {
    const code =
      typeof error === "object" && error !== null && "code" in error
        ? error.code
        : undefined;
    if (code === "P2002") {
      return { error: "Ce slug est déjà utilisé par un autre article." };
    }
    console.error("Échec lors de l’enregistrement de l’article :", error);
    return {
      error: "L’article n’a pas pu être enregistré. Vérifiez la connexion à la base de données.",
    };
  }

  revalidatePath("/blog");
  revalidatePath(`/blog/${article.slug}`);
  revalidatePath("/sitemap.xml");
  revalidatePath("/admin/articles");
  redirect("/admin/articles?saved=1");
}

export async function deleteArticle(id: string) {
  await assertAdmin();
  const article = (await getAdminArticles()).find((post) => post.id === id);
  if (!article) {
    throw new Error("Cet article n’existe plus.");
  }

  if (id.startsWith("legacy:")) {
    await prisma.blogPost.create({
      data: {
        slug: article.slug,
        title: article.title,
        excerpt: article.excerpt,
        category: article.category,
        publishedAt: null,
        readingTime: article.readingTime,
        coverImage: article.coverImage,
        coverAlt: article.coverAlt,
        introduction: article.introduction,
        body: article.body,
        status: "deleted",
      },
    });
  } else {
    await prisma.blogPost.delete({ where: { id } });
  }

  revalidatePath("/blog");
  revalidatePath(`/blog/${article.slug}`);
  revalidatePath("/sitemap.xml");
  revalidatePath("/admin/articles");
}
