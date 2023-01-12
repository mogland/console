import { defaultValueCtx, Editor, rootCtx } from '@milkdown/core';
import { nord } from '@milkdown/theme-nord';
import { ReactEditor, useEditor } from '@milkdown/react';
import { commonmark } from '@milkdown/preset-commonmark';
import { history } from '@milkdown/plugin-history';

interface IEditor {
  defaultValue: string;
}

export const MilkdownEditor: React.FC<IEditor> = (props) => {
  const { editor } = useEditor((root) =>
      Editor.make()
          .config((ctx) => {
              ctx.set(rootCtx, root);
              ctx.set(defaultValueCtx, props.defaultValue);
          })
          .use(nord)
          .use(commonmark)
          .use(history),
  );

  return <ReactEditor editor={editor} />;
};