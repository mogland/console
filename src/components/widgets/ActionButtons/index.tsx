import { Clear, Delete, Edit } from "@icon-park/react";
import clsx from "clsx";
import styles from "./index.module.css";
import { Button } from "@components/ui/button";

interface ActionButtonsProps {
  selectedClassName: string;
  setSelect: (value: React.SetStateAction<any>) => void;
  selected: any[];
  editAction?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  deleteFunction: (e) => void;
}

export const ActionButtons = (props: ActionButtonsProps) => {
  const { selectedClassName, setSelect, selected, editAction, deleteFunction } =
    props;

  const RemoveButton = () => {
    return (
      <ActionButton
        icon={<Clear />}
        label="取消选择"
        action={() => {
          setSelect([]);
          const items = document.querySelectorAll(".item");
          items.forEach((item) => {
            item.classList.remove(selectedClassName);
          });
        }}
      />
    );
  };

  const DeleteButton = () => {
    return (
      <ActionButton
        icon={<Delete />}
        label="删除"
        action={(e) => {
          deleteFunction(e);
          setSelect([]);
          document.querySelectorAll(`.${selectedClassName}`).forEach((item) => {
            item.remove();
          });
        }}
        className={styles.delete}
        doubleConfirm
        doubleConfirmLabel="确认删除?"
      />
    );
  };

  const EditButton = () => {
    if (!editAction) return null;
    return <ActionButton icon={<Edit />} label="编辑" action={editAction} />;
  };

  return (
    <>
      {selected.length ? <RemoveButton /> : null}
      {selected.length ? <DeleteButton /> : null}
      {selected.length === 1 ? <EditButton /> : null}
    </>
  );
};

interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
  action: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  doubleConfirm?: boolean;
  doubleConfirmLabel?: string;
}

export const ActionButton = (props: ActionButtonProps) => {
  const { label, action, className, doubleConfirm, doubleConfirmLabel } =
    props;

  return (
    <Button
      variant="outline"
      className={clsx("ml-auto", "mr-2", className)}
      onClick={(e) => {
        if (doubleConfirm) {
          if (e.currentTarget.classList.contains(styles.confrim)) {
            action(e);
          } else {
            e.currentTarget.classList.add(styles.confrim);
            if (doubleConfirmLabel)
              e.currentTarget.setAttribute("data-label", doubleConfirmLabel);
          }
        } else {
          action(e);
        }
      }}
      data-label={label}
    >
      {label}
    </Button>
  );
};
