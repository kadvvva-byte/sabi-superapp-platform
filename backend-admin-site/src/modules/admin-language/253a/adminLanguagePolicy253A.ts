import type {
  AdminHardLocale253A,
  AdminLanguagePolicy253A,
  SabiAiAdminOnDemandTranslation253A,
} from './adminLanguagePolicy253A.types';

export const adminHardLocales253A: readonly AdminHardLocale253A[] = ['ru', 'en'] as const;

export const adminLanguagePolicy253A: AdminLanguagePolicy253A = {
  version: 'ADMIN-LANGUAGE-253A-RU-EN-ONLY-SABI-AI-ON-DEMAND-TRANSLATION-POLICY',
  hardAdminLocalesAllowed: adminHardLocales253A,
  fixedUzbekAdminUiDisabled: true,
  fixedChineseAdminUiDisabled: true,
  otherLanguagesViaSabiAiOnDemandOnly: true,
  noHardcodedFourLanguageAdminScreens: true,
  noMixedLanguageGarbage: true,
  russianMustBeClean: true,
  englishMustBeClean: true,
} as const;

export const sabiAiAdminOnDemandTranslation253A: SabiAiAdminOnDemandTranslation253A = {
  translateFullVisibleAdminScreen: true,
  sourceScreenLanguage: 'ru_or_en',
  targetLanguage: 'any_requested_language_future',
  doNotStoreTranslationAsFixedLocaleNow: true,
  doNotCreateUzZhHardScreens: true,
  providerCallNow: false,
  networkCallNow: false,
  dbReadNow: false,
  dbWriteNow: false,
  runtimeMountNow: false,
} as const;
