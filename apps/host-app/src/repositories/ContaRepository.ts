import { Conta } from "@/shared/models/Conta";
import { prisma } from "@libs/db";

export default class ContaRepository {
  async criar(email: string, nome: string, senha: string): Promise<Conta> {
    const novaConta = await prisma.conta.create({
      data: {
        email,
        nome,
        senha,
      },
    });

    await prisma.saldo.create({
      data: {
        contaId: novaConta.id,
        total: 0,
      },
    });

    return novaConta;
  }

  async findByEmail(email: string): Promise<Conta> {
    return (await prisma.conta.findFirst({ where: { email } })) as Conta;
  }
}
