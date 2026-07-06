import {
  WalletProviderConfigService,
  type SabiWalletProviderManifest,
  type SabiWalletProviderManifestItem,
} from "./wallet-provider-config.service"
import {
  WalletProviderExecutionGuard,
  type WalletExecutionRoute,
  type WalletProviderExecutionReadiness,
} from "./wallet-provider-execution.guard"
import { walletProviderExecutionAdapterRegistry } from "./adapters/wallet-provider-adapter.registry"
import {
  WalletProviderLaunchChecklistService,
  type WalletProviderLaunchChecklist,
} from "./wallet-provider-launch-checklist.service"

export type WalletFinalAuditSeverity = "pass" | "warning" | "blocked"

export type WalletFinalAuditControl = {
  id: string
  title: string
  severity: WalletFinalAuditSeverity
  providerIds: string[]
  executionRoutes: WalletExecutionRoute[]
  blockingReasons: string[]
  nextActions: string[]
  policy: {
    tokenOnlyStorage: true
    panStorageAllowed: false
    cvvStorageAllowed: false
    mobileCanReadSecret: false
    secretValuesReturned: false
    storesPrivateKeys: false
    storesSeedPhrase: false
  }
}

export type WalletFinalLaunchAudit = {
  ok: true
  generatedAt: string
  launchReady: boolean
  score: number
  bankingPriority: true
  alipayCompatible: true
  tokenOnlyStorage: true
  panStorageAllowed: false
  cvvStorageAllowed: false
  mobileCanReadSecret: false
  secretValuesReturned: false
  storesPrivateKeys: false
  storesSeedPhrase: false
  providerCount: number
  readyProviderCount: number
  blockedProviderCount: number
  blockedControlCount: number
  warningControlCount: number
  criticalBlockers: string[]
  nextActions: string[]
  controls: WalletFinalAuditControl[]
  manifest: SabiWalletProviderManifest
  checklist: WalletProviderLaunchChecklist
}

export type WalletMobileFinalLaunchSummary = {
  ok: true
  generatedAt: string
  launchReady: boolean
  score: number
  providerCount: number
  readyProviderCount: number
  blockedProviderCount: number
  blockedControlCount: number
  warningControlCount: number
  criticalBlockers: string[]
  nextActions: string[]
  policy: {
    bankingPriority: true
    alipayCompatible: true
    tokenOnlyStorage: true
    panStorageAllowed: false
    cvvStorageAllowed: false
    mobileCanReadSecret: false
    secretValuesReturned: false
    storesPrivateKeys: false
    storesSeedPhrase: false
  }
}

type ControlDefinition = {
  id: string
  title: string
  providerIds: string[]
  routes: WalletExecutionRoute[]
  mandatory: boolean
}

const CONTROLS: readonly ControlDefinition[] = [
  {
    id: "bank_and_alipay_payment_core",
    title: "Bank / Alipay+ payment core",
    providerIds: ["local_bank_gateway", "alipay_plus_acquiring"],
    routes: ["wallet_transfer", "qr_wallet_payment"],
    mandatory: true,
  },
  {
    id: "card_tokenization_only",
    title: "Card tokenization only, no PAN/CVV storage",
    providerIds: ["bank_card_tokenization"],
    routes: ["card_tokenization"],
    mandatory: true,
  },
  {
    id: "virtual_card_issuer",
    title: "Virtual card issuer readiness",
    providerIds: ["virtual_card_issuer"],
    routes: ["virtual_card_issue"],
    mandatory: true,
  },
  {
    id: "merchant_and_business_separation",
    title: "Merchant / Business route separation",
    providerIds: ["merchant_acquiring", "business_payout"],
    routes: ["merchant_payment", "merchant_settlement", "business_payout"],
    mandatory: true,
  },
  {
    id: "coin_wallet_bridge",
    title: "Coin Wallet bridge and ledger",
    providerIds: ["coin_wallet_ledger"],
    routes: ["coin_topup", "coin_send", "coin_withdraw"],
    mandatory: true,
  },
  {
    id: "crypto_wallet_foundation",
    title: "Crypto custody and market-data providers",
    providerIds: ["crypto_custody_provider", "crypto_market_data_provider"],
    routes: ["crypto_send", "crypto_market_data"],
    mandatory: true,
  },
  {
    id: "kyc_aml_compliance",
    title: "KYC / AML / admin compliance",
    providerIds: ["kyc_provider", "aml_provider"],
    routes: ["wallet_transfer", "merchant_payment", "business_payout"],
    mandatory: true,
  },
]

function dedupe(values: string[]): string[] {
  return [...new Set(values.filter((value) => value.trim().length > 0))]
}

function providerById(
  manifest: SabiWalletProviderManifest,
  providerId: string
): SabiWalletProviderManifestItem | undefined {
  return manifest.providers.find((provider) => provider.providerId === providerId)
}

function providerBlockingReasons(provider: SabiWalletProviderManifestItem | undefined): string[] {
  if (!provider) return ["provider_manifest_missing"]

  const reasons: string[] = []

  if (provider.status !== "ready") {
    reasons.push(`provider_not_ready:${provider.providerId}:${provider.status}`)
  }

  if (!provider.enabled) {
    reasons.push(`provider_disabled:${provider.providerId}`)
  }

  if (!provider.configured) {
    reasons.push(`provider_not_configured:${provider.providerId}`)
  }

  if (provider.missingSecretEnv.length > 0) {
    reasons.push(`missing_backend_secret_or_vault_ref:${provider.providerId}`)
  }

  if (provider.missingPublicEnv.length > 0) {
    reasons.push(`missing_backend_public_provider_config:${provider.providerId}`)
  }

  if (
    provider.panStorageAllowed !== false ||
    provider.cvvStorageAllowed !== false ||
    provider.tokenOnlyStorage !== true ||
    provider.mobileCanReadSecret !== false ||
    provider.secretValuesReturned !== false ||
    provider.storesPrivateKeys !== false ||
    provider.storesSeedPhrase !== false
  ) {
    reasons.push(`unsafe_provider_security_policy:${provider.providerId}`)
  }

  return reasons
}

function executionBlockingReasons(
  route: WalletExecutionRoute,
  readiness: WalletProviderExecutionReadiness
): string[] {
  const reasons: string[] = []

  if (!readiness.ok) {
    reasons.push(`execution_route_not_ready:${route}`)
  }

  if (readiness.providerStatus !== "ready") {
    reasons.push(`execution_provider_not_ready:${route}`)
  }

  if (!readiness.executionAdapterEnabled) {
    reasons.push(`execution_flag_not_enabled:${route}`)
  }

  if (!readiness.adapterReadiness.executionAvailable) {
    reasons.push(readiness.adapterReadiness.reason ?? `real_adapter_not_bound:${route}`)
  }

  return reasons
}

function nextActionsForProvider(provider: SabiWalletProviderManifestItem | undefined): string[] {
  if (!provider) return ["restore provider in backend Wallet provider manifest"]

  const actions: string[] = []

  if (!provider.enabled) actions.push(`enable provider after contract/KYC/KYB approval: ${provider.providerId}`)
  if (provider.environment === "not_configured") {
    actions.push(`select sandbox or production environment: ${provider.providerId}`)
  }
  if (provider.missingSecretEnv.length > 0) {
    actions.push(`set backend vault references for provider: ${provider.providerId}`)
  }
  if (provider.missingPublicEnv.length > 0) {
    actions.push(`set backend public provider config for provider: ${provider.providerId}`)
  }

  return actions
}

export class WalletFinalLaunchAuditService {
  constructor(
    private readonly providerConfigService = new WalletProviderConfigService(),
    private readonly executionGuard = new WalletProviderExecutionGuard(providerConfigService),
    private readonly launchChecklistService = new WalletProviderLaunchChecklistService(
      providerConfigService,
      executionGuard
    )
  ) {}

  getAudit(): WalletFinalLaunchAudit {
    const generatedAt = new Date().toISOString()
    const manifest = this.providerConfigService.getManifest()
    const checklist = this.launchChecklistService.getChecklist()

    const controls = CONTROLS.map((control) => {
      const providerReasons = control.providerIds.flatMap((providerId) =>
        providerBlockingReasons(providerById(manifest, providerId))
      )
      const routeReasons = control.routes.flatMap((route) => {
        try {
          return executionBlockingReasons(route, this.executionGuard.checkProviderReady(route))
        } catch (error) {
          return [
            `execution_route_missing:${route}:${
              error instanceof Error ? error.message : "unknown_error"
            }`,
          ]
        }
      })
      const adapterReasons = control.providerIds.flatMap((providerId) => {
        const provider = providerById(manifest, providerId)
        if (!provider) return []

        const readiness = walletProviderExecutionAdapterRegistry.checkAdapterReadiness(provider)
        return readiness.executionAvailable
          ? []
          : [readiness.reason ?? `real_adapter_not_bound:${providerId}`]
      })
      const blockingReasons = dedupe([...providerReasons, ...routeReasons, ...adapterReasons])
      const nextActions = dedupe([
        ...control.providerIds.flatMap((providerId) =>
          nextActionsForProvider(providerById(manifest, providerId))
        ),
        ...control.routes.map((route) => `bind real backend provider adapter before enabling route: ${route}`),
        "register and verify provider webhooks with signature verification",
        "run end-to-end sandbox transaction and verify ledger/admin audit trail",
      ])

      return {
        id: control.id,
        title: control.title,
        severity:
          blockingReasons.length > 0 ? "blocked" : control.mandatory ? "pass" : "warning",
        providerIds: control.providerIds,
        executionRoutes: control.routes,
        blockingReasons,
        nextActions: blockingReasons.length > 0 ? nextActions : [],
        policy: {
          tokenOnlyStorage: true,
          panStorageAllowed: false,
          cvvStorageAllowed: false,
          mobileCanReadSecret: false,
          secretValuesReturned: false,
          storesPrivateKeys: false,
          storesSeedPhrase: false,
        },
      } satisfies WalletFinalAuditControl
    })

    const blockedControlCount = controls.filter((control) => control.severity === "blocked").length
    const warningControlCount = controls.filter((control) => control.severity === "warning").length
    const criticalBlockers = dedupe(controls.flatMap((control) => control.blockingReasons))
    const nextActions = dedupe(controls.flatMap((control) => control.nextActions))
    const score = Math.round(((controls.length - blockedControlCount) / controls.length) * 100)

    return {
      ok: true,
      generatedAt,
      launchReady: blockedControlCount === 0 && checklist.launchReady,
      score,
      bankingPriority: true,
      alipayCompatible: true,
      tokenOnlyStorage: true,
      panStorageAllowed: false,
      cvvStorageAllowed: false,
      mobileCanReadSecret: false,
      secretValuesReturned: false,
      storesPrivateKeys: false,
      storesSeedPhrase: false,
      providerCount: manifest.providerCount,
      readyProviderCount: manifest.readyProviderCount,
      blockedProviderCount: manifest.providerCount - manifest.readyProviderCount,
      blockedControlCount,
      warningControlCount,
      criticalBlockers,
      nextActions,
      controls,
      manifest,
      checklist,
    }
  }

  getMobileSummary(): WalletMobileFinalLaunchSummary {
    const audit = this.getAudit()

    return {
      ok: true,
      generatedAt: audit.generatedAt,
      launchReady: audit.launchReady,
      score: audit.score,
      providerCount: audit.providerCount,
      readyProviderCount: audit.readyProviderCount,
      blockedProviderCount: audit.blockedProviderCount,
      blockedControlCount: audit.blockedControlCount,
      warningControlCount: audit.warningControlCount,
      criticalBlockers: audit.criticalBlockers,
      nextActions: audit.nextActions.slice(0, 20),
      policy: {
        bankingPriority: true,
        alipayCompatible: true,
        tokenOnlyStorage: true,
        panStorageAllowed: false,
        cvvStorageAllowed: false,
        mobileCanReadSecret: false,
        secretValuesReturned: false,
        storesPrivateKeys: false,
        storesSeedPhrase: false,
      },
    }
  }
}
