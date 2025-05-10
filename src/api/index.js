import { getReq, postGoogleReq, postReq } from "../axios";

export const getCookie = (cname) => {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};

export const signUp = (params, cb) => {
  // console.log(params);

  const url = "v1/auth/signup";
  const header = {};
  // const data = {
  //   lastName: "fergo",
  //   firstName: "Alex",
  //   phoneNumber: "09121234565",
  //   email: "gAlex@gmail.com",
  //   password: "123456789@a",
  // };
  return postReq(url, params, header, cb);
};

export const signIn = (params, cb) => {
  // console.log(params);
  const url = "v1/auth/login";
  const header = {};
  // const data = {
  //   email: "emad@gmail.com",
  //   password: "emad123@b",
  // };
  return postReq(url, params, header, cb);
};

export const postChangePassword = (params, cb) => {
  const token = getCookie("token");
  // console.log(token);
  const url = "v1/auth/change_password";
  const header = { Authorization: `Bearer ${token}` };
  // const data = {
  //   oldPassword: "emad123@a",
  //   newPassword: "emad123@b",
  // };
  return postReq(url, params, header, cb);
};

export const postProfile = (params, cb) => {
  const token = getCookie("token");
  // console.log(token);
  const url = "v1/user/profile";
  const header = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  // const data = {
  //   firstName: "alex",
  //   lastName: "Fego",
  //   age: 29,
  //   address: "Some",
  //   employmentStatus: "fullTime",
  //   workExperience: "Some",
  //   universityOfStudy: "Harvard",
  //   lastEducationalCertificate: "labla",
  //   technicalSkills: "Python",
  //   softwareSkills: "Python",
  //   languages: "English",
  //   experienceAttendingCompetitions: "labla",
  // };

  return postReq(url, params, header, cb);
};

export const getProfile = (params, cb) => {
  const token = getCookie("token");
  // console.log(token);
  const url = "v1/user/profile";
  const header = { Authorization: `Bearer ${token}` };
  // const data = {
  //   firstName: "alex",
  //   lastName: "Fego",
  //   age: 29,
  //   address: "Some",
  //   employmentStatus: "fullTime",
  //   workExperience: "Some",
  //   universityOfStudy: "Harvard :/",
  //   lastEducationalCertificate: "labla",
  //   technicalSkills: "Python",
  //   softwareSkills: "Python",
  //   languages: "English",
  //   experienceAttendingCompetitions: "labla",
  // };

  return getReq(url, params, header, cb);
};

export const postFeedback = (params, cb) => {
  const token = getCookie("token");
  // console.log(token);
  const url = "v1/user/feedbacks";
  const header = { Authorization: `Bearer ${token}` };
  // const data = {
  //   1: "good",
  //   2: "good",
  //   3: "bad",
  //   4: "perfect",
  //   5: "ML",
  //   comment: "That was not bad",
  // };

  return postReq(url, params, header, cb);
};

export const getFeedback = (params, cb) => {
  const token = getCookie("token");
  // console.log(token);
  const url = "v1/user/feedbacks";
  const header = { Authorization: `Bearer ${token}` };

  return getReq(url, params, header, cb);
};

export const forgotPassword = (params, cb) => {
  // console.log(params);
  const url = "v1/auth/forgot_password";
  const header = {};
  // const data = {
  //   email: "emad@gmail.com",
  // };

  return postReq(url, params, header, cb);
};

export const resetPassword = (params, cb) => {
  // console.log(params);
  //reset token
  const url = "v1/auth/reset_password";
  const header = {};
  //save email from last step
  // const data = {
  //   email: "emad@gmail.com",
  //   code: "264855",
  //   password: "emad123@b",
  // };
  return postReq(url, params, header, cb);
};

// export const signUpGoogle = (googleData, cb) => {
//   const url = "v1/auth/sign_up_with_google";
//   const header = {
//     "Content-Type": "application/json",
//   };
//   const body = JSON.stringify({
//     user_google_token: googleData.tokenId,
//   });
//   return postGoogleReq(url, header, body, cb);
// };

export const signInGoogle = (googleData, cb) => {
  // console.log(googleData);
  const url = "v1/auth/Login_with_google";
  const header = {
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    user_google_token: googleData.tokenId,
  });
  return postGoogleReq(url, header, body, cb);
};

// export const postResume = (params, cb) => {
//   const url = "v1/upload";
//   const header = {
//     "Content-Type": "multipart/form-data",
//   };

//   return postReq(url, header, undefined, cb);
// };

export const logOut = (params, cb) => {
  const token = getCookie("token");
  const url = "v1/auth/logout";
  const header = { Authorization: `Bearer ${token}` };
  return getReq(url, params, header, cb);
};

export const getCertificate = (params, cb) => {
  const token = getCookie("token");
  // console.log(token);
  const url = "v1/user/profile/certificate";
  const header = { Authorization: `Bearer ${token}` };

  return getReq(url, params, header, cb);
};
export const postCertificate = (params, cb) => {
  const token = getCookie("token");
  // console.log(token);
  const url = "v1/user/profile/certificate";
  const header = { Authorization: `Bearer ${token}` };

  return postReq(url, params, header, cb);
};
