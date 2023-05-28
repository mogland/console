import type { BasicPage } from "@type/basic";
import styles from "./index.module.css";
import { useSeo } from "@hooks/useSeo";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { Loading } from "@components/universal/Loading";
import clsx from "clsx";
import { Title } from "@components/universal/Title";
import {
  TableContainer,
  TableItem,
  TableItemValue,
} from "@pages/Home/universal";
import { ActionButton, ActionButtons } from "@components/widgets/ActionButtons";
import { toast } from "sonner";
import { apiClient } from "@utils/request";
import { Add, Cpu, Fire, Power } from "@icon-park/react";
import { Modal, ModalBody } from "@components/universal/Modal";
import { Input, Textarea } from "@pages/Write/Input";
import { Selects } from "@components/universal/Select";
import { Toggle } from "@components/universal/Toggle";
import { Collapse, CollapseContainer } from "@components/universal/Collapse";

const ScheduleType = {
  url: "访问 URL",
  event: "广播事件",
};

const ScheduleAfter = {
  none: "无",
  store: "存储",
  url: "访问 URL",
};

interface ScheduleItemProps {
  token: string;
  name: string;
  description: string;
  cron: string;
  next: string;
  type: keyof typeof ScheduleType;
  after: keyof typeof ScheduleAfter;
  error: object[];
  running: boolean;
}

export const SchedulePage: BasicPage = () => {
  useSeo("计划任务");
  const [select, setSelect] = useState<string[]>([]);
  const { data, isLoading, mutate } = useSWR<{
    data: ScheduleItemProps[];
  }>("/schedule");
  const [showEditModal, setShowEditModal] = useState(false);

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

    const selectItem = data?.data.find((i) => i.token === select[0]);
    console.log(select);

    useEffect(() => {
      if (select[0]) {
        console.log(select[0]);
        apiClient(`/schedule/${select[0]}`).then((itemDetailData) => {
          setItem(itemDetailData);
        });
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
            setShowEditModal(false);
            setSelect([]);
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
          <Selects
            label="任务类型"
            value={Object.keys(ScheduleType).map((i) => ({
              name: ScheduleType[i],
              value: i,
            }))}
            selected={item?.type ? ScheduleType[item?.type] : ScheduleType.url}
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
          <Selects
            label="任务后续"
            value={Object.keys(ScheduleAfter).map((i) => ({
              name: ScheduleAfter[i],
              value: i,
            }))}
            selected={
              item?.after ? ScheduleAfter[item?.after] : ScheduleAfter.none
            }
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
        <Title>
          <div className={clsx("flex", "justify-between")}>
            <div>计划任务</div>
            <div>
              <ActionButtons
                selectedClassName={styles.selected}
                selected={select}
                setSelect={setSelect}
                editAction={() => {
                  setShowEditModal(true);
                }}
                deleteFunction={async () => {
                  toast.promise(
                    Promise.all(
                      select.map(async (item) => {
                        await apiClient(`/schedule/${item}`, {
                          method: "DELETE",
                        });
                      })
                    ),
                    {
                      loading: "正在删除",
                      success: "删除成功",
                      error: "删除失败",
                    }
                  );
                }}
              />
              {select.length === 1 && (
                <>
                  <ActionButton
                    label={"开关"}
                    icon={<Power />}
                    action={() => {
                      toast.promise(
                        apiClient(`/schedule/${select[0]}`, {
                          method: "PATCH",
                        }).then(() => {
                          mutate();
                        }),
                        {
                          loading: "正在切换",
                          success: "切换成功",
                          error: "切换失败",
                        }
                      );
                    }}
                  />
                  <ActionButton
                    label="立即执行"
                    icon={<Fire />}
                    action={() => {
                      toast.promise(
                        apiClient(`/schedule/${select[0]}/run`, {
                          method: "GET",
                        }),
                        {
                          loading: "正在执行",
                          success: "执行成功",
                          error: "执行失败",
                        }
                      );
                    }}
                  />
                </>
              )}
              <ActionButton
                label="新建任务"
                icon={<Add />}
                action={() => {
                  setSelect([]);
                  setShowEditModal(true);
                }}
              />
            </div>
          </div>
        </Title>

        <TableContainer
          style={{ marginTop: "20px" }}
          header={[
            "任务名",
            "任务描述",
            "Cron 表达式",
            "下一次执行",
            "任务状态",
          ]}
        >
          {data?.data.map((item, index) => {
            return (
              <TableItem
                key={index}
                header={["NAME", "DESCRIPTION", "CRON", "NEXT", "RUNNING"]}
                onClick={() => {
                  if (select.includes(item.token)) {
                    setSelect(select.filter((i) => i !== item.token));
                  } else {
                    setSelect([...select, item.token]);
                  }
                }}
                className={clsx(select.includes(item.token) && styles.selected)}
              >
                <TableItemValue>{item.name}</TableItemValue>
                <TableItemValue>{item.description}</TableItemValue>
                <TableItemValue>{item.cron}</TableItemValue>
                <TableItemValue>
                  {new Date(item.next).toLocaleDateString()}
                </TableItemValue>
                <TableItemValue>
                  {item.running ? "激活" : "停止"}
                </TableItemValue>
              </TableItem>
            );
          })}
        </TableContainer>
      </div>
      {showEditModal && <EditModal />}
    </>
  );
};
