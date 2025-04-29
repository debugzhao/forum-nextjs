import { prisma } from "..";
import type { Comment } from "@prisma/client";


export type CommentWithUser = {
  User: {
    name: string | null;
    image: string | null;
  } | null;
} & Comment

// 根据创建时间倒序排序
export function fetchCommentByPostId(postId: string): Promise<CommentWithUser[]> {
  return prisma.comment.findMany({
    where: {
      postId
    },
    include: {
      User: {
        select: {
          name: true,
          image: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  })
}