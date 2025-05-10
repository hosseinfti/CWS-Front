import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../../api";
import { CwsContext } from "../../App";
import Carousel from "../../components/Carousel/Carousel";
import SideMenu from "../../components/SideMenu/SideMenu";
import Title from "../../components/Title/Title";
import Extra from "../../components/Extra/Extra";
import { authChecker } from "../../utils/Utils";
import Loading from "../../components/Loading/Loading";
import { Helmet } from "react-helmet";
import speakers from "../../data/speakers.json";
import SideHeader from "../../components/SideHeader/SideHeader";
import CwsHelmet from "../../components/Helmet/Helmet";

function Lectures() {
  const [isLoading, setIsLoading] = useState(false);
  const UseCwsContext = useContext(CwsContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!UseCwsContext.name && !UseCwsContext.email) {
      getProfile(null, (res, err) => {
        if (!err && res) {
          UseCwsContext.setName(res.data.data.firstName || "");
          UseCwsContext.setFamily(res.data.data.lastName || "");
          UseCwsContext.setPhoneNumber(res.data.data.phoneNumber || "");
          UseCwsContext.setEmail(res.data.data.email || "");
          setIsLoading(false);
        } else if (err && !res) {
          authChecker(navigate);
          setIsLoading(false);
        } else {
          setIsLoading(true);
        }
      });
    }
  });

  return (
    <div className="d-flex flex-column flex-md-row">
      {isLoading && <Loading />}
      <div className="d-none d-md-inline-block">
        <SideMenu active={"lectures"} />
      </div>

      <div className="container-fluid purple-bg-section h-100vh">
        <div className="d-md-none d-inline-block w-100">
          <SideHeader active="lectures" />
        </div>
        <Title />
        {/* <div className="fs-3 ms-4 mt-4">Lectures</div> */}
        <Extra header="Lectures" description="" />
        <div className="mx-4">
          <Carousel list={speakers.results} type="speakers" />
        </div>
      </div>
      <Helmet>
        <title>CWS | Lectures</title>
      </Helmet>
    </div>
  );
}
export default Lectures;
