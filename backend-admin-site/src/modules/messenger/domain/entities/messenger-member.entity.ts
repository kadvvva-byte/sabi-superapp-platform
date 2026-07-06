import type { MessengerMemberRole } from "../types/messenger-member-role"

export type MessengerMemberProps = {
  id: string
  roomId: string
  userId: string
  role: MessengerMemberRole
  joinedAt: Date
  addedByUserId?: string | null
  botId?: string | null
  isMuted?: boolean
  isBanned?: boolean
}

export class MessengerMemberEntity {
  private props: Required<
    Omit<MessengerMemberProps, "addedByUserId" | "botId" | "isMuted" | "isBanned">
  > & {
    addedByUserId: string | null
    botId: string | null
    isMuted: boolean
    isBanned: boolean
  }

  constructor(props: MessengerMemberProps) {
    this.props = {
      ...props,
      addedByUserId: props.addedByUserId ?? null,
      botId: props.botId ?? null,
      isMuted: props.isMuted ?? false,
      isBanned: props.isBanned ?? false,
    }
  }

  get id(): string {
    return this.props.id
  }

  get roomId(): string {
    return this.props.roomId
  }

  get userId(): string {
    return this.props.userId
  }

  get role(): MessengerMemberRole {
    return this.props.role
  }

  get joinedAt(): Date {
    return this.props.joinedAt
  }

  get addedByUserId(): string | null {
    return this.props.addedByUserId
  }

  get botId(): string | null {
    return this.props.botId
  }

  get isMuted(): boolean {
    return this.props.isMuted
  }

  get isBanned(): boolean {
    return this.props.isBanned
  }

  changeRole(role: MessengerMemberRole): void {
    this.props.role = role
  }

  mute(): void {
    this.props.isMuted = true
  }

  unmute(): void {
    this.props.isMuted = false
  }

  ban(): void {
    this.props.isBanned = true
  }

  unban(): void {
    this.props.isBanned = false
  }

  toJSON() {
    return {
      id: this.props.id,
      roomId: this.props.roomId,
      userId: this.props.userId,
      role: this.props.role,
      joinedAt: this.props.joinedAt,
      addedByUserId: this.props.addedByUserId,
      botId: this.props.botId,
      isMuted: this.props.isMuted,
      isBanned: this.props.isBanned,
    }
  }
}