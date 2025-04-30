import React from "react";
import { getInvestimentos } from "../../application/use-cases/getInvestimentos";
import { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";

export const CardNovoInvestimento: React.FC = () => {
  const investimentos = getInvestimentos();
  const series: ApexOptions["series"] = investimentos.map((i) => i.valor);

  const chartOptions: ApexOptions = {
    chart: { foreColor: "#FFFFFF", fontFamily: "Inter", height: 184, type: "donut" },
    stroke: { width: 0 },
    colors: ["#2567F9", "#8F3CFF", "#FF3C82", "#F1823D"],
    plotOptions: { pie: { customScale: 0.8, donut: { size: "70%" } } },
    labels: investimentos.map((i) => i.tipo),
    dataLabels: { enabled: false },
    grid: { padding: { left: -10 } },
    legend: {
      show: true,
      fontSize: "16px",
      fontFamily: "Inter",
      markers: { size: 5, offsetX: -12, offsetY: 0, strokeWidth: 0 },
      itemMargin: { horizontal: 30, vertical: 10 },
    },
    responsive: [
      {
        breakpoint: 640,
        options: {
          chart: { height: 340, width: "100%", type: "donut" },
          legend: {
            position: "bottom",
            horizontalAlign: "left",
            fontSize: "16px",
            itemMargin: { horizontal: 30, vertical: 10 },
          },
        },
      },
    ],
  };

  return (
    <div className="flex relative max-sm:flex-col w-full bg-fiap-light-gray rounded-[8px]">
      {/* ...mesmo conteúdo que antes */}
    </div>
  );
};
