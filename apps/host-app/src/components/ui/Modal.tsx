import React from "react";
import { ModalOptions } from "@/shared/models/Modal";

export default function Modal(options: ModalOptions) {
  if (!options.isOpen) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ${
        options.className || ""
      }`}
    >
      <div className={`bg-fiap-white p-6 rounded-lg shadow-lg ${options.childrenClassName || ""}`}>
        {options.children}
      </div>
    </div>
  );
}
