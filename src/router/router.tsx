/*
 * @FilePath: /nx-admin/src/router/router.tsx
 * @author: Wibus
 * @Date: 2022-07-12 16:25:35
 * @LastEditors: Wibus
 * @LastEditTime: 2022-07-22 23:04:55
 * Coding With IU
 */

import { Route, Routes } from "react-router-dom"
import { NotFound } from "../pages/404"
import { Comments } from "../pages/Comments"
import { Dashboard } from "../pages/Dashboard"
import { InitSystem } from "../pages/init-system"
import { Login } from "../pages/Login"
import { Pages } from "../pages/Pages/list"
import { PostEdit } from "../pages/Posts/edit"
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
      
      <Route path="/init-system" element={<InitSystem />} />
      <Route path="/login" element={<Login />} />

      <Route path="/dashboard" element={<Dashboard />} />
      
      <Route path="/posts" element={<Posts />} />
      <Route path="/posts/edit/:id" element={<PostEdit />} />
      
      <Route path="/pages" element={<Pages />} />
      <Route path="/pages/edit/:id" />
      
      <Route path="/comments" element={<Comments />} />
      <Route path="/links" />
      <Route path="/settings" />

      {/* TODO: 404 页面 */}
      <Route path="/:a" element={<NotFound />} />
    </Routes>
  )
}