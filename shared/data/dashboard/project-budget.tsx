import React from "react";
import Chart from "chart.js/auto";
import * as dashboardmain from "./dashboardmain";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const ProjectBudget = () => {
  return (
    <div>
      <ReactApexChart
        options={dashboardmain.linechartoptions.options}
        series={dashboardmain.linechartoptions.series}
        type="line"
        height={320}
      />
    </div>
  );
};

export default ProjectBudget;
