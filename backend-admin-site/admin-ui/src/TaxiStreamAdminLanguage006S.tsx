import type { AdminLanguage } from "./admin-i18n";

type CopyBlock = {
  title: string;
  subtitle: string;
  taxi: string;
  stream: string;
  safety: string;
};

const COPY: Record<AdminLanguage, CopyBlock> = {
  ru: {
    title: "Такси и стрим: языки и панели",
    subtitle: "Отдельные панели администратора. Тексты очищены, навигация изолирована, действия рабочей среды заблокированы до одобрения.",
    taxi: "Такси: заявки, тарифы, комиссии, провайдеры, кошелёк и запуск разделены по безопасным блокам.",
    stream: "Стрим: реальное время, жизненный цикл медиа, подарки, игры, модерация и провайдеры показываются только в своих административных блоках.",
    safety: "Без серверной записи, записи в базу данных, отправки провайдеру, кошелька, оплаты, выплат и производственной активации.",
  },
  en: {
    title: "Taxi and Stream: language and panels",
    subtitle: "Separate Admin UI panels. Copy is cleaned, navigation is isolated, runtime actions stay locked until approval.",
    taxi: "Taxi: orders, tariffs, commission, providers, wallet and launch controls are separated into safe blocks.",
    stream: "Stream: realtime, media lifecycle, gifts, games, moderation and providers are shown only in their own Admin blocks.",
    safety: "No backend write, DB write, provider dispatch, Wallet/payment/payout or production activation.",
  },
  uz: {
    title: "Taxi va Stream: tillar va panellar",
    subtitle: "Alohida Admin UI panellari. Matnlar tozalangan, navigatsiya ajratilgan, runtime amallar tasdiqqacha yopiq.",
    taxi: "Taxi: buyurtmalar, tariflar, komissiya, provayderlar, hamyon va ishga tushirish boshqaruvi xavfsiz bloklarga ajratilgan.",
    stream: "Strim: real vaqt, media hayotiy sikli, sovg‘alar, o‘yinlar, moderatsiya va provayderlar faqat o‘z admin bloklarida ko‘rsatiladi.",
    safety: "Server yozuvi, maʼlumotlar bazasi yozuvi, provayderga yuborish, hamyon, to‘lov, to‘lov chiqarish va ishlab chiqarishni faollashtirish yo‘q.",
  },
  zh: {
    title: "出租车与直播：语言和面板",
    subtitle: "独立的管理界面面板。文案已清理，导航已隔离，运行时操作在审批前保持锁定。",
    taxi: "出租车：订单、费率、佣金、服务商、钱包和上线控制被拆分到安全模块。",
    stream: "直播：实时、媒体生命周期、礼物、游戏、审核和服务商只在对应的管理模块中显示。",
    safety: "不执行后端写入、数据库写入、提供商调用、钱包/支付/打款或生产激活。",
  },
};

export function TaxiStreamAdminLanguage006S(props: { language: AdminLanguage }) {
  const copy = COPY[props.language] ?? COPY.ru;
  return (
    <section className="panel" data-admin-ui-taxi-stream-language-006s="ready">
      <div className="panelHead">
        <div>
          <h2>{copy.title}</h2>
          <p>{copy.subtitle}</p>
        </div>
        <span className="status ready">006S</span>
      </div>
      <div className="dashboardGrid">
        <div className="card"><h3>Taxi</h3><p>{copy.taxi}</p></div>
        <div className="card"><h3>Stream</h3><p>{copy.stream}</p></div>
        <div className="card"><h3>Safety</h3><p>{copy.safety}</p></div>
      </div>
    </section>
  );
}
