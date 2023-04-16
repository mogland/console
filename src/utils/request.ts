import { ofetch } from "ofetch";
import { getCookie } from "./cookie";

export const API = window.MOG_API || "http://127.0.0.1:2330/api";

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
