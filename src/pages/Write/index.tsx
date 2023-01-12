import clsx from "clsx"
import { useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { MilkdownEditor } from "../../components/universal/Editor"
import { Loading } from "../../components/universal/Loading"
import { Title } from "../../components/universal/Title"
import { BasicPage } from "../../types/basic"
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
      <Loading loading={loading} />
      <div className={clsx("loading", !loading && "loaded")}>
        {/* <Title>写 · {type === "page" ? "页面" : "文章"}</Title> */}
        <div className={styles.container}>
          <form className={styles.form} ref={formRef}>
            <input className={styles.title} type="text" name="title" placeholder="标题" defaultValue={data?.title} />
            <input className={styles.slug} name="slug" placeholder="Slug" defaultValue={data?.slug} />
            <MilkdownEditor
              defaultValue={data?.text || ""}
            />
          </form>
        </div>
      </div>
    </>
  )
}