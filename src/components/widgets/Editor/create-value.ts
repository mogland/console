/*
 * @FilePath: /nx-admin/src/components/widgets/Editor/create-value.ts
 * @author: Wibus
 * @Date: 2022-07-23 16:06:07
 * @LastEditors: Wibus
 * @LastEditTime: 2022-07-23 16:54:25
 * Coding With IU
 */
import { EditorState, RawDraftContentState } from 'draft-js';


export enum initValueType {
  HTML = 'HTML',
  Markdown = 'Markdown',
  EditorState = 'EditorState',
  Raw = 'Raw',
}
export const createFrom = (
  content?: string | Object | EditorState | RawDraftContentState,
  type?: 'HTML' | 'Markdown' | 'EditorState' | 'Raw'
): EditorState => {
  let editorState = EditorState.createEmpty();
  if (content && type) {
    if (content instanceof EditorState) {
      editorState = content;
    } else if (typeof content === 'object' && type === initValueType.Raw) {
      editorState = EditorState.createWithContent(content as any);
    } else if (typeof content === 'string' && type === initValueType.HTML) {
      editorState = createFromHtml(content);
    } else if (typeof content === 'string' && type === initValueType.Markdown) {
      editorState = createFromMarkdown(content);
    } else {
      editorState = EditorState.createEmpty();
    }
  } else {
    editorState = EditorState.createEmpty();
  }
  return editorState;
};
