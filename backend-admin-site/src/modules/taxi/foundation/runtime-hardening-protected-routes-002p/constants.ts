import type {
  TaxiBackendRuntimeHardeningSafety002P,
  TaxiProtectedRouteHardeningPolicy002P,
  TaxiRuntimeHardeningHeader002P,
} from './types';

export const TAXI_BACKEND_RUNTIME_HARDENING_VERSION_002P = 'TAXI-BACKEND-FOUNDATION-002P-BACKEND-RUNTIME-HARDENING' as const;

export const TAXI_RUNTIME_HARDENING_HEADERS_002P = [
  { name: 'Cache-Control', value: 'no-store', purpose: 'Do not cache Taxi readiness, route catalog, or safe-disabled write responses.' },
  { name: 'Pragma', value: 'no-cache', purpose: 'Legacy no-cache marker for protected Taxi runtime responses.' },
  { name: 'X-Content-Type-Options', value: 'nosniff', purpose: 'Block content-type sniffing on protected Taxi JSON responses.' },
  { name: 'X-Sabi-Taxi-Runtime-Stage', value: '002P-protected-runtime-hardening', purpose: 'Expose non-secret Taxi runtime hardening stage.' },
  { name: 'X-Sabi-Taxi-Safe-Disabled', value: 'true', purpose: 'Make safe-disabled state explicit while real DB runtime APIs are still gated.' },
  { name: 'X-Sabi-Taxi-Fake-Success-Blocked', value: 'true', purpose: 'Guarantee no fake success is returned for protected write workflows.' },
  { name: 'X-Sabi-Taxi-Provider-Dispatch', value: 'false', purpose: 'Confirm provider dispatch is still blocked.' },
  { name: 'X-Sabi-Taxi-Wallet-Mutation', value: 'false', purpose: 'Confirm Wallet mutation is still blocked.' },
  { name: 'X-Sabi-Taxi-Db-Runtime', value: 'false', purpose: 'Confirm DB runtime execution is still blocked for mounted safe-disabled routes.' },
  { name: 'Vary', value: 'Authorization, X-Admin-Token', purpose: 'Avoid mixing public and admin guarded responses in caches.' },
] as const satisfies readonly TaxiRuntimeHardeningHeader002P[];

const policy = (key: string, category: TaxiProtectedRouteHardeningPolicy002P['category']): TaxiProtectedRouteHardeningPolicy002P => ({
  key,
  category,
  enforcedAtStage: '002P_source_patch',
  enabledNow: true,
  dbRead: false,
  dbWrite: false,
  walletMutation: false,
  providerDispatch: false,
  fakeSuccessBlocked: true,
});

export const TAXI_PROTECTED_ROUTE_HARDENING_POLICIES_002P = [
  policy('public.readiness.no_store_headers', 'public_readiness'),
  policy('public.readiness.safe_disabled_marker', 'public_readiness'),
  policy('public.catalog.no_store_headers', 'public_catalog'),
  policy('public.catalog.route_count_58_required', 'public_catalog'),
  policy('admin.diagnostics.token_required', 'admin_guard'),
  policy('admin.diagnostics.no_raw_token_output', 'admin_guard'),
  policy('admin.write.token_required', 'admin_guard'),
  policy('rider.quote.create.safe_disabled_409', 'safe_disabled_write'),
  policy('driver.application.submit.safe_disabled_409', 'safe_disabled_write'),
  policy('trip.lifecycle.safe_disabled_409', 'safe_disabled_write'),
  policy('dispatch.offer.safe_disabled_409', 'safe_disabled_write'),
  policy('support.case.safe_disabled_409', 'safe_disabled_write'),
  policy('write.idempotency.boundary_visible', 'idempotency_boundary'),
  policy('write.idempotency.no_runtime_commit', 'idempotency_boundary'),
  policy('wallet.boundary.no_mutation', 'wallet_boundary'),
  policy('wallet.boundary.no_payment_capture', 'wallet_boundary'),
  policy('provider.boundary.no_dispatch', 'provider_boundary'),
  policy('provider.boundary.no_external_call', 'provider_boundary'),
  policy('fake.success.blocked.for_all_guarded_writes', 'fake_success_block'),
  policy('fake.success.no_completed_trip_without_runtime', 'fake_success_block'),
  policy('fake.success.no_paid_state_without_wallet', 'fake_success_block'),
  policy('fake.success.no_provider_ready_without_config', 'fake_success_block'),
] as const satisfies readonly TaxiProtectedRouteHardeningPolicy002P[];

export const TAXI_BACKEND_RUNTIME_HARDENING_SAFETY_002P: TaxiBackendRuntimeHardeningSafety002P = {
  sourcePatch: true,
  routeRuntimeMountedAlready: true,
  envValueReadByModule: false,
  dbRead: false,
  dbWrite: false,
  prismaValidate: false,
  prismaGenerate: false,
  prismaMigration: false,
  adminUiRuntimeMounted: false,
  walletMutation: false,
  payment: false,
  payout: false,
  providerDispatch: false,
  fakeSuccessBlocked: true,
};
