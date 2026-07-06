export type TaxiOwnerSabiAiGlobalWalletFinanceRiskReportSafety039K = Readonly<{
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
  ownerSabiAiAutonomousExecutionPerformed: false;
}>;

export type TaxiOwnerSabiAiGlobalWalletFinanceRiskReport039K = Readonly<{
  version: string;
  status: string;
  mode: 'owner_sabi_ai_finance_risk_report_no_money_movement';
  taxiMustNotHaveStandaloneWallet: true;
  taxiUsesMainGlobalWallet: true;
  rideFareDirectNoCommission: true;
  commissionBps: 0;
  visaCardCashbackPercent: 2;
  visaCardCashbackBps: 200;
  cashbackPostedThroughMainWalletLedger: true;
  ownerSabiAiReportReady: true;
  dailyPrivateFinanceRiskReportRequired: true;
  urgentRiskReportRequired: true;
  reportOnlyNoAutonomousExecution: true;
  riskSignals: readonly string[];
  globalWalletCorePorts: readonly string[];
  linkedTaxiFinanceModels: readonly string[];
  forbiddenStandaloneTaxiWalletModels: readonly string[];
  safety: TaxiOwnerSabiAiGlobalWalletFinanceRiskReportSafety039K;
  nextStep: string;
}>;

export type TaxiOwnerSabiAiGlobalWalletFinanceRiskReportReadiness039K = Readonly<{
  version: string;
  status: string;
  taxiOwnerSabiAiGlobalWalletFinanceRiskReport039K: 100;
  taxi039IGlobalWalletAdminMobileBridge: 100;
  taxiUsesMainGlobalWallet: true;
  standaloneTaxiWalletAllowed: false;
  rideFareCommissionBps: 0;
  visaCashbackBps: 200;
  ownerSabiAiReportReady: true;
  taxiRealWalletFinanceClosurePath: 90;
  taxiBackendFoundationSafeRead: 99;
  taxiAdminUiFunctional: 99;
  taxiMobileUnifiedOrganismUi: 100;
  taxiOwnerSabiAiControl: 100;
  taxiRealWalletPaymentPayoutProviderDbExecution: '0_locked_until_real_wallet_execution_stage_with_money_movement_exact_owner_approval';
  taxiFullProductionReadiness: 99;
}>;
