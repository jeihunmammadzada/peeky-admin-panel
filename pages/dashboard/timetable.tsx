import PageHeader from "@/shared/layout-components/page-header/page-header";
import Seo from "@/shared/layout-components/seo/seo";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { debounce } from 'lodash';
import {
  Card,
  Row,
  Col,
  Modal,
  Button,
  Form,
} from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { assignment, ResponseStatus } from "@/const/definitions";
import { CreateAssignment, AssignmentList } from "@/utils/actions";
import dynamic from "next/dynamic";
import DataTable from "react-data-table-component";
import Loading from "./loading";
const DataTableExtensions: any = dynamic(
  () => import("react-data-table-component-extensions"),
  { ssr: false }
);

interface dailySchedulesTable {
  identificationNumber: number;
  employeeFullName1: string;
  employeeFullName2: string;
  registerNumber1: string;
  registerNumber2: string;
  plateNumber: string;
  route: string;
  startTime: Date;
  endTime: Date;
}

export const AssignTable = ({ data }: { data: any }) => {
  const columns: any = [
    {
      name: "Eyniləşdirmə nömrəsi",
      selector: (row: dailySchedulesTable) => [row.identificationNumber],
      sortable: true,
    },
    {
      name: "Avtobusun nömrəsi",
      selector: (row: dailySchedulesTable) => [row.plateNumber],
      sortable: true,
    },
    {
      name: "Qeydiyyat nömrəsi 1",
      selector: (row: dailySchedulesTable) => [row.registerNumber1],
      sortable: true,
    },
    {
      name: "Sürücü 1",
      selector: (row: dailySchedulesTable) => [row.employeeFullName1],
      sortable: true,
    },
    {
      name: "Qeydiyyat nömrəsi 2",
      selector: (row: dailySchedulesTable) => [row.registerNumber2],
      sortable: true,
    },
    {
      name: "Sürücü 2",
      selector: (row: dailySchedulesTable) => [row.employeeFullName2],
      sortable: true,
    },
    {
      name: "Marşrut",
      selector: (row: dailySchedulesTable) => [row.route],
      sortable: true,
    },
    {
      name: "Başlama vaxtı",
      selector: (row: dailySchedulesTable) => [row.startTime],
      sortable: true,
    },
    {
      name: "Bitmə vaxtı",
      selector: (row: dailySchedulesTable) => [row.endTime],
      sortable: true,
    },
  ];
  const tableDatas = {
    columns,
    data,
  };
  return (
    <DataTableExtensions {...tableDatas}>
      <DataTable columns={columns} data={data} pagination />
    </DataTableExtensions>
  );
};

const TimeTable = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [dataLoading, setDataLoading] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<any>();
  const [dateForTable, setDateForTable] = useState<string>("");
  const [dailyList, setDailyList] = useState<any>();
  const [base64, setBase64] = useState("");

  const {
    handleSubmit,
    register,
    setError,
    reset,
    formState: { errors },
  } = useForm<assignment>();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.name.endsWith(".xls") && !file.name.endsWith(".xlsx")) {
      setError("assignmentExcelBase64", {
        type: "custom",
        message: "Yalnız .xls və .xlsx formatlı fayllara icazə verilir!",
      });
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setBase64(reader.result.split(",")[1]);
      }
    };
    reader.onerror = (error) => {
      setError("assignmentExcelBase64", {
        type: "custom",
        message: "Fayl oxunarkən xəta baş verdi",
      });
      console.error("Fayl oxunarkən xəta baş verdi:", error);
    };
  };

  const getList = async () => {
    setDataLoading(true);
    AssignmentList(dateForTable)
      .then((res) => {
        if(res.status == ResponseStatus.success){
          setDailyList(res.data?.dailyAssignments);
        }else{
          if(res.message != null){
            toast.error(res.message)
          }else{
            res.errors?.map(err => {
              toast.error(err);
            })
          }
        }
      })
      .catch((err) => {
        err.errors
          ? err.errors?.map((error: string) => {
              toast.error(error, { autoClose: 5000 });
            })
            : toast.error(err.message, {autoClose : 5000});
        setDailyList([]);
      })
      .finally(() => setDataLoading(false));
  };

  const debouncedFetch = debounce((dateForTable) => {
    const isValidDate = (dateString: string) => {
      const regex = /^\d{4}-\d{2}-\d{2}$/;
      return regex.test(dateString) && !isNaN(Date.parse(dateString));
    };

    if (dateForTable && isValidDate(dateForTable)) {
      getList();
    }
  }, 500);

  useEffect(() => {
    debouncedFetch(dateForTable);
    return () => debouncedFetch.cancel();
  }, [dateForTable]);

  const submitHandler: SubmitHandler<assignment> = async (data) => {
    const updated_DATA = {
      date: selectedDate,
      assignmentExcelBase64: base64,
    };

    setIsLoading(true);
    CreateAssignment(updated_DATA)
      .then((res) => {
        setShowModal(false);
        toast.success("Təhkimolma uğurla əlavə olundu");
        getList();
        reset();
      })
      .catch((err) => {
        if (err.message) {
          toast.error(err.message);
        } else {
          err.errors.map((error: string) => {
            toast.error(error);
          });
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <Seo title="Cədvəllər" />

      <PageHeader
        title="Cədvəllər"
        item="Ana səhifə"
        active_item="Cədvəllər"
        action={() => setShowModal(true)}
        actionName="Excel əlavə et"
      />

      <Modal
        centered
        size="lg"
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title as="h6" id="example-modal-sizes-title-lg">
            Excel əlavə et
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit(submitHandler)}>
          <Modal.Body>
            <Row className="p-2">
              <Col className="mb-3" lg={6} md={6} sm={12}>
                <p className="mb-2 ">Tarix seçin</p>
                <Form.Control
                  {...register("date", {
                    required: true,
                  })}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  type="date"
                  id="input-date"
                />
                {errors.date && (
                  <Form.Control.Feedback className="d-block" type="invalid">
                    Seçim edilməsi vacibidir
                  </Form.Control.Feedback>
                )}
              </Col>

              <Col className="mb-3" lg={6} md={6} sm={12}>
                <p className="mb-2 ">File seçin</p>
                <Form.Group controlId="formFile">
                  <Form.Control
                    {...register("assignmentExcelBase64", {
                      required: true && "Fayl seçilməyib",
                    })}
                    type="file"
                    accept=".xls,.xlsx"
                    onChange={handleFileChange}
                  />
                </Form.Group>
                {errors.assignmentExcelBase64 && (
                  <Form.Control.Feedback className="d-block" type="invalid">
                    {errors.assignmentExcelBase64.message}
                  </Form.Control.Feedback>
                )}
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button
              disabled={isLoading}
              type="submit"
              className="btn btn-primary"
            >
              {isLoading ? (
                <>
                  <span
                    className="spinner-grow me-2 spinner-grow-sm align-middle"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Gözləyin...
                </>
              ) : (
                "Əlavə edin"
              )}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <Row>
        <Col className="mb-3" xl={4} lg={6} md={6} sm={12}>
          <p className="mb-2 ">Tarix seçin</p>
          <Form.Control
            onChange={(e) => {
              setDateForTable(e.currentTarget.value);
            }}
            type="date"
            id="input-date"
          />
          {errors.date && (
            <Form.Control.Feedback className="d-block" type="invalid">
              Seçim edilməsi vacibidir
            </Form.Control.Feedback>
          )}
        </Col>
      </Row>

      <Row className="row-sm">
        <Col lg={12}>
          <Card className="custom-card overflow-hidden">
            <Card.Body>
              <div className="responsive">
                {dataLoading ? <Loading /> : <AssignTable data={dailyList} />}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

TimeTable.layout = "Contentlayout";
export default TimeTable;