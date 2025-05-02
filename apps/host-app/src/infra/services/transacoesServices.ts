import { Transacao as BDTransacao } from "@libs/db";

export interface Transacao {
  id?: number;
  userId: number;
  tipoTransacao: string;
  valor: number;
  date: string;
  anexo?: File;
  categoria?: string;
}

interface transacaoAtualizada {
  transacaoId: number;
  tipoTransacao: string;
  valor: number;
  date: string;
  anexo?: File;
  categoria?: string;
}

export const getSaldo = async (userId: number) => {
  const response = await fetch(`api/saldo?userId=${userId}`);
  if (!response.ok) {
    throw new Error("Erro ao buscar saldo");
  }
  const data = await response.json();
  const saldo = data.total;
  return saldo;
};

export const postSaldo = async (userId: number, newBalance: number) => {
  const response = await fetch(`api/saldo`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, newBalance: Number(newBalance) }),
  });
  if (!response.ok) {
    throw new Error("Erro ao atualizar saldo");
  }
  const data = await response.json();
  return data;
};

export const getTransacoes = async (userId: number) => {
  const response = await fetch(`api/transacoes?userId=${userId}`);
  if (!response.ok) {
    throw new Error("Erro ao buscar transações");
  }
  const data = await response.json();
  return data;
};

export const getTransacao = async (id: number): Promise<BDTransacao> => {
  const response = await fetch(`api/transacoes/${id}`);
  if (!response.ok) {
    throw new Error("Erro ao buscar transação");
  }
  const data = await response.json();
  return data;
};

export const postTransacao = async (transacao: Transacao) => {
  const formData = new FormData();

  if (transacao.anexo) formData.append("anexo", transacao.anexo);

  formData.append("tipoTransacao", transacao.tipoTransacao);
  formData.append("valor", transacao.valor.toString());
  formData.append("date", transacao.date);
  formData.append("userId", transacao.userId.toString());
  formData.append("categoria", transacao.categoria || "");

  const response = await fetch(`api/transacoes`, {
    method: "POST",
    body: formData,
  });

  window.alert(!response.ok ? "Erro ao adicionar transação" : "Transação adicionada com sucesso");

  return response.ok;
};

export const putTransacoes = async (transacao: transacaoAtualizada) => {
  const formData = new FormData();

  if (transacao.anexo) formData.append("anexo", transacao.anexo);

  formData.append("tipoTransacao", transacao.tipoTransacao);
  formData.append("valor", transacao.valor.toString());
  formData.append("date", transacao.date);
  formData.append("categoria", transacao.categoria || "");

  const response = await fetch(`api/transacoes/${transacao.transacaoId}`, {
    method: "PUT",
    body: formData,
  });

  window.alert(!response.ok ? "Erro ao alterar transação" : "Transação alterada com sucesso");

  return response.ok;
};

export const DeleteTransacao = async (transacaoId: number) => {
  const response = await fetch(`api/transacoes/${transacaoId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: transacaoId }),
  });

  if (!response.ok) {
    throw new Error("Erro ao atualizar saldo");
  }

  const data = await response.json();
  return data;
};
