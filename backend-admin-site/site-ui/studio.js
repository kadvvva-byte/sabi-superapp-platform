(function(){
  "use strict";

  const state = { view: "home", mode: "chat" };
  const chatRoutes = ["/api/sabi-ai-studio/runtime/chat", "/api/sabi-ai-studio/chat"];
  const apiRoutes = {
    image: "/api/sabi-ai-studio/engines/267x/image",
    video: "/api/sabi-ai-studio/engines/267x/video",
    videoFinal: "/api/sabi-ai-studio/engines/268a/video/final",
    speech: "/api/sabi-ai-studio/engines/267v/speech",
    music: "/api/sabi-ai-studio/engines/267v/music",
    doc: "/api/sabi-ai-studio/engines/268b/analyze/document",
    imageAnalyze: "/api/sabi-ai-studio/engines/268b/analyze/image",
    audioAnalyze: "/api/sabi-ai-studio/engines/268b/analyze/audio",
    videoAnalyze: "/api/sabi-ai-studio/engines/268b/analyze/video",
    maps: "/api/sabi-ai-studio/engines/268d/maps/geocode",
    places: "/api/sabi-ai-studio/engines/268d/maps/place-search",
    learning: "/api/sabi-ai-studio/engines/268e/learning/list",
    readiness: [
      "/api/sabi-ai-studio/engines/267v/readiness",
      "/api/sabi-ai-studio/engines/267x/readiness",
      "/api/sabi-ai-studio/engines/268a/readiness",
      "/api/sabi-ai-studio/engines/268b/readiness",
      "/api/sabi-ai-studio/engines/268d/maps/readiness",
      "/api/sabi-ai-studio/engines/268e/learning/readiness"
    ]
  };

  const $ = (q) => document.querySelector(q);
  const $$ = (q) => Array.from(document.querySelectorAll(q));

  function show(view){
    state.view = view;
    $$(".view").forEach(v => v.classList.toggle("active", v.id === "view-" + view));
    $$(".nav-button").forEach(b => b.classList.toggle("active", b.dataset.view === view));
    if (view === "history") renderHistory();
    if (view === "projects") renderProjects();
    if (view === "library") renderLibrary();
  }

  function mode(mode){
    state.mode = mode || "chat";
    $("[data-view='chat']") && show("chat");
    $$("#stickerRow [data-mode]").forEach(b => b.classList.toggle("active", b.dataset.mode === state.mode));
  }

  async function call(path, payload){
    const opt = { method: payload ? "POST" : "GET", headers: { "Content-Type": "application/json" } };
    if (payload) opt.body = JSON.stringify(payload);
    const res = await fetch(path, opt);
    const raw = await res.text();
    let body = null;
    try { body = raw ? JSON.parse(raw) : null; } catch(e) {}
    return { ok: res.ok, status: res.status, body, raw };
  }

  function answer(body){
    if (!body) return "";
    const list = [body.answer, body.reply, body.text, body.message, body.content, body.result && body.result.answer, body.result && body.result.text, body.data && body.data.answer, body.data && body.data.text];
    for (const x of list) if (typeof x === "string" && x.trim()) return x.trim();
    return JSON.stringify(body, null, 2);
  }

  function b64(body, type){
    const list = type === "audio"
      ? [body && body.audioBase64, body && body.base64, body && body.audio && body.audio.base64, body && body.result && body.result.audioBase64]
      : [body && body.imageBase64, body && body.base64, body && body.image && body.image.base64, body && body.result && body.result.imageBase64, body && body.images && body.images[0] && body.images[0].base64];
    return list.find(x => typeof x === "string" && x.length > 100) || "";
  }

  function mime(body, fallback){ return body && (body.mimeType || body.mediaType || body.contentType || body.result && body.result.mimeType) || fallback; }

  function push(role, content){
    const box = $("#messages");
    const row = document.createElement("div");
    row.className = "message " + role;
    if (role === "ai") {
      const avatar = document.createElement("div");
      avatar.className = "avatar";
      row.appendChild(avatar);
    }
    const bubble = document.createElement("div");
    bubble.className = "bubble";
    const strong = document.createElement("strong");
    strong.textContent = role === "user" ? "You" : role === "error" ? "Error" : "Sabi AI";
    bubble.appendChild(strong);
    if (typeof content === "string") {
      const p = document.createElement("p");
      p.textContent = content;
      bubble.appendChild(p);
    } else {
      bubble.appendChild(content);
    }
    row.appendChild(bubble);
    box.appendChild(row);
    box.scrollTop = box.scrollHeight;
  }

  function addHistory(title, type){
    const items = JSON.parse(localStorage.getItem("sabiStudioHistory") || "[]");
    items.unshift({ title: title.slice(0,80), type: type || state.mode, at: new Date().toISOString() });
    localStorage.setItem("sabiStudioHistory", JSON.stringify(items.slice(0,32)));
    renderSidebarHistory();
  }

  function renderSidebarHistory(){
    const box = $("#sidebarHistory");
    const items = JSON.parse(localStorage.getItem("sabiStudioHistory") || "[]");
    box.innerHTML = "";
    if (!items.length) { box.innerHTML = "<span>No chats yet</span>"; return; }
    items.slice(0,6).forEach(it => {
      const b = document.createElement("button");
      b.textContent = it.title;
      b.onclick = () => show("history");
      box.appendChild(b);
    });
  }

  async function chat(prompt){
    let last = "";
    for (const r of chatRoutes) {
      const res = await call(r, { message: prompt, mode: state.mode, language: "ru", publicIdentity: "sabi-ai" });
      if (res.ok && res.body) return answer(res.body);
      last = "HTTP " + res.status + " " + (res.raw || "");
    }
    throw new Error(last || "Sabi AI chat route unavailable");
  }

  async function makeImage(prompt){
    const res = await call(apiRoutes.image, { prompt, language: "ru" });
    if (!res.ok || !res.body || res.body.ok === false) throw new Error(answer(res.body) || res.raw);
    const data = b64(res.body, "image");
    if (!data) return push("ai", answer(res.body));
    const img = document.createElement("img");
    img.src = "data:" + mime(res.body, "image/png") + ";base64," + data;
    img.alt = "Sabi AI generated image";
    push("ai", img);
  }

  function opName(body){ return body && (body.operationName || body.operation || body.name || body.result && (body.result.operationName || body.result.operation || body.result.name)) || ""; }
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));

  async function makeVideo(prompt){
    const start = await call(apiRoutes.video, { prompt, language: "ru" });
    if (!start.ok || !start.body || start.body.ok === false) throw new Error(answer(start.body) || start.raw);
    const op = opName(start.body);
    if (!op) return push("ai", answer(start.body));
    push("ai", "Video task created. Checking final result...");
    let finalBody = null;
    for (let i=0;i<5;i++){
      await sleep(i === 0 ? 2500 : 10000);
      const fin = await call(apiRoutes.videoFinal, { operationName: op });
      finalBody = fin.body;
      if (fin.ok && fin.body && (fin.body.videoReady || fin.body.operationDone)) break;
    }
    push("ai", answer(finalBody) || ("Video is still processing. Operation: " + op));
  }

  async function makeAudio(prompt, music){
    const res = await call(music ? apiRoutes.music : apiRoutes.speech, music ? { prompt, language:"ru" } : { text: prompt, prompt, language:"ru" });
    if (!res.ok || !res.body || res.body.ok === false) throw new Error(answer(res.body) || res.raw);
    const data = b64(res.body, "audio");
    if (!data) return push("ai", answer(res.body));
    const a = document.createElement("audio");
    a.controls = true;
    a.src = "data:" + mime(res.body, music ? "audio/mpeg" : "audio/wav") + ";base64," + data;
    push("ai", a);
  }

  function pickFile(){
    return new Promise(resolve => {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*,audio/*,video/*,application/pdf,text/*,.txt,.md,.doc,.docx";
      input.onchange = () => resolve(input.files && input.files[0] || null);
      input.click();
    });
  }

  function fileBase64(file){
    return new Promise((resolve,reject)=>{
      const reader = new FileReader();
      reader.onerror = () => reject(new Error("File read failed"));
      reader.onload = () => resolve(String(reader.result || "").split(",")[1] || "");
      reader.readAsDataURL(file);
    });
  }

  async function analyzeFile(prompt){
    const file = await pickFile();
    if (!file) return push("ai", "File was not selected.");
    const inlineBase64 = await fileBase64(file);
    let route = apiRoutes.doc;
    if (file.type.startsWith("image/")) route = apiRoutes.imageAnalyze;
    if (file.type.startsWith("audio/")) route = apiRoutes.audioAnalyze;
    if (file.type.startsWith("video/")) route = apiRoutes.videoAnalyze;
    const res = await call(route, { prompt, fileName:file.name, mimeType:file.type || "application/octet-stream", inlineBase64, language:"ru" });
    if (!res.ok || !res.body || res.body.ok === false) throw new Error(answer(res.body) || res.raw);
    push("ai", answer(res.body));
  }

  async function maps(prompt){
    const isPlace = /^(place|место)\s*:/i.test(prompt);
    const clean = prompt.replace(/^(адрес|карта|map|maps|address|place|место)\s*:/i, "").trim();
    const res = await call(isPlace ? apiRoutes.places : apiRoutes.maps, isPlace ? { query: clean, language:"ru" } : { address: clean, language:"ru" });
    if (!res.ok || !res.body || res.body.ok === false) throw new Error(answer(res.body) || res.raw);
    push("ai", answer(res.body));
  }

  async function readiness(){
    const lines = [];
    for (const r of apiRoutes.readiness) {
      const res = await call(r);
      lines.push(r.split("/").slice(-2).join("/") + ": " + (res.ok && res.body && res.body.ok ? "100%" : "error"));
    }
    push("ai", lines.join("\n"));
  }

  async function run(prompt){
    if (/^(адрес|карта|map|maps|address|place|место)\s*:/i.test(prompt)) return maps(prompt);
    if (state.mode === "image") return makeImage(prompt);
    if (state.mode === "video") return makeVideo(prompt);
    if (state.mode === "music") return makeAudio(prompt, true);
    if (state.mode === "document") return analyzeFile(prompt);
    if (state.mode === "brain" || state.mode === "analytics") return readiness();
    const text = await chat("Mode: " + state.mode + "\nTask: " + prompt);
    push("ai", text);
  }

  function submitFrom(form){
    const ta = form.querySelector("textarea");
    const prompt = (ta && ta.value || "").trim();
    if (!prompt) return;
    if (ta) ta.value = "";
    show("chat");
    push("user", prompt);
    addHistory(prompt, state.mode);
    run(prompt).catch(e => push("error", e.message || String(e)));
  }

  const historySeed = [
    ["Website plan","Website","Plan and structure for your website including pages, SEO, and content..."],
    ["Admin checklist","Admin","Key tasks and operational checklist for the admin dashboard..."],
    ["Brain architecture","Sabi Brain","Design the core intelligence layer with memory, reasoning, and tools..."],
    ["App UI draft","App UI","Initial app UI screens and user flows for the mobile application..."],
    ["Safe next steps","Sabi Brain","Step-by-step execution plan with safety and validation..."],
    ["Analytics dashboard","Analytics","Overview dashboard with key metrics and performance KPIs..."],
    ["Private cloud setup","Cloud","Architecture and setup guide for isolated private cloud..."],
    ["Project brief","General","Initial project brief, goals, and success criteria..."]
  ];

  function renderHistory(){
    const rows = $("#historyRows");
    rows.innerHTML = "";
    historySeed.forEach((x,i)=>{
      const row = document.createElement("div");
      row.className = "history-row";
      row.innerHTML = `<div class="item-icon">${i===1?"▤":i===2?"⌘":i===3?"▣":i===4?"◇":i===5?"▥":"◎"}</div><div><h3>${x[0]} <small>${x[1]}</small></h3><p>${x[2]}</p></div><div>${i<2?"Today":i<5?"Yesterday":"May 2025"}</div><div class="history-actions"><button>▷ Open</button><button>↻ Reuse</button><button>☆ Pin</button><button class="danger-btn">▢</button></div>`;
      rows.appendChild(row);
    });
  }

  function renderProjects(){
    const data = [["Sabi SuperApp","All-in-one super app with AI assistant, dashboard, and analytics.","✦"],["Marketing Website","Official marketing site with landing pages and blog.","◎"],["Admin Dashboard","Internal admin dashboard with user and system management.","◇"],["AI Chat Platform","Custom AI chat platform with multi-model support.","▣"],["Documentation Hub","Product documentation and knowledge base.","▥"],["Analytics Suite","Advanced analytics and reporting suite.","▥"]];
    const box = $("#projectList");
    box.innerHTML = "";
    data.forEach(p=>{
      const row = document.createElement("div");
      row.className = "project-item";
      row.innerHTML = `<div class="item-icon">${p[2]}</div><div><h3>${p[0]}</h3><p>${p[1]}</p></div><span class="status-active">Active</span><div class="project-buttons"><button>↗</button><button>⚙</button><button>▣</button><button class="danger-btn">▢</button></div>`;
      box.appendChild(row);
    });
  }

  async function renderLibrary(){
    const box = $("#libraryGrid");
    box.innerHTML = `<article class="library-feature"><div class="preview-box"></div><div><h3>✦ Sabi Control Center Pro</h3><p>A premium admin dashboard template with analytics, user management, and real-time insights. Built for scale and performance.</p><div class="tags"><span>Admin</span><span>Dashboard</span><span>Analytics</span><span>Dark</span></div></div><div class="card-actions"><button>Use template</button><button>Preview</button></div></article>`;
    const cards = [
      ["Marketing Website","Modern marketing website with animations and CMS.","◎","Website"],
      ["Product Requirements","PRD for Sabi AI Studio v2.0 release.","▣","Document"],
      ["SaaS Dashboard UI","Complete SaaS dashboard UI kit and components.","▧","App"],
      ["Auth Service","Authentication service with JWT and roles.","</>","Code"],
      ["Hero Background","High-res background for landing pages.","▧","Image"],
      ["Investor Pitch Deck","Pitch deck for Series A investor meetings.","▤","Presentation"],
      ["E-commerce Template","Full e-commerce template with product pages.","◎","Website"],
      ["Q2 Analytics Report","Quarterly analytics and performance report.","▥","Document"]
    ];
    cards.forEach(c=>{
      const card = document.createElement("article");
      card.className = "library-card";
      card.innerHTML = `<div class="thumb">${c[2]}</div><h3>${c[0]}</h3><p>${c[1]}</p><div class="tags"><span>${c[3]}</span></div><div class="card-actions"><button>Open</button><button>Use</button><button>⋯</button></div>`;
      box.appendChild(card);
    });
    try {
      const res = await call(apiRoutes.learning + "?namespace=owner-controlled-smoke-268f");
      if (res.ok && res.body && res.body.items && res.body.items.length) {
        const card = document.createElement("article");
        card.className = "library-card";
        card.innerHTML = `<div class="thumb">☁</div><h3>Durable learning records</h3><p>${res.body.count || res.body.items.length} real stored Sabi AI learning record(s) connected.</p><div class="tags"><span>Live</span><span>Storage</span></div><div class="card-actions"><button>Open</button></div>`;
        box.appendChild(card);
      }
    } catch(e) {}
  }

  function bind(){
    $$("[data-view]").forEach(b=>b.addEventListener("click",()=>{ if (b.dataset.mode) mode(b.dataset.mode); show(b.dataset.view); }));
    $$("[data-mode]").forEach(b=>b.addEventListener("click",()=>mode(b.dataset.mode)));
    $$("[data-mode-direct]").forEach(b=>b.addEventListener("click",()=>{ mode(b.dataset.modeDirect); }));
    $$("[data-quick]").forEach(b=>b.addEventListener("click",()=>{ mode(b.dataset.quick); const text = b.querySelector("b").textContent; $("#view-chat textarea").value = text; show("chat"); }));
    $$("[data-composer]").forEach(f=>f.addEventListener("submit",e=>{ e.preventDefault(); submitFrom(f); }));
    $("#fileButton").addEventListener("click",()=>{ mode("document"); analyzeFile("Analyze this file").catch(e=>push("error",e.message||String(e))); });
    $("#clearHistory").addEventListener("click",()=>{ localStorage.removeItem("sabiStudioHistory"); renderSidebarHistory(); });
    renderSidebarHistory();
    renderHistory();
    renderProjects();
    renderLibrary();
    show("home");
    mode("website");
  }

  document.addEventListener("DOMContentLoaded", bind);
})();
