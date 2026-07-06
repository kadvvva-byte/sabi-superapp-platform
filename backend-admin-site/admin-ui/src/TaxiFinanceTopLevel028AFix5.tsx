import { useMemo, useState } from "react";
import type { AdminApiConfig } from "./api";
import type { AdminLanguage } from "./admin-i18n";
import "./taxi-finance-top-level028a-fix5.css";

export const TAXI_FINANCE_028A_FIX5_TOP_LEVEL_MODULE = "028A_FIX5_TAXI_FINANCE_TOP_LEVEL_OWNER_AGENT_NO_FIXED_CURRENCY";

type Props = { language: AdminLanguage; config: AdminApiConfig; setNotice: (message: string) => void };
type FinanceTab = "owner" | "agent" | "agentRequest" | "reports" | "archive";
type ServerLog = { title: string; route: string; status: string; error: string; at: string };

const routeByAction: Record<string, string> = {
  resolveIdentity: "/api/taxi-finance/identity/resolve-by-balance-id",
  ownerCreditAgent: "/api/taxi-finance/owner/agent-balance/credit-request",
  ownerCreditDriver: "/api/taxi-finance/owner/driver-balance/manual-credit-request",
  agentCreditDriver: "/api/taxi-finance/agent/driver-balance/topup-request",
  agentRequest: "/api/taxi-finance/agent/applications/create",
  dailyReport: "/api/taxi-finance/reports/daily",
  monthlyReport: "/api/taxi-finance/reports/monthly",
  archive: "/api/taxi-finance/archive/search",
};

const tabs: Array<{ id: FinanceTab; label: string; hint: string }> = [
  { id: "owner", label: "Финансы владельца", hint: "пополнение агенту, проверка чека, контроль доступа" },
  { id: "agent", label: "Кабинет агента", hint: "баланс агента, свои водители, комиссия" },
  { id: "agentRequest", label: "Стать агентом", hint: "таксист может собрать команду" },
  { id: "reports", label: "Отчёты", hint: "ежедневный и месячный контроль" },
  { id: "archive", label: "Архив", hint: "чеки, решения, история переводов" },
];

const emptyLog: ServerLog = {
  title: "Журнал пуст",
  route: "Серверный ответ появится после запроса.",
  status: "—",
  error: "—",
  at: "—",
};

async function callServer(config: AdminApiConfig, action: string, payload: Record<string, string>): Promise<ServerLog> {
  const route = routeByAction[action];
  const baseUrl = (config.baseUrl || "").replace(/\/$/, "");
  const url = `${baseUrl}${route}`;
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (config.token) headers.Authorization = `Bearer ${config.token}`;
  const response = await fetch(url, { method: "POST", headers, body: JSON.stringify(payload) });
  const text = await response.text();
  let message = text;
  try {
    const parsed = JSON.parse(text) as { message?: string; error?: string; code?: string };
    message = parsed.message || parsed.error || parsed.code || text;
  } catch {}
  return {
    title: response.ok ? "Сервер принял запрос" : "Сервер вернул ошибку",
    route,
    status: String(response.status),
    error: response.ok ? "—" : message || "ошибка сервера",
    at: new Date().toISOString(),
  };
}

export function TaxiFinanceTopLevel028AFix5Panel({ config, setNotice }: Props) {
  const [activeTab, setActiveTab] = useState<FinanceTab>("owner");
  const [busy, setBusy] = useState("");
  const [log, setLog] = useState<ServerLog>(emptyLog);
  const [form, setForm] = useState<Record<string, string>>({
    ownerOperatorId: "",
    assignedFinancePersonId: "",
    agentId: "",
    agentContractId: "",
    agentBalanceId: "",
    driverId: "",
    driverBalanceId: "",
    driverTeamId: "",
    sourceAmount: "",
    sourceCurrencyInput: "",
    targetCurrencyByServer: "",
    exchangeRateByServer: "",
    receiptProofId: "",
    transactionProof: "",
    transferComment: "",
    requestedDriverCredit: "",
    agentDebitByServer: "",
    agentCommissionByServer: "",
    monthlyContractRateByServer: "",
    reportDate: "",
    archiveQuery: "",
  });

  const update = (key: string, value: string) => setForm((next) => ({ ...next, [key]: value }));
  const disabled = busy !== "";
  const selectedTab = useMemo(() => tabs.find((tab) => tab.id === activeTab) || tabs[0], [activeTab]);

  const run = async (action: string) => {
    setBusy(action);
    try {
      const answer = await callServer(config, action, form);
      setLog(answer);
      setNotice(answer.title);
    } catch (error) {
      setLog({ title: "Запрос не дошёл до сервера", route: routeByAction[action], status: "network_error", error: error instanceof Error ? error.message : "network_error", at: new Date().toISOString() });
      setNotice("Запрос не дошёл до сервера");
    } finally {
      setBusy("");
    }
  };

  return (
    <section className="tf028f5" data-taxi-finance-028a-fix5-top-level-module="ready" data-taxi-finance-no-fixed-currency="server-resolved">
      <div className="tf028f5Hero">
        <div>
          <span>{TAXI_FINANCE_028A_FIX5_TOP_LEVEL_MODULE}</span>
          <h1>Финансы такси</h1>
          <p>Отдельный главный модуль как Messenger или Stream. Не внутри обычного Такси.</p>
        </div>
        <div className="tf028f5Status"><strong>ОТДЕЛЬНО</strong><small>Owner + назначенные люди</small></div>
      </div>

      <div className="tf028f5Tabs" aria-label="Разделы финансов такси">
        {tabs.map((tab) => (
          <button key={tab.id} type="button" className={activeTab === tab.id ? "active" : ""} onClick={() => setActiveTab(tab.id)}>
            <strong>{tab.label}</strong><span>{tab.hint}</span>
          </button>
        ))}
      </div>

      <div className="tf028f5Grid">
        <aside className="tf028f5Side">
          <h2>Доступ</h2>
          <p>Ручные операции видят только владелец и назначенные доверенные люди. Агент не пополняет свой счёт.</p>
          <label>Owner ID<input value={form.ownerOperatorId} onChange={(e) => update("ownerOperatorId", e.target.value)} placeholder="Номер владельца" /></label>
          <label>Назначенный человек<input value={form.assignedFinancePersonId} onChange={(e) => update("assignedFinancePersonId", e.target.value)} placeholder="Номер доверенного менеджера" /></label>
          <button disabled={disabled} type="button" onClick={() => run("resolveIdentity")}>Проверить доступ и ID</button>
          <div className="tf028f5Rule">Без доказательства оплаты, курса сервера и журнала операция запрещена.</div>
        </aside>

        <main className="tf028f5Main">
          <div className="tf028f5Head"><h2>{selectedTab.label}</h2><p>{selectedTab.hint}</p></div>

          {activeTab === "owner" ? (
            <div className="tf028f5Panel" data-owner-finance-screen="separate">
              <h3>Пополнение агентского счёта владельцем</h3>
              <div className="tf028f5Fields">
                <label>Агент ID<input value={form.agentId} onChange={(e) => update("agentId", e.target.value)} placeholder="agent-id" /></label>
                <label>Договор агента<input value={form.agentContractId} onChange={(e) => update("agentContractId", e.target.value)} placeholder="contract-id" /></label>
                <label>ID агентского баланса<input value={form.agentBalanceId} onChange={(e) => update("agentBalanceId", e.target.value)} placeholder="agent-balance-id" /></label>
                <label>Сумма перевода агента<input value={form.sourceAmount} onChange={(e) => update("sourceAmount", e.target.value)} placeholder="сумма" /></label>
                <label>Исходная валюта<input value={form.sourceCurrencyInput} onChange={(e) => update("sourceCurrencyInput", e.target.value)} placeholder="вводит оператор, проверяет сервер" /></label>
                <label>Целевая валюта<input value={form.targetCurrencyByServer} onChange={(e) => update("targetCurrencyByServer", e.target.value)} placeholder="сервер определит по номеру" /></label>
                <label>Курс<input value={form.exchangeRateByServer} onChange={(e) => update("exchangeRateByServer", e.target.value)} placeholder="серверный snapshot курса" /></label>
                <label>Чек / proof / hash<input value={form.receiptProofId} onChange={(e) => update("receiptProofId", e.target.value)} placeholder="обязательно" /></label>
              </div>
              <div className="tf028f5Actions">
                <button disabled={disabled} type="button" onClick={() => run("resolveIdentity")}>Определить страну, валюту и курс по ID</button>
                <button disabled={disabled} type="button" onClick={() => run("ownerCreditAgent")}>Создать запрос пополнения агенту</button>
                <button disabled={disabled} type="button" onClick={() => run("ownerCreditDriver")}>Создать запрос пополнения водителю владельцем</button>
              </div>
            </div>
          ) : null}

          {activeTab === "agent" ? (
            <div className="tf028f5Panel" data-agent-cabinet-screen="separate">
              <h3>Кабинет агента</h3>
              <p>Агент пополняет только своих водителей из положительного агентского баланса. Водитель получает полную сумму, с агента списывается сумма за вычетом комиссии по договору.</p>
              <div className="tf028f5Fields">
                <label>Агент ID<input value={form.agentId} onChange={(e) => update("agentId", e.target.value)} placeholder="agent-id" /></label>
                <label>Команда водителя<input value={form.driverTeamId} onChange={(e) => update("driverTeamId", e.target.value)} placeholder="team-binding-id" /></label>
                <label>Водитель ID<input value={form.driverId} onChange={(e) => update("driverId", e.target.value)} placeholder="driver-id" /></label>
                <label>ID баланса водителя<input value={form.driverBalanceId} onChange={(e) => update("driverBalanceId", e.target.value)} placeholder="driver-balance-id" /></label>
                <label>Сумма водителю<input value={form.requestedDriverCredit} onChange={(e) => update("requestedDriverCredit", e.target.value)} placeholder="полная сумма для водителя" /></label>
                <label>Списание агента<input value={form.agentDebitByServer} onChange={(e) => update("agentDebitByServer", e.target.value)} placeholder="сервер рассчитает" /></label>
                <label>Комиссия агента<input value={form.agentCommissionByServer} onChange={(e) => update("agentCommissionByServer", e.target.value)} placeholder="сервер рассчитает" /></label>
                <label>Комментарий<input value={form.transferComment} onChange={(e) => update("transferComment", e.target.value)} placeholder="причина / заметка" /></label>
              </div>
              <div className="tf028f5Actions">
                <button disabled={disabled} type="button" onClick={() => run("resolveIdentity")}>Проверить водителя и валюту по ID</button>
                <button disabled={disabled} type="button" onClick={() => run("agentCreditDriver")}>Пополнить водителя через сервер</button>
              </div>
            </div>
          ) : null}

          {activeTab === "agentRequest" ? (
            <div className="tf028f5Panel">
              <h3>Заявка таксиста стать агентом</h3>
              <p>Таксист может стать агентом, собрать команду, рекламировать программу и зарабатывать как агент после проверки и договора.</p>
              <div className="tf028f5Fields">
                <label>Водитель ID<input value={form.driverId} onChange={(e) => update("driverId", e.target.value)} placeholder="driver-id" /></label>
                <label>ID баланса водителя<input value={form.driverBalanceId} onChange={(e) => update("driverBalanceId", e.target.value)} placeholder="driver-balance-id" /></label>
                <label>Комментарий заявки<input value={form.transferComment} onChange={(e) => update("transferComment", e.target.value)} placeholder="город, команда, опыт" /></label>
              </div>
              <button disabled={disabled} type="button" onClick={() => run("agentRequest")}>Отправить заявку на агентство</button>
            </div>
          ) : null}

          {activeTab === "reports" ? (
            <div className="tf028f5Panel">
              <h3>Отчёты</h3>
              <p>Ежедневный и месячный отчёт фиксирует чек, курс, агента, водителя, сумму, комиссию, решение и риск.</p>
              <div className="tf028f5Fields">
                <label>Дата отчёта<input value={form.reportDate} onChange={(e) => update("reportDate", e.target.value)} placeholder="дата" /></label>
                <label>Агент ID<input value={form.agentId} onChange={(e) => update("agentId", e.target.value)} placeholder="agent-id" /></label>
                <label>Договорный процент<input value={form.monthlyContractRateByServer} onChange={(e) => update("monthlyContractRateByServer", e.target.value)} placeholder="сервер/договор" /></label>
              </div>
              <div className="tf028f5Actions"><button disabled={disabled} type="button" onClick={() => run("dailyReport")}>Сформировать ежедневный отчёт</button><button disabled={disabled} type="button" onClick={() => run("monthlyReport")}>Сформировать месячный отчёт</button></div>
            </div>
          ) : null}

          {activeTab === "archive" ? (
            <div className="tf028f5Panel">
              <h3>Архив</h3>
              <p>Архив хранит переводы агента, чек, доказательство, курс, решения, пополнения водителей и журнал.</p>
              <label>Поиск по архиву<input value={form.archiveQuery} onChange={(e) => update("archiveQuery", e.target.value)} placeholder="agent-id / driver-id / receipt-id / route" /></label>
              <button disabled={disabled} type="button" onClick={() => run("archive")}>Найти в архиве</button>
            </div>
          ) : null}
        </main>

        <aside className="tf028f5Log" data-server-audit-journal="required">
          <h2>Журнал сервера</h2>
          <strong>{log.title}</strong>
          <span>Путь: {log.route}</span>
          <span>Статус: {log.status}</span>
          <span>Ошибка: {log.error}</span>
          <span>Время: {log.at}</span>
        </aside>
      </div>
    </section>
  );
}
