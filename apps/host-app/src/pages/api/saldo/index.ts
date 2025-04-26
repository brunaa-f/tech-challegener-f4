import SaldoRepository from "@/repositories/SaldoRepository";
import { NextApiRequest, NextApiResponse } from "next";

const saldoRepository = new SaldoRepository();

// Manipulador principal da API
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case "GET":
      return handleGet(req, res);
    case "POST":
      return handlePost(req, res);
    case "PUT":
      return handlePut(req, res);
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT"]);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}

// Manipulador para GET
async function handleGet(req: NextApiRequest, res: NextApiResponse) {
  const userId = parseInt(req.query.userId as string, 10);

  if (!userId) {
    return res.status(400).json({ error: "userId não fornecido." });
  }

  try {
    const saldo = await saldoRepository.findByUserId(userId);

    if (!saldo) {
      return res.status(404).json({ error: "Saldo não encontrado." });
    }

    return res.status(200).json(saldo);
  } catch (error) {
    console.error("Erro ao buscar saldo:", error);
    return res.status(500).json({ error: "Erro ao buscar saldo." });
  }
}

// Manipulador para POST
async function handlePost(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { userId, initialBalance } = req.body;

    if (typeof userId !== "number" || typeof initialBalance !== "number") {
      return res.status(400).json({ error: "userId e initialBalance devem ser números." });
    }

    const novoSaldo = await saldoRepository.createSaldo(userId, initialBalance);

    return res.status(201).json(novoSaldo);
  } catch (error) {
    console.error("Erro ao criar saldo:", error);
    return res.status(500).json({ error: "Erro ao criar saldo." });
  }
}

// Manipulador para PUT
async function handlePut(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { userId, newBalance } = req.body;

    if (typeof userId !== "number" || typeof newBalance !== "number") {
      return res.status(400).json({ error: "userId e newBalance devem ser números." });
    }
    if (newBalance < 0) {
      return res.status(400).json({ error: "newBalance deve ser maior ou igual a zero." });
    }

    const updatedSaldo = await saldoRepository.updateSaldo(userId, newBalance);

    return res.status(200).json(updatedSaldo);
  } catch (error) {
    console.error("Erro ao atualizar saldo:", error);
    return res.status(500).json({ error: "Erro ao atualizar saldo." });
  }
}
