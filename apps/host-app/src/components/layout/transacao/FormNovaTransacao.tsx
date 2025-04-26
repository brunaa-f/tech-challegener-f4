"use client";
import { useRef, useState } from "react";
import InputSelect from "@/components/forms/InputSelect";
import Input from "@/components/forms/Input";
import Button from "@/components/ui/Button";
import { TipoTransacao } from "@/shared/types/TipoTransacao";
import { DepositoCategorias, TransferenciaCategorias } from "@/shared/types/CategoriasPorTipoTransacao";
import {  FormularioPropsTransacao } from "@/shared/models/Formulario";
import { InputSelectOption } from "@/shared/models/Input";
import FileUploader, { FileUploaderRef } from "@/components/forms/FileUploader";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { useSelector } from "react-redux";
import { novaTransacaoBanco, realizarDeposito } from "@/features/transactions/transactionSlice";

interface TransacaoForm  {
  tipoTransacao: TipoTransacao;
  categoria: string;
  valor: number;
  date: string;
  anexo?: File;
};

export default function FormNovaTransacao({ userId }: FormularioPropsTransacao) {
  const fileUploaderRef = useRef<FileUploaderRef>();
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState<TransacaoForm>({
    tipoTransacao: TipoTransacao.DEPOSITO,
    categoria: "",
    valor: 0,
    date: new Date().toISOString(),
  });

  const tiposTransacao: InputSelectOption[] = [
    { value: "", label: "Selecione o Tipo" },
    { value: TipoTransacao.TRANSFERENCIA, label: "Transferência" },
    { value: TipoTransacao.DEPOSITO, label: "Depósito" },
  ];

  const saldoRedux = useSelector((state: any) => state.transaction.saldo);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isFormValid()) {
      return;
    }

    try {
      await processarTransacao();
      resetForm();

    } catch (error) {
      console.error("Erro ao adicionar transação:", error);
      alert("Erro ao adicionar transação. Tente novamente mais tarde.");
    }
  };

  const handleChange = (name: string, value: string | number | File | undefined) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const processarTransacao = async () => {
    const { tipoTransacao, valor, date, anexo } = formData;

    if (!userId) {
      throw new Error("Usuário inválido!");
    }

    if (tipoTransacao === TipoTransacao.DEPOSITO) {
      await dispatch(
        novaTransacaoBanco({
          userId: Number(userId),
          tipoTransacao,
          valor,
          date,
          anexo,
        })
      ).unwrap();

      const novoSaldo: number = saldoRedux + valor

      await dispatch(
        realizarDeposito({ userId: Number(userId), valor: novoSaldo })
      );
    }
    else if (tipoTransacao === TipoTransacao.TRANSFERENCIA) {
      if (verificaSaldo(valor)) {

        await dispatch(
          novaTransacaoBanco({
            userId: Number(userId),
            tipoTransacao,
            valor,
            date,
            anexo,
          })
        ).unwrap();

        const novoSaldo: number = saldoRedux - valor

        await dispatch(realizarDeposito({ userId: Number(userId), valor: novoSaldo }))
      }
      else {
        alert("Impossivel realizar essa transferencia seu saldo ficara negativo ")
      }
    }
    else {
      throw new Error("Tipo de Transação é inválido!");
    }
  };

  const verificaSaldo = (valor: number): boolean => {
    if (valor > saldoRedux) {
      return false;
    }
    return true;
  };

  const resetForm = () => {
    setFormData({
      tipoTransacao: TipoTransacao.DEPOSITO,
      categoria: "",
      valor: 0,
      date: new Date().toISOString(),
      anexo: undefined,
    });
    fileUploaderRef.current?.clear();
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
        options={formData.tipoTransacao === TipoTransacao.TRANSFERENCIA ? TransferenciaCategorias : DepositoCategorias}
        style="dark"
        value={formData.categoria}
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
        label="Anexo"
        style="dark"
        accept="image/*,application/pdf,.docx,.xlsx"
        onValueChanged={(value) => handleChange("anexo", value)}
      />

      <Button type="submit" text="Adicionar Transação" color="blue" />
    </form>
  );
}
