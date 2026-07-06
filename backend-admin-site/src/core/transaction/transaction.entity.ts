import { TransactionStatus } from "./transaction-status"

export class Transaction {

  id: string
  amount: number
  status: TransactionStatus

  constructor(id: string, amount: number) {

    this.id = id
    this.amount = amount
    this.status = TransactionStatus.CREATED

  }

}