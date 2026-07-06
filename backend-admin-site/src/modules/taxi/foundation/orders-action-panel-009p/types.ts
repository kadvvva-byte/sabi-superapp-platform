import type { TAXI_ORDERS_ACTION_PANEL_009P_VERSION } from './constants';

export type TaxiOrdersActionPanelVersion009P = typeof TAXI_ORDERS_ACTION_PANEL_009P_VERSION;
export type TaxiOrdersActionMethod009P = 'GET' | 'POST';
export type TaxiOrdersActionEnabled009P = 'ready' | 'blocked';

export type TaxiOrdersProtectedAction009P = Readonly<{
  key: string;
  requirementKey: string;
  stage: string;
  title: string;
  method: TaxiOrdersActionMethod009P;
  endpoint: string;
  approvalHeader: string;
  approvalValue: string;
  manualPayloadRequired: boolean;
  payloadFields: readonly string[];
  readyWhen: string;
  enabled: TaxiOrdersActionEnabled009P;
  blockedReason: string;
  count: number;
  noFakeAutofill: true;
  noFakePayload: true;
  ownerApprovalRequired: boolean;
}>;

export type TaxiOrdersActionPanelReadiness009P = Readonly<{
  version: TaxiOrdersActionPanelVersion009P;
  panelPurpose: 'show_next_protected_real_order_action';
  endpoints: readonly string[];
  requiredPrismaDelegates: readonly string[];
  reads009MStatus: true;
  protectedActionsCount: number;
  noAutofill: true;
  noFakePayload: true;
  readOnlyStatus: true;
  providerDispatch: false;
  walletMutation: false;
  dbWriteExecuted: false;
}>;

export type TaxiOrdersActionPanelStatus009P = Readonly<{
  ok: boolean;
  version: TaxiOrdersActionPanelVersion009P;
  code: string;
  readinessPercent: number;
  missingRequirements: number;
  nextMissingRequirementKey: string;
  nextActionKey: string;
  nextActionText: string;
  actions: readonly TaxiOrdersProtectedAction009P[];
  noAutofill: true;
  noFakePayload: true;
  noLocalDbMutationByUi: true;
  dbWriteExecuted: false;
  providerDispatch: false;
  walletMutation: false;
  directDbAccessByUi: false;
}>;
