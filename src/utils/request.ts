/*
 * @FilePath: /nx-admin/src/utils/request.ts
 * @author: Wibus
 * @Date: 2022-07-15 17:33:03
 * @LastEditors: Wibus
 * @LastEditTime: 2022-08-03 12:22:18
 * Coding With IU
 */

import { $fetch } from "ohmyfetch";
import { message } from "react-message-popup";
import { getStorage } from "./storage";

const API = "http://127.0.0.1:3333";

export const apiClient = {
  get: (path: string, params?: any, query?: any, body?: any, options?: any) => {
    const url = `${path}${
      params ? `/${params.map((item: any) => `${item}`)}` : ""
    }${
      query
        ? `?${query.map((item: any) => `${item.key}=${item.value}`).join("&")}`
        : ""
    }`;
    return apiClientManger(url, {
      method: "GET",
      options,
    })
      .then((res) => {
        console.log(res);

        return res;
      })
      .catch((err) => {
        console.error(err);
        message.error(err.message || err.chMessage || err);
        throw new Error(err.message || err.chMessage || err);
      });
  },
  post: async (
    path: string,
    params?: any,
    query?: any,
    body?: any,
    options?: any
  ) => {
    const url = `${path}${
      params ? `/${params.map((item: any) => `${item}`)}` : ""
    }${
      query
        ? `?${query.map((item: any) => `${item.key}=${item.value}`).join("&")}`
        : ""
    }`;
    return apiClientManger(url, {
      method: "POST",
      body,
      options,
    })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.error(err);
        message.error(err.message || err.chMessage || err);
        throw new Error(err.message || err.chMessage || err);
      });
  },
  put: (path: string, params?: any, query?: any, body?: any, options?: any) => {
    const url = `${path}${
      params ? `/${params.map((item: any) => `${item}`)}` : ""
    }${
      query
        ? `?${query.map((item: any) => `${item.key}=${item.value}`).join("&")}`
        : ""
    }`;
    return apiClientManger(url, {
      method: "PUT",
      body,
      options,
    })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        message.error(err.message);
        throw new Error(err.chMessage);
      });
  },
  patch: (
    path: string,
    params?: any,
    query?: any,
    body?: any,
    options?: any
  ) => {
    const url = `${path}${
      params ? `/${params.map((item: any) => `${item}`)}` : ""
    }${
      query
        ? `?${query.map((item: any) => `${item.key}=${item.value}`).join("&")}`
        : ""
    }`;
    return apiClientManger(url, {
      method: "PATCH",
      body,
      options,
    })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        message.error(err.message);
        throw new Error(err.chMessage);
      });
  },
  delete: (
    path: string,
    params?: any,
    query?: any,
    body?: any,
    options?: any
  ) => {
    const url = `${path}${
      params ? `/${params.map((item: any) => `${item}`)}` : ""
    }${
      query
        ? `?${query.map((item: any) => `${item.key}=${item.value}`).join("&")}`
        : ""
    }`;
    return apiClientManger(url, {
      method: "DELETE",
      body,
      options,
    })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        message.error(err.message);
        throw new Error(err.chMessage);
      });
  },
};

// 对 fetch restful 风格二次封装
export const apiClientManger = async (url: string, options: any) => {
  return $fetch(API + url, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${getStorage("token")}`,
    },
    ...options,
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.error(err);
      throw err;
    });
};
