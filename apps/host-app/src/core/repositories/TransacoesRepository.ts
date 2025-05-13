import { TipoTransacao } from "@/shared/types/TipoTransacao";
import { prisma, Transacao } from "@libs/db";
import SaldoRepository from "./SaldoRepository";

export default class TransacoesRepository {
  private saldoRepository = new SaldoRepository();

  async getTransacoesByUserId(userId: number) {
    return prisma.transacao.findMany({
      where: { contaId: userId },
      select: {
        id: true,
        anexoName: true,
        contaId: true,
        date: true,
        tipoTransacao: true,
        valor: true,
        anexo: false,
        categoria: true,
      },
    });
  }

  async getTransacoesById(transacaoId: number) {
    return prisma.transacao.findUnique({
      where: { id: transacaoId },
    });
  }

  async updateTransacao(
    transacaoId: number,
    tipoTransacao: TipoTransacao,
    valor: number,
    date: Date,
    anexo: Uint8Array<ArrayBufferLike> | null,
    anexoName: string | null,
    categoria: string
  ) {
    const transacao = await this.getTransacoesById(transacaoId);
    if (!transacao) {
      throw new Error(`Transação ID: ${transacaoId} não existe`);
    }

    const saldo = await this.saldoRepository.findByUserId(transacao.contaId);

    if (saldo != null) {
      let newSaldo =
        transacao.tipoTransacao === TipoTransacao.TRANSFERENCIA
          ? saldo.total + (transacao.valor ?? 0)
          : saldo.total - (transacao.valor ?? 0);

      newSaldo = tipoTransacao === TipoTransacao.TRANSFERENCIA ? newSaldo - (valor ?? 0) : newSaldo + (valor ?? 0);

      await this.saldoRepository.updateSaldo(transacao.contaId, newSaldo);
    }

    const toUpdate: Partial<Transacao> = { tipoTransacao, valor, date, categoria };

    if (anexo) {
      toUpdate.anexo = anexo;
      toUpdate.anexoName = anexoName;
    }

    return prisma.transacao.update({ where: { id: transacaoId }, data: toUpdate });
  }

  async createTransacao(
    userId: number,
    tipoTransacao: string,
    valor: number,
    date: Date,
    anexo: Uint8Array<ArrayBufferLike> | null,
    anexoName: string | null,
    categoria: string
  ) {
    return prisma.transacao.create({
      data: {
        contaId: userId,
        tipoTransacao,
        valor,
        date,
        anexo,
        anexoName,
        categoria,
      },
    });
  }

  async DeletarTransacao(transacaoId: number) {
    const transacao = await this.getTransacoesById(transacaoId);

    if (transacao !== null) {
      const saldo = await this.saldoRepository.findByUserId(transacao.contaId);

      if (saldo != null) {
        const newSaldo =
          transacao.tipoTransacao === TipoTransacao.TRANSFERENCIA
            ? saldo.total + (transacao.valor ?? 0)
            : saldo.total - (transacao.valor ?? 0);

        await this.saldoRepository.updateSaldo(transacao.contaId, newSaldo);
      }
    }

    return prisma.transacao.delete({
      where: {
        id: transacaoId,
      },
    });
  }

  async DeletarAnexo(transacaoId: number) {
    return prisma.transacao.update({ where: { id: transacaoId }, data: { anexo: null, anexoName: null } });
  }
}
