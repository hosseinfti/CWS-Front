import "./SignIn.scss";
import Input from "../../components/Input/Input";
import vector from "../../assets/images/Vector.svg";
import flash from "../../assets/images/flash.svg";
import logo from "../../assets/images/logo.svg";
import earth from "../../assets/images/illustrations/earth.svg";
import { getProfile, signIn } from "../../api";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { CwsContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../../axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { errorMapper } from "../../assets/exceptions/exeptions";
import translate from "../../i18n/translate";
import CwsHelmet from "../../components/Helmet/Helmet";

function SignIn({ intl }) {
  const navigate = useNavigate();
  const useCwsContext = useContext(CwsContext);

  useEffect(() => {
    getProfile(null, (res, err) => {
      if (!err && res) {
        if (res.data.status === 200) {
          navigate("/CWS-Front/profile", { replace: true });
        }
      } else if (err && !res) {
        if(err.response?.data?.message && errorMapper?.[err?.response?.data?.message]?.en){
          toast.error(translate(errorMapper[err.response.data.message].en))
        } else if(err?.message && errorMapper?.[err?.message]?.en) {
          toast.error(translate(errorMapper[err.message].en))
        }else {
          toast.error(translate(errorMapper["Unknown error"].en))
        }
         
      }
    });
  }, []);

  function handleSignIn(res, err) {
    if (!err && res) {
      navigate("/CWS-Front/profile", { replace: true });
      document.cookie = "token=" + res.data.data.token;
    } else if (err && !res) {
         if(err?.response?.data?.message && errorMapper?.[err?.response?.data?.message]?.en){
          toast.error(translate(errorMapper[err.response.data.message].en))
        } else if(err?.message && errorMapper?.[err?.message]?.en) {
          toast.error(translate(errorMapper[err.message].en))
        }else {
          toast.error(translate(errorMapper["Unknown error"].en))
        }
    } else {
    }
  }

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
              signIn(
                {
                  email: useCwsContext.email,
                  password: useCwsContext.password,
                },
                handleSignIn
              );
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
              {translate("sign_in_to_cws")}
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
              className={`form-group my-sm-3 ${
                useCwsContext.locale === "fa-ir" ? "persian" : "english"
              } `}
            >
              <label className="text-light my-2" htmlFor="exampleInputEmail1">
                {translate("email")}
              </label>
              <Input
                value={useCwsContext.email}
                onChange={(e) => {
                  useCwsContext.setEmail(e.target.value);
                }}
                type="email"
                className="form-control mh-60px mw-460px bg-transparent rounded-10px border-input bg-input"
                id="exampleInputEmail1"
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
              <div className="d-flex position-relative">
                <Input
                  pattern="^(?=.*?[A-Za-z])(?=.*?[0-9]).{8,32}$"
                  title="Password must contain at least 1 lowercase alphabetical character, 1 uppercase alphabetical character, 1 special character, 1 numerica character and at least 8 characters long)"
                  value={useCwsContext.password}
                  onChange={(e) => {
                    useCwsContext.setPassword(e.target.value);
                  }}
                  autocomplete="on"
                  type="password"
                  className="form-control mh-60px mw-460px bg-transparent rounded-10px border-input bg-input"
                  id="exampleInputPassword1"
                  placeholder={"password"}
                />
              </div>
            </div>
            <div
              className={`d-flex flex-sm-row justify-content-between flex-wrap my-sm-3 ${
                useCwsContext.locale === "fa-ir" ? "persian" : "english"
              }`}
            >
              <Link to="/CWS-Front/forget-password">
                <div className="text-primary">
                  {translate("forget_your_password")}
                </div>
              </Link>
            </div>
            <div
              className={`w-100 ${
                useCwsContext.locale === "fa-ir" ? "persian" : "english"
              }`}
            >
              <button
                type="submit"
                className="btn btn-primary col-12 col-sm-5 signin-btn my-3"
              >
                {translate("sign_in")}
              </button>
            </div>
            <div
              className={`d-flex flex-wrap ${
                useCwsContext.locale === "fa-ir" ? "persian" : "english"
              }`}
            >
              {/* <div className="text-light ">
                {translate("dont_have_an_account_yet")}
              </div>
              <Link to="/sign-up" className="mx-2">
                <div className="text-primary text-nowrap">
                  {translate("sign_up")}
                </div>
              </Link> */}
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
      <CwsHelmet static_title={"CWS | "} dynamic_title={"sign_in"} />
    </>
  );
}
export default SignIn;
