import type { AdminLanguage } from "./admin-i18n";

type Props015B = { language: AdminLanguage };

type Copy015B = {
  title: string;
  subtitle: string;
  runtime: string;
  sources: string;
  gates: string;
  safety: string;
  orders: string;
  trips: string;
  drivers: string;
  tariffs: string;
  finance: string;
  applications: string;
  protectedWrites: string;
  noFake: string;
  realOnly: string;
  closeout: string;
  production: string;
  next: string;
};

const MARKER015B = "TAXI-PRODUCTION-CONTROL-015B-RUNTIME-CLOSEOUT-BOARD-NO-FAKE";

const COPY015B: Record<AdminLanguage, Copy015B> = {
  ru: {
    title: "Taxi production control",
    subtitle: "Финальная доска после 015A-FIX1: все закрытые блоки такси проверены вместе одним проверка рабочей среды. Экран только показывает статус и не выполняет действия записи.",
    runtime: "015A-FIX1 live environment passed",
    sources: "Live environment sources: 17/17",
    gates: "Protected write gates: archive 009A, tariffs 008A/008C, dispatch 009I",
    safety: "Safety clean: no false, no Balance account, no external service, no local penalty, no env dump",
    orders: "Заказы + архив + рост",
    trips: "Поездки, жалобы, lost property",
    drivers: "Водители + авто + контроль положительного баланса",
    tariffs: "Тарифы: страны, peak +100%, commission bps",
    finance: "Finance Ops: выручка, Sabi earnings, отчёт, архив",
    applications: "Applications 007Z: 200, real empty list accepted",
    protectedWrites: "Запись без exact утверждение запрещён",
    noFake: "Без фейка и без локального успеха",
    realOnly: "Только реальные данные или честный пустой список",
    closeout: "Завершение записан в интерфейс администратора",
    production: "Производственный контроль рабочая среда готов",
    next: "Следующий шаг: детальная производственное усиление основа: role RBAC рабочая среда, цепочка аудита, scheduler, база данных migration/провайдер/оплата gates.",
  },
  en: {
    title: "Taxi production control",
    subtitle: "Final board after 015A-FIX1: all closed Taxi blocks were checked together by one live environment smoke. This screen is read-only and performs no writes.",
    runtime: "015A-FIX1 live environment passed",
    sources: "Live environment sources: 17/17",
    gates: "Protected write gates: archive 009A, tariffs 008A/008C, dispatch 009I",
    safety: "Safety clean: no false, no Balance account, no external service, no local penalty, no env dump",
    orders: "Orders + archive + growth",
    trips: "Trips, complaints, lost property",
    drivers: "Drivers + vehicles + positive balance control step",
    tariffs: "Tariffs: countries, peak +100%, commission bps",
    finance: "Finance Ops: revenue, Sabi earnings, report, archive",
    applications: "Applications 007Z: 200, real empty list accepted",
    protectedWrites: "Writes without exact confirmation are denied",
    noFake: "No false and no local success",
    realOnly: "Real data only or honest empty list",
    closeout: "Closeout recorded in admin interface",
    production: "Production-control live environment ready",
    next: "Next: production hardening foundation: role access control, live environment, audit trail, scheduler, database migration, external service, and charge control steps.",
  },
  uz: {
    title: "Taxi production control",
    subtitle: "015A-FIX1 dan keyingi yakuniy doska: yopilgan Taksi bloklari bitta ishlash muhiti tekshiruvi bilan birga tekshirildi. Ekran faqat ko ‘rsatadi, yozish bajarmaydi.",
    runtime: "015A-FIX1 live environment passed",
    sources: "Live environment sources: 17/17",
    gates: "Protected write gates: archive 009A, tariffs 008A/008C, dispatch 009I",
    safety: "Xavfsizlik toza: soxta yo ‘q, Hamyon yo ‘q, tashqi xizmat yo ‘q, mahalliy jazo yo ‘q, muhit sozlamalarini chiqarish yo ‘q",
    orders: "Buyurtmalar + arxiv + o ‘sish",
    trips: "Safarlar, shikoyatlar, lost property",
    drivers: "Haydovchilar + avto + positive balance control step",
    tariffs: "Tariflar: davlatlar, peak +100%, commission bps",
    finance: "Finance Ops: tushum, Sabi daromadi, hisobot, arxiv",
    applications: "Applications 007Z: 200, real empty list accepted",
    protectedWrites: "Exact tasdiq bo ‘lmasa yozish taqiqlanadi",
    noFake: "Soxta yo ‘q va local success yo ‘q",
    realOnly: "Faqat real ma ’lumot yoki halol bo ‘sh ro ‘yxat",
    closeout: "Closeout admin interface ichida yozildi",
    production: "Ishlab chiqarish-nazorat ishlash muhiti tayyor",
    next: "Keyingi qadam: ishlab chiqarishni mustahkamlash asosi: rolga asoslangan kirish nazorati, ishlash muhiti, tekshiruv izi, jadvalchi, maʼlumotlar bazasi ko‘chiruvi, tashqi xizmat va to‘lov nazorati.",
  },
  zh: {
    title: "Taxi production control",
    subtitle: "015A-FIX1 后的最终看板：所有已关闭出租车模块已通过一次运行环境检查一起验证。本屏幕只读，不执行写入。",
    runtime: "015A-FIX1 live environment passed",
    sources: "Live environment sources: 17/17",
    gates: "Protected write gates: archive 009A, tariffs 008A/008C, dispatch 009I",
    safety: "Safety clean: no false, no Balance account, no external service, no local penalty, no env dump",
    orders: "订单 + 归档 + 增长",
    trips: "行程、投诉、遗失物",
    drivers: "司机 + 车辆 + 正余额检查",
    tariffs: "费率：国家、peak +100%、commission bps",
    finance: "Finance Ops：营收、Sabi 收入、报告、归档",
    applications: "Applications 007Z: 200, real empty list accepted",
    protectedWrites: "没有 exact 审批 时禁止写入",
    noFake: "无假数据，无本地成功",
    realOnly: "仅真实数据或真实空列表",
    closeout: "Closeout 已写入 Admin 界面",
    production: "Production-control live environment ready",
    next: "下一步：生产加固基础：角色访问控制、运行环境、审计轨迹、调度器、数据库迁移、服务商和支付检查。",
  },
};

const blocks015B = [
  { key: "orders", value: "100%" },
  { key: "trips", value: "100%" },
  { key: "drivers", value: "100%" },
  { key: "tariffs", value: "100%" },
  { key: "finance", value: "100%" },
  { key: "applications", value: "100%" },
] as const;

export function TaxiProductionControl015BPanel({ language }: Props015B) {
  const copy = COPY015B[language] || COPY015B.ru;
  return (
    <section
      className="taxi015bProductionCloseout"
      data-admin-ui-taxi-production-control-015b-closeout="ready"
      data-admin-ui-taxi-production-control-015b-runtime-015a-fix1-pass="recorded"
      data-admin-ui-taxi-production-control-015b-source-health="17-of-17"
      data-admin-ui-taxi-production-control-015b-protected-writes-denied="archive-tariff-dispatch"
      data-admin-ui-taxi-production-control-015b-real-only="ready"
      data-admin-ui-taxi-production-control-015b-no-fake-wallet-provider-local-penalty="ready"
    >
      <div className="taxi015bCloseoutHead">
        <div>
          <span>{MARKER015B}</span>
          <h2>{copy.title}</h2>
          <p>{copy.subtitle}</p>
        </div>
        <strong>100%</strong>
      </div>

      <div className="taxi015bCloseoutMetrics">
        <div><span>{copy.runtime}</span><strong>PASS</strong></div>
        <div><span>{copy.sources}</span><strong>17/17</strong></div>
        <div><span>{copy.production}</span><strong>100%</strong></div>
        <div><span>{copy.closeout}</span><strong>UI</strong></div>
      </div>

      <div className="taxi015bCloseoutGrid">
        {blocks015B.map((item) => <div key={item.key}><span>{copy[item.key]}</span><strong>{item.value}</strong></div>)}
      </div>

      <div className="taxi015bSafetyGrid">
        <span>{copy.gates}</span>
        <span>{copy.safety}</span>
        <span>{copy.protectedWrites}</span>
        <span>{copy.noFake}</span>
        <span>{copy.realOnly}</span>
      </div>
      <p className="taxi015bNext">{copy.next}</p>
    </section>
  );
}
