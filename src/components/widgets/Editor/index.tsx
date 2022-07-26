/*
 * @FilePath: /nx-admin/src/components/widgets/Editor/index.tsx
 * @author: Wibus
 * @Date: 2022-07-23 23:47:19
 * @LastEditors: Wibus
 * @LastEditTime: 2022-07-26 11:39:58
 * Coding With IU
 */

import { AutoComplete, Drawer, useClasses } from "@geist-ui/core"
import { ArrowLeft, CloseSmall, Plus, Save, SettingConfig } from "@icon-park/react"
import { FC, useEffect, useState } from "react"
import CodeMirror from '@uiw/react-codemirror';
import { xcodeLight, xcodeDark } from '@uiw/codemirror-theme-xcode';
import { javascript } from '@codemirror/lang-javascript';
import { highlightActiveLine, highlightActiveLineGutter, keymap, lineNumbers, } from "@codemirror/view";
import {
  defaultKeymap,
  history,
  historyKeymap,
  indentWithTab,
} from '@codemirror/commands'
import { bracketMatching, indentOnInput } from "@codemirror/language";
import { oneDark } from "@codemirror/theme-one-dark";
import { markdown, markdownKeymap, markdownLanguage } from "@codemirror/lang-markdown";
import { githubLight } from '@ddietr/codemirror-themes/theme/github-light'
import { githubDark } from '@ddietr/codemirror-themes/theme/github-dark'
import { languages } from "@codemirror/language-data";
import './index.css'
import tagStyles from '../Tag/index.module.css'
import { Tags } from "../Tag";
import { syntaxTheme } from "./syntaxTheme";
import { PostModel } from "../../../pages/Posts/post.model";


export const BackBtn = (props) => {
  return (
    <>
      <div
        className={useClasses("pl-6 py-5 float-right absolute right-0 bottom-3 cursor-pointer z-10")}
        onClick={() => props.onClick()}
      >
        <div style={{
          // backgroundColor: "rgba(60, 60, 60, 0.6)",
          padding: "8px",
          borderRadius: "15%",
        }}>
          <ArrowLeft /> &nbsp;&nbsp;返回
        </div>
      </div>
    </>
  )
}

export const SendBtn = (props) => {
  return (
    <>
      <div
        className={useClasses("pl-6 py-5 float-right absolute right-0 bottom-28 cursor-pointer z-10")}
        onClick={() => props.onClick()}
      >
        <div style={{
          // backgroundColor: "rgba(60, 60, 60, 0.6)",
          padding: "8px",
          borderRadius: "15%",
        }}>
          <Save /> &nbsp;&nbsp;{props.new ? "发布" : "更新"}
        </div>
      </div>
    </>
  )
}


export const Editor: FC<any> = (props) => {
  const [stateDrawer, setStateDrawer] = useState(false)
  const [post, setPost] = useState<PostModel>(new PostModel() || props.post);
  useEffect(() => {
    setPost(props.post || new PostModel())
  }, [props.post])
  console.log(post)
  return (
    <>
      <SendBtn
        new={props.post ? Object.keys(props.post).length === 0 ? true : false : true}
        onClick={props.submit}
      />


      <>
        <div
          className={useClasses("pl-6 py-5 float-right absolute right-0 bottom-16 cursor-pointer z-10")}
          onClick={() => {
            setStateDrawer(!stateDrawer)
          }}
        >
          <div style={{
            // backgroundColor: "rgba(60, 60, 60, 0.6)",
            padding: "8px",
            borderRadius: "15%",
          }}>
            <SettingConfig /> &nbsp;&nbsp;配置
          </div>
        </div>

        <Drawer visible={stateDrawer} onClose={() => setStateDrawer(false)} placement={'right'} width={"20rem"}>
          <Drawer.Content>
            <div className="postTags">
              {post && post.tags !== undefined && post.tags.length !== 0 && post.tags.map((tag, index) => {
                return (
                  <span className={useClasses(tagStyles.editTag)} key={"Tag" + index}>
                    {tag}
                    <span className={useClasses(tagStyles.editTagAction)} onClick={() => {
                      setPost({
                        ...post,
                        tags: post.tags!.filter((item, i) => i !== index)
                      })
                    }}>
                      <CloseSmall />
                    </span>
                  </span>
                )
              }
              )}
              <style>
                {`
                .auto-complete {
                  display: none;
                }
              `}
              </style>
              <AutoComplete
                id="tagInput"
                hidden
                clearable
                placeholder={"标签名字"}
                style={{
                  display: "none"
                }}
                // clearable
                onKeyDown={
                  (e) => {
                    if (e.keyCode === 13) {
                      setPost({
                        ...post,
                        tags: [...post.tags!, e.target.value]
                      })
                      e.target.value = ""
                      // 恢复 hidden
                      document.getElementById("tagInput")!.hidden = true
                      document.getElementById("tagInput")!.style.display = "none"
                      document.getElementsByClassName("auto-complete")[0]!.style.display = "none"
                    }
                    if (e.keyCode === 27) {
                      e.target.value = ""
                      document.getElementById("tagInput")!.hidden = true
                      document.getElementById("tagInput")!.style.display = "none"
                      document.getElementsByClassName("auto-complete")[0]!.style.display = "none"
                    }
                  }
                } />
              <span className={useClasses(tagStyles.editTag, tagStyles.editTagPlus)} onClick={() => {
                document.getElementById("tagInput")!.hidden = false
                document.getElementById("tagInput")!.style.display = "inherit"
                document.getElementsByClassName("auto-complete")[0]!.style.display = "inherit"
              }}>
                <span className={useClasses(tagStyles.editTagAction)}>
                  <Plus />
                </span>
                New
              </span>
            </div>
          </Drawer.Content>
        </Drawer>
      </>


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
          style={{
            width: "100%"
          }}
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
      <CodeMirror
        theme={
          window.matchMedia("(prefers-color-scheme: light)").matches ? githubLight : githubDark
        }
        style={{
          fontSize: "1.2em",
        }}
        value={post?.text}
        extensions={[
          highlightActiveLineGutter(),
          highlightActiveLine(),
          lineNumbers(),
          history(),
          indentOnInput(),
          bracketMatching(),
          markdown({
            base: markdownLanguage,
            codeLanguages: languages,
            addKeymap: true
          }),
          keymap.of([
            ...defaultKeymap,
            ...markdownKeymap,
            ...historyKeymap,
            indentWithTab,
          ]),
          keymap.of([
            {
              key: 'Mod-s',
              run() {
                return false
              },
              preventDefault: true,
            },
          ]),
          syntaxTheme,
        ]}
        tabIndex={2}
        onChange={(value) => {
          setPost({
            ...post,
            text: value
          })
        }}
      />
    </>
  )
}