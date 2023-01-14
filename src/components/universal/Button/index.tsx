import clsx from "clsx"
import styles from "./index.module.css"

interface ButtonProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export const Button: React.FC<ButtonProps & React.HTMLAttributes<HTMLButtonElement> & React.PropsWithChildren<{}>> = (props) => {
  return (
    <button
      type="button"
      className={clsx(props.className, styles.button)}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  )
}