import {
  taxiAdminReadinessCockpitRouteSmokeEndpoints003I,
  taxiAdminReadinessCockpitRouteSmokePlan003I,
  taxiAdminReadinessCockpitRouteSmokeSafety003I,
} from './constants';
import type { TaxiAdminReadinessCockpitRouteSmokePlan003I, TaxiAdminReadinessCockpitRouteSmokeSafety003I } from './types';

export function buildTaxiAdminReadinessCockpitRouteSmokePlan003I(): TaxiAdminReadinessCockpitRouteSmokePlan003I {
  return taxiAdminReadinessCockpitRouteSmokePlan003I;
}

export function buildTaxiAdminReadinessCockpitRouteSmokeSafety003I(): TaxiAdminReadinessCockpitRouteSmokeSafety003I {
  return taxiAdminReadinessCockpitRouteSmokeSafety003I;
}

export function buildTaxiAdminReadinessCockpitRouteSmokeReadiness003I() {
  return {
    plan: buildTaxiAdminReadinessCockpitRouteSmokePlan003I(),
    endpoints: taxiAdminReadinessCockpitRouteSmokeEndpoints003I,
    safety: buildTaxiAdminReadinessCockpitRouteSmokeSafety003I(),
  } as const;
}
