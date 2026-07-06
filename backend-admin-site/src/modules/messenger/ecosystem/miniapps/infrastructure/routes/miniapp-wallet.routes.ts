import { Router } from "express"
import { MiniAppController } from "../controllers/miniapp.controller"

const router = Router()
const controller = new MiniAppController()

router.post("/miniapps", controller.create)
router.get("/miniapps", controller.list)

export default router