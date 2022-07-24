/*
 * @FilePath: /nx-admin/src/pages/Posts/edit.tsx
 * @author: Wibus
 * @Date: 2022-07-22 22:52:13
 * @LastEditors: Wibus
 * @LastEditTime: 2022-07-24 09:49:44
 * Coding With IU
 */

import { BasicPage } from "../../types/basic";
import './edit.css';
import { useEffect, useState } from "react";
import { apiClient } from "../../utils/request";
import { NxPage } from "../../components/widgets/Page";
import { useMount } from "react-use";
import { BackBtn, Editor } from "../../components/widgets/Editor";



export const PostEdit: BasicPage = () => {

  const [originPost, setOriginPost] = useState<any>({});
  const [post, setPost] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);
  const postId = window.location.pathname.split('/').pop();

  useMount(() => {
    apiClient.get(`/posts/${postId}`).then(res => {
      setPost(res);
      setOriginPost(res);
      setLoading(false);
    })
  })

  return (
    <NxPage>
      {
        !loading && (
          <Editor
            post={post}
          />
        )
      }
    </NxPage>
  )
}