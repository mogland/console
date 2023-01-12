import clsx from "clsx"
import styles from "./index.module.css"


export const GridContainer = ({ children, gridTemplateColumns, className }: { children: React.ReactNode, gridTemplateColumns: string, className?: string }) => {
  return (
    <div style={{ gridTemplateColumns }} className={clsx(styles.gridContainer, className)}>
      {children}
    </div>
  )
}

export const Widget = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return (
    <div className={clsx(styles.widget, className)}>
      {children}
    </div>
  )
}

export const TableContainer = ({ children, className, header, style, headerStyle }: { header: string[], children: React.ReactNode, className?: string, style?: React.CSSProperties, headerStyle?: React.CSSProperties }) => {
  return (
    <div className={clsx(styles.tableContainer, className)}
      style={style}
    >
      <div
        className={clsx(styles.tableHeader, styles.tableGrid)}
        style={{
          gridTemplateColumns: `2fr repeat(${header.length - 1}, 1fr)`,
          ...headerStyle
        }}
      >
        {
          header.map((item, index) => {
            return (
              <span key={index} className={styles.tableHeaderItem}>
                {item}
              </span>
            )
          })
        }
      </div>
      {children}
    </div>
  )
}

export const TableItem = ({ children, className, header, ...props }: { header: string[], children: React.ReactNode, className?: string, [key: string]: any }) => {
  return (
    <div
      className={clsx(styles.tableGrid, styles.tableItem, className)}
      style={{
        gridTemplateColumns: `2fr repeat(${header.length - 1}, 1fr)`
      }}
      {...props}
    >
      {children}
    </div>
  )
}

export const TableItemValue = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return (
    <span className={clsx(styles.tableItemTitle, className)}>
      {children}
    </span>
  )
}