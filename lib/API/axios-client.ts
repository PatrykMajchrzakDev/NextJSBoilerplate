// =================================================
// ================== AXIOS SETUP ==================
// =================================================

import axios from "axios";

// Axios options
const options = {
  baseURL: process.env.NEXT_PUBLIC_BACKEND_BASE_URL,
  // indicates whether or not cross-site Access-Control requests
  // should be made using credentials
  withCredentials: true,
  // `timeout` specifies the number of milliseconds before the request times out.
  // If the request takes longer than `timeout`, the request will be aborted.
  timeout: 10000,
};

// Axios initialization
const API = axios.create(options);

// This handles what to do with response and error
API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { data, status } = error.response;

    if (data === "Unauthorized" && status === 401)
      return Promise.reject({
        ...data,
      });
  }
);

export default API;
