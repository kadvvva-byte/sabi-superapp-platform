const fs = require("fs");

const policy = fs.readFileSync("mobile/src/shared/auth/fullActivationPolicy.ts", "utf8");
const homePanel = fs.readFileSync("mobile/src/modules/home/panels/HomePanel.tsx", "utf8");

const checks = [
  {
    name: "owner_policy_version_present",
    passed: policy.includes('KYC_UI_BLOCKING_POLICY_VERSION = "OWNER-REMOVE-KYC-UI-BLOCK-001V"'),
  },
  {
    name: "surface_allowed_always_true",
    passed: /isSurfaceAllowedBeforeFullActivation[\s\S]*return true;/.test(policy),
  },
  {
    name: "full_activation_required_always_false",
    passed: /isFullActivationRequiredForSurface[\s\S]*return false;/.test(policy),
  },
  {
    name: "should_block_always_false",
    passed: /shouldBlockSurfaceBeforeFullActivation[\s\S]*return false;/.test(policy),
  },
  {
    name: "approved_always_true",
    passed: /isFullActivationApproved[\s\S]*return true;/.test(policy),
  },
  {
    name: "old_required_surface_set_removed",
    passed:
      !policy.includes("FULL_ACTIVATION_REQUIRED_SURFACES") &&
      !policy.includes("WALLET_PAYMENT_REQUIRED_SURFACES"),
  },
  {
    name: "homepanel_gate_now_never_blocks",
    passed:
      homePanel.includes("isSurfaceAllowedBeforeFullActivation") &&
      policy.includes("return true;"),
  },
];

console.log(JSON.stringify({
  version: "OWNER-REMOVE-KYC-UI-BLOCK-VALIDATION-001V",
  passed: checks.every((check) => check.passed),
  checks,
}, null, 2));

process.exit(checks.every((check) => check.passed) ? 0 : 1);
