import { prisma as defaultPrisma } from '../../../../config/prisma';
import {
  TAXI_ORDERS_RIDER_USER_CANDIDATES_009Q_VERSION,
  TAXI_ORDERS_RIDER_USER_CANDIDATES_DEFAULT_LIMIT_009Q,
  TAXI_ORDERS_RIDER_USER_CANDIDATES_ENDPOINTS_009Q,
  TAXI_ORDERS_RIDER_USER_CANDIDATES_MAX_LIMIT_009Q,
  TAXI_ORDERS_RIDER_USER_CANDIDATES_REQUIRED_DELEGATES_009Q,
  TAXI_ORDERS_RIDER_USER_DELEGATE_CANDIDATES_009Q,
} from './constants';
import type {
  TaxiOrdersRiderUserCandidate009Q,
  TaxiOrdersRiderUserCandidatesList009Q,
  TaxiOrdersRiderUserCandidatesReadiness009Q,
} from './types';

type PrismaAny009Q = Record<string, any>;
type RowAny009Q = Record<string, any>;

function str009Q(value: unknown): string {
  return String(value || '').trim();
}

function num009Q(value: unknown, fallback: number): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function clampLimit009Q(value: unknown): number {
  return Math.max(1, Math.min(TAXI_ORDERS_RIDER_USER_CANDIDATES_MAX_LIMIT_009Q, Math.floor(num009Q(value, TAXI_ORDERS_RIDER_USER_CANDIDATES_DEFAULT_LIMIT_009Q))));
}

function maskEmail009Q(value: unknown): string {
  const email = str009Q(value).toLowerCase();
  if (!email || !email.includes('@')) return '';
  const [name, domain] = email.split('@');
  const safeName = name.length <= 2 ? `${name.slice(0, 1)}***` : `${name.slice(0, 2)}***${name.slice(-1)}`;
  const domainParts = domain.split('.');
  const first = domainParts[0] || '';
  const suffix = domainParts.slice(1).join('.');
  return `${safeName}@${first.slice(0, 2)}***${suffix ? `.${suffix}` : ''}`;
}

function maskPhone009Q(value: unknown): string {
  const digits = str009Q(value).replace(/\D/g, '');
  if (!digits) return '';
  if (digits.length <= 4) return '***';
  return `${digits.slice(0, 2)}***${digits.slice(-2)}`;
}

function safeDisplayName009Q(row: RowAny009Q): string {
  const name = str009Q(row.displayName || row.fullName || row.name || `${str009Q(row.firstName)} ${str009Q(row.lastName)}`.trim());
  if (!name) return 'Existing user';
  if (name.length <= 2) return `${name.slice(0, 1)}***`;
  return `${name.slice(0, 1)}***${name.slice(-1)}`;
}

async function count009Q(prisma: PrismaAny009Q, delegate: string, args?: Record<string, unknown>): Promise<number> {
  try {
    if (!prisma[delegate] || typeof prisma[delegate].count !== 'function') return 0;
    const value = await prisma[delegate].count(args || {});
    return Number.isFinite(Number(value)) ? Number(value) : 0;
  } catch {
    return 0;
  }
}

function availableUserDelegates009Q(prisma: PrismaAny009Q): string[] {
  return TAXI_ORDERS_RIDER_USER_DELEGATE_CANDIDATES_009Q.filter((delegate) => {
    const candidate = prisma[delegate];
    return !!candidate && typeof candidate.findMany === 'function';
  });
}

async function findUsers009Q(prisma: PrismaAny009Q, delegateName: string, limit: number): Promise<RowAny009Q[]> {
  const delegate = prisma[delegateName];
  if (!delegate || typeof delegate.findMany !== 'function') return [];
  try {
    const rows = await delegate.findMany({ take: limit, orderBy: { createdAt: 'desc' } });
    return Array.isArray(rows) ? rows : [];
  } catch {
    try {
      const rows = await delegate.findMany({ take: limit });
      return Array.isArray(rows) ? rows : [];
    } catch {
      return [];
    }
  }
}

async function riderProfileExists009Q(prisma: PrismaAny009Q, userId: string): Promise<boolean> {
  if (!userId || !prisma.taxiRiderProfile) return false;
  try {
    if (typeof prisma.taxiRiderProfile.findUnique === 'function') {
      const row = await prisma.taxiRiderProfile.findUnique({ where: { userId } });
      return Boolean(row);
    }
  } catch {
    // Fallback below.
  }
  try {
    if (typeof prisma.taxiRiderProfile.count === 'function') {
      return (await prisma.taxiRiderProfile.count({ where: { userId } })) > 0;
    }
  } catch {
    return false;
  }
  return false;
}

function pickEmail009Q(row: RowAny009Q): unknown {
  return row.email || row.emailAddress || row.primaryEmail || row.contactEmail;
}

function pickPhone009Q(row: RowAny009Q): unknown {
  return row.phone || row.phoneNumber || row.mobile || row.msisdn;
}

async function toCandidate009Q(prisma: PrismaAny009Q, delegateName: string, row: RowAny009Q): Promise<TaxiOrdersRiderUserCandidate009Q | null> {
  const userId = str009Q(row.id || row.userId);
  if (!userId) return null;
  const exists = await riderProfileExists009Q(prisma, userId);
  return {
    userId,
    userDelegateName: delegateName,
    safeDisplayName: safeDisplayName009Q(row),
    maskedEmail: maskEmail009Q(pickEmail009Q(row)),
    maskedPhone: maskPhone009Q(pickPhone009Q(row)),
    createdAt: str009Q(row.createdAt || row.updatedAt),
    riderProfileExists: exists,
    canUseFor009N: !exists,
    redacted: true,
    rawPiiBlocked: true,
  };
}

export function buildTaxiOrdersRiderUserCandidatesReadiness009Q(): TaxiOrdersRiderUserCandidatesReadiness009Q {
  return {
    version: TAXI_ORDERS_RIDER_USER_CANDIDATES_009Q_VERSION,
    queuePurpose: 'show_existing_real_users_for_009n_rider_profile_intake',
    endpoints: TAXI_ORDERS_RIDER_USER_CANDIDATES_ENDPOINTS_009Q,
    requiredPrismaDelegates: TAXI_ORDERS_RIDER_USER_CANDIDATES_REQUIRED_DELEGATES_009Q,
    userDelegateCandidates: TAXI_ORDERS_RIDER_USER_DELEGATE_CANDIDATES_009Q,
    readOnlyList: true,
    safeRedaction: true,
    fullRawPiiBlocked: true,
    fakeUserCreateBlocked: true,
    fakeRiderCreateBlocked: true,
    noAutofill: true,
    noFakePayload: true,
    providerDispatch: false,
    walletMutation: false,
    dbWriteExecuted: false,
  };
}

export async function loadTaxiOrdersRiderUserCandidates009Q(
  options: { limit?: unknown } = {},
  prisma: PrismaAny009Q = defaultPrisma as unknown as PrismaAny009Q,
): Promise<TaxiOrdersRiderUserCandidatesList009Q> {
  const limit = clampLimit009Q(options.limit);
  const available = availableUserDelegates009Q(prisma);
  const selectedDelegate = available[0] || '';
  const users = selectedDelegate ? await findUsers009Q(prisma, selectedDelegate, limit) : [];
  const candidates = (await Promise.all(users.map((row) => toCandidate009Q(prisma, selectedDelegate, row)))).filter(Boolean) as TaxiOrdersRiderUserCandidate009Q[];
  const userCount = selectedDelegate ? await count009Q(prisma, selectedDelegate) : 0;
  const riderProfileCount = await count009Q(prisma, 'taxiRiderProfile');

  return {
    ok: true,
    version: TAXI_ORDERS_RIDER_USER_CANDIDATES_009Q_VERSION,
    code: 'taxi_orders_009q_rider_user_candidates_loaded',
    counts: {
      users: userCount,
      riderProfiles: riderProfileCount,
      candidates: candidates.length,
    },
    selectedUserDelegateName: selectedDelegate,
    availableUserDelegateNames: available,
    candidates,
    nextOwnerAction: candidates.find((candidate) => candidate.canUseFor009N)
      ? 'Copy a real userId from this read-only list, then use 009N protected intake with manual country/city/idempotency payload.'
      : 'No reusable existing user candidate is available yet. Do not create fake users from Taxi Orders UI.',
    readOnlyList: true,
    safeRedaction: true,
    fullRawPiiBlocked: true,
    fakeUserCreateBlocked: true,
    fakeRiderCreateBlocked: true,
    noAutofill: true,
    noFakePayload: true,
    dbWriteExecuted: false,
    providerDispatch: false,
    walletMutation: false,
  };
}
