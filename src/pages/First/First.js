import React, { useContext } from "react";
import Carousel from "../../components/Carousel/Carousel";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import "./First.scss";
import magic_circle from "../../assets/images/illustrations/magic-circle.svg";
import CwsHelmet from "../../components/Helmet/Helmet";
import yektanet from "../../assets/images/sponsors/YektanetWhiteLogo.png";
import lahzenegar from "../../assets/images/sponsors/lahzenegar.png";
import javane from "../../assets/images/sponsors/javane.png";
import divar from "../../assets/images/sponsors/divar.png";
import sadad from "../../assets/images/sponsors/sadad.jpg";
import abrarvan from "../../assets/images/sponsors/abrarvan.png";
import finodad from "../../assets/images/sponsors/finodad.png";
import old_team from "../../data/old_team.json";
import old_speakers from "../../data/old_speakers.json";
import circuit_left from "../../assets/images/illustrations/circuit-left.svg";
import circuit_right from "../../assets/images/illustrations/circuit-right.svg";
import translate from "../../i18n/translate";
import { CwsContext } from "../../App";

const homeRef = React.createRef();

function First() {
  const useCwsContext = useContext(CwsContext);
  return (
    <div className="d-flex flex-column">
      <Header active={"1st"} />
      <div ref={homeRef} className="homeContainer container">
        <div className="cws-com-web-series-1 full-h-without-header">
          <div className="position-relative">
            <div className="ovalBlurleft"></div>
            <div className="position-absolute">
              <img
                className="d-none d-md-block magicCircle"
                src={magic_circle}
                alt=""
              />
            </div>
            <div>
              <div className="titr gradient-text title2 text-center">
                <div>{translate("first")}</div>
                <div className="gradient-text mt-1">
                  {translate("computer")}
                </div>
                <div className="gradient-text mt-1">{translate("webinar")}</div>
                <div className="gradient-text mt-1">{translate("series")}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="circleBlurRight"></div>
        <div className="border-gradient"></div>
        <div className="min-h-400px d-flex flex-column align-items-center justify-content-evenly">
          <div className="d-flex justify-content-center">
            <div className="d-inline">
              <h1 className="text-nowrap text-center gradient-text my-5">
                {translate("speakers")}
              </h1>
            </div>
          </div>
          <Carousel list={old_speakers.results} type="old_speakers" />
        </div>
        <div className="border-gradient mt-5"></div>
        <div className="min-h-400px cws-event-container mb-4">
          <h1 className="gradient-text mt-4">{translate("event_title")}</h1>
          <p
            className={`${
              useCwsContext.locale === "fa-ir" ? "persian" : "english"
            }`}
          >
            <div className="circleBlurLeft"></div>
            {translate("event_text")}
          </p>
        </div>
        <div className="border-gradient"></div>
        <div className="cws-event-container d-flex flex-row mb-3">
          <div>
            <img
              src={circuit_left}
              alt="Yektanet Logo"
              className="circuit-img"
            />
          </div>
          <div className="mx-5">
            <h1 className="text-nowrap text-center gradient-text">
              {translate("our_team_title")}
            </h1>
            <div className="text-center">{translate("our_team_text")}</div>
          </div>
          <div>
            <img
              src={circuit_right}
              alt="Yektanet Logo"
              className="circuit-img"
            />
          </div>
        </div>
        <Carousel list={old_team.results} type="old_team" />
        <div className="circleBlurRight"></div>
        <div className="border-gradient mt-100px"></div>
        <div className="min-h-400px d-flex flex-column align-items-center justify-content-evenly">
          <h1 className="gradient-text p-4 p-md-0">
            {translate("sponsors_title")}
          </h1>
          <div className="sponsor d-flex flex-column flex-md-row justify-content-around align-items-center p-4 p-md-0">
            <div className="m-3">
              <a
                href="https://www.yektanet.com/"
                target="_blank"
                rel="noreferrer"
              >
                <img src={yektanet} alt="Yektanet Logo" className="h-100" />
              </a>
            </div>
            <div className="m-3">
              <a href="https://sadad.co.ir/" target="_blank" rel="noreferrer">
                <img src={sadad} alt="Sadad Logo" className="" />
              </a>
            </div>
            <div className="m-3">
              <a href="https://javane.vc/" target="_blank" rel="noreferrer">
                <img src={javane} alt="Javane Logo" className="h-120px" />
              </a>
            </div>
            <div className="m-3">
              <a href="https://divar.ir/" target="_blank" rel="noreferrer">
                <img src={divar} alt="Divar Logo" className="h-120px" />
              </a>
            </div>
            <div className="m-3">
              <a
                href="https://www.arvancloud.com/fa"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={abrarvan}
                  alt="Arvan Cloud Logo"
                  className="h-120px"
                />
              </a>
            </div>
            <div className="m-3">
              <a href="https://finodad.com/" target="_blank" rel="noreferrer">
                <img src={finodad} alt="Finodad Logo" className="h-120px" />
              </a>
            </div>
            <div className="m-3">
              <a
                href="https://lahzenegar.com/"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={lahzenegar}
                  alt="Lahze Negar Logo"
                  className="h-100"
                />
              </a>
            </div>
          </div>
        </div>
        <div className="border-gradient"></div>
      </div>
      <Footer />
      <CwsHelmet static_title={"CWS | "} dynamic_title={"first"} />
    </div>
  );
}
export default First;
