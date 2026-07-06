import { useMemo, useState } from "react";
import type { AdminApiConfig } from "./api";
import type { AdminLanguage } from "./admin-i18n";
import "./taxi-finance-standalone028a-fix4.css";

type Props028AFix4 = { language: AdminLanguage; config: AdminApiConfig; setNotice: (message: string) => void };
type View028AFix4 = "owner" | "agent" | "reports" | "archive";
type Log028AFix4 = { at: string; view: View028AFix4; action: string; path: string; status: number | string; ok: boolean; actor: string; message: string };
type Row028AFix4 = { id?: string; agentId?: string; driverId?: string; topupId?: string; amount?: string; currency?: string; state?: string; proof?: string; createdAt?: string };

type Form028AFix4 = {
  ownerId: string;
  trustedPersonId: string;
  agentId: string;
  agentAccountId: string;
  agentContractId: string;
  agentFundingAmount: string;
  sourceCurrency: string;
  targetCurrency: string;
  exchangeRate: string;
  rateSnapshotId: string;
  paymentProofId: string;
  paymentProofUrl: string;
  transferReference: string;
  transactionHash: string;
  driverId: string;
  driverTopupId: string;
  driverRequestedAmount: string;
  driverResolvedCountry: string;
  driverResolvedCurrency: string;
  agentAvailableBalance: string;
  driverTeamBindingId: string;
  decisionNote: string;
  reportDate: string;
  reportMonth: string;
  archiveQuery: string;
};

const TAXI_FINANCE_STANDALONE_028A_FIX4 = "028A_FIX4_TAXI_FINANCE_TOP_LEVEL_MODULE_NOT_INSIDE_TAXI_DYNAMIC_CURRENCY";
const ACCESS_OWNER_ASSIGNED_ONLY_028A_FIX4 = "OWNER_AND_OWNER_ASSIGNED_THREE_FOUR_TRUSTED_FINANCE_PEOPLE_ONLY";
const ACCESS_AGENT_ONLY_ASSIGNED_DRIVERS_028A_FIX4 = "AGENT_CAN_ONLY_TOPUP_ASSIGNED_DRIVERS_FROM_OWN_POSITIVE_AGENT_BALANCE";
const DYNAMIC_CURRENCY_RULE_028A_FIX4 = "NO_FIXED_CURRENCY_DEFAULT_SERVER_RESOLVES_COUNTRY_ALLOWED_CURRENCIES_RATE";

const PATHS028AFix4 = {
  ownerAccess: "/api/admin/taxi-finance/access/owner-assigned/check",
  ownerResolveAgent: "/api/admin/taxi-finance/agents/resolve",
  ownerPrepareAgentFunding: "/api/admin/taxi-finance/agent-funding/prepare",
  ownerRequestAgentFundingApproval: "/api/admin/taxi-finance/agent-funding/approval-request",
  ownerResolveDriverTopup: "/api/admin/taxi-finance/driver-topup/resolve",
  ownerPrepareDriverCredit: "/api/admin/taxi-finance/driver-credit/prepare",
  ownerRequestDriverCreditApproval: "/api/admin/taxi-finance/driver-credit/approval-request",
  agentAccess: "/api/agent/taxi-finance/access/check",
  agentAssignedDrivers: "/api/agent/taxi-finance/drivers/assigned",
  agentResolveDriverTopup: "/api/agent/taxi-finance/driver-topup/resolve",
  agentPrepareDriverTopup: "/api/agent/taxi-finance/driver-topup/prepare",
  agentRequestDriverTopupApproval: "/api/agent/taxi-finance/driver-topup/approval-request",
  agentBecomeAgentRequest: "/api/taxi-driver/agent-program/apply",
  dailyReport: "/api/admin/taxi-finance/reports/daily-hard-report",
  monthlyReport: "/api/admin/taxi-finance/reports/monthly-agent-contract-report",
  exportReport: "/api/admin/taxi-finance/reports/export",
  archiveSearch: "/api/admin/taxi-finance/archive/search",
  archiveOpen: "/api/admin/taxi-finance/archive/open"
} as const;

type PathKey028AFix4 = keyof typeof PATHS028AFix4;

const emptyForm028AFix4: Form028AFix4 = {
  ownerId: "",
  trustedPersonId: "",
  agentId: "",
  agentAccountId: "",
  agentContractId: "",
  agentFundingAmount: "",
  sourceCurrency: "",
  targetCurrency: "",
  exchangeRate: "",
  rateSnapshotId: "",
  paymentProofId: "",
  paymentProofUrl: "",
  transferReference: "",
  transactionHash: "",
  driverId: "",
  driverTopupId: "",
  driverRequestedAmount: "",
  driverResolvedCountry: "",
  driverResolvedCurrency: "",
  agentAvailableBalance: "",
  driverTeamBindingId: "",
  decisionNote: "",
  reportDate: "",
  reportMonth: "",
  archiveQuery: ""
};

function base028AFix4(config: AdminApiConfig): string {
  return String(config.baseUrl || "http://127.0.0.1:3000").replace(/\/$/, "");
}

function moneyNumber028AFix4(value: string): number {
  const parsed = Number(String(value).replace(/\s+/g, "").replace(",", "."));
  return Number.isFinite(parsed) ? parsed : 0;
}

function calcAgentModel028AFix4(requestedRaw: string): { requested: number; commission: number; debit: number } {
  const requested = moneyNumber028AFix4(requestedRaw);
  const commission = Math.max(0, requested * 0.02);
  const debit = Math.max(0, requested - commission);
  return { requested, commission, debit };
}

function headers028AFix4(config: AdminApiConfig, form: Form028AFix4, view: View028AFix4): Record<string, string> {
  return {
    "content-type": "application/json",
    "x-sabi-admin-token": config.token || "",
    "x-admin-token": config.token || "",
    "x-sabi-taxi-finance-owner-id": form.ownerId,
    "x-sabi-taxi-finance-trusted-person-id": form.trustedPersonId,
    "x-sabi-taxi-finance-agent-id": form.agentId,
    "x-sabi-taxi-finance-view": view,
    "x-sabi-finance-access-rule": view === "agent" ? ACCESS_AGENT_ONLY_ASSIGNED_DRIVERS_028A_FIX4 : ACCESS_OWNER_ASSIGNED_ONLY_028A_FIX4,
    "x-sabi-dynamic-currency-rule": DYNAMIC_CURRENCY_RULE_028A_FIX4
  };
}

function payload028AFix4(form: Form028AFix4, view: View028AFix4, action: string) {
  const agentModel = calcAgentModel028AFix4(form.driverRequestedAmount);
  return {
    module: TAXI_FINANCE_STANDALONE_028A_FIX4,
    standaloneTopLevelModule: true,
    notInsideOrdinaryTaxi: true,
    view,
    action,
    access: {
      ownerAssignedOnly: ACCESS_OWNER_ASSIGNED_ONLY_028A_FIX4,
      agentOnlyAssignedDrivers: ACCESS_AGENT_ONLY_ASSIGNED_DRIVERS_028A_FIX4,
      agentCannotCreditOwnAgentAccount: true,
      ordinaryTaxiAdminCannotManualTopup: true
    },
    identity: {
      ownerId: form.ownerId,
      trustedPersonId: form.trustedPersonId,
      agentId: form.agentId,
      agentAccountId: form.agentAccountId,
      agentContractId: form.agentContractId,
      driverId: form.driverId,
      driverTopupId: form.driverTopupId,
      driverTeamBindingId: form.driverTeamBindingId
    },
    agentFunding: {
      amount: form.agentFundingAmount,
      sourceCurrency: form.sourceCurrency,
      targetCurrency: form.targetCurrency,
      exchangeRate: form.exchangeRate,
      rateSnapshotId: form.rateSnapshotId,
      proofRequired: true,
      paymentProofId: form.paymentProofId,
      paymentProofUrl: form.paymentProofUrl,
      transferReference: form.transferReference,
      transactionHash: form.transactionHash
    },
    driverTopup: {
      resolvedCountry: form.driverResolvedCountry,
      resolvedCurrency: form.driverResolvedCurrency,
      requestedAmount: form.driverRequestedAmount,
      driverCreditAmount: agentModel.requested,
      agentCommissionPercent: 2,
      agentCommissionAmount: agentModel.commission,
      agentBalanceDebitAmount: agentModel.debit,
      proofRequired: true,
      agentAvailableBalance: form.agentAvailableBalance
    },
    reports: {
      dailyHardReportRequired: true,
      monthlyAgentReportRequired: true,
      reportDate: form.reportDate,
      reportMonth: form.reportMonth,
      archiveQuery: form.archiveQuery
    },
    decisionNote: form.decisionNote,
    noFakeSuccess: true,
    noLocalBalanceChange: true
  };
}

function StatusCard028AFix4(props: { title: string; value: string; note: string }) {
  return <div className="tf4Status"><span>{props.title}</span><strong>{props.value}</strong><small>{props.note}</small></div>;
}

function Field028AFix4(props: { label: string; value: string; onChange: (value: string) => void; placeholder?: string; wide?: boolean; textarea?: boolean }) {
  return <label className={props.wide ? "tf4Field tf4Wide" : "tf4Field"}>
    <span>{props.label}</span>
    {props.textarea ? <textarea value={props.value} placeholder={props.placeholder || ""} onChange={(event) => props.onChange(event.target.value)} /> : <input value={props.value} placeholder={props.placeholder || ""} onChange={(event) => props.onChange(event.target.value)} />}
  </label>;
}

export function TaxiFinanceStandalone028AFix4Panel({ language, config, setNotice }: Props028AFix4) {
  const [view, setView] = useState<View028AFix4>("owner");
  const [form, setForm] = useState<Form028AFix4>(emptyForm028AFix4);
  const [logs, setLogs] = useState<Log028AFix4[]>([]);
  const [queue, setQueue] = useState<Row028AFix4[]>([]);
  const [busy, setBusy] = useState("");
  const agentModel = useMemo(() => calcAgentModel028AFix4(form.driverRequestedAmount), [form.driverRequestedAmount]);
  const copy = language === "ru" ? {
    title: "Финансы такси",
    subtitle: "Отдельный большой модуль как мессенджер или стрим. Не внутри обычного такси. Управление агентскими счетами, переводами, чеками, водителями, отчётами и архивом.",
    owner: "Финансы владельца",
    agent: "Кабинет агента",
    reports: "Отчёты",
    archive: "Архив",
    proof: "Чек / доказательство обязательно",
    dynamic: "Валюта только динамически с сервера",
    noTaxi: "Не внутри Такси",
    noFake: "Без фейкового успеха",
    agentTransfer: "Перевод денег агенту",
    agentDriver: "Агент пополняет водителя",
    log: "Журнал сервера",
    queue: "Очередь и история",
    run: "Выполнить через сервер",
    serverError: "Сервер вернул ошибку",
    serverOk: "Сервер принял запрос"
  } : {
    title: "Taxi Finance",
    subtitle: "Standalone large module like Messenger or Stream. Not inside ordinary Taxi.",
    owner: "principal finance",
    agent: "Agent cabinet",
    reports: "Reports",
    archive: "Archive",
    proof: "Proof required",
    dynamic: "Dynamic currency only",
    noTaxi: "Not inside Taxi",
    noFake: "No local success",
    agentTransfer: "Agent funding transfer",
    agentDriver: "Agent tops up driver",
    log: "Server journal",
    queue: "Queue and history",
    run: "Run through server",
    serverError: "Server returned error",
    serverOk: "Server accepted request"
  };

  const update = (key: keyof Form028AFix4, value: string) => setForm((current) => ({ ...current, [key]: value }));
  const pushLog = (entry: Omit<Log028AFix4, "at" | "view">) => setLogs((current) => [{ ...entry, view, at: new Date().toISOString() }, ...current].slice(0, 30));

  async function callServer(pathKey: PathKey028AFix4, action: string) {
    const path = PATHS028AFix4[pathKey];
    setBusy(action);
    try {
      const response = await fetch(`${base028AFix4(config)}${path}`, {
        method: "POST",
        headers: headers028AFix4(config, form, view),
        body: JSON.stringify(payload028AFix4(form, view, action))
      });
      const text = await response.text();
      let parsed: any = null;
      try { parsed = text ? JSON.parse(text) : null; } catch { parsed = null; }
      if (Array.isArray(parsed?.rows)) setQueue(parsed.rows);
      pushLog({ action, path, status: response.status, ok: response.ok, actor: form.ownerId || form.trustedPersonId || form.agentId || "не указан", message: parsed?.message || parsed?.error || text || (response.ok ? copy.serverOk : copy.serverError) });
      setNotice(response.ok ? copy.serverOk : copy.serverError);
    } catch (error) {
      pushLog({ action, path, status: "network_error", ok: false, actor: form.ownerId || form.trustedPersonId || form.agentId || "не указан", message: error instanceof Error ? error.message : String(error) });
      setNotice(copy.serverError);
    } finally {
      setBusy("");
    }
  }

  const ActionButton = (props: { path: PathKey028AFix4; action: string; children: string }) => <button disabled={busy !== ""} onClick={() => callServer(props.path, props.action)}>{busy === props.action ? "Запрос..." : props.children}</button>;

  return <section className="tf4" data-taxi-finance-standalone-028a-fix4={TAXI_FINANCE_STANDALONE_028A_FIX4} data-not-inside-taxi="true" data-no-fixed-currency="true">
    <header className="tf4Hero">
      <div>
        <p className="tf4Eyebrow">Sabi Admin · отдельный модуль</p>
        <h1>{copy.title}</h1>
        <p>{copy.subtitle}</p>
      </div>
      <div className="tf4HeroCards">
        <StatusCard028AFix4 title="Доступ" value="Владелец и назначенные сотрудники" note="3–4 доверенных человека" />
        <StatusCard028AFix4 title="Валюта" value="С сервера" note="без фиксированной валюты" />
        <StatusCard028AFix4 title="Чек" value="Обязателен" note="иначе операция запрещена" />
      </div>
    </header>

    <nav className="tf4Tabs">
      <button className={view === "owner" ? "active" : ""} onClick={() => setView("owner")}>{copy.owner}</button>
      <button className={view === "agent" ? "active" : ""} onClick={() => setView("agent")}>{copy.agent}</button>
      <button className={view === "reports" ? "active" : ""} onClick={() => setView("reports")}>{copy.reports}</button>
      <button className={view === "archive" ? "active" : ""} onClick={() => setView("archive")}>{copy.archive}</button>
    </nav>

    {view === "owner" ? <div className="tf4Grid">
      <aside className="tf4Panel">
        <h2>Доступ владельца</h2>
        <Field028AFix4 label="Номер владельца" value={form.ownerId} onChange={(v) => update("ownerId", v)} />
        <Field028AFix4 label="Номер назначенного сотрудника" value={form.trustedPersonId} onChange={(v) => update("trustedPersonId", v)} />
        <ActionButton path="ownerAccess" action="owner_access_check">Проверить доступ</ActionButton>
        <p className="tf4Rule">Ручные операции доступны только владельцу и назначенным доверенным людям. Сервер обязан вернуть 403 всем остальным.</p>
      </aside>
      <main className="tf4Panel tf4Main">
        <h2>{copy.agentTransfer}</h2>
        <div className="tf4Fields3">
          <Field028AFix4 label="Номер агента" value={form.agentId} onChange={(v) => update("agentId", v)} />
          <Field028AFix4 label="Номер агентского счёта" value={form.agentAccountId} onChange={(v) => update("agentAccountId", v)} />
          <Field028AFix4 label="Номер договора агента" value={form.agentContractId} onChange={(v) => update("agentContractId", v)} />
          <Field028AFix4 label="Сумма перевода агента" value={form.agentFundingAmount} onChange={(v) => update("agentFundingAmount", v)} />
          <Field028AFix4 label="Исходная валюта / актив" value={form.sourceCurrency} onChange={(v) => update("sourceCurrency", v)} placeholder="выбирается/подтверждается сервером" />
          <Field028AFix4 label="Целевая валюта счёта" value={form.targetCurrency} onChange={(v) => update("targetCurrency", v)} placeholder="по стране агента с сервера" />
          <Field028AFix4 label="Курс" value={form.exchangeRate} onChange={(v) => update("exchangeRate", v)} />
          <Field028AFix4 label="Номер снимка курса" value={form.rateSnapshotId} onChange={(v) => update("rateSnapshotId", v)} />
          <Field028AFix4 label="Чек / proof номер" value={form.paymentProofId} onChange={(v) => update("paymentProofId", v)} />
          <Field028AFix4 label="Ссылка на чек / proof" value={form.paymentProofUrl} onChange={(v) => update("paymentProofUrl", v)} />
          <Field028AFix4 label="Reference перевода" value={form.transferReference} onChange={(v) => update("transferReference", v)} />
          <Field028AFix4 label="Хеш транзакции" value={form.transactionHash} onChange={(v) => update("transactionHash", v)} />
        </div>
        <div className="tf4Actions">
          <ActionButton path="ownerResolveAgent" action="owner_resolve_agent">Определить агента</ActionButton>
          <ActionButton path="ownerPrepareAgentFunding" action="owner_prepare_agent_funding">Подготовить зачисление агенту</ActionButton>
          <ActionButton path="ownerRequestAgentFundingApproval" action="owner_request_agent_funding_approval">Отправить на подтверждение</ActionButton>
        </div>
        <h2>Владелец может пополнить водителя</h2>
        <div className="tf4Fields3">
          <Field028AFix4 label="номер водителя" value={form.driverId} onChange={(v) => update("driverId", v)} />
          <Field028AFix4 label="номер баланса водителя" value={form.driverTopupId} onChange={(v) => update("driverTopupId", v)} />
          <Field028AFix4 label="Сумма водителю" value={form.driverRequestedAmount} onChange={(v) => update("driverRequestedAmount", v)} />
          <Field028AFix4 label="Страна водителя" value={form.driverResolvedCountry} onChange={(v) => update("driverResolvedCountry", v)} placeholder="сервер определяет по номер баланса" />
          <Field028AFix4 label="Валюта водителя" value={form.driverResolvedCurrency} onChange={(v) => update("driverResolvedCurrency", v)} placeholder="сервер определяет по номер баланса" />
          <Field028AFix4 label="Причина / решение" value={form.decisionNote} onChange={(v) => update("decisionNote", v)} />
        </div>
        <div className="tf4Actions">
          <ActionButton path="ownerResolveDriverTopup" action="owner_resolve_driver_topup">Определить страну и валюту</ActionButton>
          <ActionButton path="ownerPrepareDriverCredit" action="owner_prepare_driver_credit">Подготовить пополнение водителя</ActionButton>
          <ActionButton path="ownerRequestDriverCreditApproval" action="owner_request_driver_credit_approval">Отправить на подтверждение</ActionButton>
        </div>
      </main>
      <aside className="tf4Panel">
        <h2>Правила</h2>
        <ul className="tf4List">
          <li>{copy.noTaxi}</li>
          <li>{copy.dynamic}</li>
          <li>{copy.proof}</li>
          <li>{copy.noFake}</li>
          <li>Агент не пополняет сам себя</li>
          <li>Все действия в отчёт и архив</li>
        </ul>
      </aside>
    </div> : null}

    {view === "agent" ? <div className="tf4Grid tf4Agent">
      <aside className="tf4Panel"><h2>{copy.agent}</h2><Field028AFix4 label="ID агента" value={form.agentId} onChange={(v) => update("agentId", v)} /><Field028AFix4 label="Текущий агентский баланс" value={form.agentAvailableBalance} onChange={(v) => update("agentAvailableBalance", v)} /><ActionButton path="agentAccess" action="agent_access_check">Проверить доступ агента</ActionButton><ActionButton path="agentAssignedDrivers" action="agent_assigned_drivers">Мои водители</ActionButton><ActionButton path="agentBecomeAgentRequest" action="driver_apply_to_agent_program">Водитель хочет стать агентом</ActionButton></aside>
      <main className="tf4Panel tf4Main"><h2>{copy.agentDriver}</h2><div className="tf4Fields3"><Field028AFix4 label="ID водителя" value={form.driverId} onChange={(v) => update("driverId", v)} /><Field028AFix4 label="ID баланса водителя" value={form.driverTopupId} onChange={(v) => update("driverTopupId", v)} /><Field028AFix4 label="ID привязки к команде агента" value={form.driverTeamBindingId} onChange={(v) => update("driverTeamBindingId", v)} /><Field028AFix4 label="Сумма водителю" value={form.driverRequestedAmount} onChange={(v) => update("driverRequestedAmount", v)} /><Field028AFix4 label="Страна водителя" value={form.driverResolvedCountry} onChange={(v) => update("driverResolvedCountry", v)} placeholder="с сервера" /><Field028AFix4 label="Валюта водителя" value={form.driverResolvedCurrency} onChange={(v) => update("driverResolvedCurrency", v)} placeholder="с сервера" /></div><div className="tf4Calc"><div><span>Водитель получает</span><strong>{agentModel.requested || "—"}</strong></div><div><span>Комиссия агента</span><strong>{agentModel.commission || "—"}</strong></div><div><span>Списать с агента</span><strong>{agentModel.debit || "—"}</strong></div></div><div className="tf4Actions"><ActionButton path="agentResolveDriverTopup" action="agent_resolve_driver_topup">Определить валюту</ActionButton><ActionButton path="agentPrepareDriverTopup" action="agent_prepare_driver_topup">Подготовить пополнение</ActionButton><ActionButton path="agentRequestDriverTopupApproval" action="agent_request_driver_topup_approval">Отправить запрос</ActionButton></div></main>
      <aside className="tf4Panel"><h2>Ограничение агента</h2><p className="tf4Rule">Агент видит только свой баланс и своих водителей. Агент не может зачислить деньги на свой агентский счёт. Если агентского баланса недостаточно — сервер обязан отказать.</p></aside>
    </div> : null}

    {view === "reports" ? <div className="tf4Reports"><div className="tf4Panel"><h2>Ежедневный жёсткий отчёт</h2><Field028AFix4 label="Дата отчёта" value={form.reportDate} onChange={(v) => update("reportDate", v)} /><ActionButton path="dailyReport" action="daily_hard_report">Сформировать ежедневный отчёт</ActionButton></div><div className="tf4Panel"><h2>Ежемесячный отчёт агента</h2><Field028AFix4 label="Месяц" value={form.reportMonth} onChange={(v) => update("reportMonth", v)} /><ActionButton path="monthlyReport" action="monthly_agent_report">Сформировать месячный отчёт</ActionButton></div><div className="tf4Panel"><h2>Экспорт</h2><ActionButton path="exportReport" action="export_report">Экспортировать отчёт</ActionButton></div></div> : null}

    {view === "archive" ? <div className="tf4Reports"><div className="tf4Panel"><h2>Архив операций</h2><Field028AFix4 label="Поиск в архиве" value={form.archiveQuery} onChange={(v) => update("archiveQuery", v)} /><ActionButton path="archiveSearch" action="archive_search">Найти</ActionButton><ActionButton path="archiveOpen" action="archive_open">Открыть дело</ActionButton></div><div className="tf4Panel tf4Archive"><h2>{copy.queue}</h2>{queue.length ? queue.map((row, index) => <div className="tf4Row" key={`${row.id || row.agentId || row.driverId || index}`}><strong>{row.id || row.agentId || row.driverId || "запись"}</strong><span>{row.state || "статус с сервера"}</span><small>{row.amount || "—"} {row.currency || ""}</small></div>) : <p className="tf4Rule">Архив и история загружаются только с сервера.</p>}</div></div> : null}

    <footer className="tf4Footer"><div className="tf4Panel"><h2>{copy.log}</h2>{logs.length ? logs.map((log, index) => <div className={log.ok ? "tf4Log ok" : "tf4Log bad"} key={`${log.at}-${index}`}><strong>{log.action}</strong><span>{log.path}</span><small>{log.status} · {log.actor} · {log.at}</small><em>{log.message}</em></div>) : <p className="tf4Rule">Журнал пуст. Нажмите действие — ответ сервера появится здесь. Успех локально не создаётся.</p>}</div></footer>
  </section>;
}
