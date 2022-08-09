/*
 * @FilePath: /nx-admin/src/pages/Settings/index.tsx
 * @author: Wibus
 * @Date: 2022-08-02 20:51:21
 * @LastEditors: Wibus
 * @LastEditTime: 2022-08-09 19:16:00
 * Coding With IU
 */

import {
  Button,
  Collapse,
  Input,
  Spacer,
  Tabs,
  Textarea,
  useClasses,
} from "@geist-ui/core";
import { NxPage } from "../../components/widgets/Page";
import type { BasicPage } from "../../types/basic";
import Dashboards from "../../components/layouts/Dashboards";
import { Save } from "@geist-ui/icons";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { apiClient } from "../../utils/request";
import { useMount } from "react-use";
import { message } from "react-message-popup";

export const Settings: BasicPage = () => {
  const appNavigate = useNavigate();

  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const [nowTab, setNowTab] = useState(params.get("tab") || "1");

  const [user, setUser] = useState<any>({});
  const [configs, setConfigs] = useState<any>({});

  const request = async () => {
    await apiClient.get("/user").then((res) => {
      setUser(res);
    });
    await apiClient.get("/configs").then((res) => {
      console.log(res);
      setConfigs(res);
    });
  };

  useMount(() => {
    request();
  });

  return (
    <NxPage title={"Settings"}>
      <Dashboards.Container
        className="lg:grid flex flex-col"
        gridTemplateColumns="1fr"
      >
        <Dashboards.Area
          className={useClasses("overflow-x-hidden")}
          style={{ overflow: "auto" }}
        >
          <Button
            shadow
            type="success"
            onClick={async () => {
              await apiClient
                .patch("/user", null, null, JSON.stringify(user))
                .then(() => {
                  message.success("用户配置保存成功");
                  request();
                });

              await apiClient
                .patch("/configs", null, null, JSON.stringify(configs))
                .then(() => {
                  message.success("系统配置保存成功");
                  request();
                });
            }}
            style={{
              borderRadius: "100%",
              width: "50px",
              height: "50px",
              minHeight: "50px",
              minWidth: "50px",
              float: "right",
              position: "fixed",
              top: "55px",
              right: 115,
              padding: 0,
              paddingTop: "13px",
              paddingLeft: "1px",
              marginLeft: 10,
            }}
          >
            <Save />
          </Button>

          <Tabs
            initialValue={nowTab}
            marginTop={1}
            width={"100%"}
            onChange={(val) => {
              setNowTab(val);
              appNavigate(`/settings?tab=${val}`);
            }}
          >
            <Tabs.Item label="用户" value="1">
              <div
                className="grid"
                style={{
                  gridTemplateColumns: "1fr 2fr",
                  gridGap: "20px",
                }}
              >
                <div className="flex flex-col justify-center items-center">
                  <div
                    style={{
                      display: "grid",
                      gridColumn: "span 1 / span 1", // span 1 占据一列
                      gridTemplateAreas: '"label" "blank" "feedback"',
                      gridTemplateColumns: "minmax(0, 100%)",
                      gridTemplateRows: "26px 1fr",
                    }}
                  >
                    <div
                      style={{
                        boxSizing: "border-box",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        position: "relative",
                        gridArea: "blank",
                        minHeight: "34px",
                      }}
                    >
                      <div
                        className="avatar"
                        style={{
                          width: "200px",
                          height: "200px",
                          backgroundColor: "rgba(221,221,221,1)",
                          borderRadius: "100%",
                          display: "inline-block",
                          overflow: "hidden",
                          position: "relative",
                          userSelect: "none",
                        }}
                      >
                        <img
                          alt={user.username}
                          src={user.avatar}
                          style={{
                            height: "100%",
                            maxWidth: "100%",
                            borderRadius: "100%",
                            animation: "scale .5s ease-out",
                          }}
                        />
                      </div>
                      <Spacer />
                      最近登录IP: {user.last_login_ip}
                      <Spacer />
                      最近登录时间: {user.last_login_time?.split("T")[0]}
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    marginTop: "100px",
                  }}
                >
                  <Input
                    label="用户名"
                    placeholder="请输入用户名"
                    width={"100%"}
                    initialValue={user.username}
                    onChange={(e) => {
                      setUser({
                        ...user,
                        username: e.target.value,
                      });
                    }}
                  />
                  <Spacer />
                  <Input
                    label="昵称"
                    placeholder="请输入昵称"
                    width={"100%"}
                    initialValue={user.name}
                    onChange={(e) => {
                      setUser({
                        ...user,
                        name: e.target.value,
                      });
                    }}
                  />
                  <Spacer />
                  <Input
                    label="邮箱"
                    placeholder="请输入邮箱"
                    width={"100%"}
                    initialValue={user.mail}
                    onChange={(e) => {
                      setUser({
                        ...user,
                        mail: e.target.value,
                      });
                    }}
                  />
                  <Spacer />
                  <Input
                    label="个人首页"
                    placeholder="请输入个人首页"
                    width={"100%"}
                    initialValue={user.url}
                    onChange={(e) => {
                      setUser({
                        ...user,
                        url: e.target.value,
                      });
                    }}
                  />
                  <Spacer />
                  <Input
                    label="头像"
                    placeholder="请输入头像"
                    width={"100%"}
                    initialValue={user.avatar}
                    onChange={(e) => {
                      setUser({
                        ...user,
                        avatar: e.target.value,
                      });
                    }}
                  />
                  <Spacer />
                  <Textarea
                    placeholder="请输入个人介绍"
                    width={"100%"}
                    initialValue={user.introduce}
                    onChange={(e) => {
                      setUser({
                        ...user,
                        introduce: e.target.value,
                      });
                    }}
                   />
                </div>
              </div>
            </Tabs.Item>
            <Tabs.Item label="系统" value="2">
              <Collapse.Group>
                <Collapse title="URL 设置">
                  <div
                    className="grid"
                    style={{
                      gridTemplateColumns: "1fr 1fr",
                      gridGap: "1.8vw",
                    }}
                  >
                    <Input
                      clearable
                      label="前端地址"
                      width={"100%"}
                      initialValue={configs.urls?.web_url}
                      onChange={(e) => {
                        setConfigs({
                          ...configs,
                          urls: {
                            ...configs.urls,
                            web_url: e.target.value,
                          },
                        });
                      }}
                    />
                    <Input
                      clearable
                      label="API 地址"
                      width={"100%"}
                      initialValue={configs.urls?.core_url}
                      onChange={(e) => {
                        setConfigs({
                          ...configs,
                          urls: {
                            ...configs.urls,
                            core_url: e.target.value,
                          },
                        });
                      }}
                    />
                    <Input
                      clearable
                      label="后台地址"
                      width={"100%"}
                      initialValue={configs.urls?.admin_url}
                      onChange={(e) => {
                        setConfigs({
                          ...configs,
                          urls: {
                            ...configs.urls,
                            admin_url: e.target.value,
                          },
                        });
                      }}
                    />
                    {/* <Input clearable label="Gateway 地址" width={"100%"} /> */}
                  </div>
                </Collapse>
                <Collapse title="站点设置">
                  <div
                    className="grid"
                    style={{
                      gridTemplateColumns: "1fr 1fr",
                      gridGap: "1.8vw",
                    }}
                  >
                    <Input
                      clearable
                      label="站点名称"
                      width={"100%"}
                      initialValue={configs.site?.title}
                      onChange={(e) => {
                        setConfigs({
                          ...configs,
                          site: {
                            ...configs.site,
                            title: e.target.value,
                          },
                        });
                      }}
                    />
                    <Input
                      clearable
                      label="站点描述"
                      width={"100%"}
                      initialValue={configs.site?.description}
                      onChange={(e) => {
                        setConfigs({
                          ...configs,
                          site: {
                            ...configs.site,
                            description: e.target.value,
                          },
                        });
                      }}
                    />
                    {/* <Input clearable label="站点图标" width={"100%"} /> */}
                    {/* configs.site.keywords.split(",") */}
                    <Input
                      clearable
                      label="站点关键字"
                      width={"100%"}
                      initialValue={configs.site?.keywords?.join(",")}
                      onChange={(e) => {
                        setConfigs({
                          ...configs,
                          site: {
                            ...configs.site,
                            keywords: e.target.value?.split(","),
                          },
                        });
                      }}
                    />
                  </div>
                </Collapse>
                <Collapse title="邮件设置">
                  {/* <div>开启邮箱提醒 <Toggle /></div> */}
                  <Spacer />
                  <div
                    className="grid"
                    style={{
                      gridTemplateColumns: "1fr 1fr",
                      gridGap: "1.8vw",
                    }}
                  >
                    <Input
                      clearable
                      label="邮件服务器"
                      width={"100%"}
                      initialValue={configs.mail_options?.host}
                      onChange={(e) => {
                        setConfigs({
                          ...configs,
                          mail_options: {
                            ...configs.mail_options,
                            host: e.target.value,
                          },
                        });
                      }}
                    />
                    <Input
                      clearable
                      label="邮件端口"
                      width={"100%"}
                      initialValue={configs.mail_options?.port}
                      onChange={(e) => {
                        setConfigs({
                          ...configs,
                          mail_options: {
                            ...configs.mail_options,
                            port: e.target.value,
                          },
                        });
                      }}
                    />
                    <Input
                      clearable
                      label="邮件用户名"
                      width={"100%"}
                      initialValue={configs.mail_options?.auth?.user}
                      onChange={(e) => {
                        setConfigs({
                          ...configs,
                          mail_options: {
                            ...configs.mail_options,
                            auth: {
                              ...configs.mail_options.auth,
                              user: e.target.value,
                            },
                          },
                        });
                      }}
                    />
                    <Input.Password
                      clearable
                      label="邮件密码"
                      width={"100%"}
                      initialValue={configs.mail_options?.auth?.pass}
                      onChange={(e) => {
                        setConfigs({
                          ...configs,
                          mail_options: {
                            ...configs.mail_options,
                            auth: {
                              ...configs.mail_options.auth,
                              pass: e.target.value,
                            },
                          },
                        });
                      }}
                    />
                  </div>
                </Collapse>
                {/* <Collapse title="后台设置">

                </Collapse> */}
              </Collapse.Group>
            </Tabs.Item>
            <Tabs.Item label="安全" value="3">
              <Collapse.Group width={"100%"}>
                <Collapse title="修改密码">
                  <div
                    className="grid"
                    style={{
                      gridTemplateColumns: "1fr 1fr",
                      gridGap: "1.8vw",
                    }}
                  >
                    <Input.Password
                      clearable
                      label="新密码"
                      id="new-password"
                    />
                    <Input.Password
                      clearable
                      label="确认密码"
                      id="new-password-confirm"
                    />
                  </div>
                  <Spacer />
                  <Button
                    type="success"
                    onClick={async () => {
                      if (
                        document.getElementById("new-password")!.value ===
                        document.getElementById("new-password-confirm")!.value
                      ) {
                        await apiClient
                          .patch("/user", null, null, {
                            password:
                              document.getElementById("new-password")!.value,
                          })
                          .then(() => {
                            message.success("密码修改成功");
                          });
                      } else {
                        message.error("两次密码不一致");
                      }
                    }}
                    style={{
                      float: "right",
                      // width: '50px',
                      minWidth: "70px",
                    }}
                  >
                    保存
                  </Button>
                </Collapse>
              </Collapse.Group>
            </Tabs.Item>
          </Tabs>
        </Dashboards.Area>
      </Dashboards.Container>
    </NxPage>
  );
};
