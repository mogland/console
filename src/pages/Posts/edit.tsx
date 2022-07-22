/*
 * @FilePath: /nx-admin/src/pages/Posts/edit.tsx
 * @author: Wibus
 * @Date: 2022-07-22 22:52:13
 * @LastEditors: Wibus
 * @LastEditTime: 2022-07-22 23:24:15
 * Coding With IU
 */

import { BasicPage } from "../../types/basic";
import Vditor from 'vditor';
import './edit.module.css';
import "vditor/dist/index.css";
import { useEffect, useState } from "react";
import { apiClient } from "../../utils/request";

export const PostEdit: BasicPage = () => {

  const [vd, setVd] = useState<Vditor>();

  const postId = window.location.pathname.split('/').pop();

  useEffect(() => {
    const vditor = new Vditor("vditor", {
      value: 'Feting the data from the server',
      cache: {
        enable: false,
      },
      // theme: 'dark',
      height: '100vh',
      width: '100%',
      placeholder: '请输入文章内容',
      after: () => {
        apiClient.get(`/posts/${postId}`).then(res => {
          vditor.setValue(res.text);
          setVd(vditor);
        })
      }
    });
  }, []);


  return <div id="vditor" className="vditor" />;
}