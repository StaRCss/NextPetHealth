// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

// Extend globalThis to store PrismaClient for development hot reloads
declare global {
  var prisma: PrismaClient | undefined;
}

// Use existing PrismaClient if it exists (singleton), otherwise create a new one
const prisma = globalThis.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'], // optional: verbose logging in dev
});

// In development, attach to globalThis to prevent multiple instances on hot reload
if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma;
}

export default prisma;
