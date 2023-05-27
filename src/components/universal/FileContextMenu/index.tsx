import { dialog } from "@libs/dialogs";
import styles from "./index.module.css";
import clsx from "clsx";
import { useEffect, useRef } from "react";
import {
  Delete,
  Download,
  LinkOne,
  MoveOne,
  Pencil,
  Share,
} from "@icon-park/react";
import { API, apiClient } from "@utils/request";
import path from "path";
import { toast } from "sonner";
import { ofetch } from "ofetch";
import { useNavigate } from "react-router-dom";

export const FileContextMenu = () => {
  const navgative = useNavigate();
  const { isOpen, handleClose, props } =
    dialog.useDialogController("fileContextMenu");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
        handleClose();
      }
    };
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

  const handleOpen = () => {
    if (props.isFile) {
      window.open(`${API}/store/raw${props.path}/${props.name}`);
    } else {
      navgative(`/files?path=${props.path}/${props.name}`);
    }
  };

  const handleDownload = async () => {
    const url = `${API}/store/raw${props.path}`;
    // blob
    const blob = await ofetch(`${url}/${props.name}`, {
      method: "GET",
      responseType: "blob",
    });
    const a = document.createElement("a");
    a.href = window.URL.createObjectURL(blob);
    a.download = props.name;
    a.click();
  };

  const handleRename = () => {
    props.onRename?.();
  };

  const handleDelete = () => {
    toast.promise(
      apiClient(`/store/delete?path=${props.path}/${props.name}`, {
        method: "POST",
        body: JSON.stringify({
          path: `${path}/${props.name}`,
        }),
      }),
      {
        loading: "正在删除",
        success: "删除成功",
        error: "删除失败",
      }
    );
  };

  const handleMove = () => {
    toast.error("Not implemented");
  };

  const handleCopy = () => {
    toast.promise(
      Promise.all([
        navigator.clipboard.writeText(
          `${API}/store/raw${props.path}/${props.name}`
        ),
      ]),
      {
        loading: "正在复制",
        success: "复制成功",
        error: "复制失败",
      }
    );
  };

  return (
    <div
      onClick={handleClose}
      ref={ref}
      className={clsx(styles.contextMenu)}
      style={{
        display: isOpen ? "flex" : "none",
        left: props.position.x,
        top: props.position.y,
      }}
    >
      <button className={clsx(styles.action)} onClick={handleOpen}>
        <Share className={clsx(styles.icon)} /> 打开
      </button>
      {props.isFile && (
        <button className={clsx(styles.action)} onClick={handleDownload}>
          <Download className={clsx(styles.icon)} /> 下载
        </button>
      )}
      {props.isFile && (
        <button className={clsx(styles.action)} onClick={handleCopy}>
          <LinkOne className={clsx(styles.icon)} /> 外链
        </button>
      )}
      <button className={clsx(styles.action)} onClick={handleRename}>
        <Pencil className={clsx(styles.icon)} /> 命名
      </button>
      <button className={clsx(styles.action)} onClick={handleDelete}>
        <Delete className={clsx(styles.icon)} /> 删除
      </button>
      <button className={clsx(styles.action)} onClick={handleMove}>
        <MoveOne className={clsx(styles.icon)} />
        移动
      </button>
    </div>
  );
};
