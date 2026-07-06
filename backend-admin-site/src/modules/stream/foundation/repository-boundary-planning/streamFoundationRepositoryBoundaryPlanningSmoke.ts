import { getStreamFoundationRepositoryBoundaryPlanningSnapshot } from "./streamFoundationRepositoryBoundaryPlanning";
import { getStreamFoundationRepositoryBoundaryPlanningReadiness } from "./streamFoundationRepositoryBoundaryPlanningReadiness";

export function runStreamFoundationRepositoryBoundaryPlanningSmoke() {
  const snapshot = getStreamFoundationRepositoryBoundaryPlanningSnapshot();
  const readiness = getStreamFoundationRepositoryBoundaryPlanningReadiness();

  const assertions = [
    {
      id: "142z_fix1_verification_evidence_preserved",
      passed:
        snapshot.verificationEvidence142ZFix1.compilePassed === true &&
        snapshot.verificationEvidence142ZFix1.scopeLimitedToStreamFoundation === true &&
        snapshot.verificationEvidence142ZFix1.tscExitCode === 0 &&
        snapshot.verificationEvidence142ZFix1.databaseWritePerformed === 0 &&
        snapshot.verificationEvidence142ZFix1.fakeSuccessAllowed === false,
      evidence: JSON.stringify(snapshot.verificationEvidence142ZFix1),
    },
    {
      id: "repository_boundary_planning_items_present",
      passed:
        snapshot.planItems.length === 8 &&
        snapshot.planItems.some((item) => item.area === "session_repository_interface") &&
        snapshot.planItems.some((item) => item.area === "idempotency_boundary") &&
        snapshot.planItems.some((item) => item.area === "schema_migration_gate") &&
        snapshot.planItems.some((item) => item.area === "runtime_mount_gate"),
      evidence: JSON.stringify(snapshot.planItems.map((item) => item.area)),
    },
    {
      id: "repository_planning_blocks_db_and_schema_now",
      passed:
        snapshot.planItems.every((item) => item.schemaWriteAllowedNow === false) &&
        snapshot.planItems.every((item) => item.migrationAllowedNow === false) &&
        snapshot.planItems.every((item) => item.runtimeDbReadAllowedNow === false) &&
        snapshot.planItems.every((item) => item.runtimeDbWriteAllowedNow === false) &&
        snapshot.planItems.every((item) => item.repositoryMountAllowedNow === false),
      evidence: JSON.stringify(snapshot.planItems),
    },
    {
      id: "next_143b_approval_present",
      passed:
        snapshot.requiredExactApprovalTextFor143B.includes("BACKEND-STREAM-FOUNDATION-143B") &&
        snapshot.requiredExactApprovalTextFor143B.includes("source-only repository interface contracts") &&
        snapshot.requiredExactApprovalTextFor143B.includes("do not write prisma/schema.prisma") &&
        snapshot.requiredExactApprovalTextFor143B.includes("no fake success"),
      evidence: snapshot.requiredExactApprovalTextFor143B,
    },
    {
      id: "143a_safety_clean",
      passed:
        snapshot.safety.targetWriteBy143A === false &&
        snapshot.safety.prismaSchemaChangeBy143A === false &&
        snapshot.safety.migrationCreatedBy143A === false &&
        snapshot.safety.runtimePostBy143A === false &&
        snapshot.safety.databaseReadBy143A === false &&
        snapshot.safety.databaseWriteBy143A === false &&
        snapshot.safety.providerCallBy143A === false &&
        snapshot.safety.walletMutationBy143A === false &&
        snapshot.safety.moneyMovementBy143A === false &&
        snapshot.safety.fakeSuccessBy143A === false,
      evidence: JSON.stringify(snapshot.safety),
    },
    {
      id: "readiness_true",
      passed: readiness.ready === true,
      evidence: readiness.status,
    },
  ];

  const failedAssertions = assertions.filter((assertion) => !assertion.passed);

  return {
    version: snapshot.version,
    stage: "repository_boundary_planning_smoke",
    ok: failedAssertions.length === 0,
    status: failedAssertions.length === 0 ? "repository_boundary_planning_smoke_passed" : "repository_boundary_planning_smoke_blocked",
    assertions,
    failedAssertions,
    nextRecommendedStage: readiness.nextRecommendedStage,
  } as const;
}
