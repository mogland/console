/*
 * @FilePath: /console/src/utils/request.ts
 * @author: Wibus
 * @Date: 2022-07-15 17:33:03
 * @LastEditors: Wibus
 * @LastEditTime: 2022-08-03 12:22:18
 * Coding With IU
 */

import { ofetch } from "ofetch";
import { Twindow } from "../components/universal/Twindow";
import { getCookie } from "./cookie";

export const API = window.MOG_API || "http://127.0.0.1:2330";

export const apiClient = ofetch.create({
  baseURL: API,
  headers: {
    // "Content-Type": "application/json",
    // Accept: "application/json",
    Authorization: `Bearer ${getCookie("token")}`,
    token: getCookie("token") || "",
  },
  onResponseError: (error) => {
    Twindow({
      title: `请求出错了哦 - ${error.response.status}`,
      text: error.response._data.message,
      allowClose: true,
    });
  },
});
