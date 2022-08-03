/*
 * @FilePath: /nx-admin/src/pages/Pages/page.model.ts
 * @author: Wibus
 * @Date: 2022-07-26 20:37:45
 * @LastEditors: Wibus
 * @LastEditTime: 2022-07-26 20:42:57
 * Coding With IU
 */

export class PageModel {
  slug!: string; // 页面 slug
  title!: string; // 页面标题
  subtitle = ""; // 页面副标题
  text!: string; // 页面内容
  order?: number = 1; // 页面排序
}
