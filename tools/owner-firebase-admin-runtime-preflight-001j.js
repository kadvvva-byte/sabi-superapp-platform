const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const ROOT = process.cwd();

function read(rel) {
  const full = path.join(ROOT, rel);
  return fs.existsSync(full) ? fs.readFileSync(full, "utf8") : "";
}

function add(checks, name, passed, note, meta = {}) {
  checks.push({ name, passed: Boolean(passed), note, ...meta });
}

function gitTrackedFiles() {
  const result = spawnSync("git", ["ls-files"], {
    cwd: ROOT,
    encoding: "utf8",
    shell: process.platform === "win32",
  });

  if (result.status !== 0) {
    return [];
  }

  return result.stdout.split(/\r?\n/).map((v) => v.trim()).filter(Boolean);
}

function scanDangerSecrets(files) {
  const patterns = [
    /"type"\s*:\s*"service_account"/i,
    /"private_key"\s*:\s*"-----BEGIN PRIVATE KEY-----/i,
    /-----BEGIN PRIVATE KEY-----/i,
    /-----BEGIN RSA PRIVATE KEY-----/i,
    /-----BEGIN EC PRIVATE KEY-----/i,
  ];

  const hits = [];

  for (const rel of files) {
    const full = path.join(ROOT, rel);
    if (!fs.existsSync(full) || fs.statSync(full).isDirectory()) continue;

    const content = fs.readFileSync(full, "utf8");
    const lines = content.split(/\r?\n/);

    lines.forEach((line, index) => {
      for (const pattern of patterns) {
        if (pattern.test(line)) {
          hits.push({
            path: rel,
            lineNumber: index + 1,
            line: line.trim(),
          });
        }
      }
    });
  }

  return hits;
}

const checks = [];
const authController = read("backend-admin-site/src/modules/auth/presentation/auth.controller.ts");
const authRoutes = read("backend-admin-site/src/modules/auth/presentation/auth.routes.ts");
const packageJson = read("backend-admin-site/package.json");
const tracked = gitTrackedFiles();
const dangerHits = scanDangerSecrets(tracked);

const firebaseAuthProjectId =
  (process.env.FIREBASE_AUTH_PROJECT_ID || "").trim() || "sabi-official-prod-37629";

add(
  checks,
  "strict_git_secret_scan_clean",
  dangerHits.length === 0,
  "No tracked service-account/private-key material should be committed.",
  { dangerHitCount: dangerHits.length }
);

add(
  checks,
  "firebase_admin_dependency_present",
  packageJson.includes('"firebase-admin"'),
  "Backend must have firebase-admin dependency."
);

add(
  checks,
  "auth_bridge_project_id_env_supported",
  authController.includes("process.env.FIREBASE_AUTH_PROJECT_ID") &&
    authController.includes("sabi-official-prod-37629"),
  "Auth bridge must support FIREBASE_AUTH_PROJECT_ID and stable fallback project id."
);

add(
  checks,
  "auth_bridge_project_only_init",
  authController.includes("initializeApp(") &&
    authController.includes("projectId: FIREBASE_AUTH_PROJECT_ID") &&
    !authController.includes("cert(") &&
    !authController.includes("credential:"),
  "Phone auth bridge should initialize Firebase Admin with projectId only, not committed credentials."
);

add(
  checks,
  "auth_bridge_verify_id_token",
  authController.includes("verifyIdToken(idToken, false)") &&
    authController.includes("decoded.phone_number"),
  "Backend must verify Firebase ID token and require Firebase phone_number."
);

add(
  checks,
  "firebase_verify_routes_mounted",
  authRoutes.includes('router.post("/firebase/verify", controller.verifyFirebase);') &&
    authRoutes.includes('router.post("/phone/firebase/verify", controller.verifyFirebase);'),
  "Both Firebase verify routes must be mounted."
);

add(
  checks,
  "runtime_project_id_resolves",
  firebaseAuthProjectId === "sabi-official-prod-37629",
  "Runtime Firebase auth project id must resolve to sabi-official-prod-37629.",
  { firebaseAuthProjectId }
);

const passed = checks.every((check) => check.passed);

console.log(JSON.stringify({
  version: "OWNER-FIREBASE-ADMIN-RUNTIME-PREFLIGHT-001J",
  createdAt: new Date().toISOString(),
  passed,
  checks
}, null, 2));

process.exit(passed ? 0 : 1);
