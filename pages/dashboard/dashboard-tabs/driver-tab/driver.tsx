import React from "react";

// Tables import list
import DriversGeneralRating from "../main-tab/tables/drivers-generat-raiting";
import DriverWearRaitingTable from "./table/driver-wear-raiting-table";
import DriverBehaviorRaitingTable from "./table/driver-behavior-raiting-table";
import DriverDrivingRaitingTable from "./table/driver-driving-raiting-table";
import DriverStopArrivingRaitingTable from "./table/driver-stop-arrivin-raiting-table";
import DriverSmokeRaitingTable from "./table/driver-smoke-raiting-table";

// Chart import list
import DriverBehaviorSatisfaction from "./charts/driver-behavior-satisfaction";
import DriverDrivingSatisfaction from "./charts/driver-driving-satisfaction";
import DriverSmokeSatisfaction from "./charts/driver-smoke-satisfaction";
import DriverStopSatisfaction from "./charts/driver-stop-arriving-satisfaction";
import DriverTrendsChart from "./charts/driver-trends-chart";
import DrierWearSatisfaction from "./charts/driver-wear-satisfaction";
import DriverIssueChart from "./charts/driver-issues-chart";
import { Card, Col } from "react-bootstrap";
import DriverWearSatisfaction from "./charts/driver-wear-satisfaction";

const DriverCharts = () => {
  return (
    <>
      <div className="row row-sm">
        {/* Sürücülər üzrə ümumi reyting */}
        <Col sm={12} md={6} lg={4}>
          <DriversGeneralRating />
        </Col>

        {/* Sürücülərin geyimi üzrə reyting */}
        <Col sm={12} md={6} lg={4}>
          <DriverWearRaitingTable />
        </Col>

        {/* Sürücülərin davranışı üzrə reyting */}
        <Col sm={12} md={6} lg={4}>
          <DriverBehaviorRaitingTable />
        </Col>

        {/* Sürücülərin avtobus idarəsi üzrə reyting */}
        <Col sm={12} md={6} lg={4}>
          <DriverDrivingRaitingTable />
        </Col>

        {/* Sürücülərin dayanacağa vaxtında çatma reytingi */}
        <Col sm={12} md={6} lg={4}>
          <DriverStopArrivingRaitingTable />
        </Col>

        {/* Siqaret və içki qaytalarına əməl reytingi */}
        <Col sm={12} md={6} lg={4}>
          <DriverSmokeRaitingTable />
        </Col>

        {/* Sürücülərin geyim üzrə qiymətləndirilməsi */}
        <Col sm={12} md={6} lg={4}>
          <Card className="custom-card overflow-hidden">
            <Card.Body>
              <div>
                <h6 className="main-content-label mb-1">
                  Sürücülərin geyim üzrə qiymətləndirilməsi
                </h6>
              </div>
              <div className="chartjs-wrapper-demo custom-align pie-chart">
                <DriverWearSatisfaction />
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Sürücülərin davranış qiymətləndirilməsi */}
        <Col sm={12} md={6} lg={4}>
          <Card className="custom-card overflow-hidden">
            <Card.Body>
              <div>
                <h6 className="main-content-label mb-1">
                  Sürücülərin davranış qiymətləndirilməsi
                </h6>
              </div>
              <div className="chartjs-wrapper-demo custom-align pie-chart">
                <DriverBehaviorSatisfaction />
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Sürücülərin avtobus idarəsi qiymətləndirilməsi */}
        <Col sm={12} md={6} lg={4}>
          <Card className="custom-card overflow-hidden">
            <Card.Body>
              <div>
                <h6 className="main-content-label mb-1">
                  Sürücülərin avtobus idarəsi qiymətləndirilməsi
                </h6>
              </div>
              <div className="chartjs-wrapper-demo custom-align pie-chart">
                <DriverDrivingSatisfaction />
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Sürücülərin dayanacağa vaxtında çatma üzrə qiymətləndirilməsi */}
        <Col sm={12} md={6} lg={4}>
          <Card className="custom-card overflow-hidden">
            <Card.Body>
              <div>
                <h6 className="main-content-label mb-1">
                  Sürücülərin dayanacağa vaxtında çatma üzrə qiymətləndirilməsi
                </h6>
              </div>
              <div className="chartjs-wrapper-demo custom-align pie-chart">
                <DriverStopSatisfaction />
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Sürücülərlə bağlı daxil olan şikayətlərin bölgüsü */}
        <Col sm={12} md={8}>
          <Card className="custom-card overflow-hidden">
            <Card.Body>
              <div>
                <h6 className="main-content-label mb-1">
                  Sürücülərlə bağlı daxil olan şikayətlərin bölgüsü
                </h6>
              </div>
              <div className="chartjs-wrapper-demo custom-align pie-chart">
                <DriverIssueChart />
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Sürücülər üzrə trend */}
        <Col sm={12} md={12} lg={8}>
          <Card className="custom-card overflow-hidden">
            <Card.Body>
              <div>
                <h6 className="main-content-label mb-1">
                  Sürücülər üzrə trend <br />
                  <br />
                </h6>
              </div>
              <div className="chartjs-wrapper-demo custom-align pie-chart">
                <DriverTrendsChart />
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Sürücülərin siqaret və içki qaydalarına əməl etməsi üzrə qiymətləndirilməsi */}
        <Col sm={12} md={6} lg={4}>
          <Card className="custom-card overflow-hidden">
            <Card.Body>
              <div>
                <h6 className="main-content-label mb-1">
                  Sürücülərin siqaret və içki qaydalarına əməl etməsi üzrə
                  qiymətləndirilməsi
                </h6>
              </div>
              <div className="chartjs-wrapper-demo custom-align pie-chart">
                <DriverSmokeSatisfaction />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </div>
    </>
  );
};

DriverCharts.layout = "Contentlayout"
export default DriverCharts;
