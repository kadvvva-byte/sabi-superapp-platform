import type {
  OwnerSabiAiApprovalMatrix251E,
  OwnerSabiAiLockedGateContracts251E,
} from './ownerSabiAiRuntimeGates251E.types';

export const ownerSabiAiLockedGateContracts251E = {
  "version": "SABI-RELEASE-251E-OWNER-SABI-AI-RUNTIME-MOUNT-PLAN-LOCKED-GATE-CONTRACTS",
  "code": "OWNER_SABI_AI_LOCKED_GATE_CONTRACTS_251E",
  "status": "local_gate_contracts_only",
  "gates": [
    {
      "gateKey": "owner_approval_gate",
      "title": "Exact Owner approval gate",
      "readiness": 100,
      "requiredFor": [
        "runtime mount",
        "Cloud Run deploy",
        "DB mutation",
        "secret/env access",
        "provider connection",
        "money action"
      ],
      "currentlyOpen": false,
      "ownerMayOpenWithExactApproval": true
    },
    {
      "gateKey": "read_only_runtime_gate",
      "title": "Read-only runtime gate",
      "readiness": 100,
      "requiredFor": [
        "GET health endpoints",
        "GET module summaries",
        "GET daily report draft"
      ],
      "currentlyOpen": false,
      "ownerMayOpenWithExactApproval": true,
      "allowedMethodsFuture": [
        "GET"
      ],
      "blockedMethodsAlwaysUntilSeparateApproval": [
        "POST",
        "PUT",
        "PATCH",
        "DELETE"
      ]
    },
    {
      "gateKey": "db_gate",
      "title": "Database mutation gate",
      "readiness": 100,
      "currentlyOpen": false,
      "mutationNow": 0,
      "blockedActions": [
        "create",
        "update",
        "delete",
        "upsert",
        "write audit rows without approval"
      ]
    },
    {
      "gateKey": "secret_env_gate",
      "title": "Secret/env gate",
      "readiness": 100,
      "currentlyOpen": false,
      "mutationNow": 0,
      "blockedActions": [
        "read secrets",
        "write secrets",
        "rotate secrets",
        "print tokens",
        "write env files"
      ]
    },
    {
      "gateKey": "money_gate",
      "title": "Wallet/payment/payout gate",
      "readiness": 100,
      "currentlyOpen": false,
      "mutationNow": 0,
      "blockedActions": [
        "wallet mutation",
        "payment capture",
        "refund",
        "payout release",
        "provider settlement"
      ]
    },
    {
      "gateKey": "public_claim_gate",
      "title": "Public claim gate",
      "readiness": 100,
      "currentlyOpen": false,
      "blockedActions": [
        "claim runtime AI live before proof",
        "publish unverified contact",
        "publish unsupported provider claim"
      ]
    }
  ],
  "globalDefault": {
    "allGatesClosedByDefault": true,
    "exactOwnerApprovalRequired": true,
    "noImplicitApproval": true,
    "noAutonomousFinalActionByOwnerSabiAi": true
  }
} satisfies OwnerSabiAiLockedGateContracts251E;

export const ownerSabiAiApprovalMatrix251E = {
  "version": "SABI-RELEASE-251E-OWNER-SABI-AI-RUNTIME-MOUNT-PLAN-LOCKED-GATE-CONTRACTS",
  "code": "OWNER_SABI_AI_APPROVAL_MATRIX_251E",
  "status": "local_matrix_only",
  "actors": [
    {
      "actor": "Owner",
      "canApproveFinalActions": true,
      "canOpenRuntimeGate": true,
      "canOpenMoneyGate": true,
      "canOpenSecretDbProviderGate": true,
      "readinessPercent": 100
    },
    {
      "actor": "Owner Sabi AI",
      "canPrepare": true,
      "canAnalyze": true,
      "canWarn": true,
      "canRecommend": true,
      "canApproveFinalActions": false,
      "canMoveMoney": false,
      "canMutateRuntimeWithoutOwner": false,
      "readinessPercent": 100
    },
    {
      "actor": "Deputy",
      "canPrepareOperationalItems": true,
      "canApproveFinalActions": false,
      "canMoveMoney": false,
      "canOpenSecretDbProviderGate": false,
      "readinessPercent": 80
    },
    {
      "actor": "Staff",
      "functionScopedOnly": true,
      "canApproveFinalActions": false,
      "canMoveMoney": false,
      "canOpenRuntimeGate": false,
      "readinessPercentRange": "10-50"
    }
  ],
  "decisionClasses": [
    {
      "classKey": "read_only_status",
      "ownerApprovalRequiredForRuntime": true,
      "ownerSabiAiMayPrepare": true,
      "finalMutationRisk": "none_if_get_only"
    },
    {
      "classKey": "runtime_mount",
      "ownerApprovalRequired": true,
      "ownerSabiAiMayPrepare": true,
      "finalMutationRisk": "deployment_or_runtime_exposure"
    },
    {
      "classKey": "db_secret_provider",
      "ownerApprovalRequired": true,
      "ownerSabiAiMayPrepare": true,
      "finalMutationRisk": "high"
    },
    {
      "classKey": "money_payment_payout",
      "ownerApprovalRequired": true,
      "ownerSabiAiMayPrepare": true,
      "finalMutationRisk": "critical"
    },
    {
      "classKey": "public_legal_claim",
      "ownerApprovalRequired": true,
      "ownerSabiAiMayPrepare": true,
      "finalMutationRisk": "reputation_legal"
    }
  ]
} satisfies OwnerSabiAiApprovalMatrix251E;
