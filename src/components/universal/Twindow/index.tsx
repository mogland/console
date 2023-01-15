/*
 * @author: Wibus
 * @reference: [reactify-component/react-message](https://github.com/reactify-component/react-message/)
 */

import ReactDOM from "react-dom";
import type { Root } from "react-dom/client";
import { createRoot } from "react-dom/client";
import type { ITwindow } from "./twindow";
import Ttwindow, { TwindowContainer } from "./twindow";

interface TwindowInstance {
  content: ITwindow;
  duration?: number;
}

type MessageReturnType = {
  destory(): boolean;
};

let containerNode: HTMLElement | null;
let containerRoot: Root | null;
const { version } = ReactDOM;
const MessageContainerPrefixId = "twindow-container";

const getContainerNode: () => Promise<[HTMLElement, Root | null]> = () => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise<[HTMLElement, Root | null]>(async (resolve, reject) => {
    if (!containerNode) {
      const $root = document.getElementById(MessageContainerPrefixId);
      if ($root) {
        containerNode = $root;
        return resolve([$root, containerRoot]);
      }
      const $f = document.createElement("div");

      containerRoot = createRoot($f);

      containerRoot.render(<TwindowContainer />);

      document.body.appendChild($f);

      containerNode = document.getElementById(MessageContainerPrefixId);
      if (containerNode) {
        return resolve([containerNode, containerRoot]);
      } else {
        const count = 0;
        const getContainerNodeNextFrame = (count: number) => {
          if (count > 10) {
            return reject("getContainerNodeNextFrame try max times.");
          }
          requestAnimationFrame(() => {
            const $root = document.getElementById(MessageContainerPrefixId);
            if ($root) {
              containerNode = $root;

              return resolve([$root, containerRoot]);
            }
            getContainerNodeNextFrame(count + 1);
          });
        };

        return getContainerNodeNextFrame(count);
      }
    }
    return resolve([containerNode!, containerRoot!]);
  });
};

// eslint-disable-next-line import/no-mutable-exports
let Twindow: (
  content: TwindowInstance["content"],
  duration?: TwindowInstance["duration"]
) => Promise<MessageReturnType>;
const is18 = version.startsWith("18");
if (!is18) {
  throw new TypeError("react version low than 18 is not supported");
}

// eslint-disable-next-line prefer-const
Twindow = (content: ITwindow, duration = 2500) => {
  return new Promise<MessageReturnType>((resolve) => {
    requestAnimationFrame(async () => {
      let title: string;
      let message: string;
      const configDuration =
        typeof content === "string" ? duration : content.duration ?? duration;
      // const reallyduration =
      //   typeof configDuration === 'function'
      //     ? configDuration()
      //     : configDuration
      const reallyduration = configDuration;
      if (typeof content === "string") {
        title = "Message Manager";
        message = content;
      } else {
        title = content.title ?? "Message Manager";
        message = content.text;
      }
      if (!message) {
        throw new Error("message content is required");
      }
      const [container, containerRoot] = await getContainerNode();

      const fragment = document.createElement("div");

      let root: Root | null = null;
      if (containerRoot) {
        root = createRoot(fragment);

        root.render(
          <Ttwindow
            duration={reallyduration}
            title={title}
            text={message}
            href={content.href}
            target={content.target}
            className={content.className}
            style={content.style}
            onClick={content.onClick}
            tag={content.tag}
            allowClose={content.allowClose}
            image={content.image}
          />
        );
      }
      let isDestroyed = false;
      const destory = () => {
        if (isDestroyed) {
          return false;
        }

        root && root.unmount();

        requestAnimationFrame(() => {
          fragment.remove();
        });

        isDestroyed = true;
        return true;
      };
      // because Infinity is 0 in timer
      if (reallyduration !== Infinity) {
        setTimeout(() => {
          destory();
          // 加 500ms 动画时间
        }, reallyduration + 500);
      }

      requestAnimationFrame(() => {
        container.appendChild(fragment);
      });

      resolve({
        destory,
      });
    });
  });
};
export { Twindow };
if ("window" in globalThis) {
  // @ts-ignore
  window.Twindow = Twindow;
}
