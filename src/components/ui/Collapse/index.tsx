import { Disclosure } from "@headlessui/react";
import type { PropsWithChildren } from "react";
import styles from "./index.module.css";

interface ICollapse {
  title: string;
  children: React.ReactNode;
  open?: boolean;
}

export const Collapse: React.FC<ICollapse> = (props) => {
  return (
    <Disclosure>
      <Disclosure.Button className={styles.button}>
        {props.title}
      </Disclosure.Button>
      <Disclosure.Panel className={styles.panel}>
        {props.children}
      </Disclosure.Panel>
    </Disclosure>
  );
};

export const CollapseContainer: React.FC<PropsWithChildren> = (props) => {
  return <div className={styles.container}>{props.children}</div>;
};
