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