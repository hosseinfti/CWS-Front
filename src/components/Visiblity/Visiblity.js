import React, { useState } from "react";
import "./Visiblity.scss";
import PropTypes from "prop-types";

const Visiblity = ({ className }) => {
  const visibleon = require("../../assets/images/flash.svg").default;
  const visibleoff = require("../../assets/images/circle.svg").default;

  const [visible, setVisible] = useState(false);

  return (
    <>
      <img
        className={`${className}`}
        src={visible ? visibleon : visibleoff}
        onClick={() => {
          setVisible(!visible);
        }}
        alt={`${visible ? "visivle" : "unvisible"}`}
      />
    </>
  );
};

Visiblity.propTypes = {
  className: PropTypes.string,
};
Visiblity.defaultProp = {
  className: "",
};

export default Visiblity;
