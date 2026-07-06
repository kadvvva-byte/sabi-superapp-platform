export type AdminHardLocale253A = 'ru' | 'en';

export type AdminLanguagePolicy253A = Readonly<{
  version: string;
  hardAdminLocalesAllowed: readonly AdminHardLocale253A[];
  fixedUzbekAdminUiDisabled: true;
  fixedChineseAdminUiDisabled: true;
  otherLanguagesViaSabiAiOnDemandOnly: true;
  noHardcodedFourLanguageAdminScreens: true;
  noMixedLanguageGarbage: true;
  russianMustBeClean: true;
  englishMustBeClean: true;
}>;

export type SabiAiAdminOnDemandTranslation253A = Readonly<{
  translateFullVisibleAdminScreen: true;
  sourceScreenLanguage: 'ru_or_en';
  targetLanguage: 'any_requested_language_future';
  doNotStoreTranslationAsFixedLocaleNow: true;
  doNotCreateUzZhHardScreens: true;
  providerCallNow: false;
  networkCallNow: false;
  dbReadNow: false;
  dbWriteNow: false;
  runtimeMountNow: false;
}>;
