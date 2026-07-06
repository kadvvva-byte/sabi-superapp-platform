/* v55A video long-running timeout: backend requests may wait up to 7 minutes; no design/layout change */
/* v54A Gemini Media XHR/FormData Router Force - no design/layout change */
(function () {
  const BASE = (window.SABI_AI_STUDIO_GEMINI_BASE || window.location.origin);
  const CHAT = BASE + '/api/chat';
  const HEALTH = BASE + '/api/sabi-ai-studio/health';

  if (window.__sabiGeminiMediaXhrForceV54A) return;
  window.__sabiGeminiMediaXhrForceV54A = true;

  function forcedUrl(rawUrl, method) {
    try {
      const url = new URL(String(rawUrl || ''), window.location.href);
      const path = url.pathname || '';
      const isStudioApi =
        path.startsWith('/api/sabi-ai/') ||
        path.startsWith('/api/sabi-ai-studio/') ||
        path.startsWith('/api/ai/') ||
        path === '/api/chat' ||
        path === '/api/health';

      if (!isStudioApi) return rawUrl;
      if (String(method || '').toUpperCase() === 'POST' && /\/chat$/i.test(path)) return CHAT;
      if (String(method || '').toUpperCase() === 'GET' && /\/health$/i.test(path)) return HEALTH;
    } catch (_) {}
    return rawUrl;
  }

  const originalOpen = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function(method, url) {
    const nextUrl = forcedUrl(url, method);
    if (nextUrl !== url) console.log('[v54A] redirect xhr:', url, '=>', nextUrl);
    arguments[1] = nextUrl;
    return originalOpen.apply(this, arguments);
  };
})();
/* v50C Gemini Direct Fetch Router Force - no design/layout change */
(function () {
  const GEMINI_DIRECT_BASE = (window.SABI_AI_STUDIO_GEMINI_BASE || window.location.origin);
  const GEMINI_DIRECT_CHAT = GEMINI_DIRECT_BASE + '/api/chat';
  const GEMINI_DIRECT_HEALTH = GEMINI_DIRECT_BASE + '/api/sabi-ai-studio/health';

  try {
    localStorage.setItem('sabi-ai-studio-runtime-api-base', GEMINI_DIRECT_BASE);
    localStorage.setItem('sabi-ai-studio-working-route', GEMINI_DIRECT_CHAT);
    localStorage.setItem('sabi-ai-studio-backend-routes', JSON.stringify([GEMINI_DIRECT_CHAT]));
  } catch (_) {}

  if (window.__sabiGeminiDirectFetchForceV50C) return;
  window.__sabiGeminiDirectFetchForceV50C = true;

  const originalFetch = window.fetch.bind(window);

  window.fetch = function(input, init) {
    try {
      const rawUrl = typeof input === 'string' ? input : (input && input.url ? input.url : '');
      const url = new URL(rawUrl, window.location.href);
      const method = String((init && init.method) || (input && input.method) || 'GET').toUpperCase();
      const path = url.pathname || '';

      const isStudioApi =
        path.startsWith('/api/sabi-ai/') ||
        path.startsWith('/api/sabi-ai-studio/') ||
        path.startsWith('/api/ai/') ||
        path === '/api/chat' ||
        path === '/api/health';

      const isChatRoute = isStudioApi && /\/chat$/i.test(path);
      const isHealthRoute = isStudioApi && /\/health$/i.test(path);

      if (method === 'POST' && isChatRoute) {
        console.log('[v50C] redirect chat fetch:', rawUrl, '=>', GEMINI_DIRECT_CHAT);
        return originalFetch(GEMINI_DIRECT_CHAT, init || {});
      }

      if (method === 'GET' && isHealthRoute) {
        console.log('[Sabi Studio] health route:', rawUrl, '=>', GEMINI_DIRECT_HEALTH);
        return originalFetch(GEMINI_DIRECT_HEALTH, init || {});
      }
    } catch (error) {
      console.warn('[v50C] fetch redirect skipped:', error);
    }

    return originalFetch(input, init);
  };
})();
/* v50B Gemini Direct Browser Route Force - no design change */
try {
  localStorage.setItem('sabi-ai-studio-runtime-api-base', (window.SABI_AI_STUDIO_GEMINI_BASE || window.location.origin));
  localStorage.setItem('sabi-ai-studio-working-route', '/api/chat');
  localStorage.setItem('sabi-ai-studio-backend-routes', JSON.stringify([
    '/api/chat'
  ]));
} catch (_) {}
(() => {
  const app = document.getElementById('app');
  const mainCenter = document.querySelector('.main-center');
  const editor = document.getElementById('promptEditor');
  const form = document.getElementById('composer');
  const chatScreen = document.getElementById('chatScreen');
  const chatTitle = document.getElementById('chatTitle');
  const messageList = document.getElementById('messageList');
  const chatComposer = document.getElementById('chatComposer');
  const chatEditor = document.getElementById('chatEditor');
  const fileInput = document.getElementById('fileInput');
  const toast = document.getElementById('toast');
  const hideSidebarButton = document.getElementById('hideSidebar');
  const showSidebarButton = document.getElementById('showSidebar');
  const newChatButton = document.getElementById('newChat');
  const brandHomeButton = document.getElementById('brandHome');
  const attachButton = document.getElementById('attachBtn');
  const micButton = document.getElementById('micBtn');
  const chatAttachButton = document.getElementById('chatAttach');
  const chatMicButton = document.getElementById('chatMic');
  const fullscreenButton = document.getElementById('fullscreenBtn');
  const statusButton = document.getElementById('statusBtn');
  const profileButton = document.getElementById('profileBtn');
  const projectsButton = document.getElementById('projectsNav');
  const authButton = document.getElementById('authNav');
  const chatBackButton = document.getElementById('chatBack');
  const recentChats = document.getElementById('recentChats');
  const recentChatList = document.getElementById('recentChatList');
  const mainAttachmentTray = document.getElementById('mainAttachmentTray');
  const chatAttachmentTray = document.getElementById('chatAttachmentTray');

  const chatTransferPanel = document.createElement('div');
  chatTransferPanel.id = 'chatTransferPanel';
  chatTransferPanel.className = 'chat-transfer-panel';
  chatTransferPanel.hidden = true;
  if (chatScreen && chatComposer) chatScreen.insertBefore(chatTransferPanel, chatComposer);

  const connectionPanel = document.createElement('div');
  connectionPanel.id = 'connectionPanel';
  connectionPanel.className = 'connection-panel';
  connectionPanel.hidden = true;
  connectionPanel.innerHTML = `
    <div class="connection-card" role="dialog" aria-label="Sabi AI connection">
      <div class="connection-head">
        <span class="connection-orb" aria-hidden="true"></span>
        <div><strong id="connectionTitle">Sabi AI connection</strong><small id="connectionSubtitle">Ready to check connection.</small></div>
      </div>
      <div class="connection-route" id="connectionRouteText">Route is not locked yet.</div>
      <label class="connection-field">
        <span>Backend base</span>
        <input id="connectionApiBaseInput" type="text" autocomplete="off" spellcheck="false" placeholder="http://localhost:3000" />
      </label>
      <div class="connection-result" id="connectionResultText">No test request has been sent yet.</div>
      <div class="connection-actions">
        <button type="button" id="connectionCheckBtn">Check</button>
        <button type="button" id="connectionTestBtn">Test AI</button>
        <button type="button" id="connectionSaveBaseBtn">Save base</button>
        <button type="button" id="connectionResetBtn">Reset route</button>
        <button type="button" id="connectionRetryBtn">Retry pending</button>
        <button type="button" id="connectionCloseBtn">Close</button>
      </div>
    </div>`;
  document.body.appendChild(connectionPanel);

  const backendPathRoutes = [
    '/api/chat',
    '/api/sabi-ai/studio/chat',
    '/api/chat',
    '/api/chat'
  ];
  const localBackendBases = [window.location.origin,window.location.origin];
  const backendRoutes = [
    ...backendPathRoutes,
    ...localBackendBases.flatMap((base) => backendPathRoutes.map((path) => `${base}${path}`))
  ];
  const healthPathRoutes = [
    '/api/sabi-ai-studio/health',
    '/api/sabi-ai-studio/health',
    '/api/sabi-ai-studio/health',
    '/api/health'
  ];
  const healthRoutes = [
    ...healthPathRoutes,
    ...localBackendBases.flatMap((base) => healthPathRoutes.map((path) => `${base}${path}`))
  ];
  const studioConfigKey = 'sabi-ai-studio-runtime-config-v45';
  const studioConfigKeyV46 = 'sabi-ai-studio-runtime-config-v46';
  const legacyStudioConfigKey = 'sabi-ai-studio-runtime-config-v44';
  const legacyStudioConfigKeyV43 = 'sabi-ai-studio-runtime-config-v43';
  const activeBackendRouteKey = 'sabi-ai-studio-active-backend-route-v45';
  const activeHealthRouteKey = 'sabi-ai-studio-active-health-route-v45';
  const activeBackendRouteKeyV46 = 'sabi-ai-studio-active-backend-route-v46';
  const activeHealthRouteKeyV46 = 'sabi-ai-studio-active-health-route-v46';

  function readStudioRuntimeConfig() {
    const fromWindow = window.SABI_AI_STUDIO_CONFIG && typeof window.SABI_AI_STUDIO_CONFIG === 'object' ? window.SABI_AI_STUDIO_CONFIG : {};
    let fromStorage = {};
    let fromStorageV46 = {};
    let legacyStorage = {};
    let legacyV43Storage = {};
    try { legacyV43Storage = JSON.parse(localStorage.getItem(legacyStudioConfigKeyV43) || '{}') || {}; } catch (_) {}
    try { legacyStorage = JSON.parse(localStorage.getItem(legacyStudioConfigKey) || '{}') || {}; } catch (_) {}
    try { fromStorage = JSON.parse(localStorage.getItem(studioConfigKey) || '{}') || {}; } catch (_) {}
    try { fromStorageV46 = JSON.parse(localStorage.getItem(studioConfigKeyV46) || '{}') || {}; } catch (_) {}
    return { ...legacyV43Storage, ...legacyStorage, ...fromStorage, ...fromStorageV46, ...fromWindow };
  }

  function routeList(value) {
    const raw = Array.isArray(value) ? value : String(value || '').split(/[\n,]+/);
    return raw.map((item) => String(item || '').trim()).filter((item) => item.startsWith('/api/') || /^https?:\/\//i.test(item));
  }

  function baseRoutes(baseValue, paths) {
    const bases = routeList(baseValue).map((base) => base.replace(/\/$/, '')).filter((base) => /^https?:\/\//i.test(base));
    return bases.flatMap((base) => paths.map((path) => `${base}${path}`));
  }

  function storageRoute(key) {
    try { return localStorage.getItem(key) || ''; } catch (_) { return ''; }
  }

  function saveStorageRoute(key, route) {
    if (!route) return;
    try { localStorage.setItem(key, route); } catch (_) {}
  }

  function uniqueRoutes(custom, fallback) {
    const seen = new Set();
    return [...routeList(custom), ...fallback].filter((route) => {
      if (seen.has(route)) return false;
      seen.add(route);
      return true;
    });
  }

  function configuredBackendRoutes() {
    const config = readStudioRuntimeConfig();
    const remembered = storageRoute(activeBackendRouteKeyV46) || storageRoute(activeBackendRouteKey);
    const apiBase = config.apiBase || config.baseUrl || config.serverUrl || config.backendBaseUrl || '';
    return uniqueRoutes([remembered, ...routeList(config.backendRoutes || config.chatRoutes || config.routes), ...baseRoutes(apiBase, backendPathRoutes)], backendRoutes);
  }

  function configuredHealthRoutes() {
    const config = readStudioRuntimeConfig();
    const remembered = storageRoute(activeHealthRouteKeyV46) || storageRoute(activeHealthRouteKey);
    const apiBase = config.apiBase || config.baseUrl || config.serverUrl || config.backendBaseUrl || '';
    return uniqueRoutes([remembered, ...routeList(config.healthRoutes), ...baseRoutes(apiBase, healthPathRoutes)], healthRoutes);
  }

  function requestTimeoutMs(attachments = []) {
    const config = readStudioRuntimeConfig();
    const custom = Number(config.requestTimeoutMs || config.timeoutMs || 0);
    if (custom >= 10000 && custom <= 600000) return custom;
    const hasFiles = Array.from(attachments || []).some((item) => item?.file instanceof File);
    return 420000;
  }

  function requestId() {
    return `sabi-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  }

  async function fetchWithTimeout(route, options = {}, externalSignal = null, timeoutMs = 90000) {
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), timeoutMs);
    const relay = () => controller.abort();
    try {
      if (externalSignal) {
        if (externalSignal.aborted) controller.abort();
        else externalSignal.addEventListener('abort', relay, { once: true });
      }
      return await fetch(route, { ...options, signal: controller.signal });
    } finally {
      window.clearTimeout(timer);
      if (externalSignal) externalSignal.removeEventListener?.('abort', relay);
    }
  }

  function currentConversationPayload(limit = 12) {
    const chat = getCurrentChat?.();
    const messages = Array.isArray(chat?.messages) ? chat.messages.slice(-limit) : [];
    return messages.map((message) => ({
      role: message.role === 'assistant' ? 'assistant' : 'user',
      content: String(message.content || '').slice(0, 12000),
      files: (message.files || message.attachments || []).map((file) => ({
        name: file.name || 'file',
        type: file.type || 'application/octet-stream',
        size: file.size || 0,
        kind: file.kind || fileKind(file)
      })).slice(0, MAX_ATTACHMENTS)
    }));
  }

  const chatsKey = 'sabi-ai-studio-chats-v16';
  const savedGeneratedKey = 'sabi-ai-studio-saved-generated-v25';
  const draftsKey = 'sabi-ai-studio-chat-drafts-v36';
  const MAX_ATTACHMENTS = 20;
  const MAX_CODE_PREVIEW_BYTES = 512 * 1024;
  const MAX_VISIBLE_KIND_SUMMARY = 4;
  let selectedAttachments = [];
  let connectionState = { status: 'pending', route: '', lastChecked: 0 };
  let fileTarget = 'main';
  let toastTimer = null;
  let recognition = null;
  let listening = false;
  let currentChatId = null;
  let activeRequest = null;
  const failedPayloads = new Map();
  const runtimeAttachmentSources = new Map();
  const streamingTimers = new Map();
  let recentChatQuery = '';
  let undoTimer = null;
  let messageSelectionMode = false;
  const selectedMessageIds = new Set();

  let mobileChatBottomButton = null;
  const mobileQuery = window.matchMedia('(max-width: 760px)');

  function isMobileViewport() {
    return Boolean(mobileQuery.matches);
  }

  function ensureMobileChatBottomButton() {
    if (mobileChatBottomButton || !chatScreen) return mobileChatBottomButton;
    mobileChatBottomButton = document.createElement('button');
    mobileChatBottomButton.type = 'button';
    mobileChatBottomButton.className = 'mobile-chat-bottom';
    mobileChatBottomButton.setAttribute('aria-label', 'Scroll to latest message');
    mobileChatBottomButton.textContent = '↓';
    mobileChatBottomButton.addEventListener('click', () => {
      messageList.scrollTo({ top: messageList.scrollHeight, behavior: 'smooth' });
      mobileChatBottomButton.classList.remove('visible');
    });
    chatScreen.appendChild(mobileChatBottomButton);
    return mobileChatBottomButton;
  }

  function updateMobileChatBottomButton() {
    const button = ensureMobileChatBottomButton();
    if (!button || !app.classList.contains('view-chat') || !isMobileViewport()) {
      button?.classList.remove('visible');
      return;
    }
    const distance = messageList.scrollHeight - messageList.scrollTop - messageList.clientHeight;
    button.classList.toggle('visible', distance > 180);
  }

  function applyMobileChatLayout() {
    if (isMobileViewport()) {
      app.classList.add('mobile-layout');
      if (app.classList.contains('view-chat')) hideSidebar();
    } else {
      app.classList.remove('mobile-layout');
      ensureMobileChatBottomButton()?.classList.remove('visible');
    }
    requestAnimationFrame(() => {
      syncChatInputHeight();
      updateMobileChatBottomButton();
    });
  }

  function nowTime() {
    return new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit' }).format(new Date());
  }

  function isInstallCommandText(value) {
    const text = String(value || '').toLowerCase();
    if (!text.trim()) return false;
    const strongMarkers = [
      'expand-archive',
      'get-childitem',
      'remove-item',
      'move-item',
      'new-item',
      'stop-process',
      'write-host',
      '$zip',
      '$temp',
      'python -m http.server',
      'sabi-ai-studio-main-chat-v',
      'sabi-ai-studio-main-working-v',
      'bad zip',
      'zip not found'
    ];
    const markerCount = strongMarkers.reduce((count, marker) => count + (text.includes(marker) ? 1 : 0), 0);
    const looksLikeScript = /\bcd\s+c:\\users\\|\bpowershell\b|\bexpand-archive\b|\bremove-item\b|\bmove-item\b/i.test(value || '');
    return markerCount >= 2 || looksLikeScript;
  }

  function normalizeMessageStatus(status) {
    if (status === 'failed') return 'pending';
    if (status === 'cancelled') return 'saved';
    return status;
  }

  function friendlyStatusText(status) {
    return ({
      sending: 'Sending to Sabi AI...',
      streaming: 'Sabi AI is typing...',
      sent: 'Sent',
      pending: 'Message saved. Sabi AI connection is pending.',
      saved: 'Message saved locally.'
    })[status] || '';
  }

  function setConnectionState(status, route = '') {
    connectionState = { status, route, lastChecked: Date.now() };
    if (status === 'connected' && route) {
      if (/\/health(?:$|[?#])/i.test(route)) {
        saveStorageRoute(activeHealthRouteKey, route);
        saveStorageRoute(activeHealthRouteKeyV46, route);
      } else {
        saveStorageRoute(activeBackendRouteKey, route);
        saveStorageRoute(activeBackendRouteKeyV46, route);
      }
    }
    renderConnectionPanel();
    if (!statusButton) return;
    statusButton.dataset.connection = status;
    const label = status === 'connected' ? 'Sabi AI connected' : status === 'checking' ? 'Sabi AI checking' : status === 'processing' ? 'Sabi AI processing' : 'Sabi AI pending';
    statusButton.setAttribute('aria-label', label);
    const text = statusButton.querySelector('span:nth-child(2)');
    if (text) text.textContent = status === 'connected' ? 'Sabi AI' : status === 'checking' ? 'Checking' : status === 'processing' ? 'Processing' : 'Sabi AI';
  }

  function friendlyConnectionTitle(status = connectionState.status) {
    if (status === 'connected') return 'Sabi AI connected';
    if (status === 'checking') return 'Checking Sabi AI';
    if (status === 'processing') return 'Sabi AI processing';
    return 'Sabi AI connection pending';
  }

  function friendlyConnectionSubtitle(status = connectionState.status) {
    if (status === 'connected') return 'Messages can be sent to Sabi AI. The working route is remembered automatically.';
    if (status === 'checking') return 'Checking same-origin and local backend routes cleanly.';
    if (status === 'processing') return 'Sabi AI is working on the current request.';
    return 'Messages stay saved locally until the connection is ready.';
  }


  function shortRoute(route = '') {
    const text = String(route || '').trim();
    if (!text) return 'Route is not locked yet.';
    try {
      const url = new URL(text, window.location.origin);
      return `${url.origin}${url.pathname}`.replace(window.location.origin, 'same origin');
    } catch (_) {
      return text.length > 84 ? `${text.slice(0, 84)}…` : text;
    }
  }

  function currentApiBaseValue() {
    const config = readStudioRuntimeConfig();
    return String(config.apiBase || config.baseUrl || config.serverUrl || config.backendBaseUrl || '').trim();
  }

  function writeRuntimeApiBase(value) {
    const clean = String(value || '').trim().replace(/\/$/, '');
    const next = { ...readStudioRuntimeConfig() };
    delete next.baseUrl;
    delete next.serverUrl;
    delete next.backendBaseUrl;
    next.apiBase = clean;
    try {
      localStorage.setItem(studioConfigKeyV46, JSON.stringify(next));
      localStorage.setItem(studioConfigKey, JSON.stringify(next));
    } catch (_) {}
    return clean;
  }

  function clearRememberedRoutes() {
    try {
      [activeBackendRouteKey, activeHealthRouteKey, activeBackendRouteKeyV46, activeHealthRouteKeyV46].forEach((key) => localStorage.removeItem(key));
    } catch (_) {}
    setConnectionState('pending');
  }

  function renderConnectionPanel() {
    if (!connectionPanel) return;
    connectionPanel.dataset.connection = connectionState.status || 'pending';
    const title = connectionPanel.querySelector('#connectionTitle');
    const subtitle = connectionPanel.querySelector('#connectionSubtitle');
    if (title) title.textContent = friendlyConnectionTitle();
    if (subtitle) subtitle.textContent = friendlyConnectionSubtitle();
    const routeText = connectionPanel.querySelector('#connectionRouteText');
    if (routeText) routeText.textContent = connectionState.route ? `Active route: ${shortRoute(connectionState.route)}` : shortRoute(storageRoute(activeBackendRouteKeyV46) || storageRoute(activeBackendRouteKey) || storageRoute(activeHealthRouteKeyV46) || storageRoute(activeHealthRouteKey));
    const input = connectionPanel.querySelector('#connectionApiBaseInput');
    if (input && document.activeElement !== input) input.value = currentApiBaseValue();
  }

  function toggleConnectionPanel(force = null) {
    if (!connectionPanel) return;
    const show = force === null ? connectionPanel.hidden : !!force;
    renderConnectionPanel();
    connectionPanel.hidden = !show;
  }

  function setConnectionResult(text, state = 'idle') {
    const result = connectionPanel?.querySelector('#connectionResultText');
    if (!result) return;
    result.dataset.state = state;
    result.textContent = text || 'No test request has been sent yet.';
  }

  async function testSabiAiRequest() {
    const controller = new AbortController();
    activeRequest = controller;
    setConnectionState('processing');
    setConnectionResult('Sending a small test request to Sabi AI...', 'working');
    renderConnectionPanel();
    const testPrompt = 'Sabi AI Studio connection test. Reply with OK.';
    const routes = configuredBackendRoutes();
    for (const route of routes) {
      if (controller.signal.aborted) {
        activeRequest = null;
        setConnectionState('pending');
        setConnectionResult('Test stopped. No message was changed.', 'idle');
        hideTransferPanel(600);
        return false;
      }
      try {
        showTransferPanel({ status: 'Testing Sabi AI', detail: 'Sending a small safe request', percent: 35, cancellable: true });
        const result = await requestRoute(route, testPrompt, [], controller.signal);
        if (result.aborted) {
          activeRequest = null;
          setConnectionState('pending');
          setConnectionResult('Test stopped. No message was changed.', 'idle');
          hideTransferPanel(600);
          return false;
        }
        if (result.ok) {
          const answer = extractBackendAnswer(result.data || {});
          const cleanAnswer = String(answer || 'Response received.').replace(/\s+/g, ' ').trim().slice(0, 180);
          activeRequest = null;
          setConnectionState('connected', route);
          setConnectionResult(`Test passed. ${cleanAnswer}`, 'ok');
          showTransferPanel({ status: 'Test completed', detail: 'Sabi AI route accepted the request', percent: 100 });
          hideTransferPanel(900);
          showToast('Sabi AI test passed.');
          renderConnectionPanel();
          return true;
        }
      } catch (_) {}
    }
    activeRequest = null;
    setConnectionState('pending');
    setConnectionResult('No test response yet. Messages stay saved locally until Sabi AI is ready.', 'pending');
    showTransferPanel({ status: 'Waiting for Sabi AI connection', detail: 'Test request did not complete. No technical error is shown.', percent: 0 });
    hideTransferPanel(1200);
    showToast('Sabi AI test is pending.');
    renderConnectionPanel();
    return false;
  }

  function setConnectionPanelEvents() {
    connectionPanel.querySelector('#connectionCheckBtn')?.addEventListener('click', async () => {
      renderConnectionPanel();
      await probeConnection(true);
      renderConnectionPanel();
    });
    connectionPanel.querySelector('#connectionTestBtn')?.addEventListener('click', async () => {
      await testSabiAiRequest();
    });
    connectionPanel.querySelector('#connectionSaveBaseBtn')?.addEventListener('click', async () => {
      const input = connectionPanel.querySelector('#connectionApiBaseInput');
      writeRuntimeApiBase(input?.value || '');
      clearRememberedRoutes();
      renderConnectionPanel();
      showToast('Backend base saved. Checking Sabi AI...');
      await probeConnection(true);
    });
    connectionPanel.querySelector('#connectionResetBtn')?.addEventListener('click', () => {
      clearRememberedRoutes();
      renderConnectionPanel();
      showToast('Remembered route cleared.');
    });
    connectionPanel.querySelector('#connectionRetryBtn')?.addEventListener('click', async () => {
      toggleConnectionPanel(false);
      await retryPendingMessages();
    });
    connectionPanel.querySelector('#connectionCloseBtn')?.addEventListener('click', () => toggleConnectionPanel(false));
  }

  async function probeConnection(showResult = true) {
    setConnectionState('checking');
    for (const route of configuredHealthRoutes()) {
      try {
        const response = await fetchWithTimeout(route, { method: 'GET', headers: { 'Accept': 'application/json, text/plain' } }, null, 7000);
        if (response.ok) {
          setConnectionState('connected', route);
          if (showResult) showToast('Sabi AI connection is ready.');
          return true;
        }
      } catch (_) {}
    }
    for (const route of configuredBackendRoutes()) {
      try {
        const response = await fetchWithTimeout(route, { method: 'GET', headers: { 'Accept': 'application/json, text/plain' } }, null, 4500);
        if ([200, 204, 400, 401, 403, 405].includes(response.status)) {
          setConnectionState('connected', route);
          if (showResult) showToast('Sabi AI route is reachable.');
          return true;
        }
      } catch (_) {}
    }
    setConnectionState('pending');
    if (showResult) showToast('Sabi AI connection is pending. Messages stay saved locally.');
    return false;
  }

  function sanitizeChats(chats) {
    if (!Array.isArray(chats)) return [];
    const clean = [];
    for (const chat of chats) {
      if (!chat || typeof chat !== 'object') continue;
      const messages = Array.isArray(chat.messages) ? chat.messages.filter((message) => {
        return !isInstallCommandText(message?.content || '');
      }).map((message) => ({
        ...message,
        status: normalizeMessageStatus(message?.status)
      })) : [];
      const title = isInstallCommandText(chat.title || '') ? 'New chat' : (chat.title || 'New chat');
      if (messages.length === 0 && (title === 'New chat' || /^(project|test|example)$/i.test(title))) continue;
      clean.push({ ...chat, title, messages });
    }
    return clean.slice(0, 80);
  }

  function readChats() {
    try {
      const parsed = JSON.parse(localStorage.getItem(chatsKey) || '[]');
      const clean = sanitizeChats(parsed);
      if (JSON.stringify(parsed) !== JSON.stringify(clean)) localStorage.setItem(chatsKey, JSON.stringify(clean));
      return clean;
    } catch (_) { return []; }
  }

  function stripHeavyAttachmentData(chats) {
    return sanitizeChats(chats).map((chat) => ({
      ...chat,
      messages: (chat.messages || []).map((message) => ({
        ...message,
        attachments: (message.attachments || []).map((item) => ({
          id: item.id,
          name: item.name,
          type: item.type,
          size: item.size,
          kind: item.kind,
          url: item.url && !String(item.url).startsWith('data:') ? item.url : '',
          downloadUrl: item.downloadUrl && !String(item.downloadUrl).startsWith('data:') ? item.downloadUrl : '',
          text: item.kind === 'code' ? String(item.text || '').slice(0, 12000) : ''
        })),
        files: (message.files || []).map((file) => ({ name: file.name, type: file.type, size: file.size, kind: file.kind }))
      }))
    }));
  }

  function writeChats(chats) {
    try {
      localStorage.setItem(chatsKey, JSON.stringify(stripHeavyAttachmentData(chats)));
    } catch (_) {
      const light = stripHeavyAttachmentData(chats).map((chat) => ({
        ...chat,
        messages: (chat.messages || []).map((message) => ({ ...message, attachments: [], files: message.files || [] }))
      }));
      try { localStorage.setItem(chatsKey, JSON.stringify(light)); } catch (_) {}
    }
    renderRecentChats();
  }

  function purgeInstallCommandHistory() {
    try {
      Object.keys(localStorage).forEach((key) => {
        if (!key.startsWith('sabi-ai-studio')) return;
        const raw = localStorage.getItem(key) || '';
        if (!raw) return;
        if (key.includes('chats')) {
          try { localStorage.setItem(key, JSON.stringify(sanitizeChats(JSON.parse(raw)))); }
          catch (_) { if (isInstallCommandText(raw)) localStorage.removeItem(key); }
        } else if (isInstallCommandText(raw)) {
          localStorage.removeItem(key);
        }
      });
    } catch (_) {}
  }

  function getEditorText(node) {
    const raw = ('value' in node ? node.value : node.innerText) || '';
    return raw.replace(/\u00a0/g, ' ').trim();
  }


  function fileKind(fileLike) {
    const type = String(fileLike?.type || fileLike?.mimeType || fileLike?.mime || '').toLowerCase();
    const name = String(fileLike?.name || fileLike?.filename || fileLike?.title || '').toLowerCase();
    if (type.startsWith('image/') || /\.(png|jpe?g|gif|webp|avif|bmp|svg|heic|heif|tiff?)$/i.test(name)) return 'image';
    if (type.startsWith('video/') || /\.(mp4|mov|m4v|webm|mkv|avi|wmv|flv|mpeg|mpg|3gp)$/i.test(name)) return 'video';
    if (type.startsWith('audio/') || /\.(mp3|wav|m4a|aac|ogg|oga|flac|opus|wma|amr)$/i.test(name)) return 'audio';
    if (type === 'application/pdf' || name.endsWith('.pdf')) return 'pdf';
    if (type.includes('zip') || type.includes('compressed') || type.includes('archive') || /\.(zip|rar|7z|tar|gz|bz2|xz|tgz|iso)$/i.test(name)) return 'zip';
    if (/\.(ppt|pptx|key|odp)$/i.test(name)) return 'presentation';
    if (/\.(xls|xlsx|numbers|csv|tsv|ods)$/i.test(name)) return 'spreadsheet';
    if (/\.(doc|docx|pages|rtf|odt)$/i.test(name)) return 'document';
    if (/\.(py|js|mjs|cjs|ts|tsx|jsx|java|kt|swift|go|rs|php|rb|cs|cpp|cc|cxx|c|h|hpp|html|css|scss|sass|json|xml|yaml|yml|sql|sh|bash|zsh|ps1|bat|cmd|md|txt|toml|ini|env|dockerfile)$/i.test(name) || type.startsWith('text/')) return 'code';
    return 'file';
  }

  function fileLabel(kind) {
    return ({ image:'Photo', video:'Video', audio:'Audio', pdf:'PDF', zip:'ZIP archive', code:'Code', document:'Document', spreadsheet:'Spreadsheet', presentation:'Presentation', file:'File' })[kind || 'file'] || 'File';
  }

  function fileIcon(kind) {
    return ({ image:'IMG', video:'VID', audio:'AUD', pdf:'PDF', zip:'ZIP', code:'</>', document:'DOC', spreadsheet:'XLS', presentation:'PPT', file:'FILE' })[kind || 'file'] || 'FILE';
  }

  function formatSize(bytes) {
    const value = Number(bytes || 0);
    if (!value) return '0 B';
    const units = ['B','KB','MB','GB'];
    let size = value;
    let unit = 0;
    while (size >= 1024 && unit < units.length - 1) { size /= 1024; unit += 1; }
    return `${size.toFixed(size >= 10 || unit === 0 ? 0 : 1)} ${units[unit]}`;
  }

  function attachmentBatchSummary(items = []) {
    const list = Array.from(items || []);
    if (!list.length) return '';
    const totalSize = list.reduce((sum, item) => sum + Number(item.size || item.file?.size || 0), 0);
    const kindCounts = new Map();
    list.forEach((item) => {
      const label = fileLabel(item.kind || fileKind(item));
      kindCounts.set(label, (kindCounts.get(label) || 0) + 1);
    });
    const kinds = Array.from(kindCounts.entries())
      .slice(0, MAX_VISIBLE_KIND_SUMMARY)
      .map(([label, count]) => `${count} ${label}${count > 1 && !label.endsWith('s') ? 's' : ''}`);
    const hidden = kindCounts.size > MAX_VISIBLE_KIND_SUMMARY ? ` +${kindCounts.size - MAX_VISIBLE_KIND_SUMMARY} type(s)` : '';
    return `${list.length} file(s) В· ${formatSize(totalSize)}${kinds.length ? ` В· ${kinds.join(' В· ')}${hidden}` : ''}`;
  }

  function readFileAsDataURL(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result || ''));
      reader.onerror = () => resolve('');
      reader.readAsDataURL(file);
    });
  }

  function readFileAsText(file, maxBytes = MAX_CODE_PREVIEW_BYTES) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result || ''));
      reader.onerror = () => resolve('');
      const source = typeof file?.slice === 'function' ? file.slice(0, maxBytes) : file;
      reader.readAsText(source);
    });
  }

  async function buildAttachment(file) {
    const kind = fileKind(file);
    const attachment = {
      id: `file-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      name: file.name || 'file',
      type: file.type || 'application/octet-stream',
      size: file.size || 0,
      kind,
      url: URL.createObjectURL(file),
      dataUrl: '',
      text: '',
      file
    };
    // Keep local files as Blob URLs instead of base64 data URLs.
    // This allows sending up to 20 files together without breaking localStorage quota.
    if (kind === 'code') {
      attachment.text = await readFileAsText(file);
      attachment.textTruncated = Number(file.size || 0) > MAX_CODE_PREVIEW_BYTES;
    }
    return attachment;
  }

  async function addFilesToSelected(files) {
    const incoming = Array.from(files || []).filter(Boolean);
    if (!incoming.length) return { added: 0, skipped: 0 };
    const remaining = Math.max(0, MAX_ATTACHMENTS - selectedAttachments.length);
    if (remaining <= 0) {
      showToast(`Maximum ${MAX_ATTACHMENTS} files per message.`);
      return { added: 0, skipped: incoming.length };
    }
    const accepted = incoming.slice(0, remaining);
    const built = await Promise.all(accepted.map(buildAttachment));
    selectedAttachments.push(...built);
    return { added: built.length, skipped: incoming.length - accepted.length };
  }

  function attachmentSource(attachment) {
    if (!attachment) return '';
    if (attachment.dataUrl) return attachment.dataUrl;
    if (attachment.url) return attachment.url;
    if (attachment.downloadUrl) return attachment.downloadUrl;
    if (attachment.contentUrl) return attachment.contentUrl;
    if (attachment.base64 && (attachment.type || attachment.mimeType)) return `data:${attachment.type || attachment.mimeType};base64,${attachment.base64}`;
    if (attachment.text) return `data:text/plain;charset=utf-8,${encodeURIComponent(attachment.text)}`;
    return '';
  }

  function normalizeMessageAttachments(value) {
    if (!Array.isArray(value)) return [];
    return value.map((item) => {
      const name = item.name || item.filename || item.title || 'file';
      const type = item.type || item.mimeType || item.mime || 'application/octet-stream';
      const kind = item.kind || fileKind({ name, type });
      const dataUrl = item.dataUrl || item.content || '';
      return {
        id: item.id || `file-${Math.random().toString(36).slice(2, 7)}`,
        name,
        type,
        size: item.size || item.bytes || 0,
        kind,
        url: item.url || item.downloadUrl || item.contentUrl || dataUrl || '',
        downloadUrl: item.downloadUrl || item.url || item.contentUrl || dataUrl || '',
        dataUrl,
        base64: item.base64 || item.base64Content || '',
        text: item.text || ''
      };
    });
  }

  function renderAttachmentTray() {
    const trays = [mainAttachmentTray, chatAttachmentTray].filter(Boolean);
    trays.forEach((tray) => {
      tray.hidden = true;
      tray.innerHTML = '';
      tray.classList.remove('many-files');
      tray.removeAttribute('data-count');
    });
    form?.classList.remove('has-attachments');
    chatComposer?.classList.remove('has-attachments');
    const tray = fileTarget === 'chat' ? chatAttachmentTray : mainAttachmentTray;
    const activeComposer = fileTarget === 'chat' ? chatComposer : form;
    if (!tray || selectedAttachments.length === 0) { updateComposerStats(); return; }
    tray.hidden = false;
    tray.dataset.count = String(selectedAttachments.length);
    tray.classList.toggle('many-files', selectedAttachments.length >= 10);
    activeComposer?.classList.add('has-attachments');

    const header = document.createElement('div');
    header.className = 'attachment-tray-header';
    const title = document.createElement('strong');
    title.textContent = fileTarget === 'main' ? 'Attached files for new chat' : 'Attached files';
    const tools = document.createElement('div');
    tools.className = 'attachment-tray-tools';
    const count = document.createElement('small');
    count.textContent = `${selectedAttachments.length} / ${MAX_ATTACHMENTS} selected`;
    const clear = document.createElement('button');
    clear.type = 'button';
    clear.textContent = 'Clear all';
    clear.setAttribute('aria-label', 'Clear attached files');
    clear.addEventListener('click', () => clearSelectedAttachments());
    tools.append(count, clear);
    header.append(title, tools);
    tray.appendChild(header);

    const summary = document.createElement('div');
    summary.className = 'attachment-tray-summary';
    summary.textContent = attachmentBatchSummary(selectedAttachments);
    tray.appendChild(summary);

    if (fileTarget === 'main') {
      const hint = document.createElement('div');
      hint.className = 'main-attachment-hint';
      hint.textContent = 'These files will be sent together when you start the chat.';
      tray.appendChild(hint);
    }

    const list = document.createElement('div');
    list.className = 'attachment-preview-list';
    selectedAttachments.forEach((attachment, index) => {
      const source = attachmentSource(attachment);
      const card = document.createElement('div');
      card.className = `attachment-preview-card ${attachment.kind || 'file'}`;

      const preview = document.createElement('div');
      preview.className = 'attachment-preview-thumb';
      if (attachment.kind === 'image' && source) {
        const img = document.createElement('img');
        img.src = source;
        img.alt = attachment.name;
        preview.appendChild(img);
      } else if (attachment.kind === 'video' && source) {
        const video = document.createElement('video');
        video.src = source;
        video.muted = true;
        video.playsInline = true;
        video.preload = 'metadata';
        preview.appendChild(video);
        const play = document.createElement('span');
        play.className = 'attachment-preview-play';
        play.textContent = 'в–¶';
        preview.appendChild(play);
      } else {
        const icon = document.createElement('span');
        icon.className = 'attachment-preview-icon';
        icon.textContent = fileIcon(attachment.kind);
        preview.appendChild(icon);
      }
      card.appendChild(preview);

      const copy = document.createElement('div');
      copy.className = 'attachment-preview-copy';
      const label = document.createElement('small');
      label.textContent = fileLabel(attachment.kind);
      const name = document.createElement('strong');
      name.textContent = attachment.name;
      const size = document.createElement('em');
      size.textContent = formatSize(attachment.size);
      copy.append(label, name, size);
      card.appendChild(copy);

      const actions = document.createElement('div');
      actions.className = 'attachment-preview-actions';
      if (source) {
        const download = document.createElement('a');
        download.className = 'attachment-preview-download';
        download.href = asDirectDownloadUrl(source);
        download.download = attachment.name;
        download.textContent = 'Download';
        actions.appendChild(download);
      }
      const remove = document.createElement('button');
      remove.className = 'attachment-preview-remove';
      remove.type = 'button';
      remove.setAttribute('aria-label', `Remove ${attachment.name}`);
      remove.textContent = 'Г—';
      remove.addEventListener('click', () => {
        const removed = selectedAttachments.splice(index, 1)[0];
        try { if (removed?.url?.startsWith('blob:')) URL.revokeObjectURL(removed.url); } catch (_) {}
        renderAttachmentTray();
        if (fileTarget === 'chat') requestAnimationFrame(() => syncChatInputHeight());
      });
      actions.appendChild(remove);
      card.appendChild(actions);
      list.appendChild(card);
    });
    tray.appendChild(list);
    if (fileTarget === 'chat') requestAnimationFrame(() => syncChatInputHeight());
  }

  function clearSelectedAttachments(revoke = true) {
    if (revoke) {
      selectedAttachments.forEach((item) => {
        try { if (item.url && item.url.startsWith('blob:')) URL.revokeObjectURL(item.url); } catch (_) {}
      });
    }
    selectedAttachments = [];
    if (fileInput) fileInput.value = '';
    renderAttachmentTray();
  }

  function createFileFace(attachment) {
    const face = document.createElement('div');
    face.className = `attachment-file-face ${attachment.kind || 'file'}`;
    const badge = document.createElement('span');
    badge.className = 'attachment-file-badge';
    badge.textContent = fileIcon(attachment.kind);
    const title = document.createElement('span');
    title.className = 'attachment-file-title';
    title.textContent = fileLabel(attachment.kind);
    face.append(badge, title);
    return face;
  }

  function formatDuration(seconds) {
    const total = Math.max(0, Math.floor(Number(seconds) || 0));
    const h = Math.floor(total / 3600);
    const m = Math.floor((total % 3600) / 60);
    const s = total % 60;
    if (h) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    return `${m}:${String(s).padStart(2, '0')}`;
  }

  function createMediaCard(attachment, options = {}) {
    const source = attachmentSource(attachment);
    const kind = attachment.kind || fileKind(attachment);
    const shell = document.createElement('div');
    shell.className = `media-card ${kind}${options.compact ? ' compact' : ''}`;

    const frame = document.createElement('div');
    frame.className = 'media-frame';
    let media;

    if (kind === 'video') {
      media = document.createElement('video');
      media.src = source;
      media.controls = true;
      media.preload = 'metadata';
      media.playsInline = true;
      media.setAttribute('controlsList', 'nodownload');
      frame.appendChild(media);
    } else {
      const audioFace = createFileFace(attachment);
      audioFace.classList.add('audio-face');
      frame.appendChild(audioFace);
      media = document.createElement('audio');
      media.src = source;
      media.controls = true;
      media.preload = 'metadata';
      media.setAttribute('controlsList', 'nodownload');
      frame.appendChild(media);
    }

    const toolbar = document.createElement('div');
    toolbar.className = 'media-toolbar';

    const meta = document.createElement('div');
    meta.className = 'media-meta-line';
    const title = document.createElement('strong');
    title.textContent = kind === 'video' ? 'Video playback' : 'Audio playback';
    const duration = document.createElement('small');
    duration.textContent = 'Loading duration...';
    meta.append(title, duration);

    const actions = document.createElement('div');
    actions.className = 'media-inline-actions';

    const speed = document.createElement('button');
    speed.type = 'button';
    speed.textContent = '1x';
    speed.title = 'Playback speed';
    const speeds = [1, 1.25, 1.5, 2, 0.75];
    speed.addEventListener('click', () => {
      const current = Number(media.playbackRate || 1);
      const index = speeds.findIndex((value) => Math.abs(value - current) < 0.01);
      const next = speeds[(index + 1) % speeds.length];
      media.playbackRate = next;
      speed.textContent = `${next}x`;
    });
    actions.appendChild(speed);

    if (kind === 'video') {
      const full = document.createElement('button');
      full.type = 'button';
      full.textContent = 'Fullscreen';
      full.addEventListener('click', async () => {
        try {
          if (media.requestFullscreen) await media.requestFullscreen();
          else if (media.webkitEnterFullscreen) media.webkitEnterFullscreen();
        } catch (_) { showToast('Fullscreen is not available.'); }
      });
      actions.appendChild(full);

      const pip = document.createElement('button');
      pip.type = 'button';
      pip.textContent = 'PiP';
      pip.addEventListener('click', async () => {
        try {
          if (document.pictureInPictureElement) await document.exitPictureInPicture();
          else if (document.pictureInPictureEnabled && !media.disablePictureInPicture) await media.requestPictureInPicture();
          else showToast('Picture-in-picture is not available.');
        } catch (_) { showToast('Picture-in-picture is not available.'); }
      });
      actions.appendChild(pip);
    }

    if (source) {
      const download = document.createElement('a');
      download.href = asDirectDownloadUrl(source);
      download.download = attachment.name || `sabi-ai-${kind}`;
      download.textContent = 'Download';
      actions.appendChild(download);
    }

    // v72: media toolbar menu disabled to avoid duplicate file menus.
    media.addEventListener('loadedmetadata', () => {
      duration.textContent = Number.isFinite(media.duration) && media.duration > 0
        ? `${formatDuration(media.duration)} В· ${formatSize(attachment.size)}`
        : formatSize(attachment.size);
    });
    media.addEventListener('error', () => {
      duration.textContent = 'Preview unavailable В· Download available';
    });

    toolbar.append(meta, actions);
    shell.append(frame, toolbar);
    return shell;
  }

  /* v71 source-level compact file actions: one ⋯ menu, no lower file background */
  function asDirectDownloadUrl(raw) {
    const value = String(raw || '');
    if (!value) return value;
    try {
      const u = new URL(value, window.location.href);
      if (u.pathname.includes('/generated-v55/')) u.searchParams.set('download', '1');
      return u.toString();
    } catch (_) {
      if (value.includes('/generated-v55/') && !value.includes('download=1')) {
        return value + (value.includes('?') ? '&download=1' : '?download=1');
      }
      return value;
    }
  }

  function ensureCompactFileActionStyles() {
    if (document.querySelector('style[data-sabi-v71-file-menu]')) return;

    const style = document.createElement('style');
    style.setAttribute('data-sabi-v71-file-menu', 'true');
    style.textContent = `
      .attachment-item,
      .media-inline,
      .generated-center-card,
      .file-manager-card {
        background: transparent !important;
        box-shadow: none !important;
        backdrop-filter: none !important;
      }

      .attachment-item,
      .media-inline {
        border-color: rgba(98, 172, 255, .16) !important;
      }

      .media-toolbar,
      .attachment-meta,
      .media-meta-line,
      .attachment-actions,
      .media-inline-actions,
      .generated-center-actions,
      .file-manager-actions {
        background: transparent !important;
        box-shadow: none !important;
        border: 0 !important;
      }

      .attachment-actions,
      .media-inline-actions,
      .generated-center-actions,
      .file-manager-actions {
        position: relative !important;
        display: inline-flex !important;
        align-items: center !important;
        justify-content: flex-start !important;
        gap: 0 !important;
        padding: 0 !important;
        margin: 0 !important;
        overflow: visible !important;
      }

      .sabi-v71-file-menu-wrap {
        position: relative !important;
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
        overflow: visible !important;
      }

      .sabi-v71-file-menu-btn {
        width: 30px !important;
        height: 26px !important;
        min-width: 30px !important;
        padding: 0 !important;
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
        border-radius: 11px !important;
        border: 1px solid rgba(120, 195, 255, .46) !important;
        background: rgba(5, 18, 42, .74) !important;
        color: rgba(238, 248, 255, .98) !important;
        font-size: 18px !important;
        line-height: 1 !important;
        cursor: pointer !important;
      }

      .sabi-v71-file-menu-btn:hover {
        background: rgba(35, 130, 255, .28) !important;
        border-color: rgba(145, 215, 255, .84) !important;
      }

      .sabi-v71-file-menu {
        position: absolute !important;
        left: 0 !important;
        top: calc(100% + 8px) !important;
        z-index: 999999 !important;
        display: none !important;
        min-width: 168px !important;
        padding: 7px !important;
        border-radius: 14px !important;
        border: 1px solid rgba(120, 195, 255, .42) !important;
        background: rgba(3, 13, 31, .98) !important;
        box-shadow: 0 18px 48px rgba(0, 0, 0, .52) !important;
        backdrop-filter: blur(16px) !important;
      }

      .sabi-v71-file-menu-wrap.open .sabi-v71-file-menu,
      .sabi-v71-file-menu-wrap:hover .sabi-v71-file-menu,
      .sabi-v71-file-menu-wrap:focus-within .sabi-v71-file-menu {
        display: grid !important;
        gap: 6px !important;
      }

      .sabi-v71-file-menu button,
      .sabi-v71-file-menu a {
        display: inline-flex !important;
        visibility: visible !important;
        opacity: 1 !important;
        pointer-events: auto !important;
        width: 100% !important;
        height: 31px !important;
        min-height: 31px !important;
        align-items: center !important;
        justify-content: flex-start !important;
        padding: 0 10px !important;
        border-radius: 10px !important;
        font-size: 12px !important;
        line-height: 1 !important;
        white-space: nowrap !important;
        color: rgba(238, 248, 255, .96) !important;
      }

      .sabi-v71-file-menu [data-v71-action="open"]::before { content: "↗"; margin-right: 8px; }
      .sabi-v71-file-menu [data-v71-action="download"]::before { content: "↓"; margin-right: 8px; }
      .sabi-v71-file-menu [data-v71-action="rename"]::before { content: "✎"; margin-right: 8px; }
      .sabi-v71-file-menu [data-v71-action="save"]::before { content: "✓"; margin-right: 8px; }
      .sabi-v71-file-menu [data-v71-action="speed"]::before { content: "⏱"; margin-right: 8px; }
      .sabi-v71-file-menu [data-v71-action="fullscreen"]::before { content: "⛶"; margin-right: 8px; }
      .sabi-v71-file-menu [data-v71-action="pip"]::before { content: "▣"; margin-right: 8px; }

      video,
      audio {
        background: #000 !important;
      }
    `;
    document.head.appendChild(style);
  }

  function compactActionType(el) {
    const text = String(el.textContent || el.title || el.getAttribute('aria-label') || '').trim().toLowerCase();
    if (text.includes('open')) return 'open';
    if (text.includes('download')) return 'download';
    if (text.includes('rename')) return 'rename';
    if (text.includes('save') || text.includes('saved')) return 'save';
    if (text.includes('fullscreen')) return 'fullscreen';
    if (text.includes('pip')) return 'pip';
    if (text.includes('x')) return 'speed';
    return 'action';
  }

  function createCompactFileActions(actions) {
    if (!actions || actions.dataset.compactFileActions === 'v71') return;
    ensureCompactFileActionStyles();

    const original = Array.from(actions.children).filter((el) => el.matches?.('button,a,[role="button"]'));
    if (!original.length) return;

    actions.dataset.compactFileActions = 'v71';
    actions.textContent = '';

    const wrap = document.createElement('span');
    wrap.className = 'sabi-v71-file-menu-wrap';

    const menuBtn = document.createElement('button');
    menuBtn.type = 'button';
    menuBtn.className = 'sabi-v71-file-menu-btn';
    menuBtn.title = 'More';
    menuBtn.setAttribute('aria-label', 'More');
    menuBtn.textContent = '⋯';

    const menu = document.createElement('div');
    menu.className = 'sabi-v71-file-menu';
    menu.setAttribute('role', 'menu');

    original.forEach((el) => {
      const type = compactActionType(el);
      el.setAttribute('data-v71-action', type);
      menu.appendChild(el);
    });

    menuBtn.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();

      document.querySelectorAll('.sabi-v71-file-menu-wrap.open').forEach((el) => {
        if (el !== wrap) el.classList.remove('open');
      });

      wrap.classList.toggle('open');
    });

    document.addEventListener('click', (event) => {
      if (!wrap.contains(event.target)) wrap.classList.remove('open');
    }, true);

    wrap.append(menuBtn, menu);
    actions.appendChild(wrap);
  }
  /* v72 final single file menu: one ⋯ menu, original actions hidden but kept clickable */
  function asDirectDownloadUrlV72(raw) {
    const value = String(raw || '');
    if (!value) return value;
    try {
      const u = new URL(value, window.location.href);
      if (u.pathname.includes('/generated-v55/')) u.searchParams.set('download', '1');
      return u.toString();
    } catch (_) {
      if (value.includes('/generated-v55/') && !value.includes('download=1')) {
        return value + (value.includes('?') ? '&download=1' : '?download=1');
      }
      return value;
    }
  }

  function ensureSingleFileMenuStylesV72() {
    if (document.querySelector('style[data-sabi-v72-file-menu]')) return;

    const style = document.createElement('style');
    style.setAttribute('data-sabi-v72-file-menu', 'true');
    style.textContent = `
      /* Hide old v63-v71 artifacts if any remained */
      .sabi-v63-file-menu-wrap,
      .sabi-v64-menu-wrap,
      .sabi-v66-menu-wrap,
      .sabi-v67-card-menu-btn,
      .sabi-v67-global-menu,
      .sabi-v68-menu-btn,
      .sabi-v68-global-menu,
      .sabi-v69-more,
      .sabi-v69-menu,
      .sabi-v71-file-menu-wrap {
        display: none !important;
        visibility: hidden !important;
        pointer-events: none !important;
      }

      /* Remove background/frame under generated file blocks */
      .message-attachments,
      .attachment-item,
      .media-inline,
      .generated-center-card,
      .file-manager-card {
        background: transparent !important;
        box-shadow: none !important;
        backdrop-filter: none !important;
      }

      .attachment-item,
      .media-inline {
        border-color: rgba(98, 172, 255, .12) !important;
      }

      .media-toolbar,
      .media-meta-line,
      .attachment-meta,
      .attachment-actions,
      .media-inline-actions,
      .generated-center-actions,
      .file-manager-actions {
        background: transparent !important;
        box-shadow: none !important;
        border: 0 !important;
      }

      /* remove duplicate top media menu/actions; native player controls remain */
      .media-inline-actions {
        display: none !important;
        visibility: hidden !important;
        pointer-events: none !important;
      }

      .attachment-actions,
      .generated-center-actions,
      .file-manager-actions {
        position: relative !important;
        display: inline-flex !important;
        align-items: center !important;
        justify-content: flex-start !important;
        gap: 0 !important;
        padding: 0 !important;
        margin: 0 !important;
        overflow: visible !important;
        min-height: 28px !important;
      }

      .sabi-v72-hidden-original-action {
        position: absolute !important;
        width: 1px !important;
        height: 1px !important;
        opacity: 0 !important;
        overflow: hidden !important;
        pointer-events: none !important;
      }

      .sabi-v72-menu-btn {
        width: 30px !important;
        height: 26px !important;
        min-width: 30px !important;
        padding: 0 !important;
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
        border-radius: 11px !important;
        border: 1px solid rgba(120, 195, 255, .46) !important;
        background: rgba(5, 18, 42, .74) !important;
        color: rgba(238, 248, 255, .98) !important;
        font-size: 18px !important;
        line-height: 1 !important;
        cursor: pointer !important;
      }

      .sabi-v72-menu-btn:hover {
        background: rgba(35, 130, 255, .28) !important;
        border-color: rgba(145, 215, 255, .84) !important;
      }

      .sabi-v72-global-menu {
        position: fixed !important;
        z-index: 2147483647 !important;
        display: grid !important;
        gap: 6px !important;
        min-width: 168px !important;
        padding: 7px !important;
        border-radius: 14px !important;
        border: 1px solid rgba(120, 195, 255, .42) !important;
        background: rgba(3, 13, 31, .98) !important;
        box-shadow: 0 18px 48px rgba(0, 0, 0, .52) !important;
        backdrop-filter: blur(16px) !important;
      }

      .sabi-v72-global-menu button {
        width: 100% !important;
        height: 31px !important;
        min-height: 31px !important;
        display: inline-flex !important;
        align-items: center !important;
        justify-content: flex-start !important;
        padding: 0 10px !important;
        border-radius: 10px !important;
        font-size: 12px !important;
        line-height: 1 !important;
        color: rgba(238, 248, 255, .96) !important;
        background: rgba(10, 30, 65, .72) !important;
        border: 1px solid rgba(110, 185, 255, .24) !important;
        cursor: pointer !important;
      }

      .sabi-v72-global-menu button:hover {
        background: rgba(37, 132, 255, .24) !important;
        border-color: rgba(130, 205, 255, .65) !important;
      }

      .sabi-v72-global-menu [data-action="open"]::before { content: "↗"; margin-right: 8px; }
      .sabi-v72-global-menu [data-action="download"]::before { content: "↓"; margin-right: 8px; }
      .sabi-v72-global-menu [data-action="rename"]::before { content: "✎"; margin-right: 8px; }
      .sabi-v72-global-menu [data-action="save"]::before { content: "✓"; margin-right: 8px; }

      video,
      audio {
        background: #000 !important;
      }
    `;
    document.head.appendChild(style);
  }

  function compactActionTypeV72(el) {
    const text = String(el.textContent || el.title || el.getAttribute('aria-label') || '').trim().toLowerCase();
    if (text.includes('open')) return 'open';
    if (text.includes('download')) return 'download';
    if (text.includes('rename')) return 'rename';
    if (text.includes('save') || text.includes('saved')) return 'save';
    return '';
  }

  function compactActionLabelV72(type) {
    if (type === 'open') return 'Open';
    if (type === 'download') return 'Download';
    if (type === 'rename') return 'Rename';
    if (type === 'save') return 'Save';
    return 'Action';
  }

  function closeCompactFileMenuV72() {
    document.querySelectorAll('.sabi-v72-global-menu').forEach((el) => el.remove());
  }

  function openCompactFileMenuV72(anchor, items) {
    closeCompactFileMenuV72();

    const menu = document.createElement('div');
    menu.className = 'sabi-v72-global-menu';

    ['open', 'download', 'rename', 'save'].forEach((type) => {
      const original = items[type];
      if (!original) return;

      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = compactActionLabelV72(type);
      button.setAttribute('data-action', type);

      button.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        closeCompactFileMenuV72();

        if (type === 'download' && original.href) {
          const a = document.createElement('a');
          a.href = asDirectDownloadUrlV72(original.href);
          a.download = original.download || '';
          a.rel = 'noopener';
          a.style.display = 'none';
          document.body.appendChild(a);
          a.click();
          setTimeout(() => a.remove(), 1000);
          return;
        }

        original.click();
      });

      menu.appendChild(button);
    });

    if (!menu.children.length) return;

    document.body.appendChild(menu);

    const rect = anchor.getBoundingClientRect();
    const left = Math.min(rect.left, window.innerWidth - 180);
    const top = Math.min(rect.bottom + 8, window.innerHeight - menu.offsetHeight - 12);

    menu.style.left = Math.max(8, left) + 'px';
    menu.style.top = Math.max(8, top) + 'px';
  }

  function createCompactFileActionsV72(actions) {
    if (!actions || actions.dataset.compactFileActions === 'v72') return;
    ensureSingleFileMenuStylesV72();

    const originals = Array.from(actions.children).filter((el) => el.matches?.('button,a,[role="button"]'));
    if (!originals.length) return;

    const items = {};
    originals.forEach((el) => {
      const type = compactActionTypeV72(el);
      if (!type || items[type]) return;
      items[type] = el;
      el.classList.add('sabi-v72-hidden-original-action');
    });

    if (!Object.keys(items).length) return;

    actions.dataset.compactFileActions = 'v72';

    const menuButton = document.createElement('button');
    menuButton.type = 'button';
    menuButton.className = 'sabi-v72-menu-btn';
    menuButton.title = 'More';
    menuButton.setAttribute('aria-label', 'More');
    menuButton.textContent = '⋯';

    menuButton.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      openCompactFileMenuV72(menuButton, items);
    });

    actions.appendChild(menuButton);
  }

  document.addEventListener('click', (event) => {
    if (!event.target.closest('.sabi-v72-global-menu') && !event.target.closest('.sabi-v72-menu-btn')) {
      closeCompactFileMenuV72();
    }
  }, true);
  function updateAttachmentInMessage(chatId, messageId, attachmentIndex, patch = {}) {
    const chats = readChats();
    const chat = chats.find((c) => c.id === chatId);
    if (!chat) return null;
    const message = (chat.messages || []).find((m) => m.id === messageId);
    if (!message) return null;
    const attachments = normalizeMessageAttachments(message.attachments || []);
    if (!attachments[attachmentIndex]) return null;
    attachments[attachmentIndex] = { ...attachments[attachmentIndex], ...patch };
    message.attachments = attachments;
    message.files = attachments.map((file) => ({ name: file.name, size: file.size, type: file.type, kind: file.kind || fileKind(file) }));
    message.updatedAt = new Date().toISOString();
    chat.updatedAt = new Date().toISOString();
    writeChats(chats);
    const runtime = runtimeAttachmentSources.get(messageId);
    if (Array.isArray(runtime) && runtime[attachmentIndex]) {
      runtime[attachmentIndex] = { ...runtime[attachmentIndex], ...patch };
      runtimeAttachmentSources.set(messageId, runtime);
    }
    if (chatId === currentChatId) renderCurrentChat();
    return attachments[attachmentIndex];
  }

  function renameGeneratedAttachment(chatId, messageId, attachmentIndex) {
    const chat = readChats().find((c) => c.id === chatId);
    const message = chat?.messages?.find((m) => m.id === messageId);
    const current = normalizeMessageAttachments(message?.attachments || [])[attachmentIndex];
    if (!current) return;
    const next = window.prompt('Rename generated file', current.name || 'generated-file');
    if (next === null) return;
    const clean = next.trim();
    if (!clean) return;
    updateAttachmentInMessage(chatId, messageId, attachmentIndex, { name: clean, renamedAt: new Date().toISOString() });
    showToast('Generated file renamed.');
  }

  function markGeneratedAttachmentSaved(chatId, messageId, attachmentIndex) {
    const chat = readChats().find((c) => c.id === chatId);
    const message = chat?.messages?.find((m) => m.id === messageId);
    const attachment = normalizeMessageAttachments(message?.attachments || [])[attachmentIndex];
    if (!attachment) return;
    const saved = updateAttachmentInMessage(chatId, messageId, attachmentIndex, { saved: true, savedAt: new Date().toISOString() });
    try {
      const savedList = JSON.parse(localStorage.getItem(savedGeneratedKey) || '[]');
      const source = attachmentSource(saved || attachment);
      const record = {
        id: `${messageId}-${attachmentIndex}`,
        chatId,
        messageId,
        attachmentIndex,
        name: (saved || attachment).name,
        type: (saved || attachment).type,
        size: (saved || attachment).size,
        kind: (saved || attachment).kind,
        url: source && !String(source).startsWith('data:') ? source : '',
        savedAt: new Date().toISOString()
      };
      const filtered = savedList.filter((item) => item.id !== record.id);
      filtered.unshift(record);
      localStorage.setItem(savedGeneratedKey, JSON.stringify(filtered.slice(0, 120)));
    } catch (_) {}
    showToast('Generated file saved.');
  }

  function createAttachmentView(attachment, context = {}) {
    const item = document.createElement('div');
    item.className = `attachment-view ${attachment.kind || 'file'}${attachment.saved ? ' saved' : ''}`;
    const source = attachmentSource(attachment);
    if (attachment.kind === 'image' && source) {
      const img = document.createElement('img');
      img.src = source;
      img.alt = attachment.name;
      img.loading = 'lazy';
      item.appendChild(img);
    } else if ((attachment.kind === 'video' || attachment.kind === 'audio') && source) {
      item.appendChild(createMediaCard(attachment));
    } else if (attachment.kind === 'pdf' && source) {
      item.appendChild(createFileFace(attachment));
      const frame = document.createElement('iframe');
      frame.className = 'pdf-preview';
      frame.src = source;
      frame.title = attachment.name;
      item.appendChild(frame);
    } else if (attachment.kind === 'code' && attachment.text) {
      const pre = document.createElement('pre');
      pre.className = 'code-preview';
      const code = document.createElement('code');
      code.textContent = attachment.text.slice(0, 6000);
      pre.appendChild(code);
      item.appendChild(pre);
    } else {
      item.appendChild(createFileFace(attachment));
    }
    const meta = document.createElement('div');
    meta.className = 'attachment-meta';
    meta.innerHTML = `<strong></strong><small></small>`;
    meta.querySelector('strong').textContent = attachment.name;
    meta.querySelector('small').textContent = `${fileLabel(attachment.kind)} В· ${formatSize(attachment.size)}`;
    item.appendChild(meta);
    const actions = document.createElement('div');
    actions.className = 'attachment-actions';
    if (source) {
      const open = document.createElement('a');
      open.href = source;
      open.target = '_blank';
      open.rel = 'noopener';
      open.textContent = 'Open';
      actions.appendChild(open);
      const download = document.createElement('a');
      download.href = asDirectDownloadUrl(source);
      download.download = attachment.name;
      download.textContent = 'Download';
      actions.appendChild(download);
    } else {
      const download = document.createElement('button');
      download.type = 'button';
      download.disabled = true;
      download.textContent = 'Download unavailable';
      actions.appendChild(download);
    }
    if (context.generated && Number.isInteger(context.attachmentIndex)) {
      const rename = document.createElement('button');
      rename.type = 'button';
      rename.textContent = 'Rename';
      rename.addEventListener('click', () => renameGeneratedAttachment(context.chatId, context.messageId, context.attachmentIndex));
      actions.appendChild(rename);
      const save = document.createElement('button');
      save.type = 'button';
      save.textContent = attachment.saved ? 'Saved' : 'Save';
      save.disabled = Boolean(attachment.saved);
      save.addEventListener('click', () => markGeneratedAttachmentSaved(context.chatId, context.messageId, context.attachmentIndex));
      actions.appendChild(save);
    }
    createCompactFileActionsV72(actions);
    item.appendChild(actions);
    return item;
  }

  function renderAttachments(container, attachments = [], context = {}) {
    if (!attachments.length) return;
    const wrap = document.createElement('div');
    wrap.className = 'message-attachments';
    attachments.forEach((attachment, index) => wrap.appendChild(createAttachmentView(attachment, { ...context, attachmentIndex: index })));
    container.appendChild(wrap);
  }

  function guessFileNameFromUrl(url, fallback = 'generated-file') {
    try {
      const clean = String(url || '').split('?')[0].split('#')[0];
      const last = clean.split('/').filter(Boolean).pop();
      return decodeURIComponent(last || fallback);
    } catch (_) { return fallback; }
  }

  function addUniqueAttachment(list, item, fallback = {}) {
    if (!item) return;
    if (typeof item === 'string') {
      const raw = item.trim();
      const looksLikeFileUrl = /^(https?:|blob:|data:|\/)/i.test(raw);
      if (!looksLikeFileUrl) return;
      const name = fallback.name || guessFileNameFromUrl(raw, 'generated-file');
      const type = fallback.type || fallback.mimeType || '';
      list.push({ name, type, url: raw, downloadUrl: raw, dataUrl: raw, size: 0, kind: fallback.kind || fileKind({ name, type }) });
      return;
    }
    if (typeof item !== 'object') return;

    const fileData = item.fileData || item.file_data;
    if (fileData) {
      addUniqueAttachment(list, {
        name: fileData.displayName || fileData.name || fallback.name || 'gemini-file',
        type: fileData.mimeType || fileData.mime_type || fallback.type || 'application/octet-stream',
        url: fileData.fileUri || fileData.file_uri || fileData.uri || fileData.url,
        downloadUrl: fileData.fileUri || fileData.file_uri || fileData.uri || fileData.url,
        size: fileData.sizeBytes || fileData.size || 0
      }, fallback);
    }

    const inlineData = item.inlineData || item.inline_data;
    if (inlineData?.data) {
      const type = inlineData.mimeType || inlineData.mime_type || fallback.type || 'application/octet-stream';
      const name = inlineData.displayName || inlineData.name || fallback.name || `generated-${fileKind({ type })}`;
      list.push({
        name,
        type,
        size: inlineData.sizeBytes || 0,
        kind: fallback.kind || fileKind({ name, type }),
        base64: inlineData.data,
        dataUrl: `data:${type};base64,${inlineData.data}`,
        downloadUrl: `data:${type};base64,${inlineData.data}`
      });
    }

    const name = item.name || item.filename || item.fileName || item.title || item.displayName || fallback.name || '';
    const type = item.type || item.mimeType || item.mime || item.contentType || fallback.type || '';
    const url = item.url || item.downloadUrl || item.contentUrl || item.fileUrl || item.imageUrl || item.videoUrl || item.audioUrl || item.documentUrl || item.href || item.src || item.uri || '';
    const base64 = item.base64 || item.base64Content || item.dataBase64 || '';
    const text = item.text || item.contentText || '';
    if (url || base64 || text) {
      const finalName = name || (url ? guessFileNameFromUrl(url, 'generated-file') : `generated-${fileKind({ type })}`);
      const finalType = type || (text ? 'text/plain' : 'application/octet-stream');
      const dataUrl = base64 ? `data:${finalType};base64,${base64}` : (item.dataUrl || item.content || '');
      list.push({
        id: item.id,
        name: finalName,
        type: finalType,
        size: item.size || item.bytes || item.sizeBytes || 0,
        kind: item.kind || fallback.kind || fileKind({ name: finalName, type: finalType }),
        url: url || dataUrl || '',
        downloadUrl: item.downloadUrl || url || dataUrl || '',
        dataUrl,
        base64,
        text: text || ''
      });
    }
  }

  function normalizeBackendAttachments(data = {}) {
    const list = [];
    const visited = new WeakSet();
    const directGroups = [
      ['attachments'], ['files'], ['file'], ['media'], ['documents'], ['document'], ['images','image'], ['image','image'], ['videos','video'], ['video','video'], ['audios','audio'], ['audio','audio'],
      ['generatedFiles'], ['generated_files'], ['generated'], ['generated_outputs'], ['artifacts'], ['outputs'], ['assets'], ['results'], ['items'], ['resources'], ['downloads']
    ];

    function scanValue(value, fallback = {}, depth = 0) {
      if (!value || depth > 8) return;
      if (typeof value === 'string') {
        addUniqueAttachment(list, value, fallback);
        return;
      }
      if (Array.isArray(value)) {
        value.forEach((item) => scanValue(item, fallback, depth + 1));
        return;
      }
      if (typeof value !== 'object') return;
      if (visited.has(value)) return;
      visited.add(value);

      addUniqueAttachment(list, value, fallback);

      const mimeHint = value.mimeType || value.mime_type || value.contentType || value.type || fallback.type || '';
      const kindHint = value.kind || value.outputType || value.mediaType || fallback.kind || fileKind({ name: value.name || value.fileName || value.filename || '', type: mimeHint });
      const nextFallback = { ...fallback, kind: kindHint, type: mimeHint || fallback.type };

      directGroups.forEach(([key, fallbackKind]) => {
        const child = value?.[key];
        if (child) scanValue(child, fallbackKind ? { ...nextFallback, kind: fallbackKind } : nextFallback, depth + 1);
      });

      const urlKeys = ['imageUrl','image_url','videoUrl','video_url','audioUrl','audio_url','documentUrl','document_url','fileUrl','file_url','downloadUrl','download_url','contentUrl','content_url','url','uri','href','src'];
      urlKeys.forEach((key) => {
        if (value?.[key]) {
          const label = String(key).toLowerCase();
          const kind = label.includes('image') ? 'image' : label.includes('video') ? 'video' : label.includes('audio') ? 'audio' : label.includes('document') ? 'pdf' : nextFallback.kind;
          addUniqueAttachment(list, value[key], {
            ...nextFallback,
            kind,
            name: value.name || value.fileName || value.filename || value.title || value.displayName || guessFileNameFromUrl(value[key], `generated-${kind || 'file'}`),
            type: value.type || value.mimeType || value.contentType || nextFallback.type
          });
        }
      });

      const parts = value?.content?.parts || value?.parts || value?.candidate?.content?.parts || value?.candidates?.[0]?.content?.parts || [];
      if (Array.isArray(parts)) parts.forEach((part) => scanValue(part, nextFallback, depth + 1));

      const nestedKeys = ['result','response','data','gemini','modelResponse','model_response','payload','output','candidate','message','body'];
      nestedKeys.forEach((key) => {
        const child = value?.[key];
        if (child && child !== value && typeof child === 'object') scanValue(child, nextFallback, depth + 1);
      });
    }

    scanValue(data);

    const normalized = normalizeMessageAttachments(list);
    const seen = new Set();
    return normalized.filter((item) => {
      const key = `${item.name}|${item.type}|${item.url || item.downloadUrl || item.dataUrl || item.base64 || item.text}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    }).slice(0, 80);
  }

  function extractBackendAnswer(data = {}) {
    const visited = new WeakSet();
    function fromParts(parts) {
      if (!Array.isArray(parts)) return '';
      return parts.map((part) => {
        if (typeof part === 'string') return part;
        if (typeof part?.text === 'string') return part.text;
        if (typeof part?.content === 'string') return part.content;
        if (typeof part?.markdown === 'string') return part.markdown;
        if (typeof part?.message === 'string') return part.message;
        return '';
      }).filter(Boolean).join('\n').trim();
    }
    function scan(value, depth = 0) {
      if (!value || depth > 8) return '';
      if (typeof value === 'string') return value.trim();
      if (Array.isArray(value)) {
        const texts = value.map((item) => scan(item, depth + 1)).filter(Boolean);
        return texts.join('\n').trim();
      }
      if (typeof value !== 'object') return '';
      if (visited.has(value)) return '';
      visited.add(value);
      const direct = [
        value.answer, value.reply, value.responseText, value.response_text, value.text,
        value.message, value.content, value.markdown, value.output, value.outputText,
        value.output_text, value.resultText, value.result_text, value.completion,
        value.assistant, value.body
      ];
      for (const item of direct) {
        if (typeof item === 'string' && item.trim()) return item.trim();
      }
      const partsText = fromParts(value?.content?.parts || value?.parts || value?.candidate?.content?.parts || value?.candidates?.[0]?.content?.parts || value?.candidates?.[0]?.parts);
      if (partsText) return partsText;
      const choice = value.choices?.[0]?.message?.content || value.choices?.[0]?.text || value.choices?.[0]?.delta?.content;
      if (typeof choice === 'string' && choice.trim()) return choice.trim();
      const messagesText = Array.isArray(value.messages) ? value.messages.map((m) => (m.role === 'assistant' || m.author === 'assistant' || m.type === 'assistant') ? (m.content || m.text || m.message || '') : '').filter(Boolean).join('\n').trim() : '';
      if (messagesText) return messagesText;
      const nested = [value.result, value.response, value.data, value.gemini, value.modelResponse, value.model_response, value.payload, value.output, value.candidate, value.candidates?.[0]];
      for (const item of nested) {
        const found = scan(item, depth + 1);
        if (found) return found;
      }
      if (value.table || value.json || value.structured || value.schema) {
        try { return '```json\n' + JSON.stringify(value.table || value.json || value.structured || value.schema, null, 2) + '\n```'; } catch (_) {}
      }
      return '';
    }
    const found = scan(data);
    if (found) return found;
    if (data && typeof data === 'object') {
      try { return '```json\n' + JSON.stringify(data, null, 2) + '\n```'; } catch (_) {}
    }
    return '';
  }

  function codeExtension(language) {
    return ({ python:'py', py:'py', javascript:'js', js:'js', typescript:'ts', ts:'ts', html:'html', css:'css', json:'json', java:'java', sql:'sql', bash:'sh', shell:'sh', markdown:'md', md:'md', yaml:'yml', yml:'yml', xml:'xml', php:'php', ruby:'rb', go:'go', rust:'rs', c:'c', cpp:'cpp', 'c++':'cpp', csharp:'cs', cs:'cs' })[language] || 'txt';
  }

  function downloadTextFile(text, filename) {
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 500);
  }

  function createCodeBlock(language, codeText) {
    const block = document.createElement('div');
    block.className = 'code-block';
    const top = document.createElement('div');
    top.className = 'code-top';
    const lang = document.createElement('span');
    const normalized = (language || 'code').toLowerCase();
    lang.textContent = normalized;
    const copy = document.createElement('button');
    copy.type = 'button';
    copy.textContent = 'Copy';
    copy.addEventListener('click', async () => {
      try { await navigator.clipboard.writeText(codeText); showToast('Code copied.'); }
      catch (_) { showToast('Copy is not available.'); }
    });
    const download = document.createElement('button');
    download.type = 'button';
    download.textContent = 'Download';
    download.addEventListener('click', () => downloadTextFile(codeText, `sabi-ai-code.${codeExtension(normalized)}`));
    top.append(lang, copy, download);
    const pre = document.createElement('pre');
    const code = document.createElement('code');
    code.textContent = codeText;
    pre.appendChild(code);
    block.append(top, pre);
    return block;
  }

  function looksLikeJson(text) {
    const clean = String(text || '').trim();
    if (!/^[{[]/.test(clean)) return false;
    try { JSON.parse(clean); return true; } catch (_) { return false; }
  }

  function createJsonBlock(text) {
    let pretty = String(text || '').trim();
    try { pretty = JSON.stringify(JSON.parse(pretty), null, 2); } catch (_) {}
    const wrap = document.createElement('div');
    wrap.className = 'json-render-card';
    const head = document.createElement('div');
    head.className = 'json-render-head';
    const label = document.createElement('strong');
    label.textContent = 'Structured JSON';
    const copy = document.createElement('button');
    copy.type = 'button';
    copy.textContent = 'Copy';
    copy.addEventListener('click', async () => {
      try { await navigator.clipboard.writeText(pretty); showToast('JSON copied.'); }
      catch (_) { showToast('Copy is not available.'); }
    });
    const download = document.createElement('button');
    download.type = 'button';
    download.textContent = 'Download';
    download.addEventListener('click', () => downloadTextFile(pretty, 'sabi-ai-response.json'));
    head.append(label, copy, download);
    const pre = document.createElement('pre');
    pre.textContent = pretty;
    wrap.append(head, pre);
    return wrap;
  }

  function isMarkdownTableStart(lines, index) {
    const current = lines[index] || '';
    const next = lines[index + 1] || '';
    return current.includes('|') && /^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(next);
  }

  function splitTableRow(row) {
    return row.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map((cell) => cell.trim());
  }

  function appendTable(container, rows) {
    if (rows.length < 2) return;
    const tableWrap = document.createElement('div');
    tableWrap.className = 'markdown-table-wrap';
    const table = document.createElement('table');
    table.className = 'markdown-table';
    const headers = splitTableRow(rows[0]);
    const thead = document.createElement('thead');
    const headRow = document.createElement('tr');
    headers.forEach((header) => { const th = document.createElement('th'); th.textContent = header; headRow.appendChild(th); });
    thead.appendChild(headRow);
    table.appendChild(thead);
    const tbody = document.createElement('tbody');
    rows.slice(2).forEach((row) => {
      const tr = document.createElement('tr');
      splitTableRow(row).forEach((cell) => { const td = document.createElement('td'); td.textContent = cell; tr.appendChild(td); });
      tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    tableWrap.appendChild(table);
    container.appendChild(tableWrap);
  }

  function appendMarkdownPart(container, part) {
    const text = String(part || '').trim();
    if (!text) return;
    if (looksLikeJson(text)) { container.appendChild(createJsonBlock(text)); return; }
    const lines = text.split(/\r?\n/);
    let i = 0;
    let paragraph = [];
    const flushParagraph = () => {
      if (!paragraph.length) return;
      const p = document.createElement('p');
      p.textContent = paragraph.join('\n').trim();
      if (p.textContent) container.appendChild(p);
      paragraph = [];
    };
    while (i < lines.length) {
      const line = lines[i];
      if (!line.trim()) { flushParagraph(); i += 1; continue; }
      if (isMarkdownTableStart(lines, i)) {
        flushParagraph();
        const tableRows = [lines[i], lines[i + 1]];
        i += 2;
        while (i < lines.length && lines[i].includes('|') && lines[i].trim()) { tableRows.push(lines[i]); i += 1; }
        appendTable(container, tableRows);
        continue;
      }
      const heading = line.match(/^\s{0,3}(#{1,4})\s+(.+)$/);
      if (heading) {
        flushParagraph();
        const h = document.createElement(heading[1].length <= 2 ? 'h3' : 'h4');
        h.className = 'markdown-heading';
        h.textContent = heading[2].trim();
        container.appendChild(h);
        i += 1;
        continue;
      }
      const listMatch = line.match(/^\s*(?:[-*•]|\d+[.)])\s+(.+)$/);
      if (listMatch) {
        flushParagraph();
        const ordered = /^\s*\d+[.)]/.test(line);
        const list = document.createElement(ordered ? 'ol' : 'ul');
        list.className = 'markdown-list';
        while (i < lines.length) {
          const itemMatch = lines[i].match(/^\s*(?:[-*•]|\d+[.)])\s+(.+)$/);
          if (!itemMatch) break;
          const li = document.createElement('li');
          li.textContent = itemMatch[1].trim();
          list.appendChild(li);
          i += 1;
        }
        container.appendChild(list);
        continue;
      }
      paragraph.push(line);
      i += 1;
    }
    flushParagraph();
  }

  function renderRichText(container, content, message) {
    const text = String(content || '');
    const attachments = message.attachments || [];
    if (!text.trim() && attachments.length) {
      const banner = document.createElement('div');
      banner.className = 'generated-output-banner';
      banner.textContent = 'Generated output is ready.';
      container.appendChild(banner);
    }
    const fence = /```([\w.+-]*)\n([\s\S]*?)```/g;
    let last = 0;
    let match;
    let found = false;
    while ((match = fence.exec(text))) {
      found = true;
      appendMarkdownPart(container, text.slice(last, match.index));
      const language = (match[1] || 'code').toLowerCase();
      const codeText = match[2];
      if (language === 'json') container.appendChild(createJsonBlock(codeText));
      else container.appendChild(createCodeBlock(language, codeText));
      last = fence.lastIndex;
    }
    appendMarkdownPart(container, found ? text.slice(last) : text);
    renderAttachments(container, attachments, { chatId: currentChatId, messageId: message.id, generated: message.role === 'assistant' });
  }

  function clearEditor(node) {
    if ('value' in node) node.value = '';
    else node.innerHTML = '';
    if (node === chatEditor) syncChatInputHeight(true);
  }

  function syncChatInputHeight(reset = false) {
    if (!chatEditor) return;
    const computed = window.getComputedStyle(chatEditor);
    const lineHeight = parseFloat(computed.lineHeight) || 29;
    const verticalPadding = (parseFloat(computed.paddingTop) || 0) + (parseFloat(computed.paddingBottom) || 0);
    const minHeight = Math.ceil(lineHeight + verticalPadding);
    const maxHeight = Math.ceil((lineHeight * 10) + verticalPadding);

    chatEditor.style.height = `${minHeight}px`;
    chatEditor.style.overflowY = 'hidden';
    if (chatComposer) chatComposer.style.height = 'auto';

    if (reset || !getEditorText(chatEditor)) {
      chatEditor.style.height = `${minHeight}px`;
      chatEditor.scrollTop = 0;
      updateComposerStats();
      return;
    }

    const needed = chatEditor.scrollHeight;
    const next = Math.min(needed, maxHeight);
    chatEditor.style.height = `${Math.max(minHeight, next)}px`;
    chatEditor.style.overflowY = needed > maxHeight ? 'auto' : 'hidden';
    if (needed > maxHeight) chatEditor.scrollTop = chatEditor.scrollHeight;
    updateComposerStats();
  }

  function focusMainEditor() { editor.focus(); }
  function focusChatEditor() { chatEditor.focus(); }

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 1800);
  }


  function readDrafts() {
    try {
      const parsed = JSON.parse(localStorage.getItem(draftsKey) || '{}');
      return parsed && typeof parsed === 'object' ? parsed : {};
    } catch (_) { return {}; }
  }

  function writeDrafts(drafts) {
    try { localStorage.setItem(draftsKey, JSON.stringify(drafts || {})); } catch (_) {}
  }

  function draftIdFor(node = chatEditor) {
    if (node === chatEditor) return currentChatId ? `chat:${currentChatId}` : 'chat:new';
    return 'main';
  }

  function saveDraft(node) {
    if (!node) return;
    const id = draftIdFor(node);
    const text = getEditorText(node);
    const drafts = readDrafts();
    if (!text) delete drafts[id];
    else drafts[id] = { text, updatedAt: new Date().toISOString() };
    writeDrafts(drafts);
  }

  function clearDraft(node) {
    const id = draftIdFor(node);
    const drafts = readDrafts();
    if (drafts[id]) {
      delete drafts[id];
      writeDrafts(drafts);
    }
  }

  function restoreDraftForCurrentChat() {
    if (!chatEditor || !currentChatId) return;
    const id = `chat:${currentChatId}`;
    const draft = readDrafts()[id];
    if (!draft?.text || getEditorText(chatEditor)) return;
    chatEditor.value = draft.text;
    syncChatInputHeight(true);
    updateComposerStats();
    showToast('Draft restored.');
  }

  function ensureUndoPanel() {
    let panel = document.getElementById('sabiUndoPanel');
    if (panel) return panel;
    panel = document.createElement('div');
    panel.id = 'sabiUndoPanel';
    panel.className = 'sabi-undo-panel';
    panel.hidden = true;
    app.appendChild(panel);
    return panel;
  }

  function showUndo(message, handler) {
    const panel = ensureUndoPanel();
    panel.innerHTML = '';
    const text = document.createElement('span');
    text.textContent = message;
    const undo = document.createElement('button');
    undo.type = 'button';
    undo.textContent = 'Undo';
    const close = document.createElement('button');
    close.type = 'button';
    close.textContent = 'Г—';
    const hide = () => { panel.hidden = true; panel.innerHTML = ''; clearTimeout(undoTimer); undoTimer = null; };
    undo.addEventListener('click', () => { hide(); handler?.(); });
    close.addEventListener('click', hide);
    panel.append(text, undo, close);
    panel.hidden = false;
    clearTimeout(undoTimer);
    undoTimer = setTimeout(hide, 9000);
  }


  function transferStageFromStatus(status = '') {
    const text = String(status || '').toLowerCase();
    if (text.includes('upload')) return 'uploading';
    if (text.includes('process') || text.includes('typing') || text.includes('receiv')) return 'processing';
    if (text.includes('complete') || text.includes('sent') || text.includes('ready')) return 'done';
    if (text.includes('cancel') || text.includes('saved') || text.includes('waiting')) return 'saved';
    return 'preparing';
  }

  function showTransferPanel(state = {}) {
    if (!chatTransferPanel) return;
    const status = state.status || 'Preparing';
    const detail = state.detail || '';
    const percent = Number.isFinite(state.percent) ? Math.max(0, Math.min(100, Math.round(state.percent))) : 0;
    const fileCount = Number(state.fileCount || 0);
    const stage = transferStageFromStatus(status);
    chatTransferPanel.hidden = false;
    chatTransferPanel.dataset.stage = stage;
    chatTransferPanel.innerHTML = '';
    const top = document.createElement('div');
    top.className = 'transfer-top';
    const left = document.createElement('div');
    left.className = 'transfer-copy';
    const title = document.createElement('strong');
    title.textContent = status;
    const sub = document.createElement('small');
    sub.textContent = detail || (fileCount ? `${fileCount} file(s)` : 'Sabi AI is processing your request');
    left.append(title, sub);
    const right = document.createElement('div');
    right.className = 'transfer-right';
    const value = document.createElement('span');
    value.className = 'transfer-percent';
    value.textContent = state.indeterminate ? 'Working' : `${percent}%`;
    right.appendChild(value);
    if (state.cancellable) {
      const cancel = document.createElement('button');
      cancel.className = 'transfer-cancel';
      cancel.type = 'button';
      cancel.textContent = 'Cancel';
      cancel.addEventListener('click', cancelActiveRequest);
      right.appendChild(cancel);
    }
    top.append(left, right);
    const bar = document.createElement('div');
    bar.className = `transfer-bar${state.indeterminate ? ' indeterminate' : ''}`;
    const fill = document.createElement('span');
    fill.style.width = state.indeterminate ? '45%' : `${percent}%`;
    bar.appendChild(fill);
    const steps = document.createElement('div');
    steps.className = 'transfer-steps';
    const stepOrder = ['preparing', 'uploading', 'processing', 'done'];
    const labels = { preparing:'Preparing', uploading:'Uploading', processing:'Processing', done:'Ready' };
    const activeIndex = Math.max(0, stepOrder.indexOf(stage === 'saved' ? 'preparing' : stage));
    stepOrder.forEach((item, index) => {
      const chip = document.createElement('span');
      chip.className = `transfer-step${index <= activeIndex ? ' active' : ''}`;
      chip.textContent = labels[item];
      steps.appendChild(chip);
    });
    chatTransferPanel.append(top, bar, steps);
  }

  function hideTransferPanel(delay = 0) {
    if (!chatTransferPanel) return;
    window.setTimeout(() => {
      chatTransferPanel.hidden = true;
      chatTransferPanel.innerHTML = '';
    }, delay);
  }

  function scrollChatToBottom() {
    if (!messageList) return;
    requestAnimationFrame(() => { messageList.scrollTop = messageList.scrollHeight; });
  }

  function updateMessageLive(chatId, messageId, patch = {}) {
    const chats = readChats();
    const chat = chats.find((c) => c.id === chatId);
    if (!chat) return null;
    const message = (chat.messages || []).find((m) => m.id === messageId);
    if (!message) return null;
    Object.assign(message, patch, { updatedAt: new Date().toISOString() });
    chat.updatedAt = new Date().toISOString();
    writeChats(chats);
    if (chatId === currentChatId) {
      renderCurrentChat();
      scrollChatToBottom();
    }
    return message;
  }

  function stopStreamingMessage(chatId, messageId) {
    const timer = streamingTimers.get(messageId);
    if (timer) window.clearTimeout(timer);
    streamingTimers.delete(messageId);
    updateMessageLive(chatId, messageId, { status: 'sent' });
    showTransferPanel({ status: 'Stopped', detail: 'Sabi AI response stopped.', percent: 100 });
    hideTransferPanel(900);
  }

  function streamAssistantMessage(chatId, messageId, finalText) {
    const full = String(finalText || '');
    if (!full.trim()) {
      updateMessageLive(chatId, messageId, { status: 'sent' });
      return Promise.resolve();
    }
    const total = full.length;
    const chunk = total > 2800 ? 48 : total > 1400 ? 34 : total > 700 ? 22 : 12;
    const delay = total > 2800 ? 8 : total > 1400 ? 10 : 14;
    let index = 0;
    updateMessageLive(chatId, messageId, { content: '', status: 'streaming' });
    showTransferPanel({ status: 'Sabi AI is typing', detail: 'Streaming answer into the chat', percent: 98, indeterminate: true, cancellable: false });
    return new Promise((resolve) => {
      const step = () => {
        index = Math.min(total, index + chunk);
        const partial = full.slice(0, index);
        updateMessageLive(chatId, messageId, { content: partial, status: index >= total ? 'sent' : 'streaming' });
        if (index >= total) {
          streamingTimers.delete(messageId);
          hideTransferPanel(500);
          resolve();
          return;
        }
        const timer = window.setTimeout(step, delay);
        streamingTimers.set(messageId, timer);
      };
      step();
    });
  }

  function extractTextFromStreamChunk(chunk) {
    const text = String(chunk || '').trim();
    if (!text) return '';
    try {
      const json = JSON.parse(text);
      return extractBackendAnswer(json)
        || json.choices?.[0]?.delta?.content
        || json.choices?.[0]?.message?.content
        || json.delta?.content
        || json.delta
        || json.token
        || json.content
        || json.text
        || '';
    } catch (_) {
      return text.replace(/^data:\s*/i, '').trim();
    }
  }

  function parseStreamResponseText(raw) {
    const text = String(raw || '').trim();
    if (!text) return {};
    try { return JSON.parse(text); } catch (_) {}
    const pieces = [];
    text.split(/\r?\n/).forEach((line) => {
      const clean = line.trim();
      if (!clean || clean === 'data: [DONE]' || clean === '[DONE]') return;
      if (clean.startsWith('data:')) pieces.push(extractTextFromStreamChunk(clean.slice(5)));
      else pieces.push(extractTextFromStreamChunk(clean));
    });
    const answer = pieces.filter(Boolean).join('');
    return { answer: answer || text };
  }

  async function readBackendResponse(response) {
    const type = (response.headers.get('content-type') || '').toLowerCase();
    if (type.includes('application/json')) return response.json().catch(() => ({}));
    if (!response.body) {
      const raw = await response.text().catch(() => '');
      return parseStreamResponseText(raw);
    }
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let raw = '';
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      raw += decoder.decode(value, { stream: true });
      showTransferPanel({ status: 'Receiving stream', detail: 'Sabi AI is sending response data', percent: 98, indeterminate: true, cancellable: true });
    }
    raw += decoder.decode();
    return parseStreamResponseText(raw);
  }

  function cancelActiveRequest() {
    if (!activeRequest) return;
    try { activeRequest.abort(); } catch (_) {}
    activeRequest = null;
    showTransferPanel({ status: 'Cancelled', detail: 'Request stopped before completion.', percent: 0 });
    hideTransferPanel(900);
  }

  function rememberRuntimeAttachments(messageId, attachments = []) {
    if (!messageId || !attachments.length) return;
    runtimeAttachmentSources.set(messageId, attachments.map((item) => ({ ...item })));
  }

  function hydrateRuntimeAttachments(message) {
    const stored = normalizeMessageAttachments(message?.attachments || []);
    const runtime = runtimeAttachmentSources.get(message?.id) || [];
    if (!stored.length) return normalizeMessageAttachments(runtime);
    return stored.map((item, index) => ({ ...item, ...(runtime[index] || {}) }));
  }

  function updateMessageMeta(chatId, messageId, patch = {}) {
    const chats = readChats();
    const chat = chats.find((c) => c.id === chatId);
    if (!chat) return;
    const message = (chat.messages || []).find((m) => m.id === messageId);
    if (!message) return;
    Object.assign(message, patch, { updatedAt: new Date().toISOString() });
    chat.updatedAt = new Date().toISOString();
    writeChats(chats);
    if (chatId === currentChatId) renderCurrentChat();
  }

  function deleteMessage(chatId, messageId) {
    const chats = readChats();
    const chat = chats.find((c) => c.id === chatId);
    if (!chat) return;
    const index = (chat.messages || []).findIndex((m) => m.id === messageId);
    if (index < 0) return;
    const removed = { ...chat.messages[index], attachments: normalizeMessageAttachments(chat.messages[index].attachments || []) };
    const runtime = runtimeAttachmentSources.get(messageId);
    chat.messages.splice(index, 1);
    chat.updatedAt = new Date().toISOString();
    writeChats(chats);
    renderCurrentChat();
    showUndo('Message deleted.', () => {
      const nextChats = readChats();
      const nextChat = nextChats.find((c) => c.id === chatId);
      if (!nextChat) return;
      nextChat.messages = Array.isArray(nextChat.messages) ? nextChat.messages : [];
      nextChat.messages.splice(Math.min(index, nextChat.messages.length), 0, removed);
      nextChat.updatedAt = new Date().toISOString();
      if (runtime) runtimeAttachmentSources.set(messageId, runtime);
      writeChats(nextChats);
      if (currentChatId === chatId) renderCurrentChat();
    });
  }

  function renameCurrentChat() {
    const chat = getCurrentChat();
    if (!chat) return;
    const next = window.prompt('Rename chat', chat.title || 'New chat');
    if (next === null) return;
    const clean = next.trim() || 'New chat';
    const chats = readChats();
    const item = chats.find((c) => c.id === chat.id);
    if (!item) return;
    item.title = makeTitle(clean);
    item.updatedAt = new Date().toISOString();
    writeChats(chats);
    renderCurrentChat();
  }

  function clearCurrentChat() {
    const chat = getCurrentChat();
    if (!chat) return;
    if (!window.confirm('Clear all messages in this chat?')) return;
    const previousMessages = (chat.messages || []).map((m) => ({ ...m, attachments: normalizeMessageAttachments(m.attachments || []) }));
    const chats = readChats();
    const item = chats.find((c) => c.id === chat.id);
    if (!item) return;
    item.messages = [];
    item.updatedAt = new Date().toISOString();
    writeChats(chats);
    renderCurrentChat();
    showUndo('Chat cleared.', () => {
      const nextChats = readChats();
      const next = nextChats.find((c) => c.id === chat.id);
      if (!next) return;
      next.messages = previousMessages;
      next.updatedAt = new Date().toISOString();
      writeChats(nextChats);
      if (currentChatId === chat.id) renderCurrentChat();
    });
  }

  function deleteCurrentChat() {
    const chat = getCurrentChat();
    if (!chat) return;
    if (!window.confirm('Delete this chat?')) return;
    const removed = { ...chat, messages: (chat.messages || []).map((m) => ({ ...m, attachments: normalizeMessageAttachments(m.attachments || []) })) };
    const chats = readChats().filter((c) => c.id !== chat.id);
    writeChats(chats);
    switchToMain();
    showUndo('Chat deleted.', () => {
      const nextChats = readChats();
      if (!nextChats.some((c) => c.id === removed.id)) nextChats.unshift(removed);
      writeChats(nextChats);
      switchToChat(removed.id);
    });
  }

  function collectGeneratedOutputs(chat = getCurrentChat()) {
    const outputs = [];
    if (!chat) return outputs;
    (chat.messages || []).forEach((message) => {
      if (message.role !== 'assistant') return;
      hydrateRuntimeAttachments(message).forEach((attachment, index) => {
        outputs.push({
          chatId: chat.id,
          messageId: message.id,
          attachmentIndex: index,
          createdAt: message.createdAt,
          attachment
        });
      });
    });
    return outputs;
  }

  function createGeneratedCenterPanel() {
    let panel = document.getElementById('generatedCenterPanel');
    if (panel) return panel;
    panel = document.createElement('section');
    panel.id = 'generatedCenterPanel';
    panel.className = 'generated-center-panel';
    panel.hidden = true;
    panel.setAttribute('aria-label', 'Generated file center');
    chatScreen.appendChild(panel);
    return panel;
  }

  function closeGeneratedCenter() {
    const panel = document.getElementById('generatedCenterPanel');
    if (panel) panel.hidden = true;
  }

  function renderGeneratedCenter(open = false) {
    const chat = getCurrentChat();
    const panel = createGeneratedCenterPanel();
    const outputs = collectGeneratedOutputs(chat);
    const count = document.getElementById('generatedFilesCount');
    if (count) count.textContent = String(outputs.length);
    panel.innerHTML = '';
    const head = document.createElement('div');
    head.className = 'generated-center-head';
    const copy = document.createElement('div');
    copy.innerHTML = `<strong>Generated files</strong><small>Preview, open, download, rename, and save Sabi AI outputs.</small>`;
    const close = document.createElement('button');
    close.type = 'button';
    close.textContent = 'Close';
    close.addEventListener('click', closeGeneratedCenter);
    head.append(copy, close);
    panel.appendChild(head);

    if (!outputs.length) {
      const empty = document.createElement('div');
      empty.className = 'generated-center-empty';
      empty.textContent = 'No generated files in this chat yet.';
      panel.appendChild(empty);
      if (open) panel.hidden = false;
      return;
    }

    const grid = document.createElement('div');
    grid.className = 'generated-center-grid';
    outputs.forEach((output) => {
      const card = document.createElement('article');
      card.className = `generated-center-card ${output.attachment.kind || 'file'}${output.attachment.saved ? ' saved' : ''}`;
      const preview = document.createElement('div');
      preview.className = 'generated-center-preview';
      const source = attachmentSource(output.attachment);
      if (output.attachment.kind === 'image' && source) {
        const img = document.createElement('img');
        img.src = source;
        img.alt = output.attachment.name;
        preview.appendChild(img);
      } else if (output.attachment.kind === 'video' && source) {
        const video = document.createElement('video');
        video.src = source;
        video.controls = true;
        video.preload = 'metadata';
        preview.appendChild(video);
      } else if (output.attachment.kind === 'audio' && source) {
        const audio = document.createElement('audio');
        audio.src = source;
        audio.controls = true;
        preview.appendChild(createFileFace(output.attachment), audio);
      } else {
        preview.appendChild(createFileFace(output.attachment));
      }
      const meta = document.createElement('div');
      meta.className = 'generated-center-meta';
      const dateText = output.createdAt ? new Intl.DateTimeFormat('en-US', {hour:'numeric', minute:'2-digit'}).format(new Date(output.createdAt)) : '';
      meta.innerHTML = `<strong></strong><small></small>`;
      meta.querySelector('strong').textContent = output.attachment.name;
      meta.querySelector('small').textContent = `${fileLabel(output.attachment.kind)} В· ${formatSize(output.attachment.size)}${dateText ? ` В· ${dateText}` : ''}${output.attachment.saved ? ' В· Saved' : ''}`;
      const actions = document.createElement('div');
      actions.className = 'generated-center-actions';
      if (source) {
        const openLink = document.createElement('a');
        openLink.href = source;
        openLink.target = '_blank';
        openLink.rel = 'noopener';
        openLink.textContent = 'Open';
        const download = document.createElement('a');
        download.href = asDirectDownloadUrl(source);
        download.download = output.attachment.name;
        download.textContent = 'Download';
        actions.append(openLink, download);
      }
      const rename = document.createElement('button');
      rename.type = 'button';
      rename.textContent = 'Rename';
      rename.addEventListener('click', () => renameGeneratedAttachment(output.chatId, output.messageId, output.attachmentIndex));
      const save = document.createElement('button');
      save.type = 'button';
      save.textContent = output.attachment.saved ? 'Saved' : 'Save';
      save.disabled = Boolean(output.attachment.saved);
      save.addEventListener('click', () => markGeneratedAttachmentSaved(output.chatId, output.messageId, output.attachmentIndex));
      actions.append(rename, save);
      createCompactFileActionsV72(actions);
      card.append(preview, meta, actions);
      grid.appendChild(card);
    });
    panel.appendChild(grid);
    if (open) panel.hidden = false;
  }


  let activeFileManagerFilter = 'all';
  const selectedFileManagerKeys = new Set();
  let activeChatSearchQuery = '';

  function collectChatFiles(chat = getCurrentChat()) {
    const files = [];
    if (!chat) return files;
    (chat.messages || []).forEach((message) => {
      hydrateRuntimeAttachments(message).forEach((attachment, index) => {
        const role = message.role === 'user' ? 'sent' : 'received';
        files.push({
          key: `${message.id}:${index}`,
          chatId: chat.id,
          messageId: message.id,
          attachmentIndex: index,
          role,
          generated: message.role === 'assistant',
          createdAt: message.createdAt,
          attachment
        });
      });
    });
    return files;
  }

  function fileManagerFilter(record, filter = activeFileManagerFilter) {
    if (filter === 'sent') return record.role === 'sent';
    if (filter === 'received') return record.role === 'received';
    if (filter === 'generated') return Boolean(record.generated);
    return true;
  }

  function createAttachmentPreviewElement(attachment, large = false) {
    const preview = document.createElement('div');
    preview.className = large ? 'file-manager-preview large' : 'file-manager-preview';
    const source = attachmentSource(attachment);
    if (attachment.kind === 'image' && source) {
      const img = document.createElement('img');
      img.src = source;
      img.alt = attachment.name || 'image';
      img.loading = 'lazy';
      preview.appendChild(img);
    } else if ((attachment.kind === 'video' || attachment.kind === 'audio') && source) {
      preview.appendChild(createMediaCard(attachment, { compact: true }));
    } else if (attachment.kind === 'pdf' && source) {
      const iframe = document.createElement('iframe');
      iframe.className = 'pdf-preview';
      iframe.src = source;
      iframe.title = attachment.name || 'PDF';
      preview.appendChild(iframe);
    } else if (attachment.kind === 'code' && attachment.text) {
      const pre = document.createElement('pre');
      pre.className = 'code-preview';
      const code = document.createElement('code');
      code.textContent = String(attachment.text || '').slice(0, 5000);
      pre.appendChild(code);
      preview.appendChild(pre);
    } else {
      preview.appendChild(createFileFace(attachment));
    }
    return preview;
  }

  function downloadAttachment(attachment) {
    const source = attachmentSource(attachment);
    if (!source) return false;
    const a = document.createElement('a');
    a.href = source;
    a.download = attachment.name || 'sabi-ai-file';
    a.rel = 'noopener';
    document.body.appendChild(a);
    a.click();
    a.remove();
    return true;
  }

  function downloadRecords(records) {
    const downloadable = records.filter((record) => attachmentSource(record.attachment));
    if (!downloadable.length) {
      showToast('No downloadable files in this view.');
      return;
    }
    downloadable.slice(0, 60).forEach((record, index) => {
      window.setTimeout(() => downloadAttachment(record.attachment), index * 160);
    });
    showToast(`Starting ${downloadable.length} download(s).`);
  }

  function clearFileManagerSelection() {
    selectedFileManagerKeys.clear();
  }

  function currentSelectedFileRecords(records) {
    return records.filter((record) => selectedFileManagerKeys.has(record.key));
  }

  function removeFileRecords(records, { confirmText = 'Delete selected file(s) from this chat?' } = {}) {
    if (!records.length) { showToast('No files selected.'); return false; }
    if (confirmText && !window.confirm(confirmText)) return false;
    const chats = readChats();
    const chat = chats.find((item) => item.id === currentChatId);
    if (!chat) return false;
    const grouped = new Map();
    records.forEach((record) => {
      if (!grouped.has(record.messageId)) grouped.set(record.messageId, []);
      grouped.get(record.messageId).push(record.attachmentIndex);
    });
    (chat.messages || []).forEach((message) => {
      const indexes = grouped.get(message.id);
      if (!indexes) return;
      const unique = Array.from(new Set(indexes)).sort((a, b) => b - a);
      message.attachments = normalizeMessageAttachments(message.attachments || []);
      unique.forEach((index) => {
        if (index >= 0) message.attachments.splice(index, 1);
      });
      message.files = normalizeMessageAttachments(message.attachments || []).map((file) => ({ name: file.name, type: file.type, size: file.size, kind: file.kind }));
      const runtime = runtimeAttachmentSources.get(message.id);
      if (Array.isArray(runtime)) {
        unique.forEach((index) => { if (index >= 0) runtime.splice(index, 1); });
        runtimeAttachmentSources.set(message.id, runtime);
      }
      message.updatedAt = new Date().toISOString();
    });
    chat.updatedAt = new Date().toISOString();
    writeChats(chats);
    clearFileManagerSelection();
    renderCurrentChat();
    renderFileManager(true, activeFileManagerFilter);
    showToast(`${records.length} file(s) removed from chat.`);
    return true;
  }

  function clearAllFilesInCurrentChat() {
    const allFiles = collectChatFiles();
    removeFileRecords(allFiles, { confirmText: 'Clear all files from this chat?' });
  }

  function createFileManagerPanel() {
    let panel = document.getElementById('fileManagerPanel');
    if (panel) return panel;
    panel = document.createElement('section');
    panel.id = 'fileManagerPanel';
    panel.className = 'file-manager-panel';
    panel.hidden = true;
    panel.setAttribute('aria-label', 'Chat file manager');
    chatScreen.appendChild(panel);
    return panel;
  }

  function closeFileManager() {
    const panel = document.getElementById('fileManagerPanel');
    if (panel) panel.hidden = true;
  }

  function renderFileManager(open = false, filter = activeFileManagerFilter) {
    const chat = getCurrentChat();
    const panel = createFileManagerPanel();
    activeFileManagerFilter = filter || 'all';
    const allFiles = collectChatFiles(chat);
    const visible = allFiles.filter((record) => fileManagerFilter(record, activeFileManagerFilter));
    const allKeys = new Set(allFiles.map((record) => record.key));
    Array.from(selectedFileManagerKeys).forEach((key) => { if (!allKeys.has(key)) selectedFileManagerKeys.delete(key); });
    const selectedVisible = currentSelectedFileRecords(visible);
    const count = document.getElementById('fileManagerCount');
    if (count) count.textContent = String(allFiles.length);
    panel.innerHTML = '';

    const head = document.createElement('div');
    head.className = 'file-manager-head';
    const copy = document.createElement('div');
    copy.innerHTML = `<strong>Chat files</strong><small>Sent, received, and generated files in this conversation.</small>`;
    const headActions = document.createElement('div');
    headActions.className = 'file-manager-head-actions';
    const selectedCounter = document.createElement('span');
    selectedCounter.className = 'file-manager-selected-count';
    selectedCounter.textContent = `${selectedVisible.length} selected`;
    const selectVisible = document.createElement('button');
    selectVisible.type = 'button';
    selectVisible.textContent = selectedVisible.length === visible.length && visible.length ? 'Unselect view' : 'Select view';
    selectVisible.disabled = !visible.length;
    selectVisible.addEventListener('click', () => {
      const allSelected = visible.length && selectedVisible.length === visible.length;
      visible.forEach((record) => allSelected ? selectedFileManagerKeys.delete(record.key) : selectedFileManagerKeys.add(record.key));
      renderFileManager(true, activeFileManagerFilter);
    });
    const downloadSelected = document.createElement('button');
    downloadSelected.type = 'button';
    downloadSelected.textContent = 'Download selected';
    downloadSelected.disabled = !selectedVisible.length;
    downloadSelected.addEventListener('click', () => downloadRecords(selectedVisible));
    const deleteSelected = document.createElement('button');
    deleteSelected.type = 'button';
    deleteSelected.textContent = 'Delete selected';
    deleteSelected.disabled = !selectedVisible.length;
    deleteSelected.addEventListener('click', () => removeFileRecords(selectedVisible));
    const downloadAll = document.createElement('button');
    downloadAll.type = 'button';
    downloadAll.textContent = 'Download all';
    downloadAll.addEventListener('click', () => downloadRecords(visible));
    const clearFiles = document.createElement('button');
    clearFiles.type = 'button';
    clearFiles.textContent = 'Clear files';
    clearFiles.disabled = !allFiles.length;
    clearFiles.addEventListener('click', clearAllFilesInCurrentChat);
    const close = document.createElement('button');
    close.type = 'button';
    close.textContent = 'Close';
    close.addEventListener('click', closeFileManager);
    headActions.append(selectedCounter, selectVisible, downloadSelected, deleteSelected, downloadAll, clearFiles, close);
    head.append(copy, headActions);
    panel.appendChild(head);

    const tabs = document.createElement('div');
    tabs.className = 'file-manager-tabs';
    const tabData = [
      ['all', 'All', allFiles.length],
      ['sent', 'Sent', allFiles.filter((r) => r.role === 'sent').length],
      ['received', 'Received', allFiles.filter((r) => r.role === 'received').length],
      ['generated', 'Generated', allFiles.filter((r) => r.generated).length]
    ];
    tabData.forEach(([id, label, amount]) => {
      const tab = document.createElement('button');
      tab.type = 'button';
      tab.className = id === activeFileManagerFilter ? 'active' : '';
      tab.innerHTML = `${label} <span>${amount}</span>`;
      tab.addEventListener('click', () => renderFileManager(true, id));
      tabs.appendChild(tab);
    });
    panel.appendChild(tabs);

    if (!visible.length) {
      const empty = document.createElement('div');
      empty.className = 'file-manager-empty';
      empty.textContent = 'No files in this section yet.';
      panel.appendChild(empty);
      if (open) panel.hidden = false;
      return;
    }

    const grid = document.createElement('div');
    grid.className = 'file-manager-grid';
    visible.forEach((record) => {
      const attachment = record.attachment;
      const card = document.createElement('article');
      card.className = `file-manager-card ${attachment.kind || 'file'} ${record.role}${record.generated ? ' generated' : ''}`;
      card.classList.toggle('selected', selectedFileManagerKeys.has(record.key));
      const selectLabel = document.createElement('label');
      selectLabel.className = 'file-manager-select';
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = selectedFileManagerKeys.has(record.key);
      checkbox.setAttribute('aria-label', `Select ${attachment.name || 'file'}`);
      checkbox.addEventListener('change', () => {
        if (checkbox.checked) selectedFileManagerKeys.add(record.key);
        else selectedFileManagerKeys.delete(record.key);
        renderFileManager(true, activeFileManagerFilter);
      });
      selectLabel.append(checkbox, document.createElement('span'));
      card.append(selectLabel, createAttachmentPreviewElement(attachment, true));
      const meta = document.createElement('div');
      meta.className = 'file-manager-meta';
      const dateText = record.createdAt ? new Intl.DateTimeFormat('en-US', {hour:'numeric', minute:'2-digit'}).format(new Date(record.createdAt)) : '';
      meta.innerHTML = `<strong></strong><small></small>`;
      meta.querySelector('strong').textContent = attachment.name || 'file';
      meta.querySelector('small').textContent = `${record.role === 'sent' ? 'Sent' : 'Received'} В· ${fileLabel(attachment.kind)} В· ${formatSize(attachment.size)}${dateText ? ` В· ${dateText}` : ''}${record.generated ? ' В· Generated' : ''}`;
      const actions = document.createElement('div');
      actions.className = 'file-manager-actions';
      const source = attachmentSource(attachment);
      if (source) {
        const open = document.createElement('a');
        open.href = source;
        open.target = '_blank';
        open.rel = 'noopener';
        open.textContent = 'Open';
        const download = document.createElement('a');
        download.href = asDirectDownloadUrl(source);
        download.download = attachment.name || 'sabi-ai-file';
        download.textContent = 'Download';
        actions.append(open, download);
      } else {
        const unavailable = document.createElement('button');
        unavailable.type = 'button';
        unavailable.disabled = true;
        unavailable.textContent = 'Download unavailable';
        actions.appendChild(unavailable);
      }
      const deleteFile = document.createElement('button');
      deleteFile.type = 'button';
      deleteFile.textContent = 'Delete file';
      deleteFile.addEventListener('click', () => removeFileRecords([record], { confirmText: 'Delete this file from chat?' }));
      actions.appendChild(deleteFile);
      if (record.generated) {
        const rename = document.createElement('button');
        rename.type = 'button';
        rename.textContent = 'Rename';
        rename.addEventListener('click', () => renameGeneratedAttachment(record.chatId, record.messageId, record.attachmentIndex));
        const save = document.createElement('button');
        save.type = 'button';
        save.textContent = attachment.saved ? 'Saved' : 'Save';
        save.disabled = Boolean(attachment.saved);
        save.addEventListener('click', () => markGeneratedAttachmentSaved(record.chatId, record.messageId, record.attachmentIndex));
        actions.append(rename, save);
      }
      createCompactFileActionsV72(actions);
      card.append(meta, actions);
      grid.appendChild(card);
    });
    panel.appendChild(grid);
    if (open) panel.hidden = false;
  }

  function toggleFileManager() {
    const panel = createFileManagerPanel();
    const nextOpen = panel.hidden;
    closeGeneratedCenter();
    renderFileManager(nextOpen, activeFileManagerFilter);
    panel.hidden = !nextOpen;
  }

  function toggleGeneratedCenter() {
    const panel = createGeneratedCenterPanel();
    const nextOpen = panel.hidden;
    closeFileManager();
    renderGeneratedCenter(nextOpen);
    panel.hidden = !nextOpen;
  }


  function createChatEmptyState(chat) {
    const empty = document.createElement('section');
    empty.className = 'chat-empty-state';
    const title = document.createElement('h3');
    title.textContent = 'How can Sabi AI help today?';
    const subtitle = document.createElement('p');
    subtitle.textContent = 'Send a message, attach up to 20 files, or ask Sabi AI to generate code, documents, images, audio, or video.';
    const hint = document.createElement('div');
    hint.className = 'chat-empty-hint';
    hint.innerHTML = '<span>Drop files here</span><span>20 files max</span><span>Clean answers only</span>';
    const chips = document.createElement('div');
    chips.className = 'chat-empty-chips';
    [
      'Analyze these files and summarize key points',
      'Generate Python code for my task',
      'Create a document from this idea',
      'Prepare image or video generation prompt'
    ].forEach((prompt) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = prompt;
      button.addEventListener('click', () => {
        chatEditor.value = prompt;
        syncChatInputHeight();
        focusChatEditor();
      });
      chips.appendChild(button);
    });
    empty.append(title, subtitle, hint, chips);
    return empty;
  }

  function chatContainsQuery(message, query) {
    const q = String(query || '').trim().toLowerCase();
    if (!q) return false;
    const text = [message.content || '', message.role || '', message.status || ''].join(' ').toLowerCase();
    if (text.includes(q)) return true;
    return hydrateRuntimeAttachments(message).some((file) => [file.name, file.type, file.kind].join(' ').toLowerCase().includes(q));
  }

  function renderSearchPanel(open = false) {
    if (!chatScreen) return;
    let panel = document.getElementById('chatSearchPanel');
    if (!panel) {
      panel = document.createElement('section');
      panel.id = 'chatSearchPanel';
      panel.className = 'chat-search-panel';
      panel.hidden = true;
      panel.setAttribute('aria-label', 'Search in chat');
      chatScreen.appendChild(panel);
    }
    const chat = getCurrentChat();
    const matches = chat && activeChatSearchQuery ? (chat.messages || []).filter((m) => chatContainsQuery(m, activeChatSearchQuery)).length : 0;
    panel.innerHTML = '';
    const input = document.createElement('input');
    input.type = 'search';
    input.placeholder = 'Search messages and files...';
    input.value = activeChatSearchQuery;
    input.addEventListener('input', () => {
      activeChatSearchQuery = input.value.trim();
      renderCurrentChat();
      renderSearchPanel(true);
    });
    const count = document.createElement('span');
    count.textContent = `${matches} match${matches === 1 ? '' : 'es'}`;
    const next = document.createElement('button');
    next.type = 'button';
    next.textContent = 'Next';
    next.disabled = !matches;
    next.addEventListener('click', () => {
      const target = messageList.querySelector('.message-row.search-match');
      target?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
    const close = document.createElement('button');
    close.type = 'button';
    close.textContent = 'Close';
    close.addEventListener('click', () => { panel.hidden = true; activeChatSearchQuery = ''; renderCurrentChat(); });
    panel.append(input, count, next, close);
    panel.hidden = !open;
    if (open) requestAnimationFrame(() => input.focus());
  }

  function toggleChatSearch() {
    const panel = document.getElementById('chatSearchPanel');
    const nextOpen = !panel || panel.hidden;
    renderSearchPanel(nextOpen);
  }

  function downloadBlob(filename, content, type = 'text/plain;charset=utf-8') {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 800);
  }

  function exportCurrentChat() {
    const chat = getCurrentChat();
    if (!chat) return;
    const lines = [];
    lines.push(`Sabi AI Studio chat export`);
    lines.push(`Title: ${chat.title || 'New chat'}`);
    lines.push(`Exported: ${new Date().toLocaleString('en-US')}`);
    lines.push('');
    (chat.messages || []).forEach((message) => {
      const when = message.createdAt ? new Date(message.createdAt).toLocaleString('en-US') : '';
      lines.push(`[${message.role === 'user' ? 'You' : 'Sabi AI'}] ${when}`.trim());
      lines.push(message.content || '');
      const files = hydrateRuntimeAttachments(message);
      if (files.length) lines.push(`Files: ${files.map((f) => f.name || 'file').join(', ')}`);
      lines.push('');
    });
    const safeTitle = (chat.title || 'sabi-ai-chat').replace(/[\\/:*?"<>|]+/g, '-').slice(0, 50) || 'sabi-ai-chat';
    downloadBlob(`${safeTitle}.txt`, lines.join('\n'));
    showToast('Chat exported.');
  }

  async function copyCurrentChat() {
    const chat = getCurrentChat();
    if (!chat) return;
    const text = (chat.messages || []).map((m) => `${m.role === 'user' ? 'You' : 'Sabi AI'}: ${m.content || ''}`).join('\n\n');
    try { await navigator.clipboard.writeText(text); showToast('Chat copied.'); }
    catch (_) { showToast('Copy is not available.'); }
  }

  function regenerateAssistantMessage(chatId, assistantMessageId) {
    const chats = readChats();
    const chat = chats.find((c) => c.id === chatId);
    if (!chat) return;
    const index = (chat.messages || []).findIndex((m) => m.id === assistantMessageId);
    if (index < 0) return;
    let userMessage = null;
    for (let i = index - 1; i >= 0; i -= 1) {
      if (chat.messages[i]?.role === 'user') { userMessage = chat.messages[i]; break; }
    }
    if (!userMessage) { showToast('No previous user message to regenerate.'); return; }
    chat.messages = chat.messages.filter((m) => m.id !== assistantMessageId);
    userMessage.status = 'sending';
    chat.updatedAt = new Date().toISOString();
    writeChats(chats);
    renderCurrentChat();
    runBackendForMessage(chatId, userMessage.id, userMessage.content || '', hydrateRuntimeAttachments(userMessage));
  }

  function updateComposerStats() {
    let stats = document.getElementById('chatComposerStats');
    if (!stats && chatComposer) {
      stats = document.createElement('div');
      stats.id = 'chatComposerStats';
      stats.className = 'chat-composer-stats';
      chatComposer.appendChild(stats);
    }
    if (!stats) return;
    const words = getEditorText(chatEditor).split(/\s+/).filter(Boolean).length;
    const files = selectedAttachments.length;
    stats.textContent = `${files}/${MAX_ATTACHMENTS} files В· ${words} words В· Enter to send В· Shift+Enter for new line`;
  }

  async function retryPendingMessages() {
    const chat = getCurrentChat();
    if (!chat) return;
    const pending = (chat.messages || []).filter((message) => message.role === 'user' && ['pending','saved'].includes(message.status));
    if (!pending.length) { showToast('No pending messages to retry.'); return; }
    showToast(`Retrying ${pending.length} pending message(s).`);
    for (const message of pending) {
      const payload = failedPayloads.get(message.id);
      const prompt = payload?.prompt || message.content || '';
      const attachments = payload?.attachments || hydrateRuntimeAttachments(message);
      updateMessageMeta(chat.id, message.id, { status: 'sending' });
      await runBackendForMessage(chat.id, message.id, prompt, attachments);
    }
  }

  function ensureChatHeaderActions() {
    if (!chatScreen || document.getElementById('chatHeaderActions')) return;
    const header = chatScreen.querySelector('.chat-header');
    if (!header) return;
    const actions = document.createElement('div');
    actions.id = 'chatHeaderActions';
    actions.className = 'chat-header-actions';
    const allFilesButton = document.createElement('button');
    allFilesButton.type = 'button';
    allFilesButton.className = 'chat-files-toggle';
    allFilesButton.innerHTML = 'Files <span id="fileManagerCount">0</span>';
    allFilesButton.addEventListener('click', toggleFileManager);
    actions.appendChild(allFilesButton);
    const filesButton = document.createElement('button');
    filesButton.type = 'button';
    filesButton.className = 'generated-files-toggle';
    filesButton.innerHTML = 'Generated <span id="generatedFilesCount">0</span>';
    filesButton.addEventListener('click', toggleGeneratedCenter);
    actions.appendChild(filesButton);
    const items = [
      ['Search', toggleChatSearch],
      ['Retry pending', retryPendingMessages, 'retryPendingAction'],
      ['Export', exportCurrentChat],
      ['Copy', copyCurrentChat],
      ['Select', () => toggleMessageSelectionMode(), 'selectMessagesAction'],
      ['Pin', () => currentChatId && toggleChatPin(currentChatId), 'pinChatAction'],
      ['Rename', renameCurrentChat],
      ['Clear', clearCurrentChat],
      ['Delete', deleteCurrentChat]
    ];
    items.forEach(([label, handler, id]) => {
      const button = document.createElement('button');
      button.type = 'button';
      if (id) button.id = id;
      button.textContent = label;
      button.addEventListener('click', handler);
      actions.appendChild(button);
    });
    updatePinActionLabel();
    header.appendChild(actions);
  }

  function setActiveNav(button) {
    document.querySelectorAll('.nav-btn').forEach((b) => b.classList.toggle('active', b === button));
  }

  function setMode(mode) {
    app.dataset.mode = mode;
    document.querySelectorAll('.mode').forEach((button) => {
      const active = button.dataset.mode === mode;
      button.classList.toggle('active', active);
      button.setAttribute('aria-selected', String(active));
    });
  }

  function hideSidebar() {
    app.classList.add('sidebar-hidden');
    app.dataset.sidebar = 'hidden';
    hideSidebarButton.setAttribute('aria-expanded','false');
  }

  function showSidebar() {
    app.classList.remove('sidebar-hidden');
    app.dataset.sidebar = 'open';
    hideSidebarButton.setAttribute('aria-expanded','true');
  }

  function switchToMain() {
    fileTarget = 'main';
    renderAttachmentTray();
    messageSelectionMode = false;
    selectedMessageIds.clear();
    closeGeneratedCenter();
    closeFileManager();
    ensureMobileChatBottomButton()?.classList.remove('visible');
    app.classList.remove('view-chat');
    mainCenter.hidden = false;
    chatScreen.hidden = true;
    currentChatId = null;
    setActiveNav(newChatButton);
    focusMainEditor();
  }

  function switchToChat(chatId) {
    fileTarget = 'chat';
    renderAttachmentTray();
    if (currentChatId !== chatId) {
      messageSelectionMode = false;
      selectedMessageIds.clear();
    }
    currentChatId = chatId;
    app.classList.add('view-chat');
    mainCenter.hidden = true;
    chatScreen.hidden = false;
    if (isMobileViewport()) hideSidebar();
    setActiveNav(null);
    ensureChatHeaderActions();
    ensureMobileChatBottomButton();
    renderCurrentChat();
    requestAnimationFrame(() => {
      messageList.scrollTop = messageList.scrollHeight;
      syncChatInputHeight(true);
      restoreDraftForCurrentChat();
      focusChatEditor();
      updateMobileChatBottomButton();
    });
  }

  function makeTitle(text) {
    const clean = (text || 'New chat').replace(/\s+/g, ' ').trim();
    return clean.length > 40 ? `${clean.slice(0, 40)}…` : clean;
  }

  function createChat(firstText) {
    const chat = {
      id: `chat-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      title: makeTitle(firstText),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      pinned: false,
      messages: []
    };
    const chats = readChats();
    chats.unshift(chat);
    writeChats(chats);
    return chat.id;
  }

  function addMessage(chatId, role, content, meta = {}) {
    const chats = readChats();
    const idx = chats.findIndex((c) => c.id === chatId);
    if (idx < 0) return null;
    const message = {
      id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      role,
      content,
      createdAt: new Date().toISOString(),
      mode: app.dataset.mode || 'Auto',
      ...meta,
      files: (meta.attachments || selectedAttachments).map((file) => ({ name: file.name, size: file.size, type: file.type, kind: file.kind || fileKind(file) })),
      attachments: normalizeMessageAttachments(meta.attachments || selectedAttachments)
    };
    rememberRuntimeAttachments(message.id, meta.runtimeAttachments || meta.attachments || selectedAttachments);
    chats[idx].messages.push(message);
    chats[idx].updatedAt = new Date().toISOString();
    if (!chats[idx].title || chats[idx].title === 'New chat') chats[idx].title = makeTitle(content);
    const [chat] = chats.splice(idx, 1);
    chats.unshift(chat);
    writeChats(chats);
    return message;
  }

  function updateMessage(chatId, messageId, content) {
    const chats = readChats();
    const chat = chats.find((c) => c.id === chatId);
    if (!chat) return;
    const message = chat.messages.find((m) => m.id === messageId);
    if (!message) return;
    message.content = content;
    message.updatedAt = new Date().toISOString();
    chat.updatedAt = new Date().toISOString();
    writeChats(chats);
    renderCurrentChat();
  }

  function getCurrentChat() {
    return readChats().find((c) => c.id === currentChatId) || null;
  }

  function ensureRecentSearch() {
    if (!recentChats || document.getElementById('recentChatSearch')) return;
    const input = document.createElement('input');
    input.id = 'recentChatSearch';
    input.className = 'recent-search';
    input.type = 'search';
    input.placeholder = 'Search chats';
    input.autocomplete = 'off';
    input.addEventListener('input', () => {
      recentChatQuery = input.value.trim().toLowerCase();
      renderRecentChats();
      requestAnimationFrame(() => {
        const next = document.getElementById('recentChatSearch');
        if (next) { next.value = input.value; next.focus(); }
      });
    });
    const title = recentChats.querySelector('.recent-title');
    title?.after(input);
  }

  function recentChatMatches(chat, query) {
    if (!query) return true;
    const haystack = [
      chat.title || '',
      ...(chat.messages || []).slice(-8).map((m) => `${m.content || ''} ${(m.attachments || []).map((a) => a.name || '').join(' ')}`)
    ].join(' ').toLowerCase();
    return haystack.includes(query);
  }

  function sortRecentChats(chats) {
    return [...chats].sort((a, b) => {
      if (Boolean(a.pinned) !== Boolean(b.pinned)) return a.pinned ? -1 : 1;
      return new Date(b.updatedAt || b.createdAt || 0) - new Date(a.updatedAt || a.createdAt || 0);
    });
  }

  function updatePinActionLabel() {
    const button = document.getElementById('pinChatAction');
    if (button) {
      const chat = getCurrentChat();
      button.textContent = chat?.pinned ? 'Unpin' : 'Pin';
      button.classList.toggle('active', Boolean(chat?.pinned));
    }
    updateSelectMessagesLabel();
  }

  function toggleChatPin(chatId) {
    const chats = readChats();
    const chat = chats.find((item) => item.id === chatId);
    if (!chat) return;
    chat.pinned = !chat.pinned;
    chat.updatedAt = new Date().toISOString();
    writeChats(chats);
    updatePinActionLabel();
    showToast(chat.pinned ? 'Chat pinned.' : 'Chat unpinned.');
  }

  function deleteRecentChat(chatId) {
    const chat = readChats().find((item) => item.id === chatId);
    if (!chat) return;
    if (!window.confirm(`Delete chat "${chat.title || 'New chat'}"?`)) return;
    const removed = { ...chat, messages: (chat.messages || []).map((m) => ({ ...m, attachments: normalizeMessageAttachments(m.attachments || []) })) };
    const chats = readChats().filter((item) => item.id !== chatId);
    writeChats(chats);
    if (currentChatId === chatId) {
      currentChatId = chats[0]?.id || null;
      if (currentChatId) switchToChat(currentChatId);
      else switchToMain();
    } else {
      renderRecentChats();
    }
    showUndo('Chat deleted.', () => {
      const nextChats = readChats();
      if (!nextChats.some((item) => item.id === removed.id)) nextChats.unshift(removed);
      writeChats(nextChats);
      switchToChat(removed.id);
    });
  }

  function renderRecentChats() {
    const chats = readChats();
    recentChats.hidden = chats.length === 0;
    recentChatList.innerHTML = '';
    if (!chats.length) return;
    ensureRecentSearch();
    const search = document.getElementById('recentChatSearch');
    if (search && search.value !== recentChatQuery) search.value = recentChatQuery;
    const visibleChats = sortRecentChats(chats).filter((chat) => recentChatMatches(chat, recentChatQuery)).slice(0, 14);
    if (!visibleChats.length) {
      const empty = document.createElement('div');
      empty.className = 'recent-empty';
      empty.textContent = 'No chats found';
      recentChatList.appendChild(empty);
      return;
    }
    visibleChats.forEach((chat) => {
      const row = document.createElement('div');
      row.className = `recent-row${chat.id === currentChatId ? ' active' : ''}${chat.pinned ? ' pinned' : ''}`;
      const button = document.createElement('button');
      button.className = 'recent-item';
      button.type = 'button';
      const pinMark = document.createElement('span');
      pinMark.className = 'recent-pin-mark';
      pinMark.textContent = chat.pinned ? 'Pinned' : '';
      const text = document.createElement('span');
      text.textContent = chat.title || 'New chat';
      button.append(pinMark, text);
      button.addEventListener('click', () => switchToChat(chat.id));
      const actions = document.createElement('div');
      actions.className = 'recent-actions';
      const pin = document.createElement('button');
      pin.type = 'button';
      pin.title = chat.pinned ? 'Unpin chat' : 'Pin chat';
      pin.textContent = chat.pinned ? 'в…' : 'в†';
      pin.addEventListener('click', (event) => { event.stopPropagation(); toggleChatPin(chat.id); });
      const remove = document.createElement('button');
      remove.type = 'button';
      remove.title = 'Delete chat';
      remove.textContent = 'Г—';
      remove.addEventListener('click', (event) => { event.stopPropagation(); deleteRecentChat(chat.id); });
      actions.append(pin, remove);
      row.append(button, actions);
      recentChatList.appendChild(row);
    });
  }

  function messageTools(message, chatId) {
    const tools = document.createElement('div');
    tools.className = 'msg-tools';
    const copy = document.createElement('button');
    copy.className = 'msg-tool';
    copy.type = 'button';
    copy.title = 'Copy';
    copy.textContent = 'в§‰';
    copy.addEventListener('click', async () => {
      try { await navigator.clipboard.writeText(message.content || ''); showToast('Copied.'); }
      catch (_) { showToast('Copy is not available.'); }
    });
    tools.appendChild(copy);
    if (message.role === 'user') {
      const edit = document.createElement('button');
      edit.className = 'msg-tool';
      edit.type = 'button';
      edit.title = 'Edit';
      edit.textContent = 'вњЋ';
      edit.addEventListener('click', () => {
        const next = window.prompt('Edit message', message.content || '');
        if (next !== null) updateMessage(chatId, message.id, next.trim());
      });
      tools.appendChild(edit);
      if (message.status === 'pending' || message.status === 'saved' || message.status === 'failed' || message.status === 'cancelled') {
        const retry = document.createElement('button');
        retry.className = 'msg-tool wide';
        retry.type = 'button';
        retry.title = 'Retry';
        retry.textContent = 'Retry';
        retry.addEventListener('click', () => retryMessage(chatId, message.id));
        tools.appendChild(retry);
      }
    } else {
      const copyTool = document.createElement('button');
      copyTool.className = 'msg-tool icon-only copy-tool';
      copyTool.type = 'button';
      copyTool.title = 'Copy';
      copyTool.setAttribute('aria-label', 'Copy');
      copyTool.textContent = 'Copy';
      copyTool.addEventListener('click', async () => {
        const text = String(message.content || message.text || '');
        try {
          await navigator.clipboard.writeText(text);
          showToast('Copied.');
        } catch (_) {
          showToast('Copy failed.');
        }
      });

      const editTool = document.createElement('button');
      editTool.className = 'msg-tool icon-only edit-tool';
      editTool.type = 'button';
      editTool.title = 'Edit';
      editTool.setAttribute('aria-label', 'Edit');
      editTool.textContent = 'Edit';
      editTool.addEventListener('click', () => {
        const editor = document.querySelector('#messageInput, #promptInput, textarea, [contenteditable="true"]');
        const text = String(message.content || message.text || '');
        if (!editor) { showToast('Editor is not available.'); return; }
        if (editor.isContentEditable) {
          editor.textContent = text;
        } else {
          editor.value = text;
        }
        editor.dispatchEvent(new Event('input', { bubbles: true }));
        editor.focus();
      });

      tools.append(copyTool, editTool);
      if (message.status === 'streaming') {
        const stop = document.createElement('button');
        stop.className = 'msg-tool wide';
        stop.type = 'button';
        stop.title = 'Stop response';
        stop.textContent = 'Stop';
        stop.addEventListener('click', () => stopStreamingMessage(chatId, message.id));
        tools.appendChild(stop);
      }
      ['рџ‘Ќ','рџ‘Ћ'].forEach((symbol) => {
        const b = document.createElement('button');
        b.className = 'msg-tool';
        b.type = 'button';
        b.textContent = symbol;
        b.addEventListener('click', () => showToast('Feedback saved.'));
        tools.appendChild(b);
      });
    }
    const remove = document.createElement('button');
    remove.className = 'msg-tool';
    remove.type = 'button';
    remove.title = 'Delete';
    remove.textContent = 'Г—';
    remove.addEventListener('click', () => deleteMessage(chatId, message.id));
    tools.appendChild(remove);
    return tools;
  }


  function currentSelectedMessages(chat = getCurrentChat()) {
    if (!chat) return [];
    return (chat.messages || []).filter((message) => selectedMessageIds.has(message.id));
  }

  function updateSelectMessagesLabel() {
    const button = document.getElementById('selectMessagesAction');
    if (!button) return;
    const count = selectedMessageIds.size;
    button.textContent = messageSelectionMode ? (count ? `Selected ${count}` : 'Done') : 'Select';
    button.classList.toggle('active', messageSelectionMode);
  }

  function toggleMessageSelectionMode(force) {
    messageSelectionMode = typeof force === 'boolean' ? force : !messageSelectionMode;
    if (!messageSelectionMode) selectedMessageIds.clear();
    renderCurrentChat();
  }

  async function copySelectedMessages() {
    const chat = getCurrentChat();
    const selected = currentSelectedMessages(chat);
    if (!selected.length) { showToast('No messages selected.'); return; }
    const text = selected.map((message) => {
      const who = message.role === 'user' ? 'You' : 'Sabi AI';
      const body = String(message.content || '').trim();
      const files = normalizeMessageAttachments(message.attachments || []).map((file) => `- ${file.name || 'file'} (${fileLabel(file.kind || fileKind(file))})`).join('\n');
      return `${who}: ${body}${files ? `\nFiles:\n${files}` : ''}`;
    }).join('\n\n');
    try { await navigator.clipboard.writeText(text); showToast(`${selected.length} message(s) copied.`); }
    catch (_) { showToast('Copy is not available.'); }
  }

  function deleteSelectedMessages() {
    const chat = getCurrentChat();
    const selected = currentSelectedMessages(chat);
    if (!chat || !selected.length) { showToast('No messages selected.'); return; }
    if (!window.confirm(`Delete ${selected.length} selected message(s)?`)) return;
    const previousMessages = (chat.messages || []).map((message) => ({ ...message, attachments: normalizeMessageAttachments(message.attachments || []) }));
    const ids = new Set(selected.map((message) => message.id));
    const chats = readChats();
    const item = chats.find((candidate) => candidate.id === chat.id);
    if (!item) return;
    item.messages = (item.messages || []).filter((message) => !ids.has(message.id));
    item.updatedAt = new Date().toISOString();
    ids.forEach((id) => runtimeAttachmentSources.delete(id));
    selectedMessageIds.clear();
    messageSelectionMode = false;
    writeChats(chats);
    renderCurrentChat();
    showUndo('Selected messages deleted.', () => {
      const nextChats = readChats();
      const next = nextChats.find((candidate) => candidate.id === chat.id);
      if (!next) return;
      next.messages = previousMessages;
      next.updatedAt = new Date().toISOString();
      writeChats(nextChats);
      if (currentChatId === chat.id) renderCurrentChat();
    });
  }

  function renderMessageSelectionBar() {
    if (!messageSelectionMode) return null;
    const bar = document.createElement('div');
    bar.className = 'message-selection-bar';
    const count = document.createElement('strong');
    count.textContent = `${selectedMessageIds.size} selected`;
    const all = document.createElement('button');
    all.type = 'button';
    all.textContent = 'Select all';
    all.addEventListener('click', () => {
      const chat = getCurrentChat();
      (chat?.messages || []).forEach((message) => selectedMessageIds.add(message.id));
      renderCurrentChat();
    });
    const copy = document.createElement('button');
    copy.type = 'button';
    copy.textContent = 'Copy selected';
    copy.disabled = selectedMessageIds.size === 0;
    copy.addEventListener('click', copySelectedMessages);
    const remove = document.createElement('button');
    remove.type = 'button';
    remove.textContent = 'Delete selected';
    remove.disabled = selectedMessageIds.size === 0;
    remove.addEventListener('click', deleteSelectedMessages);
    const cancel = document.createElement('button');
    cancel.type = 'button';
    cancel.textContent = 'Cancel';
    cancel.addEventListener('click', () => toggleMessageSelectionMode(false));
    bar.append(count, all, copy, remove, cancel);
    return bar;
  }

  function retryMessage(chatId, messageId) {
    const payload = failedPayloads.get(messageId);
    const chat = readChats().find((c) => c.id === chatId);
    const message = chat?.messages?.find((m) => m.id === messageId);
    if (!message) return;
    updateMessageMeta(chatId, messageId, { status: 'sending' });
    const attachments = payload?.attachments || hydrateRuntimeAttachments(message);
    runBackendForMessage(chatId, messageId, message.content || '', attachments);
  }

  function renderCurrentChat() {
    const chat = getCurrentChat();
    if (!chat) { switchToMain(); return; }
    chatTitle.textContent = chat.title || 'New chat';
    updatePinActionLabel();
    messageList.innerHTML = '';
    const selectionBar = renderMessageSelectionBar();
    if (selectionBar) messageList.appendChild(selectionBar);
    if (!chat.messages.length) {
      messageList.appendChild(createChatEmptyState(chat));
    }
    chat.messages.forEach((message) => {
      const row = document.createElement('div');
      row.className = `message-row ${message.role}`;
      if (messageSelectionMode) row.classList.add('selecting');
      if (selectedMessageIds.has(message.id)) row.classList.add('selected');
      if (activeChatSearchQuery && chatContainsQuery(message, activeChatSearchQuery)) row.classList.add('search-match');
      if (messageSelectionMode) {
        const pick = document.createElement('label');
        pick.className = 'message-select-pill';
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = selectedMessageIds.has(message.id);
        checkbox.addEventListener('change', () => {
          if (checkbox.checked) selectedMessageIds.add(message.id);
          else selectedMessageIds.delete(message.id);
          renderCurrentChat();
        });
        const dot = document.createElement('span');
        dot.textContent = checkbox.checked ? 'вњ“' : '';
        pick.append(checkbox, dot);
        row.appendChild(pick);
      }
      if (message.role === 'assistant') {
        const avatar = document.createElement('div');
        avatar.className = 'msg-avatar';
        avatar.textContent = 'S';
        row.appendChild(avatar);
      }
      const card = document.createElement('article');
      card.className = 'msg-card';
      const head = document.createElement('div');
      head.className = 'msg-head';
      const role = document.createElement('span');
      role.className = 'msg-role';
      role.textContent = message.role === 'user' ? 'You' : 'Sabi AI';
      const time = document.createElement('span');
      time.className = 'msg-time';
      time.textContent = message.createdAt ? new Intl.DateTimeFormat('en-US', {hour:'numeric', minute:'2-digit'}).format(new Date(message.createdAt)) : nowTime();
      head.append(role, time);
      const body = document.createElement('div');
      body.className = 'msg-text';
      renderRichText(body, message.content || '', { ...message, attachments: hydrateRuntimeAttachments(message) });
      if (message.status) {
        const statusText = friendlyStatusText(message.status);
        if (statusText) {
          const status = document.createElement('div');
          status.className = `msg-status ${message.status}`;
          status.textContent = statusText;
          body.appendChild(status);
        }
      }
      card.append(head, body, messageTools(message, chat.id));
      row.appendChild(card);
      messageList.appendChild(row);
    });
    renderFileManager(false);
    renderGeneratedCenter(false);
    if (document.getElementById('chatSearchPanel') && !document.getElementById('chatSearchPanel').hidden) renderSearchPanel(true);
    renderRecentChats();
  }

  function buildSabiRequestPayload(prompt, attachments = []) {
    const safeAttachments = Array.from(attachments || []).slice(0, MAX_ATTACHMENTS);
    const metadata = safeAttachments.map((item, index) => ({
      index,
      name: item.name || item.file?.name || `file-${index + 1}`,
      type: item.type || item.file?.type || 'application/octet-stream',
      size: item.size || item.file?.size || 0,
      kind: item.kind || fileKind(item.file || item)
    }));
    const totalBytes = metadata.reduce((sum, item) => sum + (Number(item.size) || 0), 0);
    const id = requestId();
    const text = String(prompt || '');
    return {
      prompt: text,
      message: text,
      text,
      content: text,
      input: text,
      mode: app.dataset.mode || 'Auto',
      chatId: currentChatId || '',
      source: app.classList.contains('view-chat') ? 'sabi-ai-studio-chat' : 'sabi-ai-studio-main',
      provider: 'gemini',
      engine: 'gemini',
      modelProvider: 'gemini',
      client: 'sabi-ai-studio',
      requestId: id,
      request_id: id,
      requestFeatures: { streaming: true, files: true, images: true, video: true, audio: true, documents: true, code: true },
      outputHints: ['text','code','image','video','audio','document','presentation','spreadsheet','zip'],
      files: metadata,
      attachments: metadata,
      fileMetadata: metadata,
      fileCount: metadata.length,
      attachmentsCount: metadata.length,
      totalBytes,
      batchSummary: attachmentBatchSummary(safeAttachments),
      conversation: currentConversationPayload()
    };
  }

  function appendSabiFormData(formData, payload) {
    const scalarKeys = ['prompt','message','text','content','input','mode','chatId','source','provider','engine','modelProvider','client','requestId','request_id','fileCount','attachmentsCount','totalBytes'];
    scalarKeys.forEach((key) => formData.append(key, String(payload[key] ?? '')));
    formData.append('requestFeatures', JSON.stringify(payload.requestFeatures || {}));
    formData.append('featuresJson', JSON.stringify(payload.requestFeatures || {}));
    formData.append('outputHints', JSON.stringify(payload.outputHints || []));
    formData.append('metadata', JSON.stringify(payload.files || []));
    formData.append('metadataJson', JSON.stringify(payload.files || []));
    formData.append('filesMetadata', JSON.stringify(payload.files || []));
    formData.append('filesJson', JSON.stringify(payload.files || []));
    formData.append('attachmentsJson', JSON.stringify(payload.attachments || []));
    formData.append('batchSummary', JSON.stringify(payload.batchSummary || {}));
    formData.append('conversation', JSON.stringify(payload.conversation || []));
    formData.append('conversationJson', JSON.stringify(payload.conversation || []));
  }

  function requestRoute(route, prompt, attachments = [], signal) {
    const safeAttachments = Array.from(attachments || []).slice(0, MAX_ATTACHMENTS);
    const realFiles = safeAttachments.filter((item) => item.file instanceof File);
    const payload = buildSabiRequestPayload(prompt, safeAttachments);
    if (realFiles.length) {
      return new Promise((resolve) => {
        const xhr = new XMLHttpRequest();
        const formData = new FormData();
        appendSabiFormData(formData, payload);
        realFiles.forEach((item, index) => {
          const filename = item.name || item.file.name || `file-${index + 1}`;
          formData.append('files', item.file, filename);
          formData.append('file', item.file, filename);
          formData.append(`files_${index}`, item.file, filename);
          formData.append(`fileName_${index}`, filename);
          formData.append(`fileType_${index}`, item.type || item.file.type || 'application/octet-stream');
          formData.append(`fileSize_${index}`, String(item.size || item.file.size || 0));
          formData.append(`fileKind_${index}`, item.kind || fileKind(item.file));
        });
        xhr.open('POST', route, true);
        xhr.timeout = requestTimeoutMs(safeAttachments);
        try {
          xhr.setRequestHeader('X-Sabi-Client', 'sabi-ai-studio');
          xhr.setRequestHeader('X-Sabi-Provider', 'gemini');
          xhr.setRequestHeader('X-Request-Id', payload.requestId);
        } catch (_) {}
        xhr.upload.onprogress = (event) => {
          const percent = event.lengthComputable ? (event.loaded / event.total) * 100 : 0;
          showTransferPanel({ status: 'Uploading files', detail: `${realFiles.length} file(s) attached`, percent, fileCount: realFiles.length, cancellable: true });
        };
        xhr.onload = async () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            let data = {};
            const text = xhr.responseText || '';
            try { data = JSON.parse(text || '{}'); }
            catch (_) { data = text ? { text, message: text } : {}; }
            resolve({ ok: true, data });
          } else {
            resolve({ ok: false, status: xhr.status });
          }
        };
        xhr.onerror = () => resolve({ ok: false, status: 0 });
        xhr.ontimeout = () => resolve({ ok: false, timeout: true, status: 0 });
        xhr.onabort = () => resolve({ ok: false, aborted: true });
        signal?.addEventListener('abort', () => xhr.abort(), { once: true });
        xhr.send(formData);
      });
    }
    showTransferPanel({ status: 'Connecting to Sabi AI', detail: 'Sending message', percent: 20, cancellable: true });
    return fetchWithTimeout(route, {
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'Accept':'application/json, text/event-stream, application/x-ndjson, text/plain',
        'X-Sabi-Client':'sabi-ai-studio',
        'X-Sabi-Provider':'gemini',
        'X-Request-Id':payload.requestId
      },
      body: JSON.stringify(payload)
    }, signal, requestTimeoutMs(safeAttachments))
      .then(async (response) => {
        if (!response.ok) return { ok: false, status: response.status };
        const data = await readBackendResponse(response);
        return { ok: true, data };
      })
      .catch((error) => ({ ok: false, aborted: error?.name === 'AbortError', timeout: error?.name === 'AbortError', status: 0 }));
  }

  async function connectBackend(chatId, prompt, attachments = []) {
    const controller = new AbortController();
    activeRequest = controller;
    setConnectionState('processing');
    const fileCount = attachments.filter((item) => item.file instanceof File).length;
    for (const route of configuredBackendRoutes()) {
      if (controller.signal.aborted) return { ok: false, aborted: true };
      try {
        showTransferPanel({ status: fileCount ? 'Preparing upload' : 'Connecting to Sabi AI', detail: fileCount ? `${fileCount} file(s)` : 'Message request', percent: fileCount ? 5 : 20, fileCount, cancellable: true });
        const result = await requestRoute(route, prompt, attachments, controller.signal);
        if (result.aborted) return { ok: false, aborted: true };
        if (result.timeout) return { ok: false, timeout: true };
        if (result.ok) {
          showTransferPanel({ status: 'Processing response', detail: 'Sabi AI is preparing the result', percent: 95, fileCount, cancellable: true });
          activeRequest = null;
          setConnectionState('connected', route);
          return result;
        }
      } catch (_) {}
    }
    activeRequest = null;
    setConnectionState('pending');
    return { ok: false };
  }

  async function runBackendForMessage(chatId, userMessageId, content, attachmentsForBackend = []) {
    showToast('Connecting Sabi AI...');
    const result = await connectBackend(chatId, content, attachmentsForBackend);
    if (result.ok) {
      const data = result.data || {};
      const answer = extractBackendAnswer(data);
      const attachments = normalizeBackendAttachments(data);
      updateMessageMeta(chatId, userMessageId, { status: 'sent' });
      failedPayloads.delete(userMessageId);
      if (answer || attachments.length) {
        const assistantMessage = addMessage(chatId, 'assistant', answer ? '' : 'Generated file is ready.', {
          attachments,
          runtimeAttachments: attachments,
          generated: true,
          status: answer ? 'streaming' : 'sent'
        });
        if (assistantMessage && answer) await streamAssistantMessage(chatId, assistantMessage.id, answer);
      }
      renderCurrentChat();
      showTransferPanel({ status: 'Completed', detail: 'Response received', percent: 100 });
      hideTransferPanel(900);
      showToast('Sent to Sabi AI.');
      return true;
    }
    const status = result.aborted ? 'saved' : 'pending';
    updateMessageMeta(chatId, userMessageId, { status });
    failedPayloads.set(userMessageId, { chatId, prompt: content, attachments: attachmentsForBackend });
    const waitingDetail = result.timeout ? 'Sabi AI is taking longer than usual. Your message is saved.' : 'Your message is saved. Retry when Sabi AI is ready.';
    showTransferPanel({ status: result.aborted ? 'Saved locally' : result.timeout ? 'Still working' : 'Waiting for Sabi AI connection', detail: result.aborted ? 'Request stopped. Your message is saved.' : waitingDetail, percent: 0 });
    hideTransferPanel(1300);
    showToast(result.aborted ? 'Message saved locally.' : result.timeout ? 'Message saved. Sabi AI is taking longer than usual.' : 'Message saved. Sabi AI connection is pending.');
    return false;
  }

  async function sendText(fromNode, explicitChatId = null) {
    const prompt = getEditorText(fromNode);
    if (!prompt && selectedAttachments.length === 0) {
      fromNode.animate([{transform:'translateY(0)'},{transform:'translateY(-2px)'},{transform:'translateY(0)'}], {duration:180,easing:'ease-out'});
      fromNode.focus();
      return;
    }
    if (selectedAttachments.length > MAX_ATTACHMENTS) {
      showToast(`Maximum ${MAX_ATTACHMENTS} files per message.`);
      return;
    }
    const content = prompt || `Attached ${selectedAttachments.length} file(s)`;
    if (isInstallCommandText(content)) {
      clearEditor(fromNode);
      clearSelectedAttachments();
      showToast('Install command text cleared.');
      return;
    }
    const chatId = explicitChatId || currentChatId || createChat(content);
    const attachmentsForBackend = selectedAttachments.slice();
    const attachmentsForSend = normalizeMessageAttachments(selectedAttachments);
    const userMessage = addMessage(chatId, 'user', content, { attachments: attachmentsForSend, runtimeAttachments: attachmentsForBackend, status: 'sending' });
    clearSelectedAttachments(false);
    clearDraft(fromNode);
    clearEditor(fromNode);
    switchToChat(chatId);
    if (!userMessage) return;
    await runBackendForMessage(chatId, userMessage.id, content, attachmentsForBackend);
  }

  function insertText(node, value) {
    node.focus();
    if ('value' in node) {
      const start = node.selectionStart ?? node.value.length;
      const end = node.selectionEnd ?? node.value.length;
      node.value = node.value.slice(0, start) + value + node.value.slice(end);
      const cursor = start + value.length;
      node.setSelectionRange(cursor, cursor);
      if (node === chatEditor) requestAnimationFrame(() => syncChatInputHeight());
      return;
    }
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) { node.textContent += value; return; }
    const range = selection.getRangeAt(0);
    range.deleteContents();
    range.insertNode(document.createTextNode(value));
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
  }

  function startMic(targetNode, button) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) { showToast('Voice input is not supported in this browser.'); return; }
    if (!recognition) {
      recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.interimResults = false;
      recognition.continuous = false;
      recognition.onresult = (event) => {
        const spoken = Array.from(event.results).map((r) => r[0]?.transcript || '').join(' ').trim();
        if (spoken) {
          insertText(targetNode, (getEditorText(targetNode) ? ' ' : '') + spoken);
          if (targetNode === chatEditor) requestAnimationFrame(() => syncChatInputHeight());
        }
      };
      recognition.onerror = () => showToast('Voice input stopped.');
      recognition.onend = () => { listening = false; micButton.classList.remove('active'); chatMicButton.classList.remove('active'); };
    }
    if (listening) { recognition.stop(); return; }
    listening = true;
    button.classList.add('active');
    recognition.start();
  }

  newChatButton.addEventListener('click', () => {
    currentChatId = null;
    clearEditor(editor);
    clearEditor(chatEditor);
    clearSelectedAttachments();
    setMode('Auto');
    switchToMain();
  });
  brandHomeButton.addEventListener('click', () => switchToMain());
  hideSidebarButton.addEventListener('click', hideSidebar);
  showSidebarButton.addEventListener('click', showSidebar);
  document.querySelector('.stage')?.addEventListener('click', () => {
    if (isMobileViewport() && !app.classList.contains('sidebar-hidden')) hideSidebar();
    toggleConnectionPanel(false);
  });
  chatBackButton.addEventListener('click', switchToMain);
  attachButton.addEventListener('click', () => { fileTarget = 'main'; renderAttachmentTray(); fileInput.multiple = true; fileInput.click(); });
  chatAttachButton.addEventListener('click', () => { fileTarget = 'chat'; renderAttachmentTray(); fileInput.multiple = true; fileInput.click(); });
  micButton.addEventListener('click', () => startMic(editor, micButton));
  chatMicButton.addEventListener('click', () => startMic(chatEditor, chatMicButton));
  fullscreenButton.addEventListener('click', () => document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen?.());
  statusButton.addEventListener('click', () => toggleConnectionPanel());
  setConnectionPanelEvents();
  profileButton.addEventListener('click', () => showToast('Sabi AI owner profile.'));
  projectsButton.addEventListener('click', () => { setActiveNav(projectsButton); showToast('Projects navigation is connected.'); });
  authButton.addEventListener('click', () => { setActiveNav(authButton); showToast('Authorization navigation is connected.'); });
  document.querySelectorAll('.mode').forEach((button) => button.addEventListener('click', () => { setMode(button.dataset.mode); }));
  form.addEventListener('submit', (event) => { event.preventDefault(); fileTarget = 'main'; sendText(editor); });
  chatComposer.addEventListener('submit', (event) => { event.preventDefault(); fileTarget = 'chat'; sendText(chatEditor, currentChatId); });
  editor.addEventListener('keydown', (event) => { if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); fileTarget = 'main'; sendText(editor); } });
  chatEditor.addEventListener('keydown', (event) => { if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); fileTarget = 'chat'; sendText(chatEditor, currentChatId); } });
  editor.addEventListener('input', () => saveDraft(editor));
  chatEditor.addEventListener('input', () => { syncChatInputHeight(); updateComposerStats(); saveDraft(chatEditor); });
  messageList.addEventListener('scroll', updateMobileChatBottomButton, { passive: true });
  window.addEventListener('resize', applyMobileChatLayout);
  window.addEventListener('orientationchange', () => setTimeout(applyMobileChatLayout, 120));
  [editor, chatEditor].forEach((node) => node.addEventListener('paste', (event) => {
    event.preventDefault();
    const value = event.clipboardData?.getData('text/plain') || '';
    insertText(node, value);
    if (node === chatEditor) requestAnimationFrame(() => syncChatInputHeight());
  }));

  ['dragenter','dragover'].forEach((name) => document.addEventListener(name, (event) => {
    event.preventDefault();
    app.classList.add('dragging-file');
  }));
  ['dragleave','drop'].forEach((name) => document.addEventListener(name, (event) => {
    event.preventDefault();
    app.classList.remove('dragging-file');
  }));
  document.addEventListener('drop', async (event) => {
    const files = Array.from(event.dataTransfer?.files || []);
    if (!files.length) return;
    fileTarget = app.classList.contains('view-chat') ? 'chat' : 'main';
    const result = await addFilesToSelected(files);
    renderAttachmentTray();
    const limitText = result.skipped ? ` Maximum ${MAX_ATTACHMENTS}; ${result.skipped} skipped.` : '';
    showToast(`${selectedAttachments.length} / ${MAX_ATTACHMENTS} file(s) attached.${limitText}`);
    (fileTarget === 'chat' ? chatEditor : editor).focus();
  });

  fileInput.addEventListener('change', async () => {
    const files = Array.from(fileInput.files || []);
    if (!files.length) return;
    const result = await addFilesToSelected(files);
    renderAttachmentTray();
    const kinds = Array.from(new Set(selectedAttachments.map((item) => fileLabel(item.kind)))).join(', ');
    const limitText = result.skipped ? ` Maximum ${MAX_ATTACHMENTS}; ${result.skipped} skipped.` : '';
    showToast(`${selectedAttachments.length} / ${MAX_ATTACHMENTS} file(s) attached${kinds ? `: ${kinds}` : ''}.${limitText}`);
    fileInput.value = '';
    (fileTarget === 'chat' ? chatEditor : editor).focus();
  });


  document.addEventListener('keydown', (event) => {
    if (!app.classList.contains('view-chat')) return;
    const mod = event.ctrlKey || event.metaKey;
    if (mod && event.key.toLowerCase() === 'f') { event.preventDefault(); toggleChatSearch(); }
    if (mod && event.key.toLowerCase() === 's') { event.preventDefault(); exportCurrentChat(); }
    if (event.key === 'Escape') { closeGeneratedCenter(); closeFileManager(); const p = document.getElementById('chatSearchPanel'); if (p) p.hidden = true; }
  });

  purgeInstallCommandHistory();
  setConnectionState('pending');
  setTimeout(() => probeConnection(false), 500);
  setMode('Auto');
  renderRecentChats();
  renderAttachmentTray();
  syncChatInputHeight(true);
  updateComposerStats();
  applyMobileChatLayout();
  switchToMain();
})();






/* v61 safe hover actions: message copy/edit + sidebar favorite/delete; no file-card changes */
(function () {
  if (window.__sabiV61SafeHoverActions) return;
  window.__sabiV61SafeHoverActions = true;

  function injectStyle() {
    if (document.querySelector("style[data-sabi-v61]")) return;

    var style = document.createElement("style");
    style.setAttribute("data-sabi-v61", "true");
    style.textContent = `
      /* message tools: hidden until hover, but not deleted */
      .msg-tools {
        opacity: 0 !important;
        pointer-events: none !important;
        transition: opacity .16s ease, transform .16s ease !important;
      }

      .message:hover .msg-tools,
      .chat-message:hover .msg-tools,
      .msg:hover .msg-tools,
      .msg-tools:hover,
      .msg-tools:focus-within {
        opacity: 1 !important;
        pointer-events: auto !important;
      }

      .msg-tool.icon-only {
        width: 24px !important;
        height: 24px !important;
        min-width: 24px !important;
        padding: 0 !important;
        font-size: 0 !important;
        line-height: 0 !important;
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
        border-radius: 9px !important;
      }

      .msg-tool.copy-tool::before {
        content: "◇◇";
        font-size: 12px !important;
        line-height: 1 !important;
        letter-spacing: -4px !important;
        transform: rotate(45deg);
      }

      .msg-tool.edit-tool::before {
        content: "✎";
        font-size: 15px !important;
        line-height: 1 !important;
      }

      /* sidebar recent actions: hidden until row hover */
      .recent-actions {
        opacity: 0 !important;
        pointer-events: none !important;
        transition: opacity .14s ease !important;
      }

      *:hover > .recent-actions,
      .recent-actions:hover,
      .recent-actions:focus-within {
        opacity: 1 !important;
        pointer-events: auto !important;
      }

      .recent-actions button,
      .recent-actions a,
      .recent-actions [role="button"] {
        width: 22px !important;
        height: 22px !important;
        min-width: 22px !important;
        padding: 0 !important;
        font-size: 0 !important;
        line-height: 0 !important;
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
        border-radius: 8px !important;
      }

      .recent-actions button:nth-child(1)::before,
      .recent-actions a:nth-child(1)::before {
        content: "☆";
        font-size: 13px !important;
        line-height: 1 !important;
      }

      .recent-actions button:nth-child(2)::before,
      .recent-actions a:nth-child(2)::before {
        content: "×";
        font-size: 15px !important;
        line-height: 1 !important;
      }

      /* never touch generated file card actions */
      .attachment-actions,
      .media-inline-actions,
      .generated-center-actions,
      .file-manager-actions {
        opacity: 1 !important;
        pointer-events: auto !important;
      }
    `;
    document.head.appendChild(style);
  }

  function fixMojibake() {
    try {
      var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      var node;
      while ((node = walker.nextNode())) {
        if (node.nodeValue && node.nodeValue.indexOf("В·") !== -1) {
          node.nodeValue = node.nodeValue.replace(/В·/g, "·");
        }
      }
    } catch (_) {}
  }

  function start() {
    injectStyle();
    fixMojibake();

    var observer = new MutationObserver(function () {
      injectStyle();
      fixMojibake();
    });

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
      characterData: true
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();

/* v62 chat message tools rebuild only; sidebar stays fixed; file cards untouched */
(function () {
  if (window.__sabiV62ChatMessageToolsRebuild) return;
  window.__sabiV62ChatMessageToolsRebuild = true;

  function injectStyle() {
    if (document.querySelector("style[data-sabi-v62]")) return;

    var style = document.createElement("style");
    style.setAttribute("data-sabi-v62", "true");
    style.textContent = `
      .msg-tools {
        display: inline-flex !important;
        gap: 6px !important;
        align-items: center !important;
        opacity: 0 !important;
        pointer-events: none !important;
        transition: opacity .14s ease !important;
        margin-top: 8px !important;
      }

      .message:hover .msg-tools,
      .chat-message:hover .msg-tools,
      .msg:hover .msg-tools,
      .msg-tools:hover,
      .msg-tools:focus-within {
        opacity: 1 !important;
        pointer-events: auto !important;
      }

      .msg-tools .sabi-v62-tool {
        width: 24px !important;
        height: 24px !important;
        min-width: 24px !important;
        padding: 0 !important;
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
        border-radius: 9px !important;
        font-size: 0 !important;
        line-height: 0 !important;
      }

      .msg-tools .sabi-v62-copy::before {
        content: "◇◇";
        font-size: 12px !important;
        line-height: 1 !important;
        letter-spacing: -4px !important;
        transform: rotate(45deg);
      }

      .msg-tools .sabi-v62-edit::before {
        content: "✎";
        font-size: 15px !important;
        line-height: 1 !important;
      }

      .attachment-actions,
      .media-inline-actions,
      .generated-center-actions,
      .file-manager-actions {
        opacity: 1 !important;
        pointer-events: auto !important;
      }
    `;
    document.head.appendChild(style);
  }

  function getMessageText(tools) {
    var msg = tools.closest(".message,.chat-message,.msg,[data-message-id]");
    if (!msg) return "";

    var clone = msg.cloneNode(true);
    clone.querySelectorAll(".msg-tools,.attachment-actions,.media-inline-actions,.generated-center-actions,.file-manager-actions,button,a,video,audio").forEach(function (el) {
      el.remove();
    });

    return String(clone.innerText || clone.textContent || "").trim();
  }

  function findEditor() {
    return document.querySelector("#messageInput,#promptInput,textarea,[contenteditable='true']");
  }

  function rebuildOne(tools) {
    if (!tools || tools.getAttribute("data-sabi-v62-rebuilt") === "true") return;

    if (
      tools.closest(".attachment-actions") ||
      tools.closest(".media-inline-actions") ||
      tools.closest(".generated-center-actions") ||
      tools.closest(".file-manager-actions")
    ) {
      return;
    }

    tools.innerHTML = "";
    tools.setAttribute("data-sabi-v62-rebuilt", "true");

    var copy = document.createElement("button");
    copy.type = "button";
    copy.className = "msg-tool sabi-v62-tool sabi-v62-copy";
    copy.title = "Copy";
    copy.setAttribute("aria-label", "Copy");
    copy.addEventListener("click", async function (event) {
      event.preventDefault();
      event.stopPropagation();
      var text = getMessageText(tools);
      try {
        await navigator.clipboard.writeText(text);
        if (typeof showToast === "function") showToast("Copied.");
      } catch (_) {
        if (typeof showToast === "function") showToast("Copy failed.");
      }
    });

    var edit = document.createElement("button");
    edit.type = "button";
    edit.className = "msg-tool sabi-v62-tool sabi-v62-edit";
    edit.title = "Edit";
    edit.setAttribute("aria-label", "Edit");
    edit.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();

      var editor = findEditor();
      var text = getMessageText(tools);

      if (!editor) {
        if (typeof showToast === "function") showToast("Editor is not available.");
        return;
      }

      if (editor.isContentEditable) {
        editor.textContent = text;
      } else {
        editor.value = text;
      }

      editor.dispatchEvent(new Event("input", { bubbles: true }));
      editor.focus();
    });

    tools.append(copy, edit);
  }

  function cleanup() {
    injectStyle();
    document.querySelectorAll(".msg-tools,.message-tools").forEach(rebuildOne);
  }

  function start() {
    cleanup();

    var observer = new MutationObserver(function () {
      cleanup();
    });

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true
    });

    var i = 0;
    var timer = window.setInterval(function () {
      cleanup();
      i += 1;
      if (i > 300) window.clearInterval(timer);
    }, 500);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();






/* v73 final file/media background cleanup only; keeps v72 menu; text messages untouched */
(function () {
  if (window.__sabiV73FileBackgroundCleanup) return;
  window.__sabiV73FileBackgroundCleanup = true;

  function injectStyle() {
    if (document.querySelector("style[data-sabi-v73-file-bg]")) return;

    const style = document.createElement("style");
    style.setAttribute("data-sabi-v73-file-bg", "true");
    style.textContent = `
      /* Only messages/cards that contain files/media. Text-only messages are untouched. */
      .message:has(.message-attachments),
      .message:has(.media-inline),
      .chat-message:has(.message-attachments),
      .chat-message:has(.media-inline),
      .msg:has(.message-attachments),
      .msg:has(.media-inline),
      [data-message-id]:has(.message-attachments),
      [data-message-id]:has(.media-inline) {
        background: transparent !important;
        border-color: transparent !important;
        box-shadow: none !important;
      }

      .message:has(.message-attachments) > *,
      .message:has(.media-inline) > *,
      .chat-message:has(.message-attachments) > *,
      .chat-message:has(.media-inline) > *,
      .msg:has(.message-attachments) > *,
      .msg:has(.media-inline) > *,
      [data-message-id]:has(.message-attachments) > *,
      [data-message-id]:has(.media-inline) > * {
        background: transparent !important;
        box-shadow: none !important;
      }

      .message-attachments,
      .attachment-item,
      .media-inline,
      .media-toolbar,
      .media-frame,
      .media-meta-line,
      .attachment-meta,
      .attachment-actions,
      .media-inline-actions,
      .generated-center-card,
      .file-manager-card,
      .generated-center-preview,
      .file-manager-actions,
      .generated-center-actions {
        background: transparent !important;
        background-color: transparent !important;
        box-shadow: none !important;
        backdrop-filter: none !important;
      }

      .message-attachments,
      .attachment-item,
      .media-inline,
      .media-toolbar,
      .attachment-actions,
      .media-inline-actions {
        border: 0 !important;
        outline: 0 !important;
      }

      /* Keep the actual player readable, but remove its surrounding panel. */
      .media-frame video,
      .media-inline video,
      .attachment-item video,
      video {
        background: #000 !important;
      }

      /* Keep one clean v72 menu button visible. */
      .sabi-v72-menu-btn {
        display: inline-flex !important;
        visibility: visible !important;
        opacity: 1 !important;
        pointer-events: auto !important;
      }
    `;

    document.head.appendChild(style);
  }

  function start() {
    injectStyle();

    const observer = new MutationObserver(injectStyle);
    observer.observe(document.documentElement, { childList: true, subtree: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();


/* v78 final web actions: clean Copy/Edit, forced Download, real Save; desktop/mobile web */
(function () {
  if (window.__sabiV78FinalActions) return;
  window.__sabiV78FinalActions = true;

  const SAVED_KEY = "sabi-ai-studio-saved-generated-v25";

  function labelOf(el) {
    return String(
      el?.getAttribute?.("aria-label") ||
      el?.getAttribute?.("title") ||
      el?.innerText ||
      el?.textContent ||
      ""
    ).trim().toLowerCase();
  }

  function matchLabel(el, words) {
    const label = labelOf(el);
    return words.some((w) => label === w || label.includes(w));
  }

  function toast(text) {
    try {
      if (typeof showToast === "function") showToast(text);
      else console.log("[Sabi]", text);
    } catch (_) {}
  }

  function findMessageRoot(el) {
    return (
      el.closest(".msg-card") ||
      el.closest(".message-row") ||
      el.closest(".message") ||
      el.closest(".chat-message") ||
      el.closest(".msg") ||
      el.closest("[data-message-id]") ||
      el.closest("article")
    );
  }

  function cleanupCopiedText(raw) {
    let text = String(raw || "")
      .replace(/\u00a0/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    // Remove sender + time at the beginning: "Sabi AI12:08 PM", "You 12:08 PM"
    text = text.replace(/^(Sabi\s*AI|You|User|Вы|Я)\s*\d{1,2}:\d{2}\s*(AM|PM)?\s*/i, "");

    // Remove time at beginning if left alone.
    text = text.replace(/^\d{1,2}:\d{2}\s*(AM|PM)?\s*/i, "");

    // Remove delivery/status labels at the end.
    text = text.replace(/\s*(Sent|Delivered|Received|Saved|Отправлено|Доставлено|Сохранено)\s*$/i, "");

    // Remove repeated sender/status fragments if UI joined them without spaces.
    text = text.replace(/^(Sabi\s*AI|You|User|Вы|Я)\s*/i, "");
    text = text.replace(/\s*(Sent|Delivered|Received|Saved|Отправлено|Доставлено|Сохранено)\s*$/i, "");

    return text.trim();
  }

  function extractCleanMessageText(button) {
    const root = findMessageRoot(button);
    if (!root) return "";

    // Prefer actual text bubble/content; avoid file cards.
    const content =
      root.querySelector(".msg-text") ||
      root.querySelector(".message-text") ||
      root.querySelector(".message-content") ||
      root;

    const clone = content.cloneNode(true);

    clone.querySelectorAll([
      "button",
      "a",
      "video",
      "audio",
      "source",
      ".message-attachments",
      ".attachment-view",
      ".media-card",
      ".media-inline",
      ".attachment-actions",
      ".media-inline-actions",
      ".generated-center-actions",
      ".file-manager-actions",
      ".msg-tools",
      ".message-tools",
      ".recent-actions",
      "[class*='avatar']",
      "[class*='author']",
      "[class*='sender']",
      "[class*='meta']",
      "[class*='time']",
      "[class*='status']",
      "[data-sabi-v77-saved]"
    ].join(",")).forEach((node) => node.remove());

    return cleanupCopiedText(clone.innerText || clone.textContent || "");
  }

  async function copyCleanText(text) {
    const value = cleanupCopiedText(text);
    if (!value) {
      toast("Nothing to copy.");
      return false;
    }

    try {
      await navigator.clipboard.writeText(value);
      toast("Copied.");
      return true;
    } catch (_) {
      const ta = document.createElement("textarea");
      ta.value = value;
      ta.setAttribute("readonly", "true");
      ta.style.position = "fixed";
      ta.style.left = "-9999px";
      ta.style.top = "0";
      document.body.appendChild(ta);
      ta.focus();
      ta.select();

      let ok = false;
      try { ok = document.execCommand("copy"); } catch (_) {}
      ta.remove();

      toast(ok ? "Copied." : "Copy failed.");
      return ok;
    }
  }

  function findEditor() {
    return (
      document.querySelector("#messageInput") ||
      document.querySelector("#promptInput") ||
      document.querySelector("textarea:not([readonly])") ||
      document.querySelector("[contenteditable='true']")
    );
  }

  function editCleanText(text) {
    const value = cleanupCopiedText(text);
    const editor = findEditor();

    if (!editor || !value) {
      toast("Editor is not available.");
      return false;
    }

    if (editor.isContentEditable) {
      editor.textContent = value;
    } else {
      editor.value = value;
    }

    editor.dispatchEvent(new Event("input", { bubbles: true }));
    editor.dispatchEvent(new Event("change", { bubbles: true }));
    editor.focus();

    toast("Ready to edit.");
    return true;
  }

  function toDirectDownloadUrl(raw) {
    const value = String(raw || "");
    if (!value) return "";

    try {
      const u = new URL(value, window.location.href);
      if (u.pathname.includes("/generated-v55/")) u.searchParams.set("download", "1");
      return u.toString();
    } catch (_) {
      if (value.includes("/generated-v55/") && !value.includes("download=1")) {
        return value + (value.includes("?") ? "&download=1" : "?download=1");
      }
      return value;
    }
  }

  function filenameFromUrl(url, fallback) {
    try {
      const u = new URL(url, window.location.href);
      const name = decodeURIComponent(u.pathname.split("/").pop() || "");
      return name || fallback || "sabi-ai-file";
    } catch (_) {
      return fallback || "sabi-ai-file";
    }
  }

  function findFileCard(el) {
    return (
      el.closest(".attachment-view") ||
      el.closest(".media-card") ||
      el.closest(".attachment-item") ||
      el.closest(".media-inline") ||
      el.closest(".generated-center-card") ||
      el.closest(".file-manager-card") ||
      el.closest(".msg-card") ||
      document
    );
  }

  function findFileUrl(el) {
    const own =
      el.getAttribute?.("href") ||
      el.getAttribute?.("data-download-url") ||
      el.getAttribute?.("data-url") ||
      "";

    if (own) return own;

    const card = findFileCard(el);

    const found = card.querySelector(
      "a[href*='/generated-v55/'],video[src*='/generated-v55/'],audio[src*='/generated-v55/'],source[src*='/generated-v55/'],[data-download-url*='/generated-v55/'],[data-url*='/generated-v55/']"
    );

    return (
      found?.getAttribute?.("data-download-url") ||
      found?.getAttribute?.("data-url") ||
      found?.getAttribute?.("href") ||
      found?.getAttribute?.("src") ||
      ""
    );
  }

  function findFileName(el, url) {
    const card = findFileCard(el);
    const text = String(card.innerText || card.textContent || "");
    const match = text.match(/[A-Za-z0-9._-]+\.(mp4|mp3|wav|m4a|png|jpg|jpeg|webp|json|md|txt|js|ts|pdf|zip)/i);
    return match ? match[0] : filenameFromUrl(url, "sabi-ai-file");
  }

  async function forceBlobDownload(url, name) {
    const href = toDirectDownloadUrl(url);
    if (!href) {
      toast("Download is not available.");
      return false;
    }

    const filename = name || filenameFromUrl(href, "sabi-ai-file");

    try {
      const res = await fetch(href, { cache: "no-store" });
      if (!res.ok) throw new Error("HTTP " + res.status);

      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = filename;
      a.rel = "noopener";
      a.style.display = "none";
      document.body.appendChild(a);
      a.click();

      setTimeout(() => {
        try { URL.revokeObjectURL(blobUrl); } catch (_) {}
        try { a.remove(); } catch (_) {}
      }, 2000);

      toast("Download started.");
      return true;
    } catch (_) {
      const a = document.createElement("a");
      a.href = href;
      a.download = filename;
      a.rel = "noopener";
      a.target = "_self";
      a.style.display = "none";
      document.body.appendChild(a);
      a.click();

      setTimeout(() => {
        try { a.remove(); } catch (_) {}
      }, 1500);

      toast("Download started.");
      return true;
    }
  }

  function saveFile(el) {
    const url = findFileUrl(el);
    const name = findFileName(el, url);

    if (!url) {
      toast("Nothing to save.");
      return false;
    }

    let list = [];
    try {
      list = JSON.parse(localStorage.getItem(SAVED_KEY) || "[]");
      if (!Array.isArray(list)) list = [];
    } catch (_) {
      list = [];
    }

    const record = {
      id: "saved-" + Date.now() + "-" + Math.random().toString(36).slice(2, 8),
      name,
      url,
      downloadUrl: toDirectDownloadUrl(url),
      savedAt: new Date().toISOString(),
      source: "sabi-ai-studio-v78"
    };

    const exists = list.some((item) => item && (item.url === record.url || item.downloadUrl === record.downloadUrl || item.name === record.name));
    if (!exists) list.unshift(record);

    localStorage.setItem(SAVED_KEY, JSON.stringify(list.slice(0, 200)));

    const btn = el.closest("button,a,[role='button']");
    if (btn) {
      btn.textContent = "Saved";
      btn.setAttribute("title", "Saved");
      btn.setAttribute("aria-label", "Saved");
      btn.setAttribute("data-sabi-v78-saved", "true");
    }

    toast("Saved.");
    return true;
  }

  document.addEventListener("click", function (event) {
    const button = event.target?.closest?.("button,a,[role='button']");
    if (!button) return;

    if (matchLabel(button, ["copy", "копировать"])) {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();

      copyCleanText(extractCleanMessageText(button));
      return;
    }

    if (matchLabel(button, ["edit", "редактировать"])) {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();

      editCleanText(extractCleanMessageText(button));
      return;
    }

    if (matchLabel(button, ["download", "скачать"])) {
      const url = findFileUrl(button);
      if (!url) return;

      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();

      forceBlobDownload(url, findFileName(button, url));
      return;
    }

    if (matchLabel(button, ["save", "сохранить"])) {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();

      saveFile(button);
      return;
    }
  }, true);

  function injectMobileCss() {
    if (document.querySelector("style[data-sabi-v78-actions]")) return;

    const style = document.createElement("style");
    style.setAttribute("data-sabi-v78-actions", "true");
    style.textContent = `
      @media (hover: none), (pointer: coarse) {
        .msg-tools,
        .message-tools,
        .recent-actions {
          opacity: 1 !important;
          pointer-events: auto !important;
        }

        button,
        a,
        [role="button"] {
          touch-action: manipulation;
        }
      }
    `;

    document.head.appendChild(style);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", injectMobileCss, { once: true });
  } else {
    injectMobileCss();
  }
})();





/* v83 voice audio message recorder: records audio message, not transcription text */
(function () {
  if (window.__sabiV83VoiceAudioMessageRecorder) return;
  window.__sabiV83VoiceAudioMessageRecorder = true;

  let mediaStream = null;
  let recorder = null;
  let chunks = [];
  let activeTarget = null;
  let activeButton = null;
  let startedAt = 0;
  let timer = null;

  const drafts = {
    main: null,
    chat: null
  };

  function toast(text) {
    try {
      if (typeof showToast === "function") showToast(text);
      else console.log("[Sabi]", text);
    } catch (_) {}
  }

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function durationText(ms) {
    const total = Math.max(0, Math.round(ms / 1000));
    const m = Math.floor(total / 60);
    const s = total % 60;
    return pad(m) + ":" + pad(s);
  }

  function bestMimeType() {
    const types = [
      "audio/webm;codecs=opus",
      "audio/webm",
      "audio/ogg;codecs=opus",
      "audio/mp4"
    ];

    for (const type of types) {
      try {
        if (window.MediaRecorder && MediaRecorder.isTypeSupported(type)) return type;
      } catch (_) {}
    }

    return "";
  }

  function fileExt(type) {
    const value = String(type || "").toLowerCase();
    if (value.includes("mp4")) return "m4a";
    if (value.includes("ogg")) return "ogg";
    return "webm";
  }

  function micButton(target) {
    const btn = target?.closest?.("#micBtn,#chatMic");
    return btn || null;
  }

  function targetName(button) {
    return button && button.id === "chatMic" ? "chat" : "main";
  }

  function trayFor(target) {
    return document.querySelector(target === "chat" ? "#chatAttachmentTray" : "#mainAttachmentTray");
  }

  function fileInput() {
    return document.querySelector("#fileInput");
  }

  function setMicState(button, state) {
    if (!button) return;

    button.classList.remove("sabi-voice-recording-v83", "sabi-voice-ready-v83", "sabi-voice-error-v83");

    if (state === "recording") button.classList.add("sabi-voice-recording-v83");
    if (state === "ready") button.classList.add("sabi-voice-ready-v83");
    if (state === "error") button.classList.add("sabi-voice-error-v83");

    button.setAttribute("data-sabi-voice-state", state || "idle");
    button.setAttribute("aria-pressed", state === "recording" ? "true" : "false");

    if (state === "recording") {
      button.setAttribute("title", "Recording audio. Tap again to stop.");
      button.setAttribute("aria-label", "Recording audio. Tap again to stop.");
    } else if (state === "ready") {
      button.setAttribute("title", "Voice message ready");
      button.setAttribute("aria-label", "Voice message ready");
    } else {
      button.setAttribute("title", "Voice input");
      button.setAttribute("aria-label", "Voice input");
    }
  }

  function stopTimer() {
    if (timer) clearInterval(timer);
    timer = null;
  }

  function startTimer(button) {
    stopTimer();

    timer = setInterval(function () {
      const label = durationText(Date.now() - startedAt);
      button.setAttribute("data-sabi-voice-duration", label);
      const badge = document.querySelector("[data-sabi-voice-recording-badge='true']");
      if (badge) badge.textContent = "Recording " + label + " · tap mic to stop";
    }, 300);
  }

  function cleanupStream() {
    try {
      if (mediaStream) mediaStream.getTracks().forEach((track) => track.stop());
    } catch (_) {}

    mediaStream = null;
  }

  function clearDraft(target) {
    const old = drafts[target];
    if (old && old.url) {
      try { URL.revokeObjectURL(old.url); } catch (_) {}
    }

    drafts[target] = null;

    const tray = trayFor(target);
    if (tray) {
      tray.querySelectorAll("[data-sabi-voice-draft-v83='true']").forEach((el) => el.remove());

      if (!tray.children.length) {
        tray.hidden = true;
      }
    }
  }

  function attachFileToNativePipeline(file) {
    const input = fileInput();
    if (!input || !window.DataTransfer) return false;

    try {
      const dt = new DataTransfer();
      dt.items.add(file);
      input.files = dt.files;
      input.dispatchEvent(new Event("change", { bubbles: true }));
      return true;
    } catch (error) {
      console.warn("[Sabi voice v83] fileInput attach failed", error);
      return false;
    }
  }

  function renderDraft(target, draft) {
    const tray = trayFor(target);
    if (!tray || !draft) return;

    tray.hidden = false;
    tray.querySelectorAll("[data-sabi-voice-draft-v83='true']").forEach((el) => el.remove());

    const card = document.createElement("div");
    card.className = "sabi-voice-draft-v83";
    card.setAttribute("data-sabi-voice-draft-v83", "true");

    const title = document.createElement("div");
    title.className = "sabi-voice-title-v83";
    title.textContent = "Voice message · " + draft.durationText;

    const audio = document.createElement("audio");
    audio.controls = true;
    audio.src = draft.url;
    audio.preload = "metadata";

    const meta = document.createElement("div");
    meta.className = "sabi-voice-meta-v83";
    meta.textContent = draft.file.name + " · " + Math.round(draft.file.size / 1024) + " KB";

    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "sabi-voice-remove-v83";
    remove.textContent = "Remove";
    remove.addEventListener("click", function () {
      clearDraft(target);
      setMicState(target === "chat" ? document.querySelector("#chatMic") : document.querySelector("#micBtn"), "idle");
      toast("Voice message removed.");
    });

    card.appendChild(title);
    card.appendChild(audio);
    card.appendChild(meta);
    card.appendChild(remove);

    tray.prepend(card);
  }

  function createVoiceFile(blob) {
    const ext = fileExt(blob.type);
    const now = new Date();
    const stamp =
      now.getFullYear() +
      "-" + pad(now.getMonth() + 1) +
      "-" + pad(now.getDate()) +
      "-" + pad(now.getHours()) +
      "-" + pad(now.getMinutes()) +
      "-" + pad(now.getSeconds());

    return new File([blob], "sabi-voice-message-" + stamp + "." + ext, {
      type: blob.type || "audio/webm",
      lastModified: Date.now()
    });
  }

  async function startRecording(button) {
    const target = targetName(button);

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia || !window.MediaRecorder) {
      setMicState(button, "error");
      toast("Audio recording is not supported in this browser.");
      setTimeout(() => setMicState(button, "idle"), 1800);
      return;
    }

    if (!window.isSecureContext && location.hostname !== "localhost" && location.hostname !== "127.0.0.1") {
      setMicState(button, "error");
      toast("Microphone requires HTTPS after publication.");
      setTimeout(() => setMicState(button, "idle"), 1800);
      return;
    }

    clearDraft(target);

    try {
      mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });

      chunks = [];
      activeTarget = target;
      activeButton = button;
      startedAt = Date.now();

      const mime = bestMimeType();
      recorder = mime ? new MediaRecorder(mediaStream, { mimeType: mime }) : new MediaRecorder(mediaStream);

      recorder.ondataavailable = function (event) {
        if (event.data && event.data.size > 0) chunks.push(event.data);
      };

      recorder.onerror = function (event) {
        console.warn("[Sabi voice v83] recorder error", event);
        cleanupStream();
        stopTimer();
        setMicState(button, "error");
        toast("Voice recording error.");
        setTimeout(() => setMicState(button, "idle"), 1800);
      };

      recorder.onstop = function () {
        const duration = Date.now() - startedAt;
        const type = recorder?.mimeType || mime || "audio/webm";
        const blob = new Blob(chunks, { type });

        cleanupStream();
        stopTimer();

        recorder = null;

        if (!blob.size) {
          setMicState(button, "error");
          toast("Empty voice message.");
          setTimeout(() => setMicState(button, "idle"), 1800);
          return;
        }

        const file = createVoiceFile(blob);
        const url = URL.createObjectURL(blob);

        const draft = {
          file,
          blob,
          url,
          durationMs: duration,
          durationText: durationText(duration),
          target,
          createdAt: new Date().toISOString()
        };

        drafts[target] = draft;

        renderDraft(target, draft);
        attachFileToNativePipeline(file);

        setMicState(button, "ready");
        toast("Voice message recorded.");
      };

      recorder.start(250);
      setMicState(button, "recording");
      startTimer(button);
      toast("Recording audio. Tap mic again to stop.");
    } catch (error) {
      console.warn("[Sabi voice v83] getUserMedia failed", error);
      cleanupStream();
      stopTimer();
      recorder = null;
      setMicState(button, "error");
      toast("Microphone permission error: " + (error?.name || error?.message || "unknown"));
      setTimeout(() => setMicState(button, "idle"), 2200);
    }
  }

  function stopRecording() {
    try {
      if (recorder && recorder.state !== "inactive") {
        recorder.stop();
        return true;
      }
    } catch (error) {
      console.warn("[Sabi voice v83] stop failed", error);
    }

    cleanupStream();
    stopTimer();
    recorder = null;
    setMicState(activeButton, "idle");
    return false;
  }

  function toggle(button) {
    if (recorder && activeButton === button && recorder.state === "recording") {
      stopRecording();
      return;
    }

    if (recorder && recorder.state === "recording") {
      stopRecording();
      setTimeout(() => startRecording(button), 350);
      return;
    }

    startRecording(button);
  }

  document.addEventListener("click", function (event) {
    const button = micButton(event.target);
    if (!button) return;

    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();

    toggle(button);
  }, true);

  function injectCss() {
    if (document.querySelector("style[data-sabi-v83-voice]")) return;

    const style = document.createElement("style");
    style.setAttribute("data-sabi-v83-voice", "true");
    style.textContent = `
      #micBtn.sabi-voice-recording-v83,
      #chatMic.sabi-voice-recording-v83 {
        transform: scale(1.08) !important;
        background: radial-gradient(circle at 50% 45%, rgba(90, 226, 255, .55), rgba(12, 31, 68, .96)) !important;
        box-shadow:
          0 0 0 2px rgba(130, 228, 255, .98),
          0 0 0 10px rgba(74, 185, 255, .24),
          0 0 38px rgba(74, 185, 255, .78) !important;
        animation: sabiVoicePulseV83 1s ease-in-out infinite !important;
      }

      #micBtn.sabi-voice-ready-v83,
      #chatMic.sabi-voice-ready-v83 {
        transform: scale(1.04) !important;
        background: radial-gradient(circle at 50% 45%, rgba(96, 255, 181, .45), rgba(12, 48, 52, .96)) !important;
        box-shadow:
          0 0 0 2px rgba(120, 255, 201, .92),
          0 0 0 8px rgba(74, 255, 180, .18),
          0 0 28px rgba(74, 255, 180, .52) !important;
      }

      #micBtn.sabi-voice-error-v83,
      #chatMic.sabi-voice-error-v83 {
        transform: scale(1.04) !important;
        background: radial-gradient(circle at 50% 45%, rgba(255, 100, 100, .48), rgba(60, 18, 36, .96)) !important;
        box-shadow:
          0 0 0 2px rgba(255, 130, 130, .98),
          0 0 0 10px rgba(255, 90, 90, .20),
          0 0 30px rgba(255, 90, 90, .66) !important;
      }

      @keyframes sabiVoicePulseV83 {
        0% { opacity: .84; }
        50% { opacity: 1; }
        100% { opacity: .84; }
      }

      .sabi-voice-draft-v83 {
        display: grid;
        gap: 8px;
        margin: 8px 0;
        padding: 10px;
        border-radius: 14px;
        border: 1px solid rgba(91, 180, 255, .24);
        background: rgba(4, 14, 31, .72);
        box-shadow: 0 12px 32px rgba(0, 0, 0, .22);
      }

      .sabi-voice-title-v83 {
        font-weight: 700;
        color: rgba(246, 251, 255, .94);
        font-size: 12px;
      }

      .sabi-voice-draft-v83 audio {
        width: 100%;
      }

      .sabi-voice-meta-v83 {
        font-size: 11px;
        color: rgba(210, 230, 255, .72);
      }

      .sabi-voice-remove-v83 {
        justify-self: start;
        border: 1px solid rgba(112, 166, 238, .26);
        background: rgba(8, 25, 55, .82);
        color: rgba(246, 251, 255, .92);
        border-radius: 10px;
        padding: 7px 10px;
        cursor: pointer;
      }

      @media (hover: none), (pointer: coarse) {
        #micBtn,
        #chatMic,
        .sabi-voice-remove-v83 {
          touch-action: manipulation !important;
        }
      }
    `;

    document.head.appendChild(style);
  }

  function boot() {
    injectCss();

    const mainMic = document.querySelector("#micBtn");
    const chatMic = document.querySelector("#chatMic");

    if (mainMic) {
      mainMic.setAttribute("title", "Voice input");
      mainMic.setAttribute("aria-label", "Voice input");
    }

    if (chatMic) {
      chatMic.setAttribute("title", "Voice input");
      chatMic.setAttribute("aria-label", "Voice input");
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }

  window.sabiVoiceDraftsV83 = drafts;
  window.sabiVoiceStopV83 = stopRecording;
})();

/* v84 mode buttons garbage cleanup: restore clean labels/icons on main screen */
(function () {
  if (window.__sabiV84ModeButtonsClean) return;
  window.__sabiV84ModeButtonsClean = true;

  const labels = {
    Auto: "Auto",
    Text: "Text",
    Code: "Code",
    Image: "Image",
    Video: "Video",
    File: "File",
    Document: "Document",
    Presentation: "Presentation"
  };

  function cleanModeButton(btn) {
    if (!btn || !btn.dataset || !btn.dataset.mode) return;

    const mode = btn.dataset.mode;
    const label = labels[mode] || mode;

    let icon = btn.querySelector(".mode-ico");
    if (!icon) {
      icon = document.createElement("span");
      icon.className = "mode-ico " + mode.toLowerCase();
    }

    icon.setAttribute("aria-hidden", "true");

    btn.replaceChildren();

    const labelSpan = document.createElement("span");
    labelSpan.className = "mode-label-v84";
    labelSpan.textContent = label;

    btn.appendChild(icon);
    btn.appendChild(labelSpan);

    btn.setAttribute("aria-label", label);
    btn.setAttribute("title", label);
  }

  function cleanAll() {
    document.querySelectorAll(".mode-panel .mode[data-mode]").forEach(cleanModeButton);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", cleanAll, { once: true });
  } else {
    cleanAll();
  }

  const mo = new MutationObserver(() => {
    clearTimeout(window.__sabiV84ModeCleanTimer);
    window.__sabiV84ModeCleanTimer = setTimeout(cleanAll, 80);
  });

  mo.observe(document.documentElement, { childList: true, subtree: true });
})();

/* v85 mode label hard sanitizer: mode-panel only, no chat/history changes */
(function () {
  if (window.__sabiV85ModeLabelHardSanitizer) return;
  window.__sabiV85ModeLabelHardSanitizer = true;

  const clean = {
    Auto: "Auto",
    Text: "Text",
    Code: "Code",
    Image: "Image",
    Video: "Video",
    File: "File",
    Document: "Document",
    Presentation: "Presentation"
  };

  function sanitize() {
    const panel = document.querySelector(".mode-panel");
    if (!panel) return;

    panel.querySelectorAll(".mode[data-mode]").forEach((btn) => {
      const mode = btn.getAttribute("data-mode");
      const label = clean[mode] || mode || "";

      let icon = btn.querySelector(".mode-ico");
      if (!icon) {
        icon = document.createElement("span");
        icon.className = "mode-ico " + String(mode || "").toLowerCase();
      }

      icon.textContent = "";
      icon.setAttribute("aria-hidden", "true");

      let labelNode = btn.querySelector(".mode-label-v85");
      if (!labelNode) {
        labelNode = document.createElement("span");
        labelNode.className = "mode-label-v85";
      }

      labelNode.textContent = label;

      btn.replaceChildren(icon, labelNode);
      btn.setAttribute("aria-label", label);
      btn.setAttribute("title", label);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", sanitize, { once: true });
  } else {
    sanitize();
  }

  const panel = document.querySelector(".mode-panel");
  if (panel) {
    const mo = new MutationObserver(() => {
      clearTimeout(window.__sabiV85ModeTimer);
      window.__sabiV85ModeTimer = setTimeout(sanitize, 60);
    });
    mo.observe(panel, { childList: true, subtree: true, characterData: true });
  }
})();


/* v88 correct Projects screen:
   project page like owner example, project chats stay inside project only, sidebar recent stays main chats only */
(function () {
  if (window.__sabiV88CorrectProjects) return;
  window.__sabiV88CorrectProjects = true;

  const KEY = "sabi-ai-studio-projects-v88";
  const ACTIVE_PROJECT = "sabi-ai-studio-active-project-v88";
  const ACTIVE_CHAT = "sabi-ai-studio-active-project-chat-v88";

  const state = {
    projects: [],
    activeProjectId: "",
    activeChatId: "",
    projectChatMode: false
  };

  function id(prefix) {
    return prefix + "-" + Date.now() + "-" + Math.random().toString(36).slice(2, 9);
  }

  function now() {
    return new Date().toISOString();
  }

  function niceDate(value) {
    try {
      return new Date(value || Date.now()).toLocaleDateString();
    } catch (_) {
      return "";
    }
  }

  function niceTime(value) {
    try {
      return new Date(value || Date.now()).toLocaleString();
    } catch (_) {
      return "";
    }
  }

  function toast(text) {
    try {
      if (typeof showToast === "function") showToast(text);
      else console.log("[Sabi Projects]", text);
    } catch (_) {}
  }

  function load() {
    try {
      const parsed = JSON.parse(localStorage.getItem(KEY) || "[]");
      state.projects = Array.isArray(parsed) ? parsed : [];
    } catch (_) {
      state.projects = [];
    }

    state.activeProjectId = localStorage.getItem(ACTIVE_PROJECT) || "";
    state.activeChatId = localStorage.getItem(ACTIVE_CHAT) || "";

    if (!state.activeProjectId && state.projects[0]) {
      state.activeProjectId = state.projects[0].id;
    }
  }

  function save() {
    localStorage.setItem(KEY, JSON.stringify(state.projects));
    localStorage.setItem(ACTIVE_PROJECT, state.activeProjectId || "");
    localStorage.setItem(ACTIVE_CHAT, state.activeChatId || "");
  }

  function project(idValue) {
    return state.projects.find((p) => p.id === idValue) || null;
  }

  function activeProject() {
    return project(state.activeProjectId);
  }

  function chat(projectObj, chatId) {
    if (!projectObj || !Array.isArray(projectObj.chats)) return null;
    return projectObj.chats.find((c) => c.id === chatId) || null;
  }

  function activeChat() {
    return chat(activeProject(), state.activeChatId);
  }

  function setActiveNav(name) {
    document.querySelectorAll(".side-nav .nav-btn").forEach((btn) => btn.classList.remove("active"));

    if (name === "projects") document.querySelector("#projectsNav")?.classList.add("active");
    if (name === "new") document.querySelector("#newChat")?.classList.add("active");
  }

  function stage() {
    return document.querySelector(".stage") || document.querySelector("main") || document.body;
  }

  function mainCenter() {
    return document.querySelector(".main-center");
  }

  function chatScreen() {
    return document.querySelector("#chatScreen");
  }

  function messageList() {
    return document.querySelector("#messageList");
  }

  function chatEditor() {
    return document.querySelector("#chatEditor");
  }

  function ensureScreen() {
    let screen = document.querySelector("#projectsScreenV88");
    if (screen) return screen;

    screen = document.createElement("section");
    screen.id = "projectsScreenV88";
    screen.className = "projects-screen-v88";
    screen.hidden = true;
    screen.setAttribute("aria-label", "Projects");

    screen.innerHTML = `
      <div class="projects-shell-v88">
        <header class="project-page-head-v88">
          <button class="project-back-v88" type="button" data-v88-action="back-main" aria-label="Back">‹</button>

          <div class="project-title-wrap-v88">
            <div class="project-folder-v88" aria-hidden="true"></div>
            <div>
              <h1 id="projectPageTitleV88">Projects</h1>
              <p id="projectPageSubV88">Create a project and keep every chat history inside it.</p>
            </div>
          </div>

          <div class="project-head-actions-v88">
            <button type="button" class="project-share-v88" data-v88-action="new-project">+ New project</button>
            <button type="button" class="project-menu-v88" data-v88-action="project-menu">•••</button>
          </div>
        </header>

        <section id="projectsHomeV88" class="projects-home-v88">
          <div class="project-create-card-v88">
            <h2>Create project</h2>
            <p>Projects keep their own chats, files, and history separate from the main sidebar.</p>
            <div class="project-create-row-v88">
              <input id="projectCreateInputV88" type="text" placeholder="Project name..." />
              <button type="button" data-v88-action="create-project">Create</button>
            </div>
          </div>

          <div id="projectsGridV88" class="projects-grid-v88"></div>
        </section>

        <section id="projectDetailV88" class="project-detail-v88" hidden>
          <form id="projectNewChatFormV88" class="project-new-chat-v88" autocomplete="off">
            <button type="button" class="project-plus-v88" data-v88-action="new-project-chat-empty" aria-label="New chat">+</button>
            <input id="projectNewChatInputV88" type="text" placeholder="New chat в проекте..." />
            <button type="button" class="project-priority-v88" data-v88-action="project-priority">High⌄</button>
            <button type="button" id="projectMicV88" class="project-mic-v88" aria-label="Voice input"></button>
            <button type="submit" class="project-send-v88" aria-label="Start chat"></button>
          </form>

          <div class="project-tabs-v88">
            <button type="button" class="active" data-v88-tab="chats">Чаты</button>
            <button type="button" data-v88-tab="sources">Источники</button>
          </div>

          <div id="projectChatsListV88" class="project-chat-list-v88"></div>

          <div id="projectSourcesV88" class="project-sources-v88" hidden>
            <div class="project-source-empty-v88">
              <h3>Sources</h3>
              <p>Project source files will stay inside this project. No main sidebar mixing.</p>
            </div>
          </div>
        </section>
      </div>
    `;

    stage().appendChild(screen);
    return screen;
  }

  function showProjects() {
    load();
    ensureScreen();

    state.projectChatMode = false;

    if (mainCenter()) mainCenter().hidden = true;
    if (chatScreen()) chatScreen().hidden = true;

    const screen = document.querySelector("#projectsScreenV88");
    if (screen) screen.hidden = false;

    document.querySelector("#app")?.classList.add("view-projects-v88");
    document.querySelector("#app")?.classList.remove("view-project-chat-v88");

    setActiveNav("projects");
    render();
    sanitizeRecentSidebar();
  }

  function showMain() {
    saveProjectChatSnapshot();

    const screen = document.querySelector("#projectsScreenV88");
    if (screen) screen.hidden = true;

    if (chatScreen()) chatScreen().hidden = true;
    if (mainCenter()) mainCenter().hidden = false;

    state.projectChatMode = false;
    document.querySelector("#app")?.classList.remove("view-projects-v88", "view-project-chat-v88");

    setActiveNav("new");
    sanitizeRecentSidebar();
  }

  function showChatFromProject(projectId, chatId, draft) {
    const p = project(projectId);
    const c = chat(p, chatId);
    if (!p || !c) return;

    state.activeProjectId = projectId;
    state.activeChatId = chatId;
    state.projectChatMode = true;
    save();

    const screen = document.querySelector("#projectsScreenV88");
    if (screen) screen.hidden = true;
    if (mainCenter()) mainCenter().hidden = true;
    if (chatScreen()) chatScreen().hidden = false;

    document.querySelector("#app")?.classList.remove("view-projects-v88");
    document.querySelector("#app")?.classList.add("view-project-chat-v88");

    setActiveNav("projects");

    const title = document.querySelector("#chatTitle");
    if (title) title.textContent = c.title || p.title || "Project chat";

    const list = messageList();
    if (list) {
      list.innerHTML = c.htmlSnapshot || "";
    }

    const editor = chatEditor();
    if (editor && draft) {
      editor.value = draft;
      editor.dispatchEvent(new Event("input", { bubbles: true }));
      editor.focus();
    }

    setTimeout(sanitizeRecentSidebar, 300);
  }

  function backToProjectFromChat() {
    saveProjectChatSnapshot();

    if (chatScreen()) chatScreen().hidden = true;
    if (mainCenter()) mainCenter().hidden = true;

    const screen = ensureScreen();
    screen.hidden = false;

    state.projectChatMode = false;
    document.querySelector("#app")?.classList.add("view-projects-v88");
    document.querySelector("#app")?.classList.remove("view-project-chat-v88");

    setActiveNav("projects");
    renderProjectDetail();
    sanitizeRecentSidebar();
  }

  function makeProject(name) {
    const title = String(name || "").trim() || "Untitled project";

    const p = {
      id: id("project"),
      title,
      createdAt: now(),
      updatedAt: now(),
      chats: []
    };

    state.projects.unshift(p);
    state.activeProjectId = p.id;
    state.activeChatId = "";
    save();
    render();
    toast("Project created.");
    return p;
  }

  function deleteProject(projectId) {
    const p = project(projectId);
    if (!p) return;

    if (!confirm("Delete project '" + p.title + "'?")) return;

    state.projects = state.projects.filter((item) => item.id !== projectId);

    if (state.activeProjectId === projectId) {
      state.activeProjectId = state.projects[0]?.id || "";
      state.activeChatId = "";
    }

    save();
    render();
    toast("Project deleted.");
  }

  function renameProject(projectId) {
    const p = project(projectId);
    if (!p) return;

    const next = prompt("Project name:", p.title);
    if (next === null) return;

    p.title = String(next || "").trim() || p.title;
    p.updatedAt = now();

    save();
    render();
    toast("Project renamed.");
  }

  function makeProjectChat(projectId, text, open) {
    const p = project(projectId);
    if (!p) return null;

    const clean = String(text || "").trim();

    const c = {
      id: id("project-chat"),
      projectId: p.id,
      title: clean ? clean.slice(0, 70) : "New project chat",
      preview: clean || "",
      createdAt: now(),
      updatedAt: now(),
      messages: clean ? [{ role: "user", text: clean, at: now(), files: [] }] : [],
      files: [],
      htmlSnapshot: "",
      textSnapshot: clean
    };

    p.chats = Array.isArray(p.chats) ? p.chats : [];
    p.chats.unshift(c);
    p.updatedAt = now();

    state.activeProjectId = p.id;
    state.activeChatId = c.id;

    save();
    renderProjectDetail();
    sanitizeRecentSidebar();

    if (open) showChatFromProject(p.id, c.id, clean);

    return c;
  }

  function renameChat(projectId, chatId) {
    const p = project(projectId);
    const c = chat(p, chatId);
    if (!c) return;

    const next = prompt("Chat name:", c.title);
    if (next === null) return;

    c.title = String(next || "").trim() || c.title;
    c.updatedAt = now();
    p.updatedAt = now();

    save();
    renderProjectDetail();
    sanitizeRecentSidebar();
  }

  function deleteChat(projectId, chatId) {
    const p = project(projectId);
    if (!p) return;

    const c = chat(p, chatId);
    if (!c) return;

    if (!confirm("Delete chat '" + c.title + "'?")) return;

    p.chats = (p.chats || []).filter((item) => item.id !== chatId);
    p.updatedAt = now();

    if (state.activeChatId === chatId) state.activeChatId = "";

    save();
    renderProjectDetail();
    sanitizeRecentSidebar();
    toast("Chat deleted.");
  }

  function collectFilesFromMessageList() {
    const list = messageList();
    if (!list) return [];

    return Array.from(list.querySelectorAll("a[href],video[src],audio[src],source[src]"))
      .map((el) => {
        const url = el.getAttribute("href") || el.getAttribute("src") || "";
        if (!url || (!url.includes("/generated-v55/") && !url.startsWith("blob:") && !url.startsWith("data:"))) return null;

        const name = decodeURIComponent(String(url).split("/").pop()?.split("?")[0] || "sabi-file");
        return { name, url, at: now() };
      })
      .filter(Boolean);
  }

  function mergeFiles(a, b) {
    const map = new Map();

    [...(a || []), ...(b || [])].forEach((file) => {
      if (file && file.url) map.set(file.url, file);
    });

    return Array.from(map.values());
  }

  function saveProjectChatSnapshot() {
    if (!state.activeProjectId || !state.activeChatId) return;

    const p = project(state.activeProjectId);
    const c = chat(p, state.activeChatId);
    const list = messageList();

    if (!p || !c || !list) return;

    const html = list.innerHTML || "";
    const text = String(list.innerText || list.textContent || "").trim();
    const files = collectFilesFromMessageList();

    if (html || text || files.length) {
      c.htmlSnapshot = html;
      c.textSnapshot = text;
      c.preview = text.slice(0, 180) || c.preview || "";
      c.files = mergeFiles(c.files || [], files);
      c.updatedAt = now();
      p.updatedAt = now();

      save();
    }
  }

  function downloadChatFiles(projectId, chatId) {
    const p = project(projectId);
    const c = chat(p, chatId);
    const files = c?.files || [];

    if (!files.length) {
      toast("No files saved in this project chat yet.");
      return;
    }

    files.forEach((file, index) => {
      setTimeout(() => {
        const a = document.createElement("a");
        let href = file.url;

        try {
          const u = new URL(href, location.href);
          if (u.pathname.includes("/generated-v55/")) u.searchParams.set("download", "1");
          href = u.toString();
        } catch (_) {}

        a.href = href;
        a.download = file.name || "sabi-file";
        a.rel = "noopener";
        a.style.display = "none";
        document.body.appendChild(a);
        a.click();

        setTimeout(() => a.remove(), 1200);
      }, index * 260);
    });

    toast("Download started.");
  }

  function renderProjectsHome() {
    const grid = document.querySelector("#projectsGridV88");
    if (!grid) return;

    if (!state.projects.length) {
      grid.innerHTML = `
        <div class="project-empty-card-v88">
          <div class="project-empty-orb-v88">S</div>
          <h2>No projects yet</h2>
          <p>Create your first project to keep its chats and files together.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = "";

    state.projects.forEach((p) => {
      const chats = Array.isArray(p.chats) ? p.chats : [];

      const card = document.createElement("article");
      card.className = "project-card-v88";
      card.innerHTML = `
        <button type="button" class="project-card-main-v88">
          <span class="project-folder-card-v88"></span>
          <span>
            <strong></strong>
            <small>${chats.length} chats · updated ${niceDate(p.updatedAt || p.createdAt)}</small>
          </span>
        </button>
        <div class="project-card-actions-v88">
          <button type="button" data-action="open">Open</button>
          <button type="button" data-action="rename">Rename</button>
          <button type="button" data-action="delete" class="danger-v88">Delete</button>
        </div>
      `;

      card.querySelector("strong").textContent = p.title;
      card.querySelector(".project-card-main-v88").addEventListener("click", () => {
        state.activeProjectId = p.id;
        state.activeChatId = "";
        save();
        renderProjectDetail();
      });

      card.querySelector("[data-action='open']").addEventListener("click", () => {
        state.activeProjectId = p.id;
        state.activeChatId = "";
        save();
        renderProjectDetail();
      });

      card.querySelector("[data-action='rename']").addEventListener("click", () => renameProject(p.id));
      card.querySelector("[data-action='delete']").addEventListener("click", () => deleteProject(p.id));

      grid.appendChild(card);
    });
  }

  function renderProjectDetail() {
    const p = activeProject();
    const home = document.querySelector("#projectsHomeV88");
    const detail = document.querySelector("#projectDetailV88");
    const title = document.querySelector("#projectPageTitleV88");
    const sub = document.querySelector("#projectPageSubV88");

    if (!p) {
      if (home) home.hidden = false;
      if (detail) detail.hidden = true;
      if (title) title.textContent = "Projects";
      if (sub) sub.textContent = "Create a project and keep every chat history inside it.";
      renderProjectsHome();
      return;
    }

    if (home) home.hidden = true;
    if (detail) detail.hidden = false;
    if (title) title.textContent = p.title;
    if (sub) sub.textContent = (p.chats?.length || 0) + " chats · all history stays inside this project";

    renderChatList();
  }

  function renderChatList() {
    const box = document.querySelector("#projectChatsListV88");
    const p = activeProject();

    if (!box || !p) return;

    const chats = Array.isArray(p.chats) ? p.chats : [];

    if (!chats.length) {
      box.innerHTML = `
        <div class="project-chat-empty-v88">
          <h3>No chats in this project yet</h3>
          <p>Use the input above to create a new chat inside this project.</p>
        </div>
      `;
      return;
    }

    box.innerHTML = "";

    chats.forEach((c) => {
      const row = document.createElement("article");
      row.className = "project-chat-row-v88";
      row.innerHTML = `
        <button type="button" class="project-chat-open-v88">
          <span>
            <strong></strong>
            <small></small>
          </span>
          <time>${niceDate(c.updatedAt || c.createdAt)}</time>
        </button>
        <div class="project-chat-menu-v88">
          <button type="button" data-action="open">Open</button>
          <button type="button" data-action="rename">Rename</button>
          <button type="button" data-action="download">Download files</button>
          <button type="button" data-action="delete" class="danger-v88">Delete</button>
        </div>
      `;

      row.querySelector("strong").textContent = c.title || "Project chat";
      row.querySelector("small").textContent = c.preview || c.textSnapshot || "No preview yet.";

      row.querySelector(".project-chat-open-v88").addEventListener("click", () => showChatFromProject(p.id, c.id, ""));
      row.querySelector("[data-action='open']").addEventListener("click", () => showChatFromProject(p.id, c.id, ""));
      row.querySelector("[data-action='rename']").addEventListener("click", () => renameChat(p.id, c.id));
      row.querySelector("[data-action='download']").addEventListener("click", () => downloadChatFiles(p.id, c.id));
      row.querySelector("[data-action='delete']").addEventListener("click", () => deleteChat(p.id, c.id));

      box.appendChild(row);
    });
  }

  function render() {
    ensureScreen();
    if (state.activeProjectId && project(state.activeProjectId)) renderProjectDetail();
    else {
      const home = document.querySelector("#projectsHomeV88");
      const detail = document.querySelector("#projectDetailV88");
      if (home) home.hidden = false;
      if (detail) detail.hidden = true;
      renderProjectsHome();
    }
  }

  function projectChatTitles() {
    const titles = [];

    state.projects.forEach((p) => {
      (p.chats || []).forEach((c) => {
        if (c.title) titles.push(c.title);
        if (c.preview) titles.push(c.preview.slice(0, 48));
      });
    });

    return titles.filter(Boolean);
  }

  function sanitizeRecentSidebar() {
    const list = document.querySelector("#recentChatList");
    if (!list) return;

    const titles = projectChatTitles();
    if (!titles.length) return;

    Array.from(list.children).forEach((item) => {
      const text = String(item.innerText || item.textContent || "").trim();

      const isProjectChat = titles.some((title) => {
        if (!title || title.length < 3) return false;
        return text.includes(title.slice(0, Math.min(title.length, 48)));
      });

      if (isProjectChat) {
        item.remove();
      }
    });
  }

  function bind() {
    const projectsNav = document.querySelector("#projectsNav");
    if (projectsNav && !projectsNav.dataset.v88Bound) {
      projectsNav.dataset.v88Bound = "true";
      projectsNav.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();
        showProjects();
      }, true);
    }

    const newChat = document.querySelector("#newChat");
    if (newChat && !newChat.dataset.v88Bound) {
      newChat.dataset.v88Bound = "true";
      newChat.addEventListener("click", function () {
        state.projectChatMode = false;
        saveProjectChatSnapshot();
        setTimeout(sanitizeRecentSidebar, 250);
      }, true);
    }

    const chatBack = document.querySelector("#chatBack");
    if (chatBack && !chatBack.dataset.v88Bound) {
      chatBack.dataset.v88Bound = "true";
      chatBack.addEventListener("click", function (event) {
        if (!state.projectChatMode && !document.querySelector("#app")?.classList.contains("view-project-chat-v88")) return;

        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        backToProjectFromChat();
      }, true);
    }

    document.addEventListener("click", function (event) {
      const actionEl = event.target?.closest?.("[data-v88-action]");
      if (!actionEl) return;

      const action = actionEl.getAttribute("data-v88-action");

      if (action === "back-main") {
        event.preventDefault();
        showMain();
      }

      if (action === "new-project") {
        event.preventDefault();
        const name = prompt("Project name:");
        if (name !== null) makeProject(name);
      }

      if (action === "create-project") {
        event.preventDefault();
        const input = document.querySelector("#projectCreateInputV88");
        makeProject(input?.value || "");
        if (input) input.value = "";
      }

      if (action === "project-menu") {
        event.preventDefault();
        const p = activeProject();
        if (!p) return;
        const pick = prompt("Project action: rename / delete", "rename");
        if (pick === "rename") renameProject(p.id);
        if (pick === "delete") deleteProject(p.id);
      }

      if (action === "new-project-chat-empty") {
        event.preventDefault();
        const p = activeProject();
        if (!p) {
          toast("Create project first.");
          return;
        }
        makeProjectChat(p.id, "", true);
      }
    }, true);

    document.addEventListener("submit", function (event) {
      const form = event.target;
      if (!form || form.id !== "projectNewChatFormV88") return;

      event.preventDefault();

      const p = activeProject();
      const input = document.querySelector("#projectNewChatInputV88");

      if (!p) {
        toast("Create project first.");
        return;
      }

      makeProjectChat(p.id, input?.value || "", true);
      if (input) input.value = "";
    }, true);

    const list = messageList();
    if (list && !list.dataset.v88Observed) {
      list.dataset.v88Observed = "true";

      const mo = new MutationObserver(() => {
        clearTimeout(window.__sabiV88SnapshotTimer);
        window.__sabiV88SnapshotTimer = setTimeout(function () {
          if (state.projectChatMode || document.querySelector("#app")?.classList.contains("view-project-chat-v88")) {
            saveProjectChatSnapshot();
            sanitizeRecentSidebar();
          }
        }, 800);
      });

      mo.observe(list, { childList: true, subtree: true, characterData: true });
    }

    const recent = document.querySelector("#recentChatList");
    if (recent && !recent.dataset.v88Observed) {
      recent.dataset.v88Observed = "true";
      const mo = new MutationObserver(() => {
        clearTimeout(window.__sabiV88RecentTimer);
        window.__sabiV88RecentTimer = setTimeout(sanitizeRecentSidebar, 120);
      });
      mo.observe(recent, { childList: true, subtree: true, characterData: true });
    }
  }

  function boot() {
    load();
    ensureScreen();
    bind();
    render();
    sanitizeRecentSidebar();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }

  window.sabiProjectsV88 = {
    show: showProjects,
    state,
    saveProjectChatSnapshot,
    sanitizeRecentSidebar
  };
})();

/* v89 project composer redesign: same visual behavior as chat composer, project chats stay isolated */
(function () {
  if (window.__sabiV89ProjectComposerDesign) return;
  window.__sabiV89ProjectComposerDesign = true;

  function upgradeProjectComposer() {
    const form = document.querySelector("#projectNewChatFormV88");
    if (!form || form.dataset.v89Upgraded === "true") return;

    form.dataset.v89Upgraded = "true";
    form.classList.add("project-chat-composer-v89");

    const oldInput = document.querySelector("#projectNewChatInputV88");
    const oldValue = oldInput ? oldInput.value || "" : "";

    form.innerHTML = `
      <div id="projectAttachmentTrayV89" class="attachment-tray project-attachment-tray-v89" aria-label="Project attached files" hidden></div>

      <textarea id="projectNewChatInputV88"
        class="project-chat-editor-v89"
        aria-label="Project chat message input"
        rows="1"
        placeholder="Type your message..."></textarea>

      <div class="project-chat-actions-v89" aria-label="Project chat input actions">
        <button id="projectAttachV89" class="icon-btn" type="button" aria-label="Attach file">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M8.5 13.5 15.7 6.3a3 3 0 0 1 4.2 4.2l-9.2 9.2a5.1 5.1 0 0 1-7.2-7.2l9.7-9.7"/>
            <path d="m9.7 14.3 7.4-7.4"/>
          </svg>
        </button>

        <button id="projectMicV89" class="icon-btn" type="button" aria-label="Voice input">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 14a4 4 0 0 0 4-4V6a4 4 0 0 0-8 0v4a4 4 0 0 0 4 4Z"/>
            <path d="M19 10a7 7 0 0 1-14 0"/>
            <path d="M12 17v4"/>
            <path d="M8.5 21h7"/>
          </svg>
        </button>

        <button id="projectSendV89" class="send-btn" type="submit" aria-label="Start project chat">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M7 17 17 7"/>
            <path d="M9 7h8v8"/>
          </svg>
        </button>
      </div>

      <div class="project-composer-hint-v89">
        Project chats stay inside this project · Enter to send · Shift+Enter for new line
      </div>
    `;

    const next = document.querySelector("#projectNewChatInputV88");
    if (next) {
      next.value = oldValue;
      next.addEventListener("input", function () {
        next.style.height = "auto";
        next.style.height = Math.min(next.scrollHeight, 160) + "px";
      });

      next.addEventListener("keydown", function (event) {
        if (event.key === "Enter" && !event.shiftKey) {
          event.preventDefault();
          form.requestSubmit();
        }
      });
    }

    const attach = document.querySelector("#projectAttachV89");
    if (attach && !attach.dataset.v89Bound) {
      attach.dataset.v89Bound = "true";
      attach.addEventListener("click", function () {
        const input = document.querySelector("#fileInput");
        if (input) input.click();
      });
    }

    const mic = document.querySelector("#projectMicV89");
    const chatMic = document.querySelector("#chatMic");

    if (mic && chatMic && !mic.dataset.v89Bound) {
      mic.dataset.v89Bound = "true";
      mic.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();

        /* Reuse current working audio recorder indirectly only for visual/permission path if needed.
           Project composer creates project chat; actual audio send remains handled on chat screen after opening. */
        mic.classList.add("sabi-project-mic-ready-v89");
        setTimeout(() => mic.classList.remove("sabi-project-mic-ready-v89"), 900);

        try {
          if (typeof showToast === "function") showToast("Voice messages are recorded after opening project chat.");
        } catch (_) {}
      });
    }
  }

  function boot() {
    upgradeProjectComposer();

    const screen = document.querySelector("#projectsScreenV88");
    if (!screen || screen.dataset.v89Observed === "true") return;

    screen.dataset.v89Observed = "true";

    const mo = new MutationObserver(() => {
      clearTimeout(window.__sabiV89ProjectComposerTimer);
      window.__sabiV89ProjectComposerTimer = setTimeout(upgradeProjectComposer, 80);
    });

    mo.observe(screen, { childList: true, subtree: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }

  document.addEventListener("click", function (event) {
    if (event.target?.closest?.("#projectsNav")) {
      setTimeout(boot, 120);
      setTimeout(upgradeProjectComposer, 300);
    }
  }, true);
})();

/* v122 screen isolation logic only: no CSS, no design change */
(function () {
  if (window.__sabiV122ScreenIsolationLogicOnly) return;
  window.__sabiV122ScreenIsolationLogicOnly = true;

  function qs(s) { return document.querySelector(s); }

  function app() {
    return qs("#app");
  }

  function mainScreen() {
    return qs(".main-center");
  }

  function chatScreen() {
    return qs("#chatScreen");
  }

  function projectScreen() {
    return qs("#projectsScreenV88") || qs("#projectsScreenV106");
  }

  function show(el) {
    if (!el) return;
    el.hidden = false;
    el.style.display = "";
    el.style.visibility = "";
    el.style.opacity = "";
    el.style.pointerEvents = "";
  }

  function hide(el) {
    if (!el) return;
    el.hidden = true;
    el.style.display = "none";
    el.style.visibility = "hidden";
    el.style.pointerEvents = "none";
  }

  function cleanAppViewClasses() {
    const a = app();
    if (!a) return;

    a.classList.remove(
      "view-projects-v88",
      "view-project-chat-v88",
      "sabi-projects-v106",
      "sabi-projects-v114",
      "sabi-project-chat-v106",
      "sabi-project-chat-v117",
      "sabi-project-chat-v118",
      "sabi-project-chat-v119",
      "sabi-project-chat-v120",
      "sabi-project-chat-v121",
      "sabi-v111-chat-from-sidebar",
      "sabi-chat-open-from-sidebar-v110",
      "sabi-recent-chat-v109",
      "sabi-v112-preexit-history"
    );
  }

  function setActiveNav(id) {
    document.querySelectorAll(".side-nav .nav-btn").forEach(function (b) {
      b.classList.remove("active");
    });

    if (id) qs(id)?.classList.add("active");
  }

  function openMain() {
    cleanAppViewClasses();

    show(mainScreen());
    hide(projectScreen());
    hide(chatScreen());

    setActiveNav("#newChat");

    const a = app();
    if (a) a.dataset.sabiView = "main";
  }

  function openProjects() {
    cleanAppViewClasses();

    hide(mainScreen());
    hide(chatScreen());
    show(projectScreen());

    setActiveNav("#projectsNav");

    const a = app();
    if (a) {
      a.dataset.sabiView = "projects";
      a.classList.add("view-projects-v88");
    }

    try {
      if (window.sabiProjectsV88?.render) window.sabiProjectsV88.render();
      if (window.sabiProjectsV90?.render) window.sabiProjectsV90.render();
      if (window.sabiProjectsV106?.render) window.sabiProjectsV106.render();
    } catch (_) {}
  }

  function openChat(projectMode) {
    cleanAppViewClasses();

    hide(mainScreen());
    hide(projectScreen());
    show(chatScreen());

    const a = app();
    if (a) {
      a.dataset.sabiView = projectMode ? "project-chat" : "chat";
      if (projectMode) a.classList.add("view-project-chat-v88");
    }
  }

  function isProjectChatClick(target) {
    return !!target?.closest?.(
      ".project-chat-open-v88,.project-chat-open-v106,.project-chat-row-v88,.project-chat-row-v106,[data-action='open'],[data-v95-chat-action='open']"
    );
  }

  function isProjectComposerSend(target) {
    return !!target?.closest?.(
      "#projectSendV89,.project-send-v88,.project-send-v106,[aria-label='Start project chat']"
    );
  }

  function isSidebarRecentClick(target) {
    if (!target?.closest?.(".sidebar")) return false;

    if (target.closest("#newChat,#projectsNav,#authNav,.side-nav,.sidebar-footer,.sidebar-toggle,.sidebar-collapse,#sidebarToggle,[data-sidebar-toggle],.collapse-sidebar,.sidebar-handle")) {
      return false;
    }

    return !!target.closest(
      "#recentChatList,#recentChatList *,.recent-list,.recent-list *,.recent-section,.recent-section *,.history-section,.history-section *,[data-chat-id],[data-conversation-id],.chat-item,.recent-chat,.history-item"
    );
  }

  function schedule(fn) {
    setTimeout(fn, 30);
    setTimeout(fn, 120);
    setTimeout(fn, 350);
    setTimeout(fn, 800);
  }

  function bind() {
    if (window.__sabiV122Bound) return;
    window.__sabiV122Bound = true;

    document.addEventListener("click", function (event) {
      const target = event.target;

      if (target?.closest?.("#newChat")) {
        schedule(openMain);
        return;
      }

      if (target?.closest?.("#projectsNav")) {
        schedule(openProjects);
        return;
      }

      if (isProjectChatClick(target) || isProjectComposerSend(target)) {
        schedule(function () { openChat(true); });
        return;
      }

      if (isSidebarRecentClick(target)) {
        schedule(function () { openChat(false); });
        return;
      }

      if (target?.closest?.("#chatBack")) {
        const a = app();
        const fromProject = a?.dataset.sabiView === "project-chat" || a?.classList.contains("view-project-chat-v88");

        if (fromProject) {
          event.preventDefault();
          event.stopPropagation();
          schedule(openProjects);
        } else {
          schedule(openMain);
        }
      }
    }, true);
  }

  function repairCurrentLeak() {
    const p = projectScreen();
    const m = mainScreen();
    const c = chatScreen();
    const a = app();

    const navProjectsActive = qs("#projectsNav")?.classList.contains("active");
    const navMainActive = qs("#newChat")?.classList.contains("active");
    const chatVisible = c && !c.hidden && getComputedStyle(c).display !== "none";
    const projectVisible = p && !p.hidden && getComputedStyle(p).display !== "none";

    if (navProjectsActive || a?.dataset.sabiView === "projects") {
      openProjects();
      return;
    }

    if (chatVisible && !projectVisible) {
      openChat(a?.dataset.sabiView === "project-chat");
      return;
    }

    if (navMainActive || !projectVisible) {
      openMain();
      return;
    }

    if (projectVisible && m && !m.hidden) {
      openProjects();
    }
  }

  function boot() {
    bind();
    setTimeout(repairCurrentLeak, 200);
    setTimeout(repairCurrentLeak, 900);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }

  window.sabiV122ScreenIsolation = {
    openMain,
    openProjects,
    openChat,
    repairCurrentLeak
  };
})();

/* v123 logic-only project chat runtime: no CSS, no design change */
(function () {
  if (window.__sabiV123LogicOnlyProjectChat) return;
  window.__sabiV123LogicOnlyProjectChat = true;

  const PROJECTS_KEY = "sabi-ai-studio-projects-v88";
  const ACTIVE_PROJECT_KEY = "sabi-ai-studio-active-project-v106";
  const ACTIVE_CHAT_KEY = "sabi-ai-studio-active-project-chat-v123";
  const CONTEXT_KEY = "sabi-ai-studio-project-context-v123";
  const MARKER = "SABI_PROJECT_MEMORY_CONTEXT_V123";

  let activeRuntime = null;
  let sidebarBefore = new Map();

  function qs(s) { return document.querySelector(s); }
  function all(s) { return Array.from(document.querySelectorAll(s)); }

  function uid(prefix) {
    return prefix + "-" + Date.now() + "-" + Math.random().toString(36).slice(2, 8);
  }

  function now() {
    return new Date().toISOString();
  }

  function clean(text, max) {
    let v = String(text || "").replace(/\s+/g, " ").trim();
    if (max && v.length > max) v = v.slice(0, max).trim() + "…";
    return v;
  }

  function readProjects() {
    try {
      const list = JSON.parse(localStorage.getItem(PROJECTS_KEY) || "[]");
      return Array.isArray(list) ? list : [];
    } catch (_) {
      return [];
    }
  }

  function writeProjects(projects) {
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(Array.isArray(projects) ? projects : []));
  }

  function activeProjectId() {
    return localStorage.getItem(ACTIVE_PROJECT_KEY) || readProjects()[0]?.id || "";
  }

  function setActiveProject(id) {
    localStorage.setItem(ACTIVE_PROJECT_KEY, id || "");
  }

  function setActiveProjectChat(id) {
    localStorage.setItem(ACTIVE_CHAT_KEY, id || "");
  }

  function ensureProject() {
    const projects = readProjects();

    if (projects.length) {
      const id = activeProjectId();
      return projects.find((p) => p.id === id) || projects[0];
    }

    const project = {
      id: uid("project"),
      title: "SABI",
      createdAt: now(),
      updatedAt: now(),
      chats: []
    };

    writeProjects([project]);
    setActiveProject(project.id);
    return project;
  }

  function updateProject(projectId, updater) {
    const projects = readProjects();
    const i = projects.findIndex((p) => p.id === projectId);
    if (i < 0) return null;

    projects[i].chats = Array.isArray(projects[i].chats) ? projects[i].chats : [];
    updater(projects[i], projects);
    projects[i].updatedAt = now();

    writeProjects(projects);
    return projects[i];
  }

  function buildProjectMemory(project, currentChatId) {
    const chats = Array.isArray(project?.chats) ? project.chats : [];
    const lines = [];

    lines.push("Project: " + (project?.title || "Project"));
    lines.push("Use the following as private project memory. Do not repeat it unless the user asks.");
    lines.push("Visible chat must stay clean. Answer only the current user message.");

    chats
      .filter((c) => c.id !== currentChatId)
      .slice(0, 20)
      .forEach((chat, index) => {
        const text = clean(chat.textSnapshot || chat.preview || chat.title || "", 900);
        if (text) lines.push("Memory " + (index + 1) + ": " + text);
      });

    return lines.join("\n");
  }

  function projectScreen() {
    return qs("#projectsScreenV88") || qs("#projectsScreenV106");
  }

  function projectComposer() {
    return (
      qs("#projectComposerV106") ||
      qs("#projectNewChatFormV88") ||
      projectScreen()?.querySelector("form")
    );
  }

  function projectInput() {
    const screen = projectScreen();

    return (
      qs("#projectPromptV106") ||
      qs("#projectNewChatInputV88") ||
      screen?.querySelector("textarea") ||
      Array.from(screen?.querySelectorAll("input") || []).find((i) => {
        const ph = String(i.placeholder || "").toLowerCase();
        return i.type !== "file" && !ph.includes("project name") && !ph.includes("name");
      })
    );
  }

  function projectDraftText() {
    const input = projectInput();
    if (!input) return "";
    return clean("value" in input ? input.value : input.textContent);
  }

  function clearProjectDraft() {
    const input = projectInput();
    if (!input) return;

    if ("value" in input) input.value = "";
    else input.textContent = "";

    input.dispatchEvent(new Event("input", { bubbles: true }));
  }

  function collectProjectFiles() {
    const screen = projectScreen();
    if (!screen) return [];

    return Array.from(screen.querySelectorAll("input[type='file']"))
      .filter((i) => i.id !== "fileInput")
      .flatMap((i) => Array.from(i.files || []));
  }

  function setChatEditor(text) {
    const editor = qs("#chatEditor");
    if (!editor) return;

    if ("value" in editor) editor.value = text || "";
    else editor.textContent = text || "";

    editor.dispatchEvent(new InputEvent("input", {
      bubbles: true,
      cancelable: true,
      inputType: "insertText",
      data: text || ""
    }));

    editor.dispatchEvent(new Event("change", { bubbles: true }));
  }

  function clearChatFiles() {
    const input = qs("#fileInput");
    if (!input) return;

    try {
      const dt = new DataTransfer();
      input.files = dt.files;
      input.dispatchEvent(new Event("change", { bubbles: true }));
    } catch (_) {}
  }

  function transferFilesToChat(files) {
    const input = qs("#fileInput");
    const list = Array.from(files || []);
    if (!input || !list.length) return;

    try {
      const dt = new DataTransfer();
      list.forEach((file) => dt.items.add(file));
      input.files = dt.files;
      input.dispatchEvent(new Event("change", { bubbles: true }));
    } catch (_) {}
  }

  function sidebarItems() {
    const sidebar = qs(".sidebar");
    if (!sidebar) return [];

    return all("button,[role='button'],li,article,.chat-item,.recent-chat,[data-chat-id],[data-conversation-id]").filter((el) => {
      if (!sidebar.contains(el)) return false;
      if (el.closest("#newChat,#projectsNav,#authNav,.side-nav,.sidebar-footer")) return false;
      return clean(el.innerText || el.textContent).length > 1;
    });
  }

  function sidebarTitle(el) {
    const title = el.querySelector("strong,.title,.chat-title,[data-title]");
    return clean(title?.innerText || title?.textContent || el.innerText || el.textContent, 120).toLowerCase();
  }

  function snapshotSidebar() {
    sidebarBefore = new Map();

    sidebarItems().forEach((el) => {
      const title = sidebarTitle(el);
      if (!title) return;
      sidebarBefore.set(title, (sidebarBefore.get(title) || 0) + 1);
    });
  }

  function removeProjectChatFromSidebar(label) {
    const target = clean(label || activeRuntime?.draftText || activeRuntime?.title || "", 120).toLowerCase();
    const counts = new Map();

    sidebarItems().forEach((el) => {
      const title = sidebarTitle(el);
      if (!title) return;
      counts.set(title, (counts.get(title) || 0) + 1);
    });

    sidebarItems().forEach((el) => {
      const title = sidebarTitle(el);
      const before = sidebarBefore.get(title) || 0;
      const current = counts.get(title) || 0;
      const extra = current > before;

      const match = target && (title === target || title.includes(target) || target.includes(title));

      if (extra && match) {
        el.remove();
        counts.set(title, current - 1);
      }
    });
  }

  function createProjectChat(draftText, files) {
    const project = ensureProject();
    const chatId = uid("project-chat");
    const title = draftText ? clean(draftText, 70) : "New project chat";

    updateProject(project.id, (p) => {
      p.chats = Array.isArray(p.chats) ? p.chats : [];

      p.chats.unshift({
        id: chatId,
        projectId: p.id,
        title,
        preview: "Empty project chat",
        createdAt: now(),
        updatedAt: now(),
        htmlSnapshot: "",
        textSnapshot: "",
        files: Array.from(files || []).map((file) => ({
          name: file.name,
          type: file.type || "application/octet-stream",
          size: file.size || 0,
          addedAt: now()
        }))
      });
    });

    const updated = readProjects().find((p) => p.id === project.id);
    const chat = updated?.chats?.find((c) => c.id === chatId);

    return { project: updated, chat };
  }

  function openProjectChat(project, chat, draftText, files) {
    if (!project || !chat) return;

    const main = qs(".main-center");
    const projects = projectScreen();
    const chatScreen = qs("#chatScreen");
    const chatTitle = qs("#chatTitle");
    const messageList = qs("#messageList");
    const app = qs("#app");

    if (window.sabiV122ScreenIsolation?.openChat) {
      window.sabiV122ScreenIsolation.openChat(true);
    } else {
      if (main) main.hidden = true;
      if (projects) projects.hidden = true;
      if (chatScreen) chatScreen.hidden = false;
    }

    if (chatTitle) chatTitle.textContent = chat.title || "New project chat";
    if (messageList) messageList.innerHTML = chat.htmlSnapshot || "";

    clearChatFiles();
    setChatEditor(draftText || "");
    transferFilesToChat(files);

    if (app) {
      app.dataset.sabiProjectChat = "true";
      app.dataset.sabiProjectId = project.id;
      app.dataset.sabiProjectChatId = chat.id;
    }

    setActiveProject(project.id);
    setActiveProjectChat(chat.id);

    activeRuntime = {
      projectId: project.id,
      chatId: chat.id,
      title: chat.title || "New project chat",
      draftText: draftText || ""
    };

    localStorage.setItem(CONTEXT_KEY, JSON.stringify({
      at: now(),
      projectId: project.id,
      projectTitle: project.title || "",
      chatId: chat.id,
      chatTitle: chat.title || "",
      memory: buildProjectMemory(project, chat.id)
    }, null, 2));

    observeMessages();
  }

  function saveSnapshot() {
    if (!activeRuntime) return;

    const list = qs("#messageList");
    if (!list) return;

    updateProject(activeRuntime.projectId, (project) => {
      const chat = project.chats.find((c) => c.id === activeRuntime.chatId);
      if (!chat) return;

      chat.htmlSnapshot = list.innerHTML;
      chat.textSnapshot = clean(list.innerText || list.textContent || "", 6000);
      chat.preview = clean(chat.textSnapshot || activeRuntime.draftText || "Empty project chat", 180);
      chat.updatedAt = now();

      if (chat.title === "New project chat" && chat.preview && chat.preview !== "Empty project chat") {
        chat.title = clean(chat.preview, 70);
      }
    });

    try {
      if (window.sabiProjectsV88?.render) window.sabiProjectsV88.render();
      if (window.sabiProjectsV90?.render) window.sabiProjectsV90.render();
      if (window.sabiProjectsV106?.render) window.sabiProjectsV106.render();
    } catch (_) {}
  }

  function observeMessages() {
    const list = qs("#messageList");
    if (!list || list.dataset.v123Observed === "true") return;

    list.dataset.v123Observed = "true";

    const mo = new MutationObserver(function () {
      if (!activeRuntime) return;

      clearTimeout(window.__sabiV123SaveTimer);
      window.__sabiV123SaveTimer = setTimeout(function () {
        saveSnapshot();
        removeProjectChatFromSidebar(activeRuntime.draftText || activeRuntime.title);
      }, 500);
    });

    mo.observe(list, { childList: true, subtree: true, characterData: true });
  }

  function startNewProjectChat() {
    const text = projectDraftText();
    const files = collectProjectFiles();

    snapshotSidebar();

    const created = createProjectChat(text, files);
    if (!created || !created.project || !created.chat) return;

    openProjectChat(created.project, created.chat, text, files);
    clearProjectDraft();

    [400, 1200, 3000, 7000].forEach((ms) => {
      setTimeout(function () {
        removeProjectChatFromSidebar(text || created.chat.title);
      }, ms);
    });
  }

  function openExistingProjectChat(row) {
    const project = ensureProject();
    const rows = all(".project-chat-row-v88,.project-chat-row-v106");
    const index = rows.indexOf(row);
    const chat = Array.isArray(project.chats) ? project.chats[index] : null;

    if (!chat) return;

    openProjectChat(project, chat, "", []);
  }

  function getProjectContextBlock(originalText) {
    if (!activeRuntime) return null;

    let ctx = null;

    try {
      ctx = JSON.parse(localStorage.getItem(CONTEXT_KEY) || "{}");
    } catch (_) {}

    if (!ctx || !ctx.memory) return null;

    return (
      MARKER + "\n" +
      ctx.memory + "\n\n" +
      "Current user message:\n" +
      originalText
    );
  }

  function patchFetch() {
    if (window.__sabiV123FetchPatched) return;
    window.__sabiV123FetchPatched = true;

    const originalFetch = window.fetch;

    window.fetch = function (input, init) {
      try {
        if (!activeRuntime || !init || !init.body) {
          return originalFetch.apply(this, arguments);
        }

        const url = String(typeof input === "string" ? input : input?.url || "");
        const relevant =
          url.includes("3001") ||
          url.includes("/api") ||
          url.includes("chat") ||
          url.includes("generate") ||
          url.includes("gemini");

        if (!relevant) {
          return originalFetch.apply(this, arguments);
        }

        if (typeof init.body === "string") {
          const data = JSON.parse(init.body);
          const keys = ["prompt", "message", "text", "input", "query"];

          for (const key of keys) {
            if (typeof data[key] === "string" && data[key].trim() && !data[key].includes(MARKER)) {
              data[key] = getProjectContextBlock(data[key]) || data[key];
              init = { ...init, body: JSON.stringify(data) };
              break;
            }
          }
        } else if (init.body instanceof FormData) {
          const keys = ["prompt", "message", "text", "input", "query"];

          for (const key of keys) {
            const value = init.body.get(key);
            if (typeof value === "string" && value.trim() && !value.includes(MARKER)) {
              init.body.set(key, getProjectContextBlock(value) || value);
              break;
            }
          }
        }
      } catch (_) {}

      return originalFetch.call(this, input, init);
    };
  }

  function bind() {
    if (window.__sabiV123Bound) return;
    window.__sabiV123Bound = true;

    document.addEventListener("submit", function (event) {
      const form = event.target;

      if (form !== projectComposer()) return;

      event.preventDefault();
      event.stopImmediatePropagation();
      startNewProjectChat();
    }, true);

    document.addEventListener("keydown", function (event) {
      if (event.target === projectInput() && event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        event.stopImmediatePropagation();
        startNewProjectChat();
      }
    }, true);

    document.addEventListener("click", function (event) {
      const send = event.target?.closest?.(
        "#projectSendV89,.project-send-v88,.project-send-v106,[aria-label='Start project chat']"
      );

      if (send && projectScreen()?.contains(send)) {
        event.preventDefault();
        event.stopImmediatePropagation();
        startNewProjectChat();
        return;
      }

      const open = event.target?.closest?.(".project-chat-open-v88,.project-chat-open-v106");
      if (open) {
        event.preventDefault();
        event.stopImmediatePropagation();

        const row = open.closest(".project-chat-row-v88,.project-chat-row-v106");
        openExistingProjectChat(row);
        return;
      }

      if (event.target?.closest?.("#projectsNav,#newChat")) {
        saveSnapshot();
        activeRuntime = null;

        const a = qs("#app");
        if (a) {
          delete a.dataset.sabiProjectChat;
          delete a.dataset.sabiProjectId;
          delete a.dataset.sabiProjectChatId;
        }
      }
    }, true);

    document.addEventListener("pointerdown", function (event) {
      if (event.target?.closest?.("#chatSend") && activeRuntime) {
        snapshotSidebar();
      }
    }, true);

    document.addEventListener("submit", function (event) {
      if (event.target?.id === "chatComposer" && activeRuntime) {
        snapshotSidebar();
      }
    }, true);
  }

  function boot() {
    patchFetch();
    bind();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }

  window.sabiProjectsV123 = {
    startNewProjectChat,
    openProjectChat,
    saveSnapshot
  };
})();

/* v124 project runtime hardening: JS-only, no design changes */
(function () {
  if (window.__sabiV124ProjectRuntimeHardening) return;
  window.__sabiV124ProjectRuntimeHardening = true;

  const PROJECTS_KEY = "sabi-ai-studio-projects-v88";
  const ACTIVE_PROJECT_KEY = "sabi-ai-studio-active-project-v106";
  const ACTIVE_CHAT_KEY = "sabi-ai-studio-active-project-chat-v123";
  const REPORT_KEY = "sabi-ai-studio-v124-project-runtime-report";

  let sidebarBaseline = new Map();
  let autosaveTimer = null;

  function qs(s) { return document.querySelector(s); }
  function all(s) { return Array.from(document.querySelectorAll(s)); }

  function now() {
    return new Date().toISOString();
  }

  function clean(text, max) {
    let value = String(text || "").replace(/\s+/g, " ").trim();
    if (max && value.length > max) value = value.slice(0, max).trim() + "…";
    return value;
  }

  function readProjects() {
    try {
      const list = JSON.parse(localStorage.getItem(PROJECTS_KEY) || "[]");
      return Array.isArray(list) ? list : [];
    } catch (_) {
      return [];
    }
  }

  function writeProjects(projects) {
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(Array.isArray(projects) ? projects : []));
  }

  function activeProjectId() {
    return localStorage.getItem(ACTIVE_PROJECT_KEY) || readProjects()[0]?.id || "";
  }

  function activeChatId() {
    return localStorage.getItem(ACTIVE_CHAT_KEY) || "";
  }

  function isProjectChatMode() {
    const app = qs("#app");
    const chat = qs("#chatScreen");

    return !!(
      app?.dataset?.sabiProjectChat === "true" ||
      app?.dataset?.sabiProjectChatId ||
      app?.classList.contains("sabi-project-chat-v121") ||
      app?.classList.contains("sabi-project-chat-v123") ||
      chat?.dataset?.projectChat === "true"
    );
  }

  function currentProjectAndChat() {
    const projects = readProjects();
    const projectId =
      qs("#app")?.dataset?.sabiProjectId ||
      activeProjectId();

    const chatId =
      qs("#app")?.dataset?.sabiProjectChatId ||
      activeChatId();

    const project = projects.find((p) => p.id === projectId) || projects[0] || null;
    const chat = project?.chats?.find((c) => c.id === chatId) || null;

    return { projects, project, chat, projectId, chatId };
  }

  function repairProjectsStorage() {
    const projects = readProjects();
    let changed = false;

    projects.forEach((project) => {
      if (!project.id) {
        project.id = "project-" + Date.now() + "-" + Math.random().toString(36).slice(2, 8);
        changed = true;
      }

      if (!project.title) {
        project.title = "SABI";
        changed = true;
      }

      if (!Array.isArray(project.chats)) {
        project.chats = [];
        changed = true;
      }

      const seen = new Set();

      project.chats = project.chats.filter((chat) => {
        if (!chat) {
          changed = true;
          return false;
        }

        if (!chat.id) {
          chat.id = "project-chat-" + Date.now() + "-" + Math.random().toString(36).slice(2, 8);
          changed = true;
        }

        if (seen.has(chat.id)) {
          changed = true;
          return false;
        }

        seen.add(chat.id);

        if (!chat.projectId) {
          chat.projectId = project.id;
          changed = true;
        }

        if (!chat.title) {
          chat.title = clean(chat.preview || chat.textSnapshot || "New project chat", 80);
          changed = true;
        }

        if (!chat.preview) {
          chat.preview = clean(chat.textSnapshot || "Empty project chat", 180);
          changed = true;
        }

        if (!chat.createdAt) {
          chat.createdAt = now();
          changed = true;
        }

        if (!chat.updatedAt) {
          chat.updatedAt = chat.createdAt || now();
          changed = true;
        }

        if (typeof chat.htmlSnapshot !== "string") {
          chat.htmlSnapshot = "";
          changed = true;
        }

        if (typeof chat.textSnapshot !== "string") {
          chat.textSnapshot = "";
          changed = true;
        }

        if (!Array.isArray(chat.files)) {
          chat.files = [];
          changed = true;
        }

        return true;
      });
    });

    if (changed) writeProjects(projects);

    return { changed, projectsCount: projects.length };
  }

  function saveActiveProjectChatSnapshot(reason) {
    if (!isProjectChatMode()) return false;

    const { projects, project, chat } = currentProjectAndChat();
    const list = qs("#messageList");

    if (!project || !chat || !list) return false;

    const pIndex = projects.findIndex((p) => p.id === project.id);
    if (pIndex < 0) return false;

    const cIndex = projects[pIndex].chats.findIndex((c) => c.id === chat.id);
    if (cIndex < 0) return false;

    const html = list.innerHTML || "";
    const text = clean(list.innerText || list.textContent || "", 8000);

    projects[pIndex].chats[cIndex].htmlSnapshot = html;
    projects[pIndex].chats[cIndex].textSnapshot = text;
    projects[pIndex].chats[cIndex].preview = clean(text || projects[pIndex].chats[cIndex].preview || "Empty project chat", 180);
    projects[pIndex].chats[cIndex].updatedAt = now();

    if (
      (!projects[pIndex].chats[cIndex].title || projects[pIndex].chats[cIndex].title === "New project chat") &&
      text
    ) {
      projects[pIndex].chats[cIndex].title = clean(text, 80);
    }

    projects[pIndex].updatedAt = now();

    writeProjects(projects);

    try {
      if (window.sabiProjectsV88?.render) window.sabiProjectsV88.render();
      if (window.sabiProjectsV90?.render) window.sabiProjectsV90.render();
      if (window.sabiProjectsV106?.render) window.sabiProjectsV106.render();
    } catch (_) {}

    writeReport("autosave-" + (reason || "unknown"));

    return true;
  }

  function sidebarItems() {
    const sidebar = qs(".sidebar");
    if (!sidebar) return [];

    return all("button,[role='button'],li,article,.chat-item,.recent-chat,[data-chat-id],[data-conversation-id]").filter((el) => {
      if (!sidebar.contains(el)) return false;
      if (el.closest("#newChat,#projectsNav,#authNav,.side-nav,.sidebar-footer")) return false;
      return clean(el.innerText || el.textContent || "").length > 1;
    });
  }

  function sidebarTitle(el) {
    const title = el.querySelector("strong,.title,.chat-title,[data-title]");
    return clean(title?.innerText || title?.textContent || el.innerText || el.textContent || "", 120).toLowerCase();
  }

  function snapshotSidebarBaseline() {
    sidebarBaseline = new Map();

    sidebarItems().forEach((el) => {
      const title = sidebarTitle(el);
      if (!title) return;
      sidebarBaseline.set(title, (sidebarBaseline.get(title) || 0) + 1);
    });
  }

  function activeProjectChatTitles() {
    const { project } = currentProjectAndChat();
    const chats = Array.isArray(project?.chats) ? project.chats : [];

    const out = new Set();

    chats.forEach((chat) => {
      [chat.title, chat.preview, chat.textSnapshot].forEach((value) => {
        const t = clean(value || "", 120).toLowerCase();
        if (t.length >= 2) out.add(t);
      });
    });

    return out;
  }

  function removeProjectChatsFromSidebar(reason) {
    const titles = activeProjectChatTitles();
    if (!titles.size) return 0;

    const counts = new Map();

    sidebarItems().forEach((el) => {
      const title = sidebarTitle(el);
      if (!title) return;
      counts.set(title, (counts.get(title) || 0) + 1);
    });

    let removed = 0;

    sidebarItems().forEach((el) => {
      const title = sidebarTitle(el);
      if (!title) return;

      const before = sidebarBaseline.get(title) || 0;
      const current = counts.get(title) || 0;
      const extra = current > before;

      let match = false;

      titles.forEach((projectTitle) => {
        if (!match && projectTitle && (title === projectTitle || title.includes(projectTitle) || projectTitle.includes(title))) {
          match = true;
        }
      });

      if (extra && match) {
        el.remove();
        counts.set(title, current - 1);
        removed++;
      }
    });

    if (removed) writeReport("sidebar-clean-" + (reason || "unknown"), { removed });

    return removed;
  }

  function observeMessageList() {
    const list = qs("#messageList");
    if (!list || list.dataset.v124Observed === "true") return;

    list.dataset.v124Observed = "true";

    const mo = new MutationObserver(function () {
      if (!isProjectChatMode()) return;

      clearTimeout(window.__sabiV124MessageTimer);
      window.__sabiV124MessageTimer = setTimeout(function () {
        saveActiveProjectChatSnapshot("message-mutation");
        removeProjectChatsFromSidebar("message-mutation");
      }, 600);
    });

    mo.observe(list, { childList: true, subtree: true, characterData: true });
  }

  function startAutosave() {
    clearInterval(autosaveTimer);

    autosaveTimer = setInterval(function () {
      if (!isProjectChatMode()) return;
      saveActiveProjectChatSnapshot("interval");
      removeProjectChatsFromSidebar("interval");
    }, 2000);
  }

  function writeReport(stage, extra) {
    try {
      const { project, chat } = currentProjectAndChat();

      localStorage.setItem(REPORT_KEY, JSON.stringify({
        at: now(),
        stage,
        projectMode: isProjectChatMode(),
        projectId: project?.id || "",
        projectTitle: project?.title || "",
        chatId: chat?.id || "",
        chatTitle: chat?.title || "",
        sidebarItems: sidebarItems().length,
        projectsCount: readProjects().length,
        cssChanged: false,
        designChanged: false,
        extra: extra || null
      }, null, 2));
    } catch (_) {}
  }

  function bind() {
    if (window.__sabiV124Bound) return;
    window.__sabiV124Bound = true;

    document.addEventListener("click", function (event) {
      if (event.target?.closest?.("#projectsNav,#newChat")) {
        saveActiveProjectChatSnapshot("nav-away");
        writeReport("nav-away");
      }

      if (event.target?.closest?.("#chatSend")) {
        if (isProjectChatMode()) {
          snapshotSidebarBaseline();
          setTimeout(() => removeProjectChatsFromSidebar("after-send-500"), 500);
          setTimeout(() => removeProjectChatsFromSidebar("after-send-1500"), 1500);
          setTimeout(() => removeProjectChatsFromSidebar("after-send-4000"), 4000);
        }
      }
    }, true);

    document.addEventListener("submit", function (event) {
      if (event.target?.id === "chatComposer" && isProjectChatMode()) {
        snapshotSidebarBaseline();
        setTimeout(() => saveActiveProjectChatSnapshot("after-chat-submit"), 1000);
        setTimeout(() => removeProjectChatsFromSidebar("after-chat-submit"), 1200);
      }
    }, true);

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) saveActiveProjectChatSnapshot("visibility-hidden");
    });

    window.addEventListener("beforeunload", function () {
      saveActiveProjectChatSnapshot("beforeunload");
    });
  }

  function boot() {
    repairProjectsStorage();
    snapshotSidebarBaseline();
    observeMessageList();
    startAutosave();
    bind();
    writeReport("boot");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }

  window.sabiProjectsV124 = {
    repairProjectsStorage,
    saveActiveProjectChatSnapshot,
    removeProjectChatsFromSidebar,
    writeReport
  };
})();

/* v125 Projects real buttons: JS-only, no CSS/design changes */
(function () {
  if (window.__sabiV125ProjectsRealButtons) return;
  window.__sabiV125ProjectsRealButtons = true;

  const PROJECTS_KEY = "sabi-ai-studio-projects-v88";
  const ACTIVE_PROJECT_KEY = "sabi-ai-studio-active-project-v106";
  const ACTIVE_CHAT_KEY = "sabi-ai-studio-active-project-chat-v123";
  const REPORT_KEY = "sabi-ai-studio-v125-projects-real-buttons-report";

  let draftFiles = [];

  function qs(s) { return document.querySelector(s); }
  function all(s) { return Array.from(document.querySelectorAll(s)); }

  function uid(prefix) {
    return prefix + "-" + Date.now() + "-" + Math.random().toString(36).slice(2, 8);
  }

  function now() {
    return new Date().toISOString();
  }

  function clean(text, max) {
    let value = String(text || "").replace(/\s+/g, " ").trim();
    if (max && value.length > max) value = value.slice(0, max).trim() + "…";
    return value;
  }

  function norm(text) {
    return clean(text || "").toLowerCase();
  }

  function readProjects() {
    try {
      const list = JSON.parse(localStorage.getItem(PROJECTS_KEY) || "[]");
      return Array.isArray(list) ? list : [];
    } catch (_) {
      return [];
    }
  }

  function writeProjects(projects) {
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(Array.isArray(projects) ? projects : []));
  }

  function activeProjectId() {
    return localStorage.getItem(ACTIVE_PROJECT_KEY) || readProjects()[0]?.id || "";
  }

  function setActiveProject(id) {
    localStorage.setItem(ACTIVE_PROJECT_KEY, id || "");
  }

  function setActiveChat(id) {
    localStorage.setItem(ACTIVE_CHAT_KEY, id || "");
  }

  function activeProject() {
    const projects = readProjects();
    const id = activeProjectId();
    return projects.find((p) => p.id === id) || projects[0] || null;
  }

  function projectScreen() {
    return qs("#projectsScreenV88") || qs("#projectsScreenV106");
  }

  function projectComposer() {
    const screen = projectScreen();
    return qs("#projectComposerV106") || qs("#projectNewChatFormV88") || screen?.querySelector("form");
  }

  function projectInput() {
    const screen = projectScreen();
    return (
      qs("#projectPromptV106") ||
      qs("#projectNewChatInputV88") ||
      screen?.querySelector("textarea") ||
      Array.from(screen?.querySelectorAll("input") || []).find((i) => {
        const ph = norm(i.placeholder);
        return i.type !== "file" && !ph.includes("project name") && !ph.includes("name");
      })
    );
  }

  function projectNameInput() {
    const screen = projectScreen();
    return Array.from(screen?.querySelectorAll("input") || []).find((i) => {
      const ph = norm(i.placeholder);
      return ph.includes("project name") || ph.includes("name");
    });
  }

  function projectDraftText() {
    const input = projectInput();
    if (!input) return "";
    return clean("value" in input ? input.value : input.textContent);
  }

  function clearProjectDraft() {
    const input = projectInput();
    if (!input) return;

    if ("value" in input) input.value = "";
    else input.textContent = "";

    input.dispatchEvent(new Event("input", { bubbles: true }));
  }

  function updateProject(projectId, updater) {
    const projects = readProjects();
    const index = projects.findIndex((p) => p.id === projectId);
    if (index < 0) return null;

    projects[index].chats = Array.isArray(projects[index].chats) ? projects[index].chats : [];
    updater(projects[index], projects);
    projects[index].updatedAt = now();

    writeProjects(projects);
    return projects[index];
  }

  function refreshProjects(reason) {
    try {
      if (window.sabiProjectsV88?.render) window.sabiProjectsV88.render();
      if (window.sabiProjectsV90?.render) window.sabiProjectsV90.render();
      if (window.sabiProjectsV106?.render) window.sabiProjectsV106.render();
      if (window.sabiProjectsV115?.enhance) window.sabiProjectsV115.enhance();
    } catch (_) {}

    writeReport("refresh-" + (reason || "manual"));
  }

  function createProject(name) {
    const projects = readProjects();

    const title = clean(name || projectNameInput()?.value || prompt("Project name:") || "Untitled project", 90);

    const project = {
      id: uid("project"),
      title,
      createdAt: now(),
      updatedAt: now(),
      chats: []
    };

    projects.unshift(project);
    writeProjects(projects);
    setActiveProject(project.id);

    const input = projectNameInput();
    if (input) input.value = "";

    refreshProjects("create-project");
    writeReport("create-project", { projectId: project.id, title });

    return project;
  }

  function ensureProject() {
    const existing = activeProject();
    if (existing) return existing;
    return createProject("SABI");
  }

  function createProjectChat(title, draftText, files) {
    const project = ensureProject();
    const chatId = uid("project-chat");
    const safeTitle = clean(title || draftText || "New project chat", 80);

    updateProject(project.id, (p) => {
      p.chats = Array.isArray(p.chats) ? p.chats : [];

      p.chats.unshift({
        id: chatId,
        projectId: p.id,
        title: safeTitle,
        preview: draftText ? clean(draftText, 180) : "Empty project chat",
        createdAt: now(),
        updatedAt: now(),
        htmlSnapshot: "",
        textSnapshot: "",
        files: Array.from(files || []).map((file) => ({
          name: file.name,
          type: file.type || "application/octet-stream",
          size: file.size || 0,
          addedAt: now()
        }))
      });
    });

    const updated = readProjects().find((p) => p.id === project.id);
    const chat = updated?.chats?.find((c) => c.id === chatId);

    setActiveProject(project.id);
    setActiveChat(chatId);

    return { project: updated, chat };
  }

  function setChatEditor(text) {
    const editor = qs("#chatEditor");
    if (!editor) return;

    if ("value" in editor) editor.value = text || "";
    else editor.textContent = text || "";

    editor.dispatchEvent(new InputEvent("input", {
      bubbles: true,
      cancelable: true,
      inputType: "insertText",
      data: text || ""
    }));

    editor.dispatchEvent(new Event("change", { bubbles: true }));
  }

  function transferFiles(files) {
    const input = qs("#fileInput");
    const list = Array.from(files || []);
    if (!input || !list.length) return;

    try {
      const dt = new DataTransfer();
      list.forEach((file) => dt.items.add(file));
      input.files = dt.files;
      input.dispatchEvent(new Event("change", { bubbles: true }));
    } catch (_) {}
  }

  function openChat(project, chat, draftText, files) {
    if (!project || !chat) return;

    if (window.sabiProjectsV123?.openProjectChat) {
      window.sabiProjectsV123.openProjectChat(project, chat, draftText || "", files || []);
      return;
    }

    if (window.sabiV122ScreenIsolation?.openChat) {
      window.sabiV122ScreenIsolation.openChat(true);
    } else {
      const main = qs(".main-center");
      const projects = projectScreen();
      const chatScreen = qs("#chatScreen");
      if (main) main.hidden = true;
      if (projects) projects.hidden = true;
      if (chatScreen) chatScreen.hidden = false;
    }

    const title = qs("#chatTitle");
    const list = qs("#messageList");

    if (title) title.textContent = chat.title || "Project chat";
    if (list) list.innerHTML = chat.htmlSnapshot || "";

    setChatEditor(draftText || "");
    transferFiles(files || []);

    const app = qs("#app");
    if (app) {
      app.dataset.sabiProjectChat = "true";
      app.dataset.sabiProjectId = project.id;
      app.dataset.sabiProjectChatId = chat.id;
    }
  }

  function startNewProjectChat() {
    const draftText = projectDraftText();
    const files = draftFiles.slice();

    if (window.sabiProjectsV123?.startNewProjectChat && !files.length) {
      window.sabiProjectsV123.startNewProjectChat();
      writeReport("new-project-chat-v123");
      return;
    }

    const created = createProjectChat(draftText || "New project chat", draftText, files);
    openChat(created.project, created.chat, draftText, files);

    draftFiles = [];
    clearProjectDraft();

    refreshProjects("new-chat");
    writeReport("new-project-chat", { chatId: created.chat?.id || "" });
  }

  function projectRows() {
    return all(".project-chat-row-v88,.project-chat-row-v106");
  }

  function chatByRow(row) {
    const project = activeProject();
    const rows = projectRows();
    const index = rows.indexOf(row);
    const chat = project?.chats?.[index] || null;
    return { project, chat, index };
  }

  function openChatRow(row) {
    const { project, chat } = chatByRow(row);
    if (!project || !chat) return;
    openChat(project, chat, "", []);
    writeReport("open-chat-row", { chatId: chat.id });
  }

  function renameChatRow(row) {
    const { project, chat } = chatByRow(row);
    if (!project || !chat) return;

    const next = prompt("Chat title:", chat.title || "");
    if (next === null) return;

    updateProject(project.id, (p) => {
      const c = p.chats.find((x) => x.id === chat.id);
      if (!c) return;
      c.title = clean(next || "Project chat", 90);
      c.updatedAt = now();
    });

    refreshProjects("rename-chat");
  }

  function deleteChatRow(row) {
    const { project, chat } = chatByRow(row);
    if (!project || !chat) return;

    if (!confirm("Delete this project chat?")) return;

    updateProject(project.id, (p) => {
      p.chats = p.chats.filter((c) => c.id !== chat.id);
    });

    refreshProjects("delete-chat");
  }

  function downloadBlob(filename, content, type) {
    const blob = content instanceof Blob ? content : new Blob([String(content || "")], { type: type || "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();

    setTimeout(() => URL.revokeObjectURL(url), 700);
  }

  function exportProject(format) {
    const project = activeProject();
    if (!project) return;

    if (format === "json") {
      downloadBlob(
        "sabi-project-" + clean(project.title || project.id, 40).replace(/[^\w\-]+/g, "-") + ".json",
        JSON.stringify(project, null, 2),
        "application/json;charset=utf-8"
      );
      return;
    }

    const lines = [
      "Sabi AI Studio Project Export",
      "Project: " + (project.title || ""),
      "Project ID: " + project.id,
      "Chats: " + (project.chats || []).length,
      "",
    ];

    (project.chats || []).forEach((chat, i) => {
      lines.push("---- Chat " + (i + 1) + " ----");
      lines.push("Title: " + (chat.title || ""));
      lines.push("Preview: " + (chat.preview || ""));
      lines.push("Text: " + (chat.textSnapshot || ""));
      lines.push("");
    });

    downloadBlob(
      "sabi-project-" + clean(project.title || project.id, 40).replace(/[^\w\-]+/g, "-") + ".txt",
      lines.join("\n"),
      "text/plain;charset=utf-8"
    );
  }

  function exportChatRow(row) {
    const { project, chat } = chatByRow(row);
    if (!project || !chat) return;

    downloadBlob(
      "sabi-project-chat-" + clean(chat.title || chat.id, 40).replace(/[^\w\-]+/g, "-") + ".txt",
      [
        "Sabi AI Studio Project Chat",
        "Project: " + (project.title || ""),
        "Chat: " + (chat.title || ""),
        "Chat ID: " + chat.id,
        "",
        chat.textSnapshot || chat.preview || ""
      ].join("\n"),
      "text/plain;charset=utf-8"
    );
  }

  function downloadChatFiles(row) {
    const { chat } = chatByRow(row);
    if (!chat) return;

    const files = Array.isArray(chat.files) ? chat.files : [];

    if (!files.length) {
      alert("No files saved in this project chat.");
      return;
    }

    const downloadable = files.filter((f) => f.dataUrl || f.base64 || f.content);

    if (downloadable.length) {
      downloadable.forEach((file, index) => {
        if (file.dataUrl) {
          const a = document.createElement("a");
          a.href = file.dataUrl;
          a.download = file.name || ("project-file-" + (index + 1));
          document.body.appendChild(a);
          a.click();
          a.remove();
        } else {
          downloadBlob(file.name || ("project-file-" + (index + 1)), file.base64 || file.content || "", file.type || "application/octet-stream");
        }
      });
      return;
    }

    downloadBlob(
      "project-files-manifest-" + clean(chat.title || chat.id, 40).replace(/[^\w\-]+/g, "-") + ".json",
      JSON.stringify({
        note: "This chat has saved file metadata only. Original browser File objects are not available after reload.",
        files
      }, null, 2),
      "application/json;charset=utf-8"
    );
  }

  async function copyProjectInfo() {
    const project = activeProject();
    if (!project) return;

    const text = JSON.stringify({
      id: project.id,
      title: project.title,
      chats: (project.chats || []).length
    }, null, 2);

    try {
      await navigator.clipboard.writeText(text);
      writeReport("copy-project-info");
    } catch (_) {
      downloadBlob("project-info.txt", text, "text/plain;charset=utf-8");
    }
  }

  function renameProject() {
    const project = activeProject();
    if (!project) return;

    const next = prompt("Project name:", project.title || "");
    if (next === null) return;

    updateProject(project.id, (p) => {
      p.title = clean(next || "Project", 90);
    });

    refreshProjects("rename-project");
  }

  function deleteProject() {
    const project = activeProject();
    if (!project) return;

    if (!confirm("Delete this project and all chats inside it?")) return;

    const projects = readProjects().filter((p) => p.id !== project.id);
    writeProjects(projects);
    setActiveProject(projects[0]?.id || "");

    refreshProjects("delete-project");
  }

  function showSources() {
    const project = activeProject();
    if (!project) return;

    const files = [];

    (project.chats || []).forEach((chat) => {
      (chat.files || []).forEach((file) => {
        files.push({
          chat: chat.title || chat.id,
          name: file.name,
          type: file.type,
          size: file.size
        });
      });
    });

    if (!files.length) {
      alert("Sources: no saved files in this project yet.");
      return;
    }

    downloadBlob(
      "sabi-project-sources-" + clean(project.title || project.id, 40).replace(/[^\w\-]+/g, "-") + ".json",
      JSON.stringify(files, null, 2),
      "application/json;charset=utf-8"
    );
  }

  function inferAction(btn) {
    const txt = norm(btn.innerText || btn.textContent || btn.getAttribute("aria-label") || btn.title || "");

    if (txt.includes("create")) return "create-project";
    if (txt.includes("new project") || txt.includes("новый проект")) return "new-project";
    if (txt.includes("new chat") || txt.includes("новый чат")) return "new-chat";
    if (txt.includes("open") || txt.includes("открыть")) return "open-chat";
    if (txt.includes("rename") || txt.includes("переимен")) return "rename";
    if (txt.includes("delete") || txt.includes("удал")) return "delete";
    if (txt.includes("download files") || txt.includes("скачать файлы")) return "download-files";
    if (txt.includes("export json")) return "export-json";
    if (txt.includes("export txt") || txt === "export") return "export-txt";
    if (txt.includes("download")) return "download-files";
    if (txt.includes("copy") || txt.includes("копир")) return "copy";
    if (txt.includes("refresh") || txt.includes("обнов")) return "refresh";
    if (txt.includes("источ")) return "sources";
    if (txt.includes("чаты")) return "chats";
    if (txt.includes("📎") || txt.includes("attach")) return "attach";
    if (txt.includes("🎙") || txt.includes("mic") || txt.includes("voice")) return "mic";
    if (txt.includes("↗") || txt.includes("send") || txt.includes("start")) return "send";

    return "";
  }

  function hiddenFileInput() {
    let input = qs("#projectFileInputV125");
    if (input) return input;

    input = document.createElement("input");
    input.id = "projectFileInputV125";
    input.type = "file";
    input.multiple = true;
    input.hidden = true;
    document.body.appendChild(input);

    input.addEventListener("change", function () {
      draftFiles = draftFiles.concat(Array.from(input.files || []));
      input.value = "";
      writeReport("project-files-selected", {
        files: draftFiles.map((f) => ({ name: f.name, type: f.type, size: f.size }))
      });
    });

    return input;
  }

  function handleAction(action, btn) {
    const row = btn.closest(".project-chat-row-v88,.project-chat-row-v106");
    const inComposer = !!btn.closest("#projectComposerV106,#projectNewChatFormV88");

    if (action === "create-project" || action === "new-project") {
      createProject();
      return true;
    }

    if (action === "send" || (inComposer && !action)) {
      startNewProjectChat();
      return true;
    }

    if (action === "attach") {
      hiddenFileInput().click();
      return true;
    }

    if (action === "mic") {
      startNewProjectChat();
      setTimeout(function () {
        qs("#chatMic")?.click();
      }, 450);
      return true;
    }

    if (action === "new-chat") {
      startNewProjectChat();
      return true;
    }

    if (action === "open-chat" && row) {
      openChatRow(row);
      return true;
    }

    if (action === "rename" && row) {
      renameChatRow(row);
      return true;
    }

    if (action === "rename") {
      renameProject();
      return true;
    }

    if (action === "delete" && row) {
      deleteChatRow(row);
      return true;
    }

    if (action === "delete") {
      deleteProject();
      return true;
    }

    if (action === "download-files" && row) {
      downloadChatFiles(row);
      return true;
    }

    if (action === "download-files") {
      showSources();
      return true;
    }

    if (action === "export-json") {
      exportProject("json");
      return true;
    }

    if (action === "export-txt") {
      if (row) exportChatRow(row);
      else exportProject("txt");
      return true;
    }

    if (action === "copy") {
      copyProjectInfo();
      return true;
    }

    if (action === "refresh") {
      refreshProjects("button");
      return true;
    }

    if (action === "sources") {
      showSources();
      return true;
    }

    if (action === "chats") {
      refreshProjects("tab-chats");
      return true;
    }

    return false;
  }

  function bind() {
    if (window.__sabiV125Bound) return;
    window.__sabiV125Bound = true;

    document.addEventListener("click", function (event) {
      const screen = projectScreen();
      if (!screen || !screen.contains(event.target)) return;

      const btn = event.target.closest("button,[role='button']");
      if (!btn || !screen.contains(btn)) return;

      const action = inferAction(btn);
      const handled = handleAction(action, btn);

      if (handled) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    }, true);

    document.addEventListener("submit", function (event) {
      const form = event.target;
      if (form !== projectComposer()) return;

      event.preventDefault();
      event.stopImmediatePropagation();
      startNewProjectChat();
    }, true);

    document.addEventListener("keydown", function (event) {
      if (event.target === projectInput() && event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        event.stopImmediatePropagation();
        startNewProjectChat();
      }
    }, true);
  }

  function writeReport(stage, extra) {
    try {
      const project = activeProject();

      localStorage.setItem(REPORT_KEY, JSON.stringify({
        at: now(),
        stage,
        projectId: project?.id || "",
        projectTitle: project?.title || "",
        chats: project?.chats?.length || 0,
        draftFiles: draftFiles.map((f) => ({ name: f.name, type: f.type, size: f.size })),
        cssChanged: false,
        designChanged: false,
        extra: extra || null
      }, null, 2));
    } catch (_) {}
  }

  function boot() {
    hiddenFileInput();
    bind();
    writeReport("boot");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }

  window.sabiProjectsV125 = {
    createProject,
    startNewProjectChat,
    refreshProjects,
    exportProject,
    writeReport
  };
})();

/* v126 Project integrity backup memory: JS-only, no CSS/design changes */
(function () {
  if (window.__sabiV126ProjectIntegrityBackupMemory) return;
  window.__sabiV126ProjectIntegrityBackupMemory = true;

  const PROJECTS_KEY = "sabi-ai-studio-projects-v88";
  const ACTIVE_PROJECT_KEY = "sabi-ai-studio-active-project-v106";
  const ACTIVE_CHAT_KEY = "sabi-ai-studio-active-project-chat-v123";
  const BACKUP_KEY = "sabi-ai-studio-projects-backups-v126";
  const INDEX_KEY = "sabi-ai-studio-projects-index-v126";
  const REPORT_KEY = "sabi-ai-studio-v126-project-integrity-report";

  function qs(s) { return document.querySelector(s); }
  function all(s) { return Array.from(document.querySelectorAll(s)); }

  function now() {
    return new Date().toISOString();
  }

  function uid(prefix) {
    return prefix + "-" + Date.now() + "-" + Math.random().toString(36).slice(2, 8);
  }

  function clean(text, max) {
    let value = String(text || "").replace(/\s+/g, " ").trim();
    if (max && value.length > max) value = value.slice(0, max).trim() + "…";
    return value;
  }

  function readJson(key, fallback) {
    try {
      const parsed = JSON.parse(localStorage.getItem(key) || "");
      return parsed ?? fallback;
    } catch (_) {
      return fallback;
    }
  }

  function writeJson(key, value) {
    localStorage.setItem(key, JSON.stringify(value, null, 2));
  }

  function readProjects() {
    const list = readJson(PROJECTS_KEY, []);
    return Array.isArray(list) ? list : [];
  }

  function writeProjects(projects) {
    writeJson(PROJECTS_KEY, Array.isArray(projects) ? projects : []);
  }

  function activeProjectId() {
    return localStorage.getItem(ACTIVE_PROJECT_KEY) || readProjects()[0]?.id || "";
  }

  function activeChatId() {
    return localStorage.getItem(ACTIVE_CHAT_KEY) || "";
  }

  function activeProject() {
    const projects = readProjects();
    const id = activeProjectId();
    return projects.find((p) => p.id === id) || projects[0] || null;
  }

  function activeChat(project) {
    const id = activeChatId() || qs("#app")?.dataset?.sabiProjectChatId || "";
    return (project?.chats || []).find((c) => c.id === id) || null;
  }

  function downloadBlob(filename, content, type) {
    const blob = content instanceof Blob ? content : new Blob([String(content || "")], { type: type || "application/json;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();

    setTimeout(() => URL.revokeObjectURL(url), 700);
  }

  function backupProjects(reason) {
    const projects = readProjects();
    const backups = readJson(BACKUP_KEY, []);

    const backup = {
      id: uid("project-backup"),
      at: now(),
      reason: reason || "manual",
      projects
    };

    backups.unshift(backup);

    while (backups.length > 20) backups.pop();

    writeJson(BACKUP_KEY, backups);

    writeReport("backup-created", {
      backupId: backup.id,
      reason: backup.reason,
      projectsCount: projects.length
    });

    return backup;
  }

  function restoreLatestBackup() {
    const backups = readJson(BACKUP_KEY, []);
    const latest = backups[0];

    if (!latest || !Array.isArray(latest.projects)) {
      alert("No project backup found.");
      return false;
    }

    backupProjects("before-restore-latest");
    writeProjects(latest.projects);
    rebuildIndex("restore-latest-backup");

    try {
      if (window.sabiProjectsV88?.render) window.sabiProjectsV88.render();
      if (window.sabiProjectsV90?.render) window.sabiProjectsV90.render();
      if (window.sabiProjectsV106?.render) window.sabiProjectsV106.render();
    } catch (_) {}

    writeReport("restore-latest-backup", { backupId: latest.id });
    return true;
  }

  function exportAllProjectsJson() {
    const payload = {
      exportedAt: now(),
      version: "v126",
      projects: readProjects(),
      index: readJson(INDEX_KEY, {})
    };

    downloadBlob(
      "sabi-ai-studio-projects-export-" + Date.now() + ".json",
      JSON.stringify(payload, null, 2),
      "application/json;charset=utf-8"
    );

    writeReport("export-all-projects-json");
  }

  function exportAllProjectsTxt() {
    const projects = readProjects();
    const lines = [
      "Sabi AI Studio Projects Export",
      "Exported: " + now(),
      "Projects: " + projects.length,
      ""
    ];

    projects.forEach((project, pIndex) => {
      lines.push("==================================================");
      lines.push("Project " + (pIndex + 1) + ": " + (project.title || "Untitled"));
      lines.push("Project ID: " + project.id);
      lines.push("Chats: " + ((project.chats || []).length));
      lines.push("");

      (project.chats || []).forEach((chat, cIndex) => {
        lines.push("---- Chat " + (cIndex + 1) + " ----");
        lines.push("Title: " + (chat.title || ""));
        lines.push("Created: " + (chat.createdAt || ""));
        lines.push("Updated: " + (chat.updatedAt || ""));
        lines.push("Preview: " + (chat.preview || ""));
        lines.push("Text:");
        lines.push(chat.textSnapshot || "");
        lines.push("");
      });
    });

    downloadBlob(
      "sabi-ai-studio-projects-export-" + Date.now() + ".txt",
      lines.join("\n"),
      "text/plain;charset=utf-8"
    );

    writeReport("export-all-projects-txt");
  }

  function repairProjects(reason) {
    const projects = readProjects();
    let changed = false;
    const findings = [];

    const projectIds = new Set();

    projects.forEach((project, pIndex) => {
      if (!project || typeof project !== "object") {
        findings.push("Invalid project object at index " + pIndex);
        changed = true;
        return;
      }

      if (!project.id || projectIds.has(project.id)) {
        project.id = uid("project");
        changed = true;
        findings.push("Fixed project id at index " + pIndex);
      }

      projectIds.add(project.id);

      if (!project.title) {
        project.title = "Untitled project";
        changed = true;
        findings.push("Fixed project title: " + project.id);
      }

      if (!project.createdAt) {
        project.createdAt = now();
        changed = true;
      }

      if (!project.updatedAt) {
        project.updatedAt = project.createdAt || now();
        changed = true;
      }

      if (!Array.isArray(project.chats)) {
        project.chats = [];
        changed = true;
        findings.push("Fixed chats[] for project: " + project.id);
      }

      const chatIds = new Set();

      project.chats = project.chats.filter((chat, cIndex) => {
        if (!chat || typeof chat !== "object") {
          findings.push("Removed invalid chat at project " + project.id + " index " + cIndex);
          changed = true;
          return false;
        }

        if (!chat.id || chatIds.has(chat.id)) {
          chat.id = uid("project-chat");
          changed = true;
          findings.push("Fixed chat id in project: " + project.id);
        }

        chatIds.add(chat.id);

        if (!chat.projectId) {
          chat.projectId = project.id;
          changed = true;
        }

        if (chat.projectId !== project.id) {
          chat.projectId = project.id;
          changed = true;
          findings.push("Fixed chat projectId: " + chat.id);
        }

        if (!chat.title) {
          chat.title = clean(chat.preview || chat.textSnapshot || "New project chat", 80);
          changed = true;
        }

        if (!chat.preview) {
          chat.preview = clean(chat.textSnapshot || "Empty project chat", 180);
          changed = true;
        }

        if (typeof chat.htmlSnapshot !== "string") {
          chat.htmlSnapshot = "";
          changed = true;
        }

        if (typeof chat.textSnapshot !== "string") {
          chat.textSnapshot = "";
          changed = true;
        }

        if (!Array.isArray(chat.files)) {
          chat.files = [];
          changed = true;
        }

        if (!chat.createdAt) {
          chat.createdAt = now();
          changed = true;
        }

        if (!chat.updatedAt) {
          chat.updatedAt = chat.createdAt || now();
          changed = true;
        }

        return true;
      });
    });

    if (changed) {
      backupProjects("before-repair-" + (reason || "manual"));
      writeProjects(projects);
    }

    rebuildIndex("repair-" + (reason || "manual"));

    writeReport("repair-projects", {
      changed,
      findings
    });

    return { changed, findings };
  }

  function rebuildIndex(reason) {
    const projects = readProjects();

    const index = {
      builtAt: now(),
      reason: reason || "manual",
      projectsCount: projects.length,
      chatsCount: 0,
      filesCount: 0,
      projects: {},
      chats: {},
      files: [],
      memory: {}
    };

    projects.forEach((project) => {
      const chats = Array.isArray(project.chats) ? project.chats : [];

      index.projects[project.id] = {
        id: project.id,
        title: project.title || "",
        chatsCount: chats.length,
        updatedAt: project.updatedAt || ""
      };

      const memoryLines = [
        "Project: " + (project.title || "Project"),
        "Chats: " + chats.length
      ];

      chats.forEach((chat) => {
        index.chats[chat.id] = {
          id: chat.id,
          projectId: project.id,
          title: chat.title || "",
          preview: chat.preview || "",
          updatedAt: chat.updatedAt || "",
          filesCount: Array.isArray(chat.files) ? chat.files.length : 0
        };

        index.chatsCount++;

        const text = clean(chat.textSnapshot || chat.preview || chat.title || "", 1000);
        if (text) memoryLines.push("- " + text);

        (chat.files || []).forEach((file) => {
          index.filesCount++;
          index.files.push({
            projectId: project.id,
            projectTitle: project.title || "",
            chatId: chat.id,
            chatTitle: chat.title || "",
            name: file.name || "",
            type: file.type || "",
            size: file.size || 0,
            addedAt: file.addedAt || ""
          });
        });
      });

      index.memory[project.id] = memoryLines.join("\n");
    });

    writeJson(INDEX_KEY, index);
    writeReport("rebuild-index", {
      projectsCount: index.projectsCount,
      chatsCount: index.chatsCount,
      filesCount: index.filesCount
    });

    return index;
  }

  function downloadSourcesManifest() {
    const index = rebuildIndex("download-sources-manifest");

    downloadBlob(
      "sabi-project-sources-manifest-" + Date.now() + ".json",
      JSON.stringify(index.files, null, 2),
      "application/json;charset=utf-8"
    );
  }

  function downloadMemoryManifest() {
    const index = rebuildIndex("download-memory-manifest");

    downloadBlob(
      "sabi-project-memory-index-" + Date.now() + ".json",
      JSON.stringify(index.memory, null, 2),
      "application/json;charset=utf-8"
    );
  }

  function activeChatSnapshotSave(reason) {
    const app = qs("#app");
    const projectId = app?.dataset?.sabiProjectId || activeProjectId();
    const chatId = app?.dataset?.sabiProjectChatId || activeChatId();
    const list = qs("#messageList");

    if (!projectId || !chatId || !list) return false;

    const projects = readProjects();
    const pIndex = projects.findIndex((p) => p.id === projectId);
    if (pIndex < 0) return false;

    const chats = Array.isArray(projects[pIndex].chats) ? projects[pIndex].chats : [];
    const cIndex = chats.findIndex((c) => c.id === chatId);
    if (cIndex < 0) return false;

    chats[cIndex].htmlSnapshot = list.innerHTML || "";
    chats[cIndex].textSnapshot = clean(list.innerText || list.textContent || "", 9000);
    chats[cIndex].preview = clean(chats[cIndex].textSnapshot || chats[cIndex].preview || "Empty project chat", 180);
    chats[cIndex].updatedAt = now();

    if ((!chats[cIndex].title || chats[cIndex].title === "New project chat") && chats[cIndex].preview) {
      chats[cIndex].title = clean(chats[cIndex].preview, 80);
    }

    projects[pIndex].chats = chats;
    projects[pIndex].updatedAt = now();

    writeProjects(projects);
    rebuildIndex("active-chat-save-" + (reason || "manual"));

    writeReport("active-chat-snapshot-save", {
      reason,
      projectId,
      chatId
    });

    return true;
  }

  function removeProjectChatsFromSidebar(reason) {
    const index = rebuildIndex("sidebar-clean-index");
    const sidebar = qs(".sidebar");
    if (!sidebar) return 0;

    const titles = new Set();

    Object.values(index.chats || {}).forEach((chat) => {
      [chat.title, chat.preview].forEach((value) => {
        const t = clean(value || "", 120).toLowerCase();
        if (t.length >= 3) titles.add(t);
      });
    });

    let removed = 0;

    all("button,[role='button'],li,article,.chat-item,.recent-chat,[data-chat-id],[data-conversation-id]").forEach((el) => {
      if (!sidebar.contains(el)) return;
      if (el.closest("#newChat,#projectsNav,#authNav,.side-nav,.sidebar-footer")) return;

      const text = clean(el.innerText || el.textContent || "", 120).toLowerCase();
      if (!text) return;

      let match = false;

      titles.forEach((t) => {
        if (!match && t && (text === t || text.includes(t) || t.includes(text))) match = true;
      });

      if (match && qs("#app")?.dataset?.sabiProjectChat === "true") {
        el.remove();
        removed++;
      }
    });

    if (removed) {
      writeReport("sidebar-project-clean", { reason, removed });
    }

    return removed;
  }

  function selfTest() {
    const projects = readProjects();
    const index = rebuildIndex("self-test");
    const report = {
      at: now(),
      projectsCount: projects.length,
      chatsCount: index.chatsCount,
      filesCount: index.filesCount,
      activeProjectId: activeProjectId(),
      activeChatId: activeChatId(),
      projectScreenExists: !!(qs("#projectsScreenV88") || qs("#projectsScreenV106")),
      chatScreenExists: !!qs("#chatScreen"),
      mainScreenExists: !!qs(".main-center"),
      designChanged: false,
      cssChanged: false,
      storageOk: Array.isArray(projects),
      indexOk: !!index && typeof index === "object"
    };

    writeJson(REPORT_KEY, {
      stage: "self-test",
      ...report
    });

    return report;
  }

  function writeReport(stage, extra) {
    try {
      const project = activeProject();

      writeJson(REPORT_KEY, {
        at: now(),
        stage,
        activeProjectId: activeProjectId(),
        activeProjectTitle: project?.title || "",
        projectsCount: readProjects().length,
        backupsCount: readJson(BACKUP_KEY, []).length,
        designChanged: false,
        cssChanged: false,
        extra: extra || null
      });
    } catch (_) {}
  }

  function bind() {
    if (window.__sabiV126Bound) return;
    window.__sabiV126Bound = true;

    document.addEventListener("click", function (event) {
      const text = clean(event.target?.innerText || event.target?.textContent || "").toLowerCase();

      if (text.includes("export") && text.includes("json")) {
        backupProjects("before-export-json");
      }

      if (text.includes("download files") || text.includes("sources") || text.includes("источ")) {
        rebuildIndex("before-sources-click");
      }

      if (text.includes("refresh") || text.includes("обнов")) {
        repairProjects("refresh-click");
      }

      if (text.includes("copy") || text.includes("копир")) {
        rebuildIndex("copy-click");
      }
    }, true);

    document.addEventListener("submit", function (event) {
      if (event.target?.id === "chatComposer") {
        setTimeout(() => activeChatSnapshotSave("chat-submit"), 800);
        setTimeout(() => removeProjectChatsFromSidebar("chat-submit"), 1200);
      }
    }, true);

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) activeChatSnapshotSave("visibility-hidden");
    });

    window.addEventListener("beforeunload", function () {
      activeChatSnapshotSave("beforeunload");
    });
  }

  function boot() {
    repairProjects("boot");
    backupProjects("boot");
    rebuildIndex("boot");
    bind();
    selfTest();

    setInterval(function () {
      activeChatSnapshotSave("interval");
      removeProjectChatsFromSidebar("interval");
    }, 3000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }

  window.sabiProjectsV126 = {
    backupProjects,
    restoreLatestBackup,
    exportAllProjectsJson,
    exportAllProjectsTxt,
    repairProjects,
    rebuildIndex,
    downloadSourcesManifest,
    downloadMemoryManifest,
    activeChatSnapshotSave,
    removeProjectChatsFromSidebar,
    selfTest
  };
})();

/* v126B project console bootstrap: JS-only, no CSS/design changes */
(function () {
  if (window.__sabiV126BProjectConsoleBootstrap) return;
  window.__sabiV126BProjectConsoleBootstrap = true;

  const PROJECTS_KEY = "sabi-ai-studio-projects-v88";
  const ACTIVE_PROJECT_KEY = "sabi-ai-studio-active-project-v106";
  const ACTIVE_CHAT_KEY = "sabi-ai-studio-active-project-chat-v123";
  const BACKUP_KEY = "sabi-ai-studio-projects-backups-v126";
  const INDEX_KEY = "sabi-ai-studio-projects-index-v126";
  const REPORT_KEY = "sabi-ai-studio-v126-project-integrity-report";

  function qs(s) { return document.querySelector(s); }
  function now() { return new Date().toISOString(); }

  function clean(text, max) {
    let v = String(text || "").replace(/\s+/g, " ").trim();
    if (max && v.length > max) v = v.slice(0, max).trim() + "…";
    return v;
  }

  function uid(prefix) {
    return prefix + "-" + Date.now() + "-" + Math.random().toString(36).slice(2, 8);
  }

  function readJson(key, fallback) {
    try {
      const value = JSON.parse(localStorage.getItem(key) || "");
      return value ?? fallback;
    } catch (_) {
      return fallback;
    }
  }

  function writeJson(key, value) {
    localStorage.setItem(key, JSON.stringify(value, null, 2));
  }

  function readProjects() {
    const value = readJson(PROJECTS_KEY, []);
    return Array.isArray(value) ? value : [];
  }

  function writeProjects(projects) {
    writeJson(PROJECTS_KEY, Array.isArray(projects) ? projects : []);
  }

  function activeProjectId() {
    return localStorage.getItem(ACTIVE_PROJECT_KEY) || readProjects()[0]?.id || "";
  }

  function activeChatId() {
    return localStorage.getItem(ACTIVE_CHAT_KEY) || qs("#app")?.dataset?.sabiProjectChatId || "";
  }

  function backupProjects(reason) {
    const backups = readJson(BACKUP_KEY, []);
    const item = {
      id: uid("project-backup"),
      at: now(),
      reason: reason || "manual",
      projects: readProjects()
    };

    backups.unshift(item);
    while (backups.length > 20) backups.pop();

    writeJson(BACKUP_KEY, backups);
    writeReport("backupProjects", { backupId: item.id, reason: item.reason });

    return item;
  }

  function restoreLatestBackup() {
    const backups = readJson(BACKUP_KEY, []);
    const latest = backups[0];

    if (!latest || !Array.isArray(latest.projects)) {
      writeReport("restoreLatestBackup:no-backup");
      alert("No project backup found.");
      return false;
    }

    backupProjects("before-restore-latest");
    writeProjects(latest.projects);
    rebuildIndex("restoreLatestBackup");
    refreshProjects();

    writeReport("restoreLatestBackup", { backupId: latest.id });
    return true;
  }

  function repairProjects(reason) {
    const projects = readProjects();
    let changed = false;
    const findings = [];

    projects.forEach((project, pIndex) => {
      if (!project.id) {
        project.id = uid("project");
        changed = true;
        findings.push("fixed project id " + pIndex);
      }

      if (!project.title) {
        project.title = "Untitled project";
        changed = true;
        findings.push("fixed project title " + project.id);
      }

      if (!project.createdAt) {
        project.createdAt = now();
        changed = true;
      }

      if (!project.updatedAt) {
        project.updatedAt = project.createdAt || now();
        changed = true;
      }

      if (!Array.isArray(project.chats)) {
        project.chats = [];
        changed = true;
        findings.push("fixed chats[] " + project.id);
      }

      const seenChats = new Set();

      project.chats = project.chats.filter((chat, cIndex) => {
        if (!chat || typeof chat !== "object") {
          changed = true;
          findings.push("removed invalid chat " + cIndex);
          return false;
        }

        if (!chat.id || seenChats.has(chat.id)) {
          chat.id = uid("project-chat");
          changed = true;
          findings.push("fixed chat id " + cIndex);
        }

        seenChats.add(chat.id);

        if (chat.projectId !== project.id) {
          chat.projectId = project.id;
          changed = true;
        }

        if (!chat.title) {
          chat.title = clean(chat.preview || chat.textSnapshot || "New project chat", 80);
          changed = true;
        }

        if (!chat.preview) {
          chat.preview = clean(chat.textSnapshot || "Empty project chat", 180);
          changed = true;
        }

        if (typeof chat.htmlSnapshot !== "string") {
          chat.htmlSnapshot = "";
          changed = true;
        }

        if (typeof chat.textSnapshot !== "string") {
          chat.textSnapshot = "";
          changed = true;
        }

        if (!Array.isArray(chat.files)) {
          chat.files = [];
          changed = true;
        }

        if (!chat.createdAt) {
          chat.createdAt = now();
          changed = true;
        }

        if (!chat.updatedAt) {
          chat.updatedAt = chat.createdAt || now();
          changed = true;
        }

        return true;
      });
    });

    if (changed) {
      backupProjects("before-repair-" + (reason || "manual"));
      writeProjects(projects);
    }

    const index = rebuildIndex("repairProjects");

    writeReport("repairProjects", {
      changed,
      findings,
      projectsCount: projects.length,
      chatsCount: index.chatsCount
    });

    return { changed, findings, index };
  }

  function rebuildIndex(reason) {
    const projects = readProjects();

    const index = {
      builtAt: now(),
      reason: reason || "manual",
      projectsCount: projects.length,
      chatsCount: 0,
      filesCount: 0,
      projects: {},
      chats: {},
      files: [],
      memory: {}
    };

    projects.forEach((project) => {
      const chats = Array.isArray(project.chats) ? project.chats : [];

      index.projects[project.id] = {
        id: project.id,
        title: project.title || "",
        chatsCount: chats.length,
        updatedAt: project.updatedAt || ""
      };

      const memory = [
        "Project: " + (project.title || "Project"),
        "Chats: " + chats.length
      ];

      chats.forEach((chat) => {
        index.chatsCount++;

        index.chats[chat.id] = {
          id: chat.id,
          projectId: project.id,
          title: chat.title || "",
          preview: chat.preview || "",
          updatedAt: chat.updatedAt || "",
          filesCount: Array.isArray(chat.files) ? chat.files.length : 0
        };

        const text = clean(chat.textSnapshot || chat.preview || chat.title || "", 1000);
        if (text) memory.push("- " + text);

        (chat.files || []).forEach((file) => {
          index.filesCount++;
          index.files.push({
            projectId: project.id,
            projectTitle: project.title || "",
            chatId: chat.id,
            chatTitle: chat.title || "",
            name: file.name || "",
            type: file.type || "",
            size: file.size || 0,
            addedAt: file.addedAt || ""
          });
        });
      });

      index.memory[project.id] = memory.join("\n");
    });

    writeJson(INDEX_KEY, index);

    writeReport("rebuildIndex", {
      reason,
      projectsCount: index.projectsCount,
      chatsCount: index.chatsCount,
      filesCount: index.filesCount
    });

    return index;
  }

  function saveActiveProjectChatSnapshot(reason) {
    const app = qs("#app");
    const projectId = app?.dataset?.sabiProjectId || activeProjectId();
    const chatId = app?.dataset?.sabiProjectChatId || activeChatId();
    const list = qs("#messageList");

    if (!projectId || !chatId || !list) {
      writeReport("saveActiveProjectChatSnapshot:skipped", { reason, projectId, chatId, hasMessageList: !!list });
      return false;
    }

    const projects = readProjects();
    const pIndex = projects.findIndex((p) => p.id === projectId);
    if (pIndex < 0) return false;

    const cIndex = (projects[pIndex].chats || []).findIndex((c) => c.id === chatId);
    if (cIndex < 0) return false;

    const text = clean(list.innerText || list.textContent || "", 9000);

    projects[pIndex].chats[cIndex].htmlSnapshot = list.innerHTML || "";
    projects[pIndex].chats[cIndex].textSnapshot = text;
    projects[pIndex].chats[cIndex].preview = clean(text || projects[pIndex].chats[cIndex].preview || "Empty project chat", 180);
    projects[pIndex].chats[cIndex].updatedAt = now();
    projects[pIndex].updatedAt = now();

    writeProjects(projects);
    rebuildIndex("saveActiveProjectChatSnapshot");

    return true;
  }

  function downloadBlob(filename, content, type) {
    const blob = new Blob([String(content || "")], { type: type || "application/json;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();

    setTimeout(() => URL.revokeObjectURL(url), 700);
  }

  function exportAllProjectsJson() {
    const payload = {
      exportedAt: now(),
      version: "v126B",
      projects: readProjects(),
      index: rebuildIndex("exportAllProjectsJson")
    };

    downloadBlob("sabi-ai-studio-projects-export-" + Date.now() + ".json", JSON.stringify(payload, null, 2));
    return payload;
  }

  function exportAllProjectsTxt() {
    const projects = readProjects();
    const lines = [
      "Sabi AI Studio Projects Export",
      "Exported: " + now(),
      "Projects: " + projects.length,
      ""
    ];

    projects.forEach((project, i) => {
      lines.push("Project " + (i + 1) + ": " + (project.title || ""));
      lines.push("ID: " + project.id);
      lines.push("Chats: " + ((project.chats || []).length));
      lines.push("");

      (project.chats || []).forEach((chat, n) => {
        lines.push("Chat " + (n + 1) + ": " + (chat.title || ""));
        lines.push(chat.textSnapshot || chat.preview || "");
        lines.push("");
      });
    });

    downloadBlob("sabi-ai-studio-projects-export-" + Date.now() + ".txt", lines.join("\n"), "text/plain;charset=utf-8");
    return lines.join("\n");
  }

  function downloadSourcesManifest() {
    const index = rebuildIndex("downloadSourcesManifest");
    downloadBlob("sabi-project-sources-manifest-" + Date.now() + ".json", JSON.stringify(index.files, null, 2));
    return index.files;
  }

  function downloadMemoryManifest() {
    const index = rebuildIndex("downloadMemoryManifest");
    downloadBlob("sabi-project-memory-index-" + Date.now() + ".json", JSON.stringify(index.memory, null, 2));
    return index.memory;
  }

  function refreshProjects() {
    try {
      window.sabiProjectsV88?.render?.();
      window.sabiProjectsV90?.render?.();
      window.sabiProjectsV106?.render?.();
      window.sabiProjectsV125?.refreshProjects?.("v126B");
    } catch (_) {}
  }

  function selfTest() {
    const projects = readProjects();
    const index = rebuildIndex("selfTest");

    const report = {
      at: now(),
      version: "v126B",
      loaded: true,
      globalDefined: !!window.sabiProjectsV126,
      projectsCount: projects.length,
      chatsCount: index.chatsCount,
      filesCount: index.filesCount,
      backupsCount: readJson(BACKUP_KEY, []).length,
      activeProjectId: activeProjectId(),
      activeChatId: activeChatId(),
      projectScreenExists: !!(qs("#projectsScreenV88") || qs("#projectsScreenV106")),
      chatScreenExists: !!qs("#chatScreen"),
      mainScreenExists: !!qs(".main-center"),
      storageOk: Array.isArray(projects),
      indexOk: !!index,
      cssChanged: false,
      designChanged: false
    };

    writeJson(REPORT_KEY, report);
    return report;
  }

  function writeReport(stage, extra) {
    try {
      writeJson(REPORT_KEY, {
        at: now(),
        version: "v126B",
        loaded: true,
        stage,
        activeProjectId: activeProjectId(),
        activeChatId: activeChatId(),
        projectsCount: readProjects().length,
        backupsCount: readJson(BACKUP_KEY, []).length,
        cssChanged: false,
        designChanged: false,
        extra: extra || null
      });
    } catch (_) {}
  }

  window.sabiProjectsV126 = {
    backupProjects,
    restoreLatestBackup,
    repairProjects,
    rebuildIndex,
    saveActiveProjectChatSnapshot,
    activeChatSnapshotSave: saveActiveProjectChatSnapshot,
    exportAllProjectsJson,
    exportAllProjectsTxt,
    downloadSourcesManifest,
    downloadMemoryManifest,
    selfTest,
    writeReport
  };

  try {
    repairProjects("boot-v126B");
    backupProjects("boot-v126B");
    rebuildIndex("boot-v126B");
    selfTest();
  } catch (e) {
    writeReport("boot-error", { message: e && e.message ? e.message : String(e) });
  }

  setInterval(function () {
    try {
      saveActiveProjectChatSnapshot("interval-v126B");
    } catch (_) {}
  }, 3000);
})();

/* v127 Projects no-false audit: JS-only, no CSS/design changes */
(function () {
  if (window.__sabiV127ProjectsNoFakeAudit) return;
  window.__sabiV127ProjectsNoFakeAudit = true;

  const REPORT_KEY = "sabi-ai-studio-v127-projects-no-false-audit-report";
  const PROJECTS_KEY = "sabi-ai-studio-projects-v88";
  const ACTIVE_PROJECT_KEY = "sabi-ai-studio-active-project-v106";
  const ACTIVE_CHAT_KEY = "sabi-ai-studio-active-project-chat-v123";

  function qs(s) { return document.querySelector(s); }
  function all(s) { return Array.from(document.querySelectorAll(s)); }
  function now() { return new Date().toISOString(); }

  function clean(text, max) {
    let v = String(text || "").replace(/\s+/g, " ").trim();
    if (max && v.length > max) v = v.slice(0, max).trim() + "…";
    return v;
  }

  function norm(text) {
    return clean(text || "").toLowerCase();
  }

  function readJson(key, fallback) {
    try {
      const parsed = JSON.parse(localStorage.getItem(key) || "");
      return parsed ?? fallback;
    } catch (_) {
      return fallback;
    }
  }

  function writeJson(key, value) {
    localStorage.setItem(key, JSON.stringify(value, null, 2));
  }

  function readProjects() {
    const value = readJson(PROJECTS_KEY, []);
    return Array.isArray(value) ? value : [];
  }

  function activeProjectId() {
    return localStorage.getItem(ACTIVE_PROJECT_KEY) || readProjects()[0]?.id || "";
  }

  function activeChatId() {
    return localStorage.getItem(ACTIVE_CHAT_KEY) || qs("#app")?.dataset?.sabiProjectChatId || "";
  }

  function projectScreen() {
    return qs("#projectsScreenV88") || qs("#projectsScreenV106");
  }

  function isVisible(el) {
    if (!el) return false;
    const cs = getComputedStyle(el);
    return !el.hidden && cs.display !== "none" && cs.visibility !== "hidden";
  }

  function buttonLabel(btn) {
    return clean(
      btn.getAttribute("aria-label") ||
      btn.getAttribute("title") ||
      btn.dataset.action ||
      btn.dataset.v95ChatAction ||
      btn.innerText ||
      btn.textContent ||
      "",
      120
    );
  }

  function inferAction(btn) {
    const text = norm(buttonLabel(btn));
    const row = btn.closest(".project-chat-row-v88,.project-chat-row-v106");
    const inComposer = !!btn.closest("#projectComposerV106,#projectNewChatFormV88");

    if (btn.matches("input[type='file']")) return "file-input";
    if (btn.id === "projectSendV89") return "send-project-chat";
    if (btn.classList.contains("project-send-v88") || btn.classList.contains("project-send-v106")) return "send-project-chat";
    if (btn.classList.contains("project-chat-open-v88") || btn.classList.contains("project-chat-open-v106")) return "open-project-chat";
    if (btn.dataset.action) return btn.dataset.action;
    if (btn.dataset.v95ChatAction) return btn.dataset.v95ChatAction;

    if (inComposer && (text.includes("send") || text.includes("start") || text.includes("↗") || text.includes("➤") || text.includes("↑"))) return "send-project-chat";
    if (inComposer && (text.includes("attach") || text.includes("📎") || text.includes("+"))) return "attach";
    if (inComposer && (text.includes("mic") || text.includes("voice") || text.includes("🎙"))) return "mic";

    if (row && (text.includes("open") || text.includes("открыть"))) return "open-project-chat";
    if (row && (text.includes("rename") || text.includes("переимен"))) return "rename-chat";
    if (row && (text.includes("delete") || text.includes("remove") || text.includes("удал"))) return "delete-chat";
    if (row && (text.includes("download") || text.includes("скач"))) return "download-chat";
    if (row && (text.includes("export"))) return "export-chat";
    if (row && (text.includes("copy") || text.includes("копир"))) return "copy-chat";

    if (text.includes("create project") || text.includes("создать проект")) return "create-project";
    if (text.includes("new project") || text.includes("новый проект")) return "create-project";
    if (text.includes("new chat") || text.includes("новый чат")) return "send-project-chat";
    if (text.includes("rename") || text.includes("переимен")) return "rename-project";
    if (text.includes("delete") || text.includes("remove") || text.includes("удал")) return "delete-project";
    if (text.includes("download files") || text.includes("sources") || text.includes("источ")) return "sources";
    if (text.includes("export json")) return "export-json";
    if (text.includes("export txt") || text === "export") return "export-txt";
    if (text.includes("copy") || text.includes("копир")) return "copy-project";
    if (text.includes("refresh") || text.includes("обнов")) return "refresh";
    if (text.includes("чаты") || text.includes("chats")) return "chats-tab";
    if (text.includes("источ") || text.includes("sources")) return "sources-tab";

    return "";
  }

  function projectButtons() {
    const screen = projectScreen();
    if (!screen) return [];

    return all("button,[role='button'],input[type='file']").filter((btn) => {
      return screen.contains(btn);
    });
  }

  function auditButtons() {
    const screen = projectScreen();
    const buttons = projectButtons();

    const items = buttons.map((btn, index) => {
      const label = buttonLabel(btn);
      const action = inferAction(btn);
      const row = !!btn.closest(".project-chat-row-v88,.project-chat-row-v106");
      const composer = !!btn.closest("#projectComposerV106,#projectNewChatFormV88");

      return {
        index,
        label,
        action: action || "NOT_CONNECTED",
        connected: !!action,
        visible: isVisible(btn),
        row,
        composer,
        id: btn.id || "",
        className: String(btn.className || "")
      };
    });

    const report = {
      at: now(),
      version: "v127",
      projectScreenExists: !!screen,
      projectScreenVisible: isVisible(screen),
      totalButtons: items.length,
      connectedButtons: items.filter((x) => x.connected).length,
      notConnectedButtons: items.filter((x) => !x.connected).length,
      items,
      cssChanged: false,
      designChanged: false
    };

    writeJson(REPORT_KEY, report);
    return report;
  }

  function fullSelfTest() {
    const projects = readProjects();
    const v126 = window.sabiProjectsV126?.selfTest?.() || null;
    const audit = auditButtons();

    const screen = projectScreen();
    const chatScreen = qs("#chatScreen");
    const mainScreen = qs(".main-center");

    const report = {
      at: now(),
      version: "v127-full",
      v126Loaded: !!window.sabiProjectsV126,
      v126SelfTest: v126,
      projectsCount: projects.length,
      activeProjectId: activeProjectId(),
      activeChatId: activeChatId(),
      projectScreenExists: !!screen,
      chatScreenExists: !!chatScreen,
      mainScreenExists: !!mainScreen,
      projectScreenVisible: isVisible(screen),
      chatScreenVisible: isVisible(chatScreen),
      mainScreenVisible: isVisible(mainScreen),
      storageOk: Array.isArray(projects),
      buttonAuditOk: audit.notConnectedButtons === 0,
      totalButtons: audit.totalButtons,
      connectedButtons: audit.connectedButtons,
      notConnectedButtons: audit.notConnectedButtons,
      cssChanged: false,
      designChanged: false
    };

    writeJson(REPORT_KEY, report);
    return report;
  }

  function runAction(action, btn) {
    try {
      if (window.sabiProjectsV125) {
        if (action === "create-project") {
          window.sabiProjectsV125.createProject?.();
          return true;
        }

        if (action === "send-project-chat" || action === "new-chat") {
          window.sabiProjectsV125.startNewProjectChat?.();
          return true;
        }

        if (action === "refresh" || action === "chats-tab") {
          window.sabiProjectsV125.refreshProjects?.("v127");
          return true;
        }

        if (action === "export-json") {
          window.sabiProjectsV125.exportProject?.("json");
          return true;
        }

        if (action === "export-txt") {
          window.sabiProjectsV125.exportProject?.("txt");
          return true;
        }
      }

      if (window.sabiProjectsV126) {
        if (action === "sources" || action === "sources-tab") {
          window.sabiProjectsV126.downloadSourcesManifest?.();
          return true;
        }

        if (action === "copy-project") {
          const data = {
            projectId: activeProjectId(),
            projectsCount: readProjects().length,
            index: window.sabiProjectsV126.rebuildIndex?.("copy-project-v127")
          };

          navigator.clipboard?.writeText?.(JSON.stringify(data, null, 2));
          writeJson(REPORT_KEY, { at: now(), stage: "copy-project", copied: true, cssChanged: false, designChanged: false });
          return true;
        }
      }

      if (action === "attach") {
        const existing = qs("#projectFileInputV125");
        if (existing) {
          existing.click();
          return true;
        }
      }

      if (action === "mic") {
        window.sabiProjectsV125?.startNewProjectChat?.();
        setTimeout(() => qs("#chatMic")?.click(), 450);
        return true;
      }

      return false;
    } catch (e) {
      writeJson(REPORT_KEY, {
        at: now(),
        stage: "action-error",
        action,
        message: e && e.message ? e.message : String(e),
        cssChanged: false,
        designChanged: false
      });
      return false;
    }
  }

  function bindNoFakeGuard() {
    if (window.__sabiV127NoFakeGuardBound) return;
    window.__sabiV127NoFakeGuardBound = true;

    document.addEventListener("click", function (event) {
      const screen = projectScreen();
      if (!screen || !screen.contains(event.target)) return;

      const btn = event.target.closest("button,[role='button']");
      if (!btn || !screen.contains(btn)) return;

      const action = inferAction(btn);

      if (!action) {
        const report = auditButtons();
        writeJson(REPORT_KEY, {
          at: now(),
          version: "v127",
          stage: "blocked-unconnected-project-button",
          label: buttonLabel(btn),
          id: btn.id || "",
          className: String(btn.className || ""),
          audit: report,
          cssChanged: false,
          designChanged: false
        });

        event.preventDefault();
        event.stopImmediatePropagation();

        console.warn("[Sabi Projects v127] Unconnected project button blocked, see localStorage report:", REPORT_KEY);
        return;
      }

      const handled = runAction(action, btn);

      if (handled) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    }, true);
  }

  function boot() {
    bindNoFakeGuard();
    setTimeout(auditButtons, 300);
    setTimeout(fullSelfTest, 1000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }

  window.sabiProjectsV127 = {
    auditButtons,
    fullSelfTest,
    inferAction
  };
})();

/* v128 visible Projects button audit: JS-only, no CSS/design changes */
(function () {
  if (window.__sabiV128VisibleProjectsButtonAudit) return;
  window.__sabiV128VisibleProjectsButtonAudit = true;

  const REPORT_KEY = "sabi-ai-studio-v128-visible-project-buttons-audit-report";

  function qs(s) { return document.querySelector(s); }
  function all(s) { return Array.from(document.querySelectorAll(s)); }
  function now() { return new Date().toISOString(); }

  function clean(text, max) {
    let value = String(text || "").replace(/\s+/g, " ").trim();
    if (max && value.length > max) value = value.slice(0, max).trim() + "…";
    return value;
  }

  function writeJson(key, value) {
    localStorage.setItem(key, JSON.stringify(value, null, 2));
  }

  function projectScreen() {
    return qs("#projectsScreenV88") || qs("#projectsScreenV106");
  }

  function isActuallyVisible(el) {
    if (!el) return false;

    let node = el;

    while (node && node !== document.body) {
      const cs = getComputedStyle(node);

      if (node.hidden || cs.display === "none" || cs.visibility === "hidden" || Number(cs.opacity) === 0) {
        return false;
      }

      node = node.parentElement;
    }

    const rect = el.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0;
  }

  function isProjectsOpen() {
    const screen = projectScreen();
    if (!screen) return false;

    const app = qs("#app");
    const navActive = qs("#projectsNav")?.classList.contains("active");

    return (
      isActuallyVisible(screen) ||
      app?.dataset?.sabiView === "projects" ||
      app?.classList.contains("view-projects-v88") ||
      navActive
    );
  }

  function label(btn) {
    return clean(
      btn.getAttribute("aria-label") ||
      btn.getAttribute("title") ||
      btn.dataset.action ||
      btn.dataset.v95ChatAction ||
      btn.innerText ||
      btn.textContent ||
      "",
      120
    );
  }

  function inferAction(btn) {
    if (window.sabiProjectsV127?.inferAction) {
      return window.sabiProjectsV127.inferAction(btn) || "";
    }

    const text = label(btn).toLowerCase();
    const row = btn.closest(".project-chat-row-v88,.project-chat-row-v106");
    const composer = btn.closest("#projectComposerV106,#projectNewChatFormV88");

    if (btn.id === "projectSendV89") return "send-project-chat";
    if (btn.classList.contains("project-send-v88") || btn.classList.contains("project-send-v106")) return "send-project-chat";
    if (btn.classList.contains("project-chat-open-v88") || btn.classList.contains("project-chat-open-v106")) return "open-project-chat";

    if (composer && (text.includes("send") || text.includes("start") || text.includes("↗") || text.includes("↑"))) return "send-project-chat";
    if (composer && (text.includes("attach") || text.includes("📎") || text.includes("+"))) return "attach";
    if (composer && (text.includes("mic") || text.includes("voice") || text.includes("🎙"))) return "mic";

    if (row && (text.includes("open") || text.includes("открыть"))) return "open-project-chat";
    if (row && (text.includes("rename") || text.includes("переимен"))) return "rename-chat";
    if (row && (text.includes("delete") || text.includes("удал"))) return "delete-chat";
    if (row && (text.includes("download") || text.includes("скач"))) return "download-chat";
    if (row && text.includes("export")) return "export-chat";

    if (text.includes("create project") || text.includes("new project") || text.includes("создать проект")) return "create-project";
    if (text.includes("new chat") || text.includes("новый чат")) return "send-project-chat";
    if (text.includes("refresh") || text.includes("обнов")) return "refresh";
    if (text.includes("sources") || text.includes("источ")) return "sources-tab";
    if (text.includes("chats") || text.includes("чаты")) return "chats-tab";
    if (text.includes("copy") || text.includes("копир")) return "copy-project";
    if (text.includes("export json")) return "export-json";
    if (text.includes("export")) return "export-txt";

    return "";
  }

  function buttons() {
    const screen = projectScreen();
    if (!screen) return [];

    return all("button,[role='button'],input[type='file']").filter((el) => screen.contains(el));
  }

  function auditVisibleButtons() {
    const screen = projectScreen();
    const allButtons = buttons();

    const items = allButtons.map((btn, index) => {
      const visible = isActuallyVisible(btn);
      const action = inferAction(btn);

      return {
        index,
        label: label(btn),
        action: action || "NOT_CONNECTED",
        connected: !!action,
        visible,
        id: btn.id || "",
        className: String(btn.className || ""),
        row: !!btn.closest(".project-chat-row-v88,.project-chat-row-v106"),
        composer: !!btn.closest("#projectComposerV106,#projectNewChatFormV88")
      };
    });

    const visibleItems = items.filter((x) => x.visible);
    const hiddenItems = items.filter((x) => !x.visible);
    const notConnectedVisible = visibleItems.filter((x) => !x.connected);

    const report = {
      at: now(),
      version: "v128",
      projectScreenExists: !!screen,
      projectScreenVisible: isActuallyVisible(screen),
      projectsOpen: isProjectsOpen(),
      allButtons: items.length,
      visibleButtons: visibleItems.length,
      hiddenButtons: hiddenItems.length,
      connectedVisibleButtons: visibleItems.filter((x) => x.connected).length,
      notConnectedVisibleButtons: notConnectedVisible.length,
      buttonAuditOk: notConnectedVisible.length === 0,
      visibleItems,
      hiddenNotConnectedCount: hiddenItems.filter((x) => !x.connected).length,
      cssChanged: false,
      designChanged: false
    };

    writeJson(REPORT_KEY, report);
    return report;
  }

  function fullSelfTest() {
    const v126 = window.sabiProjectsV126?.selfTest?.() || null;
    const v127 = window.sabiProjectsV127?.fullSelfTest?.() || null;
    const audit = auditVisibleButtons();

    const report = {
      at: now(),
      version: "v128-full",
      v126Loaded: !!window.sabiProjectsV126,
      v127Loaded: !!window.sabiProjectsV127,
      v126SelfTest: v126,
      v127SelfTest: v127,
      projectScreenExists: audit.projectScreenExists,
      projectScreenVisible: audit.projectScreenVisible,
      projectsOpen: audit.projectsOpen,
      allButtons: audit.allButtons,
      visibleButtons: audit.visibleButtons,
      connectedVisibleButtons: audit.connectedVisibleButtons,
      notConnectedVisibleButtons: audit.notConnectedVisibleButtons,
      buttonAuditOk: audit.buttonAuditOk,
      cssChanged: false,
      designChanged: false
    };

    writeJson(REPORT_KEY, report);
    return report;
  }

  function bindVisibleOnlyGuard() {
    if (window.__sabiV128VisibleOnlyGuardBound) return;
    window.__sabiV128VisibleOnlyGuardBound = true;

    document.addEventListener("click", function (event) {
      const screen = projectScreen();
      if (!screen || !screen.contains(event.target)) return;

      if (!isProjectsOpen()) return;

      const btn = event.target.closest("button,[role='button']");
      if (!btn || !screen.contains(btn)) return;

      if (!isActuallyVisible(btn)) return;

      const action = inferAction(btn);

      if (!action) {
        const report = auditVisibleButtons();

        writeJson(REPORT_KEY, {
          at: now(),
          version: "v128",
          stage: "blocked-visible-unconnected-project-button",
          label: label(btn),
          id: btn.id || "",
          className: String(btn.className || ""),
          report,
          cssChanged: false,
          designChanged: false
        });

        event.preventDefault();
        event.stopImmediatePropagation();

        console.warn("[Sabi Projects v128] Visible unconnected Projects button blocked. See:", REPORT_KEY);
      }
    }, true);
  }

  function boot() {
    bindVisibleOnlyGuard();
    setTimeout(auditVisibleButtons, 400);
    setTimeout(fullSelfTest, 1200);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }

  window.sabiProjectsV128 = {
    auditVisibleButtons,
    fullSelfTest,
    isProjectsOpen
  };
})();

/* v129 client entitlement headers: JS-only, no CSS/design changes */
(function () {
  if (window.__sabiV129ClientEntitlementHeaders) return;
  window.__sabiV129ClientEntitlementHeaders = true;

  const CLIENT_KEY = "sabi-ai-studio-client-id-v129";
  const DEVICE_KEY = "sabi-ai-studio-device-id-v129";
  const REPORT_KEY = "sabi-ai-studio-v129-access-report";

  function now() { return new Date().toISOString(); }

  function uid(prefix) {
    return prefix + "-" + Date.now() + "-" + Math.random().toString(36).slice(2, 12);
  }

  function getOrCreate(key, prefix) {
    let value = localStorage.getItem(key);
    if (!value) {
      value = uid(prefix);
      localStorage.setItem(key, value);
    }
    return value;
  }

  function clientId() {
    return getOrCreate(CLIENT_KEY, "client");
  }

  function deviceId() {
    return getOrCreate(DEVICE_KEY, "device");
  }

  function writeReport(stage, extra) {
    localStorage.setItem(REPORT_KEY, JSON.stringify({
      at: now(),
      version: "v129",
      stage,
      clientId: clientId(),
      deviceId: deviceId(),
      cssChanged: false,
      designChanged: false,
      extra: extra || null
    }, null, 2));
  }

  function isProtectedApiUrl(input) {
    const url = String(typeof input === "string" ? input : input?.url || "");
    return (
      url.includes("3001") ||
      url.includes("/api/sabi-ai-studio") ||
      url.includes("/api/veo") ||
      url.includes("/api/maps") ||
      url.includes("/api/image") ||
      url.includes("/api/sticker") ||
      url.includes("/api/audio") ||
      url.includes("/api/music") ||
      url.includes("/api/video") ||
      url.includes("/api/translate") ||
      url.includes("/api/files")
    );
  }

  if (!window.__sabiV129FetchPatched) {
    window.__sabiV129FetchPatched = true;

    const originalFetch = window.fetch;

    window.fetch = function (input, init) {
      let nextInput = input;
      let nextInit = init || {};

      try {
        if (isProtectedApiUrl(input)) {
          const headers = new Headers(nextInit.headers || (input instanceof Request ? input.headers : undefined));

          headers.set("x-sabi-client-id", clientId());
          headers.set("x-sabi-device-id", deviceId());
          headers.set("x-sabi-access-source", "sabi-ai-studio-v129");

          nextInit = { ...nextInit, headers };
        }
      } catch (_) {}

      return originalFetch.call(this, nextInput, nextInit).then(function (response) {
        try {
          if (response.status === 402 || response.status === 403) {
            response.clone().json().then(function (data) {
              writeReport("access-denied", {
                status: response.status,
                code: data && data.code,
                message: data && data.message,
                access: data && data.access
              });

              console.warn("[Sabi Access v129]", data);
            }).catch(function () {
              writeReport("access-denied", { status: response.status });
            });
          }
        } catch (_) {}

        return response;
      });
    };
  }

  async function status() {
    const res = await fetch("/api/sabi/access/status", {
      headers: {
        "x-sabi-client-id": clientId(),
        "x-sabi-device-id": deviceId(),
        "x-sabi-access-source": "sabi-ai-studio-v129"
      }
    });

    const data = await res.json();
    writeReport("status", data);
    return data;
  }

  async function selfTest() {
    const data = await status();

    return {
      at: now(),
      version: "v129-client",
      loaded: true,
      statusOk: !!data.ok,
      trialActive: !!data.access?.trialActive,
      paidActive: !!data.access?.paidActive,
      blocked: !!data.access?.blocked,
      tamperDetected: !!data.access?.tamperDetected,
      trialEndsAt: data.access?.trialEndsAt || "",
      cssChanged: false,
      designChanged: false
    };
  }

  window.sabiAccessV129 = {
    clientId,
    deviceId,
    status,
    selfTest
  };

  writeReport("boot");
})();



/* SABI_282F_MAIN_FIRST_PROMPT_AUTOSEND_TO_CHAT_ROUTE_ONLY
   Main screen first prompt must open existing chat screen and automatically send.
   Route logic only. No HTML/CSS/design/assets changes.
*/
(function(){
  "use strict";

  if (window.__sabi282FMainFirstPromptAutosendToChat) return;
  window.__sabi282FMainFirstPromptAutosendToChat = true;

  function q(s){ return document.querySelector(s); }

  function textFrom(node){
    if (!node) return "";
    return String(node.value || node.innerText || node.textContent || "").replace(/\s+/g, " ").trim();
  }

  function setText(node, value){
    if (!node) return;

    if ("value" in node) {
      node.value = value;
      node.dispatchEvent(new Event("input", { bubbles:true }));
      return;
    }

    node.textContent = value;
    node.dispatchEvent(new Event("input", { bubbles:true }));
  }

  function clearText(node){
    if (!node) return;

    if ("value" in node) {
      node.value = "";
      node.dispatchEvent(new Event("input", { bubbles:true }));
      return;
    }

    node.textContent = "";
    node.dispatchEvent(new Event("input", { bubbles:true }));
  }

  function show(node){
    if (!node) return;
    node.hidden = false;
    node.removeAttribute("hidden");
    node.style.removeProperty("display");
    node.style.removeProperty("visibility");
    node.style.removeProperty("opacity");
  }

  function hide(node){
    if (!node) return;
    node.hidden = true;
    node.setAttribute("hidden", "");
  }

  function openExistingChatScreen(){
    var app = q("#app") || document.body;
    var main = q(".main-center") || q("#mainScreen") || q("[data-sabi-main-screen]");
    var projects = q("#projectsScreen") || q("[data-sabi-projects-screen]") || q(".projects-screen");
    var chat = q("#chatScreen") || q("[data-sabi-chat-screen]") || q(".chat-screen");

    if (!chat) return false;

    try {
      if (window.sabiV122ScreenIsolation && typeof window.sabiV122ScreenIsolation.openChat === "function") {
        window.sabiV122ScreenIsolation.openChat(false);
      }
    } catch (_) {}

    hide(main);
    hide(projects);
    show(chat);

    app.classList.add("view-chat");
    app.classList.remove("view-projects-v88");
    app.classList.remove("view-project-chat-v88");
    app.dataset.sabiView = "chat";

    return true;
  }

  function submitChatComposer(){
    var chatComposer = q("#chatComposer");
    if (!chatComposer) return false;

    if (typeof chatComposer.requestSubmit === "function") {
      chatComposer.requestSubmit();
      return true;
    }

    var event = new Event("submit", { bubbles:true, cancelable:true });
    chatComposer.dispatchEvent(event);
    return true;
  }

  function autoSendMainPromptToChat(prompt){
    var draft = String(prompt || "").trim();
    if (!draft) return false;

    var mainEditor = q("#promptEditor");
    var chatEditor = q("#chatEditor");

    if (!chatEditor) return false;

    openExistingChatScreen();

    setText(chatEditor, draft);
    clearText(mainEditor);

    setTimeout(function(){
      openExistingChatScreen();
      setText(chatEditor, draft);
      submitChatComposer();
    }, 40);

    setTimeout(function(){
      openExistingChatScreen();
    }, 160);

    return true;
  }

  function handleMainPrompt(event){
    var mainForm = q("#composer");
    var mainEditor = q("#promptEditor");

    if (!mainForm || !mainEditor) return false;

    var prompt = textFrom(mainEditor);
    if (!prompt) return false;

    if (event) {
      event.preventDefault();
      event.stopPropagation();
      if (typeof event.stopImmediatePropagation === "function") event.stopImmediatePropagation();
    }

    return autoSendMainPromptToChat(prompt);
  }

  document.addEventListener("submit", function(event){
    if (!event.target || event.target !== q("#composer")) return;
    handleMainPrompt(event);
  }, true);

  document.addEventListener("keydown", function(event){
    if (!event.target || event.target !== q("#promptEditor")) return;
    if (event.key !== "Enter" || event.shiftKey) return;
    handleMainPrompt(event);
  }, true);

  document.addEventListener("click", function(event){
    var mainForm = q("#composer");
    if (!mainForm || !event.target || !event.target.closest) return;

    var btn = event.target.closest("button");
    if (!btn || !mainForm.contains(btn)) return;

    var isSubmit = btn.type === "submit" || btn.id === "sendBtn" || btn.matches("[data-sabi-send]");
    if (!isSubmit) return;

    handleMainPrompt(event);
  }, true);

  window.sabi282FAutoSendMainPromptToChat = autoSendMainPromptToChat;
})();


/* SABI_282G_NATIVE_STUDIO_AUTH_GOOGLE_COLOR
   Adds main-screen sign-in/registration in Sabi Studio visual language.
   Keeps autosend route. No HTML/CSS/assets/public/Admin changes.
   Google is OAuth-only and uses official colored G mark.
*/
(function(){
  "use strict";

  if (window.__sabi282GNativeStudioAuthGoogleColor) return;
  window.__sabi282GNativeStudioAuthGoogleColor = true;

  var state = {
    mode: "signin",
    plan: "Trial"
  };

  var GOOGLE_G = '<svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true" focusable="false"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24s.92 7.54 2.56 10.78l7.97-6.19z"></path><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path></svg>';

  function q(s){ return document.querySelector(s); }

  function node(tag, attrs, html){
    var n = document.createElement(tag);
    attrs = attrs || {};
    Object.keys(attrs).forEach(function(k){
      if (k === "class") n.className = attrs[k];
      else if (k === "text") n.textContent = attrs[k];
      else n.setAttribute(k, attrs[k]);
    });
    if (html) n.innerHTML = html;
    return n;
  }

  function addStyle(){
    if (q("#sabi-282g-auth-style")) return;

    var css = `
      .sabi282g-auth-actions{
        position:fixed;
        top:18px;
        right:22px;
        z-index:9500;
        display:flex;
        align-items:center;
        gap:10px;
        font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Arial,sans-serif;
      }
      .sabi282g-btn{
        min-height:36px;
        border-radius:999px;
        padding:0 16px;
        border:1px solid rgba(168,211,255,.24);
        background:linear-gradient(135deg,rgba(12,35,69,.78),rgba(3,11,24,.78));
        color:#f4f8ff;
        font-weight:850;
        font-size:12px;
        letter-spacing:-.01em;
        cursor:pointer;
        box-shadow:0 12px 34px rgba(20,96,190,.22), inset 0 1px 0 rgba(255,255,255,.08);
        backdrop-filter:blur(18px);
      }
      .sabi282g-btn.primary{
        background:linear-gradient(135deg,#f8fbff,#b9dcff);
        color:#071427;
        border-color:rgba(255,255,255,.74);
        box-shadow:0 16px 42px rgba(112,174,255,.22);
      }
      .sabi282g-backdrop{
        position:fixed;
        inset:0;
        z-index:9900;
        display:none;
        align-items:center;
        justify-content:center;
        padding:24px;
        background:radial-gradient(circle at 70% 20%,rgba(83,151,255,.18),transparent 34%),rgba(1,6,15,.64);
        backdrop-filter:blur(20px);
      }
      .sabi282g-backdrop.show{display:flex}
      .sabi282g-dialog{
        width:min(560px,100%);
        max-height:92vh;
        overflow:auto;
        border-radius:28px;
        border:1px solid rgba(160,211,255,.28);
        background:linear-gradient(180deg,rgba(8,24,45,.94),rgba(2,10,22,.96));
        color:#f5f9ff;
        box-shadow:0 38px 110px rgba(0,0,0,.62),0 0 80px rgba(83,151,255,.12);
        padding:24px;
        font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Arial,sans-serif;
      }
      .sabi282g-head{
        display:flex;
        justify-content:space-between;
        gap:16px;
        align-items:flex-start;
        margin-bottom:18px;
      }
      .sabi282g-kicker{
        display:inline-flex;
        align-items:center;
        gap:8px;
        margin-bottom:10px;
        color:#9fd8ff;
        font-size:10px;
        font-weight:950;
        letter-spacing:.16em;
        text-transform:uppercase;
      }
      .sabi282g-kicker:before{
        content:"";
        width:8px;
        height:8px;
        border-radius:50%;
        background:#7fffd0;
        box-shadow:0 0 18px rgba(127,255,208,.8);
      }
      .sabi282g-head h2{
        margin:0 0 8px;
        font-size:26px;
        letter-spacing:-.04em;
        line-height:1;
      }
      .sabi282g-head p{
        margin:0;
        color:#b9cce4;
        font-size:13px;
        line-height:1.55;
      }
      .sabi282g-close{
        width:36px;
        height:36px;
        border-radius:999px;
        border:1px solid rgba(255,255,255,.16);
        background:rgba(255,255,255,.06);
        color:#f5f9ff;
        cursor:pointer;
        font-size:18px;
      }
      .sabi282g-tabs{
        display:grid;
        grid-template-columns:1fr 1fr;
        gap:10px;
        margin:18px 0;
      }
      .sabi282g-tab{
        min-height:42px;
        border-radius:999px;
        border:1px solid rgba(160,211,255,.2);
        background:rgba(255,255,255,.055);
        color:#dcecff;
        font-weight:900;
        cursor:pointer;
      }
      .sabi282g-tab.active{
        background:linear-gradient(135deg,#f8fbff,#b9dcff);
        color:#071427;
        border-color:rgba(255,255,255,.72);
      }
      .sabi282g-pane{display:none}
      .sabi282g-pane.active{display:block}
      .sabi282g-google{
        width:100%;
        min-height:50px;
        border-radius:17px;
        border:1px solid #dadce0;
        background:#fff;
        color:#202124;
        display:flex;
        align-items:center;
        justify-content:center;
        gap:12px;
        font-weight:900;
        cursor:pointer;
        box-shadow:0 14px 32px rgba(0,0,0,.22);
      }
      .sabi282g-divider{
        display:flex;
        align-items:center;
        gap:12px;
        color:#8fa7c4;
        font-size:12px;
        margin:17px 0;
      }
      .sabi282g-divider:before,.sabi282g-divider:after{
        content:"";
        height:1px;
        flex:1;
        background:linear-gradient(90deg,transparent,rgba(160,211,255,.22),transparent);
      }
      .sabi282g-label{
        display:block;
        color:#e6f2ff;
        font-size:12px;
        font-weight:900;
        margin:13px 0 7px;
      }
      .sabi282g-input{
        width:100%;
        min-height:48px;
        border-radius:16px;
        border:1px solid rgba(160,211,255,.2);
        background:rgba(3,10,20,.72);
        color:#f7fbff;
        padding:0 14px;
        outline:0;
      }
      .sabi282g-input:focus{
        border-color:#a9dcff;
        box-shadow:0 0 0 4px rgba(120,190,255,.12);
      }
      .sabi282g-plans{
        display:grid;
        grid-template-columns:1fr 1fr 1fr;
        gap:10px;
        margin:13px 0 16px;
      }
      .sabi282g-plan{
        min-height:102px;
        border-radius:18px;
        border:1px solid rgba(160,211,255,.2);
        background:rgba(255,255,255,.055);
        color:#f5f9ff;
        padding:13px;
        text-align:left;
        cursor:pointer;
      }
      .sabi282g-plan.active{
        border-color:rgba(255,231,166,.75);
        background:linear-gradient(160deg,rgba(255,231,166,.18),rgba(99,179,255,.08));
        box-shadow:0 16px 42px rgba(255,231,166,.12);
      }
      .sabi282g-plan strong{display:block;font-size:14px;margin-bottom:6px}
      .sabi282g-plan span{display:block;color:#b9cce4;font-size:11px;line-height:1.38}
      .sabi282g-submit{
        width:100%;
        min-height:50px;
        border:0;
        border-radius:17px;
        margin-top:16px;
        background:linear-gradient(135deg,#f8fbff,#b9dcff);
        color:#071427;
        font-weight:950;
        cursor:pointer;
        box-shadow:0 16px 42px rgba(112,174,255,.2);
      }
      .sabi282g-check{
        display:flex;
        align-items:flex-start;
        gap:10px;
        margin-top:13px;
        color:#b9cce4;
        font-size:12px;
        line-height:1.45;
      }
      .sabi282g-check input{
        width:16px;
        height:16px;
        margin-top:1px;
      }
      .sabi282g-note,.sabi282g-result{
        margin-top:13px;
        padding:13px;
        border-radius:16px;
        border:1px solid rgba(160,211,255,.16);
        background:rgba(255,255,255,.045);
        color:#b9cce4;
        font-size:12px;
        line-height:1.5;
      }
      .sabi282g-result{
        display:none;
        border-color:rgba(127,255,208,.25);
        background:rgba(127,255,208,.08);
        color:#defef6;
      }
      .sabi282g-result.show{display:block}
      @media(max-width:720px){
        .sabi282g-auth-actions{top:10px;right:10px;gap:7px}
        .sabi282g-btn{min-height:32px;padding:0 11px;font-size:11px}
        .sabi282g-plans{grid-template-columns:1fr}
      }
    `;

    document.head.appendChild(node("style", { id:"sabi-282g-auth-style" }, css));
  }

  function setMode(mode){
    state.mode = mode === "signup" ? "signup" : "signin";

    document.querySelectorAll("[data-sabi282g-tab]").forEach(function(btn){
      btn.classList.toggle("active", btn.getAttribute("data-sabi282g-tab") === state.mode);
    });

    document.querySelectorAll("[data-sabi282g-pane]").forEach(function(pane){
      pane.classList.toggle("active", pane.getAttribute("data-sabi282g-pane") === state.mode);
    });
  }

  function showResult(id, message){
    var r = q("#" + id);
    if (!r) return;
    r.textContent = message;
    r.classList.add("show");
  }

  function openAuth(mode){
    ensure();
    setMode(mode);
    var modal = q("#sabi282gAuthModal");
    if (modal) {
      modal.classList.add("show");
      modal.setAttribute("aria-hidden","false");
    }
  }

  function closeAuth(){
    var modal = q("#sabi282gAuthModal");
    if (modal) {
      modal.classList.remove("show");
      modal.setAttribute("aria-hidden","true");
    }
  }

  function build(){
    if (q("#sabi282gAuthActions")) return;

    var actions = node("div", { id:"sabi282gAuthActions", class:"sabi282g-auth-actions" });
    actions.innerHTML = `
      <button class="sabi282g-btn primary" type="button" data-sabi282g-open="signin">Sign in</button>
      <button class="sabi282g-btn" type="button" data-sabi282g-open="signup">Create account</button>
    `;
    document.body.appendChild(actions);

    var modal = node("div", {
      id:"sabi282gAuthModal",
      class:"sabi282g-backdrop",
      "aria-hidden":"true"
    });

    modal.innerHTML = `
      <div class="sabi282g-dialog" role="dialog" aria-modal="true" aria-labelledby="sabi282gTitle">
        <div class="sabi282g-head">
          <div>
            <div class="sabi282g-kicker">Sabi AI Studio access</div>
            <h2 id="sabi282gTitle">Sign in or create account</h2>
            <p>Access opens on top of the main Studio screen. No separate registration screen is used.</p>
          </div>
          <button class="sabi282g-close" type="button" data-sabi282g-close>×</button>
        </div>

        <div class="sabi282g-tabs">
          <button class="sabi282g-tab active" type="button" data-sabi282g-tab="signin">Sign in</button>
          <button class="sabi282g-tab" type="button" data-sabi282g-tab="signup">Create account</button>
        </div>

        <section class="sabi282g-pane active" data-sabi282g-pane="signin">
          <button class="sabi282g-google" type="button" data-sabi282g-google="signin">
            ${GOOGLE_G}
            <span>Continue with Google</span>
          </button>

          <div class="sabi282g-divider">или Sabi account</div>

          <form id="sabi282gSigninForm">
            <label class="sabi282g-label" for="sabi282gSigninEmail">Email</label>
            <input class="sabi282g-input" id="sabi282gSigninEmail" type="email" autocomplete="email" required>

            <label class="sabi282g-label" for="sabi282gSigninPassword">Sabi password</label>
            <input class="sabi282g-input" id="sabi282gSigninPassword" type="password" autocomplete="current-password" required>

            <button class="sabi282g-submit" type="submit">Sign in</button>
          </form>

          <div class="sabi282g-note">Google sign-in is available only through official OAuth. Sabi opens only the official Google OAuth.</div>
          <div class="sabi282g-result" id="sabi282gSigninResult"></div>
        </section>

        <section class="sabi282g-pane" data-sabi282g-pane="signup">
          <label class="sabi282g-label">1. Choose your first plan</label>
          <div class="sabi282g-plans" role="radiogroup" aria-label="First plan">
            <button class="sabi282g-plan active" type="button" data-sabi282g-plan="Trial">
              <strong>Trial</strong>
              <span>Free start before account activation.</span>
            </button>
            <button class="sabi282g-plan" type="button" data-sabi282g-plan="Pro">
              <strong>Pro</strong>
              <span>Premium access for personal Studio.</span>
            </button>
            <button class="sabi282g-plan" type="button" data-sabi282g-plan="Business">
              <strong>Business</strong>
              <span>For teams and companies after approval.</span>
            </button>
          </div>

          <button class="sabi282g-google" type="button" data-sabi282g-google="signup">
            ${GOOGLE_G}
            <span>Continue with Google</span>
          </button>

          <div class="sabi282g-divider">or create a Sabi account</div>

          <form id="sabi282gSignupForm">
            <label class="sabi282g-label" for="sabi282gSignupName">Name</label>
            <input class="sabi282g-input" id="sabi282gSignupName" type="text" autocomplete="name" required>

            <label class="sabi282g-label" for="sabi282gSignupEmail">Email</label>
            <input class="sabi282g-input" id="sabi282gSignupEmail" type="email" autocomplete="email" required>

            <label class="sabi282g-label" for="sabi282gSignupPassword">Sabi password</label>
            <input class="sabi282g-input" id="sabi282gSignupPassword" type="password" autocomplete="new-password" required>

            <label class="sabi282g-label" for="sabi282gSignupPassword2">Confirm password</label>
            <input class="sabi282g-input" id="sabi282gSignupPassword2" type="password" autocomplete="new-password" required>

            <label class="sabi282g-check">
              <input id="sabi282gTerms" type="checkbox" required>
              <span>I accept Sabi AI Studio rules, Terms and Privacy Policy.</span>
            </label>

            <button class="sabi282g-submit" type="submit">Create account</button>
          </form>

          <div class="sabi282g-note">После регистрации аккаунт активируется через approved backend/auth provider. Subscription screen используется позже только для смены, продления или статуса плана.</div>
          <div class="sabi282g-result" id="sabi282gSignupResult"></div>
        </section>
      </div>
    `;

    document.body.appendChild(modal);
  }

  function bind(){
    if (window.__sabi282GAuthBound) return;
    window.__sabi282GAuthBound = true;

    document.addEventListener("click", function(event){
      var open = event.target && event.target.closest ? event.target.closest("[data-sabi282g-open]") : null;
      if (open) {
        event.preventDefault();
        openAuth(open.getAttribute("data-sabi282g-open"));
        return;
      }

      var tab = event.target && event.target.closest ? event.target.closest("[data-sabi282g-tab]") : null;
      if (tab) {
        event.preventDefault();
        setMode(tab.getAttribute("data-sabi282g-tab"));
        return;
      }

      var close = event.target && event.target.closest ? event.target.closest("[data-sabi282g-close]") : null;
      if (close) {
        event.preventDefault();
        closeAuth();
        return;
      }

      var plan = event.target && event.target.closest ? event.target.closest("[data-sabi282g-plan]") : null;
      if (plan) {
        event.preventDefault();
        state.plan = plan.getAttribute("data-sabi282g-plan") || "Trial";
        document.querySelectorAll("[data-sabi282g-plan]").forEach(function(p){
          p.classList.toggle("active", p === plan);
        });
        return;
      }

      var google = event.target && event.target.closest ? event.target.closest("[data-sabi282g-google]") : null;
      if (google) {
        event.preventDefault();

        var mode = google.getAttribute("data-sabi282g-google");
        if (mode === "signup") {
          showResult("sabi282gSignupResult", "Google registration prepared with first plan: " + state.plan + ". Next step: connect official Google OAuth. No fake account was created.");
        } else {
          showResult("sabi282gSigninResult", "Google sign-in prepared. Next step: connect official Google OAuth. Google OAuth opens through the official provider.");
        }
        return;
      }

      var modal = q("#sabi282gAuthModal");
      if (modal && event.target === modal) closeAuth();
    }, true);

    document.addEventListener("submit", function(event){
      if (!event.target) return;

      if (event.target.id === "sabi282gSigninForm") {
        event.preventDefault();
        showResult("sabi282gSigninResult", "Sabi account sign-in request prepared. Live auth requires approved backend connection. No fake session was created.");
        return;
      }

      if (event.target.id === "sabi282gSignupForm") {
        event.preventDefault();

        var p1 = q("#sabi282gSignupPassword");
        var p2 = q("#sabi282gSignupPassword2");

        if (p1 && p2 && p1.value !== p2.value) {
          showResult("sabi282gSignupResult", "Пароли не совпадают.");
          return;
        }

        showResult("sabi282gSignupResult", "Sabi account registration prepared with first plan: " + state.plan + ". Next step: activation through approved backend/auth provider.");
      }
    }, true);

    document.addEventListener("keydown", function(event){
      if (event.key === "Escape") closeAuth();
    }, true);
  }

  function ensure(){
    addStyle();
    build();
    bind();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", ensure);
  } else {
    ensure();
  }

  setTimeout(ensure, 100);
  setTimeout(ensure, 500);

  window.sabi282GOpenAuth = openAuth;
})();





/* SABI_282H_STUDIO_AUTH_REQUIRED_LOCK_ONLY
   Without registration/sign-in, Studio functions must not work.
   JS guard only. No HTML/CSS/design/assets/public/Admin changes.
*/
(function(){
  "use strict";

  if (window.__sabi282HStudioAuthRequiredLock) return;
  window.__sabi282HStudioAuthRequiredLock = true;

  var AUTH_FLAG = "sabiStudioAuthActive";

  function isAuthed(){
    return sessionStorage.getItem(AUTH_FLAG) === "true";
  }

  function openAuth(mode){
    mode = mode || "signup";

    try {
      if (typeof window.sabi282GOpenAuth === "function") {
        window.sabi282GOpenAuth(mode);
        return;
      }
    } catch (_) {}

    var button = document.querySelector('[data-sabi282g-open="' + mode + '"]');
    if (button) {
      button.click();
      return;
    }

    alert("Сначала войдите или зарегистрируйтесь в Sabi AI Studio.");
  }

  function isAuthUiTarget(target){
    if (!target || !target.closest) return false;

    return Boolean(
      target.closest("[data-sabi282g-open]") ||
      target.closest("[data-sabi282g-close]") ||
      target.closest("[data-sabi282g-tab]") ||
      target.closest("[data-sabi282g-plan]") ||
      target.closest("[data-sabi282g-google]") ||
      target.closest("#sabi282gAuthModal") ||
      target.closest("#sabi282gSigninForm") ||
      target.closest("#sabi282gSignupForm")
    );
  }

  function shouldBlockSubmit(form){
    if (!form) return false;
    if (form.id === "sabi282gSigninForm") return false;
    if (form.id === "sabi282gSignupForm") return false;
    return true;
  }

  function shouldBlockClick(target){
    if (!target || !target.closest) return false;
    if (isAuthUiTarget(target)) return false;

    return Boolean(
      target.closest("#composer") ||
      target.closest("#chatComposer") ||
      target.closest("#sendBtn") ||
      target.closest("#promptEditor") ||
      target.closest("#chatEditor") ||
      target.closest("button") ||
      target.closest("[role='button']") ||
      target.closest("[data-action]") ||
      target.closest("[data-sabi-send]") ||
      target.closest("[data-view]") ||
      target.closest("[data-screen]") ||
      target.closest("[data-project]") ||
      target.closest(".project") ||
      target.closest(".projects") ||
      target.closest(".sidebar") ||
      target.closest(".side") ||
      target.closest(".nav") ||
      target.closest(".tool") ||
      target.closest(".chip") ||
      target.closest(".mode") ||
      target.closest("input[type='file']")
    );
  }

  function blockEvent(event){
    if (isAuthed()) return false;

    event.preventDefault();
    event.stopPropagation();

    if (typeof event.stopImmediatePropagation === "function") {
      event.stopImmediatePropagation();
    }

    openAuth("signup");
    return true;
  }

  document.addEventListener("submit", function(event){
    if (isAuthed()) return;
    if (!shouldBlockSubmit(event.target)) return;
    blockEvent(event);
  }, true);

  document.addEventListener("click", function(event){
    if (isAuthed()) return;
    if (!shouldBlockClick(event.target)) return;
    blockEvent(event);
  }, true);

  document.addEventListener("keydown", function(event){
    if (isAuthed()) return;
    if (event.key !== "Enter") return;

    var target = event.target;
    if (!target || isAuthUiTarget(target)) return;

    if (
      target.id === "promptEditor" ||
      target.id === "chatEditor" ||
      (target.closest && (target.closest("#composer") || target.closest("#chatComposer")))
    ) {
      blockEvent(event);
    }
  }, true);

  document.addEventListener("change", function(event){
    if (isAuthed()) return;
    if (event.target && event.target.matches && event.target.matches("input[type='file']")) {
      blockEvent(event);
    }
  }, true);

  window.sabi282HStudioAuthLock = {
    isAuthed: isAuthed,
    requireAuth: function(){
      if (!isAuthed()) openAuth("signup");
      return isAuthed();
    },
    localQaUnlock: function(){
      sessionStorage.setItem(AUTH_FLAG, "true");
      console.warn("Sabi Studio local QA unlock enabled. Production must use Google OAuth / Sabi account backend.");
    },
    localQaLock: function(){
      sessionStorage.removeItem(AUTH_FLAG);
      console.warn("Sabi Studio local QA lock enabled.");
    }
  };
})();

/* SABI STRICT FIREBASE GOOGLE AUTH 022 START */
(function () {
  "use strict";

  var AUTH_OK = "sabi_strict_google_auth_022_ok";
  var AUTH_EMAIL = "sabi_strict_google_auth_022_email";
  var redirectBusy = false;

  function q(id) {
    return document.getElementById(id);
  }

  function clearFakeAuthStorage() {
    try {
      [
        "sabi_ai_studio_auth_013",
        "sabi_ai_studio_auth_013_email",
        "sabi_ai_studio_authenticated",
        "sabi_ai_studio_user_email",
        "sabi_ai_studio_google_auth_ok",
        "sabi_ai_studio_google_auth_email",
        "sabi_ai_studio_google_auth_ok_016",
        "sabi_ai_studio_google_auth_email_016",
        "sabi_auth_core_017_ok",
        "sabi_auth_core_017_email",
        "sabi_auth_core_017_provider",
        "sabi_real_google_auth_020_ok",
        "sabi_real_google_auth_020_email",
        "sabi_real_google_auth_020_provider",
        "sabi_google_redirect_auth_021_ok",
        "sabi_google_redirect_auth_021_email"
      ].forEach(function (k) {
        localStorage.removeItem(k);
      });
    } catch (e) {}
  }

  function waitAuth() {
    return new Promise(function (resolve, reject) {
      var tries = 0;
      var timer = setInterval(function () {
        tries++;

        if (window.firebase && firebase.auth && firebase.auth.GoogleAuthProvider) {
          clearInterval(timer);
          resolve(firebase.auth());
          return;
        }

        if (tries >= 100) {
          clearInterval(timer);
          reject(new Error("Firebase Auth is not loaded."));
        }
      }, 100);
    });
  }

  function saveRealFirebaseUser(user) {
    if (!user) return;

    try {
      localStorage.setItem(AUTH_OK, "true");
      localStorage.setItem(AUTH_EMAIL, user.email || "");
    } catch (e) {}

    clearFakeAuthStorage();
  }

  function unlockFullAccess(user) {
    if (user) saveRealFirebaseUser(user);

    document.body.classList.add("sabi-authenticated", "sabi-google-authenticated", "sabi-full-access");
    document.body.classList.remove("sabi-auth-locked", "sabi-auth013-locked", "auth-required", "locked");

    Array.prototype.slice.call(document.querySelectorAll("button,a,input,textarea,select,[role='button']")).forEach(function (el) {
      el.disabled = false;
      el.removeAttribute("disabled");
      el.removeAttribute("aria-disabled");
      el.removeAttribute("data-locked");
      el.removeAttribute("data-auth-required");
      el.style.pointerEvents = "";
      el.style.opacity = "";
      el.style.filter = "";
    });

    Array.prototype.slice.call(document.querySelectorAll(".locked,.is-locked,.auth-locked,[data-locked],[data-auth-required]")).forEach(function (el) {
      el.classList.remove("locked", "is-locked", "auth-locked");
      el.removeAttribute("data-locked");
      el.removeAttribute("data-auth-required");
      el.style.pointerEvents = "";
      el.style.opacity = "";
      el.style.filter = "";
    });

    window.dispatchEvent(new CustomEvent("sabi:auth:ready", {
      detail: {
        authenticated: true,
        provider: "google",
        email: user && user.email || ""
      }
    }));
  }

  async function getCurrentFirebaseUser() {
    var auth = await waitAuth();

    if (auth.currentUser) return auth.currentUser;

    return new Promise(function (resolve) {
      var done = false;
      var unsub = auth.onAuthStateChanged(function (user) {
        if (done) return;
        done = true;
        try { unsub(); } catch (e) {}
        resolve(user || null);
      });

      setTimeout(function () {
        if (done) return;
        done = true;
        try { unsub(); } catch (e) {}
        resolve(auth.currentUser || null);
      }, 1200);
    });
  }

  async function signInGoogle() {
    if (redirectBusy) return;
    redirectBusy = true;

    try {
      clearFakeAuthStorage();

      var auth = await waitAuth();

      try {
        if (auth.setPersistence && firebase.auth.Auth && firebase.auth.Auth.Persistence) {
          await auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
        }
      } catch (e) {}

      if (auth.currentUser) {
        unlockFullAccess(auth.currentUser);
        return;
      }

      var provider = new firebase.auth.GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });

      await auth.signInWithRedirect(provider);
    } catch (err) {
      console.error("[Sabi Strict Firebase Google Auth 022]", err);
      alert((err && err.message) ? err.message : "Google authorization failed.");
    } finally {
      setTimeout(function () {
        redirectBusy = false;
      }, 1500);
    }
  }

  async function handleAuthNav(event) {
    var target = event.target && event.target.closest ? event.target.closest("#authNav") : null;
    if (!target) return;

    event.preventDefault();
    event.stopPropagation();
    if (event.stopImmediatePropagation) event.stopImmediatePropagation();

    var realUser = await getCurrentFirebaseUser();

    if (realUser) {
      unlockFullAccess(realUser);
      return false;
    }

    signInGoogle();
    return false;
  }

  function bindAuthNav() {
    var authNav = q("authNav");
    if (!authNav) return;

    authNav.disabled = false;
    authNav.removeAttribute("disabled");
    authNav.removeAttribute("aria-disabled");
    authNav.removeAttribute("data-locked");
    authNav.style.pointerEvents = "";
    authNav.setAttribute("title", "Sign in with Google");
  }

  async function init() {
    bindAuthNav();

    try {
      var auth = await waitAuth();

      try {
        var redirectResult = await auth.getRedirectResult();
        if (redirectResult && redirectResult.user) {
          unlockFullAccess(redirectResult.user);
          return;
        }
      } catch (redirectErr) {
        console.error("[Sabi Strict Firebase Google Auth 022 redirect result]", redirectErr);
      }

      auth.onAuthStateChanged(function (user) {
        if (user) {
          unlockFullAccess(user);
        } else {
          try {
            localStorage.removeItem(AUTH_OK);
            localStorage.removeItem(AUTH_EMAIL);
          } catch (e) {}
        }
      });
    } catch (err) {
      console.warn("[Sabi Strict Firebase Google Auth 022]", err.message);
    }
  }

  window.SabiStrictGoogleAuth022 = {
    signInGoogle: signInGoogle,
    unlockFullAccess: unlockFullAccess,
    reset: async function () {
      clearFakeAuthStorage();
      try {
        localStorage.removeItem(AUTH_OK);
        localStorage.removeItem(AUTH_EMAIL);
      } catch (e) {}

      try {
        var auth = await waitAuth();
        await auth.signOut();
      } catch (e) {}
    },
    diagnose: function () {
      var currentUser = null;
      try {
        currentUser = window.firebase && firebase.auth ? firebase.auth().currentUser : null;
      } catch (e) {}

      return {
        hasAuthNav: !!q("authNav"),
        hasNewChat: !!q("newChat"),
        hasProjectsNav: !!q("projectsNav"),
        hasChatScreen: !!q("chatScreen"),
        hasChatEditor: !!q("chatEditor"),
        hasFirebase: !!window.firebase,
        hasFirebaseAuth: !!(window.firebase && firebase.auth),
        hasGoogleProvider: !!(window.firebase && firebase.auth && firebase.auth.GoogleAuthProvider),
        firebaseCurrentUser: !!currentUser,
        firebaseEmail: currentUser && currentUser.email || "",
        localStrictOk: (function () { try { return localStorage.getItem(AUTH_OK) === "true"; } catch (e) { return false; } })(),
        bodyHasFullAccess: document.body.classList.contains("sabi-full-access"),
        bodyClass: document.body.className
      };
    }
  };

  window.addEventListener("pointerdown", handleAuthNav, true);
  window.addEventListener("mousedown", handleAuthNav, true);
  window.addEventListener("click", handleAuthNav, true);

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  setTimeout(bindAuthNav, 500);
  setTimeout(bindAuthNav, 1200);
})();
/* SABI STRICT FIREBASE GOOGLE AUTH 022 END */

