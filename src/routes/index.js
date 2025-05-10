import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import First from "../pages/First/First";
// import CertificateInquiry from "../pages/CertificateInquiry/CertificateInquiry";
import SignIn from "../pages/SignIn/SignIn";
// import SignUp from "../pages/SignUp/SignUp";
import ForgetPassword from "../pages/ForgetPassword/ForgetPassword";
import ChangeForgotPassword from "../pages/ChangeForgotPassword/ChangeForgotPassword";
import ChangePassword from "../pages/ChangePassword/ChangePassword";
import TimeTable from "../pages/TimeTable/TimeTable";
import Profile from "../pages/Profile/Profile";
import Lectures from "../pages/Lectures/Lectures";
import FirstCertificate from "../pages/FirstCertificate/FirstCertificate";
import SecondCertificate from "../pages/SecondCertificate/SecondCertificate";
import CompleteProfile from "../pages/CompleteProfile/CompleteProfile";
import Feedback from "../pages/Feedback/Feedback";
import NotFound from "../pages/NotFound/NotFound";
import {
  ROUTE_ROOT,
  ROUTE_FIRST,
  // ROUTE_CERTIFICATE_INQUIRY,
  ROUTE_SIGN_IN,
  // ROUTE_SIGN_UP,
  ROUTE_FORGET_PASSWORD,
  ROUTE_CHANGE_FORGOT_PASSWORD,
  ROUTE_TIME_TABLE,
  ROUTE_PROFILE,
  ROUTE_CHANGE_PASSWORD,
  ROUTE_LECTURES,
  ROUTE_COMPLETE_PROFILE,
  ROUTE_FEEDBACK,
  ROUTE_FIRST_CERTIFICATE,
  ROUTE_SECOND_CERTIFICATE,
} from "./constants";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function router() {
  return (
    <>
      <SkeletonTheme baseColor="#110d16" highlightColor="#200934">
        <BrowserRouter>
          <Routes>
            <Route path={ROUTE_ROOT} element={<Home />}></Route>
            <Route path={ROUTE_FIRST} element={<First />}></Route>
            {/* <Route
              path={ROUTE_CERTIFICATE_INQUIRY}
              element={<CertificateInquiry />}
            ></Route> */}
            <Route path={ROUTE_SIGN_IN} element={<SignIn />}></Route>
            {/* //<Route path={ROUTE_SIGN_UP} element={<SignUp />}></Route> */}
            <Route
              path={ROUTE_FORGET_PASSWORD}
              element={<ForgetPassword />}
            ></Route>
            <Route
              path={ROUTE_CHANGE_FORGOT_PASSWORD}
              element={<ChangeForgotPassword />}
            ></Route>
            <Route path={ROUTE_TIME_TABLE} element={<TimeTable />}></Route>
            <Route path={ROUTE_PROFILE} element={<Profile />}></Route>
            <Route
              path={ROUTE_CHANGE_PASSWORD}
              element={<ChangePassword />}
            ></Route>
            <Route path={ROUTE_LECTURES} element={<Lectures />}></Route>
            {/* <Route
              path={ROUTE_FIRST_CERTIFICATE}
              element={<FirstCertificate />}
            ></Route> */}
            <Route
              path={ROUTE_SECOND_CERTIFICATE}
              element={<SecondCertificate />}
            ></Route>
            <Route
              path={ROUTE_COMPLETE_PROFILE}
              element={<CompleteProfile />}
            ></Route>
            <Route path={ROUTE_FEEDBACK} element={<Feedback />}></Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </SkeletonTheme>
    </>
  );
}
export default router;
