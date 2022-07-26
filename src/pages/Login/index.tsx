/*
 * @FilePath: /nx-admin/src/pages/Login/index.tsx
 * @author: Wibus
 * @Date: 2022-07-21 13:21:01
 * @LastEditors: Wibus
 * @LastEditTime: 2022-07-26 13:36:43
 * Coding With IU
 */

import { message } from "react-message-popup";
import { useMount } from "react-use";
import { BasicPage } from "../../types/basic";
import { apiClient } from "../../utils/request";
import { Button, Input, Spacer, Text, useClasses } from "@geist-ui/core";
import { setStorage } from "../../utils/storage";

export const Login: BasicPage = () => {

  useMount(async () => {
    apiClient.get('/master/check_logged').then(res => {
      // if (res.code === 401) {
      //   return
      // } else {
        window.location.href = "/dashboard"
      // }
    }).catch(err => {
      return
    })
  })

  function loginUser(e: any) {
    e.preventDefault()
    if (!e.target[0].value) {
      message.error("请输入用户名")
      return
    }
    if (!e.target[1].value) {
      message.error("请输入密码")
      return
    }
    const body = {
      username: e.target[0].value,
      password: e.target[1].value
    }
    apiClient.post('/master/login', null, null, JSON.stringify(body)).then(res => {
      // if (!res.code) {
        message.loading("登录成功，正在跳转")
        setStorage("token", res.token)
        window.location.href = "/dashboard"
      // } else {
        // message.error(res.message)
      // }
    }).catch(err => {
      console.error(err)
      message.error(err.message)
    })
  }

  return (
    <>
      <div className={useClasses("relative h-screen w-full flex items-center justify-center")}>
        <div className={useClasses("m-auto flex flex-col relative radi")}>
          <Text h4>登录</Text>
          <form onSubmit={loginUser}>
            <Input label="用户名" placeholder="必填" width="100%" />
            <Spacer h={.5} />
            <Input.Password label="密码" placeholder="必填" width="100%" />
            <Spacer h={.5} />
            <Button htmlType="submit" width="100%" auto onClick={() => { }}>Go!</Button>
          </form>
        </div>
      </div>
    </>
  )
}