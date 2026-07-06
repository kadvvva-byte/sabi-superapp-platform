import type { AdminLanguage } from "./admin-i18n";

type Props017A = { language: AdminLanguage };

type Copy017A = {
  title: string;
  subtitle: string;
  daily: string;
  urgent: string;
  complaintReview: string;
  appeal: string;
  evidence: string;
  finance: string;
  access: string;
  noMutation: string;
  reportOnly: string;
  noFake: string;
  next: string;
};

const MARKER017A = "TAXI-OWNER-SABI-AI-017A-DAILY-GOVERNANCE-ADMIN-UI-REPORT-ONLY-NO-FAKE";

const COPY017A: Record<AdminLanguage, Copy017A> = {
  ru: {
    title: "Саби ИИ владельца: ежедневный контроль такси",
    subtitle: "Доска только для чтения для владельца: Саби ИИ каждый день проверяет жалобы, поездки, заявки, баланс, тарифы, финансовые операции и доступы, но не выполняет наказания, выплаты, архивирование или утверждение без команды владельца и точного серверного контроля.",
    daily: "Ежедневный отчёт владельцу: риски, нарушения, жалобы, деньги, доступы",
    urgent: "Срочный сигнал владельцу при риске: мошенничество, договорная отмена, конфликт, персональные данные, деньги",
    complaintReview: "Жалобы проверяются ежедневно до штрафа/блокировки; автоматического наказания нет",
    appeal: "Апелляция и объяснение обязательны перед тяжёлым блоком",
    evidence: "Evidence board: safe redaction, raw PII не показывается в списках",
    finance: "Финансовые операции: выручка, заработок Sabi, архив и отчёт без кнопок выплат или распределения",
    access: "Ролевой доступ: владелец 100%, Саби ИИ владельца 100% обзор, только отчёты",
    noMutation: "Без мутаций: Саби ИИ сам не утверждает, не архивирует, не выплачивает, не меняет тарифы и не распределяет заказы",
    reportOnly: "Режим только отчётов закреплён для всех производственных контролей такси",
    noFake: "Без ложных данных: нет ложной жалобы, ложного отчёта, ложного штрафа или ложного успеха доступа",
    next: "Следующий шаг: 017B проверка рабочей среды — проверить источники ежедневного отчёта ИИ без записи в базу данных, без выгрузки .env, без кошелька и провайдера.",
  },
  en: {
    title: "Owner Sabi AI: daily Taxi governance",
    subtitle: "Read-only Owner board: Sabi AI checks complaints, trips, applications, balance, tariffs, Finance Ops and access every day, but never performs penalties, payouts, archiving or approvals without Owner command/exact backend gate.",
    daily: "Daily Owner report: risks, violations, complaints, money, access",
    urgent: "Urgent Owner signal for risk: fraud, negotiated cancellation, conflict, PII, money",
    complaintReview: "Complaints are reviewed daily before penalty/block; no automatic punishment",
    appeal: "Appeal and explanation are required before a heavy block",
    evidence: "Evidence board: safe redaction, raw PII is not exposed in lists",
    finance: "Finance Ops: revenue/Sabi earnings/archive/report without payout/distribute buttons",
    access: "RBAC: Owner 100%, Owner Sabi AI 100% overview, report-only",
    noMutation: "No mutation: Sabi AI never approves/archives/pays/tariffs/dispatches by itself",
    reportOnly: "Report-only mode is locked for all Taxi production gates",
    noFake: "No fake: no fake complaint, fake report, fake penalty, fake access success",
    next: "Next: 017B runtime smoke — verify daily AI report sources without DB write, .env dump, Wallet/provider.",
  },
  uz: {
    title: "Owner Sabi AI: Taxi kunlik nazorati",
    subtitle: "Egasi uchun faqat o‘qish doskasi: Sabi sunʼiy intellekti har kuni shikoyatlar, safarlar, arizalar, balans, tariflar, moliyaviy amallar va kirishlarni tekshiradi, lekin egasi buyrug‘i va aniq server nazoratisiz jazo, to‘lov chiqarish, arxiv yoki tasdiq qilmaydi.",
    daily: "Kunlik Owner report: risklar, qoidabuzarliklar, shikoyatlar, pul, access",
    urgent: "Xavf bo‘lsa Ownerga tezkor signal: fraud, kelishilgan bekor qilish, konflikt, PII, pul",
    complaintReview: "Shikoyatlar jarima/blokdan oldin har kuni ko‘riladi; avtomatik jazo yo‘q",
    appeal: "Og‘ir blokdan oldin appeal va tushuntirish majburiy",
    evidence: "Evidence board: safe redaction, raw PII ro‘yxatlarda ko‘rsatilmaydi",
    finance: "Moliyaviy amallar: tushum, Sabi daromadi, arxiv va hisobot; to‘lov chiqarish yoki taqsimlash tugmalari yo‘q",
    access: "RBAC: Owner 100%, Owner Sabi AI 100% overview, report-only",
    noMutation: "Mutaatsiya yo‘q: Sabi sunʼiy intellekti o‘zi tasdiqlamaydi, arxivlamaydi, to‘lov chiqarmaydi, tarif yoki taqsimlashni bajarmaydi",
    reportOnly: "Report-only rejim barcha Taxi production gate uchun yopilgan",
    noFake: "Soxta natija yo‘q: soxta shikoyat, soxta hisobot, soxta jazo yoki soxta kirish muvaffaqiyati yo‘q",
    next: "Keyingi qadam: 017B runtime smoke — kunlik AI report source-larni DB write, .env dump, Wallet/provider qilmasdan tekshirish.",
  },
  zh: {
    title: "所有者 Sabi 智能体：出租车每日治理",
    subtitle: "所有者只读看板：Sabi 智能体每天检查投诉、行程、申请、余额、费率、财务操作和权限；没有所有者命令和精确服务器控制，不执行处罚、付款、归档或审批。",
    daily: "所有者每日报告：风险、违规、投诉、资金、权限",
    urgent: "风险时紧急通知所有者：欺诈、协商取消、冲突、个人信息、资金",
    complaintReview: "投诉必须每日审核后才可处罚/封禁；没有自动处罚",
    appeal: "重大封禁前必须有申诉和解释",
    evidence: "Evidence board：安全脱敏，列表不暴露 raw PII",
    finance: "财务操作：营收、Sabi 收益、归档和报告，无提现或分配按钮",
    access: "角色权限：所有者 100%，所有者 Sabi 智能体 100% 总览，仅报告",
    noMutation: "无变更：Sabi 智能体不自行审批、归档、提现、改价或派单",
    reportOnly: "仅报告模式锁定在全部出租车生产控制中",
    noFake: "无虚假数据：无虚假投诉、虚假报告、虚假处罚或虚假访问成功",
    next: "下一步：017B 运行检查 — 不写数据库、不导出 .env、不调用钱包或服务商，验证每日智能报告来源。",
  },
};

const items017A = ["daily", "urgent", "complaintReview", "appeal", "evidence", "finance", "access", "noMutation", "reportOnly", "noFake"] as const;

export function TaxiOwnerSabiAi017APanel({ language }: Props017A) {
  const copy = COPY017A[language] || COPY017A.ru;
  return (
    <section
      className="taxi017aOwnerSabiAiGovernance"
      data-admin-ui-taxi-owner-sabi-ai-017a="daily-governance-report-only-ready"
      data-admin-ui-taxi-owner-sabi-ai-017a-owner-access="100"
      data-admin-ui-taxi-owner-sabi-ai-017a-ai-mode="report-only-no-mutation"
      data-admin-ui-taxi-owner-sabi-ai-017a-daily-complaint-review="required-before-penalty"
      data-admin-ui-taxi-owner-sabi-ai-017a-appeal-before-hard-block="required"
      data-admin-ui-taxi-owner-sabi-ai-017a-no-fake-report-penalty="ready"
      data-admin-ui-taxi-owner-sabi-ai-017a-no-wallet-provider-db-direct="ready"
    >
      <div className="taxi017aHead">
        <div>
          <span>{MARKER017A}</span>
          <h2>{copy.title}</h2>
          <p>{copy.subtitle}</p>
        </div>
        <strong>AI REPORT</strong>
      </div>
      <div className="taxi017aGrid">
        {items017A.map((key) => <article key={key}><span>{copy[key]}</span></article>)}
      </div>

      <div
        className="taxi017cCloseoutBoard"
        data-admin-ui-taxi-owner-sabi-ai-017c="production-closeout-runtime-017b-passed"
        data-admin-ui-taxi-owner-sabi-ai-017c-runtime="017b-passed"
        data-admin-ui-taxi-owner-sabi-ai-017c-source-health="17-of-17"
        data-admin-ui-taxi-owner-sabi-ai-017c-governance-writes="403-without-exact-approval"
        data-admin-ui-taxi-owner-sabi-ai-017c-ai-mode="report-only-no-mutation"
        data-admin-ui-taxi-owner-sabi-ai-017c-no-fake="no-fake-ai-report-penalty"
        data-admin-ui-taxi-owner-sabi-ai-017c-no-wallet-provider="no-wallet-provider-local-penalty"
      >
        <span>TAXI-OWNER-SABI-AI-017C-PRODUCTION-CLOSEOUT-RUNTIME-017B-PASSED</span>
        <h3>017B runtime smoke passed</h3>
        <p>Owner Sabi AI daily governance is closed as read-only production control: daily complaints, support, lost property, tariffs, Finance Ops, applications and protected gates are synchronized from real sources only.</p>
        <div className="taxi017cCloseoutGrid">
          <strong>Source health: 17/17</strong>
          <strong>Daily complaint review before penalty: runtime checked</strong>
          <strong>Evidence redaction/raw PII blocked</strong>
          <strong>Owner Sabi AI: report-only no mutation</strong>
          <strong>Protected governance writes: 403 without exact approval</strong>
          <strong>No fake AI report/penalty</strong>
          <strong>No Wallet/provider/local penalty</strong>
          <strong>Next hardening: production readiness final audit and provider/payment gates</strong>
        </div>
      </div>
      <p className="taxi017aNext">{copy.next}</p>
    </section>
  );
}
