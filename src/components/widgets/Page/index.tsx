/*
 * @FilePath: /nx-admin/src/components/widgets/Page/index.tsx
 * @author: Wibus
 * @Date: 2022-07-15 19:46:40
 * @LastEditors: Wibus
 * @LastEditTime: 2022-07-15 19:49:04
 * Coding With IU
 */

import { Page, useClasses, Text } from "@geist-ui/core"
import styles from "./index.module.css"
export const NxPage = ({ title, children }) => (
  <Page className={useClasses(styles.page)}>
    <div className={useClasses(styles.header)}>
      <Text h2>{title}</Text>
    </div>
    {children}
  </Page>
)