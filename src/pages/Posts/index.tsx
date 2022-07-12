/*
 * @FilePath: /nx-admin/src/pages/Posts/index.tsx
 * @author: Wibus
 * @Date: 2022-07-12 16:28:44
 * @LastEditors: Wibus
 * @LastEditTime: 2022-07-12 18:28:58
 * Coding With IU
 */

import { NxLayout } from "../../components/universal/Layout"
import { Scrollbar } from "../../components/universal/Scrollbar"
import { StickyHeader } from "../../components/universal/StickyHeader"


export const Posts = () => {
  return (
    <div style={{left: "250px"}}>
      <Scrollbar>
        <NxLayout>
          <StickyHeader> 
            <h1 className="title font-bold">文章</h1>
            
          </StickyHeader>
        </NxLayout>
      </Scrollbar>
    </div>
  )
}