
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { signUpSchema } from '@/lib/validations/SignUpSchema';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validate input
    const validation = signUpSchema.safeParse({ email, password });
    if (!validation.success) {
      return NextResponse.json({ message: 'Invalid input', errors: validation.error.flatten().fieldErrors }, { status: 400 });
    }

    // Extract validated data
    const { email: validatedEmail, password: validatedPassword } = validation.data;
    
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email: validatedEmail } });
    console.log('Checking user:', validatedEmail, 'Found:', existingUser);

    if (existingUser) {
      return NextResponse.json({ message: 'Invalid email' }, { status: 409 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(validatedPassword, 10);

    // Create new user
    const user = await prisma.user.create({
      data: {
        email: validatedEmail,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ message: 'User created', userId: user.id }, { status: 201 });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 }); // 
  }
}
