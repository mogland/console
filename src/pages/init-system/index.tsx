/*
 * @FilePath: /nx-admin/src/pages/init-system/index.tsx
 * @author: Wibus
 * @Date: 2022-07-16 17:09:06
 * @LastEditors: Wibus
 * @LastEditTime: 2022-07-16 18:23:18
 * Coding With IU
 */

import { Button, Input, Spacer, Text, useClasses } from "@geist-ui/core";
import { useState } from "react";
import { message } from "react-message-popup";
import { useMount } from "react-use";
import { BasicPage } from "../../types/basic";
import { apiClient } from "../../utils/request";
import { useStorage } from "../../utils/useStorage";
import styles from "./index.module.css";

export const InitSystem: BasicPage = () => {
  const [status, setStatus] = useState<any>();
  useMount(async () => {
    await apiClient.get('/init').then(res => {
      if (!res.can_init) {
        message.error(res.mes)
        if (res.reason) setStatus(res.reason)
        switch (res.reason) {
          case 1: // means performance has been initialized
            window.location.href = "/dashboard"
            break;
        }
      }
    })
  })

  function initSystem(e: any) {
    e.preventDefault()
    if (!e.target[0].value) {
      message.error("请输入昵称")
      return
    }
    if (!e.target[1].value) {
      message.error("请输入用户名")
      return
    }
    if (!e.target[2].value) {
      message.error("请输入密码")
      return
    }
    if (e.target[2].value !== e.target[3].value) {
      message.error("两次输入的密码不一致")
      return
    }
    message.loading("初始化中...")
    const body = {
      name: e.target[0].value,
      username: e.target[1].value,
      password: e.target[2].value,
      introduce: e.target[4].value,
      mail: e.target[5].value,
      avatar: e.target[6].value,
      url: e.target[7].value,
    }
    console.log(body)
    console.log(JSON.stringify(body))
    apiClient.post('/user/register', null, null, JSON.stringify(body)).then(res => {
      if (res.code){
        message.error(res.message); 
        return;
      }
      console.log(res)
      message.success("用户注册成功，正在自动初始化配置...")
      useStorage("token", res.token)
      apiClient.get("/init/configs/default").then(res => {
        message.success("配置初始化成功，正在跳转至仪表盘...")
        window.location.href = "/dashboard"
      })
    }).catch(err => {
      message.error(err.mes)
    })
  }

  return (
    <>
      {/* <div className={useClasses(styles.bg)} data-v-3764294c="" style={{ backgroundImage: 'url("https://fastly.jsdelivr.net/gh/mx-space/docs-images@master/images/chichi-1.jpeg")', opacity: 1 }}></div> */}
      <div className={useClasses("relative h-screen w-full flex items-center justify-center")}>
        <div className={useClasses("bg-white m-auto flex flex-col relative radi")}>
          <Text h4>初始化系统</Text>
          <Spacer h={1} />
          {/* 开始表单 */}
          <form onSubmit={initSystem}>
            {
              status !== null &&
              <>
                <Input label="昵称" placeholder="必填" width="100%" />
                <Spacer h={.5} />
                <Input label="用户名" placeholder="必填" width="100%" />
                <Spacer h={.5} />
                <Input.Password label="密码" placeholder="必填" width="100%" />
                <Spacer h={.5} />
                <Input.Password label="确认密码" placeholder="必填" width="100%" />
                <Spacer h={.5} />
                <Input label="个人介绍" placeholder="必填" width="100%" />
                <Spacer h={.5} />
                <Input label="邮箱" placeholder="必填" width="100%" />
                <Spacer h={.5} />
                <Input label="头像" placeholder="必填" width="100%" />
                <Spacer h={.5} />
                <Input label="个人主页" placeholder="必填" width="100%" />
                <Spacer h={2} />
              </>
            }
            <Button htmlType="submit" width="100%">开始初始化系统</Button>
          </form>
        </div>
      </div>
    </>
  )
}