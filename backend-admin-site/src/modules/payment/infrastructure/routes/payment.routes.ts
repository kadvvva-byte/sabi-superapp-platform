import { Router } from "express"
import { PaymentController } from "../../presentation/payment.controller"

const router = Router()

const controller = new PaymentController()

router.post("/pay", controller.pay.bind(controller))

export default router