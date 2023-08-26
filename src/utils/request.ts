import { ofetch } from "ofetch";
import { getCookie } from "./cookie";

export const API = window.MOG_API || "http://127.0.0.1:2330";

export const apiClient = ofetch.create({
  baseURL: API,
  headers: {
    Authorization: `Bearer ${getCookie("token")}`,
    token: getCookie("token") || "",
  },
  // onResponseError: (error) => {
  //   toast.error(`${error.response._data.message}`)
  // },
});

export const fetch = (url: RequestInfo) => {
  const getToken = getCookie("token") || "";
  const headers = { Authorization: `Bearer ${getToken}`, token: getToken };
  return apiClient(url, { headers });
};
