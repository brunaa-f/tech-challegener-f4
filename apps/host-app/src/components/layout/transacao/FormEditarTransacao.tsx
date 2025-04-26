"use client";

import { FormEditarTransacaoProps } from "@/shared/models/Formulario";
import Input from "@/components/forms/Input";
import InputSelect from "@/components/forms/InputSelect";
import { InputSelectOption } from "@/shared/models/Input";
import Button from "@/components/ui/Button";
import { useRef, useState } from "react";
import FileUploader, { FileUploaderRef } from "@/components/forms/FileUploader";
import TransacaoAnexoDownload from "./TransacaoAnexoDownload";
import InputLabel from "@/components/forms/InputLabel";
import { Transacao } from "../../../shared/models/Transacao";
import { TipoTransacao } from "@/shared/types/TipoTransacao";
import { DepositoCategorias, TransferenciaCategorias } from "@/shared/types/CategoriasPorTipoTransacao";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { useSelector } from "react-redux";
import { atualizarTransacaoBanco } from "@/features/transactions/transactionSlice";

export default function FormEditarTransacao(options: FormEditarTransacaoProps) {
  const fileUploaderRef = useRef<FileUploaderRef>();
  const [formData, setFormData] = useState<Transacao>(options.transacao);
  const { data: session } = useSession();
  const user = session?.user;
  const dispatch = useDispatch<AppDispatch>();

  const saldoRedux = useSelector((state: any) => state.transaction.saldo);

  const tiposTransacao: InputSelectOption[] = [
    { value: "", label: "Selecione o Tipo" },
    { value: TipoTransacao.TRANSFERENCIA, label: "Transferência" },
    { value: TipoTransacao.DEPOSITO, label: "Depósito" },
  ];

  function onCancelClicked() {
    if (options.onCancelClicked) options.onCancelClicked();
  }

  function onAnexoRemoved() {
    setFormData({ ...formData, anexoName: undefined });
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isFormValid()) {
      alert("Dados inválidos! Verifique os campos.");
      return;
    }
    confirmarTransacao();
  };

  const handleChange = (name: string, value: string | number) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  function verificaTransacao(
    saldo: number,
    valor: number,
    tipoTransacao: string,
    valorOriginal: number
  ): boolean {
    const saldoAjustado = saldo + valorOriginal; 

    if (tipoTransacao === TipoTransacao.TRANSFERENCIA && valor > saldoAjustado) {
      return false;
    }
    if (tipoTransacao === TipoTransacao.DEPOSITO && valor <= 0) {
      return false;
    }

    return true;
  }


  
  const confirmarTransacao = async () => {
    const { tipoTransacao, valor, date, anexo } = formData;

    const valorOriginal = options.transacao.valor;

    if (!verificaTransacao(saldoRedux, valor, tipoTransacao, valorOriginal)) {
      alert("Impossível realizar essa atualização. Seu saldo ficaria negativo.");
      return;
    }

    try {
      const result = await dispatch(
        atualizarTransacaoBanco({
          transacaoId: Number(options.transacao.id),
          tipoTransacao,
          valor,
          date,
          anexo,
          userId: user?.id || 0,
        })
      );

      if (result.meta.requestStatus === "fulfilled") {
        alert("Transação atualizada com sucesso!");
      } else {
        alert("Erro ao atualizar a transação.");
      }
    } catch (error) {
      console.error("Erro ao confirmar transação:", error);
      alert("Erro ao realizar a operação. Tente novamente.");
    }

    if (options.onConfirmClicked) options.onConfirmClicked();
  };


  const isFormValid = () => {
    const { tipoTransacao, valor, date } = formData;

    if (!tipoTransacao || tipoTransacao.trim() === "") {
      return false;
    }
    if (valor <= 0 || isNaN(valor)) {
      return false;
    }
    if (!date || isNaN(new Date(date).getTime())) {
      return false;
    }

    return true;
  };

  return (
    <>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <InputSelect
          name="tipoTransacao"
          label="Tipo"
          options={tiposTransacao}
          style="dark"
          value={formData.tipoTransacao}
          onValueChanged={(value) => handleChange("tipoTransacao", value)}
        />
        <InputSelect
          name="categoria"
          label="Categoria"
          options={
            formData.tipoTransacao === TipoTransacao.TRANSFERENCIA ? TransferenciaCategorias : DepositoCategorias
          }
          style="dark"
          value={formData.categoria || ""}
          onValueChanged={(value) => handleChange("categoria", value)}
        />
        <Input
          name="valor"
          type="number"
          label="Valor"
          style="dark"
          value={formData.valor}
          onValueChanged={(value) => handleChange("valor", Number(value))}
        />
        <Input
          name="date"
          type="date"
          label="Data"
          style="dark"
          value={formData.date}
          onValueChanged={(value) => handleChange("date", value)}
        />
        <FileUploader
          ref={fileUploaderRef}
          name="anexo"
          label={formData.anexoName ? "Alterar anexo" : "Anexo"}
          style="dark"
          accept="image/*,application/pdf,.docx,.xlsx"
          onValueChanged={(value) => handleChange("anexo", value)}
        />

        {formData.anexoName && (
          <div className="flex flex-col">
            <InputLabel text="Anexo salvo"></InputLabel>
            <TransacaoAnexoDownload displayType="anexoName" item={formData} onRemoveAnexo={onAnexoRemoved} />
          </div>
        )}

        <div className="flex gap-4">
          {options.showCancel && <Button type="button" text="Cancelar" color="red" onClick={onCancelClicked} />}
          <Button type="submit" text="Atualizar transação" color="blue" />
        </div>
      </form>
    </>
  );
}
