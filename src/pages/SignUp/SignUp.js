import "./SignUp.scss";
import Input from "../../components/Input/Input";
import { signUp } from "../../api";
import { Link } from "react-router-dom";
import vector from "../../assets/images/Vector.svg";
import flash from "../../assets/images/flash.svg";
import logo from "../../assets/images/logo.svg";
import earth from "../../assets/images/illustrations/earth.svg";
import { useContext, useEffect, useState } from "react";
import { CwsContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../../axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getProfile } from "../../api";
import { errorMapper } from "../../assets/exceptions/exeptions";
import translate from "../../i18n/translate";
import CwsHelmet from "../../components/Helmet/Helmet";

function SignUp() {
  const navigate = useNavigate();
  const useCwsContext = useContext(CwsContext);
  const [repeatPassword, setRepeatPassword] = useState();

  const handleSignUp = (res, err) => {
    if (
      !useCwsContext.name ||
      !useCwsContext.family ||
      !useCwsContext.phoneNumber ||
      !useCwsContext.email
    ) {
      toast.error(translate("please_fill_all_inputs"));
    } else {
      if (!err) {
        navigate("/profile", { replace: true });
        document.cookie = "token=" + res.data.data.token;
      } else {
        toast.error(translate(errorMapper[err.response.data.message].en)) ||
          toast.error(translate(errorMapper[err.message].en));
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
  }, []);

  return (
    <>
      <div className="d-flex justify-content-center align-items-center">
        <div className="vh-100 d-none d-xl-flex align-items-end crop">
          <img src={earth} alt="earth" width={1200} />
        </div>
        <div className="container d-flex flex-column align-items-center align-items-xl-start mw-700px">
          <div className="d-flex justify-content-sm-end w-100">
            <Link to="/CWS-Front/">
              <img className="logo" src={logo} alt="logo" />
            </Link>
          </div>
          <form
            className="form my-0 my-sm-5 mw-460px w-100"
            onSubmit={(e) => {
              e.preventDefault();
              useCwsContext.password === repeatPassword &&
              useCwsContext.name &&
              useCwsContext.family &&
              useCwsContext.phoneNumber &&
              useCwsContext.email
                ? signUp(
                    {
                      lastName: useCwsContext.family,
                      firstName: useCwsContext.name,
                      phoneNumber: useCwsContext.phoneNumber,
                      email: useCwsContext.email,
                      password: useCwsContext.password,
                    },
                    handleSignUp
                  )
                : useCwsContext.password !== repeatPassword
                ? toast.error(translate("passwords_dont_match"))
                : toast.error(translate("please_fill_all_inputs"));
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
              className={`text-light my-3 ${
                useCwsContext.locale === "fa-ir" ? "persian" : "english"
              }`}
            >
              {translate("sign_up_to_cws")}
            </h1>
            <a href={`${baseURL}v1/auth/google`}>
              <div className="input-rounded d-flex justify-content-center align-items-center w-100 m-0 bg-transparent shadow-none google-signin border border-2 bg-input mh-60px text-light my-3">
                <div
                  role="button"
                  className="m-0 google-signin d-flex justify-content-center align-items-center rounded-10px mh-60px"
                >
                  <img src={vector} alt="vector" className="me-2" />
                  <div>{translate("continue_with_google")}</div>
                </div>
              </div>
            </a>
            <div className="d-flex justify-content-center border-gradient my-sm-4"></div>
            <div
              className={`d-flex ${
                useCwsContext.locale === "fa-ir" ? "persian" : "english"
              }`}
            >
              <div
                className={` ${
                  useCwsContext.locale === "fa-ir"
                    ? "persian ms-3"
                    : "english me-3"
                }`}
              >
                <label
                  className={`text-light my-2`}
                  htmlFor="exampleInputEmail1"
                >
                  {translate("first_name")}
                </label>
                <Input
                  minLength={1}
                  maxLength={50}
                  title={"First name length should be between 1 to 50 "}
                  value={useCwsContext.name}
                  onChange={(e) => useCwsContext.setName(e.target.value)}
                  type="text"
                  className="input-rounded"
                  id="First name"
                  placeholder={"first_name"}
                />
              </div>
              <div
                className={` ${
                  useCwsContext.locale === "fa-ir"
                    ? "persian me-3"
                    : "english ms-3"
                }`}
              >
                <label className="text-light my-2" htmlFor="exampleInputEmail1">
                  {translate("last_name")}
                </label>
                <Input
                  minLength={1}
                  maxLength={50}
                  title={"Last name length should be between 1 to 50 "}
                  value={useCwsContext.family}
                  onChange={(e) => useCwsContext.setFamily(e.target.value)}
                  type="text"
                  className="input-rounded"
                  id="Last name"
                  placeholder={"last_name"}
                />
              </div>
            </div>
            <div
              className={`form-group ${
                useCwsContext.locale === "fa-ir" ? "persian" : "english"
              }`}
            >
              <label className="text-light my-2 my-sm-3" htmlFor="tel">
                {translate("phone_number")}
              </label>

              <Input
                pattern="^(09)\d{9}$"
                title="Phone Number should start with 09... and just be 11 digits"
                value={useCwsContext.phoneNumber}
                onChange={(e) => useCwsContext.setPhoneNumber(e.target.value)}
                type="tel"
                className="my-sm-1 input-rounded"
                id="tel"
                placeholder={"phone_number"}
              />
            </div>
            <div
              className={`form-group my-2 my-sm-3 ${
                useCwsContext.locale === "fa-ir" ? "persian" : "english"
              }`}
            >
              <label className="text-light my-2" htmlFor="exampleInputEmail1">
                {translate("email")}
              </label>
              <Input
                autocomplete="on"
                value={useCwsContext.email}
                onChange={(e) => useCwsContext.setEmail(e.target.value)}
                type="email"
                className="input-rounded"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder={"email"}
              />
            </div>
            <div
              className={`form-group ${
                useCwsContext.locale === "fa-ir" ? "persian" : "english"
              }`}
            >
              <label
                className="text-light my-2"
                htmlFor="exampleInputPassword1"
              >
                {translate("password")}
              </label>
              <div className="position-relative d-flex">
                <Input
                  pattern="^(?=.*?[A-Za-z])(?=.*?[0-9]).{8,32}$"
                  title="Password must contain at least 1 lowercase alphabetical character, 1 uppercase alphabetical character, 1 special character, 1 numerica character and at least 8 characters long)"
                  autocomplete="on"
                  value={useCwsContext.password}
                  onChange={(e) => useCwsContext.setPassword(e.target.value)}
                  type="password"
                  className="input-rounded"
                  id="exampleInputPassword1"
                  placeholder={"password"}
                />
              </div>
              <div className="position-relative d-flex mb-3 mb-sm-0 mt-3 mt-sm-4">
                <Input
                  value={repeatPassword}
                  onChange={(e) => {
                    setRepeatPassword(e.target.value);
                  }}
                  type="password"
                  className="input-rounded"
                  placeholder={"repeat_password"}
                />
              </div>
            </div>
            <div
              className={`w-100 ${
                useCwsContext.locale === "fa-ir" ? "persian" : "english"
              } `}
            >
              <button
                type="submit"
                className={`btn btn-primary col-12 col-sm-5 signin-btn my-3 mt-5`}
              >
                {translate("sign_up")}
              </button>
            </div>
            <div
              className={`d-flex flex-wrap ${
                useCwsContext.locale === "fa-ir" ? "persian" : "english"
              }`}
            >
              <div className="text-light ">
                {translate("already_have_an_account")}
              </div>
              <Link to="/sign-in" className="mx-2">
                <div className="text-primary text-nowrap">
                  {translate("sign_in")}
                </div>
              </Link>
            </div>
          </form>
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
      <CwsHelmet static_title={"CWS | "} dynamic_title={"sign_up"} />
    </>
  );
}
export default SignUp;
