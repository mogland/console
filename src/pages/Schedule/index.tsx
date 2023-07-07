import type { BasicPage } from "@type/basic";
import styles from "./index.module.css";
import { useSeo } from "@hooks/useSeo";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { Loading } from "@components/universal/Loading";
import clsx from "clsx";
import { Title } from "@components/universal/Title";
import { ActionButton, ActionButtons } from "@components/widgets/ActionButtons";
import { toast } from "sonner";
import { apiClient } from "@utils/request";
import { Add, Fire, Power } from "@icon-park/react";
import { Modal, ModalBody } from "@components/universal/Modal";
import { Input, Textarea } from "@pages/Write/Input";
import { Toggle } from "@components/universal/Toggle";
import { Collapse, CollapseContainer } from "@components/universal/Collapse";
import { Select } from "@components/widgets/ThemeComponent/ThemeSelect";
import { useSnapshot } from "valtio";
import { _private } from "@states/private";
import { ScheduleDataTable } from "./Table/data-table";
import type {
  ScheduleItemProps} from "./Table/column";
import {
  ScheduleAfter,
  ScheduleColumns,
  ScheduleType,
} from "./Table/column";
import { Button } from "@components/ui/button";

export const SchedulePage: BasicPage = () => {
  useSeo("计划任务");
  const [select, setSelect] = useState<string[]>([]);
  const { data, isLoading, mutate } = useSWR<{
    data: ScheduleItemProps[];
  }>("/schedule");
  const privateSnapshot = useSnapshot(_private);

  useEffect(() => {
    mutate();
  }, []);

  const EditModal = () => {
    const [item, setItem] = useState<
      | (ScheduleItemProps & {
          action: any;
          after_action?: any;
          description: string;
          active: boolean;
        })
      | null
    >({
      token: "",
      name: "",
      description: "",
      cron: "",
      next: "",
      type: "url",
      after: "none",
      error: [],
      running: false,
      active: false,
      action: {},
    });

    const selectItem = data?.data.find(
      (i) => i.token === privateSnapshot.modalDataId
    );

    useEffect(() => {
      if (privateSnapshot.modalDataId) {
        apiClient(`/schedule/${privateSnapshot.modalDataId}`).then(
          (itemDetailData) => {
            setItem(itemDetailData);
          }
        );
      }
    }, []);

    return (
      <>
        <Loading loading={!item} />
        <Modal
          size="md"
          title={`${item?.token.length ? "编辑" : "新建"}计划任务`}
          type="confirm"
          doubleClick={{
            cancel: true,
          }}
          onClose={() => {
            _private.showModal = false;
          }}
          onConfirm={() => {
            if (!item) {
              toast.error("无效计划任务设定");
              return;
            }
            if (!item.name) {
              toast.error("请输入活动名");
              return;
            }
            const REQUEST = apiClient(
              `/schedule${
                selectItem?.token.length ? `/${selectItem?.token}` : ""
              }`,
              {
                method: selectItem?.token.length ? "PUT" : "POST",
                body: JSON.stringify({
                  ...item,
                  afterAction: item.after_action,
                }),
              }
            ).then(() => {
              mutate();
            });
            toast.promise(REQUEST, {
              loading: "正在提交",
              success: "提交成功",
              error: "提交失败",
            });
          }}
          options={{
            confirmText: "提交",
          }}
        >
          <Toggle
            label="任务开关"
            checked={item?.active || false}
            onChange={(e) => {
              setItem({
                ...(item as any),
                running: e,
                active: e,
              });
            }}
          />
          {item?.token && (
            <Input
              disabled
              style={{
                color: "var(--background-color-quaternary)",
                backgroundColor: "var(--background-color-tertiary)",
              }}
              width="100%"
              label="任务 ID"
              value={item.token}
              oneLine
            />
          )}
          <Input
            label="任务名"
            value={item?.name || ""}
            onChange={(e) => {
              setItem({
                ...(item as any),
                name: e,
              });
            }}
          />
          <Input
            label="任务描述"
            value={item?.description || ""}
            onChange={(e) => {
              setItem({
                ...(item as any),
                description: e,
              });
            }}
          />
          <Input
            label="Cron 表达式"
            value={item?.cron || ""}
            style={{ fontFamily: "monospace" }}
            onChange={(e) => {
              setItem({
                ...(item as any),
                cron: e,
              });
            }}
          />
          <ModalBody>任务类型</ModalBody>
          <Select
            data={Object.keys(ScheduleType).map((i) => ({
              label: ScheduleType[i],
              value: i,
            }))}
            value={item?.type || "url"}
            onChange={(e) => {
              setItem({
                ...(item as any),
                type: e,
              });
            }}
            placeholder="请选择任务类型"
          />
          <Textarea
            label="任务操作参数 (optional)"
            value={JSON.stringify(item?.action) || ""}
            style={{ fontFamily: "monospace", minHeight: "100px" }}
            onChange={(e) => {
              setItem({
                ...(item as any),
                action: e,
              });
            }}
          />
          <ModalBody>任务后续</ModalBody>
          <Select
            data={Object.keys(ScheduleAfter).map((i) => ({
              label: ScheduleAfter[i],
              value: i,
            }))}
            value={item?.after || "none"}
            onChange={(e) => {
              setItem({
                ...(item as any),
                after: e,
              });
            }}
            placeholder="请选择任务后续"
          />
          <Textarea
            label="任务后续操作参数 (optional)"
            value={JSON.stringify(item?.after_action) || ""}
            style={{ fontFamily: "monospace", minHeight: "100px" }}
            onChange={(e) => {
              setItem({
                ...(item as any),
                after_action: e,
              });
            }}
          />
          <CollapseContainer>
            <Collapse title="任务错误日志">
              <div className="max-h-[400px] overflow-y-scroll">
                {item?.error.length ? (
                  item?.error?.map((v: any, index) => (
                    <div key={index} className={styles.error}>
                      {v.time} - {v.message}
                    </div>
                  ))
                ) : (
                  <ModalBody>暂无错误报告</ModalBody>
                )}
              </div>
            </Collapse>
          </CollapseContainer>
        </Modal>
      </>
    );
  };

  return (
    <>
      <Loading loading={isLoading} />
      <div className={clsx("loading", !isLoading && "loaded")}>

        <ScheduleDataTable
          columns={ScheduleColumns}
          data={data?.data || []}
          pagination={{
            total: 0,
            total_page: 0,
            current_page: 0,
          }}
          header={
            <>
              <Title>
                <div className={styles.head}>
                  <span className={styles.headTitle}>计划任务</span>
                </div>
              </Title>
              <Button
                variant="outline"
                className={clsx("ml-auto", "mr-2")}
                onClick={() => (_private.showModal = true)}
              >
                新建
              </Button>
            </>
          }
        />
      </div>
      {privateSnapshot.showModal && <EditModal />}
    </>
  );
};
