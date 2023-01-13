import styles from "./index.module.css"
import { Fragment, useState } from "react"
import { Dialog, Transition } from "@headlessui/react"
import clsx from "clsx"

export const Modal = ({ children, onClose, title, type, options, onConfirm }: {
  children: React.ReactNode,
  title: string,
  type?: "confirm" | "info",
  options?: {
    confirmText?: string,
    cancelText?: string,
  }
  onConfirm?: (e: boolean) => void,
  onClose?: (e: boolean) => void,
}) => {
  const [isOpen, setIsOpen] = useState(true)
  function closeModal(e: boolean) {
    setIsOpen(false)
    onClose?.(e)
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
                className={clsx(styles.panel)} >
                <Dialog.Title
                  as="h3"
                  className={clsx(styles.title)}
                >
                  {title}
                </Dialog.Title>
                <div className="mt-2">
                  {children}
                </div>
                <div className="mt-4">
                  {
                    type === "confirm" && (
                      <button
                        type="button"
                        className={clsx(styles.confirm, styles.button)}
                        onClick={() => {
                          onConfirm?.(true)
                        }}
                      >
                        {options?.confirmText || "好的～"}
                      </button>
                    )
                  }

                  <button
                    type="button"
                    className={clsx(styles.cancel, styles.button)}
                    onClick={() => { closeModal(false) }}
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
  )
}

export const ModalBody = ({ children }) => {
  return (
    <p className={clsx("text-sm text-gray-500", styles.modalBody)}>
      {children}
    </p>
  )
}