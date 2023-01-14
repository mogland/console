import styles from "./index.module.css";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import clsx from "clsx";
import { Button } from "../Button";
export const Modal = ({
  children,
  onClose,
  title,
  type,
  options,
  onConfirm,
  size,
  doubleClick,
  onCancel,
}: {
  children: React.ReactNode;
  title: string;
  type?: "confirm" | "info";
  options?: {
    confirmText?: string;
    cancelText?: string;
  };
  onConfirm?: (e: boolean) => void;
  onCancel?: (e: boolean) => void;
  onClose?: (e: boolean) => void;
  size?: "sm" | "md" | "lg";
  doubleClick?: {
    confirm?: boolean;
    cancel?: boolean;
  };
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [doubleClickState, setDoubleClickState] = useState({
    confirm: doubleClick?.confirm || false,
    cancel: doubleClick?.cancel || false,
  });

  const confirm = (e) => {
    if (doubleClickState.confirm) {
      e.preventDefault();
      e.currentTarget.classList.add(styles["double-click"]);
      setDoubleClickState({
        ...doubleClickState,
        confirm: false,
      });
      return;
    }
    onClose?.(true);
    onConfirm?.(true);
  };

  const cancel = (e) => {
    if (doubleClickState.cancel) {
      e.preventDefault();
      e.currentTarget.classList.add(styles["double-click"]);
      setDoubleClickState({
        ...doubleClickState,
        cancel: false,
      });
      return;
    }
    onClose?.(false);
    onCancel?.(false);
  };

  function closeModal(e: boolean) {
    setIsOpen(false);
    onClose?.(e);
  }
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className={clsx(styles.dialog)} onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className={clsx(styles.overlay)} />
        </Transition.Child>

        <div className={clsx(styles.container)}>
          <div className={clsx(styles.containerInner)}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={clsx(styles.panel, styles[size || "sm"])}
              >
                <Dialog.Title as="h3" className={clsx(styles.title)}>
                  {title}
                </Dialog.Title>
                <div className={clsx("mt-2", styles.panelChildren)}>{children}</div>
                <div className="mt-4">
                  {type === "confirm" && (
                    <Button
                      className={clsx(styles.confirm, styles.button)}
                      onClick={confirm}
                    >
                      {options?.confirmText || "好的～"}
                    </Button>
                  )}

                  <button
                    type="button"
                    className={clsx(styles.cancel, styles.button)}
                    onClick={(e) => {
                      cancel(e);
                    }}
                  >
                    {options?.cancelText || "取消"}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export const ModalBody = ({ children }) => {
  return <p className={clsx(styles.modalBody)}>{children}</p>;
};
