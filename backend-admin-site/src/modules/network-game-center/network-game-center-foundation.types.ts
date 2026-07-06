export type SabiNetworkGameCenterProviderStatus =
  | "not_required"
  | "provider_required"
  | "api_key_required"
  | "contract_required"
  | "disabled";

export type SabiNetworkGameCenterRuntimeStatus =
  | "foundation_ready"
  | "provider_required"
  | "disabled";

export type SabiNetworkGameCenterCapability = {
  id: string;
  title: string;
  runtimeStatus: SabiNetworkGameCenterRuntimeStatus;
  providerStatus: SabiNetworkGameCenterProviderStatus;
  route?: string;
  apiPath?: string;
  notes?: string[];
};

export type SabiNetworkGameCenterRewardPolicy = {
  freePromoRewardsAreIncome: false;
  wonPromoGiftsAreIncome: false;
  financialIncomeRequiresPaidSource: true;
  coinRewardRequiresCoinWalletProvider: true;
  inventoryRewardsExpireDays: 30;
  notes: string[];
};

export type SabiNetworkGameCenterFoundationStatus = {
  ok: true;
  version: "HOME-100.4";
  module: "network_game_center";
  mobileRoute: "/network-game-center";
  apiBasePath: "/api/v2/network-game-center";
  runtimeStatus: "foundation_ready";
  fakeDataAllowed: false;
  multiplayerProviderStatus: "provider_required";
  rewardsProviderStatus: "provider_required";
  walletRouteRequired: true;
  adminReviewSupported: true;
  capabilities: SabiNetworkGameCenterCapability[];
  rewardPolicy: SabiNetworkGameCenterRewardPolicy;
};
