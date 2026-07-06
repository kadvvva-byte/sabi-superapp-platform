import type { AdminLanguage } from "./admin-i18n";

type Props018A = { language: AdminLanguage };

type Copy018A = {
  title: string;
  subtitle: string;
  accept: string;
  payout: string;
  wallet: string;
  settlement: string;
  approval: string;
  noFake: string;
  noSecrets: string;
  ownerAi: string;
  next: string;
};

const MARKER018A = "TAXI-PROVIDER-PAYMENT-018A-READINESS-ADMIN-UI-NO-FAKE-NO-WALLET-MUTATION";

const COPY018A: Record<AdminLanguage, Copy018A> = {
  ru: {
    title: "Taxi provider/payment readiness gates",
    subtitle: "Доска готовности только для чтения: приём оплаты, кошелёк, выплаты и расчёты должны подключаться только через серверные контроли провайдера, метки ссылок на секреты и точное утверждение владельца. Интерфейс не создаёт ложный успех оплаты и не двигает деньги.",
    accept: "Провайдер приёма оплат: отдельная серверная конфигурация для оплаты заказов",
    payout: "Провайдер выплат создателям и водителям: отдельная конфигурация выплат, без смешивания с приёмом оплаты",
    wallet: "Изменение кошелька запрещено до контролируемого утверждения рабочей среды, идемпотентности и аудита",
    settlement: "Расчёт поездки: комиссия, баланс водителя, доход Sabi и выплаты только из реальных записей заказов и поездок",
    approval: "Exact approval required: provider binding, payment capture, refund, payout, settlement release",
    noFake: "Без ложного успеха: нет ложной оплаты, ложного начисления кошелька, ложной выплаты или ложного расчёта",
    noSecrets: "No secrets in UI/logs: только secret reference labels, без raw key/env dump",
    ownerAi: "Саби ИИ владельца: 100% обзор, только отчёты, без изменений оплаты и выплат",
    next: "Следующий шаг: 018B проверка готовности рабочей среды — проверить, что контроли провайдера и оплаты остаются безопасно отключёнными без точного утверждения, без чтения .env и без вызова провайдера.",
  },
  en: {
    title: "Taxi provider/payment readiness gates",
    subtitle: "Read-only readiness board: payment acceptance, wallet, payouts, and settlements require approved controls, secret reference labels, and exact owner approval. The interface never creates payment success or money movement by itself.",
    accept: "Payment acceptance setup: separate secure configuration for ride and order payments",
    payout: "Driver payout provider: separate payout configuration, not mixed with payment acceptance",
    wallet: "Wallet mutation: blocked until controlled runtime approval plus idempotency/audit gate",
    settlement: "Trip settlement: commission, driver balance, Sabi earning and payout come only from real order/trip records",
    approval: "Exact approval required: provider binding, payment capture, refund, payout, settlement release",
    noFake: "No fake success: no fake payment, fake wallet credit, fake payout or fake settlement",
    noSecrets: "No secrets in UI/logs: secret reference labels only, no raw key/env dump",
    ownerAi: "Owner Sabi AI: 100% visibility, report-only, no payment/payout mutation execution",
    next: "Next step: 018B runtime readiness smoke — verify provider/payment gates remain safe-disabled without exact approval, with no .env read and no provider call.",
  },
  uz: {
    title: "Taksi provayderi va to‘lov tayyorlik nazoratlari",
    subtitle: "Faqat o‘qish tayyorlik paneli: to‘lov qabul qilish, hamyon, to‘lov chiqarish va hisob-kitob faqat server provayder nazorati, sir havolasi belgisi va egasining aniq tasdig‘i orqali ulanadi. Interfeys soxta to‘lov muvaffaqiyati yoki pul harakati yaratmaydi.",
    accept: "To‘lov qabul qilish provayderi: buyurtma to‘lovlari uchun alohida server konfiguratsiyasi",
    payout: "Haydovchi to‘lov chiqarish provayderi: to‘lov qabul qilishdan alohida konfiguratsiya",
    wallet: "Hamyon o‘zgarishi: boshqariladigan ish muhiti tasdig‘i, idempotentlik va tekshiruv nazorati bo‘lmaguncha bloklangan",
    settlement: "Trip settlement: komissiya, driver balance, Sabi earning va payout faqat real order/trip yozuvlaridan",
    approval: "Exact approval required: provider binding, payment capture, refund, payout, settlement release",
    noFake: "Soxta muvaffaqiyat yo‘q: soxta to‘lov, soxta hamyon kirimi, soxta to‘lov chiqarish yoki soxta hisob-kitob yo‘q",
    noSecrets: "UI/loglarda sirlar yo‘q: faqat secret reference labels, raw key/env dump yo‘q",
    ownerAi: "Egasining Sabi sunʼiy intellekti: 100% ko‘rish, faqat hisobot, to‘lov yoki to‘lov chiqarish o‘zgarishini bajarmaydi",
    next: "Keyingi qadam: 018B ish muhiti tayyorlik tekshiruvi — provayder va to‘lov nazoratlari aniq tasdiq bo‘lmasa xavfsiz o‘chiq qolishini, .env o‘qilmasligini va provayder chaqiruvi yo‘qligini tekshirish.",
  },
  zh: {
    title: "出租车服务商和支付就绪控制",
    subtitle: "只读就绪面板：收款、钱包、提现和结算只能通过服务端服务商控制、密钥引用标签与所有者精确审批启用。界面不创建假支付成功，也不移动资金。",
    accept: "收款服务商：订单和行程收款的独立服务端配置",
    payout: "司机提现服务商：独立提现配置，不与收款配置混用",
    wallet: "钱包变更：在受控运行审批、幂等性和审计控制前禁止",
    settlement: "行程结算：佣金、司机余额、Sabi 收益和提现只来自真实订单和行程记录",
    approval: "Exact approval required：provider binding、payment capture、refund、payout、settlement release",
    noFake: "无虚假成功：无虚假支付、虚假钱包入账、虚假提现或虚假结算",
    noSecrets: "UI/log 无密钥：只允许 secret reference labels，不输出 raw key/env",
    ownerAi: "所有者 Sabi 智能体：100% 可见，仅报告，不执行支付或提现变更",
    next: "下一步：018B 运行就绪检查 — 确认无精确审批时服务商和支付控制保持安全关闭，不读取 .env，不调用服务商。",
  },
};

export function TaxiProviderPayment018APanel({ language }: Props018A) {
  const copy = COPY018A[language] || COPY018A.ru;
  const rows = [
    ["accept-payments-provider", copy.accept],
    ["driver-payout-provider", copy.payout],
    ["wallet-mutation-safe-disabled", copy.wallet],
    ["real-trip-settlement-only", copy.settlement],
    ["exact-owner-approval-required", copy.approval],
    ["no-fake-payment-payout-settlement", copy.noFake],
    ["secret-reference-labels-only", copy.noSecrets],
    ["owner-sabi-ai-report-only", copy.ownerAi],
  ];

  return (
    <section
      className="taxi018aProviderPayment"
      data-admin-ui-taxi-provider-payment-018a="ready"
      data-admin-ui-taxi-provider-payment-018a-marker={MARKER018A}
      data-admin-ui-taxi-provider-payment-018a-accept-payments-provider="server-side-config-required"
      data-admin-ui-taxi-provider-payment-018a-driver-payout-provider="separate-config-required"
      data-admin-ui-taxi-provider-payment-018a-wallet-mutation="safe-disabled-without-exact-approval"
      data-admin-ui-taxi-provider-payment-018a-no-fake-success="payment-wallet-payout-settlement"
      data-admin-ui-taxi-provider-payment-018a-secret-reference-labels-only="true"
      data-admin-ui-taxi-provider-payment-018a-owner-sabi-ai="report-only"
    >
      <div className="taxi018aHead">
        <div>
          <span>{MARKER018A}</span>
          <h2>{copy.title}</h2>
          <p>{copy.subtitle}</p>
        </div>
        <strong>018A · READINESS</strong>
      </div>
      <div className="taxi018aGrid">
        {rows.map(([id, text]) => (
          <article key={id} data-admin-ui-taxi-provider-payment-018a-check={id}>
            <strong>{id}</strong>
            <span>{text}</span>
          </article>
        ))}
      </div>
      <p className="taxi018aNext" data-admin-ui-taxi-provider-payment-018a-next="018b-runtime-safe-disabled-smoke">{copy.next}</p>
    </section>
  );
}
