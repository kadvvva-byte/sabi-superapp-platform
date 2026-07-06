import type { TAXI_ORDERS_LIFECYCLE_009F_VERSION } from './constants';

export type TaxiOrdersLifecycleVersion009F = typeof TAXI_ORDERS_LIFECYCLE_009F_VERSION;

export type TaxiTripLifecycleStatus009F =
  | 'accepted'
  | 'driver_arriving'
  | 'arrived'
  | 'rider_onboard'
  | 'active'
  | 'completed'
  | 'cancelled'
  | 'disputed'
  | 'unknown';

export interface TaxiOrdersLifecycleReadiness009F {
  readonly version: TaxiOrdersLifecycleVersion009F;
  readonly existingTripOnly: true;
  readonly fakeOrderCreateBlocked: true;
  readonly adminCannotCreateFakeOrders: true;
  readonly everyOrderSource: 'TaxiTrip';
  readonly auditStorage: 'TaxiAuditLog';
  readonly protectedTransitionRequiresExactHeader: true;
  readonly endpoints: readonly string[];
  readonly requiredPrismaDelegates: readonly string[];
  readonly allowedTransitions: Record<string, readonly string[]>;
  readonly dbWriteOnlyForExistingTaxiTripTransition: true;
  readonly providerDispatch: false;
  readonly walletMutation: false;
}

export interface TaxiOrdersLifecycleTransitionInput009F {
  readonly orderId: string;
  readonly nextStatus: TaxiTripLifecycleStatus009F;
  readonly finalFareMinor?: number;
  readonly reason?: string;
}

export interface TaxiOrdersLifecycleTransitionResult009F {
  readonly ok: boolean;
  readonly version: TaxiOrdersLifecycleVersion009F;
  readonly code: string;
  readonly orderId: string;
  readonly previousStatus: TaxiTripLifecycleStatus009F;
  readonly nextStatus: TaxiTripLifecycleStatus009F;
  readonly idempotencyKey: string;
  readonly transitionAllowed: boolean;
  readonly existingTaxiTripFound: boolean;
  readonly dbWriteExecuted: boolean;
  readonly auditWriteExecuted: boolean;
  readonly fakeOrderCreateBlocked: true;
  readonly providerDispatch: false;
  readonly walletMutation: false;
  readonly directDbAccessByUi: false;
}
