type SabiAdminLanguage235A = 'ru' | 'en';

const languageStorageKeys235E = [
  'sabi-admin-current-language-235e',
  'sabi-admin-language',
  'sabi-admin-ui-language',
  'adminLanguage',
  'admin-language',
  'admin-ui-language',
  'language',
  'locale',
  'i18nextLng',
  'lng',
  'taxiAdminLanguage',
  'messengerAdminLanguage',
  'TaxiStreamAdminLanguage006S',
];

const normalizeLanguage235A = (value: string | null): SabiAdminLanguage235A => {
  if (!value) return 'ru';
  const clean = String(value).trim().toLowerCase();

  if (clean === 'ru' || clean === 'russian' || clean === 'СЂСѓСЃСЃРєРёР№') return 'ru';
  if (clean === 'en' || clean === 'eng' || clean === 'english') return 'ru';
  if (clean === 'zh' || clean === 'cn' || clean === 'zho' || clean === 'chinese' || clean === 'zh-cn' || clean === 'zh_hans' || clean === 'дё­ж–‡' || clean === 'дё­') return 'ru';
  if (clean === 'uz' || clean === 'uz-uz' || clean === 'uzb' || clean === 'uzbek' || clean === 'uz-latn' || clean === 'oвЂzbek') return 'ru';

  return 'ru';
};

const getForcedLanguage235E = (): SabiAdminLanguage235A => {
  try {
    const priority = window.localStorage.getItem('sabi-admin-current-language-235e');
    if (priority) return normalizeLanguage235A(priority);

    for (const key of languageStorageKeys235E) {
      const value = window.localStorage.getItem(key) || window.sessionStorage.getItem(key);
      if (value) return normalizeLanguage235A(value);
    }
  } catch {
    // ignore
  }

  return normalizeLanguage235A(document.documentElement.lang);
};

const writeLanguageEverywhere235E = (lang: SabiAdminLanguage235A) => {
  try {
    for (const storage of [window.localStorage, window.sessionStorage]) {
      for (const key of languageStorageKeys235E) {
        storage.setItem(key, lang);
      }
    }

    document.documentElement.lang = lang;
    document.documentElement.setAttribute('data-sabi-admin-language', lang);

    window.dispatchEvent(new CustomEvent('sabi-admin-language-changed-235c', {
      detail: {
        key: 'sabi-admin-current-language-235e',
        previous: null,
        next: lang,
      },
    }));

    window.dispatchEvent(new CustomEvent('sabi-admin-force-language-235e', {
      detail: { lang },
    }));

    console.info('[Admin UI 235E-FIX1] forced language keys updated', {
      lang,
      path: window.location.pathname,
      keys: languageStorageKeys235E,
    });
  } catch (error) {
    console.warn('[Admin UI 235E-FIX1] failed to force language keys', error);
  }
};

const detectButtonLanguage235E = (target: HTMLElement | null): SabiAdminLanguage235A | null => {
  if (!target) return null;

  const scope = target.closest('button, [role="button"], [data-lang], [data-language], [aria-label]');
  const raw = [
    target.textContent,
    target.getAttribute('data-lang'),
    target.getAttribute('data-language'),
    target.getAttribute('aria-label'),
    scope?.textContent,
    scope?.getAttribute('data-lang'),
    scope?.getAttribute('data-language'),
    scope?.getAttribute('aria-label'),
  ].filter(Boolean).join(' ').trim();

  if (!raw) return null;

  const clean = raw.toLowerCase();

  if (/\bru\b|СЂСѓСЃ/.test(clean)) return 'ru';
  if (/\ben\b|english|Р°РЅРіР»/.test(clean)) return 'ru';
  if (/\buz\b|uzbek|oвЂzbek|СћР·Р±РµРє/.test(clean)) return 'ru';
  if (/дё­|дё­ж–‡|\bzh\b|chinese|РєРёС‚Р°Р№/.test(clean)) return 'ru';

  return null;
};

try {
  writeLanguageEverywhere235E(getForcedLanguage235E());

  document.addEventListener('click', (event) => {
    const lang = detectButtonLanguage235E(event.target as HTMLElement | null);
    if (lang) writeLanguageEverywhere235E(lang);
  }, true);

  window.addEventListener('keydown', (event) => {
    if (!event.altKey || !event.shiftKey) return;

    const key = event.key.toLowerCase();
    if (key === 'r') writeLanguageEverywhere235E('ru');
    if (key === 'e') writeLanguageEverywhere235E('ru');
    if (key === 'u') writeLanguageEverywhere235E('ru');
    if (key === 'z' || key === 'c') writeLanguageEverywhere235E('ru');
  });

  (window as any).sabiAdminSetLanguage235E = writeLanguageEverywhere235E;
  (window as any).sabiAdminGetLanguage235E = getForcedLanguage235E;
} catch (error) {
  console.error('[Admin UI 235E-FIX1] language key force failed', error);
}

export {};
