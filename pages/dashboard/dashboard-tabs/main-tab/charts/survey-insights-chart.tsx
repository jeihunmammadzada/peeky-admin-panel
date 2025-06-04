import React, { useEffect, useState } from "react";
import { GetMonthlySurveyAnswer } from "@/utils/actions";
import { Months } from "@/const/definitions";
import { Line } from "react-chartjs-2";
import Loading from "@/pages/dashboard/loading";
import {
  ChartData,
  ChartOptions,
  Chart as ChartJS,
} from "chart.js";

const SurveyInsightChart = () => {
  const [chartData, setChartData] = useState<ChartData<"line"> | null>(null);
  const [error, setError] = useState<boolean>(false);

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
        position: "top",
      },
      title: {
        display: false,
      },
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await GetMonthlySurveyAnswer();
        if (!res?.data?.monthlySurveys) {
          setError(true);
          return;
        }

        const now = new Date();

        const last6Months = Array.from({ length: 6 }, (_, i) => {
          const d = new Date(now);
          d.setMonth(d.getMonth() - i);
          return {
            month: d.getMonth() + 1,
            year: d.getFullYear(),
            label: Months[d.getMonth() + 1],
          };
        }).reverse();

        const surveyData = res.data.monthlySurveys.map((d) => ({
          month: new Date(d.endOfMonth).getMonth() + 1,
          count: d.surveyCount,
        }));

        const data: ChartData<"line"> = {
          labels: last6Months.map((m) => m.label),
          datasets: [
            {
              label: "Bütün xətlər üzrə",
              data: last6Months.map((m) => {
                const found = surveyData.find((s) => s.month === m.month);
                return found ? found.count : 0;
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

        setChartData(data);
      } catch (e) {
        setError(true);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return (
      <div style={{ color: "red", fontWeight: "bold" }}>
        Məlumat yüklənərkən xəta baş verdi.
      </div>
    );
  }

  if (!chartData) {
    return <Loading />;
  }

  return (
    <Line
      data={chartData}
      options={options}
      className="barchart"
      height={250}
    />
  );
};

export default SurveyInsightChart;