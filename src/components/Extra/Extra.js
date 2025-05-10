import React, { useContext } from "react";
import PropTypes from "prop-types";
import translate from "../../i18n/translate";
import { CwsContext } from "../../App";

const Extra = (props) => {
  const useCwsContext = useContext(CwsContext);
  const { header, description } = props;
  return (
    <div
      className={`ms-4 ${
        useCwsContext.locale === "fa-ir" ? "persian" : "english"
      }`}
    >
      <div className="titr fs-3 mt-4">{header}</div>
      <div className="mb-5">{description}</div>
    </div>
  );
};

Extra.propTypes = {
  header: PropTypes.string,
  description: PropTypes.string,
};

Extra.defaultProps = {
  header: translate("wellcome"),
};

export default Extra;
