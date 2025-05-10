import { postChangePassword } from "../../api";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import flash from "../../assets/images/flash.svg";
import logo from "../../assets/images/logo.svg";
import earth from "../../assets/images/illustrations/earth.svg";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authChecker } from "../../utils/Utils";
import { CwsContext } from "../../App";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CwsHelmet from "../../components/Helmet/Helmet";
import translate from "../../i18n/translate";

function ChangePassword() {
  const useCwsContext = useContext(CwsContext);

  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [repeatPassword, setRepeatPassword] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    authChecker(navigate);
  }, []);

  function handleChangePassword(res) {
    if (res.status === 200) {
      localStorage.removeItem("isLogin");
      document.cookie =
        "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      navigate("/sign-in", { replace: true });
    } else {
      console.log("error");
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="vh-100 d-none d-xl-flex align-items-end crop">
        <img src={earth} alt="earth" width={1200} />
      </div>
      <div className="container d-flex flex-column align-items-center mw-700px h-100vh justify-content-sm-between">
        <div className="d-flex justify-content-sm-end w-100 my-5 my-sm-0">
          <Link to="/">
            <img className="logo" src={logo} alt="logo" />
          </Link>
        </div>
        <form
          className={`form my-0 my-sm-5 mw-460px w-100`}
          onSubmit={(e) => {
            e.preventDefault();
            useCwsContext.password === repeatPassword &&
            useCwsContext.name &&
            useCwsContext.family &&
            useCwsContext.phoneNumber &&
            useCwsContext.email
              ? postChangePassword(
                  { oldPassword, newPassword },
                  handleChangePassword
                )
              : useCwsContext.password !== repeatPassword
              ? toast.error("Passwords don’t match !")
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
            {translate("change_password")}
          </h1>
          {/* <small id="emailHelp" className="form-text text-muted fs-5 my-5">
            {translate("change_password_text")}.
          </small> */}

          <div
            className={`form-group mt-4 my-sm-3 ${
              useCwsContext.locale === "fa-ir" ? "persian" : "english"
            }`}
          >
            <label className="text-light my-2" htmlFor="exampleInputEmail1">
              {translate("old_password")}
            </label>
            <Input
              pattern="^(?=.*?[A-Za-z])(?=.*?[0-9]).{8,32}$"
              title="Password must contain at least 1 lowercase alphabetical character, 1 uppercase alphabetical character, 1 special character, 1 numerica character and at least 8 characters long)"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              type="password"
              id="password"
              placeholder="password"
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
            <Input
              className="mt-3"
              type="password"
              id="password"
              placeholder="repeat_password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
            <Button
              type="submit"
              btnText={translate("continue")}
              className="btn btn-primary col-12 col-sm-4 continue-btn mt-3"
            />
          </div>
          <div className="form-group"></div>
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
export default ChangePassword;
