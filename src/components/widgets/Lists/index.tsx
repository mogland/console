/*
 * @FilePath: /nx-admin/src/components/widgets/Lists/index.tsx
 * @author: Wibus
 * @Date: 2022-07-15 17:06:10
 * @LastEditors: Wibus
 * @LastEditTime: 2022-07-16 17:07:03
 * Coding With IU
 */
import { Table, Tabs, useClasses } from '@geist-ui/core';
import { useState } from 'react';
import { useMount } from 'react-use';
import { apiClient } from '../../../utils/request';
import style from './index.module.scss';


export const Lists = () => {

  const [article, setArticle] = useState<any>()
  const [comments, setComments] = useState<any>()
  const [friends, setFriends] = useState<any>()
  useMount(async () => {
    await apiClient.get('/posts', null, [{ key: "page", value: 1 }, { key: "size", value: 10 }]).then(res => {
      setArticle({
        title: res.data.title,
        summary: res.data.summary,
        slug: res.data.slug,
        categoryName: res.data.category.name,
      })
    })
    setComments(await apiClient.get('/comment', null, [{ key: "page", value: 1 }, { key: "size", value: 10 }, { key: "status", value: 0 }]))
    setFriends(await apiClient.get('/links', null, [{ key: "page", value: 1 }, { key: "size", value: 10 }, { key: "status", value: 0 }]))
  })

  return (
    <Tabs initialValue='1'>
      <Tabs.Item label="最近文章" value='1'>
        <Table data={article ? article : []}>
          <Table.Column prop="title" label='标题' />
          <Table.Column prop="summary" label='描述' />
          <Table.Column prop="slug" label='路径' />
          <Table.Column prop="category" label='分类' />
          {/* <Table.Column prop="created" label='时间' /> */}
        </Table>
      </Tabs.Item>
      <Tabs.Item label="未读评论" value='2'>
        <Table data={comments ? comments.data : []}>
          <Table.Column prop="ref_type" label='种类' />
          <Table.Column prop="author" label='评论者' />
          <Table.Column prop="text" label='内容' />
          <Table.Column prop="created" label='时间' />
          <Table.Column prop="ip" label='IP' />
        </Table>
      </Tabs.Item>
      <Tabs.Item label="未审友链" value='3'>
        <Table data={friends ? friends.data : []}>
          <Table.Column prop="name" label='名称' />
          <Table.Column prop="description" label='描述' />
          <Table.Column prop="url" label='链接' />
        </Table>
      </Tabs.Item>
    </Tabs>
  )
}