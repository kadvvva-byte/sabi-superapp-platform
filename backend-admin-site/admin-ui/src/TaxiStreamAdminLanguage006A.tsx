import type { AdminLanguage } from "./admin-i18n";

type CopyBlock = {
  title: string;
  subtitle: string;
  taxiTitle: string;
  taxiText: string;
  streamTitle: string;
  streamText: string;
  safetyTitle: string;
  safetyText: string;
  languageTitle: string;
  languageText: string;
};

const COPY: Record<AdminLanguage, CopyBlock> = {
  ru: {
    title: "Такси и стрим: чистые языки интерфейса администратора",
    subtitle: "Русский, English, 中文 и O‘zbekcha тексты приведены к нормальному виду. Убраны случайные символы, грубые слова, смешанные подписи и непонятные статусы.",
    taxiTitle: "Такси",
    taxiText: "Панели Taxi показывают готовность backend/API, Admin cockpit, route catalog, provider boundary и payment/Wallet locks понятным языком. Production activation остаётся заблокированной до отдельного точного разрешения владельца.",
    streamTitle: "Stream",
    streamText: "Панели стрима показывают комнаты, модерацию, жизненный цикл, реальное время, контроль записи и безопасную границу провайдера без ложных состояний успешного запуска.",
    safetyTitle: "Безопасность",
    safetyText: "Этот патч интерфейса администратора не запускает сервер, не читает .env, не делает операции Prisma или базы данных, не включает провайдера, кошелёк, оплату, выплаты или производственную активацию.",
    languageTitle: "Языки",
    languageText: "Русский, английский, китайский и узбекский поддерживаются как аккуратные рабочие тексты для такси и стрима, без лишних слов и без жаргона."
  },
  en: {
    title: "Taxi and Stream: clean Admin UI languages",
    subtitle: "Russian, English, Chinese and Uzbek copy has been normalized. Random symbols, rough wording, mixed labels and unclear statuses are removed.",
    taxiTitle: "Taxi",
    taxiText: "Taxi panels explain backend/API readiness, Admin cockpit, route catalog, provider boundary and payment/Wallet locks clearly. Production activation remains blocked until a separate exact owner approval.",
    streamTitle: "Stream",
    streamText: "Stream panels explain rooms, moderation, lifecycle, realtime, recording gate and provider-safe boundary without fake live-success states.",
    safetyTitle: "Safety",
    safetyText: "This Admin UI patch does not start backend, does not read .env, does not run Prisma/DB actions, and does not enable provider, Wallet, payment, payout or production activation.",
    languageTitle: "Languages",
    languageText: "Russian, English, Chinese, and Uzbek are maintained as clear production-admin copy for taxi and stream, with no rough wording or slang."
  },
  zh: {
    title: "出租车与直播：清晰的管理界面语言",
    subtitle: "俄语、英语、中文和乌兹别克语文案已规范化。已移除随机符号、粗糙表达、混合标签和不清楚的状态。",
    taxiTitle: "Taxi",
    taxiText: "出租车面板清楚说明服务器接口就绪状态、管理工作台、路由目录、服务商边界以及支付和钱包锁定状态。生产激活仍需所有者单独精确批准。",
    streamTitle: "Stream",
    streamText: "直播面板清楚说明房间、审核、生命周期、实时能力、录制控制和服务商安全边界，不显示虚假的上线成功状态。",
    safetyTitle: "安全",
    safetyText: "此管理界面补丁不启动服务器，不读取 .env，不执行 Prisma 或数据库操作，也不启用服务商、钱包、支付、提现或生产激活。",
    languageTitle: "语言",
    languageText: "俄语、英语、中文和乌兹别克语已整理为出租车和直播的清晰后台管理文案，没有粗糙词语和俚语。"
  },
  uz: {
    title: "Taxi va Stream: toza Admin UI tillari",
    subtitle: "Ruscha, inglizcha, xitoycha va o‘zbekcha matnlar tartibga keltirildi. Tasodifiy belgilar, qo‘pol so‘zlar, aralash yorliqlar va noaniq statuslar olib tashlandi.",
    taxiTitle: "Taxi",
    taxiText: "Taxi panellari backend/API tayyorligi, Admin cockpit, route catalog, provider boundary hamda payment/Wallet lock holatlarini tushunarli ko‘rsatadi. Production activation alohida aniq owner ruxsatisiz ochilmaydi.",
    streamTitle: "Stream",
    streamText: "Strim panellari xonalar, moderatsiya, hayotiy sikl, real vaqt, yozuv nazorati va provayder xavfsiz chegarasini soxta jonli muvaffaqiyatsiz ko‘rsatadi.",
    safetyTitle: "Xavfsizlik",
    safetyText: "Bu admin interfeysi tuzatishi serverni ishga tushirmaydi, .env o‘qimaydi, Prisma yoki maʼlumotlar bazasi amalini bajarmaydi va provayder, hamyon, to‘lov, to‘lov chiqarish yoki ishlab chiqarishni faollashtirishni yoqmaydi.",
    languageTitle: "Tillar",
    languageText: "Rus, ingliz, xitoy va o‘zbek tillari taksi va strim uchun aniq admin matnlari sifatida tozalandi, keraksiz va jargon so‘zlarsiz."
  }
};

function pick(language: AdminLanguage): CopyBlock {
  return COPY[language] || COPY.ru;
}

export function TaxiStreamAdminLanguage006A({ language }: { language: AdminLanguage }) {
  const copy = pick(language);
  const cards = [
    { title: copy.taxiTitle, text: copy.taxiText },
    { title: copy.streamTitle, text: copy.streamText },
    { title: copy.safetyTitle, text: copy.safetyText },
    { title: copy.languageTitle, text: copy.languageText }
  ];

  return (
    <section className="panel" data-admin-ui-taxi-stream-language-cleanup-006a="ready">
      <div className="panelHeader">
        <div>
          <h2>{copy.title}</h2>
          <p>{copy.subtitle}</p>
        </div>
      </div>
      <div className="dashboardGrid">
        {cards.map((card) => (
          <div className="card" key={card.title}>
            <h3>{card.title}</h3>
            <p>{card.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
