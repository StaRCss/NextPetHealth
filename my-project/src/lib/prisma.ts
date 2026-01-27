// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

// Extend globalThis to store PrismaClient for development hot reloads
/* eslint-disable no-var */
declare global {
  var prisma: PrismaClient | undefined;
}
/* eslint-enable no-var */


// Use existing PrismaClient if it exists (singleton), otherwise create a new one
// eslint-disable-next-line no-var
const prisma = globalThis.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
});

// In development, attach to globalThis to prevent multiple instances on hot reload
if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma;
}

export default prisma;
