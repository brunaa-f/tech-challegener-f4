"use client";

import React, { useState } from "react";
import { Transacao , ListaTransacoesOptions } from "../../../shared/models/Transacao";
import TransacaoConfirmDelete from "./TransacaoConfirmDelete";
import TransacaoItem from "./TransacaoItem";
import TransacaoEditModal from "./TransacaoEditModal";
import { AppDispatch } from "@/store";
import { useDispatch } from "react-redux";
import { deletarTransacao } from "@/features/transactions/transactionSlice";
import { useSelector } from "react-redux";


export default function ListaTransacoes(options: ListaTransacoesOptions) {
  
  const [confirmDeleteIsOpen, setConfirmDeleteIsOpen] = useState(false);
  const [editIsOpen, setEditIsOpen] = useState(false);
  const [transacaoSelecionada, setTransacaoSelecionada] = useState<Transacao | null>(null);
  const dispatch: AppDispatch = useDispatch();
  const saldoRedux = useSelector((state: any) => state.transaction.saldo)
  
  

  function handleDelete(transacao: Transacao) {
    setTransacaoSelecionada(transacao);
    setConfirmDeleteIsOpen(true);
    setEditIsOpen(false);
  }

  function handleEdit(transacao: Transacao) {
    setTransacaoSelecionada(transacao);
    setConfirmDeleteIsOpen(false);
    setEditIsOpen(true);
  }

  function confirmarDelete() {
    if (transacaoSelecionada) {
      if (
        transacaoSelecionada.tipoTransacao === "deposito" &&
        !deleteValid(transacaoSelecionada.valor)
      ) {
        alert("Não é possível excluir este depósito. Isso resultaria em saldo negativo.");
        return;
      }
  
      dispatch(
        deletarTransacao({
          transacaoId: Number(transacaoSelecionada.id),
          userId: options.userId,
        })
      );
      fecharModal();
    }
  }
  
  function deleteValid(valor: number): boolean {
    const novoSaldo = saldoRedux - valor;
    return novoSaldo >= 0;
  }
  

  function confirmarEdit() {
    if (transacaoSelecionada) {
      fecharModal();
    }
  }

  function fecharModal() {
    setConfirmDeleteIsOpen(false);
    setEditIsOpen(false);
    setTransacaoSelecionada(null);
  }

  return (
    <>
      <ul className="flex flex-col gap-5 text-left pt-5">
        {options.transacoes?.length > 0 ? (
          options.transacoes.map((tran, index) => (
            <TransacaoItem
              key={tran.id || index}
              item={tran}
              showActions={options.showActions}
              onEditClicked={() => handleEdit(tran)}
              onDeleteClicked={() => handleDelete(tran)}
            />
          ))
        ) : (
          <span className="text-gray-500 text-center">Nenhuma transação encontrada</span>
        )}
      </ul>

      {options.showActions && transacaoSelecionada && (
        <>
          <TransacaoConfirmDelete
            isOpen={confirmDeleteIsOpen}
            onClose={fecharModal}
            onConfirm={confirmarDelete}
            tipoTransacao={transacaoSelecionada.tipoTransacao}
            valor={transacaoSelecionada.valor}
            date={transacaoSelecionada.date}
          />
          <TransacaoEditModal
            isOpen={editIsOpen}
            onClose={fecharModal}
            onConfirm={confirmarEdit}
            transacao={transacaoSelecionada}
          />
        </>
      )}
    </>
  );
}
