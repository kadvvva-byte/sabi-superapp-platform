import { FeePolicyEntity } from "../entities/fee-policy.entity"

export interface FeePolicyRepository {
  findAllActive(): Promise<FeePolicyEntity[]>
  save(policy: FeePolicyEntity): Promise<void>
}