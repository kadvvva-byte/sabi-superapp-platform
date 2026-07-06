import type { Application } from "express"
import { Prisma, PrismaClient } from "@prisma/client"
import type { Server } from "socket.io"

import { EventBus } from "../../core/events/event-bus"
import { IdempotencyService } from "../../core/idempotency/idempotency.service"

import walletRoutes from "./infrastructure/routes/wallet.routes"
import { buildQrRouter } from "./infrastructure/routes/qr.routes"
import { buildWalletCoreRouter } from "./infrastructure/routes/wallet-core.routes"
import { WalletCorePrismaCreateService } from "./infrastructure/services/wallet-core-prisma-create.service"
import { WalletCorePrismaGuardService } from "./infrastructure/services/wallet-core-prisma-guard.service"
import { WalletCorePrismaIdempotencyService } from "./infrastructure/services/wallet-core-prisma-idempotency.service"
import { WalletCorePrismaSyncService } from "./infrastructure/services/wallet-core-prisma-sync.service"
import { WalletCorePrismaWalletResolverService } from "./infrastructure/services/wallet-core-prisma-wallet-resolver.service"
import { WalletCorePrismaQueryService } from "./infrastructure/services/wallet-core-prisma-query.service"
import { WalletRouteFeePolicyService } from "./infrastructure/services/wallet-route-fee-policy.service"
import { CalculateServiceFeeUseCase } from "./application/use-cases/calculate-service-fee.use-case"
import { FeeDirection } from "./domain/constants/fee-direction"
import paymentRoutes from "../payment/infrastructure/routes/payment.routes"
import transactionRoutes from "./infrastructure/routes/transaction.routes"
import { PrismaWalletComplianceRepository } from "./infrastructure/persistence/prisma-wallet-compliance.repository"
import { connectWalletCompliancePersistence } from "./application/security/wallet-security-compliance.service"
import { buildWalletProviderConfigRouter } from "./infrastructure/routes/wallet-provider-config.routes"
import { walletProviderExecutionGuard } from "./application/provider/wallet-provider-execution.guard"

import {
  walletFacade,
  walletRuntime,
  walletRepositories,
} from "./wallet.runtime"

type CreateWalletModuleDeps = {
  prisma: PrismaClient
  eventBus: EventBus
  idempotencyService: IdempotencyService
  io: Server
}

export type WalletCoreBindings = {
  facade: typeof walletFacade
  runtime: typeof walletRuntime
  repositories: typeof walletRepositories
}

export type WalletModule = {
  core: WalletCoreBindings
  mount(app: Application): void
}

export const walletCore: WalletCoreBindings = {
  facade: walletFacade,
  runtime: walletRuntime,
  repositories: walletRepositories,
}

function toJsonValue(data?: Record<string, unknown>): Prisma.InputJsonValue {
  return (data ?? {}) as Prisma.InputJsonValue
}

export function createWalletModule(deps: CreateWalletModuleDeps): WalletModule {
  const prismaCreateService = new WalletCorePrismaCreateService(deps.prisma)
  const prismaGuardService = new WalletCorePrismaGuardService(deps.prisma)
  const prismaSyncService = new WalletCorePrismaSyncService(deps.prisma)
  const prismaWalletResolverService = new WalletCorePrismaWalletResolverService(
    deps.prisma
  )
  const prismaQueryService = new WalletCorePrismaQueryService(deps.prisma)
  const prismaIdempotencyService = new WalletCorePrismaIdempotencyService(
    prismaQueryService
  )
  const walletRouteFeePolicyService = new WalletRouteFeePolicyService()
  const calculateServiceFeeUseCase = new CalculateServiceFeeUseCase()
  const walletComplianceRepository = new PrismaWalletComplianceRepository(deps.prisma)
  const walletProviderConfigRouter = buildWalletProviderConfigRouter()

  connectWalletCompliancePersistence(walletComplianceRepository)

  const walletCoreRouter = buildWalletCoreRouter({
    facade: walletCore.facade,
    publishRealtime: async (channel, event, payload) => {
      deps.io.to(channel).emit(event, payload)
    },
    recordActivity: async (input) => {
      if (!input.userId) return

      await deps.prisma.activityFeed.create({
        data: {
          userId: input.userId,
          type: input.type,
          data: toJsonValue(input.data),
        },
      })
    },
    pushNotification: async (input) => {
      if (!input.userId) return

      if (typeof deps.eventBus.publish === "function") {
        await deps.eventBus.publish("notification.dispatch.requested", {
          userId: input.userId,
          title: input.title,
          body: input.body,
          data: input.data ?? {},
        })
      }
    },
    syncLedger: async (kind, payload, idempotencyKey) => {
      const forcedOperationId = idempotencyKey
        ? prismaIdempotencyService.composeOperationId(kind, idempotencyKey)
        : undefined

      if (kind === "business_transfer") {
        await prismaSyncService.syncBusinessTransfer(payload, forcedOperationId)
        return
      }

      if (kind === "merchant_payment") {
        await prismaSyncService.syncMerchantPayment(payload, forcedOperationId)
        return
      }

      await prismaSyncService.syncMerchantSettlement(payload, forcedOperationId)
    },
    syncBusinessWalletCreate: async (wallet) => {
      await prismaCreateService.ensureBusinessWallet(wallet)
    },
    syncMerchantWalletCreate: async (wallet) => {
      await prismaCreateService.ensureMerchantWallet(wallet)
    },
    validateBusinessTransferExecution: async (input) => {
      await prismaGuardService.assertBusinessTransferCanExecute(input)
    },
    validateMerchantSettlementExecution: async (input) => {
      await prismaGuardService.assertMerchantSettlementCanExecute(input)
    },
    findExistingOperationByKey: async (kind, idempotencyKey) => {
      return prismaIdempotencyService.findExistingOperation(
        kind,
        idempotencyKey
      )
    },
    resolveBusinessWallet: async (walletId, seed) => {
      return prismaWalletResolverService.resolveBusinessWalletById(
        walletId,
        seed
      )
    },
    resolveMerchantWallet: async (walletId, seed) => {
      return prismaWalletResolverService.resolveMerchantWalletById(
        walletId,
        seed
      )
    },
    getBusinessWalletById: async (walletId) => {
      return prismaQueryService.getBusinessWalletById(walletId)
    },
    getMerchantWalletById: async (walletId) => {
      return prismaQueryService.getMerchantWalletById(walletId)
    },
    getWalletOperationById: async (operationId) => {
      return prismaQueryService.getWalletOperationById(operationId)
    },
    listWalletOperationsByWalletId: async (walletId) => {
      return prismaQueryService.listWalletOperationsByWalletId(walletId)
    },
  })

  const qrRouter = buildQrRouter({
    prisma: deps.prisma,
    eventBus: deps.eventBus,
    idempotencyService: deps.idempotencyService,
    executeWalletRoute: async (input) => {
      if (!input.payerWalletId || !input.receiverWalletId) {
        return {
          ok: false,
          status: "failed",
          reason: "missing_wallet_route_participants",
        } as const
      }

      const rawAmount = Number(input.amount ?? "0")

      if (!Number.isFinite(rawAmount) || rawAmount <= 0) {
        return {
          ok: false,
          status: "failed",
          reason: "invalid_qr_amount",
        } as const
      }

      try {
        walletProviderExecutionGuard.assertQrRouteReady(input.route)
      } catch (error) {
        const reason = error instanceof Error ? error.message : "wallet_provider_not_ready"

        return {
          ok: false,
          status: "failed",
          reason,
          providerExecutionGuard: "blocked",
          tokenOnlyStorage: true,
          panStorageAllowed: false,
          cvvStorageAllowed: false,
        } as const
      }

      const currency = input.currency ?? "USD"
      const feePolicy = walletRouteFeePolicyService.resolve(
        input.route,
        currency
      )
      const feeResult = calculateServiceFeeUseCase.execute({
        amount: rawAmount,
        currency,
        operationType: walletRouteFeePolicyService.resolveOperationType(
          input.route
        ),
        policy: feePolicy,
      })

      const baseAmount = new Prisma.Decimal(feeResult.amount)
      const feeAmount = new Prisma.Decimal(feeResult.fee)
      const payerDebitAmount = new Prisma.Decimal(feeResult.senderDebit)
      const recipientCreditAmount = new Prisma.Decimal(feeResult.recipientCredit)

      if (payerDebitAmount.lte(0) || recipientCreditAmount.lt(0)) {
        return {
          ok: false,
          status: "failed",
          reason: "invalid_qr_fee_calculation",
        } as const
      }

      try {
        const transaction = await deps.prisma.$transaction(async (tx) => {
          const payerUpdated = await tx.walletBalance.updateMany({
            where: {
              walletId: input.payerWalletId,
              balance: {
                gte: payerDebitAmount,
              },
            },
            data: {
              balance: {
                decrement: payerDebitAmount,
              },
            },
          })

          if (payerUpdated.count !== 1) {
            throw new Error("insufficient_wallet_balance")
          }

          if (feeResult.direction === FeeDirection.INCOMING) {
            await tx.walletBalance.upsert({
              where: { walletId: input.receiverWalletId },
              update: {
                balance: {
                  increment: baseAmount,
                },
              },
              create: {
                walletId: input.receiverWalletId,
                balance: baseAmount,
              },
            })

            if (feeAmount.gt(0)) {
              await tx.walletBalance.update({
                where: { walletId: input.receiverWalletId },
                data: {
                  balance: {
                    decrement: feeAmount,
                  },
                },
              })
            }
          } else {
            await tx.walletBalance.upsert({
              where: { walletId: input.receiverWalletId },
              update: {
                balance: {
                  increment: recipientCreditAmount,
                },
              },
              create: {
                walletId: input.receiverWalletId,
                balance: recipientCreditAmount,
              },
            })
          }

          const createdTransaction = await tx.transaction.create({
            data: {
              walletId: input.payerWalletId,
              fromWalletId: input.payerWalletId,
              toWalletId: input.receiverWalletId,
              reference: input.reference,
              amount: baseAmount,
              type:
                input.route === "coin_send" || input.route === "coin_receive"
                  ? "TRANSFER"
                  : "PAYMENT",
              status: "SUCCESS",
            },
          })

          const ledgerRows: Prisma.LedgerEntryCreateManyInput[] = [
            {
              walletId: input.payerWalletId,
              transactionId: createdTransaction.id,
              amount: baseAmount,
              type: "DEBIT",
              operationType: "QR_PAYMENT",
              uniqueOperationId: `qr:${createdTransaction.id}:principal:debit`,
            },
            {
              walletId: input.receiverWalletId,
              transactionId: createdTransaction.id,
              amount: baseAmount,
              type: "CREDIT",
              operationType: "QR_PAYMENT",
              uniqueOperationId: `qr:${createdTransaction.id}:principal:credit`,
            },
          ]

          if (feeAmount.gt(0)) {
            if (feeResult.direction === FeeDirection.OUTGOING) {
              ledgerRows.push({
                walletId: input.payerWalletId,
                transactionId: createdTransaction.id,
                amount: feeAmount,
                type: "DEBIT",
                operationType: "QR_PAYMENT",
                uniqueOperationId: `qr:${createdTransaction.id}:fee:debit`,
              })
            } else {
              ledgerRows.push({
                walletId: input.receiverWalletId,
                transactionId: createdTransaction.id,
                amount: feeAmount,
                type: "DEBIT",
                operationType: "QR_PAYMENT",
                uniqueOperationId: `qr:${createdTransaction.id}:fee:debit`,
              })
            }
          }

          await tx.ledgerEntry.createMany({
            data: ledgerRows,
          })

          await tx.qrOperation.create({
            data: {
              rail: input.rail,
              domain: "payment",
              payloadType:
                input.route === "coin_receive"
                  ? "coin_receive"
                  : input.route === "coin_send"
                    ? "coin_send"
                    : input.route === "sabi_user_transfer"
                      ? "user_transfer"
                      : "merchant_payment",
              route: input.route,
              payerWalletId: input.payerWalletId,
              receiverWalletId: input.receiverWalletId,
              amount: baseAmount,
              currency,
              status: "executed",
              reference: input.reference,
              transactionId: createdTransaction.id,
              metadata: {
                rawPayload: input.rawPayload ?? null,
                providerExecutionGuard: "ready",
                tokenOnlyStorage: true,
                panStorageAllowed: false,
                cvvStorageAllowed: false,
                serviceFee: feeResult.fee,
                serviceFeeDirection: feeResult.direction,
                senderDebit: feeResult.senderDebit,
                recipientCredit: feeResult.recipientCredit,
                percentFee: feeResult.percentFee,
                percent: feeResult.percent,
                flatFee: feeResult.flatFee,
              },
            },
          })

          return createdTransaction
        })

        return {
          ok: true,
          status: "success",
          transactionId: transaction.id,
          fee: feeResult.fee,
          senderDebit: feeResult.senderDebit,
          recipientCredit: feeResult.recipientCredit,
        } as const
      } catch (error) {
        return {
          ok: false,
          status: "failed",
          reason:
            error instanceof Error
              ? error.message
              : "qr_wallet_execution_failed",
        } as const
      }
    },
    publishRealtime: async (channel, event, payload) => {
      deps.io.to(channel).emit(event, payload)
    },
    recordActivity: async (input) => {
      if (!input.userId) return

      await deps.prisma.activityFeed.create({
        data: {
          userId: input.userId,
          type: input.type,
          data: toJsonValue(input.data),
        },
      })
    },
    pushNotification: async (input) => {
      if (!input.userId) return

      if (typeof deps.eventBus.publish === "function") {
        await deps.eventBus.publish("notification.dispatch.requested", {
          userId: input.userId,
          title: input.title,
          body: input.body,
          data: input.data ?? {},
        })
      }
    },
  })

  return {
    core: walletCore,
    mount(app: Application) {
      app.use("/api/wallet-core", walletCoreRouter)
      app.use("/api/wallet", walletRoutes)
      app.use("/api/qr", qrRouter)
      app.use("/api/payment", paymentRoutes)
      app.use("/api/wallet/provider-config", walletProviderConfigRouter)
      app.use("/api", transactionRoutes)
    },
  }
}

export const buildWalletModule = createWalletModule