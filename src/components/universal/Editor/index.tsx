import "vditor/dist/index.css";
import { useEffect, useRef } from "react";
import styles from "./index.module.css";
import { EditorContainer } from "@blocksuite/editor";
import "@blocksuite/editor/themes/affine.css";
import { useSnapshot } from "valtio";
import { editorState } from "@states/editor";
import { useRegisterWorkspace } from "@hooks/useRegisterWorkspace";
import { assertExists } from "@blocksuite/store";

interface IEditor {
  initialValue?: string;
  onChange?: (value: string | undefined) => void;
  height?: string;
  id: string;
  title: string;
}

export const MarkdownEditor: React.FC<IEditor> = (props) => {
  const ref = useRef<HTMLDivElement>(null);
  const editorSnapshot = useSnapshot(editorState);
  useRegisterWorkspace(props.id);
  useEffect(() => {
    editorState.data.title = props.title ?? "";
    editorState.data.text = props.initialValue ?? "";
  }, [props.initialValue, props.title]);
  const workspace = editorSnapshot.currentWorkspace;
  
  useEffect(() => {
    if (workspace) {
      const editor = new EditorContainer();
      const page = workspace.getPage("page0");
      assertExists(page);
      editor.page = page;
      editorState.editor = editor;
      if (ref.current && ref.current.childNodes.length === 0) {
        ref.current.appendChild(editor);
      }
    }
  }, [workspace]);

  return <div ref={ref} id="editor-container" className={styles.editor} />;
};
