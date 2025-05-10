import "./Profile.scss";
import Title from "../../components/Title/Title";
import user_octagon from "../../assets/images/icons/user-octagon.svg";
import sad from "../../assets/images/sadFace.svg";
import happy from "../../assets/images/happyFace.svg";

import SideMenu from "../../components/SideMenu/SideMenu";
import { useEffect, useContext, useState } from "react";
import { getProfile } from "../../api";
import { CwsContext } from "../../App";
import { authChecker } from "../../utils/Utils";
import { useNavigate, Link } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import CwsHelmet from "../../components/Helmet/Helmet";
import SideHeader from "../../components/SideHeader/SideHeader";
import Skeleton from "react-loading-skeleton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { errorMapper } from "../../assets/exceptions/exeptions";
import translate from "../../i18n/translate";
import Button from "../../components/Button/Button";
import openingPoster from "../../assets/images/opening.jpg";
import closingPoster from "../../assets/images/closing.jpg";
import PopUp from "../../components/PopUp/PopUp";

function Profile() {
  const navigate = useNavigate();
  const UseCwsContext = useContext(CwsContext);
  const [isLoading, setIsLoading] = useState(false);
  const [completePercent, setCompletePercent] = useState(0);
  const [opening, setOpening] = useState(true);
  const [isCityPopUp, setIsCityPopUp] = useState(false);

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

  const cityComplete = translate("add_city_to_profile");

  useEffect(() => {
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
          setIsLoading(false);
          if (!res.data.data.city) {
            setIsCityPopUp(true);
          }
        } else if (err && !res) {
          authChecker(navigate, err.response.status);
          err.response && err.response.data && err.response.data.message
            ? toast.error(translate(errorMapper[err.response.data.message].en))
            : toast.error(translate(errorMapper[err.message].en));
          setIsLoading(false);
        } else {
          setIsLoading(true);
        }
      });
    }
  }, []);

  const progressStyle = { width: `${Math.floor(completePercent)}%` };

  return (
    <>
      {isCityPopUp && (
        <PopUp
          message={cityComplete}
          setIsOpen={(bool) => {
            setIsCityPopUp(bool);
          }}
        />
      )}
      <div
        className={`d-flex flex-column ${
          UseCwsContext.locale === "fa-ir"
            ? "flex-md-row-reverse"
            : "flex-md-row"
        }`}
      >
        {isLoading && <Loading />}
        <div className="d-none d-md-inline-block">
          <SideMenu percent={completePercent} active={"dashboard"} />
        </div>
        <div className="container-fluid purple-bg-section h-100vh">
          <div className="d-md-none d-inline-block w-100">
            <SideHeader percent={completePercent} active="profile" />
          </div>
          <div
            className={`${
              UseCwsContext.locale === "fa-ir" ? "persian" : "english"
            }`}
          >
            <Title translate={translate} />
          </div>
          <div
            className={`d-flex flex-wrap w-100 ${
              UseCwsContext.locale === "fa-ir" ? "persian" : "english"
            }`}
          >
            <Link
              to="/complete-profile"
              className={`w-50responsive complete-profile d-flex ${
                UseCwsContext.locale === "fa-ir" ? "persian" : "english"
              } `}
            >
              <div className="w-100 d-flex flex-wrap justify-content-between p-4 mx-4 border rounded-15px position-relative overflow-hidden">
                <div
                  className={`${
                    UseCwsContext.locale === "fa-ir"
                      ? "profileProgressFa"
                      : "profileProgressEn"
                  }`}
                  style={progressStyle}
                ></div>
                <div className="d-flex flex-wrap justify-content-center">
                  <div className="d-flex flex-column">
                    <div className="titr fs-4 fw-bold mb-2">
                      {translate("complete_your_profile")}
                    </div>
                  </div>
                  <div className="d-flex flex-column align-items-center mx-3">
                    <img alt={"user-octagon"} src={user_octagon} width={32} />
                    <span>
                      {isLoading ? (
                        <Skeleton />
                      ) : completePercent ? (
                        `${Math.floor(completePercent)}%`
                      ) : (
                        "0%"
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
            <div className="d-flex align-items-center justify-content-center w-50responsive mt-3 mt-lg-0">
              {completePercent && Math.floor(completePercent) !== 100 ? (
                <img src={sad} alt="sad" width={30} />
              ) : completePercent && Math.floor(completePercent) === 100 ? (
                <img src={happy} alt="happy" width={30} />
              ) : (
                <Skeleton count={2} width={700} />
              )}
            </div>
          </div>
          <div className="border-bottom my-4 mx-4"></div>
          <div className="bg-glass rounded-15px mx-4 p-4 ">
            <div
              className={` cwsJustify ${
                UseCwsContext.locale === "fa-ir" ? "persian" : "english"
              }`}
            >
              {translate("profile_text1")}
              <br />
              {translate("profile_text2")}
              <br />
              {translate("profile_text3")}
              <br />
              {translate("profile_text4")}
              <br />
              {translate("profile_text5")}
            </div>
          </div>
          {/* {completePercent === 100 && ( */}
          {/* // <TimeTable /> */}
          <div className="h-100 mx-4 mt-5 d-flex flex-column align-items-center ">
            <div className="w-100 w-sm-50 d-flex flex-column align-items-center ">
              <div className="openCloseDiv">
                <div className="openCloseBtns">
                  <span
                    className={`openCloseSelected ${
                      opening ? "opening" : "closing"
                    }`}
                  />
                  <button
                    onClick={() => setOpening(false)}
                    className="openCloseBtn"
                  >
                    <span className="text-light">
                      {translate("opening_day")}
                    </span>
                  </button>
                  <button
                    onClick={() => setOpening(true)}
                    className="openCloseBtn"
                  >
                    <span className="text-light">
                      {translate("closing_day")}
                    </span>
                  </button>
                </div>
              </div>
              {!opening ? (
                <>
                  <img
                    src={openingPoster}
                    alt="opening"
                    className="openingPoster"
                  />
                  <Button
                    btnText={translate("attend")}
                    className="mb-4 notAllowed"
                    // onClick={() => {
                    //   window.open(
                    //     "https://lahzenegar.com/CWS2022/live",
                    //     "_blank"
                    //   );
                    // }}
                  />
                </>
              ) : (
                <>
                  <img
                    src={closingPoster}
                    alt="closing"
                    className="closingPoster"
                  />
                  <Button
                    btnText={translate("joinTheOnlineMeeting")}
                    className="mb-4"
                    onClick={() => {
                      window.open("https://lahzenegar.com/cws2022/live");
                    }}
                  />
                </>
              )}
            </div>
          </div>
          {/* )} */}
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
        <CwsHelmet static_title={"CWS | "} dynamic_title={"profile_title"} />
      </div>
    </>
  );
}
export default Profile;
