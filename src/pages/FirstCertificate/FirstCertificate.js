import React, { useState } from "react";
import "./FirstCertificate.scss";
import SideMenu from "../../components/SideMenu/SideMenu";
import Title from "../../components/Title/Title";
import CwsHelmet from "../../components/Helmet/Helmet";
import SideHeader from "../../components/SideHeader/SideHeader";
import translate from "../../i18n/translate";
import { useContext } from "react";
import { CwsContext } from "../../App";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import Header from "../../components/Header/Header";

function Certificate() {
  const useCwsContext = useContext(CwsContext);
  const [info, setInfo] = useState({
    email: useCwsContext.email,
    phoneNumber: useCwsContext.phoneNumber,
    firstName: useCwsContext.name,
    lastName: useCwsContext.family,
  });

  return (
    <div
      className={`d-flex flex-column ${
        useCwsContext.locale === "fa-ir" ? "flex-md-row-reverse" : "flex-md-row"
      }`}
    >
      <div className="container-fluid h-100vh">
        <Header active="firstCertificate" />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log(info);
          }}
          className="w-100 d-flex flex-column align-items-center mt-5 "
        >
          <div className="timeTableContainer text-center">
            <h1
              className={` my-3 ${
                useCwsContext.locale === "fa-ir" ? "persian" : "english"
              } `}
            >
              {translate("cws_certificate")}
            </h1>
          </div>
          <div className="certificateContainer">
            <div className="mb-2 mb-sm-0 fs-18px">
              {translate("certificate_text1")}
            </div>
            <div className="d-flex flex-column flex-sm-row align-items-center">
              <div>
                <Input
                  autocomplete="on"
                  value={info.email}
                  onChange={(e) => setInfo({ ...info, email: e.target.value })}
                  type="email"
                  className={`input-rounded mw-270px‍‍‍ ${
                    useCwsContext.locale === "fa-ir" ? "persian" : "english"
                  }`}
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder={"email"}
                />
              </div>
              <div className="midInput mx-4">{translate("or")}</div>
              <div>
                <Input
                  pattern="^(09)\d{9}$"
                  title="Phone Number should start with 09... and just be 11 digits and it must be in English"
                  value={info.phoneNumber}
                  onChange={(e) =>
                    setInfo({ ...info, phoneNumber: e.target.value })
                  }
                  type="tel"
                  className={`my-sm-1 input-rounded mw-270px ${
                    useCwsContext.locale === "fa-ir" ? "persian" : "english"
                  }`}
                  id="tel"
                  placeholder={"phone_number"}
                />
              </div>
            </div>
            <div className="text-center my-3 my-sm-0">
              <div className=" fs-18px">{translate("certificate_text2_1")}</div>
              <div className=" fs-18px">{translate("certificate_text2_2")}</div>
              <div className="mt-3 fs-18px">
                {translate("certificate_text3")}
              </div>
            </div>
            <div className="d-flex flex-column flex-sm-row">
              <div>
                <Input
                  minLength={1}
                  maxLength={50}
                  pattern={"/[A-Za-z]/ig"}
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
                  }`}
                  id="First name"
                  placeholder={"first_name"}
                />
              </div>
              <div className="midInput mx-4"></div>
              <div>
                <Input
                  minLength={1}
                  maxLength={50}
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
                  }`}
                  id="Last name"
                  placeholder={"last_name"}
                />
              </div>
            </div>
            <div className="text-center mt-3 mt-sm-0">
              <div className="fs-18px">{translate("certificate_text4_1")}</div>
              <div className="fs-18px">{translate("certificate_text4_2")}</div>
            </div>
            <Button type="submit" btnText={translate("get_certificate")} />
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
export default Certificate;
