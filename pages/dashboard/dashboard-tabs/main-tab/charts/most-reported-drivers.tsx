import React, { useEffect, useState } from "react";
import { GetEmployeeComplaintCount } from "@/utils/actions";
import { Doughnut } from "react-chartjs-2";
import Loading from "@/pages/dashboard/loading";
import { useSelector } from "react-redux";
import ChartDataLabels from 'chartjs-plugin-datalabels';

const MostReportedDrivers = () => {
  const [chartData, setChartData] = useState<any>();
  const [error, setError] = useState<boolean>(false);
  const dates = useSelector((state: any) => state);

  // Options ilə legend-i aşağı salırıq
  const options: any = {
    cutout: "60%",
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: false,
      },
      datalabels: {
        formatter: (value: number, context: any) => {
          const data = context.chart.data.datasets[0].data;
          const total = data.reduce((acc: number, val: number) => acc + val, 0);
          const percentage = ((value / total) * 100).toFixed(1);
          return percentage + "%";
        },
        color: '#fff',
        font: {
          weight: 'bold' as const,
          size: 14,
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
                    "#84DCC6", 
                    "#E4572E",
                    "#FFC145",
                    "#D1BCE3",
                    "#5B5F97",
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
      <>
        <div style={{marginRight: '50px'}} className="w-1/2">
          {chartData.labels.map((label: string, index: number) => (
            <div key={index} className="d-flex align-items-center gap-2 justify-content-start mb-1">
              <div
                className="rounded-circle"
                style={{
                  height: '10px',
                  width: '10px',
                  backgroundColor: chartData.datasets[0].backgroundColor[index],
                }}
              />
              <span className="text-sm">{label}</span>
            </div>
          ))}
        </div>
        <div className="w-1/2">
          <Doughnut
            data={chartData}
            options={options}
            plugins={[ChartDataLabels]}
            className="chartjs-render-monitor w-auto ht-100 m-auto"
            height="120"
          />
        </div>
      </>
    );
  }
};

MostReportedDrivers.layout = "Contentlayout"
export default MostReportedDrivers;
