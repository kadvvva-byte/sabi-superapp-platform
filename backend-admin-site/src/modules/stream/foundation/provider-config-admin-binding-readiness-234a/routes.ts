import express, { type Router } from "express";
import {
  STREAM_PROVIDER_CONFIG_ADMIN_BINDING_READINESS_234A_OWNER_APPROVAL,
  STREAM_PROVIDER_CONFIG_ADMIN_BINDING_READINESS_234A_REQUIRED_SCOPES,
  STREAM_PROVIDER_CONFIG_ADMIN_BINDING_READINESS_234A_REQUIRED_SURFACES,
  assertStreamProviderConfigAdminBinding234ARemainsSafe,
  createStreamProviderActivationRequest234A,
  createStreamProviderAdminBindingApprovalRequest234A,
  createStreamProviderBindingRequest234A,
  createStreamProviderConfigValueReadRequest234A,
  createStreamProviderReferenceLabelValueReadRequest234A,
  createStreamProviderRuntimeEnablementRequest234A,
  getStreamProviderConfigAdminBindingReadiness234ASnapshot,
  prepareStreamProviderConfigAdminBindingReadiness234A,
} from "./service";

export function createStreamProviderConfigAdminBindingReadiness234ARouter(): Router {
  const router = express.Router();
  const basePath = "/api/admin/stream/provider-config/234a";

  router.get(`${basePath}/readiness`, (_req, res) => {
    res.status(200).json(getStreamProviderConfigAdminBindingReadiness234ASnapshot());
  });

  router.get(`${basePath}/safety`, (_req, res) => {
    res.status(200).json(assertStreamProviderConfigAdminBinding234ARemainsSafe());
  });

  router.get(`${basePath}/binding-matrix`, (_req, res) => {
    const snapshot = getStreamProviderConfigAdminBindingReadiness234ASnapshot();
    res.status(200).json({
      version: snapshot.version,
      adminBindingReadinessOnlyNoRuntime: true,
      providerNotConfiguredVisible: true,
      adminBindingReadinessVisible: true,
      providerScopeBindingPanelVisible: true,
      referenceLabelBindingPanelVisible: true,
      activationDryRunBlockerVisible: true,
      runtimeDisabledStatusVisible: true,
      exactApprovalGateVisible: true,
      statuses: snapshot.bindingStatuses,
    });
  });

  router.post(`${basePath}/readiness`, (req, res) => {
    const result = prepareStreamProviderConfigAdminBindingReadiness234A({
      ownerApproval: req.body?.ownerApproval ?? STREAM_PROVIDER_CONFIG_ADMIN_BINDING_READINESS_234A_OWNER_APPROVAL,
      readinessMode: req.body?.readinessMode ?? "provider_config_admin_binding_readiness_only",
      acknowledged233BStage: req.body?.acknowledged233BStage ?? "233B_reference_labels_final_handoff_clean",
      acknowledged232BStage: req.body?.acknowledged232BStage ?? "232B_admin_final_stream_control_center_clean",
      requiredScopes: req.body?.requiredScopes ?? STREAM_PROVIDER_CONFIG_ADMIN_BINDING_READINESS_234A_REQUIRED_SCOPES,
      requiredSurfaces: req.body?.requiredSurfaces ?? STREAM_PROVIDER_CONFIG_ADMIN_BINDING_READINESS_234A_REQUIRED_SURFACES,
      evidenceReferences: req.body?.evidenceReferences ?? ["233B_passed_128", "232B_passed_159", "admin_binding_readiness_only"],
      operatorNote: req.body?.operatorNote,
    });
    res.status(result.ok ? 200 : 423).json(result);
  });

  router.post(`${basePath}/config-value-read-request`, (_req, res) => {
    res.status(423).json(createStreamProviderConfigValueReadRequest234A());
  });

  router.post(`${basePath}/reference-label-value-read-request`, (_req, res) => {
    res.status(423).json(createStreamProviderReferenceLabelValueReadRequest234A());
  });

  router.post(`${basePath}/admin-binding-approval-request`, (_req, res) => {
    res.status(423).json(createStreamProviderAdminBindingApprovalRequest234A());
  });

  router.post(`${basePath}/provider-binding-request`, (_req, res) => {
    res.status(423).json(createStreamProviderBindingRequest234A());
  });

  router.post(`${basePath}/provider-activation-request`, (_req, res) => {
    res.status(423).json(createStreamProviderActivationRequest234A());
  });

  router.post(`${basePath}/runtime-enable-request`, (_req, res) => {
    res.status(423).json(createStreamProviderRuntimeEnablementRequest234A());
  });

  return router;
}
