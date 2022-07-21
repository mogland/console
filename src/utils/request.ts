/*
 * @FilePath: /nx-admin/src/utils/request.ts
 * @author: Wibus
 * @Date: 2022-07-15 17:33:03
 * @LastEditors: Wibus
 * @LastEditTime: 2022-07-21 13:41:45
 * Coding With IU
 */

import { message } from "react-message-popup"
import { getStorage } from "./storage"

const API = 'http://127.0.0.1:3333'


export const apiClient = {
  get: (path: string, params?: any, query?: any, body?: any, options?: any) => {
    const url = `${path}${params ? `/` + params.map((item: any) => `${item.key}=${item.value}`).join("&") : ""}${query ? `?` + query.map((item: any) => `${item.key}=${item.value}`).join("&") : ""}`
    return apiClientManger(url, {
      method: 'GET',
      options
    })
  },
  post: async (path: string, params?: any, query?: any, body?: any, options?: any) => {
    const url = `${path}${params ? `/` + params.map((item: any) => `${item.key}=${item.value}`).join("&") : ""}${query ? `?` + query.map((item: any) => `${item.key}=${item.value}`).join("&") : ""}`
    try {
      const res = await apiClientManger(url, {
        method: 'POST',
        body,
        options
      })
      return res
    } catch (err: any) {
      console.error(err)
      throw err
    }
  },
  put: (path: string, params?: any, query?: any, body?: any, options?: any) => {
    const url = `${path}${params ? `/` + params.map((item: any) => `${item.key}=${item.value}`).join("&") : ""}${query ? `?` + query.map((item: any) => `${item.key}=${item.value}`).join("&") : ""}`
    return apiClientManger(url, {
      method: 'PUT',
      body,
      options
    })
  },
  delete: (path: string, params?: any, query?: any, body?: any, options?: any) => {
    const url = `${path}${params ? `/` + params.map((item: any) => `${item.key}=${item.value}`).join("&") : ""}${query ? `?` + query.map((item: any) => `${item.key}=${item.value}`).join("&") : ""}`
    return apiClientManger(url, {
      method: 'DELETE',
      body,
      options
    })
  }
}

// 对 fetch restful 风格二次封装
export const apiClientManger = async (url: string, options: any) => {
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${getStorage('token')}`,
  }
  const res = fetch(API + url, {
    headers,
    ...options,
  }).then(res => { return res.json() }).catch(err => {
    console.error(err)
    message.error(err.message)
    throw err
  })
  return res
}