import "../styles/globals.scss";
import "../public/assets/css/icons.css";
import Contentlayout from "../shared/layout-components/layout/content-layout";
import Landingpagelayout from "../shared/layout-components/layout/landingpage-layout";
import Authenticationlayout from "../shared/layout-components/layout/authentication-layout";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

import Loading from "./dashboard/loading";
import "@/utils/chart-config";

const layouts: any = {
  Contentlayout: Contentlayout,
  Landingpagelayout: Landingpagelayout,
  Authenticationlayout: Authenticationlayout,
};

function MyApp({ Component, pageProps }: { Component: any; pageProps: any }) {
  const Layout: any =
    layouts[Component.layout] ||
    ((pageProps: any) => <Component>{pageProps}</Component>);

  const router = useRouter();
  const [loading, setLoading] = useState<boolean>();

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.on("routeChangeStart", handleStart);
      router.events.on("routeChangeComplete", handleComplete);
      router.events.on("routeChangeError", handleComplete);
    };
  }, [router.events]);

  return (
    <>
      <Layout>{loading ? <Loading /> : <Component {...pageProps} />}</Layout>
      <ToastContainer position="top-center" autoClose={2000} />
    </>
  );
}

export default MyApp;
