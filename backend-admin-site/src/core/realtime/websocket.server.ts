import { Server } from "socket.io";

/**
 * Shared socket.io server reference for kernel-driven realtime emitters.
 *
 * Compatibility note:
 * - `websocketServer` and `websocketGateway` are kept as legacy exports
 *   so old modules still compile while the project is being moved fully
 *   to kernel-owned realtime composition.
 * - No legacy socket bootstrap lives here.
 */
export let websocketServer: Server | null = null;
export let websocketGateway: Server | null = null;

export function setWebsocketServer(server: Server) {
  websocketServer = server;
  websocketGateway = server;
}

export function hasWebsocketServer(): boolean {
  return Boolean(websocketServer);
}

export function getWebsocketServer(): Server {
  if (!websocketServer) {
    throw new Error("WebSocket server is not initialized");
  }

  return websocketServer;
}

export function resetWebsocketServer() {
  websocketServer = null;
  websocketGateway = null;
}
