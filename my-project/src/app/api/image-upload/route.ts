import { imageUploadSchema } from "@/lib/validations/imageUploadSchema";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth/authOptions";
import cloudinary from "@/lib/cloudinary";
import type { UploadApiResponse } from "cloudinary";
import { Readable } from "stream";

// ----------------- API RESPONSE TYPES -----------------
type ApiResponse<T = null> = {
  success: boolean;
  data: T | null;
  error: string | null;
};

type UploadResponse = {
  petId: string;
  imageUrl: string;
};

// ----------------- ENV & DEV LOGGING -----------------
const isDev = process.env.NODE_ENV !== "production";

function devLog(...args: unknown[]) {
  if (isDev) console.log(...args);
}

// ----------------- HELPERS -----------------
function success<T>(data: T): ApiResponse<T> {
  return { success: true, data, error: null };
}

function failure(message: string): ApiResponse<null> {
  return { success: false, data: null, error: message };
}

// Convert File → Node stream
function fileToNodeStream(file: File): NodeJS.ReadableStream {
  const reader = file.stream().getReader();

  async function* streamGenerator() {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (value) yield value;
    }
  }

  return Readable.from(streamGenerator());
}

// ----------------- POST -----------------
export async function POST(req: Request) {
  devLog("🔐 Starting image upload");

  // ---- AUTH ----
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(failure("You must be logged in."), { status: 401 });
  }

  try {
    const formData = await req.formData();
    const image = formData.get("image");
    const petId = formData.get("petId");

    // ---- VALIDATION ----
    const validation = imageUploadSchema.safeParse({ image, petId });
    if (!validation.success) {
      const err =
        validation.error.flatten().fieldErrors.image?.[0] ||
        validation.error.flatten().fieldErrors.petId?.[0] ||
        "Validation failed";
      return NextResponse.json(failure(err), { status: 400 });
    }

    const { image: validatedImage, petId: validatedPetId } = validation.data;

    // ---- OWNERSHIP CHECK ----
    const pet = await prisma.pet.findFirst({
      where: {
        id: validatedPetId,
        ownerId: session.user.id,
      },
    });

    if (!pet) {
      return NextResponse.json(
        failure("Pet not found or unauthorized."),
        { status: 404 }
      );
    }

    devLog("✅ Pet verified:", pet.name);

    // ---- CLOUDINARY UPLOAD (REPLACE-SAFE) ----
    const nodeStream = fileToNodeStream(validatedImage);

    const uploadedImage: UploadApiResponse = await new Promise(
      (resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: `users/${session.user.id}/pets`,
            public_id: `pet_${validatedPetId}`, // 🔥 STABLE ID
            overwrite: true,                   // 🔁 Replace asset
            invalidate: true,                  // 🧹 Clear CDN cache
            resource_type: "image",
            allowed_formats: ["png", "jpg", "jpeg", "webp"],
          },
          (error, result) => {
            if (error) return reject(error);
            if (!result) return reject(new Error("No Cloudinary result"));
            resolve(result);
          }
        );

        nodeStream.pipe(uploadStream);
      }
    );

    devLog("☁️ Cloudinary upload complete:", uploadedImage.secure_url);

    // ---- DB UPDATE ----
    const updatedPet = await prisma.pet.update({
      where: { id: validatedPetId },
      data: { image: uploadedImage.secure_url },
    });

    devLog("💾 Database updated");

    return NextResponse.json(
      success<UploadResponse>({
        petId: updatedPet.id,
        imageUrl: updatedPet.image ?? "",
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Image upload error:", error);
    return NextResponse.json(
      failure("An unexpected error occurred."),
      { status: 500 }
    );
  }
}
