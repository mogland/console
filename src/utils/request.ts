/*
 * @FilePath: /console/src/utils/request.ts
 * @author: Wibus
 * @Date: 2022-07-15 17:33:03
 * @LastEditors: Wibus
 * @LastEditTime: 2022-08-03 12:22:18
 * Coding With IU
 */

import { ofetch } from "ofetch";
import { getStorage } from "./storage";

const API = "http://192.168.3.4:2330";

export const apiClient = ofetch.create({
  baseURL: API,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${getStorage("token")}`,
  },
});