import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export class StoryService {

  async createStory(userId: string, mediaUrl?: string, text?: string) {

    const expires = new Date()
    expires.setHours(expires.getHours() + 24)

    return prisma.story.create({
      data: {
        userId,
        mediaUrl,
        text,
        expiresAt: expires
      }
    })

  }

  async deleteStory(storyId: string) {

    return prisma.story.delete({
      where: { id: storyId }
    })

  }

  async viewStory(storyId: string, viewerId: string) {

    return prisma.storyView.upsert({
      where: {
        storyId_viewerId: {
          storyId,
          viewerId
        }
      },
      update: {},
      create: {
        storyId,
        viewerId
      }
    })

  }

  async getStoryViews(storyId: string) {

    return prisma.storyView.findMany({
      where: { storyId }
    })

  }

  async getUserStories(userId: string) {

    return prisma.story.findMany({
     where: {
       userId
     },
     orderBy: {
       createdAt: "desc"
     }
   })

  }

}