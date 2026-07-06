export * from './taxiDbSchemaApproval.types';
export * from './taxiDbSchemaApproval.constants';
export * from './taxiDbSchemaApproval.service';
export * from './taxiDbSchemaApproval.routes';
import { taxiDbSchemaApprovalRouteDescriptors } from './taxiDbSchemaApproval.constants';

export const taxiDbSchemaApprovalRoutesMountedNow = false as const;
export const taxiDbSchemaApprovalRuntimeEnabledNow = false as const;
export const taxiDbSchemaApprovalRouteContracts = taxiDbSchemaApprovalRouteDescriptors;
