import { prisma, Saldo } from "@libs/db";

export default class SaldoRepository {
  async findByUserId(userId: number): Promise<Saldo | null> {
    return prisma.saldo.findUnique({
      where: { contaId: userId },
    });
  }

  async updateSaldo(userId: number, novoSaldo: number): Promise<Saldo> {
    const exist = await this.findByUserId(userId);
    if (exist) {
      return prisma.saldo.update({
        where: { contaId: userId },
        data: { total: novoSaldo },
      });
    }

    return this.createSaldo(userId, novoSaldo);
  }

  async createSaldo(userId: number, initialBalance: number = 0): Promise<Saldo> {
    return prisma.saldo.create({
      data: {
        contaId: userId,
        total: initialBalance,
      },
    });
  }
}
