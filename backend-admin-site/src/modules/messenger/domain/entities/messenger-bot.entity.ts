export type MessengerBotProps = {
  id: string
  ownerUserId: string
  title: string
  username?: string | null
  description?: string | null
  avatarUrl?: string | null
  webhookUrl?: string | null
  isActive?: boolean
  createdAt: Date
  updatedAt: Date
}

export class MessengerBotEntity {
  private props: Required<
    Omit<
      MessengerBotProps,
      "username" | "description" | "avatarUrl" | "webhookUrl" | "isActive"
    >
  > & {
    username: string | null
    description: string | null
    avatarUrl: string | null
    webhookUrl: string | null
    isActive: boolean
  }

  constructor(props: MessengerBotProps) {
    this.props = {
      ...props,
      username: props.username ?? null,
      description: props.description ?? null,
      avatarUrl: props.avatarUrl ?? null,
      webhookUrl: props.webhookUrl ?? null,
      isActive: props.isActive ?? true,
    }
  }

  get id(): string {
    return this.props.id
  }

  get ownerUserId(): string {
    return this.props.ownerUserId
  }

  get title(): string {
    return this.props.title
  }

  get username(): string | null {
    return this.props.username
  }

  get description(): string | null {
    return this.props.description
  }

  get avatarUrl(): string | null {
    return this.props.avatarUrl
  }

  get webhookUrl(): string | null {
    return this.props.webhookUrl
  }

  get isActive(): boolean {
    return this.props.isActive
  }

  get createdAt(): Date {
    return this.props.createdAt
  }

  get updatedAt(): Date {
    return this.props.updatedAt
  }

  rename(title: string): void {
    this.props.title = title.trim()
    this.touch()
  }

  setUsername(username: string | null): void {
    this.props.username = username?.trim() || null
    this.touch()
  }

  setDescription(description: string | null): void {
    this.props.description = description?.trim() || null
    this.touch()
  }

  setAvatarUrl(avatarUrl: string | null): void {
    this.props.avatarUrl = avatarUrl?.trim() || null
    this.touch()
  }

  setWebhookUrl(webhookUrl: string | null): void {
    this.props.webhookUrl = webhookUrl?.trim() || null
    this.touch()
  }

  activate(): void {
    this.props.isActive = true
    this.touch()
  }

  deactivate(): void {
    this.props.isActive = false
    this.touch()
  }

  private touch(): void {
    this.props.updatedAt = new Date()
  }

  toJSON() {
    return {
      id: this.props.id,
      ownerUserId: this.props.ownerUserId,
      title: this.props.title,
      username: this.props.username,
      description: this.props.description,
      avatarUrl: this.props.avatarUrl,
      webhookUrl: this.props.webhookUrl,
      isActive: this.props.isActive,
      createdAt: this.props.createdAt,
      updatedAt: this.props.updatedAt,
    }
  }
}