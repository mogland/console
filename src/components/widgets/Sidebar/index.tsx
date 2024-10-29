import { Login, Logout, MenuFoldOne, MenuUnfoldOne } from "@icon-park/react";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { Space } from "@components/universal/Space";
import styles from "./index.module.css";
import { SidebarItem } from "./item";
import { motion } from "framer-motion";
import { getStorage, setStorage } from "@utils/storage";
import { useWindowSize } from "react-use";
import itemStyle from "./item/index.module.css";
import { useSnapshot } from "valtio";
import { app } from "@states/app";
import { useNavigate } from "react-router-dom";
import { apiClient } from "@utils/request";
import { removeCookie } from "@utils/cookie";
import { jump } from "@utils/path";
import { mutate } from "swr";
import { toast } from "sonner";
import { SIDEBAR } from "../../../sidebar";

const Links = () => {
  const authenticated = useSnapshot(app).authenticated;
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (authenticated) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [authenticated]);
  return (
    <div
      className={clsx(styles.links, {
        [styles.disabled]: disabled,
      })}
    >
      {SIDEBAR.map((item, index) => (
        <>
          {item.map((item) => (
            <>
              <SidebarItem
                icon={item.icon({})}
                title={item.title}
                href={jump(item.path)}
                key={item.title}
              />
              {item.subItems?.map((item) => (
                <SidebarItem
                  title={item.title}
                  href={jump(item.path)}
                  key={item.title}
                  sub
                />
              ))}
            </>
          ))}
          <Space key={index} height={20} />
        </>
      ))}
      <Space height={30} />
      <span
        className={clsx(itemStyle.item, styles.item)}
        onClick={() => {
          apiClient("/user/logout", {
            method: "POST",
          })
            .then(() => {
              removeCookie("token");
              app.authenticated = false;
              navigate(jump("/login"));
              mutate("/user/check");
              toast("退出成功");
            })
            .catch((e) => {
              console.log(e);
            });
        }}
      >
        <div className={itemStyle.icon}>
          {authenticated ? Logout({}) : Login({})}
        </div>
        <div className={itemStyle.title}>
          {authenticated ? "退出" : "前往"}
          登录
        </div>
      </span>
    </div>
  );
};

export const Sidebar: React.FC = () => {
  const [float, setFloat] = useState(
    getStorage("sidebarFloat") === "true" || false
  );
  const [isMobile, setIsMobile] = useState(false);
  const [x, setX] = useState(0);
  const { width } = useWindowSize();

  function setXEnterByFloat() {
    if (float) setX(0);
  }
  function setXLeaveByFloat() {
    if (float) setX(-300);
  }

  useEffect(() => {
    setStorage("sidebarFloat", String(float));
  }, [float]);

  useEffect(() => {
    if (width < 768) {
      setFloat(true);
      setIsMobile(true);
      setX(-300);
    }
  }, [width]);
  return (
    <>
      <motion.div
        className={clsx(styles.sidebar, float && styles.float)}
        initial={{ x: -300 }}
        animate={{ x }}
        transition={{
          type: "spring",
          duration: 0.2,
          bounce: 0.5,
          damping: 15,
        }}
        onMouseEnter={setXEnterByFloat}
        onMouseLeave={setXLeaveByFloat}
        onTouchStart={setXEnterByFloat}
        onTouchEnd={setXLeaveByFloat}
      >
        <div className={clsx(styles.header)}>
          <div className={styles.headerInner}>
            <div className={styles.logo}>Mog</div>
            <div className={styles.search} onClick={() => setFloat(!float)}>
              {/* {!isMobile && } */}
              {float ? <MenuFoldOne /> : <MenuUnfoldOne />}
            </div>
          </div>
        </div>
        <div className={styles.inner}>
          <Links />
        </div>
      </motion.div>
    </>
  );
};
