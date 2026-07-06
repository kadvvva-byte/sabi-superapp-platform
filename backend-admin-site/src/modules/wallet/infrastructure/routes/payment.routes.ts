import { Router } from "express"
import { WalletPaymentController } from "../../presentation/payment.controller"

const router = Router()

router.post("/wallet/pay", WalletPaymentController.pay)

export default router