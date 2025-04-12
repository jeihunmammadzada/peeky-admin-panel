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
              <Col className="mb-3" xl={6} lg={6} md={6} sm={12}>
                <p className="mb-2 ">Sürücünün sicili</p>
                <Form.Control
                  {...register("registerNumber", {
                    required: {
                      value: true,
                      message: 'Sicil boş ola bilməz.'
                    },
                    valueAsNumber: true,
                    min: { 
                      value: 10000, 
                      message: "Sicil [10000,99999] aralığında ədəd olmalıdır." 
                    },
                    max: { 
                      value: 99999, 
                      message: "Sicil [10000,99999] aralığında ədəd olmalıdır." 
                    }
                  })}
                  type="number"
                  min={0}
                  id="input"
                  placeholder="Sürücünün sicilini əlavə edin"
                />
                {errors.registerNumber && (
                  <Form.Control.Feedback className="d-block" type="invalid">
                    {errors.registerNumber?.message}
                  </Form.Control.Feedback>
                )}
              </Col>
              <Col className="mb-3" xl={6} lg={6} md={6} sm={12}>
                <p className="mb-2 ">Sürücünün adı</p>
                <Form.Control
                 onInput={(e) => {
                  const input = e.target as HTMLInputElement;
                  input.value = input.value.replace(/[^A-Za-zƏəĞğİıÖöŞşÜüÇç]/g, "");
                }}
                  {...register("name", {
                    pattern: {
                      value: /^[A-Za-zƏəĞğİıÖöŞşÜüÇç]+$/i,
                      message: "Ad yalnız hərflərdən ibarət olmalıdır.",
                    },
                    required: {
                      value: true,
                      message: "Ad boş ola bilməz."
                    },
                    minLength: {
                      value: 3,
                      message: "Ad ən azı 3 simvoldan ibarət olmalıdı."
                    },
                    maxLength: {
                      value: 20,
                      message: "Ad 20 simvoldan artıq olmamalıdır."
                    }
                  })}
                  type="text"
                  id="input"
                  placeholder="Sürücü adını daxil edin"
                />

                {errors.name && (
                  <Form.Control.Feedback className="d-block" type="invalid">
                    {errors.name.message}
                  </Form.Control.Feedback>
                )}
              </Col>

              <Col className="mb-3" xl={6} lg={6} md={6} sm={12}>
                <p className="mb-2 ">Sürücünün soyadı</p>
                <Form.Control
                  onInput={(e) => {
                    const input = e.target as HTMLInputElement;
                    input.value = input.value.replace(/[^A-Za-zƏəĞğİıÖöŞşÜüÇç]/g, "");
                  }}
                  {...register("surname", {
                    pattern: {
                      value: /^[A-Za-zƏəĞğİıÖöŞşÜüÇç]+$/i,
                      message: "Soyad yalnız hərflərdən ibarət olmalıdır.",
                    },
                    required: {
                      value: true,
                      message: "Soyad boş ola bilməz."
                    },
                    minLength: {
                      value: 3,
                      message: "Soyad ən azı 3 simvoldan ibarət olmalıdı."
                    },
                    maxLength: {
                      value: 20,
                      message: "Soyad 20 simvoldan artıq olmamalıdır."
                    }
                  })}
                  type="text"
                  id="input"
                  placeholder="Sürücü soyadını daxil edin"
                />

                {errors.surname && (
                  <Form.Control.Feedback className="d-block" type="invalid">
                    {errors.surname.message}
                  </Form.Control.Feedback>
                )}
              </Col>

              <Col className="mb-3" xl={6} lg={6} md={6} sm={12}>
                <p className="mb-2 ">Sürücünün ata adı</p>
                <Form.Control
                  onInput={(e) => {
                    const input = e.target as HTMLInputElement;
                    input.value = input.value.replace(/[^A-Za-zƏəĞğİıÖöŞşÜüÇç]/g, "");
                  }}
                  {...register("patronymic", {
                    pattern: {
                      value: /^[A-Za-zƏəĞğİıÖöŞşÜüÇç]+$/i,
                      message: "Ata adı yalnız hərflərdən ibarət olmalıdır.",
                    },
                    required: {
                      value: true,
                      message: "Ata adı boş ola bilməz."
                    },
                    minLength: {
                      value: 3,
                      message: "Ata adı ən azı 3 simvoldan ibarət olmalıdı."
                    },
                    maxLength: {
                      value: 20,
                      message: "Ata adı 20 simvoldan artıq olmamalıdır."
                    }
                  })}
                  type="text"
                  id="input"
                  placeholder="Sürücü ata adını daxil edin"
                />
                {errors.patronymic && (
                  <Form.Control.Feedback className="d-block" type="invalid">
                    {errors.patronymic.message}
                  </Form.Control.Feedback>
                )}
              </Col>

              <Col className="mb-3" xl={6} lg={6} md={6} sm={12}>
                <p className="mb-2 ">Sürücünün əlaqə nömrəsi</p>
                <Controller
                  {...register('mobileNumber', {
                    pattern: {
                      value: /^\+994[0-9]\d[1-9]\d{6}$/,
                      message: "Telefon nömrəsi düzgün formatda deyil."
                    }
                  })}
                  control={control}
                  render={({ field }) => (
                    <PhoneMaskedInput
                      value={field.value} onChange={field.onChange} />
                  )}
                />
                
                {errors.mobileNumber && (
                  <Form.Control.Feedback className="d-block" type="invalid">
                    {errors.mobileNumber.message}
                  </Form.Control.Feedback>
                )}
              </Col>

              <Col className="mb-3" xl={6} lg={6} md={6} sm={12}>
                <p className="mb-2 ">Sürücünün əlaqə nömrəsi 2</p>
                <Controller
                  {...register('additionalMobileNumber', {
                    pattern: {
                      value: /^\+994[0-9]\d[1-9]\d{6}$/,
                      message: "Telefon nömrəsi düzgün formatda deyil."
                    }
                  })}
                  control={control}
                  render={({ field }) => (
                    <PhoneMaskedInput
                      value={field.value} onChange={field.onChange} />
                  )}
                />
                
                {errors.additionalMobileNumber && (
                  <Form.Control.Feedback className="d-block" type="invalid">
                    {errors.additionalMobileNumber.message}
                  </Form.Control.Feedback>
                )}
              </Col>

              <Col className="mb-3" xl={6} lg={6} md={6} sm={12}>
                <p className="mb-2 ">Qeyd</p>
                <Form.Control
                  {...register("note", {
                    maxLength: {
                      value: 1000,
                      message: "Qeyd 1000 simvoldan artıq olmamalıdır."
                    }
                  })}
                  type="text"
                  id="input"
                  placeholder="Qeyd edin"
                />
                {errors.note && (
                  <Form.Control.Feedback className="d-block" type="invalid">
                    {errors.note.message}
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
