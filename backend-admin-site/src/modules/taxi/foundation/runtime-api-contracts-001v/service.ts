import {
  TAXI_RUNTIME_ADMIN_ACTIONS_001V,
  TAXI_RUNTIME_API_CONTRACTS_001V,
  TAXI_RUNTIME_API_CONTRACT_VERSION_001V,
  TAXI_RUNTIME_PROVIDER_CONTRACTS_001V,
  TAXI_RUNTIME_SCHEMA_CANDIDATES_001V,
} from './constants';
import type {
  TaxiQuoteContractPreview001V,
  TaxiQuoteContractPreviewInput001V,
  TaxiRuntimeApiContract001V,
  TaxiRuntimeApiDomain001V,
  TaxiRuntimeApiDomainSummary001V,
  TaxiRuntimeApiSnapshot001V,
  TaxiRuntimeReadinessDecision001V,
  TaxiRuntimeReadinessInput001V,
  TaxiRuntimeReadinessState001V,
} from './types';
import type { TaxiMoneyAmount } from '../taxiFoundation.types';

export function getTaxiRuntimeApiContractsSnapshot001V(): TaxiRuntimeApiSnapshot001V {
  return {
    version: TAXI_RUNTIME_API_CONTRACT_VERSION_001V,
    status: 'runtime_api_contracts_ready_safe_disabled',
    contracts: TAXI_RUNTIME_API_CONTRACTS_001V,
    domainSummaries: summarizeTaxiRuntimeApiDomains001V(),
    adminActions: TAXI_RUNTIME_ADMIN_ACTIONS_001V,
    schemaCandidates: TAXI_RUNTIME_SCHEMA_CANDIDATES_001V,
    providerContracts: TAXI_RUNTIME_PROVIDER_CONTRACTS_001V,
    runtimeRoutesMounted: false,
    adminUiRuntimeMounted: false,
    envReadNow: false,
    dbReadNow: false,
    dbWriteNow: false,
    prismaSchemaWriteNow: false,
    prismaGenerateNow: false,
    prismaMigrationNow: false,
    walletMutationNow: false,
    paymentNow: false,
    payoutNow: false,
    providerDispatchNow: false,
    fakeSuccessBlocked: true,
  };
}

export function summarizeTaxiRuntimeApiDomains001V(): readonly TaxiRuntimeApiDomainSummary001V[] {
  const domains = Array.from(new Set(TAXI_RUNTIME_API_CONTRACTS_001V.map((contract) => contract.domain)));
  return domains.map((domain) => {
    const contracts = TAXI_RUNTIME_API_CONTRACTS_001V.filter((contract) => contract.domain === domain);
    const unresolvedReadiness = Array.from(new Set(contracts.map((contract) => contract.readiness)));
    return {
      domain,
      contractCount: contracts.length,
      runtimeEnabledNow: false,
      mountedNow: false,
      unresolvedReadiness,
    };
  });
}

export function listTaxiRuntimeApiContractPaths001V(): readonly string[] {
  return TAXI_RUNTIME_API_CONTRACTS_001V.map((contract) => `${contract.method} ${contract.path}`);
}

export function findTaxiRuntimeApiContract001V(id: string): TaxiRuntimeApiContract001V | undefined {
  return TAXI_RUNTIME_API_CONTRACTS_001V.find((contract) => contract.id === id);
}

export function evaluateTaxiRuntimeReadiness001V(input: TaxiRuntimeReadinessInput001V): TaxiRuntimeReadinessDecision001V {
  const missing = new Set<TaxiRuntimeReadinessState001V>();

  if (!input.adminConfigVersion) {
    missing.add('admin_config_required');
  }
  if (!input.routeProviderConfigured || !input.dispatchProviderConfigured) {
    missing.add('provider_config_required');
  }
  if (!input.paymentProviderConfigured || !input.walletProviderConfigured) {
    missing.add('wallet_provider_required');
  }
  if (!input.dbSchemaMigrated) {
    missing.add('db_schema_required');
  }
  if (!input.driverVerificationRuntimeReady) {
    missing.add('exact_owner_approval_required');
  }

  return {
    canMountRuntimeRoutesNow: false,
    canEnableDispatchNow: false,
    canEnablePaymentNow: false,
    canEnableWalletSettlementNow: false,
    canExecuteProviderCallNow: false,
    missingReadiness: Array.from(missing),
    selectedTariff: input.tariffCode,
    safeDisabled: true,
    exactOwnerApprovalRequired: true,
    fakeSuccessBlocked: true,
  };
}

export function previewTaxiQuoteContract001V(input: TaxiQuoteContractPreviewInput001V): TaxiQuoteContractPreview001V {
  const distanceKm = Math.max(0, Math.floor(input.distanceMeters)) / 1000;
  const durationMin = Math.max(0, Math.floor(input.durationSeconds)) / 60;
  const baseFare = normalizeMinor(input.adminConfiguredBaseFareMinor, 0);
  const perKm = normalizeMinor(input.adminConfiguredPerKmMinor, 0);
  const perMinute = normalizeMinor(input.adminConfiguredPerMinuteMinor, 0);
  const estimated = Math.floor(baseFare + distanceKm * perKm + durationMin * perMinute);

  return {
    tariffCode: input.tariffCode,
    estimatedFare: money(input.currency, estimated),
    providerQuoteLockedNow: false,
    priceChargedNow: false,
    walletHoldCreatedNow: false,
    dbQuotePersistedNow: false,
    adminConfigRequiredForProduction: true,
    fakeQuoteSuccessBlocked: true,
  };
}

export function listTaxiRuntimeBlockedDomains001V(): readonly TaxiRuntimeApiDomain001V[] {
  return summarizeTaxiRuntimeApiDomains001V().map((summary) => summary.domain);
}

function normalizeMinor(value: number | undefined, fallback: number): number {
  if (typeof value !== 'number' || Number.isNaN(value)) {
    return fallback;
  }
  return Math.max(0, Math.floor(value));
}

function money(currency: TaxiMoneyAmount['currency'], amountMinor: number): TaxiMoneyAmount {
  return {
    currency,
    amountMinor,
  };
}
