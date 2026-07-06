export interface EscrowTransaction {
  id: string
  buyerWalletId: string
  sellerWalletId: string
  amount: number
  status: "LOCKED" | "RELEASED" | "REFUNDED"
  createdAt: Date
}

export class EscrowService {

  private escrows: Map<string, EscrowTransaction> = new Map()

  async createEscrow(
    buyerWalletId: string,
    sellerWalletId: string,
    amount: number
  ): Promise<EscrowTransaction> {

    if (amount <= 0) {
      throw new Error("Invalid escrow amount")
    }

    const escrow: EscrowTransaction = {
      id: "escrow_" + Date.now(),
      buyerWalletId,
      sellerWalletId,
      amount,
      status: "LOCKED",
      createdAt: new Date()
    }

    this.escrows.set(escrow.id, escrow)

    return escrow
  }

  async releaseEscrow(escrowId: string): Promise<EscrowTransaction> {

    const escrow = this.escrows.get(escrowId)

    if (!escrow) {
      throw new Error("Escrow not found")
    }

    escrow.status = "RELEASED"

    return escrow
  }

  async refundEscrow(escrowId: string): Promise<EscrowTransaction> {

    const escrow = this.escrows.get(escrowId)

    if (!escrow) {
      throw new Error("Escrow not found")
    }

    escrow.status = "REFUNDED"

    return escrow
  }

}