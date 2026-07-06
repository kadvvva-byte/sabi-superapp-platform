export const MESSENGER_ROOM_KINDS = [
  "PRIVATE",
  "GROUP",
  "CHANNEL",
  "BOT_DIALOG",
] as const

export type MessengerRoomKind = (typeof MESSENGER_ROOM_KINDS)[number]

export function isMessengerRoomKind(
  value: unknown,
): value is MessengerRoomKind {
  return (
    typeof value === "string" &&
    (MESSENGER_ROOM_KINDS as readonly string[]).includes(value)
  )
}