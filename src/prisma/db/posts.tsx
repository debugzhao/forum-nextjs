import { prisma } from "..";

export function fetchPostsByTopicName(name: string) {
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