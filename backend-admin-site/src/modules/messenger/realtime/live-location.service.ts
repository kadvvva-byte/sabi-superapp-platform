export type LiveLocation = {
  userId: string;
  chatId: string;
  latitude: number;
  longitude: number;
  updatedAt: string;
  accuracy?: number | null;
  heading?: number | null;
  speed?: number | null;
};

type ChatLiveLocationSnapshot = Record<string, LiveLocation>;

function nowIso(): string {
  return new Date().toISOString();
}

function normalizeString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim()) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
}

function isValidLatitude(value: number | null): value is number {
  return value !== null && value >= -90 && value <= 90;
}

function isValidLongitude(value: number | null): value is number {
  return value !== null && value >= -180 && value <= 180;
}

export class LiveLocationService {
  private readonly locations = new Map<string, LiveLocation>();
  private readonly chatUsers = new Map<string, Set<string>>();
  private readonly userChats = new Map<string, Set<string>>();

  /*
  -----------------------
  INTERNAL HELPERS
  -----------------------
  */

  private makeKey(chatId: string, userId: string) {
    return `${chatId}:${userId}`;
  }

  private ensureChatUsers(chatId: string) {
    const safeChatId = normalizeString(chatId);
    const current = this.chatUsers.get(safeChatId);
    if (current) return current;

    const next = new Set<string>();
    this.chatUsers.set(safeChatId, next);
    return next;
  }

  private ensureUserChats(userId: string) {
    const safeUserId = normalizeString(userId);
    const current = this.userChats.get(safeUserId);
    if (current) return current;

    const next = new Set<string>();
    this.userChats.set(safeUserId, next);
    return next;
  }

  private cleanupChatIfEmpty(chatId: string) {
    const safeChatId = normalizeString(chatId);
    if (!safeChatId) return;

    const users = this.chatUsers.get(safeChatId);
    if (users && users.size > 0) return;

    this.chatUsers.delete(safeChatId);
  }

  private normalizeLocationInput(data: Partial<LiveLocation> | null | undefined): LiveLocation | null {
    const userId = normalizeString(data?.userId);
    const chatId = normalizeString(data?.chatId);
    const latitude = normalizeNumber(data?.latitude);
    const longitude = normalizeNumber(data?.longitude);

    if (!userId || !chatId || !isValidLatitude(latitude) || !isValidLongitude(longitude)) {
      return null;
    }

    const accuracy = normalizeNumber(data?.accuracy);
    const heading = normalizeNumber(data?.heading);
    const speed = normalizeNumber(data?.speed);
    const updatedAt = normalizeString(data?.updatedAt) || nowIso();

    return {
      userId,
      chatId,
      latitude,
      longitude,
      updatedAt,
      accuracy,
      heading,
      speed,
    };
  }

  /*
  -----------------------
  UPDATE LOCATION
  -----------------------
  */

  updateLocation(data: Partial<LiveLocation>) {
    const location = this.normalizeLocationInput(data);
    if (!location) return null;

    const key = this.makeKey(location.chatId, location.userId);

    this.locations.set(key, location);
    this.ensureChatUsers(location.chatId).add(location.userId);
    this.ensureUserChats(location.userId).add(location.chatId);

    return location;
  }

  /*
  -----------------------
  REMOVE LOCATION
  -----------------------
  */

  removeLocation(chatId: string, userId: string) {
    const safeChatId = normalizeString(chatId);
    const safeUserId = normalizeString(userId);

    if (!safeChatId || !safeUserId) return null;

    const key = this.makeKey(safeChatId, safeUserId);
    const current = this.locations.get(key) ?? null;

    this.locations.delete(key);

    const chatUsers = this.chatUsers.get(safeChatId);
    if (chatUsers) {
      chatUsers.delete(safeUserId);
      if (!chatUsers.size) {
        this.chatUsers.delete(safeChatId);
      } else {
        this.chatUsers.set(safeChatId, chatUsers);
      }
    }

    const userChats = this.userChats.get(safeUserId);
    if (userChats) {
      userChats.delete(safeChatId);
      if (!userChats.size) {
        this.userChats.delete(safeUserId);
      } else {
        this.userChats.set(safeUserId, userChats);
      }
    }

    this.cleanupChatIfEmpty(safeChatId);

    return current;
  }

  removeUserFromAllChats(userId: string) {
    const safeUserId = normalizeString(userId);
    if (!safeUserId) return [];

    const chats = Array.from(this.userChats.get(safeUserId) ?? []);
    const removed: LiveLocation[] = [];

    for (const chatId of chats) {
      const location = this.removeLocation(chatId, safeUserId);
      if (location) removed.push(location);
    }

    this.userChats.delete(safeUserId);

    return removed;
  }

  /*
  -----------------------
  GETTERS
  -----------------------
  */

  getLocation(chatId: string, userId: string) {
    const safeChatId = normalizeString(chatId);
    const safeUserId = normalizeString(userId);

    if (!safeChatId || !safeUserId) return null;

    return this.locations.get(this.makeKey(safeChatId, safeUserId)) ?? null;
  }

  getChatLocations(chatId: string) {
    const safeChatId = normalizeString(chatId);
    if (!safeChatId) return [];

    const result: LiveLocation[] = [];
    const users = this.chatUsers.get(safeChatId);

    if (!users || !users.size) return result;

    for (const userId of users) {
      const location = this.getLocation(safeChatId, userId);
      if (location) result.push(location);
    }

    return result.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  }

  getChatLocationSnapshot(chatId: string): ChatLiveLocationSnapshot {
    const safeChatId = normalizeString(chatId);
    if (!safeChatId) return {};

    const snapshot: ChatLiveLocationSnapshot = {};
    const locations = this.getChatLocations(safeChatId);

    for (const location of locations) {
      snapshot[location.userId] = location;
    }

    return snapshot;
  }

  getUserChatIds(userId: string) {
    const safeUserId = normalizeString(userId);
    if (!safeUserId) return [];

    return Array.from(this.userChats.get(safeUserId) ?? []);
  }

  /*
  -----------------------
  MAINTENANCE
  -----------------------
  */

  clearChat(chatId: string) {
    const safeChatId = normalizeString(chatId);
    if (!safeChatId) return;

    const users = Array.from(this.chatUsers.get(safeChatId) ?? []);
    for (const userId of users) {
      this.removeLocation(safeChatId, userId);
    }

    this.chatUsers.delete(safeChatId);
  }

  reset() {
    this.locations.clear();
    this.chatUsers.clear();
    this.userChats.clear();
  }
}