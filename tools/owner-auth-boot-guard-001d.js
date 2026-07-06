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

let index = read("mobile/app/index.tsx");

if (!index.includes("hasUnifiedAccountProfile")) {
  index = index.replace(
    'import { isFirstLaunchFeatureEnabled } from "../src/shared/launch/firstLaunchScope";',
    'import { isFirstLaunchFeatureEnabled } from "../src/shared/launch/firstLaunchScope";\nimport { hasUnifiedAccountProfile } from "../src/shared/account/unified-account-profile";'
  );
}

index = index.replace(
`  const goTo = useCallback((path: "/home" | "/register") => {
    if (navigationStartedRef.current) return;
    navigationStartedRef.current = true;
    setNavigating(true);

    requestAnimationFrame(() => {
      InteractionManager.runAfterInteractions(() => {
        router.replace(path);
      });
    });
  }, []);`,
`  const goTo = useCallback((path: "/home" | "/register" | "/profile/complete") => {
    if (navigationStartedRef.current) return;
    navigationStartedRef.current = true;
    setNavigating(true);

    requestAnimationFrame(() => {
      InteractionManager.runAfterInteractions(() => {
        router.replace(path);
      });
    });
  }, []);

  const routeAuthenticatedEntry = useCallback(async () => {
    if (navigationStartedRef.current) return;
    setNavigating(true);

    try {
      const profileReady = await hasUnifiedAccountProfile();
      goTo(profileReady ? "/home" : "/profile/complete");
    } catch {
      goTo("/profile/complete");
    }
  }, [goTo]);`
);

index = index.replace(
`  useEffect(() => {
    if (!isAuthenticated) return;
    goTo("/home");
  }, [goTo, isAuthenticated]);`,
`  useEffect(() => {
    if (!isAuthenticated) return;
    void routeAuthenticatedEntry();
  }, [isAuthenticated, routeAuthenticatedEntry]);`
);

index = index.replace(
`    if (isAuthenticated) {
      goTo("/home");
      return;
    }`,
`    if (isAuthenticated) {
      void routeAuthenticatedEntry();
      return;
    }`
);

index = index.replace(
`  }, [goTo, isAuthenticated]);`,
`  }, [goTo, isAuthenticated, routeAuthenticatedEntry]);`
);

write("mobile/app/index.tsx", index);

let home = read("mobile/app/home.tsx");

if (!home.includes("../src/core/kernel/auth/use-auth-session")) {
  home = home.replace(
    'import { router } from "expo-router";',
    'import { router } from "expo-router";\nimport { useAuthSession } from "../src/core/kernel/auth/use-auth-session";\nimport { hasUnifiedAccountProfile } from "../src/shared/account/unified-account-profile";'
  );
}

if (!home.includes("const auth = useAuthSession();")) {
  home = home.replace(
`export default function HomeScreen() {
  const [GestureScreen, setGestureScreen] = useState<GestureScreenComponent | null>(
    () => cachedGestureScreen,
  );`,
`export default function HomeScreen() {
  const auth = useAuthSession();
  const [authRouteReady, setAuthRouteReady] = useState(false);
  const [GestureScreen, setGestureScreen] = useState<GestureScreenComponent | null>(
    () => cachedGestureScreen,
  );`
  );
}

if (!home.includes("const isAuthenticatedHomeSession")) {
  home = home.replace(
`  const [retryKey, setRetryKey] = useState(0);`,
`  const [retryKey, setRetryKey] = useState(0);

  const isAuthenticatedHomeSession =
    auth.isReady &&
    auth.isHydrated &&
    !auth.isHydrating &&
    auth.status === "authenticated" &&
    Boolean(auth.apiBaseUrl && auth.accessToken && auth.currentUserId);

  useEffect(() => {
    let cancelled = false;

    async function resolveHomeAuthRoute() {
      setAuthRouteReady(false);

      if (!auth.isHydrated || auth.isHydrating || !auth.isReady) {
        return;
      }

      if (!isAuthenticatedHomeSession) {
        router.replace("/");
        return;
      }

      try {
        const profileReady = await hasUnifiedAccountProfile();

        if (cancelled) return;

        if (!profileReady) {
          router.replace({
            pathname: "/profile/complete",
            params: {
              phone: auth.phoneNumber ?? "",
              userId: auth.currentUserId ?? "",
            },
          } as never);
          return;
        }

        setAuthRouteReady(true);
      } catch {
        if (cancelled) return;

        router.replace({
          pathname: "/profile/complete",
          params: {
            phone: auth.phoneNumber ?? "",
            userId: auth.currentUserId ?? "",
          },
        } as never);
      }
    }

    void resolveHomeAuthRoute();

    return () => {
      cancelled = true;
    };
  }, [
    auth.accessToken,
    auth.apiBaseUrl,
    auth.currentUserId,
    auth.isHydrated,
    auth.isHydrating,
    auth.isReady,
    auth.phoneNumber,
    auth.status,
    isAuthenticatedHomeSession,
  ]);`
  );
}

home = home.replace(
`  if (GestureScreen) {
    return <GestureScreen />;
  }`,
`  if (!authRouteReady) {
    return (
      <View style={styles.loadingHost}>
        <ActivityIndicator size="large" color="#77E28C" />
        <Text style={styles.loadingText}>Загрузка Sabi SuperApp…</Text>
      </View>
    );
  }

  if (GestureScreen) {
    return <GestureScreen />;
  }`
);

write("mobile/app/home.tsx", home);

console.log("AUTH-BOOT-GUARD-001D PATCH APPLIED");
