/*
 * @FilePath: /nx-admin/src/components/widgets/Dashboards/index.tsx
 * @author: Wibus
 * @Date: 2022-07-15 15:26:54
 * @LastEditors: Wibus
 * @LastEditTime: 2022-07-26 21:22:06
 * Coding With IU
 */

import { useClasses } from "@geist-ui/core";
import {
  ReactElement,
  JSXElementConstructor,
  ReactFragment,
  ReactPortal,
} from "react";
import styles from "./index.module.css";

const Dashboards = () => {};

Dashboards.Container = (props: {
  children:
    | string
    | number
    | boolean
    | ReactElement<any, string | JSXElementConstructor<any>>
    | ReactFragment
    | ReactPortal
    | null
    | undefined;
  className: any;
  gridTemplateColumns?: string;
}) => {
  return (
    <div
      className={useClasses(styles.viewContainer, props.className)}
      style={{
        gridTemplateColumns: props.gridTemplateColumns,
      }}
    >
      {props.children}
    </div>
  );
};
Dashboards.Area = (props: {
  children:
    | string
    | number
    | boolean
    | ReactElement<any, string | JSXElementConstructor<any>>
    | ReactFragment
    | ReactPortal
    | null
    | undefined;
  border?: boolean;
  className?: string;
  style?: any;
}) => {
  return (
    <section className={useClasses(styles.dashboardArea, styles.mixed)}>
      <div className={useClasses(styles.dashboardContainer)}>
        <div
          className={useClasses(
            styles.dashboardBox,
            styles.blogPost,
            props.border ? "" : "border-none",
            props.className
          )}
          style={props.style}
        >
          {props.children}
        </div>
      </div>
    </section>
  );
};

export default Dashboards;
