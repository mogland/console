import { Icon } from "@icon-park/react/lib/runtime"
import styles from "./index.module.css"
import { NavLink } from "react-router-dom"
import clsx from "clsx"
import { ReactElement } from "react"

interface Prop {
  icon?: ReactElement,
  title: string,
  href: string,
  sub?: boolean,
  outside?: boolean
}

export const SidebarItem: React.FC<Prop> = ({ icon, title, href, sub, outside }) => {

  return (
    <>
      {
        outside ? (
          <a href={href} className={styles.item} target="_blank">
            <div className={styles.icon}>
              {icon}
            </div>
            <div className={styles.title}>
              <span>{title}</span>
            </div>
          </a>
        ) : (
          <NavLink to={href} className={({ isActive }) => clsx(styles.item, isActive && styles.active, sub && styles.sub)}>
            <div className={styles.icon}>
              {icon}
            </div>
            <div className={styles.title}>
              <span>{title}</span>
            </div>
          </NavLink>
        )
      }
    </>
  )
}