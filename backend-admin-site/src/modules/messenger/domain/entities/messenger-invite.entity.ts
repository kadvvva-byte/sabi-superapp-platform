export type MessengerInviteProps = {
  id: string
  roomId: string
  code: string
  createdByUserId: string
  createdAt: Date
  updatedAt: Date
  targetUserId?: string | null
  expiresAt?: Date | null
  revokedAt?: Date | null
  maxUses?: number | null
  usesCount?: number
}

export class MessengerInviteEntity {
  private props: Required<
    Omit<
      MessengerInviteProps,
      "targetUserId" | "expiresAt" | "revokedAt" | "maxUses" | "usesCount"
    >
  > & {
    targetUserId: string | null
    expiresAt: Date | null
    revokedAt: Date | null
    maxUses: number | null
    usesCount: number
  }

  constructor(props: MessengerInviteProps) {
    this.props = {
      ...props,
      targetUserId: props.targetUserId ?? null,
      expiresAt: props.expiresAt ?? null,
      revokedAt: props.revokedAt ?? null,
      maxUses: props.maxUses ?? null,
      usesCount: props.usesCount ?? 0,
    }
  }

  get id(): string {
    return this.props.id
  }

  get roomId(): string {
    return this.props.roomId
  }

  get code(): string {
    return this.props.code
  }

  get createdByUserId(): string {
    return this.props.createdByUserId
  }

  get createdAt(): Date {
    return this.props.createdAt
  }

  get updatedAt(): Date {
    return this.props.updatedAt
  }

  get targetUserId(): string | null {
    return this.props.targetUserId
  }

  get expiresAt(): Date | null {
    return this.props.expiresAt
  }

  get revokedAt(): Date | null {
    return this.props.revokedAt
  }

  get maxUses(): number | null {
    return this.props.maxUses
  }

  get usesCount(): number {
    return this.props.usesCount
  }

  isRevoked(): boolean {
    return this.props.revokedAt !== null
  }

  isExpired(now = new Date()): boolean {
    if (!this.props.expiresAt) return false
    return this.props.expiresAt.getTime() <= now.getTime()
  }

  isExhausted(): boolean {
    if (this.props.maxUses === null) return false
    return this.props.usesCount >= this.props.maxUses
  }

  isActive(now = new Date()): boolean {
    return !this.isRevoked() && !this.isExpired(now) && !this.isExhausted()
  }

  revoke(): void {
    this.props.revokedAt = new Date()
    this.touch()
  }

  incrementUse(): void {
    this.props.usesCount += 1
    this.touch()
  }

  private touch(): void {
    this.props.updatedAt = new Date()
  }

  toJSON() {
    return {
      id: this.props.id,
      roomId: this.props.roomId,
      code: this.props.code,
      createdByUserId: this.props.createdByUserId,
      createdAt: this.props.createdAt,
      updatedAt: this.props.updatedAt,
      targetUserId: this.props.targetUserId,
      expiresAt: this.props.expiresAt,
      revokedAt: this.props.revokedAt,
      maxUses: this.props.maxUses,
      usesCount: this.props.usesCount,
    }
  }
}