import { createDialogs, createDialogHooks } from "react-hook-dialog";

export const dialogs = createDialogs({
  fileContextMenu: {
    path: "",
    name: "",
    position: { x: 0, y: 0 },
    onRename: () => {},
  },
});

export const dialog = createDialogHooks(dialogs);
