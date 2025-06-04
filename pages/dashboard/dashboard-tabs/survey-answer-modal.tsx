// components/answer-modal.tsx
import { Modal, Row, Col } from "react-bootstrap";
import Image from "next/image";
import { format, parseISO } from "date-fns";
import Loading from "../loading";
import { SurveyAnswerByIdResponse } from "@/utils/responseModels";

interface Props {
  show: boolean;
  onClose: () => void;
  loading: boolean;
  data?: SurveyAnswerByIdResponse;
}

const takeImageURL = (image: string) => {
  const name = image.replaceAll("\\", "/").split("/");
  return name.slice(-2).join("/");
};

const SurveyAnswerModal = ({ show, onClose, loading, data }: Props) => {
  const answerData = data?.surveyAnswersById;

  return (
    <Modal
      centered
      size="lg"
      show={show}
      onHide={onClose}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title as="h6" id="example-modal-sizes-title-lg">
          Anket nəticələri
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          {loading ? (
            <Loading />
          ) : (
            <Col>
              <Row>
                <h4 className="mb-3">İstifadəçi məlumatları</h4>
                <Col xl={4}><p><b>Adı</b>: {answerData?.passanger.name}</p></Col>
                <Col xl={4}><p><b>Soyadı</b>: {answerData?.passanger.surname}</p></Col>
                <Col xl={4}><p><b>Doğum tarixi</b>: {
                  answerData?.passanger.birthday &&
                  format(parseISO(answerData.passanger.birthday), "dd.MM.yyyy")
                }</p></Col>
                <Col xl={4}><p><b>Cinsi</b>: {answerData?.passanger.genderName === "Male" ? "Kişi" : "Qadın"}</p></Col>
                <Col xl={4}><p><b>Əlaqə nömrəsi</b>: {answerData?.passanger.mobileNumber}</p></Col>
                <Col xl={4}><p><b>Avtobusun nömrəsi</b>: {answerData?.plateNumber}</p></Col>
              </Row>

              <hr />

              <Row>
                <h4 className="mt-3 mb-3">İstifadəçinin cavabları</h4>
                {answerData?.surveyQuestionAnswers
                  .sort((a, b) => a.orderNumber - b.orderNumber)
                  .map((row, index) => (
                    <Col md={12} key={index}>
                      <p>
                        <b>{row.orderNumber}.</b> {row.question}{" "}
                        <b>
                          {row.type === 1
                            ? `- ${row.answer}/5`
                            : row.type === 2
                            ? row.answer
                            : null}
                        </b>
                      </p>

                      {row.type === 3 && (
                        <Image
                          loading="lazy"
                          style={{ borderRadius: "10px", width: "50%" }}
                          alt="Image"
                          width={300}
                          height={200}
                          src={`https://api.peeky.az/images/${takeImageURL(
                            row.answer
                          )}`}
                        />
                      )}

                      <div style={{ paddingLeft: "25px" }}>
                        {row.surveySubQuestionAnswer && (
                          <p>
                            {row.surveySubQuestionAnswer.question} - <b>{row.surveySubQuestionAnswer.answer}</b>
                          </p>
                        )}

                        {row?.surveySubQuestionAnswer?.type === 3 && (
                          <Image
                            style={{ borderRadius: "10px", width: "50%" }}
                            alt="Image"
                            width={300}
                            height={200}
                            src={`https://api.peeky.az/images/${takeImageURL(
                              row.surveySubQuestionAnswer.answer
                            )}`}
                          />
                        )}
                      </div>
                      <hr />
                    </Col>
                  ))}
              </Row>
            </Col>
          )}
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default SurveyAnswerModal;