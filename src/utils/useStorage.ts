/*
 * @FilePath: /nx-admin/src/utils/useStorage.ts
 * @author: Wibus
 * @Date: 2022-07-15 17:35:08
 * @LastEditors: Wibus
 * @LastEditTime: 2022-07-15 17:35:09
 * Coding With IU
 */

import { useState } from "react"

// 封装 localStorage
export const useStorage = (key: string, initialValue: any) => {
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      return initialValue
    }
  }
  )

  const setItem = (value: any) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.log(error)
    }
  }

  return [value, setValue, setItem]
}