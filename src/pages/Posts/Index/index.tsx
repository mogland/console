import { AddOne } from "@icon-park/react";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loading } from "@components/universal/Loading";
import { Title } from "@components/universal/Title";
import type { BasicPage } from "@type/basic";
import { apiClient } from "@utils/request";
import styles from "./index.module.css";
import { useSeo } from "@hooks/useSeo";
import { ActionButton, ActionButtons } from "@components/widgets/ActionButtons";
import { jump } from "@utils/path";
import { PostsListDataTable } from "./Table/data-table";
import { postsListColumns } from "./Table/column";

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
          <PostsListDataTable columns={postsListColumns} data={data.data} />
        </div>
      </div>
    </>
  );
};
