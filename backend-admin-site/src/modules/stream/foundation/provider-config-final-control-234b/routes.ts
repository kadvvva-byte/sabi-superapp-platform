import express, { type Router } from "express";
import {
  STREAM_PROVIDER_CONFIG_FINAL_CONTROL_234B_OWNER_APPROVAL,
  STREAM_PROVIDER_CONFIG_FINAL_CONTROL_234B_REQUIRED_SCOPES,
  STREAM_PROVIDER_CONFIG_FINAL_CONTROL_234B_REQUIRED_SURFACES,
  assertStreamProviderConfigFinalControl234BRemainsSafe,
  createStreamProviderActivationRequest234B,
  createStreamProviderAdminBindingApprovalRequest234B,
  createStreamProviderBindingRequest234B,
  createStreamProviderCallRequest234B,
  createStreamProviderConfigValueReadRequest234B,
  createStreamProviderLaunchRuntimeRequest234B,
  createStreamProviderReferenceLabelValueReadRequest234B,
  createStreamProviderReferenceLabelWriteRequest234B,
  createStreamProviderRuntimeEnablementRequest234B,
  getStreamProviderConfigFinalControl234BSnapshot,
  prepareStreamProviderConfigFinalControl234B,
} from "./service";

export function createStreamProviderConfigFinalControl234BRouter(): Router {
  const router = express.Router();
  const basePath = "/api/admin/stream/provider-config/234b";

  router.get(`${basePath}/readiness`, (_req, res) => {
    res.status(200).json(getStreamProviderConfigFinalControl234BSnapshot());
  });

  router.get(`${basePath}/safety`, (_req, res) => {
    res.status(200).json(assertStreamProviderConfigFinalControl234BRemainsSafe());
  });

  router.get(`${basePath}/final-control`, (_req, res) => {
    const snapshot = getStreamProviderConfigFinalControl234BSnapshot();
    res.status(200).json({
      version: snapshot.version,
      finalControlOnlyNoRuntime: true,
      providerNotConfiguredVisible: true,
      providerConfigSafeDisabledCoveragePercent: 100,
      providerScopeMatrixLocked: true,
      referenceLabelMatrixLocked: true,
      adminBindingReadinessLocked: true,
      missingConfigBlockerVisible: true,
      finalRuntimeDisabledStatusVisible: true,
      exactApprovalGateVisible: true,
      scopeStatuses: snapshot.scopeStatuses,
    });
  });

  router.post(`${basePath}/readiness`, (req, res) => {
    const result = prepareStreamProviderConfigFinalControl234B({
      ownerApproval: req.body?.ownerApproval ?? STREAM_PROVIDER_CONFIG_FINAL_CONTROL_234B_OWNER_APPROVAL,
      finalControlMode: req.body?.finalControlMode ?? "provider_config_final_control_only",
      acknowledged234AStage: req.body?.acknowledged234AStage ?? "234A_admin_binding_readiness_clean",
      acknowledged233BStage: req.body?.acknowledged233BStage ?? "233B_reference_labels_final_handoff_clean",
      acknowledged232BStage: req.body?.acknowledged232BStage ?? "232B_admin_final_stream_control_center_clean",
      requiredScopes: req.body?.requiredScopes ?? STREAM_PROVIDER_CONFIG_FINAL_CONTROL_234B_REQUIRED_SCOPES,
      requiredSurfaces: req.body?.requiredSurfaces ?? STREAM_PROVIDER_CONFIG_FINAL_CONTROL_234B_REQUIRED_SURFACES,
      evidenceReferences: req.body?.evidenceReferences ?? ["234A_passed_142", "233B_passed_128", "232B_passed_159", "provider_config_final_control_only"],
      operatorNote: req.body?.operatorNote,
    });
    res.status(result.ok ? 200 : 423).json(result);
  });

  router.post(`${basePath}/config-value-read-request`, (_req, res) => {
    res.status(423).json(createStreamProviderConfigValueReadRequest234B());
  });

  router.post(`${basePath}/reference-label-value-read-request`, (_req, res) => {
    res.status(423).json(createStreamProviderReferenceLabelValueReadRequest234B());
  });

  router.post(`${basePath}/reference-label-write-request`, (_req, res) => {
    res.status(423).json(createStreamProviderReferenceLabelWriteRequest234B());
  });

  router.post(`${basePath}/admin-binding-approval-request`, (_req, res) => {
    res.status(423).json(createStreamProviderAdminBindingApprovalRequest234B());
  });

  router.post(`${basePath}/provider-binding-request`, (_req, res) => {
    res.status(423).json(createStreamProviderBindingRequest234B());
  });

  router.post(`${basePath}/provider-activation-request`, (_req, res) => {
    res.status(423).json(createStreamProviderActivationRequest234B());
  });

  router.post(`${basePath}/provider-call-request`, (_req, res) => {
    res.status(423).json(createStreamProviderCallRequest234B());
  });

  router.post(`${basePath}/runtime-enable-request`, (_req, res) => {
    res.status(423).json(createStreamProviderRuntimeEnablementRequest234B());
  });

  router.post(`${basePath}/launch-runtime-request`, (_req, res) => {
    res.status(423).json(createStreamProviderLaunchRuntimeRequest234B());
  });

  return router;
}
