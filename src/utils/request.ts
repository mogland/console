/*
 * @FilePath: /nx-admin/src/utils/request.ts
 * @author: Wibus
 * @Date: 2022-07-15 17:33:03
 * @LastEditors: Wibus
 * @LastEditTime: 2022-07-19 23:15:43
 * Coding With IU
 */

import { message } from "react-message-popup"

// 封装 fetch 请求, 如 fetch(RESTful.GET.user.list, { params: { page: 1, limit: 10 } })

export const apiClient = {
  get: (path: string, params?: any, query?: any, body?: any, options?: any) => {
    const url = `
    ${"http://127.0.0.1:3333/api"}${path}${params ? `/` + params.map((item: any) => `${item.key}=${item.value}`).join("&") : ""}${query ? `?` + query.map((item: any) => `${item.key}=${item.value}`).join("&") : ""}`
    return request(url, {
      method: 'GET',
      options
    })
  },
  post: (path: string, params?: any, query?: any, body?: any, options?: any) => {
    const url = `
    ${"http://127.0.0.1:3333/api"}${path}${params ? `/` + params.map((item: any) => `${item.key}=${item.value}`).join("&") : ""}${query ? `?` + query.map((item: any) => `${item.key}=${item.value}`).join("&") : ""}`
    return request(url, {
      method: 'POST',
      body,
      options
    })
  },
  put: (path: string, params?: any, query?: any, body?: any, options?: any) => {
    const url = `
    ${"http://127.0.0.1:3333/api"}${path}${params ? `/` + params.map((item: any) => `${item.key}=${item.value}`).join("&") : ""}${query ? `?` + query.map((item: any) => `${item.key}=${item.value}`).join("&") : ""}`
    return request(url, {
      method: 'PUT',
      body,
      options
    })
  },
  delete: (path: string, params?: any, query?: any, body?: any, options?: any) => {
    const url = `
    ${"http://127.0.0.1:3333/api"}${path}${params ? `/` + params.map((item: any) => `${item.key}=${item.value}`).join("&") : ""}${query ? `?` + query.map((item: any) => `${item.key}=${item.value}`).join("&") : ""}`
    return request(url, {
      method: 'DELETE',
      body,
      options
    })
  }
}

export const request = (url: string, options: any) => {
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
  const opts = {
    headers,
    ...options
  }
  return fetch(url, opts)
    .then(res => res.json())
    .then(res => res)
    .catch(err => {
      message.error(err)
      console.log(err)
    })
}