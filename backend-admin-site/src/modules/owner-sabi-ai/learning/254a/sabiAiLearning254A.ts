import type {
  SabiAiLearningBoot254A,
  SabiAiLearningSafetyLocks254A,
  SabiAiLearningTrack254A,
} from './sabiAiLearning254A.types';

export const sabiAiLearningBoot254A: SabiAiLearningBoot254A = {
  version: 'SABI-AI-LEARNING-254A-CORE-LEARNING-BOOT-LOCAL-ONLY-NO-PROVIDER-NO-DB',
  learningBootPreparedNow: true,
  learningBootStartedLocalContractNow: true,
  modelProviderTrainingNow: false,
  aiProviderCallNow: false,
  networkCallNow: false,
  dbReadNow: false,
  dbWriteNow: false,
  runtimeMountNow: false,
  deploymentNow: false,
  moneyActionNow: false,
} as const;

export const sabiAiLearningTracks254A: readonly SabiAiLearningTrack254A[] = [
  {
    track: 'owner_governance',
    readiness: 100,
    priority: 1,
    goal: 'Learn Owner authority, approval gates and reporting style.',
  },
  {
    track: 'security_compliance_anti_fraud',
    readiness: 100,
    priority: 2,
    goal: 'Learn AML, fraud, corruption and crime-risk handling.',
  },
  {
    track: 'finance_accounting_wallet_rules',
    readiness: 100,
    priority: 3,
    goal: 'Learn finance, wallet, OTP/3DS and no autonomous money rules.',
  },
  {
    track: 'language_culture_communication',
    readiness: 100,
    priority: 4,
    goal: 'Learn clean RU/EN communication and dynamic translation behavior.',
  },
  {
    track: 'programming_architecture',
    readiness: 100,
    priority: 5,
    goal: 'Learn safe backend/admin/mobile architecture and runtime gates.',
  },
  {
    track: 'stream_creative_personality',
    readiness: 100,
    priority: 6,
    goal: 'Learn original safe creative planning for future Stream content.',
  },
] as const;

export const sabiAiLearningSafetyLocks254A: SabiAiLearningSafetyLocks254A = {
  localCodeArtifactOnly: true,
  learningBootStartedLocalContractNow: true,
  noModelProviderTrainingNow: true,
  noAiProviderCallNow: true,
  noNetworkCallNow: true,
  noDbReadNow: true,
  noDbWriteNow: true,
  noRuntimeMountNow: true,
  noDeploymentNow: true,
  noPaymentNow: true,
  noPayoutNow: true,
  noProviderActivationNow: true,
  noSecretReadWriteNow: true,
  noStream252VNow: true,
  ownerApprovalRequiredForProviderTraining: true,
  ownerApprovalRequiredForDbPersistence: true,
  ownerApprovalRequiredForRuntimeLearningService: true,
  ownerApprovalRequiredForLiveStream: true,
} as const;
