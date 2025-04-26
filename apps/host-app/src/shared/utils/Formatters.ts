import { FormatoData } from "../types/FormatoData";

export function formatarMoeda(valor: number): string {
  return valor.toLocaleString("pt-br", { style: "currency", currency: "BRL" });
}

export function formatarData(data: Date, formato: FormatoData = FormatoData.PADRAO): string {
  switch (formato) {
    case FormatoData.DIA_SEMANA_DIA_MES_ANO:
      return data.toLocaleDateString("pt-br", {
        weekday: "long",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    case FormatoData.DIA_MES:
      return data.toLocaleDateString("pt-br", { day: "2-digit", month: "2-digit" });
    case FormatoData.MES:
      return data.toLocaleDateString("pt-br", { month: "long" });
    default:
      return data.toLocaleDateString("pt-br");
  }
}
