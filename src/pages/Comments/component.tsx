import postStyles from "@pages/Posts/Index/index.module.css";
import styles from "./index.module.css";
import { Modal, ModalBody } from "@components/universal/Modal";
import {
  TableContainer,
  TableItem,
  TableItemValue,
} from "@pages/Home/universal";
import { Input } from "@components/ui/input";
import { Textarea } from "@components/ui/textarea";
import { apiClient } from "@utils/request";
import clsx from "clsx";
import { useCallback, useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { Select } from "@components/widgets/ThemeComponent/ThemeSelect";
import { Label } from "@components/ui/label";
import { Dialog, DialogHeader } from "@components/ui/dialog";
import { useSnapshot } from "valtio";
import { _private } from "@states/private";
import { DialogContent } from "@radix-ui/react-dialog";

interface EditModalProps {
  status: {
    name: string;
    status: number;
  }[];
}

export const EditModal: React.FC<any> = ({
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
        <Label>作者</Label>
        <Input
          value={_data?.author}
          onChange={(e) => {
            setData({
              ..._data,
              author: e,
            });
          }}
        />

        <Label>邮箱</Label>
        <Input
          value={_data?.email}
          onChange={(e) => {
            setData({
              ..._data,
              email: e,
            });
          }}
        />

        <Label>内容</Label>
        <Textarea
          value={_data?.text}
          onChange={(e) => {
            setData({
              ..._data,
              text: e,
            });
          }}
        />
      </Modal>
    </>
  );
};

export const _EditModal: React.FC<EditModalProps> = (props) => {
  const { showModal, modalDataId } = useSnapshot(_private);
  const { data } = useSWR(`/comments/${modalDataId}`);
  const { trigger } = useSWRMutation(
    `/comments/${modalDataId}`,
    (key: string, { arg }: { arg: string }) => {
      return apiClient(key, {
        method: "PUT",
        body: JSON.stringify(arg),
      });
    }
  );

  const handleConfirm = async () => {
    await trigger(data);
    _private.showModal = false;
    _private.modalDataId = "";
  };

  return (
    <Dialog
      open={showModal}
      onOpenChange={(e) => {
        _private.showModal = e;
      }}
      defaultOpen={false}
    >
      <DialogContent>
        <DialogHeader>编辑评论</DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
