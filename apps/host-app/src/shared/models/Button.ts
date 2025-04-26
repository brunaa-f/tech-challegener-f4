import { ButtonColors } from "../types/Button";

export interface ButtonOptions {
  /** Texto do botão */
  text: string;
  /** Especifica se o botão deve ter o estilo "outlined", ou seja, que apresente cor apenas nas bordas e no texto. */
  outlined?: boolean;
  /** Cor do botão */
  color?: ButtonColors;
  /** Tipo do botão */
  type?: "submit" | "reset" | "button" | undefined;
  /** Estilos customizados. */
  className?: string;
  /** Especifica que o botão esta desabilitado. */
  disabled?: boolean;
  /** Função executada quando é clicado no botão */
  onClick?: () => void;
}
