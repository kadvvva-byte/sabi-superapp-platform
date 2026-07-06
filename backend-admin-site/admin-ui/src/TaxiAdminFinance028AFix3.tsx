import { useMemo, useState } from "react";
import type { AdminApiConfig } from "./api";
import type { AdminLanguage } from "./admin-i18n";
import "./taxi-admin-finance028a-fix3.css";

type Props028AFix3 = { language: AdminLanguage; config: AdminApiConfig; setNotice: (message: string) => void };
type Screen028AFix3 = "owner" | "agent" | "reports" | "archive";
type ServerLog028AFix3 = { at: string; screen: string; action: string; path: string; code: number | string; ok: boolean; actor: string; message: string };
type QueueRow028AFix3 = { id?: string; type?: string; agentId?: string; driverId?: string; driverBalanceTopupId?: string; amount?: string; currency?: string; proofId?: string; state?: string; createdAt?: string };
type Report028AFix3 = { date?: string; month?: string; totalRequests?: number; approved?: number; rejected?: number; pendingProof?: number; archived?: number; agentMonthlyPayment?: number; risk?: string; rows?: QueueRow028AFix3[] };

type FinanceForm028AFix3 = {
  ownerId: string;
  trustedFinancePersonId: string;
  agentId: string;
  agentName: string;
  agentContractId: string;
  agentCountry: string;
  agentAccountId: string;
  agentSourceCurrency: string;
  agentSourceAmount: string;
  agentTargetCurrency: string;
  exchangeRate: string;
  rateSource: string;
  rateTimestamp: string;
  agentProofId: string;
  agentProofUrl: string;
  agentTransferReference: string;
  agentTxHash: string;
  agentMonthlyVolumeUsd: string;
  agentMonthlyContractPercent: string;
  driverId: string;
  driverName: string;
  driverBalanceTopupId: string;
  driverResolvedCountry: string;
  driverResolvedCurrency: string;
  driverTopupAmount: string;
  agentAvailableBalance: string;
  driverProofId: string;
  driverProofUrl: string;
  driverTeamBindingId: string;
  decisionNote: string;
  archiveSearch: string;
};

const TAXI_FINANCE_028A_FIX3_SEPARATE_OWNER_AGENT_SCREENS = "028A_FIX3_TAXI_FINANCE_SEPARATE_OWNER_AGENT_SCREENS_FULL_REPORT_ARCHIVE_NO_FAKE";
const OWNER_ACCESS_RULE_028A_FIX3 = "OWNER_AND_OWNER_ASSIGNED_THREE_FOUR_TRUSTED_FINANCE_PEOPLE_ONLY";
const AGENT_ACCESS_RULE_028A_FIX3 = "AGENT_CAN_ONLY_TOPUP_ASSIGNED_DRIVERS_FROM_OWN_POSITIVE_AGENT_BALANCE";

const SERVER_PATHS_028A_FIX3 = {
  ownerCheckAccess: "/api/admin/taxi-finance/owner/access/check",
  ownerLoadAgentQueue: "/api/admin/taxi-finance/owner/agent-funding/queue",
  ownerResolveAgent: "/api/admin/taxi-finance/owner/agent/resolve",
  ownerResolveDriverTopupId: "/api/admin/taxi-finance/owner/driver-topup-id/resolve",
  ownerPrepareAgentCredit: "/api/admin/taxi-finance/owner/agent-balance-credit/prepare",
  ownerRequestAgentCreditApproval: "/api/admin/taxi-finance/owner/agent-balance-credit/approval-request",
  ownerPrepareDriverCredit: "/api/admin/taxi-finance/owner/driver-balance-credit/prepare",
  ownerRequestDriverCreditApproval: "/api/admin/taxi-finance/owner/driver-balance-credit/approval-request",
  ownerCalculateMonthlyAgentPayment: "/api/admin/taxi-finance/owner/agent-monthly-payment/calculate",
  agentCheckAccess: "/api/agent/taxi-finance/access/check",
  agentLoadAssignedDrivers: "/api/agent/taxi-finance/assigned-drivers/list",
  agentResolveDriverTopupId: "/api/agent/taxi-finance/driver-topup-id/resolve",
  agentPrepareDriverTopup: "/api/agent/taxi-finance/driver-topup/prepare",
  agentRequestDriverTopupApproval: "/api/agent/taxi-finance/driver-topup/approval-request",
  reportDaily: "/api/admin/taxi-finance/reports/daily-hard-report",
  reportMonthly: "/api/admin/taxi-finance/reports/monthly-agent-report",
  reportExport: "/api/admin/taxi-finance/reports/export",
  archiveSearch: "/api/admin/taxi-finance/archive/search",
  archiveOpen: "/api/admin/taxi-finance/archive/open"
} as const;

type RouteKey028AFix3 = keyof typeof SERVER_PATHS_028A_FIX3;

const emptyForm028AFix3: FinanceForm028AFix3 = {
  ownerId: "",
  trustedFinancePersonId: "",
  agentId: "",
  agentName: "",
  agentContractId: "",
  agentCountry: "",
  agentAccountId: "",
  agentSourceCurrency: "USDT",
  agentSourceAmount: "",
  agentTargetCurrency: "UZS",
  exchangeRate: "",
  rateSource: "",
  rateTimestamp: "",
  agentProofId: "",
  agentProofUrl: "",
  agentTransferReference: "",
  agentTxHash: "",
  agentMonthlyVolumeUsd: "",
  agentMonthlyContractPercent: "",
  driverId: "",
  driverName: "",
  driverBalanceTopupId: "",
  driverResolvedCountry: "",
  driverResolvedCurrency: "",
  driverTopupAmount: "",
  agentAvailableBalance: "",
  driverProofId: "",
  driverProofUrl: "",
  driverTeamBindingId: "",
  decisionNote: "",
  archiveSearch: ""
};

function base028AFix3(config: AdminApiConfig): string {
  return String(config.baseUrl || "http://127.0.0.1:3000").replace(/\/$/, "");
}

function headers028AFix3(config: AdminApiConfig, form: FinanceForm028AFix3, screen: Screen028AFix3): Record<string, string> {
  return {
    "content-type": "application/json",
    "x-sabi-admin-token": config.token || "",
    "x-admin-token": config.token || "",
    "x-sabi-taxi-finance-owner-id": form.ownerId,
    "x-sabi-taxi-finance-trusted-person-id": form.trustedFinancePersonId,
    "x-sabi-taxi-finance-agent-id": form.agentId,
    "x-sabi-taxi-finance-screen": screen,
    "x-sabi-taxi-finance-owner-access-rule": OWNER_ACCESS_RULE_028A_FIX3,
    "x-sabi-taxi-finance-agent-access-rule": AGENT_ACCESS_RULE_028A_FIX3
  };
}

function readJson028AFix3(text: string): unknown {
  try { return text ? JSON.parse(text) : null; } catch { return null; }
}

function rows028AFix3(payload: unknown): QueueRow028AFix3[] {
  if (!payload || typeof payload !== "object") return [];
  const data = payload as { rows?: unknown; items?: unknown; queue?: unknown; drivers?: unknown; archive?: unknown };
  const raw = Array.isArray(data.rows) ? data.rows : Array.isArray(data.items) ? data.items : Array.isArray(data.queue) ? data.queue : Array.isArray(data.drivers) ? data.drivers : Array.isArray(data.archive) ? data.archive : [];
  return raw.filter((item): item is QueueRow028AFix3 => Boolean(item && typeof item === "object"));
}

function report028AFix3(payload: unknown): Report028AFix3 | null {
  if (!payload || typeof payload !== "object") return null;
  const data = payload as { report?: unknown };
  const raw = data.report || payload;
  return raw && typeof raw === "object" ? raw as Report028AFix3 : null;
}

function amount028AFix3(value: string): number {
  const parsed = Number(String(value || "").replace(/\s/g, "").replace(",", "."));
  return Number.isFinite(parsed) ? parsed : 0;
}

function percent028AFix3(value: string, fallback: number): number {
  const parsed = amount028AFix3(value);
  return parsed > 0 ? parsed : fallback;
}

function display028AFix3(value: unknown): string {
  return typeof value === "string" && value.trim() ? value : "—";
}

function monthlyPercentByContract028AFix3(volumeUsd: number, ownerPercent: string): number {
  const custom = amount028AFix3(ownerPercent);
  if (custom > 0) return custom;
  if (volumeUsd > 2500) return 5;
  if (volumeUsd >= 1000) return 10;
  return 0;
}

function monthlyTier028AFix3(volumeUsd: number): string {
  if (volumeUsd > 2500) return "выше 2500 $ — 5% по договору";
  if (volumeUsd >= 1000) return "от 1000 до 2500 $ — до 10% по договору";
  return "ниже 1000 $ — только по отдельному договору владельца";
}

export function TaxiAdminFinance028AFix3({ config, setNotice }: Props028AFix3) {
  const [screen, setScreen] = useState<Screen028AFix3>("owner");
  const [form, setForm] = useState<FinanceForm028AFix3>(emptyForm028AFix3);
  const [trustedPeople, setTrustedPeople] = useState<string[]>([]);
  const [trustedInput, setTrustedInput] = useState("");
  const [queue, setQueue] = useState<QueueRow028AFix3[]>([]);
  const [assignedDrivers, setAssignedDrivers] = useState<QueueRow028AFix3[]>([]);
  const [archiveRows, setArchiveRows] = useState<QueueRow028AFix3[]>([]);
  const [dailyReport, setDailyReport] = useState<Report028AFix3 | null>(null);
  const [monthlyReport, setMonthlyReport] = useState<Report028AFix3 | null>(null);
  const [busyAction, setBusyAction] = useState("");
  const [serverLog, setServerLog] = useState<ServerLog028AFix3[]>([]);

  const agentCreditAmount = amount028AFix3(form.agentSourceAmount) * amount028AFix3(form.exchangeRate);
  const driverTopup = amount028AFix3(form.driverTopupAmount);
  const agentCommission = driverTopup * 0.02;
  const agentDebit = Math.max(driverTopup - agentCommission, 0);
  const agentBalance = amount028AFix3(form.agentAvailableBalance);
  const agentBalanceEnough = agentBalance >= agentDebit && agentDebit > 0;
  const monthlyVolumeUsd = amount028AFix3(form.agentMonthlyVolumeUsd);
  const monthlyPercent = monthlyPercentByContract028AFix3(monthlyVolumeUsd, form.agentMonthlyContractPercent);
  const monthlyPaymentUsd = monthlyVolumeUsd * monthlyPercent / 100;
  const ownerAccessReady = Boolean(form.ownerId.trim() && (form.trustedFinancePersonId.trim() || trustedPeople.length > 0));
  const agentFundingProofReady = Boolean((form.agentProofId.trim() || form.agentProofUrl.trim() || form.agentTxHash.trim()) && form.agentSourceAmount.trim() && form.exchangeRate.trim() && form.rateTimestamp.trim());
  const driverTopupProofReady = Boolean((form.driverProofId.trim() || form.driverProofUrl.trim() || form.agentProofId.trim()) && form.agentId.trim() && form.driverId.trim() && form.driverBalanceTopupId.trim() && form.driverTeamBindingId.trim() && agentBalanceEnough);

  const readiness = useMemo(() => {
    const checks = [ownerAccessReady, trustedPeople.length > 0, form.agentId, form.agentContractId, form.agentSourceCurrency, form.agentSourceAmount, form.agentTargetCurrency, form.exchangeRate, form.rateTimestamp, form.agentProofId || form.agentProofUrl || form.agentTxHash, form.driverId, form.driverBalanceTopupId, form.driverTeamBindingId, form.driverTopupAmount, agentBalanceEnough, form.driverProofId || form.driverProofUrl, form.agentMonthlyVolumeUsd, form.decisionNote];
    return Math.round((checks.filter(Boolean).length / checks.length) * 100);
  }, [agentBalanceEnough, form.agentContractId, form.agentId, form.agentMonthlyVolumeUsd, form.agentProofId, form.agentProofUrl, form.agentSourceAmount, form.agentSourceCurrency, form.agentTargetCurrency, form.agentTxHash, form.decisionNote, form.driverBalanceTopupId, form.driverId, form.driverProofId, form.driverProofUrl, form.driverTeamBindingId, form.driverTopupAmount, form.exchangeRate, form.rateTimestamp, ownerAccessReady, trustedPeople.length]);

  const setField = (key: keyof FinanceForm028AFix3, value: string) => setForm((prev) => ({ ...prev, [key]: value }));
  const pushLog = (event: ServerLog028AFix3) => setServerLog((prev) => [event, ...prev].slice(0, 100));

  const addTrustedPerson = () => {
    const next = trustedInput.trim();
    if (!next || trustedPeople.includes(next) || trustedPeople.length >= 4) return;
    setTrustedPeople((prev) => [...prev, next]);
    setTrustedInput("");
  };

  const sendToServer = async (action: string, routeKey: RouteKey028AFix3, extra: Record<string, unknown> = {}) => {
    const path = SERVER_PATHS_028A_FIX3[routeKey];
    setBusyAction(action);
    try {
      const response = await fetch(`${base028AFix3(config)}${path}`, {
        method: "POST",
        headers: headers028AFix3(config, form, screen),
        body: JSON.stringify({
          module: "taxi_finance_028a_fix3_separate_owner_agent_screens",
          action,
          screen,
          separateLargeTaxiFinanceProject: true,
          notInsideOrdinaryTaxiScreen: true,
          oldTaxiBalanceScreenRemoved: true,
          ownerFinanceScreen: {
            canCreditAgentBalance: true,
            canCreditDriverBalanceUnderProtectedRule: true,
            access: OWNER_ACCESS_RULE_028A_FIX3,
            trustedPeopleLimit: "3-4"
          },
          agentScreen: {
            canCreditOwnAgentBalance: false,
            canTopupOnlyAssignedTaxiDrivers: true,
            access: AGENT_ACCESS_RULE_028A_FIX3
          },
          taxiDriverCanBecomeAgent: true,
          receiptProofRequiredForEveryTopup: true,
          directDriverTopupWithoutProofForbidden: true,
          noLocalBalanceChange: true,
          noFakeSuccess: true,
          fullReportAndArchiveRequired: true,
          agentCommissionModel: {
            driverCredit: driverTopup,
            agentCommission,
            agentBalanceDebit: agentDebit,
            rule: "водитель получает 100%, с агента списывается 98%, 2% остаётся агенту"
          },
          monthlyAgentPaymentContract: {
            separateFromTwoPercentCommission: true,
            monthlyVolumeUsd,
            monthlyPercent,
            monthlyPaymentUsd,
            tier: monthlyTier028AFix3(monthlyVolumeUsd),
            ownerConfigurable: true,
            contractId: form.agentContractId
          },
          fxAndProof: {
            sourceCurrency: form.agentSourceCurrency,
            sourceAmount: form.agentSourceAmount,
            targetCurrency: form.agentTargetCurrency,
            exchangeRate: form.exchangeRate,
            rateSource: form.rateSource,
            rateTimestamp: form.rateTimestamp,
            creditedAmount: agentCreditAmount,
            receiptProofId: form.agentProofId,
            receiptProofUrl: form.agentProofUrl,
            transferReference: form.agentTransferReference,
            txHash: form.agentTxHash
          },
          driverTopup: {
            driverId: form.driverId,
            driverName: form.driverName,
            driverBalanceTopupId: form.driverBalanceTopupId,
            resolvedCountry: form.driverResolvedCountry,
            resolvedCurrency: form.driverResolvedCurrency,
            topupAmount: form.driverTopupAmount,
            agentAvailableBalance: form.agentAvailableBalance,
            agentBalanceEnough,
            proofId: form.driverProofId,
            proofUrl: form.driverProofUrl,
            teamBindingId: form.driverTeamBindingId
          },
          trustedPeople,
          form,
          ...extra
        })
      });
      const text = await response.text();
      const payload = readJson028AFix3(text);
      pushLog({ at: new Date().toISOString(), screen, action, path, code: response.status, ok: response.ok, actor: form.trustedFinancePersonId || form.agentId || form.ownerId || "—", message: response.ok ? "Сервер принял запрос" : text.slice(0, 600) });
      if (routeKey === "ownerLoadAgentQueue") setQueue(rows028AFix3(payload));
      if (routeKey === "agentLoadAssignedDrivers") setAssignedDrivers(rows028AFix3(payload));
      if (routeKey === "archiveSearch" || routeKey === "archiveOpen") setArchiveRows(rows028AFix3(payload));
      if (routeKey === "reportDaily") setDailyReport(report028AFix3(payload));
      if (routeKey === "reportMonthly") setMonthlyReport(report028AFix3(payload));
      if (!response.ok) setNotice("Сервер вернул ошибку. Баланс не менялся, фейкового успеха нет.");
      if (response.ok) setNotice("Ответ сервера получен и записан в журнал. Локально баланс не менялся.");
    } catch (error) {
      pushLog({ at: new Date().toISOString(), screen, action, path, code: "network_error", ok: false, actor: form.trustedFinancePersonId || form.agentId || form.ownerId || "—", message: error instanceof Error ? error.message : "Ошибка сети" });
      setNotice("Ошибка связи с сервером. Баланс не менялся.");
    } finally {
      setBusyAction("");
    }
  };

  const input = (label: string, key: keyof FinanceForm028AFix3, placeholder = "") => (
    <label className="tf028a3Field">
      <span>{label}</span>
      <input value={form[key]} onChange={(event) => setField(key, event.target.value)} placeholder={placeholder} />
    </label>
  );

  const textarea = (label: string, key: keyof FinanceForm028AFix3, placeholder = "") => (
    <label className="tf028a3Field tf028a3Wide">
      <span>{label}</span>
      <textarea value={form[key]} onChange={(event) => setField(key, event.target.value)} placeholder={placeholder} />
    </label>
  );

  return (
    <section className="tf028a3" data-taxi-finance-028a-fix3={TAXI_FINANCE_028A_FIX3_SEPARATE_OWNER_AGENT_SCREENS}>
      <div className="tf028a3Hero">
        <div>
          <p className="tf028a3Eyebrow">Отдельный большой проект, не внутри обычного Такси</p>
          <h2>Финансы такси — агентские счета, водители, отчёты и архив</h2>
          <p>Сделано как простой перевод денег: кто отправил, сколько, в какой валюте, какой курс, какой чек, кто подтвердил, где отчёт и архив.</p>
        </div>
        <div className="tf028a3Score"><b>{readiness}%</b><span>готовность данных</span></div>
      </div>

      <div className="tf028a3Nav" role="tablist" aria-label="Финансы такси">
        <button type="button" className={screen === "owner" ? "tf028a3Active" : ""} onClick={() => setScreen("owner")}>Владелец: агентские счета</button>
        <button type="button" className={screen === "agent" ? "tf028a3Active" : ""} onClick={() => setScreen("agent")}>Экран агента: мои водители</button>
        <button type="button" className={screen === "reports" ? "tf028a3Active" : ""} onClick={() => setScreen("reports")}>Отчёты</button>
        <button type="button" className={screen === "archive" ? "tf028a3Active" : ""} onClick={() => setScreen("archive")}>Архив</button>
      </div>

      <div className="tf028a3Rules">
        <span>Без чека нельзя</span>
        <span>Агент не пополняет свой агентский счёт</span>
        <span>Агент пополняет только своих водителей</span>
        <span>Водитель может стать агентом</span>
        <span>Отчёт и архив обязательны</span>
      </div>

      {screen === "owner" && (
        <div className="tf028a3Layout">
          <aside className="tf028a3Panel">
            <h3>Доступ владельца</h3>
            {input("egasi ID", "ownerId", "owner-001")}
            {input("Назначенный доверенный человек", "trustedFinancePersonId", "finance-manager-001")}
            <label className="tf028a3Field"><span>Добавить доверенного, максимум 4</span><div className="tf028a3Inline"><input value={trustedInput} onChange={(event) => setTrustedInput(event.target.value)} placeholder="finance-manager-002" /><button type="button" onClick={addTrustedPerson} disabled={trustedPeople.length >= 4}>Добавить</button></div></label>
            <div className="tf028a3Tags">{trustedPeople.length ? trustedPeople.map((item) => <span key={item}>{item}</span>) : <em>Список ещё пуст</em>}</div>
            <button type="button" onClick={() => sendToServer("Проверить доступ владельца", "ownerCheckAccess")} disabled={busyAction !== ""}>Проверить доступ</button>
            <button type="button" onClick={() => sendToServer("Загрузить очередь агентских переводов", "ownerLoadAgentQueue")} disabled={busyAction !== ""}>Очередь переводов</button>
          </aside>

          <main className="tf028a3Panel tf028a3Main">
            <h3>1. Пополнить агентский счёт</h3>
            <div className="tf028a3Grid">
              {input("Номер агента", "agentId", "agent-001")}
              {input("Имя агента", "agentName", "Агент")}
              {input("Номер договора агента", "agentContractId", "contract-001")}
              {input("Страна агента", "agentCountry", "UZ")}
              {input("Номер агентского счёта", "agentAccountId", "agent-account-001")}
              {input("Исходная валюта", "agentSourceCurrency", "USDT / USD")}
              {input("Сумма перевода", "agentSourceAmount", "100")}
              {input("Валюта зачисления", "agentTargetCurrency", "UZS / RUB / CNY")}
              {input("Курс", "exchangeRate", "12500")}
              {input("Источник курса", "rateSource", "курс владельца / банк")}
              {input("Время курса", "rateTimestamp", "2026-06-15T12:00:00Z")}
              {input("Номер чека / подтверждение", "agentProofId", "proof-001")}
              {input("Ссылка на чек", "agentProofUrl", "https://...")}
              {input("Код банка / перевод", "agentTransferReference", "bank-ref-001")}
              {input("TxHash", "agentTxHash", "0x...")}
            </div>
            <div className="tf028a3TransferCard">
              <div><span>Агент перевёл</span><b>{form.agentSourceAmount || "0"} {form.agentSourceCurrency}</b></div>
              <div><span>Курс</span><b>{form.exchangeRate || "—"}</b></div>
              <div><span>Зачислить агенту</span><b>{agentCreditAmount.toLocaleString("ru-RU")} {form.agentTargetCurrency}</b></div>
              <div><span>Чек</span><b>{agentFundingProofReady ? "приложен" : "обязателен"}</b></div>
            </div>
            <div className="tf028a3Actions">
              <button type="button" onClick={() => sendToServer("Определить агента и договор", "ownerResolveAgent")} disabled={busyAction !== ""}>Определить агента</button>
              <button type="button" onClick={() => sendToServer("Подготовить зачисление агенту", "ownerPrepareAgentCredit", { agentFundingProofReady })} disabled={busyAction !== ""}>Подготовить зачисление</button>
              <button type="button" onClick={() => sendToServer("Запросить подтверждение зачисления агенту", "ownerRequestAgentCreditApproval", { agentFundingProofReady })} disabled={busyAction !== ""}>Подтвердить через сервер</button>
            </div>

            <h3>2. Владелец может пополнить и водителя</h3>
            <p className="tf028a3Muted">Это доступно только владельцу/назначенному человеку. Агент так делать не может, агент работает только со своими водителями.</p>
            <div className="tf028a3Grid">
              {input("Номер водителя", "driverId", "driver-001")}
              {input("Имя водителя", "driverName", "Водитель")}
              {input("Номер пополнения водителя", "driverBalanceTopupId", "UZ-TOPUP-001")}
              {input("Страна по номеру", "driverResolvedCountry", "автоматически")}
              {input("Валюта по номеру", "driverResolvedCurrency", "автоматически")}
              {input("Сумма водителю", "driverTopupAmount", "100000")}
              {input("Чек операции", "driverProofId", "proof-driver-001")}
              {input("Ссылка на чек", "driverProofUrl", "https://...")}
            </div>
            <div className="tf028a3Actions">
              <button type="button" onClick={() => sendToServer("Определить страну и валюту водителя", "ownerResolveDriverTopupId")} disabled={busyAction !== ""}>Определить страну/валюту</button>
              <button type="button" onClick={() => sendToServer("Подготовить пополнение водителя владельцем", "ownerPrepareDriverCredit", { driverTopupProofReady })} disabled={busyAction !== ""}>Подготовить пополнение</button>
              <button type="button" onClick={() => sendToServer("Запросить подтверждение пополнения водителя владельцем", "ownerRequestDriverCreditApproval", { driverTopupProofReady })} disabled={busyAction !== ""}>Подтвердить через сервер</button>
            </div>
          </main>

          <aside className="tf028a3Panel">
            <h3>Месячная оплата агента</h3>
            {input("Месячный объём в $", "agentMonthlyVolumeUsd", "2500")}
            {input("Процент по договору", "agentMonthlyContractPercent", "10 или 5")}
            <div className="tf028a3Monthly"><span>{monthlyTier028AFix3(monthlyVolumeUsd)}</span><b>{monthlyPercent}%</b><strong>{monthlyPaymentUsd.toLocaleString("ru-RU")} $</strong><small>Отдельно от комиссии 2% за пополнение водителей.</small></div>
            <button type="button" onClick={() => sendToServer("Рассчитать месячную оплату агента", "ownerCalculateMonthlyAgentPayment")} disabled={busyAction !== ""}>Рассчитать</button>
            {textarea("Решение / комментарий", "decisionNote", "Почему подтверждаем или отклоняем")}
          </aside>
        </div>
      )}

      {screen === "agent" && (
        <div className="tf028a3Layout tf028a3AgentLayout">
          <aside className="tf028a3Panel">
            <h3>Агентский экран</h3>
            {input("Номер агента", "agentId", "agent-001")}
            {input("Номер агентского счёта", "agentAccountId", "agent-account-001")}
            {input("Доступный баланс агента", "agentAvailableBalance", "98000")}
            <button type="button" onClick={() => sendToServer("Проверить доступ агента", "agentCheckAccess")} disabled={busyAction !== ""}>Проверить доступ</button>
            <button type="button" onClick={() => sendToServer("Загрузить моих водителей", "agentLoadAssignedDrivers")} disabled={busyAction !== ""}>Мои водители</button>
            <p className="tf028a3Muted">Агент не может пополнить свой агентский счёт. Он пополняет только своих привязанных водителей.</p>
          </aside>
          <main className="tf028a3Panel tf028a3Main">
            <h3>Простой перевод водителю</h3>
            <div className="tf028a3Grid">
              {input("Номер водителя", "driverId", "driver-001")}
              {input("Имя водителя", "driverName", "Водитель")}
              {input("Привязка водитель ↔ агент", "driverTeamBindingId", "team-binding-001")}
              {input("Номер пополнения водителя", "driverBalanceTopupId", "UZ-TOPUP-001")}
              {input("Страна", "driverResolvedCountry", "автоматически")}
              {input("Валюта", "driverResolvedCurrency", "автоматически")}
              {input("Сумма водителю", "driverTopupAmount", "100000")}
              {input("Чек / доказательство", "driverProofId", "proof-driver-001")}
              {input("Ссылка на чек", "driverProofUrl", "https://...")}
            </div>
            <div className="tf028a3TransferCard tf028a3Green">
              <div><span>Водитель получает</span><b>{driverTopup.toLocaleString("ru-RU")} {form.driverResolvedCurrency || form.agentTargetCurrency}</b></div>
              <div><span>Комиссия агента 2%</span><b>{agentCommission.toLocaleString("ru-RU")}</b></div>
              <div><span>Списать с агента</span><b>{agentDebit.toLocaleString("ru-RU")}</b></div>
              <div><span>Баланс агента</span><b>{agentBalanceEnough ? "достаточно" : "недостаточно"}</b></div>
            </div>
            <div className="tf028a3Actions">
              <button type="button" onClick={() => sendToServer("Определить страну и валюту по номеру", "agentResolveDriverTopupId")} disabled={busyAction !== ""}>Определить страну/валюту</button>
              <button type="button" onClick={() => sendToServer("Подготовить перевод водителю", "agentPrepareDriverTopup", { driverTopupProofReady })} disabled={busyAction !== ""}>Подготовить перевод</button>
              <button type="button" onClick={() => sendToServer("Запросить подтверждение перевода водителю", "agentRequestDriverTopupApproval", { driverTopupProofReady })} disabled={busyAction !== ""}>Отправить через сервер</button>
            </div>
          </main>
          <aside className="tf028a3Panel">
            <h3>Мои водители</h3>
            {assignedDrivers.length ? assignedDrivers.slice(0, 8).map((row, index) => <div className="tf028a3Row" key={`${row.driverId || index}`}><b>{display028AFix3(row.driverId)}</b><span>{display028AFix3(row.driverBalanceTopupId)}</span><small>{display028AFix3(row.state)}</small></div>) : <p className="tf028a3Muted">Список загрузится с сервера. Локального списка нет.</p>}
          </aside>
        </div>
      )}

      {screen === "reports" && (
        <div className="tf028a3ReportsOnly">
          <div className="tf028a3Panel"><h3>Ежедневный жёсткий отчёт</h3><button type="button" onClick={() => sendToServer("Загрузить ежедневный отчёт", "reportDaily")} disabled={busyAction !== ""}>Загрузить</button><p>{dailyReport ? `${dailyReport.date || "день"} · заявок ${dailyReport.totalRequests || 0} · риск ${dailyReport.risk || "—"}` : "Не загружен"}</p></div>
          <div className="tf028a3Panel"><h3>Ежемесячный отчёт агента</h3><button type="button" onClick={() => sendToServer("Загрузить ежемесячный отчёт", "reportMonthly")} disabled={busyAction !== ""}>Загрузить</button><p>{monthlyReport ? `${monthlyReport.month || "месяц"} · выплата ${monthlyReport.agentMonthlyPayment || 0}` : "Не загружен"}</p></div>
          <div className="tf028a3Panel"><h3>Экспорт отчёта</h3><button type="button" onClick={() => sendToServer("Экспортировать отчёт", "reportExport")} disabled={busyAction !== ""}>Экспортировать через сервер</button><p className="tf028a3Muted">Экспорт создаёт серверный архив и запись аудита. Локального файла успеха нет.</p></div>
        </div>
      )}

      {screen === "archive" && (
        <div className="tf028a3ReportsOnly">
          <div className="tf028a3Panel"><h3>Поиск в архиве</h3>{input("ID / агент / водитель / чек", "archiveSearch", "proof-001") }<button type="button" onClick={() => sendToServer("Поиск архива", "archiveSearch")} disabled={busyAction !== ""}>Найти</button><button type="button" onClick={() => sendToServer("Открыть запись архива", "archiveOpen")} disabled={busyAction !== ""}>Открыть запись</button></div>
          <div className="tf028a3Panel tf028a3ArchiveList"><h3>Архивные записи</h3>{archiveRows.length ? archiveRows.slice(0, 12).map((row, index) => <div className="tf028a3Row" key={`${row.id || index}`}><b>{display028AFix3(row.id)}</b><span>{display028AFix3(row.type)} · {display028AFix3(row.agentId)} · {display028AFix3(row.driverId)}</span><small>{display028AFix3(row.proofId)} · {display028AFix3(row.createdAt)}</small></div>) : <p className="tf028a3Muted">Архив загружается только с сервера.</p>}</div>
          <div className="tf028a3Panel"><h3>Что хранит архив</h3><p>Чек, proof, TxHash, сумма, валюта, курс, агент, водитель, номер пополнения, договор, решение, route, status, error, время, отчёт.</p></div>
        </div>
      )}

      <div className="tf028a3FooterGrid">
        <div className="tf028a3Panel"><h3>Очередь владельца</h3>{queue.length ? queue.slice(0, 6).map((row, index) => <div className="tf028a3Row" key={`${row.id || index}`}><b>{display028AFix3(row.agentId)}</b><span>{display028AFix3(row.amount)} {display028AFix3(row.currency)}</span><small>{display028AFix3(row.proofId)} · {display028AFix3(row.state)}</small></div>) : <p className="tf028a3Muted">Очередь не загружена.</p>}</div>
        <div className="tf028a3Panel tf028a3Log"><h3>Журнал сервера</h3>{serverLog.length ? serverLog.map((row, index) => <div className="tf028a3LogLine" key={`${row.at}-${index}`}><b>{row.action}</b><span>{row.path}</span><small>{row.code} · {row.ok ? "принято" : "ошибка"} · {row.actor} · {row.at}</small><em>{row.message}</em></div>) : <p className="tf028a3Muted">Нажмите действие. Если сервер не готов — будет ошибка, не фейковый успех.</p>}</div>
      </div>
    </section>
  );
}
