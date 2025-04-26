import TransacoesRepository from "@/repositories/TransacoesRepository";
import { createReadStream, ReadStream } from "fs";
import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: false,
  },
};

const transacoesRepository = new TransacoesRepository();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const userId = parseInt((req.query.userId as string) || "0", 10);

    if (isNaN(userId) || userId <= 0) {
      return res.status(400).json({ error: "userId não fornecido ou inválido." });
    }

    try {
      const transacoes = await transacoesRepository.getTransacoesByUserId(userId);

      if (!transacoes) {
        return res.status(404).json({ error: "Transação não encontrada." });
      }
      return res.status(200).json(transacoes);
    } catch (error) {
      console.error("Erro ao buscar transações:", error);
      return res.status(500).json({ error: "Erro ao buscar transação." });
    }
  } else if (req.method === "POST") {
    const { IncomingForm } = await import("formidable");
    const form = new IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error("Erro ao processar o arquivo:", err);
        return res.status(500).end("Erro ao processar o arquivo.");
      }

      const tipoTransacao = fields.tipoTransacao?.[0];
      const categoria = fields.categoria?.[0] as string;
      const valor = fields.valor?.[0] ? parseFloat(fields.valor[0]) : null;
      const date = fields.date?.[0] ? new Date(fields.date[0]) : null;
      const userId = fields.userId?.[0] ? parseInt(fields.userId[0]) : null;

      if (!userId || !valor || !date || !tipoTransacao) {
        return res.status(400).json({ error: "Requisição incompleta." });
      }

      const file = Array.isArray(files.anexo) ? files.anexo[0] : files.anexo;
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

      const novaTransacao = await transacoesRepository.createTransacao(
        userId,
        tipoTransacao,
        valor,
        date,
        anexoBytes,
        file?.originalFilename || null,
        categoria
      );

      novaTransacao.anexo = null;
      return res.status(201).json(novaTransacao);
    });
  } else {
    // Caso o método não seja permitido
    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).json({ error: "Método não permitido" });
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
