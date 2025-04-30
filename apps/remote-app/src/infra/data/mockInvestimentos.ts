import { Investimento } from "../../domain/models/investimento";

export const mockInvestimentos: Investimento[] = [
  { tipo: "Fundos de investimentos", descricao: "Investimentos em fundos variados", valor: 25000 },
  { tipo: "Tesouro direto", descricao: "Títulos do governo federal", valor: 27000 },
  { tipo: "Previdência Privada", descricao: "Planos de previdência", valor: 23000 },
  { tipo: "Bolsa de Valores", descricao: "Ações negociadas na bolsa", valor: 27000 },
];
