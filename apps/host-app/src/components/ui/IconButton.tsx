"use client";

import Icon from "./Icon";
import { IconButtonOptions } from "@/shared/models/Icon";

export default function IconButton(options: IconButtonOptions) {
  function getColor() {
    switch (options.color) {
      case "green":
        return "text-white bg-fiap-green border-none hover:bg-fiap-green-hover";
      case "blue":
        return "text-white bg-fiap-navy-blue border-none hover:bg-fiap-navy-blue-hover";
      case "black":
        return "text-white bg-black";
      // case "transparent":
      //   return "text-black bg-transparent border-black";
      case "gray":
        return "text-gray-600 bg-gray-200 border-none";
      default:
        return "text-white bg-fiap-red border-none hover:bg-fiap-red-hover";
    }
  }

  function onClick() {
    if (options.onClick) options.onClick();
  }

  return (
    <div
      className={`flex items-center justify-center w-7 h-7 cursor-pointer rounded-full transition-opacity duration-200 ${getColor()} ${
        options.className || ""
      }`}
      onClick={onClick}
    >
      <Icon className="!text-base" name={options.icon} title={options.title} />
    </div>
  );
}
