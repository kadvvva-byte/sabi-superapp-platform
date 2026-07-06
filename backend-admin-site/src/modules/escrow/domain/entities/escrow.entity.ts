export class Escrow {

  constructor(
    public id: string,
    public buyerWalletId: string,
    public sellerWalletId: string,
    public amount: number,
    public status: "HOLD" | "RELEASED" | "CANCELLED",
    public createdAt: Date
  ) {}

}