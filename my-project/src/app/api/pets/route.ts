import { NextResponse } from 'next/server';
import { z } from 'zod';
import { petFormSchema } from '@/lib/validations/PetFormSchema';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/validations/auth/authOptions';// adjust the path as needed

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const validatedData = petFormSchema.parse(body);
    console.log('Validated data:', validatedData);
    // You now have access to session.user (e.g. session.user.email)
    console.log('of user:', session.user?.email);

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
