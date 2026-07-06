import { runStreamFoundationKernelQueueConsumerSmoke } from "./kernel-queue-consumer/streamFoundationKernelQueueConsumerSmoke";
import { getStreamFoundationKernelQueueConsumerReadiness } from "./kernel-queue-consumer/streamFoundationKernelQueueConsumerReadiness";

export const STREAM_138D_BACKEND_FOUNDATION_KERNEL_QUEUE_CONSUMER_STAGING_MANIFEST_VERSION = "BACKEND-STREAM-FOUNDATION-138D" as const;

export function getStream138DBackendFoundationKernelQueueConsumerStagingManifest() {
  const readiness = getStreamFoundationKernelQueueConsumerReadiness();
  const smoke = runStreamFoundationKernelQueueConsumerSmoke();
  return {
    version: STREAM_138D_BACKEND_FOUNDATION_KERNEL_QUEUE_CONSUMER_STAGING_MANIFEST_VERSION,
    scope: "src/modules/stream/foundation/** only",
    streamIndexPatchIncluded: false,
    addedLayer: "kernel_queue_consumer_contracts",
    pipeline: [
      "kernel_event_queue_138c",
      "kernel_queue_consumer_138d",
      "future_bound_adapters_after_approval",
    ] as const,
    readiness,
    smoke,
    safety: {
      routeMountAllowedNow: false,
      queueConsumerStartedNow: false,
      queueReadExecutedNow: false,
      queueAckExecutedNow: false,
      eventBusPublishAllowedNow: false,
      databaseWriteAllowedNow: false,
      providerCallAllowedNow: false,
      walletMutationAllowedNow: false,
      realtimeBroadcastAllowedNow: false,
      mediaStorageWriteAllowedNow: false,
      moneyMovementAllowedNow: false,
      rawSecretsReturned: false,
      mobileProviderKeysAllowed: false,
      fakeSuccessAllowed: false,
    },
  } as const;
}
