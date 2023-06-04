import { ExpandLeft, ExpandRight, Save } from "@icon-park/react";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSnapshot } from "valtio";
import { DatePick } from "@components/universal/DatePick";
import { MarkdownEditor } from "@components/universal/Editor";
import { FloatBtn, FloatBtnContainer } from "@components/universal/FloatBtn";
import { Loading } from "@components/universal/Loading";
import { Modal, ModalBody } from "@components/universal/Modal";
import { Selects } from "@components/universal/Select";
import { Tags } from "@components/universal/Tags";
import { Toggle } from "@components/universal/Toggle";
import { server } from "@states/app";
import type { BasicPage } from "@type/basic";
import { apiClient } from "@utils/request";
import { getQueryVariable } from "@utils/url";
import { Fields } from "./fields";
import styles from "./index.module.css";
import { Input, Textarea } from "./Input";
import { useSeo } from "@hooks/useSeo";
import { toast } from "sonner";

export const EditorPage: BasicPage = () => {
  const [loading, setLoading] = useState(true);
  const [sidebar, setSidebar] = useState(false);
  const [data, setData] = useState<any>();
  const [rawData, setRawData] = useState<any>();
  const { type } = useParams();
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);
  const id = getQueryVariable("id");
  const serverSnapshot = useSnapshot(server);

  useSeo(`${data?.title ? data.title : "新建"}${type === "page" ? "页面" : "文章"}`);
  useEffect(() => {
    if (!id) {
      setData({});
    }
  }, [id]);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    apiClient(`/${type}/${id}`)
      .then((res) => {
        setData(res);
        setRawData(res);
        setLoading(false);
      })
      .catch(() => {
        navigate(`/${type}s`);
      });
  }, [type, id]);

  const FloatBtns = () => {
    return (
      <FloatBtnContainer>
        <FloatBtn
          onClick={() => {
            const handler = apiClient(`${data.id ? `/${type}/${data.id}` : `/${type}`}`, {
              method: data.id ? "PUT" : "POST",
              body: JSON.stringify({
                ...data,
                categoryId: data.category_id,
                category: undefined,
              }),
            }).then(() => {
              navigate(`/${type}s`);
            });
            toast.promise(handler, {
              loading: "正在保存",
              success: `${type === "page" ? "页面" : "文章"}保存成功`,
              error: `${type === "page" ? "页面" : "文章"}保存失败`,
            });
          }}
        >
          <Save />
        </FloatBtn>
        <FloatBtn
          onClick={() => {
            setSidebar(!sidebar);
          }}
        >
          {sidebar ? <ExpandRight /> : <ExpandLeft />}
        </FloatBtn>
      </FloatBtnContainer>
    );
  };

  const sidebarComponent = () => {
    return (
      <>
        <Modal
          size="md"
          title="元数据"
          onClose={() => {
            setSidebar(false);
          }}
          onCancel={() => {
            setData(rawData);
          }}
          onConfirm={() => {
            setRawData(data);
          }}
          type="confirm"
          doubleClick={{
            cancel: true,
          }}
        >
          <div className={styles.toggleGroup}>
            <span className={styles.toggleGroupTitle}>
              <ModalBody>作者署名</ModalBody>
            </span>
            <Toggle
              checked={data?.copyright || true}
              onChange={(value) => {
                setData({
                  ...data,
                  copyright: value,
                });
              }}
            />
          </div>

          <div className={styles.toggleGroup}>
            <span className={styles.toggleGroupTitle}>
              <ModalBody>是否隐藏</ModalBody>
            </span>
            <Toggle
              checked={data?.hide || false}
              onChange={(value) => {
                setData({
                  ...data,
                  hide: value,
                });
              }}
            />
          </div>

          <div className={styles.toggleGroup}>
            <span className={styles.toggleGroupTitle}>
              <ModalBody>是否展示于订阅中</ModalBody>
            </span>
            <Toggle
              checked={data?.rss || true}
              onChange={(value) => {
                setData({
                  ...data,
                  rss: value,
                });
              }}
            />
          </div>
          <Input
            label="阅读密码"
            type="password"
            value={data?.password}
            onChange={(e) => {
              setData({
                ...data,
                password: e,
              });
            }}
          />
          {type === "post" && (
            <>
              <ModalBody>文章分类</ModalBody>
              <Selects
                value={serverSnapshot.categories.map((item) => {
                  return {
                    name: item.name,
                    value: item.id,
                  };
                })}
                selected={{
                  name: data?.category?.name,
                  value: data?.category?.id,
                }}
                onChange={(value) => {
                  setData({
                    ...data,
                    category_id: value.value,
                  });
                }}
              />
            </>
          )}
          <ModalBody>发布日期</ModalBody>
          <DatePick
            value={data?.created}
            onChange={(value) => {
              setData({
                ...data,
                created: value,
              });
            }}
            calendarStyle={{
              position: "absolute",
              top: "100px",
              left: "220px",
            }}
          />
          {type === "post" && (
            <>
              <ModalBody>文章标签</ModalBody>
              <Tags
                autoComplete
                tags={data?.tags || []}
                setTags={(tags) => {
                  setData({
                    ...data,
                    tags,
                  });
                }}
              />
              <Textarea
                label="文章摘要"
                value={data?.summary}
                onChange={(e) => {
                  setData({
                    ...data,
                    summary: e,
                  });
                }}
              />
            </>
          )}
          <ModalBody>
            自定义字段 <small>( 修改键名有 Bug )</small>{" "}
          </ModalBody>
          <Fields
            value={data?.fields || {}}
            onChange={(value) => {
              setData({
                ...data,
                fields: value,
              });
            }}
          />
        </Modal>
      </>
    );
  };

  return (
    <>
      <Loading loading={loading} />
      <div className={clsx("loading", !loading && "loaded")}>
        <div className={styles.container}>
          <form className={styles.form} ref={formRef}>
            <input
              onChange={(e) => {
                setData({ ...data, title: e.target.value });
              }}
              className={styles.title}
              type="text"
              name="title"
              placeholder="标题"
              defaultValue={data?.title}
            />
            <input
              onChange={(e) => {
                setData({ ...data, slug: e.target.value });
              }}
              className={styles.slug}
              name="slug"
              placeholder="Slug"
              defaultValue={data?.slug}
            />
            {!loading && (
              <MarkdownEditor
                initialValue={data?.text || " "}
                onChange={(value: string | undefined) => {
                  console.log(value);
                  
                  setData({
                    ...data,
                    text: value,
                  });
                }}
              />
            )}
            <FloatBtns />
            {sidebar && sidebarComponent()}
          </form>
        </div>
      </div>
    </>
  );
};
