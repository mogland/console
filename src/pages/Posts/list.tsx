/*
 * @FilePath: /nx-admin/src/pages/Posts/list.tsx
 * @author: Wibus
 * @Date: 2022-07-15 18:45:35
 * @LastEditors: Wibus
 * @LastEditTime: 2022-08-03 13:46:01
 * Coding With IU
 */
import {
  Button,
  Loading,
  Modal,
  Pagination,
  Spacer,
  Table,
  useClasses,
  useModal,
} from "@geist-ui/core";
import { useState } from "react";
import { message } from "react-message-popup";
import { Link, useLocation } from "react-router-dom";
import { useMount } from "react-use";
import Dashboards from "../../components/layouts/Dashboards";
import { NxPage } from "../../components/widgets/Page";
import type { BasicPage } from "../../types/basic";
import { apiClient } from "../../utils/request";
import "./index.css";

export const Posts: BasicPage = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const nowPage = Number(params.get("page")) || 1;

  const [article, setArticle] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(1);

  const { setVisible, bindings } = useModal();
  const [deleteIndex, setDeleteIndex] = useState<number>(-1);

  useMount(async () => {
    await apiClient
      .get("/posts", null, [
        { key: "page", value: nowPage },
        { key: "size", value: 10 },
      ])
      .then((res) => {
        // console.log(res)
        const { data } = res as any;
        const content = [] as any[];
        for (const index of Object.keys(data)) {
          content.push({
            id: data[index].id,
            title: data[index].title,
            category: data[index].category.name,
            tags: data[index].tags.length ? data[index].tags.toString() : "",
            read:
              data[index].count !== undefined &&
              data[index].count.read !== undefined
                ? data[index].count.read
                : "0",
            like:
              data[index].count !== undefined &&
              data[index].count.like !== undefined
                ? data[index].count.like
                : "0",
            created: data[index].created.split("T")[0],
            modified: data[index].modified
              ? data[index].modified.split("T")[0]
              : "-",
          });
        }
        setTotalPage(res.pagination.totalPages);
        setArticle(content);
        setLoading(false);
      });
  });

  const removeHandler = () => {
    if (deleteIndex === -1) {
      message.error("请选择要删除的文章");
      return;
    }
    setArticle(article.filter((_, index) => index !== deleteIndex));
    message.success(`${article[deleteIndex].title} 删除成功`);
    setDeleteIndex(-1);
    setVisible(false);
  };

  const renderAction = (value, rowData, index) => {
    return (
      <>
        <Button auto scale={1 / 3} font="12px">
          <Link
            to={`/posts/edit/${article[index].id}`}
            style={{ padding: 0, color: "inherit" }}
          >
            Edit
          </Link>
        </Button>
        <Spacer />
        <Button
          type="error"
          auto
          scale={1 / 3}
          font="12px"
          onClick={() => {
            setVisible(true);
            setDeleteIndex(index);
          }}
        >
          Remove
        </Button>
      </>
    );
  };

  const renderTitle = (value, rowData, index) => {
    return (
      <Link
        style={{
          padding: 0,
        }}
        onClick={() => {
          setVisible(true);
          setDeleteIndex(index);
        }}
        to={`/posts/edit/${article[index].id}`}
      >
        {value}
      </Link>
    );
  };

  return (
    <NxPage title={"Posts"}>
      <Dashboards.Container
        className="lg:grid flex flex-col"
        gridTemplateColumns="1fr"
      >
        <Dashboards.Area
          className={useClasses("overflow-x-hidden")}
          style={{ overflow: "auto" }}
        >
          {!loading ? (
            <>
              <Table data={article} id={"posts-table"}>
                <Table.Column label="标题" prop="title" render={renderTitle} />
                <Table.Column label="分类" prop="category" />
                <Table.Column label="标签" prop="tags" />
                <Table.Column label="阅读数" prop="read" />
                <Table.Column label="喜欢数" prop="like" />
                <Table.Column label="创建于" prop="created" />
                <Table.Column label="修改于" prop="modified" />
                <Table.Column
                  label="操作"
                  prop="action"
                  render={renderAction}
                />
              </Table>
            </>
          ) : (
            <Loading />
          )}
          <Modal {...bindings}>
            <Modal.Title>删除文章</Modal.Title>
            <Modal.Subtitle>确定要删除吗？</Modal.Subtitle>
            <Modal.Action passive onClick={() => setVisible(false)}>
              取消
            </Modal.Action>
            <Modal.Action onClick={removeHandler}>确定</Modal.Action>
          </Modal>
        </Dashboards.Area>
      </Dashboards.Container>
      <Pagination
        count={totalPage}
        initialPage={nowPage}
        style={{
          float: "right",
        }}
      />
    </NxPage>
  );
};
