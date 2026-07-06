import { Router } from "express"
import { MiniAppController } from "../controllers/miniapp.controller"

const router = Router()
const controller = new MiniAppController()

router.post("/create", controller.create)

router.get("/list", controller.list)

export default router