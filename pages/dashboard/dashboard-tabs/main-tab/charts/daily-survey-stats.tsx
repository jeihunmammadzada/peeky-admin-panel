import React, { useEffect, useState } from "react";
import { GetAverageCountDayOfWeek } from "@/utils/actions";
import { useSelector } from "react-redux";
import { DaysOfWeek } from "@/const/definitions";
import { Bar } from "react-chartjs-2";
import Loading from "@/pages/dashboard/loading";

const DailySurveyStats = () => {
  const [chartData, setChartData] = useState<any>();
  const [error, setError] = useState<boolean>(false);
  const dates = useSelector((state: any) => state);

  const options: any = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        display: false,
        min: -0.3,
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
      await GetAverageCountDayOfWeek()
        .then((res) => {
          if (res) {
            // Bütün günləri sırayla çəkirik
            const allDays: (keyof typeof DaysOfWeek)[] = [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ];

            const chartData = {
              labels: ["B.E.", "Ç.A.", "Ç.", "C.A", "C.", "Ş.", "B."],
              datasets: [
                {
                  data: allDays.map((day) => {
                    const found = res.data.result.find((d) => d.dayOfWeek === day);
                    return found ? found.averageCount : 0
                  }),
                  backgroundColor: ["#84DCC6"],
                  borderColor: ["#84DCC6"],
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

DailySurveyStats.layout = "Contentlayout";
export default DailySurveyStats;
