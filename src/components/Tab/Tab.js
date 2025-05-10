import React, { useContext } from "react";
import "./Tab.scss";
import PropTypes from "prop-types";
import translate from "../../i18n/translate";
import { CwsContext } from "../../App";

const tab = [
  // { ALL: "All" },
  { ROBOTICS: "Robotics" },
  { ALGORITHMS: "Algorithms and theory" },
  { CRYPTOGRAPHY: "Cryptography and blockchain" },
  { ML: "Machine learning and AI" },
];

const Tab = (props) => {
  const useCwsContext = useContext(CwsContext);

  const {
    className,
    // tabs,
    onclick,
    active,
  } = props;
  return (
    <div
      className={`tabContainer d-flex flex-nowrap overflow-auto ${
        useCwsContext.locale === "fa-ir" ? "persian" : "english"
      }`}
    >
      {tab.map((item, index) => {
        return (
          <button
            key={index}
            type="button"
            className={`btn btn-outline cws-tab text-nowrap ${className} ${
              active === Object.keys(item)[0] ? "active" : ""
            }
            `}
            //  ${Object.keys(item)[0] === "ROBOTICS" ? "expired" : ""} ${
            //   Object.keys(item)[0] === "ALGORITHMS" ? "expired" : ""
            // } ${Object.keys(item)[0] === "CRYPTOGRAPHY" ? "expired" : ""}
            onClick={() => onclick(Object.keys(item))}
          >
            {translate(Object.values(item))}
          </button>
        );
      })}
    </div>
  );
};

Tab.propTypes = {
  className: PropTypes.string,
  tabs: PropTypes.array,
  active: PropTypes.string,
};
Tab.defaltProps = {
  className: "",
  active: "ALGORITHMS",
};

export default Tab;
