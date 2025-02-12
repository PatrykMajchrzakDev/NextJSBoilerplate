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

// This is used to refresh user access and refresh tokens
export const APIRefresh = axios.create(options);

// This handles what to do with response and error

API.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { data, status } = error.response;
    console.log(data, "data");
    if (data.errorCode === "AUTH_TOKEN_NOT_FOUND" && status === 401) {
      try {
        await APIRefresh.get("/auth/refresh");
        return APIRefresh(error.config);
      } catch (error) {
        window.location.href = "/";
      }
    }
    return Promise.reject({
      ...data,
    });
  }
);

export default API;
