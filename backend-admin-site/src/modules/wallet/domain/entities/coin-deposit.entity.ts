import { AggregateRoot, DomainError, UniqueId } from "@/core/kernel"
import { CoinDepositStatus } from "../constants/coin-deposit-status"
import {
  COIN_DEPOSIT_ANNUAL_RATE,
  COIN_DEPOSIT_MAX_TERM_MONTHS,
  COIN_DEPOSIT_MIN_TERM_MONTHS,
} from "../constants/coin-product-rates"

type CoinDepositProps = {
  coinWalletId: string
  ownerUserId: string
  principalAmount: number
  annualRate: number
  termMonths: number
  accruedInterest: number
  creditedInterest: number
  status: CoinDepositStatus
  openedAt: Date
  maturityAt: Date
  lastAccruedAt: Date
  closedAt?: Date | null
  createdAt?: Date
  updatedAt?: Date
}

function roundAmount(value: number): number {
  return Math.round(value * 1e8) / 1e8
}

function addMonths(date: Date, months: number): Date {
  const next = new Date(date.getTime())
  next.setMonth(next.getMonth() + months)
  return next
}

export class CoinDepositEntity extends AggregateRoot<CoinDepositProps> {
  constructor(params: {
    id: string
    coinWalletId: string
    ownerUserId: string
    principalAmount: number
    termMonths: number
    openedAt?: Date
    annualRate?: number
    accruedInterest?: number
    creditedInterest?: number
    status?: CoinDepositStatus
    maturityAt?: Date
    lastAccruedAt?: Date
    closedAt?: Date | null
    createdAt?: Date
    updatedAt?: Date
  }) {
    if (!params.id?.trim()) {
      throw new DomainError("Coin deposit id is required.")
    }

    if (!params.coinWalletId?.trim()) {
      throw new DomainError("Coin wallet id is required.")
    }

    if (!params.ownerUserId?.trim()) {
      throw new DomainError("Coin deposit owner user id is required.")
    }

    if (!Number.isFinite(params.principalAmount) || params.principalAmount <= 0) {
      throw new DomainError("Coin deposit principal amount must be greater than zero.")
    }

    if (
      !Number.isInteger(params.termMonths) ||
      params.termMonths < COIN_DEPOSIT_MIN_TERM_MONTHS ||
      params.termMonths > COIN_DEPOSIT_MAX_TERM_MONTHS
    ) {
      throw new DomainError(
        `Coin deposit term must be between ${COIN_DEPOSIT_MIN_TERM_MONTHS} and ${COIN_DEPOSIT_MAX_TERM_MONTHS} months.`,
      )
    }

    const openedAt = params.openedAt ?? new Date()
    const annualRate = params.annualRate ?? COIN_DEPOSIT_ANNUAL_RATE
    const maturityAt = params.maturityAt ?? addMonths(openedAt, params.termMonths)

    super(
      {
        coinWalletId: params.coinWalletId,
        ownerUserId: params.ownerUserId,
        principalAmount: roundAmount(params.principalAmount),
        annualRate,
        termMonths: params.termMonths,
        accruedInterest: roundAmount(params.accruedInterest ?? 0),
        creditedInterest: roundAmount(params.creditedInterest ?? 0),
        status: params.status ?? "ACTIVE",
        openedAt,
        maturityAt,
        lastAccruedAt: params.lastAccruedAt ?? openedAt,
        closedAt: params.closedAt ?? null,
        createdAt: params.createdAt,
        updatedAt: params.updatedAt,
      },
      UniqueId.create(params.id),
    )
  }

  public get depositId(): string {
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

  public get accruedInterest(): number {
    return this.props.accruedInterest
  }

  public get creditedInterest(): number {
    return this.props.creditedInterest
  }

  public get status(): CoinDepositStatus {
    return this.props.status
  }

  public get openedAt(): Date {
    return this.props.openedAt
  }

  public get maturityAt(): Date {
    return this.props.maturityAt
  }

  public get lastAccruedAt(): Date {
    return this.props.lastAccruedAt
  }

  public get closedAt(): Date | null | undefined {
    return this.props.closedAt
  }

  public isActive(): boolean {
    return this.props.status === "ACTIVE"
  }

  public isMatured(at = new Date()): boolean {
    return at.getTime() >= this.props.maturityAt.getTime()
  }

  public accrueUntil(at: Date = new Date()): number {
    if (!this.isActive()) {
      return 0
    }

    const cappedAt =
      at.getTime() > this.props.maturityAt.getTime() ? this.props.maturityAt : at

    const elapsedMs = cappedAt.getTime() - this.props.lastAccruedAt.getTime()

    if (elapsedMs <= 0) {
      return 0
    }

    const elapsedDays = elapsedMs / (1000 * 60 * 60 * 24)
    const interest =
      this.props.principalAmount * this.props.annualRate * (elapsedDays / 365)

    const rounded = roundAmount(interest)

    this.props.accruedInterest = roundAmount(this.props.accruedInterest + rounded)
    this.props.lastAccruedAt = cappedAt

    if (this.isMatured(cappedAt)) {
      this.props.status = "MATURED"
    }

    this.touch()

    return rounded
  }

  public markInterestCredited(amount: number): void {
    if (!Number.isFinite(amount) || amount < 0) {
      throw new DomainError("Credited interest amount cannot be negative.")
    }

    if (amount > this.props.accruedInterest) {
      throw new DomainError("Credited interest exceeds accrued interest.")
    }

    this.props.accruedInterest = roundAmount(this.props.accruedInterest - amount)
    this.props.creditedInterest = roundAmount(this.props.creditedInterest + amount)
    this.touch()
  }

  public close(at: Date = new Date()): void {
    if (!this.isMatured(at)) {
      throw new DomainError("Coin deposit cannot be closed before maturity.")
    }

    this.props.status = "CLOSED"
    this.props.closedAt = at
    this.touch()
  }

  public toJSON() {
    return {
      id: this.depositId,
      coinWalletId: this.coinWalletId,
      ownerUserId: this.ownerUserId,
      principalAmount: this.principalAmount,
      annualRate: this.annualRate,
      termMonths: this.termMonths,
      accruedInterest: this.accruedInterest,
      creditedInterest: this.creditedInterest,
      status: this.status,
      openedAt: this.openedAt,
      maturityAt: this.maturityAt,
      lastAccruedAt: this.lastAccruedAt,
      closedAt: this.closedAt ?? null,
      createdAt: this.createdAt ?? null,
      updatedAt: this.updatedAt ?? null,
    }
  }
}