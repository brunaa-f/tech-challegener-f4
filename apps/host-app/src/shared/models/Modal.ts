import { ReactNode } from "react";

export interface ModalOptions {
  children: ReactNode;
  isOpen: boolean;
  className?: string;
  childrenClassName?: string;
}
