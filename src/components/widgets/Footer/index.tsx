import { Refresh } from "@icon-park/react";
import styles from "./index.module.css";
import useSWR from "swr";
import { apiClient } from "@utils/request";
import { toast } from "sonner";
export const Footer = () => {
  const { data: coreVersion } = useSWR("/info");

  const handleRefresh = () => {
    if (window.PATTERN != "CORE") {
      toast.error("独立部署模式｜无法自动刷新面板版本");
      return;
    }
    const handler = apiClient("/console/refresh");
    toast.promise(handler, {
      loading: "正在刷新面板版本...",
      success: "面板版本刷新成功",
      error: "面板版本刷新失败",
    });
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <div className={styles.footer}>
      <div>
        面板版本: {window?.version}
        <span className={styles.refresh} onClick={handleRefresh}>
          <Refresh />
        </span>
      </div>
      <div>后端版本: {coreVersion?.version}</div>
    </div>
  );
};
