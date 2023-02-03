import { Loading } from "@components/universal/Loading";
import { Title } from "@components/universal/Title";
import { TableContainer, TableItem, TableItemValue } from "@pages/Home/universal";
import type { BasicPage } from "@type/basic";
import clsx from "clsx";
import { useEffect, useState } from "react";
import postStyle from "@pages/Posts/Index/index.module.css";
import { fetch } from "ofetch";
import { Tab } from "@headlessui/react";
import tabs from "@components/universal/Tabs/index.module.css"
import styles from "./index.module.css";
import { apiClient } from "@utils/request";
import { Twindow } from "@components/universal/Twindow";
import { getQueryVariable } from "@utils/url";
import { useNavigate } from "react-router-dom";
import { Modal } from "@components/universal/Modal";
import { ThemeComponent } from "@components/widgets/ThemeComponent";
import { Space } from "@components/universal/Space";

const LIST = "https://ghproxy.com/https://raw.githubusercontent.com/mogland/awesome-mog/main/production-awesome-list/themes.json";

export const ThemesPage: BasicPage = () => {
  const _tab = Number(getQueryVariable("tab") || 0)
  const [tab, setTab] = useState<number>(_tab);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState<string | undefined>();
  const [data, setData] = useState<{
    repo: string;
    description: string;
    id: string;
  }[]>([]);
  const [localData, setLocalData] = useState<{
    id: string;
    name: string;
    active?: boolean;
    package?: string;
    version?: string;
    config?: any;
    path: string;
  }[]>([]);

  const handleLocalData = async () => {
    apiClient("/themes").then((res) => {
      setLocalData(res.data);
    });
  };

  useEffect(() => {
    Promise.all([
      handleLocalData(),
      fetch(LIST, {
        method: "GET",
        referrer: "https://ghproxy.com",
      })
        .then((res) => res.json())
        .then((res) => {
          for (let i = 0; i < res.length; i++) {
            fetch(`https://ghproxy.com/https://raw.githubusercontent.com/${res[i].repo}/main/config.yaml`, {
              method: "GET",
              referrer: "https://ghproxy.com",
            })
              .then((yaml) => yaml.text())
              .then((yaml) => {
                // 匹配 id  
                const id = yaml.match(/id: (.*)/)?.[1];
                if (!id) {
                  return;
                }
                setData((prev) => {
                  return [...prev.filter((item) => item.id !== id), {
                    repo: res[i].repo,
                    description: res[i].description,
                    id,
                  }]
                })
              })
          }
        }).then(() => {
          setLoading(false);
        })
    ])
  }, []);

  const navigate = useNavigate();
  useEffect(() => {
    navigate(`/themes?tab=${tab}`);
  }, [tab]);

  const InstallButton = ({ repo, disabled }: { repo: string, disabled?: boolean }) => {
    return (
      <button
        disabled={disabled}
        className={clsx(styles.button, styles.button4, styles.small)}
        onClick={(e) => {
          apiClient(`/themes/manager/download`, {
            query: {
              url: `https://github.com/${repo}/archive/refs/heads/main.zip`
            }
          }).then(() => {
            handleLocalData();
            e.currentTarget.innerHTML = "已安装";
            e.currentTarget.disabled = true;
          })
          Twindow({
            title: "安装中",
            text: "正在安装主题，请稍后",
          })
        }}
      >
        {disabled ? "已安装" : "安装"}
      </button>
    )
  };

  const UninstallButton = ({ id }: { id: string }) => {
    return (
      <button
        className={clsx(styles.button, styles.button3, styles.small)}
        onClick={(e) => {
          e.preventDefault();
          apiClient(`/themes/${id}`, {
            method: "DELETE",
            query: {
              id,
            }
          }).then(() => {
            handleLocalData();
            e.currentTarget.innerHTML = "已卸载";
            e.currentTarget.disabled = true;
          })
          
        }}
      >
        卸载
      </button>
    )
  };

  const ActiveButton = ({ id, active }: { id: string, active?: boolean }) => {
    return (
      <button
        disabled={active}
        className={clsx(styles.button, styles.button2, styles.small)}
        onClick={(e) => {
          apiClient(`/themes/${id}`, {
            method: "PATCH",
            query: {
              id,
            }
          }).then(() => {
            handleLocalData();
            e.currentTarget.innerHTML = "已启用";
            e.currentTarget.disabled = true;
          })
          Twindow({
            title: "启用中",
            text: "正在启用主题，请稍后",
          })
        }}
      >
        {active ? "已启用" : "启用"}
      </button>
    )
  };

  const SettingButton = ({ id }: { id: string }) => {
    return (
      <button
        className={clsx(styles.button, styles.button2, styles.small)}
        onClick={() => {
          setId(id);
        }}
      >
        设置
      </button>
    )
  };

  const Setting = ({ id }: { id: string }) => {
    // const data = localData.find((item) => item.id === id);
    const [config, setConfig] = useState<any>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      apiClient(`/themes/${id}/config`).then((res) => {
        setConfig(res.data);
        setLoading(false);
      })
    }, [id]);
    console.log(config)
    return (
      <>
        <Modal
          title="主题设置"
          onClose={() => {
            setId(undefined);
          }}
          type="confirm"
          size="lg"
          onConfirm={() => {
            apiClient(`/themes/${id}/config`, {
              method: "PATCH",
              body: {
                config: JSON.stringify(config),
              }
            }).then(() => {
              handleLocalData();
              Twindow({
                title: "设置成功",
                text: `主题 ${id} 配置保存成功`
              })
            })
            setId(undefined);
          }}
        >
          {
            loading && (
              <>
              <Loading loading={loading} />
              <Space 
                height={"48rem"}
              />
              </>
            )
          }
          {
            config && config.map((item: any, index: number) => {
              return (
                <div key={index} className={styles.modal}>
                  <ThemeComponent 
                    type={item.type}
                    label={item.name}
                    value={item.data ? item.data : item.value}
                    selected={item.value}
                    onChange={(value: string) => {
                      setConfig((prev: any) => {
                        prev[index].value = value;
                        return prev;
                      })
                    }}
                  />
                </div>
              )
            })
          }
        </Modal>
      </>
    )
  };

  return (
    <>
      <Loading loading={loading} />
      <div className={clsx("loading", !loading && "loaded")}>
        <Title>主题</Title>

        <Tab.Group
          defaultIndex={tab}
          onChange={(index) => {
            setTab(index)
          }}
        >
          <Tab.List className={tabs.tabList}>
            <Tab className={({ selected }) => clsx(tabs.tab, selected && tabs.selected)}>
              本地主题
            </Tab>
            <Tab className={({ selected }) => clsx(tabs.tab, selected && tabs.selected)}>
              线上市场
            </Tab>
          </Tab.List>
          <Tab.Panels>
          <Tab.Panel>
              <TableContainer
                className={postStyle.table}
                style={{ marginTop: "20px" }}
                header={["NAME", "DESCRIPTION", "ID", "AUTHOR", "ACTIONS"]}
                headerStyle={{ gridTemplateColumns: "1fr 1fr 1fr 1fr 2fr" }}
              >
                {
                  localData.map((item, index) => {
                    return (
                      <TableItem
                        header={["NAME", "DESCRIPTION", "ID", "AUTHOR", "ACTIONS"]}
                        className={clsx(postStyle.tableItem, "item")}
                        style={{ width: "100%", cursor: "pointer", gridTemplateColumns: "1fr 1fr 1fr 1fr 2fr" }}
                        key={index}
                      >
                        <TableItemValue>
                          {item.name}
                        </TableItemValue>
                        <TableItemValue>
                          {item.config && JSON.parse(item.config)?.description || "无描述"}
                        </TableItemValue>
                        <TableItemValue>
                          {item.id}
                        </TableItemValue>
                        <TableItemValue>
                          {item.config && JSON.parse(item.config)?.author || "未知"}
                        </TableItemValue>
                        <TableItemValue>
                          <ActiveButton id={item.id} active={item.active} />
                          <SettingButton id={item.id} />
                          <UninstallButton id={item.id} />
                        </TableItemValue>
                      </TableItem>
                    )
                  })
                }
              </TableContainer>
            </Tab.Panel>
            <Tab.Panel>
              <TableContainer
                className={postStyle.table}
                style={{ marginTop: "20px" }}
                headerStyle={{ width: "100%" }}
                header={["NAME", "DESCRIPTION", "ID", "AUTHOR", "ACTIONS"]}
              >
                {
                  data.map((item, index) => {
                    return (
                      <TableItem
                        header={["NAME", "DESCRIPTION", "ID", "AUTHOR", "ACTIONS"]}
                        className={clsx(postStyle.tableItem, "item")}
                        style={{ width: "100%", cursor: "pointer" }}
                        key={index}
                      >
                        <TableItemValue>
                          <a href={`https://github.com/${item.repo}`} target="_blank" rel="noreferrer">{item.repo?.split("/")?.[1]}</a>
                        </TableItemValue>
                        <TableItemValue>
                          {item.description}
                        </TableItemValue>
                        <TableItemValue>
                          {item.id}
                        </TableItemValue>
                        <TableItemValue>
                          @{item.repo?.split("/")?.[0]}
                        </TableItemValue>
                        <TableItemValue>
                          <InstallButton repo={item.repo}
                            disabled={localData.some && localData.some((local) => local.id === item.id)}
                          />
                        </TableItemValue>
                      </TableItem>
                    )
                  })
                }
              </TableContainer>
            </Tab.Panel>
            
          </Tab.Panels>
        </Tab.Group>
        {
          id && (
            <Setting id={id} />
          )
        }
      </div>
    </>
  )
};