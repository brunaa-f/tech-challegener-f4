import Modal from "@/components/ui/Modal";
import React from "react";
import FormEditarTransacao from "./FormEditarTransacao";
import { TransacaoEditModalProps } from "@/shared/models/Transacao";

export default function TransacaoEditModal(options: TransacaoEditModalProps) {
  return (
    <Modal isOpen={options.isOpen} childrenClassName="w-[400px]">
      <h3 className="text-lg font-semibold mb-4">Editar transação</h3>
      <FormEditarTransacao
        transacao={options.transacao}
        showCancel={true}
        onCancelClicked={options.onClose}
        onConfirmClicked={options.onConfirm}
      />
    </Modal>
  );
}
