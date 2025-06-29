import React, { useEffect, useState, CSSProperties } from "react";
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
import styles from "./tables.module.scss";
import { toast } from "react-toastify";

const AnonymSurveyAnswers = () => {
  const [data, setData] = useState<WarningSurveyResult[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const dates = useSelector((state: any) => state); // Əgər istifadə olunmursa, silinə bilər

  const getList = async () => {
    setLoading(true);
    try {
      const res = await GetSurveyAnonymAnswer();
      if (res?.data?.result) {
        setData(res.data.result);
      } else {
        setError(true);
      }
    } catch (err: any) {
      err.errors
        ? err.errors?.map((error: string) => {
            toast.error(error, { autoClose: 5000 });
          })
        : toast.error(err.message, { autoClose: 5000 });
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getList();
  }, []);

  if (loading) {
    return (
      <div className="chartjs-wrapper-demo custom-align pie-chart">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="chartjs-wrapper-demo custom-align pie-chart">
        Xəta baş verdi
      </div>
    );
  }

  if (!loading && data?.length === 0) {
    return <NotFound />;
  }

  return (
    <div className="table-responsive border border-bottom-0 mt-3">
      <table className="table text-nowrap text-md-nowrap table-hover mg-b-0">
        <thead style={{ background: "red" }}>
          <tr>
            <th style={headerStyle("30%")}>Eyniləşdirmə nömrəsi</th>
            <th style={headerStyle("20%")}>Vaxt</th>
            <th style={headerStyle()}>Şikayətin mətni</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item) => (
            <tr key={item.rowNumber}>
              <td style={{ fontWeight: "bold" }}>
                {item.identificationNumber}
              </td>
              <td>
                {formatDistanceToNow(new Date(item.time), {
                  addSuffix: true,
                  locale: az,
                })}
              </td>
              <td>
                {item.note?.slice(0, 50)}
                {item.note && item.note.length > 50 && (
                  <>
                    ...{" "}
                    <OverlayTrigger
                      trigger="click"
                      placement="top"
                      overlay={
                        <Popover>
                          <Popover.Header
                            as="h3"
                            style={{ background: "red", color: "white" }}
                          >
                            Şikayətin tam mətni
                          </Popover.Header>
                          <Popover.Body>{item.note}</Popover.Body>
                        </Popover>
                      }
                    >
                      <Button className={styles.withoutBg}>
                        <Image width={20} src={AddIcon} alt="Show more" />
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
  );
};

const headerStyle = (width: string = "auto"): CSSProperties => ({
  textTransform: "capitalize",
  background: "red",
  color: "white",
  width,
});

AnonymSurveyAnswers.layout = "Contentlayout";
export default AnonymSurveyAnswers;
