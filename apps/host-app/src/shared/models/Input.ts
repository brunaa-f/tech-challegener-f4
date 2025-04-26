export interface InputOptions {
  /** Identificador */
  name: string;
  /** Texto do label */
  label: string;
  /** Tipo de input */
  type: string;
  /** Valor do input */
  value?: string | number;
  /** Placeholder */
  placeholder?: string;
  /** Estilo */
  style?: "ligth" | "dark";
  /** Erro */
  error?: string;
  /** Classes css */
  className?: string;
  /** Especifica se o texto do label deve ficar em negrito(bold). */
  labelTextBold?: boolean;
  /** Evento de alteração do valor. */
  onValueChanged?: (value: string | number) => void;
}

export interface InputCheckboxOptions {
  /** Identificador */
  name: string;
  /** Texto do label */
  label: string;
  /** Valor do input */
  value?: boolean;
  /** Erro */
  error?: string;
  /** Classes css */
  className?: string;
  /** Evento de alteração do valor. */
  onValueChanged?: (value: string | number | boolean) => void;
}

export interface InputLabelOptions {
  /** Texto do label */
  text: string;
  /** Identificador do campo que o label faz parte */
  htmlFor?: string;
  /** Especifica se o texto do label deve ficar em negrito(bold). */
  textBold?: boolean;
}
export interface InputSelectOption {
  /** Valor da opção, utilizado para identificar o valor selecionado. */
  value: string;
  /** Texto exibido para o usuário */
  label: string;
}

export interface InputSelectOptions {
  /** Identificador */
  name: string;
  /** Texto do label */
  label: string;
  /** Valor da opção selecionada */
  value?: string | number;
  /** Erro */
  error?: string;
  /** Opções disponíveis */
  options?: InputSelectOption[];
  /** Estilo */
  style?: "ligth" | "dark";
  /** Evento de alteração do valor. */
  onValueChanged?: (value: string | number) => void;
}
