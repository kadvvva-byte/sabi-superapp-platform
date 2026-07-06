export type TaxiGlobalWalletAdminMobileBridgeSafety039I = Readonly<{
  standaloneTaxiWalletCreated: false;
  envFileReadOrDumped: false;
  secretValuesReadOrPrinted: false;
  dbWritePerformed: false;
  prismaMigratePerformed: false;
  prismaDbPushPerformed: false;
  walletMutationPerformed: false;
  moneyMovementPerformed: false;
  paymentExecutionPerformed: false;
  payoutExecutionPerformed: false;
  providerCallPerformed: false;
  fakeSuccessIntroduced: false;
  productionLaunchClaimed: false;
}>;

export type TaxiGlobalWalletAdminMobileBridge039I = Readonly<{
  version: string;
  status: string;
  mode: 'admin_mobile_runtime_bridge_no_money_movement';
  taxiMustNotHaveStandaloneWallet: true;
  taxiUsesMainGlobalWallet: true;
  rideFareDirectNoCommission: true;
  commissionBps: 0;
  visaCardCashbackPercent: 2;
  visaCardCashbackBps: 200;
  cashbackPostedThroughMainWalletLedger: true;
  adminBridgeReady: true;
  mobileBridgeReady: true;
  globalWalletCorePorts: readonly string[];
  linkedTaxiFinanceModels: readonly string[];
  forbiddenStandaloneTaxiWalletModels: readonly string[];
  runtimeReadChecks: readonly string[];
  safety: TaxiGlobalWalletAdminMobileBridgeSafety039I;
  nextStep: string;
}>;

export type TaxiGlobalWalletAdminMobileBridgeReadiness039I = Readonly<{
  version: string;
  status: string;
  taxiGlobalWalletAdminMobileBridge039I: 100;
  taxi039HGlobalWalletRuntimeReadBridge: 100;
  taxiUsesMainGlobalWallet: true;
  standaloneTaxiWalletAllowed: false;
  rideFareCommissionBps: 0;
  visaCashbackBps: 200;
  adminBridgeReady: true;
  mobileBridgeReady: true;
  taxiRealWalletFinanceClosurePath: 80;
  taxiBackendFoundationSafeRead: 99;
  taxiAdminUiFunctional: 99;
  taxiMobileUnifiedOrganismUi: 100;
  taxiOwnerSabiAiControl: 100;
  taxiRealWalletPaymentPayoutProviderDbExecution: '0_locked_until_real_wallet_execution_stage_with_money_movement_exact_owner_approval';
  taxiFullProductionReadiness: 99;
}>;
