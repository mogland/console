import type { BasicPage } from "@type/basic";
import styles from "./index.module.css";
import { Title } from "@components/universal/Title";
import { useSeo } from "@hooks/useSeo";
import useSWR from "swr";
import type { FileItemProps } from "./components";
import { FilesBreadcrumb, Item } from "./components";
import { getQueryVariable } from "@utils/url";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { ActionButtons } from "@components/widgets/ActionButtons";
import { apiClient } from "@utils/request";
import { toast } from "sonner";

export const FilesPage: BasicPage = () => {
  useSeo("文件 · 管理");
  const path = getQueryVariable("path") || "";
  const { data } = useSWR(`/store/list${path}`);
  const [select, setSelect] = useState<string[]>([]);

  useEffect(() => {
    setSelect([]);
  }, [path]);

  return (
    <>
      <Title>
        <div className={clsx("flex", "justify-between")}>
          <div>
            文件 · 管理
            <FilesBreadcrumb path={path} />
          </div>
          <div>
            <ActionButtons
              selectedClassName={styles.selected}
              selected={select}
              setSelect={setSelect}
              deleteFunction={async () => {
                toast.promise(
                  Promise.all(
                    select.map(async (item) => {
                      await apiClient(`/store/delete?path=${item}`, {
                        method: "POST",
                        body: JSON.stringify({
                          path: `${path}/${item}`
                        }),
                      });
                    }
                    )
                  ), {
                  loading: "正在删除",
                  success: "删除成功",
                  error: "删除失败",
                  }
                )
              }}
            />
          </div>
        </div>
      </Title>
      <div className={styles.container}>
        {data?.data.map((item: FileItemProps) => {
          return (
            <Item
              onClick={() => {
                if (select.includes(item.name)) {
                  setSelect(select.filter((i) => i !== item.name));
                } else {
                  setSelect([...select, item.name]);
                }
              }}
              className={clsx(select.includes(item.name) && styles.selected)}
              {...item}
              key={item.name}
              path={path}
            />
          );
        })}
      </div>
    </>
  );
};
