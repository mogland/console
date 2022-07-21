/*
 * @FilePath: /nx-admin/src/pages/Posts/list.tsx
 * @author: Wibus
 * @Date: 2022-07-15 18:45:35
 * @LastEditors: Wibus
 * @LastEditTime: 2022-07-21 23:32:39
 * Coding With IU
 */
import { Button, Loading, Table } from "@geist-ui/core";
import { useState } from "react";
import { message } from "react-message-popup";
import { useLocation } from "react-router-dom"
import { useMount } from "react-use"
import Dashboards from "../../components/widgets/Dashboards"
import { NxPage } from "../../components/widgets/Page"
import { useStore } from "../../hooks/use-store";
import { BasicPage } from "../../types/basic"
import { apiClient } from "../../utils/request"

export const Posts: BasicPage = () => {
  const { search } = useLocation()
  const query = new URLSearchParams(search)

  const [article, setArticle] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  
  useMount(async () => {
    await apiClient.get('/posts', null, [{ key: "page", value: 1 }, { key: "size", value: 10 }]).then(res => {
      console.log(res)
      const { data } = res as any
      const content = new Array()
      for (let index of Object.keys(data)) {
        content.push({
          title: data[index].title,
          category: data[index].category.name,
          tags: data[index].tags.length ? data[index].tags.toString() : '',
          read: data[index].count !== undefined && data[index].count.read !== undefined ? data[index].count.read : "0",
          like: data[index].count !== undefined && data[index].count.like !== undefined ? data[index].count.like : "0",
          created: data[index].created.split('T')[0],
          modified: data[index].modified ? data[index].modified.split('T')[0] : '-',
        })
      }
      setArticle(content)
      setLoading(false)
    })
  })


  const renderAction = (value, rowData, index) => {
    const removeHandler = () => {
      setArticle(article.filter(item => item.title !== rowData.title))
      message.success(`${rowData.title} 删除成功`)
    }
    return (
      <Button type="error" auto scale={1/3} font="12px" onClick={removeHandler}>Remove</Button>
    )
  }

  return (
    <NxPage title={"Posts"}>
      <Dashboards.Container className="lg:grid flex flex-col" gridTemplateColumns='1fr'>
        <Dashboards.Area>
          {!loading ? (<>
            <Table data={article}>
              <Table.Column label="标题" prop="title" />
              <Table.Column label="分类" prop="category" />
              <Table.Column label="标签" prop="tags" />
              <Table.Column label="阅读数" prop="read" />
              <Table.Column label="喜欢数" prop="like" />
              <Table.Column label="创建于" prop="created" />
              <Table.Column label="修改于" prop="modified" />
              <Table.Column label="操作" prop="action" render={renderAction} />
            </Table>

          </>) : (<Loading />)}
        </Dashboards.Area>
      </Dashboards.Container>
    </NxPage>
  )
}