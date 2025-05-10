import { Helmet } from "react-helmet";
import notFoundImage from "../../assets/images/illustrations/NotFound.svg";
import "./NotFound.scss";
import { Link } from "react-router-dom";
import CwsHelmet from "../../components/Helmet/Helmet";

function NotFound() {
  return (
    <div className="notFoundDIV">
      <img className="notFoundIMG" src={notFoundImage} alt="notFound" />
      <Link
        className="returnHomeLink"
        // onClick={() => context.cleanState()}
        to="/"
      >
        <div className="returnHome">Return to Home page </div>
      </Link>
      <div className="notFoundFA">The requested page could not be found! </div>
      <div className="notFoundEN">Error 404 - Page Not Found</div>
      <Helmet>
        <title>CWS | Not found</title>
      </Helmet>
    </div>
  );
}
export default NotFound;
