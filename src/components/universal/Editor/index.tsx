import styles from "./index.module.css";
import "@blocknote/core/style.css";
import { BlockNoteEditor, defaultBlockSchema } from "@blocknote/core";
import {
  BlockNoteView,
  defaultReactSlashMenuItems,
  useBlockNote,
} from "@blocknote/react";
import { useState } from "react";
import { useSnapshot } from "valtio";
import { app } from "@states/app";
import { ImageBlock, insertImage } from "./Blocks/image";

interface IEditor {
  initialValue?: string;
  onChange?: (value: string | undefined) => void;
}

export const MarkdownEditor: React.FC<IEditor> = (props) => {
  const [markdown, setMarkdown] = useState<string>(props.initialValue || "");
  const appSnapshot = useSnapshot(app);
  const editor: BlockNoteEditor | null = useBlockNote({
    onEditorReady(editor) {
      const getBlocks = async () => {
        const blocks = await editor.markdownToBlocks(markdown);
        editor.replaceBlocks(editor.topLevelBlocks, blocks);
      };
      getBlocks();
    },
    onEditorContentChange(editor) {
      const getMarkdown = async () => {
        const markdown = await editor.blocksToMarkdown(editor.topLevelBlocks);
        setMarkdown(markdown);
        props.onChange && props.onChange(markdown);
      };
      getMarkdown();
    },
    theme: appSnapshot.theme,
    blockSchema: {
      ...defaultBlockSchema,
      image: ImageBlock,
    } as any,
    slashCommands: [...defaultReactSlashMenuItems, insertImage],
  });

  return (
    <div className={styles.editor}>
      <BlockNoteView editor={editor} />
    </div>
  );
};
