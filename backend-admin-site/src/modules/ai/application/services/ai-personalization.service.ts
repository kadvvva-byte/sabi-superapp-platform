import type { AiFacadeService } from "../../../../core/kernel/ai/ai-facade.service"
import type {
  AiPersonalizationInstructionInput,
  AiPersonalizationPreferenceUpdateInput,
  AiPersonalizationPrivacyMode,
  AiPersonalizationSignalInput,
} from "../../../../core/kernel/ai/ai-personalization.types"
import type { AiWorkspacePersonalizationSummaryContract } from "../../contracts/ai-personalization.contracts"

export class AiPersonalizationApplicationService {
  constructor(private readonly aiFacade: AiFacadeService) {}

  getManifest() {
    return this.aiFacade.getPersonalizationManifest()
  }

  getSnapshot(userId: string, prompt?: string) {
    return this.aiFacade.getPersonalizationSnapshot(userId, prompt)
  }

  getContext(userId: string, prompt?: string, limit?: number) {
    return this.aiFacade.getPersonalizationContext({ userId, prompt, limit })
  }

  getProfile(userId: string) {
    return this.aiFacade.getPersonalizationProfile(userId)
  }

  getSummary(userId: string): AiWorkspacePersonalizationSummaryContract {
    const summary = this.aiFacade.getPersonalizationSummary(userId)
    const context = this.aiFacade.getPersonalizationContext({ userId, limit: 6 })
    return {
      version: "AI-23",
      status: summary.status === "ready" ? "ready" : summary.status === "blocked" ? "blocked" : "limited",
      privacyMode: summary.privacyMode,
      personalizationAllowed: summary.personalizationAllowed,
      preferencesCount: summary.preferencesCount,
      signalsCount: summary.signalsCount,
      instructionsCount: summary.instructionsCount,
      rankedMemoryCount: summary.rankedMemoryCount,
      topPreferenceKeys: summary.topPreferenceKeys,
      promptHints: context.promptHints,
      routeBase: "/api/ai/personalization",
    }
  }

  updatePrivacyMode(userId: string, privacyMode: AiPersonalizationPrivacyMode) {
    return this.aiFacade.updatePersonalizationPrivacyMode(userId, privacyMode)
  }

  updatePreferences(input: AiPersonalizationPreferenceUpdateInput) {
    return this.aiFacade.updatePersonalizationPreferences(input)
  }

  recordSignal(input: AiPersonalizationSignalInput) {
    return this.aiFacade.recordPersonalizationSignal(input)
  }

  addInstruction(input: AiPersonalizationInstructionInput) {
    return this.aiFacade.addPersonalizationInstruction(input)
  }

  clearSignals(userId: string) {
    return this.aiFacade.clearPersonalizationSignals(userId)
  }

  rebuildProfile(userId: string) {
    return this.aiFacade.rebuildPersonalizationProfile(userId)
  }
}
