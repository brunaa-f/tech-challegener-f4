"use client";

import { ChangeEvent } from "react";
import InputLabel from "./InputLabel";
import {InputOptions} from '../../shared/models/Input'

export default function Input(options: InputOptions) {
  const style = options.style ?? "ligth";

  function onValueChanged(event: ChangeEvent<HTMLInputElement>) {
    if (options.onValueChanged) options.onValueChanged(event.target.value);
  }

  function getValue() {
    if (options.value && options.type === "date") {
      // Converte a data para o formato YYYY-MM-DD
      return new Date(options.value).toISOString().split("T")[0];
    }
    return options.value;
  }

  return (
    <div className={`flex flex-col gap-1 w-full h-full ${options.className ?? ""}`}>
      <InputLabel htmlFor={options.name} text={options.label} textBold={options.labelTextBold} />
      <input
        className={`input bg-white w-full border-[1px] ${
          style === "ligth" ? "border-fiap-light-blue" : "border-fiap-navy-blue"
        }`}
        name={options.name}
        type={options.type}
        value={getValue()}
        placeholder={options.placeholder}
        onChange={onValueChanged}
      />
      {options.error && <span className="text-red-500">{options.error}</span>}
    </div>
  );
}
