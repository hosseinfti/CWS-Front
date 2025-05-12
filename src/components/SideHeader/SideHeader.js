import { useContext, useState } from "react";
import SideHeaderModal from "../SideHeaderModal/SideHeaderModal";
import "./SideHeader.scss";
import logo from "../../assets/images/logo.svg";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { CwsContext } from "../../App";

function SideHeader(props) {
  SideHeader.propTypes = {
    active: PropTypes.string,
    percent: PropTypes.number,
  };

  const useCwsContext = useContext(CwsContext);

  SideHeader.defaultProps = {
    percent: 0,
  };

  const { active, percent } = props;

  const [isOpen, setIsOpen] = useState(false);

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {isOpen ? (
        <SideHeaderModal
          closeModal={() => handleModal()}
          active={active}
          percent={percent}
        />
      ) : (
        <nav className="cws-header navbar px-auto py-1 navbar-expand-lg navbar-dark bg-transparent">
          <div className="flex-nowrap container-fluid mh-75px">
            <Link className="navbar-brand me-lg-5" to="/CWS-Front/">
              <img alt="logo" src={logo} className="logo w-80px eventIcon" />
            </Link>
            <div className="d-flex flex-nowrap">
              <select
                className="multiLangSelect me-2 bg-transparent border-0 text-light outline-0 cursor-pointer"
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
              <button
                className="navbar-toggler"
                type="button"
                onClick={() => handleModal()}
              >
                <span className="navbar-toggler-icon"></span>
              </button>
            </div>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <form className="d-flex me-lg-5">
                <Link to="/sign-up">
                  <button
                    className="btn me-sm-2 me-lg-4 w-120px h-45px secondary-button"
                    type="submit"
                  >
                    Sign Up
                  </button>
                </Link>
                <Link to="/sign-in">
                  <button
                    className="btn w-120px h-45px primary-button"
                    type="submit"
                  >
                    Sign In
                  </button>
                </Link>
              </form>
            </div>
          </div>
        </nav>
      )}
    </>
  );
}
export default SideHeader;
