"use client";

import Aside from "@/components/layout/Aside";
import CardNovaTransacao from "@/components/layout/transacao/CardNovaTransacao";
import Extrato from "@/components/layout/transacao/Extrato";
import Saldo from "@/components/layout/transacao/Saldo";
import LayoutLogado from "@/components/layout/LayoutLogado";
import { useDispatch } from "react-redux";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { AppDispatch } from "@/store";
import { fetchDadosIniciais } from "@/features/transactions/transactionSlice";

export default function Index() {
    const { data: session } = useSession();
    const dispatch = useDispatch<AppDispatch>();
    const userId = Number(session?.user.id)

    useEffect(() => {
      if (userId) {
        dispatch(fetchDadosIniciais(userId));
      }
    }, [userId, dispatch]);
  
  return (
    <LayoutLogado>
      <div className="flex flex-col lg:flex-row lg:justify-center overflow-auto max-w-[1024px] mx-auto max-sm:px-6 max-md:px-[3.75rem] p-6 pb-8 w-full h-full gap-8 lg:gap-4">
        <Aside removeOnMobile={true} />
        <div className="flex flex-col w-full lg:max-w-[690px] h-max gap-8">
          <Saldo />
          <CardNovaTransacao userId={userId} />
        </div>
        <Extrato userId={userId}/>
      </div>
    </LayoutLogado>
  );
}