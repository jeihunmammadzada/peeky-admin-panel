import dynamic from "next/dynamic";
import PageHeader from "@/shared/layout-components/page-header/page-header";
import Seo from "@/shared/layout-components/seo/seo";
import Select from "react-select";
import { CreateQrCode, GetQRById, GetQRList, getVehicleList } from "@/utils/actions";
import { CreateQRCodeRequest } from "@/utils/requestModels";
import React, { useEffect, useRef, useState } from "react";
import { Form, Row, Col, Button, Card, Modal } from "react-bootstrap";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import DataTable from "react-data-table-component";
import Loading from "../loading";
import Image from "next/image";
const DataTableExtensions: any = dynamic(
  () => import("react-data-table-component-extensions"),
  { ssr: false }
);

const Qr = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [dataLoading, setDataLoading] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [busList, setBusList] = useState<any>([]);
  const [list, setList] = useState<any>();
  const [qrLoading, setQrLoading] = useState<boolean>(false);
  const [selectedBus, setSelectedBus] = useState<string>('');
  const [selectedQR, setSelectedQR] = useState<string>('');

  const handleImageDownload = () => {
    const link = document.createElement("a");
    link.href = `${selectedQR}`;
    link.download = `${selectedBus}-qr.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getQR = async (id: string) => {
    setQrLoading(true);
    GetQRById(id).then(data => {
      setSelectedQR(`data:image/png;base64,${data?.data?.qrCode?.qrCodeBase64}`);
      setQrLoading(false);
    }).catch(err => {
      toast.error(err.message)
    })
  }

  interface QrTableItem {
    id: string;
    plateNumber: string;
  }

  const QrDataTable = ({ data }: { data: any }) => {
    const columns: any = [
      {
        name: "Avtobusun nömrəsi",
        selector: (row: QrTableItem) => [row.plateNumber],
        sortable: true,
      },
      {
        name: "Əməliyyat",
        selector: (row: QrTableItem) => [<Button onClick={e => {
          setShowModal(true);
          getQR(row.id)
          setSelectedBus(row.plateNumber)
        }}>QR göstər</Button>]
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

  const {
    control: control,
    handleSubmit: handleSubmit,
    register: register,
    reset: reset,
    setValue: setValue,
    formState: { errors },
  } = useForm<CreateQRCodeRequest>();

  const getList = async () => {
    setDataLoading(true);
    try {
      const res = await GetQRList();
      setList(res?.data?.qrCodeVehicles);
      setDataLoading(false);

      const existingPlates = res?.data?.qrCodeVehicles.map((item: any) => item.plateNumber);
      const allVehiclesRes = await getVehicleList();

      const availableBuses = allVehiclesRes.data?.vehicles
        .filter((vehicle: any) => !existingPlates?.includes(vehicle.plateNumber))
        .map((r: any) => ({ value: r.id, label: r.plateNumber }));

      setBusList(availableBuses);
    } catch (err) {
      toast.error("Məlumatlar yüklənərkən xəta baş verdi");
      setDataLoading(false);
    }
  };

  useEffect(() => {
    getList();
  }, [])

  const createQrHandler: SubmitHandler<CreateQRCodeRequest> = async (data) => {
    setIsLoading(true);
    CreateQrCode(data).then((res) => {
      setIsLoading(false);
      toast.success("QR uğurla yaradıldı");
      reset();
      setValue("vehicleId", "");
      getList();
    }).catch(err => {
      err.errors
          ? err.errors?.map((error: string) => {
              toast.error(error, { autoClose: 5000 });
            })
            : toast.error(err.message, {autoClose : 5000});
      setIsLoading(false);
    });
  };

  return (
    <>
      <Seo title="QR Kodlar" />

      <PageHeader
        title="QR"
        item="Ana səhifə"
        active_item="QR Kodlar"
        actionName="QR Yarat"
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
            {selectedBus} nömrəli avtobusun QR kodu
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col className="d-flex justify-content-center align-items-center" xl={12}>
              {qrLoading ?
                <Loading /> :
                <Image src={selectedQR} alt="QR" width={300} height={300} />
              }
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleImageDownload} type="submit" className="btn btn-primary">
            Yüklə
          </Button>
        </Modal.Footer>
      </Modal>

      <Form onSubmit={handleSubmit(createQrHandler)}>
        <Row className="row-sm">
          <Col className="mb-3" xl={3} lg={3} md={6} sm={12}>
            <p className="mb-2 ">Avtobus seçin</p>
            <Controller
              {...register("vehicleId", {
                required: true,
              })}
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  onChange={(val: any) => field.onChange(val?.value)}
                  value={busList.find(
                    (c: { value: string }) => c.value === field.value
                  ) || null}
                  ref={field.ref}
                  isSearchable={true}
                  options={busList}
                  className="default basic-multi-select"
                  id="choices-multiple-default"
                  classNamePrefix="Select2"
                />
              )}
            />
            {errors.vehicleId && (
              <Form.Control.Feedback className="d-block" type="invalid">
                Seçim edilməsi vacibdir
              </Form.Control.Feedback>
            )}
          </Col>

          <Col className="mb-3" xl={3} lg={3} md={6} sm={12}>
            <p className="mb-2">‎</p>
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
                "QR yaradın"
              )}
            </Button>
          </Col>
        </Row>
      </Form>

      <Row className="row-sm">
        <Col lg={12}>
          <Card className="custom-card overflow-hiddden">
            <Card.Body>
              <div className="responsive">
                {dataLoading ? <Loading /> : <QrDataTable data={list} />}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

Qr.layout = "Contentlayout";
export default Qr;