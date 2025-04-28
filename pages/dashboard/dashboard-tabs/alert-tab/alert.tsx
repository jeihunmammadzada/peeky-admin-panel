import React from "react";
import { Card, Col } from "react-bootstrap";

// tables import list
import RudeDriverComplaints from "./tables/rude-driver-complaints";
import DangerousDriverComplaints from "./tables/dangerous-driver-complaints";
import DriverPhoneComplaints from "./tables/driver-phone-complaints";
import RoutePassengerDensityComplaints from "./tables/route-passenger-density-complatints";

const AlertTab = () => {
  return (
    <>
      <div className="mb-4">
        <h2 className="main-content-title font-weight-bold fs-24 mb-1">
          Canlı xəbərdarlıqlar
        </h2>
      </div>

      <div className="row row-sm">
        <Col sm={12} md={6}>
          <Card className="custom-card" style={{"border": "1px solid red"}}>
            <Card.Body>
              <div>
                <h6 className="main-content-label mb-1">
                  Sürücü kobu davranıb
                </h6>
              </div>
              <RudeDriverComplaints />
            </Card.Body>
          </Card>
        </Col>

        <Col sm={12} md={6}>
          <Card className="custom-card" style={{"border": "1px solid red"}}>
            <Card.Body>
              <div>
                <h6 className="main-content-label mb-1">
                  Sürücü təhlükəli sürüb
                </h6>
              </div>
              <DangerousDriverComplaints />
            </Card.Body>
          </Card>
        </Col>

        <Col sm={12} md={6}>
          <Card className="custom-card" style={{"border": "1px solid red"}}>
            <Card.Body>
              <div>
                <h6 className="main-content-label mb-1">
                  Sürücü telefondan istifadə edib
                </h6>
              </div>
              <DriverPhoneComplaints />
            </Card.Body>
          </Card>
        </Col>

        <Col sm={12} md={6}>
          <Card className="custom-card" style={{"border": "1px solid red"}}>
            <Card.Body>
              <div>
                <h6 className="main-content-label mb-1">
                  Avtobusda sıxlıq var
                </h6>
              </div>
              <RoutePassengerDensityComplaints />
            </Card.Body>
          </Card>
        </Col>
      </div>
    </>
  );
};

AlertTab.layout = "Contentlayout"
export default AlertTab;
