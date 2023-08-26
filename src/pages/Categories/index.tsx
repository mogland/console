import { Merge, Plus } from "@icon-park/react";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnapshot } from "valtio";
import { Loading } from "@components/universal/Loading";
import { Modal } from "@components/universal/Modal";
import { Title } from "@components/universal/Title";
import { server } from "@states/app";
import type { BasicPage } from "@type/basic";
import { apiClient } from "@utils/request";
import { Input, Textarea } from "@pages/Write/Input";
import styles from "./index.module.css";
import { useSeo } from "@hooks/useSeo";
import { toast } from "sonner";
import useSWR from "swr";
import { ActionButton, ActionButtons } from "@components/widgets/ActionButtons";
import { jump } from "@utils/path";

export const CategoriesPage: BasicPage = () => {
  useSeo("分类 & 标签");
  const [loading, setLoading] = useState(false);
  const serverSnapshot = useSnapshot(server);

  const navigate = useNavigate();
  const [data, setData] = useState<{
    name: string;
    type: "category" | "tag";
  } | null>(null);
  const [modalData, setModalData] = useState<
    | {
        title: string;
        slug: string;
        text: string;
        type: "post" | "page";
        id: string;
        [key: string]: any;
      }[]
    | null
  >(null);
  const [select, setSelect] = useState<any[]>([]);

  const { data: _modalData } = useSWR(
    data ? `/category/${data.name}?tag=${data.type === "tag"}` : null
  );

  useEffect(() => {
    if (data) {
      if (_modalData) {
        if (data.type === "tag") {
          setModalData(_modalData);
        }
        if (data.type === "category") {
          setModalData(_modalData.children);
        }
      }
    }
  }, [_modalData, data]);

  const handleModalClose = () => {
    setModalData(null);
    setData(null);
  };

  const handleRemoveSelect = () => {
    const items = document.querySelectorAll(`.${styles.select}`);
    items.forEach((item) => {
      item.classList.remove(styles.select);
    });
    setSelect([]);
  };

  const [modalActive, setModalActive] = useState(false);
  const [modalCreateData, setModalCreateData] = useState<{
    id?: string;
    name: string;
    slug: string;
    icon?: string;
    description?: string;
    type?: "category" | "tag";
  }>({
    name: "",
    slug: "",
  });

  const {
    data: categories,
    error: categoriesError,
    mutate: mutateCategories,
  } = useSWR<any>("/category");
  const {
    data: tags,
    error: tagsError,
    mutate: mutateTags,
  } = useSWR<any>("/category?type=Tag");

  const addModal = () => {
    const handleConfirm = async () => {
      setLoading(true);
      try {
        await apiClient(
          `/category${`${modalCreateData.id ? `/${modalCreateData.id}` : ""}`}`,
          {
            method: `${modalCreateData.id ? "PUT" : "POST"}`,
            body: JSON.stringify({
              name: modalCreateData.name,
              slug: modalCreateData.slug,
              icon: modalCreateData.icon,
              description: modalCreateData.description,
              type: modalCreateData.type === "tag" ? 1 : 0,
            }),
          }
        );
        setModalActive(false);
        setModalCreateData({
          name: "",
          slug: "",
          icon: "",
          description: "",
        });
        console.log(modalCreateData.id);
        handleRemoveSelect();
        await Promise.all([mutateCategories(), mutateTags()]);
        if (!categoriesError) server.categories = categories.data || [];
        if (!tagsError) server.tags = tags.data || [];
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    return (
      <Modal
        title={`${modalCreateData.id ? "编辑" : "新增"}分类`}
        onClose={() => {
          setModalActive(false);
          setModalCreateData({
            name: "",
            slug: "",
            icon: "",
            description: "",
          });
          handleRemoveSelect();
        }}
        doubleClick={{
          cancel: modalCreateData.name ? true : false,
        }}
        type="confirm"
        options={{
          confirmText: "提交",
        }}
        onConfirm={handleConfirm}
        onCancel={() => {
          setModalActive(false);
          setModalCreateData({
            name: "",
            slug: "",
            icon: "",
            description: "",
          });
          const items = document.querySelectorAll(`.${styles.select}`);
          items.forEach((item) => {
            item.classList.remove(styles.select);
          });
          setSelect([]);
        }}
      >
        <Input
          value={modalCreateData.name}
          onChange={(e) => {
            setModalCreateData({
              ...modalCreateData,
              name: e,
            });
          }}
          label={`${modalCreateData.type === "tag" ? "标签" : "分类"}名称`}
          type="text"
        />
        {modalCreateData.type === "tag" ? null : (
          <Input
            value={modalCreateData.slug}
            onChange={(e) => {
              setModalCreateData({
                ...modalCreateData,
                slug: e,
              });
            }}
            label="分类别名"
            type="text"
          />
        )}
        <Input
          value={modalCreateData.icon || ""}
          onChange={(e) => {
            setModalCreateData({
              ...modalCreateData,
              icon: e,
            });
          }}
          label={`${modalCreateData.type === "tag" ? "标签" : "分类"}图标`}
          type="text"
        />
        <Textarea
          value={modalCreateData.description || ""}
          onChange={(e) => {
            setModalCreateData({
              ...modalCreateData,
              description: e,
            });
          }}
          label={`${modalCreateData.type === "tag" ? "标签" : "分类"}描述`}
        />
      </Modal>
    );
  };

  return (
    <div>
      <Loading loading={loading} />
      <div className={clsx("loading", !loading && "loaded")}>
        <div className={clsx(styles.group)}>
          <Title>
            <div className={styles.head}>
              <span className={styles.headTitle}>分类</span>
              <div>
                <ActionButtons
                  selectedClassName={styles.select}
                  setSelect={setSelect}
                  selected={select}
                  editAction={() => {
                    setModalCreateData({
                      id: select[0].id,
                      name: select[0].name,
                      slug: select[0].slug,
                      icon: select[0].icon,
                      description: select[0].description,
                      type: select[0].type,
                    });
                    setModalActive(true);
                  }}
                  deleteFunction={() => {
                    select.forEach((item) => {
                      apiClient(`/categories/${item}`, {
                        method: "DELETE",
                      });
                    });
                  }}
                />
                {((select.length === 1 || select.length === 2) && (
                  <ActionButton
                    icon={<Merge />}
                    label={"合并分类"}
                    action={(e) => {
                      if (
                        e.currentTarget.classList.contains(styles.confrim) &&
                        select.length === 2
                      ) {
                        toast.promise(
                          apiClient(`/category/merge`, {
                            method: "POST",
                            body: JSON.stringify({
                              from:
                                select[0].type === "category"
                                  ? select[0].id
                                  : select[0].name,
                              to:
                                select[1].type === "category"
                                  ? select[1].id
                                  : select[1].name,
                              type: select[0].type === "category" ? 0 : 1,
                            }),
                          }).then(() => {
                            setSelect([]);
                            handleRemoveSelect();
                            Promise.all([
                              mutateCategories(),
                              mutateTags(),
                            ]).then(() => {
                              if (!categoriesError)
                                server.categories = categories.data || [];
                              if (!tagsError) server.tags = tags.data || [];
                            });
                          }),
                          {
                            loading: "正在合并",
                            success: "合并成功",
                            error: "合并失败",
                          }
                        );
                      } else {
                        e.currentTarget.classList.add(styles.confrim);
                        if (select.length === 1) {
                          toast(
                            `
                            请继续选择一个${
                              select[0].type === "category" ? "分类" : "标签"
                            }，再点击合并按钮, 以将 ${select[0].name} ${
                              select[0].type === "category" ? "分类" : "标签"
                            }合并之所选${
                              select[0].type === "category" ? "分类" : "标签"
                            }下
                            `,
                            {
                              duration: 5000,
                            }
                          );
                        } else {
                          toast(
                            `请再次点击合并按钮, 以将 ${select[0].name} 合并至 ${select[1].name}`
                          );
                        }
                      }
                    }}
                  />
                )) ||
                  null}
              </div>
            </div>
          </Title>
          {serverSnapshot?.categories?.map((category) => {
            return (
              <span
                key={category.id}
                className={clsx(styles.block)}
                aria-label={category.name}
                onClick={(e) => {
                  // 以确保只有单一类型（分类或标签）被选中
                  if (select.length && select[0].type === "tags") {
                    toast("仅可选择一个分类或标签, 请先取消选择标签");
                    return;
                  }
                  if (e.currentTarget.classList.contains(styles.select)) {
                    e.currentTarget.classList.remove(styles.select);
                    setSelect(select.filter((item) => item.id !== category.id));
                  } else {
                    e.currentTarget.classList.add(styles.select);
                    setSelect([
                      ...select,
                      {
                        ...category,
                        type: "category",
                      },
                    ]);
                  }
                }}
              >
                {category.name}
                <span
                  onClick={() => {
                    setData({
                      name: category.slug,
                      type: "category",
                    });
                  }}
                  className={styles.count}
                >
                  {category.count}
                </span>
              </span>
            );
          })}

          <span
            className={clsx(styles.block, styles.add)}
            onClick={() => {
              setModalActive(true);
            }}
          >
            <Plus />
            新增
          </span>
        </div>

        <div className={styles.group}>
          <Title>标签</Title>
        </div>

        {serverSnapshot?.tags?.map((tag) => {
          return (
            <span
              key={tag.name}
              className={clsx(styles.block)}
              aria-label={tag.name}
              onClick={(e) => {
                if (select.length && select[0].type === "category") {
                  toast("仅可选择一个分类或标签, 请先取消选择分类");
                  return;
                }
                if (e.currentTarget.classList.contains(styles.select)) {
                  e.currentTarget.classList.remove(styles.select);
                  setSelect(select.filter((item) => item.name !== tag.name));
                } else {
                  e.currentTarget.classList.add(styles.select);
                  setSelect([
                    ...select,
                    {
                      ...tag,
                      type: "tag",
                    },
                  ]);
                }
              }}
            >
              <div>
                {tag.name}
                <span
                  onClick={() => {
                    setData({
                      name: tag.name,
                      type: "tag",
                    });
                  }}
                  className={styles.count}
                >
                  {tag.count}
                </span>
              </div>
            </span>
          );
        })}
      </div>

      {modalData && modal(modalData, navigate, handleModalClose)}
      {modalActive && addModal()}
    </div>
  );
};

const modal = (data, navigate, onClose) => {
  return (
    <Modal
      title={`相关文章`}
      size={"md"}
      options={{
        cancelText: "关闭",
      }}
      onClose={onClose}
    >
      {data.map((item) => {
        return (
          <div
            key={item.id}
            className={styles.modalItem}
            onClick={() => {
              navigate(jump(`/write/post?id=${item.id}`));
            }}
          >
            <h1>{item.title}</h1>
            <p>点击前往编辑页</p>
          </div>
        );
      })}
    </Modal>
  );
};
