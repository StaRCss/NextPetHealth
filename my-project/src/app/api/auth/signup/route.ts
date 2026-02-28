import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { signUpSchema } from '@/lib/validations/SignUpSchema';
import prisma  from '@/lib/prisma';

// ✅ Helper to clean email
function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password, confirmPassword } = body;

    // Validate input
    const validation = signUpSchema.safeParse({ name, email, password, confirmPassword });
    if (!validation.success) {
      return NextResponse.json(
        { message: 'Invalid input', errors: validation.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const validatedName = validation.data.name;
    const validatedPassword = validation.data.password;

    // USE THE HELPER to normalize email once and use it everywhere
    const normalizedEmail = normalizeEmail(validation.data.email);

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(validatedPassword, 10);

    //  Save normalized email to DB
     await prisma.user.create({
      data: {
        name: validatedName,
        email: normalizedEmail,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ success: true }, { status: 201 });

  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
