import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import "./Input.scss";

import eye_slash from "../../assets/images/icons/eye-slash.svg";
import eye from "../../assets/images/icons/eye.svg";
import translate from "../../i18n/translate";
import { FormattedMessage, injectIntl } from "react-intl";
import { CwsContext } from "../../App";

const Input = (props) => {
  const useCwsContext = useContext(CwsContext);
  const [visible, setVisible] = useState(false);

  const {
    intl,
    type,
    className,
    id,
    value,
    onChange,
    pattern,
    title,
    min,
    max,
    minLength,
    maxLength,
    disabled,
  } = props;

  const inputType = () => {
    if (type === "password") {
      if (!visible) {
        return "password";
      } else {
        return "text";
      }
    } else {
      return type;
    }
  };

  const placeholder = intl.formatMessage({ id: `${props.placeholder}` });

  return (
    <div className={`position-relative w-100 d-flex`}>
      <input
        min={min}
        max={max}
        minLength={minLength}
        maxLength={maxLength}
        value={value}
        onChange={onChange}
        type={inputType()}
        pattern={pattern}
        title={title}
        className={`form-control input-h input-mw 
      bg-transparent rounded-10px border-input 
      text-light shadow-none ${className}`}
        id={id}
        placeholder={placeholder}
        disabled={!!disabled}
      />
      {type === "password" && (
        <img
          className={`pass-icon ${
            useCwsContext.locale === "fa-ir" ? "pass-icon-fa" : "pass-icon-en"
          }`}
          alt={visible ? "eye" : "eye_slash"}
          src={visible ? eye_slash : eye}
          onClick={() => setVisible(!visible)}
        />
      )}
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  id: PropTypes.any,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  pattern: PropTypes.string,
  title: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
};

Input.defaultProps = {
  type: "text",
  className: "",
  id: "none",
  placeholder: " ",
  pattern: null,
  title: null,
  min: null,
  max: null,
  minLength: null,
  maxLength: null,
};

export default injectIntl(Input);
