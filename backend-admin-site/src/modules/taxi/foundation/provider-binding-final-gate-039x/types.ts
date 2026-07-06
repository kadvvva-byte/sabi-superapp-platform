export type Taxi039XProviderBindingFinalGateReadiness = {
  stage: string;
  ready: boolean;
  providerBindingFinalGateReady: boolean;
  exactOwnerApprovalRequiredBeforeProviderBinding: boolean;
  exactOwnerApprovalRequiredBeforeRawApiKeyIntake: boolean;
  apiKeyValueAcceptedByThisStage: false;
  envReadOrDumped: false;
  secretValuesReadOrPrinted: false;
  providerCallPerformed: false;
  dbWritePerformed: false;
  walletMutationPerformed: false;
  moneyMovementPerformed: false;
  productionLaunchClaimed: false;
};
