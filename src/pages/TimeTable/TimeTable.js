import Tab from "../../components/Tab/Tab";
import "./TimeTable.scss";
import Header from "../../components/Header/Header";
import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import CwsHelmet from "../../components/Helmet/Helmet";
import time_table from "../../data/time_table_en.json";
// import time_table_fa from "../../data/time_table_fa.json";

import { getProfile } from "../../api";
import LoginTable from "./LoginTable";
import { CwsContext } from "../../App";
import Loading from "../../components/Loading/Loading";
import translate from "../../i18n/translate";

function TimeTable() {
  const [category, setCategory] = useState(["ML"]);
  const [filteredCategory, setFilteredCategory] = useState([]);
  const [isLogIn, setIsLogIn] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const useCwsContext = useContext(CwsContext);
  // let time_table;
  // useEffect(() => {
  //   time_table =
  //     useCwsContext.locale === "fa-ir" ? time_table_fa : time_table_en;
  // }, [useCwsContext.locale]);

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

  useEffect(() => {
    getProfile(undefined, (res, err) => {
      if (res && !err) {
        setIsLogIn(true);
        setIsLoading(false);
      } else if (err && !res) {
        setIsLogIn(false);
        setIsLoading(false);
      } else {
        setIsLoading(true);
      }
    });
  }, []);

  return (
    <>
      {isLoading && <Loading />}
      {isLogIn === "" ? (
        ""
      ) : !isLogIn ? (
        <div className="d-flex flex-column">
          <Header active="time-table" />
          <div
            className={`d-flex flex-column ${
              useCwsContext.locale === "fa-ir"
                ? "flex-md-row-reverse"
                : "flex-md-row"
            }`}
          >
            {isLoading && <Loading />}
            {/* <div className="d-none d-lg-inline-block">
            <SideMenu active="lectures" />
          </div> */}
            {/* <div className="container-fluid purple-bg-section h-100vh"> */}
            {/* <div className="d-lg-none d-inline-block w-100">
              <SideHeader />
            </div> */}
            <div className="container">
              <h1
                className={` my-3 ${
                  useCwsContext.locale === "fa-ir" ? "persian" : "english"
                } `}
              >
                {translate("time_table")}
              </h1>
              <Tab
                className="tabs"
                onclick={(e) => setCategory(e)}
                active={category[0]}
              />
              <h1
                className={`my-4 w-100 ${
                  useCwsContext.locale === "fa-ir" ? "persian" : "english"
                }`}
              >
                {category[0] === "ROBOTICS"
                  ? translate("thirdaugust")
                  : category[0] === "ALGORITHMS"
                  ? translate("fourthaugust")
                  : category[0] === "CRYPTOGRAPHY"
                  ? translate("fivthaugust")
                  : translate("sixthaugust")}
              </h1>
              <div className="d-flex flex-column cws-table">
                {filteredCategory.map((item, index) => {
                  return (
                    <div
                      className="cws-tr d-flex flex-column flex-sm-row align-items-sm-center border-bottom py-3 h-100 "
                      key={index}
                    >
                      <div className=" cws-th d-flex flex-direction-column mxw-50px flex1">
                        <div className="text-nowrap">{item.start} -</div>
                        <div className="">{item.end} </div>
                      </div>
                      <div className="cws-td ms-2 ms-sm-5 mxw-150px flex2">
                        <div className="d-flex">
                          {
                            <img
                              className="timeLineAvatar d-none d-sm-inline-block"
                              alt="timeLineAvatar"
                              src={`${process.env.PUBLIC_URL}/images/circle/${item.speaker_img}`}
                            />
                          }
                          <div className="d-flex flex-column justify-content-evenly ms-sm-3 mxh-200px">
                            <div className="my-3 my-sm-0">
                              <span className="publicSpeakerName">
                                {item.name}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="cws-td mt-3 mt-md-0 ms-2 ps-0 ps-sm-4 ms-xl-0 flex6 ">
                        <div className="border-bottom-grey mt-1 mt-sm-2 mt-md-3 fs-5 publicSpeakerSubject">
                          {item.subject}
                        </div>
                        <div className="mxh-200px speakerDes">
                          {item.description}
                        </div>
                        {/* <Button btnText={"Attend"} className="" /> */}
                      </div>
                    </div>
                  );
                })}
                {/* </div> */}
              </div>
            </div>
            <Helmet>
              <title>CWS | Time table</title>
            </Helmet>
          </div>
        </div>
      ) : (
        <LoginTable
          useCwsContext={useCwsContext}
          category={category}
          filteredCategory={filteredCategory}
          isLogIn={isLogIn}
          setFilteredCategory={(e) => setFilteredCategory(e)}
          setCategory={(e) => setCategory(e)}
        />
      )}
    </>
  );
}
export default TimeTable;
