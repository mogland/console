import type { PropsWithChildren } from "react";
import styles from "./index.module.css";

export const FloatBtnContainer: React.FC<PropsWithChildren> = ({
  children,
}) => {
  return <div className={styles.container}>{children}</div>;
};

export const FloatBtn: React.FC<
  { onClick?: () => void } & PropsWithChildren
> = ({ onClick, children }) => {
  return (
    <div className={styles.btn} onClick={onClick}>
      {children}
    </div>
  );
};
