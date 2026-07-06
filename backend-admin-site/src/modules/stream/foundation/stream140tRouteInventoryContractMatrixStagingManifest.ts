import { getStreamFoundationRouteInventoryContractMatrixSnapshot } from "./route-inventory-contract-matrix";

export const STREAM_140T_ROUTE_INVENTORY_CONTRACT_MATRIX_STAGING_MANIFEST = {
  version: "BACKEND-STREAM-FOUNDATION-140T",
  stage: "route_inventory_contract_matrix_source_only",
  sourceOnly: true,
  changedScope: "src/modules/stream/foundation/**",
  previousPassedStage: "BACKEND-STREAM-FOUNDATION-140R",
  postSmokeHandoffStage: "BACKEND-STREAM-FOUNDATION-140S",
  forbidden: {
    appTsChange: false,
    serverTsChange: false,
    streamIndexChange: false,
    backendRestart: false,
    runtimeHttpBy140T: false,
    databaseWrite: false,
    providerCall: false,
    walletMutation: false,
    paymentAuthorization: false,
    monthlyPayout: false,
    moneyMovement: false,
    fakeSuccess: false,
  },
  snapshot: getStreamFoundationRouteInventoryContractMatrixSnapshot(),
} as const;
