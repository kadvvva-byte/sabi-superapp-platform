export const TAXI_TRIP_GLOBAL_SCALE_SAFE_READ_CONTRACT_036G_VERSION = 'TAXI-036G-TRIP-GLOBAL-SCALE-SAFE-READ-CONTRACT-LOCKED';

export const TAXI_TRIP_GLOBAL_SCALE_SAFE_READ_CONTRACT_036G_NEXT_STEP =
  '036h_trip_admin_ui_runtime_safe_read_connect_or_resume_wallet_owner_plan_locked';

export const TAXI_TRIP_GLOBAL_SCALE_SAFE_READ_CONTRACT_036G_REQUIRED_OWNER_APPROVAL =
  'Separate exact Owner approval is required before live provider routing, camera feeds, speed-limit feeds, DB writes, realtime streaming, or automated enforcement actions.';

export const TAXI_TRIP_GLOBAL_SCALE_SAFE_READ_CONTRACT_036G_ENDPOINTS = Object.freeze({
  publicReadiness: '/api/taxi/trips/global-scale-safe-read/036g/readiness',
  publicContract: '/api/taxi/trips/global-scale-safe-read/036g/contract',
  publicSabiAiSupervisor: '/api/taxi/trips/global-scale-safe-read/036g/sabi-ai-supervisor',
  adminReadiness: '/api/admin/taxi/trips/global-scale-safe-read/036g/readiness',
  adminContract: '/api/admin/taxi/trips/global-scale-safe-read/036g/contract',
  adminSabiAiSupervisor: '/api/admin/taxi/trips/global-scale-safe-read/036g/sabi-ai-supervisor',
  upstreamTripAdminUi036F: 'admin-ui-only-trip-runtime-safe-read-scale-preflight-036f',
  upstreamFinalLock035V: '/api/taxi/wallet-payment-payout/owner-approval-final-lock-selection/035v/summary',
  upstreamContactRequestGate034C: '/api/taxi/mobile/agent/contact/034c/request',
  upstreamDirectoryRequestGate034D: '/api/taxi/mobile/agent/directory/034d/contact-request',
} as const);
