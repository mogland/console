/*
 * @FilePath: /mog-admin/src/theme/overrides/index.tsx
 * @author: Wibus
 * @Date: 2022-10-05 15:10:06
 * @LastEditors: Wibus
 * @LastEditTime: 2022-10-05 15:27:28
 * Coding With IU
 */

import Accordion from "./Accordion";
import Alert from "./Alert";


export default function ComponentsOverrides(theme) {
  return Object.assign(
    Accordion(theme),
    Alert(theme),
  )
}