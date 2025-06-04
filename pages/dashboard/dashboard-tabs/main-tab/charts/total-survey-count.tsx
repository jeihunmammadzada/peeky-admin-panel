import React, { useEffect, useState } from "react";
import Image from "next/image";
import { GetSurveyCount } from "@/utils/actions";
import Loading from "@/pages/dashboard/loading";
import { GetSurveyCountResponseModel } from "@/utils/responseModels";

// images
import increaseIcon from "@/public/assets/images/custom/dashboard-icons/increase.svg";
import decreaseIcon from "@/public/assets/images/custom/dashboard-icons/decrease.svg";

const TotalSurveyCount = () => {
  const [data, setData] = useState<GetSurveyCountResponseModel | null>(null);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await GetSurveyCount();
        if (res?.data) {
          setData(res.data);
        } else {
          setError(true);
        }
      } catch {
        setError(true);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return (
      <div style={{ color: "red", fontWeight: "bold" }}>
        Anket məlumatları yüklənə bilmədi.
      </div>
    );
  }

  if (!data) {
    return <Loading />;
  }

  const { allSurveysCount, difference } = data.result;
  const isNegative = difference < 0;
  const formattedDiff = Math.abs(difference);

  return (
    <div className="total-survey-count">
      <div className="display-1">{allSurveysCount}</div>
      <Image
        width={100}
        src={isNegative ? decreaseIcon : increaseIcon}
        alt={isNegative ? "Azalma" : "Artım"}
      />
      <p className="mt-2">
        Son ay ilə müqayisədə{" "}
        <span className={isNegative ? "text-danger" : "text-success"}>
          {formattedDiff}% {isNegative ? "azalma" : "artım"}
        </span>
      </p>
    </div>
  );
};

export default TotalSurveyCount;