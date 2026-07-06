export interface SabiRelease244T {
  readonly version: string;
  readonly marker: string;
  readonly strictPlanMode: boolean;
  readonly noPivotWithoutOwnerApproval: boolean;
  readonly maximumAcceleration: boolean;
  readonly readiness: Record<string, number>;
  readonly safety: Record<string, boolean>;
  readonly nextStep: string;
  readonly [key: string]: unknown;
}
