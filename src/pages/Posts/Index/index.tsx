import { AddOne } from "@icon-park/react";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loading } from "@components/universal/Loading";
import { Title } from "@components/universal/Title";
import type { BasicPage } from "@type/basic";
import { apiClient } from "@utils/request";
import {
  TableContainer,
  TableItem,
  TableItemValue,
} from "@pages/Home/universal";
import styles from "./index.module.css";
import { useSeo } from "@hooks/useSeo";
import { ActionButton, ActionButtons } from "@components/widgets/ActionButtons";
import { jump } from "@utils/path";

export const PostsIndex: BasicPage = () => {
  useSeo("文章 · 列表");
  const [loading, setLoading] = useState(true);
  const [select, setSelect] = useState<string[]>([]); // 选择的文章
  const navigate = useNavigate();
  const [data, setData] = useState<{
    data: any[];
    pagination: any;
  }>({
    data: [],
    pagination: {},
  });

  useEffect(() => {
    apiClient("/post").then((res) => {
      setData(res);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <div
        style={{
          width: "100%",
        }}
      >
        <Loading loading={loading} />
        <div className={clsx("loading", !loading && "loaded")}>
          <Title>
            <div className={styles.head}>
              <span className={styles.headTitle}>文章 · 列表</span>
              <div>
                <ActionButtons
                  selectedClassName={styles.select}
                  setSelect={setSelect}
                  selected={select}
                  editAction={() => {
                    navigate(jump(`/write/post?id=${select[0]}`));
                  }}
                  deleteFunction={() => {
                    select.forEach((item) => {
                      apiClient(`/post/${item}`, {
                        method: "DELETE",
                      });
                    });
                  }}
                />
                <ActionButton
                  icon={<AddOne />}
                  label="新建文章"
                  action={() => {
                    navigate(jump("/write/post"));
                  }}
                />
              </div>
            </div>
          </Title>
          <TableContainer
            className={styles.table}
            style={{ marginTop: "20px" }}
            headerStyle={{ width: "150%" }}
            header={["TITLE", "DATE", "CATEGORY", "TAGS", "READ", "LIKE"]}
          >
            {data.data.map((item, index) => {
              return (
                <TableItem
                  onClick={(e) => {
                    if (e.currentTarget.classList.contains(styles.select)) {
                      setSelect(select.filter((i) => i !== item.id));
                    } else {
                      setSelect([...select, item.id]);
                    }
                    e.currentTarget.classList.toggle(styles.select);
                  }}
                  header={["TITLE", "DATE", "CATEGORY", "TAGS", "READ", "LIKE"]}
                  className={clsx(styles.tableItem, "item")}
                  key={index}
                >
                  <TableItemValue> {item.title} </TableItemValue>
                  <TableItemValue>
                    {" "}
                    {item.created.split("T")[0]}{" "}
                  </TableItemValue>
                  <TableItemValue> {item.category.name} </TableItemValue>
                  <TableItemValue>
                    {" "}
                    {item.tags?.join(",") || ""}{" "}
                  </TableItemValue>
                  <TableItemValue> {item.count.read} </TableItemValue>
                  <TableItemValue> {item.count.like} </TableItemValue>
                </TableItem>
              );
            })}
          </TableContainer>
          <div className={styles.nav}>
            {(data.pagination.has_prev_page && (
              <button className={styles.button}>上一页</button>
            )) ||
              null}
            {(data.pagination.has_next_page && (
              <button className={styles.button}>下一页</button>
            )) ||
              null}
          </div>
        </div>
      </div>
    </>
  );
};
