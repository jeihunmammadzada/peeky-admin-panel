import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { formatDistanceToNow } from "date-fns";
import { az } from "date-fns/locale";
import { WarningSurveyResult } from "@/utils/responseModels";
import Loading from "@/pages/dashboard/loading";
import { GetSurveyAnonymAnswer } from "@/utils/actions";
import NotFound from "@/pages/components/notFound";
import AddIcon from "@/public/assets/images/custom/add-icon.svg";
import { Button, OverlayTrigger, Popover } from "react-bootstrap";
import styles from './tables.module.scss';

const AnonymSurveyAnswers = () => {
  const [data, setData] = useState<WarningSurveyResult[] | null>();
  const [loading, setLoading] = useState<boolean>();
  const [error, setError] = useState<boolean>();
  const dates = useSelector((state: any) => state);

  const getList = async () => {
    setLoading(true);
    await GetSurveyAnonymAnswer()
      .then((res) => {
        setLoading(false);
        if (res) {
          setData(res.data.result);
        } else {
          setError(true);
        }
      })
      .catch((e) => setError(true));
  };

  useEffect(() => {
    if (data == null) {
      getList();
    }
  }, []);

  if(data?.length == 0){
    return <NotFound/>
  }

  return (
    <>
      {loading && (
        <div className="chartjs-wrapper-demo custom-align pie-chart">
          <Loading />
        </div>
      )}

      {error && (
        <div className="chartjs-wrapper-demo custom-align pie-chart">Error</div>
      )}

      {!loading && (
        <div className="table-responsive border border-bottom-0 mt-3">
          <table className="table text-nowrap text-md-nowrap table-hover mg-b-0">
            <thead style={{ background: "red" }}>
              <tr>
                <th
                  style={{
                    textTransform: "capitalize",
                    background: "red",
                    color: "white",
                    width: "30%",
                  }}
                >
                  Eyniləşdirmə nömrəsi
                </th>
                <th
                  style={{
                    textTransform: "capitalize",
                    background: "red",
                    color: "white",
                    width: "20%",
                  }}
                >
                  Vaxt
                </th>
                <th
                  style={{
                    textTransform: "capitalize",
                    background: "red",
                    color: "white",
                  }}
                >
                  Şikayətin mətni
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.map((data) => (
                <tr key={data.rowNumber} data-index={data.rowNumber}>
                  <td style={{ fontWeight: "bold" }}>
                    {data.identificationNumber}
                  </td>
                  <td>
                    {formatDistanceToNow(new Date(data.time), {
                      addSuffix: true,
                      locale: az,
                    })}
                  </td>
                  <td>
                    {data.note?.slice(0, 50)}

                    {data.note && data.note.length > 10 && (
                      <>
                        {" "}
                        ......{" "}
                        <OverlayTrigger
                          trigger="click"
                          placement="top"
                          key={Math.random()}
                          // autoclose='true'
                          overlay={
                            <Popover>
                              <Popover.Header as="h3" style={{background: 'red', color: 'white'}}>
                                {" "}
                               Şikayətin tam mətni
                              </Popover.Header>
                              <Popover.Body>
                                {data.note}
                              </Popover.Body>
                            </Popover>
                          }
                        >
                          <Button className={styles.withoutBg}>
                            <Image
                              width={20}
                              src={AddIcon}
                              alt="Add icon"
                            />
                          </Button>
                        </OverlayTrigger>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

AnonymSurveyAnswers.layout = "Contentlayout";
export default AnonymSurveyAnswers;
