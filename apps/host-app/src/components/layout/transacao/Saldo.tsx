"use client";

import { formatarData, formatarMoeda } from "@/shared/utils/Formatters";
import { FormatoData } from "@/shared/types/FormatoData";
import Image from "next/image";
import Icon from "@/components/ui/Icon";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store";
import { useEffect } from "react";
import { atualizarSaldo } from "@/features/transactions/transactionSlice";

export default function Saldo() {
  const { data: session } = useSession();
  const date: string = formatarData(new Date(), FormatoData.DIA_SEMANA_DIA_MES_ANO);
  const dispatch = useDispatch<AppDispatch>();
  const saldoRedux = useSelector((state: any) => state.transaction.saldo);
  const saldoReduxFormato = formatarMoeda(saldoRedux || 0);

  useEffect(() => {
    if (session?.user?.id) {
      dispatch(atualizarSaldo(session.user.id));
    }
  }, [dispatch, session?.user?.id]);useEffect(() => {
  if (session?.user?.id) {
    dispatch(atualizarSaldo(session.user.id));
  }
}, [dispatch, session?.user?.id]);

  return (
    <div className="flex relative max-sm:flex-col max-sm:items-center max-sm:h-[600px] sm:min-h-[400px] w-full text-white bg-fiap-navy-blue rounded-[8px]">
      <div className="flex flex-col justify-between max-sm:text-center max-sm:p-10 max-sm:pb-0 max-sm:w-full w-1/2 z-20">
        <div className="flex flex-col sm:pt-8 sm:pl-8">
          <span className="pb-5 text-[25px] font-semibold"> Olá, {session?.user?.name}!</span>
          <span className="text-sm">{date}</span>
        </div>
      </div>

      <div className="flex flex-col text-xl max-sm:p-10 sm:pt-24 sm:pr-28 max-sm:w-full w-1/2 z-20">
        <div className="flex text-lg font-bold pb-2 border-b-2 border-white">
          <h2 className="text-lg font-bold">Saldo</h2>
          <Icon name="visibility" className="pl-6" />
        </div>
        <span className="text-base pt-4">Conta Corrente</span>
        <span className="text-3xl pt-1">{saldoReduxFormato}</span>
      </div>

      <Image
        className="absolute bottom-0 pb-6 z-10"
        src="/saldo-home.png"
        width={280}
        height={228}
        alt="Imagem do card de saldo"
      />
      <Image className="absolute top-0 right-0" src="/pixels-saldo.svg" width={180} height={177} alt="pixels" />
      <Image className="absolute bottom-0 left-0" src="/pixels-saldo.svg" width={180} height={177} alt="pixels" />
    </div>
  );
}