import React, { useEffect, useState } from "react";
import { AllUsers, Register } from "@/utils/actions";
import InputMask from "react-input-mask";
import Seo from "@/shared/layout-components/seo/seo";
import PageHeader from "@/shared/layout-components/page-header/page-header";
import { Button, Card, Col, Form, Modal, Row } from "react-bootstrap";
import dynamic from "next/dynamic";
import DataTable from "react-data-table-component";
import Loading from "../loading";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { userResponse } from "@/const/definitions";
import { toast } from "react-toastify";
import { RegisterRequest } from "@/utils/requestModels";
const DataTableExtensions: any = dynamic(
  () => import("react-data-table-component-extensions"),
  { ssr: false }
);

interface UserTableItem {
  email: string;
  fullName: string;
  roles: any;
  phoneNumber: string;
  username: string;
}

export const UsersDataTable = ({ data }: { data: any }) => {
  const columns: any = [
    {
      name: "İstifadəçi adı",
      selector: (row: UserTableItem) => [row.username],
      sortable: true,
    },
    {
      name: "İstifadəçinin tam adı",
      selector: (row: UserTableItem) => [row.fullName],
      sortable: true,
    },
    {
      name: "Email ünvanı",
      selector: (row: UserTableItem) => [row.email],
      sortable: true,
    },
    {
      name: "Rollar",
      selector: (row: UserTableItem) => [row.roles.join(", ")],
      sortable: true,
    },
    {
      name: "İstifadəçinin əlaqə nömrəsi",
      selector: (row: UserTableItem) => [row.phoneNumber],
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

const List = () => {
  const [dataLoading, setDataLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [list, setList] = useState<any>();

  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<RegisterRequest>();

  const getList = async () => {
    setDataLoading(true);
    AllUsers()
      .then((res) => {
        setList(res.data.users);
        setDataLoading(false);
      })
      .catch((err) => {
        toast.error("İstifadəçilərin yüklənməsi zamanı xəta baş verdi");
      });
  };

  useEffect(() => {
    getList();
  }, []);

  const submitHandler: SubmitHandler<userResponse> = async (data) => {
    setIsLoading(true);

    const FORM_DATA = {
      ...data,
      phoneNumber: data.phoneNumber.replace(/[^0-9]/g, ""),
    };

    Register(FORM_DATA)
      .then((res) => {
        setIsLoading(false);
        setShowModal(false);
        toast.success("İstifadəçi uğurla əlavə olundu");
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
    <InputMask
      mask="+\9\94999999999"
      value={props.value}
      onChange={props.onChange}
    >
      {(inputProps: JSX.IntrinsicAttributes) => (
        <Form.Control
          {...inputProps}
          type="text"
          id="input"
          placeholder="Əlaqə nömrəsini daxil edin"
        />
      )}
    </InputMask>
  );

  return (
    <>
      <Seo title="İstifadəçilər" />

      <PageHeader
        title="İstifadəçilər"
        item="Ana səhifə"
        active_item="İstifadəçilər"
        action={() => {
          setShowModal(true);
        }}
        actionName="İstifadəçi əlavə et"
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
            Yeni istifadəçi əlavə olunası
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit(submitHandler)}>
          <Modal.Body>
            <Row className="p-2">
              <Col className="mb-3" xl={4} lg={6} md={6} sm={12}>
                <p className="mb-2">Adı</p>
                <Form.Control
                  className="error"
                  onInput={(e) => {
                    const input = e.target as HTMLInputElement;
                    input.value = input.value.replace(
                      /[^A-Za-zƏəĞğİıÖöŞşÜüÇç]/g,
                      ""
                    );
                  }}
                  {...register("name", {
                    pattern: {
                      value: /^[A-Za-zƏəĞğİıÖöŞşÜüÇç]+$/i,
                      message: "Ad yalnız hərflərdən ibarət olmalıdır.",
                    },
                    required: {
                      value: true,
                      message: "Ad boş ola bilməz.",
                    },
                    minLength: {
                      value: 3,
                      message: "Ad ən azı 3 simvoldan ibarət olmalıdı.",
                    },
                    maxLength: {
                      value: 20,
                      message: "Ad 20 simvoldan artıq olmamalıdır.",
                    },
                  })}
                  type="text"
                  id="input"
                  placeholder="Ad daxil edin"
                />
                {errors.name && (
                  <Form.Control.Feedback className="d-block" type="invalid">
                    {errors.name.message}
                  </Form.Control.Feedback>
                )}
              </Col>
              <Col className="mb-3" xl={4} lg={6} md={6} sm={12}>
                <p className="mb-2">Soyadı</p>
                <Form.Control
                  className="error"
                  onInput={(e) => {
                    const input = e.target as HTMLInputElement;
                    input.value = input.value.replace(
                      /[^A-Za-zƏəĞğİıÖöŞşÜüÇç]/g,
                      ""
                    );
                  }}
                  {...register("surname", {
                    pattern: {
                      value: /^[A-Za-zƏəĞğİıÖöŞşÜüÇç]+$/i,
                      message: "Soyad yalnız hərflərdən ibarət olmalıdır.",
                    },
                    required: {
                      value: true,
                      message: "Soyad boş ola bilməz.",
                    },
                    minLength: {
                      value: 3,
                      message: "Soyad ən azı 3 simvoldan ibarət olmalıdı.",
                    },
                    maxLength: {
                      value: 20,
                      message: "Soyad 20 simvoldan artıq olmamalıdır.",
                    },
                  })}
                  type="text"
                  id="input"
                  placeholder="Soyad daxil edin"
                />
                {errors.surname && (
                  <Form.Control.Feedback className="d-block" type="invalid">
                    {errors.surname.message}
                  </Form.Control.Feedback>
                )}
              </Col>

              <Col className="mb-3" xl={4} lg={6} md={6} sm={12}>
                <p className="mb-2">İstifadəçi adı</p>
                <Form.Control
                  className="error"
                  onInput={(e) => {
                    const input = e.target as HTMLInputElement;
                    input.value = input.value.replace(/[^A-Za-z]/g, "");
                  }}
                  {...register("username", {
                    pattern: {
                      value: /^[A-Za-z]+$/,
                      message:
                        "İstifadəçi adı yalnız ingilis əlifbası hərflərindən ibarət olmalıdır.",
                    },
                    required: {
                      value: true,
                      message: "İstifadəçi adı boş ola bilməz.",
                    },
                    minLength: {
                      value: 5,
                      message:
                        "İstifadəçi adı ən azı 3 simvoldan ibarət olmalıdı.",
                    },
                    maxLength: {
                      value: 20,
                      message: "İstifadəçi adı 20 simvoldan artıq olmamalıdır.",
                    },
                  })}
                  type="text"
                  id="input"
                  placeholder="İstifadəçi adını daxil edin"
                />
                {errors.username && (
                  <Form.Control.Feedback className="d-block" type="invalid">
                    {errors.username.message}
                  </Form.Control.Feedback>
                )}
              </Col>

              <Col className="mb-3" xl={4} lg={6} md={6} sm={12}>
                <p className="mb-2">Email</p>
                <Form.Control
                  className="error"
                  {...register("email", {
                    required: {
                      value: true,
                      message: "Email boş ola bilməz.",
                    },
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Email formatı düzgün deyil.",
                    },
                  })}
                  type="email"
                  id="input"
                  placeholder="Email daxil edin"
                />
                {errors.email && (
                  <Form.Control.Feedback className="d-block" type="invalid">
                    {errors.email?.message}
                  </Form.Control.Feedback>
                )}
              </Col>

              <Col className="mb-3" xl={4} lg={6} md={6} sm={12}>
                <p className="mb-2">Əlaqə nömrəsi</p>
                <Controller
                  {...register("phoneNumber", {
                    required: {
                      value: true,
                      message: "Telefon nömrəsi tələb olunur.",
                    },
                    pattern: {
                      value: /^\+994[0-9]\d[1-9]\d{6}$/,
                      message: "Telefon nömrəsi düzgün formatda deyil."
                    }
                  })}
                  control={control}
                  render={({ field }) => (
                    <PhoneMaskedInput
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
                {errors.phoneNumber && (
                  <Form.Control.Feedback className="d-block" type="invalid">
                    {errors.phoneNumber.message}
                  </Form.Control.Feedback>
                )}
              </Col>

              <Col className="mb-3" xl={4} lg={6} md={6} sm={12}>
                <p className="mb-2">Parol</p>
                <Form.Control
                  className="error"
                  {...register("password", {
                    required: true && "Şifrə boş ola bilməz.",
                    validate: {
                      minLength: (value) =>
                        value.length >= 8 ||
                        "Şifrə ən azı 8 simvoldan ibarət olmalıdır.",
                      hasUpperCase: (value) =>
                        /[A-Z]/.test(value) ||
                        "Şifrədə ingilis əlifbasının ən azı bir böyük hərfi olmalıdır (A-Z).",
                      hasLowerCase: (value) =>
                        /[a-z]/.test(value) ||
                        "Şifrədə ingilis əlifbasının ən azı bir balaca hərfi olmalıdır (a-z).",
                      hasNumberCase: (value) =>
                      /[0-9]/.test(value) || "Şifrədə ən azı bir rəqəm olmalıdır (0-9).",
                      hasSpecialChar: (value) =>
                        /[!@#$%^&*(),.?":{}|<>]/.test(value) ||
                        "Şifrədə ən azı bir xüsusi simvol olmalıdır (məsələn: @,#,$,% və s.).",
                    },
                  })}
                  type="text"
                  id="input"
                  placeholder="Parol daxil edin"
                />
                {errors.password && (
                  <Form.Control.Feedback className="d-block" type="invalid">
                    {errors.password.message}
                    {errors.password?.types?.minLength && (
                      <p>{errors.password.types.minLength}</p>
                    )}
                    {errors.password?.types?.hasUpperCase && (
                      <p>{errors.password.types.hasUpperCase}</p>
                    )}
                    {errors.password?.types?.hasSpecialChar && (
                      <p>{errors.password.types.hasSpecialChar}</p>
                    )}
                    {errors.password?.types?.hasNumberCase && (
                      <p>{errors.password.types.hasNumberCase}</p>
                    )}
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
          <Card className="custom-card overflow-hiddden">
            <Card.Body>
              <div className="responsive">
                {dataLoading ? <Loading /> : <UsersDataTable data={list} />}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

List.layout = "Contentlayout";

export default List;
