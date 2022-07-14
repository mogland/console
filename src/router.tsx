/*
 * @FilePath: /nx-admin/src/router.tsx
 * @author: Wibus
 * @Date: 2022-07-12 16:25:35
 * @LastEditors: Wibus
 * @LastEditTime: 2022-07-14 16:46:35
 * Coding With IU
 */

import { Route, Routes } from "react-router-dom"
import { Dashboard } from "./pages/Dashboard"


export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  )
}