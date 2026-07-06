import { PipelineEngine } from "../../../core/pipeline/pipeline-engine"

import { ValidationStep } from "./validation.step"
import { FraudStep } from "./fraud.step"
import { ExecuteTransactionStep } from "./execute-transaction.step"
import { LedgerStep } from "./ledger.step"
import { WalletBalanceStep } from "./wallet-balance.step"

export const paymentPipeline = new PipelineEngine()

paymentPipeline.addStep(new ValidationStep())

paymentPipeline.addStep(new FraudStep())

paymentPipeline.addStep(new ExecuteTransactionStep())

paymentPipeline.addStep(new LedgerStep())

paymentPipeline.addStep(new WalletBalanceStep())