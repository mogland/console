/*
 * @FilePath: /nx-admin/src/components/widgets/Editor/index.tsx
 * @author: Wibus
 * @Date: 2022-07-23 23:47:19
 * @LastEditors: Wibus
 * @LastEditTime: 2022-07-24 09:49:21
 * Coding With IU
 */

import { useClasses } from "@geist-ui/core"
import { ArrowLeft } from "@icon-park/react"
import { FC, useState } from "react"
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
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language'
import type { Extension } from '@codemirror/state'
import { EditorView } from '@codemirror/view'
import { tags } from '@lezer/highlight'
import { languages } from "@codemirror/language-data";

export const syntaxHighlightingStyle = HighlightStyle.define([
  {
    tag: tags.heading1,
    fontSize: '1.4em',
    fontWeight: 'bold',
  },
  {
    tag: tags.heading2,
    fontSize: '1.3em',
    fontWeight: 'bold',
  },
  {
    tag: tags.heading3,
    fontSize: '1.2em',
    fontWeight: 'bold',
  },
  {
    tag: tags.heading4,
    fontSize: '1.1em',
    fontWeight: 'bold',
  },
  {
    tag: tags.heading5,
    fontSize: '1.1em',
    fontWeight: 'bold',
  },
  {
    tag: tags.heading6,
    fontSize: '1.1em',
    fontWeight: 'bold',
  },
  { tag: tags.strong, fontWeight: 'bold' },
  { tag: tags.emphasis, fontStyle: 'italic' },
  { tag: tags.deleted, textDecoration: 'line-through' },
])

export const syntaxTheme: Extension = [
  EditorView.theme({}),
  syntaxHighlighting(syntaxHighlightingStyle),
]


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
      <CodeMirror
        theme={
          window.matchMedia("(prefers-color-scheme: light)").matches ? githubLight : oneDark
        }
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