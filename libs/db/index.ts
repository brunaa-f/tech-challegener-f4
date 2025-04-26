import { Conta, PrismaClient, Saldo, Transacao } from "@prisma/client";

const prisma = new PrismaClient();

export { prisma };
export type { Conta, Saldo, Transacao };
