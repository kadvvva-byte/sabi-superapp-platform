function normalizeString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export interface ChatTypingEvent {
  chatId: string;
  userId: string;
  typing: boolean;
  at: string;
}

export function createChatTypingEvent(input: {
  chatId: string;
  userId: string;
  typing: boolean;
  at?: string | null;
}): ChatTypingEvent {
  return {
    chatId: normalizeString(input.chatId),
    userId: normalizeString(input.userId),
    typing: Boolean(input.typing),
    at:
      normalizeString(input.at) ||
      new Date().toISOString(),
  };
}