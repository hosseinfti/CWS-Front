import { useNavigate } from "react-router-dom";
import { resetPassword } from "../../api";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import earth from "../../assets/images/illustrations/earth.svg";
import { Helmet } from "react-helmet";
import CwsHelmet from "../../components/Helmet/Helmet";

function ResetPassword() {
  const navigate = useNavigate();
  const flash = require("../../assets/images/flash.svg").default;
  const logo = require("../../assets/images/logo.svg").default;

  function handleResetPassword(res) {
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
      <div className="vh-100 d-flex align-items-end crop">
        <img src={earth} alt="earth" width={1200} />
      </div>
      <div className="container d-flex flex-column align-items-center mw-700px">
        <div className="d-flex justify-content-sm-end w-100 mt-4">
          <img className="logo" src={logo} alt="logo" />
        </div>
        <form className="form my-0 my-sm-5 mw-460px w-100">
          <div className="d-flex text-light mb-5 mt-4 my-sm-0">
            <img src={flash} alt="flash" className="me-2 w-20px" />
            <div className="text-light">Go Back</div>
          </div>
          <h1 className="text-light my-3 mb-5">Reset Password</h1>
          <small id="emailHelp" className="form-text text-muted fs-5 my-5">
            Don’t worry we got you covered, write in your E-mail and we’ll send
            you a recovery link.
          </small>

          <div className="form-group mt-4 my-sm-3">
            <label className="text-light my-2" htmlFor="exampleInputEmail1">
              Old Password
            </label>
            <Input type="password" id="password" placeholder="Password" />
            <label className="text-light my-2" htmlFor="exampleInputEmail1">
              New Password
            </label>
            <Input type="password" id="password" placeholder="Password" />
            <Input
              className="mt-3"
              type="password"
              id="password"
              placeholder="Repeat Password"
            />
          </div>
          <div className="form-group"></div>
          <Button
            btnText="Continue"
            className="btn btn-primary col-12 col-sm-4 continue-btn mt-3"
            onClick={(e) => {
              e.preventDefault();
              resetPassword(undefined, handleResetPassword);
            }}
          />
        </form>
      </div>
      <Helmet>
        <title>CWS | Reset password</title>
      </Helmet>
    </div>
  );
}
export default ResetPassword;
