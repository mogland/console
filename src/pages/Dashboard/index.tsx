/*
 * @FilePath: /nx-admin/src/pages/Dashboard/index.tsx
 * @author: Wibus
 * @Date: 2022-07-14 16:30:25
 * @LastEditors: Wibus
 * @LastEditTime: 2022-07-16 16:55:17
 * Coding With IU
 */

import { Page, Button, Text, Grid, Card, useClasses } from "@geist-ui/core"
import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal, useState } from "react"
import { useFirstMountState, useMount } from "react-use"
import Dashboards from "../../components/widgets/Dashboards"
import { Lists } from "../../components/widgets/Lists"
import { NxPage } from "../../components/widgets/Page"
import { Timeline } from "../../components/widgets/Timeline"
import { BasicPage } from "../../types/basic"
import styles from "./index.module.css"

const Hitokoto = () => {

  const [hitokoto, setHitokoto] = useState({
    hitokoto: "书写中...",
    from: "猜想中...",
  })
  // const [zhihuHot, setZhihuHot] = useState([
  //   {
  //     title: "",
  //     desc: "",
  //     url: "",
  //   },
  //   {
  //     title: "",
  //     desc: "",
  //     url: "",
  //   }
  // ])
  const [poem, setPoem] = useState({
    title: "编写中...",
    content: "创作中...",
  })
  // const [weather, setWeather] = useState({
  //   city: "",
  //   date: "",
  //   week: "",
  //   type: "",
  //   high: "",
  //   low: "",
  //   fengxiang: "",
  //   fengli: "",
  //   tip: "",
  // })

  const url = `https://v1.hitokoto.cn/?encode=json`
  // const shihuHot = `https://api.vvhan.com/api/hotlist?type=zhihuHot`
  // const weatherUrl = `https://api.vvhan.com/api/weather`
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
    // fetch(shihuHot)
    //   .then(res => res.json())
    //   .then(res => {
    //     setZhihuHot([
    //       {
    //         title: res.data[0].title.length > 15 ? res.data[0].title.substring(0, 15) + "..." : res.data[0].title,
    //         desc: res.data[0].desc.length > 30 ? res.data[0].desc.substring(0, 30) + "..." : res.data[0].desc,
    //         url: res.data[0].url,
    //       },
    //       {
    //         title: res.data[1].title.length > 15 ? res.data[1].title.substring(0, 15) + "..." : res.data[1].title,
    //         desc: res.data[1].desc.length > 30 ? res.data[1].desc.substring(0, 30) + "..." : res.data[1].desc,
    //         url: res.data[1].url,
    //       },
    //     ])
    //   })
    // fetch(weatherUrl)
    //   .then(res => res.json())
    //   .then(res => {
    //     setWeather({
    //       city: res.city,
    //       date: res.info.date,
    //       week: res.info.week,
    //       type: res.info.type,
    //       high: res.info.high,
    //       low: res.info.low,
    //       fengxiang: res.info.fengxiang,
    //       fengli: res.info.fengli,
    //       tip: res.info.tip,
    //     })
    //   })
  })

  return (
    <>
      {/* <h3>一言</h3> */}

      <div className="flex flex-row w-full">

        <a onClick={() => {
          fetch(url)
            .then(res => res.json())
            .then(res => {
              setHitokoto({
                hitokoto: res.hitokoto,
                from: res.from,
              })
            })
        }} className="w-full">
          <div className="w-full">
            {/* <h4>「{hitokoto.hitokoto}」</h4>
            <p>From {hitokoto.from}</p> */}
            {/* <Card type={"cyan"} width="100%"> */}
            <Text h4 my={0} style={{ textTransform: 'capitalize' }} className="font-serif font-black">「{hitokoto.hitokoto}」</Text>
            <Text className="font-serif">{hitokoto.from}</Text>
            {/* </Card> */}
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
        }} className="w-full" style={{ display: "none" }}>
          <div className="w-full">
            {/* <h4>「{poem.content}」</h4>
            <p>《{poem.title}》</p> */}
            {/* <Card type={"default"} width="100%"> */}
            <Text h4 my={0} style={{ textTransform: 'capitalize' }}>「{poem.content}」</Text>
            <Text>《{poem.title}》</Text>
            {/* </Card> */}
          </div>
        </a>
      </div>

      {/* <h3 className="mt-6">知乎热榜</h3>
      <div className="flex flex-row">
        <a href={zhihuHot[0].url}>
          <div>
            <h4>{zhihuHot[0].title}</h4>
            <p>{zhihuHot[0].desc}</p>
          </div>
        </a>
        <a href={zhihuHot[1].url}>
          <div>
            <h4>{zhihuHot[1].title}</h4>
            <p>{zhihuHot[1].desc}</p>
          </div>
        </a>
      </div> */}
      {/* <Text b i className="mt-20">{weather.tip}</Text> */}
    </>
  )
}

export const Dashboard: BasicPage = () => {

  return (
    <NxPage title={"Dashboard"}>
      <Dashboards.Container className="lg:grid flex flex-col">
        <div>
          <Dashboards.Area>
            <Hitokoto />
          </Dashboards.Area>

          <Dashboards.Area >
            <div className="w-full">
              <Lists />
            </div>
          </Dashboards.Area>

        </div>

        <Dashboards.Area border>
          <h3>Latest changes</h3>
          <Timeline />
        </Dashboards.Area>






      </Dashboards.Container>
    </NxPage>
  )
}