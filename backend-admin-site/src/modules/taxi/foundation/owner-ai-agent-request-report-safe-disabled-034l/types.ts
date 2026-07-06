export type TaxiOwnerAiAgentRequestReportSafety034L = Readonly<{
  envFileReadOrDumped: false;
  dbWritePerformed: false;
  walletMutationPerformed: false;
  paymentExecutionPerformed: false;
  payoutExecutionPerformed: false;
  providerCallPerformed: false;
  moneyMovementPerformed: false;
  fakeSuccessIntroduced: false;
  productionLaunchClaimed: false;
}>;

export type TaxiOwnerAiAgentRequestStage034L = Readonly<{
  key: string;
  layer: 'mobile' | 'backend' | 'admin-ui' | 'owner-ai';
  status: 'closed' | 'locked' | 'report_only';
  summary: string;
  writeExecution: 'blocked' | 'not_applicable';
}>;

export type TaxiOwnerAiAgentRequestGate034L = Readonly<{
  key: string;
  method: 'POST';
  path: string;
  expectedRuntimeStatus: 409;
  expectedRuntimeMarker: 'safe_disabled';
  ownerApprovalRequiredBeforeOpen: true;
  moneyExecution: 'blocked';
  providerExecution: 'blocked';
  rawPersonalDataExposure: 'blocked';
}>;

export type TaxiOwnerAiAgentRequestReport034L = Readonly<{
  version: string;
  status: 'report_only_safe_disabled';
  ownerSabiAiRole: 'owner_private_report_only_no_mutation';
  reportPrivacy: 'owner_private_redacted_no_raw_personal_data';
  upstreamStages: readonly TaxiOwnerAiAgentRequestStage034L[];
  requestGates: readonly TaxiOwnerAiAgentRequestGate034L[];
  ownerRequiredDecisionsBeforeExecution: readonly string[];
  forbiddenWithoutOwnerApproval: readonly string[];
  readiness: Readonly<{
    mobile034IRequestSafeDisabledConnect: 100;
    admin034JRequestControl: 100;
    backend034KRuntimeSafeDisabledGate: 100;
    ownerSabiAiReportLayer034L: 100;
    walletPaymentPayoutTopupExecution: 'locked_until_owner_approval_wallet_chain';
  }>;
  safety: TaxiOwnerAiAgentRequestReportSafety034L;
}>;
