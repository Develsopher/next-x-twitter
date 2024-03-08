"use client";

import { Post as IPost } from "@/model/Post";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserPosts } from "../_lib/getUserPosts";
import Post from "../../_component/Post";
type Props = {
  username: string;
};

export default function UserPosts({ username }: Props) {
  // 첫번째와 세번째는 같으면됨, 두번째는 에러 -> 오브젝트(임시)모든값허용
  const { data } = useQuery<
    IPost[],
    Object,
    IPost[],
    [_1: string, _2: string, string]
  >({
    queryKey: ["posts", "users", username],
    queryFn: getUserPosts,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(["users", username]);

  if (user) {
    return data?.map((post) => <Post key={post.postId} post={post} />);
  }
}
