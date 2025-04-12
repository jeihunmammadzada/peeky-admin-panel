import React, { Fragment, useEffect, useState } from "react";
import {
  Dropdown,
  Container,
  Form,
  Nav,
  Navbar,
  InputGroup,
  Button,
} from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";

import dynamic from "next/dynamic";
import { connect } from "react-redux";
import { ThemeChanger } from "@/shared/redux/actions";
import store from "@/shared/redux/store";
import {
  Defaultmenu,
  Closedmenu,
  iconText,
  iconOverayFn,
  DetachedFn,
  DoubletFn,
} from "@/shared/data/switcherdata/switcherdata";
const HeadDropDown = dynamic(() => import("../../data/header/head"), {
  ssr: false,
});

// FullScreen-end
function Header({
  local_varaiable,
  ThemeChanger,
}: {
  local_varaiable: any;
  ThemeChanger: any;
}) {
  let { basePath } = useRouter();

  //  headerToggleButton
  useEffect(() => {
    function debounce(func: any, delay: any) {
      let timeoutId: string | number | NodeJS.Timeout | any;

      return function (this: any) {
        const context = this;
        const args = arguments;

        clearTimeout(timeoutId);
        timeoutId = setTimeout(function () {
          func.apply(context, args);
        }, delay);
      };
    }

    const handleResize = () => {
      const windowObject = window;
      if (windowObject.innerWidth <= 991) {
        const theme = store.getState();
        ThemeChanger({ ...theme, dataToggled: "close" });
      } else {
        if (localStorage.Spruhaverticalstyles) {
          let verticalStyles = localStorage.getItem("Spruhaverticalstyles");

          switch (verticalStyles) {
            case "default":
              Defaultmenu(ThemeChanger);
              break;
            case "closed":
              Closedmenu(ThemeChanger);
              break;
            case "icontext":
              iconText(ThemeChanger);
              break;
            case "overlay":
              iconOverayFn(ThemeChanger);
              break;
            case "detached":
              DetachedFn(ThemeChanger);
              break;
            case "doublemenu":
              DoubletFn(ThemeChanger);
              break;
          }
        } else {
          const theme = store.getState();
          ThemeChanger({
            ...theme,
            toggled: "",
            // "dataVerticalStyle":"default"
          });
        }
      }
    };

    handleResize(); // Check on component mount
    const debouncedResize = debounce(handleResize, 300);
    window.addEventListener("resize", debouncedResize);
    return () => {
      window.removeEventListener("resize", debouncedResize);
    };
  }, []);

  const headerToggleButton = () => {

    const theme = store.getState();

    let sidemenuType = theme.dataNavLayout;

    if (window.innerWidth >= 992) {
      console.log("Working", sidemenuType, theme.dataVerticalStyle);
      if (sidemenuType === "vertical") {
        let verticalStyle = theme.dataVerticalStyle;
        const navStyle = theme.dataNavStyle;

        switch (verticalStyle) {
          // closed
          case "closed":
            ThemeChanger({ ...theme, dataNavStyle: "" });
            if (theme.dataToggled === "close-menu-close") {
              ThemeChanger({ ...theme, dataToggled: "" });
            } else {
              ThemeChanger({ ...theme, dataToggled: "close-menu-close" });
            }
            break;
          // icon-overlay
          case "overlay":
            ThemeChanger({ ...theme, dataNavStyle: "" });
            if (theme.dataToggled === "icon-overlay-close") {
              ThemeChanger({ ...theme, dataToggled: "" });
            } else {
              if (window.innerWidth >= 992) {
                ThemeChanger({ ...theme, dataToggled: "icon-overlay-close" });
              }
            }
            break;
          // icon-text
          case "icontext":
            ThemeChanger({ ...theme, dataNavStyle: "" });
            if (theme.dataToggled === "icon-text-close") {
              ThemeChanger({ ...theme, dataToggled: "" });
            } else {
              ThemeChanger({ ...theme, dataToggled: "icon-text-close" });
            }
            break;
          // doublemenu
          case "doublemenu":
            ThemeChanger({ ...theme, dataNavStyle: "" });
            if (theme.dataToggled === "double-menu-open") {
              ThemeChanger({ ...theme, dataToggled: "double-menu-close" });
            } else {
              let sidemenu = document.querySelector(".side-menu__item.active");
              if (sidemenu) {
                ThemeChanger({ ...theme, dataToggled: "double-menu-open" });
                if (sidemenu.nextElementSibling) {
                  sidemenu.nextElementSibling.classList.add(
                    "double-menu-active"
                  );
                } else {
                  ThemeChanger({ ...theme, dataToggled: "" });
                }
              }
            }

            // doublemenu(ThemeChanger);
            break;
          // detached
          case "detached":
            if (theme.dataToggled === "detached-close") {
              ThemeChanger({ ...theme, dataToggled: "" });
            } else {
              ThemeChanger({ ...theme, dataToggled: "detached-close" });
            }
            break;
          // default
          case "default":
            ThemeChanger({ ...theme, dataToggled: "" });
        }
        switch (navStyle) {
          case "menu-click":
            if (theme.dataToggled === "menu-click-closed") {
              ThemeChanger({ ...theme, dataToggled: "" });
            } else {
              ThemeChanger({ ...theme, dataToggled: "menu-click-closed" });
            }
            break;
          // icon-overlay
          case "menu-hover":
            if (theme.dataToggled === "menu-hover-closed") {
              ThemeChanger({ ...theme, dataToggled: "" });
            } else {
              ThemeChanger({ ...theme, dataToggled: "menu-hover-closed" });
            }
            break;
          case "icon-click":
            if (theme.dataToggled === "icon-click-closed") {
              ThemeChanger({ ...theme, dataToggled: "" });
            } else {
              ThemeChanger({ ...theme, dataToggled: "icon-click-closed" });
            }
            break;
          case "icon-hover":
            if (theme.dataToggled === "icon-hover-closed") {
              ThemeChanger({ ...theme, dataToggled: "" });
            } else {
              ThemeChanger({ ...theme, dataToggled: "icon-hover-closed" });
            }
            break;
        }
      }
    } else {
      const theme = store.getState();
      if (theme.dataToggled === "close") {
        ThemeChanger({ ...theme, dataToggled: "open" });
        setTimeout(() => {
          if (theme.dataToggled == "open") {
            document
              .querySelector("#responsive-overlay")
              ?.classList.add("active");
            document
              .querySelector("#responsive-overlay")
              ?.addEventListener("click", () => {
                document
                  .querySelector("#responsive-overlay")
                  ?.classList?.remove("active");
              });
          }
          window.addEventListener("resize", () => {
            if (window.screen.width >= 992) {
              document
                .querySelector("#responsive-overlay")
                ?.classList.remove("active");
            }
          });
        }, 100);
      } else {
        ThemeChanger({ ...theme, dataToggled: "close" });
      }
    }
  };

  return (
    <Fragment>
      <header className="app-header">
        <Container fluid className="main-header-container">
          <div className="header-content-left">
            <div className="header-element">
              <div className="horizontal-logo">
                <Link
                  className="header-logo"
                  href="/components/dashboard/dashboard/"
                >
                  <img
                    src={`${
                      process.env.NODE_ENV === "production" ? basePath : ""
                    }/assets/images/brand-logos/desktop-white.png`}
                    className="desktop-white"
                    alt="logo"
                  />
                  <img
                    src={`${
                      process.env.NODE_ENV === "production" ? basePath : ""
                    }/assets/images/brand-logos/toggle-white.png`}
                    className="toggle-white"
                    alt="logo"
                  />
                  <img
                    src={`${
                      process.env.NODE_ENV === "production" ? basePath : ""
                    }/assets/images/brand-logos/desktop-logo.png`}
                    className="desktop-logo"
                    alt="logo"
                  />
                  <img
                    src={`${
                      process.env.NODE_ENV === "production" ? basePath : ""
                    }/assets/images/brand-logos/toggle-dark.png`}
                    className="toggle-dark"
                    alt="logo"
                  />
                  <img
                    src={`${
                      process.env.NODE_ENV === "production" ? basePath : ""
                    }/assets/images/brand-logos/toggle-logo.png`}
                    className="toggle-logo"
                    alt="logo"
                  />
                  <img
                    src={`${
                      process.env.NODE_ENV === "production" ? basePath : ""
                    }/assets/images/brand-logos/desktop-dark.png`}
                    className="desktop-dark"
                    alt="logo"
                  />
                </Link>
              </div>
            </div>
            <div className="header-element">
              <a
                aria-label="Hide Sidebar"
                className="sidemenu-toggle header-link animated-arrow hor-toggle horizontal-navtoggle"
                data-bs-toggle="sidebar"
                onClick={() => headerToggleButton()}
              >
                <span></span>
              </a>
            </div>

          </div>
          <div className="header-content-right">
            <div className="d-flex order-lg-2 align-items-center ms-auto">
              <HeadDropDown />
            </div>
          </div>
        </Container>
      </header>
    </Fragment>
  );
}

Header.propTypes = {};

Header.defaultProps = {};
const mapStateToProps = (state: any) => ({
  local_varaiable: state,
});
export default connect(mapStateToProps, { ThemeChanger })(Header);
