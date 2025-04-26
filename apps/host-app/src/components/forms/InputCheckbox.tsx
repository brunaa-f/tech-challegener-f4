"use client";

import { ChangeEvent } from "react";
import InputLabel from "./InputLabel";
import { InputCheckboxOptions } from '../../shared/models/Input'

export default function InputCheckbox(options: InputCheckboxOptions) {
  function onValueChanged(event: ChangeEvent<HTMLInputElement>) {
    if (options.onValueChanged) options.onValueChanged(event.target.checked);
  }

  return (
    <div className={`flex flex-col ${options.className ?? ""}`}>
      <div className="flex items-center gap-3">
        <input className="checkbox border-fiap-green" name={options.name} type="checkbox" onChange={onValueChanged} />
        <InputLabel htmlFor={options.name} text={options.label} textBold={false} />
      </div>
      {options.error && <span className="text-red-500">{options.error}</span>}
    </div>
  );
}
