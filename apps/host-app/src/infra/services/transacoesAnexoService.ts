export const DownloadAnexo = async (transacaoId: number) => {
  const response = await fetch(`api/transacoes/anexo?id=${transacaoId}`);

  if (!response.ok) {
    window.alert("Erro ao baixar o arquivo.");
    return null;
  }

  return response.blob();
};

export const DeleteAnexo = async (transacaoId: number) => {
  const response = await fetch(`api/transacoes/anexo?id=${transacaoId}`, { method: "DELETE" });

  window.alert(!response.ok ? "Erro ao remover aneexo" : "Anexo removido com sucesso");

  return response.ok;
};
