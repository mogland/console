/*
 * @FilePath: /nx-admin/src/pages/Comments/index.tsx
 * @author: Wibus
 * @Date: 2022-07-15 18:45:35
 * @LastEditors: Wibus
 * @LastEditTime: 2022-08-09 15:08:10
 * Coding With IU
 */

import {
  Button,
  Loading,
  Modal,
  Pagination,
  Popover,
  Table,
  Tabs,
  Text,
  Textarea,
  useClasses,
  useModal,
} from "@geist-ui/core";
import { useEffect, useState } from "react";
import { message } from "react-message-popup";
import { useNavigate } from "react-router-dom";
import { useLocation, useMount } from "react-use";
import Dashboards from "../../components/layouts/Dashboards";
import { NxPage } from "../../components/widgets/Page";
import type { BasicPage } from "../../types/basic";
import { getAvatarUrl } from "../../utils/extra";
import { apiClient } from "../../utils/request";
import "./index.css";

export const Comments: BasicPage = () => {
  const appNavigate = useNavigate();

  const { search } = useLocation();
  const params = new URLSearchParams(search);

  const { setVisible, bindings } = useModal();
  const [reply, setReply] = useState<any>();

  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPage, setTotalPage] = useState(1);
  const [nowPage, setNowPage] = useState(Number(params.get("page")) || 1);
  const [nowTab, setNowTab] = useState(params.get("tab") || "1");

  const request = async () => {
    await apiClient
      .get("/comments", null, [
        { key: "page", value: nowPage },
        { key: "size", value: 5 },
        { key: "status", value: Number(nowTab) - 1 },
      ])
      .then((res) => {
        // console.log(res)
        const { data } = res as any;
        const content = [] as any[];
        for (const index of Object.keys(data)) {
          content.push({
            id: data[index].id,
            author: data[index].author,
            text: data[index].text,
            created: data[index].created.split("T")[0],
            ref_type:
              (data[index].ref_type === "Post" && "文章") ||
              (data[index].ref_type === "Page" && "页面"),
            parent: data[index].parent,
            ref: data[index].ref,
            mail: data[index].mail,
            status: data[index].status,
            agent: data[index].agent,
            ip: data[index].ip,
          });
        }
        setComments(content);
        setTotalPage(res.pagination.total_page);
        setLoading(false);
      });
  };

  useMount(async () => {
    await request();
  });

  // 实时监听
  useEffect(() => {
    request();
  }, [nowPage, nowTab]);

  const avatarElement = (value, rowData, index) => {
    const comment = comments[index];
    return (
      <>
        <img
          className={"avatar"}
          src={getAvatarUrl(comment.mail)}
          alt="avatar"
        />
      </>
    );
  };
  const authorElement = (value, rowData, index) => {
    const comment = comments[index];
    return (
      <div
        style={{
          display: "flex",
          flexFlow: "column nowrap",
          justifyContent: "flex-start",
        }}
      >
        <div
          style={{ maxWidth: "100%", marginBottom: "2px", fontSize: "12px" }}
        >
          <a href={comment.url} target="_blank" rel="noreferrer">
            {comment.author}
          </a>
        </div>

        <div
          style={{ maxWidth: "100%", marginBottom: "2px", fontSize: "12px" }}
        >
          <a href={`mailto:${comment.mail}`} target="_blank" rel="noreferrer">
            {comment.mail || "undefined@undefined.undefined"}
          </a>
        </div>
        <div
          style={{ maxWidth: "100%", marginBottom: "2px", fontSize: "12px" }}
        >
          <span
            style={{
              color: "rgb(118, 124, 130)",
              userSelect: "all",
            }}
          >
            {comment.ip}
          </span>
        </div>
      </div>
    );
  };
  const contentElement = (value, rowData, index) => {
    const comment = comments[index];

    const [deleteVisible, setDeleteVisible] = useState(false);
    const changeHandler = (next) => {
      setDeleteVisible(next);
    };
    const content = () => {
      return (
        <div style={{ padding: 20, paddingBottom: 0 }}>
          <Text h5 b>
            是否要删除 {comment.author} 的留言？
          </Text>
          <Text p>将会把评论与子评论一同删除</Text>
          <Button
            auto
            scale={1 / 3}
            font="12px"
            style={{ margin: 10 }}
            onClick={async () => {
              await apiClient.delete(`/comment/${comment.id}`).then(() => {
                message.success(`已将 ${comment.text} 的评论及其子评论删除`);
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
        <div
          style={{ maxWidth: "100%", marginBottom: "8px", fontSize: "12px" }}
        >
          <span>在 {comment.created} 时发表了评论：</span>
        </div>
        <div
          style={{ maxWidth: "100%", marginBottom: "2px", fontSize: "12px" }}
        >
          <span style={{ marginLeft: "15px" }}>{comment.text}</span>
        </div>
        {comment.parent && (
          <div
            style={{ maxWidth: "100%", marginBottom: "2px", fontSize: "12px" }}
          >
            <blockquote
              className="border-l-[3px] border-solid border-primary-default pl-[20px] my-2 ml-4"
              style={{
                borderColor: "rgba(24,160,88,1)",
              }}
            >
              <div>
                <div>
                  <span style={{ fontSize: "12px" }}>
                    {comment.parent.author} 在{" "}
                    {comment.parent.created.split("T")[0]} 发表了评论：{" "}
                    {comment.parent.text}
                  </span>
                </div>
              </div>
            </blockquote>
          </div>
        )}

        <div style={{ maxWidth: "100%", marginBottom: "2px" }}>
          <div className="space-x-3">
            <button
              className="success-btn"
              type="button"
              onClick={async () => {
                await apiClient
                  .patch(`/comments/${comment.id}`, null, null, { status: 1 })
                  .then((res) => {
                    console.log(res);
                    message.success(`已将 ${comment.author} 的评论标为已读`);
                    request();
                  });
              }}
            >
              <span className="button-content">已读</span>
            </button>
            <button
              className="warning-btn"
              type="button"
              onClick={async () => {
                await apiClient
                  .patch(`/comments/${comment.id}`, null, null, { status: 2 })
                  .then(() => {
                    message.success(`已将 ${comment.text} 的评论标为垃圾评论`);
                    request();
                  });
              }}
            >
              <span className="button-content">垃圾</span>
            </button>
            <button
              className="info-btn"
              type="button"
              onClick={() => {
                setVisible(true);
                setReply({
                  data: comment,
                  reply_text: "",
                });
              }}
            >
              <span className="button-content">回复</span>
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
          </div>
        </div>
      </div>
    );
  };

  return (
    <NxPage title={"Comments"}>
      <Dashboards.Container
        className="lg:grid flex flex-col"
        gridTemplateColumns="1fr"
      >
        <Dashboards.Area
          className={useClasses("overflow-x-hidden")}
          style={{ overflow: "auto", height: "75vh" }}
        >
          {!loading ? (
            <>
              <Tabs
                initialValue={nowTab}
                marginTop={1}
                width={"100%"}
                onChange={(val) => {
                  setNowTab(val);
                  appNavigate(`/comments?page=${nowPage}&tab=${val}`);
                }}
              >
                <Tabs.Item label="未读" value="1">
                  <Table data={comments} id="comment-table">
                    <Table.Column
                      label="头像"
                      prop="email"
                      render={avatarElement}
                    />
                    <Table.Column
                      label="作者"
                      prop="author"
                      render={authorElement}
                    />
                    <Table.Column
                      label="内容"
                      prop="text"
                      render={contentElement}
                    />
                  </Table>
                </Tabs.Item>
                <Tabs.Item label="已读" value="2">
                  <Table data={comments} id="comment-table">
                    <Table.Column
                      label="头像"
                      prop="email"
                      render={avatarElement}
                    />
                    <Table.Column
                      label="作者"
                      prop="author"
                      render={authorElement}
                    />
                    <Table.Column
                      label="内容"
                      prop="text"
                      render={contentElement}
                    />
                  </Table>
                </Tabs.Item>
                <Tabs.Item label="垃圾" value="3">
                  <Table data={comments} id="comment-table">
                    <Table.Column
                      label="头像"
                      prop="email"
                      render={avatarElement}
                    />
                    <Table.Column
                      label="作者"
                      prop="author"
                      render={authorElement}
                    />
                    <Table.Column
                      label="内容"
                      prop="text"
                      render={contentElement}
                    />
                  </Table>
                </Tabs.Item>
              </Tabs>
            </>
          ) : (
            <Loading />
          )}
        </Dashboards.Area>
      </Dashboards.Container>
      <Modal {...bindings}>
        <Modal.Title>
          回复&nbsp;{reply && reply.data.author}&nbsp;的评论{" "}
        </Modal.Title>
        <Modal.Content>
          <Textarea
            placeholder="请输入您的回复评论..."
            width={"100%"}
            height={"130px"}
            onChange={(text) => {
              setReply({
                ...reply,
                reply_text: text.target.value,
              });
            }}
          />
        </Modal.Content>
        <Modal.Action
          passive
          onClick={() => {
            setVisible(false);
            setReply(null);
          }}
        >
          取消
        </Modal.Action>
        <Modal.Action
          onClick={async () => {
            // console.log(reply.reply_text)
            await apiClient
              .post(`/comments/master/reply/${reply.data.id}`, null, null, {
                text: reply.reply_text,
              })
              .then(() => {
                setVisible(false);
                setReply(null);
                message.success(`已回复 ${reply.data.author} 的评论`);
                request();
              })
              .catch(() => {
                message.error(`回复失败，请稍后再试`);
              });
          }}
        >
          提交
        </Modal.Action>
      </Modal>
      <Pagination
        count={totalPage}
        initialPage={nowPage}
        style={{
          float: "right",
        }}
        onChange={(page) => {
          setNowPage(page);
          appNavigate(`/comments?page=${page}&tab=${nowTab}`);
        }}
      />
    </NxPage>
  );
};
