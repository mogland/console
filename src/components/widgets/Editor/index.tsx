/*
 * @FilePath: /nx-admin/src/components/widgets/Editor/index.tsx
 * @author: Wibus
 * @Date: 2022-07-23 23:47:19
 * @LastEditors: Wibus
 * @LastEditTime: 2022-07-26 13:23:41
 * Coding With IU
 */

import { AutoComplete, Collapse, Drawer, Input, Radio, Select, Spacer, Text, Toggle, useClasses } from "@geist-ui/core"
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
import { apiClient } from "../../../utils/request";
import { useMount } from "react-use";


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
  const [category, setCategory] = useState<any>()
  const [post, setPost] = useState<PostModel>(new PostModel() || props.post);
  useEffect(() => {
    setPost(props.post || new PostModel())
  }, [props.post])
  // 加载后
  useMount(() => {
    if (!category) {
      apiClient.get("/categories", null, [{ key: "type", value: "Category" }, { key: "joint", "value": 1 }]).then(res => {
        setCategory(res.data)
      })
    }
  })
  console.log("post",post)
  return (
    <>
      <SendBtn
        new={props.post ? Object.keys(props.post).length === 0 ? true : false : true}
        onClick={ () => {
          console.log(post)
        }}
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

        <Drawer visible={stateDrawer} onClose={() => setStateDrawer(false)} placement={'right'} width={"23rem"}>
          <Drawer.Content className="drawer-content">
          <Text h3>更多设置</Text>
          <hr />
            <div>
              <Text h4>分类</Text>
              <Select
                placeholder="选择分类"
                value={category ? post.category_id : undefined}
                onChange={(val) => {
                  setPost({ ...post, category_id: val as string })
                }}
              >
                <Select.Option disabled value="0">Fetching..</Select.Option>
                {
                  category && category.map((item: any) => {
                    return <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                  })
                }
              </Select>
            </div>
            <div>
              <Text h4>路径</Text>
              <Input
                placeholder={"填写文章路径"}
                value={post?.slug}
                onChange={(e) => {
                  setPost({ ...post, slug: e.target.value })
                }}
              />
            </div>
            <div>
              <Text h4>概要</Text>
              <Input
                placeholder={"填写文章概要"}
                value={post?.summary}
                onChange={(e) => {
                  setPost({ ...post, summary: e.target.value })
                }}
              />
            </div>
            <div className="postTags">
              <Text h4>标签</Text>
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

            <div>
              <Text h4>更多设置</Text>

              <Text h5>标注 CopyRight？</Text>
              <Toggle
                checked={post.copyright === true || post.copyright === false ? post.copyright : true}
                // defaultChecked={true}
                onChange={(val) => {
                  setPost({ ...post, copyright: val.target.checked })
                }}
              />


              <Text h5>是否隐藏？</Text>
              <Radio.Group
                value={post.hide === true || post.hide === false ? post.hide === true ? 1 : 0 : 0}
                onChange={(e) => {
                  // console.log(e === 1 ? true : false)
                  setPost({ ...post, hide: e === 1 ? true : false })
                }}
              >
                <Radio value={1}>
                  显示
                  <Radio.Description>
                    <Text>将会显示在全部接口中, <Text b>如果要隐藏于RSS接口中, 请在下方选择选项</Text></Text>
                  </Radio.Description>
                </Radio>
                <Radio value={0}>
                  隐藏
                  <Radio.Description>
                    <Text>将会从全部接口中隐藏, <Text b>包括 RSS 接口，届时下方选项将会失效</Text></Text>
                  </Radio.Description>
                </Radio>
              </Radio.Group>

              <Text h5>密码锁定？</Text>
              <Input.Password
                placeholder={"输入密码将自动锁定"}
                defaultValue={post?.password === null ? undefined : post?.password}
                onChange={(e) => {
                  setPost({ ...post, password: e.target.value })
                }}
              />
              <Spacer h={.5} />
              <Collapse
                title="温馨提示"
              >
                <Spacer h={.5} />
                <Text small i>若已设置密码将<Text b>显示已被加密过</Text>的密码</Text>
                <Spacer h={.5} />
                <Text small i>但输入密码您仅需输入<Text b>明文</Text>密码,</Text>
                <Spacer h={.5} />
                <Text small i>删除密码删除文本框内值即可</Text>
              </Collapse>
              <Text h5>是否显示于RSS？</Text>
              <Radio.Group
                value={post.rss === true || post.rss === false ? post.rss === true ? 1 : 0 : 0}
                onChange={(e) => {
                  setPost({ ...post, rss: e === 1 ? true : false })
                }}
              >
                <Radio value={1}>
                  显示
                  <Radio.Description>
                    <Text>将会显示在 RSS 接口中, <Text b>如果要隐藏于全部接口中, 请选择上方选项</Text></Text>
                  </Radio.Description>
                </Radio>
                <Radio value={0}>
                  隐藏
                  <Radio.Description>
                    <Text>将会从 RSS 接口中隐藏, <Text b>若你已选择了上方隐藏选项，选项将会失效</Text></Text>
                  </Radio.Description>
                </Radio>
              </Radio.Group>
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