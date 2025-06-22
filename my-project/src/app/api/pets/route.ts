import { NextResponse } from 'next/server';
import { z } from 'zod';
import { petFormSchema } from '@/lib/validations/PetFormSchema';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = petFormSchema.parse(body);

    // Later, you would save this data to your database.
    // For now, we'll just return a success response.

    return NextResponse.json(
      {
        message: 'Pet added successfully!',
        data: validatedData,
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ errors: error.flatten() }, { status: 400 });
    }
    return NextResponse.json({ message: 'An unexpected error occurred.' }, { status: 500 });
  }
} 