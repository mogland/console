/*
 * @FilePath: /nx-admin/src/hooks/use-system.ts
 * @author: Wibus
 * @Date: 2022-07-15 21:02:40
 * @LastEditors: Wibus
 * @LastEditTime: 2022-07-15 21:09:52
 * Coding With IU
 */

import { apiClent } from "../utils/request";


enum SystemApi {
  posts = "/posts",
  pages = "/pages",
  categories = "/categories",
  tags = "/categories?type=Tag",
  users = "/user",
  comment = "/comment",
  aggregate = "/aggregate",
  links = "/links",
  init = "/init",
}

async function fetchBasicApi(api: SystemApi) {
  return await apiClent.get(api);
}

export function useSystem() {
  return {
    ...fetchBasicApi(SystemApi.posts),
    ...fetchBasicApi(SystemApi.pages),
    ...fetchBasicApi(SystemApi.categories),
    ...fetchBasicApi(SystemApi.tags),
    ...fetchBasicApi(SystemApi.users),
    ...fetchBasicApi(SystemApi.comment),
    ...fetchBasicApi(SystemApi.aggregate),
    ...fetchBasicApi(SystemApi.links),
    ...fetchBasicApi(SystemApi.init),
  }
}

/**
 * initSystem 初始化系统
 */
export async function initSystem() {
  const basis = {
    ...fetchBasicApi(SystemApi.posts),
    ...fetchBasicApi(SystemApi.pages),
    ...fetchBasicApi(SystemApi.categories),
    ...fetchBasicApi(SystemApi.tags),
    ...fetchBasicApi(SystemApi.users),
    ...fetchBasicApi(SystemApi.comment),
    ...fetchBasicApi(SystemApi.aggregate),
    ...fetchBasicApi(SystemApi.links),
    ...fetchBasicApi(SystemApi.init),
  }
  // 挂载到window上
  Object.defineProperty(window, 'nxStore', {
    async get() {
      return await basis
    }
  })
}