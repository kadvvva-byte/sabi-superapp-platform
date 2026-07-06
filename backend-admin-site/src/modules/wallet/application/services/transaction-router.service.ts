import { P2PTransferService } from "../../../p2p/application/services/p2p-transfer.service"
import { EscrowService } from "../../../escrow/application/services/escrow.service"

export class TransactionRouterService {

  private p2pService = new P2PTransferService()
  private escrowService = new EscrowService()

  async route(payload: any) {

    if (payload.type === "P2P") {

      return this.p2pService.transfer(
        payload.fromWalletId,
        payload.toWalletId,
        payload.amount
      )

    }

    if (payload.type === "ESCROW") {

      return this.escrowService.createEscrow(
        payload.buyerWalletId,
        payload.sellerWalletId,
        payload.amount
      )

    }

    throw new Error("Unknown transaction type")

  }

}