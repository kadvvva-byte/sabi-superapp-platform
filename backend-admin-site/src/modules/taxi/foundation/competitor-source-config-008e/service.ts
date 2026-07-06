import { createHash } from 'crypto';
import {
  TAXI_COMPETITOR_SOURCE_CONFIG_008E_ENDPOINTS,
  TAXI_COMPETITOR_SOURCE_CONFIG_008E_ENV_NAMES,
  TAXI_COMPETITOR_SOURCE_CONFIG_008E_JSON_ENV,
  TAXI_COMPETITOR_SOURCE_CONFIG_008E_MAX_SOURCES,
  TAXI_COMPETITOR_SOURCE_CONFIG_008E_PROVIDERS,
  TAXI_COMPETITOR_SOURCE_CONFIG_008E_URL_ENV,
  TAXI_COMPETITOR_SOURCE_CONFIG_008E_URLS_ENV,
  TAXI_COMPETITOR_SOURCE_CONFIG_008E_VERSION,
} from './constants';
import type {
  TaxiCompetitorSource008E,
  TaxiCompetitorSourceConfigReadiness008E,
  TaxiCompetitorSourceConfigResult008E,
  TaxiCompetitorSourceProvider008E,
  TaxiCompetitorSourcePublic008E,
} from './types';

function str008E(value: unknown): string {
  return typeof value === 'string' ? value.trim() : value == null ? '' : String(value).trim();
}

function country008E(value: unknown): string {
  return str008E(value).toUpperCase().replace(/[^A-Z]/g, '').slice(0, 3) || 'UZ';
}

function providerList008E(value: unknown): readonly TaxiCompetitorSourceProvider008E[] {
  const rawItems = Array.isArray(value) ? value : str008E(value).split(/[,+|]/g);
  const providers = new Set<TaxiCompetitorSourceProvider008E>();
  rawItems.forEach((item: unknown) => {
    const raw = str008E(item).toLowerCase();
    if (raw.includes('yandex') || raw.includes('янд')) providers.add('yandex');
    if (raw.includes('uber')) providers.add('uber');
  });
  if (!providers.size) {
    TAXI_COMPETITOR_SOURCE_CONFIG_008E_PROVIDERS.forEach((provider) => providers.add(provider));
  }
  return Array.from(providers);
}

function safeUrl008E(value: unknown): URL | null {
  const raw = str008E(value);
  if (!/^https?:\/\//i.test(raw)) return null;
  try {
    const url = new URL(raw);
    if (!['http:', 'https:'].includes(url.protocol)) return null;
    return url;
  } catch (_error) {
    return null;
  }
}

function urlHash008E(rawUrl: string): string {
  return createHash('sha256').update(rawUrl).digest('hex').slice(0, 16);
}

function urlPreview008E(url: URL): string {
  const path = url.pathname && url.pathname !== '/' ? url.pathname : '/';
  return `${url.protocol}//${url.host}${path}`;
}

function rawRecord008E(value: unknown): Record<string, unknown> {
  return value && typeof value === 'object' && !Array.isArray(value) ? value as Record<string, unknown> : {};
}

function normalizeSource008E(input: unknown, fallbackCountryCode: string, configuredFromEnv: string, index: number): TaxiCompetitorSource008E | null {
  const record = rawRecord008E(input);
  const url = safeUrl008E(record.url ?? record.feedUrl ?? record.sourceUrl ?? record.href ?? input);
  if (!url) return null;
  const legalPublicSource = record.legalPublicSource ?? record.legalPublic ?? record.public ?? true;
  const privateApiScraping = record.privateApiScraping ?? record.privateApi ?? record.scrapingPrivateApi ?? false;
  if (legalPublicSource !== true || privateApiScraping === true) return null;
  const sourceCountry = country008E(record.countryCode ?? record.country ?? fallbackCountryCode);
  const providers = providerList008E(record.providers ?? record.provider ?? record.competitors ?? 'yandex,uber');
  const rawUrl = url.toString();
  return {
    sourceId: `${sourceCountry}:${providers.join('+')}:${urlHash008E(rawUrl)}:${index}`,
    countryCode: sourceCountry,
    providers,
    sourceName: str008E(record.sourceName ?? record.name ?? record.title) || `${providers.join('+')} public feed`,
    url: rawUrl,
    urlHost: url.host,
    urlPath: url.pathname || '/',
    urlHash: urlHash008E(rawUrl),
    configuredFromEnv,
    legalPublicSource: true,
    privateApiScraping: false,
    noPrivateApiScraping: true,
    tariffWriteAllowed: false,
    autoApplyAllowed: false,
    enabled: true,
  };
}

function parseJsonSources008E(raw: string, validationErrors: string[]): TaxiCompetitorSource008E[] {
  if (!raw.trim()) return [];
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch (error) {
    validationErrors.push(`${TAXI_COMPETITOR_SOURCE_CONFIG_008E_JSON_ENV}: ${error instanceof Error ? error.message : 'invalid_json'}`);
    return [];
  }

  const output: TaxiCompetitorSource008E[] = [];
  if (Array.isArray(parsed)) {
    parsed.forEach((entry: unknown, index: number) => {
      const source = normalizeSource008E(entry, 'ALL', TAXI_COMPETITOR_SOURCE_CONFIG_008E_JSON_ENV, index);
      if (source) output.push(source);
    });
    return output;
  }

  const root = rawRecord008E(parsed);
  Object.entries(root).forEach(([key, value], rootIndex) => {
    const fallbackCountry = country008E(key);
    const rows = Array.isArray(value) ? value : [value];
    rows.forEach((entry: unknown, entryIndex: number) => {
      const source = normalizeSource008E(entry, fallbackCountry, TAXI_COMPETITOR_SOURCE_CONFIG_008E_JSON_ENV, rootIndex * 100 + entryIndex);
      if (source) output.push(source);
    });
  });
  return output;
}

function parseUrlListSources008E(raw: string, envName: string, validationErrors: string[]): TaxiCompetitorSource008E[] {
  if (!raw.trim()) return [];
  return raw.split(',').map((item) => item.trim()).filter(Boolean).map((url, index) => {
    const source = normalizeSource008E({ url, countryCode: 'ALL', providers: ['yandex', 'uber'], sourceName: `${envName} public feed`, legalPublicSource: true, privateApiScraping: false }, 'ALL', envName, index);
    if (!source) validationErrors.push(`${envName}[${index}]: invalid_http_url_or_private_source`);
    return source;
  }).filter((source): source is TaxiCompetitorSource008E => Boolean(source));
}

function uniqueSources008E(sources: readonly TaxiCompetitorSource008E[]): TaxiCompetitorSource008E[] {
  const seen = new Set<string>();
  const output: TaxiCompetitorSource008E[] = [];
  sources.forEach((source) => {
    const key = `${source.countryCode}:${source.urlHash}:${source.providers.join('+')}`;
    if (seen.has(key)) return;
    seen.add(key);
    output.push(source);
  });
  return output.slice(0, TAXI_COMPETITOR_SOURCE_CONFIG_008E_MAX_SOURCES);
}

function allSources008E(validationErrors: string[]): TaxiCompetitorSource008E[] {
  return uniqueSources008E([
    ...parseJsonSources008E(str008E(process.env[TAXI_COMPETITOR_SOURCE_CONFIG_008E_JSON_ENV]), validationErrors),
    ...parseUrlListSources008E(str008E(process.env[TAXI_COMPETITOR_SOURCE_CONFIG_008E_URLS_ENV]), TAXI_COMPETITOR_SOURCE_CONFIG_008E_URLS_ENV, validationErrors),
    ...parseUrlListSources008E(str008E(process.env[TAXI_COMPETITOR_SOURCE_CONFIG_008E_URL_ENV]), TAXI_COMPETITOR_SOURCE_CONFIG_008E_URL_ENV, validationErrors),
  ]);
}

function publicSource008E(source: TaxiCompetitorSource008E): TaxiCompetitorSourcePublic008E {
  const url = safeUrl008E(source.url);
  const { url: _rawUrl, ...publicSource } = source;
  return {
    ...publicSource,
    urlPreview: url ? urlPreview008E(url) : source.urlHost,
  };
}

export function buildTaxiCompetitorSourceConfigReadiness008E(): TaxiCompetitorSourceConfigReadiness008E {
  return {
    version: TAXI_COMPETITOR_SOURCE_CONFIG_008E_VERSION,
    status: 'ready',
    endpoints: TAXI_COMPETITOR_SOURCE_CONFIG_008E_ENDPOINTS,
    acceptedEnvNames: TAXI_COMPETITOR_SOURCE_CONFIG_008E_ENV_NAMES,
    sourceConfigJsonEnv: TAXI_COMPETITOR_SOURCE_CONFIG_008E_JSON_ENV,
    sourceFeedUrlsEnv: TAXI_COMPETITOR_SOURCE_CONFIG_008E_URLS_ENV,
    countrySpecificSourcesSupported: true,
    yandexUberOnly: true,
    legalPublicSourcesOnly: true,
    noPrivateApiScraping: true,
    noFakePriceGeneration: true,
    recommendationOnly: true,
    tariffWriteAllowed: false,
    autoApplyAllowed: false,
    monitorUsesConfiguredSources: true,
  };
}

export function listTaxiSabiAiCompetitorSourceUrls008E(countryCode: string): string[] {
  const validationErrors: string[] = [];
  const country = country008E(countryCode);
  return allSources008E(validationErrors)
    .filter((source) => source.countryCode === country || source.countryCode === 'ALL')
    .map((source) => source.url);
}

export function buildTaxiCompetitorSourceConfig008E(input: { countryCode?: unknown }): TaxiCompetitorSourceConfigResult008E {
  const validationErrors: string[] = [];
  const countryCode = country008E(input.countryCode || 'UZ');
  const matchingSources = allSources008E(validationErrors).filter((source) => source.countryCode === countryCode || source.countryCode === 'ALL');
  const publicSources = matchingSources.map(publicSource008E);
  const sourceConfigured = publicSources.length > 0;
  return {
    ok: sourceConfigured,
    version: TAXI_COMPETITOR_SOURCE_CONFIG_008E_VERSION,
    code: sourceConfigured ? 'taxi_competitor_source_config_008e_configured' : 'taxi_competitor_source_config_008e_sources_not_configured',
    message: sourceConfigured
      ? 'Legal/public competitor price sources are configured for Sabi AI recommendation-only monitoring.'
      : 'No legal/public competitor price sources are configured. Sabi AI will not generate fake Yandex/Uber prices.',
    countryCode,
    sourceConfigured,
    sourceCount: publicSources.length,
    sources: publicSources,
    acceptedEnvNames: TAXI_COMPETITOR_SOURCE_CONFIG_008E_ENV_NAMES,
    requiredProviders: TAXI_COMPETITOR_SOURCE_CONFIG_008E_PROVIDERS,
    validationErrors,
    legalPublicSourcesOnly: true,
    noPrivateApiScraping: true,
    noFakePriceGeneration: true,
    recommendationOnly: true,
    tariffWriteAllowed: false,
    autoApplyAllowed: false,
    dbWriteExecuted: false,
    providerDispatch: false,
    walletMutation: false,
  };
}
