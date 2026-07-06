import { adminSmsReadinessRouteContract239J } from './adminSmsReadinessRouteContract239J';
import { authPhoneSmsRouteContracts239J } from './authPhoneSmsRouteContracts239J';

export type AuthPhoneSmsRouteMountCandidate239J = Readonly<{
  version: '239J';
  enabled: false;
  disabledReason: 'disabled_by_default';
  mountMode: 'contract_only_no_runtime_mount';
  firebaseApiCallNow: false;
  smsProviderCallNow: false;
  smsSentNow: false;
  liveAuthEnabledNow: false;
  routes: typeof authPhoneSmsRouteContracts239J;
  adminReadinessRoute: typeof adminSmsReadinessRouteContract239J;
}>;

export const authPhoneSmsRouteMountCandidate239J: AuthPhoneSmsRouteMountCandidate239J = {
  version: '239J',
  enabled: false,
  disabledReason: 'disabled_by_default',
  mountMode: 'contract_only_no_runtime_mount',
  firebaseApiCallNow: false,
  smsProviderCallNow: false,
  smsSentNow: false,
  liveAuthEnabledNow: false,
  routes: authPhoneSmsRouteContracts239J,
  adminReadinessRoute: adminSmsReadinessRouteContract239J,
};

export const authPhoneSmsRouteMountCandidateMarker239J = 'authPhoneSmsRouteMountCandidate239J';
export const backendRouteContractMountCandidate239J = 'backendRouteContractMountCandidate239J';
