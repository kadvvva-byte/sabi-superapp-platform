import { randomUUID } from "crypto"

import { MessengerMemberEntity } from "../../domain/entities/messenger-member.entity"
import { MessengerRoomEntity } from "../../domain/entities/messenger-room.entity"
import { MessengerPermissionService } from "./messenger-permission.service"

type CreateChannelInput = {
  title: string
  createdByUserId: string
  description?: string | null
  username?: string | null
  avatarUrl?: string | null
  isPublic?: boolean
}

type SubscribeToChannelInput = {
  room: MessengerRoomEntity
  userId: string
}

type AddChannelManagerInput = {
  room: MessengerRoomEntity
  actingMember: MessengerMemberEntity
  targetUserId: string
  role: "MODERATOR" | "ADMIN"
}

type RemoveChannelMemberInput = {
  room: MessengerRoomEntity
  actingMember: MessengerMemberEntity
  targetMember: MessengerMemberEntity
}

export class ChannelFoundationService {
  constructor(
    private readonly permissionService = new MessengerPermissionService(),
  ) {}

  createChannel(input: CreateChannelInput) {
    const room = MessengerRoomEntity.createChannel({
      id: randomUUID(),
      title: input.title,
      createdByUserId: input.createdByUserId,
      description: input.description ?? null,
      username: input.username ?? null,
      avatarUrl: input.avatarUrl ?? null,
      isPublic: input.isPublic ?? false,
    })

    const ownerMember = new MessengerMemberEntity({
      id: randomUUID(),
      roomId: room.id,
      userId: input.createdByUserId,
      role: "OWNER",
      joinedAt: new Date(),
      addedByUserId: input.createdByUserId,
    })

    return {
      room,
      ownerMember,
    }
  }

  subscribe(input: SubscribeToChannelInput): MessengerMemberEntity {
    if (input.room.kind !== "CHANNEL") {
      throw new Error("channel_room_required")
    }

    return new MessengerMemberEntity({
      id: randomUUID(),
      roomId: input.room.id,
      userId: input.userId,
      role: "SUBSCRIBER",
      joinedAt: new Date(),
      addedByUserId: input.userId,
    })
  }

  addManager(input: AddChannelManagerInput): MessengerMemberEntity {
    if (input.room.kind !== "CHANNEL") {
      throw new Error("channel_room_required")
    }

    if (!this.permissionService.canManageMembers(input.room, input.actingMember)) {
      throw new Error("channel_member_manage_forbidden")
    }

    return new MessengerMemberEntity({
      id: randomUUID(),
      roomId: input.room.id,
      userId: input.targetUserId,
      role: input.role,
      joinedAt: new Date(),
      addedByUserId: input.actingMember.userId,
    })
  }

  removeMember(input: RemoveChannelMemberInput): { removed: true } {
    if (input.room.kind !== "CHANNEL") {
      throw new Error("channel_room_required")
    }

    if (!this.permissionService.canManageMembers(input.room, input.actingMember)) {
      throw new Error("channel_member_remove_forbidden")
    }

    if (input.targetMember.role === "OWNER") {
      throw new Error("channel_owner_cannot_be_removed")
    }

    return { removed: true }
  }
}