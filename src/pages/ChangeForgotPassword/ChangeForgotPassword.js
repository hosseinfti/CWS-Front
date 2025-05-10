import { resetPassword } from "../../api";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import flash from "../../assets/images/flash.svg";
import logo from "../../assets/images/logo.svg";
import earth from "../../assets/images/illustrations/earth.svg";
import React, { useState, useContext, useEffect } from "react";
import { CwsContext } from "../../App";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { errorMapper } from "../../assets/exceptions/exeptions";
import { Helmet } from "react-helmet";
import CwsHelmet from "../../components/Helmet/Helmet";
import translate from "../../i18n/translate";

function ChangeForgotPassword() {
  const navigate = useNavigate();
  const useCwsContext = useContext(CwsContext);

  const [verifyCode, setVerifyCode] = useState();
  const [newPassword, setNewPassword] = useState();

  function handleChangePassword(res, err) {
    if (!err) {
      // console.log(res.data.data.token);
      localStorage.removeItem("isLogin");
      document.cookie =
        "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      navigate("/sign-in", { replace: true });
    } else {
      err.response && err.response.data && err.response.data.message
        ? toast.error(errorMapper[err.response.data.message].en)
        : toast.error(errorMapper[err.message].en);
    }
  }

  useEffect(() => {
    if (!useCwsContext.email) {
      navigate("/forget-password");
    }
  });

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="vh-100 d-none d-xl-flex align-items-end crop">
        <img src={earth} alt="earth" width={1200} />
      </div>
      <div className="container d-flex flex-column align-items-center align-items-xl-start mw-700px h-100vh justify-content-sm-between">
        <div className="d-flex justify-content-sm-end w-100 my-5 my-sm-0">
          <Link to="/">
            <img className="logo" src={logo} alt="logo" />
          </Link>
        </div>
        <form
          className="form my-0 my-sm-5 mw-460px w-100"
          onSubmit={(e) => {
            e.preventDefault();
            verifyCode && newPassword
              ? resetPassword(
                  {
                    email: useCwsContext.email,
                    code: verifyCode,
                    password: newPassword,
                  },
                  handleChangePassword
                )
              : toast.error(translate("Please_fill_allـinputs"));
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
            {translate("enter_verify_code")}
          </h1>
          <div
            className={`${
              useCwsContext.locale === "fa-ir" ? "persian" : "english"
            }`}
          >
            {/* <small id="emailHelp" className="form-text text-muted fs-5 my-5">
              {translate("enter_verify_code")}
            </small> */}
          </div>
          <div
            className={`form-group mt-4 my-sm-3 ${
              useCwsContext.locale === "fa-ir" ? "persian" : "english"
            }`}
          >
            <label className="text-light my-2" htmlFor="verify">
              {translate("enter_verify_code")}
            </label>
            <Input
              pattern="^[0-9]+$"
              maxLength={6}
              title={"The verify code should contain 6 digits"}
              value={verifyCode}
              onChange={(e) => setVerifyCode(e.target.value)}
              type="text"
              id="verify"
            />
            <label className="text-light my-2" htmlFor="exampleInputEmail1">
              {translate("new_password")}
            </label>
            <Input
              pattern="^(?=.*?[A-Za-z])(?=.*?[0-9]).{8,32}$"
              title="Password must contain at least 1 lowercase alphabetical character, 1 uppercase alphabetical character, 1 special character, 1 numerica character and at least 8 characters long)"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              type="password"
              id="password"
              placeholder="password"
            />
          </div>
          <div
            className={`w-100 form-group ${
              useCwsContext.locale === "fa-ir" ? "persian" : "english"
            }`}
          >
            <Button
              type="submit"
              btnText={translate("reset")}
              className="btn btn-primary col-12 col-sm-4 continue-btn mt-3"
            />
          </div>
        </form>
        <div className="d-none d-sm-inline-block"></div>
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
      <CwsHelmet static_title={"CWS | "} dynamic_title={"change_password"} />
    </div>
  );
}
export default ChangeForgotPassword;
