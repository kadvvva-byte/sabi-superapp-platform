export class MoneyDepositedEvent {

  constructor(
    public walletId: string,
    public amount: number
  ) {}

}