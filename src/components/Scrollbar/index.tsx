/*
 * @FilePath: /nx-admin/src/components/Scrollbar/index.tsx
 * @author: Wibus
 * @Date: 2022-07-12 18:01:50
 * @LastEditors: Wibus
 * @LastEditTime: 2022-07-12 18:03:56
 * Coding With IU
 */
import './index.css'

export const Scrollbar = (props: any) => {
  return (
    <div role={"none"} className="scrollbar">
      <div className='scrollbar-container'>
        <div className='scrollbar-content'>
          {props.children}
        </div>
      </div>
    </div>
  )
}