import React, { useEffect, useState } from "react";
import "./SideMenu.scss";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import dashboard from "../../assets/images/icons/dashboard.svg";
import lectures from "../../assets/images/icons/lectures.svg";
import certificate from "../../assets/images/icons/certificate.svg";
import feedback from "../../assets/images/icons/feedback.svg";
import logout from "../../assets/images/icons/logout.svg";
import change_password from "../../assets/images/icons/change-password.svg";
import { useContext } from "react";
import { CwsContext } from "../../App";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { logOut } from "../../api";
import { baseURL } from "../../axios";
import translate from "../../i18n/translate";

const SideMenu = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const UseCwsContext = useContext(CwsContext);
  const { active, percent } = props;

  useEffect(() => {
    if (UseCwsContext.name && UseCwsContext.email) {
      setIsLoading(false);
    }
  }, [UseCwsContext.name, UseCwsContext.email]);

  SideMenu.propTypes = {
    active: PropTypes.string,
    percent: PropTypes.number,
  };
  SideMenu.defaultProps = {
    active: "",
    percent: 0,
  };

  return (
    <div className="sideMenu h-100vh d-flex flex-column justify-content-between align-items-center">
      <div className="w-265px">
        <div className="d-flex justify-content-center py-5">
          <Link to="/CWS-Front/">
            <img alt="logo" src={logo} className="logo w-80px eventIcon" />
          </Link>
        </div>
        <div className="d-flex flex-column align-items-center">
          <Link to="/profile" className="sidebar-item">
            <div
              className={`${
                active === "dashboard" ? "active" : ""
              } sideMenuItem w-200px h-68px d-flex ${
                UseCwsContext.locale === "fa-ir"
                  ? "persian flex-row-reverse"
                  : "flex-row"
              } justify-content-center align-items-center mb-3`}
            >
              <img src={dashboard} alt={"dashboard"} />
              <div className="w-110px ms-4">{translate("dashboard")}</div>
            </div>
          </Link>
          {/* {percent === 100 ? ( */}
          <Link to="/time-table" className="sidebar-item">
            <div
              className={`${
                active === "lectures" ? "active" : ""
              } sideMenuItem w-200px h-68px d-flex ${
                UseCwsContext.locale === "fa-ir"
                  ? "persian flex-row-reverse"
                  : "flex-row"
              } justify-content-center align-items-center mb-3`}
            >
              <img src={lectures} alt={"lectures"} />
              <div className="w-110px ms-4">{translate("lectures")}</div>
            </div>
          </Link>
          {/* ) : (
            <div
              className={` ${
                active === "lectures" ? "active" : ""
              } sideMenuItem w-200px h-68px d-flex ${
                UseCwsContext.locale === "fa-ir"
                  ? "persian flex-row-reverse"
                  : "flex-row"
              } justify-content-center align-items-center mb-3`}
            >
              <img src={lectures} alt={"lectures"} />
              <div className="w-110px ms-4">{translate("lectures")}</div>
            </div>
          )} */}
          <Link
            to={`${percent && percent === 100 ? "/second_certificate" : ""}`}
            className={`sidebar-item`}
          >
            <div
              className={`${
                active === "secondCertificate" ? "active" : ""
              } sideMenuItem w-200px h-68px d-flex ${
                UseCwsContext.locale === "fa-ir"
                  ? "persian flex-row-reverse"
                  : "flex-row"
              } ${
                percent && percent === 100 ? "" : "disabled"
              } justify-content-center align-items-center mb-3 color-primary`}
            >
              <img src={certificate} alt={"secondCertificate"} />
              <div className="w-110px ms-4">{translate("certificate")}</div>
            </div>
          </Link>
          <Link to="/feedback" className=" sidebar-item">
            <div
              className={`${
                active === "feedback" ? "active" : ""
              } sideMenuItem w-200px h-68px d-flex ${
                UseCwsContext.locale === "fa-ir"
                  ? "persian flex-row-reverse"
                  : "flex-row"
              } justify-content-center align-items-center`}
            >
              <img src={feedback} alt={"feedback"} />
              <div className="w-110px ms-4">{translate("feedback")}</div>
            </div>
          </Link>
        </div>
      </div>
      <div className="d-flex flex-column align-items-center">
        {/* <div>avatar</div> */}
        <div className="mb-1 sidebar-data">
          {isLoading ? (
            <Skeleton count={1} width={100} />
          ) : (
            `${UseCwsContext.name} ${UseCwsContext.family}`
          )}
        </div>
        <div className="mb-3 sidebar-data">
          {isLoading ? <Skeleton count={1} width={170} /> : UseCwsContext.email}
        </div>
        <div className="d-flex justify-content-between">
          <div
            className="mx-2 cursor-pointer"
            onClick={() => {
              navigate("/change-password", { replace: true });
            }}
          >
            <img src={change_password} alt="Change Password" />
          </div>
          <a href={`${baseURL}v1/auth/logout`}>
            <div
              className="mx-2 mb-3 cursor-pointer"
              onClick={() => {
                logOut(null, (res) => {
                  // console.log(res);
                });
                document.cookie =
                  "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                // navigate("/CWS-Front/", { replace: true });
              }}
            >
              <img src={logout} alt="Logout" />
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
