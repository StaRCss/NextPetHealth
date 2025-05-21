import { NextResponse } from "next/server";
import { PrismaClient} from "@prisma/client";
import bcript from 'bcryptjs';
 
const prisma = new PrismaClient();
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, password } = body;
    
        if (!email || !password) {
        return NextResponse.json(
            { message: "Missing email or password" },
            { status: 400 }
        );
        }
    
        // Check if user already exists
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (!existingUser) {
        return NextResponse.json(
            { message: "User does not exist" },
            { status: 409 }
        );
        }
    
        // Check password
        const isPasswordValid = await bcript.compare(password, existingUser.password);
        if (!isPasswordValid) {
        return NextResponse.json(
            { message: "Invalid password" },
            { status: 401 }
        );
        }
    
        return NextResponse.json(
        { message: "Login successful", userId: existingUser.id },
        { status: 200 }
        );
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 }
        );
    }
}
