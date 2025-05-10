import React, { useContext } from "react";
import "./PopUp.scss";
import PropTypes from "prop-types";
import translate from "../../i18n/translate";
import { useNavigate } from "react-router-dom";
import { CwsContext } from "../../App";

const PopUp = (props) => {
  const { message, className, isOpen, setIsOpen } = props;
  const navigate = useNavigate();
  const useCwsContext = useContext(CwsContext);

  return (
    <div className={` cwsPopUp ${className} ${isOpen ? "open" : "close"}`}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Modal title</h5>
            {/* <button
              type="button"
              className="open"
              data-dismiss="modal"
              aria-label="open"
            >
              <span aria-hidden="true">&times;</span>
            </button> */}
          </div>
          <div
            className={`modal-body text-dark ${
              useCwsContext.locale === "fa-ir" ? "persian" : "english"
            }`}
          >
            {message}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                navigate("/complete-profile");
              }}
            >
              {translate("complete_profile_title")}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              {translate("close")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

PopUp.propTypes = {
  className: PropTypes.string,
  message: PropTypes.string,
  isOpen: PropTypes.bool,
};
PopUp.defaltProps = {
  className: "",
  message: "",
  isOpen: true,
};

export default PopUp;
