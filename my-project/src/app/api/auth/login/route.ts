import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { loginSchema } from "@/lib/validations/LoginSchema";

// Initialize Prisma Client (used to interact with your database)
const prisma = new PrismaClient();

// This function handles POST requests to the /api/login endpoint
export async function POST(request: Request) {
  try {
    // Parse the JSON body from the request
    const body = await request.json();
    const { email, password } = body;

    // Validate the request body against your Zod schema
    const validation = loginSchema.safeParse({ email, password });

    // If validation fails, return 400 Bad Request with error details
    if (!validation.success) {
      return NextResponse.json(
        {
          message: "Invalid input",
          errors: validation.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    // Destructure validated and sanitized data
    const { email: validatedEmail, password: validatedPassword } = validation.data;

    // Search for a user in the database by email (converted to lowercase)
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedEmail.toLowerCase() },
    });

    // If no user is found, return 404 Not Found
    if (!existingUser) {
      return NextResponse.json(
        { errors: { email: "Invalid email or user does not exist" } },
        { status: 404 }
      );
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(validatedPassword, existingUser.password);

    // If the password does not match, return 401 Unauthorized
    if (!isPasswordValid) {
      return NextResponse.json(
        { errors: { password: "Incorrect password" } },
        { status: 401 }
      );
    }

    // If login is successful, return a success message and the user ID
    return NextResponse.json(
      {
        message: "Login successful",
        userId: existingUser.id,
      },
      { status: 200 }
    );
  } catch (error) {
    // Catch any unexpected server errors and log them
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
