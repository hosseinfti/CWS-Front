import { useContext, useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import "./Header.scss";
import logo from "../../assets/images/logo.svg";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import user_octagon from "../../assets/images/icons/user-octagon.svg";
import { getProfile } from "../../api";
import Loading from "../Loading/Loading";
import translate from "../../i18n/translate";
import { CwsContext } from "../../App";

function Header(props) {
  const useCwsContext = useContext(CwsContext);

  Header.propTypes = {
    active: PropTypes.string,
  };

  Header.defaultProps = {};

  const { active, locale, setLocale } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [isLogIn, setIsLogIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    getProfile(null, (res, err) => {
      if (!err && res) {
        setIsLogIn(true);
        setIsLoading(false);
      } else if (err && !res) {
        setIsLogIn(false);
        setIsLoading(false);
      } else {
        setIsLoading(true);
      }
    });
  }, []);

  return (
    <>
      {isOpen ? (
        <Modal closeModal={() => handleModal()} active={active} />
      ) : isLoading ? (
        <Loading />
      ) : (
        <nav className="cws-header navbar px-auto py-1 navbar-expand-md navbar-dark bg-transparent">
          <div className="container-fluid mh-75px">
            <Link className="navbar-brand me-lg-5" to="/CWS-Front/">
              <img alt="logo" src={logo} className="logo w-80px eventIcon" />
            </Link>
            <div>
              <select
                className="d-md-none multiLangSelect me-2 bg-transparent border-0 text-light outline-0 cursor-pointer"
                onChange={(e) => useCwsContext.setLocale(e.target.value)}
                value={useCwsContext.locale}
              >
                <option className="cursor-pointer text-dark" value={"en-us"}>
                  en
                </option>
                <option className="cursor-pointer text-dark" value={"fa-ir"}>
                  fa
                </option>
              </select>
              <button
                className="navbar-toggler"
                type="button"
                onClick={() => handleModal()}
              >
                <span className="navbar-toggler-icon"></span>
              </button>
            </div>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ms-lg-5 me-auto d-flex flex-wrap justify-content-center align-items-center flex-lg-nowrap ">
                <li className="nav-item mx-lg-2 fs-5 ">
                  <Link
                    className={`nav-link text-nowrap ${
                      active === "home" ? "activeHeader" : ""
                    }`}
                    to="/CWS-Front/"
                  >
                    {translate("home")}
                  </Link>
                </li>
                <li className="nav-item text-nowrap mx-lg-2 fs-5 ">
                  {/* <div className="nav-link "> */}
                  <Link
                    className={`nav-link ${
                      active === "time-table" ? "activeHeader" : ""
                    }`}
                    to="/CWS-Front/time-table"
                  >
                    {translate("time_table")}
                    {/* </div> */}
                  </Link>
                </li>
                <li className="nav-item text-nowrap mx-lg-2 fs-5 ">
                  <Link
                    className={`nav-link ${
                      active === "1st" ? "activeHeader" : ""
                    }`}
                    to="/CWS-Front/1st"
                  >
                    {translate("first_CWS")}
                  </Link>
                </li>
                {/* <li className="nav-item text-nowrap mx-lg-2 fs-5 ">
                  <Link
                    className={`nav-link ${
                      active === "firstCertificate" ? "activeHeader" : ""
                    }`}
                    to="/FirstCertificate"
                  >
                    {translate("first_certificate")}
                  </Link>
                </li> */}
                {/* <li className="nav-item text-nowrap mx-lg-2 fs-5 "> */}
                  {/* <Link
                    className={`nav-link ${
                      active === "certificate" ? "activeHeader" : ""
                    }`}
                    to="/certificate"
                  > */}
                  {/* Inquiry Certificate */}
                  {/* </Link> */}
                {/* </li> */}
              </ul>
              {!isLogIn ? (
                <form className="d-flex me-lg-5">
                  <select
                    className="multiLangSelect me-2 bg-transparent border-0 text-light outline-0 cursor-pointer"
                    onChange={(e) => useCwsContext.setLocale(e.target.value)}
                    value={useCwsContext.locale}
                  >
                    <option
                      className="cursor-pointer text-dark"
                      value={"en-us"}
                    >
                      en
                    </option>
                    <option
                      className="cursor-pointer text-dark"
                      value={"fa-ir"}
                    >
                      fa
                    </option>
                  </select>
                  {/* <Link to="/sign-up">
                    <button
                      className="btn me-sm-2 me-lg-4 w-120px h-45px secondary-button"
                      type="submit"
                    >
                      {translate("sign_up")}
                    </button>
                  </Link> */}
                  <Link to="/sign-in">
                    <button
                      className="btn w-120px h-45px primary-button"
                      type="submit"
                    >
                      {translate("sign_in")}
                    </button>
                  </Link>
                </form>
              ) : (
                <div>
                  <select
                    className="multiLangSelect me-2 bg-transparent border-0 text-light outline-0 cursor-pointer"
                    onChange={(e) => useCwsContext.setLocale(e.target.value)}
                    value={useCwsContext.locale}
                  >
                    <option
                      className="cursor-pointer text-dark"
                      value={"en-us"}
                    >
                      en
                    </option>
                    <option
                      className="cursor-pointer text-dark"
                      value={"fa-ir"}
                    >
                      fa
                    </option>
                  </select>
                  <Link to="/profile">
                    <img alt={"user-octagon"} src={user_octagon} width={32} />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </nav>
      )}
    </>
  );
}
export default Header;
