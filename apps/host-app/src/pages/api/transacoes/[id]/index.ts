import TransacoesRepository from "@/repositories/TransacoesRepository";
import { TipoTransacao } from "@/shared/types/TipoTransacao";
import { createReadStream, ReadStream } from "fs";
import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: false,
  },
};

const transacoesRepository = new TransacoesRepository();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const transacaoId = parseInt(id as string, 10);

  if (isNaN(transacaoId) || transacaoId <= 0) {
    return res.status(400).json({ error: "transacaoId não fornecido ou inválido." });
  }

  try {
    if (req.method === "GET") {
      const transacao = await transacoesRepository.getTransacoesById(transacaoId);

      if (!transacao) {
        return res.status(404).json({ error: "Transação não encontrada." });
      }

      return res.status(200).json(transacao);
    } else if (req.method === "PUT") {
      const transacaoExistente = await transacoesRepository.getTransacoesById(transacaoId);
      if (!transacaoExistente) {
        return res.status(404).json({ error: "Transação não encontrada." });
      }

      const { IncomingForm } = await import("formidable");
      const form = new IncomingForm();

      form.parse(req, async (err, fields, files) => {
        if (err) {
          return res.status(500).end("Erro ao processar o arquivo."); // RETORNA
        }

        const tipoTransacao = fields.tipoTransacao?.[0] as TipoTransacao;
        const categoria = fields.categoria?.[0] as string;
        const valor = fields.valor?.[0] ? parseFloat(fields.valor[0]) : 0;
        const date = fields.date?.[0] ? new Date(fields.date[0]) : new Date();
        const file = Array.isArray(files?.anexo) ? files.anexo[0] : files?.anexo;

        if (!tipoTransacao || typeof tipoTransacao !== "string") {
          return res.status(400).json({ message: "Tipo de transação inválido." });
        }

        if (isNaN(valor)) {
          return res.status(400).json({ message: "Valor inválido." });
        }

        if (!(date instanceof Date) || isNaN(date.getTime())) {
          return res.status(400).json({ message: "Data inválida." });
        }

        let anexoBytes: Uint8Array<ArrayBufferLike> | null = null;

        if (file) {
          try {
            const fileStream = createReadStream(file.filepath);
            anexoBytes = await streamToBuffer(fileStream);
          } catch (error) {
            console.error("Erro ao processar o arquivo:", error);
            return res.status(500).json({ message: "Erro ao processar o arquivo anexado." });
          }
        }

        const transacaoAtualizada = await transacoesRepository.updateTransacao(
          transacaoId,
          tipoTransacao,
          valor,
          date,
          anexoBytes,
          file?.originalFilename || null,
          categoria
        );

        transacaoAtualizada.anexo = null;
        return res.status(200).json(transacaoAtualizada);
      });
    } else if (req.method === "DELETE") {
      const id = parseInt((req.query.id as string) || "0", 10);

      if (isNaN(id) || id <= 0) {
        return res.status(400).json({ error: "ID não fornecido ou inválido." });
      }

      try {
        const transacaoDeletada = await transacoesRepository.DeletarTransacao(id);

        if (!transacaoDeletada) {
          return res.status(404).json({ error: "Transação não encontrada." });
        }

        return res.status(200).json({ message: "Transação deletada com sucesso." });
      } catch (error) {
        console.error("Erro ao deletar transação:", error);
        return res.status(500).json({ error: "Erro ao deletar transação." });
      }
    } else {
      // Método não permitido
      return res.setHeader("Allow", ["GET", "PUT"]).status(405).json({ error: "Método não permitido" });
    }
  } catch (error) {
    console.error(`Erro ao processar a transação (método ${req.method}):`, error);
    return res.status(500).json({ error: "Erro interno do servidor." });
  }
}

// Função para converter Stream para Buffer
const streamToBuffer = async (stream: ReadStream) => {
  const chunks = [];
  for await (const chunk of stream) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
};
