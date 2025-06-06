import Seo from "@/shared/layout-components/seo/seo";
import React from "react";

const Loading = () => {
  return (
    <>
      <Seo title="Yüklənir..." />

      <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border" role="status"></div>
      </div>
    </>
  );
};

export default Loading;
