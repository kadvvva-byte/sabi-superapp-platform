import { Router } from "express"
import { StoryController } from "../controllers/story.controller"

const router = Router()
const controller = new StoryController()

router.post("/stories", controller.createStory)
router.delete("/stories/:storyId", controller.deleteStory)

router.post("/stories/:storyId/views", controller.viewStory)
router.get("/stories/:storyId/views", controller.getStoryViews)

router.get("/users/:userId/stories", controller.getUserStories)

export default router