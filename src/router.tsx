/*
 * @FilePath: /nx-admin/src/router.tsx
 * @author: Wibus
 * @Date: 2022-07-12 16:25:35
 * @LastEditors: Wibus
 * @LastEditTime: 2022-07-14 22:46:59
 * Coding With IU
 */

import { Route, Routes } from "react-router-dom"
import { Dashboard } from "./pages/Dashboard"

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
    </Routes>
  )
}