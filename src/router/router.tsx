/*
 * @FilePath: /nx-admin/src/router/router.tsx
 * @author: Wibus
 * @Date: 2022-07-12 16:25:35
 * @LastEditors: Wibus
 * @LastEditTime: 2022-07-26 16:34:42
 * Coding With IU
 */

import { BrowserRouter, Route, Routes, useLocation, useNavigate } from "react-router-dom"
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
  const AppNavigate = useNavigate()
  AppNavigate("/dashboard")
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
      <Route path="/posts/edit" element={<PostEdit />} />
      <Route path="/posts/edit/:id" element={<PostEdit />} />

      <Route path="/pages" element={<Pages />} />
      <Route path="/pages/edit" />
      <Route path="/pages/edit/:id" />

      <Route path="/comments" element={<Comments />} />
      <Route path="/links" />
      <Route path="/settings" />

      {/* TODO: 404 页面 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}