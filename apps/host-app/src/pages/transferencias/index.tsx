import Aside from "@/components/layout/Aside";
import LayoutLogado from "@/components/layout/LayoutLogado";
import TransacoesPage from "@/components/layout/transacao/TransacoesPage";
import { fetchDadosIniciais } from "@/features/transactions/transactionSlice";
import { AppDispatch } from "@/store";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function Transferencias() {
  
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
      <div className="flex flex-col lg:flex-row lg:justify-center overflow-auto w-full lg:w-[1024px]  mx-auto max-sm:px-6 max-md:px-[3.75rem] p-6 pb-8 h-full gap-8 lg:gap-4">
        <Aside removeOnMobile={true} />
        <div className="flex flex-col w-full h-max gap-8">
          <TransacoesPage userId={userId}/>
        </div>
      </div>
    </LayoutLogado>
  );
}