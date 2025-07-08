import { imageUploadSchema } from "@/lib/validations/imageUploadSchema";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { authOptions } from "@/lib/auth/authOptions";
import { fileTypeFromBuffer } from "file-type";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { message: "You must be logged in to upload an image." },
      { status: 401 }
    );
  }

  try {
    const formData = await req.formData();
    const image = formData.get("image") as File | null;
    const petId = formData.get("petId") as string;

    if (!image) {
      return NextResponse.json(
        { message: "No image file provided." },
        { status: 400 }
      );
    }

    // ✅ Step 1: Validate using Zod schema (client-friendly rules)
    const validation = imageUploadSchema.safeParse({ image });
    if (!validation.success) {
      return NextResponse.json(
        { errors: validation.error.flatten() },
        { status: 400 }
      );
    }

    const pet = await prisma.pet.findFirst({
      where: {
        id: petId,
        ownerId: session.user.id,
      },
    });

    if (!pet) {
      return NextResponse.json(
        { message: "Pet not found or unauthorized." },
        { status: 404 }
      );
    }

        // ✅ Step 2: Convert image to Node.js Buffer
    const imageBuffer = Buffer.from(await image.arrayBuffer());


    // ✅ Step 3: Verify real MIME type using file-type
        const fileTypeResult = await fileTypeFromBuffer(imageBuffer);
        if(!fileTypeResult || !fileTypeResult.mime.startsWith("image/") )
          {
          return NextResponse.json(
            {message:"Upload file is not valid image"},
            {status : 400}
          );
        }

         // ✅ Optional: allow only certain image types
        const allowedTypes = ["image/png" , "image/jpg" , "image/webp"];
        if(!allowedTypes.includes(fileTypeResult.mime))
          {
          return NextResponse.json(
            {message : "Image must be png , jpg or webp"},
            {status : 400}
          );
        }

         // ✅ Step 4: Sanitize original file name
          const baseName = path
          .basename(image.name)
          .replace(/[^a-z0-9_.-]/gi, "_")
          .toLowerCase(); // lower case for consistency


    const imageFileName = `${petId}-${Date.now()}-${baseName}`;
    const imagePath = `/uploads/${imageFileName}`;

    const uploadDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, imageFileName);
    fs.writeFileSync(filePath, imageBuffer);

    const updatedPet = await prisma.pet.update({
      where: { id: petId },
      data: { image: imagePath },
    });

    return NextResponse.json(
      { message: "Image uploaded successfully", pet: updatedPet },
      { status: 200 }
    );
  } catch (error) {
    console.error("Image upload error:", error);
    return NextResponse.json(
      { message: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
