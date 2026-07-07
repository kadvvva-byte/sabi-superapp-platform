const fs = require("fs");

const file = "mobile/app/home.tsx";
let content = fs.readFileSync(file, "utf8");

// React import: только нужные hooks.
content = content.replace(
  /import React,\s*\{[\s\S]*?\}\s*from "react";/,
  `import React, {
  useCallback,
  useEffect,
} from "react";`
);

// React Native import: убрать InteractionManager.
content = content.replace(/\n\s*InteractionManager,\s*/g, "\n");

// Прямой import GestureScreen.
if (!content.includes(`import GestureScreen from "../src/modules/home/gesture/GestureScreen";`)) {
  content = content.replace(
    /import\s*\{\s*hasUnifiedAccountProfile\s*\}\s*from\s*"[^"]*unified-account-profile";/,
    (match) => `${match}\nimport GestureScreen from "../src/modules/home/gesture/GestureScreen";`
  );
}

// Убрать ComponentType/cache.
content = content.replace(
  /\ntype GestureScreenComponent[\s\S]*?let cachedGestureScreen[\s\S]*?=\s*null;\s*/m,
  "\n"
);

// Убрать lazy state block.
content = content.replace(
  /\n\s*const \[GestureScreen,[\s\S]*?\n\s*const \[retryKey,[^\n]*\n/m,
  "\n"
);

// Убрать lazy-load useEffect с dynamic import.
const dynamicPos = content.indexOf(`void import("../src/modules/home/gesture/GestureScreen")`);
if (dynamicPos >= 0) {
  const effectStart = content.lastIndexOf(`  useEffect(() => {`, dynamicPos);
  const handleRetryStart = content.indexOf(`  const handleRetry`, dynamicPos);

  if (effectStart < 0 || handleRetryStart < 0) {
    throw new Error("Could not locate dynamic import effect range");
  }

  content = content.slice(0, effectStart) + content.slice(handleRetryStart);
}

// Retry теперь просто перезаходит на home.
content = content.replace(
  /  const handleRetry = useCallback\(\(\) => \{[\s\S]*?\n  \}, \[\]\);/m,
  `  const handleRetry = useCallback(() => {
    router.replace("/home" as never);
  }, []);`
);

// Если остался старый render-block — заменить на прямой главный экран.
const renderStart = content.indexOf(`  if (GestureScreen) {`);
const fallbackStart = content.indexOf(`  return (
    <ScrollView`, renderStart);

if (renderStart >= 0 && fallbackStart > renderStart) {
  content = content.slice(0, renderStart) +
    `  if (authRouteReady) {
    return <GestureScreen />;
  }

` +
    content.slice(fallbackStart);
}

// Если уже есть голый return <GestureScreen />;, делаем его условным, чтобы fallback код не считался мусором.
content = content.replace(
  /  return <GestureScreen \/>\;\n\n  return \(/,
  `  if (authRouteReady) {
    return <GestureScreen />;
  }

  return (`
);

fs.writeFileSync(file, content, "utf8");

console.log("OWNER-HOME-DIRECT-GESTURESCREEN-001R-FIX1 APPLIED");
console.log("FIXED", file);
