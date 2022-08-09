/*
 * @FilePath: /nx-admin/src/router/router.tsx
 * @author: Wibus
 * @Date: 2022-07-12 16:25:35
 * @LastEditors: Wibus
 * @LastEditTime: 2022-08-09 21:29:29
 * Coding With IU
 */

import {
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { NotFound } from "../pages/404";
import { Backup } from "../pages/backup";
import { Comments } from "../pages/Comments";
import { Dashboard } from "../pages/Dashboard";
import { Friends } from "../pages/Friends";
import { InitSystem } from "../pages/init-system";
import { Login } from "../pages/Login";
import { PageEdit } from "../pages/Pages/edit";
import { Pages } from "../pages/Pages/list";
import { Category } from "../pages/Posts/category";
import { PostEdit } from "../pages/Posts/edit";
import { Posts } from "../pages/Posts/list";
import { Settings } from "../pages/Settings";
const JumpToDashboard = () => {
  // 跳转到 Dashboard 页面
  const AppNavigate = useNavigate();
  AppNavigate("/dashboard");
  return null;
};

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<JumpToDashboard />} />

      <Route path="/init-system" element={<InitSystem />} />
      <Route path="/login" element={<Login />} />

      <Route path="/dashboard" element={<Dashboard />} />

      <Route path="/posts" element={<Posts />} />
      <Route path="/posts/category" element={<Category />} />
      <Route path="/posts/edit" element={<PostEdit />} />
      <Route path="/posts/edit/:id" element={<PostEdit />} />

      <Route path="/pages" element={<Pages />} />
      <Route path="/pages/edit" element={<PageEdit />} />
      <Route path="/pages/edit/:id" element={<PageEdit />} />
      

      <Route path="/comments" element={<Comments />} />
      <Route path="/friends" element={<Friends />} />

      <Route path="/backup" element={<Backup />} />
      <Route path="/settings" element={<Settings />} />

      {/* TODO: 404 页面 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
