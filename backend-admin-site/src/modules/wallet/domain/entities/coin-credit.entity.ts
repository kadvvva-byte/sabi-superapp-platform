import { AggregateRoot, DomainError, UniqueId } from "@/core/kernel"
import { CoinCreditStatus } from "../constants/coin-credit-status"
import { COIN_CREDIT_ANNUAL_RATE } from "../constants/coin-product-rates"

type CoinCreditProps = {
  coinWalletId: string
  ownerUserId: string
  principalAmount: number
  annualRate: number
  termMonths: number
  status: CoinCreditStatus
  requestedAt: Date
  approvedAt?: Date | null
  disbursedAt?: Date | null
  rejectedAt?: Date | null
  closedAt?: Date | null
  maturityAt?: Date | null
  rejectionReason?: string | null
  createdAt?: Date
  updatedAt?: Date
}

function addMonths(date: Date, months: number): Date {
  const next = new Date(date.getTime())
  next.setMonth(next.getMonth() + months)
  return next
}

export class CoinCreditEntity extends AggregateRoot<CoinCreditProps> {
  constructor(params: {
    id: string
    coinWalletId: string
    ownerUserId: string
    principalAmount: number
    termMonths: number
    annualRate?: number
    status?: CoinCreditStatus
    requestedAt?: Date
    approvedAt?: Date | null
    disbursedAt?: Date | null
    rejectedAt?: Date | null
    closedAt?: Date | null
    maturityAt?: Date | null
    rejectionReason?: string | null
    createdAt?: Date
    updatedAt?: Date
  }) {
    if (!params.id?.trim()) {
      throw new DomainError("Coin credit id is required.")
    }

    if (!params.coinWalletId?.trim()) {
      throw new DomainError("Coin wallet id is required.")
    }

    if (!params.ownerUserId?.trim()) {
      throw new DomainError("Coin credit owner user id is required.")
    }

    if (!Number.isFinite(params.principalAmount) || params.principalAmount <= 0) {
      throw new DomainError("Coin credit principal amount must be greater than zero.")
    }

    if (!Number.isInteger(params.termMonths) || params.termMonths <= 0) {
      throw new DomainError("Coin credit term months must be greater than zero.")
    }

    super(
      {
        coinWalletId: params.coinWalletId,
        ownerUserId: params.ownerUserId,
        principalAmount: params.principalAmount,
        annualRate: params.annualRate ?? COIN_CREDIT_ANNUAL_RATE,
        termMonths: params.termMonths,
        status: params.status ?? "REQUESTED",
        requestedAt: params.requestedAt ?? new Date(),
        approvedAt: params.approvedAt ?? null,
        disbursedAt: params.disbursedAt ?? null,
        rejectedAt: params.rejectedAt ?? null,
        closedAt: params.closedAt ?? null,
        maturityAt: params.maturityAt ?? null,
        rejectionReason: params.rejectionReason ?? null,
        createdAt: params.createdAt,
        updatedAt: params.updatedAt,
      },
      UniqueId.create(params.id),
    )
  }

  public get creditId(): string {
    return this.id.toString()
  }

  public get coinWalletId(): string {
    return this.props.coinWalletId
  }

  public get ownerUserId(): string {
    return this.props.ownerUserId
  }

  public get principalAmount(): number {
    return this.props.principalAmount
  }

  public get annualRate(): number {
    return this.props.annualRate
  }

  public get termMonths(): number {
    return this.props.termMonths
  }

  public get status(): CoinCreditStatus {
    return this.props.status
  }

  public get requestedAt(): Date {
    return this.props.requestedAt
  }

  public get approvedAt(): Date | null | undefined {
    return this.props.approvedAt
  }

  public get disbursedAt(): Date | null | undefined {
    return this.props.disbursedAt
  }

  public get rejectedAt(): Date | null | undefined {
    return this.props.rejectedAt
  }

  public get closedAt(): Date | null | undefined {
    return this.props.closedAt
  }

  public get maturityAt(): Date | null | undefined {
    return this.props.maturityAt
  }

  public approve(at: Date = new Date()): void {
    if (this.props.status !== "REQUESTED") {
      throw new DomainError("Only requested coin credit can be approved.")
    }

    this.props.status = "APPROVED"
    this.props.approvedAt = at
    this.props.rejectionReason = null
    this.touch()
  }

  public reject(reason?: string, at: Date = new Date()): void {
    if (this.props.status !== "REQUESTED") {
      throw new DomainError("Only requested coin credit can be rejected.")
    }

    this.props.status = "REJECTED"
    this.props.rejectedAt = at
    this.props.rejectionReason = reason?.trim() || null
    this.touch()
  }

  public disburse(at: Date = new Date()): void {
    if (this.props.status !== "APPROVED") {
      throw new DomainError("Only approved coin credit can be disbursed.")
    }

    this.props.status = "ACTIVE"
    this.props.disbursedAt = at
    this.props.maturityAt = addMonths(at, this.props.termMonths)
    this.touch()
  }

  public close(at: Date = new Date()): void {
    if (this.props.status !== "ACTIVE") {
      throw new DomainError("Only active coin credit can be closed.")
    }

    this.props.status = "CLOSED"
    this.props.closedAt = at
    this.touch()
  }

  public markDefaulted(): void {
    if (this.props.status !== "ACTIVE") {
      throw new DomainError("Only active coin credit can be defaulted.")
    }

    this.props.status = "DEFAULTED"
    this.touch()
  }

  public calculateSimpleInterest(): number {
    return this.props.principalAmount * this.props.annualRate * (this.props.termMonths / 12)
  }

  public calculateTotalRepayment(): number {
    return this.props.principalAmount + this.calculateSimpleInterest()
  }

  public toJSON() {
    return {
      id: this.creditId,
      coinWalletId: this.coinWalletId,
      ownerUserId: this.ownerUserId,
      principalAmount: this.principalAmount,
      annualRate: this.annualRate,
      termMonths: this.termMonths,
      status: this.status,
      requestedAt: this.requestedAt,
      approvedAt: this.approvedAt ?? null,
      disbursedAt: this.disbursedAt ?? null,
      rejectedAt: this.rejectedAt ?? null,
      closedAt: this.closedAt ?? null,
      maturityAt: this.maturityAt ?? null,
      rejectionReason: this.props.rejectionReason ?? null,
      totalRepayment: this.calculateTotalRepayment(),
      createdAt: this.createdAt ?? null,
      updatedAt: this.updatedAt ?? null,
    }
  }
}