import { useMemo, useState } from "react";
import type { AdminApiConfig } from "./api";
import type { AdminLanguage } from "./admin-i18n";
import "./taxi-admin-finance028a-fix1.css";

type Props028AFix1 = { language: AdminLanguage; config: AdminApiConfig; setNotice: (message: string) => void };
type ServerLog028AFix1 = { at: string; action: string; path: string; code: number | string; ok: boolean; operator: string; message: string };
type AgentFundingRow028AFix1 = { id?: string; agentId?: string; sourceCurrency?: string; targetCurrency?: string; sentAmount?: string; creditedAmount?: string; rate?: string; receiptProofId?: string; state?: string; operatorId?: string };
type DailyReport028AFix1 = { date?: string; totalAgentFunding?: number; approvedFunding?: number; driverTopups?: number; receiptMissing?: number; risk?: string; rows?: AgentFundingRow028AFix1[] };

type FinanceForm028AFix1 = {
  ownerId: string;
  trustedManagerId: string;
  agentId: string;
  agentCountry: string;
  agentBalanceAccountId: string;
  sourceCurrency: string;
  sourceAmount: string;
  targetCurrency: string;
  exchangeRate: string;
  rateSource: string;
  rateTime: string;
  receiptProofId: string;
  receiptFileUrl: string;
  transferReference: string;
  txHash: string;
  driverId: string;
  driverBalanceTopupId: string;
  driverCountry: string;
  driverCurrency: string;
  requestedDriverAmount: string;
  agentAvailableBalance: string;
  driverReceiptProofId: string;
  driverReceiptUrl: string;
  verificationNote: string;
  approvalNote: string;
};

const TAXI_FINANCE_028A_FIX1_STANDALONE_AGENT_BALANCE = "028A_FIX1_ОТДЕЛЬНЫЙ_МОДУЛЬ_ФИНАНСЫ_ТАКСИ_АГЕНТСКИЙ_БАЛАНС";

const SERVER_PATHS_028A_FIX1 = {
  checkAccess: "/api/admin/taxi-finance/access/check",
  loadAgentFundingQueue: "/api/admin/taxi-finance/agent-funding/list",
  resolveDriverBalanceIdentity: "/api/admin/taxi-finance/driver-balance/resolve",
  prepareAgentFunding: "/api/admin/taxi-finance/agent-funding/prepare",
  requestAgentFundingApproval: "/api/admin/taxi-finance/agent-funding/approval-request",
  prepareAgentDriverTopup: "/api/admin/taxi-finance/agent-driver-topup/prepare",
  requestAgentDriverTopupApproval: "/api/admin/taxi-finance/agent-driver-topup/approval-request",
  loadDailyHardReport: "/api/admin/taxi-finance/daily-hard-report/load",
  exportDailyHardReport: "/api/admin/taxi-finance/daily-hard-report/export"
} as const;

type RouteKey028AFix1 = keyof typeof SERVER_PATHS_028A_FIX1;

const emptyForm028AFix1: FinanceForm028AFix1 = {
  ownerId: "",
  trustedManagerId: "",
  agentId: "",
  agentCountry: "",
  agentBalanceAccountId: "",
  sourceCurrency: "USDT",
  sourceAmount: "",
  targetCurrency: "UZS",
  exchangeRate: "",
  rateSource: "",
  rateTime: "",
  receiptProofId: "",
  receiptFileUrl: "",
  transferReference: "",
  txHash: "",
  driverId: "",
  driverBalanceTopupId: "",
  driverCountry: "",
  driverCurrency: "",
  requestedDriverAmount: "",
  agentAvailableBalance: "",
  driverReceiptProofId: "",
  driverReceiptUrl: "",
  verificationNote: "",
  approvalNote: ""
};

function base028AFix1(config: AdminApiConfig): string {
  return String(config.baseUrl || "http://127.0.0.1:3000").replace(/\/$/, "");
}

function headers028AFix1(config: AdminApiConfig, form: FinanceForm028AFix1): Record<string, string> {
  return {
    "content-type": "application/json",
    "x-sabi-admin-token": config.token || "",
    "x-admin-token": config.token || "",
    "x-sabi-taxi-finance-owner-id": form.ownerId,
    "x-sabi-taxi-finance-trusted-manager-id": form.trustedManagerId,
    "x-sabi-taxi-finance-access-scope": "owner_or_owner_assigned_three_four_only"
  };
}

function readJson028AFix1(text: string): unknown {
  try { return text ? JSON.parse(text) : null; } catch { return null; }
}

function rows028AFix1(payload: unknown): AgentFundingRow028AFix1[] {
  if (!payload || typeof payload !== "object") return [];
  const data = payload as { rows?: unknown; items?: unknown; queue?: unknown };
  const raw = Array.isArray(data.rows) ? data.rows : Array.isArray(data.items) ? data.items : Array.isArray(data.queue) ? data.queue : [];
  return raw.filter((item): item is AgentFundingRow028AFix1 => Boolean(item && typeof item === "object"));
}

function report028AFix1(payload: unknown): DailyReport028AFix1 | null {
  if (!payload || typeof payload !== "object") return null;
  const data = payload as { report?: unknown };
  const raw = data.report || payload;
  return raw && typeof raw === "object" ? raw as DailyReport028AFix1 : null;
}

function money028AFix1(value: string): number {
  const normalized = String(value || "").replace(/\s/g, "").replace(",", ".");
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
}

function value028AFix1(value: unknown): string {
  return typeof value === "string" && value.trim() ? value : "—";
}

export function TaxiAdminFinance028AFix1({ config, setNotice }: Props028AFix1) {
  const [form, setForm] = useState<FinanceForm028AFix1>(emptyForm028AFix1);
  const [trustedPeople, setTrustedPeople] = useState<string[]>([]);
  const [trustedInput, setTrustedInput] = useState("");
  const [queue, setQueue] = useState<AgentFundingRow028AFix1[]>([]);
  const [dailyReport, setDailyReport] = useState<DailyReport028AFix1 | null>(null);
  const [busyAction, setBusyAction] = useState("");
  const [serverLog, setServerLog] = useState<ServerLog028AFix1[]>([]);

  const requestedAmount = money028AFix1(form.requestedDriverAmount);
  const agentCommission = requestedAmount * 0.02;
  const agentDebit = Math.max(requestedAmount - agentCommission, 0);
  const agentAvailable = money028AFix1(form.agentAvailableBalance);
  const hasEnoughAgentBalance = agentAvailable >= agentDebit && agentDebit > 0;
  const creditedAmount = money028AFix1(form.sourceAmount) * money028AFix1(form.exchangeRate);
  const accessReady = Boolean(form.ownerId.trim() && (form.trustedManagerId.trim() || trustedPeople.length > 0));
  const fundingProofReady = Boolean((form.receiptProofId.trim() || form.receiptFileUrl.trim() || form.txHash.trim()) && form.sourceAmount.trim() && form.targetCurrency.trim() && form.exchangeRate.trim() && form.rateTime.trim());
  const driverTopupProofReady = Boolean((form.driverReceiptProofId.trim() || form.driverReceiptUrl.trim() || form.receiptProofId.trim()) && form.agentId.trim() && form.driverBalanceTopupId.trim() && form.requestedDriverAmount.trim() && hasEnoughAgentBalance);

  const readiness = useMemo(() => {
    const checks = [accessReady, trustedPeople.length > 0, form.agentId, form.sourceCurrency, form.sourceAmount, form.targetCurrency, form.exchangeRate, form.rateTime, form.receiptProofId || form.receiptFileUrl || form.txHash, form.driverBalanceTopupId, form.driverCurrency || form.targetCurrency, form.requestedDriverAmount, hasEnoughAgentBalance, form.verificationNote, form.approvalNote];
    return Math.round((checks.filter(Boolean).length / checks.length) * 100);
  }, [accessReady, form.agentId, form.approvalNote, form.driverBalanceTopupId, form.driverCurrency, form.exchangeRate, form.rateTime, form.receiptFileUrl, form.receiptProofId, form.requestedDriverAmount, form.sourceAmount, form.sourceCurrency, form.targetCurrency, form.txHash, form.verificationNote, hasEnoughAgentBalance, trustedPeople.length]);

  const updateForm = (key: keyof FinanceForm028AFix1, value: string) => setForm((prev) => ({ ...prev, [key]: value }));
  const pushLog = (event: ServerLog028AFix1) => setServerLog((prev) => [event, ...prev].slice(0, 60));

  const addTrusted = () => {
    const next = trustedInput.trim();
    if (!next || trustedPeople.includes(next) || trustedPeople.length >= 4) return;
    setTrustedPeople((prev) => [...prev, next]);
    setTrustedInput("");
  };

  const sendToServer = async (action: string, routeKey: RouteKey028AFix1, extra: Record<string, unknown> = {}) => {
    const path = SERVER_PATHS_028A_FIX1[routeKey];
    setBusyAction(action);
    try {
      const response = await fetch(`${base028AFix1(config)}${path}`, {
        method: "POST",
        headers: headers028AFix1(config, form),
        body: JSON.stringify({
          module: "taxi_finance_agent_balance_028a_fix1",
          action,
          accessRule: "only_owner_and_owner_assigned_three_four_trusted_people",
          ordinaryTaxiBalanceScreenRemoved: true,
          standaloneTaxiFinanceModule: true,
          receiptProofRequiredForEveryTopup: true,
          directDriverTopupForbidden: true,
          agentBalanceMustBePositive: true,
          agentCanTopupOnlyAssignedDrivers: true,
          ownerConfigurableCommissionBps: 200,
          commissionModel: {
            driverCredit: requestedAmount,
            agentCommission,
            agentBalanceDebit: agentDebit
          },
          fxSnapshot: {
            sourceCurrency: form.sourceCurrency,
            sourceAmount: form.sourceAmount,
            targetCurrency: form.targetCurrency,
            exchangeRate: form.exchangeRate,
            rateSource: form.rateSource,
            rateTime: form.rateTime,
            creditedAmount
          },
          proof: {
            receiptProofId: form.receiptProofId,
            receiptFileUrl: form.receiptFileUrl,
            transferReference: form.transferReference,
            txHash: form.txHash,
            driverReceiptProofId: form.driverReceiptProofId,
            driverReceiptUrl: form.driverReceiptUrl
          },
          trustedPeople,
          form,
          ...extra
        })
      });
      const text = await response.text();
      const payload = readJson028AFix1(text);
      pushLog({ at: new Date().toISOString(), action, path, code: response.status, ok: response.ok, operator: form.trustedManagerId || form.ownerId || "—", message: response.ok ? "Сервер принял запрос" : text.slice(0, 500) });
      if (routeKey === "loadAgentFundingQueue") setQueue(rows028AFix1(payload));
      if (routeKey === "loadDailyHardReport") setDailyReport(report028AFix1(payload));
      setNotice(response.ok ? "Запрос отправлен на сервер" : "Сервер вернул ошибку, локальный результат не установлен");
    } catch (error) {
      pushLog({ at: new Date().toISOString(), action, path, code: "network_error", ok: false, operator: form.trustedManagerId || form.ownerId || "—", message: error instanceof Error ? error.message : "Ошибка сети" });
      setNotice("Ошибка сети, локальный результат не установлен");
    } finally {
      setBusyAction("");
    }
  };

  return (
    <section className="taxiFinance028aFix1" data-taxi-finance-028a-fix1-standalone-agent-balance="ready" data-taxi-balance-removed-from-ordinary-taxi-screen="ready" data-owner-assigned-three-four-access="required" data-receipt-required-for-every-driver-topup="required" data-agent-commission-discount-model="driver-100-agent-debit-98">
      <header className="tf028aHero">
        <div>
          <span>{TAXI_FINANCE_028A_FIX1_STANDALONE_AGENT_BALANCE}</span>
          <h1>Финансы такси</h1>
          <p>Отдельный центр агентских счетов, чеков, курсов, пополнений водителей и ежедневного отчёта. Обычный экран баланса из Такси убран. Никто не может пополнять баланс напрямую.</p>
        </div>
        <strong>{readiness}%</strong>
      </header>

      <div className="tf028aTopGrid">
        <section className="tf028aCard danger"><h2>Доступ</h2><p>Только владелец и 3–4 назначенных доверенных человека. Остальные не видят ручное пополнение.</p><strong>{accessReady ? "Доступ указан" : "Указать владельца и назначенного"}</strong></section>
        <section className="tf028aCard"><h2>Чек обязателен</h2><p>Без чека, файла, proof или TxHash нельзя пополнить агентский счёт и нельзя создать пополнение водителя.</p><strong>{fundingProofReady ? "Доказательство есть" : "Нет доказательства"}</strong></section>
        <section className="tf028aCard"><h2>Комиссия агента</h2><p>Водитель получает 100%, с агента списывается 98%, 2% остаётся агенту.</p><strong>2%</strong></section>
        <section className="tf028aCard"><h2>Ежедневный отчёт</h2><p>Все операции, чеки, курс, подтверждающий, сумма и риск попадают в ежедневный отчёт владельцу.</p><strong>обязателен</strong></section>
      </div>

      <div className="tf028aLayout">
        <aside className="tf028aPanel">
          <div className="tf028aSectionTitle"><h2>Доверенные люди</h2><span>{trustedPeople.length}/4</span></div>
          <label>Owner ID<input value={form.ownerId} onChange={(event) => updateForm("ownerId", event.target.value)} placeholder="owner-id" /></label>
          <label>Назначенный человек<input value={form.trustedManagerId} onChange={(event) => updateForm("trustedManagerId", event.target.value)} placeholder="finance-manager-id" /></label>
          <div className="tf028aInline"><input value={trustedInput} onChange={(event) => setTrustedInput(event.target.value)} placeholder="добавить доверенного" /><button type="button" onClick={addTrusted}>Добавить</button></div>
          <div className="tf028aList">{trustedPeople.length ? trustedPeople.map((person) => <span key={person}>{person}</span>) : <em>Список пуст</em>}</div>
          <button type="button" disabled={busyAction !== ""} onClick={() => void sendToServer("Проверить доступ", "checkAccess")}>Проверить доступ</button>
          <button type="button" disabled={busyAction !== ""} onClick={() => void sendToServer("Загрузить агентские заявки", "loadAgentFundingQueue")}>Загрузить заявки</button>
          <div className="tf028aQueue">{queue.length ? queue.map((row, index) => <button key={`${row.id || row.agentId || index}`} type="button" onClick={() => { updateForm("agentId", row.agentId || form.agentId); updateForm("sourceCurrency", row.sourceCurrency || form.sourceCurrency); updateForm("targetCurrency", row.targetCurrency || form.targetCurrency); updateForm("sourceAmount", row.sentAmount || form.sourceAmount); updateForm("exchangeRate", row.rate || form.exchangeRate); updateForm("receiptProofId", row.receiptProofId || form.receiptProofId); }}><strong>{value028AFix1(row.agentId)}</strong><span>{value028AFix1(row.sentAmount)} {value028AFix1(row.sourceCurrency)} → {value028AFix1(row.targetCurrency)}</span><small>{value028AFix1(row.state)}</small></button>) : <p>Заявки появятся только с сервера.</p>}</div>
        </aside>

        <main className="tf028aMain">
          <section className="tf028aBlock">
            <div className="tf028aSectionTitle"><h2>Пополнение агентского счёта</h2><span>чек + курс</span></div>
            <div className="tf028aFields three">
              <label>Agent ID<input value={form.agentId} onChange={(event) => updateForm("agentId", event.target.value)} /></label>
              <label>Страна агента<input value={form.agentCountry} onChange={(event) => updateForm("agentCountry", event.target.value)} /></label>
              <label>Счёт агента<input value={form.agentBalanceAccountId} onChange={(event) => updateForm("agentBalanceAccountId", event.target.value)} /></label>
              <label>Исходная валюта<input value={form.sourceCurrency} onChange={(event) => updateForm("sourceCurrency", event.target.value)} placeholder="USDT / USD" /></label>
              <label>Сумма отправки<input value={form.sourceAmount} onChange={(event) => updateForm("sourceAmount", event.target.value)} /></label>
              <label>Целевая валюта<input value={form.targetCurrency} onChange={(event) => updateForm("targetCurrency", event.target.value)} placeholder="UZS / RUB / CNY" /></label>
              <label>Курс<input value={form.exchangeRate} onChange={(event) => updateForm("exchangeRate", event.target.value)} /></label>
              <label>Источник курса<input value={form.rateSource} onChange={(event) => updateForm("rateSource", event.target.value)} /></label>
              <label>Время курса<input value={form.rateTime} onChange={(event) => updateForm("rateTime", event.target.value)} placeholder="ISO time" /></label>
              <label>ID чека / proof<input value={form.receiptProofId} onChange={(event) => updateForm("receiptProofId", event.target.value)} /></label>
              <label>Ссылка на чек<input value={form.receiptFileUrl} onChange={(event) => updateForm("receiptFileUrl", event.target.value)} /></label>
              <label>TxHash / код перевода<input value={form.txHash} onChange={(event) => updateForm("txHash", event.target.value)} /></label>
            </div>
            <div className="tf028aCalc"><span>Расчёт зачисления агенту</span><strong>{creditedAmount ? creditedAmount.toLocaleString("ru-RU") : "—"} {form.targetCurrency || ""}</strong><small>Без серверного подтверждения баланс не меняется.</small></div>
            <div className="tf028aActions"><button type="button" disabled={busyAction !== ""} onClick={() => void sendToServer("Подготовить пополнение агента", "prepareAgentFunding")}>Подготовить</button><button type="button" disabled={busyAction !== ""} onClick={() => void sendToServer("Запросить подтверждение агента", "requestAgentFundingApproval")}>Запросить подтверждение</button></div>
          </section>

          <section className="tf028aBlock">
            <div className="tf028aSectionTitle"><h2>Пополнение водителя агентом</h2><span>100% водителю / 98% списание</span></div>
            <div className="tf028aFields three">
              <label>ID водителя<input value={form.driverId} onChange={(event) => updateForm("driverId", event.target.value)} /></label>
              <label>Номер пополнения водителя<input value={form.driverBalanceTopupId} onChange={(event) => updateForm("driverBalanceTopupId", event.target.value)} /></label>
              <label>Баланс агента<input value={form.agentAvailableBalance} onChange={(event) => updateForm("agentAvailableBalance", event.target.value)} /></label>
              <label>Страна водителя<input value={form.driverCountry} onChange={(event) => updateForm("driverCountry", event.target.value)} placeholder="определяется сервером" /></label>
              <label>Валюта водителя<input value={form.driverCurrency} onChange={(event) => updateForm("driverCurrency", event.target.value)} placeholder="определяется сервером" /></label>
              <label>Сумма водителю<input value={form.requestedDriverAmount} onChange={(event) => updateForm("requestedDriverAmount", event.target.value)} /></label>
              <label>ID чека для пополнения<input value={form.driverReceiptProofId} onChange={(event) => updateForm("driverReceiptProofId", event.target.value)} /></label>
              <label>Ссылка на чек<input value={form.driverReceiptUrl} onChange={(event) => updateForm("driverReceiptUrl", event.target.value)} /></label>
              <label>Примечание проверки<input value={form.verificationNote} onChange={(event) => updateForm("verificationNote", event.target.value)} /></label>
            </div>
            <div className="tf028aFormula">
              <div><span>Водителю</span><strong>{requestedAmount ? requestedAmount.toLocaleString("ru-RU") : "—"} {form.driverCurrency || form.targetCurrency}</strong></div>
              <div><span>Комиссия 2%</span><strong>{agentCommission ? agentCommission.toLocaleString("ru-RU") : "—"}</strong></div>
              <div><span>Списать с агента</span><strong>{agentDebit ? agentDebit.toLocaleString("ru-RU") : "—"}</strong></div>
              <div className={hasEnoughAgentBalance ? "ok" : "bad"}><span>Проверка баланса агента</span><strong>{hasEnoughAgentBalance ? "достаточно" : "недостаточно"}</strong></div>
            </div>
            <textarea value={form.approvalNote} onChange={(event) => updateForm("approvalNote", event.target.value)} placeholder="Решение владельца или назначенного доверенного человека" />
            <div className="tf028aActions"><button type="button" disabled={busyAction !== ""} onClick={() => void sendToServer("Определить страну и валюту водителя", "resolveDriverBalanceIdentity")}>Определить страну/валюту</button><button type="button" disabled={busyAction !== ""} onClick={() => void sendToServer("Подготовить пополнение водителя", "prepareAgentDriverTopup")}>Подготовить</button><button type="button" disabled={busyAction !== ""} onClick={() => void sendToServer("Запросить подтверждение пополнения водителя", "requestAgentDriverTopupApproval")}>Запросить подтверждение</button></div>
            {!driverTopupProofReady ? <p className="tf028aWarning">Для запроса нужен чек, ID водителя, номер пополнения и достаточный агентский баланс.</p> : null}
          </section>
        </main>

        <aside className="tf028aPanel">
          <div className="tf028aSectionTitle"><h2>Отчёт и журнал</h2><span>ежедневно</span></div>
          <button type="button" disabled={busyAction !== ""} onClick={() => void sendToServer("Загрузить ежедневный отчёт", "loadDailyHardReport")}>Загрузить отчёт</button>
          <button type="button" disabled={busyAction !== ""} onClick={() => void sendToServer("Экспортировать ежедневный отчёт", "exportDailyHardReport")}>Экспорт отчёта</button>
          <div className="tf028aReport">
            <strong>{dailyReport?.date || "Отчёт не загружен"}</strong>
            <span>Заявки агентов: {dailyReport?.totalAgentFunding ?? "—"}</span>
            <span>Подтверждено: {dailyReport?.approvedFunding ?? "—"}</span>
            <span>Пополнения водителей: {dailyReport?.driverTopups ?? "—"}</span>
            <span>Без чека: {dailyReport?.receiptMissing ?? "—"}</span>
            <span>Риск: {dailyReport?.risk || "—"}</span>
          </div>
          <div className="tf028aLog">{serverLog.length ? serverLog.map((item) => <div key={`${item.at}-${item.action}`} className={item.ok ? "ok" : "bad"}><strong>{item.action}</strong><span>{item.path}</span><small>{item.code} · {item.operator} · {item.at}</small><p>{item.message}</p></div>) : <p>Журнал появится после ответа сервера.</p>}</div>
        </aside>
      </div>
    </section>
  );
}
