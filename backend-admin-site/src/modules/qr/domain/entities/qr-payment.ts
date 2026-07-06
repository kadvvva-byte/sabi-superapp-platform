export class QRPayment {

  constructor(
    public readonly id: string,
    public readonly qrCodeId: string,
    public readonly payerWallet: string,
    public readonly amount: number,
    public readonly currency: string,
    public readonly status: string,
    public readonly createdAt?: Date
  ) {}

}