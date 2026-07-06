export type SabiHomeRuntimeStatus =
  | "ready"
  | "foundation_ready"
  | "provider_required"
  | "backend_unavailable"
  | "disabled";

export type SabiHomeProviderStatus =
  | "not_required"
  | "api_key_required"
  | "contract_required"
  | "provider_required"
  | "unavailable";

export type SabiHomeNotificationAccessMode =
  | "home_top_swipe_down_panel"
  ;

export type SabiHomeNotificationSurfacePolicy = {
  policyId: "HOME_NOTIFICATION_SURFACE_POLICY";
  version: "HOME-100.17";
  persistentBannerAllowed: false;
  visibleOnHomeByDefault: false;
  appearsOverOtherApps: false;
  systemOverlayAllowed: false;
  accessModes: readonly SabiHomeNotificationAccessMode[];
  homeGesture: "swipe_down_from_top_inside_home_only";
  drawerPlacement: "home_top_sheet";
  pushProviderRequiredBeforeRelease: true;
  fakeDigestCountersAllowed: false;
  adminCanForcePersistentBanner: false;
};

export type SabiHomeWidgetFoundation = {
  code: string;
  title: string;
  route: string;
  runtimeStatus: SabiHomeRuntimeStatus;
  providerStatus: SabiHomeProviderStatus;
  visibleOnHome: boolean;
  fakeDataAllowed: false;
  notificationsEnabled: boolean;
  aiHooksEnabled: boolean;
  qrHooksEnabled: boolean;
  walletRouteRequired: boolean;
  adminReviewHook: boolean;
};

export type SabiHomeDockFoundation = {
  code: "call" | "chat" | "wallet" | "mini_apps";
  title: string;
  route: string;
  mobileVisible: boolean;
  webVisible: boolean;
};

export type SabiHomeFoundationManifest = {
  ok: true;
  version: "HOME-100.17";
  generatedAt: string;
  mobileHomeRoute: "/";
  legacyHomeRouteBlocked: true;
  fakeDataAllowed: false;
  widgets: SabiHomeWidgetFoundation[];
  dock: SabiHomeDockFoundation[];
  notificationPolicy: SabiHomeNotificationSurfacePolicy;
  notificationDigest: {
    missedCalls: number | null;
    unreadMessages: number | null;
    events: number | null;
    aiAlerts: number | null;
    securityAlerts: number | null;
    walletAlerts: number | null;
  };
  voice: {
    entryRoute: "/ai/voice-control";
    wakeWords: readonly ["SABI", "Саби"];
    runtimeStatus: SabiHomeRuntimeStatus;
    providerStatus: SabiHomeProviderStatus;
    fakeListeningAllowed: false;
    fakeCommandSuccessAllowed: false;
    premiumRequiredForAdvancedVoice: boolean;
  };
  search: {
    internalRegistryEnabled: true;
    internetSearchOpensBrowser: true;
    fakeExternalResultsAllowed: false;
  };
};

export const SABI_HOME_NOTIFICATION_SURFACE_POLICY: SabiHomeNotificationSurfacePolicy = {
  policyId: "HOME_NOTIFICATION_SURFACE_POLICY",
  version: "HOME-100.17",
  persistentBannerAllowed: false,
  visibleOnHomeByDefault: false,
  appearsOverOtherApps: false,
  systemOverlayAllowed: false,
  accessModes: ["home_top_swipe_down_panel"],
  homeGesture: "swipe_down_from_top_inside_home_only",
  drawerPlacement: "home_top_sheet",
  pushProviderRequiredBeforeRelease: true,
  fakeDigestCountersAllowed: false,
  adminCanForcePersistentBanner: false,
};

export const SABI_HOME_FOUNDATION_WIDGETS: SabiHomeWidgetFoundation[] = [
  { code: "messenger", title: "Messenger", route: "/tabs/chats", runtimeStatus: "ready", providerStatus: "not_required", visibleOnHome: true, fakeDataAllowed: false, notificationsEnabled: true, aiHooksEnabled: true, qrHooksEnabled: true, walletRouteRequired: true, adminReviewHook: true },
  { code: "wallet", title: "Wallet", route: "/wallet/home", runtimeStatus: "provider_required", providerStatus: "contract_required", visibleOnHome: true, fakeDataAllowed: false, notificationsEnabled: true, aiHooksEnabled: true, qrHooksEnabled: true, walletRouteRequired: true, adminReviewHook: true },
  { code: "qr", title: "QR", route: "/qr", runtimeStatus: "foundation_ready", providerStatus: "provider_required", visibleOnHome: true, fakeDataAllowed: false, notificationsEnabled: true, aiHooksEnabled: true, qrHooksEnabled: true, walletRouteRequired: true, adminReviewHook: true },
  { code: "notifications", title: "Notifications", route: "/notifications-entry", runtimeStatus: "foundation_ready", providerStatus: "not_required", visibleOnHome: true, fakeDataAllowed: false, notificationsEnabled: true, aiHooksEnabled: true, qrHooksEnabled: true, walletRouteRequired: false, adminReviewHook: true },
  { code: "events", title: "Events", route: "/events", runtimeStatus: "foundation_ready", providerStatus: "not_required", visibleOnHome: true, fakeDataAllowed: false, notificationsEnabled: true, aiHooksEnabled: false, qrHooksEnabled: false, walletRouteRequired: false, adminReviewHook: false },
  { code: "ai", title: "AI", route: "/ai", runtimeStatus: "provider_required", providerStatus: "api_key_required", visibleOnHome: true, fakeDataAllowed: false, notificationsEnabled: true, aiHooksEnabled: true, qrHooksEnabled: false, walletRouteRequired: false, adminReviewHook: true },
  { code: "sabi_voice", title: "SABI Voice", route: "/ai/voice-control", runtimeStatus: "foundation_ready", providerStatus: "api_key_required", visibleOnHome: true, fakeDataAllowed: false, notificationsEnabled: true, aiHooksEnabled: true, qrHooksEnabled: false, walletRouteRequired: false, adminReviewHook: true },
  { code: "gallery", title: "Gallery", route: "/gallery", runtimeStatus: "foundation_ready", providerStatus: "not_required", visibleOnHome: true, fakeDataAllowed: false, notificationsEnabled: true, aiHooksEnabled: true, qrHooksEnabled: false, walletRouteRequired: false, adminReviewHook: true },
  { code: "game_center", title: "Game Center", route: "/network-game-center", runtimeStatus: "foundation_ready", providerStatus: "provider_required", visibleOnHome: true, fakeDataAllowed: false, notificationsEnabled: true, aiHooksEnabled: false, qrHooksEnabled: false, walletRouteRequired: true, adminReviewHook: true },
  { code: "marketplace", title: "Marketplace", route: "/marketplace", runtimeStatus: "foundation_ready", providerStatus: "contract_required", visibleOnHome: true, fakeDataAllowed: false, notificationsEnabled: true, aiHooksEnabled: true, qrHooksEnabled: true, walletRouteRequired: true, adminReviewHook: true },
  { code: "hotels", title: "Hotels", route: "/hotels", runtimeStatus: "foundation_ready", providerStatus: "contract_required", visibleOnHome: true, fakeDataAllowed: false, notificationsEnabled: true, aiHooksEnabled: true, qrHooksEnabled: true, walletRouteRequired: true, adminReviewHook: true },
  { code: "taxi", title: "Taxi", route: "/taxi", runtimeStatus: "foundation_ready", providerStatus: "contract_required", visibleOnHome: true, fakeDataAllowed: false, notificationsEnabled: true, aiHooksEnabled: true, qrHooksEnabled: true, walletRouteRequired: true, adminReviewHook: true },
  { code: "supermarket", title: "Supermarket", route: "/supermarket", runtimeStatus: "foundation_ready", providerStatus: "contract_required", visibleOnHome: true, fakeDataAllowed: false, notificationsEnabled: true, aiHooksEnabled: true, qrHooksEnabled: true, walletRouteRequired: true, adminReviewHook: true },
  { code: "food_delivery", title: "Food Delivery", route: "/food-delivery", runtimeStatus: "foundation_ready", providerStatus: "contract_required", visibleOnHome: true, fakeDataAllowed: false, notificationsEnabled: true, aiHooksEnabled: true, qrHooksEnabled: true, walletRouteRequired: true, adminReviewHook: true },
  { code: "delivery", title: "Delivery", route: "/delivery", runtimeStatus: "foundation_ready", providerStatus: "contract_required", visibleOnHome: true, fakeDataAllowed: false, notificationsEnabled: true, aiHooksEnabled: true, qrHooksEnabled: true, walletRouteRequired: true, adminReviewHook: true },
  { code: "wholesale_market", title: "Wholesale", route: "/wholesale-market", runtimeStatus: "foundation_ready", providerStatus: "contract_required", visibleOnHome: true, fakeDataAllowed: false, notificationsEnabled: true, aiHooksEnabled: true, qrHooksEnabled: true, walletRouteRequired: true, adminReviewHook: true },
  { code: "stream", title: "Stream", route: "/stream", runtimeStatus: "foundation_ready", providerStatus: "contract_required", visibleOnHome: true, fakeDataAllowed: false, notificationsEnabled: true, aiHooksEnabled: true, qrHooksEnabled: true, walletRouteRequired: true, adminReviewHook: true },
  { code: "business", title: "Business", route: "/business", runtimeStatus: "foundation_ready", providerStatus: "contract_required", visibleOnHome: true, fakeDataAllowed: false, notificationsEnabled: true, aiHooksEnabled: true, qrHooksEnabled: true, walletRouteRequired: true, adminReviewHook: true },
  { code: "merchant", title: "Merchant", route: "/merchant", runtimeStatus: "foundation_ready", providerStatus: "contract_required", visibleOnHome: true, fakeDataAllowed: false, notificationsEnabled: true, aiHooksEnabled: true, qrHooksEnabled: true, walletRouteRequired: true, adminReviewHook: true },
  { code: "documents", title: "Documents", route: "/documents", runtimeStatus: "foundation_ready", providerStatus: "not_required", visibleOnHome: true, fakeDataAllowed: false, notificationsEnabled: true, aiHooksEnabled: false, qrHooksEnabled: false, walletRouteRequired: false, adminReviewHook: false },
  { code: "camera", title: "Camera", route: "/camera", runtimeStatus: "foundation_ready", providerStatus: "not_required", visibleOnHome: true, fakeDataAllowed: false, notificationsEnabled: false, aiHooksEnabled: true, qrHooksEnabled: false, walletRouteRequired: false, adminReviewHook: true },
  { code: "forex", title: "Forex", route: "/wallet/home", runtimeStatus: "provider_required", providerStatus: "contract_required", visibleOnHome: true, fakeDataAllowed: false, notificationsEnabled: true, aiHooksEnabled: true, qrHooksEnabled: false, walletRouteRequired: true, adminReviewHook: true },
  { code: "crypto", title: "Crypto", route: "/wallet/crypto", runtimeStatus: "provider_required", providerStatus: "contract_required", visibleOnHome: true, fakeDataAllowed: false, notificationsEnabled: true, aiHooksEnabled: true, qrHooksEnabled: true, walletRouteRequired: true, adminReviewHook: true },
  { code: "wifi_cast", title: "Wi‑Fi Cast", route: "/wifi-cast", runtimeStatus: "foundation_ready", providerStatus: "provider_required", visibleOnHome: true, fakeDataAllowed: false, notificationsEnabled: false, aiHooksEnabled: false, qrHooksEnabled: false, walletRouteRequired: false, adminReviewHook: false },
];

export const SABI_HOME_FOUNDATION_DOCK: SabiHomeDockFoundation[] = [
  { code: "call", title: "Calls", route: "/tabs/calls", mobileVisible: true, webVisible: true },
  { code: "chat", title: "Chats", route: "/tabs/chats", mobileVisible: true, webVisible: true },
  { code: "wallet", title: "Wallet", route: "/wallet/home", mobileVisible: true, webVisible: true },
  { code: "mini_apps", title: "Mini Apps", route: "/mini-apps", mobileVisible: false, webVisible: true },
];

export function buildSabiHomeFoundationManifest(): SabiHomeFoundationManifest {
  return {
    ok: true,
    version: "HOME-100.17",
    generatedAt: new Date().toISOString(),
    mobileHomeRoute: "/",
    legacyHomeRouteBlocked: true,
    fakeDataAllowed: false,
    widgets: SABI_HOME_FOUNDATION_WIDGETS,
    dock: SABI_HOME_FOUNDATION_DOCK,
    notificationPolicy: SABI_HOME_NOTIFICATION_SURFACE_POLICY,
    notificationDigest: {
      missedCalls: null,
      unreadMessages: null,
      events: null,
      aiAlerts: null,
      securityAlerts: null,
      walletAlerts: null,
    },
    voice: {
      entryRoute: "/ai/voice-control",
      wakeWords: ["SABI", "Саби"],
      runtimeStatus: "foundation_ready",
      providerStatus: "api_key_required",
      fakeListeningAllowed: false,
      fakeCommandSuccessAllowed: false,
      premiumRequiredForAdvancedVoice: true,
    },
    search: {
      internalRegistryEnabled: true,
      internetSearchOpensBrowser: true,
      fakeExternalResultsAllowed: false,
    },
  };
}
