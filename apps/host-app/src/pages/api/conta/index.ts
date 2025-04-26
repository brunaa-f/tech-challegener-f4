import ContaRepository from "@/repositories/ContaRepository";
import validaEmail from "@/shared/utils/validaEmail";
import { NextApiRequest, NextApiResponse } from "next";

export interface NovaContaDTO {
  nome: string;
  email: string;
  senha: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const dto: NovaContaDTO = req.body;

    // Verifica se todos os campos necessários foram preenchidos
    if (!dto || !dto.email || !dto.nome || !dto.senha) {
      return res.status(400).json({ error: "Requisição incompleta." });
    }

    // Valida o email
    if (!validaEmail(dto.email)) {
      return res.status(422).json({ error: "Email inválido." });
    }

    const contaRepository = new ContaRepository();
    const conta = await contaRepository.findByEmail(dto.email);

    // Verifica se já existe uma conta com esse email
    if (conta) {
      return res.status(422).json({ error: "Já existe uma conta com este email." });
    }

    // Cria a nova conta
    try {
      await contaRepository.criar(dto.email, dto.nome, dto.senha);
      return res.status(200).json({ message: "Conta criada com sucesso." });
    } catch (error) {
      console.error("Erro ao criar conta:", error);
      return res.status(500).json({ error: "Erro ao criar conta." });
    }
  }

  // Caso o método não seja permitido
  res.setHeader("Allow", ["POST"]);
  return res.status(405).end(`Método ${req.method} não permitido`);
}
