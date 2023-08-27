import { Tab } from "@headlessui/react";
import tabs from "@components/universal/Tabs/index.module.css";
import { AddOne, Detection, Rss } from "@icon-park/react";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loading } from "@components/universal/Loading";
import { Modal, ModalBody } from "@components/universal/Modal";
import { Title } from "@components/universal/Title";
import type { BasicPage } from "@type/basic";
import { apiClient } from "@utils/request";
import { getQueryVariable } from "@utils/url";

import postStyles from "@pages/Posts/Index/index.module.css";
import { Input } from "@pages/Write/Input";
import { Textarea } from "@components/ui/textarea";
import styles from "./index.module.css";
import { jump } from "@utils/path";
import { useSeo } from "@hooks/useSeo";
import { toast } from "sonner";
import { ActionButton } from "@components/widgets/ActionButtons";
import { Select } from "@components/widgets/ThemeComponent/ThemeSelect";
import { FriendsListDataTable } from "./Table/data-table";
import { friendsListColumns } from "./Table/column";
import { Label } from "@components/ui/label";

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
  useSeo("朋友 · 列表");
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
              URL: select[0] ? `/friends/${select[0]}` : "/friends",
              title: select[0] ? "修改成功" : "添加成功",
            };
            const request = async () => {
              await apiClient(REQUEST.URL, {
                method: REQUEST.method,
                body: JSON.stringify(item),
              }).then(() => {
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
            };
            toast.promise(request, {
              loading: "正在提交",
              success: "提交成功",
              error: "提交失败",
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

            <Select
              data={FriendsStatus.map((i, index) => {
                return {
                  label: i,
                  value: String(index),
                };
              })}
              onChange={(e) => {
                setItem({
                  ...item,
                  status: e,
                });
              }}
              value={String(item.status)}
              placeholder="请选择友链状态"
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
          <Label>站点描述</Label>
          <Textarea
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

            <Select
              data={["rss", "atom"].map((i) => {
                return {
                  label: i,
                  value: i,
                };
              })}
              value={item.feed_type}
              onChange={(e) => {
                setItem({
                  ...item,
                  feed_type: e,
                  feedType: e,
                });
              }}
              placeholder="请选择订阅类型"
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
        <FriendsListDataTable
          columns={friendsListColumns}
          data={friends}
          deletePath="/friends"
        />
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
              <ActionButton
                label="新增友链"
                icon={<AddOne />}
                action={() => {
                  setShowEditModal(true);
                }}
              />
              {tab == 0 && (
                <>
                  <ActionButton
                    label="抓取订阅"
                    icon={<Rss />}
                    action={() => {
                      toast.promise(apiClient("/friends/feeds"), {
                        loading: "正在申请抓取订阅",
                        success: "已申请抓取活动",
                        error: "申请抓取失败",
                      });
                    }}
                  />

                  <ActionButton
                    label="存活性检查"
                    icon={<Detection />}
                    action={() => {
                      const request = async () => {
                        return await apiClient("/friends/alive").then((res) => {
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
                      };
                      toast.promise(request, {
                        loading: "正在检查存活性",
                        success: `存活性检查完成`,
                        error: "存活性检查失败",
                      });
                    }}
                  />
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
            <Tab
              className={({ selected }) =>
                clsx(tabs.tab, selected && tabs.selected)
              }
            >
              已通过
            </Tab>
            <Tab
              className={({ selected }) =>
                clsx(tabs.tab, selected && tabs.selected)
              }
            >
              待审核
            </Tab>
            <Tab
              className={({ selected }) =>
                clsx(tabs.tab, selected && tabs.selected)
              }
            >
              垃圾友链
            </Tab>
            <Tab
              className={({ selected }) =>
                clsx(tabs.tab, selected && tabs.selected)
              }
            >
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
