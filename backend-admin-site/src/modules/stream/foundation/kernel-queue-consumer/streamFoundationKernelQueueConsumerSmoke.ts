import { getStreamFoundationKernelQueueConsumerReadiness } from "./streamFoundationKernelQueueConsumerReadiness";
import { STREAM_FOUNDATION_138D_KERNEL_QUEUE_CONSUMER_VERSION } from "./streamFoundationKernelQueueConsumerContracts";

export interface StreamFoundationKernelQueueConsumerSmokeResult {
  readonly version: typeof STREAM_FOUNDATION_138D_KERNEL_QUEUE_CONSUMER_VERSION;
  readonly passed: boolean;
  readonly streamIndexPatchIncluded: false;
  readonly routeMountViolations: number;
  readonly queueConsumerStartViolations: number;
  readonly eventBusPublishViolations: number;
  readonly databaseWriteViolations: number;
  readonly providerCallViolations: number;
  readonly walletMutationViolations: number;
  readonly moneyMovementViolations: number;
  readonly secretLeakViolations: number;
  readonly fakeSuccessViolations: number;
}

export function runStreamFoundationKernelQueueConsumerSmoke(): StreamFoundationKernelQueueConsumerSmokeResult {
  const readiness = getStreamFoundationKernelQueueConsumerReadiness();
  const routeMountViolations = readiness.routeMountAllowedNow ? 1 : 0;
  const queueConsumerStartViolations = readiness.queueReadAllowedNow || readiness.queueAckAllowedNow ? 1 : 0;
  const eventBusPublishViolations = readiness.eventBusPublishAllowedNow ? 1 : 0;
  const databaseWriteViolations = readiness.databaseWriteAllowedNow ? 1 : 0;
  const providerCallViolations = readiness.providerCallAllowedNow ? 1 : 0;
  const walletMutationViolations = readiness.walletMutationAllowedNow ? 1 : 0;
  const moneyMovementViolations = readiness.moneyMovementAllowedNow ? 1 : 0;
  const secretLeakViolations = readiness.rawSecretsReturned || readiness.mobileProviderKeysAllowed ? 1 : 0;
  const fakeSuccessViolations = readiness.fakeSuccessAllowed ? 1 : 0;

  return {
    version: STREAM_FOUNDATION_138D_KERNEL_QUEUE_CONSUMER_VERSION,
    passed: routeMountViolations + queueConsumerStartViolations + eventBusPublishViolations + databaseWriteViolations + providerCallViolations + walletMutationViolations + moneyMovementViolations + secretLeakViolations + fakeSuccessViolations === 0,
    streamIndexPatchIncluded: false,
    routeMountViolations,
    queueConsumerStartViolations,
    eventBusPublishViolations,
    databaseWriteViolations,
    providerCallViolations,
    walletMutationViolations,
    moneyMovementViolations,
    secretLeakViolations,
    fakeSuccessViolations,
  };
}
