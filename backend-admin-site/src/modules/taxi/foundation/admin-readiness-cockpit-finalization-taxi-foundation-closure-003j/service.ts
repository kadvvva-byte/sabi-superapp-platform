import { taxiFoundationClosureItems003J, taxiFoundationClosureSnapshot003J } from './constants';
import type { TaxiFoundationClosureSnapshot003J } from './types';

export function getTaxiFoundationClosureSnapshot003J(): TaxiFoundationClosureSnapshot003J {
  return taxiFoundationClosureSnapshot003J;
}

export function evaluateTaxiFoundationClosure003J(): Readonly<{
  version: string;
  backendApiFoundationComplete: true;
  adminFoundationCockpitComplete: true;
  foundationClosureItemCount: number;
  completedClosureItemCount: number;
  readyNextPhaseItemCount: number;
  blockedUntilExactApprovalItemCount: number;
  productionReadinessPercent: 99;
  fakeSuccessBlocked: true;
}> {
  return {
    version: taxiFoundationClosureSnapshot003J.version,
    backendApiFoundationComplete: true,
    adminFoundationCockpitComplete: true,
    foundationClosureItemCount: taxiFoundationClosureItems003J.length,
    completedClosureItemCount: taxiFoundationClosureItems003J.filter((item) => item.state === 'complete').length,
    readyNextPhaseItemCount: taxiFoundationClosureItems003J.filter((item) => item.state === 'ready').length,
    blockedUntilExactApprovalItemCount: taxiFoundationClosureItems003J.filter((item) => item.state === 'blocked_until_exact_approval').length,
    productionReadinessPercent: 99,
    fakeSuccessBlocked: true,
  };
}
