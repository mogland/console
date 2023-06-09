import postStyles from "@pages/Posts/Index/index.module.css";
import styles from "./index.module.css";
import { Modal, ModalBody } from "@components/universal/Modal";
import {
  TableContainer,
  TableItem,
  TableItemValue,
} from "@pages/Home/universal";
import { Input, Textarea } from "@pages/Write/Input";
import { apiClient } from "@utils/request";
import clsx from "clsx";
import { useCallback, useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { Select } from "@components/widgets/ThemeComponent/ThemeSelect";

interface EditModalProps {
  tabsList: {
    name: string;
    status: number;
  }[];
  select: string[];
  setShowEditModal: (show: boolean) => void;
  setSelect: React.Dispatch<React.SetStateAction<string[]>>;
  setComments: (comments: any) => void;
  // setInSideLoading: (loading: boolean) => void;
  tab: number;
  page: number;
}

export const EditModal: React.FC<EditModalProps> = ({
  tabsList,
  select,
  setShowEditModal,
  setSelect,
  setComments,
  // setInSideLoading,
  tab,
  page,
}) => {
  const { data } = useSWR(`/comments/${select[0]}`);
  const { trigger } = useSWRMutation(
    `/comments/${select[0]}`,
    (key: string, { arg }: { arg: string }) => {
      return apiClient(key, {
        method: "PUT",
        body: JSON.stringify(arg),
      });
    }
  );
  const [_data, setData] = useState<any>(null);

  useEffect(() => {
    setData(data);
  }, [data]);
  

  const handleRequest = async (status: number, page: number) => {
    return apiClient(`/comments?status=${status}&page=${page}`).then(
      async (res) => {
        for (let i = 0; i < res.data.length; i++) {
          res.data[i].post = await apiClient(`/post/${res.data[i].pid}`);
        }
        return res;
      }
    );
  };

  const handleConfirm = async () => {
    // setInSideLoading(true);
    await trigger(_data);
    handleRequest(tab, page).then((res) => {
      setComments(res);
      // setInSideLoading(false);
    });
  };

  return (
    <>
      <Modal
        title="编辑评论"
        type="confirm"
        doubleClick={{
          cancel: true,
        }}
        onClose={() => {
          setShowEditModal(false);
          setSelect([]);
        }}
        options={{
          confirmText: "提交",
        }}
        onConfirm={handleConfirm}
      >
        <ModalBody>状态</ModalBody>
        <Select 
        onChange={(e) => {
          setData({
            ..._data,
            status: Number(e),
          });
        }}
          value={String(_data?.status)}
          data={tabsList.map((item) => {
            return {
              label: item.name,
              value: String(item.status),
            };
          })}
          placeholder="请选择状态"
        />
        <Input
          value={_data?.author}
          onChange={(e) => {
            setData({
              ..._data,
              author: e,
            });
          }}
          label="作者"
        />
        <Input
          value={_data?.email}
          onChange={(e) => {
            setData({
              ..._data,
              email: e,
            });
          }}
          label="邮箱"
        />
        <Textarea
          value={_data?.text}
          onChange={(e) => {
            setData({
              ..._data,
              text: e,
            });
          }}
          label="内容"
        />
      </Modal>
    </>
  );
};

interface CommentsListProps {
  comments: {
    data: {
      id: string;
      author: string;
      email: string;
      text: string;
      parent?: {
        author: string;
        created: string;
        text: string;
      };
      post: {
        id: string;
        title: string;
      };
      created: string;
    }[];
  };
  // inSideLoading: boolean;
  select: string[];
  setSelect: React.Dispatch<React.SetStateAction<string[]>>;
  jump: (path: string) => void;
  mailAvatar: (email: string) => string;
}

export const CommentsList: React.FC<CommentsListProps> = ({
  comments,
  // inSideLoading,
  select,
  setSelect,
  jump,
  mailAvatar,
}) => {
  const header = useMemo(() => ["AUTHOR", "CONTENT", "ORIGIN", "DATE"], []);
  const handleItemClick = useCallback(
    (item: { id: string; }) => {
      if (select.includes(item.id)) {
        setSelect(select.filter((i) => i !== item.id));
      } else {
        setSelect([...select, item.id]);
      }
    },
    [select, setSelect]
  );

  return (
    <>
      {/* <Loading loading={inSideLoading} /> */}
      <div 
      // className={clsx("loading", !inSideLoading && "loaded")}
      >
        <TableContainer
          header={header}
          headerStyle={{
            gridTemplateColumns: "1fr 2fr 2fr 2fr",
          }}
        >
          {comments?.data && comments?.data.map((item) => {
            const tableItemHeader = ["AUTHOR", "CONTENT", "ORIGIN", "DATE"];
            const tableItemStyle = {
              gridTemplateColumns: "1fr 2fr 2fr 2fr",
            };
            const isItemSelected = select.includes(item.id);
            const className = clsx(isItemSelected && postStyles.select);
            const postTitle = item.post?.title;
            const createdTime = new Date(item.created).toLocaleString();
            const replyAuthor = item.parent?.author;
            const replyCreatedTime = item.parent?.created.split("T")[0];
            const replyText = item.parent?.text;
            return (
              <TableItem
                key={item.id}
                style={tableItemStyle}
                aria-label={item.id}
                className={className}
                header={tableItemHeader}
                onClick={() => handleItemClick(item)}
              >
                <TableItemValue>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img
                      src={mailAvatar(item.email)}
                      alt={item.author}
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                        marginRight: "10px",
                      }}
                    />
                    {item.author}
                  </div>
                </TableItemValue>
                <TableItemValue>
                  {item.text}
                  {item.parent && (
                    <div className={styles.reply}>
                      <div className={styles.replyAuthor}>
                        {replyAuthor} 在 {replyCreatedTime} 说：
                      </div>
                      <div className={styles.replyContent}>{replyText}</div>
                    </div>
                  )}
                </TableItemValue>
                <TableItemValue
                  onClick={() => {
                    jump(`/write/post?id=${item.post?.id}`);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  {postTitle}
                </TableItemValue>
                <TableItemValue>{createdTime}</TableItemValue>
              </TableItem>
            );
          })}
        </TableContainer>
      </div>
    </>
  );
};
