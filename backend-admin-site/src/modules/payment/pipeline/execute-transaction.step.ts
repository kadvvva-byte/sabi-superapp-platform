import { PipelineStep } from "../../../core/pipeline/pipeline-step.interface"
import { PipelineContext } from "../../../core/pipeline/pipeline-context"

import { Transaction } from "../../../core/transaction/transaction.entity"
import { TransactionStateMachine } from "../../../core/transaction/transaction-state-machine"
import { TransactionStatus } from "../../../core/transaction/transaction-status"

export class ExecuteTransactionStep implements PipelineStep {

  async execute(context: PipelineContext) {

    const transaction = new Transaction(

      crypto.randomUUID(),
      context.request.amount

    )

    const stateMachine = new TransactionStateMachine()

    stateMachine.transition(transaction, TransactionStatus.PENDING)

    stateMachine.transition(transaction, TransactionStatus.PROCESSING)

    stateMachine.transition(transaction, TransactionStatus.COMPLETED)

    context.result = transaction

  }

}