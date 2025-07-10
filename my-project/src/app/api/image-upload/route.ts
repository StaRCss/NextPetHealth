import { imageUploadSchema } from "@/lib/validations/imageUploadSchema";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { authOptions } from "@/lib/auth/authOptions";
import { fileTypeFromBuffer } from "file-type";
import path from "path";
import cloudinary from "@/lib/cloudinary";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  console.log("🔐 Starting image upload...");

  const session = await getServerSession(authOptions);
  if (!session) {
    console.log("❌ No session found.");
    return NextResponse.json(
      { message: "You must be logged in to upload an image." },
      { status: 401 }
    );
  }

  try {
    const formData = await req.formData();
    const image = formData.get("image") as File | null;
    const petId = formData.get("petId") as string;

    console.log("📦 Form data received:", { petId, imageType: image?.type });

    if (!image) {
      console.log("❌ No image file provided.");
      return NextResponse.json(
        { message: "No image file provided." },
        { status: 400 }
      );
    }

    // ✅ Step 1: Zod validation
    const validation = imageUploadSchema.safeParse({ image });
    console.log("🧪 Validation result:", validation.success);
    if (!validation.success) {
      console.log("❌ Validation errors:", validation.error.flatten());
      return NextResponse.json(
        { errors: validation.error.flatten() },
        { status: 400 }
      );
    }

    // ✅ Step 2: Check if pet exists and belongs to user
    const pet = await prisma.pet.findFirst({
      where: {
        id: petId,
        ownerId: session.user.id,
      },
    });

    if (!pet) {
      console.log("❌ Pet not found or unauthorized.");
      return NextResponse.json(
        { message: "Pet not found or unauthorized." },
        { status: 404 }
      );
    }

    console.log("✅ Pet found:", pet.name);

    // ✅ Step 3: Convert image to buffer and verify MIME type
    const imageBuffer = Buffer.from(await image.arrayBuffer());
    const fileTypeResult = await fileTypeFromBuffer(imageBuffer);

    console.log("📂 Detected file type:", fileTypeResult);

    if (!fileTypeResult || !fileTypeResult.mime.startsWith("image/")) {
      console.log("❌ Invalid MIME type.");
      return NextResponse.json(
        { message: "Upload file is not a valid image." },
        { status: 400 }
      );
    }

    const allowedTypes = ["image/png", "image/jpeg", "image/webp"];
    if (!allowedTypes.includes(fileTypeResult.mime)) {
      console.log("❌ File type not allowed:", fileTypeResult.mime);
      return NextResponse.json(
        { message: "Image must be png, jpg, or webp." },
        { status: 400 }
      );
    }

    // ✅ Step 4: Sanitize file name
    const baseName = path
      .basename(image.name)
      .replace(/[^a-z0-9_.-]/gi, "_")
      .toLowerCase();

    console.log("🧼 Sanitized base name:", baseName);

    // ✅ Step 5: Upload to Cloudinary
    console.log("☁️ Uploading to Cloudinary...");

    const uploadedImage = await new Promise<any>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "pets",
          public_id: `${petId}-${Date.now()}`,
          resource_type: "image",
        },
        (error, result) => {
          if (error) {
            console.log("❌ Cloudinary error:", error);
            return reject(error);
          }
          resolve(result);
        }
      );

      stream.end(imageBuffer);
    });

    console.log("✅ Cloudinary upload result:", uploadedImage);

    const imageUrl = uploadedImage.secure_url;

    // ✅ Step 6: Save image URL to DB
    const updatedPet = await prisma.pet.update({
      where: { id: petId },
      data: { image: imageUrl },
    });

    console.log("✅ DB updated with new image URL");

    return NextResponse.json(
      { message: "Image uploaded successfully", pet: updatedPet },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Image upload error:", error);
    return NextResponse.json(
      { message: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
