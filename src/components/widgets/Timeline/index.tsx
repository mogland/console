/*
 * @FilePath: /nx-admin/src/components/widgets/Timeline/index.tsx
 * @author: Wibus
 * @Date: 2022-07-14 21:59:20
 * @LastEditors: Wibus
 * @LastEditTime: 2022-07-23 20:43:28
 * Coding With IU
 */

import { useClasses } from "@geist-ui/core";
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
          <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8z"></path>
        </svg>
      </div>

      <div className={useClasses("mt-n1", styles.TimelineItemBody)}>
        <div className={useClasses(styles.colorFgMuted, "text-small")}>
          {/* <small>{item.day ? item.day : "many hours ago"}</small> */}
          <small>{props.day}</small>
        </div>
        <a
          className={useClasses(styles.LinkPrimary, styles.lineClamp2)}
          href={props.url}
        >
          {props.title}
        </a>
      </div>
    </li>
  );
};

export const Timeline = (props) => {
  return (
    <>
      <ul className={useClasses(styles.timelineList)}>
        {/* {props.data ? props.data.map((item, index) => { */}

        <TimelineItem
          title={"NEXT Core Release V1.5.1 has been released to the public"}
          day={"many hours ago"}
          url={"https://github.com/nx-space/core/releases/tag/v1.5.1"}
        />
        <TimelineItem
          title={"NEXT Core Release v1.4.0-alpha.2 is coming with nestjs@v9"}
          day={"many hours ago"}
          url={"https://github.com/nx-space/core/releases/tag/v1.4.0-alpha.2"}
        />
        <TimelineItem
          title={
            "Breaking Changes: New links module with crawling feeds in NEXT Core "
          }
          day={"many hours ago"}
          url={"https://github.com/nx-space/core/pull/223"}
        />
        <TimelineItem
          title={"NEXT Core Aggregate Service becomes a rss builder"}
          day={"many hours ago"}
          // url={"https://github.com/nx-space/core/pull/223"}
        />
      </ul>
      <div className="ml-1 pt-2 pl-4 border-left">
        <a
          className={useClasses("text-small mt-2", styles.viewChanges)}
          href="https://github.blog/changelog"
        >
          View changelog →
        </a>
      </div>
    </>
  );
};
