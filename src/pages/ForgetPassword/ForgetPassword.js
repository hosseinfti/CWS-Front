import "./ForgetPassword.scss";
import flash from "../../assets/images/flash.svg";
import logo from "../../assets/images/logo.svg";
import Button from "../../components/Button/Button";
import { forgotPassword, getProfile } from "../../api";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CwsContext } from "../../App";
import { ToastContainer, toast } from "react-toastify";
import earth from "../../assets/images/illustrations/earth.svg";
import "react-toastify/dist/ReactToastify.css";
import { errorMapper } from "../../assets/exceptions/exeptions";
import translate from "../../i18n/translate";
import Input from "../../components/Input/Input";
import CwsHelmet from "../../components/Helmet/Helmet";

function ForgetPassword() {
  const useCwsContext = useContext(CwsContext);

  const navigate = useNavigate();

  const handleForgotPassword = (res, err) => {
    if (!err) {
      navigate("/change-forgot-password", { replace: true });
    } else {
      if(err.response?.data?.message && errorMapper?.[err?.response?.data?.message]?.en){
        toast.error(translate(errorMapper[err.response.data.message].en))
      } else if(err?.message && errorMapper?.[err?.message]?.en) {
        toast.error(translate(errorMapper[err.message].en))
      }else {
        toast.error(translate(errorMapper["Unknown error"].en))
      }
    }
  };

  useEffect(() => {
    getProfile(null, (res, err) => {
      if (!err) {
        if (res.data.status === 200) {
          navigate("/profile", { replace: true });
        }
      }
    });
  });

  return (
    <>
      <div className="d-flex justify-content-center align-items-center">
        <div className="vh-100 d-none d-xl-flex align-items-end crop">
          <img src={earth} alt="earth" width={1200} />
        </div>
        <div className="container d-flex flex-column align-items-center align-items-xl-start mw-700px h-100vh justify-content-sm-between">
          <div className="d-flex justify-content-sm-end w-100 my-5 my-sm-0">
            <Link to="/CWS-Front/">
              <img className="logo" src={logo} alt="logo" />
            </Link>
          </div>
          <form
            className="form my-0 my-sm-5 mw-460px w-100"
            onSubmit={(e) => {
              e.preventDefault();
              useCwsContext.email
                ? forgotPassword(
                    { email: useCwsContext.email },
                    handleForgotPassword
                  )
                : toast.error("Please fill all inputs !");
            }}
          >
            <div
              className="d-flex text-light mb-5 mt-4 my-sm-0 cursor-pointer"
              onClick={() => navigate(-1)}
            >
              <img src={flash} alt="flash" className="me-2 w-20px" />
              <span className="text-light">{translate("go_back")}</span>
            </div>
            <h1
              className={`text-light my-3 mb-5 ${
                useCwsContext.locale === "fa-ir" ? "persian" : "english"
              }`}
            >
              {translate("recover_password")}
            </h1>
            <div
              className={`w-100 ${
                useCwsContext.locale === "fa-ir" ? "persian" : "english"
              }`}
            >
              {/* <small
                id="emailHelp"
                className={`form-text text-muted fs-5 my-5`}
              >
                {translate("enter_the_code")}
              </small> */}
              <small id="emailHelp" className="form-text text-muted fs-5 my-5">
                {translate("change_password_text")}.
              </small>
            </div>

            <div
              className={`form-group mt-4 my-sm-3 ${
                useCwsContext.locale === "fa-ir" ? "persian" : "english"
              }`}
            >
              <label className="text-light my-2" htmlFor="exampleInputEmail1">
                {translate("email")}
              </label>
              <Input
                value={useCwsContext.email}
                onChange={(e) => useCwsContext.setEmail(e.target.value)}
                type="email"
                className="form-control mh-60px mw-460px bg-transparent rounded-10px border-input bg-input text-light"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="email"
              />
            </div>
            <div
              className={`form-group ${
                useCwsContext.locale === "fa-ir" ? "persian" : "english"
              } `}
            >
              <Button
                type="submit"
                btnText={translate("continue")}
                className="btn btn-primary col-12 col-sm-4 continue-btn mt-3"
              />
            </div>
          </form>
          <div className="d-none d-sm-inline-block"></div>
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
      <CwsHelmet static_title={"CWS |"} dynamic_title={"Forget password"} />
    </>
  );
}
export default ForgetPassword;
