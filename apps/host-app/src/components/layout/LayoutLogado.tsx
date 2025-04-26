"use client";

import { useSession } from "next-auth/react";
import HeaderLogado from "./HeaderLogado";

export default function LayoutLogado({ children }: Readonly<{ children: React.ReactNode }>) {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col overflow-hidden h-screen w-screen bg-fiap-light-green">
      <HeaderLogado userName={session?.user?.name ?? ""} />
      <div className="flex flex-col justify-between h-full w-full overflow-x-hidden overflow-y-scroll">
        <main className="flex flex-col">{children}</main>
      </div>
    </div>
  );
}
