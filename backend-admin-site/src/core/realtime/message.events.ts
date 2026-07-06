function normalizeString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeIsoDate(value?: Date | string | null): string {
  if (value instanceof Date) {
    return value.toISOString();
  }

  const raw = normalizeString(value);
  if (!raw) return new Date().toISOString();

  const parsed = new Date(raw);
  return Number.isNaN(parsed.getTime()) ? new Date().toISOString() : parsed.toISOString();
}

export interface MessageCreatedEvent {
  messageId: string;
  chatId: string;
  senderId: string;
  content: string;
  createdAt: string;
}

export interface MessageEditedEvent {
  messageId: string;
  chatId: string;
  senderId: string;
  content: string;
  updatedAt: string;
}

export interface MessageDeletedEvent {
  messageId: string;
  chatId: string;
  senderId: string;
  deletedAt: string;
}

export function createMessageCreatedEvent(input: {
  messageId: string;
  chatId: string;
  senderId: string;
  content: string;
  createdAt?: Date | string | null;
}): MessageCreatedEvent {
  return {
    messageId: normalizeString(input.messageId),
    chatId: normalizeString(input.chatId),
    senderId: normalizeString(input.senderId),
    content: typeof input.content === "string" ? input.content : "",
    createdAt: normalizeIsoDate(input.createdAt),
  };
}

export function createMessageEditedEvent(input: {
  messageId: string;
  chatId: string;
  senderId: string;
  content: string;
  updatedAt?: Date | string | null;
}): MessageEditedEvent {
  return {
    messageId: normalizeString(input.messageId),
    chatId: normalizeString(input.chatId),
    senderId: normalizeString(input.senderId),
    content: typeof input.content === "string" ? input.content : "",
    updatedAt: normalizeIsoDate(input.updatedAt),
  };
}

export function createMessageDeletedEvent(input: {
  messageId: string;
  chatId: string;
  senderId: string;
  deletedAt?: Date | string | null;
}): MessageDeletedEvent {
  return {
    messageId: normalizeString(input.messageId),
    chatId: normalizeString(input.chatId),
    senderId: normalizeString(input.senderId),
    deletedAt: normalizeIsoDate(input.deletedAt),
  };
}