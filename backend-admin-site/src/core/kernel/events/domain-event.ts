export interface DomainEvent<TPayload = Record<string, unknown>> {
  readonly eventName: string;
  readonly aggregateId?: string;
  readonly occurredAt: Date;
  readonly payload: TPayload;
}