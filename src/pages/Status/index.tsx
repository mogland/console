import clsx from "clsx";
import { ofetch } from "ofetch";
import { useEffect, useState } from "react";
import { Loading } from "@components/universal/Loading";
import { Title } from "@components/universal/Title";
import type { BasicPage } from "@type/basic";
import { API } from "@utils/request";
import { TableItem, TableItemValue } from "@pages/Home/universal";
import styles from "./index.module.css";

interface IStatus {
  status: "Operational" | "Down";
}

const Status: React.FC<IStatus> = (props) => {
  return (
    <>
      <div className={clsx(styles.status, styles[props.status])}>
        <span className={styles.dot} />
        <span className={styles.text}>{props.status}</span>
      </div>
    </>
  );
};

export const StatusPage: BasicPage = () => {
  const services = [
    {
      name: "核心网关层",
      url: "",
    },
    {
      name: "用户服务",
      url: "user",
    },
    {
      name: "文章服务",
      url: "post",
    },
    {
      name: "页面服务",
      url: "page",
    },
    {
      name: "分类服务",
      url: "category",
    },
    {
      name: "评论服务",
      url: "comments",
    },
    {
      name: "友链服务",
      url: "friends",
    },
    {
      name: "通知服务",
      url: "notification",
    },
    {
      name: "主题服务",
      url: "themes",
    }
  ];
  const [statuses, setStatuses] = useState<{
    [key: string]: "Operational" | "Down";
  }>({});
  const [loading, setLoading] = useState(true);

  const fetchStatus = async () => {
    await Promise.all(
      services.map(async (service) => {
        const res = await ofetch
          .raw(`${service.url ? `/${service.url}` : ""}/ping`, { baseURL: API, retry: false })
          .catch(() => ({ status: 500 }));
        setStatuses((prev) => ({
          ...prev,
          [service.name]: res.status === 200 ? "Operational" : "Down",
        }));
      })
    );
    setLoading(false);
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  return (
    <>
      <Loading loading={loading} />
      <div className={clsx("loading", !loading && "loaded")}>
        <Title>服务 · 状态</Title>
        <div className={styles.services}>
          {services.map((service) => (
            <TableItem
              header={["NAME", "Status"]}
              className={styles.tableItem}
              key={service.name}
            >
              <TableItemValue>
                {service?.name.toUpperCase() || "CORE"}
              </TableItemValue>
              <TableItemValue>
                <Status status={statuses[service.name]} />
              </TableItemValue>
            </TableItem>
          ))}
        </div>
      </div>
    </>
  );
};
