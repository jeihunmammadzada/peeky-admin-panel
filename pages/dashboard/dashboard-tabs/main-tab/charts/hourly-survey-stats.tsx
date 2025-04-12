import React, { useEffect, useState } from "react";
import { GetAverageCountByHour } from "@/utils/actions";
import { useSelector } from "react-redux";
import { Hours } from "@/const/definitions";
import { Bar } from "react-chartjs-2";
import Loading from "@/pages/dashboard/loading";

const HourlySurveyStats = () => {
  const [chartData, setChartData] = useState<any>();
  const [error, setError] = useState<boolean>(false);
  const dates = useSelector((state: any) => state);

  const options: any = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        display: false,
        min: -0.5,
      },
    },
    plugins: {
      legend: {
        maxWidth: 20,
        display: false,
      },
    },
  };

  useEffect(() => {
    setChartData(null);
    // Fill data of chart
    const fetchData = async () => {
      await GetAverageCountByHour()
        .then((res) => {
          if (res) {

            const final = Object.entries(Hours).map(([startHourStr, label]) => {
                const start = parseInt(startHourStr);
                const end = start + 2;
              
                const total = res.data.result
                  .filter((item) => item.hour >= start && item.hour < end)
                  .reduce((sum, item) => sum + item.averageCount, 0);
              
                return { label, count: total };
              });

            // Bütün günləri sırayla çəkirik
            const chartData = {
              labels: final.map((item) => item.label),
              datasets: [
                {
                  data: final.map((item) => item.count),
                  backgroundColor: ["#6E6AFF"],
                  borderColor: ["#6E6AFF"],
                  borderWidth: 0,
                  borderRadius: 30,
                  borderSkipped: false,
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
  }, [dates]);

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

HourlySurveyStats.layout = "Contentlayout";
export default HourlySurveyStats;
