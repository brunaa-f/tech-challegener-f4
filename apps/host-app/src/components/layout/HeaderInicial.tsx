"use client";

import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import Icon from "@/components/ui/Icon";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function HeaderInicial() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  function navigate(path: string) {
    toggleMenu();
    router.push(path);
  }

  return (
    <header className="w-full bg-black text-fiap-green h-24 flex px-6 md:px-14 lg:px-20">
      <div className="container mx-auto flex justify-between items-center relative">
        <div className="flex items-center max-sm:flex-row-reverse max-sm:w-full justify-between">
          <Link href="/"> 
            <Image className="lg:mr-12 block sm:hidden lg:block" src="/logo.svg" width={140} height={80} alt="Logo" />
          </Link>
          
          <Image
            className="mr-12 hidden sm:block lg:hidden"
            src="/logo-bytebank-tablet.png"
            width={26}
            height={26}
            alt="Logo"
          />

          <div className="sm:hidden">
            <button onClick={toggleMenu}>
              <Icon name="menu" />
            </button>
          </div>

          <div className="hidden sm:flex font-semibold gap-10 sm:gap-6">
            <Link href="/sobre" className="hover:text-white" onClick={toggleMenu}>
              Sobre
            </Link>
            <Link href="/servicos" className="hover:text-white" onClick={toggleMenu}>
              Serviços
            </Link>
          </div>
        </div>

        <div className="hidden sm:flex gap-6">
          <Button color="green" text="Abrir minha conta" onClick={() => navigate("/nova-conta")} />
          <Button color="green" text="Já tenho conta" outlined={true} onClick={() => navigate("/login")} />
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden absolute top-0 left-0 w-48 bg-fiap-light-green z-40 shadow-lg">
          <button className="absolute right-0 p-1" onClick={toggleMenu}>
            <Icon className="!text-xl" name="close" />
          </button>

          <div className="flex flex-col items-center pt-6 font-semibold">
            <Link href="/sobre" className="block px-5 py-1 hover:text-white" onClick={toggleMenu}>
              Sobre
            </Link>
            <Link href="/servicos" className="block px-5 py-1 hover:text-white" onClick={toggleMenu}>
              Serviços
            </Link>
          </div>

          <div className="flex flex-col px-4 py-5 gap-4">
            <Button color="green" text="Abrir minha conta" onClick={() => navigate("/nova-conta")} />
            <Button color="green" text="Já tenho conta" outlined={true} onClick={() => navigate("/login")} />
          </div>
        </div>
      )}
    </header>
  );
}
