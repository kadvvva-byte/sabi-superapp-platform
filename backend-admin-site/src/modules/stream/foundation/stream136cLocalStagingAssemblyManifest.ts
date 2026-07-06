import { stream136aBackendCommonFoundationReadOnlyAudit } from "./stream136aBackendCommonFoundationReadOnlyAudit";
import { stream136bBackendCommonContractArchitectureMap } from "./stream136bBackendCommonContractArchitectureMapDraft";

export type Stream136cLocalStagingAssemblyManifest = Readonly<{
  stage: "BACKEND_STREAM_FOUNDATION_136C";
  mode: "local_staging_assembly_only";
  assembledHereFirst: true;
  directServerWriteAllowed: false;
  targetServerLater: "/opt/sabi/backend";
  mobileProjectTouched: false;
  sourceOnly: true;
  includedStages: readonly ["BACKEND_STREAM_FOUNDATION_136A", "BACKEND_STREAM_FOUNDATION_136B"];
  includedFiles: readonly string[];
  safety: Readonly<{
    routeMountAllowedNow: false;
    runtimeExecutionAllowedNow: false;
    databaseWriteAllowedNow: false;
    providerCallAllowedNow: false;
    walletRuntimeMutationAllowedNow: false;
    messengerRuntimeMutationAllowedNow: false;
    fakeSuccessAllowed: false;
    secretMaterialAllowedInMobileOrReport: false;
  }>;
  summary: Readonly<{
    auditItems: number;
    architectureContracts: number;
    unsafeExecutionFlags: 0;
  }>;
}>;

export const stream136cLocalStagingAssemblyManifest: Stream136cLocalStagingAssemblyManifest = {
  stage: "BACKEND_STREAM_FOUNDATION_136C",
  mode: "local_staging_assembly_only",
  assembledHereFirst: true,
  directServerWriteAllowed: false,
  targetServerLater: "/opt/sabi/backend",
  mobileProjectTouched: false,
  sourceOnly: true,
  includedStages: ["BACKEND_STREAM_FOUNDATION_136A", "BACKEND_STREAM_FOUNDATION_136B"],
  includedFiles: [
    "src/modules/stream/foundation/stream136aBackendCommonFoundationReadOnlyAudit.ts",
    "src/modules/stream/foundation/stream136bBackendCommonContractArchitectureMapDraft.ts",
    "src/modules/stream/foundation/stream136cLocalStagingAssemblyManifest.ts",
    "src/modules/stream/index.ts",
  ],
  safety: {
    routeMountAllowedNow: false,
    runtimeExecutionAllowedNow: false,
    databaseWriteAllowedNow: false,
    providerCallAllowedNow: false,
    walletRuntimeMutationAllowedNow: false,
    messengerRuntimeMutationAllowedNow: false,
    fakeSuccessAllowed: false,
    secretMaterialAllowedInMobileOrReport: false,
  },
  summary: {
    auditItems: stream136aBackendCommonFoundationReadOnlyAudit.items.length,
    architectureContracts: stream136bBackendCommonContractArchitectureMap.items.length,
    unsafeExecutionFlags: 0,
  },
};

export function getStream136cLocalStagingAssemblyManifest(): Stream136cLocalStagingAssemblyManifest {
  return stream136cLocalStagingAssemblyManifest;
}
