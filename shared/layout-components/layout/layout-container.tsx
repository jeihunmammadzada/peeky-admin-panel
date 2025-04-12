import Footer from "../footer/footer";
import TabToTop from "../tab-to-top/tab-to-top";
import { useRouter } from "next/router";
import Header from "../header/header";
import Sidebar from "../sidebar/sidebar";
import { format, subMonths } from "date-fns";
import { ReactNode, useEffect, useState } from "react";
import { User } from "@/utils/actions";
import store from "@/shared/redux/store";
import { connect } from "react-redux";
import { SetLoggedUser, SetFilterDate } from "@/shared/redux/actions";
import GlobalLoading from "@/pages/components/Loading";

const remove = () => {
  document.querySelector("#right-sidebar-canvas")?.classList.remove("show");
  document.querySelector(".offcanvas-end")?.classList.remove("show");
  document.querySelector("body")!.classList.remove("overflow:hidden");
  document.querySelector("body")!.classList.remove("padding-right:4px");

  if (document.querySelector(".card.search-result") != null) {
    document.querySelector(".card.search-result")?.classList.add("d-none");
  }
  if (document.body.classList.contains("horizontalmenu")) {
    document.querySelectorAll(".nav-sub").forEach((res) => {
      if (res) {
        // res.classList = "nav-sub"
        (res as HTMLElement).style.display = "none";
      }
    });
  }
};

const Container = ({
  children,
  SetLoggedUser,
}: {
  children: ReactNode;
  SetLoggedUser: any;
}) => {
  const router = useRouter();
  const theme = store.getState();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getOneMonthBefore = subMonths(new Date(), 1);

    User()
      .then((d) => {
        SetLoggedUser({
          ...theme,
          user: d.data.user,
          beginDate: format(getOneMonthBefore, "yyyy-MM-dd"),
          endDate: format(new Date(), "yyyy-MM-dd"),
        });
        setLoading(false);
      })
      .catch((_) => {
        router.push("/");
      });
  }, []);

  return loading ? (
    <GlobalLoading />
  ) : (
    <>
      <div className="page">
        <Header />
        <Sidebar />
        <div className="main-content app-content">
          <div className=" container-fluid" onClick={() => remove()}>
            <div className="inner-body">{children}</div>
          </div>
        </div>
        <Footer />
      </div>
      <TabToTop />
      <div id="responsive-overlay"></div>
    </>
  );
};

const mapStateToProps = (state: any) => ({
  local_varaiable: state,
});
export default connect(mapStateToProps, { SetLoggedUser })(Container);
