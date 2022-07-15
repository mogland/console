/*
 * @FilePath: /nx-admin/src/components/widgets/Sidebar/index.tsx
 * @author: Wibus
 * @Date: 2022-07-14 16:39:24
 * @LastEditors: Wibus
 * @LastEditTime: 2022-07-15 15:50:17
 * Coding With IU
 */
import { Drawer, useClasses } from '@geist-ui/core'
import { Home, List, File, Link as Links, ChevronDown, Edit, Feather, Package, Trello, Settings, AlignLeft } from '@geist-ui/icons'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
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
    <Link className={style.sidebarItem + " w-full flex flex-row items-center py-2 left-0"} to={props.path ? props.path : "/"}>
      <div className={style.sidebarItemIcon + " pr-4 justify-center"} style={{
        flexBasis: "1.2rem",
      }}>
        {props.icon}
      </div>
      <div className={style.sidebarItemTitle}>
        <span>{props.title}</span>
      </div>
    </Link>
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
  const location = useLocation()
  const pathname = location.pathname
  return (
    <Link className={useClasses(style.sidebarItem, "w-full flex flex-row items-center py-2 left-0", pathname == props.path ? style.active : null)} to={props.path ? props.path : "/"}>
      <div className={useClasses(style.sidebarItemIcon, "pr-4 justify-center")} style={{
        flexBasis: "1.2rem",
      }}>
        {props.icon}
      </div>
      <div className={useClasses(style.sidebarItemTitle)}>
        <span>{props.title}</span>
      </div>
    </Link>
  )
}

export const Sidebar = (props) => {
  return (
    <div className={useClasses(style.sidebar, props.block ? "": "hidden md:block")}>
      <div>
        <h1 className={useClasses('py-6 text-3xl font-light pl-10 pt-12')}>NEXT</h1>
      </div>
      <div className={useClasses("ml-20")}>
        <SidebarList>
          <SidebarItem icon={<Home />} title='Dashboard' path="/dashboard" />
          <SidebarItem icon={<Links />} title='Links' path="/links" />
        </SidebarList>
        <SidebarGroup icon={<Edit />} title='Posts' path="/posts">
          <SidebarGroupItem icon={<List />} title='List' path="/posts/list" />
          <SidebarGroupItem icon={<Feather />} title='Write' path="/posts/edit" />
        </SidebarGroup>

        <SidebarList>
          <SidebarItem icon={<File />} title='Files' path="/files" />
          <SidebarItem icon={<Package />} title='Plugins' path="/plugins" />
          <SidebarItem icon={<Trello />} title='Themes' path="/themes" />
          <SidebarItem icon={<Settings />} title='Settings' path="/settings" />
        </SidebarList>
      </div>
    </div>
  );
}

export const SidebarBtn = () => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <div className={useClasses("pl-6 py-5 float-right absolute md:hidden cursor-pointer")} onClick={() => { setOpen(!open) }}>
        <div className={useClasses(style.sidebarBtnIcon, "")}>
          <AlignLeft />
        </div>
      </div>
      <Drawer visible={open} onClose={() => { setOpen(false) }} placement="left" wrapClassName={useClasses(style.sidebar, style.sidebarPhone)}>
        <Sidebar block />
      </Drawer>
    </>
  )
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