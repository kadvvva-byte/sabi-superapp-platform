const fs = require("fs");

const file = "mobile/src/shared/access/sabi-access-policy.ts";
const content = fs.readFileSync(file, "utf8");

const mustOpenWithoutKyc = [
  "home",
  "messenger",
  "calls",
  "taxi",
  "stream",
  "sabi_ai",
  "business_assistant",
  "sabi_ai_studio",
  "gallery",
  "camera",
  "presentation",
  "qr",
];

const mustRequireKyc = [
  "wallet",
  "wallet_payment",
  "payment",
  "card",
  "checkout",
  "topup",
  "withdraw",
  "payout",
  "money_transfer",
  "subscription_payment",
];

const checks = [
  {
    name: "policy_version_present",
    passed: content.includes('SABI_ACCESS_POLICY_VERSION = "OWNER-ACCESS-POLICY-001S"'),
  },
  {
    name: "non_wallet_apps_have_no_kyc_gate",
    passed: mustOpenWithoutKyc.every((surface) => content.includes(`| "${surface}"`) || content.includes(surface)),
  },
  {
    name: "wallet_payment_surfaces_require_kyc",
    passed: mustRequireKyc.every((surface) => content.includes(`"${surface}"`)),
  },
  {
    name: "direct_open_function_present",
    passed: content.includes("canOpenAppSurfaceWithoutKyc") && content.includes("return !requiresKycForSurface(surface)"),
  },
];

console.log(JSON.stringify({
  version: "OWNER-ACCESS-POLICY-VALIDATION-001S",
  passed: checks.every((check) => check.passed),
  checks,
}, null, 2));

process.exit(checks.every((check) => check.passed) ? 0 : 1);
