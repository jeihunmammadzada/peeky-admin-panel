import React, { useState, useEffect } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import Image from "next/image";
import Loading from "../loading";
import {
  SurveyAnswersResponse,
  SurveyAnswerByIdResponse,
} from "@/utils/responseModels";
import { GetSurveysAnswers, GetSurveyAnswerById } from "@/utils/actions";
import { format, parseISO } from "date-fns";
import { toast } from "react-toastify";
import dynamic from "next/dynamic";
import DataTable from "react-data-table-component";
import { ResponseStatus } from "@/const/definitions";
const DataTableExtensions: any = dynamic(
  () => import("react-data-table-component-extensions"),
  { ssr: false }
);

interface SurveytableItem {
  surveyId: string;
  surveyCreatedDate: string;
  passangerFullName: number;
  passsangerMobileNumber: string;
}

const Surveys = () => {
  const [surveys, setSurveys] = useState<SurveyAnswersResponse>();
  const [totalRows, setTotalRows] = useState<number>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [countPerPage, setCountPerPage] = useState<number>(10);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [answerLoading, setAnswerLoading] = useState<boolean>(false);
  const [answerData, setAnswerData] = useState<SurveyAnswerByIdResponse>();

  const getSurveyList = async () => {
    setLoading(true);
    GetSurveysAnswers(currentPage, countPerPage)
      .then((res) => {
        setSurveys(res?.data);
        setTotalRows(res?.data.mainAnswers.pageInformation.totalCount);
        setCurrentPage(res?.data.mainAnswers.pageInformation.number!);
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Anketlərin yüklənməsi zamanı xəta baş verdi");
      });
  };

  useEffect(() => {
    getSurveyList();
  }, [currentPage, countPerPage]);

  const GetAnswersById = async (id: string) => {
    setAnswerLoading(true);
    await GetSurveyAnswerById(id)
      .then((res) => {
        if (res?.status == ResponseStatus.success) {
          setAnswerData(res.data);
          setAnswerLoading(false);
        } else {
          res?.message
            ? toast.error(res.message)
            : res?.errors?.map((e) => toast.error(e));
        }
      })
      .catch((err) => {
        setAnswerLoading(false);
        toast.error(err.message);
      });
  };

  const SurveyDataTable = ({
    data,
    totalRows,
    currentPage,
    onChange,
    onChangeRowsPerPage,
  }: {
    data: any;
    totalRows: number;
    currentPage: number;
    onChange: any;
    onChangeRowsPerPage: any;
  }) => {
    const columns: any = [
      {
        name: "Göndərilmə tarixi və saatı",
        selector: (row: SurveytableItem) => [
          format(parseISO(row.surveyCreatedDate), "dd.MM.yyyy HH:mm"),
        ],
        sortable: false,
      },
      {
        name: "İstifadəçi adı",
        selector: (row: SurveytableItem) => [row.passangerFullName],
        sortable: true,
      },
      {
        name: "Əlaqə nömrəsi",
        selector: (row: SurveytableItem) => [row.passsangerMobileNumber],
        sortable: true,
      },
      {
        name: "Əməliyyat",
        selector: (row: SurveytableItem) => [
          <Button
            onClick={(e) => {
              setShowModal(true);
              GetAnswersById(row.surveyId);
            }}
          >
            Anketə bax
          </Button>,
        ],
        sortable: false,
      },
    ];
    const tableDatas = {
      columns,
      data,
    };
    return (
      <DataTableExtensions {...tableDatas}>
        <DataTable
          columns={columns}
          data={data}
          pagination
          paginationServer
          paginationTotalRows={totalRows}
          paginationDefaultPage={currentPage}
          onChangePage={onChange}
          onChangeRowsPerPage={onChangeRowsPerPage}
        />
      </DataTableExtensions>
    );
  };

  // Take img URL function
  const takeImageURL = (image: string) => {
    const name = image.replaceAll("\\", "/").split("/");
    const result = name.slice(-2).join("/");
    return result;
  };

  return (
    <>
      <Modal
        centered
        size="lg"
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title as="h6" id="example-modal-sizes-title-lg">
            Anket nəticələri
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            {answerLoading ? (
              <Loading />
            ) : (
              <Col>
                <Row>
                  <h4 className="mb-3">İstidadəçi məlumatları</h4>
                  <Col xl={4}>
                    <p>
                      <b>Adı</b>: {answerData?.surveyAnswersById.passanger.name}
                    </p>
                  </Col>
                  <Col xl={4}>
                    <p>
                      <b>Soyadı</b>:{" "}
                      {answerData?.surveyAnswersById.passanger.surname}
                    </p>
                  </Col>

                  <Col xl={4}>
                    <p>
                      <b>Doğum tarixi</b>:{" "}
                      {answerData?.surveyAnswersById.passanger.birthday &&
                        format(
                          parseISO(
                            answerData?.surveyAnswersById.passanger.birthday
                          ),
                          "dd.MM.yyyy"
                        )}
                    </p>
                  </Col>

                  <Col xl={4}>
                    <p>
                      <b>Cinsi</b>:{" "}
                      {answerData?.surveyAnswersById.passanger.genderName ==
                      "Male"
                        ? "Kişi"
                        : "Qadın"}
                    </p>
                  </Col>

                  <Col xl={4}>
                    <p>
                      <b>Əlaqə nömrəsi</b>:{" "}
                      {answerData?.surveyAnswersById.passanger.mobileNumber}
                    </p>
                  </Col>

                  <Col xl={4}>
                    <p>
                      <b>Avtobusun nömrəsi</b>:{" "}
                      {answerData?.surveyAnswersById.plateNumber}
                    </p>
                  </Col>
                </Row>

                <hr />

                <Row>
                  <h4 className="mt-3 mb-3">İstifadəçinin cavabları</h4>
                  {answerData?.surveyAnswersById.surveyQuestionAnswers
                    .sort((a, b) => a.orderNumber - b.orderNumber)
                    .map((row) => {
                      return (
                        <Col md={12}>
                          <p>
                            <b>{row.orderNumber}.</b> {row.question}{" "}
                            <b>
                              {row.type == 1
                                ? `- ${row.answer}/5`
                                : row.type == 2
                                ? row.answer
                                : null}
                            </b>
                          </p>

                          {row.type == 3 && (
                            <Image
                              loading="lazy"
                              style={{ borderRadius: "10px", width: "50%" }}
                              alt="Image"
                              width={300}
                              height={200}
                              src={`https://api.peeky.az/images/${takeImageURL(
                                row.answer
                              )}`}
                            />
                          )}

                          <div style={{ paddingLeft: "25px" }}>
                            {row.surveySubQuestionAnswer && (
                              <p>
                                {row.surveySubQuestionAnswer.question} - <b>{row.surveySubQuestionAnswer.answer}</b> 
                              
                              </p>
                            )}

                            {row?.surveySubQuestionAnswer?.type == 3 && (
                              <>
                                <Image
                                  style={{ borderRadius: "10px", width: "50%" }}
                                  alt="Image"
                                  width={300}
                                  height={200}
                                  src={`https://api.peeky.az/images/${takeImageURL(
                                    row.surveySubQuestionAnswer.answer
                                  )}`}
                                />
                              </>
                            )}
                          </div>
                          <hr />
                        </Col>
                      );
                    })}
                </Row>
              </Col>
            )}
          </Row>
        </Modal.Body>
      </Modal>

      <Col className="card-body" lg={12}>
        <div className="responsive">
          {loading ? (
            <Loading />
          ) : (
            <SurveyDataTable
              currentPage={currentPage!}
              totalRows={totalRows!}
              data={surveys?.mainAnswers.pageData}
              onChange={(page: any) => setCurrentPage(page)}
              onChangeRowsPerPage={({
                perPage,
                page,
              }: {
                perPage: number;
                page: number;
              }) => {
                setCountPerPage(perPage);
                setCurrentPage(page);
              }}
            />
          )}
        </div>
      </Col>
    </>
  );
};

export default Surveys;
