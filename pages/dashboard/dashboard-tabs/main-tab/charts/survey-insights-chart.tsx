import { GetMonthlySurveyAnswer } from "@/utils/actions";
import { Months } from "@/const/definitions";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import Loading from "@/pages/dashboard/loading";
import { useSelector } from "react-redux";

const SurveyInsightChart = () => {
  const [chartData, setChartData] = useState<any>();
  const [error, setError] = useState<boolean>(false);

  const options: any = {
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
      await GetMonthlySurveyAnswer()
        .then((res) => {
          if (res) {
            const now = new Date();

            const last6Months = Array.from({ length: 6 }, (_, i) => {
              const d = new Date(now);
              d.setMonth(d.getMonth() - (i));
              const year = d.getFullYear();
              const month = d.getMonth() + 1;
              return {
                month,
                year,
                label: `${Months[month]}`,
              };
            }).reverse();

            const chartData = {
              labels: last6Months.map((m) => m.label),
              datasets: [
                {
                  label: "Bütün xətlər üzrə",
                  data: last6Months.map((m) => {
                    const found = res.data.monthlySurveys.find(
                      (d) => {
                        const Month = new Date(d.endOfMonth).getMonth()+1;
                        return Month === m.month;
                      }
                    );
                    return found ? found.surveyCount : 0;
                  }),
                  borderWidth: 2,
                  borderColor: "#53caed",
                  pointBackgroundColor: "#ffffff",
                  pointRadius: 2,
                  fill: true,
                  tension: 0.4,
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
      <Line
        data={chartData}
        options={options}
        className="barchart"
        height="250"
      />
    );
  }
};

SurveyInsightChart.layout = "Contentlayout";
export default SurveyInsightChart;
