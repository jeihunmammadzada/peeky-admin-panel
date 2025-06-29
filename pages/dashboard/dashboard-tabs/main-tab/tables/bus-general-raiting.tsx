import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { GetVehicleRating } from "@/utils/actions";
import { Card, Table } from "react-bootstrap";
import { RatingResult } from "@/utils/responseModels";
import Loading from "@/pages/dashboard/loading";

const BusGeneralRating = () => {
  const [data, setData] = useState<{ first: RatingResult[]; last: RatingResult[] } | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const dates = useSelector((state: any) => state);

  useEffect(() => {
    const getList = async () => {
      try {
        setLoading(true);
        const res = await GetVehicleRating(dates.beginDate, dates.endDate);
        setLoading(false);

        if (res?.data?.result?.length! > 0) {
          const sorted = res?.data.result;
          const first = sorted!.slice(0, 3);
          const last = sorted!.slice(-3);
          setData({ first, last });
        } else {
          setError(true);
        }
      } catch (e) {
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
        Avtobuslar üzrə ümumi reytinq
      </h6>

      {loading && (
        <Card.Body>
          <Loading />
        </Card.Body>
      )}

      {error && (
        <Card.Body>
                 <div className="chartjs-wrapper-demo custom-align pie-chart">
                 Məlumat tapılmadı
                 </div>
               </Card.Body>
      )}

      {data && (
        <>
          <Card.Body className="pt-0">
            <div className="responsive">
              <Table style={{ marginTop: "20px" }} borderless className="text-nowrap">
                <thead>
                  <tr>
                    <th style={{ width: "10px", textTransform: "initial" }}>#</th>
                    <th style={{ textTransform: "initial" }}>Eyniləşdirmə nömrəsi</th>
                    <th style={{ textTransform: "initial" }}>Yekun bal</th>
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
                    <th style={{ width: "10px", backgroundColor: "#6D6AFF", color: "white", textTransform: "initial" }}>#</th>
                    <th style={{ color: "white", backgroundColor: "#6D6AFF", textTransform: "initial" }}>Eyniləşdirmə nömrəsi</th>
                    <th style={{ color: "white", backgroundColor: "#6D6AFF", textTransform: "initial" }}>Yekun bal</th>
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

BusGeneralRating.layout = "Contentlayout";
export default BusGeneralRating;