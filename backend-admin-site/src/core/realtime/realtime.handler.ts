import { EventBus } from "../events/event-bus";
import { RealtimeEvents } from "./realtime.channels";
import {
  emitAuthRealtime,
  emitChatRealtime,
  emitNotificationRealtime,
  emitToUser,
  emitUserRealtime,
  emitWalletEntityRealtime,
  emitWalletUserRealtime,
} from "./realtime.emitter";

type RealtimeEnvelope = {
  target?: string | null;
  userId?: string | null;
  authUserId?: string | null;
  notificationUserId?: string | null;
  walletUserId?: string | null;
  walletId?: string | null;
  operationId?: string | null;
  chatId?: string | null;
  eventName?: string | null;
  payload?: unknown;
};

function normalizeString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function resolveEventName(defaultEventName: string, envelope: RealtimeEnvelope) {
  return normalizeString(envelope.eventName) || defaultEventName;
}

export class RealtimeHandler {
  constructor(private readonly eventBus: EventBus) {
    this.register();
  }

  private handleRealtimeEnvelope(defaultEventName: string, raw: unknown) {
    const envelope =
      raw && typeof raw === "object" ? (raw as RealtimeEnvelope) : {};

    const eventName = resolveEventName(defaultEventName, envelope);
    const payload = envelope.payload ?? raw;

    const target = normalizeString(envelope.target);

    if (target === "auth") {
      const authUserId = normalizeString(envelope.authUserId || envelope.userId);
      if (!authUserId) return;
      emitAuthRealtime(authUserId, eventName, payload);
      return;
    }

    if (target === "user") {
      const userId = normalizeString(envelope.userId);
      if (!userId) return;
      emitUserRealtime(userId, eventName, payload);
      return;
    }

    if (target === "notification") {
      const notificationUserId = normalizeString(
        envelope.notificationUserId || envelope.userId,
      );
      if (!notificationUserId) return;
      emitNotificationRealtime(notificationUserId, eventName, payload);
      return;
    }

    if (target === "wallet-user") {
      const walletUserId = normalizeString(envelope.walletUserId || envelope.userId);
      if (!walletUserId) return;
      emitWalletUserRealtime(walletUserId, eventName, payload);
      return;
    }

    if (target === "wallet-entity") {
      emitWalletEntityRealtime({
        walletId: normalizeString(envelope.walletId) || undefined,
        operationId: normalizeString(envelope.operationId) || undefined,
        eventName,
        payload,
      });
      return;
    }

    if (target === "chat") {
      const chatId = normalizeString(envelope.chatId);
      if (!chatId) return;
      emitChatRealtime(chatId, eventName, payload);
      return;
    }

    const chatId = normalizeString(envelope.chatId);
    if (chatId) {
      emitChatRealtime(chatId, eventName, payload);
      return;
    }

    const userId = normalizeString(envelope.userId);
    if (userId) {
      emitToUser(userId, eventName, payload);
    }
  }

  private register() {
    this.eventBus.subscribe("realtime.emit", (event) => {
      this.handleRealtimeEnvelope(RealtimeEvents.realtimeEvent, event);
    });

    this.eventBus.subscribe("message.created", (event) => {
      this.handleRealtimeEnvelope(RealtimeEvents.messageNew, event);
    });

    this.eventBus.subscribe("message.edited", (event) => {
      this.handleRealtimeEnvelope(RealtimeEvents.messageEdited, event);
    });

    this.eventBus.subscribe("message.deleted", (event) => {
      this.handleRealtimeEnvelope(RealtimeEvents.messageDeleted, event);
    });

    this.eventBus.subscribe("message.delivered", (event) => {
      this.handleRealtimeEnvelope(RealtimeEvents.messageDelivered, event);
    });

    this.eventBus.subscribe("message.read", (event) => {
      this.handleRealtimeEnvelope(RealtimeEvents.messageRead, event);
    });

    this.eventBus.subscribe("chat.typing", (event) => {
      const envelope =
        event && typeof event === "object" ? (event as RealtimeEnvelope) : {};
      const typing = Boolean((event as any)?.typing);

      this.handleRealtimeEnvelope(
        typing ? RealtimeEvents.typingStart : RealtimeEvents.typingStop,
        event,
      );

      const chatId = normalizeString(envelope.chatId);
      if (!chatId) return;
    });

    this.eventBus.subscribe("presence.online", (event) => {
      this.handleRealtimeEnvelope(RealtimeEvents.presenceOnline, event);
    });

    this.eventBus.subscribe("presence.offline", (event) => {
      this.handleRealtimeEnvelope(RealtimeEvents.presenceOffline, event);
    });

    this.eventBus.subscribe("wallet.balance.updated", (event) => {
      this.handleRealtimeEnvelope(RealtimeEvents.walletBalanceUpdated, event);
    });

    this.eventBus.subscribe("wallet.history.changed", (event) => {
      this.handleRealtimeEnvelope(RealtimeEvents.walletHistoryChanged, event);
    });

    this.eventBus.subscribe("wallet.operation.updated", (event) => {
      this.handleRealtimeEnvelope(RealtimeEvents.walletOperationUpdated, event);
    });

    this.eventBus.subscribe("notification.new", (event) => {
      this.handleRealtimeEnvelope(RealtimeEvents.notificationNew, event);
    });

    this.eventBus.subscribe("notification.read", (event) => {
      this.handleRealtimeEnvelope(RealtimeEvents.notificationRead, event);
    });

    this.eventBus.subscribe("auth.session.changed", (event) => {
      this.handleRealtimeEnvelope(RealtimeEvents.authSessionChanged, event);
    });

    this.eventBus.subscribe("auth.account.updated", (event) => {
      this.handleRealtimeEnvelope(RealtimeEvents.authAccountUpdated, event);
    });

    this.eventBus.subscribe("user.updated", (event) => {
      this.handleRealtimeEnvelope(RealtimeEvents.userUpdated, event);
    });

    this.eventBus.subscribe("user.profile.updated", (event) => {
      this.handleRealtimeEnvelope(RealtimeEvents.userProfileUpdated, event);
    });
  }
}