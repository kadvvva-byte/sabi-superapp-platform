import type { DomainEvent } from "../../../../core/kernel";

export type UserLoggedInPayload = {
  authAccountId: string;
  email: string;
  loggedInAt: string;
};

export class UserLoggedInEvent implements DomainEvent<UserLoggedInPayload> {
  public readonly eventName = "auth.user.logged-in";
  public readonly occurredAt: Date;
  public readonly aggregateId: string;
  public readonly payload: UserLoggedInPayload;

  constructor(payload: UserLoggedInPayload) {
    this.occurredAt = new Date();
    this.aggregateId = payload.authAccountId;
    this.payload = payload;
  }
}