import { Router } from "express";
import {
  getSabiNetworkGameCenterFoundationStatus,
  SABI_NETWORK_GAME_CENTER_REWARD_POLICY,
} from "./network-game-center-foundation.service";

const router = Router();

router.get("/status", (_req, res) => {
  res.json(getSabiNetworkGameCenterFoundationStatus());
});

router.get("/rewards/policy", (_req, res) => {
  res.json({
    ok: true,
    version: "HOME-100.4",
    module: "network_game_center",
    policy: SABI_NETWORK_GAME_CENTER_REWARD_POLICY,
  });
});

router.get("/leaderboard/status", (_req, res) => {
  res.json({
    ok: true,
    version: "HOME-100.4",
    module: "network_game_center",
    runtimeStatus: "foundation_ready",
    providerStatus: "provider_required",
    fakeLeaderboardAllowed: false,
    notes: [
      "Leaderboard storage and realtime ranking require a real provider/database binding.",
      "Until provider binding is live, the client must show provider-required state, not fake rankings.",
    ],
  });
});

export default router;
