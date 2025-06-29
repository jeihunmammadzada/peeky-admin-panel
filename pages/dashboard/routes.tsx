import { addRoute } from "@/const/definitions";
import PageHeader from "@/shared/layout-components/page-header/page-header";
import Seo from "@/shared/layout-components/seo/seo";
import { CreateRoute, getRouteList } from "@/utils/actions";
import { useEffect, useState } from "react";
import { Card, Row, Col, Modal, Button, Form } from "react-bootstrap";
import { useForm, SubmitHandler } from "react-hook-form";
import Loading from "./loading";
import dynamic from "next/dynamic";
import DataTable from "react-data-table-component";
import { CreateRouteRequest } from "@/utils/requestModels";
import { toast } from "react-toastify";
const DataTableExtensions: any = dynamic(
  () => import("react-data-table-component-extensions"),
  { ssr: false }
);

interface RoutesTableItem {
  id: string;
  number: string;
  destinations: {
    id: string,
    address: string
  }[]
}

export const RouteDataTable = ({data}:{data: any}) => {

  const columns: any = [
    {
      name: "Marşrutun nömrəsi",
      selector: (row: RoutesTableItem) => [row.number],
      sortable: true,
    },
    {
      name: "Təyinat nöqtəsi 1",
      selector: (row: RoutesTableItem) => [row.destinations[0].address],
      sortable: false,
    },
    {
      name: "Təyinat nöqtəsi 2",
      selector: (row: RoutesTableItem) => [row.destinations[1].address],
      sortable: false,
    }
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

const Routes = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [dataLoading, setDataLoading] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [list, setList] = useState<any>();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<CreateRouteRequest>();

  const submitHandler: SubmitHandler<addRoute> = async (data) => {
    setIsLoading(true);
    CreateRoute(data).then(res => {
      toast.success("Xətt uğurla əlavə olundu")
      setIsLoading(false);
      setShowModal(false);
      getList();
      reset();
    }).catch((err) => {
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
    getRouteList().then((res) => {
      setList(res.data.routes);
      setDataLoading(false);
    }).catch(err=> {
      toast.error("Xətt məlumatlarının yüklənməsi zamanı xəta baş verdi")
    });
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <>
      <Seo title="Xəttlər" />

      <PageHeader
        title="Xəttlər"
        item="Ana səhifə"
        active_item="Xəttlər"
        action={() => setShowModal(true)}
        actionName="Xətt əlavə et"
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
            Xətt əlavə et
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit(submitHandler)}>
        <Modal.Body>
          <Row className="p-2">
            <Col>
              <p className="mb-2 ">Xəttin nömrəsi</p>
              <Form.Control
                {...register("number", {
                  required: true
                })}
                type="text"
                id="input"
                placeholder="Xəttin nömrəsini daxil edin"
              />
              {errors.number && (
                <Form.Control.Feedback className="d-block" type="invalid">
                  Xananın doldurulması vacibdir
                </Form.Control.Feedback>
              )}
            </Col>
            <Col>
              <p className="mb-2">Təyinat yeri - 1 </p>
              <Form.Control
                {...register("destinations.0.address", {
                  required: true
                })}
                type="text"
                id="input"
                placeholder="Təyinat məntəqəsini qeyd edin"
              />
              {errors.destinations?.[0]?.address && (
                <Form.Control.Feedback className="d-block" type="invalid">
                  Xananın doldurulması vacibdir
                </Form.Control.Feedback>
              )}
            </Col>
            <Col>
              <p className="mb-2 ">Təyinat yeri - 2 </p>
              <Form.Control
                {...register("destinations.1.address", {
                  required: true
                })}
                type="text"
                id="input"
                placeholder="Təyinat məntəqəsini qeyd edin"
              />
              {errors.destinations?.[1]?.address && (
                <Form.Control.Feedback className="d-block" type="invalid">
                  Xananın doldurulması vacibdir
                </Form.Control.Feedback>
              )}
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button disabled={isLoading} type="submit" className="btn btn-primary">
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
                {dataLoading ? <Loading/> : <RouteDataTable data={list} />}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

Routes.layout = "Contentlayout";
export default Routes;