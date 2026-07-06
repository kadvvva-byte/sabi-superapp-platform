import React from "react";

type AdminPanelProps = {
  baseUrl?: string;
  token?: string;
  language?: unknown;
  children?: React.ReactNode;
};

const rows = [
  {
    id: "purpose",
    status: "РќРђР—РќРђР§Р•РќРР•",
    title: "Р¤СѓРЅРєС†РёСЏ СЌРєСЂР°РЅР°",
    description: "Р­РєСЂР°РЅ РїРѕРєР°Р·С‹РІР°РµС‚ СЃРѕСЃС‚РѕСЏРЅРёРµ Google Billing / Pay С‚РѕР»СЊРєРѕ РєР°Рє readiness Рё governance. Р РµР°Р»СЊРЅС‹Рµ РїР»Р°С‚РµР¶Рё РЅРµ РІС‹РїРѕР»РЅСЏСЋС‚СЃСЏ."
  },
  {
    id: "owner",
    status: "КОНТРОЛЬ ВЛАДЕЛЬЦА",
    title: "РљРѕРЅС‚СЂРѕР»СЊ РІР»Р°РґРµР»СЊС†Р°",
    description: "Р¤РёРЅР°Р»СЊРЅРѕРµ СЂРµС€РµРЅРёРµ, РІС‹РґР°С‡Р° РґРѕСЃС‚СѓРїР°, Р·Р°РїСѓСЃРє РёРЅС‚РµРіСЂР°С†РёР№ Рё Р»СЋР±С‹Рµ РєСЂРёС‚РёС‡РµСЃРєРёРµ РґРµР№СЃС‚РІРёСЏ РІС‹РїРѕР»РЅСЏСЋС‚СЃСЏ С‚РѕР»СЊРєРѕ РїРѕСЃР»Рµ СЂР°Р·СЂРµС€РµРЅРёСЏ Owner."
  },
  {
    id: "sabi-ai",
    status: "SABI AI КОНТРОЛЬ",
    title: "РљРѕРЅС‚СЂРѕР»СЊ SABI AI КОНТРОЛЬ",
    description: "SABI AI КОНТРОЛЬ Р°РЅР°Р»РёР·РёСЂСѓРµС‚ СЂРёСЃРєРё, РіРѕС‚РѕРІРёС‚ РѕС‚С‡С‘С‚С‹, РїСЂРµРґСѓРїСЂРµР¶РґР°РµС‚ Owner Рё СЃРѕС…СЂР°РЅСЏРµС‚ evidence, РЅРѕ РЅРµ РІС‹РґР°С‘С‚ С„РёРЅР°Р»СЊРЅС‹Р№ РґРѕСЃС‚СѓРї СЃР°РјРѕСЃС‚РѕСЏС‚РµР»СЊРЅРѕ."
  },
  {
    id: "locks",
    status: "ЗАБЛОКИРОВАНО",
    title: "РўРµС…РЅРёС‡РµСЃРєРёРµ Р±Р»РѕРєРёСЂРѕРІРєРё",
    description: "Р’ СЌС‚РѕРј С€Р°РіРµ РЅРµС‚ backend mutation, DB write, Secret Manager read/write, Wallet, payment, payout, provider call Рё РїСѓР±Р»РёРєР°С†РёРё."
  }
];

export function GoogleBillingPayAdminControl100Panel(_props: AdminPanelProps = {}) {
  return (
    <section className="sabi-admin-program-screen" data-language="ru" data-ru-only="true">
      <header className="sabi-admin-program-header">
        <p className="sabi-admin-kicker">Sabi Admin UI В· СЂСѓСЃСЃРєРёР№ СЂРµР¶РёРј</p>
        <h1>РљРѕРЅС‚СЂРѕР»СЊ Google Billing / Pay</h1>
        <p>Р­РєСЂР°РЅ РїРѕРєР°Р·С‹РІР°РµС‚ СЃРѕСЃС‚РѕСЏРЅРёРµ Google Billing / Pay С‚РѕР»СЊРєРѕ РєР°Рє readiness Рё governance. Р РµР°Р»СЊРЅС‹Рµ РїР»Р°С‚РµР¶Рё РЅРµ РІС‹РїРѕР»РЅСЏСЋС‚СЃСЏ.</p>
      </header>

      <div className="sabi-admin-program-grid">
        {rows.map((row) => (
          <article className="sabi-admin-program-card" key={row.id}>
            <span>{row.status}</span>
            <h2>{row.title}</h2>
            <p>{row.description}</p>
          </article>
        ))}
      </div>

      <aside className="sabi-admin-program-locks">
        <h2>Р—Р°С‰РёС‚РЅС‹Рµ РїСЂР°РІРёР»Р°</h2>
        <ul>
          <li>Messenger, Taxi Рё Taxi Finance СЌРєСЂР°РЅС‹ РЅРµ РёР·РјРµРЅСЏСЋС‚СЃСЏ СЌС‚РёРј С€Р°РіРѕРј.</li>
          <li>Р’СЃРµ РЅРѕРІС‹Рµ СЂР°Р·СЂРµС€С‘РЅРЅС‹Рµ РїР°РЅРµР»Рё РѕС‚РѕР±СЂР°Р¶Р°СЋС‚СЃСЏ С‚РѕР»СЊРєРѕ РЅР° СЂСѓСЃСЃРєРѕРј СЏР·С‹РєРµ.</li>
          <li>РџСѓР±Р»РёРєР°С†РёСЏ РЅРµ РІС‹РїРѕР»РЅСЏРµС‚СЃСЏ.</li>
        </ul>
      </aside>
    </section>
  );
}

export default GoogleBillingPayAdminControl100Panel;
