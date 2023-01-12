import { Save } from "@icon-park/react"
import clsx from "clsx"
import { useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { MarkdownEditor } from "../../components/universal/Editor"
import { FloatBtn, FloatBtnContainer } from "../../components/universal/FloatBtn"
import { Loading } from "../../components/universal/Loading"
import { Twindow } from "../../components/universal/Twindow"
import type { BasicPage } from "../../types/basic"
import { apiClient } from "../../utils/request"
import { getQueryVariable } from "../../utils/url"
import styles from "./index.module.css"

export const EditorPage: BasicPage = () => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<any>()
  const { type } = useParams()
  const navigate = useNavigate()
  const formRef = useRef<HTMLFormElement>(null)
  const id = getQueryVariable("id")

  useEffect(() => {
    if (!id) {
      setData({})
    }
  }, [id])

  useEffect(() => {
    if (!id) {
      setLoading(false)
      return;
    }
    apiClient(`/${type}/${id}`).then(res => {
      setData(res)
      setLoading(false)
    }).catch(() => {
      navigate('/posts')
    })
  }, [])
  return (
    <>
      <div className={clsx("loading", !loading && "loaded")}>
        {/* <Title>写 · {type === "page" ? "页面" : "文章"}</Title> */}
        <div className={styles.container}>
          <form className={styles.form} ref={formRef}>
            <input
              onChange={(e) => { setData({ ...data, title: e.target.value }) }}
              className={styles.title} type="text" name="title" placeholder="标题" defaultValue={data?.title} />
            <input
              onChange={(e) => { setData({ ...data, slug: e.target.value }) }}
              className={styles.slug} name="slug" placeholder="Slug" defaultValue={data?.slug} />
            {
              !loading && (
                <MarkdownEditor
                  initialValue={data?.text || " "}
                  height="calc(100vh - 200px)"
                  onChange={(value: string | undefined) => {
                    setData({
                      ...data,
                      text: value
                    })
                  }}
                />
              )
            }
            <FloatBtnContainer>
              <FloatBtn
                onClick={() => {
                  (apiClient(`${data.id ? `/${type}/${data.id}` : `/${type}`}`, {
                    method: data.id ? "PUT" : "POST",
                    body: JSON.stringify({
                      ...data,
                      categoryId: data.category_id
                    })
                  })).then(() => {
                    navigate(`/${type}s`)
                    Twindow({
                      title: `${type === "page" ? "页面" : "文章"}保存成功 - ${data.title}`,
                      text: "正在跳转...",
                    })
                  })
                }}
              >
                <Save />
              </FloatBtn>
            </FloatBtnContainer>
          </form>
        </div>
      </div>
    </>
  )
}