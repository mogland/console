/*
 * @FilePath: /nx-admin/src/pages/Friends/index.tsx
 * @author: Wibus
 * @Date: 2022-07-30 17:42:24
 * @LastEditors: Wibus
 * @LastEditTime: 2022-08-21 12:54:26
 * Coding With IU
 */
import {
  Button,
  Input,
  Modal,
  Pagination,
  Popover,
  Select,
  Spacer,
  Table,
  Tabs,
  Text,
  useClasses,
  useModal,
} from "@geist-ui/core";
import { Plus, UserCheck } from "@geist-ui/icons";
import { useEffect, useState } from "react";
import { message } from "react-message-popup";
import { useLocation, useNavigate } from "react-router-dom";
import { useMount } from "react-use";
import Dashboards from "../../components/layouts/Dashboards";
import { NxPage } from "../../components/widgets/Page";
import type { BasicPage } from "../../types/basic";
import { apiClient } from "../../utils/request";
import "./index.css";

export const Friends: BasicPage = () => {
  const appNavigate = useNavigate();

  const { search } = useLocation();
  const params = new URLSearchParams(search);

  const { setVisible, bindings } = useModal();
  const {
    setVisible: setAddVisible,
    bindings: addBinds,
  } = useModal();

  const [moreMessage, setMoreMessage] = useState<any>();
  const [addLink, setAddLink] = useState<any>({
    data: {},
  });

  const [links, setLinks] = useState<any[]>([]);
  const [totalPage, setTotalPage] = useState(1);
  const [nowPage, setNowPage] = useState(Number(params.get("page")) || 1);
  const [nowTab, setNowTab] = useState(params.get("tab") || "1");

  const request = async () => {
    await apiClient
      .get("/links", null, [
        { key: "page", value: nowPage },
        { key: "size", value: 6 },
        { key: "status", value: Number(nowTab) - 1 },
      ])
      .then((res) => {
        const { data } = res as any;
        const result = [] as any[];
        for (const index of Object.keys(data)) {
          const typesNum = data[index].types;
          const types =
            typesNum === 0 ? "好友" : typesNum === 1 ? "收藏" : "导航链接";
          result.push({
            id: data[index].id,
            name: data[index].name,
            url: data[index].url,
            avatar: data[index].avatar,
            description: data[index].description,
            email: data[index].email || "",
            rss_type: data[index].rss_type,
            rss_status: data[index].rss_status,
            rss: data[index].rss,
            created: data[index].created.split("T")[0],
            types,
            type: data[index].types,
            status: data[index].status,
          });
        }
        setLinks(result);
        setTotalPage(res.pagination.total_page);
      });
  };

  useMount(async () => {
    await request();
  });

  useEffect(() => {
    request();
  }, [nowPage, nowTab]);

  const avatarElement = (value, rowData, index) => {
    const link = links[index];
    return (
      <>
        <img className={"avatar"} src={link.avatar} alt="avatar" width={200}/>
      </>
    );
  };

  const urlElement = (value, rowData, index) => {
    return (
      <a href={links[index].url} target="_blank">
        {links[index].url}
      </a>
    );
  };

  const actionElement = (value, rowData, index) => {
    const link = links[index];

    const [deleteVisible, setDeleteVisible] = useState(false);
    const changeHandler = (next) => {
      setDeleteVisible(next);
    };
    const content = () => {
      return (
        <div style={{ padding: 20, paddingBottom: 0 }}>
          <Text h5 b>
            是否要删除友链 {link.name} ？
          </Text>
          {/* <Text p>将会把评论与子评论一同删除</Text> */}
          <Button
            auto
            scale={1 / 3}
            font="12px"
            style={{ margin: 10 }}
            onClick={async () => {
              await apiClient.delete(`/links/${link.id}`).then(() => {
                message.success(`已将友链 ${link.name} 删除`);
                request();
              });
            }}
          >
            确定
          </Button>
          <Button
            auto
            type="error"
            scale={1 / 3}
            font="12px"
            style={{ margin: 10 }}
            onClick={() => setDeleteVisible(false)}
          >
            取消
          </Button>
        </div>
      );
    };

    return (
      <div
        style={{
          display: "flex",
          flexFlow: "column nowrap",
          justifyContent: "flex-start",
        }}
      >
        <div style={{ maxWidth: "100%", marginBottom: "2px" }}>
          <div className="space-x-3">
            <button
              className="success-btn"
              type="button"
              onClick={async () => {
                await apiClient
                  .patch(`/links/status/${link.id}`, null, null, {})
                  .then(() => {
                    message.success(`已通过友链 ${link.name} `);
                    request();
                  });
              }}
            >
              <span className="button-content">通过</span>
            </button>
            <button
              className="warning-btn"
              type="button"
              onClick={async () => {
                await apiClient
                  .patch(
                    `/links/status/${link.id}`,
                    null,
                    [{ key: "status", value: 2 }],
                    {}
                  )
                  .then(() => {
                    message.warning(`已将友链 ${link.name} 封禁`);
                    request();
                  });
              }}
            >
              <span className="button-content">封禁</span>
            </button>
            <Popover
              content={content}
              visible={deleteVisible}
              onVisibleChange={changeHandler}
            >
              <button
                className="danger-btn"
                type="button"
                style={{ marginLeft: 0 }}
              >
                <span className="button-content">删除</span>
              </button>
            </Popover>
            <button
              className="info-btn"
              type="button"
              onClick={() => {
                setVisible(true);
                setMoreMessage({
                  data: link,
                });
              }}
            >
              <span className="button-content">更多信息</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <NxPage title={"Friends"}>
      <Button
        type="secondary"
        onClick={() => {
          setAddVisible(true);
        }}
        style={{
          borderRadius: "100%",
          width: "50px",
          height: "50px",
          minHeight: "50px",
          minWidth: "50px",
          float: "right",
          position: "fixed",
          top: "62px",
          right: 115,
          padding: 0,
          paddingTop: "13px",
          paddingLeft: "1px",
          marginLeft: 10,
        }}
      >
        <Plus />
      </Button>
      <Button
        style={{
          marginRight: 10,
          borderRadius: "100%",
          width: "50px",
          height: "50px",
          minHeight: "50px",
          minWidth: "50px",
          top: "62px",
          float: "right",
          position: "fixed",
          right: 35,
          padding: 0,
          paddingTop: "13px",
          paddingLeft: "1px",
        }}
      >
        <UserCheck />
      </Button>
      <Dashboards.Container
        className="lg:grid flex flex-col"
        gridTemplateColumns="1fr"
      >
        <Dashboards.Area
          className={useClasses("overflow-x-hidden")}
          style={{ overflow: "auto", width: "100%" }}
        >
          <Tabs
            initialValue={nowTab}
            marginTop={1}
            width={"100%"}
            onChange={(val) => {
              setNowTab(val);
              appNavigate(`/friends?page=${nowPage}&tab=${val}`);
            }}
          >
            <Tabs.Item label="待审核" value="1">
              <Table data={links} id="links-table">
                <Table.Column
                  label="头像"
                  prop="email"
                  render={avatarElement}
                />
                <Table.Column label="名称" prop="name" />
                <Table.Column label="描述" prop="description" />
                <Table.Column label="网址" prop="url" render={urlElement} />
                <Table.Column label="种类" prop="types" />
                <Table.Column label="对方邮箱" prop="email" />
                <Table.Column label="提交时间" prop="created" />
                <Table.Column
                  label="操作"
                  prop="action"
                  render={actionElement}
                />
              </Table>
            </Tabs.Item>
            <Tabs.Item label="朋友们" value="2">
              <Table data={links} id="links-table">
                <Table.Column
                  label="头像"
                  prop="email"
                  render={avatarElement}
                />
                <Table.Column label="名称" prop="name" />
                <Table.Column label="描述" prop="description" />
                <Table.Column label="网址" prop="url" render={urlElement} />
                <Table.Column label="种类" prop="types" />
                <Table.Column label="对方邮箱" prop="email" />
                <Table.Column label="提交时间" prop="created" />
                <Table.Column
                  label="操作"
                  prop="action"
                  render={actionElement}
                />
              </Table>
            </Tabs.Item>
            <Tabs.Item label="封禁的" value="3">
              <Table data={links} id="links-table">
                <Table.Column
                  label="头像"
                  prop="email"
                  render={avatarElement}
                />
                <Table.Column label="名称" prop="name" />
                <Table.Column label="描述" prop="description" />
                <Table.Column label="网址" prop="url" render={urlElement} />
                <Table.Column label="种类" prop="types" />
                <Table.Column label="对方邮箱" prop="email" />
                <Table.Column label="提交时间" prop="created" />
                <Table.Column
                  label="操作"
                  prop="action"
                  render={actionElement}
                />
              </Table>
            </Tabs.Item>
          </Tabs>
        </Dashboards.Area>
      </Dashboards.Container>
      <Pagination
        count={totalPage}
        initialPage={nowPage}
        style={{
          float: "right",
        }}
        onChange={(page) => {
          setNowPage(page);
          appNavigate(`/friends?page=${page}&tab=${nowTab}`);
        }}
      />
      <Modal {...bindings}>
        <Modal.Title>
          关于 &nbsp;{moreMessage && moreMessage.data.name}&nbsp;{" "}
        </Modal.Title>
        <Modal.Content>
          {moreMessage && (
            <>
              <Select
                width={"100%"}
                placeholder="链接类型"
                initialValue={String(moreMessage.data.type)}
                onChange={(v) => {
                  setMoreMessage({
                    ...moreMessage,
                    data: {
                      ...moreMessage.data,
                      type: Number(v),
                    },
                  });
                }}
              >
                <Select.Option value="0">好友</Select.Option>
                <Select.Option value="1">收藏</Select.Option>
                <Select.Option value="2">导航连接</Select.Option>
              </Select>
              <Spacer />
              <Input
                width={"100%"}
                label="站点名称"
                placeholder=""
                initialValue={moreMessage.data.name}
                onChange={(e) => {
                  setMoreMessage({
                    ...moreMessage,
                    data: {
                      ...moreMessage.data,
                      name: e.target.value,
                    },
                  });
                }}
              />
              <Spacer />
              <Input
                width={"100%"}
                label="描述"
                placeholder=""
                initialValue={moreMessage.data.description}
                onChange={(e) => {
                  setMoreMessage({
                    ...moreMessage,
                    data: {
                      ...moreMessage.data,
                      description: e.target.value,
                    },
                  });
                }}
              />
              <Spacer />
              <Input
                width={"100%"}
                label="链接"
                placeholder="仅支持 HTTPS 链接"
                initialValue={moreMessage.data.url}
                onChange={(e) => {
                  setMoreMessage({
                    ...moreMessage,
                    data: {
                      ...moreMessage.data,
                      url: e.target.value,
                    },
                  });
                }}
              />
              <Spacer />
              <Input
                width={"100%"}
                label="站点图标"
                placeholder="仅支持 HTTPS 链接"
                initialValue={moreMessage.data.avatar}
                onChange={(e) => {
                  setMoreMessage({
                    ...moreMessage,
                    data: {
                      ...moreMessage.data,
                      avatar: e.target.value,
                    },
                  });
                }}
              />
              <Spacer />

              <Input
                width={"100%"}
                label="RSS 订阅情况"
                disabled
                initialValue={
                  moreMessage.data.rss_status ? "成功" : "失败或未开始爬取"
                }
              />

              <Spacer />
              <Input
                width={"100%"}
                label="RSS 订阅类型"
                placeholder="应输入 rss 或 atom "
                initialValue={moreMessage.data.rss_type}
                onChange={(e) => {
                  setMoreMessage({
                    ...moreMessage,
                    data: {
                      ...moreMessage.data,
                      rss_type: e.target.value,
                    },
                  });
                }}
              />
              <Spacer />
              <Input
                width={"100%"}
                label="RSS 订阅链接"
                placeholder="仅接受 HTTPS 链接"
                initialValue={moreMessage.data.rss}
                onChange={(e) => {
                  setMoreMessage({
                    ...moreMessage,
                    data: {
                      ...moreMessage.data,
                      rss: e.target.value,
                    },
                  });
                }}
              />
              <Spacer />
              <Input
                width={"100%"}
                label="对方邮箱"
                initialValue={moreMessage.data.email}
                onChange={(e) => {
                  setMoreMessage({
                    ...moreMessage,
                    data: {
                      ...moreMessage.data,
                      email: e.target.value,
                    },
                  });
                }}
              />
            </>
          )}
        </Modal.Content>
        <Modal.Action
          passive
          onClick={async () => {
            const data = moreMessage.data;
            data.types = data.type;
            await apiClient
              .patch(
                `/links/${moreMessage.data.id}`,
                null,
                null,
                JSON.stringify(data)
              )
              .then(() => {
                message.success(`已更新友链 ${data.name} 信息`);
                setVisible(false);
                setMoreMessage(null);
              })
              .catch(() => {
                message.error(`出现错误，无法更新`);
              });
          }}
        >
          应用 (修改数据)
        </Modal.Action>
        <Modal.Action
          onClick={() => {
            setVisible(false);
            setMoreMessage(null);
          }}
        >
          了解 (不修改数据){" "}
        </Modal.Action>
      </Modal>
      <Modal {...addBinds}>
        <Modal.Title>
          新增 &nbsp;{addLink && addLink.data.name}&nbsp;{" "}
        </Modal.Title>
        <Modal.Content>
          {
            <>
              <Select
                width={"100%"}
                placeholder="链接类型"
                initialValue={
                  addLink.data.type ? String(addLink.data.type) : "0"
                }
                onChange={(v) => {
                  setAddLink({
                    ...addLink,
                    data: {
                      ...addLink.data,
                      type: Number(v),
                    },
                  });
                }}
              >
                <Select.Option value="0">好友</Select.Option>
                <Select.Option value="1">收藏</Select.Option>
                <Select.Option value="2">导航连接</Select.Option>
              </Select>
              <Spacer />
              <Input
                width={"100%"}
                label="站点名称"
                placeholder=""
                initialValue={addLink.data.name && addLink.data.name}
                onChange={(e) => {
                  setAddLink({
                    ...addLink,
                    data: {
                      ...addLink.data,
                      name: e.target.value,
                    },
                  });
                }}
              />
              <Spacer />
              <Input
                width={"100%"}
                label="描述"
                placeholder=""
                initialValue={
                  addLink.data.description && addLink.data.description
                }
                onChange={(e) => {
                  setAddLink({
                    ...addLink,
                    data: {
                      ...addLink.data,
                      description: e.target.value,
                    },
                  });
                }}
              />
              <Spacer />
              <Input
                width={"100%"}
                label="链接"
                placeholder="仅支持 HTTPS 链接"
                initialValue={addLink.data.url && addLink.data.url}
                onChange={(e) => {
                  setAddLink({
                    ...addLink,
                    data: {
                      ...addLink.data,
                      url: e.target.value,
                    },
                  });
                }}
              />
              <Spacer />
              <Input
                width={"100%"}
                label="站点图标"
                placeholder="仅支持 HTTPS 链接"
                initialValue={addLink.data.avatar && addLink.data.avatar}
                onChange={(e) => {
                  setAddLink({
                    ...addLink,
                    data: {
                      ...addLink.data,
                      avatar: e.target.value,
                    },
                  });
                }}
              />
              <Spacer />

              <Input
                width={"100%"}
                label="RSS 订阅情况"
                disabled
                initialValue={
                  addLink.data.rss_status ? "成功" : "失败或未开始爬取"
                }
              />

              <Spacer />
              <Input
                width={"100%"}
                label="RSS 订阅类型"
                placeholder="应输入 rss 或 atom "
                initialValue={addLink.data.rss_type && addLink.data.rss_type}
                onChange={(e) => {
                  setAddLink({
                    ...addLink,
                    data: {
                      ...addLink.data,
                      rss_type: e.target.value,
                    },
                  });
                }}
              />
              <Spacer />
              <Input
                width={"100%"}
                label="RSS 订阅链接"
                placeholder="仅接受 HTTPS 链接"
                initialValue={addLink.data.rss && addLink.data.rss}
                onChange={(e) => {
                  setAddLink({
                    ...addLink,
                    data: {
                      ...addLink.data,
                      rss: e.target.value,
                    },
                  });
                }}
              />
              <Spacer />
              <Input
                width={"100%"}
                label="对方邮箱"
                initialValue={addLink.data.email && addLink.data.email}
                onChange={(e) => {
                  setAddLink({
                    ...addLink,
                    data: {
                      ...addLink.data,
                      email: e.target.value,
                    },
                  });
                }}
              />
            </>
          }
        </Modal.Content>
        <Modal.Action
          passive
          onClick={() => {
            setAddVisible(false);
            setAddLink({
              data: {},
            });
          }}
        >
          取消
        </Modal.Action>

        <Modal.Action
          onClick={async () => {
            const data = addLink.data;
            data.types = data.type || 0;
            data.author = data.author || "admin";
            console.log(data);
            await apiClient
              .post(`/links/apply`, null, null, JSON.stringify(data))
              .then(() => {
                message.success(`已新增友链 ${data.name}`);
                setAddVisible(false);
                setAddLink({
                  data: {},
                });
                request();
              })
              .catch(() => {
                message.error(`出现错误，无法更新`);
              });
          }}
        >
          添加
        </Modal.Action>
      </Modal>
    </NxPage>
  );
};
