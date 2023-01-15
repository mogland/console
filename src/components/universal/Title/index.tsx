import styles from "./index.module.css";

export const Title = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.title}>
      <h1>{children}</h1>
    </div>
  );
};
