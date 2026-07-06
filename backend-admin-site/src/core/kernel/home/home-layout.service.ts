import {
  createDefaultAccountSnapshot,
  createHomeLayoutDefaults,
} from "./home.defaults";
import { HomeAccountSnapshotService } from "./home-account-snapshot.service";
import {
  buildValidatedDefaults,
  normalizeAccountSnapshot,
  normalizeDockItems,
  normalizeQuickActions,
  normalizeTheme,
  uniqueIds,
} from "./home.validation";
import type {
  HomeAccountSnapshot,
  HomeDockItem,
  HomeLayoutState,
  HomeQuickAction,
  HomeThemeState,
  UpdateHomeLayoutInput,
} from "./home.types";

function nowIso() {
  return new Date().toISOString();
}

export class HomeLayoutService {
  private readonly storage = new Map<string, HomeLayoutState>();
  private readonly defaults = buildValidatedDefaults(createHomeLayoutDefaults());

  constructor(
    private readonly snapshotService = new HomeAccountSnapshotService(),
  ) {}

  get(userId: string) {
    const existing = this.storage.get(userId);
    if (existing) {
      return existing;
    }

    const created: HomeLayoutState = {
      userId,
      editMode: false,
      widgetOrder: [],
      hiddenCardIds: [],
      pinnedMiniAppIds: ["messenger", "wallet", "qr"],
      dockItems: [...this.defaults.dockItems],
      quickActions: [...this.defaults.quickActions],
      theme: { ...this.defaults.theme },
      accountSnapshot: this.snapshotService.sync(
        userId,
        createDefaultAccountSnapshot(userId),
      ),
      updatedAt: nowIso(),
    };

    this.storage.set(userId, created);
    return created;
  }

  update(userId: string, patch: Partial<HomeLayoutState>) {
    const current = this.get(userId);
    const next: HomeLayoutState = {
      ...current,
      ...patch,
      updatedAt: nowIso(),
    };

    this.storage.set(userId, next);
    return next;
  }

  syncAccountSnapshot(userId: string) {
    const current = this.get(userId);
    return this.update(userId, {
      accountSnapshot: this.snapshotService.sync(userId, current.accountSnapshot),
    });
  }

  reset(userId: string) {
    this.storage.delete(userId);
    return this.get(userId);
  }

  setEditMode(userId: string, enabled: boolean) {
    return this.update(userId, { editMode: enabled });
  }

  updateLayout(userId: string, patch: UpdateHomeLayoutInput) {
    const current = this.get(userId);

    return this.update(userId, {
      widgetOrder: patch.widgetOrder ? uniqueIds(patch.widgetOrder) : current.widgetOrder,
      hiddenCardIds: patch.hiddenCardIds
        ? uniqueIds(patch.hiddenCardIds)
        : current.hiddenCardIds,
      pinnedMiniAppIds: patch.pinnedMiniAppIds
        ? uniqueIds(patch.pinnedMiniAppIds)
        : current.pinnedMiniAppIds,
      dockItems: patch.dockItems
        ? normalizeDockItems(patch.dockItems, this.defaults.dockItems)
        : current.dockItems,
    });
  }

  setDockItems(userId: string, dockItems: readonly HomeDockItem[]) {
    return this.update(userId, {
      dockItems: normalizeDockItems(dockItems, this.defaults.dockItems),
    });
  }

  setTheme(userId: string, patch: Partial<HomeThemeState>) {
    const current = this.get(userId);
    return this.update(userId, {
      theme: normalizeTheme(current.theme, patch),
    });
  }

  setQuickActions(userId: string, quickActions: readonly HomeQuickAction[]) {
    return this.update(userId, {
      quickActions: normalizeQuickActions(quickActions, this.defaults.quickActions),
    });
  }

  setAccountSnapshot(userId: string, patch: Partial<HomeAccountSnapshot>) {
    const current = this.get(userId);
    return this.update(userId, {
      accountSnapshot: normalizeAccountSnapshot(current.accountSnapshot, patch),
    });
  }

  pinMiniApp(userId: string, miniAppId: string) {
    const current = this.get(userId);
    return this.update(userId, {
      pinnedMiniAppIds: uniqueIds([...current.pinnedMiniAppIds, miniAppId]),
    });
  }

  unpinMiniApp(userId: string, miniAppId: string) {
    const current = this.get(userId);
    return this.update(userId, {
      pinnedMiniAppIds: current.pinnedMiniAppIds.filter((value) => value !== miniAppId),
    });
  }

  hideCard(userId: string, cardId: string) {
    const current = this.get(userId);
    return this.update(userId, {
      hiddenCardIds: uniqueIds([...current.hiddenCardIds, cardId]),
    });
  }

  showCard(userId: string, cardId: string) {
    const current = this.get(userId);
    return this.update(userId, {
      hiddenCardIds: current.hiddenCardIds.filter((value) => value !== cardId),
    });
  }
}
