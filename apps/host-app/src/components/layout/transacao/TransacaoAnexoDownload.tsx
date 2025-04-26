"use client";

import IconButton from "@/components/ui/IconButton";
import { DownloadAnexo, DeleteAnexo } from "@/services/transacoesAnexoService";
import { TransacaoAnexoDownloadOptions } from "@/shared/models/Transacao";

export default function TransacaoAnexoDownload(options: TransacaoAnexoDownloadOptions) {
  const { item } = options;

  async function onDownload() {
    try {
      if (item.id) {
        const blob = await DownloadAnexo(item.id);
        if (blob) {
          const url = window.URL.createObjectURL(blob);

          const link = document.createElement("a");
          link.href = url;
          link.download = item.anexoName ?? "";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          window.URL.revokeObjectURL(url);
        }
      }
    } catch (error) {
      console.error("Erro ao baixar arquivo:", error);
    }
  }

  async function onDelete() {
    if (item.id) {
      const result = await DeleteAnexo(item.id);
      if (result && options.onRemoveAnexo) {
        options.onRemoveAnexo();
      }
    }
  }

  if (!options.item.anexoName) return <></>;

  return (
    <>
      {options.displayType === "anexoName" && (
        <div className="w-full flex justify-between items-center">
          <span className="flex text-wrap whitespace-break-spaces text-sm">{item.anexoName}</span>
          <div className="flex gap-2">
            <IconButton icon="download" title="Baixar anexo" color="blue" onClick={onDownload} />
            <IconButton icon="delete" title="Remover anexo" color="blue" onClick={onDelete} />
          </div>
        </div>
      )}

      {options.displayType === "onlyButton" && (
        <IconButton icon="attachment" title={item.anexoName} color="blue" onClick={onDownload} />
      )}
    </>
  );
}
