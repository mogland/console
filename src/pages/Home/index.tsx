import clsx from "clsx";
import { Title } from "../../components/universal/Title";
import { BasicPage } from "../../types/basic";
import styles from "./index.module.css"
import { Tab } from '@headlessui/react'

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
      <div className={clsx(styles.tableHeader, styles.tableGrid)}>
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

  return (
    <>
      <Title>
        仪表盘
      </Title>
      <GridContainer gridTemplateColumns="1fr 1fr 1fr" className={styles.total}>
        <div className={styles.totalItem}>
          <div className={styles.totalTitle}>
            总访客
          </div>
          <div className={styles.totalNumber}>
            13,042
          </div>
        </div>
        <div className={styles.totalItem}>
          <div className={styles.totalTitle}>
            总文章
          </div>
          <div className={styles.totalNumber}>
            3,042
          </div>
        </div>
        <div className={styles.totalItem}>
          <div className={styles.totalTitle}>
            总评论
          </div>
          <div className={styles.totalNumber}>
            9,834
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
              过去 30 天文章数量
            </div>
            <div className={clsx(styles.totalNumber, styles.chartNumber)}>
              20 篇
            </div>
          </div>
          <div className={styles.totalItem}>
            <div className={clsx(styles.totalTitle, styles.chartTitle)}>
              过去 7 天文章数量
            </div>
            <div className={clsx(styles.totalNumber, styles.chartNumber)}>
              2 篇
            </div>
          </div>
          <div className={styles.totalItem}>
            <div className={clsx(styles.totalTitle, styles.chartTitle)}>
              过去 7 天评论数量
            </div>
            <div className={clsx(styles.totalNumber, styles.chartNumber)}>
              12 条
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
                      友链文章
                    </div>
                  )
                }
              }
            </Tab>
          </Tab.List>
          <Tab.Panels className={styles.tabContent}>
            <Tab.Panel>
              <TableContainer
                header={["TITLE", "DATE", "VIEWS"]}
              >
                {
                  [1, 2].map((item, index) => {
                    return (
                      <>
                        <TableItem>
                          <span className={styles.tableItemTitle}>NestJS 微服务通过订阅发布事件与其他技术栈交互</span>
                          <span className={styles.tableItemDate}>2021-08-01</span>
                          <span className={styles.tableItemViews}>1,234</span>
                        </TableItem>
                        <TableItem>
                          <span className={styles.tableItemTitle}>来聊一聊最基本的 Nest.JS 控制器吧</span>
                          <span className={styles.tableItemDate}>2021-12-26</span>
                          <span className={styles.tableItemViews}>122</span>
                        </TableItem>
                        <TableItem>
                          <span className={styles.tableItemTitle}>2022 · 来回往复</span>
                          <span className={styles.tableItemDate}>2021-12-01</span>
                          <span className={styles.tableItemViews}>86</span>
                        </TableItem>
                      </>
                    )
                  })
                }
              </TableContainer>

            </Tab.Panel>
            <Tab.Panel>Content 2</Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </Widget>
    </>
  )
}