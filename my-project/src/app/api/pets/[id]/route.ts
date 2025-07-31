
import { NextResponse } from 'next/server';
import { petFormSchema } from '@/lib/validations/PetFormSchema';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/validations/auth/authOptions';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { PetFormValues } from '@/components/pets/AddPetForm';

const prisma = new PrismaClient();

function normalizeData(data: PetFormValues): PetFormValues {
  return {
    name: data.name.trim(),
    gender: data.gender?.trim() || null,
    breed: data.breed?.trim() || null,
    birthday: new Date(data.birthday).toISOString().split('T')[0],
  };
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const petId = params.id;

  try {
    const body = await req.json();
    const parsed = petFormSchema.parse(body);
    const data = normalizeData(parsed);

    const existingPet = await prisma.pet.findUnique({
      where: {
        id: petId,
        ownerId: session.user.id, // Ensure user owns the pet
      },
    });

    if (!existingPet) {
      return NextResponse.json({ message: 'Pet not found or not yours.' }, { status: 404 });
    }

    await prisma.pet.update({
      where: { id: petId },
      data: {
        name: data.name,
        gender: data.gender as 'male' | 'female' | null,
        breed: data.breed,
        birthday: new Date(data.birthday),
      },
    });

    return NextResponse.json({ message: 'Pet updated successfully!' });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ errors: error.flatten() }, { status: 400 });
    }

    console.error('Update error:', error);
    return NextResponse.json({ message: 'Something went wrong.' }, { status: 500 });
  }
}
