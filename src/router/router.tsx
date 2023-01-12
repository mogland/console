/*
 * @FilePath: /react-ts-starter/src/router/router.tsx
 * @author: Wibus
 * @Date: 2022-07-12 16:25:35
 * @LastEditors: Wibus
 * @LastEditTime: 2022-08-05 15:14:18
 * Coding With IU
 */

import {
  Route,
  Routes,
} from "react-router-dom";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Home />} />
      <Route path="/login" element={<Login />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

const NotFoundPage = () => {
  window.location.href = "/dashboard"
  return <></>
}
