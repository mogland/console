/*
 * @FilePath: /nx-admin/src/router/router.tsx
 * @author: Wibus
 * @Date: 2022-07-12 16:25:35
 * @LastEditors: Wibus
 * @LastEditTime: 2022-07-16 17:17:00
 * Coding With IU
 */

import { Route, Routes } from "react-router-dom"
import { Comments } from "../pages/Comments"
import { Dashboard } from "../pages/Dashboard"
import { InitSystem } from "../pages/init-system"
import { Posts } from "../pages/Posts/list"

const JumpToDashboard = () => {
  // 跳转到 Dashboard 页面
  window.location.href = "/dashboard"
  return null
}

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<JumpToDashboard />} />
      <Route path="/init" element={<InitSystem />} />
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