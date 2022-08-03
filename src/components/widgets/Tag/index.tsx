/*
 * @FilePath: /nx-admin/src/components/widgets/Tag/index.tsx
 * @author: Wibus
 * @Date: 2022-07-24 22:17:08
 * @LastEditors: Wibus
 * @LastEditTime: 2022-07-25 14:15:31
 * Coding With IU
 */

import { useClasses } from "@geist-ui/core";
import { CloseSmall, Plus } from "@icon-park/react";
import { FC, useEffect, useState } from "react";
import styles from "./index.module.css";

const ATag: FC<any> = ({ children }) => {
  return (
    <span className={useClasses(styles.editTag)}>
      {children}
      <span className={useClasses(styles.editTagAction)}>
        <CloseSmall />
      </span>
    </span>
  );
};

export const Tags: any = (props) => {
  // 用数组生成一组标签，可以动态添加和删除。
  const [tags, setTags] = useState<string[]>(["Tag1", "Tag2", "Tag3"]);

  const deleteTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  return (
    <>
      {tags.map((tag, index) => {
        return (
          <span className={useClasses(styles.editTag)} key={"Tag" + index}>
            {tag}
            <span
              className={useClasses(styles.editTagAction)}
              onClick={() => {
                deleteTag(index);
              }}
            >
              <CloseSmall />
            </span>
          </span>
        );
      })}
      <span className={useClasses(styles.editTag, styles.editTagPlus)}>
        <span className={useClasses(styles.editTagAction)}>
          <Plus />
        </span>
        New
      </span>
    </>
  );
};
export default Tags;
