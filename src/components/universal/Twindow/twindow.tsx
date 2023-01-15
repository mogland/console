/*
 * @FilePath: /mog-theme-iucky/components/tools/Twindow/twindow.tsx
 * @author: Wibus
 * @Date: 2022-10-29 20:47:13
 * @LastEditors: Wibus
 * @LastEditTime: 2022-10-29 21:19:41
 * Coding With IU
 */

import { ArrowCircleRight, CloseOne } from "@icon-park/react";
import clsx from "clsx";
import type { FC } from "react";
import { useEffect, useRef } from "react";
import styles from "./index.module.css";

export interface ITwindow {
  title: string;
  text: string;
  className?: string;
  style?: React.CSSProperties;
  href?: string;
  target?: string;
  onClick?: () => void;
  duration?: number;
  // direction?: "leftTop" | "rightTop" | "leftBottom" | "rightBottom";
  tag?: string;
  image?: string;
  allowClose?: boolean;
}

const Ttwindow: FC<ITwindow> = (
  props: ITwindow = {
    title: "Message Manager",
    text: "You called Twindow.",
  }
) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!wrapRef.current || props.duration === Infinity) {
        // 如果没有传入duration，或者传入的duration为Infinity，则不会自动关闭
        return;
      }
      wrapRef.current.classList.add(styles["hide"]);
    }, props.duration || 2500);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      className={clsx(styles.container, props.className)}
      style={props.style}
      ref={wrapRef}
      onClick={props.onClick}
    >
      <div className={clsx(styles.title)}>
        {props.tag && <span className={clsx(styles.tag)}>{props.tag}</span>}
        <div>{props.title}</div>
        {props.image && (
          <img src={props.image} alt={props.title} className={styles.image} />
        )}
        {props.allowClose && (
          <div
            className={styles.close}
            onClick={() => {
              wrapRef.current?.classList.add(styles["hide"]);
            }}
          >
            <CloseOne theme="filled" />
          </div>
        )}
      </div>
      <div className={clsx(styles.text)}>
        <span className={clsx(styles.tip)}>{props.text}</span>
        {props.href && (
          <a
            href={props.href}
            target={props.target}
            className={clsx(styles.link)}
          >
            <ArrowCircleRight />
          </a>
        )}
      </div>
    </div>
  );
};

export const TwindowContainer = () => {
  return (
    <div id="twindow-container" className={clsx(styles["twindow-container"])} />
  );
};

export default Ttwindow;
