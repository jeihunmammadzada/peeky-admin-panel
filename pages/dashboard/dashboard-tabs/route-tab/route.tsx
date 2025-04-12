import React from "react";
import { Card, Col } from "react-bootstrap";

// Tables import list
import RouteGeneralRating from "../main-tab/tables/route-general-raiting";
import RouteStopCount from "./tables/route-stop-count-table";
import RouteStopQuality from "./tables/route-stop-quality-table";

// Chart import list
import RouteStopsCountSatisfaction from "./charts/route-stops-count-satisfaction";
import RouteStopsQualitySatisfaction from "./charts/route-stops-quality-satisfaction";
import RouteTrendChart from "./charts/route-trend-charts";
import RouteIssueTrendsChart from "./charts/route-issue-trends-chart";

const RouteCharts = () => {
  return (
    <>
      <div className="row row-sm">
        {/* Xəttlər üzrə ümümi reyting */}
        <Col sm={12} md={6} lg={4}>
          <RouteGeneralRating />
        </Col>

        {/* Xəttlər üzrə dayanacaqların yeri və sayı */}
        <Col sm={12} md={6} lg={4}>
          <RouteStopCount />
        </Col>

        {/* Xəttlər üzrə dayanacaqların şəraiti */}
        <Col sm={12} md={6} lg={4}>
          <RouteStopQuality />
        </Col>

        {/* Xəttlər üzrə dayanacaqların yeri və sayından məmnunluq səviyyəsi */}
        <Col sm={12} md={6} lg={4}>
          <Card className="custom-card overflow-hidden">
            <Card.Body>
              <div>
                <h6 className="main-content-label mb-1">
                  Xəttlər üzrə dayanacaqların yeri və sayından məmnunluq
                  səviyyəsi
                </h6>
              </div>
              <div className="chartjs-wrapper-demo custom-align pie-chart">
                <RouteStopsCountSatisfaction />
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Xəttlər üzrə trend */}
        <Col sm={12} md={12} lg={8}>
          <Card className="custom-card overflow-hidden">
            <Card.Body>
              <div>
                <h6 className="main-content-label mb-1">
                  Xəttlər üzrə trend <br />
                  <br />
                </h6>
              </div>
              <div className="chartjs-wrapper-demo custom-align pie-chart">
                <RouteTrendChart />
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Xəttlər üzrə dayanacaqların şəraitindən məmnunluq səviyyəsi */}
        <Col sm={12} md={6}>
          <Card className="custom-card overflow-hidden">
            <Card.Body>
              <div>
                <h6 className="main-content-label mb-1">
                  Xəttlər üzrə dayanacaqların şəraitindən məmnunluq səviyyəsi
                </h6>
              </div>
              <div className="chartjs-wrapper-demo custom-align pie-chart">
                <RouteStopsQualitySatisfaction />
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Xəttlərlə bağlı daxil olan şikayətlərin bölgüsü */}
        <Col sm={12} md={6}>
          <Card className="custom-card overflow-hidden">
            <Card.Body>
              <div>
                <h6 className="main-content-label mb-1">
                  Xəttlərlə bağlı daxil olan şikayətlərin bölgüsü
                </h6>
              </div>
              <div className="chartjs-wrapper-demo custom-align pie-chart">
                <RouteIssueTrendsChart />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </div>
    </>
  );
};

RouteCharts.layout = "Contentlayout"
export default RouteCharts;
