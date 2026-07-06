import { Router } from "express"
import type { NextFunction, Request, Response } from "express"
import { PrismaClient } from "@prisma/client"
import { existsSync, readFileSync } from "fs"
import { mkdir, readFile, writeFile } from "fs/promises"
import path from "path"

import {
  getPrismaDelegate,
  type PrismaModelDelegate,
  type PrismaRecord,
} from "../persistence/prisma-messenger-delegate"
import { requireMessengerCurrentUser } from "../http/require-messenger-current-user"
import { getRouteCurrentUser } from "../http/messenger-route-guards"

type DirectoryKind = "GROUP" | "CHANNEL" | "BOT"

const router = Router()
const prisma = new PrismaClient()

function asString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : undefined
}

function normalizeKind(value: unknown): DirectoryKind | null {
  const normalized = asString(value)?.toUpperCase()

  if (normalized === "GROUP" || normalized === "CHANNEL" || normalized === "BOT") {
    return normalized
  }

  return null
}

function normalizeQuery(value: unknown): string {
  return typeof value === "string" ? value.trim() : ""
}


const SABI_PUBLIC_DIRECTORY_ADMIN_TIMEOUT_MS = Math.max(800, Number(process.env.SABI_PUBLIC_DIRECTORY_ADMIN_TIMEOUT_MS || 3500))

async function withSabiPublicDirectoryAdminTimeout<T>(
  label: string,
  operation: Promise<T>,
  fallback: T,
  onTimeout?: () => void,
): Promise<T> {
  let settled = false
  let timer: NodeJS.Timeout | null = null

  const timeout = new Promise<T>((resolve) => {
    timer = setTimeout(() => {
      if (settled) return
      onTimeout?.()
      console.warn(`[sabi-public-directory:admin-timeout] ${label} exceeded ${SABI_PUBLIC_DIRECTORY_ADMIN_TIMEOUT_MS}ms`)
      resolve(fallback)
    }, SABI_PUBLIC_DIRECTORY_ADMIN_TIMEOUT_MS)
  })

  try {
    const result = await Promise.race([operation, timeout])
    settled = true
    return result
  } catch (error) {
    settled = true
    console.warn(`[sabi-public-directory:admin-error] ${label}`, error)
    return fallback
  } finally {
    if (timer) clearTimeout(timer)
  }
}

function readRecordText(record: PrismaRecord, keys: string[]): string | null {
  for (const key of keys) {
    const value = record[key]
    if (typeof value === "string" && value.trim()) return value.trim()
  }

  return null
}

function roomDelegate(): PrismaModelDelegate {
  return getPrismaDelegate(prisma, [
    "messengerRoom",
    "chatRoom",
    "room",
    "messengerChat",
    "chat",
    "conversation",
    "messengerConversation",
  ])
}

function memberDelegate(): PrismaModelDelegate {
  return getPrismaDelegate(prisma, [
    "messengerMember",
    "chatMember",
    "member",
    "roomMember",
  ])
}

function botDelegate(): PrismaModelDelegate {
  return getPrismaDelegate(prisma, [
    "messengerBot",
    "bot",
    "chatBot",
  ])
}

function buildFallbackId(kind: DirectoryKind, title: string): string {
  const prefix = kind.toLowerCase()
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, "-")
    .replace(/^-+|-+$/g, "")

  return `${prefix}:${slug || Date.now()}`
}

function directoryItemFromRoom(record: PrismaRecord, kind: "GROUP" | "CHANNEL") {
  const id = readRecordText(record, ["id", "chatId", "roomId"]) ?? ""
  const title = readRecordText(record, ["title", "name", "groupName", "channelName"]) ?? "Untitled"

  return {
    id,
    chatId: id,
    roomId: id,
    title,
    name: title,
    username: readRecordText(record, ["username", "handle"]),
    description: readRecordText(record, ["description", "subtitle"]),
    avatarUrl: readRecordText(record, ["avatarUrl", "photoUrl"]),
    ownerUserId: readRecordText(record, ["ownerUserId", "createdByUserId", "createdBy"]),
    createdBy: readRecordText(record, ["ownerUserId", "createdByUserId", "createdBy"]),
    kind,
    type: kind,
    roomType: kind.toLowerCase(),
    isPublic: true,
    searchableInDirectory: true,
    joinMode: kind === "GROUP" ? "open" : "subscribe",
    updatedAt: record.updatedAt ?? record.createdAt ?? new Date().toISOString(),
  }
}

function directoryItemFromBot(record: PrismaRecord) {
  const id = readRecordText(record, ["id", "botId"]) ?? ""
  const title = readRecordText(record, ["title", "name", "botName"]) ?? "Bot"

  return {
    id,
    botId: id,
    title,
    name: title,
    username: readRecordText(record, ["username", "handle"]),
    description: readRecordText(record, ["description", "subtitle"]),
    avatarUrl: readRecordText(record, ["avatarUrl", "photoUrl"]),
    ownerUserId: readRecordText(record, ["ownerUserId", "createdByUserId", "createdBy"]),
    kind: "BOT",
    type: "BOT",
    roomType: "bot",
    isPublic: true,
    searchableInDirectory: true,
    action: "start",
    updatedAt: record.updatedAt ?? record.createdAt ?? new Date().toISOString(),
  }
}

async function saveRoomDirectoryItem(input: {
  id: string
  kind: "GROUP" | "CHANNEL"
  title: string
  ownerUserId: string
  username?: string | null
  description?: string | null
  avatarUrl?: string | null
}) {
  const delegate = roomDelegate()
  const createdAt = new Date()
  const updatedAt = new Date()

  const fullCreate = {
    id: input.id,
    type: input.kind,
    kind: input.kind,
    title: input.title,
    name: input.title,
    username: input.username ?? null,
    description: input.description ?? null,
    avatarUrl: input.avatarUrl ?? null,
    createdBy: input.ownerUserId,
    createdByUserId: input.ownerUserId,
    ownerUserId: input.ownerUserId,
    isPublic: true,
    searchableInDirectory: true,
    allowMemberMessages: input.kind === "GROUP",
    allowComments: input.kind === "GROUP",
    createdAt,
    updatedAt,
  }

  const safeCreate = {
    id: input.id,
    type: input.kind,
    title: input.title,
    avatarUrl: input.avatarUrl ?? null,
    createdBy: input.ownerUserId,
    createdAt,
    updatedAt,
  }

  const fullUpdate = {
    type: input.kind,
    kind: input.kind,
    title: input.title,
    name: input.title,
    username: input.username ?? null,
    description: input.description ?? null,
    avatarUrl: input.avatarUrl ?? null,
    createdBy: input.ownerUserId,
    createdByUserId: input.ownerUserId,
    ownerUserId: input.ownerUserId,
    isPublic: true,
    searchableInDirectory: true,
    allowMemberMessages: input.kind === "GROUP",
    allowComments: input.kind === "GROUP",
    updatedAt,
  }

  const safeUpdate = {
    type: input.kind,
    title: input.title,
    avatarUrl: input.avatarUrl ?? null,
    createdBy: input.ownerUserId,
    updatedAt,
  }

  if (delegate.upsert) {
    try {
      return await delegate.upsert({
        where: { id: input.id },
        create: fullCreate,
        update: fullUpdate,
      })
    } catch {}

    try {
      return await delegate.upsert({
        where: { id: input.id },
        create: safeCreate,
        update: safeUpdate,
      })
    } catch {}
  }

  const existing = await delegate.findUnique({ where: { id: input.id } }).catch(() => null)

  if (existing && delegate.update) {
    try {
      return await delegate.update({
        where: { id: input.id },
        data: fullUpdate,
      })
    } catch {
      return delegate.update({
        where: { id: input.id },
        data: safeUpdate,
      })
    }
  }

  try {
    return await delegate.create({ data: fullCreate })
  } catch {
    return delegate.create({ data: safeCreate })
  }
}

async function saveBotDirectoryItem(input: {
  id: string
  title: string
  ownerUserId: string
  username?: string | null
  description?: string | null
  avatarUrl?: string | null
  webhookUrl?: string | null
}) {
  const delegate = botDelegate()
  const createdAt = new Date()
  const updatedAt = new Date()

  const fullCreate = {
    id: input.id,
    ownerUserId: input.ownerUserId,
    title: input.title,
    name: input.title,
    username: input.username ?? null,
    description: input.description ?? null,
    avatarUrl: input.avatarUrl ?? null,
    webhookUrl: input.webhookUrl ?? null,
    isActive: true,
    isPublic: true,
    searchableInDirectory: true,
    createdAt,
    updatedAt,
  }

  const safeCreate = {
    id: input.id,
    ownerUserId: input.ownerUserId,
    title: input.title,
    username: input.username ?? null,
    description: input.description ?? null,
    avatarUrl: input.avatarUrl ?? null,
    webhookUrl: input.webhookUrl ?? null,
    isActive: true,
    createdAt,
    updatedAt,
  }

  const fullUpdate = {
    ownerUserId: input.ownerUserId,
    title: input.title,
    name: input.title,
    username: input.username ?? null,
    description: input.description ?? null,
    avatarUrl: input.avatarUrl ?? null,
    webhookUrl: input.webhookUrl ?? null,
    isActive: true,
    isPublic: true,
    searchableInDirectory: true,
    updatedAt,
  }

  const safeUpdate = {
    ownerUserId: input.ownerUserId,
    title: input.title,
    username: input.username ?? null,
    description: input.description ?? null,
    avatarUrl: input.avatarUrl ?? null,
    webhookUrl: input.webhookUrl ?? null,
    isActive: true,
    updatedAt,
  }

  if (delegate.upsert) {
    try {
      return await delegate.upsert({
        where: { id: input.id },
        create: fullCreate,
        update: fullUpdate,
      })
    } catch {}

    try {
      return await delegate.upsert({
        where: { id: input.id },
        create: safeCreate,
        update: safeUpdate,
      })
    } catch {}
  }

  const existing = await delegate.findUnique({ where: { id: input.id } }).catch(() => null)

  if (existing && delegate.update) {
    try {
      return await delegate.update({
        where: { id: input.id },
        data: fullUpdate,
      })
    } catch {
      return delegate.update({
        where: { id: input.id },
        data: safeUpdate,
      })
    }
  }

  try {
    return await delegate.create({ data: fullCreate })
  } catch {
    return delegate.create({ data: safeCreate })
  }
}

async function ensureOwnerMember(roomId: string, userId: string) {
  const delegate = memberDelegate()

  const existing = await delegate
    .findMany({
      where: {
        chatId: roomId,
        userId,
      },
      take: 1,
    })
    .catch(() => [])

  if (existing[0]) return existing[0]

  const data = {
    id: `${roomId}:${userId}`,
    chatId: roomId,
    userId,
    role: "OWNER",
    isArchived: false,
    joinedAt: new Date(),
  }

  try {
    return await delegate.create({ data })
  } catch {
    return null
  }
}


type SabiPublicDirectoryRichKind = "GROUP" | "CHANNEL" | "BOT";

const SABI_PUBLIC_DIRECTORY_RICH_MEMORY = new Map<string, Record<string, unknown>>();
const SABI_PUBLIC_DIRECTORY_PROFILE_SYNC_FILE = path.join(process.cwd(), ".data", "messenger", "public-directory-profile-sync.json");
let SABI_PUBLIC_DIRECTORY_PROFILE_SYNC_LOADED = false;

const SABI_PUBLIC_DIRECTORY_ACTION_STATE_FILE = path.join(process.cwd(), ".data", "messenger", "public-directory-action-state.json");
let SABI_PUBLIC_DIRECTORY_ACTION_STATE_LOADED = false;

type SabiPublicDirectoryActionState = {
  version: 1;
  joinedGroups: Record<string, string[]>;
  subscribedChannels: Record<string, string[]>;
  startedBots: Record<string, string[]>;
  updatedAt?: string;
};

const SABI_PUBLIC_DIRECTORY_ACTION_STATE: SabiPublicDirectoryActionState = {
  version: 1,
  joinedGroups: {},
  subscribedChannels: {},
  startedBots: {},
};

function normalizeSabiDirectoryActionStateUsers(value: unknown): string[] {
  if (!Array.isArray(value)) return [];

  const seen = new Set<string>();
  const users: string[] = [];

  for (const item of value) {
    const userId = typeof item === "string" && item.trim() ? item.trim() : "";
    if (!userId || seen.has(userId)) continue;
    seen.add(userId);
    users.push(userId);
  }

  return users;
}

function loadSabiPublicDirectoryActionStateOnce() {
  if (SABI_PUBLIC_DIRECTORY_ACTION_STATE_LOADED) return;
  SABI_PUBLIC_DIRECTORY_ACTION_STATE_LOADED = true;

  try {
    if (!existsSync(SABI_PUBLIC_DIRECTORY_ACTION_STATE_FILE)) return;
    const parsed = JSON.parse(readFileSync(SABI_PUBLIC_DIRECTORY_ACTION_STATE_FILE, "utf8"));

    if (parsed && typeof parsed === "object") {
      const joinedGroups = (parsed as Record<string, unknown>).joinedGroups;
      const subscribedChannels = (parsed as Record<string, unknown>).subscribedChannels;
      const startedBots = (parsed as Record<string, unknown>).startedBots;

      if (joinedGroups && typeof joinedGroups === "object" && !Array.isArray(joinedGroups)) {
        for (const [id, users] of Object.entries(joinedGroups as Record<string, unknown>)) {
          SABI_PUBLIC_DIRECTORY_ACTION_STATE.joinedGroups[id] = normalizeSabiDirectoryActionStateUsers(users);
        }
      }

      if (subscribedChannels && typeof subscribedChannels === "object" && !Array.isArray(subscribedChannels)) {
        for (const [id, users] of Object.entries(subscribedChannels as Record<string, unknown>)) {
          SABI_PUBLIC_DIRECTORY_ACTION_STATE.subscribedChannels[id] = normalizeSabiDirectoryActionStateUsers(users);
        }
      }

      if (startedBots && typeof startedBots === "object" && !Array.isArray(startedBots)) {
        for (const [id, users] of Object.entries(startedBots as Record<string, unknown>)) {
          SABI_PUBLIC_DIRECTORY_ACTION_STATE.startedBots[id] = normalizeSabiDirectoryActionStateUsers(users);
        }
      }
    }
  } catch {}
}

async function persistSabiPublicDirectoryActionState() {
  try {
    await mkdir(path.dirname(SABI_PUBLIC_DIRECTORY_ACTION_STATE_FILE), { recursive: true });
    SABI_PUBLIC_DIRECTORY_ACTION_STATE.updatedAt = new Date().toISOString();
    await writeFile(
      SABI_PUBLIC_DIRECTORY_ACTION_STATE_FILE,
      JSON.stringify(SABI_PUBLIC_DIRECTORY_ACTION_STATE, null, 2),
      "utf8",
    );
  } catch {}
}

async function rememberSabiPublicDirectoryActionState(params: {
  kind: SabiPublicDirectoryRichKind;
  id: string;
  userId: string;
}) {
  const id = params.id.trim();
  const userId = params.userId.trim();
  if (!id || !userId) return;

  loadSabiPublicDirectoryActionStateOnce();

  const bucket =
    params.kind === "GROUP"
      ? SABI_PUBLIC_DIRECTORY_ACTION_STATE.joinedGroups
      : params.kind === "CHANNEL"
        ? SABI_PUBLIC_DIRECTORY_ACTION_STATE.subscribedChannels
        : SABI_PUBLIC_DIRECTORY_ACTION_STATE.startedBots;

  const users = normalizeSabiDirectoryActionStateUsers(bucket[id]);
  if (!users.includes(userId)) users.push(userId);
  bucket[id] = users;

  await persistSabiPublicDirectoryActionState();
}

const SABI_PUBLIC_DIRECTORY_AUDIT_FILE = path.join(process.cwd(), ".data", "messenger", "public-directory-audit-log.json");
const SABI_PUBLIC_DIRECTORY_AUDIT_LIMIT = 1500;
let SABI_PUBLIC_DIRECTORY_AUDIT_LOADED = false;

type SabiPublicDirectoryAuditAction =
  | "profile_sync_visible"
  | "profile_sync_hidden"
  | "profile_sync_restricted"
  | "profile_sync_blocked"
  | "profile_removed_hidden"
  | "admin_promotion_applied"
  | "admin_review_approve"
  | "admin_review_hide"
  | "admin_review_restrict"
  | "admin_review_reject"
  | "admin_review_restore"
  | "directory_action_blocked"
  | "group_join"
  | "channel_subscribe"
  | "bot_start"
  | "group_member_add"
  | "channel_member_add"
  | "group_invite"
  | "channel_invite";

type SabiPublicDirectoryAuditEntry = {
  id: string;
  at: string;
  action: SabiPublicDirectoryAuditAction;
  kind: SabiPublicDirectoryRichKind;
  targetId: string;
  actorUserId: string | null;
  targetUserId: string | null;
  status: "success" | "blocked" | "visible" | "hidden" | "restricted" | "promoted" | "approved" | "rejected" | "restored";
  code?: string | null;
  adminControlled: true;
  rawContentIncluded: false;
  visibilityStatus?: string | null;
  listingStatus?: string | null;
  approvalStatus?: string | null;
  promotionPlacement?: string | null;
  source?: string | null;
};

const SABI_PUBLIC_DIRECTORY_AUDIT_LOG: SabiPublicDirectoryAuditEntry[] = [];

function normalizeSabiPublicDirectoryAuditRows(value: unknown): SabiPublicDirectoryAuditEntry[] {
  const rows = Array.isArray(value)
    ? value
    : Array.isArray((value as Record<string, unknown> | null)?.entries)
      ? ((value as Record<string, unknown>).entries as unknown[])
      : Array.isArray((value as Record<string, unknown> | null)?.items)
        ? ((value as Record<string, unknown>).items as unknown[])
        : Array.isArray((value as Record<string, unknown> | null)?.data)
          ? ((value as Record<string, unknown>).data as unknown[])
          : [];

  const normalized: SabiPublicDirectoryAuditEntry[] = [];

  for (const rawItem of rows) {
    if (!rawItem || typeof rawItem !== "object") continue;

    const item = rawItem as Record<string, unknown>;
    const kind = sabiRichKind(item.kind || item.type);
    const targetId = sabiRichText(item.targetId, item.id, item.chatId, item.roomId, item.groupId, item.channelId, item.botId);
    const action = String(item.action || "profile_sync_visible") as SabiPublicDirectoryAuditAction;
    const at = sabiRichText(item.at, item.createdAt, item.updatedAt) || new Date().toISOString();

    if (!targetId) continue;

    normalized.push({
      id: sabiRichText(item.id) || `${at}:${kind}:${targetId}:${action}`,
      at,
      action,
      kind,
      targetId,
      actorUserId: sabiRichText(item.actorUserId, item.userId, item.createdBy, item.ownerUserId) || null,
      targetUserId: sabiRichText(item.targetUserId, item.memberUserId, item.inviteeUserId) || null,
      status: String(item.status || "visible") as SabiPublicDirectoryAuditEntry["status"],
      code: sabiRichText(item.code, item.error) || null,
      adminControlled: true,
      rawContentIncluded: false,
      visibilityStatus: sabiRichText(item.visibilityStatus, item.visibility) || null,
      listingStatus: sabiRichText(item.listingStatus) || null,
      approvalStatus: sabiRichText(item.approvalStatus) || null,
      promotionPlacement: sabiRichText(item.promotionPlacement) || null,
      source: sabiRichText(item.source) || null,
    });
  }

  return normalized;
}

function loadSabiPublicDirectoryAuditLogOnce() {
  if (SABI_PUBLIC_DIRECTORY_AUDIT_LOADED) return;
  SABI_PUBLIC_DIRECTORY_AUDIT_LOADED = true;

  try {
    if (!existsSync(SABI_PUBLIC_DIRECTORY_AUDIT_FILE)) return;
    const parsed = JSON.parse(readFileSync(SABI_PUBLIC_DIRECTORY_AUDIT_FILE, "utf8"));
    SABI_PUBLIC_DIRECTORY_AUDIT_LOG.push(...normalizeSabiPublicDirectoryAuditRows(parsed).slice(-SABI_PUBLIC_DIRECTORY_AUDIT_LIMIT));
  } catch {}
}

async function persistSabiPublicDirectoryAuditLog() {
  try {
    await mkdir(path.dirname(SABI_PUBLIC_DIRECTORY_AUDIT_FILE), { recursive: true });
    const entries = SABI_PUBLIC_DIRECTORY_AUDIT_LOG
      .slice(-SABI_PUBLIC_DIRECTORY_AUDIT_LIMIT)
      .sort((a, b) => String(b.at || "").localeCompare(String(a.at || "")));

    await writeFile(
      SABI_PUBLIC_DIRECTORY_AUDIT_FILE,
      JSON.stringify(
        {
          ok: true,
          version: 1,
          updatedAt: new Date().toISOString(),
          adminControlled: true,
          rawContentIncluded: false,
          entries,
        },
        null,
        2,
      ),
      "utf8",
    );
  } catch {}
}

async function writeSabiPublicDirectoryAudit(params: {
  action: SabiPublicDirectoryAuditAction;
  kind: SabiPublicDirectoryRichKind;
  targetId: string;
  actorUserId?: string | null;
  targetUserId?: string | null;
  status: SabiPublicDirectoryAuditEntry["status"];
  code?: string | null;
  visibilityStatus?: string | null;
  listingStatus?: string | null;
  approvalStatus?: string | null;
  promotionPlacement?: string | null;
  source?: string | null;
}) {
  const targetId = params.targetId.trim();
  if (!targetId) return;

  loadSabiPublicDirectoryAuditLogOnce();

  const at = new Date().toISOString();
  const entry: SabiPublicDirectoryAuditEntry = {
    id: `${Date.now()}:${Math.random().toString(36).slice(2, 10)}:${params.kind}:${targetId}`,
    at,
    action: params.action,
    kind: params.kind,
    targetId,
    actorUserId: params.actorUserId || null,
    targetUserId: params.targetUserId || null,
    status: params.status,
    code: params.code || null,
    adminControlled: true,
    rawContentIncluded: false,
    visibilityStatus: params.visibilityStatus || null,
    listingStatus: params.listingStatus || null,
    approvalStatus: params.approvalStatus || null,
    promotionPlacement: params.promotionPlacement || null,
    source: params.source || null,
  };

  SABI_PUBLIC_DIRECTORY_AUDIT_LOG.push(entry);

  if (SABI_PUBLIC_DIRECTORY_AUDIT_LOG.length > SABI_PUBLIC_DIRECTORY_AUDIT_LIMIT) {
    SABI_PUBLIC_DIRECTORY_AUDIT_LOG.splice(0, SABI_PUBLIC_DIRECTORY_AUDIT_LOG.length - SABI_PUBLIC_DIRECTORY_AUDIT_LIMIT);
  }

  await persistSabiPublicDirectoryAuditLog();
}

function readSabiPublicDirectoryAuditRows(params: {
  kind?: SabiPublicDirectoryRichKind;
  targetId?: string;
  action?: string;
  actorUserId?: string;
  limit?: number;
}) {
  loadSabiPublicDirectoryAuditLogOnce();

  const limit = Math.min(Math.max(params.limit || 80, 1), 250);
  const action = String(params.action || "").trim();

  return SABI_PUBLIC_DIRECTORY_AUDIT_LOG
    .filter((entry) => {
      if (params.kind && entry.kind !== params.kind) return false;
      if (params.targetId && entry.targetId !== params.targetId) return false;
      if (params.actorUserId && entry.actorUserId !== params.actorUserId) return false;
      if (action && entry.action !== action) return false;
      return true;
    })
    .sort((a, b) => String(b.at || "").localeCompare(String(a.at || "")))
    .slice(0, limit);
}

async function getSabiPublicDirectoryAuditLog(
  req: Request,
  res: Response,
  next: NextFunction,
  forcedKind?: DirectoryKind,
) {
  try {
    const currentUser = getRouteCurrentUser(req);
    const requestedKind = forcedKind ?? normalizeKind(req.query?.kind ?? req.query?.type) ?? undefined;
    const targetId = asString(req.query?.targetId) || asString(req.query?.id) || asString(req.query?.chatId) || asString(req.query?.roomId) || asString(req.query?.botId);
    const action = asString(req.query?.action);
    const actorUserId = asString(req.query?.actorUserId);
    const limit = readSabiPublicDirectoryNumber(req.query?.limit, 80);
    const entries = readSabiPublicDirectoryAuditRows({
      kind: requestedKind as SabiPublicDirectoryRichKind | undefined,
      targetId,
      action,
      actorUserId,
      limit,
    });

    res.json({
      ok: true,
      data: entries,
      items: entries,
      count: entries.length,
      kind: requestedKind || "ALL",
      currentUserId: currentUser.id,
      adminControlled: true,
      rawContentIncluded: false,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    next(error);
  }
}

function hasSabiPublicDirectoryActionUser(kind: SabiPublicDirectoryRichKind, id: string, userId: string) {
  if (!id || !userId) return false;
  loadSabiPublicDirectoryActionStateOnce();

  const bucket =
    kind === "GROUP"
      ? SABI_PUBLIC_DIRECTORY_ACTION_STATE.joinedGroups
      : kind === "CHANNEL"
        ? SABI_PUBLIC_DIRECTORY_ACTION_STATE.subscribedChannels
        : SABI_PUBLIC_DIRECTORY_ACTION_STATE.startedBots;

  return normalizeSabiDirectoryActionStateUsers(bucket[id]).includes(userId);
}

function sabiRichText(...values: unknown[]) {
  for (const value of values) {
    if (typeof value === "string" && value.trim()) return value.trim();
  }

  return "";
}

function sabiRichNumber(value: unknown) {
  const next = Number(value);
  return Number.isFinite(next) ? Math.max(0, Math.floor(next)) : 0;
}

function sabiRichKind(value: unknown, fallback?: unknown): SabiPublicDirectoryRichKind {
  const raw = String(value || fallback || "GROUP").toUpperCase();
  if (raw === "CHANNEL") return "CHANNEL";
  if (raw === "BOT") return "BOT";
  return "GROUP";
}

function sabiRichArray(value: unknown): unknown[] {
  if (Array.isArray(value)) return value;

  if (typeof value === "string" && value.trim()) {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  return [];
}

function sabiRichDirectoryId(record: Record<string, unknown>, kind: SabiPublicDirectoryRichKind) {
  return sabiRichText(
    record.chatId,
    record.roomId,
    record.groupId,
    record.channelId,
    record.botId,
    record.id,
  ) || `${kind.toLowerCase()}:${Date.now()}`;
}

function sabiRichDirectoryTitle(record: Record<string, unknown>) {
  return sabiRichText(
    record.title,
    record.name,
    record.groupName,
    record.channelName,
    record.botName,
  );
}

function sabiNormalizeRichDirectoryRecord(input: unknown, fallbackKind?: unknown) {
  if (!input || typeof input !== "object") return null;

  const record = input as Record<string, unknown>;
  const kind = sabiRichKind(record.kind || record.type, fallbackKind);
  const id = sabiRichDirectoryId(record, kind);
  const title = sabiRichDirectoryTitle(record);

  if (!id || !title) return null;

  const publicationPhotos = sabiRichArray(record.publicationPhotos || record.publicPhotos);
  const publicationVideos = sabiRichArray(record.publicationVideos || record.publicVideos);

  return {
    id,
    chatId: kind === "BOT" ? null : id,
    roomId: kind === "BOT" ? null : id,
    groupId: kind === "GROUP" ? id : null,
    channelId: kind === "CHANNEL" ? id : null,
    botId: kind === "BOT" ? id : null,

    title,
    name: title,
    groupName: kind === "GROUP" ? title : undefined,
    channelName: kind === "CHANNEL" ? title : undefined,
    botName: kind === "BOT" ? title : undefined,

    username: sabiRichText(record.username, record.handle) || null,
    description: sabiRichText(record.description, record.subtitle, record.bio) || null,

    avatarUrl: sabiRichText(record.avatarUrl, record.avatarUri, record.photoUrl) || null,
    avatarUri: sabiRichText(record.avatarUri, record.avatarUrl, record.photoUrl) || null,
    photoUrl: sabiRichText(record.photoUrl, record.avatarUrl, record.avatarUri) || null,
    coverUrl: sabiRichText(record.coverUrl, record.coverUri) || null,
    coverUri: sabiRichText(record.coverUri, record.coverUrl) || null,

    publicationPhotos,
    publicationVideos,
    publicPhotos: publicationPhotos,
    publicVideos: publicationVideos,

    likesCount: sabiRichNumber(record.likesCount),
    publicGiftsCount: sabiRichNumber(record.publicGiftsCount),

    ownerUserId: sabiRichText(record.ownerUserId, record.createdBy) || null,
    createdBy: sabiRichText(record.createdBy, record.ownerUserId) || null,
    inviteLink: sabiRichText(record.inviteLink) || `/messenger/${kind.toLowerCase()}/${encodeURIComponent(id)}`,

    kind,
    type: kind,
    roomType: kind === "GROUP" ? "group" : kind === "CHANNEL" ? "channel" : "bot",
    isPublic: readSabiPublicDirectoryBoolean(record.isPublic, true),
    searchableInDirectory: readSabiPublicDirectoryBoolean(record.searchableInDirectory, true),
    visibilityStatus: sabiRichText(record.visibilityStatus, record.visibility) || undefined,
    listingStatus: sabiRichText(record.listingStatus) || undefined,
    approvalStatus: sabiRichText(record.approvalStatus) || undefined,
    promotionPlacement: normalizeSabiPublicDirectoryPromotionPlacement(record.promotionPlacement),
    featuredRank: readSabiPublicDirectoryFeaturedRank(record.featuredRank) < 999999 ? readSabiPublicDirectoryFeaturedRank(record.featuredRank) : undefined,
    searchBoostPct: readSabiPublicDirectoryNumber(record.searchBoostPct, 0),
    directoryBoostPct: readSabiPublicDirectoryNumber(record.directoryBoostPct, 0),
    recommended: readSabiPublicDirectoryBoolean(record.recommended, false),
    qualityScore: readSabiPublicDirectoryNumber(record.qualityScore, 0),
    safetyScore: readSabiPublicDirectoryNumber(record.safetyScore, 0),
    promotionScore: readSabiPublicDirectoryNumber(record.promotionScore, 0),
    hidden: readSabiPublicDirectoryBoolean(record.hidden, false),
    isHidden: readSabiPublicDirectoryBoolean(record.isHidden, false),
    joinMode: kind === "GROUP" ? "open" : kind === "CHANNEL" ? "subscribe" : null,
    action: kind === "BOT" ? "start" : null,
    updatedAt: new Date().toISOString(),
  };
}

function loadSabiPublicDirectoryProfileSyncStoreOnce() {
  if (SABI_PUBLIC_DIRECTORY_PROFILE_SYNC_LOADED) return;
  SABI_PUBLIC_DIRECTORY_PROFILE_SYNC_LOADED = true;

  try {
    if (!existsSync(SABI_PUBLIC_DIRECTORY_PROFILE_SYNC_FILE)) return;

    const parsed = JSON.parse(readFileSync(SABI_PUBLIC_DIRECTORY_PROFILE_SYNC_FILE, "utf8"));
    const rows = Array.isArray(parsed?.entries)
      ? parsed.entries
      : Array.isArray(parsed?.items)
        ? parsed.items
        : Array.isArray(parsed?.data)
          ? parsed.data
          : Array.isArray(parsed)
            ? parsed
            : [];

    for (const row of rows) {
      const normalized = sabiNormalizeRichDirectoryRecord(row);
      if (!normalized) continue;
      SABI_PUBLIC_DIRECTORY_RICH_MEMORY.set(`${normalized.kind}:${normalized.id}`, normalized);
    }
  } catch {}
}

async function persistSabiPublicDirectoryProfileSyncStore() {
  try {
    await mkdir(path.dirname(SABI_PUBLIC_DIRECTORY_PROFILE_SYNC_FILE), { recursive: true });

    const entries = sortSabiPublicDirectoryForMobile(
      Array.from(SABI_PUBLIC_DIRECTORY_RICH_MEMORY.values()),
    );

    await writeFile(
      SABI_PUBLIC_DIRECTORY_PROFILE_SYNC_FILE,
      JSON.stringify(
        {
          ok: true,
          updatedAt: new Date().toISOString(),
          entries,
        },
        null,
        2,
      ),
      "utf8",
    );
  } catch {}
}

// SABI_PUBLIC_DIRECTORY_RICH_MEMORY
function rememberSabiPublicDirectoryRichRecord(input: unknown, fallbackKind?: unknown) {
  loadSabiPublicDirectoryProfileSyncStoreOnce();

  const next = sabiNormalizeRichDirectoryRecord(input, fallbackKind);
  if (!next) return null;

  const key = `${next.kind}:${next.id}`;
  const existing = SABI_PUBLIC_DIRECTORY_RICH_MEMORY.get(key) || {};
  const merged = {
    ...existing,
    ...next,
  };

  SABI_PUBLIC_DIRECTORY_RICH_MEMORY.set(key, merged);

  return merged;
}

async function markSabiPublicDirectoryMissingProfileRecordsHidden(params: {
  ownerUserId: string;
  kinds: Set<DirectoryKind>;
  incomingKeys: Set<string>;
}) {
  if (!params.ownerUserId || !params.kinds.size) return;

  loadSabiPublicDirectoryProfileSyncStoreOnce();

  const updatedAt = new Date().toISOString();

  for (const [key, record] of SABI_PUBLIC_DIRECTORY_RICH_MEMORY.entries()) {
    const kind = sabiRichKind(record.kind || record.type);
    if (!params.kinds.has(kind)) continue;

    const id = sabiRichText(record.id, record.chatId, record.roomId, record.groupId, record.channelId, record.botId);
    const normalizedKey = id ? `${kind}:${id}` : key;
    if (params.incomingKeys.has(normalizedKey)) continue;

    const owner = sabiRichText(record.ownerUserId, record.createdBy);
    if (owner !== params.ownerUserId) continue;

    SABI_PUBLIC_DIRECTORY_RICH_MEMORY.set(key, {
      ...record,
      isPublic: false,
      searchableInDirectory: false,
      hidden: true,
      isHidden: true,
      visibilityStatus: "hidden",
      listingStatus: "profile_removed",
      approvalStatus: "profile_removed",
      adminVisibilitySource: "profile",
      rawContentIncluded: false,
      updatedAt,
    });

    void writeSabiPublicDirectoryAudit({
      action: "profile_removed_hidden",
      kind,
      targetId: id || key,
      actorUserId: params.ownerUserId,
      status: "hidden",
      code: "profile_removed",
      visibilityStatus: "hidden",
      listingStatus: "profile_removed",
      approvalStatus: "profile_removed",
      source: "profile",
    });
  }
}

function readSabiPublicDirectoryProfileSyncRows(body: unknown, forcedKind?: DirectoryKind): unknown[] {
  const record = body && typeof body === "object" ? body as Record<string, unknown> : null;
  const rows = Array.isArray(body)
    ? body
    : Array.isArray(record?.items)
      ? record.items
      : Array.isArray(record?.entries)
        ? record.entries
        : Array.isArray(record?.records)
          ? record.records
          : Array.isArray(record?.data)
            ? record.data
            : [body];

  return rows
    .filter((item) => Boolean(item && typeof item === "object"))
    .map((item) => {
      const row = item as Record<string, unknown>;
      if (!forcedKind || row.kind || row.type) return row;
      return { ...row, kind: forcedKind, type: forcedKind };
    });
}

function sabiRichMatches(item: Record<string, unknown>, query: string, kind?: SabiPublicDirectoryRichKind) {
  const itemKind = sabiRichKind(item.kind || item.type);

  if (kind && itemKind !== kind) return false;

  const normalized = query.trim().toLowerCase();
  if (!normalized) return false;

  const haystack = [
    item.id,
    item.chatId,
    item.roomId,
    item.groupId,
    item.channelId,
    item.botId,
    item.title,
    item.name,
    item.groupName,
    item.channelName,
    item.botName,
    item.username,
    item.description,
  ]
    .map((value) => String(value || "").toLowerCase())
    .join(" ");

  return haystack.includes(normalized);
}

type SabiPublicDirectoryAdminGate = {
  allowed: boolean;
  adminControlled: boolean;
  approvalStatus: string;
  listingStatus: string;
  visibilityStatus: string;
  promotionPlacement: "featured" | "boosted" | "recommended" | "approved" | "public";
  featuredRank?: number;
  searchBoostPct: number;
  directoryBoostPct: number;
  recommended: boolean;
  qualityScore?: number;
  safetyScore?: number;
  promotionScore?: number;
};

const SABI_ADMIN_DIRECTORY_PROMOTION_FILE = path.join(process.cwd(), ".data", "admin", "messenger-directory-promotion-manager.json");
const SABI_ADMIN_APPROVAL_VISIBILITY_FILE = path.join(process.cwd(), ".data", "admin", "messenger-approval-visibility-control.json");
const SABI_ADMIN_DIRECTORY_CONTROL_FILE = path.join(process.cwd(), ".data", "admin", "messenger-directory-control.json");


function normalizeSabiAdminDirectoryControlRestrictionEntry(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== "object") return null;

  const record = value as Record<string, unknown>;
  const status = String(record.status || "active").trim().toLowerCase();
  if (status && status !== "active") return null;

  const rawKind = String(record.kind || record.type || "").trim().toLowerCase();
  const kind = rawKind === "group" ? "GROUP" : rawKind === "channel" ? "CHANNEL" : rawKind === "bot" ? "BOT" : null;
  const targetId = sabiRichText(record.targetId, record.id, record.chatId, record.roomId, record.groupId, record.channelId, record.botId);
  if (!kind || !targetId) return null;

  const reason = sabiRichText(record.reason, record.reviewReason, record.releaseReason) || "admin_restriction";
  const normalizedReason = reason.toLowerCase();
  const decision = normalizedReason.includes("reject")
    ? "rejected"
    : normalizedReason.includes("hide")
      ? "hidden"
      : "restricted";

  return {
    targetId,
    id: targetId,
    kind,
    type: kind,
    title: sabiRichText(record.title, record.name) || targetId,
    name: sabiRichText(record.title, record.name) || targetId,
    adminControlled: true,
    adminVisibilitySource: "admin",
    reviewAction: decision,
    reviewReason: reason,
    approvalStatus: decision,
    listingStatus: decision,
    visibility: decision,
    visibilityStatus: decision,
    promotionPlacement: "public",
    isPublic: false,
    searchableInDirectory: false,
    hidden: true,
    isHidden: true,
    restricted: decision !== "hidden",
    rawContentIncluded: false,
    updatedAt: sabiRichText(record.updatedAt, record.createdAt) || new Date().toISOString(),
  };
}

function readSabiAdminDirectoryControlRestrictionEntries(): Record<string, unknown>[] {
  try {
    if (!existsSync(SABI_ADMIN_DIRECTORY_CONTROL_FILE)) return [];
    const parsed = JSON.parse(readFileSync(SABI_ADMIN_DIRECTORY_CONTROL_FILE, "utf8"));
    const restrictions = Array.isArray(parsed?.restrictions) ? parsed.restrictions : [];
    return restrictions
      .map(normalizeSabiAdminDirectoryControlRestrictionEntry)
      .filter((item: Record<string, unknown> | null): item is Record<string, unknown> => Boolean(item));
  } catch {
    return [];
  }
}

function readSabiPublicDirectoryAdminEntries(): Record<string, unknown>[] {
  const rows: Record<string, unknown>[] = [...readSabiAdminDirectoryControlRestrictionEntries()];

  for (const file of [SABI_ADMIN_DIRECTORY_PROMOTION_FILE, SABI_ADMIN_APPROVAL_VISIBILITY_FILE]) {
    try {
      if (!existsSync(file)) continue;
      const parsed = JSON.parse(readFileSync(file, "utf8"));
      const entries = Array.isArray(parsed)
        ? parsed
        : Array.isArray(parsed?.entries)
          ? parsed.entries
          : Array.isArray(parsed?.items)
            ? parsed.items
            : Array.isArray(parsed?.records)
              ? parsed.records
              : Array.isArray(parsed?.rows)
                ? parsed.rows
                : Array.isArray(parsed?.data)
                  ? parsed.data
                  : Array.isArray(parsed?.data?.items)
                    ? parsed.data.items
                    : Array.isArray(parsed?.promotions)
                      ? parsed.promotions
                      : [];
      rows.push(...entries.filter((item: unknown): item is Record<string, unknown> => Boolean(item && typeof item === "object")));
    } catch {}
  }

  return rows;
}

function readSabiPublicDirectoryNumber(value: unknown, fallback = 0) {
  const next = Number(value);
  return Number.isFinite(next) ? Math.max(0, Math.floor(next)) : fallback;
}

function readSabiPublicDirectoryFeaturedRank(value: unknown) {
  const next = Number(value);
  return Number.isFinite(next) && next > 0 ? Math.floor(next) : 999999;
}

function normalizeSabiPublicDirectoryPromotionPlacement(value: unknown): "featured" | "boosted" | "recommended" | "approved" | "public" {
  const raw = String(value || "").trim().toLowerCase();
  if (raw === "featured" || raw === "boosted" || raw === "recommended" || raw === "approved") return raw;
  return "public";
}

function readSabiPublicDirectoryPromotionPriority(item: Record<string, unknown>) {
  const placement = normalizeSabiPublicDirectoryPromotionPlacement(item.promotionPlacement);
  const rank = readSabiPublicDirectoryFeaturedRank(item.featuredRank);

  if (rank < 999999 || placement === "featured") return 4;
  if (placement === "boosted") return 3;
  if (placement === "recommended" || readSabiPublicDirectoryBoolean(item.recommended, false) === true) return 2;
  if (placement === "approved") return 1;

  return 0;
}

function readSabiPublicDirectoryPromotionScore(item: Record<string, unknown>) {
  return (
    readSabiPublicDirectoryNumber(item.promotionScore, 0) +
    readSabiPublicDirectoryNumber(item.directoryBoostPct, 0) +
    readSabiPublicDirectoryNumber(item.searchBoostPct, 0)
  );
}

function readSabiPublicDirectoryBoolean(value: unknown, fallback = true) {
  if (typeof value === "boolean") return value;
  if (typeof value === "number") return value !== 0;
  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    if (["1", "true", "yes", "on", "public", "visible", "enabled"].includes(normalized)) return true;
    if (["0", "false", "no", "off", "private", "hidden", "disabled"].includes(normalized)) return false;
  }

  return fallback;
}

const SABI_PUBLIC_DIRECTORY_BLOCKED_STATUSES = new Set([
  "hidden",
  "private",
  "restricted",
  "rejected",
  "unsafe",
  "blocked",
  "suspended",
  "disabled",
  "deleted",
  "removed",
  "archived",
  "paused",
  "pending",
  "pending_approval",
  "needs_review",
  "profile_hidden",
  "profile_removed",
]);

function normalizeSabiPublicDirectoryStatus(value: unknown, fallback: string) {
  const normalized = String(value || fallback).trim().toLowerCase();
  return normalized || fallback;
}

function readSabiPublicDirectoryKindList(value: unknown, fallback: DirectoryKind[] = []): DirectoryKind[] {
  const raw = Array.isArray(value) ? value : typeof value === "string" && value.trim() ? value.split(",") : fallback;
  const set = new Set<DirectoryKind>();

  for (const item of raw) {
    const kind = normalizeKind(item);
    if (kind) set.add(kind);
  }

  return Array.from(set);
}


type SabiPublicDirectoryReviewAction = "approve" | "hide" | "restrict" | "reject" | "restore";

function normalizeSabiPublicDirectoryReviewAction(value: unknown): SabiPublicDirectoryReviewAction | null {
  const raw = String(value || "").trim().toLowerCase();

  if (raw === "approve" || raw === "approved") return "approve";
  if (raw === "hide" || raw === "hidden") return "hide";
  if (raw === "restrict" || raw === "restricted" || raw === "block" || raw === "blocked") return "restrict";
  if (raw === "reject" || raw === "rejected") return "reject";
  if (raw === "restore" || raw === "restored" || raw === "unhide" || raw === "show") return "restore";

  return null;
}

function readSabiPublicDirectoryAdminApprovalVisibilityRows(): Record<string, unknown>[] {
  try {
    if (!existsSync(SABI_ADMIN_APPROVAL_VISIBILITY_FILE)) return [];

    const parsed = JSON.parse(readFileSync(SABI_ADMIN_APPROVAL_VISIBILITY_FILE, "utf8"));
    const rows = Array.isArray(parsed)
      ? parsed
      : Array.isArray(parsed?.entries)
        ? parsed.entries
        : Array.isArray(parsed?.items)
          ? parsed.items
          : Array.isArray(parsed?.records)
            ? parsed.records
            : Array.isArray(parsed?.rows)
              ? parsed.rows
              : Array.isArray(parsed?.data)
                ? parsed.data
                : Array.isArray(parsed?.data?.items)
                  ? parsed.data.items
                  : [];

    return rows.filter((item: unknown): item is Record<string, unknown> => Boolean(item && typeof item === "object"));
  } catch {
    return [];
  }
}

async function persistSabiPublicDirectoryAdminApprovalVisibilityRows(rows: Record<string, unknown>[]) {
  await mkdir(path.dirname(SABI_ADMIN_APPROVAL_VISIBILITY_FILE), { recursive: true });

  await writeFile(
    SABI_ADMIN_APPROVAL_VISIBILITY_FILE,
    JSON.stringify(
      {
        ok: true,
        version: 1,
        updatedAt: new Date().toISOString(),
        adminControlled: true,
        rawContentIncluded: false,
        entries: rows,
      },
      null,
      2,
    ),
    "utf8",
  );
}

function isSabiPublicDirectoryAdminVisibilityRowForTarget(
  row: Record<string, unknown>,
  kind: SabiPublicDirectoryRichKind,
  id: string,
) {
  const rowKind = String(row.kind || row.type || "").trim().toUpperCase();
  const rowTarget = sabiRichText(row.targetId, row.id, row.chatId, row.roomId, row.groupId, row.channelId, row.botId);

  return rowKind === kind && rowTarget === id;
}

function buildSabiPublicDirectoryAdminDecisionRecord(params: {
  existing?: Record<string, unknown> | null;
  sourceRecord?: Record<string, unknown> | null;
  kind: SabiPublicDirectoryRichKind;
  id: string;
  action: SabiPublicDirectoryReviewAction;
  actorUserId: string;
  reason?: string | null;
  body?: Record<string, unknown> | null;
}) {
  const { existing, sourceRecord, kind, id, action, actorUserId, reason, body } = params;
  const now = new Date().toISOString();
  const title = sabiRichText(sourceRecord?.title, sourceRecord?.name, sourceRecord?.groupName, sourceRecord?.channelName, sourceRecord?.botName, existing?.title, existing?.name);
  const username = sabiRichText(sourceRecord?.username, sourceRecord?.handle, existing?.username, existing?.handle);
  const ownerUserId = sabiRichText(sourceRecord?.ownerUserId, sourceRecord?.createdBy, existing?.ownerUserId, existing?.createdBy);
  const promotionPlacement = normalizeSabiPublicDirectoryPromotionPlacement(
    body?.promotionPlacement || body?.placement || existing?.promotionPlacement || existing?.listingStatus,
  );
  const featuredRank = readSabiPublicDirectoryNumber(body?.featuredRank ?? existing?.featuredRank, 0);
  const searchBoostPct = readSabiPublicDirectoryNumber(body?.searchBoostPct ?? existing?.searchBoostPct, 0);
  const directoryBoostPct = readSabiPublicDirectoryNumber(body?.directoryBoostPct ?? existing?.directoryBoostPct, 0);
  const qualityScore = readSabiPublicDirectoryNumber(body?.qualityScore ?? existing?.qualityScore, 100);
  const safetyScore = readSabiPublicDirectoryNumber(body?.safetyScore ?? existing?.safetyScore, 100);
  const recommended = readSabiPublicDirectoryBoolean(body?.recommended ?? existing?.recommended, false);

  const base: Record<string, unknown> = {
    ...(existing || {}),
    targetId: id,
    id,
    kind,
    type: kind,
    title: title || id,
    name: title || id,
    username: username || null,
    ownerUserId: ownerUserId || null,
    adminControlled: true,
    adminVisibilitySource: "admin",
    reviewAction: action,
    reviewReason: reason || `${action}_by_admin`,
    decidedByUserId: actorUserId,
    decidedAt: now,
    updatedAt: now,
    rawContentIncluded: false,
    qualityScore,
    safetyScore,
    promotionScore: readSabiPublicDirectoryNumber(body?.promotionScore ?? existing?.promotionScore, 0),
  };

  if (featuredRank > 0) base.featuredRank = featuredRank;
  if (searchBoostPct > 0) base.searchBoostPct = searchBoostPct;
  if (directoryBoostPct > 0) base.directoryBoostPct = directoryBoostPct;
  if (recommended) base.recommended = true;

  if (action === "approve" || action === "restore") {
    return {
      ...base,
      approvalStatus: "approved",
      listingStatus: action === "approve" ? "approved" : "public",
      visibility: "public",
      visibilityStatus: "visible",
      promotionPlacement: promotionPlacement === "public" && (featuredRank > 0 || searchBoostPct > 0 || directoryBoostPct > 0 || recommended)
        ? featuredRank > 0
          ? "featured"
          : searchBoostPct > 0 || directoryBoostPct > 0
            ? "boosted"
            : "recommended"
        : promotionPlacement,
      isPublic: true,
      searchableInDirectory: true,
      hidden: false,
      isHidden: false,
      restricted: false,
      unsafe: false,
      reviewStatus: action === "approve" ? "approved" : "restored",
    };
  }

  if (action === "hide") {
    return {
      ...base,
      approvalStatus: "approved",
      listingStatus: "hidden",
      visibility: "hidden",
      visibilityStatus: "hidden",
      promotionPlacement: "public",
      isPublic: false,
      searchableInDirectory: false,
      hidden: true,
      isHidden: true,
      restricted: false,
      reviewStatus: "hidden",
    };
  }

  if (action === "restrict") {
    return {
      ...base,
      approvalStatus: "restricted",
      listingStatus: "restricted",
      visibility: "restricted",
      visibilityStatus: "restricted",
      promotionPlacement: "public",
      isPublic: false,
      searchableInDirectory: false,
      hidden: true,
      isHidden: true,
      restricted: true,
      reviewStatus: "restricted",
    };
  }

  return {
    ...base,
    approvalStatus: "rejected",
    listingStatus: "rejected",
    visibility: "rejected",
    visibilityStatus: "rejected",
    promotionPlacement: "public",
    isPublic: false,
    searchableInDirectory: false,
    hidden: true,
    isHidden: true,
    restricted: true,
    reviewStatus: "rejected",
  };
}

async function upsertSabiPublicDirectoryAdminDecisionRecord(params: {
  kind: SabiPublicDirectoryRichKind;
  id: string;
  action: SabiPublicDirectoryReviewAction;
  actorUserId: string;
  reason?: string | null;
  body?: Record<string, unknown> | null;
  sourceRecord?: Record<string, unknown> | null;
}) {
  const rows = readSabiPublicDirectoryAdminApprovalVisibilityRows();
  const index = rows.findIndex((row) => isSabiPublicDirectoryAdminVisibilityRowForTarget(row, params.kind, params.id));
  const existing = index >= 0 ? rows[index] : null;
  const next = buildSabiPublicDirectoryAdminDecisionRecord({ ...params, existing });

  if (index >= 0) rows[index] = next;
  else rows.push(next);

  await persistSabiPublicDirectoryAdminApprovalVisibilityRows(rows);

  return next;
}

function auditActionForSabiPublicDirectoryReviewAction(action: SabiPublicDirectoryReviewAction): SabiPublicDirectoryAuditAction {
  if (action === "approve") return "admin_review_approve";
  if (action === "hide") return "admin_review_hide";
  if (action === "restrict") return "admin_review_restrict";
  if (action === "reject") return "admin_review_reject";
  return "admin_review_restore";
}

function auditStatusForSabiPublicDirectoryReviewAction(action: SabiPublicDirectoryReviewAction): SabiPublicDirectoryAuditEntry["status"] {
  if (action === "approve") return "approved";
  if (action === "hide") return "hidden";
  if (action === "restrict") return "restricted";
  if (action === "reject") return "rejected";
  return "restored";
}

function isSabiProfileDirectoryHidden(item: Record<string, unknown>) {
  const controlledByAdmin =
    readSabiPublicDirectoryBoolean(item.adminControlled, false) === true ||
    normalizeSabiPublicDirectoryStatus(item.adminVisibilitySource, "") === "admin";

  if (controlledByAdmin) {
    return readSabiPublicDirectoryBoolean(item.deleted, false) === true;
  }

  const visibility = normalizeSabiPublicDirectoryStatus(item.visibilityStatus || item.visibility, "visible");
  const listing = normalizeSabiPublicDirectoryStatus(item.listingStatus, "public");
  const approval = normalizeSabiPublicDirectoryStatus(item.approvalStatus, "not_required");

  if (readSabiPublicDirectoryBoolean(item.isPublic, true) === false) return true;
  if (readSabiPublicDirectoryBoolean(item.searchableInDirectory, true) === false) return true;
  if (readSabiPublicDirectoryBoolean(item.hidden, false) === true) return true;
  if (readSabiPublicDirectoryBoolean(item.isHidden, false) === true) return true;
  if (readSabiPublicDirectoryBoolean(item.deleted, false) === true) return true;
  if (readSabiPublicDirectoryBoolean(item.unsafe, false) === true) return true;
  if (readSabiPublicDirectoryBoolean(item.restricted, false) === true) return true;
  if (SABI_PUBLIC_DIRECTORY_BLOCKED_STATUSES.has(visibility)) return true;
  if (SABI_PUBLIC_DIRECTORY_BLOCKED_STATUSES.has(listing)) return true;
  if (SABI_PUBLIC_DIRECTORY_BLOCKED_STATUSES.has(approval)) return true;

  return false;
}

function readSabiPublicDirectoryAdminGate(item: Record<string, unknown>): SabiPublicDirectoryAdminGate {
  const kind = sabiRichKind(item.kind || item.type).toLowerCase();
  const id = sabiRichText(item.id, item.chatId, item.roomId, item.groupId, item.channelId, item.botId);

  if (isSabiProfileDirectoryHidden(item)) {
    return {
      allowed: false,
      adminControlled: false,
      approvalStatus: String(item.approvalStatus || "profile_hidden"),
      listingStatus: String(item.listingStatus || "profile_hidden"),
      visibilityStatus: "hidden",
      promotionPlacement: "public",
      searchBoostPct: 0,
      directoryBoostPct: 0,
      recommended: false,
    };
  }

  const adminEntries = readSabiPublicDirectoryAdminEntries();
  const admin = adminEntries.find((entry) => {
    const entryKind = String(entry.kind || entry.type || "").toLowerCase();
    const entryTarget = sabiRichText(entry.targetId, entry.id, entry.chatId, entry.roomId, entry.groupId, entry.channelId, entry.botId);
    return entryKind === kind && Boolean(id) && entryTarget === id;
  });

  if (!admin) {
    return {
      allowed: true,
      adminControlled: false,
      approvalStatus: "not_required",
      listingStatus: "public",
      visibilityStatus: "visible",
      promotionPlacement: "public",
      searchBoostPct: 0,
      directoryBoostPct: 0,
      recommended: false,
    };
  }

  const approvalStatus = String(admin.approvalStatus || "approved");
  const listingStatus = String(admin.listingStatus || admin.approvalLane || "approved");
  const visibility = String(admin.visibility || admin.visibilityStatus || "public");
  const safetyScore = readSabiPublicDirectoryNumber(admin.safetyScore, 100);
  const qualityScore = readSabiPublicDirectoryNumber(admin.qualityScore, 100);
  const normalizedApproval = normalizeSabiPublicDirectoryStatus(approvalStatus, "approved");
  const normalizedListing = normalizeSabiPublicDirectoryStatus(listingStatus, "approved");
  const normalizedVisibility = normalizeSabiPublicDirectoryStatus(visibility, "public");
  const hidden =
    SABI_PUBLIC_DIRECTORY_BLOCKED_STATUSES.has(normalizedVisibility) ||
    SABI_PUBLIC_DIRECTORY_BLOCKED_STATUSES.has(normalizedListing) ||
    SABI_PUBLIC_DIRECTORY_BLOCKED_STATUSES.has(normalizedApproval);
  const needsReview = normalizedListing === "pending" || normalizedListing === "pending_approval" || normalizedVisibility === "needs_review" || safetyScore < 60 || qualityScore < 40;
  const featuredRank = readSabiPublicDirectoryNumber(admin.featuredRank, 0);
  const searchBoostPct = readSabiPublicDirectoryNumber(admin.searchBoostPct, 0);
  const directoryBoostPct = readSabiPublicDirectoryNumber(admin.directoryBoostPct, 0);
  const recommended = admin.recommended === true || listingStatus === "recommended" || String((admin as any).approvalLane || "") === "recommended";

  return {
    allowed: !hidden && !needsReview,
    adminControlled: true,
    approvalStatus,
    listingStatus,
    visibilityStatus: hidden ? visibility : needsReview ? "needs_review" : "visible",
    promotionPlacement: featuredRank > 0 || listingStatus === "featured" ? "featured" : searchBoostPct > 0 || directoryBoostPct > 0 || listingStatus === "boosted" ? "boosted" : recommended ? "recommended" : "approved",
    featuredRank: featuredRank > 0 ? featuredRank : undefined,
    searchBoostPct,
    directoryBoostPct,
    recommended,
    qualityScore,
    safetyScore,
    promotionScore: readSabiPublicDirectoryNumber(admin.promotionScore, 0),
  };
}

function applySabiPublicDirectoryAdminGate<T extends Record<string, unknown>>(item: T): T | null {
  const gate = readSabiPublicDirectoryAdminGate(item);
  if (!gate.allowed) return null;

  return {
    ...item,
    ...gate,
    adminVisibilitySource: gate.adminControlled ? "admin" : "profile",
    rawContentIncluded: false,
  };
}

function sortSabiPublicDirectoryForMobile(items: Record<string, unknown>[]) {
  return items.slice().sort((a, b) => {
    const priorityA = readSabiPublicDirectoryPromotionPriority(a);
    const priorityB = readSabiPublicDirectoryPromotionPriority(b);
    if (priorityA !== priorityB) return priorityB - priorityA;

    if (priorityA > 0 || priorityB > 0) {
      const rankA = readSabiPublicDirectoryFeaturedRank(a.featuredRank);
      const rankB = readSabiPublicDirectoryFeaturedRank(b.featuredRank);
      if (rankA !== rankB) return rankA - rankB;

      const scoreA = readSabiPublicDirectoryPromotionScore(a);
      const scoreB = readSabiPublicDirectoryPromotionScore(b);
      if (scoreA !== scoreB) return scoreB - scoreA;
    }

    return String(b.updatedAt || "").localeCompare(String(a.updatedAt || ""));
  });
}

function listSabiPublicDirectoryRichRecords(query: string, kind?: SabiPublicDirectoryRichKind) {
  loadSabiPublicDirectoryProfileSyncStoreOnce();

  const normalized = query.trim();

  return sortSabiPublicDirectoryForMobile(
    Array.from(SABI_PUBLIC_DIRECTORY_RICH_MEMORY.values())
      .filter((item) => {
        if (kind && sabiRichKind(item.kind || item.type) !== kind) return false;
        return normalized ? sabiRichMatches(item, normalized, kind) : true;
      })
      .map((item) => applySabiPublicDirectoryAdminGate(item))
      .filter((item): item is Record<string, unknown> => Boolean(item)),
  ).slice(0, 80);
}
function createSabiPublicDirectoryKindStats() {
  return {
    total: 0,
    visible: 0,
    hidden: 0,
    restricted: 0,
    rejected: 0,
    unsafe: 0,
    pendingReview: 0,
    profileRemoved: 0,
    adminControlled: 0,
    featured: 0,
    boosted: 0,
    recommended: 0,
    approved: 0,
    public: 0,
    joined: 0,
    subscribed: 0,
    started: 0,
  };
}

type SabiPublicDirectoryKindStats = ReturnType<typeof createSabiPublicDirectoryKindStats>;

type SabiPublicDirectoryStatsPayload = {
  updatedAt: string;
  adminControlled: true;
  rawContentIncluded: false;
  currentUserId: string;
  all: SabiPublicDirectoryKindStats;
  groups: SabiPublicDirectoryKindStats;
  channels: SabiPublicDirectoryKindStats;
  bots: SabiPublicDirectoryKindStats;
};

function addSabiPublicDirectoryStatsTotals(target: SabiPublicDirectoryKindStats, source: SabiPublicDirectoryKindStats) {
  for (const key of Object.keys(target) as Array<keyof SabiPublicDirectoryKindStats>) {
    target[key] += source[key];
  }
}

function readSabiPublicDirectoryStatsKindBucket(stats: SabiPublicDirectoryStatsPayload, kind: SabiPublicDirectoryRichKind) {
  if (kind === "CHANNEL") return stats.channels;
  if (kind === "BOT") return stats.bots;
  return stats.groups;
}

function statusSetContainsSabiDirectoryValue(statuses: Set<string>, ...values: unknown[]) {
  return values.some((value) => statuses.has(normalizeSabiPublicDirectoryStatus(value, "")));
}

function applySabiPublicDirectoryStatsRecord(
  stats: SabiPublicDirectoryStatsPayload,
  record: Record<string, unknown>,
) {
  const kind = sabiRichKind(record.kind || record.type);
  const id = sabiRichText(record.id, record.chatId, record.roomId, record.groupId, record.channelId, record.botId);
  const kindStats = readSabiPublicDirectoryStatsKindBucket(stats, kind);
  const gate = readSabiPublicDirectoryAdminGate(record);
  const visibility = record.visibilityStatus || record.visibility || gate.visibilityStatus;
  const listing = record.listingStatus || gate.listingStatus;
  const approval = record.approvalStatus || gate.approvalStatus;
  const hidden = !gate.allowed || isSabiProfileDirectoryHidden(record);

  kindStats.total += 1;
  if (gate.adminControlled) kindStats.adminControlled += 1;

  if (gate.allowed) {
    kindStats.visible += 1;

    if (gate.promotionPlacement === "featured") kindStats.featured += 1;
    else if (gate.promotionPlacement === "boosted") kindStats.boosted += 1;
    else if (gate.promotionPlacement === "recommended") kindStats.recommended += 1;
    else if (gate.promotionPlacement === "approved") kindStats.approved += 1;
    else kindStats.public += 1;
  }

  if (hidden) kindStats.hidden += 1;
  if (statusSetContainsSabiDirectoryValue(new Set(["restricted", "blocked", "suspended", "disabled", "paused"]), visibility, listing, approval)) kindStats.restricted += 1;
  if (statusSetContainsSabiDirectoryValue(new Set(["rejected"]), visibility, listing, approval)) kindStats.rejected += 1;
  if (statusSetContainsSabiDirectoryValue(new Set(["unsafe"]), visibility, listing, approval) || readSabiPublicDirectoryBoolean(record.unsafe, false) === true) kindStats.unsafe += 1;
  if (statusSetContainsSabiDirectoryValue(new Set(["pending", "pending_approval", "needs_review"]), visibility, listing, approval)) kindStats.pendingReview += 1;
  if (statusSetContainsSabiDirectoryValue(new Set(["profile_removed", "profile_hidden"]), visibility, listing, approval)) kindStats.profileRemoved += 1;

  if (id && hasSabiPublicDirectoryActionUser(kind, id, stats.currentUserId)) {
    if (kind === "GROUP") kindStats.joined += 1;
    else if (kind === "CHANNEL") kindStats.subscribed += 1;
    else kindStats.started += 1;
  }
}

async function listSabiPublicDirectoryStatsSourceRecords() {
  loadSabiPublicDirectoryProfileSyncStoreOnce();

  const records = new Map<string, Record<string, unknown>>();

  for (const item of SABI_PUBLIC_DIRECTORY_RICH_MEMORY.values()) {
    const kind = sabiRichKind(item.kind || item.type);
    const id = sabiRichText(item.id, item.chatId, item.roomId, item.groupId, item.channelId, item.botId);
    if (!id) continue;
    records.set(`${kind}:${id}`, { ...item, kind, type: kind });
  }

  const addRecord = (item: Record<string, unknown>) => {
    const kind = sabiRichKind(item.kind || item.type);
    const id = sabiRichText(item.id, item.chatId, item.roomId, item.groupId, item.channelId, item.botId);
    if (!id) return;
    const key = `${kind}:${id}`;
    records.set(key, { ...(records.get(key) || {}), ...item, kind, type: kind });
  };

  try {
    const groups = await listRoomsForDirectory("GROUP");
    groups.forEach((record) => addRecord(directoryItemFromRoom(record, "GROUP") as Record<string, unknown>));
  } catch {}

  try {
    const channels = await listRoomsForDirectory("CHANNEL");
    channels.forEach((record) => addRecord(directoryItemFromRoom(record, "CHANNEL") as Record<string, unknown>));
  } catch {}

  try {
    const bots = await listBotsForDirectory();
    bots.forEach((record) => addRecord(directoryItemFromBot(record) as Record<string, unknown>));
  } catch {}

  return Array.from(records.values());
}

async function buildSabiPublicDirectoryStats(currentUserId: string): Promise<SabiPublicDirectoryStatsPayload> {
  loadSabiPublicDirectoryActionStateOnce();

  const stats: SabiPublicDirectoryStatsPayload = {
    updatedAt: new Date().toISOString(),
    adminControlled: true,
    rawContentIncluded: false,
    currentUserId,
    all: createSabiPublicDirectoryKindStats(),
    groups: createSabiPublicDirectoryKindStats(),
    channels: createSabiPublicDirectoryKindStats(),
    bots: createSabiPublicDirectoryKindStats(),
  };

  const rows = await listSabiPublicDirectoryStatsSourceRecords();
  rows.forEach((record) => applySabiPublicDirectoryStatsRecord(stats, record));
  addSabiPublicDirectoryStatsTotals(stats.all, stats.groups);
  addSabiPublicDirectoryStatsTotals(stats.all, stats.channels);
  addSabiPublicDirectoryStatsTotals(stats.all, stats.bots);

  return stats;
}

function pickSabiPublicDirectoryStatsKind(stats: SabiPublicDirectoryStatsPayload, kind?: SabiPublicDirectoryRichKind) {
  if (kind === "GROUP") return stats.groups;
  if (kind === "CHANNEL") return stats.channels;
  if (kind === "BOT") return stats.bots;
  return stats.all;
}

async function getSabiPublicDirectoryStats(
  req: Request,
  res: Response,
  next: NextFunction,
  forcedKind?: DirectoryKind,
) {
  try {
    const currentUser = getRouteCurrentUser(req);
    const requestedKind = forcedKind ?? normalizeKind(req.query?.kind ?? req.query?.type) ?? undefined;
    const stats = await buildSabiPublicDirectoryStats(currentUser.id);
    const data = pickSabiPublicDirectoryStatsKind(stats, requestedKind as SabiPublicDirectoryRichKind | undefined);

    res.json({
      ok: true,
      data,
      stats,
      kind: requestedKind || "ALL",
      adminControlled: true,
      rawContentIncluded: false,
      updatedAt: stats.updatedAt,
    });
  } catch (error) {
    next(error);
  }
}


type SabiPublicDirectoryHealthFileState = {
  exists: boolean;
  loaded: boolean;
  validJson: boolean;
  sizeBytes: number;
  recordsCount: number;
  updatedAt: string | null;
  error: string | null;
};

type SabiPublicDirectoryHealthPayload = {
  updatedAt: string;
  adminControlled: true;
  rawContentIncluded: false;
  currentUserId: string;
  kind: SabiPublicDirectoryRichKind | "ALL";
  status: "ready" | "degraded";
  persistence: {
    profileSync: SabiPublicDirectoryHealthFileState;
    actionState: SabiPublicDirectoryHealthFileState;
    auditLog: SabiPublicDirectoryHealthFileState;
    adminPromotion: SabiPublicDirectoryHealthFileState;
    adminApprovalVisibility: SabiPublicDirectoryHealthFileState;
  };
  stores: {
    memoryRecords: number;
    memoryVisibleRecords: number;
    groups: number;
    channels: number;
    bots: number;
    joinedGroups: number;
    subscribedChannels: number;
    startedBots: number;
    auditEntries: number;
  };
  checks: {
    profileSyncLoaded: boolean;
    actionStateLoaded: boolean;
    auditLoaded: boolean;
    profileSyncPersistenceReady: boolean;
    actionStatePersistenceReady: boolean;
    auditPersistenceReady: boolean;
    statsReady: boolean;
    adminGateReady: boolean;
  };
  stats: SabiPublicDirectoryStatsPayload;
};

function countSabiPublicDirectoryJsonRecords(value: unknown): number {
  if (Array.isArray(value)) return value.length;
  if (!value || typeof value !== "object") return 0;

  const record = value as Record<string, unknown>;
  for (const key of ["entries", "items", "records", "rows", "data"] as const) {
    const next = record[key];
    if (Array.isArray(next)) return next.length;
  }

  return Object.keys(record).length;
}

function readSabiPublicDirectoryHealthUpdatedAt(value: unknown): string | null {
  if (!value || typeof value !== "object") return null;
  const record = value as Record<string, unknown>;
  return sabiRichText(record.updatedAt, record.syncedAt, record.createdAt, record.at) || null;
}

function readSabiPublicDirectoryHealthFile(filePath: string, loaded: boolean): SabiPublicDirectoryHealthFileState {
  try {
    if (!existsSync(filePath)) {
      return {
        exists: false,
        loaded,
        validJson: false,
        sizeBytes: 0,
        recordsCount: 0,
        updatedAt: null,
        error: null,
      };
    }

    const text = readFileSync(filePath, "utf8");
    let parsed: unknown = null;

    try {
      parsed = JSON.parse(text);
    } catch (error) {
      return {
        exists: true,
        loaded,
        validJson: false,
        sizeBytes: text.length,
        recordsCount: 0,
        updatedAt: null,
        error: error instanceof Error ? error.message : "invalid_json",
      };
    }

    return {
      exists: true,
      loaded,
      validJson: true,
      sizeBytes: text.length,
      recordsCount: countSabiPublicDirectoryJsonRecords(parsed),
      updatedAt: readSabiPublicDirectoryHealthUpdatedAt(parsed),
      error: null,
    };
  } catch (error) {
    return {
      exists: false,
      loaded,
      validJson: false,
      sizeBytes: 0,
      recordsCount: 0,
      updatedAt: null,
      error: error instanceof Error ? error.message : "health_file_read_failed",
    };
  }
}

function countSabiPublicDirectoryActionUsers(bucket: Record<string, string[]>): number {
  return Object.values(bucket).reduce((sum, users) => sum + normalizeSabiDirectoryActionStateUsers(users).length, 0);
}

function countSabiPublicDirectoryMemoryRecords(kind?: SabiPublicDirectoryRichKind) {
  let total = 0;

  for (const item of SABI_PUBLIC_DIRECTORY_RICH_MEMORY.values()) {
    if (kind && sabiRichKind(item.kind || item.type) !== kind) continue;
    total += 1;
  }

  return total;
}

function countSabiPublicDirectoryVisibleMemoryRecords(kind?: SabiPublicDirectoryRichKind) {
  let total = 0;

  for (const item of SABI_PUBLIC_DIRECTORY_RICH_MEMORY.values()) {
    if (kind && sabiRichKind(item.kind || item.type) !== kind) continue;
    if (applySabiPublicDirectoryAdminGate(item)) total += 1;
  }

  return total;
}

async function buildSabiPublicDirectoryHealth(
  currentUserId: string,
  forcedKind?: SabiPublicDirectoryRichKind,
): Promise<SabiPublicDirectoryHealthPayload> {
  loadSabiPublicDirectoryProfileSyncStoreOnce();
  loadSabiPublicDirectoryActionStateOnce();
  loadSabiPublicDirectoryAuditLogOnce();

  const stats = await buildSabiPublicDirectoryStats(currentUserId);
  const profileSync = readSabiPublicDirectoryHealthFile(
    SABI_PUBLIC_DIRECTORY_PROFILE_SYNC_FILE,
    SABI_PUBLIC_DIRECTORY_PROFILE_SYNC_LOADED,
  );
  const actionState = readSabiPublicDirectoryHealthFile(
    SABI_PUBLIC_DIRECTORY_ACTION_STATE_FILE,
    SABI_PUBLIC_DIRECTORY_ACTION_STATE_LOADED,
  );
  const auditLog = readSabiPublicDirectoryHealthFile(
    SABI_PUBLIC_DIRECTORY_AUDIT_FILE,
    SABI_PUBLIC_DIRECTORY_AUDIT_LOADED,
  );
  const adminPromotion = readSabiPublicDirectoryHealthFile(SABI_ADMIN_DIRECTORY_PROMOTION_FILE, false);
  const adminApprovalVisibility = readSabiPublicDirectoryHealthFile(SABI_ADMIN_APPROVAL_VISIBILITY_FILE, false);

  const checks = {
    profileSyncLoaded: SABI_PUBLIC_DIRECTORY_PROFILE_SYNC_LOADED,
    actionStateLoaded: SABI_PUBLIC_DIRECTORY_ACTION_STATE_LOADED,
    auditLoaded: SABI_PUBLIC_DIRECTORY_AUDIT_LOADED,
    profileSyncPersistenceReady: profileSync.exists ? profileSync.validJson : true,
    actionStatePersistenceReady: actionState.exists ? actionState.validJson : true,
    auditPersistenceReady: auditLog.exists ? auditLog.validJson : true,
    statsReady: true,
    adminGateReady: true,
  };

  const status = Object.values(checks).every(Boolean) ? "ready" : "degraded";

  return {
    updatedAt: new Date().toISOString(),
    adminControlled: true,
    rawContentIncluded: false,
    currentUserId,
    kind: forcedKind || "ALL",
    status,
    persistence: {
      profileSync,
      actionState,
      auditLog,
      adminPromotion,
      adminApprovalVisibility,
    },
    stores: {
      memoryRecords: countSabiPublicDirectoryMemoryRecords(forcedKind),
      memoryVisibleRecords: countSabiPublicDirectoryVisibleMemoryRecords(forcedKind),
      groups: countSabiPublicDirectoryMemoryRecords("GROUP"),
      channels: countSabiPublicDirectoryMemoryRecords("CHANNEL"),
      bots: countSabiPublicDirectoryMemoryRecords("BOT"),
      joinedGroups: countSabiPublicDirectoryActionUsers(SABI_PUBLIC_DIRECTORY_ACTION_STATE.joinedGroups),
      subscribedChannels: countSabiPublicDirectoryActionUsers(SABI_PUBLIC_DIRECTORY_ACTION_STATE.subscribedChannels),
      startedBots: countSabiPublicDirectoryActionUsers(SABI_PUBLIC_DIRECTORY_ACTION_STATE.startedBots),
      auditEntries: SABI_PUBLIC_DIRECTORY_AUDIT_LOG.length,
    },
    checks,
    stats,
  };
}

async function getSabiPublicDirectoryHealth(
  req: Request,
  res: Response,
  next: NextFunction,
  forcedKind?: DirectoryKind,
) {
  try {
    const currentUser = getRouteCurrentUser(req);
    const requestedKind = forcedKind ?? normalizeKind(req.query?.kind ?? req.query?.type) ?? undefined;
    const health = await buildSabiPublicDirectoryHealth(
      currentUser.id,
      requestedKind as SabiPublicDirectoryRichKind | undefined,
    );

    res.json({
      ok: health.status === "ready",
      data: health,
      health,
      kind: requestedKind || "ALL",
      adminControlled: true,
      rawContentIncluded: false,
      updatedAt: health.updatedAt,
    });
  } catch (error) {
    next(error);
  }
}

type SabiPublicDirectoryRuntimeSnapshot = {
  id: string;
  kind: SabiPublicDirectoryRichKind;
  roomType: "group" | "channel" | "bot";
  currentUserId: string;
  visibleInMobile: boolean;
  joinedByCurrentUser: boolean;
  subscribedByCurrentUser: boolean;
  startedByCurrentUser: boolean;
  membershipStatus: "member" | "subscriber" | "started" | "none";
  canSendMessages: boolean;
  canInvite: boolean;
  inviteAvailable: boolean;
  inviteLink: string | null;
  shareText: string | null;
  memberUserIds: string[];
  subscriberUserIds: string[];
  startedUserIds: string[];
  membersCount: number;
  subscribersCount: number;
  startedCount: number;
  adminControlled: true;
  rawContentIncluded: false;
  updatedAt: string;
};

function readSabiPublicDirectoryActionUsers(kind: SabiPublicDirectoryRichKind, id: string): string[] {
  loadSabiPublicDirectoryActionStateOnce();

  const bucket =
    kind === "GROUP"
      ? SABI_PUBLIC_DIRECTORY_ACTION_STATE.joinedGroups
      : kind === "CHANNEL"
        ? SABI_PUBLIC_DIRECTORY_ACTION_STATE.subscribedChannels
        : SABI_PUBLIC_DIRECTORY_ACTION_STATE.startedBots;

  return normalizeSabiDirectoryActionStateUsers(bucket[id]);
}

function mergeSabiPublicDirectoryUniqueUsers(...values: Array<unknown>): string[] {
  const seen = new Set<string>();
  const users: string[] = [];

  for (const value of values) {
    const rows = Array.isArray(value) ? value : [value];

    for (const row of rows) {
      const userId = sabiRichText(row);
      if (!userId || seen.has(userId)) continue;
      seen.add(userId);
      users.push(userId);
    }
  }

  return users;
}

function buildSabiPublicDirectoryInviteLink(
  kind: SabiPublicDirectoryRichKind,
  id: string,
  item?: Record<string, unknown> | null,
) {
  const configured = sabiRichText(
    item?.inviteLink,
    item?.shareLink,
    item?.channelInviteLink,
    item?.groupInviteLink,
    item?.publicLink,
  );
  if (configured) return configured;

  const segment = kind === "GROUP" ? "group" : kind === "CHANNEL" ? "channel" : "bot";
  return `/messenger/${segment}/${encodeURIComponent(id)}`;
}

function buildSabiPublicDirectoryRuntimeSnapshot(params: {
  kind: SabiPublicDirectoryRichKind;
  id: string;
  currentUserId: string;
  item?: Record<string, unknown> | null;
}): SabiPublicDirectoryRuntimeSnapshot {
  const kind = params.kind;
  const id = params.id.trim();
  const currentUserId = params.currentUserId.trim();
  const item = params.item || null;
  const actionUsers = readSabiPublicDirectoryActionUsers(kind, id);
  const ownerUserId = sabiRichText(item?.ownerUserId, item?.createdBy, item?.createdByUserId);
  const adminIds = Array.isArray(item?.adminIds) ? item?.adminIds : [];
  const memberUserIds = kind === "GROUP"
    ? mergeSabiPublicDirectoryUniqueUsers(actionUsers, currentUserId, ownerUserId, adminIds)
    : [];
  const subscriberUserIds = kind === "CHANNEL"
    ? mergeSabiPublicDirectoryUniqueUsers(actionUsers, currentUserId, ownerUserId, adminIds)
    : [];
  const startedUserIds = kind === "BOT"
    ? mergeSabiPublicDirectoryUniqueUsers(actionUsers, currentUserId)
    : [];
  const joinedByCurrentUser = kind === "GROUP" && Boolean(currentUserId && memberUserIds.includes(currentUserId));
  const subscribedByCurrentUser = kind === "CHANNEL" && Boolean(currentUserId && subscriberUserIds.includes(currentUserId));
  const startedByCurrentUser = kind === "BOT" && Boolean(currentUserId && startedUserIds.includes(currentUserId));
  const inviteLink = kind === "BOT" ? null : buildSabiPublicDirectoryInviteLink(kind, id, item);
  const title = sabiRichText(item?.title, item?.name, item?.groupName, item?.channelName, item?.botName) || id;
  const isOwner = Boolean(currentUserId && ownerUserId && currentUserId === ownerUserId);
  const isAdmin = Boolean(currentUserId && adminIds.map((value) => sabiRichText(value)).includes(currentUserId));
  const channelCanPost = kind === "CHANNEL" && (isOwner || isAdmin || readSabiPublicDirectoryBoolean(item?.canSendMessages, false));

  return {
    id,
    kind,
    roomType: kind === "GROUP" ? "group" : kind === "CHANNEL" ? "channel" : "bot",
    currentUserId,
    visibleInMobile: Boolean(item),
    joinedByCurrentUser,
    subscribedByCurrentUser,
    startedByCurrentUser,
    membershipStatus: joinedByCurrentUser ? "member" : subscribedByCurrentUser ? "subscriber" : startedByCurrentUser ? "started" : "none",
    canSendMessages: kind === "GROUP" ? joinedByCurrentUser : kind === "CHANNEL" ? channelCanPost : false,
    canInvite: kind === "GROUP" ? joinedByCurrentUser || isOwner || isAdmin : kind === "CHANNEL" ? subscribedByCurrentUser || isOwner || isAdmin : false,
    inviteAvailable: kind !== "BOT" && Boolean(inviteLink),
    inviteLink,
    shareText: kind === "BOT" ? null : `${kind === "GROUP" ? "Join group" : "Subscribe channel"}: ${title}`,
    memberUserIds,
    subscriberUserIds,
    startedUserIds,
    membersCount: memberUserIds.length,
    subscribersCount: subscriberUserIds.length,
    startedCount: startedUserIds.length,
    adminControlled: true,
    rawContentIncluded: false,
    updatedAt: new Date().toISOString(),
  };
}

async function getSabiPublicDirectoryRuntimeSnapshot(
  req: Request,
  res: Response,
  next: NextFunction,
  forcedKind?: DirectoryKind,
) {
  try {
    const currentUser = getRouteCurrentUser(req);
    const kind = forcedKind ?? normalizeKind(req.query?.kind ?? req.query?.type) ?? "GROUP";
    const id =
      asString(req.params?.roomId) ||
      asString(req.params?.botId) ||
      asString(req.query?.id) ||
      asString(req.query?.chatId) ||
      asString(req.query?.roomId) ||
      asString(req.query?.botId);

    if (!id) throw new Error("directory_runtime_id_required");

    let fallbackItem: Record<string, unknown> | null = null;

    if (kind === "BOT") {
      const bot = await findDirectoryBot(id);
      if (bot) fallbackItem = directoryItemFromBot(bot) as Record<string, unknown>;
    } else {
      const room = await findDirectoryRoom(id, kind);
      if (room) fallbackItem = directoryItemFromRoom(room, kind) as Record<string, unknown>;
    }

    const visibleItem = gateSabiPublicDirectoryActionItem(kind, id, fallbackItem || undefined);
    if (!visibleItem) {
      rejectSabiPublicDirectoryHiddenAction(res, kind, id, currentUser.id);
      return;
    }

    const runtime = buildSabiPublicDirectoryRuntimeSnapshot({
      kind,
      id,
      currentUserId: currentUser.id,
      item: visibleItem,
    });

    res.json({
      ok: true,
      data: {
        ...visibleItem,
        runtime,
      },
      runtime,
      kind,
      id,
      adminControlled: true,
      rawContentIncluded: false,
      updatedAt: runtime.updatedAt,
    });
  } catch (error) {
    next(error);
  }
}


type SabiPublicDirectoryReviewStatus =
  | "needs_review"
  | "restricted"
  | "hidden"
  | "rejected"
  | "unsafe"
  | "profile_removed";

type SabiPublicDirectoryReviewQueueEntry = {
  id: string;
  kind: SabiPublicDirectoryRichKind;
  title: string;
  name: string;
  username: string | null;
  ownerUserId: string | null;
  status: SabiPublicDirectoryReviewStatus;
  reason: string;
  visibilityStatus: string;
  listingStatus: string;
  approvalStatus: string;
  promotionPlacement: string;
  qualityScore: number;
  safetyScore: number;
  adminControlled: boolean;
  rawContentIncluded: false;
  updatedAt: string;
};

function statusSetContainsSabiDirectoryReviewValue(
  statuses: Set<string>,
  ...values: unknown[]
) {
  return values.some((value) => statuses.has(normalizeSabiPublicDirectoryStatus(value, "")));
}

function resolveSabiPublicDirectoryReviewStatus(params: {
  record: Record<string, unknown>;
  gate: SabiPublicDirectoryAdminGate;
  visibilityStatus: string;
  listingStatus: string;
  approvalStatus: string;
}): SabiPublicDirectoryReviewStatus | null {
  const { record, gate, visibilityStatus, listingStatus, approvalStatus } = params;
  const values = [visibilityStatus, listingStatus, approvalStatus];

  if (statusSetContainsSabiDirectoryReviewValue(new Set(["profile_removed", "profile_hidden"]), ...values)) {
    return "profile_removed";
  }

  if (statusSetContainsSabiDirectoryReviewValue(new Set(["rejected"]), ...values)) {
    return "rejected";
  }

  if (
    statusSetContainsSabiDirectoryReviewValue(new Set(["unsafe"]), ...values) ||
    readSabiPublicDirectoryBoolean(record.unsafe, false) === true ||
    readSabiPublicDirectoryNumber(record.safetyScore, gate.safetyScore ?? 100) < 60
  ) {
    return "unsafe";
  }

  if (
    statusSetContainsSabiDirectoryReviewValue(
      new Set(["restricted", "blocked", "suspended", "disabled", "paused"]),
      ...values,
    ) ||
    readSabiPublicDirectoryBoolean(record.restricted, false) === true
  ) {
    return "restricted";
  }

  if (
    statusSetContainsSabiDirectoryReviewValue(new Set(["pending", "pending_approval", "needs_review"]), ...values) ||
    readSabiPublicDirectoryNumber(record.qualityScore, gate.qualityScore ?? 100) < 40 ||
    gate.visibilityStatus === "needs_review"
  ) {
    return "needs_review";
  }

  if (
    statusSetContainsSabiDirectoryReviewValue(new Set(["hidden", "private", "deleted", "removed", "archived"]), ...values) ||
    isSabiProfileDirectoryHidden(record) ||
    !gate.allowed
  ) {
    return "hidden";
  }

  return null;
}

function readSabiPublicDirectoryReviewReason(status: SabiPublicDirectoryReviewStatus) {
  if (status === "profile_removed") return "profile_removed_or_profile_hidden";
  if (status === "rejected") return "admin_rejected";
  if (status === "unsafe") return "safety_or_admin_unsafe_signal";
  if (status === "restricted") return "admin_restricted_or_blocked";
  if (status === "needs_review") return "pending_admin_review";
  return "hidden_from_public_directory";
}

function buildSabiPublicDirectoryReviewQueueEntry(
  record: Record<string, unknown>,
): SabiPublicDirectoryReviewQueueEntry | null {
  const kind = sabiRichKind(record.kind || record.type);
  const id = sabiRichText(record.id, record.chatId, record.roomId, record.groupId, record.channelId, record.botId);
  const title = sabiRichText(record.title, record.name, record.groupName, record.channelName, record.botName) || "Untitled";
  if (!id) return null;

  const gate = readSabiPublicDirectoryAdminGate(record);
  const visibilityStatus = normalizeSabiPublicDirectoryStatus(record.visibilityStatus || record.visibility || gate.visibilityStatus, "visible");
  const listingStatus = normalizeSabiPublicDirectoryStatus(record.listingStatus || gate.listingStatus, "public");
  const approvalStatus = normalizeSabiPublicDirectoryStatus(record.approvalStatus || gate.approvalStatus, "not_required");
  const status = resolveSabiPublicDirectoryReviewStatus({
    record,
    gate,
    visibilityStatus,
    listingStatus,
    approvalStatus,
  });

  if (!status) return null;

  return {
    id,
    kind,
    title,
    name: title,
    username: sabiRichText(record.username, record.handle) || null,
    ownerUserId: sabiRichText(record.ownerUserId, record.createdBy) || null,
    status,
    reason: readSabiPublicDirectoryReviewReason(status),
    visibilityStatus,
    listingStatus,
    approvalStatus,
    promotionPlacement: String(gate.promotionPlacement || record.promotionPlacement || "public"),
    qualityScore: readSabiPublicDirectoryNumber(record.qualityScore, gate.qualityScore ?? 0),
    safetyScore: readSabiPublicDirectoryNumber(record.safetyScore, gate.safetyScore ?? 0),
    adminControlled: true,
    rawContentIncluded: false,
    updatedAt: sabiRichText(record.updatedAt, record.createdAt, record.syncedAt) || new Date().toISOString(),
  };
}

function readSabiPublicDirectoryReviewSeverity(status: SabiPublicDirectoryReviewStatus) {
  if (status === "unsafe") return 6;
  if (status === "restricted") return 5;
  if (status === "rejected") return 4;
  if (status === "needs_review") return 3;
  if (status === "hidden") return 2;
  return 1;
}

async function buildSabiPublicDirectoryReviewQueue(params: {
  kind?: SabiPublicDirectoryRichKind;
  status?: string;
  limit?: number;
}) {
  const requestedStatus = normalizeSabiPublicDirectoryStatus(params.status, "");
  const limit = Math.min(Math.max(params.limit || 100, 1), 250);
  const records = await listSabiPublicDirectoryStatsSourceRecords();
  const seen = new Set<string>();
  const entries: SabiPublicDirectoryReviewQueueEntry[] = [];

  for (const record of records) {
    const kind = sabiRichKind(record.kind || record.type);
    if (params.kind && kind !== params.kind) continue;

    const entry = buildSabiPublicDirectoryReviewQueueEntry({ ...record, kind, type: kind });
    if (!entry) continue;
    if (requestedStatus && entry.status !== requestedStatus) continue;

    const key = `${entry.kind}:${entry.id}`;
    if (seen.has(key)) continue;
    seen.add(key);
    entries.push(entry);
  }

  return entries
    .sort((a, b) => {
      const severity = readSabiPublicDirectoryReviewSeverity(b.status) - readSabiPublicDirectoryReviewSeverity(a.status);
      if (severity !== 0) return severity;
      return String(b.updatedAt || "").localeCompare(String(a.updatedAt || ""));
    })
    .slice(0, limit);
}

async function getSabiPublicDirectoryReviewQueue(
  req: Request,
  res: Response,
  next: NextFunction,
  forcedKind?: DirectoryKind,
) {
  try {
    const currentUser = getRouteCurrentUser(req);
    const requestedKind = forcedKind ?? normalizeKind(req.query?.kind ?? req.query?.type) ?? undefined;
    const status = asString(req.query?.status);
    const limit = readSabiPublicDirectoryNumber(req.query?.limit, 100);
    let degradedReason: string | null = null;
    const entries = await withSabiPublicDirectoryAdminTimeout(
      "directory.review_queue",
      buildSabiPublicDirectoryReviewQueue({
        kind: requestedKind as SabiPublicDirectoryRichKind | undefined,
        status,
        limit,
      }),
      [] as ReturnType<typeof buildSabiPublicDirectoryReviewQueue> extends Promise<infer R> ? R : never,
      () => {
        degradedReason = "directory_review_queue_timeout";
      },
    );

    res.json({
      ok: true,
      status: degradedReason ? "degraded" : "ready",
      error: degradedReason,
      data: entries,
      items: entries,
      count: entries.length,
      kind: requestedKind || "ALL",
      currentUserId: currentUser.id,
      forAdminReviewOnly: true,
      adminControlled: true,
      rawContentIncluded: false,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    next(error);
  }
}


async function resolveSabiPublicDirectoryReviewSourceRecord(kind: SabiPublicDirectoryRichKind, id: string) {
  const richRecord = findSabiPublicDirectoryRichRecordById(kind, id);
  if (richRecord) return richRecord;

  if (kind === "BOT") {
    const bot = await findDirectoryBot(id);
    return bot ? directoryItemFromBot(bot) as Record<string, unknown> : null;
  }

  const room = await findDirectoryRoom(id, kind);
  return room ? directoryItemFromRoom(room, kind) as Record<string, unknown> : null;
}

async function applySabiPublicDirectoryReviewAction(
  req: Request,
  res: Response,
  next: NextFunction,
  forcedKind?: DirectoryKind,
) {
  try {
    const currentUser = getRouteCurrentUser(req);
    const body = req.body && typeof req.body === "object" && !Array.isArray(req.body) ? req.body as Record<string, unknown> : {};
    const kind = forcedKind ?? normalizeKind(req.params?.kind ?? body.kind ?? body.type);
    const id =
      asString(req.params?.id) ||
      asString(req.params?.roomId) ||
      asString(req.params?.botId) ||
      asString(body.targetId) ||
      asString(body.id) ||
      asString(body.chatId) ||
      asString(body.roomId) ||
      asString(body.groupId) ||
      asString(body.channelId) ||
      asString(body.botId);
    const action = normalizeSabiPublicDirectoryReviewAction(body.action ?? req.params?.action ?? req.query?.action);
    const reason = asString(body.reason) || asString(body.reviewReason) || asString(body.note) || null;

    if (!kind) throw new Error("directory_kind_required");
    if (!id) throw new Error("directory_target_id_required");
    if (!action) throw new Error("directory_review_action_required");

    const sourceRecord = await resolveSabiPublicDirectoryReviewSourceRecord(kind, id);
    const decision = await upsertSabiPublicDirectoryAdminDecisionRecord({
      kind,
      id,
      action,
      actorUserId: currentUser.id,
      reason,
      body,
      sourceRecord,
    });

    const mergedRecord = rememberSabiPublicDirectoryRichRecord(
      {
        ...(sourceRecord || {}),
        ...decision,
        id,
        chatId: kind === "BOT" ? undefined : id,
        roomId: kind === "BOT" ? undefined : id,
        groupId: kind === "GROUP" ? id : undefined,
        channelId: kind === "CHANNEL" ? id : undefined,
        botId: kind === "BOT" ? id : undefined,
        kind,
        type: kind,
      },
      kind,
    ) || { ...(sourceRecord || {}), ...decision, id, kind, type: kind };

    await persistSabiPublicDirectoryProfileSyncStore();

    const gate = readSabiPublicDirectoryAdminGate(mergedRecord);
    const visibleItem = applySabiPublicDirectoryAdminGate(mergedRecord);

    await writeSabiPublicDirectoryAudit({
      action: auditActionForSabiPublicDirectoryReviewAction(action),
      kind,
      targetId: id,
      actorUserId: currentUser.id,
      status: auditStatusForSabiPublicDirectoryReviewAction(action),
      code: null,
      visibilityStatus: gate.visibilityStatus,
      listingStatus: gate.listingStatus,
      approvalStatus: gate.approvalStatus,
      promotionPlacement: gate.promotionPlacement,
      source: "admin_review_action",
    });

    res.json({
      ok: true,
      data: {
        ...mergedRecord,
        ...gate,
        visibleInMobile: Boolean(visibleItem),
        reviewAction: action,
        reviewReason: reason,
        adminControlled: true,
        rawContentIncluded: false,
      },
      item: visibleItem,
      action,
      kind,
      id,
      visibleInMobile: Boolean(visibleItem),
      adminControlled: true,
      rawContentIncluded: false,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    next(error);
  }
}

function findSabiPublicDirectoryRichRecordById(kind: SabiPublicDirectoryRichKind, id: string) {
  loadSabiPublicDirectoryProfileSyncStoreOnce();

  const direct = SABI_PUBLIC_DIRECTORY_RICH_MEMORY.get(`${kind}:${id}`);
  if (direct) return direct;

  return Array.from(SABI_PUBLIC_DIRECTORY_RICH_MEMORY.values()).find((item) => {
    if (sabiRichKind(item.kind || item.type) !== kind) return false;

    return [
      item.id,
      item.chatId,
      item.roomId,
      item.groupId,
      item.channelId,
      item.botId,
    ]
      .map((value) => String(value || "").trim())
      .filter(Boolean)
      .includes(id);
  }) ?? null;
}

function gateSabiPublicDirectoryActionItem(
  kind: SabiPublicDirectoryRichKind,
  id: string,
  fallbackItem?: Record<string, unknown>,
): Record<string, any> | null {
  const richRecord = findSabiPublicDirectoryRichRecordById(kind, id);
  const candidate: Record<string, unknown> = richRecord ?? fallbackItem ?? { id, kind, type: kind };

  return applySabiPublicDirectoryAdminGate({
    ...candidate,
    id,
    kind,
    type: kind,
  }) as Record<string, any> | null;
}

function rejectSabiPublicDirectoryHiddenAction(
  res: Response,
  kind: SabiPublicDirectoryRichKind,
  id: string,
  actorUserId?: string | null,
) {
  void writeSabiPublicDirectoryAudit({
    action: "directory_action_blocked",
    kind,
    targetId: id,
    actorUserId: actorUserId || null,
    status: "blocked",
    code: "public_directory_item_not_visible",
    source: "action_gate",
  });

  res.status(403).json({
    ok: false,
    error: "public_directory_item_not_visible",
    kind,
    id,
    adminControlled: true,
    rawContentIncluded: false,
  });
}
async function syncDirectoryItem(
  req: Request,
  res: Response,
  next: NextFunction,
  forcedKind?: DirectoryKind,
) {
  try {
    const currentUser = getRouteCurrentUser(req)
    const bodyRecord = req.body && typeof req.body === "object" && !Array.isArray(req.body) ? req.body as Record<string, unknown> : null;
    const rows = readSabiPublicDirectoryProfileSyncRows(req.body, forcedKind);
    const synced: Record<string, unknown>[] = [];
    const incomingKeys = new Set<string>();
    const incomingKinds = new Set<DirectoryKind>(readSabiPublicDirectoryKindList(bodyRecord?.kinds, forcedKind ? [forcedKind] : []));
    const replaceForOwner = readSabiPublicDirectoryBoolean(bodyRecord?.replaceForOwner, false) === true || String(bodyRecord?.syncMode || "").trim().toLowerCase() === "replace";

    for (const row of rows) {
      const body = row as Record<string, unknown>;
      const kind = forcedKind ?? normalizeKind(body.kind ?? body.type)

      if (!kind) throw new Error("directory_kind_required")

      const title =
        asString(body.title) ||
        asString(body.name) ||
        asString(body.groupName) ||
        asString(body.channelName) ||
        asString(body.botName)

      if (!title) throw new Error("directory_title_required")

      const id =
        asString(body.chatId) ||
        asString(body.roomId) ||
        asString(body.groupId) ||
        asString(body.channelId) ||
        asString(body.botId) ||
        asString(body.id) ||
        buildFallbackId(kind, title)

      incomingKinds.add(kind);
      incomingKeys.add(`${kind}:${id}`);

      const richRecord = rememberSabiPublicDirectoryRichRecord(
        {
          ...body,
          id,
          chatId: kind === "BOT" ? undefined : id,
          roomId: kind === "BOT" ? undefined : id,
          groupId: kind === "GROUP" ? id : undefined,
          channelId: kind === "CHANNEL" ? id : undefined,
          botId: kind === "BOT" ? id : undefined,
          title,
          name: title,
          ownerUserId: asString(body.ownerUserId) || currentUser.id,
          createdBy: asString(body.createdBy) || asString(body.ownerUserId) || currentUser.id,
          kind,
          type: kind,
        },
        kind,
      )

      const actionGate = richRecord ? readSabiPublicDirectoryAdminGate(richRecord) : null;

      if (actionGate) {
        const promotionPlacement = actionGate.promotionPlacement || "public";
        await writeSabiPublicDirectoryAudit({
          action: !actionGate.allowed
            ? SABI_PUBLIC_DIRECTORY_BLOCKED_STATUSES.has(normalizeSabiPublicDirectoryStatus(actionGate.visibilityStatus, ""))
              ? "profile_sync_hidden"
              : "profile_sync_restricted"
            : promotionPlacement !== "public"
              ? "admin_promotion_applied"
              : "profile_sync_visible",
          kind,
          targetId: id,
          actorUserId: currentUser.id,
          status: !actionGate.allowed ? "blocked" : promotionPlacement !== "public" ? "promoted" : "visible",
          code: !actionGate.allowed ? "admin_profile_gate_blocked" : null,
          visibilityStatus: actionGate.visibilityStatus,
          listingStatus: actionGate.listingStatus,
          approvalStatus: actionGate.approvalStatus,
          promotionPlacement,
          source: String(bodyRecord?.source || "profile"),
        });
      }

      if (actionGate && !actionGate.allowed) {
        if (richRecord) synced.push(richRecord);
        continue;
      }

      const base = {
        id,
        title,
        ownerUserId: currentUser.id,
        username: asString(body.username) ?? null,
        description: asString(body.description) ?? null,
        avatarUrl: asString(body.avatarUrl) ?? asString(body.avatarUri) ?? asString(body.photoUrl) ?? null,
      }

      if (kind === "BOT") {
        await saveBotDirectoryItem({
          ...base,
          webhookUrl: asString(body.webhookUrl) ?? null,
        })

        if (richRecord) synced.push(richRecord)
        continue
      }

      await saveRoomDirectoryItem({
        ...base,
        kind,
      })

      await ensureOwnerMember(id, currentUser.id)

      if (richRecord) synced.push(richRecord)
    }

    if (replaceForOwner) {
      await markSabiPublicDirectoryMissingProfileRecordsHidden({
        ownerUserId: currentUser.id,
        kinds: incomingKinds,
        incomingKeys,
      });
    }

    await persistSabiPublicDirectoryProfileSyncStore();

    const gated = sortSabiPublicDirectoryForMobile(
      synced
        .map((item) => applySabiPublicDirectoryAdminGate(item))
        .filter((item): item is Record<string, unknown> => Boolean(item)),
    );

    res.json({
      ok: true,
      data: Array.isArray(req.body) || rows.length > 1 ? gated : gated[0] ?? null,
      items: gated,
      count: gated.length,
      adminControlled: true,
      rawContentIncluded: false,
    })
  } catch (error) {
    next(error)
  }
}

async function searchRooms(kind: "GROUP" | "CHANNEL", query: string): Promise<PrismaRecord[]> {
  const delegate = roomDelegate()

  const fullWhere = {
    OR: [
      {
        type: kind,
      },
      {
        kind,
      },
    ],
    AND: [
      {
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          { name: { contains: query, mode: "insensitive" } },
          { username: { contains: query, mode: "insensitive" } },
          { id: { contains: query, mode: "insensitive" } },
        ],
      },
    ],
  }

  const safeWhere = {
    type: kind,
    OR: [
      { title: { contains: query, mode: "insensitive" } },
      { id: { contains: query, mode: "insensitive" } },
    ],
  }

  try {
    return await delegate.findMany({
      where: fullWhere,
      orderBy: { updatedAt: "desc" },
      take: 30,
    })
  } catch {}

  try {
    return await delegate.findMany({
      where: safeWhere,
      orderBy: { updatedAt: "desc" },
      take: 30,
    })
  } catch {}

  const rows = await delegate.findMany({
    where: { type: kind },
    take: 100,
  })

  const normalized = query.toLowerCase()

  return rows
    .filter((record) =>
      [
        readRecordText(record, ["id", "chatId", "roomId"]),
        readRecordText(record, ["title", "name"]),
        readRecordText(record, ["username", "handle"]),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(normalized),
    )
    .slice(0, 30)
}

async function listRoomsForDirectory(kind: "GROUP" | "CHANNEL"): Promise<PrismaRecord[]> {
  const delegate = roomDelegate()

  const fullWhere = {
    OR: [{ type: kind }, { kind }],
  }

  try {
    return await delegate.findMany({
      where: fullWhere,
      orderBy: { updatedAt: "desc" },
      take: 80,
    })
  } catch {}

  try {
    return await delegate.findMany({
      where: { type: kind },
      take: 80,
    })
  } catch {}

  return []
}

async function listBotsForDirectory(): Promise<PrismaRecord[]> {
  const delegate = botDelegate()

  try {
    return await delegate.findMany({
      orderBy: { updatedAt: "desc" },
      take: 80,
    })
  } catch {}

  try {
    return await delegate.findMany({
      take: 80,
    })
  } catch {}

  return []
}

async function searchBots(query: string): Promise<PrismaRecord[]> {
  const delegate = botDelegate()

  const fullWhere = {
    OR: [
      { title: { contains: query, mode: "insensitive" } },
      { name: { contains: query, mode: "insensitive" } },
      { username: { contains: query, mode: "insensitive" } },
      { id: { contains: query, mode: "insensitive" } },
    ],
  }

  const safeWhere = {
    OR: [
      { title: { contains: query, mode: "insensitive" } },
      { id: { contains: query, mode: "insensitive" } },
    ],
  }

  try {
    return await delegate.findMany({
      where: fullWhere,
      orderBy: { updatedAt: "desc" },
      take: 30,
    })
  } catch {}

  try {
    return await delegate.findMany({
      where: safeWhere,
      take: 30,
    })
  } catch {}

  const rows = await delegate.findMany({
    take: 100,
  })

  const normalized = query.toLowerCase()

  return rows
    .filter((record) =>
      [
        readRecordText(record, ["id", "botId"]),
        readRecordText(record, ["title", "name", "botName"]),
        readRecordText(record, ["username", "handle"]),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(normalized),
    )
    .slice(0, 30)
}

async function searchDirectory(
  req: Request,
  res: Response,
  next: NextFunction,
  forcedKind?: DirectoryKind,
) {
  try {
    const query = normalizeQuery(req.query?.query ?? req.query?.q)
    const requestedKind = forcedKind ?? normalizeKind(req.query?.kind ?? req.query?.type)

    const listMode = req.query?.list === "1" || req.query?.list === "true" || req.query?.mobile === "1" || req.query?.adminControlled === "1"

    if (!query && !listMode) {
      res.json({ ok: true, data: [] })
      return
    }

    const result: unknown[] = []

    if (!requestedKind || requestedKind === "GROUP") {
      const groups = query ? await searchRooms("GROUP", query) : await listRoomsForDirectory("GROUP")
      result.push(...groups.map((record) => directoryItemFromRoom(record, "GROUP")))
    }

    if (!requestedKind || requestedKind === "CHANNEL") {
      const channels = query ? await searchRooms("CHANNEL", query) : await listRoomsForDirectory("CHANNEL")
      result.push(...channels.map((record) => directoryItemFromRoom(record, "CHANNEL")))
    }

    if (!requestedKind || requestedKind === "BOT") {
      const bots = query ? await searchBots(query) : await listBotsForDirectory()
      result.push(...bots.map(directoryItemFromBot))
    }

    const gated = sortSabiPublicDirectoryForMobile(
      result
        .filter((item): item is Record<string, unknown> => Boolean(item && typeof item === "object"))
        .map((item) => applySabiPublicDirectoryAdminGate(item))
        .filter((item): item is Record<string, unknown> => Boolean(item)),
    )

    res.json({
      ok: true,
      data: gated,
      items: gated,
      adminControlled: true,
      rawContentIncluded: false,
    })
  } catch (error) {
    next(error)
  }
}

router.use(requireMessengerCurrentUser)

router.get("/directory/health", (req, res, next) =>
  getSabiPublicDirectoryHealth(req, res, next),
)

router.get("/public-directory/health", (req, res, next) =>
  getSabiPublicDirectoryHealth(req, res, next),
)

router.get("/groups/health", (req, res, next) =>
  getSabiPublicDirectoryHealth(req, res, next, "GROUP"),
)

router.get("/channels/health", (req, res, next) =>
  getSabiPublicDirectoryHealth(req, res, next, "CHANNEL"),
)

router.get("/bots/health", (req, res, next) =>
  getSabiPublicDirectoryHealth(req, res, next, "BOT"),
)

router.get("/directory/stats", (req, res, next) =>
  getSabiPublicDirectoryStats(req, res, next),
)

router.get("/public-directory/stats", (req, res, next) =>
  getSabiPublicDirectoryStats(req, res, next),
)

router.get("/groups/stats", (req, res, next) =>
  getSabiPublicDirectoryStats(req, res, next, "GROUP"),
)

router.get("/channels/stats", (req, res, next) =>
  getSabiPublicDirectoryStats(req, res, next, "CHANNEL"),
)

router.get("/bots/stats", (req, res, next) =>
  getSabiPublicDirectoryStats(req, res, next, "BOT"),
)

router.get("/directory/audit", (req, res, next) =>
  getSabiPublicDirectoryAuditLog(req, res, next),
)

router.get("/public-directory/audit", (req, res, next) =>
  getSabiPublicDirectoryAuditLog(req, res, next),
)

router.get("/groups/audit", (req, res, next) =>
  getSabiPublicDirectoryAuditLog(req, res, next, "GROUP"),
)

router.get("/channels/audit", (req, res, next) =>
  getSabiPublicDirectoryAuditLog(req, res, next, "CHANNEL"),
)

router.get("/bots/audit", (req, res, next) =>
  getSabiPublicDirectoryAuditLog(req, res, next, "BOT"),
)


router.get("/directory/review-queue", (req, res, next) =>
  getSabiPublicDirectoryReviewQueue(req, res, next),
)

router.get("/public-directory/review-queue", (req, res, next) =>
  getSabiPublicDirectoryReviewQueue(req, res, next),
)

router.get("/groups/review-queue", (req, res, next) =>
  getSabiPublicDirectoryReviewQueue(req, res, next, "GROUP"),
)

router.get("/channels/review-queue", (req, res, next) =>
  getSabiPublicDirectoryReviewQueue(req, res, next, "CHANNEL"),
)

router.get("/bots/review-queue", (req, res, next) =>
  getSabiPublicDirectoryReviewQueue(req, res, next, "BOT"),
)


router.post("/directory/review-action", (req, res, next) =>
  applySabiPublicDirectoryReviewAction(req, res, next),
)

router.post("/public-directory/review-action", (req, res, next) =>
  applySabiPublicDirectoryReviewAction(req, res, next),
)

router.post("/groups/:roomId/review-action", (req, res, next) =>
  applySabiPublicDirectoryReviewAction(req, res, next, "GROUP"),
)

router.post("/channels/:roomId/review-action", (req, res, next) =>
  applySabiPublicDirectoryReviewAction(req, res, next, "CHANNEL"),
)

router.post("/bots/:botId/review-action", (req, res, next) =>
  applySabiPublicDirectoryReviewAction(req, res, next, "BOT"),
)

router.get("/groups/:roomId/runtime", (req, res, next) =>
  getSabiPublicDirectoryRuntimeSnapshot(req, res, next, "GROUP"),
)

router.get("/channels/:roomId/runtime", (req, res, next) =>
  getSabiPublicDirectoryRuntimeSnapshot(req, res, next, "CHANNEL"),
)

router.get("/bots/:botId/runtime", (req, res, next) =>
  getSabiPublicDirectoryRuntimeSnapshot(req, res, next, "BOT"),
)

router.get("/directory/runtime", (req, res, next) =>
  getSabiPublicDirectoryRuntimeSnapshot(req, res, next),
)

router.get("/public-directory/runtime", (req, res, next) =>
  getSabiPublicDirectoryRuntimeSnapshot(req, res, next),
)

router.post("/directory/profile-sync", (req, res, next) =>
  syncDirectoryItem(req, res, next),
)

router.post("/groups/profile-sync", (req, res, next) =>
  syncDirectoryItem(req, res, next, "GROUP"),
)

router.post("/channels/profile-sync", (req, res, next) =>
  syncDirectoryItem(req, res, next, "CHANNEL"),
)

router.post("/bots/profile-sync", (req, res, next) =>
  syncDirectoryItem(req, res, next, "BOT"),
)


// SABI_PUBLIC_DIRECTORY_RICH_SEARCH_ROUTES
router.get("/directory/search", (req, res, next) => {
  const query = sabiRichText(req.query?.q, req.query?.query, req.query?.search);
  const listMode = req.query?.list === "1" || req.query?.list === "true" || req.query?.mobile === "1" || req.query?.adminControlled === "1";
  const rows = listSabiPublicDirectoryRichRecords(query);

  if (rows.length > 0) {
    res.json({ ok: true, data: rows, items: rows, adminControlled: true, rawContentIncluded: false });
    return;
  }

  searchDirectory(req, res, next);
});

router.get("/public-directory/search", (req, res, next) => {
  const query = sabiRichText(req.query?.q, req.query?.query, req.query?.search);
  const listMode = req.query?.list === "1" || req.query?.list === "true" || req.query?.mobile === "1" || req.query?.adminControlled === "1";
  const rows = listSabiPublicDirectoryRichRecords(query);

  if (rows.length > 0) {
    res.json({ ok: true, data: rows, items: rows, adminControlled: true, rawContentIncluded: false });
    return;
  }

  searchDirectory(req, res, next);
});

router.get("/groups/search", (req, res, next) => {
  const query = sabiRichText(req.query?.q, req.query?.query, req.query?.search);
  const listMode = req.query?.list === "1" || req.query?.list === "true" || req.query?.mobile === "1" || req.query?.adminControlled === "1";
  const rows = listSabiPublicDirectoryRichRecords(query, "GROUP");

  if (rows.length > 0) {
    res.json({ ok: true, data: rows, items: rows, adminControlled: true, rawContentIncluded: false });
    return;
  }

  searchDirectory(req, res, next, "GROUP");
});

router.get("/channels/search", (req, res, next) => {
  const query = sabiRichText(req.query?.q, req.query?.query, req.query?.search);
  const listMode = req.query?.list === "1" || req.query?.list === "true" || req.query?.mobile === "1" || req.query?.adminControlled === "1";
  const rows = listSabiPublicDirectoryRichRecords(query, "CHANNEL");

  if (rows.length > 0) {
    res.json({ ok: true, data: rows, items: rows, adminControlled: true, rawContentIncluded: false });
    return;
  }

  searchDirectory(req, res, next, "CHANNEL");
});

router.get("/bots/search", (req, res, next) => {
  const query = sabiRichText(req.query?.q, req.query?.query, req.query?.search);
  const listMode = req.query?.list === "1" || req.query?.list === "true" || req.query?.mobile === "1" || req.query?.adminControlled === "1";
  const rows = listSabiPublicDirectoryRichRecords(query, "BOT");

  if (rows.length > 0) {
    res.json({ ok: true, data: rows, items: rows, adminControlled: true, rawContentIncluded: false });
    return;
  }

  searchDirectory(req, res, next, "BOT");
});
router.get("/directory/search", (req, res, next) =>
  searchDirectory(req, res, next),
)

router.get("/public-directory/search", (req, res, next) =>
  searchDirectory(req, res, next),
)

router.get("/groups/search", (req, res, next) =>
  searchDirectory(req, res, next, "GROUP"),
)

router.get("/channels/search", (req, res, next) =>
  searchDirectory(req, res, next, "CHANNEL"),
)

router.get("/bots/search", (req, res, next) =>
  searchDirectory(req, res, next, "BOT"),
)


// SABI_PUBLIC_DIRECTORY_ACTIONS
async function findDirectoryRoom(roomId: string, kind: "GROUP" | "CHANNEL") {
  const delegate = roomDelegate()

  try {
    const room = await delegate.findUnique({
      where: { id: roomId },
    })

    if (room) return room
  } catch {}

  try {
    const rows = await delegate.findMany({
      where: {
        type: kind,
        id: roomId,
      },
      take: 1,
    })

    if (rows[0]) return rows[0]
  } catch {}

  return null
}

async function findDirectoryBot(botId: string) {
  const delegate = botDelegate()

  try {
    const bot = await delegate.findUnique({
      where: { id: botId },
    })

    if (bot) return bot
  } catch {}

  try {
    const rows = await delegate.findMany({
      where: { id: botId },
      take: 1,
    })

    if (rows[0]) return rows[0]
  } catch {}

  return null
}

async function findExistingPublicMember(roomId: string, userId: string) {
  const delegate = memberDelegate()

  try {
    const rows = await delegate.findMany({
      where: {
        chatId: roomId,
        userId,
      },
      take: 1,
    })

    if (rows[0]) return rows[0]
  } catch {}

  try {
    const rows = await delegate.findMany({
      where: {
        roomId,
        userId,
      },
      take: 1,
    })

    if (rows[0]) return rows[0]
  } catch {}

  return null
}

async function ensurePublicDirectoryMember(input: {
  roomId: string
  userId: string
  role?: "OWNER" | "ADMIN" | "MEMBER" | "SUBSCRIBER"
}) {
  const delegate = memberDelegate()
  const existing = await findExistingPublicMember(input.roomId, input.userId)

  if (existing) return existing

  const role = input.role ?? "MEMBER"
  const nowDate = new Date()

  const fullData = {
    id: `${input.roomId}:${input.userId}`,
    chatId: input.roomId,
    roomId: input.roomId,
    userId: input.userId,
    role,
    isArchived: false,
    joinedAt: nowDate,
    createdAt: nowDate,
    updatedAt: nowDate,
  }

  const chatData = {
    chatId: input.roomId,
    userId: input.userId,
    role,
    isArchived: false,
    joinedAt: nowDate,
  }

  const roomData = {
    roomId: input.roomId,
    userId: input.userId,
    role,
    joinedAt: nowDate,
  }

  try {
    return await delegate.create({ data: fullData })
  } catch {}

  try {
    return await delegate.create({ data: chatData })
  } catch {}

  try {
    return await delegate.create({ data: roomData })
  } catch {}

  return null
}

async function joinPublicGroup(req: Request, res: Response, next: NextFunction) {
  try {
    const currentUser = getRouteCurrentUser(req)
    const roomId = asString(req.params?.roomId)

    if (!roomId) throw new Error("group_id_required")

    const room = await findDirectoryRoom(roomId, "GROUP")
    if (!room) throw new Error("group_not_found")

    const visibleItem = gateSabiPublicDirectoryActionItem("GROUP", roomId, directoryItemFromRoom(room, "GROUP") as Record<string, unknown>)
    if (!visibleItem) {
      rejectSabiPublicDirectoryHiddenAction(res, "GROUP", roomId, currentUser.id)
      return
    }

    await ensurePublicDirectoryMember({
      roomId,
      userId: currentUser.id,
      role: "MEMBER",
    })

    await rememberSabiPublicDirectoryActionState({
      kind: "GROUP",
      id: roomId,
      userId: currentUser.id,
    })

    const runtime = buildSabiPublicDirectoryRuntimeSnapshot({
      kind: "GROUP",
      id: roomId,
      currentUserId: currentUser.id,
      item: visibleItem,
    })

    await writeSabiPublicDirectoryAudit({
      action: "group_join",
      kind: "GROUP",
      targetId: roomId,
      actorUserId: currentUser.id,
      status: "success",
      visibilityStatus: String(visibleItem.visibilityStatus || "visible"),
      listingStatus: String(visibleItem.listingStatus || "public"),
      approvalStatus: String(visibleItem.approvalStatus || "not_required"),
      promotionPlacement: String(visibleItem.promotionPlacement || "public"),
      source: "mobile_action",
    })

    res.json({
      ok: true,
      data: {
        ...visibleItem,
        runtime,
        membershipStatus: "member",
        joinedByCurrentUser: true,
        canSendMessages: runtime.canSendMessages,
        canInvite: runtime.canInvite,
        inviteAvailable: runtime.inviteAvailable,
        inviteLink: runtime.inviteLink,
        shareText: runtime.shareText,
        memberUserIds: runtime.memberUserIds,
        membersCount: runtime.membersCount,
      },
      runtime,
      adminControlled: true,
      rawContentIncluded: false,
    })
  } catch (error) {
    next(error)
  }
}

async function subscribePublicChannel(req: Request, res: Response, next: NextFunction) {
  try {
    const currentUser = getRouteCurrentUser(req)
    const roomId = asString(req.params?.roomId)

    if (!roomId) throw new Error("channel_id_required")

    const room = await findDirectoryRoom(roomId, "CHANNEL")
    if (!room) throw new Error("channel_not_found")

    const visibleItem = gateSabiPublicDirectoryActionItem("CHANNEL", roomId, directoryItemFromRoom(room, "CHANNEL") as Record<string, unknown>)
    if (!visibleItem) {
      rejectSabiPublicDirectoryHiddenAction(res, "CHANNEL", roomId, currentUser.id)
      return
    }

    await ensurePublicDirectoryMember({
      roomId,
      userId: currentUser.id,
      role: "SUBSCRIBER",
    })

    await rememberSabiPublicDirectoryActionState({
      kind: "CHANNEL",
      id: roomId,
      userId: currentUser.id,
    })

    const runtime = buildSabiPublicDirectoryRuntimeSnapshot({
      kind: "CHANNEL",
      id: roomId,
      currentUserId: currentUser.id,
      item: visibleItem,
    })

    await writeSabiPublicDirectoryAudit({
      action: "channel_subscribe",
      kind: "CHANNEL",
      targetId: roomId,
      actorUserId: currentUser.id,
      status: "success",
      visibilityStatus: String(visibleItem.visibilityStatus || "visible"),
      listingStatus: String(visibleItem.listingStatus || "public"),
      approvalStatus: String(visibleItem.approvalStatus || "not_required"),
      promotionPlacement: String(visibleItem.promotionPlacement || "public"),
      source: "mobile_action",
    })

    res.json({
      ok: true,
      data: {
        ...visibleItem,
        runtime,
        membershipStatus: "subscriber",
        subscribedByCurrentUser: true,
        canSendMessages: runtime.canSendMessages,
        canInvite: runtime.canInvite,
        inviteAvailable: runtime.inviteAvailable,
        inviteLink: runtime.inviteLink,
        shareText: runtime.shareText,
        subscriberUserIds: runtime.subscriberUserIds,
        subscribersCount: runtime.subscribersCount,
      },
      runtime,
      adminControlled: true,
      rawContentIncluded: false,
    })
  } catch (error) {
    next(error)
  }
}

async function addPublicRoomMember(
  req: Request,
  res: Response,
  next: NextFunction,
  kind: "GROUP" | "CHANNEL",
) {
  try {
    const currentUser = getRouteCurrentUser(req)
    const roomId = asString(req.params?.roomId)
    const userId =
      asString(req.body?.userId) ||
      asString(req.body?.memberUserId) ||
      asString(req.body?.subscriberUserId) ||
      asString(req.body?.targetUserId)

    if (!roomId) throw new Error(kind === "GROUP" ? "group_id_required" : "channel_id_required")
    if (!userId) throw new Error("target_user_id_required")

    const room = await findDirectoryRoom(roomId, kind)
    if (!room) throw new Error(kind === "GROUP" ? "group_not_found" : "channel_not_found")

    const visibleItem = gateSabiPublicDirectoryActionItem(kind, roomId, directoryItemFromRoom(room, kind) as Record<string, unknown>)
    if (!visibleItem) {
      rejectSabiPublicDirectoryHiddenAction(res, kind, roomId, currentUser.id)
      return
    }

    await ensurePublicDirectoryMember({
      roomId,
      userId,
      role: kind === "GROUP" ? "MEMBER" : "SUBSCRIBER",
    })

    await writeSabiPublicDirectoryAudit({
      action: kind === "GROUP" ? "group_member_add" : "channel_member_add",
      kind,
      targetId: roomId,
      actorUserId: currentUser.id,
      targetUserId: userId,
      status: "success",
      source: "mobile_action",
    })

    await rememberSabiPublicDirectoryActionState({
      kind,
      id: roomId,
      userId,
    })

    const runtime = buildSabiPublicDirectoryRuntimeSnapshot({
      kind,
      id: roomId,
      currentUserId: currentUser.id,
      item: visibleItem,
    })

    res.json({
      ok: true,
      data: {
        roomId,
        chatId: roomId,
        userId,
        kind,
        status: kind === "GROUP" ? "member" : "subscriber",
        runtime,
      },
      runtime,
      adminControlled: true,
      rawContentIncluded: false,
    })
  } catch (error) {
    next(error)
  }
}

async function invitePublicRoomMember(
  req: Request,
  res: Response,
  next: NextFunction,
  kind: "GROUP" | "CHANNEL",
) {
  try {
    const currentUser = getRouteCurrentUser(req)
    const roomId = asString(req.params?.roomId)
    const inviteeUserId =
      asString(req.body?.userId) ||
      asString(req.body?.inviteeUserId) ||
      asString(req.body?.targetUserId)

    if (!roomId) throw new Error(kind === "GROUP" ? "group_id_required" : "channel_id_required")

    const room = await findDirectoryRoom(roomId, kind)
    if (!room) throw new Error(kind === "GROUP" ? "group_not_found" : "channel_not_found")

    const visibleItem = gateSabiPublicDirectoryActionItem(kind, roomId, directoryItemFromRoom(room, kind) as Record<string, unknown>)
    if (!visibleItem) {
      rejectSabiPublicDirectoryHiddenAction(res, kind, roomId, currentUser.id)
      return
    }

    const runtime = buildSabiPublicDirectoryRuntimeSnapshot({
      kind,
      id: roomId,
      currentUserId: currentUser.id,
      item: visibleItem,
    })
    const inviteLink = runtime.inviteLink || `/messenger/${kind.toLowerCase()}/${encodeURIComponent(roomId)}`

    await writeSabiPublicDirectoryAudit({
      action: kind === "GROUP" ? "group_invite" : "channel_invite",
      kind,
      targetId: roomId,
      actorUserId: currentUser.id,
      targetUserId: inviteeUserId || null,
      status: "success",
      source: "mobile_action",
    })

    res.json({
      ok: true,
      data: {
        roomId,
        chatId: roomId,
        kind,
        inviteeUserId: inviteeUserId ?? null,
        inviteLink,
        shareText: runtime.shareText || `${kind === "GROUP" ? "Join group" : "Subscribe channel"}: ${readRecordText(room, ["title", "name"]) ?? roomId}`,
        runtime,
      },
      runtime,
      adminControlled: true,
      rawContentIncluded: false,
    })
  } catch (error) {
    next(error)
  }
}

async function startPublicBot(req: Request, res: Response, next: NextFunction) {
  try {
    const currentUser = getRouteCurrentUser(req)
    const botId = asString(req.params?.botId)

    if (!botId) throw new Error("bot_id_required")

    const bot = await findDirectoryBot(botId)
    if (!bot) throw new Error("bot_not_found")

    const visibleItem = gateSabiPublicDirectoryActionItem("BOT", botId, directoryItemFromBot(bot) as Record<string, unknown>)
    if (!visibleItem) {
      rejectSabiPublicDirectoryHiddenAction(res, "BOT", botId, currentUser.id)
      return
    }

    await rememberSabiPublicDirectoryActionState({
      kind: "BOT",
      id: botId,
      userId: currentUser.id,
    })

    const runtime = buildSabiPublicDirectoryRuntimeSnapshot({
      kind: "BOT",
      id: botId,
      currentUserId: currentUser.id,
      item: visibleItem,
    })

    await writeSabiPublicDirectoryAudit({
      action: "bot_start",
      kind: "BOT",
      targetId: botId,
      actorUserId: currentUser.id,
      status: "success",
      visibilityStatus: String(visibleItem.visibilityStatus || "visible"),
      listingStatus: String(visibleItem.listingStatus || "public"),
      approvalStatus: String(visibleItem.approvalStatus || "not_required"),
      promotionPlacement: String(visibleItem.promotionPlacement || "public"),
      source: "mobile_action",
    })

    res.json({
      ok: true,
      data: {
        ...visibleItem,
        runtime,
        started: true,
        startedByCurrentUser: true,
        startedUserIds: runtime.startedUserIds,
        startedCount: runtime.startedCount,
        currentUserId: currentUser.id,
      },
      runtime,
      adminControlled: true,
      rawContentIncluded: false,
    })
  } catch (error) {
    next(error)
  }
}


const SABI_GROUP_PUBLIC_LIKES_BACKEND_STORE_FILE = path.resolve(
  process.cwd(),
  "data",
  "messenger-group-public-likes.json",
)

type SabiGroupPublicLikeMediaItem = {
  id?: string
  uri?: string
  kind?: "photo" | "video"
  type?: "photo" | "video"
  thumbnailUri?: string
  mediaUri?: string
  liked?: boolean
  likedByUserIds?: string[]
  [key: string]: unknown
}

type SabiGroupPublicLikeSurface = {
  chatId: string
  groupId?: string
  title?: string | null
  name?: string | null
  groupName?: string | null
  username?: string | null
  avatarUri?: string | null
  avatarUrl?: string | null
  coverUri?: string | null
  publicationPhotos: SabiGroupPublicLikeMediaItem[]
  publicationVideos: SabiGroupPublicLikeMediaItem[]
  likesCount: number
  aliases: string[]
  updatedAt: number
  [key: string]: unknown
}

type SabiGroupPublicLikeStore = {
  version: 1
  profiles: Record<string, SabiGroupPublicLikeSurface>
  aliases: Record<string, string>
}

let SABI_GROUP_PUBLIC_LIKES_BACKEND_STORE: SabiGroupPublicLikeStore | null = null

function sabiGroupLikeText(value: unknown): string {
  return typeof value === "string" && value.trim() ? value.trim() : ""
}

function sabiGroupLikeNumber(value: unknown): number {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? Math.max(0, Math.floor(parsed)) : 0
}

function sabiGroupLikeAlias(value: unknown): string {
  return sabiGroupLikeText(value).replace(/^@+/, "").toLowerCase()
}

function sabiGroupLikeAliasVariants(value: unknown): string[] {
  const raw = sabiGroupLikeText(value)
  if (!raw) return []

  const normalized = raw.replace(/^@+/, "").toLowerCase()
  const values = new Set<string>()

  if (normalized) values.add(normalized)
  if (normalized && !normalized.startsWith("group:")) values.add("group:" + normalized)
  if (normalized.startsWith("group:")) {
    const withoutPrefix = normalized.slice("group:".length).trim()
    if (withoutPrefix) values.add(withoutPrefix)
  }

  return Array.from(values)
}

function sabiGroupLikeAliases(values: unknown[]): string[] {
  const seen = new Set<string>()
  const aliases: string[] = []

  values.forEach((value) => {
    if (Array.isArray(value)) {
      value.forEach((nested) => {
        sabiGroupLikeAliasVariants(nested).forEach((alias) => {
          if (!alias || seen.has(alias)) return
          seen.add(alias)
          aliases.push(alias)
        })
      })
      return
    }

    sabiGroupLikeAliasVariants(value).forEach((alias) => {
      if (!alias || seen.has(alias)) return
      seen.add(alias)
      aliases.push(alias)
    })
  })

  return aliases
}

function sabiGroupLikeArray(value: unknown): unknown[] {
  if (Array.isArray(value)) return value
  if (typeof value === "string" && value.trim()) {
    try {
      const parsed = JSON.parse(value)
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  }
  return []
}

function sabiGroupLikeUsers(value: unknown): string[] {
  if (!Array.isArray(value)) return []
  const seen = new Set<string>()
  const users: string[] = []

  value.forEach((item) => {
    const userId = sabiGroupLikeText(item)
    if (!userId || seen.has(userId)) return
    seen.add(userId)
    users.push(userId)
  })

  return users
}

function sabiGroupLikeNormalizeMedia(value: unknown, kind: "photo" | "video"): SabiGroupPublicLikeMediaItem[] {
  return sabiGroupLikeArray(value)
    .map((item, index) => {
      if (!item || typeof item !== "object" || Array.isArray(item)) return null
      const raw = item as Record<string, unknown>
      const id = sabiGroupLikeText(raw.id) || kind + "-" + index
      const uri = sabiGroupLikeText(raw.uri)
      const mediaUri = sabiGroupLikeText(raw.mediaUri)
      const thumbnailUri = sabiGroupLikeText(raw.thumbnailUri)
      if (!uri && !mediaUri && !thumbnailUri) return null

      return {
        ...raw,
        id,
        kind,
        uri: uri || mediaUri || thumbnailUri,
        mediaUri: mediaUri || undefined,
        thumbnailUri: thumbnailUri || undefined,
        liked: typeof raw.liked === "boolean" ? raw.liked : undefined,
        likedByUserIds: sabiGroupLikeUsers(raw.likedByUserIds),
      } as SabiGroupPublicLikeMediaItem
    })
    .filter((item): item is SabiGroupPublicLikeMediaItem => item !== null)
}

function sabiGroupLikeMediaMatches(item: SabiGroupPublicLikeMediaItem, mediaId: string): boolean {
  const id = sabiGroupLikeText(mediaId)
  if (!id) return false
  return [item.id, item.uri, item.mediaUri, item.thumbnailUri]
    .map(sabiGroupLikeText)
    .filter(Boolean)
    .includes(id)
}

function sabiGroupLikeCount(photos: SabiGroupPublicLikeMediaItem[], videos: SabiGroupPublicLikeMediaItem[]): number {
  return [...photos, ...videos].reduce((total, item) => {
    const users = Array.isArray(item.likedByUserIds) ? item.likedByUserIds.length : 0
    return total + Math.max(users, item.liked ? 1 : 0)
  }, 0)
}

async function sabiGroupLikeStore(): Promise<SabiGroupPublicLikeStore> {
  if (SABI_GROUP_PUBLIC_LIKES_BACKEND_STORE) return SABI_GROUP_PUBLIC_LIKES_BACKEND_STORE

  try {
    const raw = await readFile(SABI_GROUP_PUBLIC_LIKES_BACKEND_STORE_FILE, "utf8")
    const parsed = JSON.parse(raw) as Partial<SabiGroupPublicLikeStore>
    SABI_GROUP_PUBLIC_LIKES_BACKEND_STORE = {
      version: 1,
      profiles: parsed.profiles || {},
      aliases: parsed.aliases || {},
    }
  } catch {
    SABI_GROUP_PUBLIC_LIKES_BACKEND_STORE = { version: 1, profiles: {}, aliases: {} }
  }

  return SABI_GROUP_PUBLIC_LIKES_BACKEND_STORE
}

async function sabiPersistGroupLikeStore(store: SabiGroupPublicLikeStore) {
  await mkdir(path.dirname(SABI_GROUP_PUBLIC_LIKES_BACKEND_STORE_FILE), { recursive: true })
  await writeFile(SABI_GROUP_PUBLIC_LIKES_BACKEND_STORE_FILE, JSON.stringify(store, null, 2), "utf8")
}

function sabiRegisterGroupLikeAliases(store: SabiGroupPublicLikeStore, surface: SabiGroupPublicLikeSurface) {
  sabiGroupLikeAliases([
    surface.chatId,
    surface.groupId,
    surface.title,
    surface.name,
    surface.groupName,
    surface.username,
    ...surface.aliases,
  ]).forEach((alias) => {
    store.aliases[alias] = surface.chatId
  })
}

async function sabiFindGroupLikeSurface(identifier: string): Promise<SabiGroupPublicLikeSurface | null> {
  const store = await sabiGroupLikeStore()
  const variants = sabiGroupLikeAliasVariants(identifier)

  for (const alias of variants) {
    const key = store.aliases[alias] || alias
    if (store.profiles[key]) return store.profiles[key]
  }

  const room = await findDirectoryRoom(identifier, "GROUP").catch(() => null)
  if (!room) return null

  const item = directoryItemFromRoom(room, "GROUP") as Record<string, unknown>
  return {
    ...item,
    chatId: sabiGroupLikeText(item.chatId) || identifier,
    groupId: sabiGroupLikeText(item.groupId) || sabiGroupLikeText(item.chatId) || identifier,
    publicationPhotos: [],
    publicationVideos: [],
    likesCount: sabiGroupLikeNumber(item.likesCount),
    aliases: sabiGroupLikeAliases([identifier, item.chatId, item.groupId, item.id, item.username, item.title, item.name]),
    updatedAt: Date.now(),
  }
}

async function sabiSaveGroupLikeSurface(identifier: string, body: Record<string, unknown>): Promise<SabiGroupPublicLikeSurface> {
  const store = await sabiGroupLikeStore()
  const current = await sabiFindGroupLikeSurface(identifier)
  const chatId =
    sabiGroupLikeText(body.chatId) ||
    sabiGroupLikeText(body.groupId) ||
    current?.chatId ||
    identifier

  const publicationPhotos = sabiGroupLikeNormalizeMedia(body.publicationPhotos || body.publicPhotos || current?.publicationPhotos || [], "photo")
  const publicationVideos = sabiGroupLikeNormalizeMedia(body.publicationVideos || body.publicVideos || current?.publicationVideos || [], "video")
  const countedLikes = sabiGroupLikeCount(publicationPhotos, publicationVideos)

  const surface: SabiGroupPublicLikeSurface = {
    ...(current || {}),
    ...body,
    chatId,
    groupId: sabiGroupLikeText(body.groupId) || current?.groupId || chatId,
    title: sabiGroupLikeText(body.title) || sabiGroupLikeText(body.name) || current?.title || null,
    name: sabiGroupLikeText(body.name) || sabiGroupLikeText(body.title) || current?.name || null,
    groupName: sabiGroupLikeText(body.groupName) || sabiGroupLikeText(body.name) || sabiGroupLikeText(body.title) || current?.groupName || null,
    username: sabiGroupLikeText(body.username) || current?.username || null,
    avatarUri: sabiGroupLikeText(body.avatarUri) || sabiGroupLikeText(body.avatarUrl) || current?.avatarUri || null,
    avatarUrl: sabiGroupLikeText(body.avatarUrl) || sabiGroupLikeText(body.avatarUri) || current?.avatarUrl || null,
    coverUri: sabiGroupLikeText(body.coverUri) || current?.coverUri || null,
    publicationPhotos,
    publicationVideos,
    likesCount: Math.max(sabiGroupLikeNumber(current?.likesCount), sabiGroupLikeNumber(body.likesCount), countedLikes),
    aliases: sabiGroupLikeAliases([
      chatId,
      body.groupId,
      body.id,
      body.roomId,
      body.linkedChatId,
      body.linkedPublicationId,
      body.username,
      body.groupName,
      body.title,
      body.name,
      body.inviteLink,
      ...(Array.isArray(body.aliases) ? body.aliases : []),
      ...(current?.aliases || []),
    ]),
    updatedAt: Date.now(),
  }

  store.profiles[surface.chatId] = surface
  sabiRegisterGroupLikeAliases(store, surface)
  await sabiPersistGroupLikeStore(store)

  rememberSabiPublicDirectoryRichRecord({ ...surface, kind: "GROUP", type: "GROUP" }, "GROUP")

  return surface
}

async function getSabiGroupPublicLikeProfile(req: Request, res: Response, next: NextFunction) {
  try {
    const roomId = asString(req.params?.roomId) || asString(req.query?.chatId) || asString(req.query?.groupId)
    if (!roomId) throw new Error("group_public_profile_identifier_required")

    const surface = await sabiFindGroupLikeSurface(roomId)
    if (!surface) {
      res.status(404).json({ ok: false, success: false, error: "group_public_profile_not_found" })
      return
    }

    res.json({ ok: true, success: true, data: surface })
  } catch (error) {
    next(error)
  }
}

async function likeSabiGroupPublicLikeProfile(req: Request, res: Response, next: NextFunction) {
  try {
    const currentUser = getRouteCurrentUser(req)
    const roomId = asString(req.params?.roomId) || asString(req.body?.chatId) || asString(req.body?.groupId)
    const actorUserId = asString(req.body?.actorUserId) || asString(req.body?.currentUserId) || currentUser.id
    if (!roomId) throw new Error("group_public_profile_identifier_required")
    if (!actorUserId) throw new Error("group_public_profile_like_user_required")

    const current = await sabiFindGroupLikeSurface(roomId)
    const base = await sabiSaveGroupLikeSurface(roomId, req.body || {})
    const mediaId = asString(req.body?.mediaId)
    const mediaKind = req.body?.mediaKind === "video" ? "video" : req.body?.mediaKind === "photo" ? "photo" : null
    const shouldLike = req.body?.liked !== false

    const applyLike = (items: SabiGroupPublicLikeMediaItem[], kind: "photo" | "video") =>
      items.map((item) => {
        if (!mediaId) return item
        if (mediaKind && mediaKind !== kind) return item
        if (!sabiGroupLikeMediaMatches(item, mediaId)) return item

        const users = shouldLike
          ? sabiGroupLikeUsers([...(item.likedByUserIds || []), actorUserId])
          : (item.likedByUserIds || []).filter((value) => sabiGroupLikeText(value) !== actorUserId)

        return {
          ...item,
          likedByUserIds: users,
          liked: shouldLike ? true : users.length > 0,
        }
      })

    const publicationPhotos = applyLike(base.publicationPhotos, "photo")
    const publicationVideos = applyLike(base.publicationVideos, "video")
    const likesCount = sabiGroupLikeCount(publicationPhotos, publicationVideos)

    const surface = await sabiSaveGroupLikeSurface(roomId, {
      ...base,
      publicationPhotos,
      publicationVideos,
      likesCount: shouldLike
        ? Math.max(base.likesCount, likesCount, sabiGroupLikeNumber(req.body?.likesCount))
        : likesCount,
      updatedAt: Date.now(),
    })

    res.json({ ok: true, success: true, data: surface })
  } catch (error) {
    next(error)
  }
}


router.get("/groups/:roomId/public-profile", getSabiGroupPublicLikeProfile)
router.post("/groups/:roomId/public-profile/like", likeSabiGroupPublicLikeProfile)

router.post("/groups/:roomId/join", joinPublicGroup)

router.post("/groups/:roomId/members", (req, res, next) =>
  addPublicRoomMember(req, res, next, "GROUP"),
)

router.post("/groups/:roomId/invite", (req, res, next) =>
  invitePublicRoomMember(req, res, next, "GROUP"),
)


const SABI_CHANNEL_PUBLIC_PROFILE_BACKEND_STORE_FILE = path.resolve(
  process.cwd(),
  "data",
  "messenger-channel-public-profile.json",
)

type SabiChannelPublicMediaItem = {
  id?: string
  uri?: string
  kind?: "photo" | "video"
  type?: "photo" | "video"
  thumbnailUri?: string
  mediaUri?: string
  liked?: boolean
  likedByUserIds?: string[]
  [key: string]: unknown
}

type SabiChannelPublicSurface = {
  chatId: string
  channelId?: string
  title?: string | null
  name?: string | null
  channelName?: string | null
  username?: string | null
  avatarUri?: string | null
  avatarUrl?: string | null
  coverUri?: string | null
  publicationPhotos: SabiChannelPublicMediaItem[]
  publicationVideos: SabiChannelPublicMediaItem[]
  likesCount: number
  publicGiftsCount: number
  subscribersCount: number
  aliases: string[]
  updatedAt: number
  [key: string]: unknown
}

type SabiChannelPublicStore = {
  version: 1
  profiles: Record<string, SabiChannelPublicSurface>
  aliases: Record<string, string>
}

let SABI_CHANNEL_PUBLIC_PROFILE_BACKEND_STORE: SabiChannelPublicStore | null = null

function sabiChannelPublicText(value: unknown): string {
  return typeof value === "string" && value.trim() ? value.trim() : ""
}

function sabiChannelPublicNumber(value: unknown): number {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? Math.max(0, Math.floor(parsed)) : 0
}

function sabiChannelPublicAliasVariants(value: unknown): string[] {
  const raw = sabiChannelPublicText(value)
  if (!raw) return []

  const normalized = raw.replace(/^@+/, "").toLowerCase()
  const values = new Set<string>()

  if (normalized) values.add(normalized)
  if (normalized && !normalized.startsWith("channel:")) values.add("channel:" + normalized)
  if (normalized.startsWith("channel:")) {
    const withoutPrefix = normalized.slice("channel:".length).trim()
    if (withoutPrefix) values.add(withoutPrefix)
  }

  return Array.from(values)
}

function sabiChannelPublicAliases(values: unknown[]): string[] {
  const seen = new Set<string>()
  const aliases: string[] = []

  values.forEach((value) => {
    if (Array.isArray(value)) {
      value.forEach((nested) => {
        sabiChannelPublicAliasVariants(nested).forEach((alias) => {
          if (!alias || seen.has(alias)) return
          seen.add(alias)
          aliases.push(alias)
        })
      })
      return
    }

    sabiChannelPublicAliasVariants(value).forEach((alias) => {
      if (!alias || seen.has(alias)) return
      seen.add(alias)
      aliases.push(alias)
    })
  })

  return aliases
}

function sabiChannelPublicArray(value: unknown): unknown[] {
  if (Array.isArray(value)) return value
  if (typeof value === "string" && value.trim()) {
    try {
      const parsed = JSON.parse(value)
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  }
  return []
}

function sabiChannelPublicUsers(value: unknown): string[] {
  if (!Array.isArray(value)) return []
  const seen = new Set<string>()
  const users: string[] = []

  value.forEach((item) => {
    const userId = sabiChannelPublicText(item)
    if (!userId || seen.has(userId)) return
    seen.add(userId)
    users.push(userId)
  })

  return users
}

function sabiChannelPublicNormalizeMedia(value: unknown, kind: "photo" | "video"): SabiChannelPublicMediaItem[] {
  return sabiChannelPublicArray(value)
    .map((item, index) => {
      if (!item || typeof item !== "object" || Array.isArray(item)) return null
      const raw = item as Record<string, unknown>
      const id = sabiChannelPublicText(raw.id) || kind + "-" + index
      const uri = sabiChannelPublicText(raw.uri)
      const mediaUri = sabiChannelPublicText(raw.mediaUri)
      const thumbnailUri = sabiChannelPublicText(raw.thumbnailUri)

      if (!uri && !mediaUri && !thumbnailUri) return null

      return {
        ...raw,
        id,
        kind,
        uri: uri || mediaUri || thumbnailUri,
        mediaUri: mediaUri || undefined,
        thumbnailUri: thumbnailUri || undefined,
        liked: typeof raw.liked === "boolean" ? raw.liked : undefined,
        likedByUserIds: sabiChannelPublicUsers(raw.likedByUserIds),
      } as SabiChannelPublicMediaItem
    })
    .filter((item): item is SabiChannelPublicMediaItem => item !== null)
}

function sabiChannelPublicMediaMatches(item: SabiChannelPublicMediaItem, mediaId: string): boolean {
  const id = sabiChannelPublicText(mediaId)
  if (!id) return false

  return [item.id, item.uri, item.mediaUri, item.thumbnailUri]
    .map(sabiChannelPublicText)
    .filter(Boolean)
    .includes(id)
}

function sabiChannelPublicLikeCount(
  photos: SabiChannelPublicMediaItem[],
  videos: SabiChannelPublicMediaItem[],
): number {
  return [...photos, ...videos].reduce((total, item) => {
    const users = Array.isArray(item.likedByUserIds) ? item.likedByUserIds.length : 0
    return total + Math.max(users, item.liked ? 1 : 0)
  }, 0)
}

async function sabiChannelPublicStore(): Promise<SabiChannelPublicStore> {
  if (SABI_CHANNEL_PUBLIC_PROFILE_BACKEND_STORE) return SABI_CHANNEL_PUBLIC_PROFILE_BACKEND_STORE

  try {
    const raw = await readFile(SABI_CHANNEL_PUBLIC_PROFILE_BACKEND_STORE_FILE, "utf8")
    const parsed = JSON.parse(raw) as Partial<SabiChannelPublicStore>
    SABI_CHANNEL_PUBLIC_PROFILE_BACKEND_STORE = {
      version: 1,
      profiles: parsed.profiles || {},
      aliases: parsed.aliases || {},
    }
  } catch {
    SABI_CHANNEL_PUBLIC_PROFILE_BACKEND_STORE = { version: 1, profiles: {}, aliases: {} }
  }

  return SABI_CHANNEL_PUBLIC_PROFILE_BACKEND_STORE
}

async function sabiPersistChannelPublicStore(store: SabiChannelPublicStore) {
  await mkdir(path.dirname(SABI_CHANNEL_PUBLIC_PROFILE_BACKEND_STORE_FILE), { recursive: true })
  await writeFile(SABI_CHANNEL_PUBLIC_PROFILE_BACKEND_STORE_FILE, JSON.stringify(store, null, 2), "utf8")
}

function sabiRegisterChannelPublicAliases(store: SabiChannelPublicStore, surface: SabiChannelPublicSurface) {
  sabiChannelPublicAliases([
    surface.chatId,
    surface.channelId,
    surface.title,
    surface.name,
    surface.channelName,
    surface.username,
    ...surface.aliases,
  ]).forEach((alias) => {
    store.aliases[alias] = surface.chatId
  })
}

async function sabiFindChannelPublicSurface(identifier: string): Promise<SabiChannelPublicSurface | null> {
  const store = await sabiChannelPublicStore()
  const variants = sabiChannelPublicAliasVariants(identifier)

  for (const alias of variants) {
    const key = store.aliases[alias] || alias
    if (store.profiles[key]) return store.profiles[key]
  }

  const room = await findDirectoryRoom(identifier, "CHANNEL").catch(() => null)
  if (!room) return null

  const item = directoryItemFromRoom(room, "CHANNEL") as Record<string, unknown>

  return {
    ...item,
    chatId: sabiChannelPublicText(item.chatId) || identifier,
    channelId: sabiChannelPublicText(item.channelId) || sabiChannelPublicText(item.chatId) || identifier,
    publicationPhotos: [],
    publicationVideos: [],
    likesCount: sabiChannelPublicNumber(item.likesCount),
    publicGiftsCount: sabiChannelPublicNumber(item.publicGiftsCount),
    subscribersCount: sabiChannelPublicNumber(item.subscribersCount),
    aliases: sabiChannelPublicAliases([
      identifier,
      item.chatId,
      item.channelId,
      item.id,
      item.username,
      item.title,
      item.name,
    ]),
    updatedAt: Date.now(),
  }
}

async function sabiSaveChannelPublicSurface(
  identifier: string,
  body: Record<string, unknown>,
): Promise<SabiChannelPublicSurface> {
  const store = await sabiChannelPublicStore()
  const current = await sabiFindChannelPublicSurface(identifier)
  const chatId =
    sabiChannelPublicText(body.chatId) ||
    sabiChannelPublicText(body.channelId) ||
    current?.chatId ||
    identifier

  const publicationPhotos = sabiChannelPublicNormalizeMedia(
    body.publicationPhotos || body.publicPhotos || current?.publicationPhotos || [],
    "photo",
  )
  const publicationVideos = sabiChannelPublicNormalizeMedia(
    body.publicationVideos || body.publicVideos || current?.publicationVideos || [],
    "video",
  )
  const countedLikes = sabiChannelPublicLikeCount(publicationPhotos, publicationVideos)

  const surface: SabiChannelPublicSurface = {
    ...(current || {}),
    ...body,
    chatId,
    channelId: sabiChannelPublicText(body.channelId) || current?.channelId || chatId,
    title: sabiChannelPublicText(body.title) || sabiChannelPublicText(body.name) || current?.title || null,
    name: sabiChannelPublicText(body.name) || sabiChannelPublicText(body.title) || current?.name || null,
    channelName:
      sabiChannelPublicText(body.channelName) ||
      sabiChannelPublicText(body.name) ||
      sabiChannelPublicText(body.title) ||
      current?.channelName ||
      null,
    username: sabiChannelPublicText(body.username) || current?.username || null,
    avatarUri: sabiChannelPublicText(body.avatarUri) || sabiChannelPublicText(body.avatarUrl) || current?.avatarUri || null,
    avatarUrl: sabiChannelPublicText(body.avatarUrl) || sabiChannelPublicText(body.avatarUri) || current?.avatarUrl || null,
    coverUri: sabiChannelPublicText(body.coverUri) || current?.coverUri || null,
    publicationPhotos,
    publicationVideos,
    likesCount: Math.max(sabiChannelPublicNumber(current?.likesCount), sabiChannelPublicNumber(body.likesCount), countedLikes),
    publicGiftsCount: Math.max(sabiChannelPublicNumber(current?.publicGiftsCount), sabiChannelPublicNumber(body.publicGiftsCount)),
    subscribersCount: Math.max(sabiChannelPublicNumber(current?.subscribersCount), sabiChannelPublicNumber(body.subscribersCount)),
    aliases: sabiChannelPublicAliases([
      chatId,
      body.channelId,
      body.id,
      body.roomId,
      body.linkedChatId,
      body.linkedPublicationId,
      body.username,
      body.channelName,
      body.title,
      body.name,
      body.inviteLink,
      ...(Array.isArray(body.aliases) ? body.aliases : []),
      ...(current?.aliases || []),
    ]),
    updatedAt: Date.now(),
  }

  store.profiles[surface.chatId] = surface
  sabiRegisterChannelPublicAliases(store, surface)
  await sabiPersistChannelPublicStore(store)

  rememberSabiPublicDirectoryRichRecord({ ...surface, kind: "CHANNEL", type: "CHANNEL" }, "CHANNEL")

  return surface
}

async function saveSabiChannelPublicProfile(req: Request, res: Response, next: NextFunction) {
  try {
    const roomId = asString(req.params?.roomId) || asString(req.body?.chatId) || asString(req.body?.channelId);
    if (!roomId) throw new Error("channel_public_profile_identifier_required");

    const surface = await sabiSaveChannelPublicSurface(roomId, req.body || {});
    res.json({ ok: true, success: true, data: surface });
  } catch (error) {
    next(error);
  }
}

async function getSabiChannelPublicProfile(req: Request, res: Response, next: NextFunction) {
  try {
    const roomId = asString(req.params?.roomId) || asString(req.query?.chatId) || asString(req.query?.channelId)
    if (!roomId) throw new Error("channel_public_profile_identifier_required")

    const surface = await sabiFindChannelPublicSurface(roomId)
    if (!surface) {
      res.status(404).json({ ok: false, success: false, error: "channel_public_profile_not_found" })
      return
    }

    res.json({ ok: true, success: true, data: surface })
  } catch (error) {
    next(error)
  }
}

async function likeSabiChannelPublicProfile(req: Request, res: Response, next: NextFunction) {
  try {
    const currentUser = getRouteCurrentUser(req)
    const roomId = asString(req.params?.roomId) || asString(req.body?.chatId) || asString(req.body?.channelId)
    const actorUserId = asString(req.body?.actorUserId) || asString(req.body?.currentUserId) || currentUser.id

    if (!roomId) throw new Error("channel_public_profile_identifier_required")
    if (!actorUserId) throw new Error("channel_public_profile_like_user_required")

    const base = await sabiSaveChannelPublicSurface(roomId, req.body || {})
    const mediaId = asString(req.body?.mediaId)
    const mediaKind = req.body?.mediaKind === "video" ? "video" : req.body?.mediaKind === "photo" ? "photo" : null
    const shouldLike = req.body?.liked !== false

    const applyLike = (items: SabiChannelPublicMediaItem[], kind: "photo" | "video") =>
      items.map((item) => {
        if (!mediaId) return item
        if (mediaKind && mediaKind !== kind) return item
        if (!sabiChannelPublicMediaMatches(item, mediaId)) return item

        const users = shouldLike
          ? sabiChannelPublicUsers([...(item.likedByUserIds || []), actorUserId])
          : (item.likedByUserIds || []).filter((value) => sabiChannelPublicText(value) !== actorUserId)

        return {
          ...item,
          likedByUserIds: users,
          liked: shouldLike ? true : users.length > 0,
        }
      })

    const publicationPhotos = applyLike(base.publicationPhotos, "photo")
    const publicationVideos = applyLike(base.publicationVideos, "video")
    const likesCount = sabiChannelPublicLikeCount(publicationPhotos, publicationVideos)

    const surface = await sabiSaveChannelPublicSurface(roomId, {
      ...base,
      publicationPhotos,
      publicationVideos,
      likesCount: shouldLike
        ? Math.max(base.likesCount, likesCount, sabiChannelPublicNumber(req.body?.likesCount))
        : likesCount,
      updatedAt: Date.now(),
    })

    res.json({ ok: true, success: true, data: surface })
  } catch (error) {
    next(error)
  }
}


router.post("/channels/:roomId/public-profile", saveSabiChannelPublicProfile)
router.get("/channels/:roomId/public-profile", getSabiChannelPublicProfile)
router.post("/channels/:roomId/public-profile/like", likeSabiChannelPublicProfile)

router.post("/channels/:roomId/subscribe", subscribePublicChannel)

router.post("/channels/:roomId/subscribers", (req, res, next) =>
  addPublicRoomMember(req, res, next, "CHANNEL"),
)

router.post("/channels/:roomId/invite", (req, res, next) =>
  invitePublicRoomMember(req, res, next, "CHANNEL"),
)

router.post("/bots/:botId/start", startPublicBot)

export default router

