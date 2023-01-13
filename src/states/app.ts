import { proxy } from "valtio";

export const app = proxy({
  showSidebar: false,
  editorDarkCSSLoaded: false,
})

export const server = proxy({
  categories: [] as any[],
})