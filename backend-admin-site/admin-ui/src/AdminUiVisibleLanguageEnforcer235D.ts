type AdminLang235D = 'ru' | 'en' | 'uz' | 'zh';

type Translation235D = { keys: string[]; ru: string; en?: string; uz?: string; zh?: string; [key: string]: string | string[] | undefined; };

const translations235D: Translation235D[] = [
  {
    keys: ['Центр управления курьерами', 'Центр управления Мессенджером', 'Messenger boshqaruv markazi', '信息控制中心'],
    ru: 'Центр управления Мессенджером',
    en: 'Messenger Control Center',
  },
  {
    keys: ['Контроль готовности Sabi Messenger: чаты, реального времени, звонки, медиа, группы, каналы, боты, AI-перевод и блокировщики запуска.', 'Sabi Messenger tayyorgarligi: chatlar, real vaqt, qo‘ng‘iroqlar, media, guruhlar, kanallar, botlar, sunʼiy intellekt tarjima va ishga tushirish bloklari.', '实时信使就绪控制：聊天、实时状态、通话、媒体、群组、频道、机器人、人工智能翻译和上线阻塞内容。'],
    ru: 'Контроль готовности Sabi Messenger: чаты, реальное время, звонки, медиа, группы, каналы, боты, ИИ-перевод и блокировки запуска.',
    en: 'Sabi Messenger readiness: chats, realtime, calls, media, groups, channels, bots, AI translation, and launch blockers.',
  },
  {
    keys: ['Сбой рабочего контура Мессенджера'],
    ru: 'Сбой рабочего контура Мессенджера',
    en: 'Messenger runtime circuit issue',
  },
  {
    keys: ['Администратор не смог получить снимок от серверной части. Проверь, что серверная часть запущена, доступна на правильном порту и не падает из-за ошибок базы данных или рабочего контура.'],
    ru: 'Администратор не смог получить снимок от серверной части. Проверьте, что сервер запущен, доступен на правильном порту и не падает из-за ошибок базы данных или рабочего контура.',
    en: 'The admin panel could not receive a server snapshot. Check that the server is running, reachable on the correct port, and not failing because of database or runtime errors.',
  },
  {
    keys: ['Связан'],
    ru: 'Связан',
    en: 'Connected',
  },
  {
    keys: ['Перезарядка Messenger', 'Перезагрузка Messenger', 'Мессенджер яңилаш'],
    ru: 'Перезапустить Мессенджер',
    en: 'Restart Messenger',
  },
  {
    keys: ['Запустить диагностику', 'Diagnostikani ishga tushirish', '运行诊断'],
    ru: 'Запустить диагностику',
    en: 'Run diagnostics',
  },
  {
    keys: ['Готовность', 'Tayyorlik', '就绪状态'],
    ru: 'Готовность',
    en: 'Readiness',
  },
  {
    keys: ['Заблокировано', 'bloklangan', '已阻塞'],
    ru: 'Заблокировано',
    en: 'Blocked',
  },
  {
    keys: ['Блокирующие', 'Bloklar', '阻塞内容'],
    ru: 'Блокирующие',
    en: 'Blockers',
  },
  {
    keys: ['Предупреждения', 'Ogohlantirishlar', '警告'],
    ru: 'Предупреждения',
    en: 'Warnings',
  },
  {
    keys: ['Проверки', 'Tekshiruvlar', '检查内容'],
    ru: 'Проверки',
    en: 'Checks',
  },
  {
    keys: ['Обзор', 'Sharh', '概览'],
    ru: 'Обзор',
    en: 'Overview',
  },
  {
    keys: ['Готовность, секции и флаги функций', 'Tayyorlik, bo‘limlar va bayroqlar', '功能、部分和状态概览'],
    ru: 'Готовность, секции и флаги функций',
    en: 'Readiness, sections, and feature flags',
  },
  {
    keys: ['Рост / повышению / приложения', 'O‘sish / targ‘ib / qo‘shimcha', '增长 / 推广 / 权限'],
    ru: 'Рост / продвижение / приложения',
    en: 'Growth / promotion / apps',
  },
  {
    keys: ['Аналитика роста', '增长、留存和转化'],
    ru: 'Аналитика роста',
    en: 'Growth analytics',
  },
  {
    keys: ['Качество контента / антиспам', '内容质量与反垃圾控制'],
    ru: 'Качество контента / антиспам',
    en: 'Content quality / anti-spam',
  },
  {
    keys: ['Отображение / видимость', 'Ko‘rinish / visibility'],
    ru: 'Отображение / видимость',
    en: 'Display / visibility',
  },
  {
    keys: ['Онлайн / присутствие', 'Онлайн, последний раз и здоровые временные штампы', '在线与临场状态'],
    ru: 'Онлайн / присутствие',
    en: 'Online / presence',
  },
  {
    keys: ['Уведомления / пропущенные', 'Уведомления, непрочитанные звонки и очередь в реальном времени'],
    ru: 'Уведомления / пропущенные',
    en: 'Notifications / missed items',
  },
  {
    keys: ['Канальная готовность менеджера', 'Менеджер перед переходом к другим модулям'],
    ru: 'Канальная готовность Мессенджера',
    en: 'Messenger channel readiness',
  },
  {
    keys: ['Проверка текста интерфейса', 'Убирает мусорный текст, остатки английского и файловые тексты'],
    ru: 'Проверка текста интерфейса',
    en: 'Interface text check',
  },
  {
    keys: ['Повторная проверка', 'Регрессия после исправлений'],
    ru: 'Повторная проверка',
    en: 'Repeat check',
  },
  {
    keys: ['Передача владельцу', 'Финальная передача и контроль владельца'],
    ru: 'Передача владельцу',
    en: 'Owner handoff',
  },
  {
    keys: ['Доступы и чистый текст'],
    ru: 'Доступы и чистый текст',
    en: 'Access and clean text',
  },
  {
    keys: ['Переход к проверке'],
    ru: 'Переход к проверке',
    en: 'Move to verification',
  },
  {
    keys: ['Каналы на освобождение'],
    ru: 'Каналы на освобождение',
    en: 'Release channels',
  },
  {
    keys: ['Группы, каналы и боты'],
    ru: 'Группы, каналы и боты',
    en: 'Groups, channels, and bots',
  },
  {
    keys: ['Панель'],
    ru: 'Панель',
    en: 'Dashboard',
  },
  {
    keys: ['Запросы'],
    ru: 'Запросы',
    en: 'Requests',
  },
  {
    keys: ['Такси'],
    ru: 'Такси',
    en: 'Taxi',
  },
  {
    keys: ['Контроль'],
    ru: 'Контроль',
    en: 'Control',
  },
  {
    keys: ['Taxi Finance', 'Финансы такси'],
    ru: 'Финансы такси',
    en: 'Taxi Finance',
  },
  {
    keys: ['Отдельный модуль'],
    ru: 'Отдельный модуль',
    en: 'Separate module',
  },
  {
    keys: ['Поток', 'Стрим'],
    ru: 'Стрим',
    en: 'Stream',
  },
  {
    keys: ['Живой контур'],
    ru: 'Живой контур',
    en: 'Live circuit',
  },
  {
    keys: ['Цифровые товары'],
    ru: 'Цифровые товары',
    en: 'Digital goods',
  },
  {
    keys: ['Финансовые ворота'],
    ru: 'Финансовые ворота',
    en: 'Finance gateway',
  },
  {
    keys: ['Мессенджер', 'Messenger'],
    ru: 'Мессенджер',
    en: 'Messenger',
  },
  {
    keys: ['Хамён', 'Кошелёк'],
    ru: 'Кошелёк',
    en: 'Wallet',
  },
  {
    keys: ['Провайдеры'],
    ru: 'Провайдеры',
    en: 'Providers',
  },
  {
    keys: ['Пользователи'],
    ru: 'Пользователи',
    en: 'Users',
  },
  {
    keys: ['Риски'],
    ru: 'Риски',
    en: 'Risks',
  },
  {
    keys: ['Аудит'],
    ru: 'Аудит',
    en: 'Audit',
  },
  {
    keys: ['Роли'],
    ru: 'Роли',
    en: 'Roles',
  },
  {
    keys: ['Заказы'],
    ru: 'Заказы',
    en: 'Orders',
  },
  {
    keys: ['Водители'],
    ru: 'Водители',
    en: 'Drivers',
  },
  {
    keys: ['Поездки'],
    ru: 'Поездки',
    en: 'Trips',
  },
  {
    keys: ['Жалобы'],
    ru: 'Жалобы',
    en: 'Complaints',
  },
  {
    keys: ['Тарифы'],
    ru: 'Тарифы',
    en: 'Tariffs',
  },
  {
    keys: ['Баланс'],
    ru: 'Баланс',
    en: 'Balance',
  },
  {
    keys: ['Агенты'],
    ru: 'Агенты',
    en: 'Agents',
  },
  {
    keys: ['Заявки'],
    ru: 'Заявки',
    en: 'Applications',
  },
  {
    keys: ['Документы'],
    ru: 'Документы',
    en: 'Documents',
  },
  {
    keys: ['Статус'],
    ru: 'Статус',
    en: 'Status',
  },
  {
    keys: ['Одобрить'],
    ru: 'Одобрить',
    en: 'Approve',
  },
  {
    keys: ['Отклонить'],
    ru: 'Отклонить',
    en: 'Reject',
  },
];

const originalText235D = new WeakMap<Text, string>();
let currentLang235D: AdminLang235D = 'ru';
let scheduled235D = false;

const normalizeLang235D = (value: string | null | undefined): AdminLang235D | null => {
  if (!value) return null;
  const clean = String(value).trim().toLowerCase();

  if (clean === 'ru' || clean === 'russian') return 'ru';
  if (clean === 'en' || clean === 'eng' || clean === 'english') return 'ru';
  if (clean === 'uz' || clean === 'uz-uz' || clean === 'uzb' || clean === 'uzbek' || clean === 'uz-latn') return 'ru';
  if (clean === 'zh' || clean === 'cn' || clean === 'zho' || clean === 'chinese' || clean === '中' || clean === '中文') return 'ru';

  return null;
};

const getStoredLang235D = (): AdminLang235D => {
  const keys = [
    'sabi-admin-language',
    'sabi-admin-ui-language',
    'adminLanguage',
    'admin-language',
    'admin-ui-language',
    'language',
    'locale',
    'i18nextLng',
    'taxiAdminLanguage',
    'messengerAdminLanguage',
  ];

  for (const storage of [window.localStorage, window.sessionStorage]) {
    for (const key of keys) {
      const found = normalizeLang235D(storage.getItem(key));
      if (found) return found;
    }
  }

  return normalizeLang235D(document.documentElement.lang) || currentLang235D || 'ru';
};

const setLang235D = (lang: AdminLang235D) => {
  currentLang235D = lang;
  document.documentElement.lang = lang;

  try {
    window.localStorage.setItem('sabi-admin-language', 'ru');
    window.localStorage.setItem('admin-ui-language', 'ru');
  } catch {
    // ignore storage errors
  }

  scheduleApply235D();
};

const targetText235D = (entry: Translation235D, lang: AdminLang235D) => entry[lang];

const translateText235D = (input: string, lang: AdminLang235D): string => {
  if (!input || !input.trim()) return input;

  const leading = input.match(/^\s*/)?.[0] || '';
  const trailing = input.match(/\s*$/)?.[0] || '';
  const core = input.trim().replace(/\s+/g, ' ');

  for (const entry of translations235D) {
    if (entry.keys.some((key) => core === key || core === key.trim().replace(/\s+/g, ' '))) {
      return leading + targetText235D(entry, lang) + trailing;
    }
  }

  let output = core;
  const sorted = [...translations235D].sort((a, b) => Math.max(...b.keys.map((key) => key.length)) - Math.max(...a.keys.map((key) => key.length)));

  for (const entry of sorted) {
    for (const key of entry.keys) {
      if (key.length < 4) continue;
      if (output.includes(key)) {
        output = output.split(key).join(targetText235D(entry, lang));
      }
    }
  }

  return leading + output + trailing;
};

const shouldSkip235D = (node: Node): boolean => {
  const parent = node.parentElement;
  if (!parent) return true;

  const tag = parent.tagName.toLowerCase();
  if (['script', 'style', 'noscript', 'textarea', 'input', 'code', 'pre'].includes(tag)) return true;
  if (parent.closest('[data-sabi-i18n-skip="true"]')) return true;

  return false;
};

const applyLanguage235D = () => {
  currentLang235D = getStoredLang235D();

  if (!document.body) return;

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];

  while (walker.nextNode()) {
    const node = walker.currentNode as Text;
    if (!shouldSkip235D(node)) nodes.push(node);
  }

  for (const node of nodes) {
    const original = originalText235D.get(node) || node.nodeValue || '';
    if (!originalText235D.has(node)) originalText235D.set(node, original);

    const translated = translateText235D(original, currentLang235D);
    if (node.nodeValue !== translated) node.nodeValue = translated;
  }
};

function scheduleApply235D() {
  if (scheduled235D) return;
  scheduled235D = true;

  window.requestAnimationFrame(() => {
    scheduled235D = false;
    applyLanguage235D();
  });
}

const install235D = () => {
  const marker = '__sabiAdminUiVisibleLanguageEnforcer235D';
  if ((window as any)[marker]) return;
  (window as any)[marker] = true;

  currentLang235D = getStoredLang235D();
  document.documentElement.lang = currentLang235D;

  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement | null;
    const text = target?.textContent?.trim();

    if (!text) return;

    if (text === 'RU') setLang235D('ru');
    if (text === 'EN') setLang235D('ru');
    if (text === 'UZ') setLang235D('ru');
    if (text === '中' || text === '中文' || text === 'ZH') setLang235D('ru');
  }, true);

  window.addEventListener('storage', () => {
    currentLang235D = getStoredLang235D();
    scheduleApply235D();
  });

  window.addEventListener('sabi-admin-language-changed-235c', ((event: Event) => {
    const next = normalizeLang235D((event as CustomEvent).detail?.next);
    if (next) {
      currentLang235D = next;
      document.documentElement.lang = next;
      scheduleApply235D();
    }
  }) as EventListener);

  const observer = new MutationObserver(() => scheduleApply235D());
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
    characterData: true,
  });

  window.setInterval(() => scheduleApply235D(), 750);
  scheduleApply235D();

  (window as any).sabiAdminApplyLanguage235D = setLang235D;
};

try {
  install235D();
} catch (error) {
  console.error('[Admin UI 235D] visible language enforcer failed', error);
}

export {};
