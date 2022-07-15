/*
 * @FilePath: /nx-admin/src/components/widgets/Lists/index.tsx
 * @author: Wibus
 * @Date: 2022-07-15 17:06:10
 * @LastEditors: Wibus
 * @LastEditTime: 2022-07-15 17:32:19
 * Coding With IU
 */
import { Table, Tabs, useClasses } from '@geist-ui/core';
import { Tab } from '@headlessui/react';
import { useState } from 'react';
import { useMount } from 'react-use';
import style from './index.module.scss';


export const Lists = () => {

  const [article, setArticle] = useState<any>()
  const [comments, setComments] = useState<any>()
  const [friends, setFriends] = useState<any>()
  useMount(() => {
    fetch("http://127.0.0.1:3333/posts?size=8&page=1")
      .then(res => res.json())
      .then(res => {
        setArticle(res.data)
      })
    // fetch("http://127.0.0.1:3333/comment?size=8&page=1")
  })

  return (
    <Tabs initialValue='1'>
      <Tabs.Item label="最近文章" value='1'>
        <Table data={article}>
          <Table.Column prop="title" label='标题' />
          <Table.Column prop="summary" label='描述' />
          <Table.Column prop="slug" label='路径' />
        </Table>
      </Tabs.Item>
      <Tabs.Item label="最近评论" value='2'></Tabs.Item>
      <Tabs.Item label="最近友链" value='3'></Tabs.Item>
    </Tabs>
  )
}