export const TAXI_COUNTRY_TARIFFS_008A_VERSION = 'TAXI-COUNTRY-TARIFFS-008A';
export const TAXI_SABI_AI_PRICE_MONITOR_008B_VERSION = 'TAXI-SABI-AI-PRICE-MONITOR-008B';

export const TAXI_COUNTRY_TARIFFS_008A_APPROVAL_HEADER = 'x-sabi-taxi-tariffs-008a-execution-approval';
export const TAXI_COUNTRY_TARIFFS_008A_APPROVAL_VALUE = 'i-approve-taxi-tariffs-008a-country-tariff-write';
export const TAXI_COUNTRY_TARIFFS_008A_IDEMPOTENCY_HEADER = 'x-sabi-idempotency-key';

export const TAXI_COUNTRY_TARIFFS_008A_CITY_ID = '__country__';
export const TAXI_COUNTRY_TARIFFS_008A_ZONE_ID = '__all__';
export const TAXI_COUNTRY_TARIFFS_008A_PEAK_PICKUP_INCREASE_PERCENT = 100;
export const TAXI_COUNTRY_TARIFFS_008A_PEAK_PICKUP_MULTIPLIER = 2;

export const TAXI_SABI_AI_COMPETITOR_PRICE_FEED_URLS_ENV_008B = 'SABI_TAXI_COMPETITOR_PRICE_FEED_URLS';
export const TAXI_SABI_AI_COMPETITOR_PRICE_FEED_URL_ENV_008B = 'SABI_TAXI_COMPETITOR_PRICE_FEED_URL';
export const TAXI_SABI_AI_COMPETITOR_DISCOUNT_MIN_PERCENT_008B = 1;
export const TAXI_SABI_AI_COMPETITOR_DISCOUNT_MAX_PERCENT_008B = 2;
export const TAXI_SABI_AI_COMPETITOR_DISCOUNT_DEFAULT_PERCENT_008B = 1.5;
export const TAXI_SABI_AI_COMPETITOR_PROVIDERS_008B = ['yandex', 'uber'] as const;

export const TAXI_COUNTRY_TARIFF_CLASSES_008A = ['standard', 'comfort', 'business', 'delivery', 'intercity'] as const;

export const TAXI_COUNTRY_TARIFF_DEFAULT_COUNTRIES_008A = [
  { countryCode: 'UZ', countryName: 'Uzbekistan', currencyCode: 'UZS', localeLabel: 'Узбекистан' },
  { countryCode: 'KZ', countryName: 'Kazakhstan', currencyCode: 'KZT', localeLabel: 'Казахстан' },
  { countryCode: 'KG', countryName: 'Kyrgyzstan', currencyCode: 'KGS', localeLabel: 'Кыргызстан' },
  { countryCode: 'TJ', countryName: 'Tajikistan', currencyCode: 'TJS', localeLabel: 'Таджикистан' },
  { countryCode: 'RU', countryName: 'Russia', currencyCode: 'RUB', localeLabel: 'Россия' },
  { countryCode: 'AZ', countryName: 'Azerbaijan', currencyCode: 'AZN', localeLabel: 'Азербайджан' },
  { countryCode: 'TR', countryName: 'Türkiye', currencyCode: 'TRY', localeLabel: 'Турция' },
  { countryCode: 'AE', countryName: 'United Arab Emirates', currencyCode: 'AED', localeLabel: 'ОАЭ' },
] as const;

export const TAXI_COUNTRY_TARIFFS_008A_ENDPOINTS = [
  'GET /api/admin/taxi/tariffs/008a/readiness',
  'GET /api/admin/taxi/tariffs/008a/country-tariffs',
  'POST /api/admin/taxi/tariffs/008a/country-tariffs',
  'GET /api/admin/taxi/tariffs/008b/sabi-ai-price-monitor',
] as const;
