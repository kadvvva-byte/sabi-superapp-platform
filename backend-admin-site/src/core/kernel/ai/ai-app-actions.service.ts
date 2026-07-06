import type {
  AiAppActionCandidate,
  AiAppActionDefinition,
  AiAppActionExecutionResult,
  AiAppActionKey,
  AiAppActionManifest,
  AiAppActionModule,
  AiAppActionResolveInput,
  AiAppActionResolveResult,
  AiAppActionRiskLevel,
  AiCancelAppActionInput,
  AiConfirmAppActionInput,
  AiPrepareAppActionInput,
  AiPreparedAppAction,
} from "./ai-app-actions.types"
import { AiSafetyApprovalService } from "./ai-safety-approval.service"

const ACTION_TTL_MS = 15 * 60 * 1000

const SUPPORTED_MODULES: AiAppActionModule[] = [
  "ai",
  "messenger",
  "wallet",
  "coin_wallet",
  "profile",
  "qr",
  "premium",
  "settings",
  "translation",
  "tasks",
  "contacts",
  "calls",
  "auth",
  "admin",
]

function createId(prefix: string) {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`
}

function nowIso() {
  return new Date().toISOString()
}

function normalizeText(value?: string) {
  return (value ?? "").trim().toLowerCase().replace(/\s+/g, " ")
}

function includesAny(text: string, words: readonly string[]) {
  return words.some((word) => text.includes(word.toLowerCase()))
}

function routeWithParams(route: string | undefined, params: Record<string, unknown>) {
  if (!route) return undefined
  return route.replace(/:([A-Za-z0-9_]+)/g, (_match, key) => {
    const raw = params[key]
    return raw === undefined || raw === null ? `:${key}` : encodeURIComponent(String(raw))
  })
}

function riskRequiresConfirmation(riskLevel: AiAppActionRiskLevel) {
  return riskLevel === "medium" || riskLevel === "high"
}

export class AiAppActionsService {
  private readonly pendingActions = new Map<string, AiPreparedAppAction>()
  private readonly safetyApproval = new AiSafetyApprovalService()

  private readonly registry: AiAppActionDefinition[] = [
    {
      key: "open_ai_workspace",
      module: "ai",
      title: "Open Sabi AI workspace",
      description: "Open the dedicated AI program workspace.",
      route: "/ai/workspace",
      clientCommandType: "navigate",
      mode: "general",
      riskLevel: "low",
      executionPolicy: "client_dispatch",
      requiresConfirmation: false,
      requiresPremium: false,
      requiresToolConsent: false,
      requiresMoneyLock: false,
      aliases: ["ai", "assistant", "workspace", "открой ai", "открой ии", "sabi ai"],
      allowedFromAssistant: true,
      implementedByClient: true,
    },
    {
      key: "open_ai_settings",
      module: "settings",
      title: "Open AI settings",
      description: "Open AI permissions, providers, memory, locale, notifications, and premium controls.",
      route: "/profile/ai",
      clientCommandType: "navigate",
      mode: "general",
      riskLevel: "low",
      executionPolicy: "client_dispatch",
      requiresConfirmation: false,
      requiresPremium: false,
      requiresToolConsent: false,
      requiresMoneyLock: false,
      aliases: ["ai settings", "permissions", "provider", "memory settings", "настройки ai", "настройки ии", "провайдер"],
      allowedFromAssistant: true,
      implementedByClient: true,
    },
    {
      key: "open_ai_history_tasks",
      module: "tasks",
      title: "Open AI history and tasks",
      description: "Open AI history, task list, confirmations, and activity preview.",
      route: "/ai/activity",
      clientCommandType: "navigate",
      mode: "general",
      riskLevel: "low",
      executionPolicy: "client_dispatch",
      requiresConfirmation: false,
      requiresPremium: false,
      requiresToolConsent: false,
      requiresMoneyLock: false,
      aliases: ["history", "tasks", "activity", "история ai", "задачи ai", "активность"],
      allowedFromAssistant: true,
      implementedByClient: true,
    },
    {
      key: "open_ai_voice",
      module: "ai",
      title: "Open AI voice",
      description: "Open voice input, speech-to-text, text-to-speech, and quick invoke controls.",
      route: "/ai/voice",
      clientCommandType: "navigate",
      mode: "general",
      riskLevel: "low",
      executionPolicy: "client_dispatch",
      requiresConfirmation: false,
      requiresPremium: false,
      requiresToolConsent: false,
      requiresMoneyLock: false,
      aliases: ["voice", "speech", "tts", "stt", "голос", "голосовой ai", "озвучь"],
      allowedFromAssistant: true,
      implementedByClient: true,
    },
    {
      key: "open_messenger",
      module: "messenger",
      title: "Open Sabi Messenger",
      description: "Open Messenger home.",
      route: "/messenger",
      clientCommandType: "navigate",
      mode: "general",
      riskLevel: "low",
      executionPolicy: "client_dispatch",
      requiresConfirmation: false,
      requiresPremium: false,
      requiresToolConsent: false,
      requiresMoneyLock: false,
      aliases: ["messenger", "chat", "messages", "мессенджер", "чат", "сообщения"],
      allowedFromAssistant: true,
      implementedByClient: true,
    },
    {
      key: "open_chat",
      module: "messenger",
      title: "Open chat",
      description: "Open a specific Messenger chat when chatId is provided by the client.",
      route: "/messenger/chat/:chatId",
      clientCommandType: "navigate",
      mode: "general",
      riskLevel: "low",
      executionPolicy: "client_dispatch",
      requiresConfirmation: false,
      requiresPremium: false,
      requiresToolConsent: false,
      requiresMoneyLock: false,
      aliases: ["open chat", "чат с", "открой чат", "conversation"],
      allowedFromAssistant: true,
      implementedByClient: true,
    },
    {
      key: "open_calls",
      module: "calls",
      title: "Open calls",
      description: "Open Messenger calls area.",
      route: "/calls",
      clientCommandType: "navigate",
      mode: "general",
      riskLevel: "low",
      executionPolicy: "client_dispatch",
      requiresConfirmation: false,
      requiresPremium: false,
      requiresToolConsent: false,
      requiresMoneyLock: false,
      aliases: ["calls", "call history", "звонки", "вызовы", "позвонить"],
      allowedFromAssistant: true,
      implementedByClient: true,
    },
    {
      key: "open_profile",
      module: "profile",
      title: "Open profile",
      description: "Open the user profile area.",
      route: "/profile",
      clientCommandType: "navigate",
      mode: "general",
      riskLevel: "low",
      executionPolicy: "client_dispatch",
      requiresConfirmation: false,
      requiresPremium: false,
      requiresToolConsent: false,
      requiresMoneyLock: false,
      aliases: ["profile", "account", "профиль", "аккаунт", "мой профиль"],
      allowedFromAssistant: true,
      implementedByClient: true,
    },
    {
      key: "open_wallet",
      module: "wallet",
      title: "Open Sabi Wallet",
      description: "Open the main Sabi Wallet home.",
      route: "/wallet/home",
      clientCommandType: "navigate",
      mode: "general",
      riskLevel: "low",
      executionPolicy: "client_dispatch",
      requiresConfirmation: false,
      requiresPremium: false,
      requiresToolConsent: false,
      requiresMoneyLock: false,
      aliases: ["wallet", "balance", "card", "кошелек", "кошелёк", "валет", "баланс", "карта"],
      allowedFromAssistant: true,
      implementedByClient: true,
    },
    {
      key: "open_coin_wallet",
      module: "coin_wallet",
      title: "Open Coin Wallet",
      description: "Open Coin Wallet inside Sabi Wallet.",
      route: "/wallet/coin",
      clientCommandType: "navigate",
      mode: "general",
      riskLevel: "low",
      executionPolicy: "client_dispatch",
      requiresConfirmation: false,
      requiresPremium: false,
      requiresToolConsent: false,
      requiresMoneyLock: false,
      aliases: ["coin wallet", "coin", "coin balance", "коин", "коин кошелек", "coin wallet"],
      allowedFromAssistant: true,
      implementedByClient: true,
    },
    {
      key: "open_wallet_topup",
      module: "wallet",
      title: "Open wallet top-up",
      description: "Open wallet top-up entry point; the actual payment still requires wallet confirmation.",
      route: "/wallet/topup",
      clientCommandType: "navigate",
      mode: "general",
      riskLevel: "medium",
      executionPolicy: "confirm_then_client_dispatch",
      requiresConfirmation: true,
      requiresPremium: false,
      requiresToolConsent: true,
      requiresMoneyLock: true,
      aliases: ["top up", "пополнить", "пополнение", "add money", "зачислить"],
      allowedFromAssistant: true,
      implementedByClient: true,
    },
    {
      key: "open_qr_scanner",
      module: "qr",
      title: "Open QR scanner",
      description: "Open universal QR scan flow.",
      route: "/qr",
      clientCommandType: "navigate",
      mode: "general",
      riskLevel: "low",
      executionPolicy: "client_dispatch",
      requiresConfirmation: false,
      requiresPremium: false,
      requiresToolConsent: false,
      requiresMoneyLock: false,
      aliases: ["qr", "scan", "scanner", "кьюар", "куар", "сканер", "сканировать"],
      allowedFromAssistant: true,
      implementedByClient: true,
    },
    {
      key: "open_qr_create",
      module: "qr",
      title: "Create QR",
      description: "Open universal QR creation flow.",
      route: "/qr/create",
      clientCommandType: "navigate",
      mode: "general",
      riskLevel: "medium",
      executionPolicy: "confirm_then_client_dispatch",
      requiresConfirmation: true,
      requiresPremium: false,
      requiresToolConsent: true,
      requiresMoneyLock: false,
      aliases: ["create qr", "generate qr", "создай qr", "создать qr", "qr код"],
      allowedFromAssistant: true,
      implementedByClient: true,
    },
    {
      key: "open_premium",
      module: "premium",
      title: "Open Premium",
      description: "Open Premium account and AI premium/COIN access entry point.",
      route: "/profile/premium",
      clientCommandType: "navigate",
      mode: "general",
      riskLevel: "low",
      executionPolicy: "client_dispatch",
      requiresConfirmation: false,
      requiresPremium: false,
      requiresToolConsent: false,
      requiresMoneyLock: false,
      aliases: ["premium", "subscription", "премиум", "подписка", "coin access"],
      allowedFromAssistant: true,
      implementedByClient: true,
    },
    {
      key: "start_text_translation",
      module: "translation",
      title: "Start text translation",
      description: "Open AI translation flow for text messages.",
      route: "/ai/translation/text",
      clientCommandType: "start_translation",
      mode: "translation",
      riskLevel: "low",
      executionPolicy: "client_dispatch",
      requiresConfirmation: false,
      requiresPremium: false,
      requiresToolConsent: true,
      requiresMoneyLock: false,
      aliases: ["translate", "translation", "переведи", "перевод", "tarjima"],
      allowedFromAssistant: true,
      implementedByClient: true,
    },
    {
      key: "start_voice_translation",
      module: "translation",
      title: "Start voice translation",
      description: "Open premium voice/call translation bridge.",
      route: "/ai/translation/voice",
      clientCommandType: "start_translation",
      mode: "translation",
      riskLevel: "medium",
      executionPolicy: "confirm_then_client_dispatch",
      requiresConfirmation: true,
      requiresPremium: true,
      requiresToolConsent: true,
      requiresMoneyLock: false,
      aliases: ["call translation", "voice translation", "перевод звонка", "голосовой перевод"],
      allowedFromAssistant: true,
      implementedByClient: true,
    },
    {
      key: "create_ai_task",
      module: "tasks",
      title: "Create AI task",
      description: "Prepare an AI task in awaiting-confirmation state.",
      route: "/ai/activity/tasks/new",
      clientCommandType: "create_task",
      mode: "general",
      riskLevel: "medium",
      executionPolicy: "server_prepare",
      requiresConfirmation: true,
      requiresPremium: false,
      requiresToolConsent: true,
      requiresMoneyLock: false,
      aliases: ["task", "todo", "remind", "задача", "напомни", "план"],
      allowedFromAssistant: true,
      implementedByClient: false,
    },
    {
      key: "prepare_send_message",
      module: "messenger",
      title: "Prepare message send",
      description: "Prepare a Messenger send action; actual send requires explicit confirmation in Messenger.",
      route: "/messenger/chat/:chatId",
      clientCommandType: "show_confirmation",
      mode: "general",
      riskLevel: "medium",
      executionPolicy: "confirm_then_client_dispatch",
      requiresConfirmation: true,
      requiresPremium: false,
      requiresToolConsent: true,
      requiresMoneyLock: false,
      aliases: ["send message", "отправь сообщение", "напиши в чат", "message to"],
      allowedFromAssistant: true,
      implementedByClient: true,
    },
    {
      key: "prepare_send_money",
      module: "wallet",
      title: "Prepare money transfer",
      description: "Prepare a Sabi Wallet transfer; money movement is never executed automatically by AI.",
      route: "/wallet/send",
      clientCommandType: "show_confirmation",
      mode: "general",
      riskLevel: "high",
      executionPolicy: "confirm_then_client_dispatch",
      requiresConfirmation: true,
      requiresPremium: false,
      requiresToolConsent: true,
      requiresMoneyLock: true,
      aliases: ["send money", "transfer money", "переведи деньги", "отправь деньги", "оплатить", "pay"],
      allowedFromAssistant: true,
      implementedByClient: true,
    },
    {
      key: "prepare_coin_transfer",
      module: "coin_wallet",
      title: "Prepare COIN transfer",
      description: "Prepare a COIN transfer; final coin movement stays locked behind Wallet confirmation.",
      route: "/wallet/coin/send",
      clientCommandType: "show_confirmation",
      mode: "general",
      riskLevel: "high",
      executionPolicy: "confirm_then_client_dispatch",
      requiresConfirmation: true,
      requiresPremium: false,
      requiresToolConsent: true,
      requiresMoneyLock: true,
      aliases: ["send coin", "coin transfer", "переведи coin", "отправь коин", "coin отправь"],
      allowedFromAssistant: true,
      implementedByClient: true,
    },
    {
      key: "prepare_delete_account",
      module: "profile",
      title: "Prepare delete account",
      description: "Open account deletion flow; AI cannot delete an account automatically.",
      route: "/profile/delete-account",
      clientCommandType: "show_confirmation",
      mode: "general",
      riskLevel: "high",
      executionPolicy: "blocked",
      requiresConfirmation: true,
      requiresPremium: false,
      requiresToolConsent: true,
      requiresMoneyLock: false,
      aliases: ["delete account", "remove account", "удалить аккаунт", "удали аккаунт"],
      allowedFromAssistant: true,
      implementedByClient: true,
    },
    {
      key: "prepare_logout",
      module: "auth",
      title: "Prepare sign out",
      description: "Open sign-out confirmation flow.",
      route: "/profile/security",
      clientCommandType: "show_confirmation",
      mode: "general",
      riskLevel: "medium",
      executionPolicy: "confirm_then_client_dispatch",
      requiresConfirmation: true,
      requiresPremium: false,
      requiresToolConsent: true,
      requiresMoneyLock: false,
      aliases: ["logout", "sign out", "log out", "выйти", "выход из аккаунта"],
      allowedFromAssistant: true,
      implementedByClient: true,
    },
    {
      key: "open_admin_ai_audit",
      module: "admin",
      title: "Open AI admin audit",
      description: "Open future admin audit entry point for AI actions. Limited until admin panel is live.",
      route: "/admin/ai/audit",
      clientCommandType: "navigate",
      mode: "general",
      riskLevel: "medium",
      executionPolicy: "confirm_then_client_dispatch",
      requiresConfirmation: true,
      requiresPremium: false,
      requiresToolConsent: true,
      requiresMoneyLock: false,
      aliases: ["admin ai", "ai audit", "админ ai", "аудит ai"],
      allowedFromAssistant: true,
      implementedByClient: true,
    },
  ]

  getManifest(): AiAppActionManifest {
    const confirmationRequiredKeys = this.registry
      .filter((action) => action.requiresConfirmation || riskRequiresConfirmation(action.riskLevel))
      .map((action) => action.key)

    return {
      area: "app_actions",
      status: "ready",
      version: "AI-20",
      dispatchMode: "server_prepares_client_dispatch",
      dangerousActionPolicy: "confirm_required",
      supportedModules: SUPPORTED_MODULES,
      actionCount: this.registry.length,
      confirmationRequiredKeys,
      clientDispatchRequired: true,
    }
  }

  getRegistry(options?: { module?: AiAppActionModule; includeBlocked?: boolean }): AiAppActionDefinition[] {
    return this.registry.filter((action) => {
      if (options?.module && action.module !== options.module) return false
      if (!options?.includeBlocked && action.executionPolicy === "blocked") return false
      return true
    })
  }

  getDefinition(actionKey: AiAppActionKey): AiAppActionDefinition | undefined {
    return this.registry.find((action) => action.key === actionKey)
  }

  resolve(input: AiAppActionResolveInput): AiAppActionResolveResult {
    const prompt = normalizeText(input.prompt)
    const candidates = this.registry
      .filter((definition) => {
        if (input.actionKey && definition.key !== input.actionKey) return false
        if (input.module && definition.module !== input.module) return false
        return definition.allowedFromAssistant
      })
      .map((definition) => this.scoreDefinition(definition, prompt, input))
      .filter((candidate) => candidate.score > 0)
      .sort((left, right) => right.score - left.score)
      .slice(0, 8)

    return {
      userId: input.userId,
      prompt: input.prompt,
      resolvedAt: nowIso(),
      candidates,
      bestCandidate: candidates[0],
    }
  }

  prepare(input: AiPrepareAppActionInput): AiPreparedAppAction {
    const definition = this.getDefinition(input.actionKey)
    if (!definition) {
      throw new Error("ai_app_action_unknown_key")
    }

    const createdAt = nowIso()
    const params = input.params ?? {}
    const approval = this.safetyApproval.evaluate({
      userId: input.userId,
      actionKey: definition.key,
      module: definition.module,
      source: input.source,
      requestedAutoExecute: input.autoDispatch,
      prompt: typeof input.metadata?.prompt === "string" ? input.metadata.prompt : undefined,
      metadata: input.metadata,
    })
    const blockedReason = approval.blockedReason ?? this.resolveBlockedReason(definition)
    const requiresConfirmation =
      definition.requiresConfirmation ||
      riskRequiresConfirmation(definition.riskLevel) ||
      approval.requiresConfirmation
    const canAutoDispatch = Boolean(input.autoDispatch && approval.autoExecuteAllowed && !requiresConfirmation)
    const status = blockedReason
      ? "blocked"
      : requiresConfirmation
        ? "awaiting_confirmation"
        : canAutoDispatch
          ? "dispatched"
          : "prepared"

    const prepared: AiPreparedAppAction = {
      id: createId("ai_app_action"),
      userId: input.userId,
      definition,
      status,
      createdAt,
      updatedAt: createdAt,
      expiresAt: new Date(Date.now() + ACTION_TTL_MS).toISOString(),
      source: input.source ?? "assistant",
      params,
      metadata: input.metadata,
      clientCommand: this.buildClientCommand(definition, params, status),
      confirmation: {
        required: requiresConfirmation,
        reason: this.buildConfirmationReason(definition),
        phrase: requiresConfirmation ? "CONFIRM" : undefined,
      },
      safety: {
        riskLevel: approval.riskLevel === "none" ? definition.riskLevel : approval.riskLevel,
        allowed: approval.allowed && !blockedReason,
        blockedReason,
        approval,
      },
    }

    if (prepared.status === "awaiting_confirmation" || prepared.status === "prepared" || prepared.status === "blocked") {
      this.pendingActions.set(prepared.id, prepared)
    }

    return prepared
  }

  confirm(input: AiConfirmAppActionInput): AiAppActionExecutionResult {
    const existing = this.getPendingAction(input.userId, input.actionId)
    if (!existing) {
      throw new Error("ai_app_action_not_found")
    }

    if (existing.status === "blocked") {
      return {
        action: existing,
        dispatched: false,
        clientCommand: existing.clientCommand,
        messageKey: "ai.app_action.blocked",
        note: existing.safety.blockedReason ?? "This action is blocked by policy.",
      }
    }

    if (Date.parse(existing.expiresAt) < Date.now()) {
      const expired = this.updatePending(existing, "cancelled", { expired: true })
      return {
        action: expired,
        dispatched: false,
        clientCommand: expired.clientCommand,
        messageKey: "ai.app_action.expired",
        note: "Prepared action expired and must be created again.",
      }
    }

    const confirmed = this.updatePending(existing, "confirmed", input.metadata)
    const dispatched = this.updatePending(confirmed, "dispatched", input.metadata)
    this.pendingActions.delete(dispatched.id)

    return {
      action: dispatched,
      dispatched: true,
      clientCommand: this.buildClientCommand(dispatched.definition, dispatched.params, "dispatched"),
      messageKey: "ai.app_action.client_dispatch_ready",
      note: "AI prepared the action. The mobile client must dispatch the returned command; the server does not navigate or move money directly.",
    }
  }

  cancel(input: AiCancelAppActionInput): AiPreparedAppAction {
    const existing = this.getPendingAction(input.userId, input.actionId)
    if (!existing) {
      throw new Error("ai_app_action_not_found")
    }
    const cancelled = this.updatePending(existing, "cancelled", { reason: input.reason })
    this.pendingActions.delete(cancelled.id)
    return cancelled
  }

  listPending(userId: string): AiPreparedAppAction[] {
    const now = Date.now()
    return [...this.pendingActions.values()]
      .filter((action) => action.userId === userId)
      .filter((action) => Date.parse(action.expiresAt) >= now || action.status === "blocked")
      .sort((left, right) => right.createdAt.localeCompare(left.createdAt))
  }

  private scoreDefinition(
    definition: AiAppActionDefinition,
    prompt: string,
    input: AiAppActionResolveInput,
  ): AiAppActionCandidate {
    let score = 0
    const reasons: string[] = []

    if (input.actionKey === definition.key) {
      score += 100
      reasons.push("action_key_match")
    }
    if (input.module === definition.module) {
      score += 25
      reasons.push("module_match")
    }
    if (prompt && includesAny(prompt, definition.aliases)) {
      score += 55
      reasons.push("alias_match")
    }
    if (prompt && prompt.includes(definition.title.toLowerCase())) {
      score += 15
      reasons.push("title_match")
    }
    if (!prompt && !input.actionKey && !input.module) {
      score += definition.riskLevel === "low" ? 1 : 0
      reasons.push("registry_preview")
    }

    return {
      definition,
      score,
      reason: reasons.join("+") || "no_match",
      extractedParams: this.extractParams(prompt, input.params ?? {}),
    }
  }

  private extractParams(prompt: string, existingParams: Record<string, unknown>) {
    const params: Record<string, unknown> = { ...existingParams }
    const chatId = prompt.match(/chat(?:id)?[:\s]+([a-z0-9_-]{3,})/i)?.[1]
    const amount = prompt.match(/(?:amount|сумма|на)[:\s]+([0-9]+(?:[.,][0-9]+)?)/i)?.[1]
    const targetLanguage = prompt.match(/(?:to|на|в)\s+([a-zа-яё-]{2,30})/i)?.[1]
    const messageText = prompt.match(/["“«](.*?)["”»]/)?.[1]

    if (chatId && params.chatId === undefined) params.chatId = chatId
    if (amount && params.amount === undefined) params.amount = Number(amount.replace(",", "."))
    if (targetLanguage && params.targetLanguage === undefined) params.targetLanguage = targetLanguage.toLowerCase()
    if (messageText && params.text === undefined) params.text = messageText

    return params
  }

  private resolveBlockedReason(definition: AiAppActionDefinition) {
    if (definition.key === "prepare_delete_account") {
      return "AI cannot delete accounts. It may only open the account-deletion confirmation screen after the user acts manually."
    }
    return undefined
  }

  private buildConfirmationReason(definition: AiAppActionDefinition) {
    if (definition.key === "prepare_send_message") {
      return "Messenger send actions require explicit confirmation. AI can prepare a draft, but the user must press send."
    }
    if (definition.requiresMoneyLock) {
      return "Money, wallet, COIN, and payment actions require explicit confirmation and must be completed inside Wallet."
    }
    if (definition.riskLevel === "high") {
      return "High-risk actions require explicit user confirmation and cannot be executed automatically by AI."
    }
    if (definition.riskLevel === "medium") {
      return "This action changes app state or opens a sensitive flow, so confirmation is required."
    }
    return "No confirmation required for this low-risk navigation action."
  }

  private buildClientCommand(
    definition: AiAppActionDefinition,
    params: Record<string, unknown>,
    status: AiPreparedAppAction["status"],
  ) {
    const route = routeWithParams(definition.route, params)
    return {
      type: status === "awaiting_confirmation" || status === "blocked" ? "show_confirmation" as const : definition.clientCommandType,
      route,
      module: definition.module,
      title: definition.title,
      params,
      presentation: definition.clientCommandType === "open_modal" ? "modal" as const : "push" as const,
      requiresClientDispatch: true,
    }
  }

  private getPendingAction(userId: string, actionId: string) {
    const action = this.pendingActions.get(actionId)
    if (!action || action.userId !== userId) return undefined
    return action
  }

  private updatePending(
    action: AiPreparedAppAction,
    status: AiPreparedAppAction["status"],
    metadata?: Record<string, unknown>,
  ): AiPreparedAppAction {
    const updated: AiPreparedAppAction = {
      ...action,
      status,
      updatedAt: nowIso(),
      metadata: { ...(action.metadata ?? {}), ...(metadata ?? {}) },
      clientCommand: this.buildClientCommand(action.definition, action.params, status),
    }
    this.pendingActions.set(updated.id, updated)
    return updated
  }
}
