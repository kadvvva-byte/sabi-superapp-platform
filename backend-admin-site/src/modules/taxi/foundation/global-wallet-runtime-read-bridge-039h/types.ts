export type TaxiGlobalWalletRuntimeReadBridgeSafety039H = Readonly<{
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

export type TaxiGlobalWalletRuntimeReadBridge039H = Readonly<{
  version: string;
  status: string;
  mode: 'safe_read_runtime_bridge_no_money_movement';
  taxiMustNotHaveStandaloneWallet: true;
  taxiUsesMainGlobalWallet: true;
  rideFareDirectNoCommission: true;
  commissionBps: 0;
  visaCardCashbackPercent: 2;
  visaCardCashbackBps: 200;
  cashbackPostedThroughMainWalletLedger: true;
  globalWalletCorePorts: readonly string[];
  linkedTaxiFinanceModels: readonly string[];
  forbiddenStandaloneTaxiWalletModels: readonly string[];
  runtimeReadChecks: readonly string[];
  safety: TaxiGlobalWalletRuntimeReadBridgeSafety039H;
  nextStep: string;
}>;

export type TaxiGlobalWalletRuntimeReadBridgeReadiness039H = Readonly<{
  version: string;
  status: string;
  taxiGlobalWalletRuntimeReadBridge039H: 100;
  taxi039GPrismaValidateGenerate: 100;
  taxi039FGlobalWalletSchemaAppend: 100;
  taxiUsesMainGlobalWallet: true;
  standaloneTaxiWalletAllowed: false;
  rideFareCommissionBps: 0;
  visaCashbackBps: 200;
  taxiRealWalletFinanceClosurePath: 70;
  taxiBackendFoundationSafeRead: 99;
  taxiAdminUiFunctional: 99;
  taxiMobileUnifiedOrganismUi: 100;
  taxiOwnerSabiAiControl: 100;
  taxiRealWalletPaymentPayoutProviderDbExecution: '0_locked_until_real_wallet_execution_stage_with_money_movement_exact_owner_approval';
  taxiFullProductionReadiness: 99;
}>;
