const languageKeys235F = [
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

const writeRuEverywhere235F = () => {
  try {
    for (const storage of [window.localStorage, window.sessionStorage]) {
      for (const key of languageKeys235F) storage.setItem(key, 'ru');
    }

    document.documentElement.lang = 'ru';
    document.documentElement.setAttribute('data-sabi-admin-language', 'ru');
    document.documentElement.setAttribute('data-sabi-admin-ru-only-freeze', '235F');
  } catch (error) {
    console.warn('[Admin UI 235F] RU-only freeze storage failed', error);
  }
};

const detectLanguageClick235F = (target: HTMLElement | null): string | null => {
  if (!target) return null;

  const button = target.closest('button, [role="button"], [data-lang], [data-language], [aria-label]');
  const raw = [
    target.textContent,
    target.getAttribute('data-lang'),
    target.getAttribute('data-language'),
    target.getAttribute('aria-label'),
    button?.textContent,
    button?.getAttribute('data-lang'),
    button?.getAttribute('data-language'),
    button?.getAttribute('aria-label'),
  ].filter(Boolean).join(' ').trim().toLowerCase();

  if (!raw) return null;
  if (/\bru\b|рус/.test(raw)) return 'ru';
  if (/\ben\b|english|англ/.test(raw)) return 'en';
  if (/\buz\b|uzbek|o‘zbek|ўзбек/.test(raw)) return 'uz';
  if (/中|中文|\bzh\b|chinese|китай/.test(raw)) return 'zh';

  return null;
};

try {
  writeRuEverywhere235F();

  const originalSetItem235F = Storage.prototype.setItem;

  if (!(window as any).__sabiAdminRuOnlyFreeze235FInstalled) {
    (window as any).__sabiAdminRuOnlyFreeze235FInstalled = true;

    Storage.prototype.setItem = function setItem235F(key: string, value: string) {
      if (/(lang|language|locale|i18n|lng)/i.test(key)) {
        return originalSetItem235F.call(this, key, 'ru');
      }

      return originalSetItem235F.call(this, key, value);
    };

    document.addEventListener('click', (event) => {
      const lang = detectLanguageClick235F(event.target as HTMLElement | null);

      if (!lang) return;

      if (lang !== 'ru') {
        event.preventDefault();
        event.stopImmediatePropagation();
        writeRuEverywhere235F();

        console.warn('[Admin UI 235F] language switch blocked until Google AI translation layer is connected', {
          requested: lang,
          active: 'ru',
        });
      }
    }, true);

    window.addEventListener('sabi-admin-language-changed-235c', (event: Event) => {
      const next = String((event as CustomEvent).detail?.next || '').toLowerCase();
      if (next && next !== 'ru') writeRuEverywhere235F();
    }, true);

    window.addEventListener('sabi-admin-force-language-235e', (event: Event) => {
      const next = String((event as CustomEvent).detail?.lang || '').toLowerCase();
      if (next && next !== 'ru') writeRuEverywhere235F();
    }, true);
  }

  (window as any).sabiAdminLanguageStatus235F = () => ({
    mode: 'ru_only_freeze_until_google_ai_translation_layer',
    active: 'ru',
    reason: 'manual multilingual strings caused runtime language mixing',
    mondayPlan: 'connect Google Cloud AI translation backend with glossary and cache',
  });
} catch (error) {
  console.error('[Admin UI 235F] RU-only freeze failed', error);
}

export {};
