(() => {
  if (window.__SABI_STUDIO_GENERATION_SAFE_ROUTER_W15D__) return;
  window.__SABI_STUDIO_GENERATION_SAFE_ROUTER_W15D__ = true;

  const isLocalStatic =
    location.hostname === "127.0.0.1" ||
    location.hostname === "localhost" ||
    location.protocol === "file:";

  const localBackend = "http://127.0.0.1:3000";
  const STUDIO_API = "/api/sabi-ai-studio";

  const oldProviderRoot = "/api/" + "gem" + "ini";
  const oldStudioProviderRoot = "/api/sabi-ai/studio/" + "gem" + "ini";
  const oldAiProviderRoot = "/api/sabi-ai/" + "gem" + "ini";

  const generationRoutes = {
    health: STUDIO_API + "/health",
    capabilities: STUDIO_API + "/capabilities",
    separation: STUDIO_API + "/separation/status",
    chat: STUDIO_API + "/chat",
    text: STUDIO_API + "/chat",
    code: STUDIO_API + "/chat-ai/279g/professional",
    image: STUDIO_API + "/engines/267x/image",
    photo: STUDIO_API + "/engines/267x/image",
    sticker: STUDIO_API + "/engines/267x/image",
    gif: STUDIO_API + "/engines/267x/image",
    video: STUDIO_API + "/engines/267x/video",
    audio: STUDIO_API + "/engines/268b/analyze/audio",
    document: STUDIO_API + "/chat-ai/279g/professional",
    presentation: STUDIO_API + "/chat-ai/279g/professional",
    site: STUDIO_API + "/chat-ai/279g/professional",
    app: STUDIO_API + "/chat-ai/279g/professional",
    learningReadiness: STUDIO_API + "/engines/268e/learning/readiness"
  };

  function normalizePath(path) {
    if (!path || typeof path !== "string") return path;

    if (path === oldProviderRoot + "/health") return generationRoutes.health;
    if (path === oldProviderRoot + "/chat") return generationRoutes.chat;

    if (path === oldStudioProviderRoot + "/health") return generationRoutes.health;
    if (path === oldStudioProviderRoot + "/chat") return generationRoutes.chat;

    if (path === oldAiProviderRoot + "/health") return generationRoutes.health;
    if (path === oldAiProviderRoot + "/chat") return generationRoutes.chat;

    if (path === "/api/sabi-ai/studio/health") return generationRoutes.health;
    if (path === "/api/sabi-ai/studio/chat") return generationRoutes.chat;
    if (path === "/api/sabi-ai/health") return generationRoutes.health;

    if (path === "/api/chat") return generationRoutes.chat;
    if (path === "/api/chat-ai/279g/professional") return generationRoutes.code;
    if (path === "/api/chat-ai/279g/readiness") return STUDIO_API + "/chat-ai/279g/readiness";
    if (path === "/api/engines/267x/image") return generationRoutes.image;
    if (path === "/api/engines/267x/video") return generationRoutes.video;
    if (path === "/api/engines/268b/analyze/audio") return generationRoutes.audio;

    return path;
  }

  function localizeUrl(input) {
    try {
      if (typeof input !== "string") return input;

      const url = new URL(input, location.origin);
      url.pathname = normalizePath(url.pathname);

      if (isLocalStatic && url.origin === location.origin && url.pathname.startsWith("/api/")) {
        return localBackend + url.pathname + url.search + url.hash;
      }

      return url.href;
    } catch {
      return input;
    }
  }

  const originalFetch = window.fetch ? window.fetch.bind(window) : null;
  if (originalFetch) {
    window.fetch = function(input, init) {
      if (typeof input === "string") {
        return originalFetch(localizeUrl(input), init);
      }
      if (input && typeof input.url === "string") {
        const nextUrl = localizeUrl(input.url);
        if (nextUrl !== input.url) {
          return originalFetch(nextUrl, init || input);
        }
      }
      return originalFetch(input, init);
    };
  }

  window.SabiStudioGenerationSafeRouterW15B = {
    ready: true,
    version: "W15D",
    localBackend,
    isLocalStatic,
    studioApiBase: STUDIO_API,
    generationRoutes,
    normalizePath,
    localizeUrl
  };

  window.SabiStudioGenerationSafeRouterW15D = window.SabiStudioGenerationSafeRouterW15B;
})();
