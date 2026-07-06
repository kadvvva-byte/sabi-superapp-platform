import { PipelineStep } from "../../../core/pipeline/pipeline-step.interface"
import { PipelineContext } from "../../../core/pipeline/pipeline-context"

import { WalletBalanceEngine } from "../../wallet/engine/wallet-balance.engine"

export class WalletBalanceStep implements PipelineStep {

  async execute(context: PipelineContext) {

    const walletEngine = new WalletBalanceEngine()

    await walletEngine.applyDebit(

      context.request.fromUserId,
      context.request.amount

    )

    await walletEngine.applyCredit(

      context.request.toUserId,
      context.request.amount

    )

  }

}