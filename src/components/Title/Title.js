import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./Title.scss";
import notif from "../../assets/images/notif.svg";
import message from "../../assets/images/message.svg";
import { CwsContext } from "../../App";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import translate from "../../i18n/translate";

const Title = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const useCwsContext = useContext(CwsContext);
  const { h1 } = props;
  const date = new Date();
  function startTime() {
    const today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById("clock1").innerHTML = h + ":" + m + ":" + s;
    document.getElementById("clock2").innerHTML = h + ":" + m + ":" + s;
    setTimeout(startTime, 1000);
  }
  function checkTime(i) {
    if (i < 10) {
      i = "0" + i;
    } // add zero in front of numbers < 10
    return i;
  }
  useEffect(() => {
    startTime();
  });

  useEffect(() => {
    if (useCwsContext.name) {
      setIsLoading(false);
    }
  }, [useCwsContext.name]);

  return (
    <div className="mx-4">
      <div className={` d-flex flex-sm-column justify-content-between my-2‍`}>
        <div>
          <div
            className={`d-flex ${
              useCwsContext.locale === "fa-ir"
                ? "flex-sm-row-reverse"
                : "flex-sm-row"
            }  justify-content-between flex-wrap align-items-center`}
          >
            <div className="d-inline-block d-sm-none text-nowrap fw-bold ">
              {isLoading ? (
                <Skeleton count={1} width={170} />
              ) : (
                <div
                  className={`titr d-flex ${
                    useCwsContext.locale === "fa-ir"
                      ? "flex-row-reverse"
                      : "flex-row"
                  }`}
                >
                  <div>{translate(h1)}</div>
                  <div className="mx-1">{useCwsContext.name}</div>
                  <div>👋</div>
                </div>
              )}
            </div>
            <div className="d-none d-sm-inline-block text-nowrap fw-bold fs-4">
              {isLoading ? (
                <Skeleton count={1} width={170} />
              ) : (
                <div
                  className={`titr d-flex ${
                    useCwsContext.locale === "fa-ir"
                      ? "flex-row-reverse"
                      : "flex-row"
                  }`}
                >
                  <div>{translate(h1)}</div>
                  <div className="mx-1">{useCwsContext.name}</div>
                  <div>👋</div>
                </div>
              )}
            </div>
            {/* <div className="d-none d-sm-flex mt-4 mt-sm-0">
              <img alt="message" src={message} className="w-30px" />
              <img alt="notif" src={notif} className="w-30px ms-3 ms-sm-4" />
            </div> */}
            <div
              className={`d-flex flex-wrap justify-content-start d-sm-none align-items-center my-3`}
            >
              {/* <div id="clock1"></div> */}
              <div>
                <div id="clock1" className="ms-md-2 fw-sm-bold">
                  1:17 PM
                </div>
                <div className="ms-sm-4 fw-sm-bold text-nowrap">
                  {useCwsContext.locale === "en-us" &&
                    date.toLocaleString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                    })}
                  {useCwsContext.locale === "fa-ir" &&
                    date.toLocaleString("fa-IR", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                    })}
                </div>
              </div>
            </div>
            <div
              className={`d-none  d-sm-flex ${
                useCwsContext.locale === "fa-ir"
                  ? "flex-row-reverse"
                  : "flex-row"
              } justify-content-start align-items-center my-3`}
            >
              {/* <div id="clock2"></div> */}
              <select
                className="multiLangSelect d-none d-md-block mx-2 bg-transparent border-0 text-light outline-0 cursor-pointer"
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
              <div className={`d-flex `}>
                <div id="clock2" className="ms-md-2 fs-5 fw-sm-bold">
                  1:17 PM
                </div>
                <div className="ms-4 fs-5 fw-sm-bold text-nowrap">
                  {/* Saturday, 11 Tir */}
                  {useCwsContext.locale === "en-us" &&
                    date.toLocaleString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                    })}
                  {useCwsContext.locale === "fa-ir" &&
                    date.toLocaleString("fa-IR", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="d-flex align-items-baseline d-sm-none mt-4 mt-sm-0">
          <img alt="message" src={message} className="w-30px" />
          <img alt="notif" src={notif} className="w-30px ms-3 ms-sm-4" />
        </div> */}

        <div className="d-none d-sm-inline-block border-bottom mb-4 mt-2"></div>
      </div>
      <div className="d-block d-sm-none border-bottom my-4"></div>
    </div>
  );
};

Title.propTypes = {
  h1: PropTypes.string,
};

Title.defaultProps = {
  h1: "wellcome",
};
export default Title;
