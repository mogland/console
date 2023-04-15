import { proxy, subscribe } from "valtio";

export const app = proxy({
  showSidebar: false,
  authenticated: false,
  // if there is an error, it will be stored here
  // example: ["user", "comments"] --  means there is an error in user and comments service
  // Gateway's error will not be stored here, it will turn to Internal Server Error Page directly
  error: [] as any[],
});

subscribe(app.error, (state) => {
  app.error = [...new Set(state)]; // remove duplicate
})

export const server = proxy({
  categories: [] as any[],
  tags: [] as {
    name: string;
    count: number;
  }[],
});
