const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

function file(rel) {
  return path.join(ROOT, rel);
}

function read(rel) {
  return fs.readFileSync(file(rel), "utf8");
}

function write(rel, content) {
  const full = file(rel);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content, "utf8");
  console.log("WRITE", rel);
}

write("mobile/src/shared/auth/fullActivationPolicy.ts", `import { PROFILE_KYC_STATE } from "../../modules/profile/data/profile";
import type { ProfileKycState } from "../../modules/profile/types";

export type FullActivationService =
  | "profile"
  | "verification"
  | "messenger"
  | "gallery"
  | "presentation"
  | "taxi"
  | "stream"
  | "camera"
  | "qr"
  | "sabi_ai_studio"
  | "ai"
  | "ai_voice"
  | "marketplace"
  | "supermarket"
  | "hotels"
  | "food_delivery"
  | "wholesale_market"
  | "business"
  | "merchant"
  | "wallet"
  | "cards"
  | "sabipay"
  | "payments"
  | "mini_apps"
  | string;

const BASIC_ALLOWED_SURFACES = new Set<string>([
  "auth",
  "profile",
  "verification",
  "profile_verification",
  "messenger",
  "chat",
  "chats",
  "calls",
  "gallery",
  "presentation",
  "settings",
  "manage",
]);

const FULL_ACTIVATION_REQUIRED_SURFACES = new Set<string>([
  "taxi",
  "stream",
  "camera",
  "qr",
  "sabi_ai_studio",
  "ai",
  "ai_voice",
  "marketplace",
  "supermarket",
  "hotels",
  "hotel",
  "food",
  "food_delivery",
  "wholesale",
  "wholesale_market",
  "business",
  "merchant",
  "delivery",
  "events",
  "games",
  "wallet",
  "cards",
  "sabipay",
  "payments",
  "p2p",
  "coin_wallet",
  "crypto_wallet",
  "mini_apps",
]);

function normalizeSurface(value: unknown): string {
  return String(value ?? "").trim().toLowerCase();
}

export function isFullActivationApproved(state: ProfileKycState = PROFILE_KYC_STATE): boolean {
  return (
    state.status === "verified" &&
    state.livenessVerified === true &&
    state.complianceStatus === "clear" &&
    state.reverificationRequired !== true &&
    state.restrictedActions.length === 0
  );
}

export function isSurfaceAllowedBeforeFullActivation(surface: FullActivationService): boolean {
  return BASIC_ALLOWED_SURFACES.has(normalizeSurface(surface));
}

export function isFullActivationRequiredForSurface(surface: FullActivationService): boolean {
  const normalized = normalizeSurface(surface);
  if (isSurfaceAllowedBeforeFullActivation(normalized)) return false;
  return FULL_ACTIVATION_REQUIRED_SURFACES.has(normalized);
}

export function shouldBlockSurfaceBeforeFullActivation(surface: FullActivationService): boolean {
  if (isFullActivationApproved()) return false;
  return isFullActivationRequiredForSurface(surface);
}

export function getFullActivationRequiredMessage(surface?: string | null): string {
  const name = String(surface || "this service").trim() || "this service";

  return [
    \`\${name} requires full Sabi account activation.\`,
    "Complete KYC/AML review, document verification and required selfie/liveness confirmation in Profile before using commercial, financial or high-trust services.",
    "Until approval, only Messenger, Gallery and Presentation remain available.",
  ].join("\\n\\n");
}

export function getFullActivationStatusLabel(state: ProfileKycState = PROFILE_KYC_STATE): string {
  if (isFullActivationApproved(state)) return "Full activation approved";
  if (state.status === "rejected") return "Activation rejected";
  if (state.status === "review") return "KYC/AML review";
  if (state.status === "limited") return "Limited activation";
  return "Full activation required";
}
`);

write("mobile/src/shared/auth/FullActivationGate.tsx", `import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import {
  getFullActivationRequiredMessage,
  getFullActivationStatusLabel,
  isFullActivationApproved,
  type FullActivationService,
} from "./fullActivationPolicy";

type FullActivationGateProps = {
  service: FullActivationService;
  children: React.ReactNode;
};

export default function FullActivationGate({
  service,
  children,
}: FullActivationGateProps) {
  if (isFullActivationApproved()) {
    return <>{children}</>;
  }

  return (
    <View style={styles.root}>
      <View style={styles.card}>
        <Text style={styles.badge}>{getFullActivationStatusLabel()}</Text>
        <Text style={styles.title}>Требуется полная активация Sabi</Text>
        <Text style={styles.text}>{getFullActivationRequiredMessage(String(service))}</Text>

        <Pressable
          style={styles.primaryButton}
          onPress={() => router.push("/profile/verification" as never)}
        >
          <Text style={styles.primaryButtonText}>Открыть KYC/AML и selfie</Text>
        </Pressable>

        <Pressable
          style={styles.secondaryButton}
          onPress={() => router.replace("/home" as never)}
        >
          <Text style={styles.secondaryButtonText}>Вернуться на главный экран</Text>
        </Pressable>

        <Text style={styles.note}>
          Этот экран не выполняет платежи, провайдерские операции, KYC-решения или серверные изменения.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#04120D",
    alignItems: "center",
    justifyContent: "center",
    padding: 18,
  },
  card: {
    width: "100%",
    maxWidth: 520,
    borderRadius: 28,
    backgroundColor: "rgba(14, 28, 46, 0.92)",
    borderWidth: 1,
    borderColor: "rgba(119,226,140,0.18)",
    padding: 20,
  },
  badge: {
    alignSelf: "flex-start",
    color: "#77E28C",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 1.2,
    textTransform: "uppercase",
    marginBottom: 10,
  },
  title: {
    color: "#F5FBFF",
    fontSize: 24,
    fontWeight: "900",
    lineHeight: 30,
  },
  text: {
    color: "#A8C3D7",
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "700",
    marginTop: 12,
  },
  primaryButton: {
    minHeight: 50,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#77E28C",
    marginTop: 18,
  },
  primaryButtonText: {
    color: "#04120D",
    fontSize: 15,
    fontWeight: "900",
  },
  secondaryButton: {
    minHeight: 48,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
    marginTop: 10,
  },
  secondaryButtonText: {
    color: "#F5FBFF",
    fontSize: 14,
    fontWeight: "900",
  },
  note: {
    color: "rgba(245,251,255,0.58)",
    fontSize: 12,
    lineHeight: 18,
    fontWeight: "700",
    marginTop: 14,
  },
});
`);

let profileData = read("mobile/src/modules/profile/data/profile.ts");

profileData = profileData.replace(
  '  verificationStatus: "verified",',
  '  verificationStatus: "pending",'
);

profileData = profileData.replace(
`export const PROFILE_VERIFICATION_DOCUMENTS: ProfileVerificationDocument[] = [
  {
    id: "doc-1",
    title: "Passport",
    status: "approved",
    updatedAt: "2026-03-24",
  },
  {
    id: "doc-2",
    title: "Liveness / Selfie Check",
    status: "approved",
    updatedAt: "2026-03-24",
  },
  {
    id: "doc-3",
    title: "Address Confirmation",
    status: "review",
    updatedAt: "2026-03-25",
  },
];`,
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

profileData = profileData.replace(
`export const PROFILE_KYC_STATE: ProfileKycState = {
  status: "verified",
  kycLevel: "KYC Level 2",
  phoneVerified: true,
  emailVerified: true,
  livenessVerified: true,
  addressVerified: false,
  residencyCountry: "Uzbekistan",
  sourceOfFundsRequested: false,
  complianceStatus: "review",
  restrictedActions: ["High-value payout review", "Business/KYB not started yet"],
  reviewReason: "Address confirmation still under review.",
  reverificationRequired: false,
};`,
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
    "Identity documents required"
  ],
  reviewReason: "Full service activation requires KYC/AML review and required selfie/liveness confirmation from Profile.",
  reverificationRequired: false,
};`
);

write("mobile/src/modules/profile/data/profile.ts", profileData);

let homePanel = read("mobile/src/modules/home/panels/HomePanel.tsx");

if (!homePanel.includes("fullActivationPolicy")) {
  homePanel = homePanel.replace(
    'import { isFirstLaunchWalletSurface } from "../../../shared/launch/firstLaunchScope";',
    'import { isFirstLaunchWalletSurface } from "../../../shared/launch/firstLaunchScope";\\nimport { getFullActivationRequiredMessage, isFullActivationApproved, isSurfaceAllowedBeforeFullActivation } from "../../../shared/auth/fullActivationPolicy";'
  );
}

if (!homePanel.includes("const fullActivationApproved = isFullActivationApproved();")) {
  homePanel = homePanel.replace(
    "  const mobilePolicy = useMemo(() => getSabiMobilePolicy(), []);",
    "  const mobilePolicy = useMemo(() => getSabiMobilePolicy(), []);\\n  const fullActivationApproved = isFullActivationApproved();"
  );
}

if (!homePanel.includes("openActivationRequiredAlert")) {
  homePanel = homePanel.replace(
`  const openFullMessenger = useCallback(() => {
    closeEditMode();
    router.push("/tabs" as never);
  }, [closeEditMode]);`,
`  const openFullMessenger = useCallback(() => {
    closeEditMode();
    router.push("/tabs" as never);
  }, [closeEditMode]);

  const openActivationRequiredAlert = useCallback((surface: string) => {
    Alert.alert("Full activation required", getFullActivationRequiredMessage(surface), [
      {
        text: "Open verification",
        onPress: () => router.push("/profile/verification" as never),
      },
      {
        text: "OK",
        style: "cancel",
      },
    ]);
  }, []);

  const openAiVoiceControl = useCallback(() => {
    closeEditMode();

    if (!fullActivationApproved && !isSurfaceAllowedBeforeFullActivation("ai_voice")) {
      openActivationRequiredAlert("SABI Voice");
      return;
    }

    router.push("/ai/voice-control" as never);
  }, [closeEditMode, fullActivationApproved, openActivationRequiredAlert]);`
  );
}

if (!homePanel.includes("openActivationRequiredAlert(card.title || card.kind);")) {
  homePanel = homePanel.replace(
`    switch (card.kind) {`,
`    if (!fullActivationApproved && !isSurfaceAllowedBeforeFullActivation(card.kind)) {
      openActivationRequiredAlert(card.title || card.kind);
      return;
    }

    switch (card.kind) {`
  );
}

homePanel = homePanel.replace(
  'onPress={() => { closeEditMode(); router.push("/ai/voice-control" as never); }}',
  'onPress={openAiVoiceControl}'
);

write("mobile/src/modules/home/panels/HomePanel.tsx", homePanel);

write("mobile/app/taxi.tsx", `import React from "react";
import TaxiScreen from "../src/modules/taxi/screens/TaxiScreen";
import FullActivationGate from "../src/shared/auth/FullActivationGate";

export default function TaxiRouteScreen() {
  return (
    <FullActivationGate service="taxi">
      <TaxiScreen />
    </FullActivationGate>
  );
}
`);

write("mobile/app/stream.tsx", `import React from "react";
import StreamScreen from "../src/modules/stream/screens/StreamScreen";
import FullActivationGate from "../src/shared/auth/FullActivationGate";

export default function StreamRouteScreen() {
  return (
    <FullActivationGate service="stream">
      <StreamScreen />
    </FullActivationGate>
  );
}
`);

write("mobile/app/camera.tsx", `import React from "react";
import SabiModuleEntryScreen from "../src/modules/home/screens/SabiModuleEntryScreen";
import FullActivationGate from "../src/shared/auth/FullActivationGate";

export default function CameraEntryScreen() {
  return (
    <FullActivationGate service="camera">
      <SabiModuleEntryScreen moduleCode="camera" />
    </FullActivationGate>
  );
}
`);

write("mobile/app/ai-studio.tsx", `import React from "react";
import SabiAiStudioMobileEntryScreen from "../src/modules/ai/mobile/studio/SabiAiStudioMobileEntryScreen";
import FullActivationGate from "../src/shared/auth/FullActivationGate";

export default function AiStudioRouteScreen() {
  return (
    <FullActivationGate service="sabi_ai_studio">
      <SabiAiStudioMobileEntryScreen />
    </FullActivationGate>
  );
}
`);

let qrIndex = read("mobile/app/qr/index.tsx");

if (!qrIndex.includes("FullActivationGate")) {
  qrIndex = qrIndex.replace(
    'import type { SabiQrFunctionCode, SabiQrFunctionDefinition } from "../../src/modules/qr/contracts/universalQr.contracts";',
    'import type { SabiQrFunctionCode, SabiQrFunctionDefinition } from "../../src/modules/qr/contracts/universalQr.contracts";\\nimport FullActivationGate from "../../src/shared/auth/FullActivationGate";'
  );

  qrIndex = qrIndex.replace(
    "export default function SabiQrCenterScreen() {",
    "function SabiQrCenterScreenContent() {"
  );

  qrIndex = qrIndex.replace(
    "\\nconst styles = StyleSheet.create({",
    `\\nexport default function SabiQrCenterScreen() {
  return (
    <FullActivationGate service="qr">
      <SabiQrCenterScreenContent />
    </FullActivationGate>
  );
}

const styles = StyleSheet.create({`
  );
}

write("mobile/app/qr/index.tsx", qrIndex);

write("tools/owner-full-activation-001h.js", fs.readFileSync(__filename, "utf8"));

console.log("OWNER-FULL-ACTIVATION-001H PATCH APPLIED");
