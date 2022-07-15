/*
 * @FilePath: /nx-admin/src/pages/Posts/list.tsx
 * @author: Wibus
 * @Date: 2022-07-15 18:45:35
 * @LastEditors: Wibus
 * @LastEditTime: 2022-07-15 21:02:24
 * Coding With IU
 */
import { Loading, Table } from "@geist-ui/core";
import { useState } from "react";
import { useLocation } from "react-router-dom"
import { useMount } from "react-use"
import Dashboards from "../../components/widgets/Dashboards"
import { NxPage } from "../../components/widgets/Page"
import { useStore } from "../../hooks/use-store";
import { BasicPage } from "../../types/basic"
import { apiClent } from "../../utils/request"

export const Posts: BasicPage = () => {
  const { search } = useLocation()
  const query = new URLSearchParams(search)

  const [list, setList] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  
  
  useMount(async () => {
    setList(await apiClent.get("/posts", null, [{ key: "page", value: query.get("page") || "1" }]).then(res => {setLoading(true); return res.data}))
  })
  console.log(list)
  loading ? list.forEach(item => {
    console.log(item)
    item.created = item.created.split("T")[0]
  }) : ""

  return (
    <NxPage title={"Posts"}>
      <Dashboards.Container className="lg:grid flex flex-col">
        <Dashboards.Area>
          {loading ? (<>
            <Table data={list}>
              <Table.Column label="标题" prop="id" />
              <Table.Column label="分类" prop="author" />
              <Table.Column label="标签" prop="author" />
              
              <Table.Column label="日期" prop="created" />
            </Table>

          </>) : (<Loading />)}
        </Dashboards.Area>
      </Dashboards.Container>
    </NxPage>
  )
}