/*
 * @FilePath: /nx-admin/src/types.d.ts
 * @author: Wibus
 * @Date: 2022-07-15 15:19:08
 * @LastEditors: Wibus
 * @LastEditTime: 2022-07-23 20:33:28
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
  export interface HTMLElement {
    [key: string]: any
    value: any
  }
}

export {}