import postStyles from "@pages/Posts/Index/index.module.css";
import { Loading } from "@components/universal/Loading"
import type { BasicPage } from "@type/basic"
import clsx from "clsx"
import { useEffect, useState } from "react"
import styles from "./index.module.css"
import tabs from "@components/universal/Tabs/index.module.css"
import { Tab } from "@headlessui/react"
import { getQueryVariable } from "@utils/url"
import { useNavigate } from "react-router-dom"
import { apiClient } from "@utils/request"
import { Title } from "@components/universal/Title"
import { Clear, Delete, CheckSmall, CloseSmall, Edit, Redo } from "@icon-park/react";
import { TableContainer, TableItem, TableItemValue } from "@pages/Home/universal";
import { mailAvatar } from "@utils/avatar";
import { Modal, ModalBody } from "@components/universal/Modal";
import { Input, Textarea } from "@pages/Write/Input";
import { Selects } from "@components/universal/Select";
import { jump } from "@utils/path";

const tabsList = [{
  name: "待审核",
  status: 0,
}, {
  name: "已通过",
  status: 1,
}, {
  name: "垃圾评论",
  status: 2,
}, {
  name: "回收站",
  status: 3,
}]

export const CommentsPage: BasicPage = () => {
  const status = getQueryVariable("status")
  const page = Number(getQueryVariable("page")) || 1
  const navigate = useNavigate()

  const [select, setSelect] = useState<string[]>([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [inSideLoading, setInSideLoading] = useState(true);

  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState(Number(status) || 0)
  const [comments, setComments] = useState<{
    data: any[];
    pagination: any;
  }>({
    data: [],
    pagination: {},
  });

  const handleRequest = async (status: number, page: number) => {
    return apiClient(`/comments?status=${status}&page=${page}`).then(async (res) => {
      for (let i = 0; i < res.data.length; i++) {
        res.data[i].post = await apiClient(`/post/${res.data[i].pid}`);
      }
      return res;
    })
  }

  useEffect(() => {
    setLoading(true)
    setInSideLoading(true);
    handleRequest(tab, page).then((res) => {
      setComments(res)
      setLoading(false)
      setInSideLoading(false);
    })
  }, [page])

  useEffect(() => {
    // setLoading(true)
    setInSideLoading(true);
    navigate(jump(`/comments?status=${tab}&page=${page}`))
    handleRequest(tab, page).then((res) => {
      setComments(res)
      setInSideLoading(false);
    })
  }, [page, tab])

  const handleDelete = () => {
    setComments({
      data: comments.data.filter((item) => !select.includes(item.id)),
      pagination: comments.pagination
    })
    setSelect([])
  }

  const handleUpdateStatus = (status: number) => {
    select.forEach((item) => {
      apiClient(`/comments/${item}`, {
        method: "PATCH",
        query: {
          status,
        },
      })
    });
  }

  const EditModal = () => {
    const [_data, setData] = useState<any>(
      comments.data.find((item) => item.id === select[0])
    )
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
          onConfirm={() => {
            setInSideLoading(true);
            apiClient(`/comments/${_data.id}`, {
              method: "PUT",
              body: _data,
            })
            handleRequest(tab, page).then((res) => {
              setComments(res)
              setInSideLoading(false);
            })
          }}
        >
          <ModalBody>状态</ModalBody>
          <Selects
            value={tabsList.map((item) => {
              return {
                name: item.name,
                value: item.status,
              }
            })}
            onChange={(e) => {
              setData({
                ..._data,
                status: Number(e),
              })
            }}
            selected={{
              // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
              name: tabsList.find((item) => item.status === _data?.status)?.name!,
              value: _data?.status,
            }}
          />
          <Input
            value={_data?.author}
            onChange={(e) => {
              setData({
                ..._data,
                author: e,
              })
            }}
            label="作者"
          />
          <Input
            value={_data?.email}
            onChange={(e) => {
              setData({
                ..._data,
                email: e,
              })
            }}
            label="邮箱"
          />
          <Textarea
            value={_data?.text}
            onChange={(e) => {
              setData({
                ..._data,
                text: e,
              })
            }}
            label="内容"
          />
        </Modal>
      </>
    )
  }

  const CommentsList = () => {
    return (
      <>
        <Loading loading={inSideLoading} />
        <div className={clsx("loading", !inSideLoading && "loaded")}>
          <TableContainer
            header={["AUTHOR", "CONTENT", "ORIGIN", "DATE"]}
            headerStyle={{
              gridTemplateColumns: "1fr 2fr 2fr 2fr",
            }}
          >
            {comments.data.map((item) => {
              return (
                <TableItem
                  key={item.id}
                  style={{
                    gridTemplateColumns: "1fr 2fr 2fr 2fr",
                  }}
                  aria-label={item.id}
                  className={clsx(select.includes(item.id) && postStyles.select)}
                  header={["AUTHOR", "CONTENT", "ORIGIN", "DATE"]}
                  onClick={() => {
                    if (select.includes(item.id)) {
                      setSelect(select.filter((i) => i !== item.id));
                    } else {
                      setSelect([...select, item.id]);
                    }
                  }}
                >
                  <TableItemValue>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <img src={mailAvatar(item.email)} alt={item.author}
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
                    {
                      item.parent && (
                        <div className={styles.reply}>
                          <div className={styles.replyAuthor}>
                            {item.parent.author} 在 {item.parent.created.split("T")[0]} 说：
                          </div>
                          <div className={styles.replyContent}>
                            {item.parent.text}
                          </div>
                        </div>
                      )
                    }
                  </TableItemValue>
                  <TableItemValue
                    onClick={() => {
                      navigate(jump(`/write/post?id=${item.post.id}`))
                    }}
                    style={{ cursor: "pointer" }}
                  >{item.post.title}</TableItemValue>
                  <TableItemValue>{new Date(item.created).toLocaleString()}</TableItemValue>
                </TableItem>
              )
            })}
          </TableContainer>
        </div>
      </>
    )
  }

  return (
    <>
      <Loading loading={loading} />
      <div className={clsx("loading", !loading && "loaded")}>
        <Title>
          <div className={postStyles.head}>
            <span className={postStyles.headTitle}>评论 · 列表</span>
            <div style={{ height: "20px" }}>
              {(select.length && (
                <button
                  className={postStyles.button}
                  onClick={() => {
                    setSelect([]);
                    const items = document.querySelectorAll(
                      `.${postStyles.select}`
                    );
                    items.forEach((item) => {
                      item.classList.remove(postStyles.select);
                    });
                  }}
                >
                  <Clear />
                </button>
              )) ||
                null}
              {(select.length && (
                <button
                  className={postStyles.button}
                  onClick={async (e) => {
                    if (
                      e.currentTarget.classList.contains(postStyles.confrim)
                    ) {
                      handleUpdateStatus(3)
                      handleDelete();
                    } else {
                      e.currentTarget.classList.add(postStyles.confrim);
                    }
                  }}
                >
                  <Delete />
                </button>
              )) ||
                null}
              {(select.length && tab === 3 && (
                <button
                  className={postStyles.button}
                  onClick={() => {
                    handleUpdateStatus(0)
                    handleDelete();
                  }}
                >
                  <Redo />
                </button>
              )) ||
                null}
              {(select.length && tab !== 1 && (
                <button
                  className={postStyles.button}
                  onClick={() => {
                    handleUpdateStatus(1)
                    handleDelete();
                  }}
                >
                  <CheckSmall />
                </button>
              )) ||
                null}
              {(select.length && tab !== 2 && (
                <button
                  className={postStyles.button}
                  onClick={() => {
                    handleUpdateStatus(2)
                    handleDelete();
                  }}
                >
                  <CloseSmall />
                </button>
              )) ||
                null}
              {(select.length === 1 && (
                <button
                  className={postStyles.button}
                  onClick={() => {
                    setShowEditModal(true);
                  }}
                >
                  <Edit />
                </button>
              )) ||
                null}
            </div>
          </div>
        </Title>
        <Tab.Group
          defaultIndex={tab}
          onChange={(index) => {
            setTab(index)
          }}
        >
          <Tab.List className={tabs.tabList}>
            {tabsList.map((tab, index) => (
              <Tab key={index} className={({ selected }) => clsx(tabs.tab, selected && tabs.selected)}>
                {tab.name}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels>
            {
              tabsList.map((tab, index) => (
                <Tab.Panel key={index}>
                  <CommentsList />
                </Tab.Panel>
              ))
            }
          </Tab.Panels>
        </Tab.Group>
      </div>
      <div className={postStyles.nav}>
        {(comments.pagination.has_prev_page && (
          <button className={postStyles.button}>上一页</button>
        )) ||
          null}
        {(comments.pagination.has_next_page && (
          <button className={postStyles.button}>下一页</button>
        )) ||
          null}
      </div>
      {
        showEditModal && (<EditModal />)
      }
    </>
  )
}