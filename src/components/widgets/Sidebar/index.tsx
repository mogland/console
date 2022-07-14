/*
 * @FilePath: /nx-admin/src/components/widgets/Sidebar/index.tsx
 * @author: Wibus
 * @Date: 2022-07-14 16:39:24
 * @LastEditors: Wibus
 * @LastEditTime: 2022-07-14 21:52:53
 * Coding With IU
 */
import { useClasses } from '@geist-ui/core'
import { Home, List, File, Link, ChevronDown, Edit, Feather, Package, Trello, Settings } from '@geist-ui/icons'
import style from './index.module.css'

export const SidebarGroup = (props) => {
  return (
    <>
      <div className={style.sidebarItem + "  w-full flex items-center py-2 left-0 pt-8 " + style.sidebarGroup}>
        <div className={style.sidebarItemIcon + " pr-4 justify-center"} style={{
          flexBasis: "1.2rem",
        }}>
          {props.icon}
        </div>
        <div className={style.sidebarItemTitle}>
          <span>{props.title}</span>
          <div className={style.action}>
            <ChevronDown />
          </div>
        </div>
      </div>
      <div className={style.groupContent + " block"}>
        {props.children}
      </div>
      </>
  )
}

export const SidebarGroupItem = (props) => {
  return (
    <div className={style.sidebarItem + " w-full flex flex-row items-center py-2 left-0"}>
      <div className={style.sidebarItemIcon + " pr-4 justify-center"} style={{
        flexBasis: "1.2rem",
      }}>
        {props.icon}
      </div>
      <div className={style.sidebarItemTitle}>
        <span>{props.title}</span>
      </div>
    </div>
  )
}

export const SidebarList = (props) => {
  return (
    <div className={useClasses(style.sidebarList)}>
      {props.children}
    </div>
  )
}

export const SidebarItem = (props) => {
  return (
    <div className={useClasses(style.sidebarItem, "w-full flex flex-row items-center py-2 left-0")}>
      <div className={useClasses(style.sidebarItemIcon, "pr-4 justify-center")} style={{
        flexBasis: "1.2rem",
      }}>
        {props.icon}
      </div>
      <div className={useClasses(style.sidebarItemTitle)}>
        <span>{props.title}</span>
      </div>
    </div>
  )
}

export const Sidebar = () => {
  return (
    <div className={useClasses(style.sidebar)}>
      <div>
        <h1 className={useClasses('py-6 text-3xl font-light pl-10 pt-12')}>NEXT</h1>
      </div>
      <div className={useClasses("ml-20")}>
        <SidebarList>
          <SidebarItem icon={<Home />} title='Dashboard' />
          <SidebarItem icon={<Link />} title='Links' />
        </SidebarList>
        <SidebarGroup  icon={<Edit />} title='Posts'>
          <SidebarGroupItem icon={<List />} title='List'/>
          <SidebarGroupItem icon={<Feather />} title='Write'/>
        </SidebarGroup>
        
        <SidebarList>
          <SidebarItem  icon={<File />} title='Files' />
          <SidebarItem icon={<Package />} title='Plugins' />
          <SidebarItem icon={<Trello />} title='Themes' />
          <SidebarItem icon={<Settings />} title='Settings' />
        </SidebarList>
      </div>
    </div>
  );
}

export const hasSide = (props: any) => {
  return (
    <div className={useClasses(style.hasSidebar)}>
      <Sidebar />
      ${props.children}
    </div>
  )
}

export default Sidebar;