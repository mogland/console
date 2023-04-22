import clsx from "clsx"
import styles from "./index.module.css"

interface IProps {
  title?: string,
  description?: string,
}

export const InternelServerErrorPage = (props: IProps) => {
  return (
    <div className={clsx(styles["container"])}>
      <div className={clsx(styles["content"])}>
        <h1 className={clsx(styles["title"])}>
          {props.title || "ERROR"}
        </h1>
        <p className={clsx(styles["description"])}>
          {props.description || "Console ERROR"}
        </p>
      </div>
    </div>
  )
}