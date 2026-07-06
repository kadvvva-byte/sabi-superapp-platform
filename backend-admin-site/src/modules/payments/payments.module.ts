import { PaymentRouterService } from "./application/payment-router.service"
import { PaymentType } from "./domain/payment-type"

import { P2PHandler } from "./handlers/p2p.handler"
import { QRHandler } from "./handlers/qr.handler"
import { EscrowHandler } from "./handlers/escrow.handler"

export const paymentRouter = new PaymentRouterService()

paymentRouter.register(PaymentType.P2P, new P2PHandler())

paymentRouter.register(PaymentType.QR, new QRHandler())

paymentRouter.register(PaymentType.ESCROW, new EscrowHandler())