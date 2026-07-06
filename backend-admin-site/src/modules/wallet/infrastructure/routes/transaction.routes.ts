import { Router } from "express"
import transactionController from "../../presentation/transaction.controller"

const router = Router()

router.use("/", transactionController)

export default router