"use client";

import Button from "@/components/ui/Button";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Icon from "@/components/ui/Icon";
import { useState } from "react";
import Aside from "./Aside";
import { HeaderLogadoOptions } from "../../shared/models/Header";
import { useRouter } from "next/navigation";

export default function HeaderLogado(options: HeaderLogadoOptions) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const deslogar = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  return (
    <header className="flex justify-between items-center w-full bg-fiap-navy-blue text-white h-24 px-6 md:px-14 lg:px-20">
      <div className="container mx-auto flex justify-between items-center relative">
        <div className="sm:hidden">
          <button onClick={toggleMenu}>
            <Icon className="text-fiap-red" name="menu" />
          </button>
        </div>

        <Button className="max-sm:hidden" text="Sair" color="green" onClick={deslogar}></Button>

        <div className="flex items-center">
          <span className="pr-4 max-sm:hidden">{options.userName}</span>
          <Image className="" src="/avatar-header.png" width={40} height={40} alt="Imagem da conta" />
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden absolute top-0 left-0 w-48 bg-fiap-light-green z-40 shadow-lg">
          <button className="absolute right-0 p-1" onClick={toggleMenu}>
            <Icon className="!text-xl text-fiap-green" name="close" />
          </button>

          <div className="px-6">
            <Aside onRouteClicked={toggleMenu} />
          </div>

          <div className="px-4 py-5 w-full">
            <Button className="w-full" text="Sair" color="green" onClick={deslogar}></Button>
          </div>
        </div>
      )}
    </header>
  );
}
