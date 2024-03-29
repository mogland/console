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
import { jump } from "@utils/path";
import { useSeo } from "@hooks/useSeo";
import { EditModal } from "./component";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { CommentsTable } from "./Table/data-table";
import { commentsListColumns } from "./Table/column";
import { Button } from "@components/ui/button";
import { _private } from "@states/private";
import { useSnapshot } from "valtio";

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

  const { showModal } = useSnapshot(_private);

  const { data, mutate } = useSWR<any>(`/comments?status=${tab}&page=${page}`);

  useEffect(() => {
    navigate(jump(`/comments?status=${tab}&page=${page}`));
    mutate();
  }, [page, tab]);

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
              <Button
                variant="outline"
                className={clsx("ml-auto", "mr-2")}
                onClick={() => (_private.showModal = true)}
              >
                新建
              </Button>
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
                <CommentsTable
                  columns={commentsListColumns}
                  data={data?.data || []}
                  pagination={data?.pagination}
                />
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
      {showModal && (
        <EditModal
          status={tabsList}
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
