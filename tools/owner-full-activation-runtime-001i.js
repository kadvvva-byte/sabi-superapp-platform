const fs = require("fs");

const checks = [];

function read(path) {
  return fs.existsSync(path) ? fs.readFileSync(path, "utf8") : "";
}

function add(name, passed, note) {
  checks.push({ name, passed: Boolean(passed), note });
}

const policy = read("mobile/src/shared/auth/fullActivationPolicy.ts");
const gate = read("mobile/src/shared/auth/FullActivationGate.tsx");
const profile = read("mobile/src/modules/profile/data/profile.ts");
const home = read("mobile/src/modules/home/panels/HomePanel.tsx");
const taxi = read("mobile/app/taxi.tsx");
const stream = read("mobile/app/stream.tsx");
const camera = read("mobile/app/camera.tsx");
const studio = read("mobile/app/ai-studio.tsx");
const qr = read("mobile/app/qr/index.tsx");

add("policy_exists", policy.includes("isFullActivationApproved"), "Full activation policy exists.");
add("gate_exists", gate.includes("FullActivationGate"), "Full activation gate component exists.");
add("fake_verified_profile_removed", !profile.includes('verificationStatus: "verified"'), "Profile user must not be fake verified.");
add("kyc_pending_default", profile.includes('status: "pending"') && profile.includes('livenessVerified: false'), "Default KYC must be pending/liveness false.");
add("taxi_wrapped", taxi.includes("<FullActivationGate service=\"taxi\">"), "Taxi route must be gated.");
add("stream_wrapped", stream.includes("<FullActivationGate service=\"stream\">"), "Stream route must be gated.");
add("camera_wrapped", camera.includes("<FullActivationGate service=\"camera\">"), "Camera route must be gated.");
add("studio_wrapped", studio.includes("<FullActivationGate service=\"sabi_ai_studio\">"), "Sabi AI Studio route must be gated.");
add("qr_wrapped", qr.includes("<FullActivationGate service=\"qr\">"), "QR center route must be gated.");
add("home_card_guard", home.includes("isSurfaceAllowedBeforeFullActivation(card.kind)") && home.includes("openActivationRequiredAlert"), "Home cards must block locked surfaces before full activation.");
add("no_literal_backslash_newline", !home.includes("\\nimport") && !qr.includes("\\nimport"), "No literal backslash-n import corruption.");

const passed = checks.every((check) => check.passed);

console.log(JSON.stringify({
  version: "OWNER-FULL-ACTIVATION-RUNTIME-VALIDATION-001I",
  createdAt: new Date().toISOString(),
  passed,
  checks
}, null, 2));

process.exit(passed ? 0 : 1);
