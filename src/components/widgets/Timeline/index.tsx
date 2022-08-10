/*
 * @FilePath: /nx-admin/src/components/widgets/Timeline/index.tsx
 * @author: Wibus
 * @Date: 2022-07-14 21:59:20
 * @LastEditors: Wibus
 * @LastEditTime: 2022-08-10 20:15:50
 * Coding With IU
 */

import { useClasses } from "@geist-ui/core";
import { $fetch } from "ohmyfetch";
import { useState } from "react";
import { useMount } from "react-use";
import styles from "./index.module.css";

const TimelineItem = (props) => {
  return (
    <li className={useClasses(styles.timelineItem, "ml-1 pt-0 pb-3")}>
      <div className={useClasses("mt-0", styles.TimelineItemBadge)}>
        <svg
          aria-hidden="true"
          height="16"
          viewBox="0 0 16 16"
          version="1.1"
          width="16"
          data-view-component="true"
          className="octicon octicon-dot-fill mb-2"
        >
          <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8z" />
        </svg>
      </div>

      <div className={useClasses("mt-n1", styles.TimelineItemBody)}>
        <div className={useClasses(styles.colorFgMuted, "text-small")}>
          <small>{props.day}</small>
        </div>
        <a
          className={useClasses(styles.LinkPrimary, styles.lineClamp2)}
          href={props.url}
        >
          {props.title}
        </a>
        <div className={useClasses(styles.colorFgMuted, "text-small")}>
          <small>{props.summary}...</small>
        </div>
      </div>
    </li>
  );
};

export const Timeline = () => {

  // 在加载后获取数据
  const [data, setData] = useState([]);
  useMount(() => {
    $fetch("https://nx.js.org/blog/feed.json").then((res) => {
      setData(res.items);
    })
  });


  return (
    <>
      <ul className={useClasses(styles.timelineList)}>

        {data.map((item: any, index) => {
          return (
            <TimelineItem
              key={index}
              title={item.title}
              day={item.date_modified.split("T")[0]}
              url={item.url}
              summary={item.summary}
            />
          )
        })}

      </ul>
      <div className="ml-1 pt-2 pl-4 border-left">
        <a
          className={useClasses("text-small mt-2", styles.viewChanges)}
          href="https://nx.js.org/blog/"
        >
          View changeblog →
        </a>
      </div>
    </>
  );
};
