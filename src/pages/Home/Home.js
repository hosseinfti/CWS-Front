import React, { useContext, useEffect, useState } from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import "./Home.scss";
import Carousel from "../../components/Carousel/Carousel";
import yektanet from "../../assets/images/sponsors/YektanetWhiteLogo.png";
import snapp from "../../assets/images/sponsors/snapp.png";
import lahzenegar from "../../assets/images/sponsors/lahzenegar.png";
import nobitex from "../../assets/images/sponsors/Nobitex-logo-new.png";

import { useNavigate } from "react-router-dom";
import CwsHelmet from "../../components/Helmet/Helmet";

import circuit_left from "../../assets/images/illustrations/circuit-left.svg";
import circuit_right from "../../assets/images/illustrations/circuit-right.svg";
import network_left from "../../assets/images/illustrations/network-left.svg";
import network_right from "../../assets/images/illustrations/network-right.svg";
import team from "../../data/team.json";
import speakers from "../../data/speakers.json";
import translate from "../../i18n/translate";
import { CwsContext } from "../../App";
import { getProfile } from "../../api";
import Skeleton from "react-loading-skeleton";
import Button from "../../components/Button/Button";
import booklet from "../../assets/pdf/booklet.pdf";

const aboutUsRef = React.createRef();
const homeRef = React.createRef();
function Home() {
  const [isLogIn, setIsLogIn] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const useCwsContext = useContext(CwsContext);
  const navigate = useNavigate();
  // timer - start ------------------------
  // Set the date we're counting down to
  // var countDownDate = new Date("Aug 22, 2022 20:30:00").getTime();

  // Update the count down every 1 second
  // var x = setInterval(function () {
  // Get today's date and time
  // var now = new Date().getTime();

  // Find the distance between now and the count down date
  // var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  // var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  // var hours = Math.floor(
  //   (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  // );
  // var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  // var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the element with id="demo"
  // document.getElementById("countdown-day").innerHTML =
  //   days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
  // document.getElementById("countdown-day").innerHTML = days + " days";
  // document.getElementById("countdown-hour").innerHTML = hours + " hours";
  // document.getElementById("countdown-min").innerHTML =
  //   minutes + " minutes";
  // document.getElementById("countdown-sec").innerHTML =
  //   seconds + " seconds";
  // document.getElementById("countdown-day").innerHTML = days;
  // document.getElementById("countdown-hour").innerHTML = hours;
  // document.getElementById("countdown-min").innerHTML = minutes;
  // document.getElementById("countdown-sec").innerHTML = seconds;

  // If the count down is finished, write some text
  //   if (distance < 0) {
  //     clearInterval(x);
  //     document.getElementById("countdown-day").innerHTML = "EXPIRED";
  //   }
  // }, 1000);
  // timer - end --------------------------

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

  const Download = () => {
    // Function will execute on click of button
    // using Java Script method to get PDF file
    fetch(booklet).then((response) => {
      response.blob().then((blob) => {
        // Creating new object of PDF file
        const fileURL = window.URL.createObjectURL(blob);
        // Setting various property values
        let alink = document.createElement("a");
        alink.href = fileURL;
        alink.download = "booklet.pdf";
        alink.click();
      });
    });
  };

  return (
    <div className="d-flex flex-column">
      <Header active={"home"} />
      <div ref={homeRef} className="homeContainer container">
        <div className=" d-flex flex-column justify-content-center align-items-center">
          <div className="cws-com-web-series">
            <div>
              <div className="d-flex flex-row align-items-center">
                <div className="ovalBlurleft"></div>
                <div>
                  <img
                    src={network_left}
                    alt="Yektanet Logo"
                    className="circuit-img d-none d-lg-block"
                  />
                </div>
                <div>
                  <div className="titr title1 text-center">
                    <div>
                      <div>
                        <div className="gradient-text">
                          {translate("computer")}
                        </div>
                      </div>
                    </div>
                    <div className="gradient-text mt-3">
                      {translate("webinar")}
                    </div>
                    <div className="gradient-text mt-3">
                      {translate("series")}
                    </div>
                  </div>
                  {/* <div className="cws-timer text-center">
                    <div className="d-flex flex-column">
                      <span id="countdown-day" className="cws-timer-day">
                        -
                      </span>
                      <span className="countdown-label">
                        {translate("day")}
                      </span>
                    </div>
                    <div className="d-flex flex-column">
                      <span id="countdown-hour" className="cws-timer-hour">
                        -
                      </span>
                      <span className="countdown-label">
                        {translate("hour")}
                      </span>
                    </div>
                    <div className="d-flex flex-column">
                      <span id="countdown-min" className="cws-timer-min">
                        -
                      </span>
                      <span className="countdown-label">
                        {translate("min")}
                      </span>
                    </div>
                    <div className="d-flex flex-column">
                      <span id="countdown-sec" className="cws-timer-sec">
                        -
                      </span>
                      <span className="countdown-label">
                        {translate("sec")}
                      </span>
                    </div>
                  </div> */}
                </div>
                <div>
                  <img
                    src={network_right}
                    alt="Yektanet Logo"
                    className="circuit-img d-none d-lg-block"
                  />
                </div>
              </div>
              <div className="d-flex justify-content-center mt-5 mt-xl-0 mb-2 mb-md-5">
                {/* {!isLogIn && !isLoading ? (
                  <Button
                    btnText={translate("join_today")}
                    className="primary-button w-170px h-60px mt-5 mt-xl-0 mb-2 mb-md-5"
                    onClick={() => {
                      navigate("/sign-up", { replace: true });
                    }}
                  />
                ) : isLogIn && !isLoading ? (
                  ""
                ) : (
                  <Skeleton count={1} width={100} />
                )} */}
              </div>
            </div>
          </div>
        </div>
        <div className="border-gradient">
          <div className="circleBlurRight"></div>
        </div>
        {/* --------------------------------- Page one -------------------------------- */}

        <div
          ref={aboutUsRef}
          className="min-h-400px cws-about-us-container mb-5"
        >
          <h1 className={`gradient-text mt-5‍‍‍‍ `}>
            {translate("about_us_title")}
          </h1>
          <p
            className={`text-justify ${
              useCwsContext.locale === "fa-ir" ? "persian" : "english"
            }  `}
          >
            {translate("about_us_text1")}
          </p>
          <p
            className={`text-justify ${
              useCwsContext.locale === "fa-ir" ? "persian" : "english"
            }  `}
          >
            {translate("about_us_text2")}
          </p>
          <p
            className={`text-justify ${
              useCwsContext.locale === "fa-ir" ? "persian" : "english"
            }  `}
          >
            {translate("about_us_text3")}
          </p>
          <button
            className="primary-button w-170px h-60px"
            onClick={() => Download()}
          >
            {translate("booklet")}
          </button>
        </div>
        <div className="border-gradient"></div>
        <div className="cws-event-container d-flex flex-row mb-3">
          <div>
            <img
              src={circuit_left}
              alt="Yektanet Logo"
              className="circuit-img d-none d-lg-block"
            />
          </div>
          <div className="d-inline">
            <h1 className="text-nowrap text-center gradient-text my-5">
              {translate("lectures_title")}
              <div className="circleBlurLeft"></div>
            </h1>
          </div>
          <div>
            <img
              src={circuit_right}
              alt="Yektanet Logo"
              className="circuit-img d-none d-lg-block"
            />
          </div>
        </div>

        <Carousel list={speakers.results} type="speakers" />
        {/* --------------------------------- Page four -------------------------------- */}
        <div className="border-gradient mb-4 mt-100px"></div>
        <div className="cws-event-container d-flex flex-row mb-3">
          <div>
            <img
              src={circuit_left}
              alt="Yektanet Logo"
              className="circuit-img d-none d-lg-block"
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
              className="circuit-img d-none d-lg-block"
            />
          </div>
        </div>
        <Carousel list={team.results} type="team" />
        <div className="border-gradient mt-100px"></div>
        {/* --------------------------------- Page five -------------------------------- */}
        <div className="min-h-400px d-flex flex-column align-items-center justify-content-evenly">
          <h1 className="gradient-text p-4 p-md-5 ">
            <div className="circleBlurLeft"></div>
            {translate("sponsors_title")}
          </h1>
          <div className="sponsor d-flex flex-column justify-content-around align-items-center p-4 p-md-0">
            <div>
              <a
                className="d-flex justify-content-center"
                href="https://nobitex.ir/"
                target="_blank"
                rel="noreferrer"
              >
                <img src={nobitex} alt="Nobitex Logo" className="h-100" />
              </a>
            </div>
            <div className="d-flex flex-column flex-md-row w-100 justify-content-between align-items-center">
              <div className="m-3 w-100">
                <a
                  className="d-flex justify-content-center"
                  href="https://www.yektanet.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={yektanet} alt="Yektanet Logo" className="h-100" />
                </a>
              </div>
              <div className="m-3 w-100">
                <a
                  className="d-flex justify-content-center"
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
              <div className="m-3 w-100">
                <a
                  className="d-flex justify-content-center"
                  href="https://snapp.ir/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={snapp} alt="Snapp Logo" className="h-100" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="border-gradient"></div>
      </div>
      <Footer ref={{ aboutUsRef, homeRef }} />
      <CwsHelmet static_title={"CWS | "} dynamic_title={"home"} />
    </div>
  );
}
export default Home;
