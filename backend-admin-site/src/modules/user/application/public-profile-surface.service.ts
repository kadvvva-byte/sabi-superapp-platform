import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export type PublicProfileSurfaceMediaKind = "photo" | "video";

export type PublicProfileSurfaceMediaItem = {
  id: string;
  uri: string;
  kind: PublicProfileSurfaceMediaKind;
  thumbnailUri?: string;
  mediaUri?: string;
  mimeType?: string;
  views?: number;
  duration?: string;
  liked?: boolean;
};

export type PublicProfileSurfaceGiftItem = {
  id: string;
  title?: string;
  emoji?: string;
  imageUri?: string;
};

export type PublicProfileSurfaceSnapshot = {
  chatId: string;
  userId?: string;
  displayName?: string;
  publicName?: string;
  username?: string;
  publicUsername?: string;
  bio?: string;
  publicBio?: string;
  subtitle?: string;
  publicSubtitle?: string;
  phone?: string;
  birthday?: string;
  avatarUri: string;
  coverUri: string;
  publicationPhotos: PublicProfileSurfaceMediaItem[];
  publicationVideos: PublicProfileSurfaceMediaItem[];
  publicGifts: PublicProfileSurfaceGiftItem[];
  likesCount: number;
  publicGiftsCount: number;
  likedByUserIds: string[];
  aliases: string[];
  updatedAt: number;
};

type PersistedPublicProfileSurfaceState = {
  version: 1;
  profiles: Record<string, PublicProfileSurfaceSnapshot>;
  aliases: Record<string, string>;
};

const STORAGE_DIR = path.resolve(process.cwd(), "data");
const STORAGE_FILE = path.join(STORAGE_DIR, "public-profile-surfaces.json");

let loadedState: PersistedPublicProfileSurfaceState | null = null;

function normalizeString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeKey(value: unknown) {
  return normalizeString(value);
}

function normalizeUsername(value: unknown) {
  const raw = normalizeString(value).replace(/^@+/, "");
  return raw ? `@${raw}` : "";
}

function normalizeUsernameBare(value: unknown) {
  return normalizeString(value).replace(/^@+/, "").toLowerCase();
}

function normalizePhone(value: unknown) {
  return normalizeString(value).replace(/[^\d+]/g, "");
}

function normalizeAlias(value: unknown) {
  const raw = normalizeString(value).toLowerCase();
  if (!raw) return "";
  return raw.startsWith("@") ? raw : raw;
}

function uniqueAliases(values: unknown[]) {
  const seen = new Set<string>();
  const result: string[] = [];

  values.forEach((value) => {
    const alias = normalizeAlias(value);
    if (!alias || seen.has(alias)) return;

    seen.add(alias);
    result.push(alias);

    if (alias.startsWith("@")) {
      const withoutAt = alias.slice(1);
      if (withoutAt && !seen.has(withoutAt)) {
        seen.add(withoutAt);
        result.push(withoutAt);
      }
    } else if (/^[a-z0-9_.-]+$/i.test(alias)) {
      const withAt = `@${alias}`;
      if (!seen.has(withAt)) {
        seen.add(withAt);
        result.push(withAt);
      }
    }
  });

  return result;
}

function toNumber(value: unknown, fallback = 0) {
  const next = typeof value === "number" ? value : Number(value);
  return Number.isFinite(next) ? Math.max(0, Math.floor(next)) : fallback;
}

function normalizeLikedByUserIds(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  const seen = new Set<string>();
  const result: string[] = [];

  value.forEach((item) => {
    const normalized = normalizeString(item);
    if (!normalized || seen.has(normalized)) return;
    seen.add(normalized);
    result.push(normalized);
  });

  return result;
}

function normalizeMediaItems(value: unknown, fallbackKind: PublicProfileSurfaceMediaKind): PublicProfileSurfaceMediaItem[] {
  if (!Array.isArray(value)) return [];

  return value
    .map((item, index): PublicProfileSurfaceMediaItem | null => {
      const raw = item as Record<string, unknown>;
      const thumbnailUri = normalizeString(raw.thumbnailUri);
      const mediaUri = normalizeString(raw.mediaUri);
      const uri = normalizeString(raw.uri) || thumbnailUri || mediaUri;
      if (!uri) return null;

      const kind = raw.kind === "video" || raw.mediaKind === "video" ? "video" : fallbackKind;

      return {
        id: normalizeString(raw.id) || `${kind}-${index}`,
        uri,
        kind,
        thumbnailUri: thumbnailUri || undefined,
        mediaUri: mediaUri || undefined,
        mimeType: normalizeString(raw.mimeType) || undefined,
        views: toNumber(raw.views),
        duration: normalizeString(raw.duration) || undefined,
        liked: typeof raw.liked === "boolean" ? raw.liked : undefined,
      };
    })
    .filter((item): item is PublicProfileSurfaceMediaItem => item !== null);
}

function normalizeGiftItems(value: unknown): PublicProfileSurfaceGiftItem[] {
  if (!Array.isArray(value)) return [];

  return value
    .map((item, index): PublicProfileSurfaceGiftItem | null => {
      const raw = item as Record<string, unknown>;
      const id = normalizeString(raw.id) || `gift-${index}`;
      const title = normalizeString(raw.title) || undefined;
      const emoji = normalizeString(raw.emoji) || undefined;
      const imageUri = normalizeString(raw.imageUri) || undefined;

      if (!id || (!title && !emoji && !imageUri)) return null;
      return { id, title, emoji, imageUri };
    })
    .filter((item): item is PublicProfileSurfaceGiftItem => item !== null);
}

function mediaActivityKey(item: Partial<PublicProfileSurfaceMediaItem> | null | undefined): string {
  return normalizeString(item?.id) || normalizeString(item?.uri) || normalizeString(item?.mediaUri) || normalizeString(item?.thumbnailUri);
}

function countLikedMediaItems(
  photos: PublicProfileSurfaceMediaItem[],
  videos: PublicProfileSurfaceMediaItem[],
): number {
  return [...photos, ...videos].filter((item) => Boolean(item?.liked)).length;
}

function mergeMediaActivity(
  incomingItems: PublicProfileSurfaceMediaItem[],
  currentItems: PublicProfileSurfaceMediaItem[],
): PublicProfileSurfaceMediaItem[] {
  const currentByKey = new Map<string, PublicProfileSurfaceMediaItem>();
  currentItems.forEach((item) => {
    [mediaActivityKey(item), normalizeString(item.uri), normalizeString(item.mediaUri), normalizeString(item.thumbnailUri)]
      .filter(Boolean)
      .forEach((key) => currentByKey.set(key, item));
  });

  return incomingItems.map((item) => {
    const current =
      currentByKey.get(mediaActivityKey(item)) ||
      currentByKey.get(normalizeString(item.uri)) ||
      currentByKey.get(normalizeString(item.mediaUri)) ||
      currentByKey.get(normalizeString(item.thumbnailUri));

    if (!current) return item;

    return {
      ...item,
      views: typeof item.views === "number" ? item.views : current.views,
      liked: typeof item.liked === "boolean" ? item.liked : current.liked,
    };
  });
}

function emptySnapshot(chatId: string): PublicProfileSurfaceSnapshot {
  return {
    chatId,
    avatarUri: "",
    coverUri: "",
    publicationPhotos: [],
    publicationVideos: [],
    publicGifts: [],
    likesCount: 0,
    publicGiftsCount: 0,
    likedByUserIds: [],
    aliases: chatId ? uniqueAliases([chatId]) : [],
    updatedAt: 0,
  };
}

function normalizeSnapshot(
  chatId: string,
  value?: Partial<PublicProfileSurfaceSnapshot> | null,
): PublicProfileSurfaceSnapshot {
  const key = normalizeKey(value?.chatId || chatId || value?.userId);
  const publicUsername = normalizeUsername(value?.publicUsername || value?.username);
  const username = normalizeUsername(value?.username || value?.publicUsername);
  const phone = normalizePhone(value?.phone);
  const likedByUserIds = normalizeLikedByUserIds(value?.likedByUserIds);
  const aliases = uniqueAliases([
    key,
    value?.userId,
    value?.chatId,
    username,
    publicUsername,
    phone,
    ...(Array.isArray(value?.aliases) ? value.aliases : []),
  ]);

  return {
    chatId: key,
    userId: normalizeKey(value?.userId) || undefined,
    displayName: normalizeKey(value?.displayName) || normalizeKey(value?.publicName) || undefined,
    publicName: normalizeKey(value?.publicName) || normalizeKey(value?.displayName) || undefined,
    username: username || undefined,
    publicUsername: publicUsername || username || undefined,
    bio: normalizeKey(value?.bio) || normalizeKey(value?.publicBio) || undefined,
    publicBio: normalizeKey(value?.publicBio) || normalizeKey(value?.bio) || undefined,
    subtitle: normalizeKey(value?.subtitle) || normalizeKey(value?.publicSubtitle) || undefined,
    publicSubtitle: normalizeKey(value?.publicSubtitle) || normalizeKey(value?.subtitle) || undefined,
    phone: phone || undefined,
    birthday: normalizeKey(value?.birthday) || undefined,
    avatarUri: normalizeKey(value?.avatarUri),
    coverUri: normalizeKey(value?.coverUri),
    publicationPhotos: normalizeMediaItems(value?.publicationPhotos, "photo"),
    publicationVideos: normalizeMediaItems(value?.publicationVideos, "video"),
    publicGifts: normalizeGiftItems(value?.publicGifts),
    likesCount: Math.max(toNumber(value?.likesCount), likedByUserIds.length, countLikedMediaItems(normalizeMediaItems(value?.publicationPhotos, "photo"), normalizeMediaItems(value?.publicationVideos, "video"))),
    publicGiftsCount: toNumber(value?.publicGiftsCount),
    likedByUserIds,
    aliases,
    updatedAt: toNumber(value?.updatedAt, Date.now()),
  };
}

async function ensureState(): Promise<PersistedPublicProfileSurfaceState> {
  if (loadedState) return loadedState;

  try {
    const raw = await readFile(STORAGE_FILE, "utf8");
    const parsed = JSON.parse(raw) as Partial<PersistedPublicProfileSurfaceState>;
    const state: PersistedPublicProfileSurfaceState = {
      version: 1,
      profiles: {},
      aliases: {},
    };

    Object.entries(parsed.profiles || {}).forEach(([key, value]) => {
      const snapshot = normalizeSnapshot(key, value as Partial<PublicProfileSurfaceSnapshot>);
      if (!snapshot.chatId) return;
      state.profiles[snapshot.chatId] = snapshot;
      snapshot.aliases.forEach((alias) => {
        const normalizedAlias = normalizeAlias(alias);
        if (normalizedAlias) state.aliases[normalizedAlias] = snapshot.chatId;
      });
    });

    Object.entries(parsed.aliases || {}).forEach(([alias, key]) => {
      const normalizedAlias = normalizeAlias(alias);
      const normalizedKey = normalizeKey(key);
      if (normalizedAlias && normalizedKey) state.aliases[normalizedAlias] = normalizedKey;
    });

    loadedState = state;
  } catch {
    loadedState = {
      version: 1,
      profiles: {},
      aliases: {},
    };
  }

  return loadedState;
}

async function persistState(state: PersistedPublicProfileSurfaceState) {
  await mkdir(STORAGE_DIR, { recursive: true });
  await writeFile(STORAGE_FILE, JSON.stringify(state, null, 2), "utf8");
}

function registerAliases(state: PersistedPublicProfileSurfaceState, snapshot: PublicProfileSurfaceSnapshot) {
  uniqueAliases([
    snapshot.chatId,
    snapshot.userId,
    snapshot.username,
    snapshot.publicUsername,
    snapshot.phone,
    ...snapshot.aliases,
  ]).forEach((alias) => {
    state.aliases[alias] = snapshot.chatId;
  });
}

async function findUserByIdentifier(identifier: string) {
  const raw = normalizeString(identifier);
  if (!raw) return null;

  const usernameBare = normalizeUsernameBare(raw);
  const phone = normalizePhone(raw);

  const userModel = (prisma as any).user;
  if (!userModel?.findFirst) return null;

  return userModel.findFirst({
    where: {
      OR: [
        { id: raw },
        usernameBare ? { username: usernameBare } : undefined,
        phone ? { phone } : undefined,
        phone ? { phone: { contains: phone } } : undefined,
        { email: raw.toLowerCase() },
      ].filter(Boolean),
    },
  });
}

function buildDisplayNameFromUser(user: any) {
  const displayName = normalizeString(user?.displayName);
  const username = normalizeString(user?.username);
  const email = normalizeString(user?.email);
  const phone = normalizeString(user?.phone);

  if (displayName) return displayName;
  if (username) return username.replace(/^@+/, "");
  if (email && email.includes("@")) return email.split("@")[0] || "User";
  if (phone) return phone;
  return "User";
}

function buildSnapshotFromUser(user: any): PublicProfileSurfaceSnapshot {
  const userId = normalizeString(user?.id);
  const username = normalizeUsername(user?.username);
  const phone = normalizePhone(user?.phone);
  const displayName = buildDisplayNameFromUser(user);

  return normalizeSnapshot(userId, {
    chatId: userId,
    userId,
    displayName,
    publicName: displayName,
    username: username || undefined,
    publicUsername: username || undefined,
    bio: normalizeString(user?.bio) || undefined,
    publicBio: normalizeString(user?.bio) || undefined,
    phone: phone || undefined,
    avatarUri: normalizeString(user?.avatarUrl),
    coverUri: "",
    publicationPhotos: [],
    publicationVideos: [],
    publicGifts: [],
    likesCount: 0,
    publicGiftsCount: 0,
    likedByUserIds: [],
    aliases: [userId, username, phone, user?.email].map(normalizeString).filter(Boolean),
    updatedAt: user?.updatedAt instanceof Date ? user.updatedAt.getTime() : Date.now(),
  });
}

async function updateUserCoreFields(snapshot: PublicProfileSurfaceSnapshot) {
  const userId = normalizeString(snapshot.userId || snapshot.chatId);
  if (!userId) return;

  const data: Record<string, unknown> = {};
  const displayName = normalizeString(snapshot.publicName || snapshot.displayName);
  const username = normalizeUsernameBare(snapshot.publicUsername || snapshot.username);
  const avatarUrl = normalizeString(snapshot.avatarUri);
  const bio = normalizeString(snapshot.publicBio || snapshot.bio);

  if (displayName) data.displayName = displayName;
  if (username) data.username = username;
  if (avatarUrl) data.avatarUrl = avatarUrl;
  if (bio) data.bio = bio;
  data.isPublicProfile = true;

  try {
    const userModel = (prisma as any).user;
    if (userModel?.update) {
      await userModel.update({ where: { id: userId }, data });
    }
  } catch {
    // The public surface store must still save media even if core user fields are unavailable.
  }
}

export class PublicProfileSurfaceService {
  async getByIdentifier(identifier: string): Promise<PublicProfileSurfaceSnapshot | null> {
    const state = await ensureState();
    const raw = normalizeString(identifier);
    if (!raw) return null;

    const alias = normalizeAlias(raw);
    const storedKey = state.aliases[alias] || state.aliases[normalizeAlias(normalizeUsername(raw))] || raw;
    const stored = state.profiles[storedKey];
    if (stored) return normalizeSnapshot(stored.chatId, stored);

    const user = await findUserByIdentifier(raw);
    if (!user) return null;

    const snapshot = buildSnapshotFromUser(user);
    state.profiles[snapshot.chatId] = snapshot;
    registerAliases(state, snapshot);
    await persistState(state);

    return snapshot;
  }

  async save(userId: string, input: unknown): Promise<PublicProfileSurfaceSnapshot> {
    const state = await ensureState();
    const body = input && typeof input === "object" ? (input as Partial<PublicProfileSurfaceSnapshot>) : {};
    const key = normalizeString(userId || body.userId || body.chatId);
    if (!key) {
      throw new Error("public_profile_user_id_required");
    }

    const existingUser = await findUserByIdentifier(key);
    const existingUserSnapshot = existingUser ? buildSnapshotFromUser(existingUser) : null;
    const existingKey = state.aliases[normalizeAlias(key)] || existingUserSnapshot?.chatId || key;
    const current = state.profiles[existingKey] || existingUserSnapshot || emptySnapshot(existingKey);

    const nextPhotos = Array.isArray(body.publicationPhotos)
      ? mergeMediaActivity(normalizeMediaItems(body.publicationPhotos, "photo"), current.publicationPhotos)
      : current.publicationPhotos;
    const nextVideos = Array.isArray(body.publicationVideos)
      ? mergeMediaActivity(normalizeMediaItems(body.publicationVideos, "video"), current.publicationVideos)
      : current.publicationVideos;
    const bodyHasLikes = Object.prototype.hasOwnProperty.call(body, "likesCount") || Array.isArray(body.publicationPhotos) || Array.isArray(body.publicationVideos);
    const nextLikedMediaCount = countLikedMediaItems(nextPhotos, nextVideos);

    const snapshot = normalizeSnapshot(existingKey, {
      ...current,
      ...body,
      chatId: existingKey,
      userId: normalizeString(body.userId) || normalizeString(current.userId) || normalizeString(existingUserSnapshot?.userId) || key,
      publicationPhotos: nextPhotos,
      publicationVideos: nextVideos,
      likesCount: bodyHasLikes
        ? Math.max(
            toNumber(current.likesCount),
            toNumber(body.likesCount),
            nextLikedMediaCount,
            normalizeLikedByUserIds(body.likedByUserIds).length,
            current.likedByUserIds.length,
          )
        : Math.max(toNumber(current.likesCount), current.likedByUserIds.length),
      publicGiftsCount: Math.max(toNumber(current.publicGiftsCount), toNumber(body.publicGiftsCount)),
      likedByUserIds: normalizeLikedByUserIds([...(current.likedByUserIds || []), ...(Array.isArray(body.likedByUserIds) ? body.likedByUserIds : [])]),
      aliases: uniqueAliases([
        existingKey,
        key,
        current.userId,
        existingUserSnapshot?.userId,
        ...(Array.isArray(current.aliases) ? current.aliases : []),
        ...(Array.isArray(body.aliases) ? body.aliases : []),
      ]),
      updatedAt: Date.now(),
    });

    state.profiles[snapshot.chatId] = snapshot;
    registerAliases(state, snapshot);
    await persistState(state);
    await updateUserCoreFields(snapshot);

    return snapshot;
  }

  async setLike(
    identifier: string,
    input: {
      actorUserId?: string | null;
      liked?: boolean | null;
      mediaId?: string | null;
      mediaKind?: PublicProfileSurfaceMediaKind | null;
    },
  ): Promise<PublicProfileSurfaceSnapshot> {
    const state = await ensureState();
    const rawIdentifier = normalizeString(identifier);
    const actorUserId = normalizeString(input.actorUserId);
    if (!rawIdentifier) throw new Error("public_profile_identifier_required");
    if (!actorUserId) throw new Error("public_profile_like_user_required");

    const existingUser = await findUserByIdentifier(rawIdentifier);
    const existingUserSnapshot = existingUser ? buildSnapshotFromUser(existingUser) : null;
    const existingKey = state.aliases[normalizeAlias(rawIdentifier)] || existingUserSnapshot?.chatId || rawIdentifier;
    const current = state.profiles[existingKey] || existingUserSnapshot || emptySnapshot(existingKey);
    const shouldLike = input.liked !== false;
    const mediaId = normalizeString(input.mediaId);
    const mediaKind = input.mediaKind === "video" ? "video" : input.mediaKind === "photo" ? "photo" : null;

    const likedByUserIds = normalizeLikedByUserIds(
      shouldLike
        ? [...(current.likedByUserIds || []), actorUserId]
        : (current.likedByUserIds || []).filter((value) => normalizeString(value) !== actorUserId),
    );

    const applyMediaLike = (items: PublicProfileSurfaceMediaItem[], kind: PublicProfileSurfaceMediaKind) =>
      items.map((item) => {
        if (!mediaId) return item;
        if (mediaKind && mediaKind !== kind) return item;
        const same = normalizeString(item.id) === mediaId || normalizeString(item.uri) === mediaId || normalizeString(item.mediaUri) === mediaId;
        return same ? { ...item, liked: shouldLike } : item;
      });

    const publicationPhotos = applyMediaLike(current.publicationPhotos, "photo");
    const publicationVideos = applyMediaLike(current.publicationVideos, "video");
    const mediaLikesCount = countLikedMediaItems(publicationPhotos, publicationVideos);

    const snapshot = normalizeSnapshot(existingKey, {
      ...current,
      chatId: existingKey,
      publicationPhotos,
      publicationVideos,
      likedByUserIds,
      likesCount: shouldLike
        ? Math.max(toNumber(current.likesCount), likedByUserIds.length, mediaLikesCount)
        : Math.max(likedByUserIds.length, mediaLikesCount),
      aliases: uniqueAliases([
        existingKey,
        rawIdentifier,
        current.userId,
        existingUserSnapshot?.userId,
        ...(Array.isArray(current.aliases) ? current.aliases : []),
      ]),
      updatedAt: Date.now(),
    });

    state.profiles[snapshot.chatId] = snapshot;
    registerAliases(state, snapshot);
    await persistState(state);
    return snapshot;
  }
}
