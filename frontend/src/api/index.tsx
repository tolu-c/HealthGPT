import axios, { AxiosInstance } from "axios";
import { getToken } from "utils/token";

let AxiosApi: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    Accept: "application/json",
  },
});

AxiosApi.interceptors.request.use(function (config) {
  if (getToken()) {
    config.headers.Authorization = `Bearer ${getToken()}`;
  }

  return config;
});

export default AxiosApi;
