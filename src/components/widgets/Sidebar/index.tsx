import {
  CategoryManagement,
  Comment,
  Dashboard,
  Editor,
  FolderFocusOne,
  FriendsCircle,
  HomeTwo,
  Login,
  Logout,
  MenuFoldOne,
  MenuUnfoldOne,
  OpenDoor,
  Schedule,
  Setting,
  Theme,
} from "@icon-park/react";
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

const Links = () => {
  const authenticated = useSnapshot(app).authenticated;
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate()

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
      <SidebarItem icon={HomeTwo({})} title="仪表盘" href={jump("/dashboard")} />
      <Space height={20} />
      <SidebarItem icon={Editor({})} title="文章" href={jump("/posts")} />
      <SidebarItem
        title="写文章"
        href={jump("/write/post")}
        sub
      />
      <SidebarItem title="朋友动态" href={jump("/posts/friends")} sub />
      <Space height={20} />
      <SidebarItem icon={OpenDoor({})} title="页面" href={jump("/pages")} />
      <SidebarItem
        title="新增页面"
        href={jump("/write/page")}
        sub
      />
      <Space height={20} />
      <SidebarItem icon={Comment({})} title="评论" href={jump("/comments")} />
      <SidebarItem
        icon={CategoryManagement({})}
        title="分类标签"
        href={jump("/categories")}
      />
      <SidebarItem icon={FriendsCircle({})} title="朋友们" href={jump("/friends")} />
      <Space height={20} />
      <SidebarItem icon={Theme({})} title="主题" href={jump("/themes")} />
      <SidebarItem icon={Setting({})} title="系统设置" href={jump("/settings")} />
      <SidebarItem icon={FolderFocusOne({})} title="文件管理" href={jump("/files")} />
      <SidebarItem icon={Schedule({})} title="定时任务" href={jump("/schedule")} />
      <SidebarItem icon={Dashboard({})} title="服务状态" href={jump("/status")} />
      <Space height={30} />
      <span
        className={clsx(itemStyle.item, styles.item)}
        onClick={() => {
          apiClient("/user/logout", {
            method: "POST",
          }).then(() => {
            removeCookie("token")
            app.authenticated = false;
            navigate(jump("/login"))
            mutate("/user/check")
            toast("退出成功")
          }).catch((e) => {
            console.log(e)
          })
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
              {!isMobile && (float ? <MenuFoldOne /> : <MenuUnfoldOne />)}
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
