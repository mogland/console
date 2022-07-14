/*
 * @FilePath: /nx-admin/src/pages/Dashboard/index.tsx
 * @author: Wibus
 * @Date: 2022-07-14 16:30:25
 * @LastEditors: Wibus
 * @LastEditTime: 2022-07-14 22:38:37
 * Coding With IU
 */

import { Page, Button, Text, Grid, Card, useClasses } from "@geist-ui/core"
import { useState } from "react"
import { useFirstMountState, useMount } from "react-use"
import { Timeline } from "../../components/widgets/Timeline"
import styles from "./index.module.css"

export const Dashboard = () => {

  const url = `https://v1.hitokoto.cn/?encode=json`
  const [hitokoto, setHitokoto] = useState({
    hitokoto: "书写中...",
    from: "猜想中...",
  })
  const [poem, setPoem] = useState({
    title: "编写中...",
    content: "创作中...",
  })
  useMount(() => {
    fetch(url)
      .then(res => res.json())
      .then(res => {
        setHitokoto({
          hitokoto: res.hitokoto,
          from: res.from,
        })
      })
    fetch(`${url}&c=i`)
      .then(res => res.json())
      .then(res => {
        setPoem({
          title: res.from,
          content: res.hitokoto,
        })
      })
  })

  return (
    <Page className={useClasses(styles.page)}>
      <div className={useClasses(styles.header)}>
        <Text h2>Dashboard</Text>
      </div>
      <div className={useClasses(styles.viewContainer)}>
        <section className={useClasses(styles.dashboardArea, styles.mixed)}>
          <div className={useClasses(styles.dashboardContainer)}>
            <div className={useClasses(styles.dashboardBox, styles.blogPost)}>
              <h2>即刻灵感</h2>

              <div className="flex flex-row">
                <a href="" >
                  {/* <span className={useClasses(styles.icon)}></span> */}
                  <div>
                    <h4>「{hitokoto.hitokoto}」</h4>
                    <p>From {hitokoto.from}</p>
                  </div>
                </a>
                <a href="" >
                  {/* <span className={useClasses(styles.icon)}></span> */}
                  <div>
                    <h4>「{poem.content}」</h4>
                    <p>《{poem.title}》</p>
                  </div>
                </a>
              </div>

            </div>
          </div>
        </section>

        <section className={useClasses(styles.dashboardArea, styles.mixed)}>
          <div className={useClasses(styles.dashboardContainer)}>
            <div className={useClasses(styles.dashboardBox)}>
              <h3>Latest changes</h3>
              <Timeline />
            </div>
          </div>
        </section>
      </div>
    </Page>
  )
}