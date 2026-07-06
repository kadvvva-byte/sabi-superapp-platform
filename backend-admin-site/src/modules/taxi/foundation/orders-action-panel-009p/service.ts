import { prisma as defaultPrisma } from '../../../../config/prisma';
import {
  TAXI_ORDERS_ACTION_PANEL_009P_VERSION,
  TAXI_ORDERS_ACTION_PANEL_ENDPOINTS_009P,
  TAXI_ORDERS_ACTION_PANEL_REQUIRED_DELEGATES_009P,
  TAXI_ORDERS_PROTECTED_ACTIONS_009P,
} from './constants';
import { loadTaxiOrdersRealDataStatus009M } from '../orders-real-data-readiness-009m';
import type {
  TaxiOrdersActionPanelReadiness009P,
  TaxiOrdersActionPanelStatus009P,
  TaxiOrdersProtectedAction009P,
} from './types';

type PrismaAny009P = Record<string, any>;

type RequirementLike009P = Readonly<{ key: string; count: number; status: string; missingText: string }>;

type RealDataStatusLike009P = Readonly<{
  readinessPercent?: number;
  missingRequirements?: number;
  nextMissingRequirementKey?: string;
  requirements?: readonly RequirementLike009P[];
}>;

function normalizeActionMethod009P(method: string): 'GET' | 'POST' {
  return method === 'GET' ? 'GET' : 'POST';
}

function requirementMap009P(status: RealDataStatusLike009P): Map<string, RequirementLike009P> {
  return new Map((status.requirements || []).map((requirement) => [requirement.key, requirement]));
}

function blockedReason009P(template: (typeof TAXI_ORDERS_PROTECTED_ACTIONS_009P)[number], requirement: RequirementLike009P | undefined): string {
  if (!requirement) return 'Waiting for previous real DB prerequisite; no fake data is generated.';
  if (requirement.status === 'ready') return '';
  return requirement.missingText || template.readyWhen;
}

function mapAction009P(
  template: (typeof TAXI_ORDERS_PROTECTED_ACTIONS_009P)[number],
  requirement: RequirementLike009P | undefined,
): TaxiOrdersProtectedAction009P {
  const ready = requirement?.status === 'ready';
  return {
    key: template.key,
    requirementKey: template.requirementKey,
    stage: template.stage,
    title: template.title,
    method: normalizeActionMethod009P(template.method),
    endpoint: template.endpoint,
    approvalHeader: template.approvalHeader,
    approvalValue: template.approvalValue,
    manualPayloadRequired: template.manualPayloadRequired,
    payloadFields: template.payloadFields,
    readyWhen: template.readyWhen,
    enabled: ready ? 'ready' : 'blocked',
    blockedReason: blockedReason009P(template, requirement),
    count: Number(requirement?.count || 0),
    noFakeAutofill: true,
    noFakePayload: true,
    ownerApprovalRequired: Boolean(template.approvalHeader),
  };
}

function nextActionText009P(nextAction: TaxiOrdersProtectedAction009P | undefined): string {
  if (!nextAction) return 'All protected order-chain actions have real DB prerequisites. Continue through protected buttons only.';
  return `${nextAction.stage}: ${nextAction.title} — ${nextAction.blockedReason || nextAction.readyWhen}`;
}

export function buildTaxiOrdersActionPanelReadiness009P(): TaxiOrdersActionPanelReadiness009P {
  return {
    version: TAXI_ORDERS_ACTION_PANEL_009P_VERSION,
    panelPurpose: 'show_next_protected_real_order_action',
    endpoints: TAXI_ORDERS_ACTION_PANEL_ENDPOINTS_009P,
    requiredPrismaDelegates: TAXI_ORDERS_ACTION_PANEL_REQUIRED_DELEGATES_009P,
    reads009MStatus: true,
    protectedActionsCount: TAXI_ORDERS_PROTECTED_ACTIONS_009P.length,
    noAutofill: true,
    noFakePayload: true,
    readOnlyStatus: true,
    providerDispatch: false,
    walletMutation: false,
    dbWriteExecuted: false,
  };
}

export async function loadTaxiOrdersActionPanelStatus009P(
  prisma: PrismaAny009P = defaultPrisma as unknown as PrismaAny009P,
): Promise<TaxiOrdersActionPanelStatus009P> {
  const realDataStatus = await loadTaxiOrdersRealDataStatus009M(prisma) as unknown as RealDataStatusLike009P;
  const requirements = requirementMap009P(realDataStatus);
  const actions = TAXI_ORDERS_PROTECTED_ACTIONS_009P.map((template) => mapAction009P(template, requirements.get(template.requirementKey)));
  const nextAction = actions.find((action) => action.enabled === 'blocked') || actions[0];

  return {
    ok: true,
    version: TAXI_ORDERS_ACTION_PANEL_009P_VERSION,
    code: 'taxi_orders_009p_action_panel_status_loaded',
    readinessPercent: Number(realDataStatus.readinessPercent || 0),
    missingRequirements: Number(realDataStatus.missingRequirements || 0),
    nextMissingRequirementKey: String(realDataStatus.nextMissingRequirementKey || ''),
    nextActionKey: nextAction?.key || '',
    nextActionText: nextActionText009P(nextAction),
    actions,
    noAutofill: true,
    noFakePayload: true,
    noLocalDbMutationByUi: true,
    dbWriteExecuted: false,
    providerDispatch: false,
    walletMutation: false,
    directDbAccessByUi: false,
  };
}
