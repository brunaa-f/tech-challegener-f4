import { Transacao } from "../models/Transacao";
import { TipoTransacao } from "../types/TipoTransacao";

export interface FormEditarTransacaoProps {
  transacao: Transacao;
  showCancel?: boolean;
  onCancelClicked?: () => void;
  onConfirmClicked?: () => void;
}

export interface FormularioProps {
  deposito: (valor: number) => void;
  transferencia: (valor: number) => void;
  novaTransacao: (
    tipo: TipoTransacao,
    valor: number,
    date: string,
    userId: number,
    anexo?: File,
    categoria?: string
  ) => void;
  userId: number;
}
export interface FormularioPropsTransacao  {
  userId: string | number;
};
