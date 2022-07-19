/*
 * @FilePath: /nx-admin/src/pages/init-system/index.tsx
 * @author: Wibus
 * @Date: 2022-07-16 17:09:06
 * @LastEditors: Wibus
 * @LastEditTime: 2022-07-19 23:26:43
 * Coding With IU
 */

import { Button, Input, Modal, Spacer, Text, useClasses, useModal } from "@geist-ui/core";
import { useState } from "react";
import { message } from "react-message-popup";
import { useMount } from "react-use";
import { BasicPage } from "../../types/basic";
import { apiClient } from "../../utils/request";
import { useStorage } from "../../utils/useStorage";
import styles from "./index.module.css";

export const InitSystem: BasicPage = () => {
  const [status, setStatus] = useState<any>();
  const { visible, setVisible, bindings } = useModal()
  const [loading, setLoading] = useState(false);
  useMount(async () => {
    await apiClient.get('/init').then(res => {
      if (!res.can_init) {
        message.error(res.mes)
        setStatus(res.reason)
        switch (res.reason) {
          case 1: // means performance has been initialized
            window.location.href = "/dashboard"
            break;
        }
      }
    })
  })
  console.log(status)

  function initUser(e: any) {
    setLoading(true)
    e.preventDefault()
    if (!e.target[0].value) {
      message.error("请输入昵称")
      return setLoading(false)
    }
    if (!e.target[1].value) {
      message.error("请输入用户名")
      return setLoading(false)
    }
    if (!e.target[2].value) {
      message.error("请输入密码")
      return setLoading(false)
    }
    if (e.target[2].value !== e.target[3].value) {
      message.error("两次输入的密码不一致")
      return setLoading(false)
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

    apiClient.post('/user/register', null, null, JSON.stringify(body)).then(res => {
      message.success("用户注册成功")
      setVisible(false)
      setLoading(false)
      message.loading("正在刷新更新配置状态")
      window.location.reload()
    }).catch(err => {
      message.error(err.mes)
      setLoading(false)
    })
  }

  function initConfigs(e: any) {
    setLoading(true)
    apiClient.get("/init/configs/default").then(res => {
      message.success("配置初始化成功，正在跳转至仪表盘...")
      setLoading(false)
      setVisible(false)
      window.location.href = "/dashboard"
    })
  }

  return (
    <>
      {/* <div className={useClasses(styles.bg)} data-v-3764294c="" style={{ backgroundImage: 'url("https://fastly.jsdelivr.net/gh/mx-space/docs-images@master/images/chichi-1.jpeg")', opacity: 1 }}></div> */}
      <div className={useClasses("relative h-screen w-full flex items-center justify-center")}>
        <div className={useClasses("m-auto flex flex-col relative radi")}>
          <Text h4>初始化系统</Text>
          <Spacer h={1} />
          {/* <form onSubmit={initSystem}> */}
          {!status && <Button htmlType="submit" width="100%" auto onClick={() => setVisible(true)}>开始初始化系统</Button>}
          {/* </form> */}
          {/* <Modal {...bindings}> */}
          {
            status === 0 &&
            <Modal {...bindings}>
              <form onSubmit={initUser}>
                <Modal.Title>注册用户</Modal.Title>
                <Modal.Subtitle>您尚未注册用户</Modal.Subtitle>
                <Modal.Content>
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
                </Modal.Content>
                <Modal.Action passive onClick={() => { setVisible(false); setLoading(false) }}>取消</Modal.Action>
                <Modal.Action htmlType="submit" loading={loading}>提交</Modal.Action>
              </form>
            </Modal>

          }
          {
            status === 1 &&
            <Modal {...bindings}>
              <Modal.Title>遇到错误</Modal.Title>
              <Modal.Subtitle>无法初始化配置</Modal.Subtitle>
              <Modal.Content>
                <p>您已初始化配置，请进入后台进行个人配置</p>
              </Modal.Content>
              <Modal.Action onClick={() => { setVisible(false) }}>确定</Modal.Action>
            </Modal>
          }
          {
            !status && status !== 0 &&
            <Modal {...bindings}>
              <Modal.Title>初始化配置</Modal.Title>
              <Modal.Subtitle>初始化 NEXT 默认配置</Modal.Subtitle>
              <Modal.Content>
                <p>您确定要初始化默认配置吗？</p>
              </Modal.Content>
              <Modal.Action passive onClick={() => { setVisible(false); setLoading(false) }}>取消</Modal.Action>
              <Modal.Action onClick={initConfigs} loading={loading}>确定</Modal.Action>
            </Modal>
          }
          {/* </Modal> */}
        </div>
      </div>
    </>
  )
}