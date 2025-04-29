import { prisma } from ".."

export const fetchTopics = async () => {
  return prisma.topic.findMany({
    include: {
      _count: {
        select: {
          posts: true
        }
      }
    }
  })
}

/**
 * 根据postId查询其关联的topic数据
 * @param postId
 * @returns
 */
export function findTopicByPostId(postId: string) {
  return prisma.topic.findFirst({
    where: {
      posts: {
        some: {
          id: postId
        }
      }
    },
  })
}