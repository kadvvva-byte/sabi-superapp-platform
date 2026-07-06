import { FeeDirection } from "../../domain/constants/fee-direction"
import {
  FeePolicyEntity,
  type FeeCalculationResult,
  type FeePolicyEntityParams,
  type FeePolicyOperation,
} from "../../domain/entities/fee-policy.entity"

export type CalculateServiceFeeInput = {
  amount: number
  currency?: string

  direction?: FeeDirection
  percent?: number
  flatFee?: number
  minFee?: number
  maxFee?: number

  operationType?: FeePolicyOperation

  policy?: FeePolicyEntity | FeePolicyEntityParams
}

export type CalculateServiceFeeOutput = FeeCalculationResult

export class CalculateServiceFeeUseCase {
  execute(input: CalculateServiceFeeInput): CalculateServiceFeeOutput {
    const amount = Number(input.amount ?? 0)
    const policy = this.resolvePolicy(input)

    if (
      !policy.isActive() ||
      (input.operationType && !policy.supportsOperation(input.operationType))
    ) {
      return FeePolicyEntity.create({
        direction: input.direction ?? policy.direction,
        currency: input.currency ?? policy.currency,
        percent: 0,
        flatFee: 0,
      }).calculate(amount, input.currency)
    }

    return policy.calculate(amount, input.currency)
  }

  private resolvePolicy(input: CalculateServiceFeeInput): FeePolicyEntity {
    if (input.policy instanceof FeePolicyEntity) {
      return input.policy
    }

    if (input.policy) {
      return FeePolicyEntity.create(input.policy)
    }

    return FeePolicyEntity.create({
      direction: input.direction ?? FeeDirection.OUTGOING,
      percent: input.percent ?? 0,
      flatFee: input.flatFee ?? 0,
      minFee: input.minFee,
      maxFee: input.maxFee,
      currency: input.currency ?? "USD",
    })
  }
}