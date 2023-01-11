import clsx from "clsx";
import { Title } from "../../components/universal/Title";
import { BasicPage } from "../../types/basic";
import styles from "./index.module.css"

export const GridContainer = ({ children, gridTemplateColumns, className }: { children: React.ReactNode, gridTemplateColumns: string, className?: string }) => {
  return (
    <div style={{ gridTemplateColumns }} className={clsx(styles.gridContainer, className)}>
      {children}
    </div>
  )
}

export const Home: BasicPage = () => {
  return (
    <>
      <Title>
        仪表盘
      </Title>
      <GridContainer gridTemplateColumns="1fr 1fr 1fr" className={styles.total}>
        <div className={styles.totalItem}>
          <div className={styles.totalTitle}>
            总计&nbsp;API&nbsp;请求
          </div>
          <div className={styles.totalNumber}>
            13,042
          </div>
        </div>
        <div className={styles.totalItem}>
          <div className={styles.totalTitle}>
            总计文章数量
          </div>
          <div className={styles.totalNumber}>
            3,042
          </div>
        </div>
        <div className={styles.totalItem}>
          <div className={styles.totalTitle}>
            总计评论数量
          </div>
          <div className={styles.totalNumber}>
            9,834
          </div>
        </div>
      </GridContainer>
    </>
  )
}