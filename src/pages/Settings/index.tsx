import { Title } from "@components/universal/Title";
import type { BasicPage } from "@type/basic";
import tabs from "@components/universal/tabs/index.module.css";
import { Tab } from "@headlessui/react";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { Loading } from "@components/universal/Loading";
import { ModalBody } from "@components/universal/Modal";
import { Input, Textarea } from "@pages/Write/Input";
import { apiClient } from "@utils/request";
import styles from "./index.module.css"
import { Button } from "@components/universal/Button";
import { Twindow } from "@components/universal/Twindow";

export const SettingsPage: BasicPage = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{
    id: string,
    username: string,
    nickname: string,
    description: string,
    avatar: string,
    email: string,
    url: string,
    last_login_time: string,
    created: string,
    password?: string,
  }>({
    id: "",
    username: "",
    nickname: "",
    description: "",
    avatar: "",
    email: "",
    url: "",
    last_login_time: "",
    created: "",
    password: "",
  });

  useEffect(() => {
    apiClient("/user/master/info").then((res) => {
      setUser(res);
    });
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const UserSetting = () => {
    const [_user, _setUser] = useState(user);
    console.log(_user);
    const [password, setPassword] = useState("");
    return (
      <div className={styles.userSettingsContainer}>
        <div className={styles.userSettingsBackground}>
          <img src="/background.avif" className={styles.background} />
          <img src={_user.avatar} className={styles.avatar} />
        </div>
        <div className={styles.userSettings}>
          {/* actions */}
          <div>
            <Input
              value={_user.username}
              style={{ backgroundColor: "var(--background-color-primary)", width: "100%" }}
              onChange={(e) => {
                _setUser({ ..._user, username: e });
              }}
              label="用户名"
            />
            <Input
              value={_user.nickname}
              style={{ backgroundColor: "var(--background-color-primary)", width: "100%" }}
              onChange={(e) => {
                _setUser({ ...user, nickname: e });
              }}
              label="昵称"
            />
            <Input
              value={_user.email}
              style={{ backgroundColor: "var(--background-color-primary)", width: "100%" }}
              onChange={(e) => {
                _setUser({ ..._user, email: e });
              }}
              label="邮箱"
            />
            <Input
              value={_user.avatar}
              style={{ backgroundColor: "var(--background-color-primary)", width: "100%" }}
              onChange={(e) => {
                _setUser({ ..._user, avatar: e });
              }}
              label="头像"
            />
            <Input
              value={_user.url}
              style={{ backgroundColor: "var(--background-color-primary)", width: "100%" }}
              onChange={(e) => {
                _setUser({ ..._user, url: e });
              }}
              label="个人主页"
            />
  
          </div>
          <div>
            <Textarea
              value={_user.description}
              label="个人简介"
              style={{ backgroundColor: "var(--background-color-primary)", width: "100%", height: "6rem" }}
              onChange={(e) => {
                _setUser({ ..._user, description: e });
              }}
            />
            <Input
              value={_user.password || ""}
              type="password"
              style={{ backgroundColor: "var(--background-color-primary)", width: "100%" }}
              onChange={(e) => {
                _setUser({ ..._user, password: e });
              }}
              label="修改密码"
             />

            <Button
                style={{ marginTop: "2.5rem", width: "100%" }}
                onClick={(e) => {
                  apiClient("/user/info", {
                    method: "PUT",
                    body: JSON.stringify(_user),
                  }).then(() => {
                    Twindow({
                      title: "保存成功",
                      text: "用户信息已保存",
                      allowClose: true,
                    })
                  })
                }}
              >
                保存
              </Button>
          </div>
        </div>
      </div>
    )
  }

  const SystemSetting = () => (
    <></>
  )

  const SafeSetting = () => (
    <></>
  )

  return (
    <>
      <Loading loading={loading} />
      <div className={clsx("loading", !loading && "loaded")}>
        <Title>系统设置</Title>
        <Tab.Group>
          <Tab.List className={tabs.tabList}>
            <Tab className={({ selected }) => clsx(tabs.tab, selected && tabs.selected)}>
              用户
            </Tab>
            <Tab className={({ selected }) => clsx(tabs.tab, selected && tabs.selected)}>
              系统
            </Tab>
            <Tab className={({ selected }) => clsx(tabs.tab, selected && tabs.selected)}>
              安全
            </Tab>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
              <UserSetting />
            </Tab.Panel>
            <Tab.Panel>
              <SystemSetting />
            </Tab.Panel>
            <Tab.Panel>
              <SafeSetting />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </>
  );
};
