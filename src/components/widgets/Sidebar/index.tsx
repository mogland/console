import { Agreement, CategoryManagement, Dashboard, Editor, FriendsCircle, GithubOne, HomeTwo, MenuFoldOne, MenuUnfoldOne, OpenDoor, Page, Search } from "@icon-park/react"
import clsx from "clsx"
import { useEffect, useState } from "react"
import { Space } from "../../universal/Space"
import styles from "./index.module.css"
import { SidebarItem } from "./item"
import { motion } from 'framer-motion'
import { getStorage, setStorage } from "../../../utils/storage"
import { useWindowSize } from "react-use"

const Links = () => {
  return (
    <div className={styles.links}>
      <SidebarItem
        icon={HomeTwo({})}
        title="仪表盘"
        href="/"
      />
      <SidebarItem
        icon={Page({})}
        title="前往站点"
        href="https://github.com"
        outside
      />
      <Space
        height={20}
      />
      <SidebarItem
        icon={Editor({})}
        title="文章"
        href="/posts"
      />
      <SidebarItem
        title="草稿箱"
        href="/posts?types=drafts"
        sub
      />
      <SidebarItem
        title="已发布"
        href="/posts?types=published"
        sub
      />
      <SidebarItem
        title="朋友动态"
        href="/posts?types=friends"
        sub
      />
      <Space
        height={20}
      />
      <SidebarItem
        icon={OpenDoor({})}
        title="页面"
        href="/pages"
      />
      <SidebarItem
        icon={CategoryManagement({})}
        title="分类标签"
        href="/categories"
      />
      <SidebarItem
        icon={FriendsCircle({})}
        title="朋友们"
        href="/friends"
      />
      <Space
        height={20}
      />
      <SidebarItem
        icon={Dashboard({})}
        title="服务状态"
        href="/status"
      />
      <SidebarItem
        icon={GithubOne({})}
        title="前往文档"
        href="https://github.com"
        outside
      />
    </div>
  )
}

export const Sidebar: React.FC = () => {
  const [float, setFloat] = useState(getStorage('sidebarFloat') === "true" || false)
  const [isMobile, setIsMobile] = useState(false)
  const [x, setX] = useState(0)
  const { width } = useWindowSize()

  function setXEnterByFloat() {
    if (float) setX(0)
  }
  function setXLeaveByFloat() {
    if (float) setX(-300)
  }

  useEffect(() => {
    setStorage('sidebarFloat', String(float))
  }, [float])

  useEffect(() => {
    if (width < 768) {
      setFloat(true)
      setIsMobile(true)
      setX(-300)
    }
  }, [width])
  return (
    <>
      <motion.div
        className={clsx(
          styles.sidebar,
          float && styles.float
        )}
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
        <div className={styles.header}>
          <div className={styles.logo}>
            Mog
          </div>
          <div
            className={styles.search}
            onClick={() => setFloat(!float)}
          >
            {
              !isMobile && (float ? <MenuFoldOne /> : <MenuUnfoldOne />)
            }
          </div>
        </div>
        <Links />
      </motion.div>
    </>
  )
}