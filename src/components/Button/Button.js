import React from "react";
import PropTypes from "prop-types";
import "./Button.scss";

const Button = ({ type, className, btnText, onClick }) => {
  return (
    <button
      type={type}
      className={`btn btn-primary col-12 col-sm-4 submit-btn mt-3 ${className}`}
      onClick={onClick}
    >
      {btnText}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  btnText: PropTypes.string,
};

Button.defaultProps = {
  className: "",
  type: "button",
  btnText: "Submit",
};

export default Button;
