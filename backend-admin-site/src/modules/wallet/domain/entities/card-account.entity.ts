import { DomainError } from "@/core/kernel"
import { CardCategory } from "../constants/card-category"
import { WalletOwnerType } from "../constants/wallet-owner-type"
import { WalletAccountEntity } from "./wallet-account.entity"
import {
  assertNoForbiddenWalletCardData,
  evaluateWalletProviderDomainReadiness,
  isLikelyRawPan,
  type WalletProviderFamily,
  type WalletProviderTokenStatus,
} from "../../application/security/wallet-provider-domain.policy"

type CardAccountStatus = "PENDING" | "ACTIVE" | "BLOCKED" | "CLOSED"

type CardAccountProps = {
  ownerUserId: string
  ownerType: WalletOwnerType
  balance: number
  currency: string
  status: CardAccountStatus
  displayName?: string | null
  businessId?: string | null
  merchantId?: string | null
  cardCategory: CardCategory
  maskedPan: string
  network?: string | null
  provider?: string | null
  providerId?: string | null
  providerFamily: WalletProviderFamily
  providerTokenId?: string | null
  providerTokenStatus: WalletProviderTokenStatus
  providerCustomerId?: string | null
  providerCardId?: string | null
  providerReference?: string | null
  tokenizedAt?: Date | null
  tokenExpiresAt?: Date | null
  isPrimary: boolean
  isVirtual: boolean
  supportsLocal: boolean
  supportsInternational: boolean
  createdAt?: Date
  updatedAt?: Date
}

type CardAccountConstructorParams = {
  id: string
  ownerUserId: string
  ownerType?: WalletOwnerType
  balance?: number
  currency?: string
  status?: CardAccountStatus
  displayName?: string | null
  businessId?: string | null
  merchantId?: string | null
  cardCategory: CardCategory
  maskedPan: string
  network?: string | null
  provider?: string | null
  providerId?: string | null
  providerFamily?: WalletProviderFamily | null
  providerTokenId?: string | null
  providerTokenStatus?: WalletProviderTokenStatus | null
  providerCustomerId?: string | null
  providerCardId?: string | null
  providerReference?: string | null
  tokenizedAt?: Date | null
  tokenExpiresAt?: Date | null
  isPrimary?: boolean
  isVirtual?: boolean
  supportsLocal?: boolean
  supportsInternational?: boolean
  rawProviderPayload?: Record<string, unknown> | null
  createdAt?: Date
  updatedAt?: Date
}

function normalizeNullable(value: string | null | undefined) {
  return value?.trim() || null
}

function normalizeTokenStatus(
  value: WalletProviderTokenStatus | null | undefined,
): WalletProviderTokenStatus {
  return value ?? "UNKNOWN"
}

function assertMaskedPanOnly(maskedPan: string) {
  const value = maskedPan.trim()

  if (!value) {
    throw new DomainError("Masked PAN is required.")
  }

  if (isLikelyRawPan(value)) {
    throw new DomainError("Raw PAN is blocked. Store masked PAN only.", {
      panStorageAllowed: false,
      cvvStorageAllowed: false,
      tokenOnly: true,
    })
  }

  const hasMask = /[*•xX]/.test(value)
  const hasLast4 = /\d{4}$/.test(value.replace(/\s/g, ""))

  if (!hasMask && !hasLast4) {
    throw new DomainError("Masked PAN must be masked or last4-only.")
  }
}

export class CardAccountEntity extends WalletAccountEntity<
  CardAccountProps & {
    productType: "CARD"
    accountKind: "CARD_ACCOUNT"
  }
> {
  constructor(params: CardAccountConstructorParams) {
    assertMaskedPanOnly(params.maskedPan)
    assertNoForbiddenWalletCardData(params.rawProviderPayload ?? null)
    assertNoForbiddenWalletCardData(params)

    const status = params.status ?? "PENDING"
    const providerId = normalizeNullable(params.providerId ?? params.provider)
    const providerTokenId = normalizeNullable(params.providerTokenId)
    const providerTokenStatus = normalizeTokenStatus(params.providerTokenStatus)
    const providerFamily = params.providerFamily ?? "bank"

    const readiness = evaluateWalletProviderDomainReadiness({
      providerId,
      providerTokenId,
      providerTokenStatus,
      providerFamily,
      payload: params.rawProviderPayload ?? null,
    })

    if (status === "ACTIVE" && !readiness.allowed) {
      throw new DomainError("Active card account requires verified bank/provider token.", {
        reasonCode: readiness.reasonCode,
        providerStatus: readiness.status,
        tokenOnly: true,
        panStorageAllowed: false,
        cvvStorageAllowed: false,
      })
    }

    super(params.id, {
      ownerUserId: params.ownerUserId,
      ownerType: params.ownerType ?? "PERSONAL",
      productType: "CARD",
      accountKind: "CARD_ACCOUNT",
      balance: params.balance ?? 0,
      currency: (params.currency ?? "USD").trim().toUpperCase(),
      status,
      displayName: params.displayName ?? null,
      businessId: params.businessId ?? null,
      merchantId: params.merchantId ?? null,
      cardCategory: params.cardCategory,
      maskedPan: params.maskedPan.trim(),
      network: normalizeNullable(params.network),
      provider: providerId,
      providerId,
      providerFamily,
      providerTokenId,
      providerTokenStatus,
      providerCustomerId: normalizeNullable(params.providerCustomerId),
      providerCardId: normalizeNullable(params.providerCardId),
      providerReference: normalizeNullable(params.providerReference),
      tokenizedAt: params.tokenizedAt ?? null,
      tokenExpiresAt: params.tokenExpiresAt ?? null,
      isPrimary: params.isPrimary ?? false,
      isVirtual: params.isVirtual ?? params.cardCategory === "VIRTUAL_CARD",
      supportsLocal:
        params.supportsLocal ??
        (params.cardCategory === "LOCAL_CARD" ||
          params.cardCategory === "LOCAL_GLOBAL_CARD"),
      supportsInternational:
        params.supportsInternational ??
        (params.cardCategory === "INTERNATIONAL_CARD" ||
          params.cardCategory === "LOCAL_GLOBAL_CARD" ||
          params.cardCategory === "VIRTUAL_CARD"),
      createdAt: params.createdAt,
      updatedAt: params.updatedAt,
    })
  }

  public get cardCategory(): CardCategory {
    return this.props.cardCategory
  }

  public get maskedPan(): string {
    return this.props.maskedPan
  }

  public get network(): string | null | undefined {
    return this.props.network
  }

  public get provider(): string | null | undefined {
    return this.props.provider
  }

  public get providerId(): string | null | undefined {
    return this.props.providerId
  }

  public get providerFamily(): WalletProviderFamily {
    return this.props.providerFamily
  }

  public get providerTokenId(): string | null | undefined {
    return this.props.providerTokenId
  }

  public get providerTokenStatus(): WalletProviderTokenStatus {
    return this.props.providerTokenStatus
  }

  public get providerCustomerId(): string | null | undefined {
    return this.props.providerCustomerId
  }

  public get providerCardId(): string | null | undefined {
    return this.props.providerCardId
  }

  public get providerReference(): string | null | undefined {
    return this.props.providerReference
  }

  public get tokenizedAt(): Date | null | undefined {
    return this.props.tokenizedAt
  }

  public get tokenExpiresAt(): Date | null | undefined {
    return this.props.tokenExpiresAt
  }

  public get isPrimary(): boolean {
    return this.props.isPrimary
  }

  public get isVirtual(): boolean {
    return this.props.isVirtual
  }

  public get supportsLocal(): boolean {
    return this.props.supportsLocal
  }

  public get supportsInternational(): boolean {
    return this.props.supportsInternational
  }

  public isProviderVerified(): boolean {
    return Boolean(this.providerId?.trim() && this.providerTokenId?.trim()) &&
      this.providerTokenStatus === "VERIFIED"
  }

  public assertOperationalCard(): void {
    if (!this.isActive()) {
      throw new DomainError("Card account is not active.")
    }

    if (!this.isProviderVerified()) {
      throw new DomainError("Verified provider token is required for card operation.", {
        providerId: this.providerId ?? null,
        providerTokenId: this.providerTokenId ?? null,
        providerTokenStatus: this.providerTokenStatus,
        tokenOnly: true,
        panStorageAllowed: false,
        cvvStorageAllowed: false,
      })
    }
  }

  public markProviderVerified(input: {
    providerId: string
    providerTokenId: string
    providerReference?: string | null
    providerCustomerId?: string | null
    providerCardId?: string | null
    tokenizedAt?: Date | null
    tokenExpiresAt?: Date | null
  }): void {
    if (!input.providerId?.trim() || !input.providerTokenId?.trim()) {
      throw new DomainError("Provider id and token id are required.")
    }

    this.props.provider = input.providerId.trim()
    this.props.providerId = input.providerId.trim()
    this.props.providerTokenId = input.providerTokenId.trim()
    this.props.providerTokenStatus = "VERIFIED"
    this.props.providerReference = normalizeNullable(input.providerReference)
    this.props.providerCustomerId = normalizeNullable(input.providerCustomerId)
    this.props.providerCardId = normalizeNullable(input.providerCardId)
    this.props.tokenizedAt = input.tokenizedAt ?? new Date()
    this.props.tokenExpiresAt = input.tokenExpiresAt ?? null
    this.touch()
  }

  public markPrimary(): void {
    this.assertOperationalCard()
    this.props.isPrimary = true
    this.touch()
  }

  public unmarkPrimary(): void {
    this.props.isPrimary = false
    this.touch()
  }

  public deposit(amount: number): void {
    this.assertOperationalCard()
    this.credit(amount)
  }

  public withdraw(amount: number): void {
    this.assertOperationalCard()
    this.debit(amount)
  }

  public toJSON() {
    return {
      ...super.toJSON(),
      cardCategory: this.cardCategory,
      maskedPan: this.maskedPan,
      network: this.network ?? null,
      provider: this.provider ?? null,
      providerId: this.providerId ?? null,
      providerFamily: this.providerFamily,
      providerTokenId: this.providerTokenId ?? null,
      providerTokenStatus: this.providerTokenStatus,
      providerCustomerId: this.providerCustomerId ?? null,
      providerCardId: this.providerCardId ?? null,
      providerReference: this.providerReference ?? null,
      tokenizedAt: this.tokenizedAt ?? null,
      tokenExpiresAt: this.tokenExpiresAt ?? null,
      isPrimary: this.isPrimary,
      isVirtual: this.isVirtual,
      supportsLocal: this.supportsLocal,
      supportsInternational: this.supportsInternational,
      tokenOnly: true,
      panStorageAllowed: false,
      cvvStorageAllowed: false,
    }
  }
}
