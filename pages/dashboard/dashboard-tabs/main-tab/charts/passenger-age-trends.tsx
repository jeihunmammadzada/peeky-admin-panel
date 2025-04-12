import React, { useEffect, useState } from "react";
import { GetSurveyCountByAge } from "@/utils/actions";
import { Bar } from "react-chartjs-2";
import Loading from "@/pages/dashboard/loading";

const PassengerAgeTrends = () => {
    const [chartData, setChartData] = useState<any>();
    const [error, setError] = useState<boolean>(false);


  // Linechart
  interface LineChartOptions {
    responsive: boolean;
    maintainAspectRatio: boolean;
    plugins: {
      legend: {
        display: boolean,
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
        await GetSurveyCountByAge()
          .then((res) => {
  
            if (res) {
              const data = res.data.result;
              const chartData = {
                labels: ["<18", "18-24","25-34", "35-44", "45-54", "55-64",">65"],
                datasets: [
                  {
                    data: [data.lessThan18, data.from18To24, data.from25To34, data.from35To44, data.from35To44, data.from45To54, data.from55To64, data.moreThan65],
                    backgroundColor: ["#6D6AFF"],
                    borderWidth: 0,
                    barPercentage: 0.6,
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
  );}
};


PassengerAgeTrends.layout = "Contentlayout"
export default PassengerAgeTrends