import { AddOne, Clear, Delete, Edit } from "@icon-park/react";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loading } from "../../../components/universal/Loading";
import { Title } from "../../../components/universal/Title";
import type { BasicPage } from "../../../types/basic";
import { apiClient } from "../../../utils/request";
import { TableContainer, TableItem, TableItemValue } from "../../Home/universal";
import styles from "../../Posts/Index/index.module.css"

export const PagesIndex: BasicPage = () => {
  const [loading, setLoading] = useState(true)
  const [select, setSelect] = useState<string[]>([]) // 选择的页面
  const navigate = useNavigate()
  const [data, setData] = useState<{
    data: any[];
    pagination: any;
  }>({
    data: [],
    pagination: {},
  })

  useEffect(() => {
    apiClient("/page").then((res) => {
      setData(res)
      setLoading(false)
    })
  }, [])

  return (
    <>

      <div style={{
        width: "100%",
      }}>
        <Loading loading={loading} />
        <div className={clsx("loading", !loading && "loaded")}>
          <Title>
            <div className={styles.head}>
              <span>页面 · 列表</span>
              <div>
                {
                  select.length && <button
                    className={styles.button}
                    onClick={() => {
                      setSelect([])
                      const items = document.querySelectorAll(".item")
                      items.forEach((item) => {
                        item.classList.remove(styles.select)
                      })
                    }}
                  ><Clear /></button> || null
                }
                {
                  select.length && <button
                    className={styles.button}
                    onClick={(e) => {
                      if (e.currentTarget.classList.contains(styles.confrim)) {
                        // select.forEach((item) => {
                        //   apiClient(`/page/${item}`, {
                        //     method: "DELETE",
                        //   })
                        // })
                        setSelect([])
                        document.querySelectorAll(`.${styles.select}`).forEach((item) => {
                          item.remove()
                        })
                      } else {
                        e.currentTarget.classList.add(styles.confrim)
                      }
                    }}
                  ><Delete /></button> || null
                }
                {
                  select.length === 1 && <button 
                  className={styles.button}
                  onClick={() => {
                    navigate(`/write/page?id=${select[0]}`)
                  }}
                  ><Edit /></button> || null
                }
                <button 
                  className={styles.button}
                  onClick={() => {
                    navigate("/write/page")
                  }}
                ><AddOne /></button>
              </div>
            </div>
          </Title>
          <TableContainer
            className={styles.table}
            style={{ marginTop: "20px" }}
            header={["TITLE", "DATE"]}
          >
            {
              data.data.map((item, index) => {
                return <TableItem
                  onClick={(e: React.MouseEvent) => {
                    if (e.currentTarget.classList.contains(styles.select)) {
                      setSelect(select.filter((i) => i !== item.id))
                      console.log(select)
                    } else {
                      setSelect([...select, item.id])
                    }
                    e.currentTarget.classList.toggle(styles.select)
                  }}
                  header={["TITLE", "DATE"]}
                  className={clsx(styles.tableItem)}
                  style={{ width: "inherit" }}
                  key={index}>
                  <TableItemValue> {item.title} </TableItemValue>
                  <TableItemValue> {item.created.split("T")[0]} </TableItemValue>
                </TableItem>
              })
            }
          </TableContainer>
          <div className={styles.nav}>
            {
              data.pagination.has_prev_page && <button className={styles.button}>上一页</button> || null
            }
            {
              data.pagination.has_next_page && <button className={styles.button}>下一页</button> || null
            }
          </div>
        </div>
      </div>
    </>
  )
}