/*
 * @FilePath: /mog-admin/src/theme/overrides/index.tsx
 * @author: Wibus
 * @Date: 2022-10-05 15:10:06
 * @LastEditors: Wibus
 * @LastEditTime: 2022-10-05 15:33:29
 * Coding With IU
 */

import Accordion from "./Accordion";
import Alert from "./Alert";
import Autocomplete from "./Autocomplete";
import Avatar from "./Avatar";
import Backdrop from "./Backdrop";
import Breadcrumbs from "./Breadcrumbs";
import Button from "./Button";
import ButtonGroup from "./ButtonGroup";
import Card from "./Card";
import Checkbox from "./Checkbox";
import Chip from "./Chip";


export default function ComponentsOverrides(theme) {
  return Object.assign(
    Accordion(theme),
    Alert(theme),
    Autocomplete(theme),
    Avatar(theme),
    Backdrop(theme),
    Breadcrumbs(theme),
    Button(theme),
    ButtonGroup(theme),
    Card(theme),
    Checkbox(theme),
    Chip(theme),
  )
}