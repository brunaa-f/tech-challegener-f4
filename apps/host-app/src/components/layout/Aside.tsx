"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {AsideOptions} from '../../shared/models/Aside'

export default function Aside(options: AsideOptions) {
  const pathName = usePathname();
  
  function linkActive(link: string) {
    return pathName === link 
    ? "text-fiap-green hover:text-gray-500" 
    : "text-black hover:text-gray-500";
  }
  function liActive(link: string) {
    return pathName === link
      ? "flex-1 lg:flex-none pb-4 border-solid border-b-[1px] border-fiap-green font-bold"
      : "flex-1 lg:flex-none md:pb-4 lg:border-solid lg:border-b-[1px] border-black ";
  }

  function onLinkClicked() {
    if (options?.onRouteClicked) options.onRouteClicked();
  }

  return (
    <ul
      className={`${
        options?.removeOnMobile ? "max-sm:hidden" : "pt-6"
      } flex max-sm:flex-col lg:flex-col list-none gap-4 lg:bg-fiap-white  m-0 rounded-lg text-center lg:w-[180px] lg:p-8`}
    >
      <li className={`${liActive("/home")}`}>
        <Link href="/home" className={`${linkActive("/home")}`} onClick={() => onLinkClicked()}>
          Início
        </Link>
      </li>
      <li className={`${liActive("/transferencias")}`}>
        <Link href="/transferencias" className={`${linkActive("/transferencias")}`} onClick={() => onLinkClicked()}>
          Transferências
        </Link>
      </li>
      <li className={`${liActive("/investimentos")}`}>
        <Link href="/investimentos" className={`${linkActive("/investimentos")}`} onClick={() => onLinkClicked()}>
          Investimentos
        </Link>
      </li>
      <li className={`${liActive("/outrosServiços")}`}>
        <Link href="/outrosServicos" className={`${linkActive("/outrosServicos")}`} onClick={() => onLinkClicked()}>
          Outros Serviços
        </Link>
      </li>
    </ul>
  );
}
