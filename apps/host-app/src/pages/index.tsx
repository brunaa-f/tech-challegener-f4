import Link from "next/link";
import HeaderInicial from "@/components/layout/HeaderInicial";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import Image from "next/image";

const data = {
  features: [
    {
      icon: "/icon-gift.svg",
      title: "Conta e cartão gratuitos",
      description: "Isso mesmo, nossa conta é digital, sem custo fixo e mais que isso: sem tarifa de manutenção.",
    },
    {
      icon: "/icon-money.svg",
      title: "Saques sem custo",
      description: "Você pode sacar gratuitamente 4x por mês de qualquer Banco 24h.",
    },
    {
      icon: "/icon-star.svg",
      title: "Programa de pontos",
      description: "Você pode acumular pontos com suas compras no crédito sem pagar mensalidade!",
    },
    {
      icon: "/icon-devices.svg",
      title: "Seguro Dispositivos",
      description: "Seus dispositivos móveis (computador e laptop) protegidos por uma mensalidade simbólica.",
    },
  ],
};

const Home: React.FC = () => {
  const features = data.features;

  return (
    <main className="flex flex-col overflow-hidden h-screen w-screen bg-gradient-to-b from-fiap-navy-blue to-white">
      <HeaderInicial />
      <div className="flex flex-col justify-between h-full w-full overflow-x-hidden overflow-y-scroll">
        <div className="flex flex-col">
          <div className="bg-bottom md:bg-cover sm:bg-contain md:min-h-screen">
            <div className="flex flex-col items-center lg:flex-row justify-between max-w-6xl mx-auto w-full mt-10 px-4">
              <h1 className="text-2xl font-bold text-black text-center lg:text-left mb-4 lg:mb-0 lg:w-1/2">
                Experimente mais liberdade no <br /> controle da sua vida financeira. <br /> Crie sua conta com a gente!
              </h1>
              <Image
                className="w-full lg:w-1/2 max-w-xs lg:max-w-none mx-auto"
                src="/ilustracao-banner.svg"
                width="662"
                height="413"
                alt=""
              />
            </div>
            <div className="md:hidden flex justify-center mt-3 gap-6 flex-wrap">
              <Link href="/nova-conta">
                <Button color="black" text="Abrir minha conta" />
              </Link>
              <Link href="/login">
                <Button color="black" text="Já tenho conta" outlined={true} />
              </Link>
            </div>
            <div className="flex flex-wrap justify-between max-w-6xl mx-auto w-full mt-10 mb-10 px-10 gap-3">
              {features.map((feature, index) => (
                <div key={index} className="flex flex-col items-center w-full sm:w-1/2 lg:w-1/4 p-4">
                  <Image className="mb-2" src={feature.icon} alt={feature.title} width="73" height="56" />
                  <h2 className="text-lg font-bold text-fiap-green font-inter text-[20px] flex items-center mb-1">
                    {feature.title}
                  </h2>
                  <p className="text-center text-fiap-gray w-[280px] h-[57px] font-inter font-normal text-[16px] leading-[120%] flex items-center">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </main>
  );
};

export default Home;
