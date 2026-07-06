const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const root = __dirname;
const port = Number(process.env.PORT || 8080);
const target = (process.env.SABI_AI_PRIVATE_API_URL || "https://sabi-superapp-api-1047545881519.europe-west1.run.app").replace(/\/$/, "");

app.disable("x-powered-by");
app.use(express.json({ limit: "1mb" }));

app.use(function (_req, res, next) {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("Permissions-Policy", "geolocation=(), camera=(), microphone=()");
  next();
});

async function getIdentityToken() {
  if (process.env.SABI_AI_LOCAL_ID_TOKEN) return String(process.env.SABI_AI_LOCAL_ID_TOKEN).trim();
  const audience = encodeURIComponent(target);
  const metadataUrl = "http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/identity?audience=" + audience;
  const response = await fetch(metadataUrl, { headers: { "Metadata-Flavor": "Google" } });
  if (!response.ok) throw new Error("metadata_identity_token_failed_" + response.status);
  return String(await response.text()).trim();
}

async function proxyToSabi(pathname, options) {
  const token = await getIdentityToken();
  const response = await fetch(target + pathname, {
    method: options.method || "GET",
    headers: {
      "Authorization": "Bearer " + token,
      "Content-Type": "application/json"
    },
    body: options.body ? JSON.stringify(options.body) : undefined
  });
  const text = await response.text();
  let payload;
  try { payload = JSON.parse(text); } catch (_error) {
    payload = { ok: false, error: { code: "bad_upstream_json", message: "Sabi AI upstream did not return JSON." } };
  }
  return { status: response.status, payload };
}

app.get("/api/sabi-ai-studio/readiness", async function (_req, res) {
  try {
    const result = await proxyToSabi("/api/sabi-ai-studio/readiness", { method: "GET" });
    res.status(result.status).json(result.payload);
  } catch (_error) {
    res.status(503).json({ ok: false, provider: "sabi-ai", gatewayReady: false });
  }
});

app.post("/api/sabi-ai-studio/chat", async function (req, res) {
  try {
    const result = await proxyToSabi("/api/sabi-ai-studio/chat", {
      method: "POST",
      body: {
        message: String(req.body && req.body.message || ""),
        mode: String(req.body && req.body.mode || "brain")
      }
    });
    res.status(result.status).json(result.payload);
  } catch (_error) {
    res.status(503).json({
      ok: true,
      connected: false,
      runtimeReplyOk: false,
      provider: "sabi-ai",
      answer: "Sabi AI gateway is not ready yet."
    });
  }
});

app.use(express.static(root, {
  extensions: ["html"],
  maxAge: 0,
  etag: false,
  lastModified: false,
  setHeaders: function (res, filePath) {
    if (filePath.endsWith(".html") || filePath.endsWith(".js") || filePath.endsWith(".css")) {
      res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
      res.setHeader("Pragma", "no-cache");
      res.setHeader("Expires", "0");
    }
  }
}));

app.get("/", function (_req, res) {
  res.sendFile(path.join(root, "index.html"));
});

app.get("*", function (req, res) {
  const requested = req.path.replace(/^\/+/, "");
  const htmlPath = path.join(root, requested + ".html");
  if (!requested.includes("..") && fs.existsSync(htmlPath)) return res.sendFile(htmlPath);
  res.status(404).sendFile(path.join(root, "index.html"));
});

app.listen(port, "0.0.0.0", function () {
  console.log("Sabi official site serving on port " + port);
});
