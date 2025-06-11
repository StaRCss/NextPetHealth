import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { signUpSchema } from '@/lib/validations/SignUpSchema';

const prisma = new PrismaClient();

// ✅ Helper to clean email
function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    // Validate input
    const validation = signUpSchema.safeParse({ name, email, password });
    if (!validation.success) {
      return NextResponse.json(
        { message: 'Invalid input', errors: validation.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const validatedName = validation.data.name;
    const validatedPassword = validation.data.password;

    // ✅ USE THE HELPER to normalize email once and use it everywhere
    const normalizedEmail = normalizeEmail(validation.data.email);

    console.log('Normalized email:', normalizedEmail); // 🧪 Confirm this shows lowercase

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existingUser) {
      return NextResponse.json({ message: 'Email already in use' }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(validatedPassword, 10);

    // ✅ Save normalized email to DB
    const user = await prisma.user.create({
      data: {
        name: validatedName,
        email: normalizedEmail,
        password: hashedPassword,
      },
    });

    console.log('Created user:', user); // Check this too

    return NextResponse.json({ message: 'User created', userId: user.id }, { status: 201 });

  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
