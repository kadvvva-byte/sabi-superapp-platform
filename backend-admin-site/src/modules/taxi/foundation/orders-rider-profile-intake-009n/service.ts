import { prisma as defaultPrisma } from '../../../../config/prisma';
import {
  TAXI_ORDERS_RIDER_PROFILE_INTAKE_009N_VERSION,
  TAXI_ORDERS_RIDER_PROFILE_INTAKE_ACTION_009N,
  TAXI_ORDERS_RIDER_PROFILE_INTAKE_ENDPOINTS_009N,
  TAXI_ORDERS_RIDER_PROFILE_INTAKE_REQUIRED_DELEGATES_009N,
  TAXI_ORDERS_RIDER_PROFILE_USER_DELEGATE_CANDIDATES_009N,
} from './constants';
import type {
  TaxiOrdersRiderProfileCreateInput009N,
  TaxiOrdersRiderProfileCreateResult009N,
  TaxiOrdersRiderProfileIntakeReadiness009N,
  TaxiOrdersRiderProfileIntakeStatus009N,
} from './types';

type PrismaAny009N = Record<string, any>;
type RowAny009N = Record<string, any>;

function str009N(value: unknown): string {
  return String(value || '').trim();
}

async function count009N(prisma: PrismaAny009N, delegate: string, args?: Record<string, unknown>): Promise<number> {
  try {
    if (!prisma[delegate] || typeof prisma[delegate].count !== 'function') return 0;
    const value = await prisma[delegate].count(args || {});
    return Number.isFinite(Number(value)) ? Number(value) : 0;
  } catch {
    return 0;
  }
}

function availableUserDelegates009N(prisma: PrismaAny009N): string[] {
  return TAXI_ORDERS_RIDER_PROFILE_USER_DELEGATE_CANDIDATES_009N.filter((delegate) => {
    const candidate = prisma[delegate];
    return !!candidate && typeof candidate.findUnique === 'function';
  });
}

async function findExistingUser009N(prisma: PrismaAny009N, userId: string): Promise<{ delegateName: string; user: RowAny009N | null }> {
  for (const delegateName of availableUserDelegates009N(prisma)) {
    try {
      const user = await prisma[delegateName].findUnique({ where: { id: userId } });
      if (user) return { delegateName, user };
    } catch {
      // Try next delegate. Missing/variant user models must never cause fake profile creation.
    }
  }
  return { delegateName: '', user: null };
}

function failed009N(code: string, statusCode: number, message?: string): TaxiOrdersRiderProfileCreateResult009N {
  return {
    ok: false,
    statusCode,
    code,
    riderProfileId: '',
    idempotent: false,
    existingUserVerified: false,
    fakeUserCreateBlocked: true,
    fakeRiderCreateBlocked: true,
    dbWriteExecuted: false,
    auditWriteExecuted: false,
    providerDispatch: false,
    walletMutation: false,
    message,
  };
}

export function buildTaxiOrdersRiderProfileIntakeReadiness009N(): TaxiOrdersRiderProfileIntakeReadiness009N {
  return {
    version: TAXI_ORDERS_RIDER_PROFILE_INTAKE_009N_VERSION,
    createsFromExistingUserOnly: true,
    fakeUserCreateBlocked: true,
    fakeRiderCreateBlocked: true,
    protectedCreateRequiresExactHeader: true,
    idempotencyRequired: true,
    endpoints: TAXI_ORDERS_RIDER_PROFILE_INTAKE_ENDPOINTS_009N,
    requiredPrismaDelegates: TAXI_ORDERS_RIDER_PROFILE_INTAKE_REQUIRED_DELEGATES_009N,
    userDelegateCandidates: TAXI_ORDERS_RIDER_PROFILE_USER_DELEGATE_CANDIDATES_009N,
    dbWriteOnlyForExistingUserProfileCreate: true,
    auditStorage: 'TaxiAuditLog',
    providerDispatch: false,
    walletMutation: false,
  };
}

export async function loadTaxiOrdersRiderProfileIntakeStatus009N(
  prisma: PrismaAny009N = defaultPrisma as unknown as PrismaAny009N,
): Promise<TaxiOrdersRiderProfileIntakeStatus009N> {
  const available = availableUserDelegates009N(prisma);
  const counts = {
    riderProfiles: await count009N(prisma, 'taxiRiderProfile'),
    auditLogs: await count009N(prisma, 'taxiAuditLog'),
  };
  return {
    ok: true,
    version: TAXI_ORDERS_RIDER_PROFILE_INTAKE_009N_VERSION,
    code: 'taxi_orders_009n_rider_profile_intake_status_loaded',
    counts,
    userDelegateAvailable: available.length > 0,
    availableUserDelegateNames: available,
    canCreateRiderProfileFromExistingUser: available.length > 0,
    nextOwnerAction: available.length > 0
      ? 'Provide an existing real userId, countryCode, cityId and exact approval to create TaxiRiderProfile.'
      : 'No known app user delegate is available in Prisma Client. Add or expose a real user source before TaxiRiderProfile intake.',
    noFakeRows: true,
    noFakeCreate: true,
    dbWriteExecuted: false,
    providerDispatch: false,
    walletMutation: false,
  };
}

export async function createTaxiOrdersRiderProfileFromExistingUser009N(
  input: TaxiOrdersRiderProfileCreateInput009N,
  prisma: PrismaAny009N = defaultPrisma as unknown as PrismaAny009N,
): Promise<TaxiOrdersRiderProfileCreateResult009N> {
  const userId = str009N(input.userId);
  const countryCode = str009N(input.countryCode).toUpperCase();
  const cityId = str009N(input.cityId);
  const trustStatus = str009N(input.trustStatus) || 'standard';
  const idempotencyKey = str009N(input.idempotencyKey);
  const reason = str009N(input.reason) || 'admin_orders_009n_existing_user_rider_profile_no_fake';

  if (!userId || !countryCode || !cityId || !idempotencyKey) {
    return failed009N('taxi_orders_009n_required_fields_missing_no_fake_create', 400, 'userId, countryCode, cityId and idempotencyKey are required.');
  }

  if (!prisma.taxiRiderProfile || typeof prisma.taxiRiderProfile.findUnique !== 'function' || typeof prisma.taxiRiderProfile.create !== 'function') {
    return failed009N('taxi_orders_009n_taxi_rider_profile_delegate_missing_no_fake_create', 409);
  }

  const existingProfile = await prisma.taxiRiderProfile.findUnique({ where: { userId } }).catch(() => null);
  if (existingProfile) {
    return {
      ok: true,
      statusCode: 200,
      code: 'taxi_orders_009n_rider_profile_already_exists_idempotent',
      riderProfileId: str009N(existingProfile.id),
      idempotent: true,
      existingUserVerified: true,
      fakeUserCreateBlocked: true,
      fakeRiderCreateBlocked: true,
      dbWriteExecuted: false,
      auditWriteExecuted: false,
      providerDispatch: false,
      walletMutation: false,
    };
  }

  const existingUser = await findExistingUser009N(prisma, userId);
  if (!existingUser.user) {
    return failed009N('taxi_orders_009n_existing_user_not_found_no_fake_user_create', 404);
  }

  try {
    const execute = async (tx: PrismaAny009N): Promise<RowAny009N> => {
      const profile = await tx.taxiRiderProfile.create({
        data: {
          userId,
          countryCode,
          cityId,
          trustStatus,
          safetyFlagsJson: {
            source: '009n_existing_user_intake',
            userDelegate: existingUser.delegateName,
            fakeUserCreateBlocked: true,
            fakeRiderCreateBlocked: true,
            idempotencyKey,
          },
        },
      });
      if (tx.taxiAuditLog && typeof tx.taxiAuditLog.create === 'function') {
        await tx.taxiAuditLog.create({
          data: {
            actorType: 'admin',
            actorId: 'admin-ui',
            action: TAXI_ORDERS_RIDER_PROFILE_INTAKE_ACTION_009N,
            targetType: 'TaxiRiderProfile',
            targetId: str009N(profile.id),
            payloadJson: {
              userId,
              countryCode,
              cityId,
              trustStatus,
              reason,
              idempotencyKey,
              fakeUserCreateBlocked: true,
              fakeRiderCreateBlocked: true,
              providerDispatch: false,
              walletMutation: false,
            },
          },
        });
      }
      return profile;
    };

    const profile = typeof prisma.$transaction === 'function' ? await prisma.$transaction(execute) : await execute(prisma);
    return {
      ok: true,
      statusCode: 200,
      code: 'taxi_orders_009n_rider_profile_created_from_existing_user_with_audit',
      riderProfileId: str009N(profile.id),
      idempotent: false,
      existingUserVerified: true,
      fakeUserCreateBlocked: true,
      fakeRiderCreateBlocked: true,
      dbWriteExecuted: true,
      auditWriteExecuted: true,
      providerDispatch: false,
      walletMutation: false,
    };
  } catch (error) {
    return failed009N('taxi_orders_009n_create_failed_no_fake_profile_created', 409, error instanceof Error ? error.message : 'create_failed');
  }
}
