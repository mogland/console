/*
 * @FilePath: /nx-admin/src/components/widgets/Editor/index.tsx
 * @author: Wibus
 * @Date: 2022-07-23 23:47:19
 * @LastEditors: Wibus
 * @LastEditTime: 2022-07-24 00:00:21
 * Coding With IU
 */

import { useClasses } from "@geist-ui/core"
import { ArrowLeft } from "@icon-park/react"
import { FC, useState } from "react"

const BackBtn = (props) => {
  return (
    <>
      <div
        className={useClasses("pl-6 py-5 float-right absolute right-0 bottom-3 cursor-pointer z-10")}
        onClick={() => props.onClick()}
      >
        <div style={{
          backgroundColor: "rgba(60, 60, 60, 0.6)",
          padding: "8px",
          borderRadius: "15%",
        }}>
          <ArrowLeft /> Back
        </div>
      </div>
    </>
  )
}

export const Editor: FC<any> = (props) => {

  console.log(props.post)

  const [post, setPost] = useState<any>(props.post);

  return (
    <>
      <BackBtn 
        onClick={() => {
          // 如果 post 与 props.post 不相等，则弹窗提示
          if (JSON.stringify(post) !== JSON.stringify(props.post)) {
            window.confirm("编辑内容未保存，确定返回吗？").valueOf() && window.history.back();
          } else {
            window.history.back()
          }
        }}
      />
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
      <div className={useClasses("text-xl w-full mt-12")} style={{ height: "calc(100% - 100px)" }}>
        <textarea
          id="postContent"
          placeholder="文章内容"
          onChange={
            () => {
              setPost({
                ...post,
                text: document.getElementById('postContent')?.value
              })
            }
          }
          defaultValue={post?.text}
          style={{ height: '100%', width: '100%' }}
        />
      </div>
    </>
  )
}