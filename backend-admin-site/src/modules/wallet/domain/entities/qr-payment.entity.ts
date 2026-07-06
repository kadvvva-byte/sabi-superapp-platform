export class QrPayment {

  constructor(
    public id: string,
    public walletId: string,
    public amount: number,
    public paid: boolean = false
  ) {}

}