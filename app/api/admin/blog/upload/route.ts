import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { assertAdmin } from "@/lib/admin-auth";

const imageTypes = ["image/jpeg", "image/png", "image/webp", "image/avif"];
const maximumImageSize = 5 * 1024 * 1024;

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as HandleUploadBody;
    const response = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        await assertAdmin();

        if (!pathname.startsWith("blog-covers/")) {
          throw new Error("Chemin d’image non autorisé.");
        }

        return {
          allowedContentTypes: imageTypes,
          maximumSizeInBytes: maximumImageSize,
          addRandomSuffix: true,
        };
      },
    });

    return NextResponse.json(response);
  } catch (error) {
    console.error("Échec du téléversement d’image du blog :", error);
    return NextResponse.json(
      { error: "Téléversement refusé. Vérifiez votre session et le format de l’image." },
      { status: 400 }
    );
  }
}
