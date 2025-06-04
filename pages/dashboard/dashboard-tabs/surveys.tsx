import React, { useState, useEffect, useCallback } from "react";
import { Button, Col } from "react-bootstrap";
import Loading from "../loading";
import { SurveyAnswersResponse, SurveyAnswerByIdResponse } from "@/utils/responseModels";
import { GetSurveysAnswers, GetSurveyAnswerById } from "@/utils/actions";
import { format, parseISO } from "date-fns";
import { toast } from "react-toastify";
import dynamic from "next/dynamic";
import { ResponseStatus } from "@/const/definitions";

const DataTable = dynamic(() => import("react-data-table-component"), { ssr: false });
const DataTableExtensions: any = dynamic(() => import("react-data-table-component-extensions"), { ssr: false });

// Modal komponentini də tam dinamik elə
const AnswerModal = dynamic(() => import("./survey-answer-modal"), { ssr: false });

const Surveys = () => {
  const [surveys, setSurveys] = useState<SurveyAnswersResponse>();
  const [totalRows, setTotalRows] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [countPerPage, setCountPerPage] = useState<number>(10);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [answerLoading, setAnswerLoading] = useState<boolean>(false);
  const [answerData, setAnswerData] = useState<SurveyAnswerByIdResponse>();

  const getSurveyList = useCallback(async () => {
    setLoading(true);
    try {
      const res = await GetSurveysAnswers(currentPage, countPerPage);
      setSurveys(res?.data);
      setTotalRows(res?.data.mainAnswers.pageInformation.totalCount!);
      setCurrentPage(res?.data.mainAnswers.pageInformation.number!);
    } catch {
      toast.error("Anketlərin yüklənməsi zamanı xəta baş verdi");
    } finally {
      setLoading(false);
    }
  }, [currentPage, countPerPage]);
  

  const GetAnswersById = useCallback(async (id: string) => {
    setAnswerLoading(true);
    setShowModal(true);
    try {
      const res = await GetSurveyAnswerById(id);
      if (res?.status === ResponseStatus.success) {
        setAnswerData(res.data);
      } else {
        res?.message ? toast.error(res.message) : res?.errors?.forEach(e => toast.error(e));
      }
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setAnswerLoading(false);
    }
  }, []);

  useEffect(() => {
    getSurveyList();
  }, [getSurveyList]);

  const columns: any = [
    {
      name: "Göndərilmə tarixi və saatı",
      selector: (row: any) => format(parseISO(row.surveyCreatedDate), "dd.MM.yyyy HH:mm"),
    },
    {
      name: "İstifadəçi adı",
      selector: (row: any) => row.passangerFullName,
    },
    {
      name: "Əlaqə nömrəsi",
      selector: (row: any) => row.passsangerMobileNumber,
    },
    {
      name: "Əməliyyat",
      cell: (row: any) => (
        <Button
          size="sm"
          onClick={() => GetAnswersById(row.surveyId)}
        >
          Anketə bax
        </Button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const tableDatas = {
    columns,
    data: surveys?.mainAnswers.pageData || [],
  };

  return (
    <>
      <Col className="card-body" lg={12}>
        {loading ? (
          <Loading />
        ) : (
          <DataTableExtensions {...tableDatas}>
            <DataTable
              pagination
              columns={columns}
              data={tableDatas.data}
              paginationServer
              paginationTotalRows={totalRows}
              paginationDefaultPage={currentPage}
              onChangePage={page => setCurrentPage(page)}
              onChangeRowsPerPage={(perPage, page) => {
                setCountPerPage(perPage);
                setCurrentPage(page);
              }}
            />
          </DataTableExtensions>
        )}
      </Col>

      <AnswerModal
        show={showModal}
        onClose={() => setShowModal(false)}
        loading={answerLoading}
        data={answerData}
      />
    </>
  );
};

export default Surveys;