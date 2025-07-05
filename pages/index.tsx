import { jwtDecode } from "jwt-decode";
import {
  Button,
  Col,
  Form,
  Row,
  Alert,
  Container,
  Card,
} from "react-bootstrap";
import { useRouter } from "next/router";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Login } from "@/utils/actions";
import { useState } from "react";
import { LoginRequest } from "@/utils/requestModels";
import styles from "@/styles/main.module.scss";

const Home = () => {
  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<LoginRequest>();
  const router = useRouter();

  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // Login handler
  const loginHandler: SubmitHandler<LoginRequest> = async (data) => {
    setIsLoading(true);
    await Login(data)
      .then((res) => {
        localStorage.setItem("token", res.data);
        const tokenDecode: any = jwtDecode(res.data);
        localStorage.setItem(
          "user_roles",
          tokenDecode[
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
          ]
        );
        router.push("/dashboard");
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  };

  return (
    <div className={styles.fullPage}>
      <Row
        style={{ background: "white" }}
        className={`${styles.row} align-items-center justify-content-between`}
      >
        <Col
          sm={12}
          md={6}
          lg={7}
          className={`${styles.leftSection} text-white`}
        >
          <div className={styles.leftContent}>
            <img width={200} src={`/assets/images/custom/logo-white.png`} />

            <h1 className="mb-4">Xoş Gəldiniz!</h1>

            <p className="mb-4">
              Sürücülərin <strong>performansını izləmək</strong>,{" "}
              <strong>marşrutları planlamaq</strong> və
              <strong> sərnişinlərin məmnuniyyətini</strong> onların real
              rəyləri əsasında
              <strong> ölçmək və artırmaq</strong> sizin əlinizdədir.
            </p>
            <p>
              <strong>Peeky Dashboard</strong> sərnişinlərin fikirlərini əks
              etdirəcək – qrafikləri izləyin və xidməti daha yaxşı edin!
            </p>
          </div>
          <img
            className={styles.loginImage}
            width={200}
            src={`/assets/images/custom/login-icon.png`}
          />
        </Col>

        <Col sm={12} md={6} lg={4}>
          <Card>
            <Row className="row-sm">
              <Col className="login_form">
                <Container fluid>
                  <Row className="row-sm">
                    <Card.Body className="mt-2 mb-2">
                      <div className="clearfix"></div>
                      {error && <Alert variant="danger">{error}</Alert>}
                      <Form className={styles.form}>
                        <h5 className="text-start mb-2">Xoş gəlmisiniz!</h5>
                        <p className="mb-4 text-muted fs-13 ms-0 text-start">
                          İstifadəçi adı və parolu daxil etməklə platformaya
                          daxil olun
                        </p>
                        <Form.Group
                          className="text-start form-group"
                          controlId="formUsername"
                        >
                          <Form.Label>İstifadəçi adı</Form.Label>

                          <Controller
                            {...register("username", {
                              required: true,
                            })}
                            control={control}
                            render={({ field }) => (
                              <Form.Control
                                {...field}
                                className="form-control"
                                placeholder="İstifadəçi adını daxil edin"
                                autoComplete="off"
                                type="text"
                              />
                            )}
                          />

                          {errors.username && (
                            <Form.Control.Feedback
                              className="d-block"
                              type="invalid"
                            >
                              İstifadəçi adını daxil edin
                            </Form.Control.Feedback>
                          )}
                        </Form.Group>
                        <Form.Group
                          className="text-start form-group"
                          controlId="formpassword"
                        >
                          <Form.Label>Parol</Form.Label>
                          <div style={{ position: "relative" }}>
                            <Form.Control
                              {...register("password", {
                                required: true,
                              })}
                              className="form-control"
                              placeholder="Parolu daxil edin"
                              autoComplete="off"
                              type={showPassword ? "text" : "password"}
                            />

                            <span
                              onClick={togglePasswordVisibility}
                              style={{
                                position: "absolute",
                                top: "50%",
                                right: "10px",
                                transform: "translateY(-50%)",
                                cursor: "pointer",
                                userSelect: "none",
                              }}
                            >
                              {showPassword ? <i className="ti ti-eye-off"></i> : <i className="ti-eye"></i>}
                            </span>
                          </div>
                          {errors.password && (
                            <Form.Control.Feedback
                              className="d-block"
                              type="invalid"
                            >
                              Parolu daxil edin
                            </Form.Control.Feedback>
                          )}
                        </Form.Group>
                        <div className="d-grid">
                          <Button
                            disabled={isLoading}
                            onClick={handleSubmit(loginHandler)}
                            className="btn ripple btn-main-primary btn-block mt-2"
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
                              "Daxil olun"
                            )}
                          </Button>
                        </div>
                      </Form>
                    </Card.Body>
                  </Row>
                </Container>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Home;