import { MessengerMemberEntity } from "../../domain/entities/messenger-member.entity"
import { MessengerRoomEntity } from "../../domain/entities/messenger-room.entity"
import type { MessengerMemberRole } from "../../domain/types/messenger-member-role"

const ROLE_WEIGHT: Record<MessengerMemberRole, number> = {
  OWNER: 100,
  ADMIN: 80,
  MODERATOR: 60,
  MEMBER: 40,
  SUBSCRIBER: 20,
  BOT: 10,
}

export class MessengerPermissionService {
  hasAtLeastRole(
    member: MessengerMemberEntity | null | undefined,
    role: MessengerMemberRole,
  ): boolean {
    if (!member) return false
    return ROLE_WEIGHT[member.role] >= ROLE_WEIGHT[role]
  }

  canReadRoom(
    room: MessengerRoomEntity,
    member: MessengerMemberEntity | null | undefined,
  ): boolean {
    if (room.isArchived) return false
    if (room.isPublic && room.kind === "CHANNEL") return true
    if (!member) return false
    if (member.isBanned) return false
    return true
  }

  canPostMessage(
    room: MessengerRoomEntity,
    member: MessengerMemberEntity | null | undefined,
  ): boolean {
    if (!member) return false
    if (member.isBanned || member.isMuted) return false

    if (room.kind === "CHANNEL") {
      return this.hasAtLeastRole(member, "MODERATOR")
    }

    if (room.kind === "GROUP") {
      if (room.allowMemberMessages) return true
      return this.hasAtLeastRole(member, "MODERATOR")
    }

    return true
  }

  canManageRoom(
    member: MessengerMemberEntity | null | undefined,
  ): boolean {
    return this.hasAtLeastRole(member, "ADMIN")
  }

  canManageMembers(
    room: MessengerRoomEntity,
    member: MessengerMemberEntity | null | undefined,
  ): boolean {
    if (!member) return false
    if (room.kind === "CHANNEL") {
      return this.hasAtLeastRole(member, "MODERATOR")
    }
    return this.hasAtLeastRole(member, "ADMIN")
  }

  canCreateInvite(
    room: MessengerRoomEntity,
    member: MessengerMemberEntity | null | undefined,
  ): boolean {
    if (!member) return false

    if (room.kind === "CHANNEL") {
      return this.hasAtLeastRole(member, "ADMIN")
    }

    return this.hasAtLeastRole(member, "MODERATOR")
  }

  canUseBotInRoom(
    room: MessengerRoomEntity,
    member: MessengerMemberEntity | null | undefined,
  ): boolean {
    if (!member) return false

    if (room.kind === "CHANNEL") {
      return this.hasAtLeastRole(member, "ADMIN")
    }

    return this.hasAtLeastRole(member, "MODERATOR")
  }
}