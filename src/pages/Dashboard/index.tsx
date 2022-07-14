/*
 * @FilePath: /nx-admin/src/pages/Dashboard/index.tsx
 * @author: Wibus
 * @Date: 2022-07-14 16:30:25
 * @LastEditors: Wibus
 * @LastEditTime: 2022-07-14 21:51:55
 * Coding With IU
 */

import { Page, Button, Text, Grid, Card, useClasses } from "@geist-ui/core"
import styles from "./index.module.css"

export const Dashboard = () => {
  return (
    <Page className={useClasses(styles.page)}>
      <div className={useClasses(styles.header)}>
        <Text h2>Dashboard</Text>
      </div>
      <div className={useClasses(styles.viewContainer)}>
        <section className={useClasses(styles.dashboardArea, styles.mixed)}>
          <div className={useClasses(styles.dashboardContainer)}>
            <div className={useClasses(styles.dashboardBox, styles.blogPost)}>
              <h2>开始书写你的文章</h2>

              <div className="flex flex-row">
                <a href="" >
                  <span className={useClasses(styles.icon)}>

                  </span>
                  <div>
                    <h4>发布你的第一篇文章</h4>
                    <p>对 NEXT 的编辑器进行初步了解</p>
                  </div>
                </a>
                <a href="" >
                  <span className={useClasses(styles.icon)}></span>
                  <div>
                    <h4>启动你的第一个插件</h4>
                    <p>初步感受 NEXT 的革新插件系统</p>
                  </div>
                </a>
              </div>

            </div>
          </div>
        </section>

      </div>
    </Page>
  )
}