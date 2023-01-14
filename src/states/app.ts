import { proxy } from "valtio";

export const app = proxy({
  showSidebar: false,
  editorDarkCSSLoaded: false,
  authenticated: false,
})

export const server = proxy({
  categories: [] as any[],
  tags: [] as {
    name: string;
    count: number;
  }[],
})