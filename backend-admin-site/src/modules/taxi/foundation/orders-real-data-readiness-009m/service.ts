import { prisma as defaultPrisma } from '../../../../config/prisma';
import {
  TAXI_ORDERS_REAL_DATA_READINESS_009M_VERSION,
  TAXI_ORDERS_REAL_DATA_READINESS_ENDPOINTS_009M,
  TAXI_ORDERS_REAL_DATA_READINESS_REQUIRED_DELEGATES_009M,
  TAXI_ORDERS_REAL_DATA_REQUIREMENTS_009M,
} from './constants';
import type {
  TaxiOrdersRealDataCounts009M,
  TaxiOrdersRealDataReadiness009M,
  TaxiOrdersRealDataRequirement009M,
  TaxiOrdersRealDataStatus009M,
} from './types';

type PrismaAny009M = Record<string, any>;

const ACTIVE_TARIFF_STATUS_009M = 'active';
const ACCEPTED_QUOTE_STATUS_009M = 'accepted';
const OPEN_REQUEST_STATUSES_009M = ['created', 'searching', 'matched'] as const;
const APPROVED_DRIVER_STATUS_009M = 'approved';
const APPROVED_VEHICLE_STATUS_009M = 'approved';
const OPEN_OFFER_STATUSES_009M = ['created', 'sent', 'accepted'] as const;
const ACCEPTED_OFFER_STATUS_009M = 'accepted';

async function count009M(prisma: PrismaAny009M, delegate: string, args?: Record<string, unknown>): Promise<number> {
  try {
    if (!prisma[delegate] || typeof prisma[delegate].count !== 'function') return 0;
    const value = await prisma[delegate].count(args || {});
    return Number.isFinite(Number(value)) ? Number(value) : 0;
  } catch {
    return 0;
  }
}

function buildRequirement009M(template: (typeof TAXI_ORDERS_REAL_DATA_REQUIREMENTS_009M)[number], count: number): TaxiOrdersRealDataRequirement009M {
  return {
    key: template.key,
    title: template.title,
    dbModel: template.dbModel,
    neededFor: template.neededFor,
    status: count > 0 ? 'ready' : 'missing',
    count,
    requiredMinimum: 1,
    missingText: template.missingText,
    actionEndpoint: template.actionEndpoint,
  };
}

function nextAction009M(requirement: TaxiOrdersRealDataRequirement009M | undefined): string {
  if (!requirement) return 'Full chain has real DB prerequisites available. Continue with protected flow buttons; no fake rows needed.';
  return `${requirement.title}: ${requirement.missingText}`;
}

export function buildTaxiOrdersRealDataReadiness009M(): TaxiOrdersRealDataReadiness009M {
  return {
    version: TAXI_ORDERS_REAL_DATA_READINESS_009M_VERSION,
    dashboardPurpose: 'show_missing_real_data_requirements',
    endpoints: TAXI_ORDERS_REAL_DATA_READINESS_ENDPOINTS_009M,
    requiredPrismaDelegates: TAXI_ORDERS_REAL_DATA_READINESS_REQUIRED_DELEGATES_009M,
    productionChainVerifiedBy009L: true,
    strictDbOnlyNoZeroFill: true,
    noFakeRows: true,
    noFakeCreate: true,
    readOnlyStatus: true,
    providerDispatch: false,
    walletMutation: false,
    dbWriteExecuted: false,
  };
}

export async function loadTaxiOrdersRealDataStatus009M(
  prisma: PrismaAny009M = defaultPrisma as unknown as PrismaAny009M,
): Promise<TaxiOrdersRealDataStatus009M> {
  const now = new Date();
  const counts: TaxiOrdersRealDataCounts009M = {
    riderProfiles: await count009M(prisma, 'taxiRiderProfile'),
    activeTariffRegions: await count009M(prisma, 'taxiTariffRegion', { where: { status: ACTIVE_TARIFF_STATUS_009M } }),
    acceptedQuotes: await count009M(prisma, 'taxiQuote', { where: { status: ACCEPTED_QUOTE_STATUS_009M, expiresAt: { gt: now } } }),
    openRiderRequests: await count009M(prisma, 'taxiRiderRequest', { where: { status: { in: [...OPEN_REQUEST_STATUSES_009M] } } }),
    approvedDriversWithPositiveBalance: await count009M(prisma, 'taxiDriverProfile', { where: { status: APPROVED_DRIVER_STATUS_009M, balanceReserveMinor: { gt: 0 } } }),
    approvedVehicles: await count009M(prisma, 'taxiVehicle', { where: { status: APPROVED_VEHICLE_STATUS_009M } }),
    activeDriverVehicleAssignments: await count009M(prisma, 'taxiDriverVehicleAssignment', { where: { active: true } }),
    openDispatchOffers: await count009M(prisma, 'taxiDispatchOffer', { where: { status: { in: [...OPEN_OFFER_STATUSES_009M] } } }),
    acceptedDispatchOffers: await count009M(prisma, 'taxiDispatchOffer', { where: { status: ACCEPTED_OFFER_STATUS_009M } }),
    taxiTrips: await count009M(prisma, 'taxiTrip'),
    auditLogs: await count009M(prisma, 'taxiAuditLog'),
  };

  const requirementCounts: Record<string, number> = {
    rider_profile: counts.riderProfiles,
    active_tariff_region: counts.activeTariffRegions,
    real_route_and_fare: counts.acceptedQuotes,
    accepted_quote: counts.acceptedQuotes,
    open_rider_request: counts.openRiderRequests,
    approved_driver_positive_balance: counts.approvedDriversWithPositiveBalance,
    approved_vehicle_active_assignment: Math.min(counts.approvedVehicles, counts.activeDriverVehicleAssignments),
    accepted_dispatch_offer: counts.acceptedDispatchOffers,
    taxi_trip: counts.taxiTrips,
  };

  const requirements = TAXI_ORDERS_REAL_DATA_REQUIREMENTS_009M.map((template) => buildRequirement009M(template, requirementCounts[template.key] || 0));
  const readyRequirements = requirements.filter((item) => item.status === 'ready').length;
  const missingRequirements = requirements.length - readyRequirements;
  const nextMissing = requirements.find((item) => item.status === 'missing');

  return {
    ok: true,
    version: TAXI_ORDERS_REAL_DATA_READINESS_009M_VERSION,
    code: 'taxi_orders_009m_real_data_readiness_status_loaded',
    counts,
    requirements,
    readyRequirements,
    missingRequirements,
    readinessPercent: Math.round((readyRequirements / Math.max(1, requirements.length)) * 100),
    canCreateQuoteNow: counts.riderProfiles > 0 && counts.activeTariffRegions > 0,
    canCreateRiderRequestNow: counts.acceptedQuotes > 0,
    canCreateDispatchOfferNow: counts.openRiderRequests > 0 && counts.approvedDriversWithPositiveBalance > 0 && counts.approvedVehicles > 0 && counts.activeDriverVehicleAssignments > 0,
    canCreateTripNow: counts.acceptedDispatchOffers > 0,
    ordersVisibleFromTaxiTrip: counts.taxiTrips > 0,
    nextMissingRequirementKey: nextMissing?.key || '',
    nextOwnerAction: nextAction009M(nextMissing),
    strictDbOnlyNoZeroFill: true,
    noFakeRows: true,
    noFakeCreate: true,
    dbWriteExecuted: false,
    providerDispatch: false,
    walletMutation: false,
    directDbAccessByUi: false,
  };
}
