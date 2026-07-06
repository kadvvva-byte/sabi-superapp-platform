import { Router } from "express"
import { LauncherController } from "../controllers/launcher.controller"

const router = Router()
const controller = new LauncherController()

router.post("/launcher/launch", controller.launch)

export default router