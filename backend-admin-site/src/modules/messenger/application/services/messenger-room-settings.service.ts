import type { MessengerRoomRepositoryPort } from "../ports/messenger-room.repository.port"

export class MessengerRoomSettingsService {
  constructor(
    private readonly roomRepository: MessengerRoomRepositoryPort,
  ) {}

  async getSettings(roomId: string) {
    const room = await this.roomRepository.findById(roomId)

    if (!room) {
      throw new Error("messenger_room_not_found")
    }

    return this.mapRoomSettings(room)
  }

  async updateSettings(
    roomId: string,
    input: {
      title?: string
      description?: string | null
      username?: string | null
      avatarUrl?: string | null
      isPublic?: boolean
      allowMemberMessages?: boolean
      allowComments?: boolean
      isArchived?: boolean
    },
  ) {
    const room = await this.roomRepository.findById(roomId)

    if (!room) {
      throw new Error("messenger_room_not_found")
    }

    if (typeof input.title === "string" && input.title.trim().length > 0) {
      room.rename(input.title)
    }

    if (input.description !== undefined) {
      room.setDescription(input.description)
    }

    if (input.username !== undefined) {
      room.setUsername(input.username)
    }

    if (input.avatarUrl !== undefined) {
      room.setAvatarUrl(input.avatarUrl)
    }

    if (typeof input.isPublic === "boolean") {
      room.setPublic(input.isPublic)
    }

    if (typeof input.allowComments === "boolean") {
      room.setAllowComments(input.allowComments)
    }

    if (typeof input.allowMemberMessages === "boolean") {
      if (room.kind === "CHANNEL") {
        room.setAllowMemberMessages(false)
      } else {
        room.setAllowMemberMessages(input.allowMemberMessages)
      }
    }

    if (typeof input.isArchived === "boolean") {
      if (input.isArchived) {
        room.archive()
      } else {
        room.unarchive()
      }
    }

    const saved = await this.roomRepository.save(room)
    return this.mapRoomSettings(saved)
  }

  private mapRoomSettings(room: {
    id: string
    kind: string
    title: string
    description: string | null
    username: string | null
    avatarUrl: string | null
    isPublic: boolean
    allowMemberMessages: boolean
    allowComments: boolean
    isArchived: boolean
    createdByUserId: string
    createdAt: Date
    updatedAt: Date
  }) {
    return {
      id: room.id,
      kind: room.kind,
      title: room.title,
      description: room.description,
      username: room.username,
      avatarUrl: room.avatarUrl,
      isPublic: room.isPublic,
      allowMemberMessages: room.allowMemberMessages,
      allowComments: room.allowComments,
      isArchived: room.isArchived,
      createdByUserId: room.createdByUserId,
      createdAt: room.createdAt,
      updatedAt: room.updatedAt,
    }
  }
}