import { Title } from "@components/universal/Title";
import type { BasicPage } from "@type/basic";
import tabs from "@components/universal/Tabs/index.module.css";
import { Tab } from "@headlessui/react";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { Loading } from "@components/universal/Loading";
import { ModalBody } from "@components/universal/Modal";
import { Input, Textarea } from "@pages/Write/Input";
import { apiClient } from "@utils/request";
import styles from "./index.module.css"
import { Button } from "@components/universal/Button";
import { Collapse, CollapseContainer } from "@components/universal/Collapse";
import { getQueryVariable } from "@utils/url";
import { useNavigate } from "react-router-dom";
import { Tags } from "@components/universal/Tags";
import { Toggle } from "@components/universal/Toggle";
import { jump } from "@utils/path";
import { useSeo } from "@hooks/useSeo";
import { toast } from "sonner";

const tabsAPI = ["/user/master/info", "/configs"]

export const SettingsPage: BasicPage = () => {
  useSeo("设置")
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>({});
  const tab = getQueryVariable("tab")
  const [_tabs, _setTabs] = useState(Number((tab === "0" || tab === "1") ? tab : "0"));
  const navigate = useNavigate()

  useEffect(() => {
    // setLoading(true);
    navigate(jump(`/settings?tab=${_tabs}`))
    apiClient(tabsAPI[_tabs]).then((res) => {
      setData(res);
    });
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [_tabs]);

  const UserSetting = () => {
    const [_user, _setUser] = useState(data);
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
                _setUser({ ..._user, nickname: e });
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
              onClick={() => {
                toast.promise(apiClient("/user/info", {
                  method: "PUT",
                  body: JSON.stringify(_user),
                }), {
                  loading: "正在保存",
                  success: "用户信息已保存",
                  error: "保存失败"
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

  const SystemSetting = () => {
    const [_data, _setData] = useState(data); // prevent re-render
    return (
      <>
        <CollapseContainer>
          <Collapse
            title="服务设置"
          >
            <Input
              style={{ backgroundColor: "var(--background-color-primary)" }}
              label="前端地址"
              value={_data.site?.front_url}
              onChange={(e) => {
                _setData({ ..._data, site: { ..._data.site, front_url: e } })
              }}
            />
            <Input
              style={{ backgroundColor: "var(--background-color-primary)" }}
              label="后端地址"
              value={_data.site?.server_url}
              onChange={(e) => {
                _setData({ ..._data, site: { ..._data.site, server_url: e } })
              }}
            />
          </Collapse>
          <Collapse
            title="站点信息设置"
          >
            <Input
              style={{ backgroundColor: "var(--background-color-primary)" }}
              label="站点名称"
              value={_data.seo?.title}
              onChange={(e) => {
                _setData({ ..._data, seo: { ..._data.seo, title: e } })
              }}
            />
            <Textarea
              style={{ backgroundColor: "var(--background-color-primary)" }}
              label="站点描述"
              value={_data.seo?.description}
              onChange={(e) => {
                _setData({ ..._data, seo: { ..._data.seo, description: e } })
              }}
            />
            <ModalBody>站点标签</ModalBody>
            <Tags
              tagStyles={{
                backgroundColor: "var(--background-color-primary)",
              }}
              tags={_data.seo?.keyword || []}
              setTags={(e) => {
                _setData({ ..._data, seo: { ..._data["seo"], keyword: e } })
                console.log({ ..._data, seo: { ..._data["seo"], keyword: e } })
              }}
            />
          </Collapse>
          {/* <Collapse
            title="Webhook 设置"
          >
          // TODO
            <ModalBody>
              WIP
            </ModalBody>
          </Collapse> */}
          <Collapse
            title="邮件服务设置"
          >
            <ModalBody>启动加密验证</ModalBody>
            <Toggle
              checked={_data.email?.secure}
              onChange={(e) => {
                _setData({ ..._data, email: { ..._data.email, secure: e } })
              }}
            />
            <Input
              style={{ backgroundColor: "var(--background-color-primary)" }}
              label="邮件服务器地址"
              value={_data.email?.host}
              onChange={(e) => {
                _setData({ ..._data, email: { ..._data.email, host: e } })
              }}
            />
            <Input
              style={{ backgroundColor: "var(--background-color-primary)" }}
              label="邮件服务器端口"
              value={_data.email?.port}
              onChange={(e) => {
                _setData({ ..._data, email: { ..._data.email, port: e } })
              }}
            />
            <Input
              style={{ backgroundColor: "var(--background-color-primary)" }}
              label="邮件服务器邮箱"
              value={_data.email?.user}
              onChange={(e) => {
                _setData({ ..._data, email: { ..._data.email, user: e } })
              }}
            />
            <Input
              style={{ backgroundColor: "var(--background-color-primary)" }}
              label="邮件服务器密码"
              value={_data.email?.pass}
              onChange={(e) => {
                _setData({ ..._data, email: { ..._data.email, pass: e } })
              }}
              type="password"
            />
          </Collapse>
        </CollapseContainer>

        <Button
          style={{ marginTop: "2.5rem", width: "100%" }}
          onClick={() => {
            Object.keys(_data).forEach((key) => {
              if (JSON.stringify(_data[key]) === JSON.stringify(data[key])) {
                return
              }
              toast.promise(apiClient(`/configs/${key}`, {
                method: "PATCH",
                body: JSON.stringify(_data[key]),
              }), {
                loading: "正在保存",
                success: "配置已保存",
                error: (data) => `保存失败 - ${data.message}`
              })
            })
          }}
        >
          保存
        </Button>
      </>
    )
  }

  return (
    <>
      <Loading loading={loading} />
      <div className={clsx("loading", !loading && "loaded")}>
        <Title>系统设置</Title>
        <Tab.Group
          defaultIndex={_tabs}
          onChange={(index) => {
            _setTabs(index);
          }}
        >
          <Tab.List className={tabs.tabList}>
            <Tab className={({ selected }) => clsx(tabs.tab, selected && tabs.selected)}>
              用户
            </Tab>
            <Tab className={({ selected }) => clsx(tabs.tab, selected && tabs.selected)}>
              系统
            </Tab>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
              <UserSetting />
            </Tab.Panel>
            <Tab.Panel>
              <SystemSetting />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </>
  );
};
