// Remova a criação do contexto customizado e use apenas o NextAuth SessionProvider
"use client";
import { SessionProvider as NextAuthProvider } from "next-auth/react";
import { ReactNode } from "react";

// Apenas use o SessionProvider do NextAuth
interface SessionProviderProps {
  children: ReactNode;
}

export function SessionProvider({ children }: SessionProviderProps) {
  return <NextAuthProvider>{children}</NextAuthProvider>;
}