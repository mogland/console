/*
 * @FilePath: /nx-admin/src/components/widgets/Editor/index.tsx
 * @author: Wibus
 * @Date: 2022-07-23 11:05:53
 * @LastEditors: Wibus
 * @LastEditTime: 2022-07-23 16:01:40
 * Coding With IU
 */
import * as ReactDOMServer from 'react-dom/server';
import { marked } from 'marked';
import { FC, useState } from 'react';
import { Editor, EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css';

export const NxEditor: FC = ({ title, text }: any) => {

  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  );
  const onChange = (editorState: any) => { setEditorState(editorState) }

  return (
    <div>
      <h1><input type="text" placeholder={"文章标题"} defaultValue={title} /></h1>
      <div>
      <Editor editorState={editorState} onChange={onChange} />
      </div>
    </div>
  );
}