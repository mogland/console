/*
 * @FilePath: /nx-admin/src/pages/Dashboard/index.tsx
 * @author: Wibus
 * @Date: 2022-07-14 16:30:25
 * @LastEditors: Wibus
 * @LastEditTime: 2022-07-14 18:36:16
 * Coding With IU
 */

import { Page, Button, Text, Grid, Card } from "@geist-ui/core"
import styles from "./index.module.css"

export const Dashboard = () => {
  return (
    <Page className={styles.page}>
      <div className={styles.header}>
        <Text h2>Dashboard</Text>
      </div>
      <div className={styles.viewContainer}>
        <section className={styles.dashboardArea + " " + styles.mixed}>
          <div className={styles.dashboardContainer}>
            <div className={styles.dashboardBox + " " + styles.blogPost}>
              <h2>开始书写你的文章</h2>

              <a href="#/members/" >
                {/* <span className={styles.icon}></span> */}
                <div>
                  <h4>发布第一篇文章</h4>
                  <p>让你对 NEXT 的编辑器有一个初步了解</p>
                </div>
              </a>

            </div>
          </div>
        </section>

      </div>
    </Page>
  )
}