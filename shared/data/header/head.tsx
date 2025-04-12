import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";
import {
  Dropdown,
  Form,
  InputGroup,
} from "react-bootstrap";
import { Logout } from "@/utils/actions";
import { ThemeChanger } from "../../redux/actions";
import store from "@/shared/redux/store";
import { connect } from "react-redux";
import { toast } from "react-toastify";

const HeadDropDown = ({
  local_varaiable,
  ThemeChanger,
}: {
  local_varaiable: any;
  ThemeChanger: any;
}) => {
  let { basePath } = useRouter();
  const storedData = store.getState();
   const user: any = store.getState().user;
   const router = useRouter();

  //Dark Model
  const ToggleDark = () => {
    ThemeChanger({
      ...local_varaiable,
      dataThemeMode: local_varaiable.dataThemeMode == "dark" ? "light" : "dark",
      dataHeaderStyles:
        local_varaiable.dataHeaderStyles == "dark" ? "light" : "dark",
      dataMenuStyles:
        local_varaiable.dataNavLayout == "horizontal"
          ? local_varaiable.dataMenuStyles == "light"
            ? "dark"
            : "dark"
          : "dark",
    });

    if (storedData.dataThemeMode != "dark") {
      ThemeChanger({
        ...storedData,
        bodyBg: "",
        bodyBg1: "",
        lightRgb: "",
        formControl: "",
        inputBorder: "",
        sidemenuActiveBgcolor: "",
      });
      localStorage.setItem("Spruhalighttheme", "dark");
      localStorage.removeItem("Spruhadarktheme");
    } else {
      localStorage.setItem("Spruhadarktheme", "dark");
      localStorage.removeItem("Spruhalighttheme");
    }
  };

  function Fullscreen() {
    if (document.fullscreenElement) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    } else {
      const element = document.documentElement;
      if (element.requestFullscreen) {
        element.requestFullscreen();
      }
    }
  }

  const LogoutHandler = async () => {
    Logout().then((res) => {
      router.push("/");
      localStorage.removeItem("token");
    }).catch((err) => {
      toast.error(err.message);
    })
  }

  return (
    <>
      <div className="header-element header-fullscreen d-xl-flex d-none">
        <div className="header-link d-xl-block d-none" onClick={Fullscreen}>
          <i className="fe fe-maximize full-screen-open header-link-icon"></i>
        </div>
      </div>

      <Dropdown className="header-search">
        <Dropdown.Toggle variant="default" className="px-0">
          <i className="fe fe-search header-icons fs-18 px-2 lh-5"></i>
        </Dropdown.Toggle>

        <Dropdown.Menu className="p-2">
          <InputGroup className="">
            <Form.Control
              type="search"
              className="form-control rounded-0"
              placeholder="Search for anything..."
            />
            <InputGroup.Text className="btn search-btn ms-auto d-flex">
              <i className="fe fe-search"></i>
            </InputGroup.Text>
          </InputGroup>
        </Dropdown.Menu>
      </Dropdown>

      <Dropdown className="header-element">
        <Dropdown.Toggle
          href="#!"
          className="header-link dropdown-toggle"
          id="mainHeaderProfile"
          data-bs-toggle="dropdown"
          data-bs-auto-close="outside"
          aria-expanded="false"
          variant="default"
        >
          <div className="d-flex align-items-center">
            <span style={{'marginRight': '1px', 'marginTop': '5px'}}>{user.fullName}</span>
            <div className="header-link-icon">
              <img
                src={`${
                  process.env.NODE_ENV === "production" ? basePath : ""
                }/assets/images/faces/profile.png`}
                alt="img"
                width="32"
                height="32"
                className="rounded-circle"
              />
            </div>
            {/* <div className="d-none">
              <p className="fw-semibold mb-0">Angelica</p>
              <span className="op-7 fw-normal d-block fs-11">Web Designer</span>
            </div> */}
          </div>
        </Dropdown.Toggle>
        <Dropdown.Menu
          className="main-header-dropdown dropdown-menu pt-0 overflow-hidden header-profile-dropdown dropdown-menu-end"
          aria-labelledby="mainHeaderProfile"
        >
          <li>
            <div className="header-navheading border-bottom">
              <h6 className="main-notification-title">
                {user.fullName}
              </h6>
              {/* <p className="main-notification-text mb-0">Web Designer</p> */}
            </div>
          </li>
          <li>
            <Link
              className="dropdown-item d-flex border-bottom"
              href={`user/profile`}
            >
              <i className="fe fe-user fs-16 align-middle me-2"></i>Şəxsi
              məlumatlar
            </Link>
          </li>
          <li>
            <span onClick={LogoutHandler} style={{cursor: 'pointer'}} className="dropdown-item d-flex border-bottom">
              <i className="fe fe-power fs-16 align-middle me-2"></i>Çıxış
            </span>
          </li>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};
const mapStateToProps = (state: any) => ({
  local_varaiable: state,
});
export default connect(mapStateToProps, { ThemeChanger })(HeadDropDown);
