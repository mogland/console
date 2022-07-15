/*
 * @FilePath: /nx-admin/src/router/router.tsx
 * @author: Wibus
 * @Date: 2022-07-12 16:25:35
 * @LastEditors: Wibus
 * @LastEditTime: 2022-07-15 19:03:21
 * Coding With IU
 */

import { Route, Routes } from "react-router-dom"
import { Comments } from "../pages/Comments"
import { Dashboard } from "../pages/Dashboard"
import { Posts } from "../pages/Posts"

const JumpToDashboard = () => {
  // 跳转到 Dashboard 页面
  window.location.href = "/dashboard"
  return null
}

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<JumpToDashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/posts" element={<Posts />} />
      <Route path="/posts/edit/:id" />
      <Route path="/pages" />
      <Route path="/pages/edit/:id" />
      <Route path="/comments" element={<Comments />} />
      <Route path="/links" />
      <Route path="/settings" />
    </Routes>
  )
}