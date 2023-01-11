import { Agreement, CategoryManagement, Dashboard, Editor, FriendsCircle, GithubOne, HomeTwo, OpenDoor, Page, Search } from "@icon-park/react"
import { Space } from "../../universal/Space"
import styles from "./index.module.css"
import { SidebarItem } from "./item"

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
  return (
    <>
      <div className={styles.sidebar}>
        <div className={styles.header}>
          <div className={styles.logo}>
            Mog
          </div>
          <div className={styles.search}>
            <Search />
          </div>
        </div>
        <Links />
      </div>
    </>
  )
}