export type SabiAiGoogleAiProviderHealthCheckOwnerApprovalPacketStatus =
  | "packet_prepared"
  | "waiting_for_exact_owner_approval_text"
  | "blocked"

export type SabiAiGoogleAiProviderHealthCheckOwnerApprovalPacket = {
  service: "sabi_ai_google_ai_provider_health_check_owner_approval_packet"
  status: SabiAiGoogleAiProviderHealthCheckOwnerApprovalPacketStatus
  providerTarget: "google_ai_gemini"
  providerDisplayName: "Google AI / Gemini"
  packetOnly: true
  requiredExactOwnerApprovalText: string
  realSecretMustNotBeSentInChat: true
  backendOnlySecretStorageRequired: true
  budgetGuardLiveRequired: true
  budgetGuardLiveNow: true
  costLimitEnforcedNow: true
  secretReceivedNow: false
  secretReadNow: false
  secretStoredNow: false
  apiKeyReadNow: false
  apiKeyStoredNow: false
  envReadNow: false
  secretManagerCallNow: false
  providerHealthCheckNow: false
  providerCallNow: false
  googleCallNow: false
  providerHealthCheckPassedNow: false
  liveAutoLearningNow: false
  dbWriteNow: false
  productionLaunchNow: false
  futureProviderHealthCheckRequiresExactOwnerApprovalText: true
  futureProviderHealthCheckRequiresBackendSecretConfiguredOutsideChat: true
  futureLiveAutoLearningRequiresSeparateApproval: true
  checkedAt: string
}

export class SabiAiGoogleAiProviderHealthCheckOwnerApprovalPacketService {
  readonly serviceName = "sabi_ai_google_ai_provider_health_check_owner_approval_packet" as const
  readonly providerTarget = "google_ai_gemini" as const
  readonly providerDisplayName = "Google AI / Gemini" as const

  createPacket(now = new Date().toISOString()): SabiAiGoogleAiProviderHealthCheckOwnerApprovalPacket {
    return {
      service: this.serviceName,
      status: "packet_prepared",
      providerTarget: this.providerTarget,
      providerDisplayName: this.providerDisplayName,
      packetOnly: true,
      requiredExactOwnerApprovalText: "I approve SABI-AI-257S Google AI provider health check preparation only: no secret in chat, backend-only secret storage required, budget guard must remain live, no Google AI provider call now, no DB write, no payment, no payout, no legal action, no production launch.",
      realSecretMustNotBeSentInChat: true,
      backendOnlySecretStorageRequired: true,
      budgetGuardLiveRequired: true,
      budgetGuardLiveNow: true,
      costLimitEnforcedNow: true,
      secretReceivedNow: false,
      secretReadNow: false,
      secretStoredNow: false,
      apiKeyReadNow: false,
      apiKeyStoredNow: false,
      envReadNow: false,
      secretManagerCallNow: false,
      providerHealthCheckNow: false,
      providerCallNow: false,
      googleCallNow: false,
      providerHealthCheckPassedNow: false,
      liveAutoLearningNow: false,
      dbWriteNow: false,
      productionLaunchNow: false,
      futureProviderHealthCheckRequiresExactOwnerApprovalText: true,
      futureProviderHealthCheckRequiresBackendSecretConfiguredOutsideChat: true,
      futureLiveAutoLearningRequiresSeparateApproval: true,
      checkedAt: now,
    }
  }

  assertPacketSafe(packet = this.createPacket()): true {
    if (
      !packet.packetOnly ||
      !packet.realSecretMustNotBeSentInChat ||
      !packet.backendOnlySecretStorageRequired ||
      !packet.budgetGuardLiveRequired ||
      !packet.budgetGuardLiveNow ||
      !packet.costLimitEnforcedNow ||
      packet.secretReceivedNow ||
      packet.secretReadNow ||
      packet.secretStoredNow ||
      packet.apiKeyReadNow ||
      packet.apiKeyStoredNow ||
      packet.envReadNow ||
      packet.secretManagerCallNow ||
      packet.providerHealthCheckNow ||
      packet.providerCallNow ||
      packet.googleCallNow ||
      packet.providerHealthCheckPassedNow ||
      packet.liveAutoLearningNow ||
      packet.dbWriteNow ||
      packet.productionLaunchNow
    ) {
      throw new Error("Provider health check approval packet must remain packet-only with no secret and no provider call.")
    }

    return true
  }
}

export const sabiAiGoogleAiProviderHealthCheckOwnerApprovalPacketService =
  new SabiAiGoogleAiProviderHealthCheckOwnerApprovalPacketService()
