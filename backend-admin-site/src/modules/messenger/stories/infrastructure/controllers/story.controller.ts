import { Request, Response } from "express"
import { StoryService } from "../../application/services/story.service"

const service = new StoryService()

export class StoryController {

  async createStory(req: Request, res: Response) {
    const { userId, mediaUrl, text } = req.body

    const story = await service.createStory(userId, mediaUrl, text)

    res.json(story)
  }

  async deleteStory(req: Request, res: Response) {
    const storyId = req.params.storyId as string

    await service.deleteStory(storyId)

    res.json({ success: true })
  }

  async viewStory(req: Request, res: Response) {
    const storyId = req.params.storyId as string
    const { viewerId } = req.body

    await service.viewStory(storyId, viewerId)

    res.json({ viewed: true })
  }

  async getStoryViews(req: Request, res: Response) {
    const storyId = req.params.storyId as string

    const views = await service.getStoryViews(storyId)

    res.json(views)
  }

  async getUserStories(req: Request, res: Response) {
    const userId = req.params.userId as string

    const stories = await service.getUserStories(userId)

    res.json(stories)
  }

}