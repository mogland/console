import clsx from "clsx";
import { Title } from "../../components/universal/Title";
import type { BasicPage } from "../../types/basic";
import styles from "./index.module.css"
import { Tab } from '@headlessui/react'
import { useEffect, useState } from "react";
import { apiClient } from "../../utils/request";
import { Loading } from "../../components/universal/Loading";
import { GridContainer, Widget, TableContainer, TableItem } from "./universal";
import { useNavigate } from "react-router-dom";


export const Home: BasicPage = () => {

  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const [total, setTotal] = useState<{
    posts: {
      data: any[],
      pagination: {
        total: number,
        [key: string]: number | boolean;
      }
    },
    comments: {
      data: any[],
      pagination: {
        total: number,
        [key: string]: number | boolean;
      }
    },
    pages: {
      data: any[],
      pagination: {
        total: number,
        [key: string]: number | boolean;
      }
    },
    friends: {
      [key: string]: number;
    }
  }>({
    posts: {
      data: [],
      pagination: {
        total: 0,
      }
    },
    comments: {
      data: [],
      pagination: {
        total: 0,
      }
    },
    pages: {
      data: [],
      pagination: {
        total: 0,
      }
    },
    friends: {
      pending: 0,
      approved: 0,
      trash: 0,
    },
  })

  useEffect(() => {
    Promise.all([
      apiClient("/friends/all", { query: { status: 0, } }), // pending
      apiClient("/friends/all", { query: { status: 1, } }), // approved
      apiClient("/friends/all", { query: { status: 3, } }), // trash
      apiClient("/post", { query: { size: 5 } }),
      apiClient("/comments", { query: { size: 5 } }).then(async res => {
        for (let i = 0; i < res.data.length; i++) {
          res.data[i].post = await apiClient(`/post/${res.data[i].pid}`)
        }
        return res;
      }),
      apiClient("/page")
    ]).then(res => {
      setTotal({
        posts: res[3],
        comments: res[4],
        pages: res[5],
        friends: {
          pending: res[0]?.data.length,
          approved: res[1]?.data.length,
          trash: res[2]?.data.length,
        },
      })
      setLoading(false)
    })
  }, [])


  return (
    <div>
      <Loading loading={loading} />
      <div className={clsx("loading", !loading && "loaded")}>
        <Title>
          仪表盘
        </Title>
        <GridContainer gridTemplateColumns="1fr 1fr 1fr" className={styles.total}>
          <div className={styles.totalItem}>
            <div className={styles.totalTitle}>
              总文章
            </div>
            <div className={styles.totalNumber}>
              {total.posts.pagination?.total}
            </div>
          </div>
          <div className={styles.totalItem}>
            <div className={styles.totalTitle}>
              总页面
            </div>
            <div className={styles.totalNumber}>
              {total.pages.pagination?.total}
            </div>
          </div>
          <div className={styles.totalItem}>
            <div className={styles.totalTitle}>
              总评论
            </div>
            <div className={styles.totalNumber}>
              {total.comments.pagination?.total}
            </div>
          </div>
        </GridContainer>
        <Widget>
          <div className={styles.widgetTitle}>
            {/* 每日访问总数 */}
            战绩统计
          </div>
          {/* <ReactECharts option={options} /> */}
          <GridContainer gridTemplateColumns="1fr 1fr 1fr" className={styles.chartDetail}>
            <div className={styles.totalItem}>
              <div className={clsx(styles.totalTitle, styles.chartTitle)}>
                当前友链数量
              </div>
              <div className={clsx(styles.totalNumber, styles.chartNumber)}>
                {total.friends.approved} 个
              </div>
            </div>
            <div className={styles.totalItem}>
              <div className={clsx(styles.totalTitle, styles.chartTitle)}>
                申请中友链数量
              </div>
              <div className={clsx(styles.totalNumber, styles.chartNumber)}>
                {total.friends.pending} 个
              </div>
            </div>
            <div className={styles.totalItem}>
              <div className={clsx(styles.totalTitle, styles.chartTitle)}>
                已拒绝友链数量
              </div>
              <div className={clsx(styles.totalNumber, styles.chartNumber)}>
                {total.friends.trash} 个
              </div>
            </div>
          </GridContainer>
        </Widget>
        <Widget>
          <Tab.Group>
            <Tab.List>
              <Tab className={styles.noOutline}>
                {({ selected }) => {
                  return (
                    <div className={clsx(styles.widgetTitle, !selected && styles.widgetTitleUnActive)}>
                      最近文章
                    </div>
                  )
                }}
              </Tab>
              <Tab className={styles.noOutline}>
                {
                  ({ selected }) => {
                    return (
                      <div className={clsx(styles.widgetTitle, !selected && styles.widgetTitleUnActive)}>
                        最近评论
                      </div>
                    )
                  }
                }
              </Tab>
            </Tab.List>
            <Tab.Panels className={styles.tabContent}>
              <Tab.Panel>
                <TableContainer
                  header={["TITLE", "DATE", "READ"]}
                >
                  {
                    total.posts.data?.map((item: any, index: number) => {
                      return (
                        <TableItem
                          header={["TITLE", "DATE", "READ"]}
                          onClick={() => {
                            navigate(`/write/post?id=${item.id}`)
                          }}
                          style={{ cursor: "pointer" }}
                          key={index}>
                          <span className={styles.tableItemTitle}>{item.title}</span>
                          <span className={styles.tableItemDate}>{item.created.split("T")[0]}</span>
                          <span className={styles.tableItemViews}>{item.count.read}</span>
                        </TableItem>
                      )
                    })
                  }
                </TableContainer>
              </Tab.Panel>
              <Tab.Panel>
                <TableContainer
                  header={["TEXT", "POST", "AUTHOR"]}
                >
                  {
                    total.comments.data?.map((item: any, index: number) => {
                      return (
                        <TableItem
                          header={["TEXT", "POST", "AUTHOR"]}
                          key={index}>
                          <span className={styles.tableItemTitle}>{item.text}</span>
                          <span className={styles.tableItemTitle}>{item.post?.title || "未找到"}</span>
                          <span className={styles.tableItemViews}>{item.author}</span>
                        </TableItem>
                      )
                    })
                  }
                </TableContainer>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </Widget>
      </div>
    </div>
  )
}