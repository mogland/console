/*
 * @FilePath: /nx-admin/src/pages/Dashboard/index.tsx
 * @author: Wibus
 * @Date: 2022-07-14 16:30:25
 * @LastEditors: Wibus
 * @LastEditTime: 2022-07-14 22:56:15
 * Coding With IU
 */

import { Page, Button, Text, Grid, Card, useClasses } from "@geist-ui/core"
import { useState } from "react"
import { useFirstMountState, useMount } from "react-use"
import { Timeline } from "../../components/widgets/Timeline"
import styles from "./index.module.css"

const Dashboards = () => { }

Dashboards.Container = (props) => {
  return (
    <div className={useClasses(styles.viewContainer)}>
      {props.children}
    </div>
  )
}
Dashboards.Area = (props) => {
  return (
    <section className={useClasses(styles.dashboardArea, styles.mixed)}>
      <div className={useClasses(styles.dashboardContainer)}>
        <div className={useClasses(styles.dashboardBox, styles.blogPost)}>
          {props.children}
        </div>
      </div>
    </section>
  )
}

const Hitokoto = () => {
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
    <>
      <h3>即刻灵感</h3>

      <div className="flex flex-row">
        <a onClick={() => {
          fetch(url)
            .then(res => res.json())
            .then(res => {
              setHitokoto({
                hitokoto: res.hitokoto,
                from: res.from,
              })
            })
        }}>
          <div>
            <h4>「{hitokoto.hitokoto}」</h4>
            <p>From {hitokoto.from}</p>
          </div>
        </a>
        <a onClick={() => {
          fetch(`${url}&c=i`)
            .then(res => res.json())
            .then(res => {
              setPoem({
                title: res.from,
                content: res.hitokoto,
              })
            })
        }}>
          <div>
            <h4>「{poem.content}」</h4>
            <p>《{poem.title}》</p>
          </div>
        </a>
      </div></>
  )
}

export const Dashboard = () => {

  return (
    <Page className={useClasses(styles.page)}>
      <div className={useClasses(styles.header)}>
        <Text h2>Dashboard</Text>
      </div>
      <Dashboards.Container>
        
        <Dashboards.Area>
          <Hitokoto />
        </Dashboards.Area>
        
        <Dashboards.Area>
          <h3>Latest changes</h3>
          <Timeline />
        </Dashboards.Area>


      </Dashboards.Container>
    </Page>
  )
}