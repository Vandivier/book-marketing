import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const globalForPrisma = global as typeof globalThis & {
  prisma?: PrismaClient;
  prismaPool?: Pool;
};

const connectionString =
  process.env.DATABASE_URL ?? process.env.DIRECT_URL ?? "";

if (!connectionString) {
  throw new Error("Missing DATABASE_URL or DIRECT_URL for Prisma.");
}

const pool = globalForPrisma.prismaPool ?? new Pool({ connectionString });

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient({ adapter: new PrismaPg(pool) });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
  globalForPrisma.prismaPool = pool;
}
