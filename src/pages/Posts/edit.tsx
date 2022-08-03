/*
 * @FilePath: /nx-admin/src/pages/Posts/edit.tsx
 * @author: Wibus
 * @Date: 2022-07-22 22:52:13
 * @LastEditors: Wibus
 * @LastEditTime: 2022-08-03 13:46:47
 * Coding With IU
 */

import type { BasicPage } from "../../types/basic";
import { useState } from "react";
import { apiClient } from "../../utils/request";
import { NxPage } from "../../components/widgets/Page";
import { useMount } from "react-use";
import { Editor } from "../../components/widgets/Editor";
import { PostModel } from "./post.model";
import { useParams } from "react-router-dom";

export const PostEdit: BasicPage = () => {
  const [post, setPost] = useState<PostModel>(new PostModel());
  const [loading, setLoading] = useState<boolean>(true);
  const params = useParams();
  const postId = params ? params.id : undefined;
  useMount(() => {
    postId &&
      apiClient.get(`/posts/${postId}`).then((res) => {
        setPost(res);
        setLoading(false);
      });
  });

  return (
    <NxPage>
      {(postId !== "edit" && !loading && (
        <Editor post={post} type="post" />
      )) || <Editor type="post" />}
    </NxPage>
  );
};
