export const MESSENGER_MEMBER_ROLES = [
  "OWNER",
  "ADMIN",
  "MODERATOR",
  "MEMBER",
  "SUBSCRIBER",
  "BOT",
] as const

export type MessengerMemberRole = (typeof MESSENGER_MEMBER_ROLES)[number]

export function isMessengerMemberRole(
  value: unknown,
): value is MessengerMemberRole {
  return (
    typeof value === "string" &&
    (MESSENGER_MEMBER_ROLES as readonly string[]).includes(value)
  )
}