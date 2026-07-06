import { Router } from "express"
import escrowController from "../../presentation/escrow.controller"

const router = Router()

router.use("/", escrowController)

export default router