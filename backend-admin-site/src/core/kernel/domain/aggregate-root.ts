import { BaseEntity, BaseEntityProps } from "./base-entity";
import type { DomainEvent } from "../events/domain-event";
import { UniqueId } from "./unique-id";

export abstract class AggregateRoot<T extends BaseEntityProps> extends BaseEntity<T> {
  private readonly domainEventsInternal: DomainEvent[] = [];

  protected constructor(props: T, id?: UniqueId) {
    super(props, id);
  }

  protected addDomainEvent(event: DomainEvent): void {
    this.domainEventsInternal.push(event);
  }

  public pullDomainEvents(): DomainEvent[] {
    const events = [...this.domainEventsInternal];
    this.clearDomainEvents();
    return events;
  }

  public get domainEvents(): DomainEvent[] {
    return [...this.domainEventsInternal];
  }

  public clearDomainEvents(): void {
    this.domainEventsInternal.length = 0;
  }
}