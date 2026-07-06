import express, { type Router } from "express";
import {
  STREAM_ADMIN_PROVIDER_RUNTIME_CONTROL_230B_OWNER_APPROVAL,
  STREAM_ADMIN_PROVIDER_RUNTIME_CONTROL_230B_REQUIRED_ARTIFACTS,
  STREAM_ADMIN_PROVIDER_RUNTIME_CONTROL_230B_REQUIRED_SURFACES,
  assertStreamAdminProviderRuntimeControl230BRemainsSafe,
  createStreamAdminDbMutationRequest230B,
  createStreamAdminProviderBindingRequest230B,
  createStreamAdminProviderCallRequest230B,
  createStreamAdminProviderEnableRequest230B,
  createStreamAdminProviderLookupRequest230B,
  createStreamAdminRuntimeToggleRequest230B,
  getStreamAdminProviderRuntimeControl230BSnapshot,
  prepareStreamAdminProviderRuntimeControl230B,
} from "./service";

export function createStreamAdminProviderRuntimeControl230BRouter(): Router {
  const router = express.Router();
  const basePath = "/api/admin/stream/admin-provider-runtime/control/230b";

  router.get(`${basePath}/readiness`, (_req, res) => {
    res.status(200).json(getStreamAdminProviderRuntimeControl230BSnapshot());
  });

  router.get(`${basePath}/safety`, (_req, res) => {
    res.status(200).json(assertStreamAdminProviderRuntimeControl230BRemainsSafe());
  });

  router.get(`${basePath}/control-contract`, (_req, res) => {
    res.status(200).json({
      version: getStreamAdminProviderRuntimeControl230BSnapshot().version,
      contract: "admin.stream.provider.runtime.control.safe_disabled.v1",
      requiredArtifacts: STREAM_ADMIN_PROVIDER_RUNTIME_CONTROL_230B_REQUIRED_ARTIFACTS,
      requiredSurfaces: STREAM_ADMIN_PROVIDER_RUNTIME_CONTROL_230B_REQUIRED_SURFACES,
      providerNotConfiguredVisible: true,
      providerRuntimeDisabledVisible: true,
      adminRuntimeToggleLocked: true,
      providerBindingLocked: true,
      providerLookupLocked: true,
      providerCallLocked: true,
      exactOwnerApprovalRequiredVisible: true,
      runtimeExecutionApprovedNow: false,
      futureRuntimeExecutionRequiresNewExactOwnerApproval: true,
    });
  });

  router.post(`${basePath}/readiness`, (req, res) => {
    const result = prepareStreamAdminProviderRuntimeControl230B({
      ownerApproval: req.body?.ownerApproval ?? STREAM_ADMIN_PROVIDER_RUNTIME_CONTROL_230B_OWNER_APPROVAL,
      controlMode: req.body?.controlMode ?? "admin_provider_runtime_control_visibility_only",
      acknowledged230AStage: req.body?.acknowledged230AStage ?? "230A_admin_foundation_visibility_clean",
      evidenceReferences: req.body?.evidenceReferences ?? ["230A_passed_134", "229A_passed_153", "228B_passed_149", "227B_passed_147", "226B_passed_147", "225B_passed_128"],
      requiredArtifacts: req.body?.requiredArtifacts ?? STREAM_ADMIN_PROVIDER_RUNTIME_CONTROL_230B_REQUIRED_ARTIFACTS,
      requiredSurfaces: req.body?.requiredSurfaces ?? STREAM_ADMIN_PROVIDER_RUNTIME_CONTROL_230B_REQUIRED_SURFACES,
      operatorNote: req.body?.operatorNote,
    });
    res.status(result.ok ? 200 : 423).json(result);
  });

  router.post(`${basePath}/admin-runtime-toggle-request`, (_req, res) => {
    res.status(423).json(createStreamAdminRuntimeToggleRequest230B());
  });

  router.post(`${basePath}/provider-enable-request`, (_req, res) => {
    res.status(423).json(createStreamAdminProviderEnableRequest230B());
  });

  router.post(`${basePath}/provider-binding-request`, (_req, res) => {
    res.status(423).json(createStreamAdminProviderBindingRequest230B());
  });

  router.post(`${basePath}/provider-lookup-request`, (_req, res) => {
    res.status(423).json(createStreamAdminProviderLookupRequest230B());
  });

  router.post(`${basePath}/provider-call-request`, (_req, res) => {
    res.status(423).json(createStreamAdminProviderCallRequest230B());
  });

  router.post(`${basePath}/db-mutation-request`, (_req, res) => {
    res.status(423).json(createStreamAdminDbMutationRequest230B());
  });

  return router;
}
