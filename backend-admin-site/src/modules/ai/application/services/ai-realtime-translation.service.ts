import type { AiFacadeService } from "../../../../core/kernel/ai/ai-facade.service"
import type { AiRealtimeTranslationSessionStatus } from "../../../../core/kernel/ai/ai-realtime-translation.types"
import type {
  AiRealtimeTranslationManifestContract,
  AiRealtimeTranslationSegmentRequestContract,
  AiRealtimeTranslationSessionCreateRequestContract,
  AiRealtimeTranslationSessionUpdateRequestContract,
  AiRealtimeTranslationWorkspaceSummaryContract,
} from "../../contracts/ai-realtime-translation.contracts"

export class AiRealtimeTranslationApplicationService {
  constructor(private readonly aiFacade: AiFacadeService) {}

  getManifest(): AiRealtimeTranslationManifestContract {
    return this.aiFacade.getRealtimeTranslationManifest()
  }

  getSummary(userId: string): AiRealtimeTranslationWorkspaceSummaryContract {
    return this.aiFacade.getRealtimeTranslationSummary(userId)
  }

  listSessions(userId: string, status?: AiRealtimeTranslationSessionStatus) {
    return this.aiFacade.listRealtimeTranslationSessions(userId, status)
  }

  startSession(input: AiRealtimeTranslationSessionCreateRequestContract) {
    return this.aiFacade.startRealtimeTranslationSession(input)
  }

  updateSession(input: AiRealtimeTranslationSessionUpdateRequestContract) {
    return this.aiFacade.updateRealtimeTranslationSession(input)
  }

  stopSession(userId: string, sessionId: string) {
    return this.aiFacade.stopRealtimeTranslationSession(userId, sessionId)
  }

  translateText(input: AiRealtimeTranslationSegmentRequestContract) {
    return this.aiFacade.translateRealtimeText(input)
  }

  translateMessage(input: AiRealtimeTranslationSegmentRequestContract) {
    return this.aiFacade.translateRealtimeMessage(input)
  }

  translateMediaTranscript(input: AiRealtimeTranslationSegmentRequestContract) {
    return this.aiFacade.translateRealtimeMediaTranscript(input)
  }

  translateCallSegment(input: AiRealtimeTranslationSegmentRequestContract) {
    return this.aiFacade.translateRealtimeCallSegment(input)
  }
}
