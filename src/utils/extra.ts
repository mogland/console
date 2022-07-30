/*
 * @FilePath: /nx-admin/src/utils/extra.ts
 * @author: Wibus
 * @Date: 2022-07-30 17:59:59
 * @LastEditors: Wibus
 * @LastEditTime: 2022-07-30 22:59:06
 * Coding With IU
 */

import md5 from "md5"

export function getAvatarUrl(email: string) {
  const template = `	https://cravatar.cn/avatar/`
  const hash = (email ? md5(email) : "").toLowerCase()
  return `${template}${hash}?s=200`
}