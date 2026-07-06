import type { AiFacadeService } from "../../../../core/kernel/ai/ai-facade.service"
import type {
  AiSafetyApprovalDecision,
  AiSafetyApprovalRequest,
} from "../../contracts/ai-safety-approval.contracts"

export class AiSafetyApprovalApplicationService {
  constructor(private readonly aiFacade: AiFacadeService) {}

  getPolicy() {
    return this.aiFacade.getSafetyApprovalPolicy()
  }

  evaluate(input: AiSafetyApprovalRequest): AiSafetyApprovalDecision {
    return this.aiFacade.evaluateSafetyApproval(input)
  }
}
