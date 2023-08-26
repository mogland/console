import { useEffect, useState } from "react";
import styles from "./index.module.css";
import { API, apiClient } from "@utils/request";
import { FileMusic, FileText, FolderOpen, Notes } from "@icon-park/react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import { dialog } from "@libs/dialogs";
import { calculateMousePosition } from "@utils/mouse";
import { Editable } from "@components/universal/Editable";
import { toast } from "sonner";

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
  const [rename, setRename] = useState(false);
  const navgative = useNavigate();
  const { open } = dialog.useDialog("fileContextMenu", {});

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

  const [clickCount, setClickCount] = useState(1);
  const doubleOrOneClick = (callback: () => void) => {
    return () => {
      setClickCount(clickCount + 1);

      const timer = setTimeout(() => {
        if (clickCount === 1) {
          props.onClick?.();
        } else if (clickCount > 1) {
          callback();
        }
        setClickCount(1);
      }, 200);

      return () => clearTimeout(timer);
    };
  };

  const onRename = () => {
    setRename(true);
  };

  const contextMenu = (e: React.MouseEvent<MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    const { x, y } = calculateMousePosition(e);
    open({
      position: {
        x,
        y,
      },
      path: `${props.path}`,
      name: `${props.name}`,
      onRename,
      isFile: props.type !== "directory",
    });
  };

  const handleOnClick = () => {
    if (props.type === "directory") {
      // navgative(`/files?path=${props.path}/${props.name}`);
      // props.onClick?.();
      doubleOrOneClick(() => {
        navgative(`/files?path=${props.path}/${props.name}`);
      })();
    } else {
      // window.open(`${API}/store/raw/${props.path}/${props.name}`);
      doubleOrOneClick(() => {
        window.open(`${API}/store/raw${props.path}/${props.name}`);
      })();
    }
  };

  return (
    <div
      className={clsx(styles.itemContainer, props.className)}
      onClick={handleOnClick}
      onContextMenu={contextMenu as any}
    >
      <div className={styles.item}>
        <div className={styles.itemIcon}>{icon}</div>
        <div className={styles.itemInfo}>
          <Editable
            value={props.name}
            enable={rename}
            onChange={(value) => {
              setRename(false);
              console.log(value);
              toast.promise(
                apiClient("/store/rename", {
                  method: "PATCH",
                  body: {
                    oldPath: `${props.path}/${props.name}`,
                    newPath: `${props.path}/${value}`,
                  },
                }),
                {
                  loading: "正在重命名",
                  success: "重命名成功",
                  error: "重命名失败",
                }
              );
            }}
          />
          <span className={styles.itemSize}>{props.size}</span>
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
