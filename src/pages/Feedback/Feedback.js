import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFeedback, getProfile, postFeedback } from "../../api";
import { CwsContext } from "../../App";
import Button from "../../components/Button/Button";
import Extra from "../../components/Extra/Extra";
import Input from "../../components/Input/Input";
import Question from "../../components/Question/Question";
import SideMenu from "../../components/SideMenu/SideMenu";
import Title from "../../components/Title/Title";
import { authChecker } from "../../utils/Utils";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../../components/Loading/Loading";
import { Helmet } from "react-helmet";
import CwsHelmet from "../../components/Helmet/Helmet";
import SideHeader from "../../components/SideHeader/SideHeader";
import { errorMapper } from "../../assets/exceptions/exeptions";
import translate from "../../i18n/translate";

function Feedback() {
  const [completePercent, setCompletePercent] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const UseCwsContext = useContext(CwsContext);
  const navigate = useNavigate();
  const [question, setQuestion] = useState({
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    comment: "",
  });

  const useCwsContext = useContext(CwsContext);
  const requiredFields = [
    "firstName",
    "lastName",
    "phoneNumber",
    "age",
    "city",
    "address",
    "employmentStatus",
    "workExperience",
    "universityOfStudy",
    "lastEducationalCertificate",
    "technicalSkills",
    "softwareSkills",
    "languages",
    "experienceAttendingCompetitions",
    "fieldOfStudy",
  ];

  function handleFeedback(res, err) {
    if (!err && res) {
      toast.success(translate("feedback_success"));
      setIsLoading(false);
    } else if (err && !res) {
      err.response && err.response.data && err.response.data.message
        ? toast.error(translate(errorMapper[err.response.data.message].en))
        : toast.error(translate(errorMapper[err.message].en));
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }

  useEffect(() => {
    getFeedback(undefined, (res, err) => {
      if (!err && res) {
        setIsLoading(false);
        setQuestion({
          ...res.data.data,
        });
      } else if (err && !res) {
        toast.error(translate(errorMapper[err.response.data.message].en)) ||
          toast.error(translate(errorMapper[err.message].en));
        setIsLoading(false);
      } else {
        setIsLoading(true);
      }
    });
    if (!UseCwsContext.name || !UseCwsContext.email || !completePercent) {
      getProfile(null, (res, err) => {
        if (!err && res) {
          UseCwsContext.setName(res.data.data.firstName || "");
          UseCwsContext.setFamily(res.data.data.lastName || "");
          UseCwsContext.setPhoneNumber(res.data.data.phoneNumber || "");
          UseCwsContext.setEmail(res.data.data.email || "");

          let requiredCount = [];
          let keys = Object.keys(res.data.data);
          for (let i = 0; i < keys.length; i++) {
            let index = requiredFields.indexOf(keys[i]);
            if (index > -1) {
              requiredCount.push(requiredFields[index]);
            }
          }

          setCompletePercent((requiredCount.length / 15) * 100);
        } else {
          authChecker(navigate);
        }
      });
    }
  }, []);

  return (
    <>
      <div
        className={`d-flex flex-column 
        ${
          useCwsContext.locale === "fa-ir"
            ? "flex-md-row-reverse"
            : "flex-md-row"
        }
        `}
      >
        {isLoading && <Loading />}

        <div className="d-none d-md-inline-block">
          <SideMenu active={"feedback"} percent={completePercent} />
        </div>
        <div className={`container-fluid purple-bg-section h-100vh `}>
          <div className="d-md-none d-inline-block w-100">
            <SideHeader active="feedback" percent={completePercent} />
          </div>
          <div
            className={`${
              useCwsContext.locale === "fa-ir" ? "persian" : "english"
            }`}
          >
            <Title />
            <Extra header={translate("feedback")} />
            <Question
              id={"CWS-"}
              value={question["1"]}
              onChange={(e) => setQuestion({ ...question, 1: e.target.value })}
              question={translate("firstQuestion")}
            />
            <Question
              id={"lectures-"}
              value={question["2"]}
              onChange={(e) => setQuestion({ ...question, 2: e.target.value })}
              question={translate("secondQuestion")}
            />
            <Question
              id={"sessions-"}
              value={question["3"]}
              onChange={(e) => setQuestion({ ...question, 3: e.target.value })}
              question={translate("thirdQuestion")}
            />
            <Question
              id={"support-"}
              value={question["4"]}
              onChange={(e) => setQuestion({ ...question, 4: e.target.value })}
              question={translate("fourthQuestion")}
            />
            <Question
              id={"topic-"}
              value={question["5"]}
              onChange={(e) => setQuestion({ ...question, 5: e.target.value })}
              question={translate("fivthQuestion")}
              first={translate("Machine learning and AI")}
              second={translate("Algorithms and theory")}
              third={translate("Robotics")}
              fourth={translate("Cryptography and blockchain")}
              firstValue="ML"
              secondValue="ALGORITHM"
              thirdValue="ROBOTICS"
              fourthValue="CRYPTOGRAPHY"
            />
            <div className="ms-4 mb-4 mt-5 border p-4 w-75 rounded-15px">
              <div className="fs-4 mb-3">
                📮 {translate("feedback_comments")}
              </div>
              <div>{translate("feedback_comments_title")}</div>
              <Input
                minLength={1}
                maxLength={1000}
                value={question["comment"]}
                onChange={(e) =>
                  setQuestion({ ...question, comment: e.target.value })
                }
                className="my-3 border-0 border-bottom rounded-0 mx-4"
              />
            </div>
            <Button
              onClick={(e) => {
                e.preventDefault();

                postFeedback(
                  {
                    1: question["1"],
                    2: question["2"],
                    3: question["3"],
                    4: question["4"],
                    5: question["5"],
                    comment: question.comment ? question.comment : undefined,
                  },
                  handleFeedback
                );
              }}
              className="ms-4 mb-5"
              btnText={translate("submit")}
            />
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <CwsHelmet static_title={"CWS | "} dynamic_title={"Feedback"} />
    </>
  );
}
export default Feedback;
