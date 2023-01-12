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
import { PagesIndex } from "../pages/Pages/Index";
import { FriendsPosts } from "../pages/Posts/Friends";
import { PostsIndex } from "../pages/Posts/Index";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Home />} />
      <Route path="/login" element={<Login />} />
      
      <Route path="/posts" element={<PostsIndex />} />
      <Route path="/posts/friends" element={<FriendsPosts />} />
      <Route path="/pages" element={<PagesIndex />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

const NotFoundPage = () => {
  window.location.href = "/dashboard"
  return <></>
}
