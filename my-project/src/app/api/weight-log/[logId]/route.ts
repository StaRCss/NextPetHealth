import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

// Validation schema
const updateSchema = z.object({
  weight: z.number().positive(),
  notes: z.string().optional(),
});

export async function PUT(req: NextRequest, { params }: { params: { logId: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const parsed = updateSchema.parse(body);

    // Fetch log with pet owner
    const log = await prisma.weightLog.findUnique({
      where: { id: params.logId },
      include: { pet: true },
    });

    if (!log || log.pet.ownerId !== session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const updatedLog = await prisma.weightLog.update({
      where: { id: params.logId },
      data: {
        weight: parsed.weight,
        notes: parsed.notes,
      },
    });

    return NextResponse.json(updatedLog);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to update weight log" }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { logId: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Fetch log with pet owner
    const log = await prisma.weightLog.findUnique({
      where: { id: params.logId },
      include: { pet: true },
    });

    if (!log || log.pet.ownerId !== session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await prisma.weightLog.delete({
      where: { id: params.logId },
    });

    return NextResponse.json({ message: "Weight log deleted successfully" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to delete weight log" }, { status: 400 });
  }
}
