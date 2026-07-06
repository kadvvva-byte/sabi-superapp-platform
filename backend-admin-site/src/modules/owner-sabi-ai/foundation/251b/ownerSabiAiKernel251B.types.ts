export type SabiOwnerLanguage251B = 'ru' | 'en' | 'zh' | 'uz';

export interface SabiOwnerSabiAiPolicy251B {
  version: string;
  code: string;
  status: string;
  identity: Record<string, unknown>;
  coreAuthority: Record<string, boolean>;
  personality: Record<string, unknown>;
  monitoringDuties: Record<string, boolean>;
  accessModel: Record<string, unknown>;
  serviceAccessRule: Record<string, boolean>;
  publicSiteRules: Record<string, unknown>;
  releaseLocks: Record<string, boolean>;
}

export interface SabiOwnerSabiAiTrainingKernel251B {
  version: string;
  code: string;
  goals: string[];
  responseRules: string[];
  dailyReportTemplate: Record<string, unknown>;
  moduleControlTemplate: Record<string, unknown>;
}

export interface SabiOwnerSabiAiLanguageKernel251B {
  version: string;
  code: string;
  languages: Record<SabiOwnerLanguage251B, Record<string, string>>;
  purityRules: Record<string, boolean>;
}

export interface SabiOwnerSabiAiEvidencePolicy251B {
  version: string;
  code: string;
  principles: string[];
  evidenceTypes: string[];
  prohibitedAutonomousActions: string[];
}
