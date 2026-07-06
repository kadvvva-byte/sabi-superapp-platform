import { Router } from "express";
import {
  getSabiGalleryFoundationStatus,
  SABI_GALLERY_FOUNDATION_POLICY,
} from "./gallery-foundation.service";

const router = Router();

router.get("/status", (_req, res) => {
  res.json(getSabiGalleryFoundationStatus());
});

router.get("/policy", (_req, res) => {
  res.json({ ok: true, version: "GALLERY-100.7", policy: SABI_GALLERY_FOUNDATION_POLICY });
});

router.get("/public-policy", (_req, res) => {
  res.json({
    ok: true,
    version: "GALLERY-100.7",
    privateByDefault: true,
    publicRequiresExplicitSelection: true,
    autoPublicUploadAllowed: false,
    fakePublicPhotosAllowed: false,
    publicProfileBridgeReady: true,
    persistenceReady: true,
    safeDeleteReady: true,
    systemShareExportReady: true,
    corruptedStorageRepairReady: true,
    publicProfileSelectorsReady: true,
    publicProfileSnapshotReady: true,
    privateLeakProtectionReady: true,
    editorRealEffectsReady: true,
    acceptedFullscreenViewerReady: true,
    acceptedSabiPlayerReady: true,
  });
});

export default router;
