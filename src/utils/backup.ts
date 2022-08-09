/*
 * @FilePath: /nx-admin/src/utils/backup.ts
 * @author: Wibus
 * @Date: 2022-08-09 21:56:18
 * @LastEditors: Wibus
 * @LastEditTime: 2022-08-09 22:00:39
 * Coding With IU
 */

export function responseBlobToFile(response: any, filename: string): void {
  const url = window.URL.createObjectURL(new Blob([response as any]))
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', filename)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}