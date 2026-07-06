import { randomUUID } from "crypto"

import { MessengerInviteEntity } from "../../domain/entities/messenger-invite.entity"
import { MessengerMemberEntity } from "../../domain/entities/messenger-member.entity"

import type { MessengerRoomRepositoryPort } from "../ports/messenger-room.repository.port"
import type { MessengerMemberRepositoryPort } from "../ports/messenger-member.repository.port"
import type { MessengerInviteRepositoryPort } from "../ports/messenger-invite.repository.port"

function generateInviteCode(): string {
  return randomUUID().replace(/-/g, "").slice(0, 12)
}

export class MessengerInvitePersistenceService {
  constructor(
    private readonly roomRepository: MessengerRoomRepositoryPort,
    private readonly memberRepository: MessengerMemberRepositoryPort,
    private readonly inviteRepository: MessengerInviteRepositoryPort,
  ) {}

  async createInvite(input: {
    roomId: string
    createdByUserId: string
    targetUserId?: string | null
    expiresAt?: Date | null
    maxUses?: number | null
  }) {
    const room = await this.roomRepository.findById(input.roomId)

    if (!room) {
      throw new Error("invite_room_not_found")
    }

    const now = new Date()

    const invite = new MessengerInviteEntity({
      id: randomUUID(),
      roomId: input.roomId,
      code: generateInviteCode(),
      createdByUserId: input.createdByUserId,
      createdAt: now,
      updatedAt: now,
      targetUserId: input.targetUserId ?? null,
      expiresAt: input.expiresAt ?? null,
      maxUses: input.maxUses ?? null,
      usesCount: 0,
      revokedAt: null,
    })

    return this.inviteRepository.save(invite)
  }

  async revokeInvite(input: {
    inviteId: string
  }) {
    const invite = await this.inviteRepository.findById(input.inviteId)

    if (!invite) {
      throw new Error("invite_not_found")
    }

    invite.revoke()

    return this.inviteRepository.save(invite)
  }

  async listRoomInvites(input: {
    roomId: string
  }) {
    const room = await this.roomRepository.findById(input.roomId)

    if (!room) {
      throw new Error("invite_room_not_found")
    }

    return this.inviteRepository.listByRoom(input.roomId)
  }

  async joinByCode(input: {
    code: string
    currentUserId: string
  }) {
    const invite = await this.inviteRepository.findByCode(input.code)

    if (!invite) {
      throw new Error("invite_not_found")
    }

    if (!invite.isActive()) {
      throw new Error("invite_inactive")
    }

    if (invite.targetUserId && invite.targetUserId !== input.currentUserId) {
      throw new Error("invite_target_mismatch")
    }

    const room = await this.roomRepository.findById(invite.roomId)

    if (!room) {
      throw new Error("invite_room_not_found")
    }

    if (room.kind !== "GROUP" && room.kind !== "CHANNEL") {
      throw new Error("invite_room_type_not_supported")
    }

    const existingMember = await this.memberRepository.findByRoomAndUser(
      room.id,
      input.currentUserId,
    )

    if (existingMember) {
      return {
        room,
        member: existingMember,
        invite,
        joined: false,
      }
    }

    const member = new MessengerMemberEntity({
      id: randomUUID(),
      roomId: room.id,
      userId: input.currentUserId,
      role: room.kind === "CHANNEL" ? "SUBSCRIBER" : "MEMBER",
      joinedAt: new Date(),
      addedByUserId: invite.createdByUserId,
    })

    await this.memberRepository.save(member)

    invite.incrementUse()
    const savedInvite = await this.inviteRepository.save(invite)

    return {
      room,
      member,
      invite: savedInvite,
      joined: true,
    }
  }
}