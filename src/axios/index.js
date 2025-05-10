import axios from "axios";
import { getCookie } from "../api";

let protocol = process.env.REACT_APP_PROTOCOL;
let hostName = process.env.REACT_APP_HOSTNAME;
let port = process.env.REACT_APP_PORT;

// export const baseURL = `${protocol}${hostName}api/`;
export const baseURL = `${protocol}${hostName}:${port}/`;

export const postReq = (url, params, header, cb) => {
  axios({
    method: "POST",
    url: baseURL + url,
    data: params,
    headers: header,
  })
    .then((res) => {
      cb(res, null);
    })
    .catch((err) => {
      cb(null, err);
    });
};

export const getReq = (url, params, header, cb) => {
  axios({
    method: "GET",
    url: baseURL + url,
    data: params,
    headers: header,
  })
    .then((res) => {
      cb(res, null);
    })
    .catch((err) => {
      cb(null, err);
    });
};

export const patchReq = (url, params, header, cb) => {
  axios({
    method: "PATCH",
    url: baseURL + url,
    data: params,
    headers: header,
  })
    .then((res) => {
      cb(res, null);
    })
    .catch((err) => {
      cb(null, err);
    });
};

export const postGoogleReq = (url, header, body, cb) => {
  axios({
    method: "POST",
    url: baseURL + url,
    body: body,
    headers: header,
  })
    .then((res) => {
      cb(res, null);
    })
    .catch((err) => {
      cb(null, err);
    });
};

export const postUpload = (formData, cb) => {
  const token = getCookie("token");
  axios
    .post(`${baseURL}/api/v1/user/uploads/resume`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      cb(res, null);
    })
    .catch((err) => {
      cb(null, err);
    });
};
