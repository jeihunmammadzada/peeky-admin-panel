import React, { useEffect, useState } from "react";
import { GetEmployeeComplaintCount } from "@/utils/actions";
import { Doughnut } from "react-chartjs-2";
import Loading from "@/pages/dashboard/loading";
import { useSelector } from "react-redux";

const MostReportedDrivers = () => {
  const [chartData, setChartData] = useState<any>();
  const [error, setError] = useState<boolean>(false);
  const dates = useSelector((state: any) => state);

  // Options ilə legend-i aşağı salırıq
  const options: any = {
    cutout: "60%",
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
      await GetEmployeeComplaintCount(dates.beginDate, dates.endDate)
        .then((res) => {
          if (res) {
            const dchart = {
              datasets: [
                {
                  data: res.data.complaints.map(item => item.complaintCount),
                  backgroundColor: [
                    "#6259ca",
                    "#53caed",
                    "#01b8ff",
                    "#000",
                    "#ff0000",
                  ],
                },
              ],
              labels: res.data.complaints.map(item => item.elementName),
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
      <Doughnut
        data={chartData}
        options={options}
        className="chartjs-render-monitor w-auto ht-250 m-auto"
        height="120"
      />
    );
  }
};

MostReportedDrivers.layout = "Contentlayout"
export default MostReportedDrivers;
