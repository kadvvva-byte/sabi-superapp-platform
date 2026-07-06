import type { TAXI_COMPETITOR_SOURCE_CONFIG_008E_PROVIDERS } from './constants';

export type TaxiCompetitorSourceProvider008E = typeof TAXI_COMPETITOR_SOURCE_CONFIG_008E_PROVIDERS[number];

export type TaxiCompetitorSource008E = Readonly<{
  sourceId: string;
  countryCode: string;
  providers: readonly TaxiCompetitorSourceProvider008E[];
  sourceName: string;
  url: string;
  urlHost: string;
  urlPath: string;
  urlHash: string;
  configuredFromEnv: string;
  legalPublicSource: true;
  privateApiScraping: false;
  noPrivateApiScraping: true;
  tariffWriteAllowed: false;
  autoApplyAllowed: false;
  enabled: true;
}>;

export type TaxiCompetitorSourcePublic008E = Omit<TaxiCompetitorSource008E, 'url'> & Readonly<{
  urlPreview: string;
}>;

export type TaxiCompetitorSourceConfigReadiness008E = Readonly<{
  version: string;
  status: 'ready';
  endpoints: readonly string[];
  acceptedEnvNames: readonly string[];
  sourceConfigJsonEnv: string;
  sourceFeedUrlsEnv: string;
  countrySpecificSourcesSupported: true;
  yandexUberOnly: true;
  legalPublicSourcesOnly: true;
  noPrivateApiScraping: true;
  noFakePriceGeneration: true;
  recommendationOnly: true;
  tariffWriteAllowed: false;
  autoApplyAllowed: false;
  monitorUsesConfiguredSources: true;
}>;

export type TaxiCompetitorSourceConfigResult008E = Readonly<{
  ok: boolean;
  version: string;
  code: string;
  message: string;
  countryCode: string;
  sourceConfigured: boolean;
  sourceCount: number;
  sources: readonly TaxiCompetitorSourcePublic008E[];
  acceptedEnvNames: readonly string[];
  requiredProviders: readonly TaxiCompetitorSourceProvider008E[];
  validationErrors: readonly string[];
  legalPublicSourcesOnly: true;
  noPrivateApiScraping: true;
  noFakePriceGeneration: true;
  recommendationOnly: true;
  tariffWriteAllowed: false;
  autoApplyAllowed: false;
  dbWriteExecuted: false;
  providerDispatch: false;
  walletMutation: false;
}>;
