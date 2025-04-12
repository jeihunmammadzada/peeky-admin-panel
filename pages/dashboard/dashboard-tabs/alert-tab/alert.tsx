import React from "react";
import { Card, Col } from "react-bootstrap";

// tables import list
import RudeDriverComplaints from "./tables/rude-driver-complaints";
import DangerousDriverComplaints from "./tables/dangerous-driver-complaints";
import DriverAlcoholComplaints from "./tables/driver-alcohol-complaints";

const AlertTab = () => {
  return (
    <>
      <div className="mb-4">
        <h2 className="main-content-title font-weight-bold fs-24 mb-1">
          Canlı xəbərdarlıqlar
        </h2>
      </div>

      <div className="row row-sm">
        <Col sm={12} md={4}>
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

        <Col sm={12} md={4}>
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

        <Col sm={12} md={4}>
          <Card className="custom-card" style={{"border": "1px solid red"}}>
            <Card.Body>
              <div>
                <h6 className="main-content-label mb-1">
                  Sürücü içki vəya tütün qəbul edib
                </h6>
              </div>
              <DriverAlcoholComplaints />
            </Card.Body>
          </Card>
        </Col>
      </div>
    </>
  );
};

AlertTab.layout = "Contentlayout"
export default AlertTab;
