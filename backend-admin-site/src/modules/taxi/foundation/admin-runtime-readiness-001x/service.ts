import {
  TAXI_ADMIN_MAKER_CHECKER_RULES_001X,
  TAXI_ADMIN_OPERATIONAL_QUEUES_001X,
  TAXI_ADMIN_RUNTIME_PANELS_001X,
  TAXI_ADMIN_RUNTIME_READINESS_VERSION_001X,
  TAXI_ADMIN_WORKFLOW_STEPS_001X,
} from './constants';
import type {
  TaxiAdminRuntimeGate001X,
  TaxiAdminRuntimePanelDomain001X,
  TaxiAdminRuntimeReadinessDecision001X,
  TaxiAdminRuntimeReadinessInput001X,
  TaxiAdminRuntimeSnapshot001X,
  TaxiAdminSettlementReviewPreview001X,
  TaxiAdminSettlementReviewPreviewInput001X,
} from './types';
import type { TaxiMoneyAmount } from '../taxiFoundation.types';

export function getTaxiAdminRuntimeReadinessSnapshot001X(): TaxiAdminRuntimeSnapshot001X {
  return {
    version: TAXI_ADMIN_RUNTIME_READINESS_VERSION_001X,
    status: 'admin_runtime_readiness_ready_safe_disabled',
    panels: TAXI_ADMIN_RUNTIME_PANELS_001X,
    workflowSteps: TAXI_ADMIN_WORKFLOW_STEPS_001X,
    operationalQueues: TAXI_ADMIN_OPERATIONAL_QUEUES_001X,
    makerCheckerRules: TAXI_ADMIN_MAKER_CHECKER_RULES_001X,
    routeRuntimeMountedNow: false,
    adminUiRuntimeMountedNow: false,
    envReadNow: false,
    dbReadNow: false,
    dbWriteNow: false,
    prismaSchemaWriteNow: false,
    prismaGenerateNow: false,
    prismaMigrationNow: false,
    walletMutationNow: false,
    paymentNow: false,
    payoutNow: false,
    providerDispatchNow: false,
    fakeSuccessBlocked: true,
  };
}

export function summarizeTaxiAdminRuntimeDomains001X(): readonly {
  readonly domain: TaxiAdminRuntimePanelDomain001X;
  readonly panelCount: number;
  readonly actionCount: number;
  readonly queueCount: number;
  readonly runtimeMountedNow: false;
  readonly dbWriteNow: false;
}[] {
  const domains = Array.from(new Set(TAXI_ADMIN_RUNTIME_PANELS_001X.map((panel) => panel.domain)));
  return domains.map((domain) => ({
    domain,
    panelCount: TAXI_ADMIN_RUNTIME_PANELS_001X.filter((panel) => panel.domain === domain).length,
    actionCount: TAXI_ADMIN_RUNTIME_PANELS_001X
      .filter((panel) => panel.domain === domain)
      .reduce((sum, panel) => sum + panel.actions.length, 0),
    queueCount: TAXI_ADMIN_OPERATIONAL_QUEUES_001X.filter((queue) => queue.domain === domain).length,
    runtimeMountedNow: false,
    dbWriteNow: false,
  }));
}

export function evaluateTaxiAdminRuntimeReadiness001X(input: TaxiAdminRuntimeReadinessInput001X): TaxiAdminRuntimeReadinessDecision001X {
  const missing = new Set<TaxiAdminRuntimeGate001X>();

  if (!input.countryCode || !input.cityId || !input.tariffCode) {
    missing.add('country_city_scope_required');
  }
  if (!input.adminTokenHasWriteScope) {
    missing.add('admin_auth_required');
  }
  if (!input.makerCheckerConfigured) {
    missing.add('maker_checker_required');
  }
  if (!input.schemaMigrationApproved) {
    missing.add('schema_approval_required');
  }
  if (!input.providerReferenceLabelsApproved) {
    missing.add('provider_reference_labels_required');
  }
  if (!input.walletPaymentBoundaryApproved) {
    missing.add('wallet_boundary_approval_required');
  }
  if (!input.supportSafetyPolicyApproved) {
    missing.add('support_evidence_required');
  }
  if (!input.auditExportPolicyApproved) {
    missing.add('audit_reason_required');
  }
  missing.add('fake_success_blocked');

  return {
    canMountAdminRoutesNow: false,
    canEnableAdminUiRuntimeNow: false,
    canWriteDbNow: false,
    canMutateWalletNow: false,
    canCapturePaymentNow: false,
    canExecutePayoutNow: false,
    canDispatchProviderNow: false,
    missingGates: Array.from(missing),
    safeDisabled: true,
    exactOwnerApprovalRequired: true,
    fakeSuccessBlocked: true,
  };
}

export function previewTaxiAdminSettlementReview001X(input: TaxiAdminSettlementReviewPreviewInput001X): TaxiAdminSettlementReviewPreview001X {
  const gross = normalizeMinor(input.grossFareMinor);
  const basisPoints = normalizeBasisPoints(input.adminConfiguredCommissionBasisPoints);
  const commission = Math.floor((gross * basisPoints) / 10_000);
  const refund = normalizeMinor(input.refundMinor ?? 0);
  const adjustment = normalizeSignedMinor(input.driverAdjustmentMinor);
  const supportPenalty = normalizeMinor(input.supportPenaltyMinor ?? 0);
  const driverNet = Math.max(0, gross - commission - refund + adjustment - supportPenalty);

  return {
    grossFare: money(input.currency, gross),
    commissionPreview: money(input.currency, commission),
    refundPreview: money(input.currency, refund),
    driverNetPreview: money(input.currency, driverNet),
    adminReviewRequired: true,
    makerCheckerRequired: true,
    walletMutationNow: false,
    paymentCaptureNow: false,
    payoutNow: false,
    fakeSettlementApprovalBlocked: true,
  };
}

export function getTaxiAdminRuntimeReadinessMetrics001X(): {
  readonly panelCount: number;
  readonly actionCount: number;
  readonly workflowStepCount: number;
  readonly queueCount: number;
  readonly makerCheckerRuleCount: number;
  readonly gateMentionCount: number;
  readonly safeFalseCount: number;
} {
  return {
    panelCount: TAXI_ADMIN_RUNTIME_PANELS_001X.length,
    actionCount: TAXI_ADMIN_RUNTIME_PANELS_001X.reduce((sum, panel) => sum + panel.actions.length, 0),
    workflowStepCount: TAXI_ADMIN_WORKFLOW_STEPS_001X.length,
    queueCount: TAXI_ADMIN_OPERATIONAL_QUEUES_001X.length,
    makerCheckerRuleCount: TAXI_ADMIN_MAKER_CHECKER_RULES_001X.length,
    gateMentionCount: TAXI_ADMIN_RUNTIME_PANELS_001X.reduce((sum, panel) => sum + panel.gates.length, 0),
    safeFalseCount: countSafeFalseFlags(),
  };
}

function countSafeFalseFlags(): number {
  const panelFalseFlags = TAXI_ADMIN_RUNTIME_PANELS_001X.reduce(
    (sum, panel) => sum
      + Number(panel.readsRuntimeNow === false)
      + Number(panel.writesRuntimeNow === false)
      + Number(panel.routeMountedNow === false)
      + Number(panel.adminUiRuntimeMountedNow === false)
      + Number(panel.dbReadNow === false)
      + Number(panel.dbWriteNow === false)
      + Number(panel.walletMutationNow === false)
      + Number(panel.paymentNow === false)
      + Number(panel.payoutNow === false)
      + Number(panel.providerDispatchNow === false)
      + panel.actions.reduce((actionSum, action) => actionSum
        + Number(action.writesDbNow === false)
        + Number(action.callsProviderNow === false)
        + Number(action.mutatesWalletNow === false)
        + Number(action.paymentNow === false)
        + Number(action.payoutNow === false), 0),
    0,
  );
  const queueFalseFlags = TAXI_ADMIN_OPERATIONAL_QUEUES_001X.reduce(
    (sum, queue) => sum + Number(queue.readsDbNow === false) + Number(queue.writesDbNow === false) + Number(queue.mountedNow === false),
    0,
  );
  return panelFalseFlags + queueFalseFlags;
}

function normalizeMinor(value: number): number {
  if (!Number.isFinite(value)) {
    return 0;
  }
  return Math.max(0, Math.floor(value));
}

function normalizeSignedMinor(value: number | undefined): number {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    return 0;
  }
  return Math.trunc(value);
}

function normalizeBasisPoints(value: number | undefined): number {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    return 0;
  }
  return Math.min(10_000, Math.max(0, Math.floor(value)));
}

function money(currency: TaxiMoneyAmount['currency'], amountMinor: number): TaxiMoneyAmount {
  return { currency, amountMinor };
}
