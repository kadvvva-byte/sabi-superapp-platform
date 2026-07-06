const fs = require("fs");

function read(path) {
  return fs.readFileSync(path, "utf8");
}

function write(path, content) {
  fs.writeFileSync(path, content, "utf8");
  console.log("FIXED", path);
}

let profile = read("mobile/src/modules/profile/data/profile.ts");

profile = profile.replace(
  /export const PROFILE_KYC_STATE: ProfileKycState = \{[\s\S]*?\n\};/,
`export const PROFILE_KYC_STATE: ProfileKycState = {
  status: "pending",
  kycLevel: "Basic profile only",
  phoneVerified: true,
  emailVerified: false,
  livenessVerified: false,
  addressVerified: false,
  residencyCountry: "Uzbekistan",
  sourceOfFundsRequested: false,
  complianceStatus: "review",
  restrictedActions: [
    "Full KYC/AML review required",
    "Selfie/liveness confirmation required",
    "Identity documents required",
  ],
  reviewReason: "Full service activation requires KYC/AML review and required selfie/liveness confirmation from Profile.",
  reverificationRequired: false,
};`
);

profile = profile.replace(
  /export const PROFILE_VERIFICATION_DOCUMENTS: ProfileVerificationDocument\[\] = \[[\s\S]*?\n\];/,
`export const PROFILE_VERIFICATION_DOCUMENTS: ProfileVerificationDocument[] = [
  {
    id: "doc-1",
    title: "Passport",
    status: "pending",
    updatedAt: "Not submitted",
  },
  {
    id: "doc-2",
    title: "Liveness / Selfie Check",
    status: "pending",
    updatedAt: "Not submitted",
  },
  {
    id: "doc-3",
    title: "Address Confirmation",
    status: "pending",
    updatedAt: "Not submitted",
  },
];`
);

write("mobile/src/modules/profile/data/profile.ts", profile);

let qr = read("mobile/app/qr/index.tsx");

if (!qr.includes('FullActivationGate from "../../src/shared/auth/FullActivationGate"')) {
  qr = qr.replace(
    'import type { SabiQrFunctionCode, SabiQrFunctionDefinition } from "../../src/modules/qr/contracts/universalQr.contracts";',
    'import type { SabiQrFunctionCode, SabiQrFunctionDefinition } from "../../src/modules/qr/contracts/universalQr.contracts";\nimport FullActivationGate from "../../src/shared/auth/FullActivationGate";'
  );
}

if (qr.includes("export default function SabiQrCenterScreen() {") && !qr.includes("function SabiQrCenterScreenContent()")) {
  qr = qr.replace(
    "export default function SabiQrCenterScreen() {",
    "function SabiQrCenterScreenContent() {"
  );
}

if (!qr.includes('<FullActivationGate service="qr">')) {
  qr = qr.replace(
    "\nconst styles = StyleSheet.create({",
`\nexport default function SabiQrCenterScreen() {
  return (
    <FullActivationGate service="qr">
      <SabiQrCenterScreenContent />
    </FullActivationGate>
  );
}

const styles = StyleSheet.create({`
  );
}

write("mobile/app/qr/index.tsx", qr);

fs.writeFileSync("tools/owner-full-activation-001h-fix1.js", fs.readFileSync(__filename, "utf8"), "utf8");
console.log("OWNER-FULL-ACTIVATION-001H-FIX1 APPLIED");
