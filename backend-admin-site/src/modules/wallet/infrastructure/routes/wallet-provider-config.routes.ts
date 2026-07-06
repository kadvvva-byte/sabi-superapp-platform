import { Router } from "express"
import { WalletProviderConfigService } from "../../application/provider/wallet-provider-config.service"
import { WalletProviderExecutionGuard } from "../../application/provider/wallet-provider-execution.guard"
import { walletProviderExecutionAdapterRegistry } from "../../application/provider/adapters/wallet-provider-adapter.registry"
import { WalletProviderLaunchChecklistService } from "../../application/provider/wallet-provider-launch-checklist.service"
import { WalletFinalLaunchAuditService } from "../../application/provider/wallet-final-launch-audit.service"

function readBearerToken(header: unknown): string | null {
  if (typeof header !== "string") return null
  const [scheme, token] = header.split(" ")
  if (!scheme || !token) return null
  return scheme.toLowerCase() === "bearer" ? token : null
}

function readAdminToken(req: { headers: Record<string, unknown> }): string | null {
  const headerToken = req.headers["x-sabi-admin-token"]
  if (typeof headerToken === "string" && headerToken.trim()) {
    return headerToken.trim()
  }

  return readBearerToken(req.headers.authorization)
}

function assertAdminAccess(req: { headers: Record<string, unknown> }) {
  const expected =
    process.env.WALLET_PROVIDER_ADMIN_TOKEN || process.env.SABI_ADMIN_API_TOKEN

  if (!expected || expected.trim() === "") {
    return {
      ok: false,
      statusCode: 503,
      error: "wallet_provider_admin_token_not_configured",
    } as const
  }

  const provided = readAdminToken(req)

  if (!provided || provided !== expected) {
    return {
      ok: false,
      statusCode: 403,
      error: "wallet_provider_admin_access_denied",
    } as const
  }

  return { ok: true } as const
}


function shouldStripMobileKey(key: string): boolean {
  const normalized = key.trim().toLowerCase()

  if (
    normalized === "requiredadminfields" ||
    normalized === "requiredsecretenv" ||
    normalized === "missingsecretenv" ||
    normalized === "requiredpublicenv" ||
    normalized === "missingpublicenv" ||
    normalized === "requiredexecutionflags" ||
    normalized === "requiredbackendbindings" ||
    normalized === "requiredoperationalchecks" ||
    normalized === "requiredwebhooks"
  ) {
    return true
  }

  return (
    normalized.includes("vaultref") ||
    normalized.includes("secretvault") ||
    normalized.includes("apikey") ||
    normalized.includes("privatekey") ||
    normalized.includes("api_key") ||
    normalized.includes("secret_key") ||
    normalized.includes("private_key") ||
    normalized.includes("wallet_provider_")
  )
}

function sanitizeMobileString(value: string): string {
  const normalized = value.toLowerCase()

  if (
    normalized.includes("wallet_provider_") ||
    normalized.includes("vault") ||
    normalized.includes("secret") ||
    normalized.includes("api_key") ||
    normalized.includes("secret_key") ||
    normalized.includes("private_key") ||
    normalized.includes("apikey") ||
    normalized.includes("privatekey") ||
    normalized.includes("backend env") ||
    normalized.includes("environment variable")
  ) {
    return "provider_not_ready"
  }

  return value
}

function sanitizeMobileResponse(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value
      .map((item) => sanitizeMobileResponse(item))
      .filter((item) => item !== undefined)
  }

  if (value && typeof value === "object") {
    const source = value as Record<string, unknown>
    const target: Record<string, unknown> = {}

    Object.entries(source).forEach(([key, entryValue]) => {
      if (shouldStripMobileKey(key)) {
        return
      }

      const sanitized = sanitizeMobileResponse(entryValue)
      if (sanitized !== undefined) {
        target[key] = sanitized
      }
    })

    return target
  }

  if (typeof value === "string") {
    return sanitizeMobileString(value)
  }

  return value
}

export function buildWalletProviderConfigRouter(
  service = new WalletProviderConfigService(),
  executionGuard = new WalletProviderExecutionGuard(service),
  launchChecklistService = new WalletProviderLaunchChecklistService(service, executionGuard),
  finalLaunchAuditService = new WalletFinalLaunchAuditService(
    service,
    executionGuard,
    launchChecklistService
  )
): Router {
  const router = Router()

  router.get("/mobile-manifest", (_req, res) => {
    res.json(sanitizeMobileResponse(service.getMobileManifest()))
  })





  router.get("/mobile-adapter-readiness", (_req, res) => {
    const providers = service.getMobileManifest().providers

    res.json(
      sanitizeMobileResponse({
        ok: true,
        tokenOnlyStorage: true,
        panStorageAllowed: false,
        cvvStorageAllowed: false,
        mobileCanReadSecret: false,
        secretValuesReturned: false,
        adapters: providers.map((provider) =>
          walletProviderExecutionAdapterRegistry.checkAdapterReadiness(provider)
        ),
      })
    )
  })

  router.get("/mobile-launch-checklist", (_req, res) => {
    res.json(
      sanitizeMobileResponse({
        ok: true,
        checklist: launchChecklistService.getChecklist({ redactSecretEnv: true }),
      })
    )
  })

  router.get("/mobile-sync", (_req, res) => {
    const manifest = service.getMobileManifest()
    const providers = manifest.providers

    res.json(
      sanitizeMobileResponse({
        ok: true,
        generatedAt: new Date().toISOString(),
        manifest,
        checklist: launchChecklistService.getChecklist({ redactSecretEnv: true }),
        tokenOnlyStorage: true,
        panStorageAllowed: false,
        cvvStorageAllowed: false,
        mobileCanReadSecret: false,
        secretValuesReturned: false,
        adapters: providers.map((provider) =>
          walletProviderExecutionAdapterRegistry.checkAdapterReadiness(provider)
        ),
        readiness: {
          walletTransfer: executionGuard.checkProviderReady("wallet_transfer"),
          qrWalletPayment: executionGuard.checkProviderReady("qr_wallet_payment"),
          cardTokenization: executionGuard.checkProviderReady("card_tokenization"),
          virtualCardIssue: executionGuard.checkProviderReady("virtual_card_issue"),
          merchantPayment: executionGuard.checkProviderReady("merchant_payment"),
          merchantSettlement: executionGuard.checkProviderReady("merchant_settlement"),
          businessPayout: executionGuard.checkProviderReady("business_payout"),
          coinTopup: executionGuard.checkProviderReady("coin_topup"),
          coinSend: executionGuard.checkProviderReady("coin_send"),
          coinWithdraw: executionGuard.checkProviderReady("coin_withdraw"),
          cryptoSend: executionGuard.checkProviderReady("crypto_send"),
          cryptoMarketData: executionGuard.checkProviderReady("crypto_market_data"),
        },
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
      })
    )
  })


  router.get("/mobile-final-launch-summary", (_req, res) => {
    res.json(sanitizeMobileResponse(finalLaunchAuditService.getMobileSummary()))
  })

  router.get("/mobile-execution-readiness/:route", (req, res) => {
    try {
      res.json(
        sanitizeMobileResponse({
          ok: true,
          readiness: executionGuard.checkProviderReady(req.params.route),
        })
      )
    } catch (error) {
      res.status(404).json({
        ok: false,
        error: error instanceof Error ? error.message : "wallet_provider_route_not_found",
      })
    }
  })

  router.get("/admin/manifest", (req, res) => {
    const access = assertAdminAccess(req)

    if (!access.ok) {
      res.status(access.statusCode).json({ ok: false, error: access.error })
      return
    }

    res.json({ ok: true, manifest: service.getManifest() })
  })



  router.get("/admin/execution-readiness/:route", (req, res) => {
    const access = assertAdminAccess(req)

    if (!access.ok) {
      res.status(access.statusCode).json({ ok: false, error: access.error })
      return
    }

    try {
      res.json({
        ok: true,
        readiness: executionGuard.checkProviderReady(req.params.route),
      })
    } catch (error) {
      res.status(404).json({
        ok: false,
        error: error instanceof Error ? error.message : "wallet_provider_route_not_found",
      })
    }
  })



  router.get("/admin/adapter-readiness", (req, res) => {
    const access = assertAdminAccess(req)

    if (!access.ok) {
      res.status(access.statusCode).json({ ok: false, error: access.error })
      return
    }

    const providers = service.getManifest().providers

    res.json({
      ok: true,
      tokenOnlyStorage: true,
      panStorageAllowed: false,
      cvvStorageAllowed: false,
      mobileCanReadSecret: false,
      secretValuesReturned: false,
      adapters: providers.map((provider) =>
        walletProviderExecutionAdapterRegistry.checkAdapterReadiness(provider)
      ),
    })
  })


  router.get("/admin/launch-checklist", (req, res) => {
    const access = assertAdminAccess(req)

    if (!access.ok) {
      res.status(access.statusCode).json({ ok: false, error: access.error })
      return
    }

    res.json({
      ok: true,
      checklist: launchChecklistService.getChecklist(),
    })
  })


  router.get("/admin/final-launch-audit", (req, res) => {
    const access = assertAdminAccess(req)

    if (!access.ok) {
      res.status(access.statusCode).json({ ok: false, error: access.error })
      return
    }

    res.json(finalLaunchAuditService.getAudit())
  })

  router.get("/admin/providers/:providerId", (req, res) => {
    const access = assertAdminAccess(req)

    if (!access.ok) {
      res.status(access.statusCode).json({ ok: false, error: access.error })
      return
    }

    try {
      res.json({ ok: true, provider: service.resolveProvider(req.params.providerId) })
    } catch (error) {
      res.status(404).json({
        ok: false,
        error: error instanceof Error ? error.message : "wallet_provider_not_found",
      })
    }
  })

  router.post("/admin/providers/:providerId/validate", (req, res) => {
    const access = assertAdminAccess(req)

    if (!access.ok) {
      res.status(access.statusCode).json({ ok: false, error: access.error })
      return
    }

    try {
      const provider = service.resolveProvider(req.params.providerId)
      const body = (req.body ?? {}) as Record<string, unknown>
      const hasSecretValue = Object.keys(body).some((key) => {
        const normalized = key.toLowerCase()
        return (
          normalized.includes("secret") ||
          normalized.includes("privatekey") ||
          normalized.includes("apikey") ||
          normalized.includes("api_key") ||
          normalized.includes("token")
        )
      })

      if (hasSecretValue) {
        res.status(400).json({
          ok: false,
          error: "raw_provider_secret_values_are_not_accepted_here",
          policy: {
            useVaultRefOnly: true,
            mobileCanReadSecret: false,
            secretValuesReturned: false,
          },
        })
        return
      }

      res.json({
        ok: true,
        provider,
        policy: {
          adminConfigSource: "backend_env_or_vault_reference_only",
          mobileCanReadSecret: false,
          secretValuesReturned: false,
          tokenOnlyStorage: true,
          panStorageAllowed: false,
          cvvStorageAllowed: false,
        },
      })
    } catch (error) {
      res.status(404).json({
        ok: false,
        error: error instanceof Error ? error.message : "wallet_provider_not_found",
      })
    }
  })

  return router
}
