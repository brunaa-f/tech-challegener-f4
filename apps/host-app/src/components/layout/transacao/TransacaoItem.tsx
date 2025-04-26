"use client";

import IconButton from "@/components/ui/IconButton";
import { FormatoData } from "@/shared/types/FormatoData";
import { formatarData, formatarMoeda } from "@/shared/utils/Formatters";
import { TransacaoItemOptions } from "@/shared/models/Transacao";
import TransacaoAnexoDownload from "./TransacaoAnexoDownload";
import { TipoTransacao } from "@/shared/types/TipoTransacao";
import { DepositoCategorias, TransferenciaCategorias } from "@/shared/types/CategoriasPorTipoTransacao";

export default function TransacaoItem(options: TransacaoItemOptions) {
  const { item } = options;
  const mes = formatarData(new Date(item.date), FormatoData.MES);
  const date = formatarData(new Date(item.date));
  const valor = formatarMoeda(item.valor);
  const categoriaLabel = getCategoriaLabel();

  const tiposTransacao: { [key: string]: string } = {
    deposito: "Depósito",
    transferencia: "Transferência",
  };

  function getCategoriaLabel() {
    let texto: string | undefined;

    if (item.categoria) {
      const lista = item.tipoTransacao === TipoTransacao.TRANSFERENCIA ? TransferenciaCategorias : DepositoCategorias;
      texto = lista.find((cat) => cat.value === item.categoria)?.label;
    }

    return texto;
  }

  function onDeleteClicked() {
    if (options.onDeleteClicked) options.onDeleteClicked();
  }

  function onEditClicked() {
    if (options.onEditClicked) options.onEditClicked();
  }

  return (
    <li className="list-none pb-4 border-b border-fiap-green/50">
      <p className="text-sm font-semibold text-fiap-green capitalize">{mes}</p>
      <div className="flex items-center justify-between">
        <h3 className="pr-2">{tiposTransacao[item.tipoTransacao]}</h3>
        <p className="text-gray-500 text-xs">{date}</p>
      </div>
      {categoriaLabel && <span className="text-fiap-gray">{categoriaLabel}</span>}

      <div className={`flex justify-between items-center ${options.showActions ? "mt-2" : ""}`}>
        <p className="text-gray-800 font-semibold text-lg">{valor}</p>
        <div className={`flex items-center gap-2 ${!options.showActions ? "hidden" : ""}`}>
          <TransacaoAnexoDownload displayType="onlyButton" item={item} />
          <IconButton icon="edit" color="blue" onClick={onEditClicked} />
          <IconButton icon="delete" color="blue" onClick={onDeleteClicked} />
        </div>
      </div>
    </li>
  );
}
