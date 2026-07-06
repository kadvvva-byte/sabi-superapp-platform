import { emitChatRealtime } from "./realtime.emitter";
import { getWebsocketServer, hasWebsocketServer, setWebsocketServer } from "./websocket.server";

export { getWebsocketServer, hasWebsocketServer, setWebsocketServer };

export const websocketServer = {
  get current() {
    return hasWebsocketServer() ? getWebsocketServer() : null;
  },
};

export const websocketGateway = {
  get current() {
    return hasWebsocketServer() ? getWebsocketServer() : null;
  },
};

export function registerMessengerSocket() {
  // legacy shim: messenger realtime is now owned by kernel/module composition
}

export function emitMessageNew(chatId: string, message: unknown) {
  emitChatRealtime(chatId, "message:new", message);
  emitChatRealtime(chatId, "new_message", message);
  emitChatRealtime(chatId, "chat:message", message);
  emitChatRealtime(chatId, "chat:message:new", message);
}

export function emitMessageEdited(chatId: string, message: unknown) {
  emitChatRealtime(chatId, "message:edited", message);
  emitChatRealtime(chatId, "message_edited", message);
}

export function emitMessageDeleted(chatId: string, payload: { messageId: string }) {
  emitChatRealtime(chatId, "message:deleted", payload);
  emitChatRealtime(chatId, "message_deleted", payload);
}
