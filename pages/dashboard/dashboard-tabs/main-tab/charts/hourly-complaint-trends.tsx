import React, { useEffect, useState } from "react";
import { GetSurveyCountByShift } from "@/utils/actions";
import { Bar } from "react-chartjs-2";
import Loading from "@/pages/dashboard/loading";

const HourlyComplaintTrends = () => {
  const [chartData, setChartData] = useState<any>();
  const [error, setError] = useState<boolean>(false);

  // Linechart
  interface LineChartOptions {
    responsive: boolean;
    maintainAspectRatio: boolean;
    plugins: {
      legend: {
        display: boolean;
        position:
          | "left"
          | "top"
          | "right"
          | "bottom"
          | "center"
          | "chartArea"
          | {
              [scaleId: string]: number;
            }
          | undefined;
      };
      title: {
        display: boolean;
        text: string;
      };
    };
  }

  const options: LineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
        position: "top",
      },
      title: {
        display: false,
        text: "Chart.js Line Chart",
      },
    },
  };

  useEffect(() => {
    setChartData(null);
    // Fill data of chart
    const fetchData = async () => {
      await GetSurveyCountByShift()
        .then((res) => {
          if (res) {
            const data = res.data.result;
            const chartData = {
              labels: ["06:00-12:00", "17:00-00:00"],
              datasets: [
                {
                  data: [data.firstShiftCount, data.secondShiftCount],
                  backgroundColor: ["#6D6AFF"],
                  borderWidth: 0,
                  barPercentage: 0.4,
                  pointBackgroundColor: "#ffffff",
                  label: "",
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
  }, []);

  if (error) {
    return "Error";
  }
  if (!chartData) {
    return <Loading />;
  } else {
    return (
      <Bar
        options={options}
        data={chartData}
        className="barchart"
        height="250"
      />
    );
  }
};

HourlyComplaintTrends.layout = "Contentlayout";
export default HourlyComplaintTrends;
