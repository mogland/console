/*
 * @FilePath: /nx-admin/src/pages/Posts/edit.tsx
 * @author: Wibus
 * @Date: 2022-07-22 22:52:13
 * @LastEditors: Wibus
 * @LastEditTime: 2022-07-23 23:22:54
 * Coding With IU
 */

import { BasicPage } from "../../types/basic";
import './edit.module.css';
import { useEffect, useState } from "react";
import { apiClient } from "../../utils/request";
import { NxPage } from "../../components/widgets/Page";
import { useMount } from "react-use";
import { useClasses } from "@geist-ui/core";
import 'brilliant-editor/dist/index.css';
import Brilliant, { createFrom } from 'brilliant-editor';
export const PostEdit: BasicPage = () => {


  const [post, setPost] = useState<any>({});
  // const [editorState, setEditorState] = useState(() =>
  //   // createFrom(`## Sub Title`, 'Markdown')
  // );
  const postId = window.location.pathname.split('/').pop();

  useMount(() => {
    apiClient.get(`/posts/${postId}`).then(res => {
      setPost(res);
      // setEditorState(createFrom(res.text, 'HTML'));
    })
  })

  return (
    <NxPage>
      <h1>
        <input
          id="postTitle"
          placeholder="文章标题"
          onChange={() => {
            setPost({
              ...post,
              title: document.getElementById('postTitle')?.value
            })
          }}
          defaultValue={post?.title}
        />
      </h1>
      <div className={useClasses("text-xl h-full w-full mt-12")}>
      <Brilliant />
        <textarea
          id="postContent"
          placeholder="文章内容"
          onChange={
            () => {
              setPost({
                ...post,
                content: document.getElementById('postContent')?.value
              })
            }
          }
          defaultValue={post?.text}
          style={{ height: '100%', width: '100%' }}
        />

      </div>
    </NxPage>
  )
}