/*
 * @FilePath: /nx-admin/src/components/widgets/Sidebar/index.tsx
 * @author: Wibus
 * @Date: 2022-07-14 16:39:24
 * @LastEditors: Wibus
 * @LastEditTime: 2022-07-14 16:52:56
 * Coding With IU
 */
import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal } from 'react';
import style from './index.module.css'

export const Sidebar = () => {
  return (
    <div className={style.sidebar}>
      <div>
        <h1 className='py-6 text-3xl font-light pl-10 pt-12'>NEXT</h1>
      </div>
    </div>
  );
}

export const hasSide = (props: any) => {
  return (
    <div className={style.hasSidebar}>
      <Sidebar />
      ${props.children}
    </div>
  )
}

export default Sidebar;