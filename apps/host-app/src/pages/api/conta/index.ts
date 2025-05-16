import ContaRepository from "@/core/repositories/ContaRepository";
import validaEmail from "@/core/utils/validaEmail";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";

export interface NovaContaDTO {
  nome: string;
  email: string;
  senha: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const dto: NovaContaDTO = req.body;

    if (!dto || !dto.email || !dto.nome || !dto.senha) {
      return res.status(400).json({ error: "Requisição incompleta." });
    }

    if (!validaEmail(dto.email)) {
      return res.status(422).json({ error: "Email inválido." });
    }

    const contaRepository = new ContaRepository();
    const contaExistente = await contaRepository.findByEmail(dto.email);

    if (contaExistente) {
      return res.status(422).json({ error: "Já existe uma conta com este email." });
    }

    try {
      const senhaCriptografada = await bcrypt.hash(dto.senha, 10);

      await contaRepository.criar(dto.email, dto.nome, senhaCriptografada);
      return res.status(200).json({ message: "Conta criada com sucesso." });
    } catch (error) {
      console.error("Erro ao criar conta:", error);
      return res.status(500).json({ error: "Erro ao criar conta." });
    }
  }

  res.setHeader("Allow", ["POST"]);
  return res.status(405).end(`Método ${req.method} não permitido`);
}
