import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { GetRouteRating } from "@/utils/actions";
import { Card, Table } from "react-bootstrap";
import { RatingResult } from "@/utils/responseModels";
import Loading from "@/pages/dashboard/loading";

const RouteGeneralRating = () => {
  const [data, setData] = useState<{ first: RatingResult[]; last: RatingResult[] } | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const dates = useSelector((state: any) => state);

  useEffect(() => {
    const getList = async () => {
      try {
        setLoading(true);
        const res = await GetRouteRating(dates.beginDate, dates.endDate);
        setLoading(false);

        if (res?.data?.result?.length! > 0) {
          const sorted = res?.data.result;
          setData({
            first: sorted!.slice(0, 3),
            last: sorted!.slice(-3),
          });
        } else {
          setError(true);
        }
      } catch {
        setLoading(false);
        setError(true);
      }
    };

    getList();
  }, [dates]);

  const renderRow = (item: RatingResult, color?: string) => (
    <tr key={item.rowNumber}>
      <th scope="row" style={{ backgroundColor: color, color: color ? "white" : undefined }}>
        {item.rowNumber}
      </th>
      <td style={{ backgroundColor: color, color: color ? "white" : undefined }}>
        {item.ratingElement}
      </td>
      <td style={{ backgroundColor: color, color: color ? "white" : undefined }}>
        {item.rating.toFixed(1)}/{" "}
        <span style={{ fontWeight: "bold", color: color ? "white" : "#7468E9" }}>
          {item.maximumRating}.00
        </span>
      </td>
    </tr>
  );

  return (
    <Card className="custom-card overflow-hidden">
      <h6 className="main-content-label mb-1 ms-3 mt-3" style={{ textTransform: "initial" }}>
        Xəttlər üzrə ümumi reytinq
      </h6>

      {loading && (
        <Card.Body className="pt-0">
          <div className="chartjs-wrapper-demo custom-align pie-chart">
            <Loading />
          </div>
        </Card.Body>
      )}

      {error && (
        <Card.Body>
          <div className="chartjs-wrapper-demo custom-align pie-chart">Məlumat tapılmadı</div>
        </Card.Body>
      )}

      {data && (
        <>
          <Card.Body className="pt-0">
            <div className="responsive">
              <Table style={{ marginTop: "20px" }} borderless className="text-nowrap">
                <thead>
                  <tr>
                    <th style={{ textTransform: "initial", width: "10px" }} scope="col">#</th>
                    <th style={{ textTransform: "initial" }} scope="col">Xəttin adı</th>
                    <th style={{ textTransform: "initial" }} scope="col">Yekun bal</th>
                  </tr>
                </thead>
                <tbody>{data.first.map((item) => renderRow(item))}</tbody>
              </Table>
            </div>
          </Card.Body>

          <Card.Body style={{ backgroundColor: "#6D6AFF" }}>
            <div className="responsive">
              <Table borderless className="text-nowrap">
                <thead>
                  <tr>
                    <th style={{ textTransform: "initial", backgroundColor: "#6D6AFF", color: "white", width: "10px" }} scope="col">#</th>
                    <th style={{ textTransform: "initial", backgroundColor: "#6D6AFF", color: "white" }} scope="col">Xəttin adı</th>
                    <th style={{ textTransform: "initial", backgroundColor: "#6D6AFF", color: "white" }} scope="col">Yekun bal</th>
                  </tr>
                </thead>
                <tbody>{data.last.map((item) => renderRow(item, "#6D6AFF"))}</tbody>
              </Table>
            </div>
          </Card.Body>
        </>
      )}
    </Card>
  );
};

RouteGeneralRating.layout = "Contentlayout";
export default RouteGeneralRating;