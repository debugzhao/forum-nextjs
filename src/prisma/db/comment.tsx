import { prisma } from "..";
import type { Comment } from "@prisma/client";


export type CommentWithUser = {
  User: {
      name: string | null;
      image: string | null;
  } | null;
} & Comment

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
    }
  })
}