"use client";

export type { ButtonOptions } from "@/shared/models/Button"; // Altere para export type

import { ButtonOptions } from "@/shared/models/Button"; // Importe diretamente

export default function Button(options: ButtonOptions) {
  function getColor() {
    if (options.disabled) return "";
    switch (options.color) {
      case "green":
        return "text-white bg-fiap-green border-none hover:bg-fiap-green-hover";
      case "blue":
        return "text-white bg-fiap-navy-blue border-none hover:bg-fiap-navy-blue-hover";
      case "red":
        return "text-white bg-fiap-red border-none hover:bg-fiap-red-hover";
      case "black":
        return "text-white border-black bg-black";
      case "gray":
        return "text-gray-600 bg-gray-200 border-none";
      default:
        return "text-white bg-fiap-orange border-none hover:bg-fiap-orange-hover";
    }
  }

  function getOutlinedColor() {
    if (options.disabled) return "";
    switch (options.color) {
      case "green":
        return "btn-outline text-fiap-green hover:bg-fiap-green hover:text-white hover:border-white";
      case "blue":
        return "btn-outline text-fiap-navy-blue hover:bg-fiap-navy-blue hover:text-white hover:border-white";
      case "red":
        return "btn-outline text-fiap-red hover:bg-fiap-red hover:text-white hover:border-white";
      case "black":
        return "btn-outline text-black hover:bg-black hover:text-white hover:border-black";
      case "gray":
        return "btn-outline text-black border-gray-200 hover:bg-gray-200 hover:text-black hover:border-gray-200";
      default:
        return "btn-outline text-fiap-orange hover:bg-fiap-orange hover:text-white hover:border-white";
    }
  }

  function onClick() {
    if (options.onClick) options.onClick();
  }

  return (
    <button
      type={options.type}
      className={`btn px-7 border-[2px] ${options.outlined ? getOutlinedColor() : getColor()} ${
        options.className || ""
      }`}
      disabled={options.disabled}
      onClick={() => onClick()}
    >
      {options.text}
    </button>
  );
}
