import { TransactionStatus } from "./transaction-status"
import { Transaction } from "./transaction.entity"

export class TransactionStateMachine {

  transition(transaction: Transaction, next: TransactionStatus) {

    const current = transaction.status

    if (current === TransactionStatus.CREATED && next === TransactionStatus.PENDING) {

      transaction.status = next
      return

    }

    if (current === TransactionStatus.PENDING && next === TransactionStatus.PROCESSING) {

      transaction.status = next
      return

    }

    if (current === TransactionStatus.PROCESSING && next === TransactionStatus.COMPLETED) {

      transaction.status = next
      return

    }

    if (next === TransactionStatus.FAILED) {

      transaction.status = next
      return

    }

    throw new Error(`Invalid transition ${current} → ${next}`)

  }

}