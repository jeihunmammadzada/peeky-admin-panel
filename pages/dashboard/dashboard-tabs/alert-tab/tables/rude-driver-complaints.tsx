import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { formatDistanceToNow } from "date-fns";
import { az } from "date-fns/locale";
import { WarningSurveyResult } from "@/utils/responseModels";
import Loading from "@/pages/dashboard/loading";
import { GetWarningOfEmployeeBehaviour } from "@/utils/actions";
import NotFound from "@/pages/components/notFound";

const RudeDriverComplaints= () => {
  const [data, setData] = useState<WarningSurveyResult[] | null>();
  const [loading, setLoading] = useState<boolean>();
  const [error, setError] = useState<boolean>();
  const dates = useSelector((state: any) => state);

  const getList = async () => {
    setLoading(true);
    await GetWarningOfEmployeeBehaviour()
      .then((res) => {
        setLoading(false);
        if (res) {
          setData(res.data.result);
        } else {
          setError(true);
        }
      })
      .catch((e) => setError(true));
  };

  useEffect(() => {
    if (data == null) {
      getList();
    }
  }, []);

  return (
    <>
      {loading && (
        <div className="chartjs-wrapper-demo custom-align pie-chart">
          <Loading />
        </div>
      )}

      {error && (
        <div className="chartjs-wrapper-demo custom-align pie-chart">Error</div>
      )}

      {data?.length! > 0 ? (
        <div className="table-responsive border border-bottom-0 mt-3">
          <table className="table text-nowrap text-md-nowrap table-hover mg-b-0">
            <thead style={{"background": "red"}}>
              <tr>
                <th style={{ textTransform: "capitalize", "background": "red", color: "white" }}>
                  Eyniləşdirmə <br /> nömrəsi
                </th>
                <th style={{ textTransform: "capitalize", "background": "red", color: "white" }}>Vaxt</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((data) => (
                <tr key={data.rowNumber} data-index={data.rowNumber}>
                  <td style={{fontWeight: "bold"}}>{data.identificationNumber}</td>
                  <td>
                    {formatDistanceToNow(new Date(data.time), {
                      addSuffix: true,
                      locale: az,
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ): <NotFound />}
    </>
  );
};


RudeDriverComplaints.layout = "Contentlayout"
export default RudeDriverComplaints;

