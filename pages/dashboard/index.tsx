import React, { useState } from "react";
import Image from "next/image";
import PageHeader from "../../shared/layout-components/page-header/page-header";
import Seo from "../../shared/layout-components/seo/seo";
import { Nav, Row, Tab } from "react-bootstrap";
import styles from "@/styles/dashboard.module.scss";
import dynamic from "next/dynamic";

// Dashboard icons
import EmergencyAlertIcon from "@/public/assets/images/custom/dashboard-icons/email-alert-icon.svg";
import MainIcon from "@/public/assets/images/custom/dashboard-icons/dashbard-icon.svg";
import BUsIcon from "@/public/assets/images/custom/dashboard-icons/bus-icon.svg";
import RouteIcon from "@/public/assets/images/custom/dashboard-icons/route-icon.svg";
import DriverIcon from "@/public/assets/images/custom/dashboard-icons/driver-icon.svg";
import SurveyIcon from "@/public/assets/images/custom/dashboard-icons/survey-icon.svg";

// Lazy-loaded tab components
const AlertTab = dynamic(() => import("./dashboard-tabs/alert-tab/alert"), { ssr: false });
const MainCharts = dynamic(() => import("./dashboard-tabs/main-tab/main"), { ssr: false });
const BusCharts = dynamic(() => import("./dashboard-tabs/bus-tab/bus"), { ssr: false });
const RouteCharts = dynamic(() => import("./dashboard-tabs/route-tab/route"), { ssr: false });
const DriverCharts = dynamic(() => import("./dashboard-tabs/driver-tab/driver"), { ssr: false });
const Surveys = dynamic(() => import("./dashboard-tabs/surveys"), { ssr: false });

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<number>(1);
  const welcomeTitle = `Admin panelə xoş gəlmisiniz!`;

  return (
    <>
      <Seo title="Admin panel" />

      <PageHeader
        title={welcomeTitle}
        item="Ana səhifə"
        filter
        active_item="Statistikalar"
      />

      <div className="row row-sm">
        <Tab.Container defaultActiveKey="emergency">
          <Nav
            variant="pills"
            className="nav nav-tabs tab-style-2 mb-3 d-sm-flex d-block"
            id="myTab1"
            role="tablist"
            defaultActiveKey="emermaigency"
          >
            {/* Xəbərdarlıq */}
            <Nav.Item>
              <Nav.Link
                className="alert"
                eventKey="emergency"
                id="emergency-charts"
                type="button"
                onClick={(e) => setActiveTab(1)}
              >
                <Image alt="Alert icon" src={EmergencyAlertIcon} width={30} />
                <span>Xəbərdarlıq</span>
              </Nav.Link>
            </Nav.Item>

            {/* Əsas səhifə */}
            <Nav.Item>
              <Nav.Link
                className={styles.alert}
                eventKey="main"
                id="main-charts"
                type="button"
                onClick={(e) => setActiveTab(2)}
              >
                <Image alt="Main dashboard icon" src={MainIcon} width={30} />
                <span>Əsas səhifə</span>
              </Nav.Link>
            </Nav.Item>

            {/* Avtobus */}
            <Nav.Item>
              <Nav.Link
                eventKey="bus"
                id="bus-charts"
                type="button"
                onClick={(e) => setActiveTab(3)}
              >
                <Image alt="Bus icon" src={BUsIcon} width={30} />
                <span>Avtobus</span>
              </Nav.Link>
            </Nav.Item>

            {/* Xətt */}
            <Nav.Item>
              <Nav.Link
                eventKey="route"
                id="route-charts"
                type="button"
                onClick={(e) => setActiveTab(4)}
              >
                <Image alt="Route icon" src={RouteIcon} width={30} />
                <span>Xətt</span>
              </Nav.Link>
            </Nav.Item>

            {/* Sürücü */}
            <Nav.Item>
              <Nav.Link
                eventKey="driver"
                id="driver-charts"
                type="button"
                onClick={(e) => setActiveTab(5)}
              >
                <Image alt="Driver icon" src={DriverIcon} width={30} />
                <span>Sürücü</span>
              </Nav.Link>
            </Nav.Item>

            {/* Anketlər */}
            <Nav.Item>
              <Nav.Link
                eventKey="survey"
                id="survey-charts"
                type="button"
                onClick={(e) => setActiveTab(6)}
              >
                <Image alt="Survey icon" src={SurveyIcon} width={30} />
                <span>Anketlər</span>
              </Nav.Link>
            </Nav.Item>
          </Nav>

          <Tab.Content className="tab-content" id="myTabContent">
            {/* Xəbərdarlıq */}
            <Tab.Pane
              className="tab-pane fade text-muted"
              id="emergency-tab-pane"
              role="tabpanel"
              eventKey="emergency"
              aria-labelledby="emergency-tab"
              onChange={(e) => setActiveTab(1)}
              tabIndex={0}
            >
              {activeTab == 1 && <AlertTab />}
            </Tab.Pane>

            {/* Əsas səhifə */}
            <Tab.Pane
              className="tab-pane fade show text-muted"
              id="main-tab-pane"
              eventKey="main"
              role="tabpanel"
              aria-labelledby="main-tab"
              tabIndex={0}
            >
              {activeTab == 2 && <MainCharts />}
            </Tab.Pane>

            {/* Avtobus */}
            <Tab.Pane
              className="tab-pane fade text-muted"
              id="bus-tab-pane"
              role="tabpanel"
              eventKey="bus"
              aria-labelledby="bus-tab"
              tabIndex={0}
            >
              {activeTab == 3 && <BusCharts />}
            </Tab.Pane>

            {/* Xətt */}
            <Tab.Pane
              className="tab-pane fade text-muted"
              id="route-tab-pane"
              role="tabpanel"
              tabIndex={0}
              aria-labelledby="route-tab"
              eventKey="route"
            >
              {activeTab == 4 && <RouteCharts />}
            </Tab.Pane>

            {/* Sürücü */}
            <Tab.Pane
              className="tab-pane fade text-muted"
              id="driver-tab-pane"
              role="tabpanel"
              tabIndex={0}
              aria-labelledby="driver-tab"
              eventKey="driver"
            >
              {activeTab == 5 && <DriverCharts />}
            </Tab.Pane>

            {/* Anketlər */}
            <Tab.Pane
              className="tab-pane fade text-muted"
              id="survey-tab-pane"
              role="tabpanel"
              tabIndex={0}
              aria-labelledby="survey-tab"
              eventKey="survey"
            >
              <Row className="row-sm">
                <Surveys />
              </Row>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </div>
    </>
  );
};
Dashboard.layout = "Contentlayout";

export default Dashboard;
