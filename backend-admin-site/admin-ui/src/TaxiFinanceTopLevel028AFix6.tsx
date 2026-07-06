import { useMemo, useState } from "react";
import type { AdminApiConfig } from "./api";
import type { AdminLanguage } from "./admin-i18n";
import "./taxi-finance-top-level028a-fix6.css";

export const TAXI_FINANCE_028A_FIX6_TOP_LEVEL_MODULE = "028A_FIX6_TAXI_FINANCE_REAL_TOP_LEVEL_MODULE_NO_FIXED_CURRENCY";

type Props = { language: AdminLanguage; config: AdminApiConfig; setNotice: (message: string) => void };
type FinancePage = "owner" | "agent" | "agentApplication" | "reportsArchive";
type ServerLog = { title: string; route: string; status: string; error: string; at: string };

const routes: Record<string, string> = {
  resolveFinanceId: "/api/taxi-finance/identity/resolve-country-currency-rate",
  ownerCreditAgent: "/api/taxi-finance/owner/agents/credit-with-proof-request",
  ownerCreditDriver: "/api/taxi-finance/owner/drivers/manual-credit-with-proof-request",
  agentTopupDriver: "/api/taxi-finance/agent/drivers/topup-from-agent-balance",
  agentApplication: "/api/taxi-finance/agent/applications/create",
  dailyReport: "/api/taxi-finance/reports/daily-hard-report",
  monthlyReport: "/api/taxi-finance/reports/monthly-agent-contract-report",
  archiveSearch: "/api/taxi-finance/archive/search",
};

const pages: Array<{ id: FinancePage; title: string; hint: string }> = [
  { id: "owner", title: "Финансы владельца", hint: "пополнение агентского счёта, чек, курс, подтверждение" },
  { id: "agent", title: "Кабинет агента", hint: "агент пополняет только своих водителей" },
  { id: "agentApplication", title: "Стать агентом", hint: "таксист может собрать команду и работать как агент" },
  { id: "reportsArchive", title: "Отчёты и архив", hint: "ежедневные, месячные отчёты, чеки и история" },
];

const emptyLog: ServerLog = {
  title: "Журнал пуст",
  route: "Серверный ответ появится после действия.",
  status: "—",
  error: "—",
  at: "—",
};

async function callServer(config: AdminApiConfig, action: string, payload: Record<string, string>): Promise<ServerLog> {
  const route = routes[action];
  const baseUrl = (config.baseUrl || "").replace(/\/$/, "");
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (config.token) headers.Authorization = `Bearer ${config.token}`;
  const response = await fetch(`${baseUrl}${route}`, { method: "POST", headers, body: JSON.stringify(payload) });
  const text = await response.text();
  let message = text;
  try {
    const parsed = JSON.parse(text) as { message?: string; error?: string; code?: string };
    message = parsed.message || parsed.error || parsed.code || text;
  } catch {}
  return {
    title: response.ok ? "Сервер принял действие" : "Сервер отклонил действие",
    route,
    status: String(response.status),
    error: response.ok ? "—" : message || "ошибка сервера",
    at: new Date().toISOString(),
  };
}

export function TaxiFinanceTopLevel028AFix6Panel({ config, setNotice }: Props) {
  const [page, setPage] = useState<FinancePage>("owner");
  const [busy, setBusy] = useState("");
  const [log, setLog] = useState<ServerLog>(emptyLog);
  const [form, setForm] = useState<Record<string, string>>({
    ownerId: "",
    assignedFinanceUserId: "",
    agentId: "",
    agentContractId: "",
    agentFinanceId: "",
    driverId: "",
    driverBalanceId: "",
    teamBindingId: "",
    sourceAmount: "",
    sourceCurrency: "",
    targetCurrencyResolvedByServer: "",
    countryResolvedByServer: "",
    exchangeRateSnapshotId: "",
    creditedAmountResolvedByServer: "",
    receiptProofId: "",
    receiptFileReference: "",
    transactionReference: "",
    driverRequestedCredit: "",
    agentDebitResolvedByServer: "",
    agentCommissionResolvedByServer: "",
    monthlyContractPercentResolvedByServer: "",
    reason: "",
    reportPeriod: "",
    archiveQuery: "",
  });

  const active = useMemo(() => pages.find((item) => item.id === page) || pages[0], [page]);
  const disabled = busy !== "";
  const update = (key: string, value: string) => setForm((next) => ({ ...next, [key]: value }));

  const run = async (action: string) => {
    setBusy(action);
    try {
      const result = await callServer(config, action, form);
      setLog(result);
      setNotice(result.title);
    } catch (error) {
      const result = { title: "Запрос не дошёл до сервера", route: routes[action], status: "network_error", error: error instanceof Error ? error.message : "network_error", at: new Date().toISOString() };
      setLog(result);
      setNotice(result.title);
    } finally {
      setBusy("");
    }
  };

  return (
    <section className="tf028f6" data-taxi-finance-028a-fix6-real-top-level-module="ready" data-no-fixed-currency="country-currency-rate-server-resolved">
      <header className="tf028f6Hero">
        <div>
          <span>{TAXI_FINANCE_028A_FIX6_TOP_LEVEL_MODULE}</span>
          <h1>Финансы такси</h1>
          <p>Отдельный главный модуль как Messenger или Stream. Не вкладка внутри обычного Такси.</p>
        </div>
        <strong>ОТДЕЛЬНЫЙ МОДУЛЬ</strong>
      </header>

      <nav className="tf028f6Nav" aria-label="Разделы Финансов такси">
        {pages.map((item) => (
          <button key={item.id} type="button" className={item.id === page ? "active" : ""} onClick={() => setPage(item.id)}>
            <b>{item.title}</b>
            <small>{item.hint}</small>
          </button>
        ))}
      </nav>

      <div className="tf028f6Layout">
        <aside className="tf028f6Access" data-owner-assigned-access-only="required">
          <h2>Доступ</h2>
          <p>Ручные финансовые операции доступны только владельцу и назначенным доверенным людям. Агент не может пополнять свой агентский счёт.</p>
          <label>Owner ID<input value={form.ownerId} onChange={(e) => update("ownerId", e.target.value)} placeholder="владелец" /></label>
          <label>Назначенный человек<input value={form.assignedFinanceUserId} onChange={(e) => update("assignedFinanceUserId", e.target.value)} placeholder="доверенный менеджер" /></label>
          <button type="button" disabled={disabled} onClick={() => run("resolveFinanceId")}>Проверить доступ через сервер</button>
          <em>Без чека, курса, журнала и подтверждения действие запрещено.</em>
        </aside>

        <main className="tf028f6Main">
          <div className="tf028f6Title">
            <h2>{active.title}</h2>
            <p>{active.hint}</p>
          </div>

          {page === "owner" ? (
            <section className="tf028f6Card" data-owner-finance-screen="separate-from-agent">
              <h3>Пополнение агентского счёта</h3>
              <p>Агент переводит деньги компании, прикладывает чек или доказательство. Владелец или назначенный человек подтверждает и только сервер создаёт запрос зачисления на агентский счёт.</p>
              <div className="tf028f6Fields">
                <label>Агент ID<input value={form.agentId} onChange={(e) => update("agentId", e.target.value)} placeholder="agent-id" /></label>
                <label>ID агентского счёта<input value={form.agentFinanceId} onChange={(e) => update("agentFinanceId", e.target.value)} placeholder="agent-finance-id" /></label>
                <label>Договор агента<input value={form.agentContractId} onChange={(e) => update("agentContractId", e.target.value)} placeholder="contract-id" /></label>
                <label>Сумма перевода<input value={form.sourceAmount} onChange={(e) => update("sourceAmount", e.target.value)} placeholder="сумма от агента" /></label>
                <label>Исходная валюта<input value={form.sourceCurrency} onChange={(e) => update("sourceCurrency", e.target.value)} placeholder="вводит оператор" /></label>
                <label>Страна по серверу<input value={form.countryResolvedByServer} onChange={(e) => update("countryResolvedByServer", e.target.value)} placeholder="сервер определит" /></label>
                <label>Целевая валюта по серверу<input value={form.targetCurrencyResolvedByServer} onChange={(e) => update("targetCurrencyResolvedByServer", e.target.value)} placeholder="сервер определит" /></label>
                <label>Курс / snapshot ID<input value={form.exchangeRateSnapshotId} onChange={(e) => update("exchangeRateSnapshotId", e.target.value)} placeholder="серверный курс" /></label>
                <label>Сумма зачисления по серверу<input value={form.creditedAmountResolvedByServer} onChange={(e) => update("creditedAmountResolvedByServer", e.target.value)} placeholder="сервер рассчитает" /></label>
                <label>Чек / proof / hash<input value={form.receiptProofId} onChange={(e) => update("receiptProofId", e.target.value)} placeholder="обязательно" /></label>
                <label>Файл чека<input value={form.receiptFileReference} onChange={(e) => update("receiptFileReference", e.target.value)} placeholder="receipt-file-id" /></label>
                <label>Платёжная ссылка<input value={form.transactionReference} onChange={(e) => update("transactionReference", e.target.value)} placeholder="reference" /></label>
              </div>
              <div className="tf028f6Actions">
                <button type="button" disabled={disabled} onClick={() => run("resolveFinanceId")}>Определить страну, валюту и курс</button>
                <button type="button" disabled={disabled} onClick={() => run("ownerCreditAgent")}>Создать запрос зачисления агенту</button>
                <button type="button" disabled={disabled} onClick={() => run("ownerCreditDriver")}>Создать запрос зачисления водителю владельцем</button>
              </div>
            </section>
          ) : null}

          {page === "agent" ? (
            <section className="tf028f6Card" data-agent-cabinet-screen="agent-cannot-credit-self">
              <h3>Кабинет агента</h3>
              <p>Агент видит свой баланс и пополняет только своих водителей. Водитель получает полную сумму, с агента списывается сумма по серверному расчёту с учётом комиссии.</p>
              <div className="tf028f6Fields">
                <label>Агент ID<input value={form.agentId} onChange={(e) => update("agentId", e.target.value)} placeholder="agent-id" /></label>
                <label>ID агентского счёта<input value={form.agentFinanceId} onChange={(e) => update("agentFinanceId", e.target.value)} placeholder="agent-finance-id" /></label>
                <label>Привязка команды<input value={form.teamBindingId} onChange={(e) => update("teamBindingId", e.target.value)} placeholder="team-binding-id" /></label>
                <label>Водитель ID<input value={form.driverId} onChange={(e) => update("driverId", e.target.value)} placeholder="driver-id" /></label>
                <label>ID баланса водителя<input value={form.driverBalanceId} onChange={(e) => update("driverBalanceId", e.target.value)} placeholder="driver-balance-id" /></label>
                <label>Сумма водителю<input value={form.driverRequestedCredit} onChange={(e) => update("driverRequestedCredit", e.target.value)} placeholder="полная сумма" /></label>
                <label>Списание агента по серверу<input value={form.agentDebitResolvedByServer} onChange={(e) => update("agentDebitResolvedByServer", e.target.value)} placeholder="сервер рассчитает" /></label>
                <label>Комиссия агента по серверу<input value={form.agentCommissionResolvedByServer} onChange={(e) => update("agentCommissionResolvedByServer", e.target.value)} placeholder="сервер рассчитает" /></label>
                <label>Причина<input value={form.reason} onChange={(e) => update("reason", e.target.value)} placeholder="комментарий" /></label>
              </div>
              <div className="tf028f6Actions">
                <button type="button" disabled={disabled} onClick={() => run("resolveFinanceId")}>Проверить водителя, страну и валюту</button>
                <button type="button" disabled={disabled} onClick={() => run("agentTopupDriver")}>Пополнить водителя из агентского баланса</button>
              </div>
            </section>
          ) : null}

          {page === "agentApplication" ? (
            <section className="tf028f6Card" data-driver-can-apply-agent="ready">
              <h3>Таксист хочет стать агентом</h3>
              <p>Таксист может собрать свою команду, рекламировать программу и получать агентский доход после договора и проверки.</p>
              <div className="tf028f6Fields">
                <label>Водитель ID<input value={form.driverId} onChange={(e) => update("driverId", e.target.value)} placeholder="driver-id" /></label>
                <label>ID баланса водителя<input value={form.driverBalanceId} onChange={(e) => update("driverBalanceId", e.target.value)} placeholder="driver-balance-id" /></label>
                <label>Причина заявки<input value={form.reason} onChange={(e) => update("reason", e.target.value)} placeholder="город, команда, опыт" /></label>
              </div>
              <button type="button" disabled={disabled} onClick={() => run("agentApplication")}>Отправить заявку стать агентом</button>
            </section>
          ) : null}

          {page === "reportsArchive" ? (
            <section className="tf028f6Card" data-reports-archive-required="daily-monthly-proof-audit">
              <h3>Отчёты и архив</h3>
              <p>Отчёт хранит все переводы, чеки, курс, зачисления агентам, пополнения водителей, комиссию, месячную оплату и решения.</p>
              <div className="tf028f6Fields">
                <label>Период<input value={form.reportPeriod} onChange={(e) => update("reportPeriod", e.target.value)} placeholder="дата или месяц" /></label>
                <label>Агент ID<input value={form.agentId} onChange={(e) => update("agentId", e.target.value)} placeholder="agent-id" /></label>
                <label>Процент по договору<input value={form.monthlyContractPercentResolvedByServer} onChange={(e) => update("monthlyContractPercentResolvedByServer", e.target.value)} placeholder="сервер/договор" /></label>
                <label>Поиск архива<input value={form.archiveQuery} onChange={(e) => update("archiveQuery", e.target.value)} placeholder="чек / агент / водитель / route" /></label>
              </div>
              <div className="tf028f6Actions">
                <button type="button" disabled={disabled} onClick={() => run("dailyReport")}>Ежедневный жёсткий отчёт</button>
                <button type="button" disabled={disabled} onClick={() => run("monthlyReport")}>Месячный отчёт агента</button>
                <button type="button" disabled={disabled} onClick={() => run("archiveSearch")}>Открыть архив</button>
              </div>
            </section>
          ) : null}
        </main>

        <aside className="tf028f6Journal" data-server-audit-journal="required">
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
