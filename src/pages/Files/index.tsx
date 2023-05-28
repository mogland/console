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
import { ActionButton, ActionButtons } from "@components/widgets/ActionButtons";
import { apiClient } from "@utils/request";
import { toast } from "sonner";
import { Upload } from "@icon-park/react";

export const FilesPage: BasicPage = () => {
  useSeo("文件 · 管理");
  const path = getQueryVariable("path") || "";
  const { data, mutate } = useSWR(`/store/list${path}`);
  const [select, setSelect] = useState<string[]>([]);

  useEffect(() => {
    mutate();
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
            <ActionButton
              label="上传文件"
              icon={<Upload />}
              action={() => {
                const input = document.createElement("input");
                input.type = "file";
                input.onchange = async (e) => {
                  const file = (e.target as HTMLInputElement).files?.[0];
                  if (!file) return;
                  const formData = new FormData();
                  formData.append("file", file);
                  formData.append("path", path);
                  toast.promise(
                    apiClient(`/store/upload?path=${path}`, {
                      method: "POST",
                      body: formData,
                    }).then(() => {
                      mutate();
                    }),
                    {
                      loading: "正在上传",
                      success: "上传成功",
                      error: "上传失败",
                    }
                  );
                };
                input.click();
              }}
            />
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
                          path: `${path}/${item}`,
                        }),
                      });
                    })
                  ),
                  {
                    loading: "正在删除",
                    success: "删除成功",
                    error: "删除失败",
                  }
                );
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
