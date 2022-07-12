/*
 * @FilePath: /nx-admin/src/router.tsx
 * @author: Wibus
 * @Date: 2022-07-12 16:25:35
 * @LastEditors: Wibus
 * @LastEditTime: 2022-07-12 16:29:20
 * Coding With IU
 */

import { Route, Routes } from "react-router-dom"
import { Home } from "./pages/Home"
import { Posts } from "./pages/Posts"


export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/posts" element={<Posts />} />
    </Routes>
  )
}