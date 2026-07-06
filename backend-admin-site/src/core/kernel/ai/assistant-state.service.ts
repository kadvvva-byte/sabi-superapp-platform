import {
  type AiActionIntent,
  type AiAssistantMode,
  type AiAssistantState,
  type AiCapability,
  type AiExecutionPolicy,
  type AiSessionContext,
} from "./ai.types"

const MODE_CAPABILITIES: Record<AiAssistantMode, AiCapability[]> = {
  general: [
    "answer_basic",
    "search_web",
    "translate_text",
    "translate_audio",
    "translate_video",
    "translate_call",
    "summarize_text",
    "analyze_text",
    "draft_text",
    "analyze_business",
    "use_ai_workspace",
    "use_external_search",
    "use_premium_translation",
  ],
  business: [
    "answer_basic",
    "search_web",
    "search_files",
    "summarize_text",
    "analyze_text",
    "draft_text",
    "analyze_business",
    "translate_text",
    "use_ai_workspace",
    "use_external_search",
    "use_premium_translation",
  ],
  education: [
    "answer_basic",
    "search_web",
    "search_files",
    "translate_text",
    "summarize_text",
    "analyze_text",
    "draft_text",
    "explain_concepts",
    "plan_study",
    "generate_quiz",
    "analyze_learning",
    "use_ai_workspace",
    "use_external_search",
    "use_premium_translation",
  ],
  student: [
    "answer_basic",
    "search_web",
    "search_files",
    "translate_text",
    "summarize_text",
    "analyze_text",
    "draft_text",
    "explain_concepts",
    "plan_study",
    "generate_quiz",
    "analyze_learning",
    "use_ai_workspace",
    "use_external_search",
    "use_premium_translation",
  ],
  abiturient: [
    "answer_basic",
    "search_web",
    "search_files",
    "translate_text",
    "summarize_text",
    "analyze_text",
    "draft_text",
    "explain_concepts",
    "plan_study",
    "generate_quiz",
    "analyze_learning",
    "use_ai_workspace",
    "use_external_search",
    "use_premium_translation",
  ],
  teacher: [
    "answer_basic",
    "search_web",
    "search_files",
    "translate_text",
    "summarize_text",
    "analyze_text",
    "draft_text",
    "explain_concepts",
    "plan_study",
    "generate_quiz",
    "analyze_learning",
    "use_ai_workspace",
    "use_external_search",
    "use_premium_translation",
  ],
  translation: [
    "translate_text",
    "translate_audio",
    "translate_video",
    "translate_call",
    "summarize_text",
    "use_premium_translation",
  ],
  search: [
    "search_web",
    "search_files",
    "search_images",
    "search_video",
    "search_music",
    "summarize_text",
    "use_external_search",
  ],
}

export class AssistantStateService {
  buildState(input: {
    session: AiSessionContext
    lastIntent?: AiActionIntent
    lastRequestAt?: string
  }): AiAssistantState {
    const capabilities = this.filterPremiumCapabilities(
      MODE_CAPABILITIES[input.session.mode] ?? MODE_CAPABILITIES.general,
      input.session,
    )

    return {
      session: input.session,
      availableCapabilities: capabilities,
      executionPolicy: this.resolveExecutionPolicy(input.session),
      lastIntent: input.lastIntent,
      lastRequestAt: input.lastRequestAt,
    }
  }

  private resolveExecutionPolicy(session: AiSessionContext): AiExecutionPolicy {
    if (session.consent.toolExecutionAllowed) {
      return "confirm_required"
    }

    if (session.consent.readAccessAllowed) {
      return "suggest_only"
    }

    return "read_only"
  }

  private filterPremiumCapabilities(capabilities: AiCapability[], session: AiSessionContext) {
    const features = new Set(session.activePremiumFeatures)

    return capabilities.filter((capability) => {
      if (capability === "analyze_business") {
        return features.has("ai_business_assistant")
      }

      if (["plan_study", "generate_quiz", "explain_concepts", "analyze_learning"].includes(capability)) {
        return features.has("ai_education_assistant")
      }

      if (["translate_audio", "translate_video"].includes(capability)) {
        return features.has("ai_translation_media")
      }

      if (capability === "translate_call") {
        return features.has("ai_translation_realtime")
      }

      if (capability === "use_ai_workspace") {
        return features.has("ai_workspace")
      }

      if (capability === "use_external_search") {
        return features.has("ai_search_external")
      }

      if (capability === "use_premium_translation") {
        return features.has("ai_translation_media") || features.has("ai_translation_realtime")
      }

      return true
    })
  }
}
