import type { AppLanguageCode } from "../../../shared/data/languages";

export type ReleaseChannel = "development" | "staging" | "production";

export type MobileBootstrapRuntimeConfig = {
  appName: string;
  environment: string;
  version: string;
  buildNumber: string;
  releaseChannel: ReleaseChannel;
  defaultLanguage: AppLanguageCode;
  defaultCountryIso2: string;
};

export type HealthCheckResult = {
  name: string;
  status: "pass" | "warn" | "fail";
  critical: boolean;
  checkedAt: string;
  details?: Record<string, unknown>;
};
