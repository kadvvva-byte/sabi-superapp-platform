import type {
  AdminAccessSegmentation253AFix1,
  MerchantBusinessLimitedAdmin253AFix1,
} from './adminAccessSegmentation253AFix1.types';

export const adminAccessSegmentation253AFix1: AdminAccessSegmentation253AFix1 = {
  currentAdminIsInternalOnly: true,
  internalAdminForOwnerSabiAiAndStaffOnly: true,
  clientsMustNotUseInternalAdmin: true,
  merchantsMustNotUseInternalAdmin: true,
  businessAccountsMustNotUseInternalAdmin: true,
  separateMerchantBusinessCabinetRequired: true,
  separateClientAccessRequired: true,
} as const;

export const merchantBusinessLimitedAdmin253AFix1: MerchantBusinessLimitedAdmin253AFix1 = {
  separateAdminRequired: true,
  notInternalAdmin: true,
  noOwnerLevelAccess: true,
  noGlobalFinanceAccess: true,
  noGlobalUserAccess: true,
  noStaffManagementAccess: true,
  noProviderSettingsAccess: true,
  noSecretAccess: true,
  noDbMutationAccess: true,
  noPayoutApprovalAccess: true,
  noFundMovementAccess: true,
  readOnlyFinanceStatements: true,
  requestOnlyWhereAllowed: true,
} as const;
