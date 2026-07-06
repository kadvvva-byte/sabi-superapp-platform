// 237N-FIX75-EN-SCREEN-VISIBLE-STEP1-NO-RU-TEXT
const assetBase = "./assets/approved/237k/";
const visualAuditMode = new URLSearchParams(location.search).has("visualAudit");
if (visualAuditMode) {
  document.documentElement.dataset.visualAudit = "true";
}
const firstPrograms = [
  {stage:"First launch",title:"Sabi Finance Center",image:"sabi-finance center-approved.png",intro:"The future finance section of Sabi: account records, invoices, operation history and compliance controls, launched only after legal and provider readiness.",tags:["Balance","Operations","History","Control"],sections:{"What it is":"Sabi Finance Center is the future regulated finance section of SuperApp for account records, invoices, operation history and provider-approved actions in a premium interface.","For whom":"For users, future Sabi clients and people who need simple control over financial actions.","How it works":"The user sees a financial centre, operation history and available actions. Financial functions launch step by step, subject to legal and service readiness.","Sabi AI role":"Sabi AI helps detect risk signals, suspicious actions and non-standard operations.","Official procedure":"Critical financial matters and disputes are reviewed under official company rules."}},
  {stage:"First launch",title:"Sabi Messenger",image:"sabi-messenger-approved.png",intro:"A premium communication space: chats, groups, channels, media and quick actions.",tags:["Chats","Groups","Channels","Media"],sections:{"What it is":"Sabi Messenger is the communication centre for personal and work communication inside SuperApp.","For whom":"For users, teams, agents, support, clients and partners.","How it works":"Users communicate, send media, receive notifications and quickly move to related Sabi functions.","Sabi AI role":"Sabi AI helps detect complaints, abuse, unsafe messages and risky behaviour scenarios.","Official procedure":"Serious violations, disputed cases and moderation rules follow official procedures."}},
  {stage:"First launch",title:"Sabi Taxi",image:"sabi-taxi-approved.png",intro:"Rides, driver, route, tariffs, safety and service-quality control.",tags:["Rides","Drivers","Safety","Quality"],sections:{"What it is":"Sabi Taxi is the ride-ordering area for route selection, tariff choice and driver interaction.","For whom":"For passengers, drivers, taxi agents, city teams and service-quality control.","How it works":"A passenger chooses route and tariff, a driver receives an order under admission rules, and disputes are recorded for review.","Sabi AI role":"Sabi AI helps analyse complaints, suspicious cancellations, violations and ride quality.","Official procedure":"Admission rules, disputed blocks and serious violations follow the official Sabi procedure."}},
  {stage:"First launch",title:"Sabi Stream",image:"sabi-stream-approved.png",intro:"Live streams, creators, audience, gifts, visual effects and a safe stage.",tags:["Streams","Creators","Gifts","Audience"],sections:{"What it is":"Sabi Stream is a media area for live streams, creators, viewers, visual gifts and interactivity.","For whom":"For creators, viewers, brands, partners, moderators and future creator areas of Sabi.","How it works":"A creator goes live, viewers interact, send visual gifts and experience a live event.","Sabi AI role":"Sabi AI helps track complaints, toxicity, risky content, violations and reputation threats.","Official procedure":"Serious moderation, monetisation rules and disputed actions follow official rules."}},
  {stage:"First launch",title:"Sabi QR",image:"sabi-qr-approved.png",intro:"Fast access to Sabi functions through scanning and clear scenarios.",tags:["QR","Access","Scan","Actions"],sections:{"What it is":"Sabi QR is a quick-access layer for SuperApp actions through QR codes.","For whom":"For users, businesses, agents, drivers, events, partners and service points.","How it works":"The user scans a code and reaches the correct Sabi scenario without unnecessary search.","Sabi AI role":"Sabi AI helps detect suspicious QR scenarios, access risk and unusual activity.","Official procedure":"Access rules and risky scenarios are reviewed under official Sabi rules."}},
  {stage:"First launch",title:"Sabi Gallery",image:"sabi-gallery-approved.png",intro:"Photos, videos, albums, moments and visual memory of SuperApp.",tags:["Photos","Videos","Albums","Media"],sections:{"What it is":"Sabi Gallery is a space for visual content inside SuperApp.","For whom":"For users, creators, support, drivers, agents, businesses and service scenarios.","How it works":"Users see media, albums and materials connected with the required Sabi functions.","Sabi AI role":"Sabi AI helps detect visual risk signals, suspicious materials and complaint evidence.","Official procedure":"Disputed materials and serious violations follow official Sabi rules."}},
  {stage:"First launch",title:"Sabi Camera",image:"sabi-camera-approved.png",intro:"Camera as an entry point to SuperApp actions: capture, documents, QR and confirmations.",tags:["Camera","Documents","Scan","Visual"],sections:{"What it is":"Sabi Camera is a visual tool for photos, documents, scans, QR and quick actions.","For whom":"For users, agents, drivers, support, businesses and service teams.","How it works":"The user captures, scans, attaches materials and moves to the required function.","Sabi AI role":"Sabi AI helps analyse documents, visual risk signals and suspicious materials.","Official procedure":"Disputed documents, evidence and serious checks follow official rules."}},
  {stage:"First launch",title:"Sabi Translation / Presentation",image:"sabi-translation-presentation-approved.png",intro:"Translation, voice, documents, presentations and international communication.",tags:["Translation","Voice","Documents","Presentation"],sections:{"What it is":"Translation / Presentation is an area for translation, explanation, material preparation and presentation mode.","For whom":"For international users, businesses, managers, support, teams and clients.","How it works":"The user translates text or voice, prepares material and uses Sabi as a communication environment.","Sabi AI role":"Sabi AI helps keep context, structure meaning and detect risk signals in sensitive communications.","Official procedure":"Legal, strategic and disputed decisions follow official company rules."}}
];
const secondPrograms = [
  {stage:"Second update",title:"Sabi Marketplace",image:"sabi-marketplace-approved.png",intro:"A trading environment for goods, storefronts, sellers, orders and trusted purchases.",tags:["Goods","Stores","Orders","Trust"],sections:{"What it is":"A future commercial part of Sabi for goods, sellers, storefronts and orders.","For whom":"For buyers, sellers, brands, stores, suppliers and partners.","Sabi AI role":"Sabi AI can help identify seller risk, suspicious orders, complaints and quality violations.","Status":"Planned for the second update after the first launch."}},
  {stage:"Second update",title:"Sabi Hotels",image:"sabi-hotels-approved.png",intro:"Accommodation scenario: cities, dates, hotels, booking and service support.",tags:["Hotels","City","Dates","Travel"],sections:{"What it is":"A future section for finding accommodation and choosing city, dates and hotels.","For whom":"For travellers, hotels, partners, city guests and travel services.","Sabi AI role":"Sabi AI can track complaints, review risk, suspicious bookings and service quality.","Status":"Planned for the second update."}},
  {stage:"Second update",title:"Sabi Supermarket",image:"sabi-supermarket-approved.png",intro:"Everyday shopping: groceries, basket, delivery, categories and home.",tags:["Groceries","Basket","Delivery","Home"],sections:{"What it is":"A future grocery section for everyday purchases, categories, basket and delivery.","For whom":"For families, users, shops, couriers, city services and suppliers.","Sabi AI role":"Sabi AI can analyse complaints, order quality and suspicious actions.","Status":"Planned for the second update."}},
  {stage:"Second update",title:"Sabi Games",image:"sabi-games-approved.png",intro:"Sabi gaming layer: events, visual gifts, entertainment and safe leisure.",tags:["Games","Events","Gifts","Leisure"],sections:{"What it is":"A future entertainment area of Sabi for light games, events and interactivity.","For whom":"For users, creators, communities and entertainment partners.","Sabi AI role":"Sabi AI can help control mechanic fairness, complaints and safe behaviour.","Status":"Planned for the second update."}}
];
const formTitles = {manufacturers:"Manufacturers and suppliers",taxiAgents:"Taxi agents",marketplace:"Marketplace and services",clients:"Clients and companies",ecoProjects:"Ecological projects"};
const formContexts = {manufacturers:"For goods, products, brands, storefronts and supplies in the future Sabi commercial ecosystem.",taxiAgents:"For city representatives who want to develop the Sabi taxi area under official cooperation rules.",marketplace:"For stores, hotels, supermarkets, service companies and partners of future Sabi areas.",clients:"For corporate clients, business enquiries, partnership proposals and long-term cooperation.",ecoProjects:"For ecological initiatives from around the world. An application is considered only with evidence: country, city, location, photos, videos, documents, budget, plan and official confirmation from responsible structures. After review, the project may enter the public registry and be published for voting by fully verified users. Implementation goes through a transparent tender and uses Sabi company funds only, without donations or investments."};
function card(item,index){const tags=item.tags.map(t=>`<span>${t}</span>`).join("");return `<button class="program-card" type="button" data-program="${index}" aria-label="Open details ${item.title}"><img src="${assetBase+item.image}" alt="${item.title}" loading="lazy" decoding="async"><span class="program-card-content"><small>${item.stage}</small><h3>${item.title}</h3><p>${item.intro}</p><span class="tag-row">${tags}</span><span class="open-label">Open details</span></span></button>`}
function render(){document.getElementById("firstGrid").innerHTML=firstPrograms.map(card).join("");document.getElementById("secondGrid").innerHTML=secondPrograms.map((p,i)=>card(p,i+firstPrograms.length)).join("");}
function allPrograms(){return [...firstPrograms,...secondPrograms];}
let lastProgramTrigger=null;
function openProgram(index){const item=allPrograms()[index];if(!item)return;lastProgramTrigger=document.activeElement;document.getElementById("modalImage").src=assetBase+item.image;document.getElementById("modalImage").alt=item.title;document.getElementById("modalStage").textContent=item.stage;document.getElementById("modalTitle").textContent=item.title;document.getElementById("modalIntro").textContent=item.intro;document.getElementById("modalTags").innerHTML=item.tags.map(t=>`<span>${t}</span>`).join("");document.getElementById("modalSections").innerHTML=Object.entries(item.sections).map(([k,v])=>`<article><b>${k}</b><span>${v}</span></article>`).join("")+`<article class="modal-public-note"><b>Format</b><span>Public Sabi program description for review and business dialogue.</span></article>`;document.getElementById("programModal").classList.add("open");document.getElementById("programModal").setAttribute("aria-hidden","false");document.body.classList.add("modal-open");}
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
    return number.toLocaleString("en-GB", {minimumFractionDigits:2, maximumFractionDigits:2});
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
    setText(selectors.boardSource, "before launch");
    setText(selectors.boardUpdated, "after launch");
    setText(selectors.syncProject, "after launch");
    setText(selectors.syncStatus, "after launch");
    setText(selectors.syncMoney, "0.00");
    setText(selectors.syncEvidence, "after launch");
    setText(selectors.syncVote, "after launch");
    setText(selectors.syncPublish, "after launch");
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
    const source = snapshot.sourceLabel || snapshot.publicStatus || "verified";
    const updatedAt = snapshot.updatedAt ? new Date(snapshot.updatedAt) : new Date();
    const updatedText = Number.isNaN(updatedAt.getTime()) ? "verified" : updatedAt.toLocaleString("en-GB");
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
    setText(selectors.syncProject, snapshot.projectIdStatus || "verified");
    setText(selectors.syncStatus, snapshot.projectStatus || "verified");
    setText(selectors.syncMoney, money(ecoAllocation));
    setText(selectors.syncEvidence, snapshot.evidenceStatus || "verified");
    setText(selectors.syncVote, snapshot.voteStatus || "verified");
    setText(selectors.syncPublish, snapshot.publishStatus || "verified");
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
function setup(){if(visualAuditMode){document.body.classList.add("visual-audit-mode");const canvas=document.getElementById("neuronCanvas");if(canvas){canvas.setAttribute("hidden","");canvas.style.display="none"}}render();neurons();setupLiveBalance();const header=document.getElementById("siteHeader"),progress=document.getElementById("progress"),nav=[...document.querySelectorAll(".main-nav a")];const sections=nav.map(a=>document.querySelector(a.getAttribute("href"))).filter(Boolean);const onScroll=()=>{const max=Math.max(1,document.documentElement.scrollHeight-innerHeight);progress.style.width=(scrollY/max*100)+"%";header.classList.toggle("scrolled",scrollY>20);let current=sections[0];for(const s of sections){if(s.getBoundingClientRect().top<innerHeight*.36)current=s}nav.forEach(a=>{const active=a.getAttribute("href")==="#"+current.id;a.classList.toggle("active",active);if(active){a.setAttribute("aria-current","true")}else{a.removeAttribute("aria-current")}})};addEventListener("scroll",onScroll,{passive:true});onScroll();const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("show")}),{threshold:.12});document.querySelectorAll(".reveal").forEach(el=>io.observe(el));document.addEventListener("click",e=>{const p=e.target.closest(".program-card");if(p)openProgram(Number(p.dataset.program));if(e.target.matches('[data-close="modal"]'))closeModal();const c=e.target.closest(".coop-type");if(c){document.querySelectorAll(".coop-type").forEach(x=>x.classList.remove("active"));c.classList.add("active");document.getElementById("formType").value=c.dataset.form;document.getElementById("formTitle").textContent=formTitles[c.dataset.form];document.getElementById("formContext").textContent=formContexts[c.dataset.form];document.getElementById("formResult").textContent=""}const btn=e.target.closest("[data-scroll]");if(btn){const track=document.getElementById(btn.dataset.scroll==="first"?"firstGrid":"secondGrid");track.scrollBy({left:Number(btn.dataset.dir)*420,behavior:"smooth"})}});document.getElementById("menuToggle").addEventListener("click",()=>{const nav=document.getElementById("mainNav");nav.classList.toggle("open");document.getElementById("menuToggle").setAttribute("aria-expanded",nav.classList.contains("open"));});nav.forEach(a=>a.addEventListener("click",()=>{document.getElementById("mainNav").classList.remove("open");document.getElementById("menuToggle").setAttribute("aria-expanded","false")}));document.getElementById("coopForm").addEventListener("submit",e=>{e.preventDefault();const data=Object.fromEntries(new FormData(e.currentTarget).entries());const clean=value=>String(value||"—").trim()||"—";const result=document.getElementById("formResult");result.textContent=`Application prepared.
Area: ${formTitles[data.formType]}.
Name: ${clean(data.name)}.
Company: ${clean(data.company)}.
Country and city: ${clean(data.location)}.
Contact: ${clean(data.contact)}.
Email: ${clean(data.email)}.
Description: ${clean(data.message)}.
Use the official Sabi contact to send the request: admin@sabiai.app. If this is an ecological project, include country, city, exact location, problem, expected result, approximate budget, work plan, documents, photos and videos from the site, verification contacts and details of responsible state, municipal or other authorised structures. Without evidence and confirmation, the project is not published for voting. Sabi opposes fraud, money laundering, corruption and criminal activity. If signs of violations are detected, Sabi preserves review evidence and, within applicable law, provides information to competent law-enforcement authorities.`;const copyBtn=document.getElementById("copyFormResult");if(copyBtn){copyBtn.hidden=false;copyBtn.textContent="Copy application"}});const copyBtn=document.getElementById("copyFormResult");
if(copyBtn){copyBtn.addEventListener("click",async()=>{const result=document.getElementById("formResult").textContent.trim();if(!result)return;try{await navigator.clipboard.writeText(result);copyBtn.textContent="Application copied";setTimeout(()=>copyBtn.textContent="Copy application",1800)}catch(err){copyBtn.textContent="Copy the text manually";setTimeout(()=>copyBtn.textContent="Copy application",2200)}})}
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal()});}
document.addEventListener("DOMContentLoaded",setup);


/* SABI_ADMIN_ENTRY_258D_FORCE_START */
(function(){
  var target="admin-gate-en.html?v=258d";
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
