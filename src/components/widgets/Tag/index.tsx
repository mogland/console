/*
 * @FilePath: /nx-admin/src/components/widgets/Tag/index.tsx
 * @author: Wibus
 * @Date: 2022-07-24 22:17:08
 * @LastEditors: Wibus
 * @LastEditTime: 2022-07-24 22:27:51
 * Coding With IU
 */

import { useClasses } from "@geist-ui/core";
import { CloseSmall } from "@icon-park/react";
import { useState } from "react";
import styles from './index.module.css';
interface TagProps {
  AddAndRemove?: React.FC;
}

const ATag = (props) => {

  return (
    <div>
      <span className={useClasses(styles.editTag)}>
        {props.children}
        <span className={useClasses(styles.editTagAction)}>
          <CloseSmall />
        </span>
      </span>
    </div>
  )
}

const Tag: TagProps = {}

export const Tags = (props) => {

  // 用数组生成一组标签，可以动态添加和删除。
  const [tags, setTags] = useState<string[]>(['Tag1', 'Tag2', 'Tag3']);

  const deleteTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  }

  return (
    <>
      <div>
        {tags.map((tag, index) => {
          return (
            <ATag key={index}>{tag}</ATag>
          )
        }
        )}
      </div>
    </>
  )
}

export default Tag