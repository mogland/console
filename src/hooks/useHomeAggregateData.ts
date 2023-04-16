import { apiClient } from "@utils/request";
import useSWR from "swr";
import { app } from "@states/app";

export function useHomeAggregateData() {
  const { data: friendsPending } = useSWR("/friends/all?status=0", {
    onError(_err, _key, _config) {
      app.error.push("friends")
    },
  });
  const { data: friendsApproved } = useSWR("/friends/all?status=1", {
    onError(_err, _key, _config) {
      app.error.push("friends")
    },
  });
  const { data: friendsTrash } = useSWR("/friends/all?status=3", {
    onError(_err, _key, _config) {
      app.error.push("friends")
    },
  });
  const { data: posts } = useSWR("/post?size=5", {
    onError(_err, _key, _config) {
      app.error.push("page")
    },
  });
  const { data: comments } = useSWR(
    "/comments?size=5",
    async (url) => {
      const res = await apiClient(url).catch(() => {
        app.error.push("comments");
        return null;
      });
      if (!res) {
        return [];
      }
      for (let i = 0; i < res.data.length; i++) {
        res.data[i].post = await apiClient(`/post/${res.data[i].pid}`).catch(() => {
          app.error.push("page");
          return []
        })
      }
      return res;
    }, {
      onError(_err, _key, _config) {
        app.error.push("comments")
      },
    }
  );
  const { data: pages } = useSWR("/page", {
    onError(_err, _key, _config) {
      app.error.push("page")
    },
  });

  return {
    friendsPending,
    friendsApproved,
    friendsTrash,
    posts,
    comments,
    pages,
  };
}
