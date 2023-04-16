import { apiClient } from "@utils/request";
import { SWR_CONFIG } from "../config";
import useSWR from "swr";
import { app } from "@states/app";

const SWRConfig = {
  ...SWR_CONFIG,
  onerror: (_err: any, key: any) => {
    app.error.push(key);
  },
};

export function useHomeAggregateData() {
  const { data: friendsPending } = useSWR("/friends/all?status=0", SWRConfig);
  const { data: friendsApproved } = useSWR("/friends/all?status=1", SWRConfig);
  const { data: friendsTrash } = useSWR("/friends/all?status=3", SWRConfig);
  const { data: posts } = useSWR("/post?size=5", SWRConfig);
  const { data: comments } = useSWR("/comments?size=5", async (url) => {
    const res = await apiClient(url).catch((err) => {
      app.error.push(url);
      return null
    });
    if (!res) {
      return [];
    }
    for (let i = 0; i < res.data.length; i++) {
      res.data[i].post = await apiClient(`/post/${res.data[i].pid}`);
    }
    return res;
  }, SWRConfig);
  const { data: pages } = useSWR("/page", SWRConfig);

  return {
    friendsPending,
    friendsApproved,
    friendsTrash,
    posts,
    comments,
    pages,
  };
}
