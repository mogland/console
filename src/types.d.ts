/*
 * @FilePath: /nx-admin/src/types.d.ts
 * @author: Wibus
 * @Date: 2022-07-15 15:19:08
 * @LastEditors: Wibus
 * @LastEditTime: 2022-07-15 20:55:22
 * Coding With IU
 */

declare global {
  export interface History {
    backPath: string[]
    push(path: string): void
  }
  export interface Window {
    [key: string]: any
  }
}

export {}