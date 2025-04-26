import { position } from "@chakra-ui/react";
import { ApexOptions } from "apexcharts";
import React from "react";
import Chart from "react-apexcharts";

interface Investimento {
  tipo: string;
  descricao: string;
  valor: number;
}

export const CardNovoInvestimento: React.FC = () => {
  var investimentos: Investimento[] = [
    { tipo: "Fundos de investimentos", descricao: "Investimentos em fundos variados", valor: 25000 },
    { tipo: "Tesouro direto", descricao: "Títulos do governo federal", valor: 27000 },
    { tipo: "Previdência Privada", descricao: "Planos de previdência", valor: 23000 },
    { tipo: "Bolsa de Valores", descricao: "Ações negociadas na bolsa", valor: 27000 },
  ];

  var series: ApexOptions["series"] = investimentos.map((i) => i.valor);

  var chartOptions: ApexOptions = {
    chart: {
      foreColor: "#FFFFFF",
      fontFamily: "Inter",
      height: 184,
      type: "donut",
    },
    stroke: { width: 0 },
    colors: ["#2567F9", "#8F3CFF", "#FF3C82", "#F1823D"],
    plotOptions: {
      pie: { customScale: 0.8, donut: { size: "70%" } },
    },
    labels: investimentos.map((i) => i.tipo),
    dataLabels: { enabled: false },
    grid: { padding: { left: -10 } },
    legend: {
      show: true,
      fontSize: "16px",
      fontFamily: "Inter",
      offsetX: 0,
      offsetY: -5,
      markers: { size: 5, offsetX: -12, offsetY: 0, strokeWidth: 0 },
      itemMargin: { horizontal: 30, vertical: 10 },
    },
    responsive: [
      {
        breakpoint: 640,
        options: {
          chart: {
            foreColor: "#FFFFFF",
            fontFamily: "Inter",
            height: 340,
            width: "100%",
            type: "donut",
          },
          legend: {
            position: "bottom",
            horizontalAlign: "left",
            show: true,
            fontSize: "16px",
            fontFamily: "Inter",
            offsetX: -15,
            offsetY: -10,
            markers: { size: 5, offsetX: -12, offsetY: 0, strokeWidth: 0 },
            itemMargin: { horizontal: 30, vertical: 10 },
          },
        },
      },
    ],
  };

  return (
    <>
      <div className="flex relative max-sm:flex-col w-full bg-fiap-light-gray rounded-[8px]">
        <div className="z-20 px-8 py-6 w-full h-auto">
          <div className="flex flex-col pb-8">
            <h2 className="text-lg text-black font-bold pb-5">Investimentos</h2>

            <span className="text-fiap-navy-blue text-2xl pb-8">Total: R$ 50.000,00</span>

            <div className="flex max-sm:flex-col w-full gap-6">
              <div className="flex flex-col justify-center items-center h-24 rounded bg-fiap-navy-blue w-full gap-2">
                <span className="text-base text-white">Renda fixa</span>
                <span className="text-xl text-white">R$ 36.000,00</span>
              </div>

              <div className="flex flex-col justify-center items-center h-24 rounded bg-fiap-navy-blue w-full gap-2">
                <span className="text-base text-white">Renda variável</span>
                <span className="text-xl text-white">R$ 14.000,00</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col pt-14">
            <h2 className="text-xl text-black pb-5">Estatísticas</h2>

            <div className="rounded bg-fiap-navy-blue">
              <Chart type="donut" height={184} series={series} options={chartOptions} />
            </div>
          </div>
        </div>

        <img
          className="absolute top-0 right-0"
          src="/pixels-nova-transacao.svg"
          width={180}
          height={177}
          alt="pixels"
        />
        <img className="absolute bottom-0" src="/pixels-nova-transacao.svg" width={180} height={177} alt="pixels" />
      </div>
    </>
  );
};

export default CardNovoInvestimento;
