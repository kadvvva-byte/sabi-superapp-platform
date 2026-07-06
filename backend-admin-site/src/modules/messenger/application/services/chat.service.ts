import { PrismaClient } from "@prisma/client"

type MessengerPrisma = PrismaClient | any

type CreateGroupChatInput = {
  title?: string | null
  userIds?: string[]
  members?: string[]
  creatorId?: string | null
}

type CreatePrivateChatOptions = {
  currentUserPhone?: string | null
  currentUserUsername?: string | null
  currentUserEmail?: string | null
  peerPhone?: string | null
  peerUsername?: string | null
  peerEmail?: string | null
  user1Candidates?: Array<string | null | undefined>
  user2Candidates?: Array<string | null | undefined>
}

type ResolvedMessengerUser = {
  id: string
  email?: string | null
  phone?: string | null
  username?: string | null
  displayName?: string | null
  avatarUrl?: string | null
}

function normalizeString(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : null
}

function normalizeUsername(value: unknown): string | null {
  const raw = normalizeString(value)
  if (!raw) return null
  const cleaned = raw.replace(/^@+/, "").trim()
  return cleaned.length > 0 ? cleaned : null
}

function normalizePhone(value: unknown): string | null {
  const raw = normalizeString(value)
  if (!raw) return null
  const cleaned = raw.replace(/[\s()\-.]/g, "").trim()
  return cleaned.length > 0 ? cleaned : null
}

function normalizePhoneDigits(value: unknown): string | null {
  const raw = normalizeString(value)
  if (!raw) return null
  const digits = raw.replace(/\D/g, "").trim()
  return digits.length > 0 ? digits : null
}

function uniqueStrings(values: Array<string | null | undefined>): string[] {
  return Array.from(
    new Set(
      values
        .map((item) => normalizeString(item))
        .filter((item): item is string => Boolean(item)),
    ),
  )
}

function buildIdentifierCandidates(values: Array<string | null | undefined>): string[] {
  const expanded: Array<string | null | undefined> = []

  for (const value of values) {
    const raw = normalizeString(value)
    if (!raw) continue

    const username = normalizeUsername(raw)
    const phone = normalizePhone(raw)
    const digits = normalizePhoneDigits(raw)

    expanded.push(raw)
    expanded.push(raw.toLowerCase())
    expanded.push(username)
    expanded.push(username ? `@${username}` : null)
    expanded.push(phone)
    expanded.push(digits)
    expanded.push(digits ? `+${digits}` : null)
  }

  return uniqueStrings(expanded)
}

function getPhoneTail(digits: string | null, length: number): string | null {
  if (!digits || digits.length < length) return null
  return digits.slice(-length)
}

function buildUserLookupWhere(candidates: string[]) {
  const terms: any[] = []

  for (const candidate of candidates) {
    const username = normalizeUsername(candidate)
    const phone = normalizePhone(candidate)
    const digits = normalizePhoneDigits(candidate)
    const phoneTail9 = getPhoneTail(digits, 9)
    const phoneTail7 = getPhoneTail(digits, 7)
    const lower = candidate.toLowerCase()

    terms.push({ id: candidate })
    terms.push({ email: lower })
    terms.push({ phone: candidate })

    if (phone && phone !== candidate) {
      terms.push({ phone })
      terms.push({ phone: { contains: phone, mode: "insensitive" } })
    }

    if (digits) {
      terms.push({ phone: digits })
      terms.push({ phone: `+${digits}` })
      terms.push({ phone: { contains: digits, mode: "insensitive" } })
    }

    if (phoneTail9) {
      terms.push({ phone: { contains: phoneTail9, mode: "insensitive" } })
    }

    if (phoneTail7) {
      terms.push({ phone: { contains: phoneTail7, mode: "insensitive" } })
    }

    if (username) {
      terms.push({ username })
      terms.push({ username: `@${username}` })
      terms.push({ username: { equals: username, mode: "insensitive" } })
      terms.push({ username: { equals: `@${username}`, mode: "insensitive" } })
      terms.push({ username: { contains: username, mode: "insensitive" } })
    }
  }

  return {
    OR: terms,
  }
}

function scoreUserIdentifierMatch(user: any, candidates: string[]) {
  let best = 0
  const userId = String(user?.id ?? "").trim()
  const email = String(user?.email ?? "").trim().toLowerCase()
  const username = normalizeUsername(user?.username)
  const phone = normalizePhone(user?.phone)
  const phoneDigits = normalizePhoneDigits(user?.phone)

  for (const candidate of candidates) {
    const raw = normalizeString(candidate)
    if (!raw) continue

    const rawLower = raw.toLowerCase()
    const candidateUsername = normalizeUsername(raw)
    const candidatePhone = normalizePhone(raw)
    const candidateDigits = normalizePhoneDigits(raw)
    const candidateTail9 = getPhoneTail(candidateDigits, 9)
    const candidateTail7 = getPhoneTail(candidateDigits, 7)

    if (userId && userId === raw) best = Math.max(best, 100)
    if (email && email === rawLower) best = Math.max(best, 95)
    if (username && candidateUsername && username.toLowerCase() === candidateUsername.toLowerCase()) best = Math.max(best, 90)
    if (phone && candidatePhone && phone === candidatePhone) best = Math.max(best, 84)
    if (phoneDigits && candidateDigits && phoneDigits === candidateDigits) best = Math.max(best, 82)
    if (phoneDigits && candidateTail9 && phoneDigits.endsWith(candidateTail9)) best = Math.max(best, 72)
    if (phoneDigits && candidateTail7 && phoneDigits.endsWith(candidateTail7)) best = Math.max(best, 58)
  }

  return best
}

function mapUser(user: any): ResolvedMessengerUser {
  return {
    id: String(user.id),
    email: user.email ?? null,
    phone: user.phone ?? null,
    username: user.username ?? null,
    displayName: user.displayName ?? null,
    avatarUrl: user.avatarUrl ?? null,
  }
}

export class ChatService {
  constructor(private readonly prisma: PrismaClient = new PrismaClient()) {}

  private async resolveExistingPrivateChatByIdentifier(
    tx: MessengerPrisma,
    currentUser: ResolvedMessengerUser,
    identifiers: Array<string | null | undefined>,
  ): Promise<{
    chat: {
      id: string
      type: string
      title?: string | null
      avatarUrl?: string | null
      createdBy?: string | null
      createdAt?: Date | string | null
      updatedAt?: Date | string | null
    }
    users: string[]
    currentUser: ResolvedMessengerUser
    peerUser: ResolvedMessengerUser
    currentUserId: string
    peerUserId: string
  } | null> {
    const candidates = buildIdentifierCandidates(identifiers)

    if (!currentUser.id || candidates.length === 0) {
      return null
    }

    const existing = await tx.chat.findFirst({
      where: {
        id: { in: candidates },
        type: "PRIVATE",
        members: {
          some: { userId: currentUser.id },
        },
      },
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                email: true,
                phone: true,
                username: true,
                displayName: true,
                avatarUrl: true,
              },
            },
          },
        },
      },
      orderBy: { updatedAt: "desc" },
    })

    if (!existing?.id || !Array.isArray(existing.members)) {
      return null
    }

    const members = existing.members
      .map((member: any) => member?.user)
      .filter((user: any) => user?.id)

    const peerRaw = members.find((user: any) => String(user.id) !== currentUser.id)

    if (!peerRaw?.id) {
      return null
    }

    const peerUser = mapUser(peerRaw)
    const userIds = Array.from(new Set([currentUser.id, peerUser.id])).sort()

    return {
      chat: {
        id: existing.id,
        type: existing.type,
        title: existing.title,
        avatarUrl: existing.avatarUrl,
        createdBy: existing.createdBy,
        createdAt: existing.createdAt,
        updatedAt: existing.updatedAt,
      },
      users: userIds,
      currentUser,
      peerUser,
      currentUserId: currentUser.id,
      peerUserId: peerUser.id,
    }
  }

  private async resolveUser(
    tx: MessengerPrisma,
    identifiers: Array<string | null | undefined>,
    errorCode: string,
  ): Promise<ResolvedMessengerUser> {
    const candidates = buildIdentifierCandidates(identifiers)

    if (candidates.length === 0) {
      throw new Error(errorCode)
    }

    const users = await tx.user.findMany({
      where: buildUserLookupWhere(candidates),
      orderBy: [{ updatedAt: "desc" }, { createdAt: "desc" }],
      take: 25,
      select: {
        id: true,
        email: true,
        phone: true,
        username: true,
        displayName: true,
        avatarUrl: true,
      },
    })

    let ranked = users
      .map((user: any) => ({ user, score: scoreUserIdentifierMatch(user, candidates) }))
      .filter((item: any) => item.user?.id && item.score > 0)
      .sort((left: any, right: any) => right.score - left.score)

    if (ranked.length === 0 && candidates.some((candidate) => normalizePhoneDigits(candidate))) {
      const phoneUsers = await tx.user.findMany({
        where: { phone: { not: null } },
        orderBy: [{ updatedAt: "desc" }, { createdAt: "desc" }],
        take: 500,
        select: {
          id: true,
          email: true,
          phone: true,
          username: true,
          displayName: true,
          avatarUrl: true,
        },
      })

      ranked = phoneUsers
        .map((user: any) => ({ user, score: scoreUserIdentifierMatch(user, candidates) }))
        .filter((item: any) => item.user?.id && item.score >= 72)
        .sort((left: any, right: any) => right.score - left.score)
    }

    const user = ranked[0]?.user

    if (!user?.id) {
      throw new Error(errorCode)
    }

    return mapUser(user)
  }

  async createPrivateChat(
    user1: string,
    user2: string,
    options: CreatePrivateChatOptions = {},
  ) {
    const firstIdentifier = normalizeString(user1)
    const secondIdentifier = normalizeString(user2)

    if (!firstIdentifier || !secondIdentifier) {
      throw new Error("private_chat_users_required")
    }

    const firstUser = await this.resolveUser(
      this.prisma,
      [
        firstIdentifier,
        ...(options.user1Candidates ?? []),
        options.currentUserPhone,
        options.currentUserUsername,
        options.currentUserEmail,
      ],
      "private_chat_current_user_not_found",
    )

    const secondUserCandidates = [
      secondIdentifier,
      ...(options.user2Candidates ?? []),
      options.peerPhone,
      options.peerUsername,
      options.peerEmail,
    ]

    let secondUser: ResolvedMessengerUser

    try {
      secondUser = await this.resolveUser(
        this.prisma,
        secondUserCandidates,
        "private_chat_peer_user_not_found",
      )
    } catch (error) {
      const existingPrivateChat = await this.resolveExistingPrivateChatByIdentifier(
        this.prisma,
        firstUser,
        secondUserCandidates,
      )

      if (existingPrivateChat) {
        return existingPrivateChat
      }

      throw error
    }

    const firstUserId = firstUser.id
    const secondUserId = secondUser.id

    if (firstUserId === secondUserId) {
      throw new Error("private_chat_distinct_users_required")
    }

    const existingChats = await this.prisma.chat.findMany({
      where: {
        type: "PRIVATE",
        AND: [
          {
            members: {
              some: { userId: firstUserId },
            },
          },
          {
            members: {
              some: { userId: secondUserId },
            },
          },
        ],
      },
      include: {
        members: true,
      },
    })

    for (const existing of existingChats) {
      const memberIds = existing.members.map((member: any) => String(member.userId)).sort()
      const targetIds = [firstUserId, secondUserId].sort()

      if (
        memberIds.length === 2 &&
        memberIds[0] === targetIds[0] &&
        memberIds[1] === targetIds[1]
      ) {
        return {
          chat: {
            id: existing.id,
            type: existing.type,
            title: existing.title,
            avatarUrl: existing.avatarUrl,
            createdBy: existing.createdBy,
            createdAt: existing.createdAt,
            updatedAt: existing.updatedAt,
          },
          users: targetIds,
          currentUser: firstUser,
          peerUser: secondUser,
          currentUserId: firstUserId,
          peerUserId: secondUserId,
        }
      }
    }

    const created = await this.prisma.$transaction(async (tx: any) => {
      const chat = await tx.chat.create({
        data: {
          type: "PRIVATE",
        },
      })

      await tx.chatMember.createMany({
        data: [
          {
            chatId: chat.id,
            userId: firstUserId,
            role: "MEMBER",
            isArchived: false,
          },
          {
            chatId: chat.id,
            userId: secondUserId,
            role: "MEMBER",
            isArchived: false,
          },
        ],
        skipDuplicates: true,
      })

      const savedChat = await tx.chat.findUnique({
        where: { id: chat.id },
      })

      if (!savedChat) {
        throw new Error("private_chat_create_failed")
      }

      return savedChat
    })

    return {
      chat: {
        id: created.id,
        type: created.type,
        title: created.title,
        avatarUrl: created.avatarUrl,
        createdBy: created.createdBy,
        createdAt: created.createdAt,
        updatedAt: created.updatedAt,
      },
      users: [firstUserId, secondUserId].sort(),
      currentUser: firstUser,
      peerUser: secondUser,
      currentUserId: firstUserId,
      peerUserId: secondUserId,
    }
  }

  async createGroupChat(input: CreateGroupChatInput): Promise<any>
  async createGroupChat(title: string, userIds: string[]): Promise<any>
  async createGroupChat(
    inputOrTitle: CreateGroupChatInput | string,
    maybeUserIds?: string[],
  ) {
    const input: CreateGroupChatInput =
      typeof inputOrTitle === "string"
        ? {
            title: inputOrTitle,
            userIds: maybeUserIds ?? [],
          }
        : inputOrTitle ?? {}

    const normalizedTitle = String(input.title ?? "").trim() || "New Group"

    const rawMembers = Array.isArray(input.userIds)
      ? input.userIds
      : Array.isArray(input.members)
        ? input.members
        : []

    const normalizedUserIds = Array.from(
      new Set(
        rawMembers
          .map((item) => String(item ?? "").trim())
          .filter(Boolean),
      ),
    )

    const creatorId = String(input.creatorId ?? "").trim() || null

    if (normalizedUserIds.length === 0) {
      throw new Error("group_chat_users_required")
    }

    const memberUserIds = creatorId
      ? Array.from(new Set([creatorId, ...normalizedUserIds]))
      : normalizedUserIds

    const created = await this.prisma.$transaction(async (tx: any) => {
      const chat = await tx.chat.create({
        data: {
          type: "GROUP",
          title: normalizedTitle,
          createdBy: creatorId,
        },
      })

      await tx.chatMember.createMany({
        data: memberUserIds.map((userId) => ({
          chatId: chat.id,
          userId,
          role: creatorId && userId === creatorId ? "OWNER" : "MEMBER",
          isArchived: false,
        })),
        skipDuplicates: true,
      })

      const savedChat = await tx.chat.findUnique({
        where: { id: chat.id },
      })

      if (!savedChat) {
        throw new Error("group_chat_create_failed")
      }

      return savedChat
    })

    return {
      chat: created,
      members: memberUserIds,
    }
  }
}
