import type { AiAppActionKey, AiAppActionModule } from "../../../core/kernel/ai/ai-app-actions.types"

export type AiSabiVoiceCommandVersion = "AI-40.1"

export type AiSabiVoiceCommandStatus =
  | "contract_only"
  | "provider_not_configured"
  | "foundation_not_ready"
  | "ready"
  | "disabled"
  | "blocked"

export type AiSabiVoiceCommandSource =
  | "wake_word"
  | "push_to_talk"
  | "quick_action"
  | "voice_screen"
  | "messenger_call"
  | "system"

export type AiSabiVoiceCommandProviderArea =
  | "wake_word"
  | "speech_to_text"
  | "text_to_speech"
  | "assistant_reasoning"
  | "safe_action_dispatch"

export type AiSabiVoiceCommandFoundationModule =
  | "auth_user"
  | "home"
  | "messenger"
  | "wallet"
  | "profile_gallery"
  | "premium_coin"
  | "provider_gateway"
  | "admin_audit"

export type AiSabiVoiceCommandRiskLevel = "none" | "low" | "medium" | "high" | "blocked"

export type AiSabiVoiceCommandExecutionPolicy =
  | "client_navigation_only"
  | "prepare_only"
  | "confirm_then_dispatch"
  | "blocked_until_foundation_ready"
  | "blocked_until_provider_configured"

export type AiSabiVoiceCommandProviderStateContract = {
  area: AiSabiVoiceCommandProviderArea
  configured: boolean
  status: AiSabiVoiceCommandStatus
  requiredEnv: string[]
  serverOnly: true
  mobileApiKeyAllowed: false
}

export type AiSabiVoiceCommandFoundationStateContract = {
  module: AiSabiVoiceCommandFoundationModule
  ready: boolean
  status: AiSabiVoiceCommandStatus
  requiredFor: string[]
  note: string
}

export type AiSabiVoiceCommandCapabilityContract = {
  key:
    | "sabi_wake_word"
    | "sabi_voice_command_prepare"
    | "sabi_voice_command_execute"
    | "sabi_voice_reply"
    | "sabi_safe_app_actions"
    | "sabi_call_translation_bridge"
  title: string
  enabled: boolean
  status: AiSabiVoiceCommandStatus
  requiresPremium: boolean
  requiresProvider: boolean
  requiresFoundationModules: AiSabiVoiceCommandFoundationModule[]
  executionPolicy: AiSabiVoiceCommandExecutionPolicy
}

export type AiSabiVoiceCommandAllowedActionContract = {
  actionKey: AiAppActionKey
  module: AiAppActionModule
  riskLevel: AiSabiVoiceCommandRiskLevel
  requiresConfirmation: boolean
  requiresPremium: boolean
  executionPolicy: AiSabiVoiceCommandExecutionPolicy
  route?: string
  aliases: string[]
}

export type AiSabiVoiceCommandManifestContract = {
  area: "sabi_voice_command"
  version: AiSabiVoiceCommandVersion
  status: AiSabiVoiceCommandStatus
  enabled: boolean
  commandWakeWord: "SABI"
  fakePolicy: {
    fakeSttAllowed: false
    fakeTtsAllowed: false
    fakeCommandExecutionAllowed: false
    fakeProviderKeysAllowed: false
    fallbackExecutionAllowed: false
  }
  routes: {
    manifest: "/api/ai/sabi-voice/manifest"
    status: "/api/ai/sabi-voice/status"
    prepareCommand: "/api/ai/sabi-voice/prepare-command"
  }
  providers: AiSabiVoiceCommandProviderStateContract[]
  foundation: AiSabiVoiceCommandFoundationStateContract[]
  capabilities: AiSabiVoiceCommandCapabilityContract[]
  allowedActions: AiSabiVoiceCommandAllowedActionContract[]
  launchRule: "connect_real_server_keys_before_enabling"
  currentMode: "foundation_only_no_runtime_execution"
}

export type AiSabiVoiceCommandStatusContract = {
  userId?: string
  status: AiSabiVoiceCommandStatus
  enabled: boolean
  wakeWord: "SABI"
  providerConfigured: boolean
  foundationReady: boolean
  canListen: boolean
  canExecuteCommand: boolean
  canSpeakReply: boolean
  message: string
  manifest: AiSabiVoiceCommandManifestContract
}

export type AiSabiVoiceCommandPrepareRequestContract = {
  userId: string
  transcript: string
  source?: AiSabiVoiceCommandSource
  locale?: string
  deviceId?: string
  sessionId?: string
  premiumEnabled?: boolean
  metadata?: Record<string, unknown>
}

export type AiSabiVoiceCommandPreparedActionContract = {
  actionKey: AiAppActionKey
  module: AiAppActionModule
  route?: string
  riskLevel: AiSabiVoiceCommandRiskLevel
  requiresConfirmation: boolean
  requiresPremium: boolean
  executionPolicy: AiSabiVoiceCommandExecutionPolicy
  clientDispatchAllowed: boolean
  params: Record<string, unknown>
}

export type AiSabiVoiceCommandPrepareResultContract = {
  ok: boolean
  status: AiSabiVoiceCommandStatus
  code: string
  message: string
  userId: string
  wakeWordDetected: boolean
  transcript: string
  source: AiSabiVoiceCommandSource
  preparedAction?: AiSabiVoiceCommandPreparedActionContract
  providerConfigured: boolean
  foundationReady: boolean
  fakePolicy: AiSabiVoiceCommandManifestContract["fakePolicy"]
}
