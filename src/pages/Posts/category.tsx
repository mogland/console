/*
 * @FilePath: /nx-admin/src/pages/Posts/category.tsx
 * @author: Wibus
 * @Date: 2022-08-01 14:25:48
 * @LastEditors: Wibus
 * @LastEditTime: 2022-08-10 19:11:57
 * Coding With IU
 */

import {
  Button,
  Input,
  Modal,
  Popover,
  Select,
  Spacer,
  Table,
  Text,
  useClasses,
  useModal,
} from "@geist-ui/core";
import { MergeCells, Plus } from "@icon-park/react";
import { useState } from "react";
import { message } from "react-message-popup";
import { useMount } from "react-use";
import Dashboards from "../../components/layouts/Dashboards";
import { NxPage } from "../../components/widgets/Page";
import type { BasicPage } from "../../types/basic";
import { apiClient } from "../../utils/request";

export const Category: BasicPage = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [tags, setTags] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectCategory, setSelectCategory] = useState<{
    from: string;
    to: string;
  }>({ from: "", to: "" });
  const [editCategory, setEditCategory] = useState<any>({});

  const { setVisible, bindings } = useModal();
  const {
    setVisible: setAddVisible,
    bindings: addBindings,
  } = useModal();
  const {
    setVisible: setMergeVisible,
    bindings: mergeBindings,
  } = useModal();
  const {
    setVisible: setEditVisible,
    bindings: editBindings,
  } = useModal();

  const request = async () => {
    await apiClient
      .get("/categories", null, [{ key: "type", value: "Category" }])
      .then((res) => {
        setCategories(res.data);
      });
    await apiClient
      .get("/categories", null, [{ key: "type", value: "Tag" }])
      .then((res) => {
        setTags(res.data);
      });
  };
  useMount(() => {
    request().then(() => {
      setLoading(false);
    });
  });

  const renderCategoryAction = (value, rowData, index) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [deleteVisible, setDeleteVisible] = useState(false);

    const changeHandler = (next) => {
      setDeleteVisible(next);
    };
    const removeContent = () => {
      return (
        <div style={{ padding: 20, paddingBottom: 0 }}>
          <Text h5 b>
            是否要删除分类 {categories[index].name} ？
          </Text>
          <Text p b>
            将会把分类下全部文章一同删除
          </Text>
          <Button
            auto
            scale={1 / 3}
            font="12px"
            style={{ margin: 10 }}
            onClick={async () => {
              await apiClient
                .delete("/categories", [categories[index].id])
                .then(() => {
                  message.success(`已将分类 ${categories[index].name} 删除`);
                  setDeleteVisible(false);
                  request();
                });
            }}
          >
            确定
          </Button>
          <Button
            auto
            type="error"
            scale={1 / 3}
            font="12px"
            style={{ margin: 10 }}
            onClick={() => setDeleteVisible(false)}
          >
            取消
          </Button>
        </div>
      );
    };
    return (
      <>
        <Button
          auto
          scale={1 / 3}
          font="12px"
          onClick={() => {
            setEditVisible(true);
            setEditCategory(rowData);
          }}
        >
          Edit
        </Button>
        <Spacer w={0.5} />
        <Popover
          content={removeContent}
          visible={deleteVisible}
          onVisibleChange={changeHandler}
        >
          <Button type="error" auto scale={1 / 3} font="12px">
            Remove
          </Button>
        </Popover>
        <Spacer w={0.5} />
        <Button
          type="success"
          auto
          scale={1 / 3}
          font="12px"
          onClick={() => {
            setSelectCategory({ from: categories[index].id, to: "" });
            setVisible(true);
          }}
        >
          Merge
        </Button>
      </>
    );
  };
  const renderTagAction = (value, rowData, index) => {
    return (
      <>
        <Button
          type="success"
          auto
          scale={1 / 3}
          font="12px"
          onClick={() => {
            setSelectCategory({ from: tags[index].name, to: "" });
            setMergeVisible(true);
          }}
        >
          Merge
        </Button>
      </>
    );
  };

  const MergeCategoriesModal = () => {
    return (
      <Modal {...bindings}>
        <Modal.Title>合并分类</Modal.Title>
        <Modal.Subtitle>将两个分类的文章合并至一个分类中</Modal.Subtitle>
        <Modal.Content>
          <Select
            placeholder="请选择要合并导出文章的分类"
            width={"100%"}
            initialValue={selectCategory.from}
            onChange={(e) => {
              setSelectCategory({
                ...selectCategory,
                from: e as string,
              });
            }}
          >
            {categories.map((category) => {
              return (
                <Select.Option key={category.id} value={category.id}>
                  {category.name}
                </Select.Option>
              );
            })}
          </Select>
          <Spacer />
          <Select
            placeholder="请选择要合并文章进入的分类"
            width={"100%"}
            initialValue={selectCategory.to}
            onChange={(e) => {
              setSelectCategory({
                ...selectCategory,
                to: e as string,
              });
            }}
          >
            {categories.map((category) => {
              return (
                <Select.Option key={category.id} value={category.id}>
                  {category.name}
                </Select.Option>
              );
            })}
          </Select>
        </Modal.Content>
        <Modal.Action
          passive
          onClick={() => {
            setVisible(false);
            setSelectCategory({ from: "", to: "" });
          }}
        >
          取消
        </Modal.Action>
        <Modal.Action
          onClick={async () => {
            if (selectCategory.from && selectCategory.to) {
              await apiClient
                .post("/categories/merge", null, null, {
                  type: 0,
                  ...selectCategory,
                })
                .then(() => {
                  message.success(`合并成功`);
                  setVisible(false);
                  setSelectCategory({ from: "", to: "" });
                  request();
                })
                .catch((err) => {
                  message.error(`合并失败, ${err.message}`);
                  console.error(err);
                });
            } else {
              message.error(`请选择要合并的分类`);
            }
          }}
        >
          提交
        </Modal.Action>
      </Modal>
    );
  };

  const MergeTagsModal = () => {
    return (
      <Modal {...mergeBindings}>
        <Modal.Title>合并标签</Modal.Title>
        <Modal.Subtitle>将两个标签的文章合并至一个标签中</Modal.Subtitle>
        <Modal.Content>
          <Select
            placeholder="请选择要合并导出文章的标签"
            width={"100%"}
            initialValue={selectCategory.from}
            onChange={(e) => {
              setSelectCategory({
                ...selectCategory,
                from: e as string,
              });
            }}
          >
            {tags.map((tag) => {
              return <Select.Option key={tag.name} value={tag.name}>{tag.name}</Select.Option>;
            })}
          </Select>
          <Spacer />
          <Select
            placeholder="请选择要合并文章进入的标签"
            width={"100%"}
            initialValue={selectCategory.to}
            onChange={(e) => {
              setSelectCategory({
                ...selectCategory,
                to: e as string,
              });
            }}
          >
            {tags.map((tag) => {
              return <Select.Option key={tag.name} value={tag.name}>{tag.name}</Select.Option>;
            })}
          </Select>
        </Modal.Content>
        <Modal.Action
          passive
          onClick={() => {
            setMergeVisible(false);
            setSelectCategory({ from: "", to: "" });
          }}
        >
          取消
        </Modal.Action>
        <Modal.Action
          onClick={async () => {
            if (selectCategory.from && selectCategory.to) {
              await apiClient
                .post("/categories/merge", null, null, {
                  type: 1,
                  ...selectCategory,
                })
                .then(() => {
                  message.success(`合并成功`);
                  setMergeVisible(false);
                  setSelectCategory({ from: "", to: "" });
                  request();
                })
                .catch((err) => {
                  message.error(`合并失败, ${err.message}`);
                  console.error(err);
                });
            } else {
              message.error(`请选择要合并的标签`);
            }
          }}
        >
          提交
        </Modal.Action>
      </Modal>
    );
  };

  const AddCategoryModal = () => {
    return (
      <Modal {...addBindings}>
        <Modal.Title>新增分类</Modal.Title>
        <Modal.Subtitle>新增一个空白分类</Modal.Subtitle>
        <Modal.Content>
          <Input placeholder="分类名称" id="add-category-name" width={"100%"} />
          <Spacer />
          <Input placeholder="分类路径" id="add-category-slug" width={"100%"} />
        </Modal.Content>
        <Modal.Action passive onClick={() => setAddVisible(false)}>
          取消
        </Modal.Action>
        <Modal.Action
          onClick={async () => {
            const name = document.getElementById(
              "add-category-name"
            ) as HTMLInputElement;
            const slug = document.getElementById(
              "add-category-slug"
            ) as HTMLInputElement;
            await apiClient.post("/categories", null, null, {
              name: name.value,
              slug: slug.value,
              type: "Category",
            });
            setAddVisible(false);
            request();
          }}
        >
          提交
        </Modal.Action>
      </Modal>
    );
  };

  const EditCategoryModal = () => {
    return (
      <Modal {...editBindings}>
        <Modal.Title>编辑分类</Modal.Title>
        <Modal.Subtitle>编辑分类名称和路径</Modal.Subtitle>
        <Modal.Content>
          <Input
            placeholder="分类名称"
            id="edit-category-name"
            width={"100%"}
            initialValue={editCategory.name}
          />
          <Spacer />
          <Input
            placeholder="分类路径"
            id="edit-category-slug"
            width={"100%"}
            initialValue={editCategory.slug}
          />
        </Modal.Content>
        <Modal.Action passive onClick={() => setEditVisible(false)}>
          取消
        </Modal.Action>
        <Modal.Action
          onClick={async () => {
            const name = document.getElementById(
              "edit-category-name"
            ) as HTMLInputElement;
            const slug = document.getElementById(
              "edit-category-slug"
            ) as HTMLInputElement;
            await apiClient.put(`/categories/${editCategory.id}`, null, null, {
              name: name.value,
              slug: slug.value,
              type: 0,
            }).then(() => {
              message.success(`编辑成功`);
              setEditVisible(false);
              request();
            })
          }}
        >
          提交
        </Modal.Action>
      </Modal>
    );
  };

  return (
    <NxPage title={"Category & Tags"}>
      <Button
        onClick={() => {
          setAddVisible(true);
        }}
        style={{
          borderRadius: "100%",
          width: "50px",
          height: "50px",
          minHeight: "50px",
          minWidth: "50px",
          float: "right",
          position: "fixed",
          top: "62px",
          right: 40,
          padding: 0,
          paddingTop: "9px",
          paddingLeft: "1px",
          marginLeft: 10,
          fontSize: "1.3rem",
        }}
      >
        <Plus />
      </Button>
      <Button
        type="secondary"
        onClick={() => {
          setVisible(true);
        }}
        style={{
          borderRadius: "100%",
          width: "50px",
          height: "50px",
          minHeight: "50px",
          minWidth: "50px",
          float: "right",
          position: "fixed",
          top: "62px",
          right: 115,
          padding: 0,
          paddingTop: "8px",
          paddingLeft: "1px",
          marginLeft: 10,
          fontSize: "1.3rem",
        }}
      >
        <MergeCells />
      </Button>
      <Dashboards.Container
        className="lg:grid flex flex-col"
        gridTemplateColumns="1fr"
      >
        <Dashboards.Area
          className={useClasses("overflow-x-hidden")}
          style={{ overflow: "auto" }}
        >
          <Spacer h={3} />
          <Text h3>分类</Text>
          {!loading && (
            <>
              <Table data={categories}>
                <Table.Column label="分类名称" prop="name" />
                <Table.Column label="分类文章数" prop="count" />
                <Table.Column label="分类路径" prop="slug" />
                <Table.Column
                  label="操作"
                  prop="action"
                  render={renderCategoryAction}
                />
              </Table>
            </>
          )}
          <Spacer h={3} />
          <Text h3>标签</Text>
          {!loading && (
            <>
              <Table data={tags}>
                <Table.Column label="标签名称" prop="name" />
                <Table.Column label="标签文章数" prop="count" />
                <Table.Column
                  label="操作"
                  prop="action"
                  render={renderTagAction}
                />
              </Table>
            </>
          )}
        </Dashboards.Area>
      </Dashboards.Container>

      <MergeCategoriesModal />
      <MergeTagsModal />
      <AddCategoryModal />
      <EditCategoryModal />
    </NxPage>
  );
};
