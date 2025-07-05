import PageHeader from "@/shared/layout-components/page-header/page-header";
import Seo from "@/shared/layout-components/seo/seo";
import {
  AllRoles,
  CreateBlockedNumber,
  createRole,
  GetBlockedNumberList,
  RemoveBlockedNumber,
} from "@/utils/actions";
import React, { useEffect, useState } from "react";
import Loading from "../dashboard/loading";
import { Card, Row, Col, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { SubmitHandler, useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import DataTable from "react-data-table-component";
import {
  CreateBlockedNumberRequest,
  RemoveBlockedNumberRequest,
} from "@/utils/requestModels";
const DataTableExtensions: any = dynamic(
  () => import("react-data-table-component-extensions"),
  { ssr: false }
);

const UserRoles = () => {
  const [dataLoading, setDataLoading] = useState<boolean>(false);
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [list, setList] = useState<any>();



interface BlockedNumersTableItem {
    mobileNumber: string;
    id: string;
  }
  
  const BlockedNumersTable = ({ data }: { data: any }) => {
    const columns: any = [
      {
        name: "Nömrə",
        selector: (row: BlockedNumersTableItem) => [row.mobileNumber],
        sortable: true,
      },
      {
        name: "Əməliyyat",
        selector: (row: BlockedNumersTableItem) => [
          <Button onClick={(e) => {
            const model = {
                blockedMobileNumberId: row.id
            }
            RemoveBlockedNumberhandler(model);
          }}>Blokdan çıxar</Button>,
        ],
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


  const RemoveBlockedNumberhandler = (blockedMobileNumberId: RemoveBlockedNumberRequest) => {
    setBtnLoading(true);
    RemoveBlockedNumber(blockedMobileNumberId)
      .then((res) => {
          setIsLoading(false);
          toast.success(res?.message);
          getList();
      })
      .catch((err) => {
        err.errors
          ? err.errors?.map((error: string) => {
              toast.error(error, { autoClose: 5000 });
            })
            : toast.error(err.message, {autoClose : 5000});
            reset();
            setIsLoading(false);
      });
  }
  
  const getList = async () => {
    setDataLoading(true);
    GetBlockedNumberList()
      .then((res) => {

        setList(res?.data?.blockedMobileNumbers.filter(num => num.isActive == true));
        setDataLoading(false);
      })
      .catch((err) => {
        toast.error("Nömrələrin yüklənməsi zamanı xəta baş verdi");
      });
  };

  useEffect(() => {
    getList();
  }, []);

  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<CreateBlockedNumberRequest>();

  const blockNumberHandler: SubmitHandler<CreateBlockedNumberRequest> = async (
    data
  ) => {
    setIsLoading(true);
    CreateBlockedNumber(data)
      .then((res) => {
          setIsLoading(false);
          toast.success(res?.message);
          getList();
          reset();
      })
      .catch((err) => {
        err.errors
          ? err.errors?.map((error: string) => {
              toast.error(error, { autoClose: 5000 });
            })
            : toast.error(err.message, {autoClose : 5000});
            reset();
            setIsLoading(false);
      });
  };

  return (
    <>
      <Seo title="Blok olunmuş nömrələr" />

      <PageHeader
        title="Blok olunmuş nömrələr"
        item="Ana səhifə"
        active_item="Blok olunmuş nömrələr"
        actionName=""
      />

      <Form onSubmit={handleSubmit(blockNumberHandler)}>
        <Row className="row-sm">
          <Col className="mb-3" xl={3} lg={3} md={6} sm={12}>
            <p className="mb-2 ">Nömrə</p>
            <Form.Control
              className="error"
              {...register("mobileNumber", {
                required: true && "Xananın doldurulması vacibdir",
              })}
              type="text"
              id="input"
              placeholder="+99451 000 00 00"
            />
            {errors.mobileNumber && (
              <Form.Control.Feedback className="d-block" type="invalid">
                Xananın dolduruması vacibdir
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
                "Əlavə edin"
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
                {dataLoading ? <Loading /> : <BlockedNumersTable data={list} />}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

UserRoles.layout = "Contentlayout";
export default UserRoles;
