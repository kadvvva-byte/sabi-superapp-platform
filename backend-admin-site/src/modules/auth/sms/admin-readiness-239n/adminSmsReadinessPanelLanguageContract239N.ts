export const adminSmsReadinessPanelLanguageContract239N = {
  stage: '239N_admin_sms_readiness_panel_language_contract_only',
  marker: 'adminSmsReadinessPanelLanguageContract239N',
  disabledState: 'disabled_by_default',
  languagesRequiredLater: ['RU', 'EN', 'ZH', 'UZ'],
  visibleLabelsPlanned: [
    'SMS readiness',
    'Provider validation',
    'Firebase exact values',
    'Route mount',
    'Admin mount',
    'Live auth',
    'Masked audit',
    'Owner approval required',
  ],
  noExternalMessengerAlias: true,
  useSabiMessenger: true,
  noDonationsOrInvestmentsAsk: true,
  ownerFinalAuthority: true,
  sabiAiReportOnly: true,
  aiSelfRepairCandidateOnly: true,
} as const;

export const sabiMessengerOnly239NFix1 = {
  noExternalMessengerAlias: true,
  useSabiMessenger: true,
  title: 'SMS readiness',
  ownerApprovalRequired: true,
} as const;

export const sabiMessengerOnly239NFix2 = {
  noExternalMessengerAlias: true,
  useSabiMessenger: true,
  title: 'SMS readiness',
  ownerApprovalRequired: true,
} as const;
