import React from "react";
import { Card, Col } from "react-bootstrap";
import dynamic from "next/dynamic";

// Lazy-loaded complaint tables
const RudeDriverComplaints = dynamic(() => import("./tables/rude-driver-complaints"), { ssr: false });
const DangerousDriverComplaints = dynamic(() => import("./tables/dangerous-driver-complaints"), { ssr: false });
const DriverPhoneComplaints = dynamic(() => import("./tables/driver-phone-complaints"), { ssr: false });
const RoutePassengerDensityComplaints = dynamic(() => import("./tables/route-passenger-density-complatints"), { ssr: false });
const AnonymSurveyAnswers = dynamic(() => import("./tables/anonimous-complaints"), { ssr: false });

const AlertTab = () => {
  return (
    <>
      <div className="mb-4">
        <h2 className="main-content-title font-weight-bold fs-24 mb-1">
          Canlı xəbərdarlıqlar
        </h2>
      </div>

      <div className="row row-sm">
        <AlertCard
          title="Sürücü kobud davranıb"
          component={<RudeDriverComplaints />}
        />
        <AlertCard
          title="Sürücü təhlükəli sürüb"
          component={<DangerousDriverComplaints />}
        />
        <AlertCard
          title="Sürücü telefondan istifadə edib"
          component={<DriverPhoneComplaints />}
        />
        <AlertCard
          title="Avtobusda sıxlıq var"
          component={<RoutePassengerDensityComplaints />}
        />
        <AlertCard
          title="Ödənişsiz şikayətlər"
          component={<AnonymSurveyAnswers />}
          fullWidth
        />
      </div>
    </>
  );
};

const AlertCard = ({
  title,
  component,
  fullWidth = false,
}: {
  title: string;
  component: React.ReactNode;
  fullWidth?: boolean;
}) => {
  return (
    <Col sm={12} md={fullWidth ? 12 : 6}>
      <Card className="custom-card border border-danger">
        <Card.Body>
          <div>
            <h6 className="main-content-label mb-1">{title}</h6>
          </div>
          {component}
        </Card.Body>
      </Card>
    </Col>
  );
};

AlertTab.layout = "Contentlayout";
export default AlertTab;