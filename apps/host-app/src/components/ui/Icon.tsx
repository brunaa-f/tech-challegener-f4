"use client";

import { IconOptions } from "@/shared/models/Icon";

export default function Icon(options: IconOptions) {
  return (
    <span className={`material-icons ${options.className || ""}`} title={options.title}>
      {options.name}
    </span>
  );
}
