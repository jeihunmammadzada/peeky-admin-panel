import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { GetEmployeeRating } from "@/utils/actions";
import { Card, Table } from "react-bootstrap";
import { RatingResult } from "@/utils/responseModels";
import Loading from "@/pages/dashboard/loading";

const DriverWearRaitingTable = () => {
  const [first, setFirst] = useState<RatingResult[]>();
  const [last, setLast] = useState<RatingResult[]>();
  const [loading, setLoading] = useState<boolean>();
  const [error, setError] = useState<boolean>();
  const dates = useSelector((state: any) => state);

  const getList = async () => {
    setLoading(true);
    await GetEmployeeRating(dates.beginDate, dates.endDate)
      .then((res) => {
        setLoading(false);
        if (res) {
          const firstThree = res.data.result.slice(0, 3);
          const lastThree = res.data.result.slice(-3);

          setFirst(firstThree);
          setLast(lastThree);
        } else {
          setError(true);
        }
      })
      .catch((e) => setError(true));
  };

  useEffect(() => {
    getList();
  }, [dates]);

  return (
    <>
      <Card className="custom-card overflow-hidden">
        <h6
          className="main-content-label mb-1 ms-3 mt-3"
          style={{ textTransform: "initial" }}
        >
          Sürücülərin geyimi üzrə reytinq
        </h6>

        {loading && (
          <Card.Body>
            <div className="chartjs-wrapper-demo custom-align pie-chart">
              <Loading />
            </div>
          </Card.Body>
        )}

        {error && (
          <Card.Body>
            <div className="chartjs-wrapper-demo custom-align pie-chart">
              Error
            </div>
          </Card.Body>
        )}

        {first && (
          <>
            <Card.Body className="pt-0">
              <div className="responsive">
                <Table
                  style={{ marginTop: "20px" }}
                  borderless
                  className="text-nowrap"
                >
                  <thead>
                    <tr>
                      <th
                        style={{ textTransform: "initial", width: "10px" }}
                        scope="col"
                      >
                        #
                      </th>
                      <th style={{ textTransform: "initial" }} scope="col">
                        Adı və soyadı
                      </th>
                      <th style={{ textTransform: "initial" }} scope="col">
                        Yekun bal
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {first.map((data) => (
                      <tr>
                        <th scope="row">{data.rowNumber}</th>
                        <td>{data.ratingElement}</td>
                        <td>
                          {data.rating.toFixed(1)}/{" "}
                          <span
                            style={{ color: "#7468E9", fontWeight: "bold" }}
                          >
                            {data.maximumRating}.00
                          </span>{" "}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
            <Card.Body style={{ backgroundColor: "#6D6AFF" }}>
              <div className="responsive">
                <Table borderless className="text-nowrap">
                  <thead>
                    <tr>
                      <th
                        style={{
                          textTransform: "initial",
                          backgroundColor: "#6D6AFF",
                          color: "white",
                          width: "10px",
                        }}
                        scope="col"
                      >
                        #
                      </th>
                      <th
                        style={{
                          textTransform: "initial",
                          backgroundColor: "#6D6AFF",
                          color: "white",
                        }}
                        scope="col"
                      >
                        Adı və soyadı
                      </th>
                      <th
                        style={{
                          textTransform: "initial",
                          backgroundColor: "#6D6AFF",
                          color: "white",
                        }}
                        scope="col"
                      >
                        Yekun bal
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {last?.map((data) => (
                      <tr>
                        <th
                          style={{ backgroundColor: "#6D6AFF", color: "white" }}
                          scope="row"
                        >
                          {data.rowNumber}
                        </th>
                        <td
                          style={{ backgroundColor: "#6D6AFF", color: "white" }}
                        >
                          {data.ratingElement}
                        </td>
                        <td
                          style={{ backgroundColor: "#6D6AFF", color: "white" }}
                        >
                          {data.rating.toFixed(1)}/{" "}
                          <span style={{ color: "white", fontWeight: "bold" }}>
                            {data.maximumRating}.00
                          </span>{" "}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </>
        )}
      </Card>
    </>
  );
};


DriverWearRaitingTable.layout = "Contentlayout"
export default DriverWearRaitingTable;
