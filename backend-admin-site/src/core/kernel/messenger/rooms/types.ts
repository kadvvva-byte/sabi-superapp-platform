import type { MessengerKernelRoomRecord } from "../core/types";

export type KernelMessengerRoomType =
  | "direct"
  | "group"
  | "channel"
  | "bot"
  | "business"
  | "system"
  | "unknown";

export type KernelMessengerRoom = MessengerKernelRoomRecord & {
  id: string;
  type: KernelMessengerRoomType;
  title: string;
  subtitle: string | null;
  avatarUrl: string | null;
  avatarLetter: string | null;
  description: string | null;
  participantIds: string[];
  participantCount: number;
  unreadCount: number;
  lastMessageId: string | null;
  lastMessageText: string | null;
  lastMessageAt: string | null;
  pinned: boolean;
  muted: boolean;
  archived: boolean;
  isOnline: boolean;
  verified: boolean;
  phone: string | null;
  username: string | null;
  handle: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  metadata: Record<string, unknown>;
};

export type KernelMessengerRoomsQuery = {
  cursor?: string | null;
  limit?: number;
  search?: string | null;
  archived?: boolean;
  type?: KernelMessengerRoomType | "all";
};

export type KernelMessengerRoomsResponse = {
  items: KernelMessengerRoom[];
  nextCursor: string | null;
  totalCount: number | null;
};

export type KernelMessengerRoomsState = {
  items: KernelMessengerRoom[];
  byId: Record<string, KernelMessengerRoom>;
  roomIds: string[];
  selectedRoomId: string | null;
  isLoading: boolean;
  isRefreshing: boolean;
  isHydrated: boolean;
  errorMessage: string | null;
  nextCursor: string | null;
  totalCount: number | null;
  lastFetchedAt: string | null;
  lastOpenedRoomId: string | null;
};