import React from "react";
import Image from "next/image";
import { Card, Col } from "react-bootstrap";

import dynamic from "next/dynamic";

// Lazy-load charts
const CompanySatisfactionChart = dynamic(() => import("./charts/company-satisfaction-chart"), { ssr: false });
const MostProblemsChart = dynamic(() => import("./charts/most-problems-chart"), { ssr: false });
const MostReportedDrivers = dynamic(() => import("./charts/most-reported-drivers"), { ssr: false });
const MostReportedBuses = dynamic(() => import("./charts/most-reported-buses"), { ssr: false });
const MostReportedRoutes = dynamic(() => import("./charts/most-reported-routes"), { ssr: false });
const SurveyInsightChart = dynamic(() => import("./charts/survey-insights-chart"), { ssr: false });
const DailySurveyStats = dynamic(() => import("./charts/daily-survey-stats"), { ssr: false });
const HourlyComplaintTrends = dynamic(() => import("./charts/hourly-complaint-trends"), { ssr: false });
const HourlySurveyStats = dynamic(() => import("./charts/hourly-survey-stats"), { ssr: false });
const TotalSurveyCount = dynamic(() => import("./charts/total-survey-count"), { ssr: false });
const PassengerAgeTrends = dynamic(() => import("./charts/passenger-age-trends"), { ssr: false });

// Lazy-load tables
const BusGeneralRating = dynamic(() => import("./tables/bus-general-raiting"), { ssr: false });
const RouteGeneralRating = dynamic(() => import("./tables/route-general-raiting"), { ssr: false });
const DriversGeneralRating = dynamic(() => import("./tables/drivers-generat-raiting"), { ssr: false });

// Icons
import surveyIcon from "@/public/assets/images/custom/dashboard-icons/survey-icon.svg";


const MainCharts = () => {
  return (
    <>
      <div className="mb-4">
        <h2 className="main-content-title font-weight-bold fs-24 mb-1">
          Əsas keyfiyyət göstəriciləri
        </h2>
      </div>

      <div className="row row-sm">
        {/* Bakubusdan razılıq səviyyəsi */}
        <Col sm={12} md={6} lg={4}>
          <Card className="custom-card overflow-hidden">
            <Card.Body>
              <div>
                <h6 className="main-content-label mb-1">
                  BakuBus"ın fəaliyyəti ilə bağlı razılıq səviyyəsi
                </h6>
              </div>
              <div className="chartjs-wrapper-demo custom-align pie-chart">
                <CompanySatisfactionChart />
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Ən çox baş verən problemlər */}
        <Col sm={12} lg={8}>
          <Card className="custom-card overflow-hidden">
            <Card.Body>
              <div>
                <h6 className="main-content-label mb-1">
                  Ən çox baş verən problemlər
                </h6>
              </div>
              <div className="chartjs-wrapper-demo custom-align pie-chart">
                <MostProblemsChart />
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Ən çox şikayət olunan sürücülər */}
        <Col sm={12} lg={6}>
          <Card className="custom-card overflow-hidden">
            <Card.Body>
              <div>
                <h6 className="main-content-label mb-1">
                  Ən çox şikayət olunan sürücülər
                </h6>
              </div>
              <div className="chartjs-wrapper-demo custom-align pie-chart">
                <MostReportedDrivers />
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Ən çox şikayət olunan avtobuslar */}
        <Col sm={12} lg={6}>
          <Card className="custom-card overflow-hidden">
            <Card.Body>
              <div>
                <h6 className="main-content-label mb-1">
                  Ən çox şikayət olunan avtobuslar
                </h6>
              </div>
              <div className="chartjs-wrapper-demo custom-align pie-chart">
                <MostReportedBuses />
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Ən çox şikayət olunan xəttlər */}
        <Col sm={12} lg={6}>
          <Card className="custom-card overflow-hidden">
            <Card.Body>
              <div>
                <h6 className="main-content-label mb-1">
                  Ən çox şikayət olunan xəttlər
                </h6>
              </div>
              <div className="chartjs-wrapper-demo custom-align pie-chart">
                <MostReportedRoutes />
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Empty  */}
        <Col lg={6}></Col>

        {/* Avtobus üzrə ümümi reyting */}
        <Col sm={12} md={6} lg={4}>
          <BusGeneralRating />
        </Col>

        {/* Xəttlər üzrə ümümi reyting */}
        <Col sm={12} md={6} lg={4}>
          <RouteGeneralRating />
        </Col>

        {/* Sürücülər üzrə ümümi reyting */}
        <Col sm={12} md={6} lg={4}>
          <DriversGeneralRating />
        </Col>
      </div>

      <div className="mb-4 mt-5">
        <h2 className="main-content-title font-weight-bold fs-24 mb-1">
          Digər keyfiyyət göstəriciləri
        </h2>
      </div>

      <div className="row row-sm">
        {/* Anketlər üzrə trend */}
        <Col md={12}>
          <Card className="custom-card overflow-hidden">
            <Card.Body className="card-body">
              <div>
                <h6 className="main-content-label mb-1">Anketlər üzrə trend</h6>
              </div>
              <div className="chartjs-wrapper-demo">
                {/* <canvas id="chartLine"></canvas> */}

                <SurveyInsightChart />
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Həftənin günlərinə düşən ortalama anket sayı */}
        <Col md={6} lg={7} xl={6}>
          <Card className="custom-card overflow-hidden">
            <Card.Body className="card-body">
              <div>
                <h6 className="main-content-label mb-1">
                  Həftənin günlərinə düşən ortalama anket sayı
                </h6>
              </div>
              <div className="chartjs-wrapper-demo">
                {/* <canvas id="chartLine"></canvas> */}

                <DailySurveyStats />
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Doldurulan anketlərin yekun sayı */}
        <Col md={6} lg={5} xl={6}>
          <Card className="custom-card overflow-hidden">
            <Image className="survey-icon-for-background" src={surveyIcon} alt="Survey icon" />
            <Card.Body>
              <div>
                <h6 className="main-content-label mb-1">
                  Doldurulan anketlərin yekun sayı
                </h6>
              </div>
              <div className="chartjs-wrapper-demo pie-chart">
                <TotalSurveyCount />
              </div>
            </Card.Body>

          </Card>
        </Col>

         {/* Saat aralığı üzrə olan ortalama şikayət sayı */}
         <Col sm={12} md={6} lg={5}>
          <Card className="custom-card overflow-hidden">
            <Card.Body className="card-body">
              <div>
                <h6 className="main-content-label mb-1">
                  Saat aralığı üzrə olan ortalama şikayət sayı
                </h6>
              </div>

              <div className="chartjs-wrapper-demo">
                <HourlyComplaintTrends />
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Saat aralığına düşən orta anket sayı */}
        <Col sm={12} lg={7}>
          <Card className="custom-card overflow-hidden">
            <Card.Body>
              <div>
                <h6 className="main-content-label mb-1">
                  Saat aralığına düşən orta anket sayı
                </h6>
              </div>
              <div className="chartjs-wrapper-demo custom-align pie-chart">
                <HourlySurveyStats />
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Sərnişinlərin yaş aralığı üzrə bölgü */}
        <Col sm={12} lg={12}>
          <Card className="custom-card overflow-hidden">
            <Card.Body>
              <div>
                <h6 className="main-content-label mb-1">
                  Sərnişinlərin yaş aralığı üzrə bölgü
                </h6>
              </div>
              <div className="chartjs-wrapper-demo custom-align pie-chart">
                <PassengerAgeTrends />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </div>
    </>
  );
};

MainCharts.layout = "Contentlayout";
export default MainCharts;
