/*
 * @FilePath: /nx-admin/src/pages/Pages/list.tsx
 * @author: Wibus
 * @Date: 2022-07-22 14:13:18
 * @LastEditors: Wibus
 * @LastEditTime: 2022-07-22 21:50:48
 * Coding With IU
 */
/*
 * @FilePath: /nx-admin/src/pages/Posts/list.tsx
 * @author: Wibus
 * @Date: 2022-07-15 18:45:35
 * @LastEditors: Wibus
 * @LastEditTime: 2022-07-22 14:11:51
 * Coding With IU
 */
import { Button, Loading, Modal, Spacer, Table, useClasses, useModal } from "@geist-ui/core";
import { useState } from "react";
import { message } from "react-message-popup";
import { Link, useLocation } from "react-router-dom"
import { useMount } from "react-use"
import Dashboards from "../../components/widgets/Dashboards"
import { NxPage } from "../../components/widgets/Page"
import { useStore } from "../../hooks/use-store";
import { BasicPage } from "../../types/basic"
import { apiClient } from "../../utils/request"

export const Pages: BasicPage = () => {
  const { search } = useLocation()
  const query = new URLSearchParams(search)

  const [article, setArticle] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const { visible, setVisible, bindings } = useModal()
  const [deleteIndex, setDeleteIndex] = useState<number>(-1)

  useMount(async () => {
    await apiClient.get('/page', null, [{ key: "page", value: 1 }, { key: "size", value: 10 }]).then(res => {
      // console.log(res)
      const { data } = res as any
      const content = new Array()
      for (let index of Object.keys(data)) {
        content.push({
          id: data[index].id,
          title: data[index].title,
          subtitle: data[index].subtitle,
          slug: data[index].slug,
          created: data[index].created.split('T')[0],
          modified: data[index].modified ? data[index].modified.split('T')[0] : '-',
        })
      }
      setArticle(content)
      setLoading(false)
    })
  })

  const removeHandler = () => {
    if (deleteIndex === -1) {
      message.error("请选择要删除的文章")
      return
    }
    setArticle(article.filter((_, index) => index !== deleteIndex))
    message.success(`${article[deleteIndex].title} 删除成功`)
    setDeleteIndex(-1)
    setVisible(false)
  }

  const renderAction = (value, rowData, index) => {
    return (
      <>
      <Button auto scale={1 / 3} font="12px">
        <Link to={`/pages/edit/${article[index].id}`} style={{ padding: 0, color: "inherit" }}>Edit</Link>
      </Button>
      <Spacer />
      <Button type="error" auto scale={1 / 3} font="12px" onClick={() => { setVisible(true); setDeleteIndex(index) }}>Remove</Button>
      </>
    )
  }

  const renderTitle = (value, rowData, index) => {
    return (
      <Link 
      style={{
        padding: 0
        }} 
      to={`/pages/edit/${article[index].id}`}
      >
        {value}
      </Link>
    )
  }

  return (
    <NxPage title={"Pages"}>
      <Dashboards.Container className="lg:grid flex flex-col" gridTemplateColumns='1fr'>
        <Dashboards.Area  className={useClasses("overflow-x-hidden")} style={{overflow: "auto"}}>
          {!loading ? (<>
            <Table data={article}>
              <Table.Column label="标题" prop="title" render={renderTitle} />
              <Table.Column label="副标题" prop="subtitle" />
              <Table.Column label="路径" prop="slug" />
              <Table.Column label="创建于" prop="created" />
              <Table.Column label="修改于" prop="modified" />
              <Table.Column label="操作" prop="action" render={renderAction} />
            </Table>

          </>) : (<Loading />)}
          <Modal {...bindings}>
            <Modal.Title>删除文章</Modal.Title>
            <Modal.Subtitle>
              确定要删除吗？
            </Modal.Subtitle>
            <Modal.Action passive onClick={() => setVisible(false)}>取消</Modal.Action>
            <Modal.Action onClick={removeHandler}>确定</Modal.Action>
          </Modal>
        </Dashboards.Area>
      </Dashboards.Container>
    </NxPage>
  )
}