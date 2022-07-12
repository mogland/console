/*
 * @FilePath: /nx-admin/src/universal/Layout/index.tsx
 * @author: Wibus
 * @Date: 2022-07-12 18:09:33
 * @LastEditors: Wibus
 * @LastEditTime: 2022-07-12 18:11:13
 * Coding With IU
 */
import './index.css'

export const NxLayout = (props: any) => {
  return (
    <div className="nx-layout">
      {props.children}
    </div>
  )
}