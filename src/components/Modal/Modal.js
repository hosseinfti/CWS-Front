import React, { useEffect, useState } from "react";
import "./Modal.scss";
import logo from "../../assets/images/logo.svg";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import user_octagon from "../../assets/images/icons/user-octagon.svg";
import { getProfile } from "../../api";
import translate from "../../i18n/translate";

const Modal = (props) => {
  const { active } = props;
  Modal.propTypes = {
    active: PropTypes.string,
  };

  const [isLogIn, setIsLogIn] = useState(false);

  useEffect(() => {
    getProfile(null, (res, err) => {
      if (!err && res) {
        setIsLogIn(true);
      } else if (err && !res) {
        setIsLogIn(false);
      } else {
        setIsLogIn(false);
      }
    });
  }, []);

  return (
    <div className="cws-modal d-flex flex-column px-auto py-1 position-fixed top-0 start-0">
      <div className="container-fluid mh-75px d-flex justify-content-between align-items-center">
        <Link className={`navbar-brand me-lg-5 `} to="/">
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
            className={`nav-link ${active === "home" ? "active-header" : ""}`}
            aria-current="page"
            to="/"
          >
            {translate("home")}
          </Link>
        </li>
        <li className="nav-item fs-5 my-2 ">
          <Link
            className={`nav-link ${active === "1st" ? "active-header" : ""}`}
            to="/1st"
          >
            {translate("first_CWS")}
          </Link>
        </li>
        <li className=" nav-link nav-item fs-5 my-2 ">
          <Link
            className={`nav-link ${
              active === "time-table" ? "active-header" : ""
            }`}
            to="/time-table"
          >
            {translate("time_table")}
          </Link>
        </li>
        {/* <li className=" nav-link nav-item fs-5 my-2 ">
          <Link
            className={`nav-link ${
              active === "firstCertificate" ? "active-header" : ""
            }`}
            to="/FirstCertificate"
          >
            {translate("first_certificate")}
          </Link>
        </li> */}
        {/* <li className="nav-item fs-5 my-2 ">
          <Link
            className={`nav-link ${active === "certificate" ? "active-header"  : ""}`}
            to="/certificate"
          >
            Inquiry Certificate
          </Link>
        </li> */}
      </ul>
      <div className="d-flex justify-content-center">
        {!isLogIn ? (
          <>
            <Link to="/sign-in">
              <button className="btn py-0 px-3 text-light " type="">
                {translate("sign_in")}
              </button>
            </Link>
            {/* <Link to="/sign-up">
              <button
                className="btn py-0 px-3 text-light border-start rounded-0"
                type=""
              >
                {translate("sign_up")}
              </button>
            </Link> */}
          </>
        ) : (
          <Link to="/profile">
            <img alt={"user-octagon"} src={user_octagon} width={32} />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Modal;
