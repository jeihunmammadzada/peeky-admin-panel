import React, { useEffect, useState } from "react";
import { GetSurveyCountByAge } from "@/utils/actions";
import { Bar } from "react-chartjs-2";
import Loading from "@/pages/dashboard/loading";
import { ChartData, ChartOptions } from "chart.js";

const PassengerAgeTrends = () => {
  const [chartData, setChartData] = useState<ChartData<"bar"> | null>(null);
  const [error, setError] = useState<boolean>(false);

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
        position: "top",
      },
      title: {
        display: false,
        text: "Sərnişinlərin yaş aralığı",
      },
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await GetSurveyCountByAge();
        if (!res?.data?.result) {
          setError(true);
          return;
        }

        const data = res.data.result;
        const chartData: ChartData<"bar"> = {
          labels: ["<18", "18-24", "25-34", "35-44", "45-54", "55-64", ">65"],
          datasets: [
            {
              label: "Cavab sayı",
              data: [
                data.lessThan18,
                data.from18To24,
                data.from25To34,
                data.from35To44,
                data.from45To54,
                data.from55To64,
                data.moreThan65,
              ],
              backgroundColor: "#84DCC6",
              borderWidth: 0,
              barPercentage: 0.6,
            },
          ],
        };

        setChartData(chartData);
      } catch {
        setError(true);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return (
      <div style={{ color: "red", fontWeight: "bold" }}>
        Sərnişin yaş məlumatları yüklənərkən xəta baş verdi.
      </div>
    );
  }

  if (!chartData) {
    return <Loading />;
  }

  return (
    <Bar
      data={chartData}
      options={options}
      className="barchart"
      height={250}
    />
  );
};

export default PassengerAgeTrends;