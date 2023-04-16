import { apiClient } from "@utils/request";
import useSWR from "swr";

export function useComments(status: number, page: number) {
  const { data, error } = useSWR<any>(
    `/comments?status=${status}&page=${page}`
  );

  const comments: {
    data: any[];
    pagination: any;
  } = data?.map(async (comment) => {
    const { data: post } = await apiClient(`/post/${comment.pid}`);
    return { ...comment, post: post.data };
  });

  return {
    comments,
    isLoading: !error && !data,
    isError: error,
  };
}
