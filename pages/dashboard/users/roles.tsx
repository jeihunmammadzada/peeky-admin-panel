import PageHeader from "@/shared/layout-components/page-header/page-header";
import Seo from "@/shared/layout-components/seo/seo";
import {
  AllRoles,
  AllUsers,
  assignUserRole,
  createRole,
} from "@/utils/actions";
import React, { useEffect, useState } from "react";
import Loading from "../loading";
import { Card, Row, Col, Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Select from "react-select";
import dynamic from "next/dynamic";
import DataTable from "react-data-table-component";
import {
  AssignUserRoleRequest,
  CreateRoleRequest,
} from "@/utils/requestModels";
const DataTableExtensions: any = dynamic(
  () => import("react-data-table-component-extensions"),
  { ssr: false }
);

interface RoleTableItem {
  id: string;
  name: string;
}

export const RoleDataTable = ({ data }: { data: any }) => {
  const columns: any = [
    {
      name: "Rolun adı",
      selector: (row: RoleTableItem) => [row.name],
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

const UserRoles = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [dataLoading, setDataLoading] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userList, setUserList] = useState<any>([]);
  const [roleList, setRoleList] = useState<any>([]);
  const [list, setList] = useState<any>();

  const getList = async () => {
    const role_list: { value: any; label: string }[] = [];

    setDataLoading(true);
    AllRoles()
      .then((res) => {
        setList(res.data?.roles);
        setDataLoading(false);

        res.data?.roles.map((r: any) => {
          role_list.push({
            value: r.id,
            label: r.name,
          });
        });
      })
      .then(() => {
        setRoleList(role_list);
      }).catch(err => {
        toast.error("Rolların yüklənməsi zamanı xəta baş verdi")
      });
  };

  useEffect(() => {
    const emp_list: { value: any; label: string }[] = [];
    AllUsers()
      .then((res) => {
        res?.data?.users?.map((r: any) => {
          emp_list.push({
            value: r.id,
            label: r.fullName,
          });
        });
      })
      .then(() => {
        setUserList(emp_list);
      })
      .catch((err) => {
        return toast.error("İstifadəçilən yüklənməsi zamanı xəta baş verdi");
      });

    getList();
  }, []);

  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<CreateRoleRequest>();

  const {
    control: control2,
    handleSubmit: handleSubmit2,
    register: register2,
    reset: reset2,
    formState: { errors: errors2 },
  } = useForm<AssignUserRoleRequest>();

  const addRolehandler: SubmitHandler<CreateRoleRequest> = async (data) => {
    setIsLoading(true);
    createRole(data).then((res) => {
      setIsLoading(false);
      setShowModal(false);
      toast.success("Rol uğurla əlavə olundu");
      getList();
      reset();
    }).catch(err => {
      err.errors.map((error: string) => {
        toast.error(error, {autoClose: 5000})
      })
      setIsLoading(false);
    });
  };

  const assignRolehandler: SubmitHandler<AssignUserRoleRequest> = async (
    data
  ) => {
    setIsLoading(true);
    assignUserRole(data).then((res) => {
      setIsLoading(false);
      setShowModal(false);
      toast.success("Rol uğurla təhkim olundu");
      reset2();
    }).catch(err => {
      err.errors.map((error: string) => {
        toast.error(error, {autoClose: 5000})
      })
      setIsLoading(false);
    });
  };

  return (
    <>
      <Seo title="İstifadəçi rolları" />

      <PageHeader
        title="İstifadəçi rolları"
        item="Ana səhifə"
        active_item="İstifadəçi rolları"
        action={() => {
          setShowModal(true);
        }}
        actionName="Rol təhkim et"
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
            Rol təhkim olunması
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit2(assignRolehandler)}>
          <Modal.Body>
            <Row className="p-2">
              <Col className="mb-3" xl={6} lg={6} md={6} sm={12}>
                <p className="mb-2">Rol seçin</p>
                <Controller
                  {...register2("roleId", {
                    required: true,
                  })}
                  control={control2}
                  render={({ field }) => (
                    <Select
                      {...field}
                      onChange={(val: any) => field.onChange(val?.value)}
                      value={roleList.find(
                        (c: { value: string }) => c.value === field.value
                      )}
                      ref={field.ref}
                      isSearchable={false}
                      options={roleList}
                      className="default basic-multi-select"
                      id="choices-multiple-default"
                      classNamePrefix="Select2"
                    />
                  )}
                />

                {errors2.roleId && (
                  <Form.Control.Feedback className="d-block" type="invalid">
                    Seçim edilməsi vacibdir
                  </Form.Control.Feedback>
                )}
              </Col>
              <Col className="mb-3" xl={6} lg={6} md={6} sm={12}>
                <p className="mb-2">İstifadəçi seçin</p>
                <Controller
                  {...register2("userId", {
                    required: true,
                  })}
                  control={control2}
                  render={({ field }) => (
                    <Select
                      {...field}
                      onChange={(val: any) => field.onChange(val?.value)}
                      value={userList.find(
                        (c: { value: string }) => c.value === field.value
                      )}
                      ref={field.ref}
                      isSearchable={false}
                      options={userList}
                      className="default basic-multi-select"
                      id="choices-multiple-default"
                      classNamePrefix="Select2"
                    />
                  )}
                />

                {errors2.userId && (
                  <Form.Control.Feedback className="d-block" type="invalid">
                    Seçim edilməsi vacibdir
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

      <Form onSubmit={handleSubmit(addRolehandler)}>
        <Row className="row-sm">
          <Col className="mb-3" xl={3} lg={3} md={6} sm={12}>
            <p className="mb-2 ">Rolun adı</p>
            <Form.Control
              className="error"
              {...register("roleName", {
                required: true && "Xananın doldurulması vacibdir",
              })}
              type="text"
              id="input"
              placeholder="Rol adını daxil edin"
            />
            {errors.roleName && (
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
                {dataLoading ? <Loading /> : <RoleDataTable data={list} />}
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
