import clsx from "clsx";
import { Title } from "../../components/universal/Title";
import { BasicPage } from "../../types/basic";
import styles from "./index.module.css"
import { Tab } from '@headlessui/react'
import { useEffect, useState } from "react";
import { apiClient } from "../../utils/request";

export const GridContainer = ({ children, gridTemplateColumns, className }: { children: React.ReactNode, gridTemplateColumns: string, className?: string }) => {
  return (
    <div style={{ gridTemplateColumns }} className={clsx(styles.gridContainer, className)}>
      {children}
    </div>
  )
}

export const Widget = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return (
    <div className={clsx(styles.widget, className)}>
      {children}
    </div>
  )
}

export const TableContainer = ({ children, className, header }: { header: string[], children: React.ReactNode, className?: string }) => {
  return (
    <div className={clsx(styles.tableContainer, className)}>
      <div
        className={clsx(styles.tableHeader, styles.tableGrid)}
        style={{
          gridTemplateColumns: `2fr repeat(${header.length - 1}, 1fr)`
        }}
      >
        {
          header.map((item, index) => {
            return (
              <span key={index} className={styles.tableHeaderItem}>
                {item}
              </span>
            )
          })
        }
      </div>
      {children}
    </div>
  )
}

export const TableItem = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return (
    <div className={clsx(styles.tableGrid, styles.tableItem)}>
      {children}
    </div>
  )
}

export const Home: BasicPage = () => {

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
      apiClient("/friends", { query: { status: 0, } }),
      apiClient("/friends", { query: { status: 1, } }),
      apiClient("/friends", { query: { status: 3, } }),
      apiClient("/post"),
      apiClient("/comments").then(res => {
        res.data?.map(async item => {
          await apiClient(`/post/${item.pid}`).then(res => {
            item = {
              ...item,
              post: res,
            }
          })
        })
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
    })
  }, [])


  return (
    <>
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
                      <TableItem key={index}>
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
                      <TableItem key={index}>
                        <span className={styles.tableItemTitle}>{item.text}</span>
                        <span className={styles.tableItemTitle}>{item.post.title}</span>
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
    </>
  )
}