import type { TAXI_ORDERS_CONTROL_009A_VERSION } from './constants';

export type TaxiOrdersControlVersion009A = typeof TAXI_ORDERS_CONTROL_009A_VERSION;

export type TaxiOrderStatus009A =
  | 'accepted'
  | 'driver_arriving'
  | 'arrived'
  | 'rider_onboard'
  | 'active'
  | 'completed'
  | 'cancelled'
  | 'disputed'
  | 'unknown';

export type TaxiOrderGrowthDirection009B = 'up' | 'down' | 'flat';

export interface TaxiOrderRow009A {
  readonly orderId: string;
  readonly sourceModel: 'TaxiTrip';
  readonly status: TaxiOrderStatus009A;
  readonly countryCode: string;
  readonly cityId: string;
  readonly tariffCode: string;
  readonly riderName: string;
  readonly driverName: string;
  readonly vehiclePlate: string;
  readonly pickupLabel: string;
  readonly dropoffLabel: string;
  readonly routeLabel: string;
  readonly finalFareMinor: number;
  readonly commissionPercent: number;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly completedAt: string;
  readonly archiveEligibleAt: string;
  readonly archiveAfterDays: number;
  readonly archiveStatus: 'not_due' | 'eligible' | 'archived';
  readonly archived: boolean;
}

export interface TaxiOrderDailyTrendPoint009B {
  readonly date: string;
  readonly totalOrders: number;
  readonly activeOrders: number;
  readonly completedOrders: number;
  readonly cancelledOrders: number;
  readonly archivedOrders: number;
  readonly archiveEligibleOrders: number;
  readonly totalFareMinor: number;
  readonly previousTotalOrders: number;
  readonly changeOrders: number;
  readonly changePercent: number;
  readonly direction: TaxiOrderGrowthDirection009B;
  readonly barPercent: number;
}

export interface TaxiOrderGrowthSummary009B {
  readonly todayOrders: number;
  readonly yesterdayOrders: number;
  readonly changeOrders: number;
  readonly changePercent: number;
  readonly direction: TaxiOrderGrowthDirection009B;
  readonly dailyTrendDays: number;
}

export interface TaxiOrdersReport009A {
  readonly totalOrders: number;
  readonly activeOrders: number;
  readonly completedOrders: number;
  readonly cancelledOrders: number;
  readonly archivedOrders: number;
  readonly archiveEligibleOrders: number;
  readonly totalFinalFareMinor: number;
  readonly averageFinalFareMinor: number;
  readonly scale: readonly TaxiOrderScalePoint009A[];
  readonly statusBuckets: Record<string, number>;
  readonly dailyTrend: readonly TaxiOrderDailyTrendPoint009B[];
  readonly growthSummary: TaxiOrderGrowthSummary009B;
}

export interface TaxiOrderScalePoint009A {
  readonly key: string;
  readonly label: string;
  readonly value: number;
  readonly percent: number;
}

export interface TaxiOrdersReadiness009A {
  readonly version: TaxiOrdersControlVersion009A;
  readonly adminOrdersUiReadinessPercent: number;
  readonly backendOrdersReadinessPercent: number;
  readonly productionReadinessPercent: number;
  readonly endpoints: readonly string[];
  readonly requiredPrismaDelegates: readonly string[];
  readonly archiveAfterDays: number;
  readonly dailyTrendDays: number;
  readonly everyOrderSavedInDbSource: 'TaxiTrip';
  readonly archiveStorage: 'TaxiAuditLog';
  readonly auditJournalEnabled: true;
  readonly dailyGrowthScaleEnabled: true;
  readonly protectedArchiveRequiresExactHeader: boolean;
  readonly fakeSuccessBlocked: boolean;
  readonly noProviderDispatch: boolean;
  readonly noWalletMutation: boolean;
  readonly schedulerPolicy: Readonly<{
    readonly automaticArchiveAfterDays: number;
    readonly recommendedCadence: 'hourly_or_daily_worker';
    readonly runtimeEndpointAvailable: boolean;
    readonly directDbMutationByUi: false;
  }>;
}

export interface TaxiOrdersListResult009A {
  readonly ok: boolean;
  readonly version: TaxiOrdersControlVersion009A;
  readonly sourceConfigured: boolean;
  readonly archiveAfterDays: number;
  readonly dailyTrendDays: number;
  readonly orders: readonly TaxiOrderRow009A[];
  readonly report: TaxiOrdersReport009A;
  readonly missing: readonly string[];
  readonly fakeSuccessBlocked: true;
  readonly dbWriteExecuted: false;
}

export interface TaxiOrdersAuditItem009B {
  readonly auditId: string;
  readonly action: string;
  readonly targetType: string;
  readonly targetId: string;
  readonly actorType: string;
  readonly actorId: string;
  readonly createdAt: string;
  readonly orderId: string;
  readonly archiveAfterDays: number | null;
  readonly idempotencyKey: string;
  readonly fakeSuccessBlocked: boolean;
  readonly providerDispatch: boolean;
  readonly walletMutation: boolean;
}

export interface TaxiOrdersAuditResult009B {
  readonly ok: boolean;
  readonly version: TaxiOrdersControlVersion009A;
  readonly sourceConfigured: boolean;
  readonly audit: readonly TaxiOrdersAuditItem009B[];
  readonly auditCount: number;
  readonly fakeSuccessBlocked: true;
  readonly dbWriteExecuted: false;
  readonly providerDispatch: false;
  readonly walletMutation: false;
}

export interface TaxiOrdersArchiveRunResult009A {
  readonly ok: boolean;
  readonly version: TaxiOrdersControlVersion009A;
  readonly code: string;
  readonly archiveAfterDays: number;
  readonly scannedOrders: number;
  readonly eligibleOrders: number;
  readonly archivedOrders: number;
  readonly archivedOrderIds: readonly string[];
  readonly idempotencyKey: string;
  readonly dbWriteExecuted: boolean;
  readonly archiveWriteExecuted: boolean;
  readonly fakeSuccessBlocked: true;
  readonly providerDispatch: false;
  readonly walletMutation: false;
  readonly directDbAccessByUi: false;
}
