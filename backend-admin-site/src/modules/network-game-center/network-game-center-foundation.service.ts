import type {
  SabiNetworkGameCenterCapability,
  SabiNetworkGameCenterFoundationStatus,
  SabiNetworkGameCenterRewardPolicy,
} from "./network-game-center-foundation.types";

export const SABI_NETWORK_GAME_CENTER_REWARD_POLICY: SabiNetworkGameCenterRewardPolicy = {
  freePromoRewardsAreIncome: false,
  wonPromoGiftsAreIncome: false,
  financialIncomeRequiresPaidSource: true,
  coinRewardRequiresCoinWalletProvider: true,
  inventoryRewardsExpireDays: 30,
  notes: [
    "Free, storage, won and promo gifts are inventory/activity only and must never be counted as income.",
    "Paid game rewards must route through the controlled wallet and admin/compliance hooks before becoming financial history.",
    "Network game rewards need anti-abuse review, unified user ID, and real provider execution before launch.",
  ],
};

const capabilities: SabiNetworkGameCenterCapability[] = [
  {
    id: "game_lobby",
    title: "Network lobby foundation",
    runtimeStatus: "foundation_ready",
    providerStatus: "provider_required",
    route: "/network-game-center",
    apiPath: "/api/v2/network-game-center/status",
    notes: ["Lobby UI can open, but online matchmaking must wait for real realtime provider."],
  },
  {
    id: "realtime_matchmaking",
    title: "Realtime matchmaking",
    runtimeStatus: "provider_required",
    providerStatus: "provider_required",
    apiPath: "/api/v2/network-game-center/status",
    notes: ["No fake online opponents or fake wins."],
  },
  {
    id: "leaderboards",
    title: "Leaderboards",
    runtimeStatus: "foundation_ready",
    providerStatus: "provider_required",
    apiPath: "/api/v2/network-game-center/leaderboard/status",
  },
  {
    id: "coin_rewards",
    title: "Coin and inventory reward hooks",
    runtimeStatus: "provider_required",
    providerStatus: "contract_required",
    apiPath: "/api/v2/network-game-center/rewards/policy",
  },
  {
    id: "existing_mini_games",
    title: "Existing Wheel and Fishing entry routes",
    runtimeStatus: "foundation_ready",
    providerStatus: "not_required",
    route: "/games",
  },
];

export function getSabiNetworkGameCenterFoundationStatus(): SabiNetworkGameCenterFoundationStatus {
  return {
    ok: true,
    version: "HOME-100.4",
    module: "network_game_center",
    mobileRoute: "/network-game-center",
    apiBasePath: "/api/v2/network-game-center",
    runtimeStatus: "foundation_ready",
    fakeDataAllowed: false,
    multiplayerProviderStatus: "provider_required",
    rewardsProviderStatus: "provider_required",
    walletRouteRequired: true,
    adminReviewSupported: true,
    capabilities,
    rewardPolicy: SABI_NETWORK_GAME_CENTER_REWARD_POLICY,
  };
}
