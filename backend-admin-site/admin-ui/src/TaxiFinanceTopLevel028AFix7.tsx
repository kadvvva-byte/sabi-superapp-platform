import { useMemo, useState } from "react";
import type { AdminApiConfig } from "./api";
import type { AdminLanguage } from "./admin-i18n";
import "./taxi-finance-top-level028a-fix7.css";

export const TAXI_FINANCE_028A_FIX7_TOP_LEVEL_MODULE = "028A_FIX7_TAXI_FINANCE_TOP_LEVEL_SEPARATE_MODULE_DYNAMIC_CURRENCY";

type Props = { language: AdminLanguage; config: AdminApiConfig; setNotice: (message: string) => void };
type FinancePage = "owner" | "agent" | "reports";
type ServerLog = { title: string; route: string; status: string; error: string; at: string };

const routes: Record<string, string> = {
  resolveIdentity: "/api/taxi-finance/identity/resolve",
  ownerAgentFundingRequest: "/api/taxi-finance/owner/agent-funding/request",
  ownerDriverEmergencyRequest: "/api/taxi-finance/owner/driver-credit/request",
  agentDriverTopupRequest: "/api/taxi-finance/agent/driver-topup/request",
  driverAgentApplication: "/api/taxi-finance/agent/application/request",
  archiveSearch: "/api/taxi-finance/archive/search",
  dailyReport: "/api/taxi-finance/reports/daily",
  monthlyReport: "/api/taxi-finance/reports/monthly-agent",
};

const pages: Array<{ id: FinancePage; title: string; hint: string }> = [
  { id: "owner", title: "Финансы владельца", hint: "пополнить агенту, проверить чек, утвердить курс" },
  { id: "agent", title: "Кабинет агента", hint: "агент пополняет только своих водителей" },
  { id: "reports", title: "Отчёты и архив", hint: "ежедневный контроль, месячная оплата, доказательства" },
];

const emptyLog: ServerLog = {
  title: "Журнал пуст",
  route: "Серверный ответ появится после действия.",
  status: "—",
  error: "—",
  at: "—",
};

async function callServer(config: AdminApiConfig, route: string, payload: Record<string, string>): Promise<ServerLog> {
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
    title: response.ok ? "Сервер принял запрос" : "Сервер отклонил запрос",
    route,
    status: String(response.status),
    error: response.ok ? "—" : message || "ошибка сервера",
    at: new Date().toISOString(),
  };
}

export function TaxiFinanceTopLevel028AFix7Panel({ config, setNotice }: Props) {
  const [page, setPage] = useState<FinancePage>("owner");
  const [busy, setBusy] = useState("");
  const [log, setLog] = useState<ServerLog>(emptyLog);
  const [form, setForm] = useState<Record<string, string>>({
    ownerId: "",
    trustedFinanceUserId: "",
    agentId: "",
    agentContractId: "",
    agentFinanceId: "",
    driverId: "",
    driverBalanceId: "",
    teamBindingId: "",
    sourceAmount: "",
    sourceCurrencyCode: "",
    targetCurrencyCode: "",
    countryCodeResolvedByServer: "",
    exchangeRateSnapshotId: "",
    creditedAmountResolvedByServer: "",
    receiptProofId: "",
    receiptFileReference: "",
    transferReference: "",
    topupAmount: "",
    agentDebitResolvedByServer: "",
    agentCommissionResolvedByServer: "",
    monthlyVolume: "",
    monthlyContractPercent: "",
    note: "",
  });

  const payload = useMemo(() => ({ ...form, module: "taxi_finance_top_level", stage: TAXI_FINANCE_028A_FIX7_TOP_LEVEL_MODULE }), [form]);
  const update = (key: string, value: string) => setForm((current) => ({ ...current, [key]: value }));
  const run = async (action: string, route: string) => {
    setBusy(action);
    try {
      const nextLog = await callServer(config, route, payload);
      setLog(nextLog);
      setNotice(nextLog.title);
    } catch (error) {
      const nextLog = { title: "Сервер недоступен", route, status: "network_error", error: error instanceof Error ? error.message : String(error), at: new Date().toISOString() };
      setLog(nextLog);
      setNotice("Ошибка сервера");
    } finally {
      setBusy("");
    }
  };

  return (
    <section className="taxiFinanceFix7" data-taxi-finance-top-level-module="like-messenger-stream" data-dynamic-currency-only="server-resolved">
      <header className="tf7Hero">
        <div>
          <p className="tf7Eyebrow">Отдельный главный модуль · не внутри Такси</p>
          <h2>Финансы такси</h2>
          <p>Два разных проекта: владелец пополняет агенту, агент пополняет только своих водителей. Всё через чек, курс, отчёт и серверный журнал.</p>
        </div>
        <div className="tf7Status">
          <strong>Валюта</strong>
          <span>не фиксируется</span>
          <small>страна, валюта и курс определяются сервером по ID</small>
        </div>
      </header>

      <nav className="tf7Tabs" aria-label="Разделы финансов такси">
        {pages.map((item) => (
          <button key={item.id} type="button" className={page === item.id ? "active" : ""} onClick={() => setPage(item.id)}>
            <strong>{item.title}</strong>
            <span>{item.hint}</span>
          </button>
        ))}
      </nav>

      {page === "owner" ? (
        <div className="tf7Grid" data-owner-finance-screen="separate-from-agent">
          <aside className="tf7Card tf7Rules">
            <h3>Доступ владельца</h3>
            <p>Ручное пополнение видит только Owner и назначенные доверенные люди.</p>
            <ul>
              <li>Агенту баланс зачисляется только после чека.</li>
              <li>Курс и итоговую сумму считает сервер.</li>
              <li>Обычный Taxi не содержит этот модуль.</li>
            </ul>
          </aside>
          <main className="tf7Card tf7Form">
            <h3>Перевод денег агенту</h3>
            <p className="tf7Hint">Простая логика: агент отправил деньги → приложил чек → Owner подтвердил → сервер создал запись агентского счёта.</p>
            <div className="tf7Fields">
              <label>Owner ID<input value={form.ownerId} onChange={(event) => update("ownerId", event.target.value)} placeholder="Номер владельца" /></label>
              <label>Назначенный сотрудник<input value={form.trustedFinanceUserId} onChange={(event) => update("trustedFinanceUserId", event.target.value)} placeholder="Номер доверенного человека" /></label>
              <label>Агент ID<input value={form.agentId} onChange={(event) => update("agentId", event.target.value)} placeholder="Номер агента" /></label>
              <label>Договор агента<input value={form.agentContractId} onChange={(event) => update("agentContractId", event.target.value)} placeholder="Номер договора" /></label>
              <label>Сумма отправки<input value={form.sourceAmount} onChange={(event) => update("sourceAmount", event.target.value)} placeholder="сумма по чеку" /></label>
              <label>Исходная валюта<input value={form.sourceCurrencyCode} onChange={(event) => update("sourceCurrencyCode", event.target.value)} placeholder="код валюты из справочника" /></label>
              <label>Целевая валюта<input value={form.targetCurrencyCode} onChange={(event) => update("targetCurrencyCode", event.target.value)} placeholder="сервер определит по стране" /></label>
              <label>ID курса<input value={form.exchangeRateSnapshotId} onChange={(event) => update("exchangeRateSnapshotId", event.target.value)} placeholder="снимок курса" /></label>
              <label>ID чека / доказательства<input value={form.receiptProofId} onChange={(event) => update("receiptProofId", event.target.value)} placeholder="обязательно" /></label>
              <label>Ссылка на файл чека<input value={form.receiptFileReference} onChange={(event) => update("receiptFileReference", event.target.value)} placeholder="архив доказательства" /></label>
              <label>Платёжная ссылка<input value={form.transferReference} onChange={(event) => update("transferReference", event.target.value)} placeholder="банк, сеть или провайдер" /></label>
              <label>Комментарий<textarea value={form.note} onChange={(event) => update("note", event.target.value)} placeholder="почему зачисляем агенту" /></label>
            </div>
            <div className="tf7Actions">
              <button type="button" disabled={busy !== ""} onClick={() => run("resolve", routes.resolveIdentity)}>Определить страну, валюту и курс</button>
              <button type="button" disabled={busy !== ""} onClick={() => run("ownerAgentFunding", routes.ownerAgentFundingRequest)}>Создать запрос зачисления агенту</button>
              <button type="button" disabled={busy !== ""} onClick={() => run("ownerDriverEmergency", routes.ownerDriverEmergencyRequest)}>Запрос ручного пополнения водителю</button>
            </div>
          </main>
        </div>
      ) : null}

      {page === "agent" ? (
        <div className="tf7Grid" data-agent-cabinet-screen="agent-cannot-credit-self">
          <aside className="tf7Card tf7Rules">
            <h3>Кабинет агента</h3>
            <p>Агент не может пополнять свой агентский счёт.</p>
            <p>Агент пополняет только своих водителей и только если хватает агентского баланса.</p>
            <p data-driver-can-apply-agent="ready">Водитель может стать агентом после одобрения и собрать свою команду.</p>
          </aside>
          <main className="tf7Card tf7Form">
            <h3>Пополнение водителя агентом</h3>
            <p className="tf7Hint">Водитель получает полную сумму. С агентского баланса списывается сумма с учётом комиссии по договору.</p>
            <div className="tf7Fields">
              <label>Агент ID<input value={form.agentId} onChange={(event) => update("agentId", event.target.value)} placeholder="Номер агента" /></label>
              <label>Агентский счёт<input value={form.agentFinanceId} onChange={(event) => update("agentFinanceId", event.target.value)} placeholder="Номер агентского счёта" /></label>
              <label>Водитель ID<input value={form.driverId} onChange={(event) => update("driverId", event.target.value)} placeholder="Номер водителя" /></label>
              <label>ID баланса водителя<input value={form.driverBalanceId} onChange={(event) => update("driverBalanceId", event.target.value)} placeholder="по нему сервер определяет страну и валюту" /></label>
              <label>Привязка команды<input value={form.teamBindingId} onChange={(event) => update("teamBindingId", event.target.value)} placeholder="водитель должен принадлежать агенту" /></label>
              <label>Сумма водителю<input value={form.topupAmount} onChange={(event) => update("topupAmount", event.target.value)} placeholder="водитель получает полную сумму" /></label>
              <label>Списание агента<input value={form.agentDebitResolvedByServer} onChange={(event) => update("agentDebitResolvedByServer", event.target.value)} placeholder="рассчитывает сервер" /></label>
              <label>Комиссия агента<input value={form.agentCommissionResolvedByServer} onChange={(event) => update("agentCommissionResolvedByServer", event.target.value)} placeholder="рассчитывает сервер" /></label>
            </div>
            <div className="tf7Actions">
              <button type="button" disabled={busy !== ""} onClick={() => run("resolve", routes.resolveIdentity)}>Проверить водителя, страну и валюту</button>
              <button type="button" disabled={busy !== ""} onClick={() => run("agentTopup", routes.agentDriverTopupRequest)}>Пополнить водителю через сервер</button>
              <button type="button" disabled={busy !== ""} onClick={() => run("agentApplication", routes.driverAgentApplication)}>Подать заявку стать агентом</button>
            </div>
          </main>
        </div>
      ) : null}

      {page === "reports" ? (
        <div className="tf7Grid" data-reports-archive-required="daily-monthly-proof-audit">
          <aside className="tf7Card tf7Rules">
            <h3>Отчёты и архив</h3>
            <p>Каждый чек, курс, перевод агенту и пополнение водителя хранится в архиве.</p>
            <p>Ежедневный отчёт обязателен. Месячная оплата агента считается по договору.</p>
          </aside>
          <main className="tf7Card tf7Form">
            <h3>Контроль отчётов</h3>
            <div className="tf7Fields">
              <label>Агент ID<input value={form.agentId} onChange={(event) => update("agentId", event.target.value)} placeholder="Номер агента" /></label>
              <label>Месячный объём<input value={form.monthlyVolume} onChange={(event) => update("monthlyVolume", event.target.value)} placeholder="объём по договору" /></label>
              <label>Процент договора<input value={form.monthlyContractPercent} onChange={(event) => update("monthlyContractPercent", event.target.value)} placeholder="процент задаёт владелец" /></label>
              <label>Поиск в архиве<input value={form.receiptProofId} onChange={(event) => update("receiptProofId", event.target.value)} placeholder="Номер чека, агента, водителя или операции" /></label>
            </div>
            <div className="tf7Actions">
              <button type="button" disabled={busy !== ""} onClick={() => run("daily", routes.dailyReport)}>Сформировать ежедневный отчёт</button>
              <button type="button" disabled={busy !== ""} onClick={() => run("monthly", routes.monthlyReport)}>Сформировать месячный отчёт агента</button>
              <button type="button" disabled={busy !== ""} onClick={() => run("archive", routes.archiveSearch)}>Открыть архив</button>
            </div>
          </main>
        </div>
      ) : null}

      <footer className="tf7Log">
        <div>
          <h3>Журнал сервера</h3>
          <p>Нет локального изменения баланса. Любой результат приходит только от сервера.</p>
        </div>
        <pre>{JSON.stringify(log, null, 2)}</pre>
      </footer>
    </section>
  );
}
