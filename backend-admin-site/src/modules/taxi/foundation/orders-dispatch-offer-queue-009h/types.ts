import type { TAXI_ORDERS_DISPATCH_OFFER_QUEUE_009H_VERSION } from './constants';

export type TaxiOrdersDispatchOfferQueueVersion009H = typeof TAXI_ORDERS_DISPATCH_OFFER_QUEUE_009H_VERSION;

export interface TaxiOrdersDispatchOfferQueueReadiness009H {
  readonly version: TaxiOrdersDispatchOfferQueueVersion009H;
  readonly existingDispatchOfferOnly: true;
  readonly acceptedDispatchOfferRequired: true;
  readonly approvedVehicleRequired: true;
  readonly tripCreateSource: 'TaxiDispatchOffer';
  readonly orderDbSource: 'TaxiTrip';
  readonly readOnlyQueue: true;
  readonly dbWriteExecuted: false;
  readonly fakeOrderCreateBlocked: true;
  readonly fakeTripCreateBlocked: true;
  readonly providerDispatch: false;
  readonly walletMutation: false;
  readonly endpoints: readonly string[];
  readonly requiredPrismaDelegates: readonly string[];
}

export interface TaxiOrdersDispatchOfferQueueItem009H {
  readonly dispatchOfferId: string;
  readonly status: string;
  readonly driverProfileId: string;
  readonly riderProfileId: string;
  readonly vehicleId: string;
  readonly approvedVehicleFound: boolean;
  readonly existingTripId: string;
  readonly canCreateTrip: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly noFakeTripCreate: true;
}

export interface TaxiOrdersDispatchOfferQueueResult009H {
  readonly ok: boolean;
  readonly version: TaxiOrdersDispatchOfferQueueVersion009H;
  readonly code: string;
  readonly offers: readonly TaxiOrdersDispatchOfferQueueItem009H[];
  readonly acceptedOfferCount: number;
  readonly createReadyCount: number;
  readonly existingTripCount: number;
  readonly dbWriteExecuted: false;
  readonly fakeOrderCreateBlocked: true;
  readonly fakeTripCreateBlocked: true;
  readonly providerDispatch: false;
  readonly walletMutation: false;
}
