import { EscrowStatus } from "@prisma/client"

export class Escrow {

  constructor(
    public id: string,
    public buyerWalletId: string,
    public sellerWalletId: string,
    public amount: number,
    public status: EscrowStatus,
    public createdAt: Date
  ) {}

}