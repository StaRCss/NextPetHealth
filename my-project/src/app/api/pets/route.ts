import { NextResponse } from 'next/server';
import { z } from 'zod';
import { petFormSchema } from '@/lib/validations/PetFormSchema';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/validations/auth/authOptions';// adjust the path as needed
import { PrismaClient } from '@prisma/client';
import { PetFormValues } from '@/components/pets/AddPetForm';

const prisma = new PrismaClient();

//Helper to clean data
function normalizeData(data:PetFormValues): PetFormValues {
  const normalized: PetFormValues = {
    name: data.name.trim(),
    gender: data.gender?.trim() || null,
    breed:  data.breed?.trim() || null,
    birthday: new Date(data.birthday).toISOString().split('T')[0] ,
  };
  return normalized;
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const {name, breed, birthday, gender} = body;

    // Validate and normalize data
    const validatedData = normalizeData(petFormSchema.parse({ name, breed, birthday, gender }));
    console.log('Validated data:', validatedData); // Debugging line


    await prisma.pet.create({
      data: {
        name: validatedData.name,
        gender: validatedData.gender as 'male' | 'female' | null,
        ownerId: session.user.id,
        breed: validatedData.breed,
        birthday: new Date(validatedData.birthday),
      }
    });

    return NextResponse.json(
      {
        message: 'Pet added successfully!'
      },
      { status: 201 }
    );
  }
   catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ errors: error.flatten() }, { status: 400 });
    }
    return NextResponse.json({ message: 'An unexpected error occurred.' }, { status: 500 });
  }
}
