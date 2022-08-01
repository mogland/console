/*
 * @FilePath: /nx-admin/src/utils/extra.ts
 * @author: Wibus
 * @Date: 2022-07-30 17:59:59
 * @LastEditors: Wibus
 * @LastEditTime: 2022-08-01 14:18:14
 * Coding With IU
 */

import md5 from "md5"

export function getAvatarUrl(mail: string) {
  const template = `	https://cravatar.cn/avatar/`
  const hash = (mail ? md5(mail) : "").toLowerCase()
  return `${template}${hash}?s=200`
}