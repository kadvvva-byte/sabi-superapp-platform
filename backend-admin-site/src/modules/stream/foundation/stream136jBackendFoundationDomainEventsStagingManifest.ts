import { getStreamFoundationDomainEventDecisionIndex } from "./domain-events";

export const STREAM_136J_BACKEND_FOUNDATION_DOMAIN_EVENTS_STAGING_VERSION = "BACKEND-STREAM-FOUNDATION-136J" as const;

export type Stream136JBackendFoundationDomainEventsStagingManifest = Readonly<{
  version: typeof STREAM_136J_BACKEND_FOUNDATION_DOMAIN_EVENTS_STAGING_VERSION;
  stage: "local_staging_only";
  scope: "backend_stream_foundation_domain_events";
  patchMode: "source_only_contracts";
  domainEventContracts: number;
  sourceOnlyContractReadyEvents: number;
  backendBlockedEvents: number;
  adminBlockedEvents: number;
  providerBlockedEvents: number;
  lastStageLockedEvents: number;
  routeMountAllowedNow: false;
  runtimeExecutionAllowedNow: false;
  eventBusPublishAllowedNow: false;
  realtimeBroadcastAllowedNow: false;
  databaseWriteAllowedNow: false;
  providerCallAllowedNow: false;
  walletRuntimeMutationAllowedNow: false;
  messengerRuntimeMutationAllowedNow: false;
  giftsPaymentsRuntimeMutationAllowedNow: false;
  fakeSuccessAllowed: false;
  secretMaterialAllowedInResponse: false;
  notes: readonly string[];
}>;

export function getStream136JBackendFoundationDomainEventsStagingManifest(): Stream136JBackendFoundationDomainEventsStagingManifest {
  const index = getStreamFoundationDomainEventDecisionIndex();

  return {
    version: STREAM_136J_BACKEND_FOUNDATION_DOMAIN_EVENTS_STAGING_VERSION,
    stage: "local_staging_only",
    scope: "backend_stream_foundation_domain_events",
    patchMode: "source_only_contracts",
    domainEventContracts: index.totalEventContracts,
    sourceOnlyContractReadyEvents: index.sourceOnlyContractReadyEvents,
    backendBlockedEvents: index.backendBlockedEvents,
    adminBlockedEvents: index.adminBlockedEvents,
    providerBlockedEvents: index.providerBlockedEvents,
    lastStageLockedEvents: index.lastStageLockedEvents,
    routeMountAllowedNow: false,
    runtimeExecutionAllowedNow: false,
    eventBusPublishAllowedNow: false,
    realtimeBroadcastAllowedNow: false,
    databaseWriteAllowedNow: false,
    providerCallAllowedNow: false,
    walletRuntimeMutationAllowedNow: false,
    messengerRuntimeMutationAllowedNow: false,
    giftsPaymentsRuntimeMutationAllowedNow: false,
    fakeSuccessAllowed: false,
    secretMaterialAllowedInResponse: false,
    notes: [
      "136J adds Stream backend domain event contracts for live, Shorts, moderation, business, analytics, launch readiness, and Wallet/Gift boundary.",
      "Events are contract-only and cannot be dispatched, broadcast, persisted, or provider-backed in this staging patch.",
      "This patch also adds a compatibility type alias for the 136I write command stage so the staging bundle compiles cleanly.",
    ],
  };
}
