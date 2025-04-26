import TransacoesRepository from "@/repositories/TransacoesRepository";
import { NextApiRequest, NextApiResponse } from "next";

const transacoesRepository = new TransacoesRepository();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const transacaoId = parseInt(id as string, 10);

  if (req.method !== "GET") {
  }

  if (!transacaoId) {
    return res.status(404).json({ error: "Não foi especificado o ID da transação" });
  }

  if (req.method === "GET") {
    try {
      const transacao = await transacoesRepository.getTransacoesById(transacaoId);

      if (!transacao) {
        return res.status(404).json({ error: "Transação não encontrada" });
      }
      if (!transacao.anexo) {
        return res.status(404).json({ error: "Arquivo não encontrado" });
      }

      res.setHeader("Content-Type", "application/octet-stream");
      res.setHeader("Content-Disposition", `attachment; filename="${transacao.anexoName}"`);

      return res.status(200).send(Buffer.from(transacao.anexo));
    } catch (error) {
      console.error("Erro ao recuperar arquivo:", error);
      return res.status(500).json({ error: "Erro no servidor" });
    }
  } else if (req.method === "DELETE") {
    const transacao = await transacoesRepository.getTransacoesById(transacaoId);

    if (!transacao) {
      return res.status(404).json({ error: "Transação não encontrada" });
    }

    await transacoesRepository.DeletarAnexo(transacaoId);
    return res.status(201).json(true);
  } else {
    res.setHeader("Allow", ["GET", "DELETE"]);
    return res.status(405).json({ error: "Método não permitido" });
  }
}
