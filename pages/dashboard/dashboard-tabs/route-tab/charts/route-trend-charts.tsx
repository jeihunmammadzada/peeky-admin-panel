import { GetRouteMonthlyRating } from "@/utils/actions";
import { Months, QuestionsEnum } from "@/const/definitions";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import Loading from "@/pages/dashboard/loading";
import { useSelector } from "react-redux";

const RouteTrendChart = () => {
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
        display: true,
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
      await GetRouteMonthlyRating()
        .then((res) => {
          if (res) {
            const now = new Date();

            const last6Months = Array.from({ length: 6 }, (_, i) => {
              const d = new Date(now);
              d.setMonth(d.getMonth() - i);
              const year = d.getFullYear();
              const month = d.getMonth() + 1;
              return {
                month,
                label: `${Months[month]}`,
              };
            }).reverse();

            const chartData = {
              labels: last6Months.map((m) => m.label),
              datasets: [
                {
                  label:
                    QuestionsEnum[
                      res.data.result[0].ratingsByQuestion[0].orderNumber
                    ],
                  data: last6Months.map((m) => {
                    const found = res.data.result.find((d) => {
                      const Month = new Date(d.endOfMonth).getMonth() + 1;
                      return Month === m.month;
                    });
                    return found
                      ? found.ratingsByQuestion[0].rating.toFixed(1)
                      : 0;
                  }),
                  backgroundColor: ["#6E6AFF"],
                  borderColor: ["#6E6AFF"],
                  borderWidth: 0,
                  barPercentage: 0.6,
                  pointBackgroundColor: "#ffffff",
                },
                {
                  label:
                    QuestionsEnum[
                      res.data.result[0].ratingsByQuestion[1].orderNumber
                    ],
                  data: last6Months.map((m) => {
                    const found = res.data.result.find((d) => {
                      const Month = new Date(d.endOfMonth).getMonth() + 1;
                      return Month === m.month;
                    });
                    return found
                      ? found.ratingsByQuestion[1].rating.toFixed(1)
                      : 0;
                  }),
                  backgroundColor: ["#F7941D"],
                  borderColor: ["#F7941D"],
                  borderWidth: 0,
                  barPercentage: 0.6,
                  pointBackgroundColor: "#ffffff",
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

RouteTrendChart.layout = "Contentlayout";
export default RouteTrendChart;
