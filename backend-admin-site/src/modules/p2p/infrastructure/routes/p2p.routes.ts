import { Router } from "express"
import p2pController from "../../presentation/p2p.controller"

const router = Router()

router.use("/", p2pController)

export default router