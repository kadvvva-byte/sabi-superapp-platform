import { GroupFoundationService } from "./group-foundation.service"
import { ChannelFoundationService } from "./channel-foundation.service"
import { BotFoundationService } from "./bot-foundation.service"

import type { MessengerRoomRepositoryPort } from "../ports/messenger-room.repository.port"
import type { MessengerMemberRepositoryPort } from "../ports/messenger-member.repository.port"
import type { MessengerBotRepositoryPort } from "../ports/messenger-bot.repository.port"

export class MessengerFoundationPersistenceService {
  constructor(
    private readonly roomRepository?: MessengerRoomRepositoryPort,
    private readonly memberRepository?: MessengerMemberRepositoryPort,
    private readonly botRepository?: MessengerBotRepositoryPort,
    private readonly groupFoundation = new GroupFoundationService(),
    private readonly channelFoundation = new ChannelFoundationService(),
    private readonly botFoundation = new BotFoundationService(),
  ) {}

  private requireRoomRepository(): MessengerRoomRepositoryPort {
    if (!this.roomRepository) {
      throw new Error("messenger_room_repository_required")
    }

    return this.roomRepository
  }

  private requireMemberRepository(): MessengerMemberRepositoryPort {
    if (!this.memberRepository) {
      throw new Error("messenger_member_repository_required")
    }

    return this.memberRepository
  }

  private requireBotRepository(): MessengerBotRepositoryPort {
    if (!this.botRepository) {
      throw new Error("messenger_bot_repository_required")
    }

    return this.botRepository
  }

  async createGroup(input: {
    title: string
    createdByUserId: string
    description?: string | null
    avatarUrl?: string | null
    isPublic?: boolean
  }) {
    const roomRepository = this.requireRoomRepository()
    const memberRepository = this.requireMemberRepository()

    const result = this.groupFoundation.createGroup(input)

    await roomRepository.save(result.room)
    await memberRepository.save(result.ownerMember)

    return result
  }

  async addGroupMember(input: {
    roomId: string
    actingUserId: string
    targetUserId: string
    role?: "MEMBER" | "MODERATOR" | "ADMIN"
  }) {
    const roomRepository = this.requireRoomRepository()
    const memberRepository = this.requireMemberRepository()

    const room = await roomRepository.findById(input.roomId)
    if (!room) throw new Error("group_room_not_found")

    const actingMember = await memberRepository.findByRoomAndUser(
      input.roomId,
      input.actingUserId,
    )
    if (!actingMember) throw new Error("group_acting_member_not_found")

    const member = this.groupFoundation.addMember({
      room,
      actingMember,
      targetUserId: input.targetUserId,
      role: input.role,
    })

    await memberRepository.save(member)
    return member
  }

  async removeGroupMember(input: {
    roomId: string
    actingUserId: string
    targetUserId: string
  }) {
    const roomRepository = this.requireRoomRepository()
    const memberRepository = this.requireMemberRepository()

    const room = await roomRepository.findById(input.roomId)
    if (!room) throw new Error("group_room_not_found")

    const actingMember = await memberRepository.findByRoomAndUser(
      input.roomId,
      input.actingUserId,
    )
    if (!actingMember) throw new Error("group_acting_member_not_found")

    const targetMember = await memberRepository.findByRoomAndUser(
      input.roomId,
      input.targetUserId,
    )
    if (!targetMember) throw new Error("group_target_member_not_found")

    const result = this.groupFoundation.removeMember({
      room,
      actingMember,
      targetMember,
    })

    await memberRepository.deleteByRoomAndUser(input.roomId, input.targetUserId)

    return result
  }

  async changeGroupMemberRole(input: {
    roomId: string
    actingUserId: string
    targetUserId: string
    nextRole: "MEMBER" | "MODERATOR" | "ADMIN"
  }) {
    const roomRepository = this.requireRoomRepository()
    const memberRepository = this.requireMemberRepository()

    const room = await roomRepository.findById(input.roomId)
    if (!room) throw new Error("group_room_not_found")

    const actingMember = await memberRepository.findByRoomAndUser(
      input.roomId,
      input.actingUserId,
    )
    if (!actingMember) throw new Error("group_acting_member_not_found")

    const targetMember = await memberRepository.findByRoomAndUser(
      input.roomId,
      input.targetUserId,
    )
    if (!targetMember) throw new Error("group_target_member_not_found")

    const member = this.groupFoundation.changeMemberRole({
      room,
      actingMember,
      targetMember,
      nextRole: input.nextRole,
    })

    await memberRepository.save(member)
    return member
  }

  async createChannel(input: {
    title: string
    createdByUserId: string
    description?: string | null
    username?: string | null
    avatarUrl?: string | null
    isPublic?: boolean
  }) {
    const roomRepository = this.requireRoomRepository()
    const memberRepository = this.requireMemberRepository()

    const result = this.channelFoundation.createChannel(input)

    await roomRepository.save(result.room)
    await memberRepository.save(result.ownerMember)

    return result
  }

  async subscribeToChannel(input: {
    roomId: string
    userId: string
  }) {
    const roomRepository = this.requireRoomRepository()
    const memberRepository = this.requireMemberRepository()

    const room = await roomRepository.findById(input.roomId)
    if (!room) throw new Error("channel_room_not_found")

    const existingMember = await memberRepository.findByRoomAndUser(
      input.roomId,
      input.userId,
    )

    if (existingMember) {
      return existingMember
    }

    const subscriber = this.channelFoundation.subscribe({
      room,
      userId: input.userId,
    })

    await memberRepository.save(subscriber)
    return subscriber
  }

  async unsubscribeFromChannel(input: {
    roomId: string
    userId: string
  }) {
    const roomRepository = this.requireRoomRepository()
    const memberRepository = this.requireMemberRepository()

    const room = await roomRepository.findById(input.roomId)
    if (!room) throw new Error("channel_room_not_found")
    if (room.kind !== "CHANNEL") throw new Error("channel_room_required")

    const member = await memberRepository.findByRoomAndUser(
      input.roomId,
      input.userId,
    )

    if (!member) {
      throw new Error("channel_member_not_found")
    }

    if (member.role === "OWNER") {
      throw new Error("channel_owner_cannot_unsubscribe")
    }

    await memberRepository.deleteByRoomAndUser(input.roomId, input.userId)

    return { removed: true }
  }

  async addChannelManager(input: {
    roomId: string
    actingUserId: string
    targetUserId: string
    role: "MODERATOR" | "ADMIN"
  }) {
    const roomRepository = this.requireRoomRepository()
    const memberRepository = this.requireMemberRepository()

    const room = await roomRepository.findById(input.roomId)
    if (!room) throw new Error("channel_room_not_found")

    const actingMember = await memberRepository.findByRoomAndUser(
      input.roomId,
      input.actingUserId,
    )
    if (!actingMember) throw new Error("channel_acting_member_not_found")

    const manager = this.channelFoundation.addManager({
      room,
      actingMember,
      targetUserId: input.targetUserId,
      role: input.role,
    })

    await memberRepository.save(manager)
    return manager
  }

  async removeChannelMember(input: {
    roomId: string
    actingUserId: string
    targetUserId: string
  }) {
    const roomRepository = this.requireRoomRepository()
    const memberRepository = this.requireMemberRepository()

    const room = await roomRepository.findById(input.roomId)
    if (!room) throw new Error("channel_room_not_found")

    const actingMember = await memberRepository.findByRoomAndUser(
      input.roomId,
      input.actingUserId,
    )
    if (!actingMember) throw new Error("channel_acting_member_not_found")

    const targetMember = await memberRepository.findByRoomAndUser(
      input.roomId,
      input.targetUserId,
    )
    if (!targetMember) throw new Error("channel_target_member_not_found")

    const result = this.channelFoundation.removeMember({
      room,
      actingMember,
      targetMember,
    })

    await memberRepository.deleteByRoomAndUser(input.roomId, input.targetUserId)

    return result
  }

  async createBot(input: {
    ownerUserId: string
    title: string
    username?: string | null
    description?: string | null
    avatarUrl?: string | null
    webhookUrl?: string | null
  }) {
    const botRepository = this.requireBotRepository()

    const bot = this.botFoundation.createBot(input)
    await botRepository.save(bot)

    return bot
  }

  async createBotDialog(input: {
    ownerUserId: string
    botId: string
    botTitle: string
    botAvatarUrl?: string | null
    botUserId?: string | null
  }) {
    const roomRepository = this.requireRoomRepository()
    const memberRepository = this.requireMemberRepository()

    const result = this.botFoundation.createBotDialog(input)

    await roomRepository.save(result.room)
    await memberRepository.save(result.humanMember)
    await memberRepository.save(result.botMember)

    return result
  }

  async attachBotToRoom(input: {
    roomId: string
    actingUserId: string
    botId: string
    botUserId?: string | null
  }) {
    const roomRepository = this.requireRoomRepository()
    const memberRepository = this.requireMemberRepository()

    const room = await roomRepository.findById(input.roomId)
    if (!room) throw new Error("bot_room_not_found")

    const actingMember = await memberRepository.findByRoomAndUser(
      input.roomId,
      input.actingUserId,
    )
    if (!actingMember) throw new Error("bot_acting_member_not_found")

    const botMember = this.botFoundation.attachBotToRoom({
      room,
      actingMember,
      botId: input.botId,
      botUserId: input.botUserId ?? null,
    })

    await memberRepository.save(botMember)
    return botMember
  }
}