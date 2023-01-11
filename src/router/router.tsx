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
  useNavigate,
} from "react-router-dom";
import { Home } from "../pages/Home";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
};
