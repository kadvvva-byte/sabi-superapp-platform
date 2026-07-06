const fs = require("fs");

const p = "mobile/src/modules/home/gesture/GestureScreen.tsx";
let c = fs.readFileSync(p, "utf8");

// 1) Restore Messenger swipe: must NOT depend on walletPanelEnabled.
c = c.replace(
`        onStartShouldSetPanResponder: () =>
          walletPanelEnabled && !isHomeEditMode && currentPanelRef.current === "home",
        onMoveShouldSetPanResponder: (_, gesture) => {
          const shouldOpen =
            walletPanelEnabled &&
            !isHomeEditMode &&
            currentPanelRef.current === "home" &&
            Math.abs(gesture.dx) > START_THRESHOLD_X &&
            Math.abs(gesture.dx) > Math.abs(gesture.dy) &&
            gesture.dx > 0;`,
`        onStartShouldSetPanResponder: () => !isHomeEditMode && currentPanelRef.current === "home",
        onMoveShouldSetPanResponder: (_, gesture) => {
          const shouldOpen =
            !isHomeEditMode &&
            currentPanelRef.current === "home" &&
            Math.abs(gesture.dx) > START_THRESHOLD_X &&
            Math.abs(gesture.dx) > Math.abs(gesture.dy) &&
            gesture.dx > 0;`
);

c = c.replace(
`    [animateTo, completeDistanceX, isHomeEditMode, loadLazyPanel, screenWidth, translateX, walletPanelEnabled],
  );

  const homeToWalletResponder = useMemo(`,
`    [animateTo, completeDistanceX, isHomeEditMode, loadLazyPanel, screenWidth, translateX],
  );

  const homeToWalletResponder = useMemo(`
);

// 2) Guard Wallet swipe only.
c = c.replace(
`        onStartShouldSetPanResponder: () => !isHomeEditMode && currentPanelRef.current === "home",
        onMoveShouldSetPanResponder: (_, gesture) => {
          const shouldOpen =
            !isHomeEditMode &&
            currentPanelRef.current === "home" &&
            Math.abs(gesture.dx) > START_THRESHOLD_X &&
            Math.abs(gesture.dx) > Math.abs(gesture.dy) &&
            gesture.dx < 0;`,
`        onStartShouldSetPanResponder: () =>
          walletPanelEnabled && !isHomeEditMode && currentPanelRef.current === "home",
        onMoveShouldSetPanResponder: (_, gesture) => {
          const shouldOpen =
            walletPanelEnabled &&
            !isHomeEditMode &&
            currentPanelRef.current === "home" &&
            Math.abs(gesture.dx) > START_THRESHOLD_X &&
            Math.abs(gesture.dx) > Math.abs(gesture.dy) &&
            gesture.dx < 0;`
);

c = c.replace(
`    [animateTo, completeDistanceX, isHomeEditMode, loadLazyPanel, screenWidth, translateX],
  );

  const homeToMiniAppsResponder = useMemo(`,
`    [animateTo, completeDistanceX, isHomeEditMode, loadLazyPanel, screenWidth, translateX, walletPanelEnabled],
  );

  const homeToMiniAppsResponder = useMemo(`
);

fs.writeFileSync(p, c, "utf8");
console.log("FIXED 001B GestureScreen wallet-only guard");
