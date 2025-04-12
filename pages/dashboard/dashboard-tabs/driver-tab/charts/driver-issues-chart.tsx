import { GetEmployeeComplaintCountByQuestion } from "@/utils/actions";
import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import Loading from "@/pages/dashboard/loading";
import { useSelector } from "react-redux";

const DriverIssueChart = () => {
  const [chartData, setChartData] = useState<any>();
  const [error, setError] = useState<boolean>(false);
  const dates = useSelector((state: any) => state);
  

  // Options ilə legend-i aşağı salırıq
  const options: any = {
    plugins: {
      legend: {
        position: "left",
        align: "center",
        labels: {
          boxWidth: 10,
          boxHeight: 10,
          borderRadius: 1000,
          useBorderRadius: true,
          usePointStyle: true,
          padding: 20,
          font: {
            size: 14,
          },
        },
      },
    },
  };

  useEffect(() => {
      setChartData(null);
      // Fill data of chart
      const fetchData = async () => {
        await GetEmployeeComplaintCountByQuestion(dates.beginDate, dates.endDate)
          .then((res) => {
            if (res) {
              const dchart = {
                datasets: [
                  {
                    data: res.data.complaints.map(item => item.complaintCount),
                    backgroundColor: [
                      "#6E6AFF", "#F7941D", "#32356A", "#37CDC0", "red"
                    ],
                  },
                ],
                labels: ["Avtobus idarəsi","İçki və siqaret", "Davranış", "Vaxtında çatma", "Geyim"],
                hoverOffset: 4,
              };
              setChartData(dchart);
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
      <Pie
        data={chartData}
        options={options}
        className="chartjs-render-monitor w-auto ht-250 m-auto"
        height="120"
      />
    );
  }
};

DriverIssueChart.layout = "Contentlayout"
export default DriverIssueChart;
