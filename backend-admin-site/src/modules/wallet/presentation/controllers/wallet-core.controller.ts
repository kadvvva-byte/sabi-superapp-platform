import type { Request, Response } from "express"

import type { BusinessWalletEntityParams } from "../../domain/entities/business-wallet.entity"
import type { MerchantWalletEntityParams } from "../../domain/entities/merchant-wallet.entity"
import type { BusinessWalletEntitySnapshot } from "../../domain/entities/business-wallet.entity"
import type { MerchantWalletEntitySnapshot } from "../../domain/entities/merchant-wallet.entity"
import type { WalletOperationEntitySnapshot } from "../../domain/entities/wallet-operation.entity"

import type { CalculateBusinessTransferPreviewInput } from "../../application/use-cases/calculate-business-transfer-preview.use-case"
import type { CalculateMerchantPaymentPreviewInput } from "../../application/use-cases/calculate-merchant-payment-preview.use-case"
import type { CalculateMerchantSettlementPreviewInput } from "../../application/use-cases/calculate-merchant-settlement-preview.use-case"

import type { ExecuteBusinessTransferAndSaveInput } from "../../application/use-cases/execute-business-transfer-and-save.use-case"
import type { ExecuteMerchantPaymentAndSaveInput } from "../../application/use-cases/execute-merchant-payment-and-save.use-case"
import type { ExecuteMerchantSettlementAndSaveInput } from "../../application/use-cases/execute-merchant-settlement-and-save.use-case"

import { WalletCoreFacadeService } from "../../application/services/wallet-core-facade.service"

type JsonRecord = Record<string, unknown>

type WalletCoreControllerHooks = {
  publishRealtime?: (
    channel: string,
    event: string,
    payload: Record<string, unknown>
  ) => Promise<void> | void
  recordActivity?: (input: {
    userId?: string
    type: string
    data?: Record<string, unknown>
  }) => Promise<void> | void
  pushNotification?: (input: {
    userId?: string
    title: string
    body: string
    data?: Record<string, unknown>
  }) => Promise<void> | void
  syncLedger?: (
    kind: "business_transfer" | "merchant_payment" | "merchant_settlement",
    payload: Record<string, unknown>,
    idempotencyKey?: string
  ) => Promise<void> | void
  syncBusinessWalletCreate?: (
    wallet: BusinessWalletEntitySnapshot
  ) => Promise<void> | void
  syncMerchantWalletCreate?: (
    wallet: MerchantWalletEntitySnapshot
  ) => Promise<void> | void
  validateBusinessTransferExecution?: (input: {
    senderWalletId?: string
    senderDebit: number
  }) => Promise<void> | void
  validateMerchantSettlementExecution?: (input: {
    merchantWalletId?: string
    merchantDebit: number
  }) => Promise<void> | void
  findExistingOperationByKey?: (
    kind: "business_transfer" | "merchant_payment" | "merchant_settlement",
    idempotencyKey: string
  ) =>
    | Promise<WalletOperationEntitySnapshot | null>
    | WalletOperationEntitySnapshot
    | null
  resolveBusinessWallet?: (
    walletId: string,
    seed?: Partial<BusinessWalletEntityParams>
  ) => Promise<BusinessWalletEntityParams | null> | BusinessWalletEntityParams | null
  resolveMerchantWallet?: (
    walletId: string,
    seed?: Partial<MerchantWalletEntityParams>
  ) =>
    | Promise<MerchantWalletEntityParams | null>
    | MerchantWalletEntityParams
    | null
  getBusinessWalletById?: (
    walletId: string
  ) =>
    | Promise<BusinessWalletEntitySnapshot | null>
    | BusinessWalletEntitySnapshot
    | null
  getMerchantWalletById?: (
    walletId: string
  ) =>
    | Promise<MerchantWalletEntitySnapshot | null>
    | MerchantWalletEntitySnapshot
    | null
  getWalletOperationById?: (
    operationId: string
  ) =>
    | Promise<WalletOperationEntitySnapshot | null>
    | WalletOperationEntitySnapshot
    | null
  listWalletOperationsByWalletId?: (
    walletId: string
  ) =>
    | Promise<WalletOperationEntitySnapshot[]>
    | WalletOperationEntitySnapshot[]
}

function asRecord(value: unknown): JsonRecord | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return null
  }

  return value as JsonRecord
}

function asOptionalString(value: unknown): string | undefined {
  if (typeof value !== "string") {
    return undefined
  }

  const normalized = value.trim()
  return normalized.length > 0 ? normalized : undefined
}

function asPositiveNumber(value: unknown): number | null {
  const normalized = Number(value)

  if (!Number.isFinite(normalized) || normalized <= 0) {
    return null
  }

  return Math.round(normalized * 100) / 100
}

export class WalletCoreController {
  constructor(
    private readonly facade: WalletCoreFacadeService,
    private readonly hooks: WalletCoreControllerHooks = {}
  ) {}

  createBusinessWallet = async (req: Request, res: Response) => {
    try {
      const body = asRecord(req.body) ?? {}

      const result = await this.facade.createBusinessWallet(
        body as BusinessWalletEntityParams
      )

      await this.afterCreateBusinessWallet(result)

      return res.status(201).json({
        ok: true,
        data: result,
      })
    } catch (error) {
      return this.sendError(res, error)
    }
  }

  createMerchantWallet = async (req: Request, res: Response) => {
    try {
      const body = asRecord(req.body) ?? {}

      const result = await this.facade.createMerchantWallet(
        body as MerchantWalletEntityParams
      )

      await this.afterCreateMerchantWallet(result)

      return res.status(201).json({
        ok: true,
        data: result,
      })
    } catch (error) {
      return this.sendError(res, error)
    }
  }

  getBusinessWalletById = async (req: Request, res: Response) => {
    try {
      const id = asOptionalString(req.params.id)

      if (!id) {
        return this.sendBadRequest(res, "business_wallet_id_required")
      }

      const prismaResult = await this.hooks.getBusinessWalletById?.(id)
      const result =
        prismaResult ?? (await this.facade.getBusinessWalletById(id))

      if (!result) {
        return this.sendNotFound(res, "business_wallet_not_found")
      }

      return res.json({
        ok: true,
        data: result,
      })
    } catch (error) {
      return this.sendError(res, error)
    }
  }

  getBusinessWalletByBusinessId = async (req: Request, res: Response) => {
    try {
      const businessId = asOptionalString(req.params.businessId)

      if (!businessId) {
        return this.sendBadRequest(res, "business_id_required")
      }

      const result = await this.facade.getBusinessWalletByBusinessId(businessId)

      if (!result) {
        return this.sendNotFound(res, "business_wallet_not_found")
      }

      return res.json({
        ok: true,
        data: result,
      })
    } catch (error) {
      return this.sendError(res, error)
    }
  }

  listBusinessWalletsByOwnerUserId = async (req: Request, res: Response) => {
    try {
      const ownerUserId = asOptionalString(req.params.ownerUserId)

      if (!ownerUserId) {
        return this.sendBadRequest(res, "owner_user_id_required")
      }

      const result = await this.facade.listBusinessWalletsByOwnerUserId(
        ownerUserId
      )

      return res.json({
        ok: true,
        data: result,
      })
    } catch (error) {
      return this.sendError(res, error)
    }
  }

  getMerchantWalletById = async (req: Request, res: Response) => {
    try {
      const id = asOptionalString(req.params.id)

      if (!id) {
        return this.sendBadRequest(res, "merchant_wallet_id_required")
      }

      const prismaResult = await this.hooks.getMerchantWalletById?.(id)
      const result =
        prismaResult ?? (await this.facade.getMerchantWalletById(id))

      if (!result) {
        return this.sendNotFound(res, "merchant_wallet_not_found")
      }

      return res.json({
        ok: true,
        data: result,
      })
    } catch (error) {
      return this.sendError(res, error)
    }
  }

  listMerchantWalletsByOwnerUserId = async (req: Request, res: Response) => {
    try {
      const ownerUserId = asOptionalString(req.params.ownerUserId)

      if (!ownerUserId) {
        return this.sendBadRequest(res, "owner_user_id_required")
      }

      const result = await this.facade.listMerchantWalletsByOwnerUserId(
        ownerUserId
      )

      return res.json({
        ok: true,
        data: result,
      })
    } catch (error) {
      return this.sendError(res, error)
    }
  }

  listMerchantWalletsByBusinessWalletId = async (
    req: Request,
    res: Response
  ) => {
    try {
      const businessWalletId = asOptionalString(req.params.businessWalletId)

      if (!businessWalletId) {
        return this.sendBadRequest(res, "business_wallet_id_required")
      }

      const result = await this.facade.listMerchantWalletsByBusinessWalletId(
        businessWalletId
      )

      return res.json({
        ok: true,
        data: result,
      })
    } catch (error) {
      return this.sendError(res, error)
    }
  }

  getWalletOperationById = async (req: Request, res: Response) => {
    try {
      const id = asOptionalString(req.params.id)

      if (!id) {
        return this.sendBadRequest(res, "wallet_operation_id_required")
      }

      const prismaResult = await this.hooks.getWalletOperationById?.(id)
      const result =
        prismaResult ?? (await this.facade.getWalletOperationById(id))

      if (!result) {
        return this.sendNotFound(res, "wallet_operation_not_found")
      }

      return res.json({
        ok: true,
        data: result,
      })
    } catch (error) {
      return this.sendError(res, error)
    }
  }

  listWalletOperationsByWalletId = async (req: Request, res: Response) => {
    try {
      const walletId = asOptionalString(req.params.walletId)

      if (!walletId) {
        return this.sendBadRequest(res, "wallet_id_required")
      }

      const prismaResult = await this.hooks.listWalletOperationsByWalletId?.(
        walletId
      )
      const result =
        prismaResult ??
        (await this.facade.listWalletOperationsByWalletId(walletId))

      return res.json({
        ok: true,
        data: result,
      })
    } catch (error) {
      return this.sendError(res, error)
    }
  }

  previewBusinessTransfer = async (req: Request, res: Response) => {
    try {
      const input = await this.parseBusinessTransferInput(
        req.body,
        "preview_business_transfer_invalid_input"
      )

      const result = this.facade.previewBusinessTransfer(input)

      return res.json({
        ok: true,
        data: result,
      })
    } catch (error) {
      return this.sendError(res, error)
    }
  }

  executeBusinessTransfer = async (req: Request, res: Response) => {
    try {
      const idempotencyKey = this.extractIdempotencyKey(req)
      const reused = await this.findExistingOperation(
        "business_transfer",
        idempotencyKey
      )

      if (reused) {
        return res.json({
          ok: true,
          reused: true,
          data: {
            operation: reused,
          },
        })
      }

      const input = await this.parseBusinessTransferInput(
        req.body,
        "execute_business_transfer_invalid_input"
      )

      const preview = this.facade.previewBusinessTransfer(input)

      await this.safeValidateBusinessTransferExecution({
        senderWalletId: asOptionalString(input.senderWallet.id),
        senderDebit: preview.senderDebit,
      })

      const result = await this.facade.executeBusinessTransfer(input)
      const responseData = this.withIdempotencyKey(result, idempotencyKey)

      await this.safeSyncLedger(
        "business_transfer",
        responseData,
        idempotencyKey
      )
      await this.afterExecuteBusinessTransfer(responseData)

      return res.json({
        ok: true,
        data: responseData,
      })
    } catch (error) {
      return this.sendError(res, error)
    }
  }

  previewMerchantPayment = async (req: Request, res: Response) => {
    try {
      const input = await this.parseMerchantPaymentInput(
        req.body,
        "preview_merchant_payment_invalid_input"
      )

      const result = this.facade.previewMerchantPayment(input)

      return res.json({
        ok: true,
        data: result,
      })
    } catch (error) {
      return this.sendError(res, error)
    }
  }

  executeMerchantPayment = async (req: Request, res: Response) => {
    try {
      const idempotencyKey = this.extractIdempotencyKey(req)
      const reused = await this.findExistingOperation(
        "merchant_payment",
        idempotencyKey
      )

      if (reused) {
        return res.json({
          ok: true,
          reused: true,
          data: {
            operation: reused,
          },
        })
      }

      const input = await this.parseMerchantPaymentInput(
        req.body,
        "execute_merchant_payment_invalid_input"
      )

      const result = await this.facade.executeMerchantPayment(input)
      const responseData = this.withIdempotencyKey(result, idempotencyKey)

      await this.safeSyncLedger("merchant_payment", responseData, idempotencyKey)
      await this.afterExecuteMerchantPayment(responseData)

      return res.json({
        ok: true,
        data: responseData,
      })
    } catch (error) {
      return this.sendError(res, error)
    }
  }

  previewMerchantSettlement = async (req: Request, res: Response) => {
    try {
      const input = await this.parseMerchantSettlementInput(
        req.body,
        "preview_merchant_settlement_invalid_input"
      )

      const result = this.facade.previewMerchantSettlement(input)

      return res.json({
        ok: true,
        data: result,
      })
    } catch (error) {
      return this.sendError(res, error)
    }
  }

  executeMerchantSettlement = async (req: Request, res: Response) => {
    try {
      const idempotencyKey = this.extractIdempotencyKey(req)
      const reused = await this.findExistingOperation(
        "merchant_settlement",
        idempotencyKey
      )

      if (reused) {
        return res.json({
          ok: true,
          reused: true,
          data: {
            operation: reused,
          },
        })
      }

      const input = await this.parseMerchantSettlementInput(
        req.body,
        "execute_merchant_settlement_invalid_input"
      )

      const preview = this.facade.previewMerchantSettlement(input)

      await this.safeValidateMerchantSettlementExecution({
        merchantWalletId: asOptionalString(input.merchantWallet.id),
        merchantDebit: preview.merchantDebit,
      })

      const result = await this.facade.executeMerchantSettlement(input)
      const responseData = this.withIdempotencyKey(result, idempotencyKey)

      await this.safeSyncLedger(
        "merchant_settlement",
        responseData,
        idempotencyKey
      )
      await this.afterExecuteMerchantSettlement(responseData)

      return res.json({
        ok: true,
        data: responseData,
      })
    } catch (error) {
      return this.sendError(res, error)
    }
  }

  private async parseBusinessTransferInput(
    body: unknown,
    errorCode: string
  ): Promise<
    CalculateBusinessTransferPreviewInput & ExecuteBusinessTransferAndSaveInput
  > {
    const payload = asRecord(body)
    const amount = payload ? asPositiveNumber(payload.amount) : null
    const currency = payload ? asOptionalString(payload.currency) : undefined

    const senderWallet = await this.resolveBusinessWalletPayload({
      wallet: payload ? asRecord(payload.senderWallet) : null,
      walletId: payload ? asOptionalString(payload.senderWalletId) : undefined,
      walletMeta: payload ? asRecord(payload.senderWalletMeta) : null,
      currency,
    })

    const recipientWallet = await this.resolveBusinessWalletPayload({
      wallet: payload ? asRecord(payload.recipientWallet) : null,
      walletId: payload
        ? asOptionalString(payload.recipientWalletId)
        : undefined,
      walletMeta: payload ? asRecord(payload.recipientWalletMeta) : null,
      currency,
    })

    if (!senderWallet || !recipientWallet || amount === null) {
      throw new Error(errorCode)
    }

    return {
      senderWallet,
      recipientWallet,
      amount,
      currency,
    }
  }

  private async parseMerchantPaymentInput(
    body: unknown,
    errorCode: string
  ): Promise<
    CalculateMerchantPaymentPreviewInput & ExecuteMerchantPaymentAndSaveInput
  > {
    const payload = asRecord(body)
    const amount = payload ? asPositiveNumber(payload.amount) : null
    const currency = payload ? asOptionalString(payload.currency) : undefined

    const merchantWallet = await this.resolveMerchantWalletPayload({
      wallet: payload ? asRecord(payload.merchantWallet) : null,
      walletId: payload ? asOptionalString(payload.merchantWalletId) : undefined,
      walletMeta: payload ? asRecord(payload.merchantWalletMeta) : null,
      currency,
    })

    if (!merchantWallet || amount === null) {
      throw new Error(errorCode)
    }

    return {
      merchantWallet,
      amount,
      currency,
    }
  }

  private async parseMerchantSettlementInput(
    body: unknown,
    errorCode: string
  ): Promise<
    CalculateMerchantSettlementPreviewInput &
      ExecuteMerchantSettlementAndSaveInput
  > {
    const payload = asRecord(body)
    const amount = payload ? asPositiveNumber(payload.amount) : null
    const currency = payload ? asOptionalString(payload.currency) : undefined

    const merchantWallet = await this.resolveMerchantWalletPayload({
      wallet: payload ? asRecord(payload.merchantWallet) : null,
      walletId: payload ? asOptionalString(payload.merchantWalletId) : undefined,
      walletMeta: payload ? asRecord(payload.merchantWalletMeta) : null,
      currency,
    })

    if (!merchantWallet || amount === null) {
      throw new Error(errorCode)
    }

    return {
      merchantWallet,
      amount,
      currency,
    }
  }

  private async resolveBusinessWalletPayload(input: {
    wallet: JsonRecord | null
    walletId?: string
    walletMeta: JsonRecord | null
    currency?: string
  }): Promise<BusinessWalletEntityParams | null> {
    const embeddedWallet = input.wallet as BusinessWalletEntityParams | null
    const embeddedWalletId = embeddedWallet
      ? asOptionalString(embeddedWallet.id)
      : undefined
    const resolvedWalletId = input.walletId ?? embeddedWalletId

    const seed: Partial<BusinessWalletEntityParams> = {
      ...((input.walletMeta ?? {}) as Partial<BusinessWalletEntityParams>),
      ...(embeddedWallet ?? {}),
    }

    if (resolvedWalletId) {
      const resolved = await this.hooks.resolveBusinessWallet?.(
        resolvedWalletId,
        seed
      )

      if (resolved) {
        return this.ensureBusinessWalletDefaults(resolved, input.currency)
      }
    }

    if (embeddedWallet) {
      return this.ensureBusinessWalletDefaults(embeddedWallet, input.currency)
    }

    return null
  }

  private async resolveMerchantWalletPayload(input: {
    wallet: JsonRecord | null
    walletId?: string
    walletMeta: JsonRecord | null
    currency?: string
  }): Promise<MerchantWalletEntityParams | null> {
    const embeddedWallet = input.wallet as MerchantWalletEntityParams | null
    const embeddedWalletId = embeddedWallet
      ? asOptionalString(embeddedWallet.id)
      : undefined
    const resolvedWalletId = input.walletId ?? embeddedWalletId

    const seed: Partial<MerchantWalletEntityParams> = {
      ...((input.walletMeta ?? {}) as Partial<MerchantWalletEntityParams>),
      ...(embeddedWallet ?? {}),
    }

    if (resolvedWalletId) {
      const resolved = await this.hooks.resolveMerchantWallet?.(
        resolvedWalletId,
        seed
      )

      if (resolved) {
        return this.ensureMerchantWalletDefaults(resolved, input.currency)
      }
    }

    if (embeddedWallet) {
      return this.ensureMerchantWalletDefaults(embeddedWallet, input.currency)
    }

    return null
  }

  private ensureBusinessWalletDefaults(
    wallet: BusinessWalletEntityParams,
    currency?: string
  ): BusinessWalletEntityParams {
    const defaultCurrency = wallet.defaultCurrency ?? currency ?? "USD"

    return {
      ...wallet,
      defaultCurrency,
      availableCurrencies: wallet.availableCurrencies ?? [defaultCurrency],
      holdBalance: wallet.holdBalance ?? 0,
      serviceFeePercent: wallet.serviceFeePercent ?? 0,
      isMerchantEnabled: wallet.isMerchantEnabled ?? false,
      isBusinessEnabled: wallet.isBusinessEnabled ?? true,
      status: wallet.status ?? "active",
      balance: wallet.balance ?? 0,
      businessName: wallet.businessName ?? wallet.displayName ?? "",
    }
  }

  private ensureMerchantWalletDefaults(
    wallet: MerchantWalletEntityParams,
    currency?: string
  ): MerchantWalletEntityParams {
    const defaultCurrency = wallet.defaultCurrency ?? currency ?? "USD"

    return {
      ...wallet,
      defaultCurrency,
      availableCurrencies: wallet.availableCurrencies ?? [defaultCurrency],
      holdBalance: wallet.holdBalance ?? 0,
      serviceFeePercent: wallet.serviceFeePercent ?? 0,
      settlementFeePercent: wallet.settlementFeePercent ?? 0,
      isMerchantEnabled: wallet.isMerchantEnabled ?? true,
      isSettlementEnabled: wallet.isSettlementEnabled ?? true,
      status: wallet.status ?? "active",
      balance: wallet.balance ?? 0,
      merchantName: wallet.merchantName ?? wallet.displayName ?? "",
    }
  }

  private async afterCreateBusinessWallet(result: unknown) {
    const wallet = asRecord(result)
    if (!wallet) return

    const walletId = asOptionalString(wallet.id)
    const ownerUserId = asOptionalString(wallet.ownerUserId)
    const businessName =
      asOptionalString(wallet.businessName) ?? "Business wallet"

    await this.safeSyncBusinessWalletCreate(
      wallet as unknown as BusinessWalletEntitySnapshot
    )

    await this.safeRecordActivity({
      userId: ownerUserId,
      type: "wallet.business.created",
      data: wallet,
    })

    await this.safePushNotification({
      userId: ownerUserId,
      title: "Business wallet created",
      body: `${businessName} is ready.`,
      data: wallet,
    })

    if (ownerUserId) {
      await this.safePublishRealtime(
        `wallet-core:user:${ownerUserId}`,
        "wallet.business.created",
        wallet
      )
    }

    if (walletId) {
      await this.safePublishRealtime(
        `wallet-core:wallet:${walletId}`,
        "wallet.business.created",
        wallet
      )
    }
  }

  private async afterCreateMerchantWallet(result: unknown) {
    const wallet = asRecord(result)
    if (!wallet) return

    const walletId = asOptionalString(wallet.id)
    const ownerUserId = asOptionalString(wallet.ownerUserId)
    const merchantName =
      asOptionalString(wallet.merchantName) ?? "Merchant wallet"

    await this.safeSyncMerchantWalletCreate(
      wallet as unknown as MerchantWalletEntitySnapshot
    )

    await this.safeRecordActivity({
      userId: ownerUserId,
      type: "wallet.merchant.created",
      data: wallet,
    })

    await this.safePushNotification({
      userId: ownerUserId,
      title: "Merchant wallet created",
      body: `${merchantName} is ready.`,
      data: wallet,
    })

    if (ownerUserId) {
      await this.safePublishRealtime(
        `wallet-core:user:${ownerUserId}`,
        "wallet.merchant.created",
        wallet
      )
    }

    if (walletId) {
      await this.safePublishRealtime(
        `wallet-core:wallet:${walletId}`,
        "wallet.merchant.created",
        wallet
      )
    }
  }

  private async afterExecuteBusinessTransfer(result: unknown) {
    const payload = asRecord(result)
    if (!payload) return

    const operation = asRecord(payload.operation)
    const senderWallet = asRecord(payload.senderWallet)
    const recipientWallet = asRecord(payload.recipientWallet)

    const operationId = asOptionalString(operation?.id)
    const senderWalletId = asOptionalString(senderWallet?.id)
    const recipientWalletId = asOptionalString(recipientWallet?.id)
    const senderOwnerUserId = asOptionalString(senderWallet?.ownerUserId)
    const recipientOwnerUserId = asOptionalString(recipientWallet?.ownerUserId)

    await this.safeRecordActivity({
      userId: senderOwnerUserId,
      type: "wallet.business.transfer.completed",
      data: payload,
    })

    if (recipientOwnerUserId && recipientOwnerUserId !== senderOwnerUserId) {
      await this.safeRecordActivity({
        userId: recipientOwnerUserId,
        type: "wallet.business.transfer.received",
        data: payload,
      })
    }

    await this.safePushNotification({
      userId: senderOwnerUserId,
      title: "Business transfer completed",
      body: "Your business transfer was completed successfully.",
      data: payload,
    })

    if (recipientOwnerUserId && recipientOwnerUserId !== senderOwnerUserId) {
      await this.safePushNotification({
        userId: recipientOwnerUserId,
        title: "Business transfer received",
        body: "A business transfer has been credited to your wallet.",
        data: payload,
      })
    }

    if (senderOwnerUserId) {
      await this.safePublishRealtime(
        `wallet-core:user:${senderOwnerUserId}`,
        "wallet.business.transfer.completed",
        payload
      )
    }

    if (recipientOwnerUserId && recipientOwnerUserId !== senderOwnerUserId) {
      await this.safePublishRealtime(
        `wallet-core:user:${recipientOwnerUserId}`,
        "wallet.business.transfer.received",
        payload
      )
    }

    if (senderWalletId) {
      await this.safePublishRealtime(
        `wallet-core:wallet:${senderWalletId}`,
        "wallet.business.transfer.completed",
        payload
      )
    }

    if (recipientWalletId) {
      await this.safePublishRealtime(
        `wallet-core:wallet:${recipientWalletId}`,
        "wallet.business.transfer.received",
        payload
      )
    }

    if (operationId) {
      await this.safePublishRealtime(
        `wallet-core:operation:${operationId}`,
        "wallet.operation.completed",
        operation ?? {}
      )
    }
  }

  private async afterExecuteMerchantPayment(result: unknown) {
    const payload = asRecord(result)
    if (!payload) return

    const operation = asRecord(payload.operation)
    const merchantWallet = asRecord(payload.merchantWallet)

    const operationId = asOptionalString(operation?.id)
    const merchantWalletId = asOptionalString(merchantWallet?.id)
    const ownerUserId = asOptionalString(merchantWallet?.ownerUserId)

    await this.safeRecordActivity({
      userId: ownerUserId,
      type: "wallet.merchant.payment.completed",
      data: payload,
    })

    await this.safePushNotification({
      userId: ownerUserId,
      title: "Merchant payment received",
      body: "A merchant payment has been credited successfully.",
      data: payload,
    })

    if (ownerUserId) {
      await this.safePublishRealtime(
        `wallet-core:user:${ownerUserId}`,
        "wallet.merchant.payment.completed",
        payload
      )
    }

    if (merchantWalletId) {
      await this.safePublishRealtime(
        `wallet-core:wallet:${merchantWalletId}`,
        "wallet.merchant.payment.completed",
        payload
      )
    }

    if (operationId) {
      await this.safePublishRealtime(
        `wallet-core:operation:${operationId}`,
        "wallet.operation.completed",
        operation ?? {}
      )
    }
  }

  private async afterExecuteMerchantSettlement(result: unknown) {
    const payload = asRecord(result)
    if (!payload) return

    const operation = asRecord(payload.operation)
    const merchantWallet = asRecord(payload.merchantWallet)

    const operationId = asOptionalString(operation?.id)
    const merchantWalletId = asOptionalString(merchantWallet?.id)
    const ownerUserId = asOptionalString(merchantWallet?.ownerUserId)

    await this.safeRecordActivity({
      userId: ownerUserId,
      type: "wallet.merchant.settlement.completed",
      data: payload,
    })

    await this.safePushNotification({
      userId: ownerUserId,
      title: "Merchant settlement completed",
      body: "Settlement payout has been processed successfully.",
      data: payload,
    })

    if (ownerUserId) {
      await this.safePublishRealtime(
        `wallet-core:user:${ownerUserId}`,
        "wallet.merchant.settlement.completed",
        payload
      )
    }

    if (merchantWalletId) {
      await this.safePublishRealtime(
        `wallet-core:wallet:${merchantWalletId}`,
        "wallet.merchant.settlement.completed",
        payload
      )
    }

    if (operationId) {
      await this.safePublishRealtime(
        `wallet-core:operation:${operationId}`,
        "wallet.operation.completed",
        operation ?? {}
      )
    }
  }

  private extractIdempotencyKey(req: Request): string | undefined {
    const fromBody = asRecord(req.body)
      ? asOptionalString(asRecord(req.body)?.idempotencyKey) ??
        asOptionalString(asRecord(req.body)?.clientOperationId)
      : undefined

    if (fromBody) {
      return fromBody
    }

    const headerValue = req.headers["x-idempotency-key"]

    if (Array.isArray(headerValue)) {
      return asOptionalString(headerValue[0])
    }

    return asOptionalString(headerValue)
  }

  private async findExistingOperation(
    kind: "business_transfer" | "merchant_payment" | "merchant_settlement",
    idempotencyKey?: string
  ): Promise<WalletOperationEntitySnapshot | null> {
    if (!idempotencyKey) {
      return null
    }

    return this.hooks.findExistingOperationByKey?.(kind, idempotencyKey) ?? null
  }

  private withIdempotencyKey(result: unknown, idempotencyKey?: string): JsonRecord {
    const payload = asRecord(result) ?? {}

    if (!idempotencyKey) {
      return payload
    }

    return {
      ...payload,
      idempotencyKey,
    }
  }

  private async safePublishRealtime(
    channel: string,
    event: string,
    payload: Record<string, unknown>
  ) {
    try {
      await this.hooks.publishRealtime?.(channel, event, payload)
    } catch {
      // no-op
    }
  }

  private async safeRecordActivity(input: {
    userId?: string
    type: string
    data?: Record<string, unknown>
  }) {
    try {
      await this.hooks.recordActivity?.(input)
    } catch {
      // no-op
    }
  }

  private async safePushNotification(input: {
    userId?: string
    title: string
    body: string
    data?: Record<string, unknown>
  }) {
    try {
      await this.hooks.pushNotification?.(input)
    } catch {
      // no-op
    }
  }

  private async safeSyncLedger(
    kind: "business_transfer" | "merchant_payment" | "merchant_settlement",
    payload: Record<string, unknown>,
    idempotencyKey?: string
  ) {
    try {
      await this.hooks.syncLedger?.(kind, payload, idempotencyKey)
    } catch {
      // no-op
    }
  }

  private async safeSyncBusinessWalletCreate(
    wallet: BusinessWalletEntitySnapshot
  ) {
    try {
      await this.hooks.syncBusinessWalletCreate?.(wallet)
    } catch {
      // no-op
    }
  }

  private async safeSyncMerchantWalletCreate(
    wallet: MerchantWalletEntitySnapshot
  ) {
    try {
      await this.hooks.syncMerchantWalletCreate?.(wallet)
    } catch {
      // no-op
    }
  }

  private async safeValidateBusinessTransferExecution(input: {
    senderWalletId?: string
    senderDebit: number
  }) {
    try {
      await this.hooks.validateBusinessTransferExecution?.(input)
    } catch (error) {
      throw error
    }
  }

  private async safeValidateMerchantSettlementExecution(input: {
    merchantWalletId?: string
    merchantDebit: number
  }) {
    try {
      await this.hooks.validateMerchantSettlementExecution?.(input)
    } catch (error) {
      throw error
    }
  }

  private sendBadRequest(res: Response, reason: string) {
    return res.status(400).json({
      ok: false,
      reason,
    })
  }

  private sendNotFound(res: Response, reason: string) {
    return res.status(404).json({
      ok: false,
      reason,
    })
  }

  private sendError(res: Response, error: unknown) {
    const message = error instanceof Error ? error.message : "wallet_core_error"

    const status = this.isValidationError(message) ? 400 : 500

    return res.status(status).json({
      ok: false,
      reason: message,
    })
  }

  private isValidationError(message: string) {
    return (
      message.includes("invalid_input") ||
      message.endsWith("_required") ||
      message.includes("insufficient") ||
      message.includes("not_found")
    )
  }
}