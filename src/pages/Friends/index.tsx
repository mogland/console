import { Tab } from "@headlessui/react";
import tabs from "@components/universal/Tabs/index.module.css";
import {
  Clear,
  Delete,
  Edit,
  AddOne,
  Detection,
  SendEmail,
  CheckSmall,
  CloseSmall,
  Redo,
  Rss,
} from "@icon-park/react";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loading } from "@components/universal/Loading";
import { Modal, ModalBody } from "@components/universal/Modal";
import { Selects } from "@components/universal/Select";
import { Title } from "@components/universal/Title";
import { Twindow } from "@components/universal/Twindow";
import type { BasicPage } from "@type/basic";
import { apiClient } from "@utils/request";
import { getQueryVariable } from "@utils/url";
import {
  TableContainer,
  TableItem,
  TableItemValue,
} from "@pages/Home/universal";
import postStyles from "@pages/Posts/Index/index.module.css";
import { Input, Textarea } from "@pages/Write/Input";
import styles from "./index.module.css";
import { jump } from "@utils/path";

const FriendsStatus = ["Approved", "Pending", "Spam", "Trash"];
const FriendsFormFront = [
  {
    name: "站点名称",
    key: "name",
  },
  {
    name: "站点地址",
    key: "link",
  },
  {
    name: "站点图标",
    key: "logo",
  },
  {
    name: "互链验证链接",
    key: "verifyLink",
  },
];
const FriendsFormBack = [
  {
    name: "订阅地址",
    key: "feed",
  },
  {
    name: "主人昵称",
    key: "nickname",
  },
  {
    name: "主人邮箱",
    key: "email",
  },
  {
    name: "主人头像",
    key: "avatar",
  },
  {
    name: "友链分组",
    key: "group",
  },
];

export const FriendsPage: BasicPage = () => {
  const [loading, setLoading] = useState(true);
  const [inSideLoading, setInSideLoading] = useState(true);
  const [select, setSelect] = useState<string[]>([]);
  const [friends, setFriends] = useState<any[]>([]);
  const status = getQueryVariable("status");
  const [tab, setTab] = useState(Number(status));
  const [showEditModal, setShowEditModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (status !== "0" && status !== "1" && status !== "2" && status !== "3") {
      setTab(0);
      navigate(jump("/friends?status=0"));
    } else {
      setTab(Number(status));
    }
  }, [status]);

  useEffect(() => {
    setInSideLoading(true);
    setSelect([]);
    console.log(tab === 0 ? undefined : tab);
    apiClient("/friends/all", {
      query: {
        status: tab === 0 ? undefined : tab,
      },
    }).then((res) => {
      setFriends(res.data);
      setInSideLoading(false);
      setLoading(false);
    });
  }, [tab]);

  const EditModal = () => {
    const [item, setItem] = useState<any>(
      friends.find((i) => i.id === select[0]) || {}
    );
    return (
      <>
        <Modal
          title={select[0] ? "修改信息" : "添加好友"}
          type="confirm"
          doubleClick={{
            cancel: true,
          }}
          onClose={() => {
            setShowEditModal(false);
            setSelect([]);
          }}
          onConfirm={() => {
            const REQUEST = {
              method: select[0] ? "PUT" : "POST",
              URL: select[0] ? jump(`/friends/${select[0]}`) : jump("/friends"),
              title: select[0] ? "修改成功" : "添加成功",
            };
            apiClient(REQUEST.URL, {
              method: REQUEST.method,
              body: JSON.stringify(item),
            }).then(() => {
              Twindow({
                title: REQUEST.title,
                text: "正在重新加载数据",
              });
              setShowEditModal(false);
              setSelect([]);
              setInSideLoading(true);
              apiClient("/friends/all", {
                query: {
                  status: tab === 0 ? undefined : tab,
                },
              }).then((res) => {
                setFriends(res.data);
                setInSideLoading(false);
              });
            });
          }}
          options={{
            confirmText: "提交",
          }}
        >
          <div className={styles["oneLine"]}>
            <span style={{ marginRight: "1rem" }}>
              <ModalBody>友链状态</ModalBody>
            </span>
            <Selects
              value={FriendsStatus.map((i, index) => {
                return {
                  name: i,
                  value: index,
                };
              })}
              onChange={(e) => {
                setItem({
                  ...item,
                  status: e,
                });
              }}
              selected={
                item.status && {
                  name: FriendsStatus[item.status],
                  value: item.status,
                }
              }
            />
          </div>
          {FriendsFormFront.map((i) => {
            return (
              <Input
                key={i.key}
                style={{
                  width: "100%",
                }}
                label={i.name}
                value={item[i.key]}
                onChange={(e) => {
                  setItem({
                    ...item,
                    [i.key]: e,
                  });
                }}
                oneLine
              />
            );
          })}
          <Textarea
            label="站点描述"
            value={item.desc}
            onChange={(e) => {
              setItem({
                ...item,
                desc: e,
              });
            }}
          />
          {select[0] && (
            <Input
              disabled
              style={{
                width: "100%",
                backgroundColor: "var(--background-color-tertiary)",
              }}
              label="友链凭证"
              value={item.token}
              oneLine
            />
          )}
          <div className={styles["oneLine"]}>
            <span style={{ marginRight: "1rem" }}>
              <ModalBody>订阅类型</ModalBody>
            </span>
            <Selects
              value={["rss", "atom"].map((i) => {
                return {
                  name: i,
                  value: i,
                };
              })}
              selected={
                item.feed_type && {
                  name: item.feed_type,
                  value: item.feed_type,
                }
              }
              onChange={(e) => {
                setItem({
                  ...item,
                  feed_type: e.value,
                  feedType: e.value,
                });
              }}
            />
          </div>
          {FriendsFormBack.map((i) => {
            return (
              <Input
                key={i.key}
                label={i.name}
                value={item[i.key]}
                style={{
                  width: "100%",
                }}
                onChange={(e) => {
                  setItem({
                    ...item,
                    [i.key]: e,
                  });
                }}
                oneLine
              />
            );
          })}
        </Modal>
      </>
    );
  };

  const FriendsList = () => {
    return (
      <div>
        <Loading loading={inSideLoading} />
        <>
          <TableContainer
            header={["NAME", "DESCRIPTION", "EMAIL", "GROUP", "AUTOCHECK"]}
          >
            {friends?.map((item, index) => {
              return (
                <TableItem
                  header={[
                    "NAME",
                    "DESCRIPTION",
                    "EMAIL",
                    "GROUP",
                    "AUTOCHECK",
                  ]}
                  key={index}
                  onClick={(e) => {
                    if (e.currentTarget.classList.contains(postStyles.select)) {
                      setSelect(select.filter((i) => i !== item.id));
                    } else {
                      setSelect([...select, item.id]);
                    }
                  }}
                  aria-label={item.id}
                  className={
                    (select.includes(item.id) && postStyles.select) || ""
                  }
                >
                  <TableItemValue>{item.name}</TableItemValue>
                  <TableItemValue>{item.desc}</TableItemValue>
                  <TableItemValue>{item.email}</TableItemValue>
                  <TableItemValue>{item.group}</TableItemValue>
                  <TableItemValue>
                    {item.auto_check ? "已互链" : "疑似不存在"}
                  </TableItemValue>
                </TableItem>
              );
            })}
          </TableContainer>
        </>
      </div>
    );
  };

  return (
    <>
      <Loading loading={loading} />
      <div
        className={clsx(postStyles.container, "loading", !loading && "loaded")}
      >
        <Title>
          <div className={postStyles.head}>
            <span className={postStyles.headTitle}>朋友 · 列表</span>
            <div>
              {(select.length && (
                <button
                  className={postStyles.button}
                  onClick={() => {
                    setSelect([]);
                    const items = document.querySelectorAll(
                      `.${postStyles.select}`
                    );
                    items.forEach((item) => {
                      item.classList.remove(postStyles.select);
                    });
                  }}
                >
                  <Clear />
                </button>
              )) ||
                null}
              {(select.length && (
                <button
                  className={postStyles.button}
                  onClick={(e) => {
                    if (
                      e.currentTarget.classList.contains(postStyles.confrim)
                    ) {
                      // select.forEach((item) => {
                      //   apiClient(`/post/${item}`, {
                      //     method: "DELETE",
                      //   })
                      // })
                      setFriends(friends.filter((item) => !select.includes(item.id)));
                      setSelect([]);
                    } else {
                      e.currentTarget.classList.add(postStyles.confrim);
                    }
                  }}
                >
                  <Delete />
                </button>
              )) ||
                null}
              {(select.length && tab == 1 && (
                <button
                  className={postStyles.button}
                  onClick={(e) => {
                    if (
                      e.currentTarget.classList.contains(postStyles.confrim)
                    ) {
                      select.forEach((item) => {
                        apiClient(`/friends/status/${item}`, {
                          method: "PATCH",
                          body: {
                            status: 0,
                          },
                        });
                      });
                      setFriends(
                        friends.filter((item) => !select.includes(item.id))
                      );
                      setSelect([]);
                    } else {
                      e.currentTarget.classList.add(postStyles.confrim);
                    }
                  }}
                >
                  <CheckSmall />
                </button>
              )) ||
                null}
              {(select.length && tab == 0 && (
                <button
                  className={postStyles.button}
                  onClick={(e) => {
                    if (
                      e.currentTarget.classList.contains(postStyles.confrim)
                    ) {
                      select.forEach((item) => {
                        apiClient(`/friends/status/${item}`, {
                          method: "PATCH",
                          body: {
                            status: 1,
                          },
                        });
                      });
                      setFriends(
                        friends.filter((item) => !select.includes(item.id))
                      );
                      setSelect([]);
                    } else {
                      e.currentTarget.classList.add(postStyles.confrim);
                    }
                  }}
                >
                  <CloseSmall />
                </button>
              )) ||
                null}
              {(select.length && (
                <button
                  className={postStyles.button}
                  onClick={() => {
                    window.open(
                      `mailto:${select
                        .map((item) => {
                          return friends.find((i) => i.id === item)?.email;
                        })
                        .join(",")}`
                    );
                  }}
                >
                  <SendEmail />
                </button>
              )) ||
                null}
              {(select.length && (
                <button
                  className={postStyles.button}
                  onClick={() => {
                    Twindow({
                      title: "批量检查 - 互链",
                      text: "正在重新自动检查是否互链, 结果仅供参考",
                    });
                    select.forEach((item) => {
                      apiClient(`/friends/${item}/check`).then((res) => {
                        setFriends(
                          friends.map((i) => {
                            if (i.id === item) {
                              return {
                                ...i,
                                auto_check: res.data,
                              };
                            }
                            return i;
                          })
                        );
                        Twindow({
                          title: `互链检查 - ${
                            friends.find((i) => i.id === item)?.name
                          }`,
                          text: res.data
                            ? "站点已互链"
                            : "检查验证链接后疑似不存在，建议自行前往站点检查",
                        });
                      });
                    });
                  }}
                >
                  <Redo />
                </button>
              )) ||
                null}
              {(select.length === 1 && (
                <button
                  className={postStyles.button}
                  onClick={() => {
                    setShowEditModal(true);
                  }}
                >
                  <Edit />
                </button>
              )) ||
                null}
              <button
                className={postStyles.button}
                onClick={() => {
                  setShowEditModal(true);
                }}
              >
                <AddOne />
              </button>
              {tab == 0 && (
                <>
                  <button
                    className={postStyles.button}
                    onClick={() => {
                      Twindow({
                        title: "开始抓取 - 友链订阅",
                        text: `等待服务器返回检查结果`,
                      });
                      apiClient("/friends/feeds")
                        .then(() => {
                          Twindow({
                            title: "抓取结果",
                            text: `已抓取全部可用订阅，请前往 \`朋友动态\`页面查看`,
                          });
                        })
                        .catch(() => {
                          Twindow({
                            title: "抓取结果",
                            text: `抓取疑似全部失败，请检查服务器日志`,
                          });
                        });
                    }}
                  >
                    <Rss />
                  </button>
                  <button
                    className={postStyles.button}
                    onClick={() => {
                      Twindow({
                        title: "开始检测 - 有效链接",
                        text: `等待服务器返回检查结果`,
                      });
                      apiClient("/friends/alive").then((res) => {
                        Twindow({
                          title: "检测结果",
                          text: `检测到 ${
                            res.data.filter((item) => item.is_alive).length
                          } 个有效链接`,
                        });
                        res.data.forEach((item) => {
                          const target = document.querySelector(
                            `[aria-label="${item.id}"]`
                          );
                          if (target) {
                            if (item.is_alive) {
                              target.classList.add(styles.alive);
                            } else {
                              target.classList.add(styles.dead);
                            }
                          }
                        });
                      });
                    }}
                  >
                    <Detection />
                  </button>
                </>
              )}
            </div>
          </div>
        </Title>

        <Tab.Group
          defaultIndex={tab}
          onChange={(index) => {
            setTab(index);
            navigate(jump(`/friends?status=${index}`));
          }}
        >
          <Tab.List className={tabs.tabList}>
            <Tab className={({ selected }) => clsx(tabs.tab, selected && tabs.selected)}>
              已通过
            </Tab>
            <Tab className={({ selected }) => clsx(tabs.tab, selected && tabs.selected)}>
              待审核
            </Tab>
            <Tab className={({ selected }) => clsx(tabs.tab, selected && tabs.selected)}>
              垃圾友链
            </Tab>
            <Tab className={({ selected }) => clsx(tabs.tab, selected && tabs.selected)}>
              回收站
            </Tab>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
              <FriendsList />
            </Tab.Panel>
            <Tab.Panel>
              <FriendsList />
            </Tab.Panel>
            <Tab.Panel>
              <FriendsList />
            </Tab.Panel>
            <Tab.Panel>
              <FriendsList />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
      {showEditModal && <EditModal />}
    </>
  );
};
