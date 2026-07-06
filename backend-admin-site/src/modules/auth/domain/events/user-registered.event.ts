import type { DomainEvent } from "../../../../core/kernel";

export type UserRegisteredPayload = {
  authAccountId: string;
  email: string;
};

export class UserRegisteredEvent implements DomainEvent<UserRegisteredPayload> {
  public readonly eventName = "auth.user.registered";
  public readonly occurredAt: Date;
  public readonly aggregateId: string;
  public readonly payload: UserRegisteredPayload;

  constructor(payload: UserRegisteredPayload) {
    this.occurredAt = new Date();
    this.aggregateId = payload.authAccountId;
    this.payload = payload;
  }
}