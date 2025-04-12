import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { QuestionsEnum } from "@/const/definitions";
import { GetQuestionComplaintCount } from "@/utils/actions";
import { Bar } from "react-chartjs-2";
import Loading from "@/pages/dashboard/loading";

const MostProblemsChart = () => {
  const [chartData, setChartData] = useState<any>();
  const [error, setError] = useState<boolean>(false);
  const dates = useSelector((state: any) => state);

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
      await GetQuestionComplaintCount(dates.beginDate, dates.endDate)
        .then((res) => {

          if (res) {
            const chartData = {
              labels: res?.data.complaints.map(item => QuestionsEnum[item.questionOrderNumber]),
              datasets: [
                {
                  data: res?.data.complaints.map(item => item.complaintCount),
                  backgroundColor: ["#32356A", "#6D6AFF", "#F6941C"],
                  borderColor: ["#32356A", "#6D6AFF", "#F6941C"],
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

MostProblemsChart.layout = "Contentlayout"
export default MostProblemsChart;
