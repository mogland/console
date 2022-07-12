/*
 * @FilePath: /nx-admin/src/pages/Home/index.tsx
 * @author: Wibus
 * @Date: 2022-07-12 16:27:14
 * @LastEditors: Wibus
 * @LastEditTime: 2022-07-12 18:06:32
 * Coding With IU
 */

import { Scrollbar } from "../../components/Scrollbar"
import { StickyHeader } from "../../components/StickyHeader"


export const Home = () => {
  return (
    <div>
      <Scrollbar>
        <StickyHeader> 仪表盘 </StickyHeader>
      </Scrollbar>
    </div>
  )
}