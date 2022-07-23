/*
 * @FilePath: /nx-admin/src/components/widgets/Editor/types/controls-item.ts
 * @author: Wibus
 * @Date: 2022-07-23 16:07:48
 * @LastEditors: Wibus
 * @LastEditTime: 2022-07-23 16:07:49
 * Coding With IU
 */
type ControlsEnum =
  | 'unstyled'
  | 'header-one'
  | 'header-two'
  | 'header-three'
  | 'header-four'
  | 'header-five'
  | 'header-six'
  | 'blockquote'
  | 'unordered-list-item'
  | 'ordered-list-item'
  | 'code-block'
  | 'left'
  | 'center'
  | 'right'
  | 'bgcolor-rgb(247, 145, 48)'
  | 'CLEARSTYLE'
  | 'BOLD'
  | 'ITALIC'
  | 'UNDERLINE'
  | 'STRIKETHROUGH'
  | 'FORMATBRUSH'
  | 'CODE'
  | 'upload-pic'
  | 'set-link'
  | 'set-emoji';

export type ControlItems = Array<ControlsEnum>;
