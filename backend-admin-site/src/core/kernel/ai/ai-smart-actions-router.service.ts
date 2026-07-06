import { type AiActionIntent, type AiActionPlan, type AiRequestInput } from "./ai.types"

const SEARCH_WORDS = ["find", "search", "google", "yandex", "look up", "найди", "поиск", "ищи", "internet", "интернет"]
const TRANSLATE_WORDS = ["translate", "переведи", "tarjima", "translation", "перевод", "google translate"]
const SUMMARY_WORDS = ["summary", "summarize", "кратко", "резюме"]
const ANALYZE_WORDS = ["analyze", "analysis", "разбор", "проанализируй"]
const DRAFT_WORDS = ["draft", "write", "compose", "напиши", "составь"]
const TASK_WORDS = ["task", "todo", "plan", "задача", "план"]

export class AiSmartActionsRouterService {
  route(request: AiRequestInput): AiActionPlan {
    const intent = this.detectIntent(request.prompt)
    const lowered = request.prompt.toLowerCase()
    const requiresInternet = SEARCH_WORDS.some((word) => lowered.includes(word)) || Boolean(request.webSearchEnabled) || request.providerHint === "google_search"
    const requiresProviderSelection = requiresInternet || request.providerHint === "chatgpt" || request.providerHint === "openai"

    switch (intent) {
      case "search":
        return {
          intent,
          executionPolicy: "read_only",
          requiresInternet,
          requiresProviderSelection,
          requiresExplicitConfirmation: false,
          requiredCapabilities: ["search_web"],
          summary: "AI search request routed to provider selection flow",
        }
      case "translate":
        return {
          intent,
          executionPolicy: "read_only",
          requiresInternet: request.providerHint === "google_translate",
          requiresProviderSelection: request.providerHint === "google_translate",
          requiresExplicitConfirmation: false,
          requiredCapabilities: ["translate_text"],
          summary: "AI translation request routed to translation core",
        }
      case "summarize":
        return {
          intent,
          executionPolicy: "read_only",
          requiresInternet: false,
          requiresProviderSelection: false,
          requiresExplicitConfirmation: false,
          requiredCapabilities: ["summarize_text"],
          summary: "AI summary request routed to summarization flow",
        }
      case "analyze":
        return {
          intent,
          executionPolicy: "read_only",
          requiresInternet: false,
          requiresProviderSelection: false,
          requiresExplicitConfirmation: false,
          requiredCapabilities: ["analyze_text"],
          summary: "AI analysis request routed to analysis flow",
        }
      case "draft":
        return {
          intent,
          executionPolicy: "suggest_only",
          requiresInternet: false,
          requiresProviderSelection: false,
          requiresExplicitConfirmation: false,
          requiredCapabilities: ["draft_text"],
          summary: "AI draft request routed to draft generation flow",
        }
      case "task":
        return {
          intent,
          executionPolicy: "confirm_required",
          requiresInternet: false,
          requiresProviderSelection: false,
          requiresExplicitConfirmation: true,
          requiredCapabilities: ["draft_text"],
          summary: "AI task request must be confirmed before execution",
        }
      case "answer":
      default:
        return {
          intent: "answer",
          executionPolicy: "read_only",
          requiresInternet: false,
          requiresProviderSelection: false,
          requiresExplicitConfirmation: false,
          requiredCapabilities: ["answer_basic"],
          summary: "AI general answer routed to base assistant flow",
        }
    }
  }

  private detectIntent(prompt: string): AiActionIntent {
    const lowered = prompt.toLowerCase()

    if (SEARCH_WORDS.some((word) => lowered.includes(word))) return "search"
    if (TRANSLATE_WORDS.some((word) => lowered.includes(word))) return "translate"
    if (SUMMARY_WORDS.some((word) => lowered.includes(word))) return "summarize"
    if (ANALYZE_WORDS.some((word) => lowered.includes(word))) return "analyze"
    if (DRAFT_WORDS.some((word) => lowered.includes(word))) return "draft"
    if (TASK_WORDS.some((word) => lowered.includes(word))) return "task"

    return "answer"
  }
}
