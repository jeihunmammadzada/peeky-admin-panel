import { Model } from "@/const/definitions";
import PageHeader from "@/shared/layout-components/page-header/page-header";
import InputMask from "react-input-mask";
import Seo from "@/shared/layout-components/seo/seo";
import { CreateVehicle, getVehicleList } from "@/utils/actions";
const Select = dynamic(() => import("react-select"), { ssr: false });
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Card, Row, Col, Modal, Button, Form } from "react-bootstrap";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import DataTable from "react-data-table-component";
import Loading from "./loading";
import { CreateVehicleRequest } from "@/utils/requestModels";
import { toast } from "react-toastify";
const DataTableExtensions: any = dynamic(
  () => import("react-data-table-component-extensions"),
  { ssr: false }
);

interface BusTableItem {
  modelName: string;
  identificationNumber: number;
  plateNumber: string;
}

export const BusDataTable = ({ data }: { data: any }) => {
  const columns: any = [
    {
      name: "Model",
      selector: (row: BusTableItem) => [row.modelName],
      sortable: false,
    },
    {
      name: "Eyniləşdirmə nömrəsi",
      selector: (row: BusTableItem) => [row.identificationNumber],
      sortable: true,
    },
    {
      name: "Dövlət qeydiyyat nişanı",
      selector: (row: BusTableItem) => [row.plateNumber],
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

const Buses = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [dataLoading, setDataLoading] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [list, setList] = useState<any>();
  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<CreateVehicleRequest>();

  const submitHandler: SubmitHandler<CreateVehicleRequest> = async (data) => {
    setIsLoading(true);
    CreateVehicle(data)
      .then((res) => {
        toast.success("Avtobus uğurla əlavə olundu");
        setIsLoading(false);
        setShowModal(false);
        getList();
        reset();
      })
      .catch((err) => {
        err.errors
          ? err.errors?.map((error: string) => {
              toast.error(error, { autoClose: 5000 });
            })
            : toast.error(err.message, {autoClose : 5000});
            setIsLoading(false);
      });
  };

  const getList = async () => {
    setDataLoading(true);
    getVehicleList()
      .then((res) => {
        setList(res.data.vehicles);
        setDataLoading(false);
      })
      .catch((err) => {
        toast.error("Avtobus məlumatlarının yüklənməsi zamanı xəta baş verdi");
      });
  };

  useEffect(() => {
    getList();
  }, []);

  const PlateInputMask = (props: { value: any; onChange: any }) => (
    <InputMask mask="99aa999" value={props.value} onChange={props.onChange}>
      {(inputProps: JSX.IntrinsicAttributes) => (
        <Form.Control
          {...inputProps}
          type="text"
          id="input"
          placeholder="Dövlət qeydiyyat nişanını daxil edin"
        />
      )}
    </InputMask>
  );

  return (
    <>
      <Seo title="Avtobuslar" />

      <PageHeader
        title="Avtobuslar"
        item="Ana səhifə"
        active_item="Avtobuslar"
        action={() => setShowModal(true)}
        actionName="Avtobus əlavə et"
      />

      <Modal
        centered
        keyboard={false}
        size="lg"
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title as="h6" id="example-modal-sizes-title-lg">
            Avtobus əlavə et
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit(submitHandler)}>
          <Modal.Body>
            <Row className="p-2">
              <Col className="mb-3" xl={6} lg={6} md={6} sm={12}>
                <p className="mb-2 ">Model</p>
                <Controller
                  {...register(`model`, {
                    required: true,
                  })}
                  control={control}
                  render={({ field }: { field: any }) => (
                    <Select
                      {...field}
                      onChange={(val: any) => field.onChange(val?.value)}
                      value={Model.find(
                        (c: { value: number }) => c.value === field.value
                      )}
                      ref={field.ref}
                      isSearchable={false}
                      options={Model}
                      className="default basic-multi-select"
                      id="choices-multiple-default"
                      classNamePrefix="Select2"
                    />
                  )}
                />

                {errors.model && (
                  <Form.Control.Feedback className="d-block" type="invalid">
                    Seçim edilməsi vacibdir
                  </Form.Control.Feedback>
                )}
              </Col>

              <Col className="mb-3" xl={6} lg={6} md={6} sm={12}>
                <p className="mb-2 ">Eyniləşdirmə nömrəsi</p>
                <Form.Control
                  {...register("identificationNumber", {
                    required: true && "Eyniləşdirmə nömrəsi boş ola bilməz.",
                    min: {
                      value: 10000,
                      message:
                        "Eyniləşdirmə nömrəsi [10000,99999] aralığında ədəd olmalıdır.",
                    },
                    max: {
                      value: 99999,
                      message:
                        "Eyniləşdirmə nömrəsi [10000,99999] aralığında ədəd olmalıdır.",
                    },
                  })}
                  type="number"
                  id="input"
                  placeholder="Eyniləşdirmə nömrəsini daxil edin"
                />

                {errors.identificationNumber && (
                  <Form.Control.Feedback className="d-block" type="invalid">
                    {errors.identificationNumber.message}
                  </Form.Control.Feedback>
                )}
              </Col>

              <Col className="mb-3" xl={6} lg={6} md={6} sm={12}>
                <p className="mb-2 ">Dövlət qeydiyyat nişanı</p>
                <Controller
                  {...register("plateNumber", {
                    required: true,
                  })}
                  control={control}
                  render={({ field }) => (
                    <PlateInputMask
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
                {errors.plateNumber && (
                  <Form.Control.Feedback className="d-block" type="invalid">
                    Xananın doldurulması vacibdir
                  </Form.Control.Feedback>
                )}
              </Col>
              <Col className="mb-3" xl={6} lg={6} md={6} sm={12}>
                <p className="mb-2 ">Qeyd</p>
                <Form.Control
                  {...register("note")}
                  type="text"
                  id="input"
                  placeholder="Qeyd daxil edin"
                />
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
                {dataLoading ? <Loading /> : <BusDataTable data={list} />}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

Buses.layout = "Contentlayout";
export default Buses;
