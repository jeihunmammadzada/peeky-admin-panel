import React, { useEffect, useState } from "react";
import Image from "next/image";
import { GetSurveyCount } from "@/utils/actions";
import Loading from "@/pages/dashboard/loading";
import { GetSurveyCountResponseModel } from "@/utils/responseModels";

// images
import increaseIcon from "@/public/assets/images/custom/dashboard-icons/increase.svg"; // increase icon
import decreaseIcon from "@/public/assets/images/custom/dashboard-icons/decrease.svg"; // decrease icon

const TotalSurveyCount = () => {
  const [data, setData] = useState<GetSurveyCountResponseModel | null>();
  const [error, setError] = useState<boolean>(false);

  const isNegative = (num: number) => {
    return num < 0;
  };

  useEffect(() => {
    setData(null);
    // Fill data of chart
    const fetchData = async () => {
      await GetSurveyCount()
        .then((res) => {
          if (res) {
            setData(res.data);
          } else {
            setError(true);
          }
        })
        .catch((e) => {
          setError(true);
        });
    };

    fetchData();
  }, []);

  if (error) {
    return "Error";
  }

  if (!data) {
    return <Loading />;
  } else {
    return (
      <div className="total-survey-count">
        <div className="display-1">{data.result.allSurveysCount}</div>
        <Image
          width={100}
          src={isNegative(data.result.difference) ? decreaseIcon : increaseIcon}
          alt="Icon"
        />
        <p>
          Son ay ilə müqayisədə{" "}
          <span>
            {data.result.difference.toString().replace("-", "")}%{" "}
            {isNegative(data.result.difference) ? "azalma" : "artım"}
          </span>
        </p>
      </div>
    );
  }
};

export default TotalSurveyCount;
