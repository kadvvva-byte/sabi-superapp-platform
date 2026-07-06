import {
  STREAM_FOUNDATION_140I_KERNEL_DIAGNOSTICS_CONTROLLED_NON_FOUNDATION_SOURCE_WRITE_POST_WRITE_VERIFICATION_VERSION,
  StreamFoundationKernelDiagnosticsControlledNonFoundationSourceWritePostWriteVerificationSmoke,
} from "./streamFoundationKernelDiagnosticsControlledNonFoundationSourceWritePostWriteVerificationContracts";
import { getStreamFoundationKernelDiagnosticsControlledNonFoundationSourceWritePostWriteVerificationSnapshot } from "./streamFoundationKernelDiagnosticsControlledNonFoundationSourceWritePostWriteVerification";

export function runStreamFoundationKernelDiagnosticsControlledNonFoundationSourceWritePostWriteVerificationSmoke(): StreamFoundationKernelDiagnosticsControlledNonFoundationSourceWritePostWriteVerificationSmoke {
  const snapshot = getStreamFoundationKernelDiagnosticsControlledNonFoundationSourceWritePostWriteVerificationSnapshot();
  const failedAssertions = [
    snapshot.sourceWriteTargetCount === 2,
    snapshot.serverChangeExpected === false,
    snapshot.backendRestartAllowedNow === false,
    snapshot.runtimeHttpSmokeAllowedNow === false,
    snapshot.readyForRuntimeSmoke === false,
    snapshot.readyForPostWriteSourceVerification === true,
    snapshot.safety.databaseWritePerformed === 0,
    snapshot.safety.providerCallPerformed === 0,
    snapshot.safety.walletMutationPerformed === 0,
    snapshot.safety.moneyMovementPerformed === 0,
  ].filter((passed) => !passed).length;

  if (failedAssertions !== 0) {
    throw new Error("140I post-write verification smoke failed before runtime boundary");
  }

  return {
    version: STREAM_FOUNDATION_140I_KERNEL_DIAGNOSTICS_CONTROLLED_NON_FOUNDATION_SOURCE_WRITE_POST_WRITE_VERIFICATION_VERSION,
    passed: true,
    status: "controlled_non_foundation_source_write_post_write_verification_smoke_passed",
    assertionCount: 10,
    failedAssertions: 0,
    backendRestartPerformed: 0,
    runtimeHttpSmokePerformed: 0,
    databaseWritePerformed: 0,
    providerCallPerformed: 0,
    walletMutationPerformed: 0,
    moneyMovementPerformed: 0,
    safeCode: "140i_post_write_verification_smoke_passed_no_runtime",
  };
}
