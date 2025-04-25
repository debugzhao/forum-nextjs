import { prisma } from "..";
import type { Post } from "@prisma/client";

export type PostWithData = {
  topic: {
    name: string;
  } | null;
  User: {
      name: string | null;
  } | null;
  _count: {
      comments: number;
  };
} & Post;

export function fetchPostsByTopicName(name: string): Promise<PostWithData[]> {
  return prisma.post.findMany({
    where: {
      topic: {
        name: name
      }
    },
    include: {
      User: { // 帖子是哪个用户创建的
        select: {
          name: true,
        }
      },
      topic: { // 帖子属于哪个话题
        select: {
          name: true,
        }
      },
      _count: {
        select: { // 帖子下面评论的数量
          comments: true
        }
      }
    }
  })
}