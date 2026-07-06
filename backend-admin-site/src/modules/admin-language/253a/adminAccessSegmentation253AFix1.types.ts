export type InternalAdminRole253AFix1 =
  | 'owner'
  | 'ownerSabiAi'
  | 'developer'
  | 'accountant'
  | 'compliance'
  | 'deputy'
  | 'taxiManager'
  | 'streamManager';

export type AdminAccessSegmentation253AFix1 = Readonly<{
  currentAdminIsInternalOnly: true;
  internalAdminForOwnerSabiAiAndStaffOnly: true;
  clientsMustNotUseInternalAdmin: true;
  merchantsMustNotUseInternalAdmin: true;
  businessAccountsMustNotUseInternalAdmin: true;
  separateMerchantBusinessCabinetRequired: true;
  separateClientAccessRequired: true;
}>;

export type MerchantBusinessLimitedAdmin253AFix1 = Readonly<{
  separateAdminRequired: true;
  notInternalAdmin: true;
  noOwnerLevelAccess: true;
  noGlobalFinanceAccess: true;
  noGlobalUserAccess: true;
  noStaffManagementAccess: true;
  noProviderSettingsAccess: true;
  noSecretAccess: true;
  noDbMutationAccess: true;
  noPayoutApprovalAccess: true;
  noFundMovementAccess: true;
  readOnlyFinanceStatements: true;
  requestOnlyWhereAllowed: true;
}>;
