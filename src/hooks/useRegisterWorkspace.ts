import { editorState } from "@states/editor";

export function useRegisterWorkspace(id: string) {
  if (typeof window !== 'undefined') {
    editorState.currentWorkspaceId = id
  }
}