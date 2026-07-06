import express, { type Router } from "express";
import {
  STREAM_ADMIN_ROOMS_CONTROL_231A_OWNER_APPROVAL,
  STREAM_ADMIN_ROOMS_CONTROL_231A_REQUIRED_ARTIFACTS,
  STREAM_ADMIN_ROOMS_CONTROL_231A_REQUIRED_SURFACES,
  assertStreamAdminRoomsControl231ARemainsSafe,
  createStreamAdminProviderRoomCallRequest231A,
  createStreamAdminRoomAuditWriteRequest231A,
  createStreamAdminRoomCreateRequest231A,
  createStreamAdminRoomEndRequest231A,
  createStreamAdminRoomJoinRequest231A,
  createStreamAdminRoomLeaveRequest231A,
  createStreamAdminRoomStateMutationRequest231A,
  createStreamAdminRoomsDbMutationRequest231A,
  getStreamAdminRoomsControl231ASnapshot,
  prepareStreamAdminRoomsControl231A,
} from "./service";

export function createStreamAdminRoomsControl231ARouter(): Router {
  const router = express.Router();
  const basePath = "/api/admin/stream/admin-rooms/control/231a";

  router.get(`${basePath}/readiness`, (_req, res) => {
    res.status(200).json(getStreamAdminRoomsControl231ASnapshot());
  });

  router.get(`${basePath}/safety`, (_req, res) => {
    res.status(200).json(assertStreamAdminRoomsControl231ARemainsSafe());
  });

  router.get(`${basePath}/control-contract`, (_req, res) => {
    res.status(200).json({
      version: getStreamAdminRoomsControl231ASnapshot().version,
      contract: "admin.stream.rooms.control.safe_disabled.v1",
      requiredArtifacts: STREAM_ADMIN_ROOMS_CONTROL_231A_REQUIRED_ARTIFACTS,
      requiredSurfaces: STREAM_ADMIN_ROOMS_CONTROL_231A_REQUIRED_SURFACES,
      providerNotConfiguredVisible: true,
      roomLifecycleStatusVisible: true,
      roomCreateControlVisible: true,
      roomJoinControlVisible: true,
      roomLeaveControlVisible: true,
      roomEndControlVisible: true,
      adminRoomRuntimeTogglesLocked: true,
      runtimeExecutionApprovedNow: false,
      futureRuntimeExecutionRequiresNewExactOwnerApproval: true,
    });
  });

  router.post(`${basePath}/readiness`, (req, res) => {
    const result = prepareStreamAdminRoomsControl231A({
      ownerApproval: req.body?.ownerApproval ?? STREAM_ADMIN_ROOMS_CONTROL_231A_OWNER_APPROVAL,
      controlMode: req.body?.controlMode ?? "admin_rooms_control_visibility_only",
      acknowledged230BStage: req.body?.acknowledged230BStage ?? "230B_admin_provider_runtime_control_clean",
      acknowledged225BStage: req.body?.acknowledged225BStage ?? "225B_rooms_lifecycle_final_handoff_clean",
      evidenceReferences: req.body?.evidenceReferences ?? ["230B_passed_141", "230A_passed_134", "225B_passed_128", "229A_passed_153"],
      requiredArtifacts: req.body?.requiredArtifacts ?? STREAM_ADMIN_ROOMS_CONTROL_231A_REQUIRED_ARTIFACTS,
      requiredSurfaces: req.body?.requiredSurfaces ?? STREAM_ADMIN_ROOMS_CONTROL_231A_REQUIRED_SURFACES,
      operatorNote: req.body?.operatorNote,
    });
    res.status(result.ok ? 200 : 423).json(result);
  });

  router.post(`${basePath}/room-create-request`, (_req, res) => {
    res.status(423).json(createStreamAdminRoomCreateRequest231A());
  });

  router.post(`${basePath}/room-join-request`, (_req, res) => {
    res.status(423).json(createStreamAdminRoomJoinRequest231A());
  });

  router.post(`${basePath}/room-leave-request`, (_req, res) => {
    res.status(423).json(createStreamAdminRoomLeaveRequest231A());
  });

  router.post(`${basePath}/room-end-request`, (_req, res) => {
    res.status(423).json(createStreamAdminRoomEndRequest231A());
  });

  router.post(`${basePath}/room-state-mutation-request`, (_req, res) => {
    res.status(423).json(createStreamAdminRoomStateMutationRequest231A());
  });

  router.post(`${basePath}/room-audit-write-request`, (_req, res) => {
    res.status(423).json(createStreamAdminRoomAuditWriteRequest231A());
  });

  router.post(`${basePath}/provider-room-call-request`, (_req, res) => {
    res.status(423).json(createStreamAdminProviderRoomCallRequest231A());
  });

  router.post(`${basePath}/db-mutation-request`, (_req, res) => {
    res.status(423).json(createStreamAdminRoomsDbMutationRequest231A());
  });

  return router;
}
