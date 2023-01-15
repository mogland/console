import styles from "./index.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import clsx from "clsx";
import type { ReactElement } from "react";
import { useEffect, useState } from "react";

interface Prop {
  icon?: ReactElement;
  title: string;
  href: string;
  sub?: boolean;
  outside?: boolean;
  naive?: boolean; // 不使用 NavLink
}

export const SidebarItem: React.FC<Prop> = ({
  icon,
  title,
  href,
  sub,
  outside,
  naive,
}) => {
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  if (naive) {
    useEffect(() => {
      setActive(location?.href.includes(href));
    }, [location?.href]);
  }
  return (
    <>
      {outside || naive ? (
        <a
          href={href}
          className={clsx(
            styles.item,
            active && styles.active,
            sub && styles.sub
          )}
          target={(outside && "_blank") || "_self"}
          rel="noreferrer"
          onClick={(e) => {
            if (!naive || outside) return;
            e.preventDefault();
            navigate(href);
          }}
        >
          <div className={styles.icon}>{icon}</div>
          <div className={styles.title}>
            <span>{title}</span>
          </div>
        </a>
      ) : (
        <NavLink
          to={href}
          className={({ isActive }) =>
            clsx(styles.item, isActive && styles.active, sub && styles.sub)
          }
        >
          <div className={styles.icon}>{icon}</div>
          <div className={styles.title}>
            <span>{title}</span>
          </div>
        </NavLink>
      )}
    </>
  );
};
