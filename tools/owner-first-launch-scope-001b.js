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

function patch(rel, from, to) {
  const full = file(rel);
  let c = fs.readFileSync(full, "utf8");
  if (!c.includes(from)) {
    throw new Error(`Pattern not found in ${rel}: ${from.slice(0, 160)}`);
  }
  c = c.replace(from, to);
  fs.writeFileSync(full, c, "utf8");
  console.log("PATCH", rel);
}

write("mobile/src/shared/launch/firstLaunchScope.ts", `export type FirstLaunchFeature =
  | "auth"
  | "sabi_ai"
  | "business_assistant"
  | "messenger"
  | "calls"
  | "taxi"
  | "stream"
  | "sabi_ai_studio"
  | "gallery"
  | "camera"
  | "presentation"
  | "qr"
  | "wallet";

export const FIRST_LAUNCH_SCOPE: Record<FirstLaunchFeature, boolean> = {
  auth: true,
  sabi_ai: true,
  business_assistant: true,
  messenger: true,
  calls: true,
  taxi: true,
  stream: true,
  sabi_ai_studio: true,
  gallery: true,
  camera: true,
  presentation: true,
  qr: true,

  // Wallet stays in source/runtime for gradual future activation.
  // First launch hides wallet entry points only; it does not delete routes,
  // backend contracts, QR linkage, future payment linkage, or admin readiness.
  wallet: false,
};

const WALLET_SURFACE_KINDS = new Set([
  "wallet",
  "sabipay",
  "cards",
  "card",
  "payment",
  "payments",
  "p2p",
  "crypto",
  "coin_wallet",
  "crypto_wallet",
]);

export function isFirstLaunchFeatureEnabled(feature: FirstLaunchFeature): boolean {
  return FIRST_LAUNCH_SCOPE[feature] === true;
}

export function isFirstLaunchWalletSurface(kind?: string | null): boolean {
  const normalized = String(kind ?? "").trim().toLowerCase();
  return WALLET_SURFACE_KINDS.has(normalized);
}

export function shouldShowFirstLaunchSurface(kind?: string | null): boolean {
  return !isFirstLaunchWalletSurface(kind);
}
`);

let index = read("mobile/app/index.tsx");

if (!index.includes("QrCode")) {
  index = index.replace(
    "MessageCircleMore,\n  ShieldCheck,",
    "MessageCircleMore,\n  QrCode,\n  ShieldCheck,"
  );
}

if (!index.includes("../src/shared/launch/firstLaunchScope")) {
  index = index.replace(
    'import { setAppLanguage, useI18n } from "../src/shared/i18n";',
    'import { setAppLanguage, useI18n } from "../src/shared/i18n";\nimport { isFirstLaunchFeatureEnabled } from "../src/shared/launch/firstLaunchScope";'
  );
}

if (!index.includes("const showWalletOnboarding")) {
  index = index.replace(
    "  const compact = height < 720;\n",
    '  const compact = height < 720;\n  const showWalletOnboarding = isFirstLaunchFeatureEnabled("wallet");\n'
  );
}

index = index.replace(
  `                  <FeatureRow
                    icon={<Wallet size={20} color="#FFFFFF" />}
                    title={t("onboarding.walletTitle")}
                    text={t("onboarding.walletSubtitle")}
                    compact={compact}
                  />`,
  `                  <FeatureRow
                    icon={
                      showWalletOnboarding ? (
                        <Wallet size={20} color="#FFFFFF" />
                      ) : (
                        <QrCode size={20} color="#FFFFFF" />
                      )
                    }
                    title={showWalletOnboarding ? t("onboarding.walletTitle") : "QR"}
                    text={
                      showWalletOnboarding
                        ? t("onboarding.walletSubtitle")
                        : "Sabi QR, secure entry and identity tools."
                    }
                    compact={compact}
                  />`
);

write("mobile/app/index.tsx", index);

let gesture = read("mobile/src/modules/home/gesture/GestureScreen.tsx");

if (!gesture.includes("../../shared/launch/firstLaunchScope") && !gesture.includes("../../../shared/launch/firstLaunchScope")) {
  gesture = gesture.replace(
    'import HomePanel from "../panels/HomePanel";',
    'import HomePanel from "../panels/HomePanel";\nimport { isFirstLaunchFeatureEnabled } from "../../../shared/launch/firstLaunchScope";'
  );
}

if (!gesture.includes("const walletPanelEnabled")) {
  gesture = gesture.replace(
    '  const { isHomeEditMode } = useHomeEditMode();\n',
    '  const { isHomeEditMode } = useHomeEditMode();\n  const walletPanelEnabled = isFirstLaunchFeatureEnabled("wallet");\n'
  );
}

gesture = gesture.replace(
  '        onStartShouldSetPanResponder: () => !isHomeEditMode && currentPanelRef.current === "home",\n        onMoveShouldSetPanResponder: (_, gesture) => {\n          const shouldOpen =\n            !isHomeEditMode &&',
  '        onStartShouldSetPanResponder: () =>\n          walletPanelEnabled && !isHomeEditMode && currentPanelRef.current === "home",\n        onMoveShouldSetPanResponder: (_, gesture) => {\n          const shouldOpen =\n            walletPanelEnabled &&\n            !isHomeEditMode &&'
);

gesture = gesture.replace(
  "    [animateTo, completeDistanceX, isHomeEditMode, loadLazyPanel, screenWidth, translateX],",
  "    [animateTo, completeDistanceX, isHomeEditMode, loadLazyPanel, screenWidth, translateX, walletPanelEnabled],"
);

write("mobile/src/modules/home/gesture/GestureScreen.tsx", gesture);

let home = read("mobile/src/modules/home/panels/HomePanel.tsx");

if (!home.includes("../../../shared/launch/firstLaunchScope")) {
  home = home.replace(
    'import { getSabiMobilePolicy, isHomeCryptoPanelVisibleForSabiPolicy, isMiniAppKindVisibleForSabiPolicy } from "../../../shared/policy/sabiMobilePolicy";',
    'import { getSabiMobilePolicy, isHomeCryptoPanelVisibleForSabiPolicy, isMiniAppKindVisibleForSabiPolicy } from "../../../shared/policy/sabiMobilePolicy";\nimport { isFirstLaunchWalletSurface } from "../../../shared/launch/firstLaunchScope";'
  );
}

home = home.replace(
  `  const defaultDockItems = useMemo(
    () => (isWeb ? WEB_DOCK_ITEMS : MOBILE_DOCK_ITEMS),
    [isWeb],
  );`,
  `  const defaultDockItems = useMemo(
    () =>
      (isWeb ? WEB_DOCK_ITEMS : MOBILE_DOCK_ITEMS).filter(
        (item) => !isFirstLaunchWalletSurface(item.kind),
      ),
    [isWeb],
  );`
);

if (!home.includes("const firstLaunchStaticHomeCards")) {
  home = home.replace(
    `  const localizedStaticHomeCards = useMemo(
    () => STATIC_HOME_CARDS.filter((item) => isMiniAppKindVisibleForSabiPolicy(item.kind, mobilePolicy)).map((item) => localizeSilkRoadMiniAppItem(item, language)),
    [language, mobilePolicy],
  );

  const staticKinds = useMemo(
    () => new Set(localizedStaticHomeCards.map((item) => item.kind)),
    [localizedStaticHomeCards],
  );`,
    `  const localizedStaticHomeCards = useMemo(
    () => STATIC_HOME_CARDS.filter((item) => isMiniAppKindVisibleForSabiPolicy(item.kind, mobilePolicy)).map((item) => localizeSilkRoadMiniAppItem(item, language)),
    [language, mobilePolicy],
  );

  const firstLaunchStaticHomeCards = useMemo(
    () => localizedStaticHomeCards.filter((item) => !isFirstLaunchWalletSurface(item.kind)),
    [localizedStaticHomeCards],
  );

  const staticKinds = useMemo(
    () => new Set(firstLaunchStaticHomeCards.map((item) => item.kind)),
    [firstLaunchStaticHomeCards],
  );`
  );
}

home = home.replace(
  '.filter((app) => app.kind !== "mini_apps" && app.id !== "mini-apps" && !staticKinds.has(app.kind) && isMiniAppKindVisibleForSabiPolicy(app.kind, mobilePolicy))',
  '.filter((app) => app.kind !== "mini_apps" && app.id !== "mini-apps" && !staticKinds.has(app.kind) && !isFirstLaunchWalletSurface(app.kind) && isMiniAppKindVisibleForSabiPolicy(app.kind, mobilePolicy))'
);

home = home.replace(
  `  const allKnownCards = useMemo<HomeCard[]>(
    () => [...localizedStaticHomeCards, ...miniAppCards],
    [localizedStaticHomeCards, miniAppCards],
  );`,
  `  const allKnownCards = useMemo<HomeCard[]>(
    () => [...firstLaunchStaticHomeCards, ...miniAppCards],
    [firstLaunchStaticHomeCards, miniAppCards],
  );`
);

write("mobile/src/modules/home/panels/HomePanel.tsx", home);

console.log("FIRST-LAUNCH-SCOPE-001B PATCH APPLIED");
