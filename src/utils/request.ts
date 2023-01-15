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
import { getStorage } from "./storage";

export const API = "http://192.168.3.4:2330";

export const apiClient = ofetch.create({
  baseURL: API,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${getStorage("token")}`,
  },
  onResponseError: (error) => {
    Twindow({
      title: `请求出错了哦 - ${error.response.status}`,
      text: error.response._data.message,
      allowClose: true,
    });
  },
});
