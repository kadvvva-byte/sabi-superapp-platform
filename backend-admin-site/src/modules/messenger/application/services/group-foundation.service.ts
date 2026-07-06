import { randomUUID } from "crypto"

import { MessengerMemberEntity } from "../../domain/entities/messenger-member.entity"
import { MessengerRoomEntity } from "../../domain/entities/messenger-room.entity"
import { MessengerPermissionService } from "./messenger-permission.service"

type CreateGroupInput = {
  title: string
  createdByUserId: string
  description?: string | null
  avatarUrl?: string | null
  isPublic?: boolean
}

type AddGroupMemberInput = {
  room: MessengerRoomEntity
  actingMember: MessengerMemberEntity
  targetUserId: string
  role?: "MEMBER" | "MODERATOR" | "ADMIN"
}

type RemoveGroupMemberInput = {
  room: MessengerRoomEntity
  actingMember: MessengerMemberEntity
  targetMember: MessengerMemberEntity
}

type ChangeGroupMemberRoleInput = {
  room: MessengerRoomEntity
  actingMember: MessengerMemberEntity
  targetMember: MessengerMemberEntity
  nextRole: "MEMBER" | "MODERATOR" | "ADMIN"
}

export class GroupFoundationService {
  constructor(
    private readonly permissionService = new MessengerPermissionService(),
  ) {}

  createGroup(input: CreateGroupInput) {
    const room = MessengerRoomEntity.createGroup({
      id: randomUUID(),
      title: input.title,
      createdByUserId: input.createdByUserId,
      description: input.description ?? null,
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

  addMember(input: AddGroupMemberInput): MessengerMemberEntity {
    if (input.room.kind !== "GROUP") {
      throw new Error("group_room_required")
    }

    if (
      !this.permissionService.canManageMembers(input.room, input.actingMember)
    ) {
      throw new Error("group_member_manage_forbidden")
    }

    return new MessengerMemberEntity({
      id: randomUUID(),
      roomId: input.room.id,
      userId: input.targetUserId,
      role: input.role ?? "MEMBER",
      joinedAt: new Date(),
      addedByUserId: input.actingMember.userId,
    })
  }

  removeMember(input: RemoveGroupMemberInput): { removed: true } {
    if (input.room.kind !== "GROUP") {
      throw new Error("group_room_required")
    }

    if (
      !this.permissionService.canManageMembers(input.room, input.actingMember)
    ) {
      throw new Error("group_member_remove_forbidden")
    }

    if (input.targetMember.role === "OWNER") {
      throw new Error("group_owner_cannot_be_removed")
    }

    return { removed: true }
  }

  changeMemberRole(input: ChangeGroupMemberRoleInput): MessengerMemberEntity {
    if (input.room.kind !== "GROUP") {
      throw new Error("group_room_required")
    }

    if (!this.permissionService.canManageRoom(input.actingMember)) {
      throw new Error("group_member_role_change_forbidden")
    }

    if (input.targetMember.role === "OWNER") {
      throw new Error("group_owner_role_change_forbidden")
    }

    input.targetMember.changeRole(input.nextRole)
    return input.targetMember
  }
}