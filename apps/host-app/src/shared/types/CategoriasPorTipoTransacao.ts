import { InputSelectOption } from "../models/Input";

export const DepositoCategorias: InputSelectOption[] = [
  { value: "", label: "" },
  { value: "outros", label: "Outros" },
  { value: "salario", label: "Salário" },
  { value: "ferias", label: "Férias" },
  { value: "bonus", label: "Bônus" },
  { value: "estorno", label: "Estorno" },
  { value: "reembolso", label: "Reembolso" },
];

export const TransferenciaCategorias: InputSelectOption[] = [
  { value: "", label: "" },
  { value: "famarcia", label: "Farmácia" },
  { value: "supermercado", label: "Supermercado" },
  { value: "feira", label: "Feira" },
  { value: "restaurante", label: "Restaurante" },
  { value: "lazer", label: "Lazer" },
  { value: "educacao", label: "Educação" },
  { value: "investir", label: "Investir" },
];
