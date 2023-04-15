import { BasicPage } from "@type/basic"
import clsx from "clsx"
import styles from "./index.module.css"

export const InternelServerErrorPage: BasicPage = () => {
  return (
    <div className={clsx(styles["container"])}>
      <div className={clsx(styles["content"])}>
        <h1 className={clsx(styles["title"])}>
          Mog Gateway 错误
        </h1>
        <p className={clsx(styles["description"])}>
          控制台似乎无法连接到 Mog 网关层，请检查 Mog 网关层的运行状态。
        </p>
      </div>
    </div>
  )
}