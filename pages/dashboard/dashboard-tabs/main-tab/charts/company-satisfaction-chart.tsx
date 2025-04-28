import { GetCompanySatisfaction } from "@/utils/actions";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import Loading from "@/pages/dashboard/loading";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
} from "chart.js";
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement
);

const CompanySatisfactionChart = () => {
  const [chartData, setChartData] = useState<any>();
  const [error, setError] = useState<boolean>(false);
  const dates = useSelector((state: any) => state);

  // Options ilə legend-i aşağı salırıq
  const options: any = {
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 10,
          boxHeight: 10,
          borderRadius: 1000,
          useBorderRadius: true,
          usePointStyle: true,
          padding: 20,
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        enabled: false,
      },
      datalabels: {
        formatter: (value: number, context: any) => {
          const data = context.chart.data.datasets[0].data;
          const total = data.reduce((acc: number, val: number) => acc + val, 0);
          const percentage = ((value / total) * 100).toFixed(1);
          return percentage + "%";
        },
        color: "#fff",
        font: {
          weight: "bold" as const,
          size: 14,
        },
      },
    },
  };

  useEffect(() => {
    setChartData(null);
    // Fill data of chart
    const fetchData = async () => {
      await GetCompanySatisfaction(dates.beginDate, dates.endDate)
        .then((res) => {
          if (res) {
            const chartData = {
              labels: ["Razı", "Narazı"],
              datasets: [
                {
                  label: "",
                  data: [
                    res.data.result.satisfiedCount,
                    res.data.result.dissatisfiedCount,
                  ],
                  backgroundColor: ["#6E6AFF", "#F7941D"],
                  hoverOffset: 10,
                },
              ],
            };
            setChartData(chartData);
          } else {
            setError(true);
          }
        })
        .catch((e) => {
          setError(true);
        });
    };

    fetchData();
  }, [dates]);

  if (error) {
    return "Error";
  }

  if (!chartData) {
    return <Loading />;
  } else {
    return (
      <>
        <Pie
          data={chartData}
          options={options}
          plugins={[ChartDataLabels]}
          className="chartjs-render-monitor w-auto ht-250 m-auto"
          height="120"
        />
      </>
    );
  }
};

CompanySatisfactionChart.layout = "Contentlayout";
export default CompanySatisfactionChart;
