import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getCertificate,
  getProfile,
  postCertificate,
  postProfile,
} from "../../api";
import { CwsContext } from "../../App";
import Button from "../../components/Button/Button";
import Extra from "../../components/Extra/Extra";
import Input from "../../components/Input/Input";
import SideMenu from "../../components/SideMenu/SideMenu";
import Title from "../../components/Title/Title";
import { authChecker } from "../../utils/Utils";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./SecondCertificate.scss";
import Loading from "../../components/Loading/Loading";
import CwsHelmet from "../../components/Helmet/Helmet";
import SideHeader from "../../components/SideHeader/SideHeader";
import { errorMapper } from "../../assets/exceptions/exeptions";
import translate from "../../i18n/translate";
import warning from "../../assets/images/warning.svg";

function SecondCertificate() {
  const formData = new FormData();
  const navigate = useNavigate();
  const useCwsContext = useContext(CwsContext);

  const [isLoading, setIsLoading] = useState(false);
  const [isLogIn, setIsLogIn] = useState(false);

  const [info, setInfo] = useState({
    firstName: useCwsContext.name,
    lastName: useCwsContext.family,
  });
  const [certificatePath, setCertificatePath] = useState("");

  const [isCertificateDownloaded, setIsCertificateDownloaded] = useState(true);
  const UseCwsContext = useContext(CwsContext);

  useEffect(() => {
    getCertificate(undefined, (res, err) => {
      if (res && !err) {
        if (
          res.data &&
          res.data.data &&
          res.data.data.certificatePath &&
          res.data.data.certificateFirstname &&
          res.data.data.certificateLastname
        ) {
          setIsCertificateDownloaded(true);
          setInfo({
            firstName: res.data.data.certificateFirstname,
            lastName: res.data.data.certificateLastname,
          });
          setCertificatePath(res.data.data.certificatePath);
        } else {
          setIsCertificateDownloaded(false);
        }
      } else if (!res && err) {
        console.log(err);
      }
    });

    getProfile(null, (res, err) => {
      if (!err && res) {
        UseCwsContext.setName(res.data.data.firstName || "");
        UseCwsContext.setFamily(res.data.data.lastName || "");
        UseCwsContext.setPhoneNumber(res.data.data.phoneNumber || "");
        UseCwsContext.setEmail(res.data.data.email || "");
        setIsLoading(false);
        setIsLogIn(false);
      } else if (err && !res) {
        authChecker(navigate, err.response.status);
        err.response && err.response.data && err.response.data.message
          ? toast.error(translate(errorMapper[err.response.data.message].en))
          : toast.error(translate(errorMapper[err.message].en));
        setIsLoading(false);
        setIsLogIn(false);
      } else {
        setIsLoading(true);
      }
    });
  }, []);

  const handleDownloadCertificate = () => {
    if (certificatePath) {
      downloadBlob();
      setIsCertificateDownloaded(true);
    } else {
      let params = { firstName: info.firstName, lastName: info.lastName };
      postCertificate(params, (res, err) => {
        if (res && !err) {
          setInfo({
            firstName: res.data.data.certificateFirstname,
            lastName: res.data.data.certificateLastname,
          });
          setCertificatePath(res.data.data.certificatePath);
          setIsCertificateDownloaded(true);
          downloadBlob();
          setIsLoading(false);
        } else if (!res && err) {
          setIsLoading(false);
          console.log(err);
        } else {
          setIsLoading(true);
        }
      });
    }
  };

  const downloadBlob = () => {
    window.open(certificatePath);

    // const fileName = `${certificatePath}`;
    // const url = window.URL.createObjectURL(new Blob([certificatePath]));
    // const link = document.createElement(`a`);
    // link.href = url;
    // link.setAttribute(`download`, fileName);
    // document.body.appendChild(link);
    // link.click();
  };

  return (
    <div
      className={`d-flex flex-column ${
        useCwsContext.locale === "fa-ir" ? "flex-md-row-reverse" : "flex-md-row"
      }`}
    >
      {isLoading && <Loading />}
      <div className="d-none d-md-inline-block">
        <SideMenu active="secondCertificate" />
      </div>
      <div className="container-fluid purple-bg-section h-100vh">
        <div className="d-md-none d-inline-block w-100">
          <SideHeader active="secondCertificate" />
        </div>
        <div
          className={`${
            UseCwsContext.locale === "fa-ir" ? "persian" : "english"
          }`}
        >
          <Title translate={translate} />
        </div>
        <Extra
          header={translate("certificate")}
          // description={translate("complete_profile_text")}
        />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleDownloadCertificate();
          }}
          className="w-100 d-flex flex-column align-items-center mt-5 "
        >
          {/* <div className="timeTableContainer text-center">
            <h1
              className={` my-3 ${
                useCwsContext.locale === "fa-ir" ? "persian" : "english"
              } `}
            >
              {translate("cws_certificate")}
            </h1>
          </div> */}
          <div
            className={`${
              certificatePath && !isCertificateDownloaded
                ? "secondCertificateContainer"
                : "secondCertificateContainerDownloaded"
            }`}
          >
            <div className="text-center my-3 my-sm-0">
              {/* <div className=" fs-18px">{translate("certificate_text2_1")}</div> */}
              <div className=" fs-18px">
                {translate(
                  `${
                    info.firstName
                      ? "certificate_text2_2_downloaded"
                      : "certificate_text2_2"
                  }`
                )}
              </div>
              {certificatePath && !isCertificateDownloaded && (
                <div className="mt-3 fs-18px">
                  {translate("certificate_text3")}
                </div>
              )}
            </div>
            <div className="d-flex flex-column flex-sm-row">
              <div>
                <Input
                  disabled={!!isCertificateDownloaded}
                  minLength={1}
                  maxLength={50}
                  // pattern={"/[A-Za-z]/"}
                  title={
                    "First name length should be between 1 to 50 and it must be in English"
                  }
                  value={info.firstName}
                  onChange={(e) =>
                    setInfo({ ...info, firstName: e.target.value })
                  }
                  type="text"
                  className={`input-rounded mw-270px ${
                    useCwsContext.locale === "fa-ir" ? "persian" : "english"
                  } ${isCertificateDownloaded ? "disabled" : ""}`}
                  id="First name"
                  placeholder={"first_name"}
                />
              </div>
              <div className="midInput mx-4"></div>
              <div>
                <Input
                  disabled={!!isCertificateDownloaded}
                  minLength={1}
                  maxLength={50}
                  // pattern={"/[A-Za-z]/"}
                  title={
                    "Last name length should be between 1 to 50 and it must be in English"
                  }
                  value={info.lastName}
                  onChange={(e) =>
                    setInfo({ ...info, lastName: e.target.value })
                  }
                  type="text"
                  className={`input-rounded mw-270px ${
                    useCwsContext.locale === "fa-ir" ? "persian" : "english"
                  } ${isCertificateDownloaded ? "disabled" : ""}`}
                  id="Last name"
                  placeholder={"last_name"}
                />
              </div>
            </div>
            {/* {certificatePath && !isCertificateDownloaded && ( */}
            <div className="text-center mt-3 alert alert-warning" role="alert">
              <div>
                <div className="fs-18px ">
                  {translate("certificate_text4_1")}
                </div>

                <div className="fs-18px">
                  {translate("certificate_text4_2")}
                </div>
              </div>
              <img width="40px" alt="warning" src={warning} />
            </div>
            {/* )} */}
            <Button
              className={`${info.firstName ? "" : "pe-none"}`}
              type="submit"
              btnText={translate("get_certificate")}
            />
          </div>
        </form>
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
      <CwsHelmet static_title={"CWS | "} dynamic_title={"certificate"} />
    </div>
  );
}
export default SecondCertificate;
