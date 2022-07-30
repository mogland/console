/*
 * @FilePath: /nx-admin/src/pages/Friends/index.tsx
 * @author: Wibus
 * @Date: 2022-07-30 17:42:24
 * @LastEditors: Wibus
 * @LastEditTime: 2022-07-30 17:42:25
 * Coding With IU
 */
import { useClasses } from "@geist-ui/core"
import { useState } from "react"
import Dashboards from "../../components/widgets/Dashboards"
import { NxPage } from "../../components/widgets/Page"
import { BasicPage } from "../../types/basic"

export const Friends: BasicPage = () => {

  const [comments, setComments] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  return (
    <NxPage title={"Friends"}>
      <Dashboards.Container  className="lg:grid flex flex-col" gridTemplateColumns='1fr'>
        <Dashboards.Area className={useClasses("overflow-x-hidden")} style={{ overflow: "auto" }}>
          
        </Dashboards.Area>
      </Dashboards.Container>
    </NxPage>
  )
}