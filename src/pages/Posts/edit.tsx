/*
 * @FilePath: /nx-admin/src/pages/Posts/edit.tsx
 * @author: Wibus
 * @Date: 2022-07-22 22:52:13
 * @LastEditors: Wibus
 * @LastEditTime: 2022-07-23 15:49:51
 * Coding With IU
 */

import { BasicPage } from "../../types/basic";
import './edit.module.css';
import { useCallback, useEffect, useState } from "react";
import { apiClient } from "../../utils/request";
import { useMount } from "react-use";
import { NxPage } from "../../components/widgets/Page";
import { NxEditor } from "../../components/widgets/Editor";

export const PostEdit: BasicPage = () => {

  const postId = window.location.pathname.split('/').pop();
  const [post, setPost] = useState<any>();

  useMount(() => {
    apiClient.get(`/posts/${postId}`).then(res => {
      setPost(res);
    })
  })



  return (
    <NxPage>
      <div id="editor">
        {
          post?.title && <NxEditor
            title={post?.title}
            text={post?.text}
          />
        }
      </div>
    </NxPage>
  );
}