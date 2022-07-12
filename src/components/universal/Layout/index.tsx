/*
 * @FilePath: /nx-admin/src/universal/Layout/index.tsx
 * @author: Wibus
 * @Date: 2022-07-12 18:09:33
 * @LastEditors: Wibus
 * @LastEditTime: 2022-07-12 18:20:47
 * Coding With IU
 */
import './index.css'

export const NxLayout = (props: any) => {
  return (
    <div className="nx-layout" style={{...props.style, color: `rgba(${props.rgba ? props.rgba : "0,0,0"}, var(--tw-text-opacity))`}}>
      {props.children}
    </div>
  )
}