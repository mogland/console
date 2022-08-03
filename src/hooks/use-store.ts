/*
 * @FilePath: /nx-admin/src/hooks/use-store.ts
 * @author: Wibus
 * @Date: 2022-07-15 20:31:58
 * @LastEditors: Wibus
 * @LastEditTime: 2022-07-15 21:01:29
 * Coding With IU
 */

import { createContext, useContext } from "react";
import { apiClient } from "../utils/request";

const StoreContext = createContext({});
StoreContext.displayName = "StoreContext";

export function useStore() {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error("useRootStore must be used within RootStoreProvider");
  }

  return context;
}

export const store = initStore();
// export function RootStoreProvider({ children }: { children: ReactNode }) {
//   if (isDev && !window.store) {
//     Object.defineProperty(window, 'store', {
//       get() {
//         return store
//       },
//     })
//   }

//   return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
// }
export async function initStore() {
  const category = await apiClient.get("/category", null, [
    { key: "type", value: "Category" },
  ]);
  const tag = await apiClient.get("/category", null, [
    { key: "type", value: "Tag" },
  ]);
  const store = {
    categoryStore: category.data,
    tagStore: tag.data,
  };
  return createContext(store);
}
