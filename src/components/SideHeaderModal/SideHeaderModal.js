import React from "react";
import "./SideHeaderModal.scss";
import logo from "../../assets/images/logo.svg";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { baseURL } from "../../axios";
import { logOut } from "../../api";
import logout from "../../assets/images/icons/logout.svg";
import translate from "../../i18n/translate";

const SideHeaderModal = (props) => {
  const { active, percent } = props;
  SideHeaderModal.propTypes = {
    active: PropTypes.string,
    percent: PropTypes.number,
  };
  SideHeaderModal.defaultProps = {
    percent: 0,
  };

  return (
    <div className="cws-modal d-flex flex-column px-auto py-1 position-fixed top-0 start-0">
      <div className="container-fluid mh-75px d-flex justify-content-between align-items-center">
        <Link
          className={`navbar-brand me-lg-5 ${
            active === "home" ? "active" : ""
          }`}
          to="/"
        >
          <img className="w-70px" alt="logo" src={logo} />
        </Link>
        <button
          className="btn d-flex align-items-center bg-transparent text-white close-Modal p-0 h-50"
          type="button"
          aria-label="Close"
          onClick={() => props.closeModal()}
        >
          <span aria-hidden="true" className="me-3">
            ×
          </span>
        </button>
      </div>
      <ul className="navbar-nav align-items-center my-5 py-2">
        <li className="nav-item fs-5 my-2 ">
          <Link
            className={`nav-link ${active === "profile" ? "activeHeader" : ""}`}
            aria-current="page"
            to="/profile"
          >
            {translate("dashboard")}
          </Link>
        </li>
        <li className="nav-item fs-5 my-2">
          <Link
            className={`nav-link ${
              active === "lectures" ? "activeHeader" : ""
            } `}
            to="/time-table"
          >
            {translate("lectures")}
          </Link>
        </li>
        <li
          className={`nav-item fs-5 my-2 ${
            percent && percent === 100 ? "" : "disabled"
          }`}
        >
          <Link
            to={`${percent && percent === 100 ? "/second_certificate" : ""}`}
            className={`nav-link ${
              active === "secondCertificate" ? "activeHeader" : ""
            } ${percent && percent === 100 ? "" : "disabled"}`}
          >
            {translate("certificate")}
          </Link>
        </li>
        <li className="nav-item fs-5 my-2">
          <Link
            className={`nav-link ${
              active === "feedback" ? "activeHeader" : ""
            }`}
            to="/feedback"
          >
            {translate("feedback")}
          </Link>
        </li>
      </ul>
      <div className="d-flex justify-content-center">
        <a href={`${baseURL}v1/auth/logout`}>
          <div
            className="mx-2 mb-3 cursor-pointer"
            onClick={() => {
              logOut(null, (res) => {
                // console.log(res);
              });
              document.cookie =
                "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            }}
          >
            <img src={logout} alt="Logout" />
          </div>
        </a>
      </div>
    </div>
  );
};

export default SideHeaderModal;
