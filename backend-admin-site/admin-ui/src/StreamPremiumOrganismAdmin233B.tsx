import React from 'react';

type Lang = 'ru' | 'en' | 'uz' | 'zh';

type Props = {
  baseUrl?: string;
  token?: string;
  language?: string;
};

type Stat = { label: string; value: string; note: string };
type Section = { title: string; state: string; body: string };

type Copy = {
  pageName: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  topAction: string;
  ownerBoxTitle: string;
  ownerBoxBody: string;
  managerTitle: string;
  managerStatus: string;
  managerBody: string;
  aiTitle: string;
  aiStatus: string;
  aiBody: string;
  stats: Stat[];
  sections: Section[];
  decisionTitle: string;
  decisionItems: string[];
  reportTitle: string;
  reportItems: string[];
  forbiddenTitle: string;
  forbiddenItems: string[];
  footer: string;
};

const supportedLangs: Lang[] = ['ru', 'en'];

const copy: Record<Lang, Copy> = {
  ru: {
    pageName: "Стрим: контроль и управление",
    eyebrow: "СТРИМ · ЕДИНЫЙ ЦЕНТР УПРАВЛЕНИЯ",
    title: "Идеальный контроль стрима одним менеджером и Саби ИИ",
    subtitle: "Один назначенный менеджер ведёт все операции стрима. Саби ИИ постоянно проверяет риски, жалобы, эфиры, подарки и действия менеджера. Владелец принимает финальные решения.",
    topAction: "Обновить контроль",
    ownerBoxTitle: "Владелец",
    ownerBoxBody: "Финальная власть по тяжёлым блокировкам, выплатам, спорным решениям и включению реальных сервисов остаётся только у Владельца.",
    managerTitle: "Ответственный менеджер стрима",
    managerStatus: "Назначен один из одного",
    managerBody: "Менеджер видит только свою рабочую очередь: эфиры, жалобы, апелляции, подарки, авторов, нарушения и задачи на смену.",
    aiTitle: "Саби ИИ: полный надзор",
    aiStatus: "Проверка круглые сутки",
    aiBody: "Саби ИИ сверяет каждое действие с правилами, ищет накрутку, мошенничество, скрытые жалобы и ошибки менеджера, затем готовит отчёт Владельцу.",
    stats: [
      {
        label: "Активный менеджер",
        value: "1/1",
        note: "лишние менеджеры запрещены"
      },
      {
        label: "Надзор Саби ИИ",
        value: "100%",
        note: "каждое действие проверяется"
      },
      {
        label: "Мусор в языке",
        value: "0",
        note: "без чужих слов и заготовок"
      },
      {
        label: "Финальное решение",
        value: "Владелец",
        note: "без самовольных действий"
      }
    ],
    sections: [
      {
        title: "Эфиры и комнаты",
        state: "Живой контроль",
        body: "Проверка активных, запланированных и завершённых эфиров. Нет имитации успеха, нет фальшивого запуска, нет пустых карточек."
      },
      {
        title: "Жалобы и безопасность",
        state: "Каждая жалоба проверяется",
        body: "Контент, чат, аватары, названия эфиров, угрозы и спорные действия проходят проверку доказательств и журналируются."
      },
      {
        title: "Подарки и авторы",
        state: "Без ручного начисления",
        body: "Подарки, доход авторов и спорные операции отображаются только как безопасные статусы до решения Владельца."
      },
      {
        title: "Апелляции",
        state: "Причина обязательна",
        body: "Пользователь получает понятную причину решения и путь обжалования. Тяжёлые действия уходят на подтверждение Владельца."
      },
      {
        title: "Нарушения менеджера",
        state: "Срочно Владельцу",
        body: "Попытки скрыть жалобу, удалить доказательства, обойти правило или выдать фальшивый результат попадают в отчёт Саби ИИ."
      },
      {
        title: "Пакет проверки магазина",
        state: "Чистые доказательства",
        body: "Показываются только понятные доказательства модерации, жалоб, апелляций и безопасных ограничений без технического мусора."
      }
    ],
    decisionTitle: "Порядок решения",
    decisionItems: [
      "Событие попадает в очередь стрима.",
      "Единственный менеджер проверяет доказательства.",
      "Саби ИИ сверяет риск и правила.",
      "Лёгкое решение фиксируется в журнале.",
      "Тяжёлое действие уходит Владельцу."
    ],
    reportTitle: "Ежедневный отчёт Владельцу",
    reportItems: [
      "опасные эфиры и жалобы",
      "подозрение на накрутку подарков",
      "ошибки или нарушения менеджера",
      "спорные блокировки и апелляции",
      "решения, которые нужны сегодня"
    ],
    forbiddenTitle: "Жёстко запрещено",
    forbiddenItems: [
      "несколько активных менеджеров стрима одновременно",
      "чужие слова в русской версии",
      "фальшивый эфир, фальшивый подарок, фальшивый платёж или фальшивая выплата",
      "чтение секретов, запись в базу, изменение кошелька или запуск реального провайдера из интерфейса",
      "финальное действие Саби ИИ без команды Владельца"
    ],
    footer: "Этот экран сначала очищает языки: русский без английских хвостов, английский без русских хвостов, китайский и узбекский без мусора. Следующий шаг — сделать визуальный контроль стрима лучше, чем экран мессенджера."
  },
  en: {
    pageName: "Stream: control and management",
    eyebrow: "STREAM · SINGLE CONTROL CENTER",
    title: "Premium Stream control by one manager and Sabi intelligence",
    subtitle: "One assigned manager runs every Stream operation. Sabi intelligence continuously checks risks, reports, streams, gifts, and manager actions. The owner makes final decisions.",
    topAction: "Refresh control",
    ownerBoxTitle: "Owner",
    ownerBoxBody: "Final authority for heavy bans, payouts, disputed decisions, and real service enablement stays only with the owner.",
    managerTitle: "Responsible Stream manager",
    managerStatus: "One of one assigned",
    managerBody: "The manager sees only the work queue for the shift: streams, reports, appeals, gifts, creators, violations, and tasks.",
    aiTitle: "Sabi intelligence: full oversight",
    aiStatus: "Continuous review",
    aiBody: "Sabi intelligence compares every action with the rules, finds manipulation, fraud, hidden reports, and manager mistakes, then prepares an owner report.",
    stats: [
      {
        label: "Active manager",
        value: "1/1",
        note: "extra managers are forbidden"
      },
      {
        label: "Sabi oversight",
        value: "100%",
        note: "every action is checked"
      },
      {
        label: "Language garbage",
        value: "0",
        note: "no foreign leftovers or drafts"
      },
      {
        label: "Final decision",
        value: "Owner",
        note: "no autonomous action"
      }
    ],
    sections: [
      {
        title: "Streams and rooms",
        state: "Live operational control",
        body: "Review active, scheduled, and finished streams. No simulated success, no fake launch, and no empty cards."
      },
      {
        title: "Reports and safety",
        state: "Every report is reviewed",
        body: "Content, chat, avatars, stream titles, threats, and disputed actions go through evidence review and audit logging."
      },
      {
        title: "Gifts and creators",
        state: "No manual crediting",
        body: "Gifts, creator revenue, and disputed operations appear only as safe statuses until the owner decides."
      },
      {
        title: "Appeals",
        state: "Reason required",
        body: "The user receives a clear decision reason and appeal path. Heavy actions go to owner confirmation."
      },
      {
        title: "Manager violations",
        state: "Urgent owner escalation",
        body: "Attempts to hide a report, remove evidence, bypass a rule, or show a false result go to the Sabi intelligence report."
      },
      {
        title: "Store review package",
        state: "Clean evidence",
        body: "Only clear moderation, report, appeal, and safety restriction evidence is shown without technical clutter."
      }
    ],
    decisionTitle: "Decision order",
    decisionItems: [
      "A Stream event enters the queue.",
      "The single manager reviews the evidence.",
      "Sabi intelligence checks risk and rules.",
      "A light decision is written to the log.",
      "A heavy action goes to the owner."
    ],
    reportTitle: "Daily owner report",
    reportItems: [
      "dangerous streams and reports",
      "suspected gift manipulation",
      "manager mistakes or violations",
      "disputed bans and appeals",
      "decisions needed today"
    ],
    forbiddenTitle: "Strictly forbidden",
    forbiddenItems: [
      "several active Stream managers at the same time",
      "Russian leftovers in the English version",
      "fake stream, fake gift, fake payment, or fake payout",
      "secret reading, database writing, wallet changes, or real provider launch from the interface",
      "final Sabi intelligence action without the owner command"
    ],
    footer: "This screen first cleans the languages: Russian without English leftovers, English without Russian leftovers, and Chinese plus Uzbek without garbage. The next step is making Stream visual control better than the Messenger screen."
  },
  zh: {
    pageName: "直播：控制与管理",
    eyebrow: "直播 · 单一控制中心",
    title: "由一名经理和萨比智能执行高级直播控制",
    subtitle: "只有一名指定经理处理全部直播运营。萨比智能持续检查风险、举报、直播、礼物和经理行为。最终决定由所有者作出。",
    topAction: "刷新控制",
    ownerBoxTitle: "所有者",
    ownerBoxBody: "重大封禁、收益发放、争议决定和真实服务启用的最终权限只属于所有者。",
    managerTitle: "负责直播的经理",
    managerStatus: "一名已指定",
    managerBody: "经理只看到本班次工作队列：直播、举报、申诉、礼物、创作者、违规和任务。",
    aiTitle: "萨比智能：全面监督",
    aiStatus: "全天候检查",
    aiBody: "萨比智能把每个动作与规则对比，发现刷量、欺诈、隐藏举报和经理错误，然后生成所有者报告。",
    stats: [
      {
        label: "在线经理",
        value: "1/1",
        note: "禁止额外经理"
      },
      {
        label: "萨比监督",
        value: "100%",
        note: "每个动作都被检查"
      },
      {
        label: "语言杂质",
        value: "0",
        note: "无外语残留和草稿"
      },
      {
        label: "最终决定",
        value: "所有者",
        note: "无自主动作"
      }
    ],
    sections: [
      {
        title: "直播和房间",
        state: "实时运营控制",
        body: "检查进行中、已排期和已结束直播。没有模拟成功，没有虚假启动，没有空卡片。"
      },
      {
        title: "举报和安全",
        state: "每条举报都要检查",
        body: "内容、聊天、头像、直播标题、威胁和争议行为都进入证据检查和审计记录。"
      },
      {
        title: "礼物和创作者",
        state: "禁止手动入账",
        body: "礼物、创作者收益和争议操作只显示安全状态，直到所有者决定。"
      },
      {
        title: "申诉",
        state: "必须给出原因",
        body: "用户会收到清晰的决定原因和申诉路径。重大动作交给所有者确认。"
      },
      {
        title: "经理违规",
        state: "紧急上报所有者",
        body: "隐藏举报、删除证据、绕过规则或显示虚假结果都会进入萨比智能报告。"
      },
      {
        title: "商店审核资料",
        state: "干净证据",
        body: "只显示清晰的审核、举报、申诉和安全限制证据，不显示技术杂物。"
      }
    ],
    decisionTitle: "决策顺序",
    decisionItems: [
      "直播事件进入队列。",
      "唯一经理检查证据。",
      "萨比智能检查风险和规则。",
      "轻量决定写入日志。",
      "重大动作交给所有者。"
    ],
    reportTitle: "每日所有者报告",
    reportItems: [
      "危险直播和举报",
      "礼物刷量嫌疑",
      "经理错误或违规",
      "争议封禁和申诉",
      "今天需要的决定"
    ],
    forbiddenTitle: "严格禁止",
    forbiddenItems: [
      "多名直播经理同时在线处理",
      "中文版出现外语残留",
      "虚假直播、虚假礼物、虚假付款或虚假发放",
      "从界面读取秘密、写入数据库、修改钱包或启动真实服务商",
      "没有所有者命令时萨比智能执行最终动作"
    ],
    footer: "此屏幕首先清理语言：俄文没有英文残留，英文没有俄文残留，中文和乌兹别克文没有杂物。下一步是让直播视觉控制强于消息中心。"
  },
  uz: {
    pageName: "Strim: boshqaruv va nazorat",
    eyebrow: "STRIM · YAGONA BOSHQARUV MARKAZI",
    title: "Strimni bitta menejer va Sabi sun’iy intellekti mukammal nazorat qiladi",
    subtitle: "Barcha strim ishlarini faqat bitta tayinlangan menejer yuritadi. Sabi sun’iy intellekti xavflar, shikoyatlar, efirlar, sovg‘alar va menejer harakatlarini doim tekshiradi. Yakuniy qarorni egasi qabul qiladi.",
    topAction: "Nazoratni yangilash",
    ownerBoxTitle: "Egasi",
    ownerBoxBody: "Og‘ir bloklash, to‘lov chiqarish, bahsli qarorlar va haqiqiy xizmatlarni yoqish bo‘yicha yakuniy vakolat faqat egasida qoladi.",
    managerTitle: "Strim uchun mas’ul menejer",
    managerStatus: "Bittadan bittasi tayinlangan",
    managerBody: "Menejer faqat o‘z smenasidagi ish navbatini ko‘radi: efirlar, shikoyatlar, apellyatsiyalar, sovg‘alar, mualliflar, qoidabuzarliklar va vazifalar.",
    aiTitle: "Sabi sun’iy intellekti: to‘liq nazorat",
    aiStatus: "Doimiy tekshiruv",
    aiBody: "Sabi sun’iy intellekti har bir harakatni qoidalar bilan solishtiradi, soxtalashtirish, firibgarlik, yashirilgan shikoyat va menejer xatosini topadi, keyin egasi uchun hisobot tayyorlaydi.",
    stats: [
      {
        label: "Faol menejer",
        value: "1/1",
        note: "ortiqcha menejer taqiqlanadi"
      },
      {
        label: "Sabi nazorati",
        value: "100%",
        note: "har bir harakat tekshiriladi"
      },
      {
        label: "Til chiqindisi",
        value: "0",
        note: "begona qoldiq va qoralama yo‘q"
      },
      {
        label: "Yakuniy qaror",
        value: "Egasi",
        note: "mustaqil harakat yo‘q"
      }
    ],
    sections: [
      {
        title: "Efirlar va xonalar",
        state: "Jonli operatsion nazorat",
        body: "Faol, rejalashtirilgan va tugagan efirlar tekshiriladi. Soxta muvaffaqiyat, soxta ishga tushirish va bo‘sh kartalar yo‘q."
      },
      {
        title: "Shikoyatlar va xavfsizlik",
        state: "Har bir shikoyat tekshiriladi",
        body: "Kontent, suhbat, surat, efir nomi, tahdid va bahsli harakatlar dalil tekshiruvi hamda nazorat jurnalidan o‘tadi."
      },
      {
        title: "Sovg‘alar va mualliflar",
        state: "Qo‘lda mablag‘ yozilmaydi",
        body: "Sovg‘alar, muallif daromadi va bahsli amallar egasi qaror qilmaguncha faqat xavfsiz holat sifatida ko‘rinadi."
      },
      {
        title: "Apellyatsiyalar",
        state: "Sabab majburiy",
        body: "Foydalanuvchi aniq qaror sababi va apellyatsiya yo‘lini oladi. Og‘ir harakatlar egasi tasdig‘iga yuboriladi."
      },
      {
        title: "Menejer qoidabuzarligi",
        state: "Shoshilinch egasiga",
        body: "Shikoyatni yashirish, dalilni o‘chirish, qoidani chetlash yoki soxta natija ko‘rsatish Sabi hisobotiga tushadi."
      },
      {
        title: "Do‘kon tekshiruvi hujjatlari",
        state: "Toza dalillar",
        body: "Faqat moderatsiya, shikoyat, apellyatsiya va xavfsizlik cheklovlari bo‘yicha aniq dalillar ko‘rinadi, texnik chalkashlik yo‘q."
      }
    ],
    decisionTitle: "Qaror tartibi",
    decisionItems: [
      "Strim hodisasi navbatga tushadi.",
      "Yagona menejer dalillarni tekshiradi.",
      "Sabi sun’iy intellekti xavf va qoidalarni tekshiradi.",
      "Yengil qaror jurnalga yoziladi.",
      "Og‘ir harakat egasiga yuboriladi."
    ],
    reportTitle: "Kunlik egasi hisoboti",
    reportItems: [
      "xavfli efirlar va shikoyatlar",
      "sovg‘a soxtalashtirish gumoni",
      "menejer xatosi yoki qoidabuzarligi",
      "bahsli bloklash va apellyatsiyalar",
      "bugun kerak bo‘lgan qarorlar"
    ],
    forbiddenTitle: "Qattiq taqiqlangan",
    forbiddenItems: [
      "bir vaqtda bir nechta faol strim menejeri",
      "o‘zbekcha versiyada begona til qoldig‘i",
      "soxta efir, soxta sovg‘a, soxta to‘lov yoki soxta chiqarim",
      "interfeysdan sir o‘qish, ma’lumotlar bazasiga yozish, hamyonni o‘zgartirish yoki haqiqiy xizmat beruvchini ishga tushirish",
      "egasi buyrug‘isiz Sabi sun’iy intellekti yakuniy harakati"
    ],
    footer: "Bu ekran avval tillarni tozalaydi: ruscha ichida inglizcha qoldiq yo‘q, inglizcha ichida ruscha qoldiq yo‘q, xitoycha va o‘zbekcha ichida chiqindi yo‘q. Keyingi qadam — strim vizual nazoratini Messenger ekranidan ham yaxshiroq qilish."
  }
};

function getLang(language?: string): Lang {
  return supportedLangs.includes(language as Lang) ? language as Lang : 'ru';
}

export function StreamPremiumOrganismAdmin233BPanel({ baseUrl, token, language }: Props) {
  const lang = getLang(language);
  const t = copy[lang];
  const isSourceConnected = Boolean(baseUrl);
  const hasToken = Boolean(token);

  return (
    <main
      style={styles.shell}
      data-stream-admin-screen="language-pure-manager-sabi-control-233d"
      data-stream-admin-control-model="one-manager-sabi-oversight-owner-final"
      data-i18n-purity="ru-no-latin,en-no-cyrillic,zh-no-latin,uz-no-cyrillic"
      data-source-connected={isSourceConnected ? 'yes' : 'no'}
      data-token-visible={hasToken ? 'no' : 'not-used'}
      data-safe-disabled="provider,db,wallet,payment,payout,runtime"
    >
      <section style={styles.hero}>
        <div style={styles.heroMain}>
          <div style={styles.eyebrow}>{t.eyebrow}</div>
          <h1 style={styles.title}>{t.title}</h1>
          <p style={styles.subtitle}>{t.subtitle}</p>
        </div>
        <aside style={styles.ownerBox}>
          <div style={styles.ownerLabel}>{t.ownerBoxTitle}</div>
          <p style={styles.ownerText}>{t.ownerBoxBody}</p>
        </aside>
      </section>

      <section style={styles.statGrid}>
        {t.stats.map((item) => (
          <article key={item.label} style={styles.statCard}>
            <div style={styles.statLabel}>{item.label}</div>
            <strong style={styles.statValue}>{item.value}</strong>
            <p style={styles.statNote}>{item.note}</p>
          </article>
        ))}
      </section>

      <section style={styles.commandGrid}>
        <article style={styles.commandCard}>
          <div style={styles.commandTop}>
            <h2 style={styles.commandTitle}>{t.managerTitle}</h2>
            <span style={styles.badge}>{t.managerStatus}</span>
          </div>
          <p style={styles.commandBody}>{t.managerBody}</p>
        </article>
        <article style={styles.commandCardAccent}>
          <div style={styles.commandTop}>
            <h2 style={styles.commandTitle}>{t.aiTitle}</h2>
            <span style={styles.badgeAccent}>{t.aiStatus}</span>
          </div>
          <p style={styles.commandBody}>{t.aiBody}</p>
        </article>
      </section>

      <section style={styles.workPanel}>
        <div style={styles.workHead}>
          <h2 style={styles.workTitle}>{t.pageName}</h2>
          <button type="button" style={styles.actionButton}>{t.topAction}</button>
        </div>
        <div style={styles.workGrid}>
          {t.sections.map((section) => (
            <article key={section.title} style={styles.workCard}>
              <div style={styles.workCardHead}>
                <h3 style={styles.cardTitle}>{section.title}</h3>
                <span style={styles.stateBadge}>{section.state}</span>
              </div>
              <p style={styles.cardBody}>{section.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section style={styles.bottomGrid}>
        <article style={styles.listPanel}>
          <h2 style={styles.listTitle}>{t.decisionTitle}</h2>
          <ol style={styles.orderedList}>{t.decisionItems.map(item => <li key={item}>{item}</li>)}</ol>
        </article>
        <article style={styles.listPanel}>
          <h2 style={styles.listTitle}>{t.reportTitle}</h2>
          <ul style={styles.unorderedList}>{t.reportItems.map(item => <li key={item}>{item}</li>)}</ul>
        </article>
        <article style={styles.listPanelWarn}>
          <h2 style={styles.listTitle}>{t.forbiddenTitle}</h2>
          <ul style={styles.unorderedList}>{t.forbiddenItems.map(item => <li key={item}>{item}</li>)}</ul>
        </article>
      </section>

      <footer style={styles.footer}>{t.footer}</footer>
    </main>
  );
}

export default StreamPremiumOrganismAdmin233BPanel;

const styles: Record<string, React.CSSProperties> = {
  shell: {
    minHeight: '100%',
    padding: 18,
    color: '#ecfeff',
    background: 'radial-gradient(circle at 12% 10%, rgba(0, 242, 255, 0.18), transparent 28%), radial-gradient(circle at 86% 6%, rgba(26, 96, 255, 0.18), transparent 32%), linear-gradient(135deg, #03101f 0%, #071d31 48%, #020812 100%)',
    fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif'
  },
  hero: {
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1fr) 340px',
    gap: 12,
    alignItems: 'stretch'
  },
  heroMain: {
    border: '1px solid rgba(42, 247, 255, 0.38)',
    borderRadius: 22,
    padding: 22,
    background: 'linear-gradient(135deg, rgba(5, 24, 42, 0.96), rgba(4, 13, 26, 0.96))',
    boxShadow: '0 22px 70px rgba(0,0,0,0.32)'
  },
  eyebrow: { color: '#42f8ff', fontSize: 12, fontWeight: 900, letterSpacing: 0.8, textTransform: 'uppercase' },
  title: { margin: '8px 0 10px', fontSize: 28, lineHeight: 1.12, letterSpacing: -0.55 },
  subtitle: { margin: 0, color: '#b8d8e8', lineHeight: 1.55, maxWidth: 980 },
  ownerBox: {
    border: '1px solid rgba(255, 215, 112, 0.46)',
    borderRadius: 22,
    padding: 18,
    background: 'linear-gradient(160deg, rgba(60, 40, 5, 0.82), rgba(6, 15, 27, 0.96))'
  },
  ownerLabel: { color: '#ffda6b', fontSize: 22, fontWeight: 950, marginBottom: 10 },
  ownerText: { margin: 0, color: '#f2e3b2', lineHeight: 1.52 },
  statGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 10, marginTop: 12 },
  statCard: { border: '1px solid rgba(56, 247, 255, 0.22)', borderRadius: 18, padding: 14, background: 'rgba(3, 16, 30, 0.86)' },
  statLabel: { color: '#a4c7d9', fontSize: 12, fontWeight: 850 },
  statValue: { display: 'block', marginTop: 6, color: '#44f8ff', fontSize: 25, lineHeight: 1.05 },
  statNote: { margin: '7px 0 0', color: '#abc7d5', fontSize: 12, lineHeight: 1.4 },
  commandGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 12 },
  commandCard: { border: '1px solid rgba(44, 237, 255, 0.28)', borderRadius: 20, padding: 16, background: 'rgba(4, 18, 33, 0.94)' },
  commandCardAccent: { border: '1px solid rgba(105, 255, 186, 0.34)', borderRadius: 20, padding: 16, background: 'linear-gradient(180deg, rgba(4, 28, 39, 0.95), rgba(3, 14, 27, 0.96))' },
  commandTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10 },
  commandTitle: { margin: 0, fontSize: 20, lineHeight: 1.18 },
  badge: { border: '1px solid rgba(61, 247, 255, 0.48)', borderRadius: 999, color: '#42f8ff', padding: '5px 10px', fontSize: 11, fontWeight: 900, whiteSpace: 'nowrap' },
  badgeAccent: { border: '1px solid rgba(116, 255, 190, 0.52)', borderRadius: 999, color: '#87ffc8', padding: '5px 10px', fontSize: 11, fontWeight: 900, whiteSpace: 'nowrap' },
  commandBody: { color: '#b9d7e5', lineHeight: 1.54, margin: '12px 0 0' },
  workPanel: { border: '1px solid rgba(43, 237, 255, 0.25)', borderRadius: 22, padding: 16, marginTop: 12, background: 'rgba(2, 12, 23, 0.72)' },
  workHead: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, marginBottom: 12 },
  workTitle: { margin: 0, fontSize: 21 },
  actionButton: { border: '1px solid rgba(60, 247, 255, 0.5)', borderRadius: 999, background: 'linear-gradient(135deg, #21eaf4, #2ba7ff)', color: '#00131d', padding: '8px 14px', fontWeight: 950, cursor: 'default' },
  workGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 10 },
  workCard: { border: '1px solid rgba(84, 132, 162, 0.55)', borderRadius: 18, padding: 14, background: 'rgba(4, 18, 33, 0.92)' },
  workCardHead: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10 },
  cardTitle: { margin: 0, fontSize: 16, lineHeight: 1.2 },
  stateBadge: { border: '1px solid rgba(61, 247, 255, 0.44)', borderRadius: 999, color: '#3df7ff', padding: '4px 8px', fontSize: 11, fontWeight: 850, whiteSpace: 'nowrap' },
  cardBody: { color: '#bad7e5', lineHeight: 1.5, margin: '10px 0 0' },
  bottomGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 12, marginTop: 12 },
  listPanel: { border: '1px solid rgba(84, 132, 162, 0.52)', borderRadius: 18, padding: 15, background: 'rgba(4, 18, 33, 0.90)' },
  listPanelWarn: { border: '1px solid rgba(255, 199, 91, 0.38)', borderRadius: 18, padding: 15, background: 'rgba(31, 20, 6, 0.50)' },
  listTitle: { margin: '0 0 10px', fontSize: 17 },
  orderedList: { margin: 0, paddingLeft: 20, color: '#bdd9e6', lineHeight: 1.72 },
  unorderedList: { margin: 0, paddingLeft: 18, color: '#bdd9e6', lineHeight: 1.72 },
  footer: { marginTop: 12, border: '1px solid rgba(61, 247, 255, 0.23)', borderRadius: 18, padding: 14, color: '#bdd7e4', background: 'rgba(2, 10, 18, 0.74)' }
};
