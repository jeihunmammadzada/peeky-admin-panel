import React from "react";
import { Card, Col } from "react-bootstrap";

// Tables import list
import BusGeneralRating from "../main-tab/tables/bus-general-raiting";
import CleanBusRaiting from "./tables/clean-bus-table";
import BusVentilationRaiting from "./tables/bus-ventilation-table";

// Chart import list
import BusCleanlinessSatisfaction from "./charts/bus-cleanliness-satisfaction";
import BusVentilationSatisfaction from "./charts/bus-ventilation-satisfaction";
import BusIssueTrendsChart from "./charts/bus-issue-trends-chart";
import BusTrendChart from "./charts/bus-trend-charts";

const BusCharts = () => {
  return (
    <>
      <div className="row row-sm">
        {/* Avtobus üzrə ümümi reyting */}
        <Col sm={12} md={6} lg={4}>
          <BusGeneralRating />
        </Col>

        {/* Avtobusun təmizliyi */}
        <Col sm={12} md={6} lg={4}>
          <CleanBusRaiting />
        </Col>

        {/* Avtobusun havalandırılması */}
        <Col sm={12} md={6} lg={4}>
          <BusVentilationRaiting />
        </Col>

        {/* Bakubusdan razılıq səviyyəsi */}
        <Col sm={12} md={6} lg={4}>
          <Card className="custom-card overflow-hidden">
            <Card.Body>
              <div>
                <h6 className="main-content-label mb-1">
                  Avtobusun təmizliyindən məmnunluq səviyyəsi
                </h6>
              </div>
              <div className="chartjs-wrapper-demo custom-align pie-chart">
                <BusCleanlinessSatisfaction />
              </div>
            </Card.Body>
          </Card>
        </Col>

         {/* Avtobuslar üzrə trend */}
         <Col sm={12} md={12} lg={8}>
          <Card className="custom-card overflow-hidden">
            <Card.Body>
              <div>
                <h6 className="main-content-label mb-1">
                  Avtobuslar üzrə trend
                </h6>
              </div>
              <div className="chartjs-wrapper-demo custom-align pie-chart">
                <BusTrendChart />
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Avtobusun havalandırmasından məmnunluq səviyyəsi */}
        <Col sm={12} md={6}>
          <Card className="custom-card overflow-hidden">
            <Card.Body>
              <div>
                <h6 className="main-content-label mb-1">
                    Avtobusun havalandırmasından məmnunluq səviyyəsi
                </h6>
              </div>
              <div className="chartjs-wrapper-demo custom-align pie-chart">
                <BusVentilationSatisfaction />
              </div>
            </Card.Body>
          </Card>
        </Col>

         {/* Avtobuslarla bağlı daxil olan şikayətlərin bölgüsü */}
         <Col sm={12} md={6}>
          <Card className="custom-card overflow-hidden">
            <Card.Body>
              <div>
                <h6 className="main-content-label mb-1">
                    Avtobuslarla bağlı daxil olan şikayətlərin bölgüsü
                </h6>
              </div>
              <div className="chartjs-wrapper-demo custom-align pie-chart">
                <BusIssueTrendsChart />
              </div>
            </Card.Body>
          </Card>
        </Col>
        
      </div>
    </>
  );
};

BusCharts.layout = "Contentlayout"
export default BusCharts;
