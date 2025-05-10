import Tab from "../../components/Tab/Tab";
import "./TimeTable.scss";
import Button from "../../components/Button/Button";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import time_table from "../../data/time_table_en.json";
import { getProfile } from "../../api";
import Title from "../../components/Title/Title";
import translate from "../../i18n/translate";
import { errorMapper } from "../../assets/exceptions/exeptions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SideMenu from "../../components/SideMenu/SideMenu";
import Loading from "../../components/Loading/Loading";
import SideHeader from "../../components/SideHeader/SideHeader";

function LoginTable(props) {
  const {
    category,
    setCategory,
    filteredCategory,
    isLogIn,
    setFilteredCategory,
    useCwsContext,
  } = props;

  const [isLoading, setIsLoading] = useState(true);
  const [completePercent, setCompletePercent] = useState(0);

  const requiredFields = [
    "firstName",
    "lastName",
    "phoneNumber",
    "age",
    "city",
    "address",
    "employmentStatus",
    "workExperience",
    "universityOfStudy",
    "lastEducationalCertificate",
    "technicalSkills",
    "softwareSkills",
    "languages",
    "experienceAttendingCompetitions",
    "fieldOfStudy",
  ];

  useEffect(() => {
    let list = [];
    const state = category[0];
    if (state === "ALL") {
      list = time_table.results;
    } else {
      list = time_table.results.filter((lecture) =>
        lecture.categories.includes(state)
      );
    }
    setFilteredCategory(list);
  }, [category]);

  //   useEffect(() => {
  //     getProfile(undefined, (res, err) => {
  //       if (res && !err) {
  //         setIsLogIn(true);
  //       } else if (err && !res) {
  //         setIsLogIn(false);
  //       } else {
  //       }
  //     });
  //   }, []);

  useEffect(() => {
    if (!useCwsContext.name || !useCwsContext.email || !completePercent) {
      getProfile(null, (res, err) => {
        if (!err && res) {
          // setProfile({ ...res.data.data });
          useCwsContext.setName(res.data.data.firstName);
          useCwsContext.setFamily(res.data.data.lastName);
          useCwsContext.setEmail(res.data.data.email);
          useCwsContext.setPhoneNumber(res.data.data.phoneNumber);
          let requiredCount = [];
          let keys = Object.keys(res.data.data);
          for (let i = 0; i < keys.length; i++) {
            let index = requiredFields.indexOf(keys[i]);
            if (index > -1) {
              requiredCount.push(requiredFields[index]);
            }
          }

          setCompletePercent((requiredCount.length / 15) * 100);

          setIsLoading(false);
        } else if (err && !res) {
          setIsLoading(false);
          // authChecker(navigate);
          err.response && err.response.data && err.response.data.message
            ? toast.error(translate(errorMapper[err.response.data.message].en))
            : toast.error(translate(errorMapper[err.message].en));
        } else {
          setIsLoading(true);
        }
      });
    }
  }, []);

  return (
    <div
      className={`d-flex flex-column ${
        useCwsContext.locale === "fa-ir" ? "flex-md-row-reverse" : "flex-md-row"
      }`}
    >
      {isLoading && <Loading />}
      <div className="d-none d-lg-inline-block">
        <SideMenu active="lectures" percent={completePercent} />
      </div>
      <div className="container-fluid purple-bg-section h-100vh">
        <div className="d-lg-none d-inline-block w-100">
          <SideHeader active="lectures" percent={completePercent} />
        </div>
        <div
          className={`${
            useCwsContext.locale === "fa-ir" ? "persian" : "english"
          }`}
        >
          <Title translate={translate} />
        </div>
        {/* <div className="container-fluid purple-bg-section h-100vh"> */}
        <div className="w-100 d-flex flex-column align-items-center">
          <div className="timeTableContainer">
            <h1
              className={` my-3 ${
                useCwsContext.locale === "fa-ir" ? "persian" : "english"
              } `}
            >
              {translate("time_table")}
            </h1>
            <Tab
              onclick={(e) => setCategory(e)}
              active={category[0]}
              className="tabs align-self-center my-4"
            />
            <div
              className={`w-100 ${
                useCwsContext.locale === "fa-ir" ? "persian" : "english"
              } `}
            >
              <h1 className={`my-4 border-3 border-bottom `}>
                {category[0] === "ROBOTICS"
                  ? translate("thirdaugust")
                  : category[0] === "ALGORITHMS"
                  ? translate("fourthaugust")
                  : category[0] === "CRYPTOGRAPHY"
                  ? translate("fivthaugust")
                  : translate("sixthaugust")}
              </h1>
            </div>
            {/* <h1 className="my-4">Saturday, 11 Tir</h1> */}
            <div className="d-flex flex-column">
              <div className="d-flex flex-column cws-table">
                {filteredCategory.map((item, index) => {
                  return (
                    <div
                      className="cws-tr d-flex flex-column align-items-center border-bottom py-3 mt-4"
                      key={index}
                    >
                      <div className="align-self-start ">
                        <h1>{item.name}</h1>
                      </div>
                      <div className="cws-th d-flex flex-direction-column align-self-start justify-content-flex-start align-items-center ">
                        <h2 className="text-nowrap">{item.start} -</h2>
                        <h2 className="align-self-sm-end">{item.end} </h2>
                      </div>
                      <div className="align-self-start cws-td  ">
                        <div className="d-flex">
                          <div className="d-flex flex-column justify-content-evenly ">
                            <h3>{item.subject}</h3>
                          </div>
                        </div>
                      </div>
                      <div className=" align-self-start cws-td">
                        (Level: {item.level})
                      </div>
                      <div className=" align-self-start cws-td">
                        Webinar language: {item.language}
                      </div>
                      <img
                        className="timeLinePoster d-inline-block my-4"
                        alt="timeLineAvatar"
                        src={`${process.env.PUBLIC_URL}/images/time_table/poster/${item.poster_img}`}
                      />
                      <div className="login-time-table-des cws-td my-5 ">
                        {item.description}
                      </div>
                      {/* <Button
                        btnText={translate("joinTheOnlineMeeting")}
                        className=""
                        onClick={() => {
                          window.open(item.link, "_blank");
                        }}
                      /> */}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Helmet>
        <title>CWS | Time table</title>
      </Helmet>
      {/* </div> */}
      {/* ) : (
        <LoginTable />
      )} */}
    </div>
  );
}
export default LoginTable;
