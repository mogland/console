import useSWR from "swr";
import { app } from "@states/app";

export function useHomeAggregateData() {
  const { data: friendsPending } = useSWR("/friends/all?status=0", {
    onError(_err, _key, _config) {
      app.error.push("friends");
    },
  });
  const { data: friendsApproved } = useSWR("/friends/all?status=1", {
    onError(_err, _key, _config) {
      app.error.push("friends");
    },
  });
  const { data: friendsTrash } = useSWR("/friends/all?status=3", {
    onError(_err, _key, _config) {
      app.error.push("friends");
    },
  });
  const { data: posts } = useSWR("/post?size=5", {
    onError(_err, _key, _config) {
      app.error.push("page");
    },
  });
  const { data: comments } = useSWR("/comments?size=5", {
    onError(_err, _key, _config) {
      app.error.push("comments");
    },
  });
  const { data: pages } = useSWR("/page", {
    onError(_err, _key, _config) {
      app.error.push("page");
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
