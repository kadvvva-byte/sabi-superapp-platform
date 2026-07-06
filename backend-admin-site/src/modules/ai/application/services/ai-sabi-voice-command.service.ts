import type {
  AiSabiVoiceCommandAllowedActionContract,
  AiSabiVoiceCommandCapabilityContract,
  AiSabiVoiceCommandExecutionPolicy,
  AiSabiVoiceCommandFoundationModule,
  AiSabiVoiceCommandFoundationStateContract,
  AiSabiVoiceCommandManifestContract,
  AiSabiVoiceCommandPrepareRequestContract,
  AiSabiVoiceCommandPrepareResultContract,
  AiSabiVoiceCommandProviderArea,
  AiSabiVoiceCommandProviderStateContract,
  AiSabiVoiceCommandRiskLevel,
  AiSabiVoiceCommandSource,
  AiSabiVoiceCommandStatus,
  AiSabiVoiceCommandStatusContract,
} from "../../contracts/ai-sabi-voice-command.contracts"
import type { AiAppActionKey, AiAppActionModule } from "../../../../core/kernel/ai/ai-app-actions.types"

type EnvReader = (key: string) => string | undefined

type AiSabiVoiceCommandServiceInput = {
  env?: EnvReader
}

const VERSION = "AI-40.1" as const
const WAKE_WORD = "SABI" as const

const FAKE_POLICY = {
  fakeSttAllowed: false,
  fakeTtsAllowed: false,
  fakeCommandExecutionAllowed: false,
  fakeProviderKeysAllowed: false,
  fallbackExecutionAllowed: false,
} as const

const REQUIRED_PROVIDER_ENV = {
  wake_word: ["AI_SABI_WAKE_WORD_ENABLED", "AI_SABI_WAKE_WORD_PROVIDER_URL"],
  speech_to_text: ["AI_SABI_STT_GATEWAY_URL"],
  text_to_speech: ["AI_SABI_TTS_GATEWAY_URL"],
  assistant_reasoning: ["AI_ASSISTANT_PROVIDER_GATEWAY_URL"],
  safe_action_dispatch: ["AI_SABI_COMMAND_DISPATCH_ENABLED"],
} satisfies Record<AiSabiVoiceCommandProviderArea, string[]>

function defaultEnv(key: string): string | undefined {
  return process.env[key]
}

function normalizeText(value: string | undefined): string {
  return (value ?? "").trim().replace(/\s+/g, " ")
}

function readFlag(value: string | undefined): boolean {
  return value === "1" || value?.toLowerCase() === "true" || value?.toLowerCase() === "enabled"
}

function hasValue(value: string | undefined): boolean {
  return typeof value === "string" && value.trim().length > 0
}

function detectWakeWord(transcript: string): boolean {
  const cleaned = transcript.trim().toLowerCase()
  return cleaned === "sabi" || cleaned.startsWith("sabi ") || cleaned.startsWith("саби ") || cleaned.startsWith("саби,")
}

function removeWakeWord(transcript: string): string {
  return transcript.replace(/^\s*(sabi|саби)[,\s]*/i, "").trim()
}

function includesAny(text: string, items: readonly string[]) {
  const value = text.toLowerCase()
  return items.some((item) => value.includes(item.toLowerCase()))
}

function providerStatus(configured: boolean): AiSabiVoiceCommandStatus {
  return configured ? "ready" : "provider_not_configured"
}

function foundationStatus(ready: boolean): AiSabiVoiceCommandStatus {
  return ready ? "ready" : "foundation_not_ready"
}

type ActionTemplate = {
  actionKey: AiAppActionKey
  module: AiAppActionModule
  route?: string
  riskLevel: AiSabiVoiceCommandRiskLevel
  requiresConfirmation: boolean
  requiresPremium: boolean
  executionPolicy: AiSabiVoiceCommandExecutionPolicy
  aliases: string[]
  foundationModules: AiSabiVoiceCommandFoundationModule[]
}

const ACTION_TEMPLATES: ActionTemplate[] = [
  {
    actionKey: "open_messenger",
    module: "messenger",
    route: "/messenger",
    riskLevel: "low",
    requiresConfirmation: false,
    requiresPremium: false,
    executionPolicy: "client_navigation_only",
    aliases: ["messenger", "messages", "chat", "мессенджер", "сообщения", "чат", "xabar"],
    foundationModules: ["auth_user", "home", "messenger"],
  },
  {
    actionKey: "open_calls",
    module: "calls",
    route: "/calls",
    riskLevel: "low",
    requiresConfirmation: false,
    requiresPremium: false,
    executionPolicy: "client_navigation_only",
    aliases: ["calls", "call", "звонки", "вызовы", "qo'ng'iroq"],
    foundationModules: ["auth_user", "home", "messenger"],
  },
  {
    actionKey: "open_wallet",
    module: "wallet",
    route: "/wallet/home",
    riskLevel: "low",
    requiresConfirmation: false,
    requiresPremium: false,
    executionPolicy: "client_navigation_only",
    aliases: ["wallet", "balance", "кошелек", "кошелёк", "баланс", "hamyon"],
    foundationModules: ["auth_user", "home", "wallet"],
  },
  {
    actionKey: "open_profile",
    module: "profile",
    route: "/profile",
    riskLevel: "low",
    requiresConfirmation: false,
    requiresPremium: false,
    executionPolicy: "client_navigation_only",
    aliases: ["profile", "account", "профиль", "аккаунт", "profil"],
    foundationModules: ["auth_user", "home", "profile_gallery"],
  },
  {
    actionKey: "start_text_translation",
    module: "translation",
    route: "/ai/translation",
    riskLevel: "low",
    requiresConfirmation: false,
    requiresPremium: false,
    executionPolicy: "client_navigation_only",
    aliases: ["translate", "translation", "перевод", "переведи", "tarjima"],
    foundationModules: ["auth_user", "home", "provider_gateway"],
  },
  {
    actionKey: "start_voice_translation",
    module: "translation",
    route: "/ai/voice",
    riskLevel: "medium",
    requiresConfirmation: true,
    requiresPremium: true,
    executionPolicy: "confirm_then_dispatch",
    aliases: ["voice translation", "call translation", "перевод звонка", "голосовой перевод"],
    foundationModules: ["auth_user", "home", "provider_gateway", "premium_coin"],
  },
  {
    actionKey: "prepare_send_message",
    module: "messenger",
    route: "/messenger",
    riskLevel: "medium",
    requiresConfirmation: true,
    requiresPremium: false,
    executionPolicy: "confirm_then_dispatch",
    aliases: ["send message", "write message", "напиши", "отправь сообщение", "xabar yubor"],
    foundationModules: ["auth_user", "home", "messenger"],
  },
  {
    actionKey: "prepare_send_money",
    module: "wallet",
    route: "/wallet/home",
    riskLevel: "high",
    requiresConfirmation: true,
    requiresPremium: false,
    executionPolicy: "confirm_then_dispatch",
    aliases: ["send money", "transfer money", "переведи деньги", "отправь деньги", "pul yubor"],
    foundationModules: ["auth_user", "home", "wallet", "admin_audit"],
  },
]

export class AiSabiVoiceCommandService {
  private readonly env: EnvReader

  constructor(input?: AiSabiVoiceCommandServiceInput) {
    this.env = input?.env ?? defaultEnv
  }

  getManifest(): AiSabiVoiceCommandManifestContract {
    const providers = this.getProviderStates()
    const foundation = this.getFoundationStates()
    const providerConfigured = providers.every((item) => item.configured)
    const foundationReady = foundation.every((item) => item.ready)
    const enabled = providerConfigured && foundationReady

    return {
      area: "sabi_voice_command",
      version: VERSION,
      status: enabled ? "ready" : providerConfigured ? "foundation_not_ready" : "provider_not_configured",
      enabled,
      commandWakeWord: WAKE_WORD,
      fakePolicy: FAKE_POLICY,
      routes: {
        manifest: "/api/ai/sabi-voice/manifest",
        status: "/api/ai/sabi-voice/status",
        prepareCommand: "/api/ai/sabi-voice/prepare-command",
      },
      providers,
      foundation,
      capabilities: this.getCapabilities(providerConfigured, foundationReady),
      allowedActions: this.getAllowedActions(),
      launchRule: "connect_real_server_keys_before_enabling",
      currentMode: "foundation_only_no_runtime_execution",
    }
  }

  getStatus(userId?: string): AiSabiVoiceCommandStatusContract {
    const manifest = this.getManifest()
    const providerConfigured = manifest.providers.every((item) => item.configured)
    const foundationReady = manifest.foundation.every((item) => item.ready)

    return {
      userId,
      status: manifest.status,
      enabled: manifest.enabled,
      wakeWord: WAKE_WORD,
      providerConfigured,
      foundationReady,
      canListen: manifest.enabled,
      canExecuteCommand: manifest.enabled,
      canSpeakReply: manifest.enabled,
      message: manifest.enabled
        ? "SABI voice command foundation is ready."
        : providerConfigured
          ? "SABI voice command foundation is waiting for Auth/User, Home, Messenger, Wallet and Premium/Coin integration readiness."
          : "SABI voice command providers are not configured on the server. No fake STT, TTS or command execution is allowed.",
      manifest,
    }
  }

  prepareCommand(input: AiSabiVoiceCommandPrepareRequestContract): AiSabiVoiceCommandPrepareResultContract {
    const userId = normalizeText(input.userId)
    const transcript = normalizeText(input.transcript)
    const source: AiSabiVoiceCommandSource = input.source ?? "voice_screen"
    const status = this.getStatus(userId)
    const wakeWordDetected = source === "wake_word" ? detectWakeWord(transcript) : transcript.length > 0

    if (!userId) {
      throw new Error("ai_sabi_voice_user_id_required")
    }

    if (!transcript) {
      throw new Error("ai_sabi_voice_transcript_required")
    }

    if (!status.providerConfigured) {
      return this.blockedResult({
        input,
        status: "provider_not_configured",
        code: "ai_sabi_voice_provider_not_configured",
        message: "SABI voice command requires real server STT/TTS/assistant provider keys before it can listen, execute commands or speak replies.",
        wakeWordDetected,
        source,
      })
    }

    if (!status.foundationReady) {
      return this.blockedResult({
        input,
        status: "foundation_not_ready",
        code: "ai_sabi_voice_foundation_not_ready",
        message: "SABI voice command is blocked until Auth/User, Home, Messenger, Wallet, Profile/Gallery and Premium/Coin foundations are integrated.",
        wakeWordDetected,
        source,
      })
    }

    if (source === "wake_word" && !wakeWordDetected) {
      return this.blockedResult({
        input,
        status: "blocked",
        code: "ai_sabi_wake_word_not_detected",
        message: "Wake-word command requires the spoken SABI trigger.",
        wakeWordDetected,
        source,
      })
    }

    const commandText = source === "wake_word" ? removeWakeWord(transcript) : transcript
    const action = this.resolveAction(commandText)

    if (!action) {
      return this.blockedResult({
        input,
        status: "blocked",
        code: "ai_sabi_voice_command_not_resolved",
        message: "The command was not resolved to an allowed Sabi action. No fallback execution is allowed.",
        wakeWordDetected,
        source,
      })
    }

    const missingFoundation = action.foundationModules.filter((module) => {
      const item = status.manifest.foundation.find((candidate) => candidate.module === module)
      return !item?.ready
    })

    if (missingFoundation.length) {
      return this.blockedResult({
        input,
        status: "foundation_not_ready",
        code: "ai_sabi_voice_action_foundation_not_ready",
        message: `The resolved action is blocked until these foundations are ready: ${missingFoundation.join(", ")}.`,
        wakeWordDetected,
        source,
      })
    }

    if (action.requiresPremium && !input.premiumEnabled) {
      return this.blockedResult({
        input,
        status: "blocked",
        code: "ai_sabi_voice_action_requires_premium",
        message: "This SABI voice command requires Premium access.",
        wakeWordDetected,
        source,
      })
    }

    return {
      ok: true,
      status: "ready",
      code: "ai_sabi_voice_command_prepared",
      message: "SABI voice command was prepared for client dispatch. The client must still apply confirmation and permission rules.",
      userId,
      wakeWordDetected,
      transcript,
      source,
      preparedAction: {
        actionKey: action.actionKey,
        module: action.module,
        route: action.route,
        riskLevel: action.riskLevel,
        requiresConfirmation: action.requiresConfirmation,
        requiresPremium: action.requiresPremium,
        executionPolicy: action.executionPolicy,
        clientDispatchAllowed: action.executionPolicy === "client_navigation_only" && !action.requiresConfirmation,
        params: {
          transcript,
          commandText,
          source,
          deviceId: input.deviceId,
          sessionId: input.sessionId,
        },
      },
      providerConfigured: true,
      foundationReady: true,
      fakePolicy: FAKE_POLICY,
    }
  }

  private blockedResult(params: {
    input: AiSabiVoiceCommandPrepareRequestContract
    status: AiSabiVoiceCommandStatus
    code: string
    message: string
    wakeWordDetected: boolean
    source: AiSabiVoiceCommandSource
  }): AiSabiVoiceCommandPrepareResultContract {
    return {
      ok: false,
      status: params.status,
      code: params.code,
      message: params.message,
      userId: normalizeText(params.input.userId),
      wakeWordDetected: params.wakeWordDetected,
      transcript: normalizeText(params.input.transcript),
      source: params.source,
      providerConfigured: this.getStatus(params.input.userId).providerConfigured,
      foundationReady: this.getStatus(params.input.userId).foundationReady,
      fakePolicy: FAKE_POLICY,
    }
  }

  private getProviderStates(): AiSabiVoiceCommandProviderStateContract[] {
    const wakeEnabled = readFlag(this.env("AI_SABI_WAKE_WORD_ENABLED"))
    const commandDispatchEnabled = readFlag(this.env("AI_SABI_COMMAND_DISPATCH_ENABLED"))
    const configs: Array<{ area: AiSabiVoiceCommandProviderArea; configured: boolean }> = [
      { area: "wake_word", configured: wakeEnabled && hasValue(this.env("AI_SABI_WAKE_WORD_PROVIDER_URL")) },
      { area: "speech_to_text", configured: hasValue(this.env("AI_SABI_STT_GATEWAY_URL")) },
      { area: "text_to_speech", configured: hasValue(this.env("AI_SABI_TTS_GATEWAY_URL")) },
      { area: "assistant_reasoning", configured: hasValue(this.env("AI_ASSISTANT_PROVIDER_GATEWAY_URL")) },
      { area: "safe_action_dispatch", configured: commandDispatchEnabled },
    ]

    return configs.map((item) => ({
      area: item.area,
      configured: item.configured,
      status: providerStatus(item.configured),
      requiredEnv: REQUIRED_PROVIDER_ENV[item.area],
      serverOnly: true,
      mobileApiKeyAllowed: false,
    }))
  }

  private getFoundationStates(): AiSabiVoiceCommandFoundationStateContract[] {
    const items: Array<{
      module: AiSabiVoiceCommandFoundationModule
      envKey: string
      requiredFor: string[]
      note: string
    }> = [
      {
        module: "auth_user",
        envKey: "AI_SABI_AUTH_USER_FOUNDATION_READY",
        requiredFor: ["identity", "session", "permissions"],
        note: "SABI commands must be bound to the authenticated unified user ID.",
      },
      {
        module: "home",
        envKey: "AI_SABI_HOME_FOUNDATION_READY",
        requiredFor: ["navigation", "program launch", "safe client dispatch"],
        note: "Home must expose stable routes before voice commands can navigate.",
      },
      {
        module: "messenger",
        envKey: "AI_SABI_MESSENGER_FOUNDATION_READY",
        requiredFor: ["open messenger", "open chats", "prepare message", "calls"],
        note: "Messenger commands must use real chat/call foundations and explicit confirmation for sending.",
      },
      {
        module: "wallet",
        envKey: "AI_SABI_WALLET_FOUNDATION_READY",
        requiredFor: ["open wallet", "balance preview", "money-transfer preparation"],
        note: "Wallet commands must route through wallet safety/compliance and never move money without confirmation.",
      },
      {
        module: "profile_gallery",
        envKey: "AI_SABI_PROFILE_GALLERY_FOUNDATION_READY",
        requiredFor: ["open profile", "open gallery", "public/private media policy"],
        note: "Gallery/profile commands need public/private media foundations.",
      },
      {
        module: "premium_coin",
        envKey: "AI_SABI_PREMIUM_COIN_FOUNDATION_READY",
        requiredFor: ["premium command access", "paid voice features", "coin purchase checks"],
        note: "Premium and Coin entitlements must be real server contracts, not manual toggles.",
      },
      {
        module: "provider_gateway",
        envKey: "AI_SABI_PROVIDER_GATEWAY_FOUNDATION_READY",
        requiredFor: ["assistant reasoning", "STT", "TTS", "translation"],
        note: "All providers must use server-side keys only.",
      },
      {
        module: "admin_audit",
        envKey: "AI_SABI_ADMIN_AUDIT_FOUNDATION_READY",
        requiredFor: ["high-risk actions", "compliance logs", "safety reports"],
        note: "High-risk commands require admin/audit/compliance hooks.",
      },
    ]

    return items.map((item) => {
      const ready = readFlag(this.env(item.envKey))
      return {
        module: item.module,
        ready,
        status: foundationStatus(ready),
        requiredFor: item.requiredFor,
        note: item.note,
      }
    })
  }

  private getCapabilities(providerConfigured: boolean, foundationReady: boolean): AiSabiVoiceCommandCapabilityContract[] {
    const globalStatus: AiSabiVoiceCommandStatus = providerConfigured
      ? foundationReady
        ? "ready"
        : "foundation_not_ready"
      : "provider_not_configured"

    return [
      {
        key: "sabi_wake_word",
        title: "SABI wake word",
        enabled: globalStatus === "ready",
        status: globalStatus,
        requiresPremium: true,
        requiresProvider: true,
        requiresFoundationModules: ["auth_user", "home", "provider_gateway", "premium_coin"],
        executionPolicy: providerConfigured ? "blocked_until_foundation_ready" : "blocked_until_provider_configured",
      },
      {
        key: "sabi_voice_command_prepare",
        title: "Prepare SABI voice command",
        enabled: globalStatus === "ready",
        status: globalStatus,
        requiresPremium: false,
        requiresProvider: true,
        requiresFoundationModules: ["auth_user", "home", "provider_gateway"],
        executionPolicy: providerConfigured ? "blocked_until_foundation_ready" : "blocked_until_provider_configured",
      },
      {
        key: "sabi_voice_command_execute",
        title: "Execute SABI voice command",
        enabled: globalStatus === "ready",
        status: globalStatus,
        requiresPremium: false,
        requiresProvider: true,
        requiresFoundationModules: ["auth_user", "home", "messenger", "wallet", "profile_gallery", "admin_audit"],
        executionPolicy: providerConfigured ? "blocked_until_foundation_ready" : "blocked_until_provider_configured",
      },
      {
        key: "sabi_voice_reply",
        title: "SABI voice reply",
        enabled: globalStatus === "ready",
        status: globalStatus,
        requiresPremium: true,
        requiresProvider: true,
        requiresFoundationModules: ["auth_user", "home", "provider_gateway", "premium_coin"],
        executionPolicy: providerConfigured ? "blocked_until_foundation_ready" : "blocked_until_provider_configured",
      },
      {
        key: "sabi_safe_app_actions",
        title: "Safe app action bridge",
        enabled: globalStatus === "ready",
        status: globalStatus,
        requiresPremium: false,
        requiresProvider: true,
        requiresFoundationModules: ["auth_user", "home", "messenger", "wallet", "admin_audit"],
        executionPolicy: providerConfigured ? "blocked_until_foundation_ready" : "blocked_until_provider_configured",
      },
      {
        key: "sabi_call_translation_bridge",
        title: "Realtime call translation bridge",
        enabled: globalStatus === "ready",
        status: globalStatus,
        requiresPremium: true,
        requiresProvider: true,
        requiresFoundationModules: ["auth_user", "messenger", "provider_gateway", "premium_coin"],
        executionPolicy: providerConfigured ? "blocked_until_foundation_ready" : "blocked_until_provider_configured",
      },
    ]
  }

  private getAllowedActions(): AiSabiVoiceCommandAllowedActionContract[] {
    return ACTION_TEMPLATES.map((item) => ({
      actionKey: item.actionKey,
      module: item.module,
      route: item.route,
      riskLevel: item.riskLevel,
      requiresConfirmation: item.requiresConfirmation,
      requiresPremium: item.requiresPremium,
      executionPolicy: item.executionPolicy,
      aliases: item.aliases,
    }))
  }

  private resolveAction(commandText: string): ActionTemplate | undefined {
    const text = normalizeText(commandText)
    if (!text) return undefined
    return ACTION_TEMPLATES.find((item) => includesAny(text, item.aliases))
  }
}
