/*
 * @FilePath: /react-ts-starter/src/router/router.tsx
 * @author: Wibus
 * @Date: 2022-07-12 16:25:35
 * @LastEditors: Wibus
 * @LastEditTime: 2022-08-05 15:14:18
 * Coding With IU
 */

import { CommentsPage } from "@pages/Comments";
import { RegisterPage } from "@pages/Register";
import { Route, Routes } from "react-router-dom";
import { CategoriesPage } from "../pages/Categories";
import { FriendsPage } from "../pages/Friends";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { PagesIndex } from "../pages/Pages/Index";
import { FriendsPosts } from "../pages/Posts/Friends";
import { PostsIndex } from "../pages/Posts/Index";
import { SettingsPage } from "../pages/Settings";
import { StatusPage } from "../pages/Status";
import { EditorPage } from "../pages/Write";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Home />} />

      <Route path="/posts" element={<PostsIndex />} />
      <Route path="/posts/friends" element={<FriendsPosts />} />
      <Route path="/pages" element={<PagesIndex />} />

      <Route path="/write" element={<JumpToEditorPage />} />
      <Route path="/write/:type" element={<EditorPage />} />

      <Route path="/comments" element={<CommentsPage />} />
      <Route path="/categories" element={<CategoriesPage />} />
      <Route path="/friends" element={<FriendsPage />} />

      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/status" element={<StatusPage />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

const NotFoundPage = () => {
  window.location.href = "/dashboard";
  return <></>;
};

const JumpToEditorPage = () => {
  window.location.href = "/write/post";
  return <></>;
};
