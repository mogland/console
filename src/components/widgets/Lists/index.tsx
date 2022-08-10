/*
 * @FilePath: /nx-admin/src/components/widgets/Lists/index.tsx
 * @author: Wibus
 * @Date: 2022-07-15 17:06:10
 * @LastEditors: Wibus
 * @LastEditTime: 2022-08-10 19:03:33
 * Coding With IU
 */
import { Table, Tabs } from "@geist-ui/core";
import { useState } from "react";
import { useMount } from "react-use";
import { apiClient } from "../../../utils/request";

export const Lists = () => {
  const [article, setArticle] = useState<any>();
  const [comments, setComments] = useState<any>();
  const [friends, setFriends] = useState<any>();
  useMount(async () => {
    await apiClient
      .get("/posts", null, [
        { key: "page", value: 1 },
        { key: "size", value: 5 },
      ])
      .then((res) => {
        // console.log(res)
        const { data } = res as any;
        const content = new Array();
        for (const index of Object.keys(data)) {
          content.push({
            title: data[index].title,
            // slug: data[index].slug,
            summary: data[index].summary?.substring(0, 10),
            category: data[index].category.name,
            created: data[index].created.split("T")[0],
          });
        }
        setArticle(content);
      });
    await apiClient
      .get("/comments", null, [
        { key: "page", value: 1 },
        { key: "size", value: 5 },
        { key: "status", value: 0 },
      ])
      .then((res) => {
        // console.log(res)
        const { data } = res as any;
        const content = new Array();
        for (const index of Object.keys(data)) {
          content.push({
            author: data[index].author,
            text: data[index].text,
            created: data[index].created.split("T")[0],
            ref_type:
              (data[index].ref_type === "Post" && "文章") ||
              (data[index].ref_type === "Page" && "页面"),
          });
        }
        setComments(content);
      });
    await apiClient
      .get("/links", null, [
        { key: "page", value: 1 },
        { key: "size", value: 5 },
        { key: "status", value: 0 },
      ])
      .then((res) => {
        // console.log(res)
        const { data } = res as any;
        const content = new Array();
        for (const index of Object.keys(data)) {
          content.push({
            name: data[index].name,
            description: data[index].description,
            url: data[index].url,
            created: data[index].created.split("T")[0],
          });
        }
        // console.log(content)
        setFriends(content);
      });
  });

  return (
    <Tabs initialValue="1">
      <Tabs.Item label="最近文章" value="1">
        <Table data={article ? article : []}>
          <Table.Column prop="title" label="标题" />
          <Table.Column prop="summary" label="描述" />
          <Table.Column prop="category" label="分类" />
          <Table.Column prop="created" label="时间" />
        </Table>
      </Tabs.Item>
      <Tabs.Item label="未读评论" value="2">
        <Table data={comments ? comments : []}>
          <Table.Column prop="author" label="评论者" />
          <Table.Column prop="text" label="内容" />
          <Table.Column prop="ref_type" label="种类" />
          <Table.Column prop="created" label="时间" />
        </Table>
      </Tabs.Item>
      <Tabs.Item label="未审友链" value="3">
        <Table data={friends ? friends : []}>
          <Table.Column prop="name" label="名称" />
          <Table.Column prop="description" label="描述" />
          <Table.Column prop="url" label="链接" />
          <Table.Column prop="created" label="时间" />
        </Table>
      </Tabs.Item>
    </Tabs>
  );
};
