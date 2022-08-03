/*
 * @FilePath: /nx-admin/src/pages/Posts/post.model.ts
 * @author: Wibus
 * @Date: 2022-07-25 19:17:33
 * @LastEditors: Wibus
 * @LastEditTime: 2022-07-26 20:33:31
 * Coding With IU
 */

export class PostModel {
  id!: string;
  slug = ""; // 博文 slug
  summary?: string = ""; // 博文摘要
  category_id!: string; // 博文分类 id（获取）
  categoryId: string = this.category_id; // 博文分类 id（上传）
  copyright?: boolean = true; // 博文版权提示
  tags?: string[] = []; // 博文标签
  title = ""; // 博文标题
  text = ""; // 博文内容
  hide?: boolean = false; // 博文是否隐藏
  password?: string | null = null; // 博文密码
  rss?: boolean = true; // 博文是否在 RSS 中显示
}
