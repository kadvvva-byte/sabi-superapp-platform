import type {
  TaxiPrismaEnumCandidate001Z,
  TaxiPrismaModelCandidate001Z,
  TaxiSchemaApplyCandidateVersion001Z,
  TaxiSchemaApplyGate001Z,
  TaxiSchemaApplyGateId001Z,
  TaxiSchemaApplyPlanStep001Z,
} from './types';
export const TAXI_SCHEMA_APPLY_CANDIDATE_VERSION_001Z: TaxiSchemaApplyCandidateVersion001Z = 'TAXI-BACKEND-FOUNDATION-001Z-MEGA';
export const TAXI_PRISMA_ENUM_CANDIDATES_001Z: readonly TaxiPrismaEnumCandidate001Z[] = [
  {
    enumName: 'TaxiDriverVerificationStatus',
    domain: 'identity_verification',
    prismaEnumBlock: `enum TaxiDriverVerificationStatus {
  draft
  submitted
  under_review
  approved
  rejected
  suspended
}`,
    applyToSchemaNow: false,
    ownerApprovalRequiredBeforeAppend: true,
    fakeSchemaApplySuccessBlocked: true,
  },
  {
    enumName: 'TaxiVehicleReviewStatus',
    domain: 'vehicle_park',
    prismaEnumBlock: `enum TaxiVehicleReviewStatus {
  draft
  submitted
  approved
  rejected
  suspended
}`,
    applyToSchemaNow: false,
    ownerApprovalRequiredBeforeAppend: true,
    fakeSchemaApplySuccessBlocked: true,
  },
  {
    enumName: 'TaxiTariffRegionStatus',
    domain: 'tariff_region',
    prismaEnumBlock: `enum TaxiTariffRegionStatus {
  draft
  active
  paused
  retired
}`,
    applyToSchemaNow: false,
    ownerApprovalRequiredBeforeAppend: true,
    fakeSchemaApplySuccessBlocked: true,
  },
  {
    enumName: 'TaxiQuoteStatus',
    domain: 'quote_request_dispatch',
    prismaEnumBlock: `enum TaxiQuoteStatus {
  draft
  quoted
  expired
  accepted
  cancelled
}`,
    applyToSchemaNow: false,
    ownerApprovalRequiredBeforeAppend: true,
    fakeSchemaApplySuccessBlocked: true,
  },
  {
    enumName: 'TaxiRiderRequestStatus',
    domain: 'quote_request_dispatch',
    prismaEnumBlock: `enum TaxiRiderRequestStatus {
  created
  searching
  matched
  cancelled
  expired
}`,
    applyToSchemaNow: false,
    ownerApprovalRequiredBeforeAppend: true,
    fakeSchemaApplySuccessBlocked: true,
  },
  {
    enumName: 'TaxiDispatchOfferStatus',
    domain: 'quote_request_dispatch',
    prismaEnumBlock: `enum TaxiDispatchOfferStatus {
  created
  sent
  accepted
  declined
  expired
  revoked
}`,
    applyToSchemaNow: false,
    ownerApprovalRequiredBeforeAppend: true,
    fakeSchemaApplySuccessBlocked: true,
  },
  {
    enumName: 'TaxiTripStatus',
    domain: 'trip_lifecycle',
    prismaEnumBlock: `enum TaxiTripStatus {
  accepted
  driver_arriving
  arrived
  rider_onboard
  active
  completed
  cancelled
  disputed
}`,
    applyToSchemaNow: false,
    ownerApprovalRequiredBeforeAppend: true,
    fakeSchemaApplySuccessBlocked: true,
  },
  {
    enumName: 'TaxiPaymentHoldStatus',
    domain: 'payment_settlement',
    prismaEnumBlock: `enum TaxiPaymentHoldStatus {
  planned
  requires_provider
  authorized
  captured
  released
  failed
  refunded
}`,
    applyToSchemaNow: false,
    ownerApprovalRequiredBeforeAppend: true,
    fakeSchemaApplySuccessBlocked: true,
  },
  {
    enumName: 'TaxiSettlementStatus',
    domain: 'payment_settlement',
    prismaEnumBlock: `enum TaxiSettlementStatus {
  planned
  under_review
  approved
  blocked
  paid
  reversed
}`,
    applyToSchemaNow: false,
    ownerApprovalRequiredBeforeAppend: true,
    fakeSchemaApplySuccessBlocked: true,
  },
  {
    enumName: 'TaxiSupportCaseStatus',
    domain: 'support_dispute_safety',
    prismaEnumBlock: `enum TaxiSupportCaseStatus {
  open
  waiting_for_user
  under_review
  resolved
  rejected
  escalated
}`,
    applyToSchemaNow: false,
    ownerApprovalRequiredBeforeAppend: true,
    fakeSchemaApplySuccessBlocked: true,
  },
  {
    enumName: 'TaxiDisputeEvidenceType',
    domain: 'support_dispute_safety',
    prismaEnumBlock: `enum TaxiDisputeEvidenceType {
  message
  photo
  video
  receipt
  location
  system_event
}`,
    applyToSchemaNow: false,
    ownerApprovalRequiredBeforeAppend: true,
    fakeSchemaApplySuccessBlocked: true,
  },
  {
    enumName: 'TaxiSafetyEventType',
    domain: 'support_dispute_safety',
    prismaEnumBlock: `enum TaxiSafetyEventType {
  sos
  route_deviation
  harassment_report
  accident
  fraud_signal
  manual_admin_flag
}`,
    applyToSchemaNow: false,
    ownerApprovalRequiredBeforeAppend: true,
    fakeSchemaApplySuccessBlocked: true,
  },
  {
    enumName: 'TaxiAuditActorType',
    domain: 'audit_compliance',
    prismaEnumBlock: `enum TaxiAuditActorType {
  system
  admin
  rider
  driver
  provider
}`,
    applyToSchemaNow: false,
    ownerApprovalRequiredBeforeAppend: true,
    fakeSchemaApplySuccessBlocked: true,
  },
  {
    enumName: 'TaxiProviderArea',
    domain: 'provider_readiness',
    prismaEnumBlock: `enum TaxiProviderArea {
  maps_routes_eta
  dispatch_matching
  wallet_payment
  driver_kyc
  notifications
  fraud_safety
  storage_cdn
}`,
    applyToSchemaNow: false,
    ownerApprovalRequiredBeforeAppend: true,
    fakeSchemaApplySuccessBlocked: true,
  },
  {
    enumName: 'TaxiIdempotencyStatus',
    domain: 'idempotency_rating',
    prismaEnumBlock: `enum TaxiIdempotencyStatus {
  created
  completed
  failed
  expired
}`,
    applyToSchemaNow: false,
    ownerApprovalRequiredBeforeAppend: true,
    fakeSchemaApplySuccessBlocked: true,
  },
  {
    enumName: 'TaxiRatingLedgerSource',
    domain: 'idempotency_rating',
    prismaEnumBlock: `enum TaxiRatingLedgerSource {
  rider_to_driver
  driver_to_rider
  admin_adjustment
  support_resolution
}`,
    applyToSchemaNow: false,
    ownerApprovalRequiredBeforeAppend: true,
    fakeSchemaApplySuccessBlocked: true,
  },
  {
    enumName: 'TaxiRealtimeShadowStatus',
    domain: 'realtime_shadow',
    prismaEnumBlock: `enum TaxiRealtimeShadowStatus {
  planned
  safe_disabled
  ready_for_mount
  mounted_after_approval
  failed_smoke
}`,
    applyToSchemaNow: false,
    ownerApprovalRequiredBeforeAppend: true,
    fakeSchemaApplySuccessBlocked: true,
  },
];
export const TAXI_PRISMA_MODEL_CANDIDATES_001Z: readonly TaxiPrismaModelCandidate001Z[] = [
  {
    modelName: 'TaxiRiderProfile',
    domain: 'identity_verification',
    prismaModelBlock: `model TaxiRiderProfile {
  id String @id @default(cuid())
  userId String @unique
  countryCode String
  cityId String
  trustStatus String @default("standard")
  safetyFlagsJson Json?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  requests TaxiRiderRequest[]
  quotes TaxiQuote[]
  supportCases TaxiSupportCase[]
  ratings TaxiTripRatingLedger[]
  @@index([countryCode, cityId])
  @@index([trustStatus])
}`,
    requiredRelations: [],
    requiredIndexes: ['@@index([countryCode, cityId])', '@@index([trustStatus])'],
    applyToSchemaNow: false,
    ownerApprovalRequiredBeforeAppend: true,
    prismaSchemaWriteNow: false,
    prismaGenerateNow: false,
    prismaMigrationNow: false,
    dbReadNow: false,
    dbWriteNow: false,
    runtimeRouteMountedNow: false,
    fakeSchemaApplySuccessBlocked: true,
  },
  {
    modelName: 'TaxiDriverProfile',
    domain: 'identity_verification',
    prismaModelBlock: `model TaxiDriverProfile {
  id String @id @default(cuid())
  userId String @unique
  countryCode String
  cityId String
  status TaxiDriverVerificationStatus @default(draft)
  adminApprovedAt DateTime?
  balanceReserveMinor Int @default(0)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  applications TaxiDriverApplication[]
  vehicles TaxiVehicle[]
  assignments TaxiDriverVehicleAssignment[]
  offers TaxiDispatchOffer[]
  trips TaxiTrip[]
  settlements TaxiDriverSettlement[]
  ratings TaxiTripRatingLedger[]
  @@index([status, countryCode, cityId])
  @@index([adminApprovedAt])
}`,
    requiredRelations: [],
    requiredIndexes: ['@@index([status, countryCode, cityId])', '@@index([adminApprovedAt])'],
    applyToSchemaNow: false,
    ownerApprovalRequiredBeforeAppend: true,
    prismaSchemaWriteNow: false,
    prismaGenerateNow: false,
    prismaMigrationNow: false,
    dbReadNow: false,
    dbWriteNow: false,
    runtimeRouteMountedNow: false,
    fakeSchemaApplySuccessBlocked: true,
  },
  {
    modelName: 'TaxiDriverApplication',
    domain: 'identity_verification',
    prismaModelBlock: `model TaxiDriverApplication {
  id String @id @default(cuid())
  driverProfileId String
  driverProfile TaxiDriverProfile @relation(fields: [driverProfileId], references: [id])
  status TaxiDriverVerificationStatus @default(submitted)
  documentBundleJson Json
  reviewerAdminId String?
  decisionReason String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  @@index([driverProfileId, status])
  @@index([reviewerAdminId])
}`,
    requiredRelations: ['driverProfile TaxiDriverProfile @relation(fields: [driverProfileId], references: [id])'],
    requiredIndexes: ['@@index([driverProfileId, status])', '@@index([reviewerAdminId])'],
    applyToSchemaNow: false,
    ownerApprovalRequiredBeforeAppend: true,
    prismaSchemaWriteNow: false,
    prismaGenerateNow: false,
    prismaMigrationNow: false,
    dbReadNow: false,
    dbWriteNow: false,
    runtimeRouteMountedNow: false,
    fakeSchemaApplySuccessBlocked: true,
  },
  {
    modelName: 'TaxiVehicle',
    domain: 'vehicle_park',
    prismaModelBlock: `model TaxiVehicle {
  id String @id @default(cuid())
  driverProfileId String
  driverProfile TaxiDriverProfile @relation(fields: [driverProfileId], references: [id])
  status TaxiVehicleReviewStatus @default(draft)
  plateNumberHash String @unique
  vehicleClass String
  inspectionBundleJson Json
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  assignments TaxiDriverVehicleAssignment[]
  trips TaxiTrip[]
  @@index([driverProfileId, status])
  @@index([vehicleClass, status])
}`,
    requiredRelations: ['driverProfile TaxiDriverProfile @relation(fields: [driverProfileId], references: [id])'],
    requiredIndexes: ['@@index([driverProfileId, status])', '@@index([vehicleClass, status])'],
    applyToSchemaNow: false,
    ownerApprovalRequiredBeforeAppend: true,
    prismaSchemaWriteNow: false,
    prismaGenerateNow: false,
    prismaMigrationNow: false,
    dbReadNow: false,
    dbWriteNow: false,
    runtimeRouteMountedNow: false,
    fakeSchemaApplySuccessBlocked: true,
  },
  {
    modelName: 'TaxiDriverVehicleAssignment',
    domain: 'vehicle_park',
    prismaModelBlock: `model TaxiDriverVehicleAssignment {
  id String @id @default(cuid())
  driverProfileId String
  driverProfile TaxiDriverProfile @relation(fields: [driverProfileId], references: [id])
  vehicleId String
  vehicle TaxiVehicle @relation(fields: [vehicleId], references: [id])
  active Boolean @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  @@index([driverProfileId, active])
  @@index([vehicleId, active])
}`,
    requiredRelations: ['driverProfile TaxiDriverProfile @relation(fields: [driverProfileId], references: [id])', 'vehicle TaxiVehicle @relation(fields: [vehicleId], references: [id])'],
    requiredIndexes: ['@@index([driverProfileId, active])', '@@index([vehicleId, active])'],
    applyToSchemaNow: false,
    ownerApprovalRequiredBeforeAppend: true,
    prismaSchemaWriteNow: false,
    prismaGenerateNow: false,
    prismaMigrationNow: false,
    dbReadNow: false,
    dbWriteNow: false,
    runtimeRouteMountedNow: false,
    fakeSchemaApplySuccessBlocked: true,
  },
  {
    modelName: 'TaxiTariffRegion',
    domain: 'tariff_region',
    prismaModelBlock: `model TaxiTariffRegion {
  id String @id @default(cuid())
  countryCode String
  cityId String
  zoneId String
  tariffCode String
  status TaxiTariffRegionStatus @default(draft)
  baseFareMinor Int
  perKmMinor Int
  perMinuteMinor Int
  commissionBasisPoints Int
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  quotes TaxiQuote[]
  requests TaxiRiderRequest[]
  @@unique([countryCode, cityId, zoneId, tariffCode])
  @@index([status, countryCode, cityId])
}`,
    requiredRelations: [],
    requiredIndexes: ['@@unique([countryCode, cityId, zoneId, tariffCode])', '@@index([status, countryCode, cityId])'],
    applyToSchemaNow: false,
    ownerApprovalRequiredBeforeAppend: true,
    prismaSchemaWriteNow: false,
    prismaGenerateNow: false,
    prismaMigrationNow: false,
    dbReadNow: false,
    dbWriteNow: false,
    runtimeRouteMountedNow: false,
    fakeSchemaApplySuccessBlocked: true,
  },
  {
    modelName: 'TaxiQuote',
    domain: 'quote_request_dispatch',
    prismaModelBlock: `model TaxiQuote {
  id String @id @default(cuid())
  riderProfileId String
  riderProfile TaxiRiderProfile @relation(fields: [riderProfileId], references: [id])
  tariffRegionId String
  tariffRegion TaxiTariffRegion @relation(fields: [tariffRegionId], references: [id])
  status TaxiQuoteStatus @default(draft)
  pickupGeoJson Json
  dropoffGeoJson Json
  routeProviderRef String?
  estimatedFareMinor Int
  expiresAt DateTime
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  requests TaxiRiderRequest[]
  @@index([riderProfileId, status])
  @@index([expiresAt, status])
  @@index([routeProviderRef])
}`,
    requiredRelations: ['riderProfile TaxiRiderProfile @relation(fields: [riderProfileId], references: [id])', 'tariffRegion TaxiTariffRegion @relation(fields: [tariffRegionId], references: [id])'],
    requiredIndexes: ['@@index([riderProfileId, status])', '@@index([expiresAt, status])', '@@index([routeProviderRef])'],
    applyToSchemaNow: false,
    ownerApprovalRequiredBeforeAppend: true,
    prismaSchemaWriteNow: false,
    prismaGenerateNow: false,
    prismaMigrationNow: false,
    dbReadNow: false,
    dbWriteNow: false,
    runtimeRouteMountedNow: false,
    fakeSchemaApplySuccessBlocked: true,
  },
  {
    modelName: 'TaxiRiderRequest',
    domain: 'quote_request_dispatch',
    prismaModelBlock: `model TaxiRiderRequest {
  id String @id @default(cuid())
  riderProfileId String
  riderProfile TaxiRiderProfile @relation(fields: [riderProfileId], references: [id])
  quoteId String
  quote TaxiQuote @relation(fields: [quoteId], references: [id])
  tariffRegionId String
  tariffRegion TaxiTariffRegion @relation(fields: [tariffRegionId], references: [id])
  status TaxiRiderRequestStatus @default(created)
  pickupGeoJson Json
  dropoffGeoJson Json
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  offers TaxiDispatchOffer[]
  @@index([riderProfileId, status])
  @@index([quoteId])
  @@index([tariffRegionId, status])
}`,
    requiredRelations: ['riderProfile TaxiRiderProfile @relation(fields: [riderProfileId], references: [id])', 'quote TaxiQuote @relation(fields: [quoteId], references: [id])', 'tariffRegion TaxiTariffRegion @relation(fields: [tariffRegionId], references: [id])'],
    requiredIndexes: ['@@index([riderProfileId, status])', '@@index([quoteId])', '@@index([tariffRegionId, status])'],
    applyToSchemaNow: false,
    ownerApprovalRequiredBeforeAppend: true,
    prismaSchemaWriteNow: false,
    prismaGenerateNow: false,
    prismaMigrationNow: false,
    dbReadNow: false,
    dbWriteNow: false,
    runtimeRouteMountedNow: false,
    fakeSchemaApplySuccessBlocked: true,
  },
  {
    modelName: 'TaxiDispatchOffer',
    domain: 'quote_request_dispatch',
    prismaModelBlock: `model TaxiDispatchOffer {
  id String @id @default(cuid())
  riderRequestId String
  riderRequest TaxiRiderRequest @relation(fields: [riderRequestId], references: [id])
  driverProfileId String
  driverProfile TaxiDriverProfile @relation(fields: [driverProfileId], references: [id])
  status TaxiDispatchOfferStatus @default(created)
  offerExpiresAt DateTime
  matchingScore Int @default(0)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  trip TaxiTrip?
  @@index([riderRequestId, status])
  @@index([driverProfileId, status])
  @@index([offerExpiresAt, status])
}`,
    requiredRelations: ['riderRequest TaxiRiderRequest @relation(fields: [riderRequestId], references: [id])', 'driverProfile TaxiDriverProfile @relation(fields: [driverProfileId], references: [id])'],
    requiredIndexes: ['@@index([riderRequestId, status])', '@@index([driverProfileId, status])', '@@index([offerExpiresAt, status])'],
    applyToSchemaNow: false,
    ownerApprovalRequiredBeforeAppend: true,
    prismaSchemaWriteNow: false,
    prismaGenerateNow: false,
    prismaMigrationNow: false,
    dbReadNow: false,
    dbWriteNow: false,
    runtimeRouteMountedNow: false,
    fakeSchemaApplySuccessBlocked: true,
  },
  {
    modelName: 'TaxiTrip',
    domain: 'trip_lifecycle',
    prismaModelBlock: `model TaxiTrip {
  id String @id @default(cuid())
  dispatchOfferId String @unique
  dispatchOffer TaxiDispatchOffer @relation(fields: [dispatchOfferId], references: [id])
  driverProfileId String
  driverProfile TaxiDriverProfile @relation(fields: [driverProfileId], references: [id])
  vehicleId String
  vehicle TaxiVehicle @relation(fields: [vehicleId], references: [id])
  status TaxiTripStatus @default(accepted)
  pickupStartedAt DateTime?
  pickedUpAt DateTime?
  completedAt DateTime?
  finalFareMinor Int?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  paymentHolds TaxiPaymentHold[]
  settlements TaxiDriverSettlement[]
  supportCases TaxiSupportCase[]
  safetyEvents TaxiSafetyEvent[]
  realtimeShadows TaxiRealtimeTripShadow[]
  ratings TaxiTripRatingLedger[]
  @@index([driverProfileId, status])
  @@index([vehicleId, status])
  @@index([completedAt])
}`,
    requiredRelations: ['dispatchOffer TaxiDispatchOffer @relation(fields: [dispatchOfferId], references: [id])', 'driverProfile TaxiDriverProfile @relation(fields: [driverProfileId], references: [id])', 'vehicle TaxiVehicle @relation(fields: [vehicleId], references: [id])'],
    requiredIndexes: ['@@index([driverProfileId, status])', '@@index([vehicleId, status])', '@@index([completedAt])'],
    applyToSchemaNow: false,
    ownerApprovalRequiredBeforeAppend: true,
    prismaSchemaWriteNow: false,
    prismaGenerateNow: false,
    prismaMigrationNow: false,
    dbReadNow: false,
    dbWriteNow: false,
    runtimeRouteMountedNow: false,
    fakeSchemaApplySuccessBlocked: true,
  },
  {
    modelName: 'TaxiPaymentHold',
    domain: 'payment_settlement',
    prismaModelBlock: `model TaxiPaymentHold {
  id String @id @default(cuid())
  tripId String
  trip TaxiTrip @relation(fields: [tripId], references: [id])
  status TaxiPaymentHoldStatus @default(planned)
  providerReferenceLabel String?
  amountMinor Int
  currency String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  @@index([tripId, status])
  @@index([providerReferenceLabel])
}`,
    requiredRelations: ['trip TaxiTrip @relation(fields: [tripId], references: [id])'],
    requiredIndexes: ['@@index([tripId, status])', '@@index([providerReferenceLabel])'],
    applyToSchemaNow: false,
    ownerApprovalRequiredBeforeAppend: true,
    prismaSchemaWriteNow: false,
    prismaGenerateNow: false,
    prismaMigrationNow: false,
    dbReadNow: false,
    dbWriteNow: false,
    runtimeRouteMountedNow: false,
    fakeSchemaApplySuccessBlocked: true,
  },
  {
    modelName: 'TaxiDriverSettlement',
    domain: 'payment_settlement',
    prismaModelBlock: `model TaxiDriverSettlement {
  id String @id @default(cuid())
  tripId String
  trip TaxiTrip @relation(fields: [tripId], references: [id])
  driverProfileId String
  driverProfile TaxiDriverProfile @relation(fields: [driverProfileId], references: [id])
  status TaxiSettlementStatus @default(planned)
  grossFareMinor Int
  commissionMinor Int
  driverNetMinor Int
  currency String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  @@index([driverProfileId, status])
  @@index([tripId, status])
}`,
    requiredRelations: ['trip TaxiTrip @relation(fields: [tripId], references: [id])', 'driverProfile TaxiDriverProfile @relation(fields: [driverProfileId], references: [id])'],
    requiredIndexes: ['@@index([driverProfileId, status])', '@@index([tripId, status])'],
    applyToSchemaNow: false,
    ownerApprovalRequiredBeforeAppend: true,
    prismaSchemaWriteNow: false,
    prismaGenerateNow: false,
    prismaMigrationNow: false,
    dbReadNow: false,
    dbWriteNow: false,
    runtimeRouteMountedNow: false,
    fakeSchemaApplySuccessBlocked: true,
  },
  {
    modelName: 'TaxiSupportCase',
    domain: 'support_dispute_safety',
    prismaModelBlock: `model TaxiSupportCase {
  id String @id @default(cuid())
  tripId String?
  trip TaxiTrip? @relation(fields: [tripId], references: [id])
  riderProfileId String?
  riderProfile TaxiRiderProfile? @relation(fields: [riderProfileId], references: [id])
  status TaxiSupportCaseStatus @default(open)
  caseType String
  priority Int @default(0)
  assignedAdminId String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  evidence TaxiDisputeEvidence[]
  @@index([tripId, status])
  @@index([riderProfileId, status])
  @@index([assignedAdminId, status])
}`,
    requiredRelations: ['trip TaxiTrip? @relation(fields: [tripId], references: [id])', 'riderProfile TaxiRiderProfile? @relation(fields: [riderProfileId], references: [id])'],
    requiredIndexes: ['@@index([tripId, status])', '@@index([riderProfileId, status])', '@@index([assignedAdminId, status])'],
    applyToSchemaNow: false,
    ownerApprovalRequiredBeforeAppend: true,
    prismaSchemaWriteNow: false,
    prismaGenerateNow: false,
    prismaMigrationNow: false,
    dbReadNow: false,
    dbWriteNow: false,
    runtimeRouteMountedNow: false,
    fakeSchemaApplySuccessBlocked: true,
  },
  {
    modelName: 'TaxiDisputeEvidence',
    domain: 'support_dispute_safety',
    prismaModelBlock: `model TaxiDisputeEvidence {
  id String @id @default(cuid())
  supportCaseId String
  supportCase TaxiSupportCase @relation(fields: [supportCaseId], references: [id])
  evidenceType TaxiDisputeEvidenceType
  storageReferenceLabel String
  submittedByActorId String
  createdAt DateTime @default(now())
  @@index([supportCaseId, evidenceType])
  @@index([submittedByActorId])
}`,
    requiredRelations: ['supportCase TaxiSupportCase @relation(fields: [supportCaseId], references: [id])'],
    requiredIndexes: ['@@index([supportCaseId, evidenceType])', '@@index([submittedByActorId])'],
    applyToSchemaNow: false,
    ownerApprovalRequiredBeforeAppend: true,
    prismaSchemaWriteNow: false,
    prismaGenerateNow: false,
    prismaMigrationNow: false,
    dbReadNow: false,
    dbWriteNow: false,
    runtimeRouteMountedNow: false,
    fakeSchemaApplySuccessBlocked: true,
  },
  {
    modelName: 'TaxiSafetyEvent',
    domain: 'support_dispute_safety',
    prismaModelBlock: `model TaxiSafetyEvent {
  id String @id @default(cuid())
  tripId String
  trip TaxiTrip @relation(fields: [tripId], references: [id])
  eventType TaxiSafetyEventType
  severity Int
  payloadJson Json
  createdAt DateTime @default(now())
  @@index([tripId, eventType])
  @@index([severity, createdAt])
}`,
    requiredRelations: ['trip TaxiTrip @relation(fields: [tripId], references: [id])'],
    requiredIndexes: ['@@index([tripId, eventType])', '@@index([severity, createdAt])'],
    applyToSchemaNow: false,
    ownerApprovalRequiredBeforeAppend: true,
    prismaSchemaWriteNow: false,
    prismaGenerateNow: false,
    prismaMigrationNow: false,
    dbReadNow: false,
    dbWriteNow: false,
    runtimeRouteMountedNow: false,
    fakeSchemaApplySuccessBlocked: true,
  },
  {
    modelName: 'TaxiAuditLog',
    domain: 'audit_compliance',
    prismaModelBlock: `model TaxiAuditLog {
  id String @id @default(cuid())
  actorType TaxiAuditActorType
  actorId String
  action String
  targetType String
  targetId String
  payloadJson Json?
  createdAt DateTime @default(now())
  @@index([actorType, actorId])
  @@index([targetType, targetId])
  @@index([action, createdAt])
}`,
    requiredRelations: [],
    requiredIndexes: ['@@index([actorType, actorId])', '@@index([targetType, targetId])', '@@index([action, createdAt])'],
    applyToSchemaNow: false,
    ownerApprovalRequiredBeforeAppend: true,
    prismaSchemaWriteNow: false,
    prismaGenerateNow: false,
    prismaMigrationNow: false,
    dbReadNow: false,
    dbWriteNow: false,
    runtimeRouteMountedNow: false,
    fakeSchemaApplySuccessBlocked: true,
  },
  {
    modelName: 'TaxiProviderReadinessSnapshot',
    domain: 'provider_readiness',
    prismaModelBlock: `model TaxiProviderReadinessSnapshot {
  id String @id @default(cuid())
  providerArea TaxiProviderArea
  countryCode String
  cityId String
  configured Boolean @default(false)
  referenceLabelsJson Json
  readinessJson Json
  createdAt DateTime @default(now())
  @@index([providerArea, countryCode, cityId])
  @@index([configured])
}`,
    requiredRelations: [],
    requiredIndexes: ['@@index([providerArea, countryCode, cityId])', '@@index([configured])'],
    applyToSchemaNow: false,
    ownerApprovalRequiredBeforeAppend: true,
    prismaSchemaWriteNow: false,
    prismaGenerateNow: false,
    prismaMigrationNow: false,
    dbReadNow: false,
    dbWriteNow: false,
    runtimeRouteMountedNow: false,
    fakeSchemaApplySuccessBlocked: true,
  },
  {
    modelName: 'TaxiIdempotencyRecord',
    domain: 'idempotency_rating',
    prismaModelBlock: `model TaxiIdempotencyRecord {
  id String @id @default(cuid())
  idempotencyKey String @unique
  scope String
  status TaxiIdempotencyStatus @default(created)
  responseFingerprint String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  @@index([scope, status])
}`,
    requiredRelations: [],
    requiredIndexes: ['@@index([scope, status])'],
    applyToSchemaNow: false,
    ownerApprovalRequiredBeforeAppend: true,
    prismaSchemaWriteNow: false,
    prismaGenerateNow: false,
    prismaMigrationNow: false,
    dbReadNow: false,
    dbWriteNow: false,
    runtimeRouteMountedNow: false,
    fakeSchemaApplySuccessBlocked: true,
  },
  {
    modelName: 'TaxiTripRatingLedger',
    domain: 'idempotency_rating',
    prismaModelBlock: `model TaxiTripRatingLedger {
  id String @id @default(cuid())
  tripId String
  trip TaxiTrip @relation(fields: [tripId], references: [id])
  riderProfileId String?
  riderProfile TaxiRiderProfile? @relation(fields: [riderProfileId], references: [id])
  driverProfileId String?
  driverProfile TaxiDriverProfile? @relation(fields: [driverProfileId], references: [id])
  source TaxiRatingLedgerSource
  stars Int
  comment String?
  createdAt DateTime @default(now())
  @@index([tripId, source])
  @@index([driverProfileId])
  @@index([riderProfileId])
}`,
    requiredRelations: ['trip TaxiTrip @relation(fields: [tripId], references: [id])', 'riderProfile TaxiRiderProfile? @relation(fields: [riderProfileId], references: [id])', 'driverProfile TaxiDriverProfile? @relation(fields: [driverProfileId], references: [id])'],
    requiredIndexes: ['@@index([tripId, source])', '@@index([driverProfileId])', '@@index([riderProfileId])'],
    applyToSchemaNow: false,
    ownerApprovalRequiredBeforeAppend: true,
    prismaSchemaWriteNow: false,
    prismaGenerateNow: false,
    prismaMigrationNow: false,
    dbReadNow: false,
    dbWriteNow: false,
    runtimeRouteMountedNow: false,
    fakeSchemaApplySuccessBlocked: true,
  },
  {
    modelName: 'TaxiRealtimeTripShadow',
    domain: 'realtime_shadow',
    prismaModelBlock: `model TaxiRealtimeTripShadow {
  id String @id @default(cuid())
  tripId String
  trip TaxiTrip @relation(fields: [tripId], references: [id])
  status TaxiRealtimeShadowStatus @default(planned)
  lastKnownGeoJson Json?
  lastEventAt DateTime?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  @@index([tripId, status])
  @@index([lastEventAt])
}`,
    requiredRelations: ['trip TaxiTrip @relation(fields: [tripId], references: [id])'],
    requiredIndexes: ['@@index([tripId, status])', '@@index([lastEventAt])'],
    applyToSchemaNow: false,
    ownerApprovalRequiredBeforeAppend: true,
    prismaSchemaWriteNow: false,
    prismaGenerateNow: false,
    prismaMigrationNow: false,
    dbReadNow: false,
    dbWriteNow: false,
    runtimeRouteMountedNow: false,
    fakeSchemaApplySuccessBlocked: true,
  },
];
const gate = (id: TaxiSchemaApplyGateId001Z, label: string): TaxiSchemaApplyGate001Z => ({
  id,
  label,
  passedNow: false,
  exactOwnerApprovalRequired: true,
  blocksSchemaWriteNow: true,
  blocksPrismaGenerateNow: true,
  blocksMigrationNow: true,
  fakeGatePassBlocked: true,
});
export const TAXI_SCHEMA_APPLY_GATES_001Z: readonly TaxiSchemaApplyGate001Z[] = [
  gate('owner_exact_schema_append_approval_required', 'Owner must approve the exact schema append candidate.'),
  gate('schema_backup_required', 'Prisma schema backup and rollback artifact must exist.'),
  gate('duplicate_model_scan_required', 'Existing schema must be scanned for duplicate Taxi models/enums.'),
  gate('relation_integrity_review_required', 'Relations and optionality must be reviewed before apply.'),
  gate('index_name_collision_review_required', 'Index and unique names must be checked for collisions.'),
  gate('rollback_plan_required', 'Rollback plan must be reviewed before any apply.'),
  gate('prisma_generate_separate_approval_required', 'Prisma generate requires separate approval.'),
  gate('migration_separate_approval_required', 'Prisma migration requires separate approval.'),
  gate('db_runtime_smoke_separate_approval_required', 'DB/runtime smoke requires separate approval.'),
  gate('app_route_mount_separate_approval_required', 'Runtime route mount requires separate approval.'),
  gate('wallet_payment_provider_separate_approval_required', 'Wallet/payment/provider boundary requires separate approval.'),
  gate('admin_ui_runtime_separate_approval_required', 'Admin UI runtime wiring requires separate approval.'),
];
const planStep = (id: string, order: number, description: string): TaxiSchemaApplyPlanStep001Z => ({
  id,
  order,
  description,
  canExecuteNow: false,
  requiresSeparateApproval: true,
  writesPrismaSchemaNow: false,
  runsPrismaGenerateNow: false,
  runsPrismaMigrationNow: false,
  readsDbNow: false,
  writesDbNow: false,
  mountsRuntimeRoutesNow: false,
  fakeExecutionSuccessBlocked: true,
});
export const TAXI_SCHEMA_APPLY_PLAN_STEPS_001Z: readonly TaxiSchemaApplyPlanStep001Z[] = [
  planStep('shape-read-existing-schema', 1, 'Read existing schema shape only after approval, no values or DB access.'),
  planStep('backup-current-schema', 2, 'Create local schema backup before append.'),
  planStep('duplicate-scan', 3, 'Scan for existing Taxi model/enum conflicts.'),
  planStep('append-candidate-review', 4, 'Review exact candidate text with owner.'),
  planStep('schema-append-only', 5, 'Append candidate to schema only after exact approval.'),
  planStep('type-generation-preflight', 6, 'Prepare generate command but do not run now.'),
  planStep('migration-diff-preflight', 7, 'Prepare migration diff plan but do not run now.'),
  planStep('runtime-contract-recheck', 8, 'Recheck route contracts remain safe-disabled.'),
  planStep('admin-readiness-recheck', 9, 'Recheck Admin readiness panels after schema candidate.'),
  planStep('wallet-provider-boundary-recheck', 10, 'Verify Wallet/payment/provider remain locked.'),
  planStep('post-apply-tsc-planning', 11, 'Plan TypeScript check after future apply.'),
  planStep('handoff-next-approval', 12, 'Write next exact approval template before any real apply.'),
];
export const TAXI_SCHEMA_APPEND_CANDIDATE_TEXT_001Z = [
  ...TAXI_PRISMA_ENUM_CANDIDATES_001Z.map((candidate) => candidate.prismaEnumBlock),
  ...TAXI_PRISMA_MODEL_CANDIDATES_001Z.map((candidate) => candidate.prismaModelBlock),
].join('\n\n');
