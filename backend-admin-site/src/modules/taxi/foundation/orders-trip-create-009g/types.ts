import type { TAXI_ORDERS_TRIP_CREATE_009G_VERSION } from './constants';

export type TaxiOrdersTripCreateVersion009G = typeof TAXI_ORDERS_TRIP_CREATE_009G_VERSION;

export interface TaxiOrdersTripCreateReadiness009G {
  readonly version: TaxiOrdersTripCreateVersion009G;
  readonly existingDispatchOfferOnly: true;
  readonly acceptedDispatchOfferRequired: true;
  readonly approvedVehicleRequired: true;
  readonly fakeOrderCreateBlocked: true;
  readonly fakeTripCreateBlocked: true;
  readonly adminCannotCreateFakeOrders: true;
  readonly everyOrderSavedInDbSource: 'TaxiTrip';
  readonly tripCreateSource: 'TaxiDispatchOffer';
  readonly auditStorage: 'TaxiAuditLog';
  readonly protectedTripCreateRequiresExactHeader: true;
  readonly idempotencyRequired: true;
  readonly endpoints: readonly string[];
  readonly requiredPrismaDelegates: readonly string[];
  readonly dbWriteOnlyForExistingAcceptedDispatchOffer: true;
  readonly providerDispatch: false;
  readonly walletMutation: false;
}

export interface TaxiOrdersTripCreateInput009G {
  readonly dispatchOfferId: string;
  readonly vehicleId?: string;
  readonly reason?: string;
}

export interface TaxiOrdersTripCreateResult009G {
  readonly ok: boolean;
  readonly version: TaxiOrdersTripCreateVersion009G;
  readonly code: string;
  readonly dispatchOfferId: string;
  readonly tripId: string;
  readonly vehicleId: string;
  readonly driverProfileId: string;
  readonly idempotencyKey: string;
  readonly existingDispatchOfferFound: boolean;
  readonly acceptedDispatchOfferRequired: true;
  readonly approvedVehicleRequired: true;
  readonly existingTripFound: boolean;
  readonly dbWriteExecuted: boolean;
  readonly auditWriteExecuted: boolean;
  readonly fakeOrderCreateBlocked: true;
  readonly fakeTripCreateBlocked: true;
  readonly providerDispatch: false;
  readonly walletMutation: false;
  readonly directDbAccessByUi: false;
}
