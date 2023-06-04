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
import styles from "../../Posts/Index/index.module.css";
import { useSeo } from "@hooks/useSeo";
import { ActionButton, ActionButtons } from "@components/widgets/ActionButtons";
import { jump } from "@utils/path";

export const PagesIndex: BasicPage = () => {
  useSeo("页面 · 列表");
  const [loading, setLoading] = useState(true);
  const [select, setSelect] = useState<string[]>([]); // 选择的页面
  const navigate = useNavigate();
  const [data, setData] = useState<{
    data: any[];
    pagination: any;
  }>({
    data: [],
    pagination: {},
  });

  useEffect(() => {
    apiClient("/page").then((res) => {
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
              <span>页面 · 列表</span>
              <div>
                <ActionButtons
                  selectedClassName={styles.select}
                  setSelect={setSelect}
                  selected={select}
                  editAction={() => {
                    navigate(jump(`/write/page?id=${select[0]}`));
                  }}
                  deleteFunction={() => {
                    select.forEach((item) => {
                      apiClient(`/page/${item}`, {
                        method: "DELETE",
                      });
                    });
                  }}
                />
                <ActionButton
                  icon={<AddOne />}
                  label="新建页面"
                  action={() => {
                    navigate(jump("/write/page"));
                  }}
                />
              </div>
            </div>
          </Title>
          <TableContainer
            className={styles.table}
            style={{ marginTop: "20px" }}
            header={["TITLE", "DATE"]}
          >
            {data.data.map((item, index) => {
              return (
                <TableItem
                  onClick={(e: React.MouseEvent) => {
                    if (e.currentTarget.classList.contains(styles.select)) {
                      setSelect(select.filter((i) => i !== item.id));
                      console.log(select);
                    } else {
                      setSelect([...select, item.id]);
                    }
                    e.currentTarget.classList.toggle(styles.select);
                  }}
                  header={["TITLE", "DATE"]}
                  className={clsx(styles.tableItem)}
                  style={{ width: "inherit" }}
                  key={index}
                >
                  <TableItemValue> {item.title} </TableItemValue>
                  <TableItemValue>
                    {" "}
                    {item.created.split("T")[0]}{" "}
                  </TableItemValue>
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
