import { PipelineStep } from "../../../core/pipeline/pipeline-step.interface"
import { PipelineContext } from "../../../core/pipeline/pipeline-context"

import { LedgerEngine } from "../../ledger/engine/ledger-engine"
import { LedgerEntryType } from "../../ledger/engine/ledger-entry"

export class LedgerStep implements PipelineStep {

  async execute(context: PipelineContext) {

    const ledger = new LedgerEngine()

    const tx = {
      id: context.result.id,
      entries: [
        {
          accountId: context.request.fromUserId,
          amount: context.request.amount,
          type: "DEBIT" as LedgerEntryType,
          currency: context.request.currency
        },
        {
          accountId: context.request.toUserId,
          amount: context.request.amount,
          type: "CREDIT" as LedgerEntryType,
          currency: context.request.currency
        }
      ]
    }

    await ledger.commit(tx)

  }

}