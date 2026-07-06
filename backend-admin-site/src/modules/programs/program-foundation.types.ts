export type SabiProgramCode =
  | "home"
  | "messenger"
  | "wallet"
  | "qr"
  | "ai"
  | "gallery"
  | "network_game_center"
  | "marketplace"
  | "hotels"
  | "taxi"
  | "supermarket"
  | "food_delivery"
  | "wholesale_market"
  | "stream"
  | "delivery"
  | "business"
  | "merchant"
  | "notifications"
  | "events"
  | "documents"
  | "wifi_cast";

export type SabiProgramLaunchPhase =
  | "launch_core"
  | "prelaunch_foundation"
  | "postlaunch_update";

export type SabiProgramRuntimeStatus =
  | "ready"
  | "foundation_ready"
  | "provider_required"
  | "temporarily_disabled"
  | "admin_only";

export type SabiProgramProviderStatus =
  | "not_required"
  | "configured"
  | "provider_required"
  | "api_key_required"
  | "contract_required";

export type SabiProgramCapability = {
  id: string;
  title: string;
  status: SabiProgramRuntimeStatus;
  providerStatus: SabiProgramProviderStatus;
  route?: string;
  apiPath?: string;
  notes?: string[];
};

export type SabiProgramFoundation = {
  code: SabiProgramCode;
  title: string;
  mobileRoute: string;
  apiBasePath: string;
  launchPhase: SabiProgramLaunchPhase;
  runtimeStatus: SabiProgramRuntimeStatus;
  providerStatus: SabiProgramProviderStatus;
  enabledOnHome: boolean;
  fakeDataAllowed: false;
  paymentsRouteThroughWallet: boolean;
  qrEnabled: boolean;
  notificationsEnabled: boolean;
  aiHooksEnabled: boolean;
  adminReviewRequired: boolean;
  capabilities: SabiProgramCapability[];
  requiredProviders: string[];
  safetyHooks: string[];
  historyStreams: string[];
};

export type SabiProgramFoundationStatus = {
  ok: true;
  version: "HOME-100.17";
  generatedAt: string;
  program: SabiProgramFoundation;
};
