"use client";
import { InputLabelOptions } from '../../shared/models/Input'


export default function InputLabel(options: InputLabelOptions) {
  return (
    <label htmlFor={options.htmlFor} className={`text-sm text-black ${options.textBold !== false ? "font-bold" : ""}`}>
      {options.text}
    </label>
  );
}
