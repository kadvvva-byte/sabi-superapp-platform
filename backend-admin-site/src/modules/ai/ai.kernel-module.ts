import type { SuperAppModule } from "../../core/kernel/module/module.interface"
import { aiKernelContext } from "../../core/kernel/ai"
import { platformFoundationContext } from "../../core/kernel/platform"

export class AiKernelModule implements SuperAppModule {
  readonly name = "ai"
  readonly dependsOn = ["platform-foundation"] as const

  async init() {
    platformFoundationContext.featureFlags.registerMany([
      { key: "ai.kernel.ready", enabled: true, description: "AI kernel foundation is initialized." },
      { key: "ai.assistant.orchestrator", enabled: true, description: "AI-20 assistant brain resolves intent, context, app action routing, safety, confirmation policy, and client dispatch commands." },
      { key: "ai.workspace.coin.billing", enabled: true, description: "AI workspace is billed through COIN preview flow." },
      { key: "ai.voice.contracts", enabled: true, description: "AI voice contracts are registered for STT, TTS, quick invoke, and wake invoke." },
      { key: "ai.app_actions.client_dispatch", enabled: true, description: "AI-20 app action registry prepares safe client-dispatch commands for Messenger, Wallet, Coin Wallet, QR, Profile, Premium, settings, translation, and tasks." },
      { key: "ai.realtime_translation.assistant", enabled: true, description: "AI-21 realtime translation assistant is enabled for text messages, media transcripts, and call subtitle/TTS client-dispatch contracts." },
      { key: "ai.mobile_ui.contracts", enabled: true, description: "AI-23 mobile UI contracts are enabled for AI Home, assistant chat, voice, realtime translation, history, tasks, settings, premium, personalization, and safe confirmations." },
      { key: "ai.personalization.runtime", enabled: true, description: "AI-23 memory and personalization runtime is enabled for persistent preferences, saved instructions, ranked memory context, behavior signals, and privacy mode." },
      { key: "ai.safety_admin.monitoring", enabled: true, description: "AI-24 safety/admin monitoring is enabled for internal possible-violation reports, account/funds holds, emergency escalation, narcotics/psychotropics reporting, and admin panel queues without user accusation." },
      { key: "ai.native_voice.bridge", enabled: true, description: "AI-19 native voice bridge is enabled for STT transcript handoff, TTS playback commands, push-to-talk, quick invoke, interruption, and client voice events." },
      { key: "ai.history_tasks.application", enabled: true, description: "AI history and task application layer is available through product routes." },
      { key: "ai.settings_profile.contracts", enabled: true, description: "AI settings, permissions, and profile contracts are exposed through product routes." },
      { key: "ai.app.integration.contracts", enabled: true, description: "AI final app integration contracts are exposed for app boot, profile entry, workspace routing, and readiness checks." },
      { key: "ai.business.assistant", enabled: true, description: "Business assistant and accounting analysis are enabled." },
      { key: "ai.education.assistant", enabled: true, description: "Education assistant and study planning are enabled." },
      { key: "ai.write.requires_confirmation", enabled: true, description: "AI write, money, account, and destructive app actions require explicit confirmation." },
      { key: "ai.provider_router.chatgpt_google", enabled: true, description: "AI-29.2 provider router is enabled for ChatGPT/OpenAI assistant, Google Search, Google Translate, and server-side gateway policy." },
      { key: "ai.safety_approval.hard_guard", enabled: true, description: "AI-29.2 hard safety approval layer blocks automatic message sending, money movement, and account destructive actions without explicit user confirmation." },
    ])

    platformFoundationContext.healthChecks.register({
      name: "ai_kernel",
      critical: false,
      check: async () => ({
        status: "pass",
        details: {
          assistant: aiKernelContext.facade.getAssistantManifest(),
          searchProviders: aiKernelContext.facade.getSearchProviderManifest(),
          translationProviders: aiKernelContext.facade.getTranslationProviderManifest(),
          voice: aiKernelContext.facade.getVoiceManifest(),
          realtimeTranslation: aiKernelContext.facade.getRealtimeTranslationManifest(),
          appActions: aiKernelContext.facade.getAppActionManifest(),
          mobileUi: { version: "AI-29.2", baseRoute: "/api/ai/mobile-ui", mobileBaseRoute: "/ai" },
          personalization: aiKernelContext.facade.getPersonalizationManifest(),
          safetyAdmin: aiKernelContext.facade.getSafetyAdminManifest(),
          safetyMonitor: aiKernelContext.facade.getSafetyAdminMonitor(),
          premiumCatalog: aiKernelContext.facade.getPremiumCatalog(),
          persistence: aiKernelContext.persistence.getStatus(),
          requiredAppMountPath: "/api/ai",
        },
      }),
    })

    platformFoundationContext.auditLog.append({
      actorUserId: "system",
      action: "ai_kernel_initialized",
      scope: "ai",
      severity: "info",
      details: {
        assistantOrchestrator: true,
        version: "AI-29.2",
        nativeVoiceBridge: true,
        appActions: true,
        realtimeTranslation: true,
        mobileUi: true,
        personalization: true,
        safetyAdmin: true,
        providerRouter: true,
        safetyApproval: true,
      },
    })
  }

  async start() {
    platformFoundationContext.auditLog.append({
      actorUserId: "system",
      action: "ai_kernel_started",
      scope: "ai",
      severity: "info",
      details: { assistantOrchestrator: true, nativeVoiceBridge: true, appActions: true, realtimeTranslation: true, mobileUi: true, personalization: true, safetyAdmin: true },
    })
  }

  async stop() {
    platformFoundationContext.auditLog.append({
      actorUserId: "system",
      action: "ai_kernel_stopped",
      scope: "ai",
      severity: "warning",
    })
  }
}
