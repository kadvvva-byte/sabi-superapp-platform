import type { MessengerMemberRepositoryPort } from "../ports/messenger-member.repository.port"
import type { MessengerRoomRepositoryPort } from "../ports/messenger-room.repository.port"
import { MessengerPermissionService } from "./messenger-permission.service"
import type { MessengerCurrentUser } from "../types/messenger-current-user"

export class MessengerAccessControlService {
  constructor(
    private readonly roomRepository: MessengerRoomRepositoryPort,
    private readonly memberRepository: MessengerMemberRepositoryPort,
    private readonly permissionService = new MessengerPermissionService(),
  ) {}

  private normalizeTargetUserIds(
    targetUserIds: string[],
    currentUserId: string,
  ): string[] {
    const result: string[] = []
    const seen = new Set<string>()

    for (const rawUserId of targetUserIds) {
      const userId = typeof rawUserId === "string" ? rawUserId.trim() : ""

      if (!userId || userId === currentUserId || seen.has(userId)) {
        continue
      }

      seen.add(userId)
      result.push(userId)
    }

    return result
  }

  async getRoomOrThrow(roomId: string) {
    const room = await this.roomRepository.findById(roomId)

    if (!room) {
      throw new Error("messenger_room_not_found")
    }

    return room
  }

  async getMemberOrNull(roomId: string, userId: string) {
    return this.memberRepository.findByRoomAndUser(roomId, userId)
  }

  async getRequiredMember(roomId: string, userId: string) {
    const member = await this.memberRepository.findByRoomAndUser(roomId, userId)

    if (!member) {
      throw new Error("messenger_member_not_found")
    }

    return member
  }

  async assertCanReadRoom(input: {
    roomId: string
    currentUser: MessengerCurrentUser
  }) {
    const room = await this.getRoomOrThrow(input.roomId)
    const member = await this.getMemberOrNull(input.roomId, input.currentUser.id)

    if (!this.permissionService.canReadRoom(room, member)) {
      throw new Error("messenger_read_forbidden")
    }

    return {
      room,
      member,
    }
  }

  async assertCanPostMessage(input: {
    roomId: string
    currentUser: MessengerCurrentUser
  }) {
    const room = await this.getRoomOrThrow(input.roomId)
    const member = await this.getMemberOrNull(input.roomId, input.currentUser.id)

    if (!this.permissionService.canPostMessage(room, member)) {
      throw new Error("messenger_post_forbidden")
    }

    return {
      room,
      member,
    }
  }

  async assertCanManageRoom(input: {
    roomId: string
    currentUser: MessengerCurrentUser
  }) {
    const room = await this.getRoomOrThrow(input.roomId)
    const member = await this.getRequiredMember(input.roomId, input.currentUser.id)

    if (!this.permissionService.canManageRoom(member)) {
      throw new Error("messenger_manage_room_forbidden")
    }

    return {
      room,
      member,
    }
  }

  async assertCanManageMembers(input: {
    roomId: string
    currentUser: MessengerCurrentUser
  }) {
    const room = await this.getRoomOrThrow(input.roomId)
    const member = await this.getRequiredMember(input.roomId, input.currentUser.id)

    if (!this.permissionService.canManageMembers(room, member)) {
      throw new Error("messenger_manage_members_forbidden")
    }

    return {
      room,
      member,
    }
  }

  async assertCanCreateInvite(input: {
    roomId: string
    currentUser: MessengerCurrentUser
  }) {
    const room = await this.getRoomOrThrow(input.roomId)
    const member = await this.getRequiredMember(input.roomId, input.currentUser.id)

    if (!this.permissionService.canCreateInvite(room, member)) {
      throw new Error("messenger_create_invite_forbidden")
    }

    return {
      room,
      member,
    }
  }

  async assertCanUseBotInRoom(input: {
    roomId: string
    currentUser: MessengerCurrentUser
  }) {
    const room = await this.getRoomOrThrow(input.roomId)
    const member = await this.getRequiredMember(input.roomId, input.currentUser.id)

    if (!this.permissionService.canUseBotInRoom(room, member)) {
      throw new Error("messenger_use_bot_forbidden")
    }

    return {
      room,
      member,
    }
  }

  async assertIsRoomMember(input: {
    roomId: string
    currentUser: MessengerCurrentUser
  }) {
    const room = await this.getRoomOrThrow(input.roomId)
    const member = await this.getRequiredMember(input.roomId, input.currentUser.id)

    if (member.isBanned) {
      throw new Error("messenger_member_banned")
    }

    return {
      room,
      member,
    }
  }

  async assertCanStartCall(input: {
    roomId: string
    currentUser: MessengerCurrentUser
    targetUserIds: string[]
  }) {
    const room = await this.getRoomOrThrow(input.roomId)
    const member = await this.getRequiredMember(input.roomId, input.currentUser.id)

    if (member.isBanned) {
      throw new Error("messenger_member_banned")
    }

    if (room.kind === "CHANNEL" || room.kind === "BOT_DIALOG") {
      throw new Error("messenger_call_room_type_not_supported")
    }

    const targetUserIds = this.normalizeTargetUserIds(
      input.targetUserIds,
      input.currentUser.id,
    )

    if (targetUserIds.length === 0) {
      throw new Error("call_target_users_required")
    }

    if (room.kind === "PRIVATE" && targetUserIds.length !== 1) {
      throw new Error("messenger_private_call_target_invalid")
    }

    const roomMembers = await this.memberRepository.listByRoom(input.roomId)
    const membersByUserId = new Map(roomMembers.map((item) => [item.userId, item]))

    const targetMembers = targetUserIds.map((targetUserId) => {
      const targetMember = membersByUserId.get(targetUserId)

      if (!targetMember) {
        throw new Error("messenger_call_target_not_in_room")
      }

      if (targetMember.isBanned) {
        throw new Error("messenger_call_target_banned")
      }

      return targetMember
    })

    return {
      room,
      member,
      targetUserIds,
      targetMembers,
    }
  }
}