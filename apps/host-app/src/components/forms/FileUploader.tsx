"use client";

import { ChangeEvent, forwardRef, useImperativeHandle, useRef } from "react";
import InputLabel from "./InputLabel";

export interface FileUploaderOptions {
  /** Identificador */
  name: string;
  /** Texto do label */
  label: string;
  /** Valor do input */
  value?: string | number;
  /** Estilo */
  style?: "ligth" | "dark";
  /** Erro */
  error?: string;
  /** Classes css */
  className?: string;
  /** Formatos aceitos */
  accept?: string;
  /** Especifica se o texto do label deve ficar em negrito(bold). */
  labelTextBold?: boolean;
  /** Evento de alteração do valor. */
  onValueChanged?: { (value: any): void };
}

export interface FileUploaderRef {
  clear: () => void;
}

const FileUploader = forwardRef((options: FileUploaderOptions, ref) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const style = options.style ?? "ligth";

  function onValueChanged(event: ChangeEvent<HTMLInputElement>) {
    if (options.onValueChanged) {
      const file = event.target.files && event.target.files[0] ? event.target.files[0] : null;
      options.onValueChanged(file);
    }
  }

  const clearFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Limpa o campo de arquivo
    }
  };

  // Expondo a função `clearFileInput` para ser acessada pelo componente pai
  useImperativeHandle(ref, () => ({
    clear: clearFileInput,
  }));

  return (
    <div className={`flex flex-col gap-1 w-full h-full ${options.className ?? ""}`}>
      <InputLabel htmlFor={options.name} text={options.label} textBold={options.labelTextBold} />
      <input
        className={`file-input file-input-bordered w-full max-w-xs ${
          style === "ligth" ? "border-fiap-light-blue" : "border-fiap-navy-blue"
        }`}
        ref={fileInputRef}
        type="file"
        name={options.name}
        accept={options.accept}
        onChange={onValueChanged}
      />
      {options.error && <span className="text-red-500">{options.error}</span>}
    </div>
  );
});

// Defina o displayName para o componente
FileUploader.displayName = "FileUploader";
export default FileUploader;
