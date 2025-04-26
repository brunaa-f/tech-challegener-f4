import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import React from "react";
import { TransacaoModalConfirmDeleteProps } from "@/shared/models/Transacao";

export default function TransacaoConfirmDelete(options: TransacaoModalConfirmDeleteProps) {
  return (
    <Modal isOpen={options.isOpen}>
      <h3 className="text-lg font-semibold mb-4">Excluir transação?</h3>
      <p>
        <strong>Tipo de Transação:</strong> {options.tipoTransacao}
      </p>
      <p>
        <strong>Valor:</strong> R$ {options.valor}
      </p>
      <p>
        <strong>Data:</strong> {new Date(options.date).toLocaleDateString()}
      </p>

      <div className="mt-6 flex justify-between gap-4">
        <Button text="Cancelar" color="red" onClick={options.onClose} />
        <Button text="Confirmar" color="green" disabled={options.isSubmitting} onClick={options.onConfirm} />
      </div>
    </Modal>
  );
}
