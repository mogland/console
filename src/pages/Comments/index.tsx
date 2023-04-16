import postStyles from "@pages/Posts/Index/index.module.css";
import type { BasicPage } from "@type/basic";
import clsx from "clsx";
import { useEffect, useState } from "react";
import tabs from "@components/universal/Tabs/index.module.css";
import { Tab } from "@headlessui/react";
import { getQueryVariable } from "@utils/url";
import { useNavigate } from "react-router-dom";
import { apiClient } from "@utils/request";
import { Title } from "@components/universal/Title";
import {
  Clear,
  Delete,
  CheckSmall,
  CloseSmall,
  Edit,
  Redo,
} from "@icon-park/react";
import { mailAvatar } from "@utils/avatar";
import { jump } from "@utils/path";
import { useSeo } from "@hooks/useSeo";
import { CommentsList, EditModal } from "./component";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

const tabsList = [
  {
    name: "待审核",
    status: 0,
  },
  {
    name: "已通过",
    status: 1,
  },
  {
    name: "垃圾评论",
    status: 2,
  },
  {
    name: "回收站",
    status: 3,
  },
];
export const CommentsPage: BasicPage = () => {
  useSeo("评论 · 列表");
  const status = getQueryVariable("status");
  const page = Number(getQueryVariable("page")) || 1;
  const navigate = useNavigate();
  const [tab, setTab] = useState(status ? Number(status) : 0);

  const [select, setSelect] = useState<string[]>([]);
  const [showEditModal, setShowEditModal] = useState(false);
  // const [inSideLoading, setInSideLoading] = useState(true);

  const { data, mutate } = useSWR<any>(
    `/comments?status=${status}&page=${page}`
  );

  useEffect(() => {
    navigate(jump(`/comments?status=${tab}&page=${page}`));
    mutate();
  }, [page, tab]);

  const handleDelete = () => {
    setSelect([]);
    mutate((prev) => ({
      data: prev.data.filter((item) => !select.includes(item.id)),
      pagination: prev.pagination,
    }));
  };

  const { trigger: updateStatus } = useSWRMutation(
    `/comments/`,
    (
      key: string,
      {
        arg,
      }: {
        arg: {
          item: string;
          status: number;
        };
      }
    ) => {
      return apiClient(`${key}/${arg.item}`, {
        method: "PATCH",
        query: {
          status: arg.status,
        },
      });
    }
  );

  const handleUpdateStatus = (status: number) => {
    select.forEach((item) => {
      updateStatus({
        item,
        status,
      });
    });
    handleDelete();
  };

  return (
    <>
      {/* <Loading loading={!data} /> */}
      <div
      // className={clsx("loading", !data && "loaded")}
      >
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
                      handleUpdateStatus(3);
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
                    handleUpdateStatus(0);
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
                    handleUpdateStatus(1);
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
                    handleUpdateStatus(2);
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
            setTab(index);
          }}
        >
          <Tab.List className={tabs.tabList}>
            {tabsList.map((tab, index) => (
              <Tab
                key={index}
                className={({ selected }) =>
                  clsx(tabs.tab, selected && tabs.selected)
                }
              >
                {tab.name}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels>
            {tabsList.map((tab, index) => (
              <Tab.Panel key={index}>
                <CommentsList
                  comments={data as any}
                  // inSideLoading={inSideLoading}
                  select={select}
                  setSelect={setSelect}
                  jump={jump}
                  mailAvatar={mailAvatar}
                />
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
      <div className={postStyles.nav}>
        {(data?.pagination.has_prev_page && (
          <button className={postStyles.button}>上一页</button>
        )) ||
          null}
        {(data?.pagination.has_next_page && (
          <button className={postStyles.button}>下一页</button>
        )) ||
          null}
      </div>
      {showEditModal && (
        <EditModal
          tabsList={tabsList}
          select={select}
          setShowEditModal={setShowEditModal}
          setSelect={setSelect}
          setComments={(comments) => {
            mutate((prev) => ({
              data: comments.data,
              pagination: prev.pagination,
            }));
          }}
          // setInSideLoading={setInSideLoading}
          tab={tab}
          page={page}
        />
      )}
    </>
  );
};
