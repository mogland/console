/*
 * @FilePath: /nx-admin/src/pages/Posts/edit.tsx
 * @author: Wibus
 * @Date: 2022-07-22 22:52:13
 * @LastEditors: Wibus
 * @LastEditTime: 2022-07-26 13:51:02
 * Coding With IU
 */

import { BasicPage } from "../../types/basic";
import { useEffect, useState } from "react";
import { apiClient } from "../../utils/request";
import { NxPage } from "../../components/widgets/Page";
import { useMount } from "react-use";
import { BackBtn, Editor } from "../../components/widgets/Editor";
import { message } from "react-message-popup";
import { PostModel } from "./post.model";




export const PostEdit: BasicPage = () => {

  const [originPost, setOriginPost] = useState<any>({});
  const [post, setPost] = useState<PostModel>(new PostModel());
  const [loading, setLoading] = useState<boolean>(true);
  const postId = window.location.pathname.split('/').pop();
  useMount(() => {
    postId !== 'edit' && apiClient.get(`/posts/${postId}`).then(res => {
      setPost(res);
      setOriginPost(res);
      setLoading(false);
    })
  })
  // console.log(post);
  // if (postId !== 'edit' && !loading) {
  //   console.log(post);
  // }

  return (
    <NxPage>
      {
        postId !== 'edit' && !loading && (
          <Editor
            post={post}
            type="post"
          />
        ) || (
          <Editor
            type="post"
          />
        )
      }
    </NxPage>
  )
}