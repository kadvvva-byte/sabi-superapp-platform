export interface AuditRecord {
  action: string;
  actorId?: string | null;
  entityType: string;
  entityId?: string | null;
  meta?: Record<string, unknown>;
  occurredAt?: Date;
}

export interface AuditPort {
  write(record: AuditRecord): Promise<void>;
}