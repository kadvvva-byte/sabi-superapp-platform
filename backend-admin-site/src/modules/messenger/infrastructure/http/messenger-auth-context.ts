import type { Request } from "express"

import type { MessengerCurrentUser } from "../../application/types/messenger-current-user"

type UnknownRecord = Record<string, unknown>

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === "object" && value !== null
}

function readString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : undefined
}

function readStringArray(value: unknown): string[] | undefined {
  if (!Array.isArray(value)) return undefined

  const items = value
    .map((item) => (typeof item === "string" ? item.trim() : ""))
    .filter(Boolean)

  return items.length > 0 ? items : undefined
}

export function getMessengerCurrentUser(
  req: Request,
): MessengerCurrentUser | null {
  const requestRecord = req as unknown as UnknownRecord

  const candidates: unknown[] = [
    requestRecord.currentUser,
    requestRecord.user,
    requestRecord.auth,
    requestRecord.sessionUser,
  ]

  for (const candidate of candidates) {
    if (!isRecord(candidate)) continue

    const id =
      readString(candidate.id) ??
      readString(candidate.userId) ??
      readString(candidate.sub)

    if (!id) continue

    return {
      id,
      username:
        readString(candidate.username) ??
        readString(candidate.userName) ??
        null,
      phone:
        readString(candidate.phone) ??
        readString(candidate.phoneNumber) ??
        null,
      roles:
        readStringArray(candidate.roles) ??
        readStringArray(candidate.permissions) ??
        [],
    }
  }

  const headerUserId =
    readString(req.header("x-user-id")) ??
    readString(req.header("x-current-user-id")) ??
    readString(req.header("x-auth-user-id"))

  if (!headerUserId) {
    return null
  }

  return {
    id: headerUserId,
    username: null,
    phone: null,
    roles: [],
  }
}

export function getRequiredMessengerCurrentUser(
  req: Request,
): MessengerCurrentUser {
  const currentUser = getMessengerCurrentUser(req)

  if (!currentUser) {
    throw new Error("messenger_auth_required")
  }

  return currentUser
}