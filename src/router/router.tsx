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
import { ThemesPage } from "@pages/Themes";
import { jump } from "@utils/path";
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
import { FilesPage } from "@pages/Files";
import { SchedulePage } from "@pages/Schedule";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path={jump("/login")} element={<Login />} />
      <Route path={jump("/register")} element={<RegisterPage />} />

      <Route path={jump("/")} element={<Home />} />
      <Route path={jump("/dashboard")} element={<Home />} />

      <Route path={jump("/posts")} element={<PostsIndex />} />
      <Route path={jump("/posts/friends")} element={<FriendsPosts />} />
      <Route path={jump("/pages")} element={<PagesIndex />} />

      <Route path={jump("/write")} element={<JumpToEditorPage />} />
      <Route path={jump("/write/:type")} element={<EditorPage />} />

      <Route path={jump("/comments")} element={<CommentsPage />} />
      <Route path={jump("/categories")} element={<CategoriesPage />} />
      <Route path={jump("/friends")} element={<FriendsPage />} />

      <Route path={jump("/themes")} element={<ThemesPage />} />
      <Route path={jump("/settings")} element={<SettingsPage />} />
      <Route path={jump("/files")} element={<FilesPage />} />
      <Route path={jump("/schedule")} element={<SchedulePage />} />
      <Route path={jump("/status")} element={<StatusPage />} />

      <Route path={jump("/*")} element={<NotFoundPage />} />
      <Route path={"*"} element={<NotFoundPage />} />
    </Routes>
  );
};

const NotFoundPage = () => {
  window.location.href = jump("/dashboard");
  return <></>;
};

const JumpToEditorPage = () => {
  window.location.href = jump("/write/post");
  return <></>;
};
