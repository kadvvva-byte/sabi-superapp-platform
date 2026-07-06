import type { MessengerRoomKind } from "../types/messenger-room-kind"

export type MessengerRoomProps = {
  id: string
  kind: MessengerRoomKind
  title: string
  createdByUserId: string
  createdAt: Date
  updatedAt: Date
  description?: string | null
  username?: string | null
  avatarUrl?: string | null
  isPublic?: boolean
  allowMemberMessages?: boolean
  allowComments?: boolean
  isArchived?: boolean
}

export class MessengerRoomEntity {
  private props: Required<
    Omit<
      MessengerRoomProps,
      | "description"
      | "username"
      | "avatarUrl"
      | "isPublic"
      | "allowMemberMessages"
      | "allowComments"
      | "isArchived"
    >
  > & {
    description: string | null
    username: string | null
    avatarUrl: string | null
    isPublic: boolean
    allowMemberMessages: boolean
    allowComments: boolean
    isArchived: boolean
  }

  constructor(props: MessengerRoomProps) {
    this.props = {
      ...props,
      description: props.description ?? null,
      username: props.username ?? null,
      avatarUrl: props.avatarUrl ?? null,
      isPublic: props.isPublic ?? false,
      allowMemberMessages: props.allowMemberMessages ?? true,
      allowComments: props.allowComments ?? false,
      isArchived: props.isArchived ?? false,
    }
  }

  static createGroup(props: {
    id: string
    title: string
    createdByUserId: string
    description?: string | null
    avatarUrl?: string | null
    isPublic?: boolean
  }): MessengerRoomEntity {
    const now = new Date()

    return new MessengerRoomEntity({
      id: props.id,
      kind: "GROUP",
      title: props.title,
      createdByUserId: props.createdByUserId,
      createdAt: now,
      updatedAt: now,
      description: props.description ?? null,
      avatarUrl: props.avatarUrl ?? null,
      isPublic: props.isPublic ?? false,
      allowMemberMessages: true,
      allowComments: true,
      isArchived: false,
    })
  }

  static createChannel(props: {
    id: string
    title: string
    createdByUserId: string
    description?: string | null
    username?: string | null
    avatarUrl?: string | null
    isPublic?: boolean
  }): MessengerRoomEntity {
    const now = new Date()

    return new MessengerRoomEntity({
      id: props.id,
      kind: "CHANNEL",
      title: props.title,
      createdByUserId: props.createdByUserId,
      createdAt: now,
      updatedAt: now,
      description: props.description ?? null,
      username: props.username ?? null,
      avatarUrl: props.avatarUrl ?? null,
      isPublic: props.isPublic ?? false,
      allowMemberMessages: false,
      allowComments: false,
      isArchived: false,
    })
  }

  static createBotDialog(props: {
    id: string
    title: string
    createdByUserId: string
    avatarUrl?: string | null
  }): MessengerRoomEntity {
    const now = new Date()

    return new MessengerRoomEntity({
      id: props.id,
      kind: "BOT_DIALOG",
      title: props.title,
      createdByUserId: props.createdByUserId,
      createdAt: now,
      updatedAt: now,
      avatarUrl: props.avatarUrl ?? null,
      isPublic: false,
      allowMemberMessages: true,
      allowComments: false,
      isArchived: false,
    })
  }

  get id(): string {
    return this.props.id
  }

  get kind(): MessengerRoomKind {
    return this.props.kind
  }

  get title(): string {
    return this.props.title
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

  get description(): string | null {
    return this.props.description
  }

  get username(): string | null {
    return this.props.username
  }

  get avatarUrl(): string | null {
    return this.props.avatarUrl
  }

  get isPublic(): boolean {
    return this.props.isPublic
  }

  get allowMemberMessages(): boolean {
    return this.props.allowMemberMessages
  }

  get allowComments(): boolean {
    return this.props.allowComments
  }

  get isArchived(): boolean {
    return this.props.isArchived
  }

  rename(title: string): void {
    this.props.title = title.trim()
    this.touch()
  }

  setDescription(description: string | null): void {
    this.props.description = description?.trim() || null
    this.touch()
  }

  setUsername(username: string | null): void {
    this.props.username = username?.trim() || null
    this.touch()
  }

  setAvatarUrl(avatarUrl: string | null): void {
    this.props.avatarUrl = avatarUrl?.trim() || null
    this.touch()
  }

  setPublic(isPublic: boolean): void {
    this.props.isPublic = isPublic
    this.touch()
  }

  setAllowMemberMessages(allow: boolean): void {
    this.props.allowMemberMessages = allow
    this.touch()
  }

  setAllowComments(allow: boolean): void {
    this.props.allowComments = allow
    this.touch()
  }

  archive(): void {
    this.props.isArchived = true
    this.touch()
  }

  unarchive(): void {
    this.props.isArchived = false
    this.touch()
  }

  private touch(): void {
    this.props.updatedAt = new Date()
  }

  toJSON() {
    return {
      id: this.props.id,
      kind: this.props.kind,
      title: this.props.title,
      createdByUserId: this.props.createdByUserId,
      createdAt: this.props.createdAt,
      updatedAt: this.props.updatedAt,
      description: this.props.description,
      username: this.props.username,
      avatarUrl: this.props.avatarUrl,
      isPublic: this.props.isPublic,
      allowMemberMessages: this.props.allowMemberMessages,
      allowComments: this.props.allowComments,
      isArchived: this.props.isArchived,
    }
  }
}