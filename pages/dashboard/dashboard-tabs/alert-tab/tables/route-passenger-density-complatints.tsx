import React, { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { az } from "date-fns/locale";
import { WarningSurveyResult } from "@/utils/responseModels";
import Loading from "@/pages/dashboard/loading";
import { GetWarningOfRoutePassengerDensity } from "@/utils/actions";
import NotFound from "@/pages/components/notFound";
import { toast } from "react-toastify";

const RoutePassengerDensityComplaints = () => {
  const [data, setData] = useState<WarningSurveyResult[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const getList = async () => {
    setLoading(true);
    try {
      const res = await GetWarningOfRoutePassengerDensity();
      if (res?.data?.result) {
        setData(res.data.result);
      } else {
        setError(true);
      }
    } catch (err: any) {
      err.errors
              ? err.errors?.map((error: string) => {
                  toast.error(error, { autoClose: 5000 });
                })
              : toast.error(err.message, { autoClose: 5000 });
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getList();
  }, []);

  if (loading) {
    return (
      <div className="chartjs-wrapper-demo custom-align pie-chart">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="chartjs-wrapper-demo custom-align pie-chart">
        Xəta baş verdi
      </div>
    );
  }

  if (data?.length === 0) {
    return <NotFound />;
  }

  const headerStyle: React.CSSProperties = {
    textTransform: "capitalize",
    background: "red",
    color: "white",
  };

  return (
    <div className="table-responsive border border-bottom-0 mt-3">
      <table className="table text-nowrap text-md-nowrap table-hover mg-b-0">
        <thead>
          <tr>
            <th style={{ ...headerStyle, width: "50%" }}>
              Eyniləşdirmə <br /> nömrəsi
            </th>
            <th style={headerStyle}>Vaxt</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item) => (
            <tr key={item.rowNumber}>
              <td style={{ fontWeight: "bold" }}>{item.identificationNumber}</td>
              <td>
                {formatDistanceToNow(new Date(item.time), {
                  addSuffix: true,
                  locale: az,
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

RoutePassengerDensityComplaints.layout = "Contentlayout"
export default RoutePassengerDensityComplaints;