import { getStreamFoundationKernelQueueConsumerSnapshot } from "./streamFoundationKernelQueueConsumer";
import { STREAM_FOUNDATION_138D_KERNEL_QUEUE_CONSUMER_VERSION } from "./streamFoundationKernelQueueConsumerContracts";

export interface StreamFoundationKernelQueueConsumerReadiness {
  readonly version: typeof STREAM_FOUNDATION_138D_KERNEL_QUEUE_CONSUMER_VERSION;
  readonly readyForKernelConsumerContractReview: true;
  readonly readyForRuntimeConsumerStartNow: false;
  readonly routeMountAllowedNow: false;
  readonly queueReadAllowedNow: false;
  readonly queueAckAllowedNow: false;
  readonly eventBusPublishAllowedNow: false;
  readonly databaseWriteAllowedNow: false;
  readonly providerCallAllowedNow: false;
  readonly walletMutationAllowedNow: false;
  readonly moneyMovementAllowedNow: false;
  readonly rawSecretsReturned: false;
  readonly mobileProviderKeysAllowed: false;
  readonly streamIndexPatchIncluded: false;
  readonly fakeSuccessAllowed: false;
  readonly blockingReasons: readonly string[];
}

export function getStreamFoundationKernelQueueConsumerReadiness(): StreamFoundationKernelQueueConsumerReadiness {
  const snapshot = getStreamFoundationKernelQueueConsumerSnapshot();
  return {
    version: STREAM_FOUNDATION_138D_KERNEL_QUEUE_CONSUMER_VERSION,
    readyForKernelConsumerContractReview: true,
    readyForRuntimeConsumerStartNow: false,
    routeMountAllowedNow: false,
    queueReadAllowedNow: false,
    queueAckAllowedNow: false,
    eventBusPublishAllowedNow: false,
    databaseWriteAllowedNow: false,
    providerCallAllowedNow: false,
    walletMutationAllowedNow: false,
    moneyMovementAllowedNow: false,
    rawSecretsReturned: false,
    mobileProviderKeysAllowed: false,
    streamIndexPatchIncluded: false,
    fakeSuccessAllowed: false,
    blockingReasons: [
      "consumer_adapter_binding_not_approved",
      "route_mount_not_approved",
      "database_persistence_adapter_not_bound",
      "provider_adapters_not_bound",
      "wallet_ledger_adapter_not_bound",
      "payment_authorization_provider_not_configured",
      "monthly_payout_batch_not_live",
      `consumer_adapters_covered:${snapshot.totalConsumerAdaptersCovered}`,
    ],
  };
}
