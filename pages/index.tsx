import {jwtDecode} from 'jwt-decode';
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
import { useForm, SubmitHandler , Controller} from "react-hook-form";
import { Login } from "@/utils/actions";
import { useState } from "react";
import { LoginRequest } from '@/utils/requestModels';

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

  // Login handler
  const loginHandler: SubmitHandler<LoginRequest> = async (data) => {

    fetch("https://api.peeky.az/identity/api/account/login", {
      method: "POST",
      credentials: "include", // 🔥 BU MÜTLƏQDİR
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "username": "jmammadzada",
        "password": "Abc12345!"
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Server cavabı:", data);
        console.log("Cookie:", document.cookie); // 🔥 Cookie burda oxuna bilər (əgər HttpOnly yoxdursa)
      });

    setIsLoading(true);
    await Login(data)
      .then((res) => {
        localStorage.setItem("token", res.data);
        const tokenDecode: any = jwtDecode(res.data);
        localStorage.setItem("user_roles", tokenDecode['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']);
        router.push("/dashboard");
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });

  };

  return (
    <div style={{ height: "100vh", display: "flex", alignItems: "center" }}>
      <Row style={{"background": "white"}} className="align-items-center justify-content-between w-100">
        <Col style={{'backgroundColor': "#6D6AFF", 'height': '100vh', 'position': 'relative'}} md={7} className="text-white">
          <div style={{"padding": "50px"}}>

            <img width={200} src={`/assets/images/custom/logo-white.png`} />

            <h1 style={{"marginTop": "100px", "fontWeight": "700"}} className="mb-4">Xoş Gəldiniz!</h1>

            <p style={{"marginTop": "30px", "width": "60%", "fontSize": " 20px"}} className="mb-4">
              Sürücülərin <strong>performansını izləmək</strong>, <strong>marşrutları planlamaq</strong> və
              <strong> sərnişinlərin məmnuniyyətini</strong> onların real rəyləri əsasında
              <strong> ölçmək və artırmaq</strong> sizin əlinizdədir.
            </p>
            <p style={{"marginTop": "30px", "width": "60%", "fontSize": " 20px"}} >
              <strong>Peeky Dashboard</strong> sərnişinlərin fikirlərini əks etdirəcək – qrafikləri izləyin və xidməti daha yaxşı edin!
            </p>
          </div>
          <img style={{"position": 'absolute', 'right':'-90px', 'bottom': '20px', 'width': '40%'}} width={200} src={`/assets/images/custom/login-icon.png`} />
        </Col>

        <Col md={4}>
            <Card>
              <Row className="row-sm">
                <Col className="login_form">
                  <Container fluid>
                    <Row className="row-sm">
                      <Card.Body className="mt-2 mb-2">
                        <img
                          src={
                            "../../../assets/images/brand-logos/desktop-logo.png"
                          }
                          className=" d-lg-none header-brand-img text-start float-start mb-4 auth-light-logo"
                          alt="logo"
                        />
                        <img
                          src={
                            "../../../assets/images/brand-logos/desktop-dark.png"
                          }
                          className=" d-lg-none header-brand-img text-start float-start mb-4 auth-dark-logo"
                          alt="logo"
                        />
                        <div className="clearfix"></div>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form>
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
                              render={({field}) => (
                                <Form.Control
                                  {...field}
                                  className="form-control"
                                  placeholder="İstifadəçi adını daxil edin"
                                  type="text"
                                />
                              )}
                            />
                            
                            {errors.username && (
                              <Form.Control.Feedback className="d-block" type="invalid">
                                İstifadəçi adını daxil edin
                              </Form.Control.Feedback>
                            )}
                          </Form.Group>
                          <Form.Group
                            className="text-start form-group"
                            controlId="formpassword"
                          >
                            <Form.Label>Parol</Form.Label>
                            <Form.Control
                              {...register("password", {
                                required: true,
                              })}
                              className="form-control"
                              placeholder="Parolu daxil edin"
                              type="password"
                            />
                            {errors.password && (
                              <Form.Control.Feedback className="d-block" type="invalid">
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
