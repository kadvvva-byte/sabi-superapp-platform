import express, { type Router } from "express";
import {
  STREAM_PROVIDER_CONFIG_READINESS_233A_OWNER_APPROVAL,
  STREAM_PROVIDER_CONFIG_READINESS_233A_REQUIRED_SCOPES,
  STREAM_PROVIDER_CONFIG_READINESS_233A_REQUIRED_SURFACES,
  assertStreamProviderConfigReadiness233ARemainsSafe,
  createStreamProviderBindingRequest233A,
  createStreamProviderConfigDbRequest233A,
  createStreamProviderConfigValueReadRequest233A,
  createStreamProviderRuntimeEnablementRequest233A,
  getStreamProviderConfigReadiness233ASnapshot,
  prepareStreamProviderConfigReadiness233A,
} from "./service";

export function createStreamProviderConfigReadiness233ARouter(): Router {
  const router = express.Router();
  const basePath = "/api/admin/stream/provider-config/233a";

  router.get(`${basePath}/readiness`, (_req, res) => {
    res.status(200).json(getStreamProviderConfigReadiness233ASnapshot());
  });

  router.get(`${basePath}/safety`, (_req, res) => {
    res.status(200).json(assertStreamProviderConfigReadiness233ARemainsSafe());
  });

  router.get(`${basePath}/scope-matrix`, (_req, res) => {
    const snapshot = getStreamProviderConfigReadiness233ASnapshot();
    res.status(200).json({
      version: snapshot.version,
      providerConfigReadinessOnlyNoRuntime: true,
      providerNotConfiguredVisible: true,
      providerScopeMatrixVisible: true,
      referenceLabelStatusVisible: true,
      runtimeDisabledStatusVisible: true,
      exactApprovalGateVisible: true,
      scopes: snapshot.scopeStatuses,
    });
  });

  router.post(`${basePath}/readiness`, (req, res) => {
    const result = prepareStreamProviderConfigReadiness233A({
      ownerApproval: req.body?.ownerApproval ?? STREAM_PROVIDER_CONFIG_READINESS_233A_OWNER_APPROVAL,
      readinessMode: req.body?.readinessMode ?? "provider_config_readiness_visibility_only",
      acknowledged232BStage: req.body?.acknowledged232BStage ?? "232B_admin_final_stream_control_center_clean",
      requiredScopes: req.body?.requiredScopes ?? STREAM_PROVIDER_CONFIG_READINESS_233A_REQUIRED_SCOPES,
      requiredSurfaces: req.body?.requiredSurfaces ?? STREAM_PROVIDER_CONFIG_READINESS_233A_REQUIRED_SURFACES,
      evidenceReferences: req.body?.evidenceReferences ?? ["232B_passed_159", "provider_config_readiness_visibility_only"],
      operatorNote: req.body?.operatorNote,
    });
    res.status(result.ok ? 200 : 423).json(result);
  });

  router.post(`${basePath}/config-value-read-request`, (_req, res) => {
    res.status(423).json(createStreamProviderConfigValueReadRequest233A());
  });

  router.post(`${basePath}/provider-binding-request`, (_req, res) => {
    res.status(423).json(createStreamProviderBindingRequest233A());
  });

  router.post(`${basePath}/runtime-enable-request`, (_req, res) => {
    res.status(423).json(createStreamProviderRuntimeEnablementRequest233A());
  });

  router.post(`${basePath}/db-request`, (_req, res) => {
    res.status(423).json(createStreamProviderConfigDbRequest233A());
  });

  return router;
}
