import { Router } from "express";
import { sabiProgramFoundationService } from "./program-foundation.service";
import { buildSabiHomeFoundationManifest } from "./home-foundation.manifest";

const router = Router();

router.get("/home/foundation", (_req, res) => {
  res.json(buildSabiHomeFoundationManifest());
});

router.get("/home/widgets", (_req, res) => {
  const manifest = buildSabiHomeFoundationManifest();
  res.json({ ok: true, version: manifest.version, widgets: manifest.widgets });
});

router.get("/home/dock", (_req, res) => {
  const manifest = buildSabiHomeFoundationManifest();
  res.json({ ok: true, version: manifest.version, dock: manifest.dock });
});

router.get("/home/notifications/digest", (_req, res) => {
  const manifest = buildSabiHomeFoundationManifest();
  res.json({ ok: true, version: manifest.version, digest: manifest.notificationDigest });
});

router.get("/home/notifications/policy", (_req, res) => {
  const manifest = buildSabiHomeFoundationManifest();
  res.json({ ok: true, version: manifest.version, policy: manifest.notificationPolicy });
});

router.get("/home/voice/manifest", (_req, res) => {
  const manifest = buildSabiHomeFoundationManifest();
  res.json({ ok: true, version: manifest.version, voice: manifest.voice });
});

router.get("/home/search/manifest", (_req, res) => {
  const manifest = buildSabiHomeFoundationManifest();
  res.json({ ok: true, version: manifest.version, search: manifest.search });
});

router.get("/home/audit", (_req, res) => {
  const manifest = buildSabiHomeFoundationManifest();
  res.json({
    ok: true,
    version: manifest.version,
    rules: {
      mobileHomeRoute: manifest.mobileHomeRoute,
      legacyHomeRouteBlocked: manifest.legacyHomeRouteBlocked,
      fakeDataAllowed: manifest.fakeDataAllowed,
      mobileMiniAppsAccess: "swipe_up_only",
      webMiniAppsAccess: "bottom_dock_only",
      widgetTitlesLanguage: "english_brand_names",
      screenCopySource: "runtime_i18n",
      notificationPolicy: manifest.notificationPolicy,
    },
  });
});

router.get("/", (_req, res) => {
  res.json({
    ok: true,
    version: "HOME-100.17",
    programs: sabiProgramFoundationService.listPrograms(),
  });
});

router.get("/home", (_req, res) => {
  res.json({
    ok: true,
    version: "HOME-100.17",
    programs: sabiProgramFoundationService.getHomePrograms(),
  });
});

router.get("/:code/status", (req, res) => {
  const status = sabiProgramFoundationService.getProgramStatus(req.params.code);

  if (!status) {
    res.status(404).json({
      ok: false,
      code: "sabi_program_not_found",
      message: "Sabi program foundation is not registered.",
    });
    return;
  }

  res.json(status);
});

router.get("/route/resolve", (req, res) => {
  const route = typeof req.query.route === "string" ? req.query.route : "";
  const program = sabiProgramFoundationService.resolveProgramForRoute(route);

  if (!program) {
    res.status(404).json({
      ok: false,
      code: "sabi_program_route_not_found",
      message: "No program foundation is registered for this mobile route.",
    });
    return;
  }

  res.json({ ok: true, version: "HOME-100.17", program });
});

export default router;
