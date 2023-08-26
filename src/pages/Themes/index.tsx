import { Loading } from "@components/universal/Loading";
import { Title } from "@components/universal/Title";
import type { BasicPage } from "@type/basic";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import tabs from "@components/universal/Tabs/index.module.css";
import styles from "./index.module.css";
import { apiClient } from "@utils/request";
import { getQueryVariable } from "@utils/url";
import { useNavigate } from "react-router-dom";
import { Modal } from "@components/universal/Modal";
import { ThemeComponent } from "@components/widgets/ThemeComponent";
import { Space } from "@components/universal/Space";
import { useSeo } from "@hooks/useSeo";
import { toast } from "sonner";
import useSWR from "swr";
import { jump } from "@utils/path";
import { ThemesListDataTable } from "./Table/data-table";
import { ThemesListColumns } from "./Table/column";
import { useSnapshot } from "valtio";
import { _private } from "@states/private";

export const ThemesPage: BasicPage = () => {
  useSeo("主题");
  const _tab = Number(getQueryVariable("tab") || 0);
  const [tab, setTab] = useState<number>(_tab);
  const [loading, setLoading] = useState(false);
  // const [id, setId] = useState<string | undefined>();
  const { showModal, modalDataId, refreshData } = useSnapshot(_private);

  const { data: localData, mutate: themeMutate } = useSWR<
    {
      data: {
        id: string;
        name: string;
        active: boolean;
        package: string;
        version: string;
        config: any;
        path: string;
      }[]
    }
  >("/themes");

  const handleLocalData = async () => {
    themeMutate();
  };

  useEffect(() => {
    Promise.all([
      handleLocalData(),
    ]).then(() => {
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (refreshData) {      
      handleLocalData();
      _private.refreshData = false;
    }
  }, [refreshData]);

  const navigate = useNavigate();
  useEffect(() => {
    navigate(jump(`/themes?tab=${tab}`));
  }, [tab]);

  const Setting = ({ id }: { id: string }) => {
    // const data = localData.find((item) => item.id === id);
    const [config, setConfig] = useState<any>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      apiClient(`/themes/${id}/config`).then((res) => {
        setConfig(res.data);
        setLoading(false);
      });
    }, [id]);
    console.log(config);
    return (
      <>
        <Modal
          title="主题设置"
          onClose={() => {
            _private.showModal = false;
            _private.modalDataId = "";
          }}
          type="confirm"
          size="lg"
          onConfirm={() => {
            const handler = apiClient(`/themes/${id}/config`, {
              method: "PATCH",
              body: {
                config: JSON.stringify(config),
              },
            }).then(() => {
              handleLocalData();
            });
            toast.promise(handler, {
              loading: "保存中",
              success: "保存成功",
              error: "保存失败",
            });
            _private.showModal = false;
            _private.modalDataId = "";
          }}
        >
          {loading && (
            <>
              <Loading loading={loading} />
              <Space height={"48rem"} />
            </>
          )}
          {config &&
            config.map((item: any, index: number) => {
              return (
                <div key={index} className={styles.modal}>
                  <ThemeComponent
                    type={item.type}
                    label={item.name}
                    value={item.data ? item.data : item.value}
                    selected={item.value}
                    onChange={(value: string) => {
                      setConfig((prev: any) => {
                        prev[index].value = value;
                        return prev;
                      });
                    }}
                  />
                </div>
              );
            })}
        </Modal>
      </>
    );
  };

  return (
    <>
      <Loading loading={loading} />
      <div className={clsx("loading", !loading && "loaded")}>
        <Title>主题</Title>

        <Tab.Group
          defaultIndex={tab}
          onChange={(index) => {
            setTab(index);
          }}
        >
          <Tab.List className={tabs.tabList}>
            <Tab
              className={({ selected }) =>
                clsx(tabs.tab, selected && tabs.selected)
              }
            >
              本地主题
            </Tab>
            <Tab
              className={({ selected }) =>
                clsx(tabs.tab, selected && tabs.selected)
              }
            >
              线上市场
            </Tab>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
              <ThemesListDataTable 
                columns={ThemesListColumns}
                data={localData?.data || []}
              />
            </Tab.Panel>
            <Tab.Panel>
              尚未上线
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
        {showModal && modalDataId && <Setting id={modalDataId} />}
      </div>
    </>
  );
};
