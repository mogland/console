/*
 * @FilePath: /nx-admin/src/pages/Home/index.tsx
 * @author: Wibus
 * @Date: 2022-07-12 16:27:14
 * @LastEditors: Wibus
 * @LastEditTime: 2022-07-12 18:23:52
 * Coding With IU
 */

import { Scrollbar } from "../../components/universal/Scrollbar"
import { StickyHeader } from "../../components/universal/StickyHeader"
import { NxLayout } from "../../components/universal/Layout"
import './index.css'

export const Home = () => {
  return (
    <div style={{left: "250px"}}>
      <Scrollbar>
        <NxLayout>
          <StickyHeader> 
            <h1 className="title font-bold">仪表盘</h1>
            
          </StickyHeader>
        </NxLayout>
      </Scrollbar>
    </div>
  )
}