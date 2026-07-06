import type {
  SabiAiLearningSafetyLocks254E,
  SabiAiRiskMemoryIndex254E,
  SabiAiRiskRouterInput254E,
  SabiAiRiskRouterOutput254E,
} from './sabiAiRiskRouter254E.types';

export const sabiAiRiskMemoryIndex254E: SabiAiRiskMemoryIndex254E = {
  globalOwnerRulesIndex: true,
  accountRiskSignalIndex: true,
  programRiskIndex: true,
  domainBrainIndex: true,
  evidenceReferenceIndexFuture: true,
  ownerReportIndexFuture: true,
  complianceReviewIndexFuture: true,
  financeSafetyGateIndexFuture: true,
} as const;

const normalHelpSignals254E = [
  'normal',
  'help',
  'guidance',
  'explain',
  'question',
  'where is my ride',
  'ride help',
  'profile help',
  'translation',
  'service explanation',
] as const;

const operationalRiskSignals254E = [
  'risk',
  'abuse',
  'complaint',
  'dispute',
  'lost property',
  'moderation',
  'safety',
  'warning',
  'violation',
  'suspicious',
] as const;

function isNormalHelpSignal254E(risk: string): boolean {
  return normalHelpSignals254E.some((item) => risk.includes(item));
}

function isOperationalRiskSignal254E(risk: string): boolean {
  return operationalRiskSignals254E.some((item) => risk.includes(item));
}

function defaultDomainBrainForProgram254E(program: string): string {
  if (program.includes('taxi')) return 'taxi_brain';
  if (program.includes('messenger')) return 'messenger_brain';
  if (program.includes('profile')) return 'profile_account_brain';
  if (program.includes('wallet')) return 'wallet_finance_brain';
  if (program.includes('stream')) return 'stream_brain';
  if (program.includes('merchant') || program.includes('business')) return 'marketplace_business_brain';
  if (program.includes('public') || program.includes('ecology')) return 'public_ecology_transparency_brain';
  return 'future_programs_brain';
}

export function routeSabiAiRiskCase254E(input: SabiAiRiskRouterInput254E): SabiAiRiskRouterOutput254E {
  const risk = input.riskSignalType.toLowerCase();
  const program = input.program.toLowerCase();

  if (
    input.minorSafetyRelated ||
    risk.includes('extortion') ||
    risk.includes('coercion') ||
    risk.includes('trafficking') ||
    risk.includes('terrorism') ||
    risk.includes('violent')
  ) {
    return {
      priorityQueue: 'p0ImmediateSafetyAndCrime',
      domainBrains: program.includes('messenger')
        ? ['messenger_brain', 'crime_compliance_brain', 'profile_account_brain', 'legal_brain']
        : ['crime_compliance_brain', 'legal_brain'],
      ownerReportRequired: true,
      complianceReviewRequired: true,
      suspectDisclosureAllowed: false,
      finalActionGateRequired: true,
    } as const;
  }

  if (
    input.moneyRelated ||
    risk.includes('aml') ||
    risk.includes('money') ||
    risk.includes('fraud') ||
    risk.includes('scam') ||
    risk.includes('corruption') ||
    risk.includes('bribery') ||
    risk.includes('kyc') ||
    risk.includes('fake') ||
    risk.includes('abuse')
  ) {
    const domainBrains = new Set<string>(['crime_compliance_brain']);
    if (program.includes('taxi')) domainBrains.add('taxi_brain');
    if (program.includes('wallet') || input.moneyRelated) domainBrains.add('wallet_finance_brain');
    if (program.includes('profile') || input.identityRelated) domainBrains.add('profile_account_brain');
    if (program.includes('merchant') || program.includes('business')) domainBrains.add('marketplace_business_brain');
    if (program.includes('public') || program.includes('ecology')) domainBrains.add('public_ecology_transparency_brain');
    domainBrains.add('legal_brain');

    return {
      priorityQueue: 'p1AmlFraudCorruption',
      domainBrains: Array.from(domainBrains),
      ownerReportRequired: true,
      complianceReviewRequired: true,
      financeGateRequired: input.moneyRelated,
      suspectDisclosureAllowed: false,
      finalActionGateRequired: true,
    } as const;
  }

  if (isNormalHelpSignal254E(risk) && !isOperationalRiskSignal254E(risk)) {
    return {
      priorityQueue: 'p3NormalHelp',
      domainBrains: [defaultDomainBrainForProgram254E(program)],
      ownerReportRequired: false,
      userHelpContinues: true,
      suspectDisclosureAllowed: true,
      finalActionGateRequired: false,
    } as const;
  }

  if (
    program.includes('taxi') ||
    program.includes('messenger') ||
    program.includes('profile') ||
    program.includes('wallet') ||
    program.includes('stream')
  ) {
    const domainBrains = program.includes('taxi')
      ? ['taxi_brain']
      : program.includes('messenger')
        ? ['messenger_brain']
        : program.includes('profile')
          ? ['profile_account_brain']
          : program.includes('wallet')
            ? ['wallet_finance_brain']
            : ['stream_brain'];

    return {
      priorityQueue: 'p2ProgramSafetyHelp',
      domainBrains,
      ownerReportRequired: false,
      userHelpContinues: true,
      suspectDisclosureAllowed: true,
      finalActionGateRequired: false,
    } as const;
  }

  return {
    priorityQueue: 'p3NormalHelp',
    domainBrains: ['future_programs_brain'],
    ownerReportRequired: false,
    userHelpContinues: true,
    suspectDisclosureAllowed: true,
    finalActionGateRequired: false,
  } as const;
}

export const sabiAiLearningSafetyLocks254E: SabiAiLearningSafetyLocks254E = {
  localCodeArtifactOnly: true,
  riskMemoryIndexMappedNow: true,
  caseRouterMappedNow: true,
  domainRiskRoutingMappedNow: true,
  caseStateMachineMappedNow: true,
  syntheticFixturesOnly: true,
  noRealUserDataNow: true,
  noRealMonitoringNow: true,
  noModelProviderTrainingNow: true,
  noAiProviderCallNow: true,
  noNetworkCallNow: true,
  noDbReadNow: true,
  noDbWriteNow: true,
  noVectorDbNow: true,
  noRuntimeMountNow: true,
  noDeploymentNow: true,
  noDistributedQueueNow: true,
  noDistributedMemoryNow: true,
  noMillionUserRuntimeNow: true,
  noAccountBlockNow: true,
  noPaymentRestrictionNow: true,
  noLawEnforcementSendNow: true,
  ownerApprovalRequiredForProviderTraining: true,
  ownerApprovalRequiredForDbPersistence: true,
  ownerApprovalRequiredForRuntimeMonitoring: true,
  ownerApprovalRequiredForDistributedQueue: true,
  ownerApprovalRequiredForMillionUserRuntime: true,
  ownerApprovalRequiredForAccountRestriction: true,
  ownerApprovalRequiredForPaymentRestriction: true,
  ownerApprovalRequiredForLegalEscalation: true,
} as const;
