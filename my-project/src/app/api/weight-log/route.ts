import { NextResponse } from "next/server";
import { z } from "zod";
import { weightLogSchema } from "@/lib/validations/WeightLogSchema";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();

    // Validate incoming request with Zod schema
    const parsedData = weightLogSchema.parse(body);

    // Make sure pet belongs to the current user
    const pet = await prisma.pet.findFirst({
      where: {
        id: parsedData.petId,
        ownerId: session.user.id,
      },
    });

    if (!pet) {
      return NextResponse.json({ message: "Pet not found or unauthorized" }, { status: 404 });
    }

    // Create weight log
    const weightLog = await prisma.weightLog.create({
      data: {
        petId: parsedData.petId,
        weight: parsedData.weight,
        unit: parsedData.unit,
        date: new Date(parsedData.date),
        notes: parsedData.notes || null,
      },
    });

    return NextResponse.json(weightLog, { status: 201 });
  } catch (error) {
    console.error(error);

    if (error instanceof z.ZodError) {
      return NextResponse.json({ errors: error.flatten() }, { status: 400 });
    }

    return NextResponse.json({ message: "An unexpected error occurred." }, { status: 500 });
  }
}
