import { WebSocket } from "ws";

export type ConnectionSnapshotEntry = {
  userId: string;
  connectionCount: number;
  updatedAt: string;
};

function nowIso(): string {
  return new Date().toISOString();
}

function normalizeString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export class ConnectionManager {
  private readonly connections = new Map<string, Set<WebSocket>>();
  private readonly socketUsers = new Map<WebSocket, string>();
  private readonly updatedAt = new Map<string, string>();

  /*
  -----------------------
  INTERNAL HELPERS
  -----------------------
  */

  private ensureUserConnections(userId: string) {
    const safeUserId = normalizeString(userId);
    const current = this.connections.get(safeUserId);
    if (current) return current;

    const next = new Set<WebSocket>();
    this.connections.set(safeUserId, next);
    return next;
  }

  private touchUser(userId: string, at?: string | null) {
    const safeUserId = normalizeString(userId);
    if (!safeUserId) return;

    this.updatedAt.set(safeUserId, normalizeString(at) || nowIso());
  }

  private cleanupUserIfEmpty(userId: string) {
    const safeUserId = normalizeString(userId);
    if (!safeUserId) return;

    const sockets = this.connections.get(safeUserId);
    if (sockets && sockets.size > 0) return;

    this.connections.delete(safeUserId);
    this.updatedAt.delete(safeUserId);
  }

  /*
  -----------------------
  ADD CONNECTION
  -----------------------
  */

  addConnection(userId: string, socket: WebSocket, at?: string | null) {
    const safeUserId = normalizeString(userId);
    if (!safeUserId || !socket) return this.getSnapshot(safeUserId);

    const currentOwner = this.socketUsers.get(socket);
    if (currentOwner && currentOwner !== safeUserId) {
      this.removeConnection(currentOwner, socket, at);
    }

    const sockets = this.ensureUserConnections(safeUserId);
    sockets.add(socket);
    this.socketUsers.set(socket, safeUserId);
    this.touchUser(safeUserId, at);

    return this.getSnapshot(safeUserId);
  }

  /*
  -----------------------
  REMOVE CONNECTION
  -----------------------
  */

  removeConnection(userId: string, socket: WebSocket, at?: string | null) {
    const safeUserId = normalizeString(userId);
    if (!safeUserId || !socket) return this.getSnapshot(safeUserId);

    const sockets = this.connections.get(safeUserId);
    if (!sockets) return this.getSnapshot(safeUserId);

    sockets.delete(socket);
    this.socketUsers.delete(socket);
    this.touchUser(safeUserId, at);
    this.cleanupUserIfEmpty(safeUserId);

    return this.getSnapshot(safeUserId);
  }

  removeSocket(socket: WebSocket, at?: string | null) {
    if (!socket) return null;

    const userId = this.socketUsers.get(socket);
    if (!userId) return null;

    return this.removeConnection(userId, socket, at);
  }

  /*
  -----------------------
  LOOKUPS
  -----------------------
  */

  getConnections(userId: string): Set<WebSocket> | undefined {
    const safeUserId = normalizeString(userId);
    if (!safeUserId) return undefined;

    return this.connections.get(safeUserId);
  }

  getConnectionArray(userId: string): WebSocket[] {
    const safeUserId = normalizeString(userId);
    if (!safeUserId) return [];

    return Array.from(this.connections.get(safeUserId) ?? []);
  }

  getUserIdBySocket(socket: WebSocket): string | undefined {
    if (!socket) return undefined;
    return this.socketUsers.get(socket);
  }

  hasConnections(userId: string): boolean {
    const safeUserId = normalizeString(userId);
    if (!safeUserId) return false;

    const sockets = this.connections.get(safeUserId);
    return Boolean(sockets && sockets.size > 0);
  }

  getConnectionCount(userId: string): number {
    return this.getConnectionArray(userId).length;
  }

  getSnapshot(userId: string): ConnectionSnapshotEntry | null {
    const safeUserId = normalizeString(userId);
    if (!safeUserId) return null;

    return {
      userId: safeUserId,
      connectionCount: this.getConnectionCount(safeUserId),
      updatedAt: this.updatedAt.get(safeUserId) ?? nowIso(),
    };
  }

  getAllConnections(): WebSocket[] {
    const all: WebSocket[] = [];

    for (const sockets of this.connections.values()) {
      for (const socket of sockets) {
        all.push(socket);
      }
    }

    return all;
  }

  getAllUsers(): string[] {
    return Array.from(this.connections.keys());
  }

  getAllSnapshots(): ConnectionSnapshotEntry[] {
    return this.getAllUsers().map((userId) => ({
      userId,
      connectionCount: this.getConnectionCount(userId),
      updatedAt: this.updatedAt.get(userId) ?? nowIso(),
    }));
  }

  /*
  -----------------------
  MAINTENANCE
  -----------------------
  */

  clearUser(userId: string) {
    const safeUserId = normalizeString(userId);
    if (!safeUserId) return;

    const sockets = this.connections.get(safeUserId);
    if (sockets) {
      for (const socket of sockets) {
        this.socketUsers.delete(socket);
      }
    }

    this.connections.delete(safeUserId);
    this.updatedAt.delete(safeUserId);
  }

  reset() {
    this.connections.clear();
    this.socketUsers.clear();
    this.updatedAt.clear();
  }
}