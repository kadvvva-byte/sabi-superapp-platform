function normalizeString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeIso(value?: string | null): string {
  const raw = normalizeString(value);
  if (!raw) return new Date().toISOString();

  const parsed = new Date(raw);
  return Number.isNaN(parsed.getTime()) ? new Date().toISOString() : parsed.toISOString();
}

export interface MessageDeliveredEvent {
  messageId: string;
  chatId: string;
  userId: string;
  deliveredAt: string;
}

export interface MessageReadEvent {
  messageId: string;
  chatId: string;
  userId: string;
  readAt: string;
}

export function createMessageDeliveredEvent(input: {
  messageId: string;
  chatId: string;
  userId: string;
  deliveredAt?: string | null;
}): MessageDeliveredEvent {
  return {
    messageId: normalizeString(input.messageId),
    chatId: normalizeString(input.chatId),
    userId: normalizeString(input.userId),
    deliveredAt: normalizeIso(input.deliveredAt),
  };
}

export function createMessageReadEvent(input: {
  messageId: string;
  chatId: string;
  userId: string;
  readAt?: string | null;
}): MessageReadEvent {
  return {
    messageId: normalizeString(input.messageId),
    chatId: normalizeString(input.chatId),
    userId: normalizeString(input.userId),
    readAt: normalizeIso(input.readAt),
  };
}