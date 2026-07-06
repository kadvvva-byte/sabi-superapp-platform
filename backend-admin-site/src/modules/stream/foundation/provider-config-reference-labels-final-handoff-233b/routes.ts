import express, { type Router } from "express";
import {
  STREAM_PROVIDER_CONFIG_REFERENCE_LABELS_FINAL_HANDOFF_233B_OWNER_APPROVAL,
  STREAM_PROVIDER_CONFIG_REFERENCE_LABELS_FINAL_HANDOFF_233B_REQUIRED_SCOPES,
  STREAM_PROVIDER_CONFIG_REFERENCE_LABELS_FINAL_HANDOFF_233B_REQUIRED_SURFACES,
  assertStreamProviderConfigReferenceLabels233BRemainSafe,
  createStreamProviderConfigBindingRequest233B,
  createStreamProviderConfigReferenceLabelValueReadRequest233B,
  createStreamProviderConfigReferenceLabelWriteRequest233B,
  createStreamProviderConfigRuntimeEnablementRequest233B,
  getStreamProviderConfigReferenceLabelsFinalHandoff233BSnapshot,
  prepareStreamProviderConfigReferenceLabelsFinalHandoff233B,
} from "./service";

export function createStreamProviderConfigReferenceLabelsFinalHandoff233BRouter(): Router {
  const router = express.Router();
  const basePath = "/api/admin/stream/provider-config/233b";

  router.get(`${basePath}/handoff`, (_req, res) => {
    res.status(200).json(getStreamProviderConfigReferenceLabelsFinalHandoff233BSnapshot());
  });

  router.get(`${basePath}/safety`, (_req, res) => {
    res.status(200).json(assertStreamProviderConfigReferenceLabels233BRemainSafe());
  });

  router.get(`${basePath}/reference-label-matrix`, (_req, res) => {
    const snapshot = getStreamProviderConfigReferenceLabelsFinalHandoff233BSnapshot();
    res.status(200).json({
      version: snapshot.version,
      finalHandoffOnlyNoRuntime: true,
      providerNotConfiguredVisible: true,
      referenceLabelMatrixVisible: true,
      scopeOwnershipPanelVisible: true,
      missingLabelBlockerVisible: true,
      runtimeDisabledStatusVisible: true,
      exactApprovalGateVisible: true,
      labels: snapshot.labelStatuses,
    });
  });

  router.post(`${basePath}/handoff`, (req, res) => {
    const result = prepareStreamProviderConfigReferenceLabelsFinalHandoff233B({
      ownerApproval: req.body?.ownerApproval ?? STREAM_PROVIDER_CONFIG_REFERENCE_LABELS_FINAL_HANDOFF_233B_OWNER_APPROVAL,
      handoffMode: req.body?.handoffMode ?? "provider_config_reference_labels_final_handoff_only",
      acknowledged233AStage: req.body?.acknowledged233AStage ?? "233A_provider_config_readiness_clean",
      acknowledged232BStage: req.body?.acknowledged232BStage ?? "232B_admin_final_stream_control_center_clean",
      requiredScopes: req.body?.requiredScopes ?? STREAM_PROVIDER_CONFIG_REFERENCE_LABELS_FINAL_HANDOFF_233B_REQUIRED_SCOPES,
      requiredSurfaces: req.body?.requiredSurfaces ?? STREAM_PROVIDER_CONFIG_REFERENCE_LABELS_FINAL_HANDOFF_233B_REQUIRED_SURFACES,
      evidenceReferences: req.body?.evidenceReferences ?? ["233A_passed_121", "232B_passed_159", "reference_labels_final_handoff_only"],
      operatorNote: req.body?.operatorNote,
    });
    res.status(result.ok ? 200 : 423).json(result);
  });

  router.post(`${basePath}/label-value-read-request`, (_req, res) => {
    res.status(423).json(createStreamProviderConfigReferenceLabelValueReadRequest233B());
  });

  router.post(`${basePath}/label-write-request`, (_req, res) => {
    res.status(423).json(createStreamProviderConfigReferenceLabelWriteRequest233B());
  });

  router.post(`${basePath}/provider-binding-request`, (_req, res) => {
    res.status(423).json(createStreamProviderConfigBindingRequest233B());
  });

  router.post(`${basePath}/runtime-enable-request`, (_req, res) => {
    res.status(423).json(createStreamProviderConfigRuntimeEnablementRequest233B());
  });

  return router;
}
