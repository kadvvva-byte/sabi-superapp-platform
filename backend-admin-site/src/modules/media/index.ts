import { Router } from "express"
import uploadRoutes from "./infrastructure/routes/upload.routes"

const router = Router()

router.use("/", uploadRoutes)

export default router