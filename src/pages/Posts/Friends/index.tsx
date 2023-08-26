import clsx from "clsx";
import { useEffect, useState } from "react";
import { Loading } from "@components/universal/Loading";
import { Title } from "@components/universal/Title";
import type { BasicPage } from "@type/basic";
import { apiClient } from "@utils/request";
import {
  TableContainer,
  TableItem,
  TableItemValue,
} from "@pages/Home/universal";
import styles from "../Index/index.module.css";
import pageStyles from "./index.module.css";
import { useSeo } from "@hooks/useSeo";

export const FriendsPosts: BasicPage = () => {
  useSeo("好友动态");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<{
    data: any[];
    pagination: any;
  }>({
    data: [],
    pagination: {},
  });

  useEffect(() => {
    apiClient("/friends/feeds/contents").then((res) => {
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
              <span>好友 · 动态</span>
            </div>
          </Title>
          <TableContainer
            className={clsx(styles.table, pageStyles.table)}
            style={{ marginTop: "20px" }}
            header={["TITLE", "DATE", "SITE", "AUTHOR"]}
          >
            {data.data.map((item, index) => {
              return (
                <TableItem
                  header={["TITLE", "DATE", "SITE", "AUTHOR"]}
                  className={clsx(
                    styles.tableItem,
                    "item",
                    pageStyles.tableItem
                  )}
                  onClick={() => {
                    window.open(item.link);
                  }}
                  key={index}
                >
                  <TableItemValue> {item.title} </TableItemValue>
                  <TableItemValue>
                    {" "}
                    {new Date(item.published_date).toLocaleDateString()}{" "}
                  </TableItemValue>
                  <TableItemValue>
                    {" "}
                    {item.link.match(/\/\/(.*?)\//)?.[1]}{" "}
                  </TableItemValue>
                  <TableItemValue> {item.author} </TableItemValue>
                </TableItem>
              );
            })}
          </TableContainer>
        </div>
      </div>
    </>
  );
};
