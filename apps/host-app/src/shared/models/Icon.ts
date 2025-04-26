import { ButtonColors } from "../types/Button";

export interface IconOptions {
  /** Nome do icone */
  name: string;
  /** Estilos customizados. */
  className?: string;
  /** Título */
  title?: string;
}

export interface IconButtonOptions {
  /** Nome do icone */
  icon: string;
  /** Cor do botão */
  color?: ButtonColors;
  /** Estilos customizados. */
  className?: string;
  /** Título */
  title?: string;
  /** Função executada quando é clicado no botão */
  onClick?: () => void;
}
