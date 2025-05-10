import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { injectIntl } from "react-intl";

const CwsHelmet = ({ intl, static_title, dynamic_title }) => {
  const dynamic = intl.formatMessage({ id: `${dynamic_title}` });

  return (
    <Helmet>
      <title>
        {static_title} {dynamic}
      </title>
    </Helmet>
  );
};

CwsHelmet.propType = {
  static_title: PropTypes.string,
  dynamic_title: PropTypes.string,
};
CwsHelmet.defaultProps = {
  static_title: "",
  dynamic_title: "",
};

export default injectIntl(CwsHelmet);
