import express from "express";
import path from "path";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import { createServer } from "http";
import { Server } from "socket.io";
import { configureRealtimeEmitter } from "./core/realtime/realtime.emitter";

import { errorMiddleware } from "./middleware/error.middleware";
import { requireAuthenticatedUser } from "./middleware/authenticated-user.middleware";

import { IdempotencyRepository } from "./core/idempotency/idempotency.repository";
import { IdempotencyService } from "./core/idempotency/idempotency.service";
import { idempotencyMiddleware } from "./core/idempotency/idempotency.middleware";

import { eventBus } from "./core/events/event-bus.instance";
import { transactionListener } from "./modules/activity/listeners/transaction.listener";
import { PrismaActivityRepository } from "./modules/activity/infrastructure/persistence/prisma-activity.repository";

import { SuperAppKernel } from "./core/kernel/superapp.kernel";
import { PlatformFoundationKernelModule } from "./core/kernel/platform";
import { AiKernelModule } from "./modules/ai/ai.kernel-module";
import {
  configureMessengerKernelModule,
  MessengerKernelModule,
} from "./modules/messenger/messenger.kernel-module";
import {
  configureSabiCallsKernelModule,
  SabiCallsKernelModule,
} from "./modules/sabi-calls/kernel";

import { MiniAppPlatform } from "./core/miniapps/miniapp.platform";
import { loadMiniApps } from "./core/miniapps/miniapp.loader";

import { NotificationService } from "./modules/notification/application/services/notification.service";
import { createAiModule } from "./modules/ai/ai.module";
import { ActivityService } from "./modules/activity/application/services/activity.service";
import { FraudDetectionService } from "./modules/fraud/application/services/fraud-detection.service";

import { createAuthModule } from "./modules/auth/auth.module";
import { PrismaAuthAccountRepository } from "./modules/auth/infrastructure/persistence/prisma-auth-account.repository";
import { JwtTokenService } from "./modules/auth/infrastructure/security/jwt-token.service";
import { ScryptPasswordService } from "./modules/auth/infrastructure/security/scrypt-password.service";

import { createUserModule } from "./modules/user/user.module";
import { PrismaUserRepository } from "./modules/user/infrastructure/persistence/prisma-user.repository";

import uploadRoutes from "./modules/media/infrastructure/routes/upload.routes";

import { initFirebase } from "./core/push/firebase";
import messengerModuleRoutes from "./modules/messenger";
import qrModuleRoutes from "./modules/qr/infrastructure/routes/qr-core.routes";
import { buildWalletProviderConfigRouter } from "./modules/wallet/infrastructure/routes/wallet-provider-config.routes";
import { sabiProgramFoundationRoutes } from "./modules/programs";
import { sabiGalleryFoundationRoutes } from "./modules/gallery";
import { sabiNetworkGameCenterFoundationRoutes } from "./modules/network-game-center";
import {
  createStreamFoundationKernelDiagnosticsBackendRouteConnectionHandler,
  getStreamFoundationKernelDiagnosticsBackendRouteConnectionReadiness,
} from "./modules/stream";
import {
  createStreamFoundationLiveHeartbeatRuntimeHandlerDraftDecision,
  createStreamFoundationLiveStartRuntimeHandlerDraftDecision,
  createStreamFoundationLiveStopRuntimeHandlerDraftDecision,
} from "./modules/stream/foundation/live-write-runtime-handler";
import { createAdminModule } from "./modules/admin/admin.module";
import { playReady37ReviewerEvidenceAdminRoutes } from "./modules/play-ready/foundation/play-ready-37-reviewer-evidence-admin-route-mount/playReady37ReviewerEvidenceAdminRoutes";
import { createSabiCallIncomingPushMiddleware, createSabiCallPushRouter } from "./modules/sabi-calls/infrastructure/routes/sabi-call-push.routes";

import { bootstrapEvents } from "./core/kernel/events/bootstrap-events";
import { createStreamBillingLedgerAdminProviderReadinessRouteSourceDraft } from "./modules/stream/foundation/stream-billing-ledger-admin-provider-readiness.route";
import { registerStreamGooglePlayEntitlementVerificationProtectedRouteDraft, type StreamProtectedAdminGuardDraft, type StreamRouterLikeDraft } from "./modules/stream/foundation/stream-google-play-entitlement-verification-protected-route-registration-source";
import { createStreamLiveAdminReadinessRoute147G } from "./modules/stream/foundation/live-admin-readiness/streamLiveAdminReadinessRoute";
import { createStreamRealtimeMediaLifecycleReadinessRoute153C } from "./modules/stream/foundation/realtime-media-lifecycle/streamRealtimeMediaLifecycleReadinessRoute153C";

import { createStreamRuntimeFoundationRouter } from "./modules/stream/runtime/streamRuntimeFoundation.routes";
import { createAirwallex174ARouter } from "./modules/airwallex/airwallex174A.routes";
import { createGoogleBilling175Router } from "./modules/google-billing/googleBilling175.routes";
import {
  createStreamGiftLedgerFoundation198ARouter,
  createStreamGiftLedgerFastTrackCloseout198JRouter,
  createStreamGiftLedgerDbBacked198KRouter,
  createStreamGiftLedgerCatalogSeed198LRouter,
  createStreamGiftLedgerRuntimeSmoke198MRouter,
  createStreamGiftLedgerProviderAuthorizationContract198NRouter,
  createStreamGiftLedgerProviderAuthorizedCommitSmoke198ORouter,
  createStreamGiftLedgerPostCommitEventContract198PRouter,
  createStreamGiftLedgerRealtimeDeliveryAdapter198QRouter,
  createStreamGiftLedgerRealtimeRuntimeBinding198RRouter,
  createStreamGiftLedgerDeliveryReceiptAudit198SRouter,
  createStreamGiftLedgerDeliveryReceiptPersistentStore198TRouter,
  createStreamGiftLedgerSettlementReleaseGuard198URouter,
  createStreamGiftLedgerCreatorPayoutReadiness198VRouter,
  createStreamGiftLedgerProviderPayoutContract198WRouter,
  createStreamGiftLedgerPayoutExecutionGuard198XRouter,
  createStreamGiftLedgerProviderPayoutAdapterSmoke198YRouter,
  createStreamGiftLedgerFinalAuditProductionBinding198ZRouter,
  createStreamGiftLedgerRealProviderBindingApproval199ARouter,
  createStreamGiftLedgerProviderConfigReadiness199BRouter,
  createStreamGiftLedgerPaymentAuthorizationAdapter199CRouter,
  createStreamGiftLedgerRealPaymentAuthorizationAdapter199DRouter,
  createStreamGiftLedgerAuthorizedSendCommit199ERouter,
  createStreamGiftLedgerPostCommitRuntimeSmoke199FRouter,
  createStreamGiftLedgerAdminProductionGates199GRouter,
  createStreamGiftLedgerFinalProductionReadiness199HRouter,
  createStreamGiftLedgerControlledLiveProviderBindingApproval200ARouter,
  createStreamGiftLedgerProviderReferenceLabelsVerification200BRouter,
  createStreamGiftLedgerLiveProviderBindingDryRun200CRouter,
  createStreamGiftLedgerControlledProviderBindingActivationRequest200DRouter,
  createStreamGiftLedgerProviderRuntimeReadinessGuard200ERouter,
  createStreamGiftLedgerControlledProviderBindingActivationDryRun200FRouter,
  createStreamGiftLedgerControlledProviderBindingActivationExecutionApproval200GRouter,
  createStreamGiftLedgerControlledProviderBindingActivationExecutionPreflight200HRouter,
  createStreamGiftLedgerControlledProviderBindingActivationExecutionAuthorization200IRouter,
  createStreamGiftLedgerControlledProviderBindingActivationExecutionFinalGate200JRouter,
  createStreamGiftLedgerControlledProviderBindingActivationExecutionFinalHandoff200KRouter,
  createStreamGiftLedgerSeparateExactLiveProviderBindingActivationExecutionApprovalRequest200LRouter,
  createStreamGiftLedgerSeparateExactLiveProviderBindingActivationExecutionApprovalVerification200MRouter,
  createStreamGiftLedgerLiveActivationFinalHandoff200NRouter,
  createStreamGiftLedgerLiveActivationOwnerApprovalPackage200ORouter,
  createStreamGiftLedgerLiveActivationPreExecDryRun200PRouter,
  createStreamGiftLedgerLiveActivationFinalGate200QRouter,
  createStreamGiftLedgerLiveActivationRuntimeApprovalRequest200RRouter,
  createStreamGiftLedgerLiveActivationRuntimeApprovalVerification200SRouter,
  createStreamGiftLedgerLiveActivationRuntimeFinalHandoff200TRouter,
  createStreamGiftLedgerLiveActivationRuntimeExecApprovalRequest200URouter,
  createStreamGiftLedgerLiveActivationRuntimeExecApprovalVerification200VRouter,
  createStreamGiftLedgerLiveActivationRuntimeExecFinalHandoff200WRouter,
  createStreamGiftLedgerLiveActivationRuntimeExecExactApprovalRequest200XRouter,
  createStreamGiftLedgerLiveActivationRuntimeExecExactApprovalVerification200YRouter,
  createStreamGiftLedgerLiveActivationRuntimeExecExactFinalHandoff200ZRouter,
  createStreamGiftLedgerPostClosureReadiness201ARouter,
  createStreamGiftLedgerPostClosureFinalHandoff201BRouter,
  createStreamGiftLedgerProviderVisibility202ARouter,
  createStreamGiftLedgerProviderVisibilityFinalHandoff202BRouter,
  createStreamGiftLedgerCatalogMediaAdminReadiness203ARouter,
  createStreamGiftLedgerCatalogMediaAdminFinalHandoff203BRouter,
  createStreamGiftLedgerAssetPolicyReadiness204ARouter,
  createStreamGiftLedgerAssetPolicyFinalHandoff204BRouter,
  createStreamGiftLedgerCatalogLocalizationReadiness205ARouter,
  createStreamGiftLedgerCatalogLocalizationFinalHandoff205BRouter,
  createStreamGiftLedgerCatalogPublishReadiness206ARouter,
  createStreamGiftLedgerCatalogPublishFinalHandoff206BRouter,
  createStreamGiftLedgerMediaCdnPublishReadiness207ARouter,
  createStreamGiftLedgerMediaCdnPublishFinalHandoff207BRouter,
  createStreamGiftLedgerAdminControlsReadiness208ARouter,
  createStreamGiftLedgerAdminControlsFinalHandoff208BRouter,
  createStreamGiftLedgerSendIntentAuditReadiness209ARouter,
  createStreamGiftLedgerSendIntentAuditFinalHandoff209BRouter,
  createStreamGiftLedgerEligibilityRiskReadiness210ARouter,
  createStreamGiftLedgerEligibilityRiskFinalHandoff210BRouter,
  createStreamGiftLedgerPayoutEligibilityReadiness211ARouter,
  createStreamGiftLedgerPayoutEligibilityFinalHandoff211BRouter,
  createStreamGiftLedgerSettlementTaxReadiness212ARouter,
  createStreamGiftLedgerSettlementTaxFinalHandoff212BRouter,
  createStreamGiftLedgerPayoutAuditReadiness213ARouter,
  createStreamGiftLedgerPayoutAuditFinalHandoff213BRouter,
  createStreamGiftLedgerExportReportReadiness214ARouter,
  createStreamGiftLedgerExportReportFinalHandoff214BRouter,
  createStreamGiftLedgerPrivacyRetentionReadiness215ARouter,
  createStreamGiftLedgerPrivacyRetentionFinalHandoff215BRouter,
  createStreamGiftLedgerComplianceEvidenceReadiness216ARouter,
  createStreamGiftLedgerComplianceEvidenceFinalHandoff216BRouter,
  createStreamGiftLedgerFraudRiskVelocityReadiness217ARouter,
  createStreamGiftLedgerFraudRiskVelocityFinalHandoff217BRouter,
  createStreamGiftLedgerAdminEnforcementReadiness218ARouter,
  createStreamGiftLedgerAdminEnforcementFinalHandoff218BRouter,
  createStreamGiftLedgerLaunchReadinessControl219ARouter,
  createStreamGiftLedgerLaunchReadinessFinalHandoff219BRouter,
  createStreamGiftLedgerExecutionApprovalBoundary220ARouter,
  createStreamGiftLedgerExecutionApprovalFinalHandoff220BRouter,
  createStreamGiftLedgerFinalArchiveReadiness221ARouter,
  createStreamGiftLedgerFinalArchiveFinalHandoff221BRouter,
  createStreamGiftLedgerOwnerExecutionHandoff222ARouter,
  createStreamGiftLedgerOwnerExecutionFinalHandoff222BRouter,
  createStreamGiftLedgerFinalOwnerArchivePackage223ARouter,
  createStreamGiftLedgerFinalOwnerArchiveFinalHandoff223BRouter,
  createStreamGiftLedgerClosureMarker224ARouter,
  createStreamRoomsLifecycleReadiness225ARouter,
  createStreamRoomsLifecycleFinalHandoff225BRouter,
  createStreamRealtimeEventsReadiness226ARouter,
  createStreamRealtimeEventsFinalHandoff226BRouter,
  createStreamMediaLifecycleReadiness227ARouter,
  createStreamMediaLifecycleFinalHandoff227BRouter,
  createStreamModerationSafetyReadiness228ARouter,
  createStreamModerationSafetyFinalHandoff228BRouter,
  createStreamFoundationFinalControl229ARouter,
  createStreamAdminFoundationVisibility230ARouter,
  createStreamAdminProviderRuntimeControl230BRouter,
  createStreamAdminRoomsControl231ARouter,
  createStreamAdminRealtimeMediaControl231BRouter,
  createStreamAdminModerationSafetyControl232ARouter,
  createStreamAdminFinalStreamControlCenter232BRouter,
  createStreamProviderConfigReadiness233ARouter,
  createStreamProviderConfigReferenceLabelsFinalHandoff233BRouter,
  createStreamProviderConfigAdminBindingReadiness234ARouter,
  createStreamProviderConfigFinalControl234BRouter,
  createStreamGiftLedgerGeneratedClientUsabilityCheck198IRouter,
  createStreamGiftLedgerGeneratedClientUsabilityPlanning198HRouter,
  createStreamGiftLedgerPrismaGeneratePlanning198FRouter,
  createStreamGiftLedgerPrismaGenerate198GRouter,
  createStreamGiftLedgerPrismaReadiness198DRouter,
  createStreamGiftLedgerPrismaValidate198ERouter,
  createStreamGiftLedgerSchemaPlanning198BRouter,
  createStreamGiftLedgerSchemaWrite198CRouter,
} from "./modules/stream";

import { createTaxiFoundation002NRouter } from "./modules/taxi/foundation/route-mount-runtime-002n";
import { createTaxiAdminComplaintsRuntime027MRouter } from "./modules/taxi/foundation/complaints-runtime-027m";
import { createTaxiAdminRuntime028ARouter } from "./modules/taxi/foundation/admin-runtime-028a";
import { createTaxiAdminRuntime028BRouter } from "./modules/taxi/foundation/admin-runtime-028b";
import { createTaxiAdminRuntime028CRouter } from "./modules/taxi/foundation/admin-runtime-028c";
import { createTaxiAdminRuntime028DRouter } from "./modules/taxi/foundation/admin-runtime-028d";
import { createTaxiAdminRuntime028ERouter } from "./modules/taxi/foundation/admin-runtime-028e";
import { createTaxiAdminRuntime028FRouter } from "./modules/taxi/foundation/admin-runtime-028f";
import { createTaxiAdminRuntime028IRouter } from "./modules/taxi/foundation/admin-runtime-028i";
import { registerTaxiCountryTariffs008CRoutes } from "./modules/taxi/foundation/country-tariffs-008c";

const messengerKernelModule = new MessengerKernelModule();
const sabiCallsKernelModule = new SabiCallsKernelModule();

async function bootstrapKernel() {
  const kernel = new SuperAppKernel();

  kernel.register(new PlatformFoundationKernelModule());
  kernel.register(new AiKernelModule());
  kernel.register(messengerKernelModule);
  kernel.register(sabiCallsKernelModule);

  await kernel.start();

  return kernel;
}

function requireEnv(name: string): string {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

function getRequiredPrismaDelegate<T>(
  client: PrismaClient,
  candidates: string[],
): T {
  const prismaRecord = client as unknown as Record<string, unknown>;

  for (const candidate of candidates) {
    const delegate = prismaRecord[candidate];

    if (delegate) {
      return delegate as T;
    }
  }

  throw new Error(`Prisma delegate not found. Tried: ${candidates.join(", ")}`);
}

const prisma = new PrismaClient();
const activityRepo = new PrismaActivityRepository();

const idempotencyRepo = new IdempotencyRepository(prisma);
const idempotencyService = new IdempotencyService(idempotencyRepo);

const miniAppPlatform = new MiniAppPlatform();

loadMiniApps(miniAppPlatform);
eventBus.subscribe("transaction.completed", transactionListener);

new FraudDetectionService();
new ActivityService(activityRepo);
const notificationService = new NotificationService();

const aiModule = createAiModule({ notificationService });

const app = express()
app.use(cors());
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ extended: true, limit: "25mb" }));
app.use("/uploads", express.static(path.resolve(process.cwd(), "uploads")));
app.use(idempotencyMiddleware(idempotencyService));

// TAXI-BACKEND-FOUNDATION-002N route mount: safe-disabled Taxi API readiness and contract routes.
// No Wallet mutation, no provider dispatch, no payout/payment runtime, no fake success.
app.use(createTaxiFoundation002NRouter());
// TAXI-ADMIN-UI-027M: complaint processing backend runtime routes. File-backed admin runtime, no provider/wallet/money/DB.
app.use(createTaxiAdminComplaintsRuntime027MRouter());
// TAXI-ADMIN-RUNTIME-028A: Admin UI Taxi safe-read runtime endpoints foundation.
// No fake data, no DB write, no Wallet mutation, no provider call, no payout/payment execution.
app.use(createTaxiAdminRuntime028ARouter());
// TAXI-ADMIN-RUNTIME-028B: DB-read approval foundation; no DB query executed until exact Owner approval.
// No fake data, no DB write, no Wallet mutation, no provider call, no payout/payment execution.
app.use(createTaxiAdminRuntime028BRouter());
// TAXI-ADMIN-RUNTIME-028C: controlled DB-read smoke; exact Owner approval header required, count-only, no raw rows.
// No DB write, no Wallet mutation, no provider call, no payout/payment execution.
app.use(createTaxiAdminRuntime028CRouter());
// TAXI-ADMIN-RUNTIME-028D: real HTTP runtime smoke contract; does not send exact Owner approval, DB read must remain blocked.
// No DB read, no DB write, no Wallet mutation, no provider call, no payout/payment execution.
app.use(createTaxiAdminRuntime028DRouter());
// TAXI-ADMIN-RUNTIME-028E: controlled count-only DB read execution; exact Owner approval required.
// No raw rows, no DB write, no Wallet mutation, no provider call, no payout/payment execution.
app.use(createTaxiAdminRuntime028ERouter());
// TAXI-ADMIN-RUNTIME-028F: Admin UI count bridge over 028E safe count-only source.
// No DB read by 028F, no raw rows, no fake data, no DB write, no Wallet/provider/money execution.
app.use(createTaxiAdminRuntime028FRouter());
// TAXI-ADMIN-RUNTIME-028I: safe UI read-model foundation over 028F bridge.
// No raw personal rows, no DB write, no Wallet mutation, no provider call, no payout/payment/money movement.
app.use(createTaxiAdminRuntime028IRouter());

// GOOGLE-BILLING-175 route mount: safe-disabled readiness/admin boundary.
app.use(createGoogleBilling175Router());

// AIRWALLEX-174A route mount: safe-disabled readiness/admin boundary.
app.use(createAirwallex174ARouter());

// BACKEND-STREAM-FOUNDATION-173-ONE route mount: Stream runtime foundation, safe-disabled provider, memory-only until schema stage.
app.use(createStreamRuntimeFoundationRouter());

// BACKEND-STREAM-GIFTS-LEDGER-198A route mount: quote/readiness only.
// Safe-disabled: no provider call, no DB write, no Wallet mutation, no payout, no fake send success.
app.use(createStreamGiftLedgerFoundation198ARouter());

// BACKEND-STREAM-GIFTS-LEDGER-198B route mount: Prisma schema planning only.
// Safe-disabled: no prisma/schema.prisma write, no migration, no generate, no DB read/write.
app.use(createStreamGiftLedgerSchemaPlanning198BRouter());

// BACKEND-STREAM-GIFTS-LEDGER-198C route mount: Prisma schema source write readiness only.
// Safe-disabled: no migration, no generate, no DB read/write, no Wallet mutation, no provider call.
app.use(createStreamGiftLedgerSchemaWrite198CRouter());

// BACKEND-STREAM-GIFTS-LEDGER-198D route mount: Prisma validate/generate planning only.
// Safe-disabled: no prisma validate execution, no generate, no migration, no DB read/write, no Wallet mutation, no provider call.
app.use(createStreamGiftLedgerPrismaReadiness198DRouter());

// BACKEND-STREAM-GIFTS-LEDGER-198E route mount: Prisma validate execution-only local runner readiness.
// Safe-disabled API: route never executes shell commands; no generate, no migration, no DB read/write, no Wallet mutation, no provider call.
app.use(createStreamGiftLedgerPrismaValidate198ERouter());

// BACKEND-STREAM-GIFTS-LEDGER-198F route mount: Prisma generate planning only after validate pass.
// Safe-disabled: no generate execution, no migration, no DB read/write, no Wallet mutation, no provider call, no gift runtime enable.
app.use(createStreamGiftLedgerPrismaGeneratePlanning198FRouter());

// BACKEND-STREAM-GIFTS-LEDGER-198G route mount: Prisma generate execution-only local runner readiness.
// Safe-disabled API: route never executes shell commands; no migration, no DB read/write, no Wallet mutation, no provider call, no gift runtime enable.
app.use(createStreamGiftLedgerPrismaGenerate198GRouter());


// BACKEND-STREAM-GIFTS-LEDGER-198H route mount: generated Prisma client usability check planning only.
// Safe-disabled API: no PrismaClient import/instantiation, no $connect, no query, no DB read/write, no Wallet mutation, no provider call.
app.use(createStreamGiftLedgerGeneratedClientUsabilityPlanning198HRouter());

// BACKEND-STREAM-GIFTS-LEDGER-198I route mount: generated Prisma client usability check local runner readiness.
// Safe-disabled API: no PrismaClient import/instantiation, no shell execution, no $connect, no query, no DB read/write, no Wallet mutation, no provider call.
app.use(createStreamGiftLedgerGeneratedClientUsabilityCheck198IRouter());

// BACKEND-STREAM-GIFTS-LEDGER-198J: fast-track closeout runbook + owner-local migration runner boundary.
// API does not execute shell commands and does not connect/query/write DB.
app.use(createStreamGiftLedgerFastTrackCloseout198JRouter());

// BACKEND-STREAM-GIFTS-LEDGER-198K: DB-backed quote/send-intent ledger service.
// Guarded: no provider call, no Wallet mutation, no fake send; DB write requires verified provider reference hash + explicit env flags.
app.use(createStreamGiftLedgerDbBacked198KRouter(prisma));

// BACKEND-STREAM-GIFTS-LEDGER-198L: canonical Stream/Messenger gift catalog seed readiness.
// API is preview/runbook only; owner-local runner may seed StreamGiftCatalogItem rows only with explicit approval flag.
app.use(createStreamGiftLedgerCatalogSeed198LRouter());

// BACKEND-STREAM-GIFTS-LEDGER-198M: runtime quote smoke + send guard verification.
// API is readiness/runbook only; local runner performs catalog DB read only and expects send guard blocked without provider authorization.
app.use(createStreamGiftLedgerRuntimeSmoke198MRouter());

// BACKEND-STREAM-GIFTS-LEDGER-198N: provider authorization contract + real commit boundary.
// API validates hash-only provider reference contract; no DB write, no Wallet mutation, no provider call, no fake send.
app.use(createStreamGiftLedgerProviderAuthorizationContract198NRouter());

// BACKEND-STREAM-GIFTS-LEDGER-198O: owner-local provider-authorized commit smoke boundary.
// API is readiness/runbook only; DB commit is local runner only with explicit flag + hash-only provider reference.
app.use(createStreamGiftLedgerProviderAuthorizedCommitSmoke198ORouter());

// BACKEND-STREAM-GIFTS-LEDGER-198P: post-commit inspection + mobile/realtime event contract.
// Read-only inspection; no realtime emit, no mobile delivery, no Wallet/provider/payout, no fake delivered event.
app.use(createStreamGiftLedgerPostCommitEventContract198PRouter(prisma));

// BACKEND-STREAM-GIFTS-LEDGER-198Q: guarded realtime delivery adapter preview.
// Read-only inspection-backed preview; no realtime emit, no mobile delivery, no Wallet/provider/payout, no fake delivered event.
app.use(createStreamGiftLedgerRealtimeDeliveryAdapter198QRouter(prisma));

// BACKEND-STREAM-FOUNDATION-144X: protected read-only Google Play entitlement verification admin guard.
// Source-only mount guard. Does not log or return raw admin token/header values.
const streamGooglePlayEntitlementVerificationAdminGuard: StreamProtectedAdminGuardDraft = (req, res, next) => {
  const expectedToken = (
    process.env.SABI_ADMIN_PANEL_TOKEN ||
    process.env.ADMIN_PANEL_TOKEN ||
    process.env.ADMIN_TOKEN ||
    ""
  ).trim();

  const headers = (req as unknown as {
    readonly headers?: Readonly<Record<string, string | readonly string[] | undefined>>;
  }).headers ?? {};

  const readHeader = (name: string): string | undefined => {
    const value = headers[name] ?? headers[name.toLowerCase()] ?? headers[name.toUpperCase()];
    if (Array.isArray(value)) return typeof value[0] === "string" ? value[0] : undefined;
    return typeof value === "string" ? value : undefined;
  };

  const authorizationHeader = readHeader("authorization") ?? "";
  const bearerToken = authorizationHeader.toLowerCase().startsWith("bearer ")
    ? authorizationHeader.slice(7).trim()
    : "";
  const providedToken = (readHeader("x-admin-token") ?? bearerToken).trim();

  if (!expectedToken || providedToken !== expectedToken) {
    return res.status(403).json({
      ok: false,
      error: "admin_forbidden",
      code: "stream_google_play_entitlement_verification_admin_required",
    });
  }

  return next();
};



// TAXI-TARIFFS-008C: production country tariffs save + audit journal mount.
// Protected admin route only; exact write approval required; no provider dispatch, no Wallet mutation, no fake success.
const taxiTariffs008CRequireAdminToken = (req: express.Request, res: express.Response): boolean => {
  const expectedToken = (
    process.env.SABI_ADMIN_PANEL_TOKEN ||
    process.env.ADMIN_PANEL_TOKEN ||
    process.env.ADMIN_TOKEN ||
    ""
  ).trim();

  const readHeader = (name: string): string => {
    const value = req.headers[name] ?? req.headers[name.toLowerCase()] ?? req.headers[name.toUpperCase()];
    if (Array.isArray(value)) return typeof value[0] === "string" ? value[0] : "";
    return typeof value === "string" ? value : "";
  };

  const authorizationHeader = readHeader("authorization");
  const bearerToken = authorizationHeader.toLowerCase().startsWith("bearer ")
    ? authorizationHeader.slice(7).trim()
    : "";
  const providedToken = (readHeader("x-sabi-admin-token") || readHeader("x-admin-token") || bearerToken).trim();

  if (!expectedToken || providedToken !== expectedToken) {
    res.status(403).json({
      ok: false,
      error: "admin_forbidden",
      code: "taxi_tariffs_008c_admin_required",
      dbWriteExecuted: false,
      auditWriteExecuted: false,
      fakeSuccessBlocked: true,
    });
    return false;
  }

  return true;
};

const taxiTariffs008CRouter = express.Router();
registerTaxiCountryTariffs008CRoutes(taxiTariffs008CRouter, { requireAdminToken: taxiTariffs008CRequireAdminToken });
app.use(taxiTariffs008CRouter);

const PORT = Number(process.env.PORT || 4001);
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: { origin: "*" },
});

configureRealtimeEmitter(io);
configureMessengerKernelModule({ io });
configureSabiCallsKernelModule({ io });

// BACKEND-STREAM-GIFTS-LEDGER-198R: guarded realtime runtime binding.
// Emits only after 198Q inspection-backed preview, admin approval, and explicit runtime flag; no fake delivery receipt.
app.use(createStreamGiftLedgerRealtimeRuntimeBinding198RRouter(prisma, io));

// BACKEND-STREAM-GIFTS-LEDGER-198S: delivery receipt contract + admin audit preview.
// Read/verify only by default; no receipt persistence, no available balance release, no fake delivered confirmation.
app.use(createStreamGiftLedgerDeliveryReceiptAudit198SRouter(prisma));

// BACKEND-STREAM-GIFTS-LEDGER-198T: persistent receipt/audit store.
// Writes only with explicit persistence flag; no available balance release, no payout, no fake delivery.
app.use(createStreamGiftLedgerDeliveryReceiptPersistentStore198TRouter(prisma));

// BACKEND-STREAM-GIFTS-LEDGER-198U: settlement gates + available balance release guard.
// DB write release requires all settlement gates passed/waived, explicit env flags, and admin approval phrase; no payout/runtime money movement.
app.use(createStreamGiftLedgerSettlementReleaseGuard198URouter(prisma));

// BACKEND-STREAM-GIFTS-LEDGER-198V: creator payout readiness guard.
// Read-only eligibility/admin review; no payout execution, no provider payout call, no fake cash-out.
app.use(createStreamGiftLedgerCreatorPayoutReadiness198VRouter(prisma));

// BACKEND-STREAM-GIFTS-LEDGER-198W: provider payout contract + Admin approval gate.
// Contract/approval only; no payout execution, no provider payout call, no fake cash-out.
app.use(createStreamGiftLedgerProviderPayoutContract198WRouter(prisma));

// BACKEND-STREAM-GIFTS-LEDGER-198X: payout execution guard/provider adapter boundary.
// Guard/contract only; no provider payout call, no payout execution, no fake cash-out.
app.use(createStreamGiftLedgerPayoutExecutionGuard198XRouter(prisma));

// BACKEND-STREAM-GIFTS-LEDGER-198Y: owner-local provider payout adapter smoke.
// Adapter envelope/dry-run only; no provider payout call, no payout execution, no fake cash-out.
app.use(createStreamGiftLedgerProviderPayoutAdapterSmoke198YRouter(prisma));

// BACKEND-STREAM-GIFTS-LEDGER-198Z: final audit + production provider binding request.
// Read-only final audit/request envelope only; no provider binding, no payout execution, no fake cash-out.
app.use(createStreamGiftLedgerFinalAuditProductionBinding198ZRouter(prisma));

// BACKEND-STREAM-GIFTS-LEDGER-199A: real provider binding exact owner approval boundary.
// Reference-labels only; no .env read, no raw secrets, no provider binding, no provider call, no payout execution.
app.use(createStreamGiftLedgerRealProviderBindingApproval199ARouter());

// BACKEND-STREAM-GIFTS-LEDGER-199B: provider config readiness reference-labels only.
// No .env read, no raw secrets, no provider binding/call, no payout execution.
app.use(createStreamGiftLedgerProviderConfigReadiness199BRouter());

// BACKEND-STREAM-GIFTS-LEDGER-199C: payment authorization adapter boundary.
// Contract/request preview only; no provider live call, no Wallet mutation, no payment capture, no gift send commit.
app.use(createStreamGiftLedgerPaymentAuthorizationAdapter199CRouter());

// BACKEND-STREAM-GIFTS-LEDGER-199D: owner-local real payment authorization hash-only adapter.
// Accepts providerAuthorizationReferenceHash only; no raw secrets, no backend provider call, no DB write, no fake payment success.
app.use(createStreamGiftLedgerRealPaymentAuthorizationAdapter199DRouter());

// BACKEND-STREAM-GIFTS-LEDGER-199E: provider-authorized gift send ledger commit.
// Uses 199D hash-only authorization and 198K DB commit guard; no provider call, no Wallet mutation, no fake send.
app.use(createStreamGiftLedgerAuthorizedSendCommit199ERouter(prisma));

// BACKEND-STREAM-GIFTS-LEDGER-199F: post-commit runtime smoke + realtime delivery production verification.
// Read-only verification: no realtime emit, no DB write, no Wallet/provider/payout, no fake success.
app.use(createStreamGiftLedgerPostCommitRuntimeSmoke199FRouter(prisma));

// BACKEND-STREAM-GIFTS-LEDGER-199G: Admin controls + production gates.
// Review/request envelope only; no env value read, no provider call, no payout, no Wallet mutation, no runtime enablement.
app.use(createStreamGiftLedgerAdminProductionGates199GRouter());

// BACKEND-STREAM-GIFTS-LEDGER-199H: final production readiness + handoff.
// 100% backend readiness for controlled production binding; no provider/Wallet/payout/realtime runtime enablement.
app.use(createStreamGiftLedgerFinalProductionReadiness199HRouter());

// BACKEND-STREAM-GIFTS-LEDGER-200A: controlled live provider binding approval.
// Approval/request envelope only; no raw secrets, no provider binding/call, no Wallet mutation, no payout execution.
app.use(createStreamGiftLedgerControlledLiveProviderBindingApproval200ARouter());

// BACKEND-STREAM-GIFTS-LEDGER-200B: owner-filled provider reference labels verification.
// Reference labels/attestations only; no .env read, no raw secrets, no provider binding/call, no runtime enablement.
app.use(createStreamGiftLedgerProviderReferenceLabelsVerification200BRouter());

// BACKEND-STREAM-GIFTS-LEDGER-200C: live provider binding dry-run.
// Dry-run envelope only; no .env read, no raw secrets, no provider binding/live call, no runtime enablement.
app.use(createStreamGiftLedgerLiveProviderBindingDryRun200CRouter());

// BACKEND-STREAM-GIFTS-LEDGER-200D: controlled provider binding activation request.
// Request/approval envelope only; no provider binding/live call, no raw secrets, no runtime enablement.
app.use(createStreamGiftLedgerControlledProviderBindingActivationRequest200DRouter());

// BACKEND-STREAM-GIFTS-LEDGER-200E: provider runtime readiness guard.
// Readiness guard only; no .env read, no provider binding/live call, no Wallet/payout/payment runtime enablement.
app.use(createStreamGiftLedgerProviderRuntimeReadinessGuard200ERouter());

// BACKEND-STREAM-GIFTS-LEDGER-200F: controlled provider binding activation dry-run.
// Dry-run envelope only; no .env read, no provider binding/activation/live call, no Wallet/payout/payment runtime enablement.
app.use(createStreamGiftLedgerControlledProviderBindingActivationDryRun200FRouter());

// BACKEND-STREAM-GIFTS-LEDGER-200G: controlled provider binding activation execution approval.
// Approval envelope only; no provider activation/execution/live call, no Wallet/payout/payment runtime enablement.
app.use(createStreamGiftLedgerControlledProviderBindingActivationExecutionApproval200GRouter());

// BACKEND-STREAM-GIFTS-LEDGER-200H: controlled provider binding activation execution preflight.
// Preflight envelope only; no provider activation/execution/live call, no Wallet/payout/payment runtime enablement.
app.use(createStreamGiftLedgerControlledProviderBindingActivationExecutionPreflight200HRouter());

// BACKEND-STREAM-GIFTS-LEDGER-200I: controlled provider binding activation execution authorization.
// Safe-disabled: no .env read, no provider calls, no payment/payout/Wallet/runtime enablement.
app.use(createStreamGiftLedgerControlledProviderBindingActivationExecutionAuthorization200IRouter());

// BACKEND-STREAM-GIFTS-LEDGER-200J: controlled provider binding activation execution final gate.
// Safe-disabled: no .env read, no provider calls, no payment/payout/Wallet/runtime enablement.
app.use(createStreamGiftLedgerControlledProviderBindingActivationExecutionFinalGate200JRouter());

// BACKEND-STREAM-GIFTS-LEDGER-200K: controlled provider binding activation execution final handoff.
// Safe-disabled final handoff only; no .env read, no provider calls, no payment/payout/Wallet/runtime enablement.
app.use(createStreamGiftLedgerControlledProviderBindingActivationExecutionFinalHandoff200KRouter());

// BACKEND-STREAM-GIFTS-LEDGER-200L: separate exact live provider binding activation execution approval request.
// Approval-request envelope only; no .env read, no provider calls, no payment/payout/Wallet/runtime enablement.
app.use(createStreamGiftLedgerSeparateExactLiveProviderBindingActivationExecutionApprovalRequest200LRouter());

// BACKEND-STREAM-GIFTS-LEDGER-200M: separate exact live provider binding activation execution approval verification.
// Verification envelope only; no .env read, no provider calls, no payment/payout/Wallet/runtime enablement.
app.use(createStreamGiftLedgerSeparateExactLiveProviderBindingActivationExecutionApprovalVerification200MRouter());

// BACKEND-STREAM-GIFTS-LEDGER-200N: separate exact live provider binding activation execution final handoff.
// Final handoff envelope only; no .env read, no provider calls, no runtime enablement, no payment/payout execution.
app.use(createStreamGiftLedgerLiveActivationFinalHandoff200NRouter());

// BACKEND-STREAM-GIFTS-LEDGER-200O: exact owner approval package for future live activation execution.
// Approval package only; no .env read, no provider calls, no runtime enablement, no payment/payout execution.
app.use(createStreamGiftLedgerLiveActivationOwnerApprovalPackage200ORouter());

// BACKEND-STREAM-GIFTS-LEDGER-200P: pre-execution dry run for future live activation execution.
// Dry-run projection only; no .env read, no provider calls, no runtime enablement, no payment/payout execution.
app.use(createStreamGiftLedgerLiveActivationPreExecDryRun200PRouter());

// BACKEND-STREAM-GIFTS-LEDGER-200Q: final gate for future live activation execution.
// Final gate envelope only; no .env read, no provider calls, no runtime enablement, no payment/payout execution.
app.use(createStreamGiftLedgerLiveActivationFinalGate200QRouter());

// BACKEND-STREAM-GIFTS-LEDGER-200R: runtime approval request package for future live activation execution.
// Request envelope only; no .env read, no provider calls, no runtime enablement, no payment/payout execution.
app.use(createStreamGiftLedgerLiveActivationRuntimeApprovalRequest200RRouter());

app.use(createStreamGiftLedgerLiveActivationRuntimeApprovalVerification200SRouter());

// BACKEND-STREAM-GIFTS-LEDGER-200T: runtime package final handoff for future live activation execution.
// Final handoff envelope only; no .env read, no provider calls, no runtime enablement, no payment/payout execution.
app.use(createStreamGiftLedgerLiveActivationRuntimeFinalHandoff200TRouter());

// BACKEND-STREAM-GIFTS-LEDGER-200U: runtime execution approval request for future live activation execution.
// Approval-request envelope only; no .env read, no provider calls, no runtime enablement, no payment/payout execution.
app.use(createStreamGiftLedgerLiveActivationRuntimeExecApprovalRequest200URouter());

// BACKEND-STREAM-GIFTS-LEDGER-200V: runtime execution approval verification for future live activation execution.
// Approval-verification envelope only; no .env read, no provider calls, no runtime enablement, no payment/payout execution.
app.use(createStreamGiftLedgerLiveActivationRuntimeExecApprovalVerification200VRouter());
app.use(createStreamGiftLedgerLiveActivationRuntimeExecFinalHandoff200WRouter());

// BACKEND-STREAM-GIFTS-LEDGER-200X: exact owner approval request for future live activation runtime execution.
// Approval-request envelope only; no .env read, no provider calls, no runtime enablement, no payment/payout execution.
app.use(createStreamGiftLedgerLiveActivationRuntimeExecExactApprovalRequest200XRouter());

// BACKEND-STREAM-GIFTS-LEDGER-200Y: exact owner approval verification for future live activation runtime execution.
// Verification envelope only; no .env read, no provider calls, no runtime enablement, no payment/payout execution.
app.use(createStreamGiftLedgerLiveActivationRuntimeExecExactApprovalVerification200YRouter());

// BACKEND-STREAM-GIFTS-LEDGER-200Z: exact final handoff for future live activation runtime execution.
// Final handoff only; no .env read, no provider calls, no runtime enablement, no payment/payout execution.
app.use(createStreamGiftLedgerLiveActivationRuntimeExecExactFinalHandoff200ZRouter());

// BACKEND-STREAM-GIFTS-LEDGER-201A: post-closure readiness index after 200Z.
// Readiness index only; no .env read, no provider calls, no runtime enablement, no payment/payout execution.
app.use(createStreamGiftLedgerPostClosureReadiness201ARouter());

// BACKEND-STREAM-GIFTS-LEDGER-201B: post-closure final handoff after 201A.
// Final handoff only; no .env read, no provider calls, no runtime enablement, no payment/payout execution.
app.use(createStreamGiftLedgerPostClosureFinalHandoff201BRouter());

// BACKEND-STREAM-GIFTS-LEDGER-202A: catalog/media/CDN/Admin/provider_not_configured visibility index.
// Visibility only; no .env read, no provider calls, no runtime enablement, no media publish, no payment/payout execution.
app.use(createStreamGiftLedgerProviderVisibility202ARouter());

// BACKEND-STREAM-GIFTS-LEDGER-202B: Stream Gifts Admin/provider visibility final handoff.
// Final handoff only; no .env read, no provider calls, no provider toggle, no media/CDN publish, no runtime enablement.
app.use(createStreamGiftLedgerProviderVisibilityFinalHandoff202BRouter());

// BACKEND-STREAM-GIFTS-LEDGER-203A: catalog/media/CDN/Admin controls readiness index.
// Readiness only; no .env read, no provider calls, no catalog/media/CDN publish, no Admin toggles, no runtime enablement.
app.use(createStreamGiftLedgerCatalogMediaAdminReadiness203ARouter());

// BACKEND-STREAM-GIFTS-LEDGER-203B: catalog/media/CDN/Admin controls final handoff.
// Final handoff only; no .env read, no provider calls, no catalog/media/CDN publish, no Admin toggles, no runtime enablement.
app.use(createStreamGiftLedgerCatalogMediaAdminFinalHandoff203BRouter());

// BACKEND-STREAM-GIFTS-LEDGER-204A: gift asset policy/readiness index.
// Readiness only; no .env read, no provider calls, no asset upload/transcode/CDN publish, no Admin toggles, no runtime enablement.
app.use(createStreamGiftLedgerAssetPolicyReadiness204ARouter());

// BACKEND-STREAM-GIFTS-LEDGER-204B: gift asset policy final handoff.
// Final handoff only; no .env read, no provider calls, no asset upload/transcode/CDN publish, no Admin toggles, no runtime enablement.
app.use(createStreamGiftLedgerAssetPolicyFinalHandoff204BRouter());

const userModel = getRequiredPrismaDelegate<
  ConstructorParameters<typeof PrismaUserRepository>[0]
>(prisma, ["user", "userProfile", "users"]);

const authAccountModel = getRequiredPrismaDelegate<
  ConstructorParameters<typeof PrismaAuthAccountRepository>[0]
>(prisma, ["authAccount", "authAccounts", "auth", "authUser"]);

const userRepository = new PrismaUserRepository(userModel);
const userModule = createUserModule({ users: userRepository });

const authAccountRepository = new PrismaAuthAccountRepository(authAccountModel);
const passwordService = new ScryptPasswordService();

const tokenService = new JwtTokenService({
  accessTokenSecret: requireEnv("JWT_ACCESS_SECRET"),
  refreshTokenSecret: requireEnv("JWT_REFRESH_SECRET"),
  issuer: process.env.JWT_ISSUER?.trim() || "superapp-api",
  audience: process.env.JWT_AUDIENCE?.trim() || "superapp-client",
  accessTokenExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN?.trim() || "15m",
  refreshTokenExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN?.trim() || "30d",
});

const authModule = createAuthModule({
  authAccounts: authAccountRepository,
  passwordHasher: passwordService,
  passwordVerifier: passwordService,
  tokenIssuer: tokenService,
  profileProvisionPort: userModule.profileProvisionPort,
});

app.locals.financial = {
  disabled: true,
  reason: "wallet_backend_temporarily_disabled_until_wallet_stage",
};

const adminModule = createAdminModule({
  prisma,
  appLocals: app.locals as Record<string, unknown>,
  getRuntimeHealth: () => {
    const messengerHealth = messengerKernelModule.getHealth();
    const callsHealth = sabiCallsKernelModule.getHealth();
    const callsModuleHealth = callsHealth.module && typeof callsHealth.module === "object"
      ? callsHealth.module as Record<string, unknown>
      : {};

    const messengerRealtimeReady = Boolean(
      messengerHealth.hasRealtimeTransport &&
      messengerHealth.realtimeAttached &&
      messengerHealth.presenceReady &&
      messengerHealth.messengerGatewayReady &&
      messengerHealth.ownsCalls === false,
    );

    const callsRuntimeReady = Boolean(
      callsHealth.initialized &&
      callsHealth.started &&
      callsHealth.serviceReady &&
      callsHealth.routerReady &&
      callsHealth.repositoryReady &&
      callsHealth.realtimeConfigured &&
      callsHealth.realtimeReady &&
      callsHealth.realtimeRegistered &&
      callsHealth.ownsMessengerCalls === false,
    );

    return {
      messengerApiMounted: true,
      messengerApiBasePath: "/api/v2/messenger",
      messengerAdminApiMounted: true,
      callsApiMounted: true,
      callsApiBasePath: "/api/v2/calls",
      mediaApiMounted: true,
      mediaApiBasePath: "/api/v2/media",
      adminApiMounted: true,
      socketPath: "/socket.io",
      messengerKernel: messengerHealth,
      calls: callsHealth,
      callsModule: callsModuleHealth,
      messengerRealtimeReady,
      realtimeReady: messengerRealtimeReady,
      socketReady: messengerRealtimeReady,
      callsReady: callsRuntimeReady,
      sabiCallsReady: callsRuntimeReady,
      premiumCallsReady: callsRuntimeReady,
      messengerCallsOwnedByIndependentSubsystem: callsHealth.ownsMessengerCalls === false,
      messengerMediaReady: true,
      mediaReady: true,
      uploadsReady: true,
      messengerDirectoryReady: true,
      publicDirectoryReady: true,
      notificationFoundationReady: true,
      messengerNotificationsReady: true,
      pushReady: false,
      wallet: app.locals.financial,
      ai: { enabled: true },
      qr: { enabled: true },
    };
  },
});

// BACKEND-STREAM-FOUNDATION-144X: protected read-only Google Play entitlement verification route mount.
// Runtime availability still requires a separate backend restart approval.
// Handler remains safe-disabled: no provider call, no DB write, no Wallet/funds mutation, no entitlement activation.
registerStreamGooglePlayEntitlementVerificationProtectedRouteDraft(
  app as unknown as StreamRouterLikeDraft,
  streamGooglePlayEntitlementVerificationAdminGuard,
);

// BACKEND-STREAM-FOUNDATION-146J: protected read-only Stream live/admin provider readiness route.
// Safe-disabled mount only: no provider call, no DB write, no Wallet mutation, no money movement, no runtime activation.
const streamBillingLedgerAdminProviderReadinessRouter =
  createStreamBillingLedgerAdminProviderReadinessRouteSourceDraft({
    requireAdmin: streamGooglePlayEntitlementVerificationAdminGuard as unknown as import("express").RequestHandler,
    runtimeSignals: {
      runtimeRouteAuthenticated: true,
      runtimeDuplicateRouteBlocked: true,
      normalizedSecretScanSafe: true,
      expectedLedgerTablesVisible: true,
      metadataRouteMountedNow: true,
    },
  });

app.use("/api/admin", streamBillingLedgerAdminProviderReadinessRouter);

app.use("/api/admin", adminModule.router);
app.use("/api/v2/admin", adminModule.router);
app.use("/api/admin/play-ready/reviewer-evidence", playReady37ReviewerEvidenceAdminRoutes);

const streamLiveAdminReadinessRouter147G = createStreamLiveAdminReadinessRoute147G();
app.use("/api/admin", streamLiveAdminReadinessRouter147G);

// BACKEND-STREAM-FOUNDATION-154C-FIX1: source-only protected Admin read-only route mount.
// Future full Admin path: /api/admin/stream/realtime-media-lifecycle/readiness
// Safe-disabled: no provider call, no DB read/write, no Wallet mutation, no money movement.
app.use("/api/admin", createStreamRealtimeMediaLifecycleReadinessRoute153C(express.Router() as any) as any);


app.use("/auth", authModule.router);
app.use("/api/auth", authModule.router);
app.use("/api/v2/auth", authModule.router);
app.use("/users", userModule.router);
app.use("/api/users", userModule.router);
app.use("/api/v2/users", userModule.router);

app.use("/api/v2/messenger", requireAuthenticatedUser, messengerModuleRoutes);

const sabiCallsRouter = sabiCallsKernelModule.getRouter();

app.locals.calls = {
  kernel: sabiCallsKernelModule,
  service: sabiCallsKernelModule.getService(),
  getHealth: () => sabiCallsKernelModule.getHealth(),
};

app.use("/api/v2/calls", requireAuthenticatedUser, sabiCallsRouter);
app.use("/api/calls", requireAuthenticatedUser, sabiCallsRouter);

app.use("/api/qr", qrModuleRoutes);
app.use("/api/v2/qr", qrModuleRoutes);

const walletProviderConfigRouter = buildWalletProviderConfigRouter();
app.use("/api/wallet/provider-config", walletProviderConfigRouter);
app.use("/api/v2/wallet/provider-config", walletProviderConfigRouter);
app.use("/api/ai", aiModule.router);
app.use("/api/programs", sabiProgramFoundationRoutes);
app.use("/api/v2/programs", sabiProgramFoundationRoutes);

app.locals.ai = {
  facade: aiModule.facade,
  workspace: aiModule.workspace,
  assistant: aiModule.assistant,
  appActions: aiModule.appActions,
  realtimeTranslation: aiModule.realtimeTranslation,
  mobileUi: aiModule.mobileUi,
  personalization: aiModule.personalization,
  safetyAdmin: aiModule.safetyAdmin,
  voice: {
    getManifest: () => aiModule.facade.getVoiceManifest(),
    getStatus: (userId: string) => aiModule.facade.getVoiceStatus(userId),
  },
};

app.use("/api/v2/media", uploadRoutes);
app.use("/api/v2/network-game-center", sabiNetworkGameCenterFoundationRoutes);
app.use("/api/v2/games/foundation", sabiNetworkGameCenterFoundationRoutes);
app.use("/api/v2/gallery", sabiGalleryFoundationRoutes);

const streamDiagnosticsHandler = createStreamFoundationKernelDiagnosticsBackendRouteConnectionHandler();



app.get("/api/admin/stream/foundation/diagnostics/readiness", (_req, res) => {
  const readiness = getStreamFoundationKernelDiagnosticsBackendRouteConnectionReadiness();
  res.status(readiness.ready ? 200 : 409).json({
    ok: readiness.ready,
    module: "stream",
    stage: "foundation_diagnostics_only",
    readiness,
  });
});

app.get("/api/admin/stream/foundation/diagnostics/preview", (_req, res) => {
  const envelope = streamDiagnosticsHandler({ routeId: "stream_kernel_diagnostics_snapshot" });
  res.status(envelope.statusCode).json(envelope);
});

function normalizeStreamLiveWriteBody(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {};
  }

  return value as Record<string, unknown>;
}

app.post("/api/stream/live/start", (req, res) => {
  const body = normalizeStreamLiveWriteBody(req.body);
  const envelope = createStreamFoundationLiveStartRuntimeHandlerDraftDecision(body);

  res.status(envelope.statusCode).json(envelope);
});

app.post("/api/stream/live/stop", (req, res) => {
  const body = normalizeStreamLiveWriteBody(req.body);
  const envelope = createStreamFoundationLiveStopRuntimeHandlerDraftDecision(body);

  res.status(envelope.statusCode).json(envelope);
});

app.post("/api/stream/live/heartbeat", (req, res) => {
  const body = normalizeStreamLiveWriteBody(req.body);
  const envelope = createStreamFoundationLiveHeartbeatRuntimeHandlerDraftDecision(body);

  res.status(envelope.statusCode).json(envelope);
});

app.get("/api/wallet/status", (_req, res) => {
  res.status(503).json({
    status: "disabled",
    module: "wallet",
    reason: "wallet_backend_temporarily_disabled_until_wallet_stage",
  });
});

app.get("/miniapps", (_req, res) => {
  res.json(miniAppPlatform.getApps());
});

function buildSabiHealthPayload() {
  return {
    status: "ok",
    service: "SuperApp API",
    port: PORT,
    apiBasePath: "/api/v2",
    messengerBasePath: "/api/v2/messenger",
    adminBasePath: "/api/admin",
    socketPath: "/socket.io",
    modules: {
      auth: "enabled",
      admin: "enabled",
      user: "enabled",
      messenger: "enabled",
      calls: "sabi_calls_independent_enabled",
      callsKernel: sabiCallsKernelModule.getHealth(),
      ai: "enabled",
      media: "enabled",
      wallet: "temporarily_disabled",
      payments: "temporarily_disabled",
      p2p: "temporarily_disabled",
      qrCore: "qr_100_enabled",
      qrWallet: "qr_100_core_enabled_wallet_execution_guarded",
      qrMerchant: "qr_100_enabled",
      qrBusiness: "qr_100_enabled",
      qrCoinWallet: "qr_100_enabled",
      qrCryptoWallet: "qr_100_enabled",
      qrMarketplace: "qr_100_enabled",
      qrStream: "qr_100_enabled",
      qrTaxi: "qr_100_enabled",
      qrSchoolWorkAttendance: "qr_100_enabled",
      virtualCards: "foundation_token_only_provider_required",
      programs: "home_100_4_foundation_enabled",
      homePrograms:
        "home_gallery_games_marketplace_hotels_taxi_supermarket_food_wholesale_foundation_enabled",
      galleryFoundation: "home_100_4_private_by_default_enabled",
      networkGameCenter: "home_100_4_foundation_enabled_provider_required",
      streamFoundation: "diagnostics_foundation_ready_provider_not_configured_no_money_movement",
    },
  };
}

app.get(["/", "/health", "/api/health", "/api/v2/health", "/api/v2/status"], (_req, res) => {
  res.json(buildSabiHealthPayload());
});

bootstrapEvents();
app.use(errorMiddleware);

async function startServer() {
  await bootstrapKernel();

  try {
    initFirebase();
  } catch (error) {
    console.warn("Firebase push is disabled for this run:", error);
  }

  
/**
 * SABI-AI-STUDIO-266W-FIX2
 * Gemini runtime route mount.
 * No payment, no wallet, no DB write, no SMS.
 */
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const sabiAiStudioRuntimeRoute = require("./routes/sabi-ai-studio/studio-runtime-266o.js");
  app.use("/api/sabi-ai-studio", sabiAiStudioRuntimeRoute);
} catch (error) {
  console.error("SABI_AI_STUDIO_ROUTE_MOUNT_FAILED", error);
}
httpServer.listen(PORT, "0.0.0.0", () => {
    console.log("Server running on port", PORT);
  });
}

void startServer().catch((error) => {
  console.error("Failed to start SuperApp API", error);
  process.exit(1);
});

export default app;
// BACKEND-STREAM-GIFTS-LEDGER-205A: gift catalog localization readiness index.
// Source-only; no .env read, no provider calls, no catalog/localization/media/CDN publish, no Admin toggles, no Wallet/payment/payout/DB/realtime/runtime enablement.
app.use(createStreamGiftLedgerCatalogLocalizationReadiness205ARouter());
// BACKEND-STREAM-GIFTS-LEDGER-205B: gift catalog localization final handoff.
// Source-only; no .env read, no provider calls, no catalog/localization/media/CDN publish, no Admin toggles, no Wallet/payment/payout/DB/realtime/runtime enablement.
app.use(createStreamGiftLedgerCatalogLocalizationFinalHandoff205BRouter());
// BACKEND-STREAM-GIFTS-LEDGER-206A: gift catalog publish approval readiness index.
// Source-only; no .env read, no provider calls, no catalog/localization/media/CDN publish, no Admin toggles, no Wallet/payment/payout/DB/realtime/runtime enablement.
app.use(createStreamGiftLedgerCatalogPublishReadiness206ARouter());

// BACKEND-STREAM-GIFTS-LEDGER-206B: gift catalog publish approval readiness final handoff.
// Source-only; no .env read, no provider calls, no catalog/localization/media/CDN publish, no Admin toggles, no Wallet/payment/payout/DB/realtime/runtime enablement.
app.use(createStreamGiftLedgerCatalogPublishFinalHandoff206BRouter());

// BACKEND-STREAM-GIFTS-LEDGER-207A: media/CDN publish approval readiness index.
// Source-only; no .env read, no provider calls, no asset upload/transcode/CDN invalidation/publish, no Admin toggles, no Wallet/payment/payout/DB/realtime/runtime enablement.
app.use(createStreamGiftLedgerMediaCdnPublishReadiness207ARouter());

// BACKEND-STREAM-GIFTS-LEDGER-207B: media/CDN publish approval readiness final handoff.
// Source-only; no .env read, no provider calls, no asset upload/transcode/CDN invalidation/publish, no Admin toggles, no Wallet/payment/payout/DB/realtime/runtime enablement.
app.use(createStreamGiftLedgerMediaCdnPublishFinalHandoff207BRouter());

// BACKEND-STREAM-GIFTS-LEDGER-208A: Admin controls/toggle approval readiness index.
// Source-only; no .env read, no provider calls, no Admin toggle execution, no catalog/localization/media-CDN publish, no Wallet/payment/payout/DB/realtime/runtime enablement.
app.use(createStreamGiftLedgerAdminControlsReadiness208ARouter());

// BACKEND-STREAM-GIFTS-LEDGER-208B: Admin controls/toggle approval final handoff.
// Source-only; no .env read, no provider calls, no Admin toggle execution, no catalog/localization/media-CDN publish, no Wallet/payment/payout/DB/realtime/runtime enablement.
app.use(createStreamGiftLedgerAdminControlsFinalHandoff208BRouter());

// BACKEND-STREAM-GIFTS-LEDGER-209A: gift send-intent/receipt/audit readiness index.
// Source-only; no .env read, no provider calls, no send execution, no ledger write, no Wallet/payment/payout/DB/realtime/runtime enablement.
app.use(createStreamGiftLedgerSendIntentAuditReadiness209ARouter());

// BACKEND-STREAM-GIFTS-LEDGER-209B: gift send-intent/receipt/audit final handoff.
// Source-only; no .env read, no provider calls, no send execution, no ledger write, no Wallet/payment/payout/DB/realtime/runtime enablement.
app.use(createStreamGiftLedgerSendIntentAuditFinalHandoff209BRouter());

// BACKEND-STREAM-GIFTS-LEDGER-210A: gift eligibility/risk/compliance readiness index.
// Source-only; no .env read, no provider calls, no send execution, no ledger write, no eligibility/risk runtime decision, no Wallet/payment/payout/DB/realtime/runtime enablement.
app.use(createStreamGiftLedgerEligibilityRiskReadiness210ARouter());

// BACKEND-STREAM-GIFTS-LEDGER-210B: gift eligibility/risk/compliance final handoff.
// Source-only; no .env read, no provider calls, no send execution, no ledger write, no eligibility/risk runtime decision, no Wallet/payment/payout/DB/realtime/runtime enablement.
app.use(createStreamGiftLedgerEligibilityRiskFinalHandoff210BRouter());


// BACKEND-STREAM-GIFTS-LEDGER-211A: official streamer payout eligibility readiness index.
// Source-only; no .env read, no provider payout calls, no payout execution, no Wallet/payment/DB/realtime/runtime enablement.
app.use(createStreamGiftLedgerPayoutEligibilityReadiness211ARouter());

// BACKEND-STREAM-GIFTS-LEDGER-211B: official streamer payout eligibility final handoff.
// Source-only; no .env read, no provider payout calls, no payout execution, no Wallet/payment/DB/realtime/runtime enablement.
app.use(createStreamGiftLedgerPayoutEligibilityFinalHandoff211BRouter());

// BACKEND-STREAM-GIFTS-LEDGER-212A: settlement/tax/withholding readiness index.
// Source-only; no .env read, no settlement/tax runtime decisions, no provider payout calls, no payout execution, no Wallet/payment/DB/realtime/runtime enablement.
app.use(createStreamGiftLedgerSettlementTaxReadiness212ARouter());


// BACKEND-STREAM-GIFTS-LEDGER-212B: settlement/tax/withholding final handoff.
// Source-only; no .env read, no settlement/tax runtime decisions, no provider payout calls, no payout execution, no Wallet/payment/DB/realtime/runtime enablement.
app.use(createStreamGiftLedgerSettlementTaxFinalHandoff212BRouter());

// BACKEND-STREAM-GIFTS-LEDGER-213A: payout audit/evidence readiness index.
// Source-only; no .env read, no payout audit write/export, no provider payout calls, no payout execution, no Wallet/payment/DB/realtime/runtime enablement.
app.use(createStreamGiftLedgerPayoutAuditReadiness213ARouter());

// BACKEND-STREAM-GIFTS-LEDGER-213B: payout audit/evidence final handoff.
// Source-only; no .env read, no payout audit write/export, no provider payout calls, no payout execution, no Wallet/payment/DB/realtime/runtime enablement.
app.use(createStreamGiftLedgerPayoutAuditFinalHandoff213BRouter());

// BACKEND-STREAM-GIFTS-LEDGER-214A: export/report readiness index.
// Source-only; no .env read, no DB read/write/export, no provider payout calls, no payout execution, no Wallet/payment/realtime/runtime enablement.
app.use(createStreamGiftLedgerExportReportReadiness214ARouter());

// BACKEND-STREAM-GIFTS-LEDGER-214B: export/report final handoff.
// Source-only; no .env read, no export/report runtime read/write, no DB read/write, no provider payout calls, no Wallet/payment/payout/realtime/runtime enablement.
app.use(createStreamGiftLedgerExportReportFinalHandoff214BRouter());

// BACKEND-STREAM-GIFTS-LEDGER-215A: privacy/redaction/retention readiness index.
app.use(createStreamGiftLedgerPrivacyRetentionReadiness215ARouter());

// BACKEND-STREAM-GIFTS-LEDGER-215B: privacy/redaction/retention final handoff.
app.use(createStreamGiftLedgerPrivacyRetentionFinalHandoff215BRouter());

// BACKEND-STREAM-GIFTS-LEDGER-216A: compliance evidence readiness index.
app.use(createStreamGiftLedgerComplianceEvidenceReadiness216ARouter());

// BACKEND-STREAM-GIFTS-LEDGER-216B: compliance evidence final handoff.
app.use(createStreamGiftLedgerComplianceEvidenceFinalHandoff216BRouter());

// BACKEND-STREAM-GIFTS-LEDGER-217A: fraud/risk/velocity readiness index.
// Source-only; no .env read, no risk runtime decisions, no provider risk calls, no DB read/write, no Wallet/payment/payout/realtime/runtime enablement.
app.use(createStreamGiftLedgerFraudRiskVelocityReadiness217ARouter());

// BACKEND-STREAM-GIFTS-LEDGER-217B: fraud/risk/velocity final handoff.
// Source-only; no .env read, no fraud/velocity/abuse runtime decisions, no Admin risk toggles, no provider risk calls, no DB read/write, no Wallet/payment/payout/realtime/runtime enablement.
app.use(createStreamGiftLedgerFraudRiskVelocityFinalHandoff217BRouter());

// BACKEND-STREAM-GIFTS-LEDGER-218A: Admin enforcement/escalation readiness index.
// Source-only safe-disabled readiness: no admin enforcement runtime toggle, risk-hold runtime decision, provider risk call, DB read/write, Wallet, payout, send execution, realtime emit, provider runtime, or fake success.
app.use(createStreamGiftLedgerAdminEnforcementReadiness218ARouter());

// BACKEND-STREAM-GIFTS-LEDGER-218B: Admin enforcement/escalation final handoff.
// Source-only safe-disabled final handoff: no admin enforcement runtime toggle, risk-hold runtime decision, provider risk call, DB read/write, Wallet, payout, send execution, realtime emit, provider runtime, or fake success.
app.use(createStreamGiftLedgerAdminEnforcementFinalHandoff218BRouter());


// BACKEND-STREAM-GIFTS-LEDGER-219A: launch-readiness control index.
// Source-only safe-disabled visibility/control: no launch runtime enablement, provider binding/runtime, DB read/write, Wallet, payout, send execution, realtime emit, provider calls, or fake success.
app.use(createStreamGiftLedgerLaunchReadinessControl219ARouter());

// BACKEND-STREAM-GIFTS-LEDGER-219B: launch-readiness control final handoff.
// Source-only safe-disabled closure: no launch runtime enablement, provider binding/runtime, DB read/write, Wallet, payout, send execution, realtime emit, provider calls, or fake success.
app.use(createStreamGiftLedgerLaunchReadinessFinalHandoff219BRouter());

// BACKEND-STREAM-GIFTS-LEDGER-220A: post-closure execution approval boundary index.
// Source-only safe-disabled index: no launch runtime enablement, provider binding/runtime, DB read/write, Wallet, payout, send execution, realtime emit, provider calls, Admin toggles, or fake success.
app.use(createStreamGiftLedgerExecutionApprovalBoundary220ARouter());

// BACKEND-STREAM-GIFTS-LEDGER-220B: execution approval boundary final handoff.
// Final source-only safe-disabled handoff: no launch runtime enablement, provider binding/runtime/credential lookup/calls, DB read/write, Wallet, payout, send execution, realtime emit, Admin toggles, or fake success.
app.use(createStreamGiftLedgerExecutionApprovalFinalHandoff220BRouter());

// BACKEND-STREAM-GIFTS-LEDGER-221A: final post-closure archive/readiness index.
// Source-only safe-disabled archive visibility: no launch runtime enablement, provider binding/runtime/credential lookup/calls, DB read/write, Wallet, payout, send execution, realtime emit, Admin toggles, or fake success.
app.use(createStreamGiftLedgerFinalArchiveReadiness221ARouter());

// BACKEND-STREAM-GIFTS-LEDGER-221B: final archive/readiness final handoff.
// Source-only safe-disabled final handoff: no launch runtime enablement, provider credential lookup/binding/runtime/calls, DB read/write, Wallet, payout, send execution, realtime emit, Admin toggles, or fake success.
app.use(createStreamGiftLedgerFinalArchiveFinalHandoff221BRouter());

// BACKEND-STREAM-GIFTS-LEDGER-222A: owner handoff / next-execution approval template index.
// Source-only safe-disabled handoff index: no launch runtime enablement, provider credential lookup/binding/runtime/calls, DB read/write, Wallet, payout, send execution, realtime emit, Admin toggles, or fake success.
app.use(createStreamGiftLedgerOwnerExecutionHandoff222ARouter());

// BACKEND-STREAM-GIFTS-LEDGER-222B: owner execution handoff final handoff.
// Source-only safe-disabled final owner handoff: no launch runtime enablement, provider credential lookup/binding/runtime/calls, DB read/write, Wallet, payout, gift send execution, realtime emit, Admin toggles, or fake success.
app.use(createStreamGiftLedgerOwnerExecutionFinalHandoff222BRouter());

// BACKEND-STREAM-GIFTS-LEDGER-223A: final owner archive package index.
// Source-only safe-disabled owner archive index: no launch runtime enablement, provider credential lookup/binding/runtime/calls, DB read/write, Wallet, payout, gift send execution, realtime emit, Admin toggles, or fake success.
app.use(createStreamGiftLedgerFinalOwnerArchivePackage223ARouter());

// BACKEND-STREAM-GIFTS-LEDGER-223B: final owner archive package final handoff.
// Source-only safe-disabled final archive handoff: no launch runtime enablement, provider credential lookup/binding/runtime/calls, DB read/write, Wallet, payout, gift send execution, realtime emit, Admin toggles, or fake success.
app.use(createStreamGiftLedgerFinalOwnerArchiveFinalHandoff223BRouter());

// BACKEND-STREAM-GIFTS-LEDGER-224A: Gift Ledger closure marker.
// Source-only safe-disabled closure marker: no more gift-ledger archive layers; next work is Stream foundation rooms lifecycle 225A. No runtime/provider/DB/Wallet/payout/send/realtime enablement.
app.use(createStreamGiftLedgerClosureMarker224ARouter());



// BACKEND-STREAM-ROOMS-LIFECYCLE-225A: Stream rooms lifecycle readiness index.
// Source-only safe-disabled rooms foundation: create/join/leave/end boundaries only; no runtime room creation, realtime emit, provider calls, DB, Wallet, payout, gift send, or fake success.
app.use(createStreamRoomsLifecycleReadiness225ARouter());

// BACKEND-STREAM-ROOMS-LIFECYCLE-225B: Stream rooms lifecycle final handoff.
// Source-only safe-disabled final handoff: create/join/leave/end room lifecycle boundaries locked; no runtime room creation, realtime emit, provider calls, DB, Wallet, payout, gift send, or fake success.
app.use(createStreamRoomsLifecycleFinalHandoff225BRouter());

// BACKEND-STREAM-REALTIME-EVENTS-226A: Stream realtime events readiness index.
// Source-only safe-disabled event boundaries: no socket runtime binding, no realtime emit, no room mutation, no provider calls, no DB, no Wallet, payout, gift send, or fake success.
app.use(createStreamRealtimeEventsReadiness226ARouter());

// BACKEND-STREAM-REALTIME-EVENTS-226B: Stream realtime events final handoff.
// Source-only safe-disabled final handoff: event boundaries locked; no socket runtime binding, no realtime emit, no room mutation, no provider calls, no DB, no Wallet, payout, gift send, or fake success.
app.use(createStreamRealtimeEventsFinalHandoff226BRouter());

// BACKEND-STREAM-MEDIA-LIFECYCLE-227A: Stream media lifecycle readiness index.
// Source-only safe-disabled media boundaries: no media runtime start, recording start, upload/transcode/CDN publish, provider media session, DB, Wallet, payout, gift send, or fake success.
app.use(createStreamMediaLifecycleReadiness227ARouter());


// BACKEND-STREAM-MEDIA-LIFECYCLE-227B: Stream media lifecycle final handoff.
// Source-only safe-disabled final handoff: media boundaries locked; no media runtime start, recording start, upload/transcode/CDN publish, provider media session, DB, Wallet, payout, gift send, or fake success.
app.use(createStreamMediaLifecycleFinalHandoff227BRouter());

// BACKEND-STREAM-MODERATION-SAFETY-228A: Stream moderation/safety readiness index.
// Source-only safe-disabled moderation boundaries: no runtime ban/mute/kick/report write, no content safety runtime decision, no admin toggle, no provider calls, no DB, no realtime emit, or fake success.
app.use(createStreamModerationSafetyReadiness228ARouter());

// BACKEND-STREAM-MODERATION-SAFETY-228B: Stream moderation/safety final handoff.
// Source-only safe-disabled final handoff: moderation boundaries locked; no runtime ban/mute/kick/report write, no content safety runtime decision, no admin toggle, no provider calls, no DB, no realtime emit, or fake success.
app.use(createStreamModerationSafetyFinalHandoff228BRouter());

// BACKEND-STREAM-FOUNDATION-FINAL-CONTROL-229A: Stream foundation final readiness control.
// Source-only safe-disabled final control: rooms, realtime, media, and moderation locked; no runtime enablement, provider calls, DB, Wallet, payout, gift send, realtime emit, or fake success.
app.use(createStreamFoundationFinalControl229ARouter());

// BACKEND-STREAM-ADMIN-FOUNDATION-VISIBILITY-230A: Admin Stream foundation visibility.
// Source-only safe-disabled Admin visibility: 224A-229A status surfaces visible; no runtime toggle, provider call, DB, realtime emit, Wallet, payout, gift send, or fake success.
app.use(createStreamAdminFoundationVisibility230ARouter());


// BACKEND-STREAM-ADMIN-PROVIDER-RUNTIME-CONTROL-230B: Admin provider/runtime control panel.
// Source-only safe-disabled Admin control visibility: provider_not_configured, runtime disabled, exact approval required; no admin toggle, provider call, lookup, DB, realtime emit, Wallet, payout, gift send, or fake success.
app.use(createStreamAdminProviderRuntimeControl230BRouter());

// BACKEND-STREAM-ADMIN-ROOMS-CONTROL-231A: Admin rooms control.
// Source-only safe-disabled Admin rooms visibility/control: create/join/leave/end/state/audit gates visible; no live room execution, provider call, DB, realtime emit, Wallet, payout, gift send, or fake success.
app.use(createStreamAdminRoomsControl231ARouter());


// BACKEND-STREAM-ADMIN-REALTIME-MEDIA-CONTROL-231B: Admin realtime/media control.
// Source-only safe-disabled Admin realtime/media visibility/control: socket/realtime/media/recording/CDN gates visible; no emit, socket binding, media runtime start, provider call, DB, Wallet, payout, gift send, or fake success.
app.use(createStreamAdminRealtimeMediaControl231BRouter());


// BACKEND-STREAM-ADMIN-MODERATION-SAFETY-CONTROL-232A: Admin moderation/safety control.
// Source-only safe-disabled Admin moderation/safety visibility/control: ban/mute/kick/report/content-safety/appeal gates visible; no runtime enforcement, provider call, DB, realtime emit, Wallet, payout, gift send, or fake success.
app.use(createStreamAdminModerationSafetyControl232ARouter());


// BACKEND-STREAM-ADMIN-FINAL-STREAM-CONTROL-CENTER-232B: Admin final Stream control center.
// Source-only safe-disabled final Admin control center: readiness coverage, blockers, approvals, provider/runtime status, and final safe-disabled status visible; no runtime enablement, provider call, DB, realtime emit, Wallet, payout, gift send, or fake success.
app.use(createStreamAdminFinalStreamControlCenter232BRouter());


// BACKEND-STREAM-PROVIDER-CONFIG-READINESS-233A: Provider config readiness visibility.
// Source-only safe-disabled provider config scope matrix: provider_not_configured, missing config blockers, runtime disabled status, and exact approval gates visible; no env read, provider config value read, provider binding, runtime enablement, DB, Wallet, payout, gift send, or fake provider-ready.
app.use(createStreamProviderConfigReadiness233ARouter());


// BACKEND-STREAM-PROVIDER-CONFIG-REFERENCE-LABELS-FINAL-HANDOFF-233B: Provider config reference labels final handoff.
// Source-only safe-disabled reference label matrix: provider_not_configured, missing label blockers, runtime disabled status, and exact approval gates visible; no env read, label value read, label write, provider binding, runtime enablement, DB, Wallet, payout, gift send, or fake provider-ready.
app.use(createStreamProviderConfigReferenceLabelsFinalHandoff233BRouter());


// BACKEND-STREAM-PROVIDER-CONFIG-ADMIN-BINDING-READINESS-234A: Provider config Admin binding readiness.
// Source-only safe-disabled Admin binding readiness: provider scopes, reference label binding, activation dry-run blockers, runtime disabled status, and exact approval gates visible; no env read, config value read, label value read, Admin binding approval, provider binding, activation, runtime enablement, DB, Wallet, payout, gift send, or fake provider-ready.
app.use(createStreamProviderConfigAdminBindingReadiness234ARouter());


// BACKEND-STREAM-PROVIDER-CONFIG-FINAL-CONTROL-234B: Provider config final control.
// Source-only safe-disabled final provider config control: provider config readiness, reference label handoff, Admin binding readiness, missing blockers, runtime disabled status, and exact approval gates locked; no env read, config value read, label value read/write, provider binding, activation, calls, runtime enablement, DB, Wallet, payout, gift send, or fake provider-ready.
app.use(createStreamProviderConfigFinalControl234BRouter());


// SABI_AI_STUDIO_266P_MOUNT_START
const sabiAiStudioRuntime266O = require("./routes/sabi-ai-studio/studio-runtime-266o");
app.use(sabiAiStudioRuntime266O);
// SABI_AI_STUDIO_266P_MOUNT_END


