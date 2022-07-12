/*
 * @FilePath: /nx-admin/src/components/widgets/Sidebar/index.tsx
 * @author: Wibus
 * @Date: 2022-07-12 16:31:24
 * @LastEditors: Wibus
 * @LastEditTime: 2022-07-12 18:26:23
 * Coding With IU
 */
import { Dashboard, DocDetail, FileTextOne, Folder, MaterialTwo, Link as Files, WeixinPeopleNearby } from '@icon-park/react'
import { Link, useLocation } from 'react-router-dom'
import { NxLayout } from '../../universal/Layout'
import { Scrollbar } from '../../universal/Scrollbar'
import './index.css'

const SidebarScrollbar = (props: any) => {
  return (
    <Scrollbar style={{paddingLeft: "1rem"}}>
      <SidebarItem title='仪表盘' icon={<Dashboard />} path="/" />
      <SidebarItem title="文章" icon={<DocDetail />} path="/posts" />
      <SidebarItem title="页面" icon={<FileTextOne />} path="/pages" />
      <SidebarItem title="友链" icon={<WeixinPeopleNearby />} path="/materials" />
      <SidebarItem title="文件" icon={<Files />} path="/files" />
      <SidebarItem title='系统' icon={<MaterialTwo />} path="/system" />
    </Scrollbar>
  )
}

const SidebarItem = ({ title, icon, path = "/" }) => {
  return (
    <Link to={path}>
      <div className={`sidebar-item`} data-path={path}>
        <button className={`py-4 flex w-full items-center pl-2  ${useLocation().pathname === path ? "sidebar-item-active" : ""} `}>
          <span className="flex justify-center" style={{ flexBasis: "3rem" }}>
            {icon}
          </span>
          <span className="pl-2">{title}</span>
        </button>
      </div>
    </Link>
  )
}

export const Sidebar = () => {
  // 获取路由信息
  const location = useLocation()
  const pathname = location.pathname
  return (
    <div>
      <div className='fixed left-0 top-0 h-screen overflow-hidden z-10 text-white sidebar-drfop'>
        <div className='sidebar-title relative font-bold text-center text-2xl'>
          <h1 className='py-6'>
            愛すべき
          </h1>
        </div>
        <NxLayout rgba="255, 255, 255" >
          <SidebarScrollbar
            path={pathname}
          />
        </NxLayout>
        <button className='sidebar-bottom flex space-x-2 items-center transform translate-y-1/3 px-12'>
          <div className='sidebar-avatar' style={{ height: "50px", width: "50px" }}>
            <img className='rounded-full' src="https://tailwindcss.com/_next/static/media/adam.87b7f7dc7e16987ddbf37dd55b1ff705.jpg" alt="avatar" />
          </div>
          <span className='pl-4'>Wibus</span>
        </button>
      </div>
    </div>
  )
}

export default Sidebar