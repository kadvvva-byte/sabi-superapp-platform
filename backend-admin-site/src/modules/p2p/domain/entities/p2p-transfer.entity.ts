export type P2PStatus = "PENDING" | "COMPLETED" | "FAILED"

export class P2PTransfer {
  constructor(
    public id: string,
    public fromWalletId: string,
    public toWalletId: string,
    public amount: number,
    public status: P2PStatus,
    public createdAt: Date = new Date()
  ) {}
}