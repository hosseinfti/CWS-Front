import React from "react";
import "./Footer.scss";
import { Link } from "react-router-dom";
import linkedin from "../../assets/images/linkedin.svg";
import telegram from "../../assets/images/telegram.svg";
import logo from "../../assets/images/logo.svg";
import instagram from "../../assets/images/instagram.svg";
import twitter from "../../assets/images/twitter.svg";
import translate from "../../i18n/translate";

const Footer = React.forwardRef((props, ref) => {
  return (
    <>
      <div className="container-fluid footer w-100 d-flex flex-column justify-content-between align-items-center my-5">
        <Link className="footer-icon d-sm-none mb-4" to="/CWS-Front/">
          <img className="w-70px" src={logo} alt={"logo"} />
        </Link>
        <div className="d-flex justify-content-between align-items-center my-3">
          <a
            className="footer-icon mx-4 mx-sm-4"
            href="https://www.linkedin.com/company/computer-webinar-series/"
            target="_blank"
            rel="noreferrer"
          >
            <img src={linkedin} alt={"linkedin"} />
          </a>
          <a
            className="footer-icon mx-4 mx-sm-4"
            href="https://t.me/cws_aut"
            target="_blank"
            rel="noreferrer"
          >
            <img src={telegram} alt={"telegram"} />
          </a>
          <Link
            className="footer-icon mx-4 mx-sm-4 d-none d-sm-inline-block"
            to="/CWS-Front/"
          >
            <img className="w-80px" src={logo} alt={"logo"} />
          </Link>
          <a
            className="footer-icon mx-4 mx-sm-4"
            href="https://www.instagram.com/cws_aut/"
            target="_blank"
            rel="noreferrer"
          >
            <img src={instagram} alt={"instagram"} />
          </a>
          <a
            className="footer-icon mx-4 mx-sm-4"
            href="https://twitter.com/CWS_AUT"
            target="_blank"
            rel="noreferrer"
          >
            <img src={twitter} alt={"twitter"} />
          </a>
        </div>
        <div className="d-flex justify-content-between">
          <Link
            to="/CWS-Front/"
            className="mx-3 mx-sm-4 mt-4 text-decoration-none text-light"
            onClick={() => {
              ref.homeRef.current.scrollIntoView();
            }}
          >
            {translate("home")}
          </Link>
          <Link
            onClick={() => {
              ref.aboutUsRef.current.scrollIntoView();
            }}
            to="/CWS-Front/"
            className="mx-3 mx-sm-4 mt-4 text-decoration-none text-light text-nowrap"
          >
            {translate("about_us")}
          </Link>
          <Link
            to="/CWS-Front/time-table"
            className="mx-3 mx-sm-4 mt-4 text-decoration-none text-light"
          >
            {/* <div className="disabled mx-3 mx-sm-4 mt-4 text-decoration-none text-light"> */}
            {translate("lectures")}
            {/* </div> */}
          </Link>
        </div>
      </div>
    </>
  );
});
export default Footer;
