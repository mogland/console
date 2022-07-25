/*
 * @FilePath: /nx-admin/src/pages/Posts/post.model.ts
 * @author: Wibus
 * @Date: 2022-07-25 19:17:33
 * @LastEditors: Wibus
 * @LastEditTime: 2022-07-25 19:26:08
 * Coding With IU
 */


export class PostModel {
  slug!: string; // 博文 slug
  summary?: string; // 博文摘要 
  categoryId!: string; // 博文分类 id
  copyright?: boolean = true; // 博文版权提示
  tags?: string[] = []; // 博文标签
  title!: string; // 博文标题
  text!: string; // 博文内容
  hide?: boolean = false; // 博文是否隐藏
  password?: string | null = null; // 博文密码
  rss?: boolean = true; // 博文是否在 RSS 中显示
}