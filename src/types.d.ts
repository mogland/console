/*
 * @FilePath: /nx-admin/src/types.d.ts
 * @author: Wibus
 * @Date: 2022-07-15 15:19:08
 * @LastEditors: Wibus
 * @LastEditTime: 2022-07-25 14:13:56
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
  export interface Element {
    [key: string]: any
  }
}

export {}