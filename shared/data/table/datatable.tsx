import React from "react";
import { Button, Breadcrumb, Card, Row, Col } from "react-bootstrap";

const Datatable = () => {
  return (
    <div>
      <Row className="row-sm">
        <Col lg={12}>
          <Card className="custom-card overflow-hidden">
            <Card.Body>
              <div>
                <h6 className="main-content-label mb-1">BasicData</h6>
                <p className="text-muted card-sub-title">
                  A simple example with no frills.
                </p>
              </div>
              <div className="responsive">
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    
    </div>
  );
};

export default Datatable;
