import { useEffect, useState } from "react";
import styles from "./index.module.css";
import { API } from "@utils/request";
import { FileMusic, FileText, FolderOpen, Notes } from "@icon-park/react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";

export interface FileItemProps {
  name: string;
  type: "image" | "directory" | "audio" | "text" | "other";
  size: string;
}

export const Item = (
  props: FileItemProps & {
    path: string;
    onClick?: () => void;
    className?: string;
  }
) => {
  const [icon, setIcon] = useState<React.ReactNode>(<></>);
  const navgative = useNavigate();

  useEffect(() => {
    if (props.type === "image") {
      setIcon(
        <img
          className={styles.imagePreview}
          src={`${API}/store/raw${props.path}/${props.name}`}
          alt={props.name}
        />
      );
    } else if (props.type === "directory") {
      setIcon(<FolderOpen className={styles.icon} />);
    } else if (props.type === "audio") {
      setIcon(<FileMusic className={styles.icon} />);
    } else if (props.type === "text") {
      setIcon(<FileText className={styles.icon} />);
    } else {
      setIcon(<Notes className={styles.icon} />);
    }
  }, [props]);

  const handleOnClick = () => {
    if (props.type === "directory") {
      navgative(`/files?path=${props.path}/${props.name}`);
    } else {
      // window.open(`${API}/store/raw/${props.path}/${props.name}`);
      props.onClick?.();
    }
  };

  return (
    <div className={clsx(styles.itemContainer, props.className)} onClick={handleOnClick}>
      <div className={styles.item}>
        <div className={styles.itemIcon}>{icon}</div>
        <div className={styles.itemInfo}>
          {props.name} <span className={styles.itemSize}>{props.size}</span>
        </div>
      </div>
    </div>
  );
};

export const FilesBreadcrumb = (props: { path: string }) => {
  const [paths, setPaths] = useState<React.ReactNode>(<></>);
  const navgative = useNavigate();

  useEffect(() => {
    const paths = props.path.split("/");
    const pathsList = paths.map((path, index) => {
      path = decodeURIComponent(path);
      return (
        <span
          className={styles.breadcrumbItem}
          key={index}
          onClick={() => {
            navgative(`/files?path=${paths.slice(0, index + 1).join("/")}`);
          }}
        >
          {path}
        </span>
      );
    });
    pathsList.unshift(
      <span
        key={"root"}
        className={styles.breadcrumbItem}
        onClick={() => {
          navgative(`/files`);
        }}
      >
        /
      </span>
    );
    setPaths(pathsList);
  }, [props.path]);

  return <div className={styles.breadcrumb}>{paths}</div>;
};
