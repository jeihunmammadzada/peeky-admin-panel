import PageHeader from "@/shared/layout-components/page-header/page-header";
import Seo from "@/shared/layout-components/seo/seo";
import { CreateEmployee, getEmployeeList } from "@/utils/actions";
import { useState, useEffect, JSX } from "react";
import InputMask from "react-input-mask";
import { Card, Row, Col, Modal, Button, Form } from "react-bootstrap";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import dynamic from "next/dynamic";
import DataTable from "react-data-table-component";
import Loading from "./loading";
import { CreateEmployeeRequest } from "@/utils/requestModels";
import { toast } from "react-toastify";
const DataTableExtensions: any = dynamic(
  () => import("react-data-table-component-extensions"),
  { ssr: false }
);

interface DriverTableItem {
  id: string;
  isActive: boolean;
  mobileNumber: string;
  name: string;
  surname: string;
  patronymic: string;
  registerNumber: number;
  note: string;
}

export const DriverDataTable = ({ data }: { data: any }) => {
  const columns: any = [
    {
      name: "Sürücünün sicili",
      selector: (row: DriverTableItem) => [row.registerNumber],
      sortable: true,
    },
    {
      name: "Sürücünün adı",
      selector: (row: DriverTableItem) => [row.name],
      sortable: true,
    },
    {
      name: "Sürücünün soyadı",
      selector: (row: DriverTableItem) => [row.surname],
      sortable: true,
    },
    {
      name: "Sürücünün ata adı",
      selector: (row: DriverTableItem) => [row.patronymic],
      sortable: true,
    },
    {
      name: "Sürücünün əlaqə nömrəsi",
      selector: (row: DriverTableItem) => [row.mobileNumber],
      sortable: true,
    },
    {
      name: "Qeyd",
      selector: (row: DriverTableItem) => [row.note],
      sortable: false,
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

const Drivers = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dataLoading, setDataLoading] = useState<boolean>(false);
  const [list, setList] = useState<any>();
  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors },
  } = useForm<CreateEmployeeRequest>();

  const getList = async () => {
    setDataLoading(true);
    getEmployeeList()
      .then((res) => {
        setList(res.data.employees);
        setDataLoading(false);
      })
      .catch((err) => {
        toast.error("Sürücü məlumatlarının yüklənməsi zamanı xəta baş verdi");
      });
  };

  useEffect(() => {
    getList();
  }, []);

  const submitHandler: SubmitHandler<CreateEmployeeRequest> = async (data) => {
    setIsLoading(true);
    CreateEmployee(data)
      .then((res) => {
        toast.success("Sürücü məlumatları uğurla əlavə olundu");
        setIsLoading(false);
        setShowModal(false);
        getList();
        reset();
      })
      .catch((err) => {
        err.errors.map((error: string) => {
          toast.error(error, { autoClose: 5000 });
        });
        setIsLoading(false);
      });
  };

  const PhoneMaskedInput = (props: { value: any; onChange: any }) => (
    <InputMask mask="+\9\94999999999" value={props.value} onChange={props.onChange}>
      {(inputProps: JSX.IntrinsicAttributes) => (
        <Form.Control
          {...inputProps}
          type="text"
          id="input"
          placeholder="Sürücü əlaqə nömrəsini daxil edin"
        />
      )}
    </InputMask>
  );

  return (
    <>
      <Seo title="Sürücülər" />

      <PageHeader
        title="Sürücülər"
        item="Ana səhifə"
        active_item="Sürücülər"
        action={() => setShowModal(true)}
        actionName="Sürücü əlavə et"
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
            Sürücü əlavə et
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit(submitHandler)}>
          <Modal.Body>
            <Row className="p-2">
              {/* Form fields here */}
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

      <Row className="row-sm">
        <Col lg={12}>
          <Card className="custom-card overflow-hidden">
            <Card.Body>
              <div className="responsive">
                {dataLoading ? <Loading /> : <DriverDataTable data={list} />}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

Drivers.layout = "Contentlayout";

export default Drivers;