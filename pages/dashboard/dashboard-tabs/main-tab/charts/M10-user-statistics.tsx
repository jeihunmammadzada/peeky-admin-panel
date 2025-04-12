import { GetM10Satisfaction } from "@/utils/actions";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import Loading from "@/pages/dashboard/loading";

const M10UserStatistics  = () => {
    const [chartData, setChartData] = useState<any>();
    const [error, setError] = useState<boolean>(false);
    const dates = useSelector((state: any) => state);
  
    // Options ilə legend-i aşağı salırıq
    const options: any = {
      plugins: {
        legend: {
          position: "bottom",
          align: "center",
          labels: {
            boxWidth: 10,
            boxHeight: 10,
            borderRadius: 1000,
            useBorderRadius: true,
            usePointStyle: true,
            padding: 20,
            font: {
              size: 14
            },
          },
        },
      },
    };
  
    useEffect(() => {
      setChartData(null);
      // Fill data of chart
      const fetchData = async () => {
        await GetM10Satisfaction(dates.beginDate, dates.endDate)
          .then((res) => {
            if (res) {
              const chartData = {
                labels: ["İstifadə edir", "İstifadə etmir"],
                datasets: [
                  {
                    label: "",
                    data: [
                      res.data.result.satisfiedCount,
                      res.data.result.dissatisfiedCount,
                    ],
                    backgroundColor: ["#6E6AFF", "#F7941D"],
                    hoverOffset: 4,
                  },
                ],
              };
              setChartData(chartData);
            } else {
             setError(true)
            }
          })
          .catch((e) => {
            setError(true)
          });
      };
  
      fetchData();
    }, [dates]);
  
    if(error){
      return "Error"
    }
  
    if (!chartData) {
      return <Loading />;
    } else {
      return (
        <Pie
          data={chartData}
          options={options}
          className="chartjs-render-monitor w-auto ht-250 m-auto"
          height="120"
        />
      );
    }
  };

M10UserStatistics.layout = "Contentlayout"
export default M10UserStatistics