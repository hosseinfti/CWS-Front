import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile, postProfile } from "../../api";
import { CwsContext } from "../../App";
import Button from "../../components/Button/Button";
import Extra from "../../components/Extra/Extra";
import Input from "../../components/Input/Input";
import SideMenu from "../../components/SideMenu/SideMenu";
import Title from "../../components/Title/Title";
import { authChecker } from "../../utils/Utils";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./CompleteProfile.scss";
import Loading from "../../components/Loading/Loading";
import CwsHelmet from "../../components/Helmet/Helmet";
import SideHeader from "../../components/SideHeader/SideHeader";
import { errorMapper } from "../../assets/exceptions/exeptions";
import translate from "../../i18n/translate";
import { baseURL, postUpload } from "../../axios";

function CompleteProfile() {
  const formData = new FormData();
  const navigate = useNavigate();
  const useCwsContext = useContext(CwsContext);

  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState({
    age: "",
    phoneNumber: "",
    city: "",
    address: "",
    employmentStatus: "Select the value",
    workExperience: "",
    universityOfStudy: "",
    lastEducationalCertificate: "Select the value",
    technicalSkills: "",
    softwareSkills: "",
    languages: "",
    experienceAttendingCompetitions: "",
    resume: "",
  });

  const [upload, setUpload] = useState();

  function handlecompleteProfile(res, err) {
    if (!err && res) {
      toast.success(translate("your_information_submitted_successfully"));
      setTimeout(() => {
        navigate("/profile", { replace: true });
      }, 2000);
    } else if (err && !res) {
      err.response && err.response.data && err.response.data.message
        ? toast.error(translate(errorMapper[err.response.data.message].en))
        : toast.error(translate(errorMapper[err.message].en));
      authChecker(navigate);
    } else {
    }
  }

  const onChangeResume = (e) => {
    console.log(e.target.files[0].name);
    setProfile({
      ...profile,
      resume: `temp/temp/${e.target.files[0].name}`,
    });
    setUpload(e.target.files[0]);
  };

  const onUpload = () => {
    formData.append("resume", upload);
    postUpload(formData, (res, err) => {
      if (!err && res) {
        toast.success(translate("your_resume_uploaded_successfully"));
        setProfile({
          ...profile,
          resume: res.data,
        });
      } else if (err && !res) {
        err.response && err.response.data && err.response.data.message
          ? toast.error(translate(errorMapper[err.response.data.message].en))
          : toast.error(translate(errorMapper[err.message].en));
      }
    });
  };

  useEffect(() => {
    getProfile(null, (res, err) => {
      if (!err && res) {
        setProfile({ ...res.data.data });
        useCwsContext.setName(res.data.data.firstName);
        useCwsContext.setFamily(res.data.data.lastName);
        useCwsContext.setEmail(res.data.data.email);
        useCwsContext.setPhoneNumber(res.data.data.phoneNumber);

        setIsLoading(false);
      } else if (err && !res) {
        setIsLoading(false);
        authChecker(navigate);
        err.response && err.response.data && err.response.data.message
          ? toast.error(translate(errorMapper[err.response.data.message].en))
          : toast.error(translate(errorMapper[err.message].en));
      } else {
        setIsLoading(true);
      }
    });
  }, []);

  return (
    <div
      className={`d-flex flex-column ${
        useCwsContext.locale === "fa-ir" ? "flex-md-row-reverse" : "flex-md-row"
      }`}
    >
      {isLoading && <Loading />}
      <div className="d-none d-md-inline-block">
        <SideMenu />
      </div>
      <div className="container-fluid purple-bg-section h-100vh">
        <div className="d-md-none d-inline-block w-100">
          <SideHeader />
        </div>
        <Title />
        <Extra
          header={translate("complete_profile_title")}
          description={translate("complete_profile_text")}
        />
        <form
          className={`${
            useCwsContext.locale === "fa-ir" ? "persian" : "english"
          }`}
          onSubmit={(e) => {
            e.preventDefault();
            // profile.phoneNumber
            // ?
            postProfile(
              {
                firstName: profile.firstName,
                lastName: profile.lastName,
                age: profile?.age || undefined,
                phoneNumber: profile.phoneNumber,
                city: profile?.city || undefined,
                address: profile?.address || undefined,
                employmentStatus: profile?.employmentStatus || undefined,
                workExperience: profile?.workExperience || undefined,
                universityOfStudy: profile?.universityOfStudy || undefined,
                lastEducationalCertificate:
                  profile?.lastEducationalCertificate || undefined,
                technicalSkills: profile?.technicalSkills || undefined,
                softwareSkills: profile?.softwareSkills || undefined,
                languages: profile?.languages || undefined,
                experienceAttendingCompetitions:
                  profile?.experienceAttendingCompetitions || undefined,
                fieldOfStudy: profile?.fieldOfStudy,
                resume: profile?.resume || undefined,
                fieldOfInterests: profile?.fieldOfInterests,
                github: profile?.github || undefined,
                linkedin: profile?.linkedin || undefined,
              },
              handlecompleteProfile
            );
            // : toast.error(translate("the_phoneNumber_is_required"));
          }}
        >
          <div className="ms-4">
            <label htmlFor="firstName">{translate("first_name")}</label>
            <Input
              min={1}
              max={50}
              value={profile.firstName}
              onChange={(e) => {
                setProfile({
                  ...profile,
                  firstName: e.target.value,
                });
              }}
              id={"firstName"}
              type="text"
              className="w-25 mt-2"
            />
            <label htmlFor="lastName" className="mt-3 mt-sm-4 mb-2">
              {translate("last_name")}
            </label>
            <Input
              min={1}
              max={50}
              value={profile.lastName}
              onChange={(e) => {
                setProfile({
                  ...profile,
                  lastName: e.target.value,
                });
              }}
              id={"lastName"}
              type="text"
              className="w-25 mt-2"
            />
            <label htmlFor="age" className="mt-3 mt-sm-4 mb-2">
              {translate("age")}
            </label>
            <Input
              min={1}
              max={150}
              value={profile.age}
              onChange={(e) => {
                setProfile({
                  ...profile,
                  age: e.target.value,
                });
              }}
              id={"age"}
              type="number"
              className="w-25 mt-2"
            />
            <label className="text-light mt-3 mt-sm-4 mb-2" htmlFor="tel">
              {translate("phone_number")}
            </label>
            <Input
              pattern="^(09)\d{9}$"
              title="Phone Number should start with 09... and just be 11 digits"
              value={profile.phoneNumber}
              onChange={(e) =>
                setProfile({ ...profile, phoneNumber: e.target.value })
              }
              type="tel"
              className="mb-sm-2 input-rounded"
              id="tel"
            />
            <label className="mt-4" htmlFor="city">
              {translate("city")}
            </label>
            <Input
              minLength={1}
              maxLength={50}
              value={profile.city}
              onChange={(e) => {
                setProfile({
                  ...profile,
                  city: e.target.value,
                });
              }}
              id={"city"}
              type="text"
              className="w-100 w-sm-50 mt-2"
            />
            <label className="mt-4" htmlFor="address">
              {translate("address")}
            </label>
            <Input
              minLength={1}
              maxLength={1000}
              value={profile.address}
              onChange={(e) => {
                setProfile({
                  ...profile,
                  address: e.target.value,
                });
              }}
              id={"address"}
              type="text"
              className="w-100 w-sm-50 mt-2"
            />
            <div>
              <label className="mt-4">{translate("employment_status")}</label>
            </div>
            <div className="cws-select mt-2">
              <select
                className="bg-transparent text-light"
                value={profile.employmentStatus}
                onChange={(e) => {
                  setProfile({ ...profile, employmentStatus: e.target.value });
                }}
              >
                <option disabled value={"Select the value"}>
                  {translate("select_the_value")}
                </option>
                <option value={"Full time"}>{translate("full_time")}</option>
                <option value={"Part time"}>{translate("part_time")}</option>
                <option value={"Unemployed"}>{translate("unemployed")}</option>
                <option value={"Student"}>{translate("student")}</option>
                <option value={"Other"}>{translate("other")}</option>
              </select>
            </div>
            <label className="mt-4" htmlFor="work-experience">
              {translate("work_experience")}
            </label>
            <textarea
              minLength={1}
              maxLength={1000}
              value={profile.workExperience}
              onChange={(e) => {
                setProfile({
                  ...profile,
                  workExperience: e.target.value,
                });
              }}
              className="text-light form-control bg-transparent rounded-15px w-100 w-sm-50 mt-2 input-mw border-input"
              id="work-experience"
              rows="5"
            ></textarea>
            <label className="mt-4" htmlFor="university-of-study">
              {translate("university_of_study")}
            </label>
            <Input
              minLength={1}
              maxLength={1000}
              value={profile.universityOfStudy}
              onChange={(e) => {
                setProfile({
                  ...profile,
                  universityOfStudy: e.target.value,
                });
              }}
              id={"university-of-study"}
              type="text"
              className="w-100 w-sm-25 mt-2"
            />
            <label className="mt-4" htmlFor="fieldOfStudy">
              {translate("field_of_study")}
            </label>
            <Input
              minLength={1}
              maxLength={1000}
              value={profile.fieldOfStudy}
              onChange={(e) => {
                setProfile({
                  ...profile,
                  fieldOfStudy: e.target.value,
                });
              }}
              id={"fieldOfStudy"}
              type="text"
              className="w-100 w-sm-25 mt-2"
            />
            <label className="mt-4" htmlFor="last-educational-certificate">
              {translate("last_educational_certificate")}
            </label>
            <div className="cws-select mt-2">
              <select
                className="bg-transparent text-light"
                value={profile.lastEducationalCertificate}
                onChange={(e) => {
                  setProfile({
                    ...profile,
                    lastEducationalCertificate: e.target.value,
                  });
                }}
              >
                <option disabled value={"Select the value"}>
                  {translate("select_the_value")}
                </option>
                <option value={"High school"}>
                  {translate("high_school")}
                </option>
                <option value={"Some college"}>
                  {translate("some_college")}
                </option>
                <option value={"College degree"}>
                  {translate("college_degree")}
                </option>
                <option value={"Master's/Advanced degree"}>
                  {translate("masters_advanced_degree")}
                </option>
                <option value={"PhD degree"}>{translate("phd_degree")}</option>
                <option value={"Other"}>{translate("other")}</option>
              </select>
            </div>
            <label className="mt-4" htmlFor="technical-skills">
              {translate("technical_skills")}
            </label>
            <textarea
              minLength={1}
              maxLength={1000}
              value={profile.technicalSkills}
              onChange={(e) => {
                setProfile({
                  ...profile,
                  technicalSkills: e.target.value,
                });
              }}
              className="text-light form-control bg-transparent rounded-15px w-100 w-sm-50 mt-2 input-mw border-input"
              id="technical-skills"
              rows="5"
            ></textarea>
            <label className="mt-4" htmlFor="software-skills">
              {translate("software_skills")}
            </label>
            <textarea
              minLength={1}
              maxLength={1000}
              value={profile.softwareSkills}
              onChange={(e) => {
                setProfile({
                  ...profile,
                  softwareSkills: e.target.value,
                });
              }}
              className="text-light form-control bg-transparent rounded-15px w-100 w-sm-50 mt-2 input-mw border-input"
              id="software-skills"
              rows="5"
            ></textarea>
            <label className="mt-4" htmlFor="Languages">
              {translate("languages")}
            </label>
            <textarea
              minLength={1}
              maxLength={1000}
              value={profile.languages}
              onChange={(e) => {
                setProfile({
                  ...profile,
                  languages: e.target.value,
                });
              }}
              className="text-light form-control bg-transparent rounded-15px w-100 w-sm-50 mt-2 input-mw border-input"
              id="Languages"
              rows="5"
            ></textarea>
            <label className="mt-4" htmlFor="experience-ttending-competitions">
              {translate("experience_attending_competitions")}
            </label>
            <textarea
              minLength={1}
              maxLength={1000}
              value={profile.experienceAttendingCompetitions}
              onChange={(e) => {
                setProfile({
                  ...profile,
                  experienceAttendingCompetitions: e.target.value,
                });
              }}
              className="text-light form-control bg-transparent rounded-15px w-100 w-50 mb-4 mt-2 input-mw border-input"
              id="experience-attending-competitions"
              rows="5"
            ></textarea>
            <label className="mt-4" htmlFor="linkedin">
              {translate("enter_your_linkedin_url")}
            </label>
            <Input
              minLength={1}
              maxLength={1000}
              value={profile.linkedin}
              onChange={(e) => {
                setProfile({
                  ...profile,
                  linkedin: e.target.value,
                });
              }}
              id={"linkedin"}
              type="text"
              className="w-100 w-sm-25 mt-2"
            />
            <label className="mt-4" htmlFor="github">
              {translate("enter_your_github_url")}
            </label>
            <Input
              minLength={1}
              maxLength={1000}
              value={profile.github}
              onChange={(e) => {
                setProfile({
                  ...profile,
                  github: e.target.value,
                });
              }}
              id={"github"}
              type="text"
              className="w-100 w-sm-25 mt-2"
            />
            <label className="mt-4 " htmlFor="upload_your_resume">
              {translate("upload_your_resume")}
            </label>
            <div className="uploadEx">{translate("upload_ex")}</div>
            <div className="position-relative mb-2 p-2 rounded-10px uploadContainer">
              <Input
                accept=".PDF,.pdf"
                id="upload_your_resume"
                // value=
                onChange={(e) => {
                  onChangeResume(e);
                }}
                type="file"
                name="resume"
                className="w-100 w-sm-25 h-100 bg-transparent custom-file-input"
              />
              <div className="uploadValue">
                {profile.resume
                  ? profile.resume.split("/")[2]
                  : translate("no_file_choesen")}
              </div>
            </div>
            <div className="mw-460px d-flex">
              <Button
                btnText={translate("upload")}
                onClick={() => {
                  onUpload();
                }}
                className="uploadBTN"
              />
              {profile.resume && profile.resume.split("/")[2] && (
                // <Link
                //   to={`/uploads/${
                //     profile.resume.split("/")[2]
                //   }`}
                //   target="_blank"
                // >
                <Button
                  btnText={translate("display")}
                  onClick={() => {
                    window.open(
                      `${baseURL}/uploads/${profile.resume.split("/")[2]}`,
                      "_blank"
                    );
                    //   navigate(
                    //     `${baseURL}/uploads/${profile.resume.split("/")[2]}`,
                    //     { replace: true }
                    //   );
                  }}
                  className="uploadBTN"
                />
                // </Link>
              )}
            </div>
            <br />
            <label className="mt-4" htmlFor="fieldOfInterests">
              {translate("fields_of_interest")}
            </label>
            <textarea
              id="fieldOfInterests"
              minLength={1}
              maxLength={1000}
              className="text-light form-control bg-transparent rounded-15px w-100 w-sm-50 mt-2 input-mw border-input"
              rows="5"
              value={profile.fieldOfInterests}
              onChange={(e) => {
                setProfile({
                  ...profile,
                  fieldOfInterests: e.target.value,
                });
              }}
            ></textarea>
            <Button
              type="submit"
              btnText={translate("complete")}
              className="col-12 col-sm-4 mt-3 mb-5"
            />
          </div>
        </form>
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
      <CwsHelmet
        static_title={"CWS | "}
        dynamic_title={"complete_profile_title"}
      />
    </div>
  );
}
export default CompleteProfile;
