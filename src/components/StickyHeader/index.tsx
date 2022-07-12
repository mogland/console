/*
 * @FilePath: /nx-admin/src/components/StickyHeader/index.tsx
 * @author: Wibus
 * @Date: 2022-07-12 18:04:56
 * @LastEditors: Wibus
 * @LastEditTime: 2022-07-12 18:06:10
 * Coding With IU
 */

export const StickyHeader = (prop: any) => {
  return (
    <div className="sticky-header">
      {prop.children}
    </div>
  )
}