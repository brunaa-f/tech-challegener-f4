"use client";

import Aside from "@/components/layout/Aside";
import LayoutLogado from "@/components/layout/LayoutLogado";
import { ComponentType, lazy, useEffect, useState } from "react";

export default function Index() {
  
  const [Component, setComponent] = useState<ComponentType | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Carrega o componente de forma assíncrona
      const RemoteButton = lazy(() => import("remote/CardNovoInvestimento"));
      setComponent(() => RemoteButton);
    }
  }, []);

  return (
    <LayoutLogado>
      <div className="flex flex-col lg:flex-row lg:justify-center overflow-auto max-w-[1024px] mx-auto max-sm:px-6 max-md:px-[3.75rem] p-6 pb-8 w-full h-full gap-8 lg:gap-4">
        <Aside removeOnMobile={true} />
        <div className="flex flex-col w-full lg:max-w-[690px] h-max gap-8">{Component && <Component />}</div>
     
      </div>
    </LayoutLogado>
  );
}
