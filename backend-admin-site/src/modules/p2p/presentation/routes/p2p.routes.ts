import { Router } from "express"
import { transferP2P } from "../controllers/p2p.controller"

const router = Router()

router.post("/transfer", transferP2P)

export default router