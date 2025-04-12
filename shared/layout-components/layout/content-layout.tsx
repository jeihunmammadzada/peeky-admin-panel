import React, { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Provider } from "react-redux";
import Switcher from "../switcher/switcher";
import Container from "./layout-container";
import store from "@/shared/redux/store";
import { SetLoggedUser } from "@/shared/redux/actions";
import { User } from "@/utils/actions";
import { connect } from "react-redux";


interface AuthenticationLayoutProps {
  children: ReactNode;
  local_varaiable: any;
}

const Contentlayout = ({ children}: AuthenticationLayoutProps) => {
  const [lateLoad, setlateLoad] = useState<boolean>(false);

  const Add = () => {
    document.querySelector("body")?.classList.remove("error-1");
    document.querySelector("body")?.classList.remove("landing-body");
  };

  useEffect(() => {
    Add();
    setlateLoad(true);
  }, []);


  return (
    <>
      <Provider store={store}>
        <div style={{ display: `${lateLoad ? "block" : "none"}` }}>
          <Switcher />
          <Container>{children}</Container>
        </div>
      </Provider>
    </>
  );
};

export default Contentlayout;
