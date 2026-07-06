// 237N-FIX74-EN-STEP1-NO-RU-ON-EN-NO-RU-REMOVAL
const assetBase = "./assets/approved/237k/";
const visualAuditMode = new URLSearchParams(location.search).has("visualAudit");
if (visualAuditMode) {
  document.documentElement.dataset.visualAudit = "true";
}
const firstPrograms = [
  {stage:"Первый запуск",title:"Sabi Finance Center",image:"sabi-finance center-approved.png",intro:"будущий финансовый раздел Sabi: учёт операций, счета, история и контроль соответствия, запуск только после юридической и провайдерской готовности.",tags:["Баланс","Операции","История","Контроль"],sections:{"Что это":"Sabi Finance Center — финансовый раздел SuperApp для баланса, операций, карт и истории в премиальном интерфейсе.","Для кого":"Для пользователей, будущих клиентов Sabi и людей, которым нужен простой контроль финансовых действий.","Как работает":"Пользователь видит финансовый центр, историю операций и доступные действия. Финансовые функции запускаются поэтапно, с учётом правовой и сервисной готовности.","Роль Sabi AI":"Sabi AI помогает замечать риск-сигналы, подозрительные действия и нестандартные операции.","Официальный порядок":"Критические финансовые вопросы и спорные ситуации рассматриваются по официальным правилам компании."}},
  {stage:"Первый запуск",title:"Sabi Messenger",image:"sabi-messenger-approved.png",intro:"Премиальное пространство общения: чаты, группы, каналы, медиа и быстрые действия.",tags:["Чаты","Группы","Каналы","Медиа"],sections:{"Что это":"Sabi Messenger — коммуникационный центр для личного и рабочего общения внутри SuperApp.","Для кого":"Для пользователей, команд, агентов, поддержки, клиентов и партнёров.","Как работает":"Пользователь общается, отправляет медиа, получает уведомления и быстро переходит к связанным функциям Sabi.","Роль Sabi AI":"Sabi AI помогает замечать жалобы, злоупотребления, опасные сообщения и рискованные сценарии поведения.","Официальный порядок":"Серьёзные нарушения, спорные кейсы и правила модерации проходят через официальные правила."}},
  {stage:"Первый запуск",title:"Sabi Taxi",image:"sabi-taxi-approved.png",intro:"Поездки, водитель, маршрут, тарифы, безопасность и контроль качества сервиса.",tags:["Поездки","Водители","Безопасность","Качество"],sections:{"Что это":"Sabi Taxi — направление для заказа поездок, выбора тарифа, контроля маршрута и взаимодействия с водителем.","Для кого":"Для пассажиров, водителей, агентов такси, городских команд и контроля качества сервиса.","Как работает":"Пассажир выбирает маршрут и тариф, водитель получает заказ по правилам допуска, а спорные случаи фиксируются для рассмотрения.","Роль Sabi AI":"Sabi AI помогает анализировать жалобы, подозрительные отмены, нарушения и качество поездок.","Официальный порядок":"Правила допуска, спорные блокировки и крупные нарушения рассматриваются по официальной процедуре Sabi."}},
  {stage:"Первый запуск",title:"Sabi Stream",image:"sabi-stream-approved.png",intro:"Живые эфиры, авторы, аудитория, подарки, визуальные эффекты и безопасная сцена.",tags:["Эфиры","Авторы","Подарки","Аудитория"],sections:{"Что это":"Sabi Stream — медиа-направление для прямых эфиров, авторов, зрителей, визуальных подарков и интерактивности.","Для кого":"Для авторов, зрителей, брендов, партнёров, модераторов и будущих creator-направлений Sabi.","Как работает":"Автор выходит в эфир, зрители взаимодействуют, отправляют визуальные подарки и получают ощущение живого события.","Роль Sabi AI":"Sabi AI помогает отслеживать жалобы, токсичность, рискованный контент, нарушения и репутационные угрозы.","Официальный порядок":"Серьёзная модерация, правила монетизации и спорные действия рассматриваются по официальным правилам."}},
  {stage:"Первый запуск",title:"Sabi QR",image:"sabi-qr-approved.png",intro:"Быстрый доступ к функциям Sabi через сканирование и понятные сценарии.",tags:["QR","Доступ","Скан","Действия"],sections:{"Что это":"Sabi QR — быстрый слой доступа к действиям SuperApp через QR-коды.","Для кого":"Для пользователей, бизнеса, агентов, водителей, событий, партнёров и сервисных точек.","Как работает":"Пользователь сканирует код и попадает в нужный сценарий Sabi без лишнего поиска.","Роль Sabi AI":"Sabi AI помогает замечать подозрительные QR-сценарии, риск доступа и необычную активность.","Официальный порядок":"Правила доступа и рискованные сценарии рассматриваются по официальным правилам Sabi."}},
  {stage:"Первый запуск",title:"Sabi Gallery",image:"sabi-gallery-approved.png",intro:"Фото, видео, альбомы, моменты и визуальная память SuperApp.",tags:["Фото","Видео","Альбомы","Медиа"],sections:{"Что это":"Sabi Gallery — пространство для визуального контента внутри SuperApp.","Для кого":"Для пользователей, авторов, поддержки, водителей, агентов, бизнеса и сервисных сценариев.","Как работает":"Пользователь видит медиа, альбомы и материалы, связанные с нужными функциями Sabi.","Роль Sabi AI":"Sabi AI помогает находить визуальные риск-сигналы, подозрительные материалы и доказательства по жалобам.","Официальный порядок":"Спорные материалы и серьёзные нарушения рассматриваются по официальным правилам Sabi."}},
  {stage:"Первый запуск",title:"Sabi Camera",image:"sabi-camera-approved.png",intro:"Камера как вход в действия SuperApp: съёмка, документы, QR и подтверждения.",tags:["Камера","Документы","Скан","Визуал"],sections:{"Что это":"Sabi Camera — визуальный инструмент для фото, документов, сканов, QR и быстрых действий.","Для кого":"Для пользователей, агентов, водителей, поддержки, бизнеса и сервисных команд.","Как работает":"Пользователь снимает, сканирует, прикрепляет материалы и переходит к нужной функции.","Роль Sabi AI":"Sabi AI помогает анализировать документы, визуальные риск-сигналы и подозрительные материалы.","Официальный порядок":"Спорные документы, доказательства и серьёзные проверки рассматриваются по официальным правилам."}},
  {stage:"Первый запуск",title:"Sabi Translation / Presentation",image:"sabi-translation-presentation-approved.png",intro:"Перевод, голос, документы, презентации и международная коммуникация.",tags:["Перевод","Голос","Документы","Презентации"],sections:{"Что это":"Translation / Presentation — направление для перевода, объяснения, подготовки материалов и презентационного режима.","Для кого":"Для международных пользователей, бизнеса, руководителей, поддержки, команд и клиентов.","Как работает":"Пользователь переводит текст или голос, готовит материал и использует Sabi как среду коммуникации.","Роль Sabi AI":"Sabi AI помогает сохранять контекст, структурировать смысл и замечать риск-сигналы в чувствительных коммуникациях.","Официальный порядок":"Юридические, стратегические и спорные решения рассматриваются по официальным правилам компании."}}
];
const secondPrograms = [
  {stage:"Второе обновление",title:"Sabi Marketplace",image:"sabi-marketplace-approved.png",intro:"Торговая среда для товаров, витрин, продавцов, заказов и доверенных покупок.",tags:["Товары","Витрины","Заказы","Доверие"],sections:{"Что это":"Будущая коммерческая часть Sabi для товаров, продавцов, витрин и заказов.","Для кого":"Для покупателей, продавцов, брендов, магазинов, поставщиков и партнёров.","Роль Sabi AI":"Sabi AI сможет помогать выявлять риск продавца, подозрительные заказы, жалобы и нарушения качества.","Статус":"Запланировано для второго обновления после первого запуска."}},
  {stage:"Второе обновление",title:"Sabi Hotels",image:"sabi-hotels-approved.png",intro:"Сценарий проживания: города, даты, отели, бронирование и сервисная поддержка.",tags:["Отели","Город","Даты","Поездки"],sections:{"Что это":"Будущий раздел для поиска проживания, выбора города, дат и отелей.","Для кого":"Для путешественников, отелей, партнёров, городских гостей и туристических сервисов.","Роль Sabi AI":"Sabi AI сможет отслеживать жалобы, риск отзывов, подозрительные бронирования и качество сервиса.","Статус":"Запланировано для второго обновления."}},
  {stage:"Второе обновление",title:"Sabi Supermarket",image:"sabi-supermarket-approved.png",intro:"Ежедневные покупки: продукты, корзина, доставка, категории и дом.",tags:["Продукты","Корзина","Доставка","Дом"],sections:{"Что это":"Будущий продуктовый раздел для ежедневных покупок, категорий, корзины и доставки.","Для кого":"Для семей, пользователей, магазинов, курьеров, городских сервисов и поставщиков.","Роль Sabi AI":"Sabi AI сможет анализировать жалобы, качество заказов и подозрительные действия.","Статус":"Запланировано для второго обновления."}},
  {stage:"Второе обновление",title:"Sabi Games",image:"sabi-games-approved.png",intro:"Игровой слой Sabi: события, визуальные подарки, развлечения и безопасный досуг.",tags:["Игры","События","Подарки","Досуг"],sections:{"Что это":"Будущее развлекательное направление Sabi для лёгких игр, событий и интерактивности.","Для кого":"Для пользователей, авторов, сообществ и партнёров entertainment-направлений.","Роль Sabi AI":"Sabi AI сможет помогать контролировать честность механик, жалобы и безопасное поведение.","Статус":"Запланировано для второго обновления."}}
];
const formTitles = {manufacturers:"Производители и поставщики",taxiAgents:"Агенты такси",marketplace:"Marketplace и сервисы",clients:"Клиенты и компании",ecoProjects:"Экологические проекты"};
const formContexts = {manufacturers:"Для товаров, продуктов, брендов, витрин и поставок в будущую коммерческую экосистему Sabi.",taxiAgents:"Для городских представителей, которые хотят развивать такси-направление Sabi по официальным правилам сотрудничества.",marketplace:"Для магазинов, отелей, супермаркетов, сервисных компаний и партнёров следующих направлений Sabi.",clients:"Для корпоративных клиентов, деловых запросов, партнёрских предложений и долгосрочного сотрудничества.",ecoProjects:"Для экологических инициатив со всего мира. Заявка принимается к рассмотрению только с доказательствами: страна, город, место, фото, видео, документы, бюджет, план и официальное подтверждение ответственных структур страны реализации. После проверки проект может попасть в публичный реестр и быть опубликован для голосования полностью верифицированных пользователей. Реализация выбранного проекта проходит через прозрачный тендер. Программа использует собственные выделенные средства Sabi и не принимает пожертвования и инвестиции. Для публичного рассмотрения нужен комплект документов: заявка, доказательства, подтверждения, бюджет, план, материалы с места и будущая карточка результата."};
function card(item,index){const tags=item.tags.map(t=>`<span>${t}</span>`).join("");return `<button class="program-card" type="button" data-program="${index}" aria-label="Открыть описание ${item.title}"><img src="${assetBase+item.image}" alt="${item.title}" loading="lazy" decoding="async"><span class="program-card-content"><small>${item.stage}</small><h3>${item.title}</h3><p>${item.intro}</p><span class="tag-row">${tags}</span><span class="open-label">Открыть описание</span></span></button>`}
function render(){document.getElementById("firstGrid").innerHTML=firstPrograms.map(card).join("");document.getElementById("secondGrid").innerHTML=secondPrograms.map((p,i)=>card(p,i+firstPrograms.length)).join("");}
function allPrograms(){return [...firstPrograms,...secondPrograms];}
let lastProgramTrigger=null;
function openProgram(index){const item=allPrograms()[index];if(!item)return;lastProgramTrigger=document.activeElement;document.getElementById("modalImage").src=assetBase+item.image;document.getElementById("modalImage").alt=item.title;document.getElementById("modalStage").textContent=item.stage;document.getElementById("modalTitle").textContent=item.title;document.getElementById("modalIntro").textContent=item.intro;document.getElementById("modalTags").innerHTML=item.tags.map(t=>`<span>${t}</span>`).join("");document.getElementById("modalSections").innerHTML=Object.entries(item.sections).map(([k,v])=>`<article><b>${k}</b><span>${v}</span></article>`).join("")+`<article class="modal-public-note"><b>Формат</b><span>Публичное описание направления Sabi для ознакомления и делового диалога.</span></article>`;document.getElementById("programModal").classList.add("open");document.getElementById("programModal").setAttribute("aria-hidden","false");document.body.classList.add("modal-open");}
function closeModal(){document.getElementById("programModal").classList.remove("open");document.getElementById("programModal").setAttribute("aria-hidden","true");document.body.classList.remove("modal-open");if(lastProgramTrigger&&typeof lastProgramTrigger.focus==="function")lastProgramTrigger.focus();}
function neurons(){if(visualAuditMode || matchMedia("(prefers-reduced-motion: reduce)").matches)return;const canvas=document.getElementById("neuronCanvas");if(!canvas)return;const ctx=canvas.getContext("2d");if(!ctx)return;let w,h,points=[];const resize=()=>{w=canvas.width=innerWidth*devicePixelRatio;h=canvas.height=innerHeight*devicePixelRatio;canvas.style.width=innerWidth+"px";canvas.style.height=innerHeight+"px";points=Array.from({length:Math.min(92,Math.floor(innerWidth/18))},()=>({x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-.5)*.22*devicePixelRatio,vy:(Math.random()-.5)*.22*devicePixelRatio,r:(Math.random()*1.8+1)*devicePixelRatio}))};resize();addEventListener("resize",resize,{passive:true});function draw(){ctx.clearRect(0,0,w,h);ctx.fillStyle="rgba(31,68,132,.36)";ctx.strokeStyle="rgba(31,68,132,.12)";for(const p of points){p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>w)p.vx*=-1;if(p.y<0||p.y>h)p.vy*=-1;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill()}for(let i=0;i<points.length;i++){for(let j=i+1;j<points.length;j++){const a=points[i],b=points[j],dx=a.x-b.x,dy=a.y-b.y,d=Math.hypot(dx,dy);if(d<165*devicePixelRatio){ctx.globalAlpha=(1-d/(165*devicePixelRatio))*.8;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();ctx.globalAlpha=1}}}requestAnimationFrame(draw)}draw();}

function setupLiveBalance(){
  const selectors = {
    companyBalance:"[data-live-company-balance]",
    ecoAllocation:"[data-live-eco-allocation]",
    ecoExpenses:"[data-live-eco-expenses]",
    projectCount:"[data-live-project-count]",
    boardCompany:"[data-live-board-company]",
    boardEco:"[data-live-board-eco]",
    boardProjects:"[data-live-board-projects]",
    boardExpenses:"[data-live-board-expenses]",
    boardSource:"[data-live-board-source]",
    boardUpdated:"[data-live-board-updated]",
    syncProject:"[data-sync-project-id]",
    syncStatus:"[data-sync-project-status]",
    syncMoney:"[data-sync-money-status]",
    syncEvidence:"[data-sync-evidence-status]",
    syncVote:"[data-sync-vote-status]",
    syncPublish:"[data-sync-publish-status]",
  };
  const setText = (selector, value) => {
    const node = document.querySelector(selector);
    if(node) node.textContent = String(value);
  };
  const money = (value) => {
    const number = Number(value);
    if(!Number.isFinite(number) || number < 0) return "0.00";
    return number.toLocaleString("ru-RU", {minimumFractionDigits:2, maximumFractionDigits:2});
  };
  const zeroState = () => {
    setText(selectors.companyBalance, "0.00");
    setText(selectors.ecoAllocation, "0.00");
    setText(selectors.ecoExpenses, "0.00");
    setText(selectors.projectCount, "0");
    setText(selectors.boardCompany, "0.00");
    setText(selectors.boardEco, "0.00");
    setText(selectors.boardProjects, "0");
    setText(selectors.boardExpenses, "0.00");
    setText(selectors.boardSource, "до запуска");
    setText(selectors.boardUpdated, "после запуска");
    setText(selectors.syncProject, "после запуска");
    setText(selectors.syncStatus, "после запуска");
    setText(selectors.syncMoney, "0.00");
    setText(selectors.syncEvidence, "после запуска");
    setText(selectors.syncVote, "после запуска");
    setText(selectors.syncPublish, "после запуска");
  };
  const applySnapshot = (snapshot) => {
    if(!snapshot || snapshot.verified !== true){
      zeroState();
      return;
    }
    const companyBalance = Number(snapshot.companyBalance || 0);
    const ecoAllocation = Number(snapshot.ecoAllocation ?? companyBalance * 0.15);
    const ecoExpenses = Number(snapshot.ecoExpenses || 0);
    const projects = Number(snapshot.projects || 0);
    const source = snapshot.sourceLabel || snapshot.publicStatus || "подтверждено";
    const updatedAt = snapshot.updatedAt ? new Date(snapshot.updatedAt) : new Date();
    const updatedText = Number.isNaN(updatedAt.getTime()) ? "подтверждено" : updatedAt.toLocaleString("ru-RU");
    setText(selectors.companyBalance, money(companyBalance));
    setText(selectors.ecoAllocation, money(ecoAllocation));
    setText(selectors.ecoExpenses, money(ecoExpenses));
    setText(selectors.projectCount, Number.isFinite(projects) ? String(projects) : "0");
    setText(selectors.boardCompany, money(companyBalance));
    setText(selectors.boardEco, money(ecoAllocation));
    setText(selectors.boardProjects, Number.isFinite(projects) ? String(projects) : "0");
    setText(selectors.boardExpenses, money(ecoExpenses));
    setText(selectors.boardSource, source);
    setText(selectors.boardUpdated, updatedText);
    setText(selectors.syncProject, snapshot.projectIdStatus || "подтверждено");
    setText(selectors.syncStatus, snapshot.projectStatus || "подтверждено");
    setText(selectors.syncMoney, money(ecoAllocation));
    setText(selectors.syncEvidence, snapshot.evidenceStatus || "подтверждено");
    setText(selectors.syncVote, snapshot.voteStatus || "подтверждено");
    setText(selectors.syncPublish, snapshot.publishStatus || "подтверждено");
  };
  window.SABI_APPLY_PUBLIC_SNAPSHOT = applySnapshot;
  applySnapshot(window.SABI_PUBLIC_FINANCE_SNAPSHOT);
  let lastSnapshot = window.SABI_PUBLIC_FINANCE_SNAPSHOT;
  setInterval(() => {
    if(window.SABI_PUBLIC_FINANCE_SNAPSHOT !== lastSnapshot){
      lastSnapshot = window.SABI_PUBLIC_FINANCE_SNAPSHOT;
      applySnapshot(lastSnapshot);
    }
  }, 1000);
}
function setup(){if(visualAuditMode){document.body.classList.add("visual-audit-mode");const canvas=document.getElementById("neuronCanvas");if(canvas){canvas.setAttribute("hidden","");canvas.style.display="none"}}render();neurons();setupLiveBalance();const header=document.getElementById("siteHeader"),progress=document.getElementById("progress"),nav=[...document.querySelectorAll(".main-nav a")];const sections=nav.map(a=>document.querySelector(a.getAttribute("href"))).filter(Boolean);const onScroll=()=>{const max=Math.max(1,document.documentElement.scrollHeight-innerHeight);progress.style.width=(scrollY/max*100)+"%";header.classList.toggle("scrolled",scrollY>20);let current=sections[0];for(const s of sections){if(s.getBoundingClientRect().top<innerHeight*.36)current=s}nav.forEach(a=>{const active=a.getAttribute("href")==="#"+current.id;a.classList.toggle("active",active);if(active){a.setAttribute("aria-current","true")}else{a.removeAttribute("aria-current")}})};addEventListener("scroll",onScroll,{passive:true});onScroll();const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("show")}),{threshold:.12});document.querySelectorAll(".reveal").forEach(el=>io.observe(el));document.addEventListener("click",e=>{const p=e.target.closest(".program-card");if(p)openProgram(Number(p.dataset.program));if(e.target.matches('[data-close="modal"]'))closeModal();const c=e.target.closest(".coop-type");if(c){document.querySelectorAll(".coop-type").forEach(x=>x.classList.remove("active"));c.classList.add("active");document.getElementById("formType").value=c.dataset.form;document.getElementById("formTitle").textContent=formTitles[c.dataset.form];document.getElementById("formContext").textContent=formContexts[c.dataset.form];document.getElementById("formResult").textContent=""}const btn=e.target.closest("[data-scroll]");if(btn){const track=document.getElementById(btn.dataset.scroll==="first"?"firstGrid":"secondGrid");track.scrollBy({left:Number(btn.dataset.dir)*420,behavior:"smooth"})}});document.getElementById("menuToggle").addEventListener("click",()=>{const nav=document.getElementById("mainNav");nav.classList.toggle("open");document.getElementById("menuToggle").setAttribute("aria-expanded",nav.classList.contains("open"));});nav.forEach(a=>a.addEventListener("click",()=>{document.getElementById("mainNav").classList.remove("open");document.getElementById("menuToggle").setAttribute("aria-expanded","false")}));document.getElementById("coopForm").addEventListener("submit",e=>{e.preventDefault();const data=Object.fromEntries(new FormData(e.currentTarget).entries());const clean=value=>String(value||"—").trim()||"—";const result=document.getElementById("formResult");result.textContent=`Анкета подготовлена.
Направление: ${formTitles[data.formType]}.
Имя: ${clean(data.name)}.
Компания: ${clean(data.company)}.
Страна и город: ${clean(data.location)}.
Контакт: ${clean(data.contact)}.
Email: ${clean(data.email)}.
Описание: ${clean(data.message)}.
Для отправки используйте официальный контакт Sabi: admin@sabiai.app. Если это экологический проект, укажите страну, город, точное место реализации, проблему, ожидаемый результат, примерный бюджет, план работ, документы, фото и видео с места, контакты для проверки и данные ответственных государственных, муниципальных или иных уполномоченных структур. Без доказательств и подтверждения проект не публикуется для голосования. Проект проходит протокол допуска: доказательства, законность, польза, реалистичность и открытость результата. После выбора проекта для исполнения объявляется прозрачный тендер: участники должны предоставить документы, смету, сроки, план работ и подтверждение законной деятельности. Sabi выступает против мошенничества, отмывания денег, коррупции и преступности, уважает честность и одобряет только легальные действия. При выявлении признаков нарушений Sabi SuperApp сохраняет доказательства проверки и, в рамках применимого законодательства, передаёт информацию в компетентные правоохранительные органы. Ключевые этапы после проверки публикуются на сайте и в официальном канале Sabi Messenger. Каждая публичная сумма должна иметь дату, основание и подтверждающий материал. После публикации проект должен иметь публичный паспорт: место, доказательства, статус голосования, выбранный исполнитель, сумма, расходы и отчёт. После выполнения добавляется карточка результата: что сделано, фото и видео до/после, документы и публикация в Sabi Messenger.`;const copyBtn=document.getElementById("copyFormResult");if(copyBtn){copyBtn.hidden=false;copyBtn.textContent="Скопировать анкету"}});const copyBtn=document.getElementById("copyFormResult");
if(copyBtn){copyBtn.addEventListener("click",async()=>{const result=document.getElementById("formResult").textContent.trim();if(!result)return;try{await navigator.clipboard.writeText(result);copyBtn.textContent="Анкета скопирована";setTimeout(()=>copyBtn.textContent="Скопировать анкету",1800)}catch(err){copyBtn.textContent="Скопируйте текст вручную";setTimeout(()=>copyBtn.textContent="Скопировать анкету",2200)}})}
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal()});}
document.addEventListener("DOMContentLoaded",setup);


/* SABI_ADMIN_ENTRY_258D_FORCE_START */
(function(){
  var target="admin-gate.html?v=258d";
  function isAdmin(el){
    if(!el) return false;
    var t=((el.textContent||"")+" "+(el.getAttribute&&el.getAttribute("aria-label")||"")+" "+(el.getAttribute&&el.getAttribute("href")||"")+" "+(el.className||"")).toLowerCase();
    return t.indexOf("admin")>=0 || t.indexOf("админ")>=0 || t.indexOf("admin-entry")>=0;
  }
  function go(e){ if(e&&e.preventDefault)e.preventDefault(); window.location.href=target; }
  function wire(){
    var items=document.querySelectorAll("a,button,[role='button'],.admin,[class*='admin'],[data-admin]");
    for(var i=0;i<items.length;i++){
      var el=items[i];
      if(isAdmin(el)){
        if(el.tagName&&el.tagName.toLowerCase()==="a") el.setAttribute("href",target);
        if(!el.__sabiAdmin258D){el.__sabiAdmin258D=true;el.addEventListener("click",go,true);}
      }
    }
  }
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",wire); else wire();
  document.addEventListener("click",function(e){
    var el=e.target&&e.target.closest?e.target.closest("a,button,[role='button'],.admin,[class*='admin'],[data-admin]"):null;
    if(isAdmin(el)) go(e);
  },true);
})();
/* SABI_ADMIN_ENTRY_258D_FORCE_END */

/* SABI_AI_STUDIO_PUBLIC_266F_CHAT_START */
(function () {
  const studio = document.querySelector("#sabi-ai-studio");
  if (!studio) return;

  const input = studio.querySelector("[data-sabi-studio-input]");
  const composer = studio.querySelector("[data-sabi-studio-composer]");
  const chat = studio.querySelector(".sabi-studio-chat");
  const modeButtons = studio.querySelectorAll("[data-sabi-mode]");
  const promptButtons = studio.querySelectorAll("[data-sabi-prompt]");
  const newChat = studio.querySelector("[data-sabi-studio-action='new-chat']");

  function autoResize() {
    if (!input) return;
    input.style.height = "auto";
    input.style.height = Math.min(input.scrollHeight, 160) + "px";
  }

  function addMessage(kind, text) {
    if (!chat || !text) return;

    const article = document.createElement("article");
    article.className = "sabi-message " + kind;

    if (kind === "ai") {
      const avatar = document.createElement("div");
      avatar.className = "sabi-avatar";
      avatar.textContent = "S";
      article.appendChild(avatar);
    }

    const bubble = document.createElement("div");
    bubble.className = "sabi-bubble";

    const title = document.createElement("strong");
    title.textContent = kind === "ai" ? "Sabi AI" : "You";

    const paragraph = document.createElement("p");
    paragraph.textContent = text;

    bubble.appendChild(title);
    bubble.appendChild(paragraph);
    article.appendChild(bubble);

    chat.appendChild(article);
    chat.scrollTop = chat.scrollHeight;
  }

  if (input) {
    input.addEventListener("input", autoResize);
  }

  if (composer) {
    composer.addEventListener("submit", function (event) {
      event.preventDefault();
      const text = input ? input.value.trim() : "";
      if (!text) return;

      addMessage("user", text);
      if (input) {
        input.value = "";
        autoResize();
      }

      addMessage(
        "ai",
        "Frontend Studio UI принял задачу. Live AI ответ будет работать после подключения backend AI runtime."
      );
    });
  }

  modeButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      modeButtons.forEach(function (item) { item.classList.remove("is-active"); });
      button.classList.add("is-active");
      const mode = button.getAttribute("data-sabi-mode") || "chat";
      addMessage("ai", "Режим выбран: " + mode + ". Интерфейс готов, runtime подключается отдельным backend stage.");
    });
  });

  promptButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const prompt = button.getAttribute("data-sabi-prompt") || "";
      if (input) {
        input.value = prompt;
        autoResize();
        input.focus();
      }
    });
  });

  if (newChat && chat) {
    newChat.addEventListener("click", function () {
      chat.innerHTML = "";
      addMessage("ai", "Новый чат открыт. Напишите задачу для Sabi AI.");
    });
  }
})();
/* SABI_AI_STUDIO_PUBLIC_266F_CHAT_END */
