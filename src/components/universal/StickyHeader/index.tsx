/*
 * @FilePath: /nx-admin/src/components/StickyHeader/index.tsx
 * @author: Wibus
 * @Date: 2022-07-12 18:04:56
 * @LastEditors: Wibus
 * @LastEditTime: 2022-07-12 18:22:15
 * Coding With IU
 */
import './index.css'

export const StickyHeader = (prop: any) => {
  return (
    <div className="sticky-header">
      {prop.children}
    </div>
  )
}