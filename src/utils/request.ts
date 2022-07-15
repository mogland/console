/*
 * @FilePath: /nx-admin/src/utils/request.ts
 * @author: Wibus
 * @Date: 2022-07-15 17:33:03
 * @LastEditors: Wibus
 * @LastEditTime: 2022-07-15 18:14:37
 * Coding With IU
 */

// 封装 fetch 请求, 如 fetch(RESTful.GET.user.list, { params: { page: 1, limit: 10 } })

export const apiClent = {
  get: (path: string, params?: any, query?: any, options?: any) => {
    const url = `
    ${"http://127.0.0.1:3333"}${path}${params ? `/` + params.map((item: any) => `${item.key}=${item.value}`).join("&") : ""}${query ? `?` + query.map((item: any) => `${item.key}=${item.value}`).join("&") : ""}`
      console.log(url)
    return request(url, {
      method: 'GET',
      params,
      query,
      options
    })
  },
  post: (url: string, params?: any, query?: any, options?: any) => {
    return request(url, {
      method: 'POST',
      params,
      query,
      options
    })
  },
  put: (url: string, params?: any, query?: any, options?: any) => {
    return request(url, {
      method: 'PUT',
      params,
      query,
      options
    })
  },
  delete: (url: string, params?: any, query?: any, options?: any) => {
    return request(url, {
      method: 'DELETE',
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
    .catch(err => console.log(err))
}